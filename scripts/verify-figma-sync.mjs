// Figma sync gate, 10 Nov 2026: Home at 1440 and 402 against the values read from his Portfolio Design
// file (IarvWaqjIwrZ2afQmMxKm6): the VC master 4494:5909 for 1440 and the Mobile frames 4929:12379 for
// 402. Every expected value below was copied from that Figma read (docs/FIGMA_SYNC_2026-11-10.md), not
// from the CSS. Positions at 1440 are page coordinates of the master; footer positions are measured from
// the footer's top, because the site leaves out the Testimonials section he has on hold.
// Prints FIGMA_SYNC_OK and exits 0 only when every check passes.
// 11 Nov: lede and Selected works title re-read from the master (Neutral/200); see reports/figma-sync-2026-11/DIFF.md.
// Usage: node scripts/verify-figma-sync.mjs [--dump]

import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const repo = resolve(new URL("..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const dump = process.argv.includes("--dump");

// [selector, expected]. c: text colour, bg: background colour, line: inset top line colour, fw: weight,
// fs: size px, ls: tracking as a share of size, x/y/w/h: box (tol default 1.5), fy: y from the footer top,
// content: computed content url contains, text: textContent.
const desktop = [
  [".navbar__role", { c: "#7b7b86", x: 389.36 }],
  [".navbar__links .link-nav", { c: "#f2f1f8" }],
  [".hero__lede", { c: "#dedee5", fw: 500, fs: 20, ls: -0.02, x: 40, y: 468, w: 457, h: 66 }],
  [".hero__lede-wide", {
    text: "I’m a system-minded, nuance led designer, designing for what we know now, while leaving space for what may change our minds." }],
  [".hero__city", { c: "#7b7b86", x: 623, y: 498, tol: 1 }],
  [".hero__move img", { x: 623, y: 519, w: 16, tol: 1 }],
  [".hero__move span", { c: "#dedee5", fw: 400, fs: 16, x: 645, y: 521.5, tol: 1 }],
  [".hero__wordmark", { y: 580.51, h: 293, w: 1440, tol: 1 }],
  [".works", { line: "none" }],
  [".works__title", { c: "#dedee5", fs: 64, x: 518.5, y: 1064.5, w: 403 }],
  [".work-card-mondai", { x: 40, y: 1235.5, w: 879 }],
  [".work-card-mondai .work-card__name", { c: "#f2f1f8", x: 40, y: 1235.5 }],
  [".work-card__slashes", { c: "#dedee5", x: 117.06, y: 1237, tol: 2 }],
  [".work-card__kind", { c: "#dedee5", fw: 400, fs: 12, ls: 0.1, x: 139.11, y: 1238, tol: 2 }],
  [".work-card-mondai .work-card__desc", { c: "#dedee5", fw: 400, fs: 13.75, ls: 0.02, x: 609.64, y: 1237.5, tol: 1 }],
  [".work-card-mondai .work-card__media", { x: 40, y: 1265.21, w: 879 }],
  [".work-card-haven", { x: 957, w: 443 }],
  [".work-card-haven .work-card__name", { c: "#f2f1f8", x: 957, y: 1367.67 }],
  [".work-card-haven .work-card__desc", { c: "#dedee5", fs: 14, ls: 0.02, x: 1187.79, y: 1369.67, tol: 1 }],
  [".work-card-haven .work-card__media", { bg: "#0f0f1b", x: 957, y: 1397.38, w: 443, h: 443 }],
  [".work-card-haven .haven-art__clip img", { x: 941.29, y: 1396.88, w: 487.35, h: 429.82, tol: 1 }],
  [".about-story", { line: "#1d1d21", y: 2109.99, h: 543 }],
  [".about-story .about__label", { c: "#d2d2db", x: 40, y: 2142.99 }],
  [".about-story .about__body", { c: "#d2d2db", x: 741, y: 2142.99, w: 595 }],
  [".about-role", { line: "#1d1d21", y: 2652.99, h: 208 }],
  [".about-role .about__label", { c: "#d2d2db", x: 40, y: 2688.99 }],
  [".about__when", { c: "#7b7b86", x: 40, y: 2713.99 }],
  [".about-role .about__body", { c: "#d2d2db", x: 740, y: 2688.99, w: 650 }],
  [".footer", { line: "#1d1d21", h: 777 }],
  [".footer__back span", { c: "#7b7b86", x: 59.29, fy: 48.5 }],
  [".footer__nav li:first-child a", { c: "#e8e7ee", x: 40, fy: 122 }],
  [".footer__contact .footer__label", { c: "#7b7b86", x: 623, fy: 49 }],
  [".footer__email", { c: "#e8e7ee", x: 623, fy: 124 }],
  [".footer__note p:first-child", { c: "#4b4b52", fy: 166.01 }],
  [".footer__note p:last-child", { c: "#e8e7ee" }],
  [".footer__contact .button", { x: 623, fy: 268 }],
  [".footer__pill", { x: 1208.66, fy: 49, w: 85.95, h: 253.45 }],
  [".footer__meta", { c: "#4b4b52", x: 40, fy: 528.21 }],
  [".footer__out span", { c: "#e8e7ee", x: 762.83, fy: 528.01 }],
  [".footer__wordmark", { fy: 550.17, tol: 2 }]
];
const phone = [
  ["body", { bg: "#000000" }],
  [".navbar__role", { c: "#d2d2db" }],
  [".hero__vertical", { c: "#dedee5" }],
  [".hero__lede", { c: "#f2f1f8", fw: 500, fs: 16, ls: -0.01 }],
  [".hero__city", { c: "#7b7b86" }],
  [".hero__move span", { c: "#dedee5" }],
  [".hero__move img", { content: "dolly-200.svg" }],
  [".works__title", { c: "#f2f1f8", fs: 40 }],
  [".work-card__name", { c: "#dedee5" }],
  [".work-card__kind", { c: "#7b7b86", fw: 700 }],
  [".work-card-mondai .work-card__desc", { c: "#dedee5", fs: 13.75 }],
  [".work-card-haven .work-card__desc", { c: "#dedee5", fs: 13.75 }],
  [".work-card__more", { c: "#f2f1f8" }],
  [".about__row", { line: "#1d1d21" }],
  [".about-story .about__label", { c: "#d2d2db" }],
  [".about-role .about__label", { c: "#dedee5" }],
  [".about__when", { c: "#7b7b86" }],
  [".about__body", { c: "#d2d2db", fw: 500, fs: 16 }],
  [".footer", { bg: "#000000" }],
  [".footer__label", { c: "#7b7b86" }],
  [".footer__note p:first-child", { c: "#4b4b52" }],
  [".footer__out span", { c: "#e8e7ee" }],
  [".menu", { bg: "#000000" }],
  [".menu .navbar__logo img", { content: "logo-300.svg" }]
];
// Icon files: their one fill against the Figma vector fill.
const files = [
  ["assets/home/chdwck-hero.svg", "#dedee5"], ["assets/ui/dolly.svg", "#c9c9d4"], ["assets/ui/dolly-200.svg", "#dedee5"],
  ["assets/ui/logo.svg", "#f2f1f8"], ["assets/ui/logo-300.svg", "#d2d2db"], ["assets/ui/menu.svg", "#90909d"],
  ["assets/ui/close.svg", "#90909d"], ["assets/ui/chdwck.svg", "#f2f1f8"], ["assets/ui/arrow-out.svg", "#f2f1f8"], ["assets/ui/arrow-up.svg", "#7b7b86"]
];

const problems = [];
let checks = 0;
for (const [f, hex] of files) {
  checks++;
  const fills = [...readFileSync(join(root, f), "utf8").matchAll(/fill="(#[0-9a-fA-F]{6})"/g)].map((m) => m[1].toLowerCase());
  if (!fills.length || fills.some((x) => x !== hex)) problems.push(`${f}: fill ${fills.join(",")}, Figma ${hex}`);
}

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
try {
  for (const [w, h, list] of [[1440, 900, desktop], [402, 874, phone]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const got = await page.evaluate((list) => {
      const hex = (c) => { const m = c.match(/[\d.]+/g); return m ? "#" + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, "0")).join("") + (m[3] !== undefined && +m[3] < 1 ? "@" + m[3] : "") : c; };
      const ft = document.querySelector(".footer")?.getBoundingClientRect().top + scrollY;
      return list.map(([sel]) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = getComputedStyle(el), r = el.getBoundingClientRect();
        const sh = cs.boxShadow === "none" ? "none" : (cs.boxShadow.match(/rgba?\([^)]*\)/) || [""])[0];
        return { c: hex(cs.color), bg: hex(cs.backgroundColor), line: sh === "none" ? "none" : hex(sh), fw: +cs.fontWeight, fs: parseFloat(cs.fontSize),
          ls: cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing) / parseFloat(cs.fontSize),
          x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, fy: r.top + scrollY - ft, content: cs.content, text: el.textContent.trim() };
      });
    }, list);
    list.forEach(([sel, want], i) => {
      const g = got[i];
      const at = `${w} ${sel}`;
      if (dump) console.log(at, JSON.stringify(g && Object.fromEntries(Object.keys(want).filter((k) => k !== "tol").map((k) => [k, typeof g[k] === "number" ? +g[k].toFixed(2) : g[k]]))));
      if (!g) { problems.push(`${at}: not found`); checks++; return; }
      const tol = want.tol ?? 1.5;
      for (const [k, v] of Object.entries(want)) {
        if (k === "tol") continue;
        checks++;
        const have = g[k];
        let ok;
        if (k === "content") ok = String(have).includes(v);
        else if (typeof v === "number") ok = Math.abs(have - v) <= (["fw"].includes(k) ? 0 : ["fs"].includes(k) ? 0.01 : k === "ls" ? 0.0015 : tol);
        else ok = have === v;
        if (!ok) problems.push(`${at}: ${k} ${typeof have === "number" ? +have.toFixed(3) : have}, Figma ${v}`);
      }
    });
    await page.close();
  }
} finally { await browser.close(); server.close(); }

if (problems.length) { console.error(problems.join("\n")); console.error(`figma sync: ${problems.length} of ${checks} checks failed`); process.exit(1); }
console.log(`FIGMA_SYNC_OK ${checks} checks`);
