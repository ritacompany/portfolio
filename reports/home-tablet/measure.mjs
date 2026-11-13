// Measurements behind ISSUES.md. Usage: node reports/home-tablet/measure.mjs 768,834,1024,1180 [shotsDir]
// Needs the site served at PORT (default 4319). Writes a full page shot per width when shotsDir is given.
import { createRequire } from "node:module";
const [ws, shots] = process.argv.slice(2);
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
for (const w of ws.split(",").map(Number)) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: "reduce" });
  await p.goto(`http://localhost:${process.env.PORT || 4319}/`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const m = await p.evaluate(() => {
    const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)]; };
    const q = (s) => document.querySelector(s);
    const lines = (e) => { const rg = document.createRange(); rg.selectNodeContents(e); return new Set([...rg.getClientRects()].filter((x) => x.width > 1).map((x) => Math.round(x.top))).size; };
    const cpl = (e) => Math.round(e.textContent.trim().length / lines(e));
    const cs = getComputedStyle(document.documentElement);
    return {
      vw: document.documentElement.clientWidth, sideways: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      grid: [cs.getPropertyValue("--grid-columns"), cs.getPropertyValue("--grid-margin"), cs.getPropertyValue("--grid-gutter")].join(" "),
      navbar: { logo: R(q(".navbar__logo")), role: R(q(".navbar__role")), links: R(q(".navbar__links")) },
      hero: R(q(".hero")), lede: R(q(".hero__lede")), ledeLines: lines(q(".hero__lede-wide")), where: R(q(".hero__where")), name: R(q(".hero__name")),
      worksTitle: R(q(".works__title")), cards: R(q(".works__cards")), mondai: R(q(".work-card-mondai")), haven: R(q(".work-card-haven")),
      mondaiMedia: R(q(".work-card-mondai .work-card__media")), havenMedia: R(q(".work-card-haven .work-card__media")),
      mondaiHead: [...q(".work-card-mondai .work-card__head").children].map((e) => [e.className, ...R(e)]),
      havenHead: [...q(".work-card-haven .work-card__head").children].map((e) => [e.className, ...R(e)]),
      learn: R(q(".work-card-mondai .button-sm")),
      aboutLabel: R(q(".about-story .about__label")), aboutBody: R(q(".about-story .about__body")), aboutCpl: [...document.querySelectorAll(".about-story .about__body p")].map(cpl),
      roleLabel: R(q(".about-role .about__label")), roleBody: R(q(".about-role .about__body")), roleCpl: cpl(q(".about-role .about__body")),
      story: R(q(".about-story")), role: R(q(".about-role")),
      footer: R(q(".footer")),
    };
  });
  console.log(`\n== ${w}\n` + JSON.stringify(m));
  if (shots) await p.screenshot({ path: `${shots}/home-${w}.png`, fullPage: true });
  await p.close();
}
await b.close();
