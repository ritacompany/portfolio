#!/usr/bin/env node
// Fit for every Haven proposal, two ways.
// 1. In the real page: site/ served locally, /haven/ opened at 1440 and 390 wide, the page's own Satoshi and the
//    widths that haven.css and current.css give each element. Each current text is found on the page, measured
//    (lines from the rendered line boxes), replaced with the new text and measured again, with a check that no
//    ancestor that clips its content now cuts it off.
// 2. Standalone: the same text in Satoshi from site/assets/fonts at the computed width, size, line height and
//    tracking read from the page, so the count does not depend on the page's scripts.
// Rules: cards and captions may not gain a line; headlines and bodies may gain at most one line at 1440 and two at
// 390; the hero right column (Right 1, gap, Right 2) stays at most 10 lines at 1440, the rule set on this template
// in the CS2 hero round; nothing may overflow. Controls: a planted caption three times as long must fail the caption
// rule, a planted long hero Right 2 must push the column over 10, and the standalone count of every current text
// must agree with the in-page count within one line.
// Usage: node measure.mjs   Prints HAVEN_FIT_OK when the controls hold and every proposal fits.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../..');
const site = path.join(root, 'site');
const props = JSON.parse(fs.readFileSync(path.join(here, 'proposals.json'), 'utf8'));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const server = http.createServer((q, r) => {
  let f = path.join(site, decodeURIComponent(q.url.split('?')[0]));
  if (f.endsWith('/')) f += 'index.html';
  if (!f.startsWith(site) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
}).listen(0);
const port = server.address().port;
const font = w => fs.readFileSync(path.join(site, 'assets/fonts', `satoshi-${w}.woff2`)).toString('base64');

const edits = [];
for (const p of props) { edits.push({ id: p.id, cur: p.cur, new: p.new }); p.also.forEach(([c, t], i) => edits.push({ id: `${p.id} also ${i + 1}`, cur: c, new: t })); }
const r2 = props.find(p => p.id === 'h-hero-r2');
edits.push({ id: 'control: planted long hero', cur: r2.new, new: r2.new + ' This sentence is planted to make the column too long for its slot on purpose.', control: 'hero' });
edits.push({ id: 'control: planted long caption', cur: 'less likely to attempt suicide.', new: 'less likely to attempt suicide, as the study found across every group it surveyed in every year it ran.', control: true });

const b = await chromium.launch();
const fails = []; const rows = []; const heroCol = {}; const heroR2 = {};
for (const [vw, vh, grow] of [[1440, 900, 1], [390, 844, 2]]) {
  const pg = await b.newPage({ viewport: { width: vw, height: vh } });
  await pg.emulateMedia({ reducedMotion: 'reduce' });
  await pg.goto(`http://localhost:${port}/haven/`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  const res = await pg.evaluate((edits) => {
    const norm = s => s.replace(/\s+/g, ' ').trim();
    const lines = el => { const r = document.createRange(); r.selectNodeContents(el); const tops = new Set(); for (const q of r.getClientRects()) if (q.width > 1) tops.add(Math.round(q.top)); return tops.size; };
    const clipped = el => { const e = el.getBoundingClientRect(); for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const cs = getComputedStyle(a); if (/(hidden|clip)/.test(cs.overflowY + cs.overflowX) && !a.matches('.mask, .mask__scale, html, body')) { const r = a.getBoundingClientRect(); if (r.height > 0 && e.bottom > r.bottom + 1) return a.className || a.tagName; } } return ''; };
    const all = [...document.querySelectorAll('body *')].filter(e => !e.closest('script,style,svg,footer'));
    return edits.map(ed => {
      const els = all.filter(e => (ed.control ? norm(e.textContent) === norm(ed.cur) : norm(e.textContent).includes(norm(ed.cur))) && ![...e.children].some(c => norm(c.textContent).includes(norm(ed.cur))));
      if (!els.length) return { ...ed, found: 0 };
      return { ...ed, found: els.length, items: els.map(el => {
        el.scrollIntoView({ block: 'center' });
        let cs = getComputedStyle(el); let box = el;
        // A body hidden until its scroll stage plays has no width; read the width its column gives it instead.
        while (box.getBoundingClientRect().width === 0 && box.parentElement) box = box.parentElement;
        const bs = getComputedStyle(box);
        const w = box.getBoundingClientRect().width - parseFloat(bs.paddingLeft) - parseFloat(bs.paddingRight) - parseFloat(bs.borderLeftWidth) - parseFloat(bs.borderRightWidth);
        const whole = norm(el.textContent); const newText = whole.replace(norm(ed.cur), ed.new);
        const before = lines(el); const clipBefore = clipped(el);
        el.textContent = newText;
        const after = lines(el); const clipAfter = clipped(el);
        if (ed.control) el.textContent = whole;
        const kind = el.closest('.hero') ? 'hero' : el.matches('.data-card__caption, .card__body, .tcard__body, .end-caption, .role__text') ? 'slot' : 'flow';
        return { cls: el.className, tag: el.tagName, kind, hidden: box !== el, w: Math.round(w), fs: cs.fontSize, fw: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, wrap: cs.textWrap || cs.textWrapStyle || 'wrap', before, after, clipBefore, clipAfter, whole, newText };
      }) };
    });
  }, edits);
  // Standalone, Satoshi from site/assets/fonts at the same metrics.
  const sp = await b.newPage();
  await sp.setContent(`<style>@font-face{font-family:S;font-weight:400;src:url(data:font/woff2;base64,${font(400)})}@font-face{font-family:S;font-weight:500;src:url(data:font/woff2;base64,${font(500)})}@font-face{font-family:S;font-weight:700;src:url(data:font/woff2;base64,${font(700)})}</style><div id=h></div>`);
  await sp.evaluate(() => Promise.all(['400 16px S', '500 16px S', '700 16px S'].map(f => document.fonts.load(f))));
  for (const r of res) for (const it of (r.items || [])) {
    const m = await sp.evaluate(({ it, texts }) => texts.map(t => { const d = document.createElement('div'); d.style.cssText = `font-family:S;font-weight:${it.fw};font-size:${it.fs};line-height:${it.lh};letter-spacing:${it.ls};width:${it.w}px;text-wrap:${it.wrap}`; d.textContent = t; document.getElementById('h').appendChild(d); const rg = document.createRange(); rg.selectNodeContents(d); const tops = new Set(); for (const q of rg.getClientRects()) if (q.width > 1) tops.add(Math.round(q.top)); d.remove(); return tops.size; }), { it, texts: [it.whole, it.newText] });
    it.sBefore = m[0]; it.sAfter = m[1];
  }
  await pg.close(); await sp.close();
  for (const r of res) {
    if (!r.found) { rows.push(`${vw} ${r.id}: current text NOT FOUND on the page`); fails.push(`${vw} ${r.id} not found`); continue; }
    for (const it of r.items) {
      const limit = it.kind === 'slot' ? it.before : it.before + grow;
      const before = it.hidden ? it.sBefore : it.before, after = it.hidden ? it.sAfter : it.after;
      const clipNew = !!(it.clipAfter && !it.clipBefore);
      const bad = it.kind === 'hero' ? clipNew : (after > (it.kind === 'slot' ? before : before + grow) || clipNew);
      const agree = it.hidden || Math.abs(it.sBefore - it.before) <= 1;
      if (it.kind === 'hero' && !r.control) heroCol[vw] = (heroCol[vw] || 0) + after;
      if (r.control === 'hero') { const tot = heroCol[vw] - heroR2[vw] + after + 1; const caught = vw !== 1440 || tot > 10; rows.push(`${vw} control: planted long hero makes the column ${tot} lines: ${caught ? 'control ok' : 'CONTROL FAIL'}`); if (!caught) fails.push('hero control'); continue; }
      if (r.id === 'h-hero-r2') heroR2[vw] = after;
      let verdict;
      if (r.control) { verdict = bad ? 'control ok (caught)' : 'CONTROL FAIL (not caught)'; if (!bad) fails.push(`${vw} control`); }
      else { verdict = (it.hidden ? 'hidden until its scroll stage, standalone count used: ' : '') + (bad ? 'DOES NOT FIT' : it.kind === 'hero' ? 'not clipped, counted in the hero column' : 'fits'); if (bad) fails.push(`${vw} ${r.id}`); }
      if (!agree) { fails.push(`${vw} ${r.id} standalone disagrees`); verdict += ', STANDALONE DISAGREES'; }
      rows.push(`${vw} ${r.id} [${it.tag.toLowerCase()}.${String(it.cls).split(' ')[0]}, ${it.kind}, ${it.w}px, ${it.fw} ${it.fs}/${it.lh}, ${it.ls}]: page ${it.before} to ${it.after} lines, standalone ${it.sBefore} to ${it.sAfter}${it.clipAfter ? ', clipped by ' + it.clipAfter : ''}: ${verdict}`);
    }
  }
}
await b.close(); server.close();
rows.forEach(r => console.log(r));
// Hero right column: Right 1, a paragraph gap and Right 2 at most 10 lines at 1440 (the rule in
// reference/cs2/review-2026-11-07/hero-ending/CHECKS.md, set on this same template). Reported at 390.
const heroLines = heroCol[1440] + 1;
console.log(`hero right column at 1440: ${heroLines} lines with the gap (limit 10); at 390: ${heroCol[390] + 1}`);
if (!(heroLines <= 10)) fails.push('hero column over 10 lines');
if (fails.length) { console.log('FAILED: ' + fails.join('; ')); process.exit(1); }
console.log('HAVEN_FIT_OK');
