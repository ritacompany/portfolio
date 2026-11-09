// Checks the chat phone study against the agreed state list (docs/motion/chat-rotate/state_list.md).
//   node scripts/check-chat-rotate.mjs start|end|text|path|hold|chip|smooth|reduced
// start / end: the phone's rendered outline against the Mokker phone from Figma frame 1 (scroll 0) or frame 2
//   (the moment they meet), placed where that frame puts it relative to the phone centre. IoU 0.96 or more.
// text: the paragraph's offset from the phone centre at both ends against the Figma frames, within 4 px,
//   visible throughout, and it never moves inside the block before the meet (plain page text).
// path: the turn has not started until the phone centre reaches the bottom of the screen; from there to the
//   meet the phone only rises on screen (no drop, no overshoot), slower than the page, and ends mid screen.
// hold: from the meet the pair stays put on screen for at least one screen of scroll, then both leave at
//   page speed together.
// chip: the insight chip sits where each Figma frame puts it above the phone centre, right aligned, and
//   holds with the pair.
// smooth: the live page on the GPU with Lenis and wheel input. The phone is never a frame behind the scroll,
//   the pair does not shake through the hold, nothing repaints during it and frames hold 60 fps.
// reduced: with reduced motion the phone shows frame 2 and does not move inside the block while scrolling.
// CHECK_PLANT=1 plants a mistake for the chosen check (the other frame's phone for start and end, a changed
// line of chat-rotate.js for the rest); the check must then fail.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const which = process.argv[2];
if (!["start", "end", "text", "path", "hold", "chip", "smooth", "reduced"].includes(which)) { console.error("usage: start|end|text|path|hold|chip|smooth|reduced"); process.exit(2); }

// Figma, block coordinates at 1440: frame 1 phone centre, frame 2 phone centre relative to the paragraph,
// and each Mokker rectangle's top left relative to its phone centre.
const F1 = { cx: 981.51, cy: 415.22, rect: [746 - 981.51, 72 - 415.22, 477.15, 704.16] };
const F2 = { rect: [735 - 891.67, 72 - 396.34, 313.71, 648.19] };
// The paragraph sits under the phone at the start (frame 1) and beside it when they meet (frame 2).
const PARA = { x: 274, startOff: 839 - 415.22, endOff: 383 - 396.34 };
// The chip: its top above the phone centre in each frame, its right edge on the block's.
const CHIP = { startOff: 0 - 415.22, endOff: 0 - 396.34 };

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
const live = which === "smooth";   // real GPU and not flagged as automation, so Lenis and the entrances run as on the page
const browser = await chromium.launch({ channel: "chrome", headless: true, args: [...(live ? ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--disable-blink-features=AutomationControlled"] : ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"]), "--force-color-profile=srgb", "--hide-scrollbars"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: live ? 2 : 1, reducedMotion: which === "reduced" ? "reduce" : "no-preference" });
const page = await ctx.newPage();
const plant = process.env.CHECK_PLANT === "1";
const PLANTS = {
  text: ["px: 274 * g", "px: 300 * g"],                                  // paragraph off its Figma spot
  path: ["L1.sGo = top + L1.y1 - vh;", "L1.sGo = top + L1.y1 - L1.half - vh;"],   // starts early (round 6)
  hold: ["const HOLD = 1.0;", "const HOLD = 0.75;"],                      // the round 7 draft hold
  reduced: ["const u = reduced ? 1 :", "const u = reduced ? 0 :"],        // reduced shows frame 1
  smooth: ["if (window.gsap) window.gsap.ticker.add(draw);", ""],         // scroll event only: a frame behind
  chip: ["chip.style.transform = `translateY(${cy - above}px)`;", ""],   // chip left at the block top
};
if (plant && PLANTS[which]) await page.route("**/chat-rotate.js", async (route) => {
  const res = await route.fetch(), body = await res.text(), [a, b] = PLANTS[which];
  if (!body.includes(a)) throw new Error(`plant target missing: ${a}`);
  await route.fulfill({ response: res, body: body.replace(a, b) });
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(`${base}/site/motion-lab/chat-rotate.html`, { waitUntil: "load" });
await page.evaluate(async () => { await document.fonts.ready; await window.ready; });

// Scroll to a position and report the phone centre, the paragraph and the turn, in block coordinates and on
// screen. where: "start" (scroll 0), "go", "meet", "off" (end of the hold) or a number, plus an offset.
const state = (where, plus = 0) => page.evaluate(async ([where, plus]) => {
  const api = await window.ready;
  const block = document.querySelector(".cr-block"), sec = document.getElementById("chat-rotate");
  api.draw();
  const d = sec.dataset, at = { start: 0, go: +d.go, meet: +d.meet, off: +d.meet + +d.holdLen }[where] ?? where;
  scrollTo(0, at + plus); api.draw();
  const b = block.getBoundingClientRect(), h = document.querySelector(".cr-phone").getBoundingClientRect(), p = document.querySelector(".cr-para").getBoundingClientRect(), c = document.querySelector(".cr-pill").getBoundingClientRect();
  return { scroll: scrollY, op: +getComputedStyle(document.querySelector(".cr-para .tb-item")).opacity, turn: +sec.dataset.turn,
    cx: h.left + h.width / 2 - b.left, cy: h.top + h.height / 2 - b.top, px: p.left - b.left, py: p.top - b.top,
    sy: h.top + h.height / 2, spy: p.top, chy: c.top, chOff: c.top - (h.top + h.height / 2), chRight: b.right - c.right, holdLen: +d.holdLen, vh: innerHeight, box: h.width };
}, [where, plus]);

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
  const s = await state(which === "start" ? "start" : "meet");
  // The plant swaps in the other frame's phone.
  const first = (which === "start") !== plant;
  const m = await iou(`${base}/docs/motion/chat-rotate/ref-${first ? "f1" : "f2"}.png`, first ? F1.rect : F2.rect);
  out = { ...s, ...m };
  const placed = which === "start" ? Math.hypot(s.cx - F1.cx, s.cy - F1.cy) < 1 : Math.abs(s.sy - s.vh / 2) < 1;
  ok = m.iou >= 0.96 && placed && s.turn === (which === "start" ? 0 : 1);
} else if (which === "text") {
  const a = await state("start"), b = await state("meet"), mids = [];
  for (let f = 0.25; f < 1; f += 0.25) mids.push(await state("go", f * (b.scroll - (await state("go")).scroll)));
  out = { start: a.py - a.cy, end: b.py - b.cy, x: [a.px, b.px], want: PARA, opacity: [a.op, b.op], paraY: [a.py, ...mids.map((m) => m.py), b.py] };
  const still = out.paraY.every((y) => Math.abs(y - a.py) < 0.5);
  ok = still && a.op === 1 && b.op === 1 && Math.abs(out.start - PARA.startOff) <= 4 && Math.abs(out.end - PARA.endOff) <= 4 && Math.abs(a.px - PARA.x) <= 1 && Math.abs(b.px - PARA.x) <= 1;
} else if (which === "path") {
  const go = await state("go"), early = await state("go", -40), meet = await state("meet"), ys = [];
  for (let s = go.scroll; s <= meet.scroll; s += 20) ys.push((await state(s)).sy);
  ys.push(meet.sy);
  const steps = ys.slice(1).map((y, i) => y - ys[i]);
  out = { goCentre: go.sy, vh: go.vh, turnBefore: early.turn, turnAtGo: go.turn, meetCentre: meet.sy, maxStep: Math.max(...steps), minStep: Math.min(...steps) };
  // Rising only (each 20 px of scroll moves it up 0 to 20 px), starting with its centre at the screen bottom.
  ok = early.turn === 0 && go.turn === 0 && Math.abs(go.sy - go.vh) < 1 && out.maxStep <= 0.01 && out.minStep >= -20.01 && Math.abs(meet.sy - meet.vh / 2) < 1;
} else if (which === "hold") {
  const meet = await state("meet"), off = await state("off"), after = await state("off", 200), mids = [];
  for (let f = 0.25; f < 1; f += 0.25) mids.push(await state("meet", f * meet.holdLen));
  out = { holdLen: meet.holdLen, vh: meet.vh, phoneY: [meet.sy, ...mids.map((m) => m.sy), off.sy], paraY: [meet.spy, ...mids.map((m) => m.spy), off.spy], after: [after.sy - off.sy, after.spy - off.spy] };
  const put = out.phoneY.every((y) => Math.abs(y - meet.sy) < 0.5) && out.paraY.every((y) => Math.abs(y - meet.spy) < 0.5);
  ok = put && meet.holdLen >= meet.vh - 0.5 && Math.abs(out.after[0] + 200) < 0.5 && Math.abs(out.after[1] + 200) < 0.5 && meet.turn === 1;
} else if (which === "smooth") {
  await page.evaluate(() => { const h = document.querySelector(".cr-phone"), pa = document.querySelector(".cr-para"), sec = document.getElementById("chat-rotate");
    window.__haven.lenis.scrollTo(+sec.dataset.go - 300, { immediate: true }); window.__s = [];
    window.gsap.ticker.add(() => { const d = sec.dataset, r = h.getBoundingClientRect(); window.__s.push([performance.now(), scrollY, r.top + r.height / 2, pa.getBoundingClientRect().top, +d.paints, +d.y]); }); });
  await page.waitForTimeout(400); await page.mouse.move(720, 450);
  const d = await page.evaluate(() => { const x = document.getElementById("chat-rotate").dataset; return { go: +x.go, meet: +x.meet, len: +x.holdLen }; });
  const end = d.meet + d.len + 150, t0 = Date.now();
  while (Date.now() - t0 < 30000 && await page.evaluate(() => scrollY) < end) { await page.mouse.wheel(0, 19); await page.waitForTimeout(25); }
  const s = await page.evaluate(() => window.__s);
  const dts = s.slice(1).map((r, i) => r[0] - s[i][0]).sort((a, b) => a - b), p95 = dts[Math.floor(dts.length * 0.95)];
  const moved = s.filter((r, i) => i && r[1] !== s[i - 1][1]);
  const hold = moved.filter((r) => r[1] > d.meet + 20 && r[1] < d.meet + d.len - 20), travel = moved.filter((r) => r[1] > d.go + 20 && r[1] < d.meet - 20);
  const spread = (a) => Math.max(...a) - Math.min(...a);
  out = { frames: s.length, p95, holdFrames: hold.length, phoneShake: spread(hold.map((r) => r[2])), paraShake: spread(hold.map((r) => r[3])), holdPaints: hold.at(-1)[4] - hold[0][4], travelFrames: travel.length, stale: travel.filter((r) => r[5] !== r[1]).length };
  ok = hold.length > 30 && travel.length > 30 && out.phoneShake < 0.5 && out.paraShake < 0.5 && out.holdPaints === 0 && out.stale === 0 && p95 < 20;
} else if (which === "chip") {
  const a = await state("start"), m = await state("meet"), mid = await state("meet", m.holdLen / 2), off = await state("off");
  out = { start: a.chOff, end: m.chOff, want: CHIP, right: [a.chRight, m.chRight], heldY: [m.chy, mid.chy, off.chy] };
  ok = Math.abs(a.chOff - CHIP.startOff) <= 2 && Math.abs(m.chOff - CHIP.endOff) <= 2 && Math.abs(a.chRight) < 1 && Math.abs(m.chRight) < 1
    && out.heldY.every((y) => Math.abs(y - m.chy) < 0.5) && m.chy >= 0;
} else {
  const a = await state("start"), b = await state("off", 400);
  out = { a, b };
  out.offset = a.py - a.cy;
  ok = Math.abs(out.offset - PARA.endOff) <= 4 && a.turn === 1 && b.turn === 1 && Math.abs(a.cx - b.cx) < 0.5 && Math.abs(a.cy - b.cy) < 0.5;
}
console.log(JSON.stringify(out));
if (errors.length) { console.log("page errors:", errors.join(" | ")); ok = false; }
await browser.close(); server.close();
console.log(ok ? { start: "START_MATCH", end: "END_MATCH", text: "TEXT_MATCH", path: "PATH_RISES", hold: "HOLD_SCREEN", chip: "CHIP_RIDES", smooth: "SMOOTH_LIVE", reduced: "REDUCED_STILL" }[which] : "FAILED");
process.exit(ok ? 0 : 1);
