// Mechanical check for the design system CS draft. Run: node check-draft.mjs [vaccinate]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));

function check(draft, claims) {
  const errs = [];
  const start = draft.indexOf('\n---\n');
  const body = start >= 0 ? draft.slice(start + 5) : draft;
  if (/[—–]|(?<!-)--(?!-)/.test(draft)) errs.push('dash');
  const prose = body.replace(/\[C\d+\]/g, '');
  if (/\b\w+, \w+(?: \w+){0,3}, (and|or) \w+/.test(prose)) errs.push('oxford comma');
  const sections = (body.match(/^## /gm) || []).length;
  if (sections < 5 || sections > 6) errs.push(`sections ${sections}`);
  const words = body.replace(/^\*.*\*$/gm, '').replace(/\[C\d+\]/g, '').split(/\s+/).filter(Boolean).length;
  if (words > 2300) errs.push(`words ${words}`);
  if (/["“”]/.test(body)) errs.push('quotation in body');
  const ids = new Map();
  for (const m of claims.matchAll(/^\| (C\d+) \|[^|]*\| ([^|]*)\| ([^|]*)\|/gm)) ids.set(m[1], m[2] + m[3]);
  const paras = body.split(/\n\s*\n/);
  for (const p of paras) {
    if (/^#/.test(p.trim()) || /^\*[^*]/.test(p.trim()) || /^Last updated/.test(p.trim())) continue;
    const cited = [...p.matchAll(/\[(C\d+)\]/g)].map(m => m[1]);
    const text = p.replace(/\[C\d+\]/g, '');
    if (/\d/.test(text) && cited.length === 0) errs.push(`uncited number: ${text.trim().slice(0, 60)}`);
    for (const c of cited) {
      const row = ids.get(c);
      if (!row) errs.push(`missing claim ${c}`);
      else if (!/CONFIRMED|ESTIMATE/.test(row) || !/`[^`]+`/.test(row)) errs.push(`claim ${c} lacks mark or source`);
    }
  }
  return { errs, sections, words };
}

const draft = fs.readFileSync(path.join(dir, 'DRAFT.md'), 'utf8');
const claims = fs.readFileSync(path.join(dir, 'CLAIMS.md'), 'utf8');

if (process.argv[2] === 'vaccinate') {
  const base = check(draft, claims);
  if (base.errs.length) { console.log('clean copy fails:', base.errs); process.exit(1); }
  const anchor = '\n## The rules lived in my head';
  const plants = [
    ['dash', draft.replace(anchor, '\nA plant — here.\n' + anchor)],
    ['oxford comma', draft.replace(anchor, '\nTokens, grids, and states. [C1]\n' + anchor)],
    ['uncited number', draft.replace(anchor, '\nWe shipped 40 screens.\n' + anchor)],
    ['missing claim', draft.replace(anchor, '\nA claim. [C99]\n' + anchor)],
    ['quotation', draft.replace(anchor, '\nHe said "fine". [C1]\n' + anchor)],
  ];
  let caught = 0;
  for (const [name, text] of plants) {
    const r = check(text, claims);
    const hit = r.errs.some(e => e.startsWith(name));
    console.log(`${name}: ${hit ? 'caught' : 'MISSED'}`);
    if (hit) caught++;
  }
  if (caught === plants.length) console.log(`VACCINATION PASSED ${caught} of ${plants.length}`);
  else process.exit(1);
} else {
  const r = check(draft, claims);
  console.log(`sections ${r.sections}, words ${r.words}`);
  if (r.errs.length) { for (const e of r.errs) console.log('FAIL', e); process.exit(1); }
  console.log('DRAFT CHECK PASSED');
}
