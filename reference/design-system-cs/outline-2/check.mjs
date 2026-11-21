// Checks outline 2's material file. Run from the portfolio root: node reference/design-system-cs/outline-2/check.mjs [mondaiRoot]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const mondai = process.argv[2] || '../mondai';
const s = readFileSync('reference/design-system-cs/outline-2/MATERIAL.md', 'utf8');
let fail = 0;
const secs = s.split(/^### /m).slice(1);
if (secs.length !== 6) { console.log('sections', secs.length); fail++; }
for (const x of secs) {
  const name = x.split('\n')[0];
  for (const k of [/\*\*(Decisions|Job|Items)\.\*\*/, /\*\*Visual\.\*\*/, /\*\*Tactic\.\*\*/])
    if (!k.test(x)) { console.log('missing', k, 'in', name); fail++; }
}
const paths = new Set();
for (const m of s.matchAll(/Mondai\s+`([^`]+)`/g)) paths.add(m[1]);
for (const m of s.matchAll(/`((?:\.claude|process|design-system-ai|design-system-plan|ops)\/[^`]+)`/g)) paths.add(m[1]);
for (const p of paths) if (!existsSync(join(mondai, p.replace(/\/$/, '')))) { console.log('missing path', p); fail++; }
if (/[–—]|--/.test(s)) { console.log('dash found'); fail++; }
console.log(fail ? 'FAIL' : `PASS sections=${secs.length} paths=${paths.size}`);
process.exit(fail ? 1 : 0);
