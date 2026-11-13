// Checks the Start of week carousel (framework page, 5812:20498) in a real browser.
// Usage: node scripts/check-week-carousel.mjs <page url> <screenshot dir>
// At 1440, 768 and 390, with reduced motion off and on, it checks: five cards, Clean slate centered
// with nothing to its left, side cards at 0.65, no sideways page scroll, the template line never
// fading, its number following the dot, one template per move, and reduced motion landing at once.
// Prints CAROUSEL_CHECK_PASSED only when every check passes.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [url, outDir = "output/week-carousel"] = process.argv.slice(2);
if (!url) { console.error("usage: node scripts/check-week-carousel.mjs <url> [outDir]"); process.exit(2); }
mkdirSync(outDir, { recursive: true });
const fails = [];
const browser = await chromium.launch();
for (const width of [1440, 768, 390]) {
  for (const motion of ["no-preference", "reduce"]) {
    const tag = `${width}-${motion === "reduce" ? "rm" : "motion"}`;
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: motion });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelector(".sow").scrollIntoView({ block: "center" }));
    await page.waitForTimeout(1600);
    const r = await page.evaluate(async (motion) => {
      const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
      const stage = q(".sow__stage"), sr = stage.getBoundingClientRect();
      const box = (el) => el.getBoundingClientRect();
      const cards = qa(".sow__card"), num = () => q(".sow__num").lastChild.textContent;
      const cur = () => qa(".sow__dot").findIndex((b) => b.getAttribute("aria-current") === "true");
      const out = {
        cards: cards.length,
        overflow: document.documentElement.scrollWidth - innerWidth,
        firstCentered: Math.abs(box(cards[0]).left + box(cards[0]).width / 2 - (sr.left + sr.width / 2)) < 2,
        nothingLeft: cards.slice(1).every((c) => box(c).left > box(cards[0]).right - 1),
        sideRatio: box(cards[1]).width / box(cards[0]).width,
        start: [num(), cur(), q(".sow__title").textContent],
      };
      // Move to template 2 and sample the template line during the move.
      q(".sow__dot:nth-child(2)").click();
      const samples = [];
      for (let t = 0; t < 12; t++) {
        await new Promise((r) => setTimeout(r, 100));
        samples.push([getComputedStyle(q(".sow__label")).opacity, num(), cur()]);
      }
      out.labelAlwaysVisible = samples.every((s) => s[0] === "1");
      out.numFollowsDot = samples.every((s) => +s[1] === s[2] + 1);
      out.after = [num(), cur(), q(".sow__title").textContent];
      out.secondCentered = Math.abs(box(cards[1]).left + box(cards[1]).width / 2 - (sr.left + sr.width / 2)) < 2;
      // A keyboard move goes exactly one template.
      stage.focus(); stage.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
      await new Promise((r) => setTimeout(r, motion === "reduce" ? 50 : 1400));
      out.keyStep = [num(), q(".sow__title").textContent];
      return out;
    }, motion);
    const want = (ok, msg) => { if (!ok) fails.push(`${tag}: ${msg}`); };
    want(r.cards === 5, `cards ${r.cards}`);
    want(r.overflow <= 0, `page scrolls sideways by ${r.overflow}px`);
    want(r.firstCentered, "Clean slate not centered at load");
    want(r.nothingLeft, "a card sits left of Clean slate");
    want(Math.abs(r.sideRatio - 0.65) < 0.01, `side card ratio ${r.sideRatio.toFixed(3)}`);
    want(r.start.join() === "1,0,Clean slate", `start ${r.start}`);
    want(r.labelAlwaysVisible, "template line faded during a move");
    want(r.numFollowsDot, "template number and dot disagreed during a move");
    want(r.after.join() === "2,1,Catching up", `after dot click ${r.after}`);
    want(r.secondCentered, "Catching up not centered after the move");
    want(r.keyStep.join() === "3,Rollover", `arrow key step ${r.keyStep}`);
    await page.evaluate(() => document.querySelector(".sow").scrollIntoView({ block: "center" }));
    await page.locator(".sow").screenshot({ path: `${outDir}/${tag}.png` });
    console.log(tag, JSON.stringify(r));
    await page.close();
  }
}
await browser.close();
if (fails.length) { console.log("FAILED\n" + fails.join("\n")); process.exit(1); }
console.log("CAROUSEL_CHECK_PASSED");
