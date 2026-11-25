// Checks STATUS.md against the repo: sections, punctuation, and the branch facts it states.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
const f = readFileSync(new URL('./STATUS.md', import.meta.url), 'utf8');
const fail = (m) => { console.log('FAIL ' + m); process.exit(1); };
const which = process.argv[2];
const sh = (c) => { try { execSync(c, { stdio: 'ignore' }); return true; } catch { return false; } };
if (which === 'sections') {
  for (const h of ['## Done', '## Open', '## Next']) if (!f.includes('\n' + h + '\n')) fail('missing ' + h);
  const next = f.split('## Next')[1];
  if ((next.match(/^\d\. \*\*/gm) || []).length !== 3) fail('Next does not have exactly three items');
  console.log('sections ok');
} else if (which === 'dashes') {
  if (/[–—]/.test(f) || / -- /.test(f)) fail('dash found');
  if (!/[–—]/.test('x—y')) fail('control');
  console.log('dashes ok');
} else if (which === 'branches') {
  const o = 'origin/';
  const anc = (a, b) => sh(`git merge-base --is-ancestor ${o}${a} ${o}${b}`);
  const checks = [
    [!anc('main', 'claude/haven-flow-order'), 'main not in stack'],
    [anc('site-cursor', 'main'), 'site cursor on main'],
    [!anc('claude/haven-flow-order', 'main'), 'flow order not on main'],
    [!anc('claude/haven-mobile', 'claude/haven-flow-order'), 'flow order lacks haven-mobile tip'],
    [anc('claude/relaxed-ride-5mlbdu', 'claude/sharp-turing-jy21r2'), 'relaxed in sharp-turing'],
    [anc('claude/sharp-turing-jy21r2', 'claude/haven-mobile'), 'sharp-turing in haven-mobile'],
    [anc('claude/pensive-cray-tn22je', 'claude/sharp-turing-jy21r2'), 'PR 40 in sharp-turing'],
  ];
  for (const [ok, m] of checks) if (!ok) fail(m);
  if (!execSync(`git show ${o}claude/haven-flow-order:site/haven/index.html`).toString().includes('Revised flow: identity quiz, review matches, schedule a chat, intro chat, select a Confidante')) fail('flow order text');
  console.log('branches ok');
} else if (which === 'pushed') {
  if (execSync('git rev-parse HEAD').toString() !== execSync('git rev-parse origin/claude/portfolio-status').toString()) fail('not pushed');
  console.log('pushed ok');
} else fail('unknown check');
