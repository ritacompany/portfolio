// Compares every section of each page in the combined build against the branch that holds its newest version.
// For each page and width it screenshots each section (matched by its label or Figma node) on both sides and
// reports same, or differs with the share of pixels changed. Usage:
//   node compare.mjs <combined url> <label>=<url> ... with the jobs list below.
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { writeFileSync } from "node:fs";
const C = "http://127.0.0.1:4601", S = "http://127.0.0.1:4602", R = "http://127.0.0.1:4603";
const OUT = "reports/go-live-check-2026-11-27/";
// page, path, widths, source the newest version lives on
const jobs = [
  ["home", "/", [390, 768, 1440], S, "sharp-turing"],
  ["haven", "/haven/", [390, 768, 1440], S, "sharp-turing"],
  ["framework", "/mondai/framework/", [768, 1440], R, "relaxed-ride"],
  ["framework", "/mondai/framework/", [390], S, "sharp-turing"],
  ["collection", "/mondai/", [390, 1440], S, "sharp-turing"],
];
const SECTIONS = "body > header, nav.navbar, main > section, section.fw-sec, .ending-bar, footer, main > div > section";
async function shots(browser, url, w) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  await ctx.clock.install({ time: new Date("2026-11-27T22:24:00-06:00") });
  const p = await ctx.newPage();
  const res = await p.goto(url, { waitUntil: "load" }).catch(() => null);
  if (!res || res.status() >= 400) { await ctx.close(); return null; }
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
  await p.waitForTimeout(800);
  const keys = await p.evaluate((sel) => [...document.querySelectorAll(sel)].map((e, i) => {
    const k = e.getAttribute("aria-label") || e.getAttribute("data-figma-node") || e.getAttribute("data-node") || e.id || (e.tagName.toLowerCase() + "." + (e.className || "").toString().split(" ")[0]);
    e.setAttribute("data-cmp", String(i)); return k;
  }), SECTIONS);
  const out = {};
  for (let i = 0; i < keys.length; i++) {
    const el = p.locator(`[data-cmp="${i}"]`);
    const box = await el.boundingBox().catch(() => null);
    if (!box || box.width < 2 || box.height < 2) continue;
    let k = keys[i], n = 2; while (out[k]) k = keys[i] + "#" + n++;
    out[k] = await el.screenshot({ animations: "disabled" }).catch(() => null);
  }
  await ctx.close();
  return out;
}
const b = await chromium.launch();
const lines = [];
for (const [page, path, widths, src, srcName] of jobs) for (const w of widths) {
  const a = await shots(b, C + path, w), z = await shots(b, src + path, w);
  if (!a || !z) { lines.push(`${page} ${w}: page missing on ${!a ? "combined" : srcName}`); continue; }
  for (const k of new Set([...Object.keys(a), ...Object.keys(z)])) {
    if (!a[k]) { lines.push(`${page} ${w} | ${k}: only on ${srcName}`); continue; }
    if (!z[k]) { lines.push(`${page} ${w} | ${k}: only in combined`); continue; }
    const A = PNG.sync.read(a[k]), Z = PNG.sync.read(z[k]);
    if (A.width !== Z.width || A.height !== Z.height) { lines.push(`${page} ${w} | ${k}: size ${Z.width}x${Z.height} on ${srcName}, ${A.width}x${A.height} combined`); writeFileSync(`${OUT}diffs/${page}-${w}-${k.replace(/[^\w-]+/g, "_")}-combined.png`, a[k]); writeFileSync(`${OUT}diffs/${page}-${w}-${k.replace(/[^\w-]+/g, "_")}-source.png`, z[k]); continue; }
    const D = new PNG({ width: A.width, height: A.height });
    const n = pixelmatch(A.data, Z.data, D.data, A.width, A.height, { threshold: 0.1 });
    const pct = (100 * n / (A.width * A.height));
    if (n > 0) { lines.push(`${page} ${w} | ${k}: ${pct.toFixed(2)}% of pixels differ from ${srcName}`); writeFileSync(`${OUT}diffs/${page}-${w}-${k.replace(/[^\w-]+/g, "_")}-diff.png`, PNG.sync.write(D)); writeFileSync(`${OUT}diffs/${page}-${w}-${k.replace(/[^\w-]+/g, "_")}-combined.png`, a[k]); writeFileSync(`${OUT}diffs/${page}-${w}-${k.replace(/[^\w-]+/g, "_")}-source.png`, z[k]); }
    else lines.push(`${page} ${w} | ${k}: same`);
  }
}
await b.close();
writeFileSync(OUT + "compare.txt", lines.join("\n") + "\n");
console.log(lines.filter((l) => !l.endsWith(": same")).join("\n"));
console.log(`COMPARE_DONE ${lines.length} sections, ${lines.filter((l) => l.endsWith(": same")).length} same`);
