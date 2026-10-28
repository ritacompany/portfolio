// Checks the chat phone study against the two Figma frames.
//   node scripts/check-chat-rotate.mjs start|end|text|reduced
// start / end: the phone's rendered outline against the Mokker phone from Figma frame 1 or 2, placed where
//   that frame puts it relative to the phone centre. Passes at IoU 0.96 or more.
// text: the paragraph's offset from the phone centre at both ends against the Figma frames, within 4 px,
//   visible throughout.
// reduced: with reduced motion the phone shows frame 2 and does not move inside the block while scrolling.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const which = process.argv[2];
if (!["start", "end", "text", "reduced"].includes(which)) { console.error("usage: start|end|text|reduced"); process.exit(2); }

// Figma, block coordinates at 1440: frame 1 phone centre, frame 2 phone centre relative to the paragraph,
// and each Mokker rectangle's top left relative to its phone centre.
const F1 = { cx: 981.51, cy: 415.22, rect: [746 - 981.51, 72 - 415.22, 477.15, 704.16] };
const F2 = { rect: [735 - 891.67, 72 - 396.34, 313.71, 648.19] };
// The paragraph shows from the start under the phone (frame 1) and ends beside it (frame 2).
const PARA = { x: 274, startOff: 839 - 415.22, endOff: 383 - 396.34 };

const pwPath = process.env.PLAYWRIGHT_MODULE || path.join(process.env.HOME, ".npm/_npx/31e32ef8478fbf80/node_modules/playwright-core/index.mjs");
if (!existsSync(pwPath)) { console.error("playwright-core not found"); process.exit(2); }
const { chromium } = await import(pathToFileURL(pwPath).href);
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(new URL(req.url, "http://x").pathname), file = path.join(root, p);
    if (!file.startsWith(root)) throw 0;
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" }); res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--force-color-profile=srgb", "--hide-scrollbars"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: which === "reduced" ? "reduce" : "no-preference" });
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(`${base}/site/motion-lab/chat-rotate.html`, { waitUntil: "load" });
await page.evaluate(async () => { await document.fonts.ready; await window.ready; });

// Scroll so the turn is at 0 (start) or 1 (end), then report the phone centre, the paragraph and the turn,
// all in block coordinates.
const state = (where) => page.evaluate(async (where) => {
  const block = document.querySelector(".cr-block"), sec = document.getElementById("chat-rotate");
  const top = block.getBoundingClientRect().top + scrollY;
  scrollTo(0, where === "start" ? 0 : top + 1600);
  dispatchEvent(new Event("scroll"));
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const b = block.getBoundingClientRect(), h = document.querySelector(".cr-phone").getBoundingClientRect(), p = document.querySelector(".cr-para").getBoundingClientRect();
  await new Promise((r) => setTimeout(r, where === "end" ? 1600 : 50));
  return { op: +getComputedStyle(document.querySelector(".cr-para .tb-item")).opacity, turn: +sec.dataset.turn, cx: h.left + h.width / 2 - b.left, cy: h.top + h.height / 2 - b.top, px: p.left - b.left, py: p.top - b.top, box: h.width };
}, where);

// Outline overlap: draw the WebGL canvas and the Figma image into one 2D canvas around the phone centre.
const iou = (ref, rect) => page.evaluate(async ([ref, rect]) => {
  const gl = document.querySelector(".cr-phone canvas"), box = gl.getBoundingClientRect().width;
  const img = new Image(); img.src = ref; await img.decode();
  const N = Math.ceil(box), c = document.createElement("canvas"); c.width = c.height = N;
  const x = c.getContext("2d", { willReadFrequently: true });
  x.drawImage(gl, 0, 0, N, N); const a = x.getImageData(0, 0, N, N).data;
  x.clearRect(0, 0, N, N); x.drawImage(img, N / 2 + rect[0], N / 2 + rect[1], rect[2], rect[3]); const r = x.getImageData(0, 0, N, N).data;
  let inter = 0, uni = 0, ra = 0, rr = 0;
  for (let i = 3; i < a.length; i += 4) { const p = a[i] > 128, q = r[i] > 128; if (p && q) inter++; if (p || q) uni++; if (p) ra++; if (q) rr++; }
  return { iou: inter / uni, rendered: ra, figma: rr };
}, [ref, rect]);

let ok = false, out = {};
if (which === "start" || which === "end") {
  const s = await state(which);
  // CHECK_PLANT=1 swaps in the other frame's phone: the check must fail on it (proves it can fail).
  const swap = process.env.CHECK_PLANT === "1", first = (which === "start") !== swap;
  const m = await iou(`${base}/docs/motion/chat-rotate/ref-${first ? "f1" : "f2"}.png`, first ? F1.rect : F2.rect);
  out = { ...s, ...m };
  const placed = which === "start" ? Math.hypot(s.cx - F1.cx, s.cy - F1.cy) < 1 : true;
  ok = m.iou >= 0.96 && placed && s.turn === (which === "start" ? 0 : 1);
} else if (which === "text") {
  const a = await state("start"), b = await state("end");
  out = { start: a.py - a.cy, end: b.py - b.cy, x: [a.px, b.px], want: PARA };
  out.opacity = [a.op, b.op];
  ok = a.op === 1 && b.op === 1 && Math.abs(out.start - PARA.startOff) <= 4 && Math.abs(out.end - PARA.endOff) <= 4 && Math.abs(a.px - PARA.x) <= 1 && Math.abs(b.px - PARA.x) <= 1;
} else {
  const a = await state("start"), b = await state("end");
  out = { a, b };
  out.offset = a.py - a.cy;
  ok = Math.abs(out.offset - PARA.endOff) <= 4 && a.turn === 1 && b.turn === 1 && Math.abs(a.cx - b.cx) < 0.5 && Math.abs(a.cy - b.cy) < 0.5;
}
console.log(JSON.stringify(out));
if (errors.length) { console.log("page errors:", errors.join(" | ")); ok = false; }
await browser.close(); server.close();
console.log(ok ? { start: "START_MATCH", end: "END_MATCH", text: "TEXT_MATCH", reduced: "REDUCED_STILL" }[which] : "FAILED");
process.exit(ok ? 0 : 1);
