// Measurements behind ISSUES.md. Usage: node reports/tablet-breakpoint/measure.mjs 768,834,1024,1180 [motion]
import { createRequire } from "node:module";
const [ws, motion] = process.argv.slice(2);
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
for (const w of ws.split(",").map(Number)) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion ? "no-preference" : "reduce" });
  await p.goto(`http://localhost:${process.env.PORT||4318}/mondai/framework/`, { waitUntil: "networkidle" });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } });
  await p.waitForTimeout(1200);
  const m = await p.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const R = (e) => e.getBoundingClientRect();
    const out = {};
    // hero meta
    out.meta = ["5812:16456","5812:16459","5812:16462"].map(n => Math.round(R(q(`[data-figma-node="${n}"]`)).top + scrollY));
    // title mark
    const t = q(".fw-title"), mk = q(".fw-mark"), r = document.createRange(); r.selectNodeContents(t.firstChild);
    out.mark = { textRight: Math.round(r.getBoundingClientRect().right), markLeft: Math.round(R(mk).left), markRight: Math.round(R(mk).right), markW: Math.round(R(mk).width), vw: innerWidth };
    // body measure: characters per line in the widest body paragraph
    let cpl = 0;
    for (const e of document.querySelectorAll(".fw-sec > .s-body-16")) { const h = R(e).height, lh = parseFloat(getComputedStyle(e).lineHeight); const lines = Math.round(h / lh); if (lines > 2) cpl = Math.max(cpl, Math.round(e.textContent.length / lines)); }
    out.maxCharsPerLine = cpl;
    // example box halves
    const a = q('[data-figma-node="5812:17127"]'), c = q('[data-figma-node="5812:17128"]');
    out.example = { labelW: Math.round(R(a).width), textW: Math.round(R(c).width) };
    // figure widths and their scale against their 1440 width
    out.figs = [...document.querySelectorAll(".fw-sec > img.fig")].map(i => ({ n: i.dataset.figmaNode, w: Math.round(R(i).width), h: Math.round(R(i).height), s: +(R(i).width / parseFloat(i.style.width || i.getAttribute("width"))).toFixed(2) }));
    // hidden content after scrolling (entrances that never ran)
    out.invisible = [...document.querySelectorAll(".fw-sec *")].filter(e => { const s = getComputedStyle(e); const b = R(e); return b.width > 0 && b.height > 0 && (+s.opacity < 0.5 || s.visibility === "hidden"); }).map(e => e.dataset.figmaNode || e.className).slice(0, 10);
    out.sectionH = [...document.querySelectorAll(".fw-sec")].map(s => `${s.getAttribute("aria-label")}:${Math.round(R(s).height)}`).join(" ");
    return out;
  });
  console.log(`\n== ${w} ${motion ? "motion" : "reduced"}\n` + JSON.stringify(m));
  await p.close();
}
await b.close();
