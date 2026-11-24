// G3: every page in VISUAL-EXAMPLES.md was captured whole: status 200, screens to the bottom, text kept.
import fs from 'node:fs';
import { rows } from './check-visual-common.mjs';
const A = process.env.ARCHIVE_DIR || '/tmp/claude-0/-home-user-portfolio/2570cde9-6813-543a-88f9-002bf7e1a0d6/scratchpad/vis/archive';
const metas = fs.readdirSync(A).filter(d => fs.existsSync(`${A}/${d}/meta.json`)).map(d => JSON.parse(fs.readFileSync(`${A}/${d}/meta.json`, 'utf8')));
const errs = []; const r = rows(); if (r.length !== 10) errs.push('rows ' + r.length);
for (const x of r) {
  const m = metas.find(m => m.url === x.url); if (!m) { errs.push('not captured ' + x.url); continue; }
  if (m.status !== 200) errs.push(m.id + ' status ' + m.status);
  if (m.lastScrollY + 1000 < m.height - 5) errs.push(m.id + ' screens stop short');
  const shots = fs.readdirSync(`${A}/${m.id}`).filter(f => /^screen-\d+\.jpg$/.test(f));
  if (shots.length !== m.screens || shots.some(f => fs.statSync(`${A}/${m.id}/${f}`).size < 5000)) errs.push(m.id + ' screen files');
  if (fs.readFileSync(`${A}/${m.id}/page.txt`, 'utf8').split(/\s+/).length < 300) errs.push(m.id + ' text short');
}
if (errs.length) { console.log('FAIL ' + errs.join('; ')); process.exit(1); } console.log('VISUAL-ARCHIVE-PASS');
