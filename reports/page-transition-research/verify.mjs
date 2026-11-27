// Gate checks for reports/page-transition-research. Usage: node verify.mjs plan|claims|nosite
import fs from 'fs'; import path from 'path'; import { execSync } from 'child_process';
const here = path.dirname(new URL(import.meta.url).pathname);
const read = f => fs.readFileSync(path.join(here, f), 'utf8');
const fail = m => { console.log('FAIL: ' + m); process.exit(1); };
const mode = process.argv[2];
if (mode === 'plan') {
  const s = read('PLAN.md');
  const heads = [...s.matchAll(/^## (.+)$/gm)].map(m => m[1]);
  const want = ['Recommendation', 'Why', 'Flair later', 'What would change this'];
  const idx = want.map(w => heads.findIndex(h => h.startsWith(w)));
  if (idx.some(i => i < 0)) fail('missing section: ' + want.filter((w, k) => idx[k] < 0));
  if (idx[0] !== 0 || idx.some((v, k) => k && v < idx[k - 1])) fail('sections out of order: ' + heads);
  const rec = s.split(/^## /m)[1];
  for (const t of ['200 ms', '300 ms', '100 ms', 'ease-quart-out', 'Reduced motion', 'What moves']) if (!rec.includes(t)) fail('recommendation lacks ' + t);
  for (const f of ["PLAN.md", "CLAIMS.md", "GATES.md"]) { const t = read(f).split("\n").filter(l => !/^\|( ?-+ ?\|)+$/.test(l.trim())).join("\n").replace(/`[^`]*`/g, ""); if (/[\u2013\u2014]|(?<![<!])--(?!>)/.test(t)) fail("dash in " + f); }
  console.log('PLAN_OK');
} else if (mode === 'claims') {
  const plan = read('PLAN.md'), claims = read('CLAIMS.md');
  if (/\|\s*pending\s*\|/.test(claims)) fail('pending verdict left');
  const rows = Object.fromEntries([...claims.matchAll(/^\| (C\d+) \|.*\| (PASS|FAIL) \|/gm)].map(m => [m[1], m[2]]));
  const cites = [...plan.matchAll(/\[(C\d+), ([^\]]+)\]/g)];
  if (cites.length < 15) fail('too few citations: ' + cites.length);
  for (const [, id, mark] of cites) {
    if (!rows[id]) fail(id + ' cited but not in CLAIMS.md');
    if (mark === 'CONFIRMED' && rows[id] !== 'PASS') fail(id + ' marked CONFIRMED but check is ' + rows[id]);
    if (mark !== 'CONFIRMED' && mark !== 'failed check') fail(id + ' has unknown mark ' + mark);
  }
  const bare = plan.match(/\[C\d+\]/g) || [];
  if (bare.length > 1) fail('unmarked citations: ' + bare.join(' '));
  const inf = (plan.match(/INFERENCE/g) || []).length;
  if (inf < 5) fail('too few INFERENCE marks: ' + inf);
  console.log(`CLAIMS_OK (${cites.length} citations, ${inf} inference marks)`);
} else if (mode === 'nosite') {
  const root = execSync('git rev-parse --show-toplevel', { cwd: here }).toString().trim();
  const committed = execSync('git diff --name-only origin/claude/mondai-collection...HEAD', { cwd: root }).toString();
  const work = execSync('git status --porcelain', { cwd: root }).toString().split('\n').map(l => l.slice(3));
  const files = [...committed.split('\n'), ...work].filter(Boolean);
  const out = files.filter(f => !f.startsWith('reports/page-transition-research/'));
  if (out.length) fail('changes outside the report folder: ' + out.join(', '));
  console.log('NOSITE_OK');
} else fail('mode?');
