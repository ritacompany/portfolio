// Checks the issues in ISSUES.md at 768, 834, 1024 and 1180, reduced motion on and off, each on a real
// tablet screen height. Serves site/ itself. Prints HOME_TABLET_OK <n> of <n> only when every run passes.
// `node reports/home-tablet/verify.mjs control` runs the same checks with the tablet block removed and
// prints CONTROL_FAILS_AS_EXPECTED <n> problems only when they fail (the positive control).
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";

const control = process.argv[2] === "control";
const srv = await serve();
srv.state.strip = control;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const problems = [];
let runs = 0;
// Screen heights of common tablets at each width: iPad mini and 9.7 portrait, iPad Air portrait,
// iPad Pro 12.9 portrait, iPad Air landscape.
const SIZES = [[768, 1024], [834, 1112], [1024, 1366], [1180, 820]];

for (const motion of ["reduce", "no-preference"]) for (const [w, h] of SIZES) {
  runs++;
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: motion });
  await page.goto(srv.base + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const found = await page.evaluate(() => {
    const out = [];
    const R = (e) => e.getBoundingClientRect();
    const vh = innerHeight, vw = document.documentElement.clientWidth;
    // H1 the hero fills the first screen (never under its 760 floor) and nothing of Selected works shows in it
    const hero = R(document.querySelector(".hero"));
    const want = Math.max(760, vh);
    if (Math.abs(hero.height - want) > 1) out.push(`H1 hero ${hero.height.toFixed(0)} tall, want ${want}`);
    const title = R(document.querySelector(".works__title"));
    if (title.top < vh) out.push(`H1 Selected works title at ${title.top.toFixed(0)}, inside the ${vh} first screen`);
    // The hero still reads bottom up: line and location above the wordmark, wordmark at the hero's foot
    const lede = R(document.querySelector(".hero__lede")), name = R(document.querySelector(".hero__name"));
    if (lede.bottom > name.top) out.push("H1 hero line runs into the wordmark");
    if (Math.abs(name.bottom - hero.bottom) > 1) out.push(`H1 wordmark ends ${(hero.bottom - name.bottom).toFixed(0)} above the hero foot`);
    // Regressions the audit checked: no sideways scroll, card heads inside their card and not overlapping
    if (document.documentElement.scrollWidth > vw) out.push("sideways scroll");
    for (const card of document.querySelectorAll(".work-card")) {
      const cr = R(card);
      const kids = [...card.querySelectorAll(".work-card__head > *")].filter((e) => getComputedStyle(e).display !== "none");
      for (const k of kids) if (R(k).right > cr.right + 0.5) out.push(`${k.className} runs past its card`);
      for (let i = 0; i < kids.length; i++) for (let j = i + 1; j < kids.length; j++) {
        const a = R(kids[i]), c = R(kids[j]);
        if (a.left < c.right && c.left < a.right && a.top < c.bottom && c.top < a.bottom) out.push(`${kids[i].className} overlaps ${kids[j].className}`);
      }
    }
    return out;
  });
  for (const f of found) problems.push(`${w} by ${h} ${motion}: ${f}`);
  await page.close();
}
await browser.close();
srv.close();
if (control) {
  if (problems.length) { console.log(problems.join("\n")); console.log(`CONTROL_FAILS_AS_EXPECTED ${problems.length} problems`); process.exit(0); }
  console.error("control passed: the checks cannot tell the fix from the old page"); process.exit(1);
}
if (problems.length) { console.error(problems.join("\n")); console.error(`${problems.length} problems`); process.exit(1); }
console.log(`HOME_TABLET_OK ${runs} of ${runs}`);
