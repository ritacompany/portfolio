// Proves the tablet block changes nothing outside 768 to 1199: at 390, 1200 and 1440 every element box on
// home is measured with the block on and with it removed, both runs reduced motion on and off.
// Prints ROUTE_SWAP_OK 3 widths <n> boxes only when every box matches.
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";

const srv = await serve();
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const diffs = [];
let boxes = 0;

async function measure(w, motion) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: motion });
  // The footer shows a live clock whose text width changes each second: freeze it so both runs match.
  await page.clock.setFixedTime(new Date("2026-11-13T22:24:00-06:00"));
  await page.goto(srv.base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(() => [...document.querySelectorAll("body *")].map((e, i) => {
    const b = e.getBoundingClientRect();
    return `${i} ${e.tagName} ${e.className} ${b.x.toFixed(2)} ${(b.y + scrollY).toFixed(2)} ${b.width.toFixed(2)} ${b.height.toFixed(2)}`;
  }));
  await page.close();
  return r;
}

for (const w of [390, 1200, 1440]) for (const motion of ["reduce", "no-preference"]) {
  srv.state.strip = false; const on = await measure(w, motion);
  srv.state.strip = true; const off = await measure(w, motion);
  if (on.length !== off.length) diffs.push(`${w} ${motion}: ${on.length} elements vs ${off.length}`);
  for (let i = 0; i < Math.min(on.length, off.length); i++) if (on[i] !== off[i]) diffs.push(`${w} ${motion}: ${on[i]} | ${off[i]}`);
  if (motion === "reduce") boxes += on.length;
}
await browser.close();
srv.close();
if (diffs.length) { console.error(diffs.slice(0, 20).join("\n")); console.error(`${diffs.length} boxes differ`); process.exit(1); }
console.log(`ROUTE_SWAP_OK 3 widths ${boxes} boxes`);
