// CS2 results ending (20 Nov). Proves no other part of the framework page moves when the ending changes.
// "save" writes baseline.json from the page as it is; "check" (default) compares the page now against it.
// Every element inside every section except the ending (5812:21559) is measured in page coordinates,
// and the ending bar and footer relative to the ending's bottom edge, at 390, 768 and 1440, reduced motion.
// Prints STILL_OK <n> widths only when every box matches within 0.5 px.
import { writeFileSync, readFileSync } from "node:fs";
import { serve, chromium, open } from "../framework-tablet-2/serve.mjs";
const mode = process.argv[2] || "check";
const file = new URL("./baseline.json", import.meta.url).pathname;
const WIDTHS = [390, 768, 1440];
process.env.FIX_CLOCK = "1";
const { server, base } = await serve(false);
const b = await chromium.launch();
const all = {};
for (const w of WIDTHS) {
  const page = await open(b, base, w);
  all[w] = await page.evaluate(() => {
    const out = {}, sy = scrollY;
    const box = (e) => { const r = e.getBoundingClientRect(); return [r.left, r.top + sy, r.width, r.height].map((v) => Math.round(v * 100) / 100); };
    const end = document.querySelector('[data-figma-node="5812:21559"]');
    const endBottom = end.getBoundingClientRect().bottom + sy;
    let n = 0;
    for (const s of document.querySelectorAll(".fw-sec")) {
      if (s === end) continue;
      const k = s.dataset.figmaNode;
      out[`sec ${k}`] = box(s);
      [...s.querySelectorAll("*")].forEach((e, i) => { out[`${k} ${i} ${e.tagName}`] = box(e); n++; });
    }
    for (const sel of [".ending-bar", ".footer"]) { const e = document.querySelector(sel); const r = box(e); r[1] = Math.round((r[1] - endBottom) * 100) / 100; out[sel] = r; }
    out.count = n;
    return out;
  });
  await page.close();
}
b.close(); server.close();
if (mode === "save") { writeFileSync(file, JSON.stringify(all)); console.log(`BASELINE_SAVED ${WIDTHS.map((w) => all[w].count).join(" ")}`); process.exit(0); }
const was = JSON.parse(readFileSync(file, "utf8"));
if (process.env.CONTROL === "1") all[768][Object.keys(all[768])[0]][1] += 1; // positive control: one box moved 1 px must fail
const bad = [];
for (const w of WIDTHS) {
  const a = was[w], c = all[w];
  if (a.count !== c.count) bad.push(`${w}: ${a.count} elements before, ${c.count} now`);
  for (const k of Object.keys(a)) {
    if (k === "count") continue;
    if (!c[k]) { bad.push(`${w}: ${k} missing`); continue; }
    if (a[k].some((v, i) => Math.abs(v - c[k][i]) > 0.5)) bad.push(`${w}: ${k} was ${a[k]} now ${c[k]}`);
  }
}
if (bad.length) { console.log(bad.slice(0, 40).join("\n")); console.log(`${bad.length} moved`); process.exit(1); }
console.log(`STILL_OK ${WIDTHS.length} widths`);
