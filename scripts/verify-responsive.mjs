// Phase 3 gates: the built pages below and between the 1440 frame.
//   fit      every visible text, image and control sits inside the viewport and is not cut off by a
//            clipping parent. Exempt: elements marked data-bleed (type drawn to run off the edge on
//            purpose) and anything inside a sideways scroller (overflow-x auto or scroll), where the
//            scroller itself must fit.
//   overlap  no two pieces of text overlap, and no text sits on a content image, unless the element
//            is marked data-overlay (drawn over an image on purpose, like Learn more on the Mondai card).
//   size     no text renders under the floor: 12 px below 1200, 10 px from 1200 (Framework CS keeps its
//            1440 composition there, scaled to the window).
//   health   no horizontal scroll, failed request, console error or unrendered image.
// Widths: 390, 768, 1024, 1200 and 1366, or --widths 390,768. Prints its token only when every page
// at every width passed, and exits 1 otherwise.
// Usage: node scripts/verify-responsive.mjs <mode> <page|all> [--widths 390,768] [--shots <dir>]

import { createServer } from "node:http";
import { readFileSync, statSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const PAGES = { home: "/", collection: "/mondai/", framework: "/mondai/framework/", haven: "/haven/" };
// Haven keeps its own body layout and responsive rules (site/haven/current.css), with overlaps and
// bleeds drawn on purpose; on Haven only the shared parts are checked for fit, overlap and size.
const SCOPE = { haven: ".page-header, .navbar, .footer, .ending-bar" };
const argv = process.argv.slice(2);
const [mode, key] = argv;
const opt = (name) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : null);
const widths = (opt("--widths") || "390,768,1024,1200,1366").split(",").map(Number);
const shotsDir = opt("--shots");
const fail = (msg) => { console.error(msg); process.exit(1); };
if (!["fit", "overlap", "size", "health"].includes(mode)) fail(`unknown mode ${mode}`);
const keys = key === "all" ? Object.keys(PAGES) : key.split(",");
for (const k of keys) if (!PAGES[k]) fail(`unknown page ${k}`);

const repo = resolve(new URL("..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const problems = [];
let runs = 0;

try {
  for (const k of keys) for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const consoleErrors = [], failed = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
    page.on("pageerror", (e) => consoleErrors.push(String(e)));
    page.on("requestfailed", (r) => failed.push(r.url()));
    page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
    await page.goto(base + PAGES[k], { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; }));
    await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
    if (shotsDir) { mkdirSync(shotsDir, { recursive: true }); await page.screenshot({ path: join(shotsDir, `${k}-${w}.png`), fullPage: true }); }
    const at = `${k} @${w}`;

    if (mode === "health") {
      const sw = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
      if (sw.s > sw.c) problems.push(`${at}: horizontal scroll ${sw.s} > ${sw.c}`);
      if (failed.length) problems.push(`${at}: failed requests ${failed.join(", ")}`);
      if (consoleErrors.length) problems.push(`${at}: console errors ${consoleErrors.join(" | ")}`);
      const blank = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.getAttribute("src")));
      if (blank.length) problems.push(`${at}: images that did not render ${blank.join(", ")}`);
    } else {
      const found = await page.evaluate(({ mode, w, scope }) => {
        const out = [];
        const inScope = (e) => !scope || e.closest(scope);
        const vw = document.documentElement.clientWidth;
        const SEL = "h1,h2,h3,h4,p,li,a,button,img,svg,time,span,figcaption,label,video";
        const visible = (e) => {
          const cs = getComputedStyle(e);
          if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) return false;
          const r = e.getBoundingClientRect();
          return r.width > 0.5 && r.height > 0.5;
        };
        const hiddenByAncestor = (e) => { for (let a = e; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.display === "none" || +cs.opacity === 0 || cs.visibility === "hidden") return true; } return false; };
        const name = (e) => {
          const n = e.getAttribute("data-figma-node"), c = typeof e.className === "string" ? e.className.split(" ")[0] : "";
          const t = (e.getAttribute("alt") || e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
          return `<${e.tagName.toLowerCase()}${c ? "." + c : ""}${n ? " " + n : ""}> "${t}"`;
        };
        const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        const textRect = (e) => {
          const range = document.createRange(); let box = null;
          for (const n of e.childNodes) {
            if (n.nodeType !== 3 || !n.textContent.trim()) continue;
            range.selectNodeContents(n);
            for (const r of range.getClientRects()) {
              if (r.width < 0.5) continue;
              box = box ? { l: Math.min(box.l, r.left), t: Math.min(box.t, r.top), r: Math.max(box.r, r.right), b: Math.max(box.b, r.bottom), rects: [...box.rects, r] } : { l: r.left, t: r.top, r: r.right, b: r.bottom, rects: [r] };
            }
          }
          return box;
        };

        if (mode === "fit") {
          for (const e of document.body.querySelectorAll(SEL)) {
            if (!inScope(e) || !visible(e) || hiddenByAncestor(e) || e.closest("[data-bleed], svg *, .visually-hidden, [hidden], .footer__pill > *")) continue;
            if (e.tagName === "SPAN" && !ownText(e) && !e.matches(".button__icon,.button__label,.context__icon,.badge,.footer__pill")) continue;
            let r = e.getBoundingClientRect();
            if (ownText(e) && !e.matches("img,svg")) { const t = textRect(e); if (t) r = { left: t.l, right: t.r, top: t.t, bottom: t.b }; }
            let scroller = false, clip = { left: 0, right: vw };
            for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) {
              const ox = getComputedStyle(a).overflowX;
              if (ox === "auto" || ox === "scroll") { scroller = true; break; }
              if (ox === "hidden" || ox === "clip") { const ar = a.getBoundingClientRect(); clip = { left: Math.max(clip.left, ar.left), right: Math.min(clip.right, ar.right) }; }
            }
            if (scroller) continue;
            if (r.left < clip.left - 1 || r.right > clip.right + 1) out.push(`${name(e)} spans ${r.left.toFixed(0)} to ${r.right.toFixed(0)}, visible ${clip.left.toFixed(0)} to ${clip.right.toFixed(0)}`);
          }
          for (const s of document.querySelectorAll("*")) {
            const ox = getComputedStyle(s).overflowX;
            if ((ox === "auto" || ox === "scroll") && s !== document.documentElement && s !== document.body && visible(s)) {
              const r = s.getBoundingClientRect();
              if (r.left < -1 || r.right > vw + 1) out.push(`scroller ${name(s)} spans ${r.left.toFixed(0)} to ${r.right.toFixed(0)}`);
            }
          }
        }

        if (mode === "overlap" || mode === "size") {
          const texts = [...document.body.querySelectorAll("*")].filter((e) => inScope(e) && ownText(e) && visible(e) && !hiddenByAncestor(e) && !e.closest(".visually-hidden, svg"));
          if (mode === "size") {
            const floor = w >= 1200 ? 10 : 12;
            for (const e of texts) {
              const z = (() => { let f = 1; for (let a = e; a; a = a.parentElement) { const v = parseFloat(getComputedStyle(a).zoom); if (v) f *= v; } return f; })();
              const px = parseFloat(getComputedStyle(e).fontSize) * z;
              if (px < floor - 0.05) out.push(`${name(e)} renders at ${px.toFixed(1)} px, floor ${floor}`);
            }
          } else {
            const boxes = texts.map((e) => ({ e, t: textRect(e) })).filter((x) => x.t);
            const hit = (a, b) => { for (const r of a.rects) for (const s of b.rects) { const x = Math.min(r.right, s.right) - Math.max(r.left, s.left), y = Math.min(r.bottom, s.bottom) - Math.max(r.top, s.top); if (x > 1 && y > 1) return true; } return false; };
            // An image's visible part: its box cut by every parent that clips overflow.
            const clipped = (e) => {
              const b = e.getBoundingClientRect(); let r = { left: b.left, top: b.top, right: b.right, bottom: b.bottom };
              for (let a = e.parentElement; a && a !== document.documentElement; a = a.parentElement) {
                const cs = getComputedStyle(a);
                if (cs.overflowX !== "visible" || cs.overflowY !== "visible") { const q = a.getBoundingClientRect(); r = { left: Math.max(r.left, q.left), top: Math.max(r.top, q.top), right: Math.min(r.right, q.right), bottom: Math.min(r.bottom, q.bottom) }; }
              }
              return r.right - r.left > 1 && r.bottom - r.top > 1 ? r : null;
            };
            const allowed = (e) => e.closest("[data-overlay], [data-bleed]");
            // Decorative bleed type (aria-hidden and data-bleed, e.g. the phone hero's CHDWCK turned a
            // quarter): text ranges report the full em box, ascender space included, which on turned type
            // lands across the column beside it. Its ink is checked against the frame instead (10 Nov:
            // 25 px clear of the text column at 390, measured from the glyph bounds).
            const decorative = (e) => e.closest("[aria-hidden='true'][data-bleed]");
            for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
              const a = boxes[i], b = boxes[j];
              if (a.e.contains(b.e) || b.e.contains(a.e) || (allowed(a.e) && allowed(b.e)) || decorative(a.e) || decorative(b.e)) continue;
              if (hit(a.t, b.t)) out.push(`text ${name(a.e)} overlaps text ${name(b.e)}`);
            }
            const imgs = [...document.querySelectorAll("img")].filter((i) => inScope(i) && visible(i) && !hiddenByAncestor(i) && !i.closest("[data-bleed], .footer__transition, .footer__pill, .button, .navbar, .footer__back, .footer__out, .hero__move, .ending-bar, .collection__mark") && i.getBoundingClientRect().width > 40);
            for (const x of boxes) {
              if (allowed(x.e)) continue;
              for (const img of imgs) {
                if (img.contains(x.e) || x.e.contains(img)) continue;
                const r = clipped(img);
                if (r && hit(x.t, { rects: [r] })) out.push(`text ${name(x.e)} sits on image ${name(img)}`);
              }
            }
          }
        }
        return out;
      }, { mode, w, scope: SCOPE[k] || null });
      for (const f of found) problems.push(`${at}: ${f}`);
    }
    runs++;
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}

if (problems.length) fail(`${problems.length} problem(s)\n${problems.join("\n")}`);
console.log(`RESPONSIVE_${mode.toUpperCase()}_OK ${runs} page widths`);
