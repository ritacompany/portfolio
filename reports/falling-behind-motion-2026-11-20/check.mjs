// Falling behind row check (session 6, 21 Nov). Needs the site served: PORT=4318 node scripts/serve.mjs
// At 390, 768, 1160 and 1440, motion on and off: the row shows his v4 image, loads, has no sideways scroll,
// and ends fully shown; with reduced motion it is shown from the first frame.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const fails = [];
const b = await chromium.launch();
for (const w of [390, 768, 1160, 1440]) for (const rm of ["reduce", "no-preference"]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: rm });
  await p.goto("http://localhost:4318/mondai/framework/", { waitUntil: "networkidle" });
  const sel = '[data-figma-node="5812:20316"]';
  await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
  const first = await p.evaluate((s) => { const e = document.querySelector(s), c = getComputedStyle(e); return { op: c.opacity, clip: c.clipPath }; }, sel);
  await p.waitForTimeout(2500);
  const r = await p.evaluate((s) => { const e = document.querySelector(s), c = getComputedStyle(e), card = document.querySelector('[data-figma-node="5812:20311"]');
    return { src: e.currentSrc, nat: e.naturalWidth, w: e.getBoundingClientRect().width, op: c.opacity, clip: c.clipPath, tr: c.transform, cardOp: getComputedStyle(card).opacity, sw: document.documentElement.scrollWidth, vw: innerWidth }; }, sel);
  const tag = `${w} ${rm}`;
  if (!r.src.endsWith("rollover-v5@2x.webp")) fails.push(`${tag}: src ${r.src}`);
  if (r.nat !== 1630) fails.push(`${tag}: natural width ${r.nat}`);
  if (r.sw > r.vw) fails.push(`${tag}: sideways scroll ${r.sw} > ${r.vw}`);
  if (r.op !== "1" || !(r.clip === "none" || /inset\(0(px)?\)|inset\(0px 0px 0px 0px\)/.test(r.clip))) fails.push(`${tag}: end state op ${r.op} clip ${r.clip}`);
  if (w >= 1160 && r.cardOp !== "1") fails.push(`${tag}: card opacity ${r.cardOp}`);
  if (rm === "reduce" && (first.op !== "1" || first.clip !== "none")) fails.push(`${tag}: reduced motion first frame op ${first.op} clip ${first.clip}`);
  console.log(tag, JSON.stringify({ first, ...r, src: r.src.split("/").pop() }));
  await p.close();
}
await b.close();
if (fails.length) { console.log("FAIL\n" + fails.join("\n")); process.exit(1); }
console.log("FALLING BEHIND ROW CHECK PASSED");
