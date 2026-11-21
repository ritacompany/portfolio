// Rects of every child of the four sections at a width, for the unchanged-widths check.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
export const SECS = ['5812:17084', '5812:17129', '5812:20248', '5812:20498'];
export async function rects(page, w, url = 'http://localhost:4318/mondai/framework/') {
  await page.setViewportSize({ width: w, height: 1000 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate((SECS) => {
    const out = {};
    for (const id of SECS) {
      const s = document.querySelector(`.fw-sec[data-figma-node="${id}"]`);
      const sr = s.getBoundingClientRect();
      out[id] = { h: Math.round(sr.height), kids: [...s.children].map((c) => { const r = c.getBoundingClientRect(); return [c.dataset.figmaNode || c.className, Math.round(r.left), Math.round(r.top - sr.top), Math.round(r.width), Math.round(r.height)]; }) };
    }
    return out;
  }, SECS);
}
if (process.argv[2] === 'baseline') {
  const b = await chromium.launch(); const p = await b.newPage({ reducedMotion: 'reduce' });
  const out = {}; const url = process.argv[3] || 'http://localhost:4318/mondai/framework/';
  for (const w of [390, 1200, 1440]) out[w] = await rects(p, w, url);
  const fs = await import('node:fs'); fs.writeFileSync(new URL('./baseline-rects.json', import.meta.url), JSON.stringify(out));
  console.log('baseline written'); await b.close();
}
