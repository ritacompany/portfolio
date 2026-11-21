// Round 4, G1 and G2: the Capacity card's overlay sits exactly on the card at every width, the card keeps its
// desktop size at tablet, the cursor demo plays, and reduced motion mounts nothing.
// Run with the site served on 4318 (PORT=4318 node scripts/serve.mjs). Prints CAPCARD_OK or the failures.
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const URL = "http://localhost:4318/mondai/framework/";
const fails = [];
const b = await chromium.launch();
for (const [w, reduce] of [[390, false], [768, false], [1024, false], [1150, false], [1440, false], [768, true], [1440, true]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: reduce ? "reduce" : "no-preference" });
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.locator('img[data-figma-node="5812:17089"]').scrollIntoViewIfNeeded();
  let cursorSeen = false;
  for (let i = 0; i < 28; i++) {
    await p.waitForTimeout(250);
    const o = await p.evaluate(() => { const c = document.querySelector(".capdemo__cursor"); return c ? +getComputedStyle(c).opacity : 0; });
    if (o > 0.5) cursorSeen = true;
  }
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const i = document.querySelector('img[data-figma-node="5812:17089"]').getBoundingClientRect();
    const c = document.querySelector(".capdemo");
    const cb = c && c.getBoundingClientRect();
    return { img: [i.left, i.top, i.width, i.height], cap: cb && [cb.left, cb.top, cb.width, cb.height], num: c && c.querySelector(".capdemo__num")?.textContent };
  });
  const tag = `${w}${reduce ? " reduced" : ""}`;
  if (reduce) { if (r.cap) fails.push(`${tag}: overlay mounted with reduced motion`); }
  else {
    if (!r.cap) fails.push(`${tag}: no overlay`);
    else if (r.img.some((v, k) => Math.abs(v - r.cap[k]) > 0.5)) fails.push(`${tag}: overlay ${r.cap.map(Math.round)} vs card ${r.img.map(Math.round)}`);
    if (!cursorSeen) fails.push(`${tag}: cursor never shown`);
    if (r.num && !/6/.test(r.num)) fails.push(`${tag}: ends at ${r.num}, not 6`);
  }
  if (w >= 768 && w < 1160 && (Math.abs(r.img[2] - 308) > 0.5 || Math.abs(r.img[3] - 298) > 0.5)) fails.push(`${tag}: card ${r.img[2]} by ${r.img[3]}, not 308 by 298`);
  console.log(tag, JSON.stringify(r), cursorSeen ? "cursor seen" : "");
  await p.close();
}
await b.close();
if (fails.length) { console.log("FAIL\n" + fails.join("\n")); process.exit(1); }
console.log("CAPCARD_OK");
