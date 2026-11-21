// Phase 1 gates for the built pages. Each page is described in scripts/figma-pages.json.
//   boxes   every listed element sits within 1 px of its Figma box at 1440 (a box may carry a
//           wider tol with its reason in why)
//   pixels  the page render against the Figma render, under 4 percent differing pixels
//   health  no horizontal scroll, failed request, console error or unrendered image at 1440
//   a11y    lang, one h1, alt on every img, named links, locked rows take no focus
//   shared  page CSS holds layout only: no hex colors and no font values outside tokens
// Each mode prints its success token only after every assertion passed, and exits 1 otherwise.
// Usage: node scripts/verify-pages.mjs <mode> <page> [--shots <dir>]

import { createServer } from "node:http";
import { readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const [mode, key] = process.argv.slice(2);
const shotsDir = process.argv.includes("--shots") ? process.argv[process.argv.indexOf("--shots") + 1] : null;
const repo = resolve(new URL("..", import.meta.url).pathname);
const root = join(repo, "site");
const fail = (msg) => { console.error(msg); process.exit(1); };

const spec = JSON.parse(readFileSync(join(repo, "scripts/figma-pages.json"), "utf8")).pages[key];
if (!spec) fail(`unknown page ${key}`);
if (!["boxes", "pixels", "health", "a11y", "shared"].includes(mode)) fail(`unknown mode ${mode}`);

if (mode === "shared") {
  const css = readFileSync(join(root, spec.css), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const problems = [];
  for (const m of css.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) problems.push(`hex color ${m[0]}`);
  for (const m of css.matchAll(/\b(font|font-size|font-family|letter-spacing|line-height)\s*:\s*([^;]+);/g)) {
    if (!/^var\(--[a-z0-9-]+\)$/.test(m[2].trim())) problems.push(`${m[1]}: ${m[2].trim()} is not a token`);
  }
  if (problems.length) fail(problems.join("\n"));
  console.log("SHARED_OK");
  process.exit(0);
}

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { const body = readFileSync(p); res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(body); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
// Reduced motion: the Figma frames are the pages at rest, and page entrances (text fades, media curtains)
// would otherwise leave everything below the first screen hidden in a full page shot
const page = await browser.newPage({ viewport: { width: spec.w, height: Math.min(spec.h, 900) }, deviceScaleFactor: 1, reducedMotion: "reduce" });
const consoleErrors = [], failed = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("requestfailed", (r) => failed.push(r.url()));
page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
await page.goto(base + spec.url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
// Lazy images below the fold would render empty in a full page shot: make them eager, then wait
// until every image has decoded (or 15 s pass, which the health mode then reports).
await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; }));
await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => {});
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));

const problems = [];
let token = "";
try {
  if (mode === "boxes") {
    let ok = 0;
    for (const b of spec.boxes) {
      const els = await page.$$(b.sel);
      if (els.length !== 1) { problems.push(`${b.name}: ${els.length} matches for ${b.sel}`); continue; }
      const box = await els[0].evaluate((e) => { const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }; });
      // A box measured against its section: the section may sit lower in code than in Figma when
      // copy above it runs longer, so y is compared from the section's top.
      if (b.rel) { const top = await page.$eval(b.rel.sel, (e) => e.getBoundingClientRect().y + scrollY); box.y = box.y - top + b.rel.y; }
      const off = ["x", "y", "w", "h"].filter((k) => k in b && Math.abs(box[k] - b[k]) > (b.tol || 1));
      if (off.length) problems.push(`${b.name}: ${off.map((k) => `${k} ${box[k].toFixed(2)} vs Figma ${b[k]}`).join(", ")}`);
      else ok++;
    }
    token = `BOXES_OK ${ok}/${spec.boxes.length}`;
  }

  if (mode === "pixels") {
    // Pages with sections compare section by section, each aligned on its own top, so a section that
    // grew for longer copy does not shift every section below it out of register.
    const full = await page.screenshot({ fullPage: true });
    if (shotsDir) { mkdirSync(shotsDir, { recursive: true }); writeFileSync(join(shotsDir, `${key}-code.png`), full); }
    const regions = spec.sections
      ? await Promise.all(spec.sections.map(async (r) => ({ ...r, cy: await page.$eval(r.sel, (e) => Math.round(e.getBoundingClientRect().y + scrollY)), ch: await page.$eval(r.sel, (e) => Math.round(e.getBoundingClientRect().height)) })))
      : [{ name: key, y: 0, h: spec.h, cy: 0, ch: spec.h }];
    const r = await page.evaluate(async ({ src, data, w, regions }) => {
      const load = (s) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = s; });
      const [fig, code] = await Promise.all([load(src), load("data:image/png;base64," + data)]);
      const out = [];
      for (const g of regions) {
        const h = Math.min(g.h, g.ch);
        const paint = (img, y0) => { const c = new OffscreenCanvas(w, h), x = c.getContext("2d"); x.fillStyle = "#000"; x.fillRect(0, 0, w, h); x.drawImage(img, 0, -y0); return x.getImageData(0, 0, w, h).data; };
        const a = paint(fig, Math.round(g.y)), b = paint(code, g.cy);
        let diff = Infinity;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          let d = 0;
          for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
            const xs = Math.min(w - 1, Math.max(0, x + dx)), ys = Math.min(h - 1, Math.max(0, y + dy));
            const i = (y * w + x) * 4, j = (ys * w + xs) * 4;
            if (Math.abs(a[i] - b[j]) > 64 || Math.abs(a[i + 1] - b[j + 1]) > 64 || Math.abs(a[i + 2] - b[j + 2]) > 64) d++;
          }
          diff = Math.min(diff, d);
        }
        out.push({ name: g.name, diff, total: w * h });
      }
      return { out, fw: fig.naturalWidth };
    }, { src: `${base}/${spec.image}`, data: full.toString("base64"), w: spec.w, regions });
    let diff = 0, total = 0;
    for (const g of r.out) { diff += g.diff; total += g.total; if (spec.sections) console.log(`  ${g.name} ${(100 * g.diff / g.total).toFixed(2)}%`); }
    const share = diff / total;
    console.log(`${key} ${(share * 100).toFixed(2)}%`);
    if (r.fw !== spec.w) problems.push(`Figma image is ${r.fw} wide, want ${spec.w}`);
    if (share > 0.04) problems.push(`${(share * 100).toFixed(2)}% of pixels differ, limit 4%`);
    token = "PIXELS_OK";
  }

  if (mode === "health") {
    const sw = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
    if (sw.s > sw.c) problems.push(`horizontal scroll: ${sw.s} > ${sw.c}`);
    if (failed.length) problems.push(`failed requests:\n${failed.join("\n")}`);
    if (consoleErrors.length) problems.push(`console errors:\n${consoleErrors.join("\n")}`);
    const blank = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
    if (blank.length) problems.push(`images that did not render:\n${blank.join("\n")}`);
    token = "HEALTH_OK";
  }

  if (mode === "a11y") {
    const r = await page.evaluate(() => {
      const name = (e) => (e.getAttribute("aria-label") || e.textContent || "").trim();
      return {
        lang: document.documentElement.lang,
        h1: document.querySelectorAll("h1").length,
        noAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src),
        unnamed: [...document.querySelectorAll("a[href]")].filter((a) => !name(a)).map((a) => a.outerHTML.slice(0, 80)),
        lockedLinks: [...document.querySelectorAll(".context-locked")].filter((e) => e.matches("a[href], button, [tabindex]") || e.querySelector("a[href], button, [tabindex]")).length,
        lockedState: [...document.querySelectorAll(".context-locked")].every((e) => e.getAttribute("aria-disabled") === "true"),
      };
    });
    if (!r.lang) problems.push("html has no lang");
    if (r.h1 !== 1) problems.push(`${r.h1} h1 elements`);
    if (r.noAlt.length) problems.push(`img without alt: ${r.noAlt.join(", ")}`);
    if (r.unnamed.length) problems.push(`links without a name: ${r.unnamed.join(", ")}`);
    if (r.lockedLinks) problems.push(`${r.lockedLinks} locked rows are or hold focusable controls`);
    if (!r.lockedState) problems.push("a locked row lacks aria-disabled");
    // Tab order: every row link is reachable and no locked row gets focus.
    const reached = [];
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const f = await page.evaluate(() => { const a = document.activeElement; return a && a !== document.body ? (a.closest(".context-locked") ? "LOCKED" : a.className) : null; });
      if (f) reached.push(f);
    }
    if (reached.includes("LOCKED")) problems.push("Tab reached a locked row");
    token = "A11Y_OK";
  }
} finally {
  await browser.close();
  server.close();
}

if (problems.length) fail(problems.join("\n"));
console.log(token);
