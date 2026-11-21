// Measures every section headline on the framework page: line count at the tablet widths under the current rules,
// and, at a given font size, the box widths at which each one runs exactly three lines (narrowest box that keeps it
// to three, widest box before it drops to two). Real page, real fonts. Site served on 4318.
// Usage: node measure.mjs [url] [fontPx ...]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const URL = process.argv[2] || 'http://localhost:4318/mondai/framework/';
const sizes = (process.argv.slice(3).map(Number).filter(Boolean));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 768, height: 900 } });
const out = { widths: {}, ranges: {} };
for (const w of [768, 900, 1024, 1150, 1160, 1440]) {
  await p.setViewportSize({ width: w, height: 900 });
  await p.goto(URL, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  out.widths[w] = await p.evaluate(() => [...document.querySelectorAll('.fw-sec > .s-heading-40')].map((e) => {
    const rg = document.createRange(); rg.selectNodeContents(e);
    return { id: e.dataset.figmaNode, lines: new Set([...rg.getClientRects()].map((x) => Math.round(x.top))).size,
      box: Math.round(e.getBoundingClientRect().width), fs: getComputedStyle(e).fontSize };
  }));
}
await p.setViewportSize({ width: 768, height: 900 });
await p.goto(URL, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
for (const fs of sizes.length ? sizes : [32]) {
  out.ranges[fs] = await p.evaluate((fs) => [...document.querySelectorAll('.fw-sec > .s-heading-40')].map((e) => {
    const lines = (wd) => {
      e.style.setProperty('font-size', fs + 'px', 'important');
      e.style.setProperty('width', wd + 'px', 'important'); e.style.setProperty('max-width', 'none', 'important');
      const rg = document.createRange(); rg.selectNodeContents(e);
      return new Set([...rg.getClientRects()].map((x) => Math.round(x.top))).size;
    };
    let min3 = null, max3 = null;
    for (let wd = 200; wd <= 1400; wd++) { const n = lines(wd); if (n <= 3 && min3 === null) min3 = wd; if (n === 3) max3 = wd; if (n < 3) break; }
    e.removeAttribute('style');
    return { id: e.dataset.figmaNode, text: e.textContent, min3, max3 };
  }), fs);
}
console.log(JSON.stringify(out));
await b.close();
