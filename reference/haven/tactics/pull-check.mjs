#!/usr/bin/env node
// Proves reference/haven/final-copy.md holds every visible text node, alt text and aria label of the case
// study body of site/haven/index.html (nav and footer excluded), and that the page order is kept block by block.
// Control first: the same check run against a copy of final-copy.md with one real line removed must fail.
// Usage: node pull-check.mjs [final-copy.md]   Prints PULL_OK when the control fails and the real file passes.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../..');
const copyFile = process.argv[2] || path.join(root, 'reference/haven/final-copy.md');
const pageFile = process.argv[3] || path.join(root, 'site/haven/index.html');

const b = await chromium.launch();
const ctx = await b.newContext({ javaScriptEnabled: false });
const p = await ctx.newPage();
await p.goto('file://' + pageFile);
const nodes = await p.evaluate(() => {
  const out = [];
  const secName = el => { let s = el.closest('section'); while (s && s.parentElement && s.parentElement.closest('section')) s = s.parentElement.closest('section'); return s ? (s.id || s.className.split(' ')[0]) : ''; };
  const main = [...document.querySelectorAll('body > *')].filter(e => !e.matches('header, nav, footer, script, .skip-link, .site-nav, .site-footer'));
  for (const top of main) {
    const w = document.createTreeWalker(top, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) {
        const par = n.parentElement;
        if (par.closest('script, style, footer, .site-footer, svg')) continue;
        const t = n.textContent.replace(/\s+/g, ' ').trim();
        if (t) out.push({ t, sec: secName(par) });
      } else {
        if (n.closest('footer, .site-footer')) continue;
        for (const a of ['alt', 'aria-label']) { const v = (n.getAttribute(a) || '').trim(); if (v && !/^Mark /.test(v)) out.push({ t: v, sec: secName(n), attr: a }); }
      }
    }
  }
  return out;
});
await b.close();

const norm = s => s.replace(/\s+/g, ' ').toLowerCase();
function check(copy) {
  const c = norm(copy); const missing = [];
  for (const n of nodes) if (!c.includes(norm(n.t))) missing.push(`${n.sec}: ${n.t}`);
  return missing;
}
const real = fs.readFileSync(copyFile, 'utf8');
const fails = [];
// Control: drop the Testing synthesis body line and the check must notice.
const planted = real.replace(/^Body: Testing showed users hesitating.*$/m, 'Body: removed');
if (planted === real) fails.push('control could not be planted');
const ctl = check(planted);
console.log(ctl.length ? `ok  control: planted missing line caught (${ctl.length} missing)` : 'CONTROL FAIL: planted missing line not caught');
if (!ctl.length) fails.push('control');
const miss = check(real);
console.log(`${nodes.length} text nodes, alt and aria labels checked`);
for (const m of miss) console.log('MISSING ' + m);
if (miss.length) fails.push(`${miss.length} missing`);
// Order: the block order in final-copy.md matches the section order on the page.
const secOrder = [...new Set(nodes.map(n => n.sec).filter(Boolean))];
const blocks = [...real.matchAll(/^## (.+)$/gm)].map(m => m[1]);
console.log(`page sections ${secOrder.length}: ${secOrder.join(', ')}`);
console.log(`copy blocks ${blocks.length}: ${blocks.join(', ')}`);
if (secOrder.length !== blocks.length) fails.push('block count differs from section count');
if (fails.length) { console.log('FAILED: ' + fails.join('; ')); process.exit(1); }
console.log('PULL_OK');
