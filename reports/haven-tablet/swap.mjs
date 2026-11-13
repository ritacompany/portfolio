// Route swap: every element box on the Haven page with the tablet block in current.css and with it removed.
// 390, 1200 and 1440 must match exactly, reduced motion on. 768 and 1180 must differ (the positive control,
// proving the swap really removes the block). Prints HAVEN_SWAP_OK 3 widths.
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const on = await serve(false), off = await serve(true);
const boxes = async (base, w) => {
  const p = await browser.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: "reduce" });
  await p.goto(base + "/haven/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  const b = await p.evaluate(() => [...document.querySelectorAll("main *")].map((e) => { const r = e.getBoundingClientRect(); return [r.left, r.top + scrollY, r.width, r.height].map((v) => Math.round(v * 10) / 10).join(","); }));
  await p.close(); return b;
};
const problems = [];
for (const w of [390, 1200, 1440]) {
  const a = await boxes(on.base, w), b = await boxes(off.base, w);
  const diff = a.filter((v, i) => v !== b[i]).length + Math.abs(a.length - b.length);
  console.log(`${w}: ${a.length} boxes, ${diff} differ`);
  if (diff) problems.push(`${w}: ${diff} boxes move`);
}
for (const w of [768, 1180]) {
  const a = await boxes(on.base, w), b = await boxes(off.base, w);
  const diff = a.filter((v, i) => v !== b[i]).length;
  console.log(`${w} control: ${diff} differ`);
  if (!diff) problems.push(`${w}: control shows no difference, the swap is not removing the block`);
}
await browser.close(); on.server.close(); off.server.close();
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("HAVEN_SWAP_OK 3 widths");
