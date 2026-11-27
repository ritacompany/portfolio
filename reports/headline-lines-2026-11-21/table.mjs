// Writes TABLE.md from the real page (shipped page for today's lines, the proposal for the proposed lines).
// node table.mjs          rewrite TABLE.md
// node table.mjs check  re-measure and compare with TABLE.md: prints TABLE_OK
// Site served on 4318.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const SHIPPED = 'http://localhost:4318/mondai/framework/', DEV = 'http://localhost:4318/dev/headline-lines/';
const OUT = new URL('./TABLE.md', import.meta.url);
const SEL = '.fw-sec > .s-heading-40, .fw-sec > .fw-end__title';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 768, height: 900 } });
const load = async (u, w) => { await p.setViewportSize({ width: w, height: 900 }); await p.goto(u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); };
const lines = (e) => { const rg = document.createRange(); rg.selectNodeContents(e); return new Set([...rg.getClientRects()].map((x) => Math.round(x.top))).size; };
const now = {};
for (const w of [768, 900, 1024, 1150]) {
  await load(SHIPPED, w);
  now[w] = await p.evaluate(([SEL, f]) => { const lines = eval(f); return [...document.querySelectorAll(SEL)].map((e) => lines(e)); }, [SEL, lines.toString()]);
}
await load(DEV, 768);
const margin = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector('.fw-sec')).paddingLeft));
// The three line range of each headline, as a box width in em of its own size (scale free: tracking is in em).
const rows = await p.evaluate(([SEL, f]) => { const lines = eval(f); return [...document.querySelectorAll(SEL)].map((e) => {
  let s = e.previousElementSibling; while (s && s.tagName !== 'H2') s = s.previousElementSibling; const name = s ? s.textContent.trim() : '';
  const fs = 100; let min3 = null, max3 = null;
  e.style.setProperty('font-size', fs + 'px', 'important'); e.style.setProperty('max-width', 'none', 'important');
  for (let wd = 800; wd <= 4000; wd++) { e.style.setProperty('width', wd + 'px', 'important'); const n = lines(e); if (n <= 3 && min3 === null) min3 = wd; if (n === 3) max3 = wd; if (n < 3) break; }
  const cap = parseFloat(getComputedStyle(e.cloneNode()).maxWidth); e.removeAttribute('style');
  return { id: e.dataset.figmaNode || 'ending', name, min3: min3 / fs, max3: max3 / fs, end: e.matches('.fw-end__title') };
}); }, [SEL, lines.toString()]);
// The proposal's line count at every width 768 to 1159.
const range = rows.map(() => new Set());
for (let w = 768; w <= 1159; w++) {
  await p.setViewportSize({ width: w, height: 900 });
  (await p.evaluate(([SEL, f]) => { const lines = eval(f); return [...document.querySelectorAll(SEL)].map((e) => lines(e)); }, [SEL, lines.toString()])).forEach((n, i) => range[i].add(n));
}
const caps = await p.evaluate((SEL) => [...document.querySelectorAll(SEL)].map((e) => getComputedStyle(e).maxWidth), SEL);
await b.close();
const px = (em, fs) => Math.ceil(em * fs - 1e-6);
const md = [];
md.push('# Framework headlines: lines at tablet', '', 'Measured by `node reports/headline-lines-2026-11-21/table.mjs` on the real page with Satoshi loaded (21 Nov). Do not edit by hand.', '',
  `Tablet headlines run at 32 px; the page margin is ${margin} px each side, so the headline box is the window less ${2 * margin} unless a cap stops it. The ending title scales with the window (6.66vw, 52 to 80 px).`, '',
  '"Fits three from" is the narrowest box that keeps the headline to three lines at 32 px, and the window that gives that box. "Two lines past" is the widest box that still holds three: any cap above it lets the headline fall to two at wide tablets. "Cap" is the proposal: his 1440 frame width in em, so at 32 px it breaks where it breaks at 1440.', '',
  '| Section | Lines now at 768 | 900 | 1024 | 1150 | Fits three from (box, window) | Two lines past (box) | Proposal cap at 32 | Proposal lines, 768 to 1159 |',
  '|---|---|---|---|---|---|---|---|---|');
rows.forEach((r, i) => {
  const proposal = [...range[i]].sort().join(' or ');
  if (r.end) md.push(`| Ending title (${r.name}) | ${now[768][i]} | ${now[900][i]} | ${now[1024][i]} | ${now[1150][i]} | ${r.min3.toFixed(2)}em of its size: ${px(r.min3, 52)} at 52, ${px(r.min3, 80)} at 80 | ${r.max3.toFixed(2)}em: ${px(r.max3, 52)} at 52, ${px(r.max3, 80)} at 80 | 13.45em (1291 at 96) | ${proposal} |`);
  else md.push(`| ${r.name} | ${now[768][i]} | ${now[900][i]} | ${now[1024][i]} | ${now[1150][i]} | ${px(r.min3, 32)}, ${px(r.min3, 32) + 2 * margin} | ${Math.floor(r.max3 * 32)} | ${parseFloat(caps[i]).toFixed(0)} | ${proposal} |`);
});
const sec = rows.filter((r) => !r.end).sort((a, b) => b.min3 - a.min3);
md.push('', `Where three lines stop holding at 32 px: a ${px(sec[0].min3, 32) + 2 * margin} window (${sec[0].name}), then ${px(sec[1].min3, 32) + 2 * margin} (${sec[1].name}) and ${px(sec[2].min3, 32) + 2 * margin} (${sec[2].name}). Tablet starts at 768, so inside 768 to 1159 every headline fits three at 32 with no change of size.`);
const tight = rows.filter((r) => !r.end).sort((a, b) => a.max3 - b.max3);
md.push(`Why one shared cap cannot work: ${tight[0].name} drops to two lines past ${Math.floor(tight[0].max3 * 32)}, but ${sec[0].name} needs at least ${px(sec[0].min3, 32)} to fit in three. The caps have to be per headline.`, '');
const text = md.join('\n');
if (process.argv.includes('check')) {
  const ok = readFileSync(OUT, 'utf8') === text; console.log(ok ? 'TABLE_OK' : 'TABLE_STALE: rerun table.mjs'); process.exit(ok ? 0 : 1);
}
writeFileSync(OUT, text); console.log(text);
