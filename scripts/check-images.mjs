// Image check for every shipped page (17 Nov 2026, his yes, after the Haven page shipped 1x pictures that blur
// on sharp screens). Two questions per picture, at each width, on a 2x (Retina) screen:
//   sharp   the file has at least as many pixels as the screen draws for it. A picture drawn 680 points wide
//           on a 2x screen needs 1360 pixels; with fewer the browser stretches it and it looks soft.
//           5 percent slack. Measured from the file's real pixels, so a srcset 2x file counts correctly.
//   weight  no single picture file over 500 KB; heavier files make the page slow on a phone.
// Covers <img> tags and CSS background pictures. SVG is vector and always sharp, so it is skipped.
// A picture that is meant to be soft (a blurred backdrop) can carry data-soft-ok="<reason>" in the HTML;
// the reason is printed every run so the exception stays visible.
// Prints IMAGES_OK only when every page at every width passed, and exits 1 otherwise.
// Usage: node scripts/check-images.mjs [all|home,collection,framework,haven] [--widths 390,768,1024,1440] [--max-kb 500]

import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const PAGES = { home: "/", collection: "/mondai/", framework: "/mondai/framework/", haven: "/haven/" };
const argv = process.argv.slice(2);
const opt = (name, d) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : d);
const key = argv[0] && !argv[0].startsWith("--") ? argv[0] : "all";
const keys = key === "all" ? Object.keys(PAGES) : key.split(",");
for (const k of keys) if (!PAGES[k]) { console.error(`unknown page ${k}`); process.exit(1); }
const widths = opt("--widths", "390,768,1024,1440").split(",").map(Number);
const maxKB = Number(opt("--max-kb", "500"));
const SLACK = 1.05, DPR = 2;

const repo = resolve(new URL("..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p).toLowerCase()] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const soft = [], heavy = new Map(), allowed = new Set();
let measured = 0;

for (const k of keys) for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: DPR, reducedMotion: "reduce" });
  page.on("response", async (r) => {
    const url = r.url();
    if (r.request().resourceType() !== "image" || /\.svg(\?|$)/i.test(url)) return;
    try { const kb = (await r.body()).length / 1024; if (kb > maxKB) heavy.set(url.replace(base, ""), Math.round(kb)); } catch {}
  });
  await page.goto(base + PAGES[k], { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
  await page.evaluate(() => document.fonts.ready);
  // Scroll the whole page so scroll triggered pictures load, then come back to the top.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");
  const rows = await page.evaluate(async (DPR) => {
    // The file's own pixels: load the chosen file on its own, outside srcset, so a 2x file is not halved.
    const filePixels = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok([i.naturalWidth, i.naturalHeight]); i.onerror = () => ok(null); i.src = src; });
    const out = [];
    const visible = (e, r) => r.width > 1 && r.height > 1 && getComputedStyle(e).visibility !== "hidden";
    for (const img of document.querySelectorAll("img")) {
      const src = img.currentSrc || img.src, r = img.getBoundingClientRect();
      if (!src || /\.svg(\?|#|$)/i.test(src) || src.startsWith("data:image/svg") || !visible(img, r)) continue;
      const px = await filePixels(src); if (!px) continue;
      out.push({ src, px, box: [r.width, r.height], ok: img.closest("[data-soft-ok]")?.dataset.softOk || null });
    }
    for (const e of document.querySelectorAll("body *")) {
      const bg = getComputedStyle(e).backgroundImage, m = bg && bg.match(/url\("?([^")]+\.(?:png|jpe?g|webp|avif|gif))"?\)/i);
      const r = e.getBoundingClientRect();
      if (!m || !visible(e, r)) continue;
      const px = await filePixels(m[1]); if (!px) continue;
      out.push({ src: m[1], px, box: [r.width, r.height], ok: e.closest("[data-soft-ok]")?.dataset.softOk || null, bg: true });
    }
    // Cover crops, so the stretch is the larger of the two directions.
    return out.map((o) => ({ ...o, up: Math.max((o.box[0] * DPR) / o.px[0], (o.box[1] * DPR) / o.px[1]) }));
  }, DPR);
  measured += rows.length;
  for (const r of rows) {
    if (r.up <= SLACK) continue;
    const file = r.src.replace(base, "");
    if (r.ok) { allowed.add(`${file}: ${r.ok}`); continue; }
    soft.push(`${k} at ${w}: ${file} is stretched ${r.up.toFixed(2)} times (file ${r.px[0]}x${r.px[1]} px, needs ${Math.ceil(r.box[0] * DPR)}x${Math.ceil(r.box[1] * DPR)})${r.bg ? " [css background]" : ""}`);
  }
  await page.close();
}
await browser.close(); server.close();

for (const a of allowed) console.log(`allowed soft: ${a}`);
if (soft.length) { console.log(`\nSOFT on a 2x screen (${soft.length}):`); soft.forEach((s) => console.log("  " + s)); }
if (heavy.size) { console.log(`\nHEAVY, over ${maxKB} KB (${heavy.size}):`); for (const [f, kb] of heavy) console.log(`  ${f} is ${kb} KB`); }
if (soft.length || heavy.size) {
  console.error(`\nimage check failed: ${soft.length} soft, ${heavy.size} heavy (${measured} pictures measured on ${keys.join(", ")} at ${widths.join(", ")})`);
  process.exit(1);
}
console.log(`IMAGES_OK ${measured} pictures measured on ${keys.join(", ")} at ${widths.join(", ")}`);
