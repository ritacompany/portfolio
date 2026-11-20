// CS2 results ending (20 Nov). Screenshots of the ending at 390, 768, 1024, 1180 and 1440 into shots/, and
// prints ENDING_LAYOUT_OK when, at every width, nothing in the ending runs past the content edge, there is no
// sideways scroll, the three stats sit in one row from 768 up and in one column at 390.
import { mkdirSync } from "node:fs";
import { serve, chromium, open } from "../framework-tablet-2/serve.mjs";
const dir = new URL("./shots/", import.meta.url).pathname; mkdirSync(dir, { recursive: true });
const { server, base } = await serve(false);
const b = await chromium.launch();
const bad = [];
for (const w of [390, 768, 1024, 1180, 1440]) {
  const page = await open(b, base, w);
  const s = page.locator('[data-figma-node="5812:21559"]');
  await s.scrollIntoViewIfNeeded();
  await s.screenshot({ path: `${dir}ending-${w}.png` });
  const r = await page.evaluate(() => {
    const sec = document.querySelector('[data-figma-node="5812:21559"]'), sr = sec.getBoundingClientRect();
    const pad = parseFloat(getComputedStyle(sec).paddingRight) || 0;
    const z = parseFloat(getComputedStyle(document.querySelector(".fw")).zoom) || 1;
    const over = [...sec.querySelectorAll("*")].filter((e) => e.getBoundingClientRect().right > sr.right - pad * z + 0.5 && pad > 0).map((e) => e.className);
    const tops = [...sec.querySelectorAll(".fw-end__stat")].map((e) => Math.round(e.getBoundingClientRect().top));
    return { over, tops, side: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  });
  if (r.over.length) bad.push(`${w}: past the edge ${r.over.join(", ")}`);
  if (r.side) bad.push(`${w}: sideways scroll`);
  const oneRow = new Set(r.tops).size === 1;
  if (w >= 768 && !oneRow) bad.push(`${w}: stats not in one row ${r.tops}`);
  if (w < 768 && oneRow) bad.push(`${w}: stats not stacked`);
  await page.close();
}
b.close(); server.close();
if (bad.length) { console.log(bad.join("\n")); process.exit(1); }
console.log("ENDING_LAYOUT_OK 5 widths");
