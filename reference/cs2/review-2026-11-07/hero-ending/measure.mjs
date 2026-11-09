// Fit for the hero and ending versions, on the measure.js approach (Satoshi in a headless browser, lines counted
// from the rendered height). Fonts: site/assets/fonts (the site's self hosted Satoshi).
// Widths and type from tactics/measure-r3.md (hero left 440 at Medium 24, ending headline 708 at Medium 40, 115
// percent, minus 4 percent) and the Haven site CSS for the hero right column (473 at Regular 16, 140 percent,
// minus 1 percent), the same template the Mondai case studies share.
// Controls: the current hero left line must measure 3 lines and the current ending headline 3 lines (the
// numbers in measure-r3.md), and a planted overlong headline must come out over 3.
// Usage: node measure.mjs   Prints FIT_OK when controls hold and every version fits.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../../..');
const F = p => fs.readFileSync(path.join(root, 'site/assets/fonts', p)).toString('base64');
const V = JSON.parse(fs.readFileSync(path.join(here, 'versions.json'), 'utf8'));
const S = {
  left: { wt: 500, fs: 24, lh: 1.16, ls: -0.04, w: 440, max: 3 },
  right: { wt: 400, fs: 16, lh: 1.4, ls: -0.01, w: 473, max: 10 },
  head: { wt: 500, fs: 40, lh: 1.15, ls: -0.04, w: 708, min: 3, max: 3 },
  body: { wt: 400, fs: 16, lh: 1.4, ls: -0.01, w: 473 },
};
const items = [
  { id: 'control: current hero left', k: 'left', t: 'Designed as an AI guide for people from underrepresented backgrounds working their way into a tech career.', expect: 3 },
  { id: 'control: current ending headline', k: 'head', t: 'The framework is built, so the question left is whether it works for the users it was made for.', expect: 3 },
  { id: 'control: planted overlong headline', k: 'head', t: 'The framework is built, so the question left is whether it works for the users it was made for, every week, in every season of their life, for as long as it takes them to finish.', over: true },
  { id: 'Haven left (reference)', k: 'left', t: 'Designed as a way for LGBTQIA+ youth to gain access to affirming environments.' },
  { id: 'Haven right (reference)', k: 'right', t: 'For many LGBTQIA+ teenagers, finding a sense of belonging and acceptance can be a difficult and isolating experience. The lack of access to affirming environments in their homes and local communities often leads to severe mental health consequences including an increase risk of suicide.\n\nThis project was developed as part of a UX bootcamp. The brief was to create a functional product for a specific user group and include a way to connect users with an expert.' },
];
for (const v of V) {
  if (v.block === 'Hero') {
    const f = Object.fromEntries(v.fields);
    items.push({ id: `${v.id} left`, k: 'left', t: f.Left, check: true });
    items.push({ id: `${v.id} right`, k: 'right', t: f['Right 1'] + '\n\n' + f['Right 2'], check: true, words: (f['Right 1'] + ' ' + f['Right 2']).split(/\s+/).length });
  } else {
    const f = Object.fromEntries(v.fields);
    items.push({ id: `${v.id} headline`, k: 'head', t: f.Headline, check: true });
    items.push({ id: `${v.id} body`, k: 'body', t: f['Body 1'] + '\n\n' + f['Body 2'], words: (f['Body 1'] + ' ' + f['Body 2']).split(/\s+/).length });
  }
}
const b = await chromium.launch(); const p = await b.newPage();
await p.setContent(`<style>@font-face{font-family:Sat;font-weight:400;src:url(data:font/woff2;base64,${F('satoshi-400.woff2')})}@font-face{font-family:Sat;font-weight:500;src:url(data:font/woff2;base64,${F('satoshi-500.woff2')})}</style><div id=h></div>`);
const out = await p.evaluate(async ({ items, S }) => {
  await Promise.all(['400 16px Sat', '500 24px Sat', '500 40px Sat'].map(f => document.fonts.load(f)));
  const ok = document.fonts.check('500 40px Sat');
  return { ok, rows: items.map(it => {
    const s = S[it.k]; const d = document.createElement('div');
    d.style.cssText = `font-family:Sat;font-weight:${s.wt};font-size:${s.fs}px;line-height:${s.fs * s.lh}px;width:${s.w}px;white-space:pre-wrap;letter-spacing:${s.ls}em`;
    d.textContent = it.t; document.getElementById('h').appendChild(d);
    const lines = Math.round(d.getBoundingClientRect().height / (s.fs * s.lh)); d.remove(); return { ...it, lines };
  }) };
}, { items, S });
await b.close();
const fails = [];
if (!out.ok) fails.push('Satoshi did not load');
for (const r of out.rows) {
  const s = S[r.k];
  let verdict = '';
  if (r.expect) { verdict = r.lines === r.expect ? 'control ok' : `CONTROL FAIL, expected ${r.expect}`; if (r.lines !== r.expect) fails.push(r.id); }
  else if (r.over) { verdict = r.lines > 3 ? 'control ok (over 3)' : 'CONTROL FAIL, not caught'; if (r.lines <= 3) fails.push(r.id); }
  else if (r.check) {
    const bad = (s.max && r.lines > s.max) || (s.min && r.lines < s.min);
    verdict = bad ? 'DOES NOT FIT' : 'fits'; if (bad) fails.push(r.id);
  }
  console.log(`${r.id}: ${r.lines} lines at ${s.w}px${r.words ? `, ${r.words} words` : ''} ${verdict}`);
}
if (fails.length) { console.log('FAILED: ' + fails.join('; ')); process.exit(1); }
console.log('FIT_OK');
