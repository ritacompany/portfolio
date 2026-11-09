// His hover rule (9 Nov): a highlight changes the text colour and adds the light block behind it, and
// nothing moves, ever. This hovers every link, row and button on each page and compares the position of
// every single letter, and of every link on the page, before and during the hover. Any change over
// 0.05 px fails. It also logs the colours on every animation frame for 400 ms after the pointer arrives:
// a highlight is an instant swap, so any colour between rest and hover (a fade, which showed as a grey
// on grey flicker) fails. The Contact button is exempt: its liquid motion is a separate, parked piece.
// Work cards are exempt from the swap rule only: their hover is a motion piece reviewed on its own.
// Usage: node scripts/verify-hover-still.mjs <dir to serve, e.g. site or a preview build> [--width 1440]
// Prints HOVER_STILL_OK <n> hovers only when nothing moved.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const argv = process.argv.slice(2);
const root = resolve(argv[0] || "site");
const width = Number(argv.includes("--width") ? argv[argv.indexOf("--width") + 1] : 1440);
const PAGES = ["index.html", "mondai/index.html", "mondai/framework/index.html", "haven/index.html"];
const TARGETS = "a[href], .button-sm, .context";
const EXEMPT = ".button, .button *";
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const problems = [];
let hovers = 0;

// Every letter's box inside an element, plus the box of every target on the page.
const snapshot = () => window.__snap();
const install = (sel) => {
  window.__snap = () => {
    const letters = [];
    const range = document.createRange();
    for (const el of document.querySelectorAll(sel)) {
      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = walk.nextNode(); n; n = walk.nextNode()) {
        for (let i = 0; i < n.length; i++) {
          if (!n.data[i].trim()) continue;
          range.setStart(n, i); range.setEnd(n, i + 1);
          const r = range.getBoundingClientRect();
          letters.push([r.x + scrollX, r.y + scrollY, r.width, r.height]);
        }
      }
    }
    const boxes = [...document.querySelectorAll(sel)].map((e) => { const r = e.getBoundingClientRect(); return [r.x + scrollX, r.y + scrollY, r.width, r.height]; });
    return { letters, boxes };
  };
};
const diff = (a, b) => {
  let worst = 0;
  for (const k of ["letters", "boxes"]) for (let i = 0; i < a[k].length; i++) for (let j = 0; j < 4; j++) worst = Math.max(worst, Math.abs(a[k][i][j] - b[k][i][j]));
  return worst;
};

try {
  for (const pg of PAGES) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${base}/${pg}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(install, TARGETS);
    const count = await page.$$eval(TARGETS, (els, ex) => els.filter((e) => !e.matches(ex)).length, EXEMPT);
    for (let i = 0; i < count; i++) {
      const el = (await page.$$(TARGETS)).filter(Boolean)[i];
      const skip = await el.evaluate((e, ex) => e.matches(ex) || !e.getBoundingClientRect().width || getComputedStyle(e).visibility === "hidden", EXEMPT);
      if (skip) continue;
      await el.scrollIntoViewIfNeeded();
      await page.mouse.move(2, 450); await page.waitForTimeout(450);
      const before = await page.evaluate(snapshot);
      const bx = await el.boundingBox();
      if (!bx || bx.width < 1 || bx.height < 1) continue;
      const states = el.evaluate((e) => new Promise((res) => {
        const seen = new Set(), t0 = performance.now();
        const f = () => { seen.add([e, ...e.querySelectorAll("*")].map((x) => { const s = getComputedStyle(x); return s.color + s.backgroundColor + s.filter; }).join("|")); if (performance.now() - t0 < 400) requestAnimationFrame(f); else res(seen.size); };
        requestAnimationFrame(f);
      }));
      await page.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2);
      const nStates = await states; await page.waitForTimeout(50);
      const card = await el.evaluate((e) => !!e.closest(".work-card"));
      if (nStates > 2 && !card) {
        const name = await el.evaluate((e) => `<${e.tagName.toLowerCase()}.${(e.className || "").toString().split(" ")[0]}> "${(e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`);
        problems.push(`${pg}: hovering ${name} fades through ${nStates - 2} in-between frames instead of swapping`);
      }
      const during = await page.evaluate(snapshot);
      hovers++;
      const worst = diff(before, during);
      if (worst > 0.05) {
        const name = await el.evaluate((e) => `<${e.tagName.toLowerCase()}.${(e.className || "").toString().split(" ")[0]}> "${(e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 30)}"`);
        problems.push(`${pg}: hovering ${name} moved something by ${worst.toFixed(2)} px`);
      }
    }
    await page.close();
  }
} finally { await browser.close(); server.close(); }
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`HOVER_STILL_OK ${hovers} hovers`);
