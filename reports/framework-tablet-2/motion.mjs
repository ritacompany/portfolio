// Item 6: every animation on the framework page works at tablet. Motion on: items below the first screen
// start hidden (faded or closed) before any scroll, and every item ends fully shown after a slow scroll
// through. Reduced motion: every item is shown at load, without scrolling. 768, 1024 and 1180.
// Items with no entrance by design (the laptop, the Capacity card, the Rollover row) are not required to
// start hidden. Prints FW_MOTION_OK <runs> runs.
import { serve, chromium } from "./serve.mjs";
const { server, base } = await serve(process.env.STRIP === "1");
const b = await chromium.launch();
const problems = [];
let runs = 0;
const STILL = ["5812:16973", "5812:17089", "5812:20316"];
const state = (still) => {
  const items = [...document.querySelectorAll(".framework .fw-sec > *, .framework .ending-bar")].filter((e) => getComputedStyle(e).display !== "none" && !e.matches(".capdemo, .panel-card, .panel-example, .vrule"));
  const shown = (e) => { const cs = getComputedStyle(e); const clip = cs.clipPath; return parseFloat(cs.opacity) > 0.99 && cs.visibility === "visible" && (clip === "none" || /^inset\(0(px)?( 0(px)?)*\)$/.test(clip)); };
  const vh = innerHeight;
  return items.map((e) => ({ id: e.dataset.figmaNode || e.className, below: e.getBoundingClientRect().top + scrollY > 2 * vh, shown: shown(e), still: still.includes(e.dataset.figmaNode) }));
};
for (const motion of ["no-preference", "reduce"]) for (const w of [768, 1024, 1150]) {
  runs++;
  const tag = `${w} ${motion === "reduce" ? "reduced" : "motion"}`;
  const page = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion });
  await page.goto(base + "/mondai/framework/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const before = await page.evaluate(state, STILL);
  if (motion === "reduce") {
    const hidden = before.filter((i) => !i.shown);
    if (hidden.length) problems.push(`${tag}: ${hidden.length} hidden at load: ${hidden.slice(0, 5).map((i) => i.id).join(", ")}`);
  } else {
    const below = before.filter((i) => i.below && !i.still);
    const waiting = below.filter((i) => !i.shown);
    if (!below.length || waiting.length < below.length) problems.push(`${tag}: ${below.length - waiting.length} of ${below.length} items below the fold already shown before scrolling (entrances not armed)`);
    await page.mouse.move(w / 2, 500);
    for (let k = 0; k < (process.env.NOSCROLL ? 0 : 400); k++) { // NOSCROLL=1: the control, nothing below the fold should open
      const done = await page.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
      if (done) break;
      await page.mouse.wheel(0, 300); await page.waitForTimeout(90);
    }
    await page.waitForTimeout(3000);
    const after = await page.evaluate(state, STILL);
    const left = after.filter((i) => !i.shown);
    if (left.length) problems.push(`${tag}: ${left.length} not shown after scrolling through: ${left.slice(0, 5).map((i) => i.id).join(", ")}`);
    const sow = await page.evaluate(() => !!document.querySelector(".sow__card.is-center"));
    if (!sow) problems.push(`${tag}: Start of week carousel did not build`);
  }
  await page.close();
}
await b.close(); server.close();
if (problems.length) { console.log(problems.join("\n")); process.exit(1); }
console.log(`FW_MOTION_OK ${runs} runs`);
