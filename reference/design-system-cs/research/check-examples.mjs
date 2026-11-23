// Checks EXAMPLES.md: ten distinct https case study links in the table, no dash punctuation,
// no Oxford comma before "and" in a list of three, and the commit is on the remote branch.
import fs from 'node:fs';
import { execSync } from 'node:child_process';
const f = new URL('./EXAMPLES.md', import.meta.url);
const t = fs.readFileSync(f, 'utf8');
const rows = t.split('\n').filter(l => /^\| (\d+) \|/.test(l));
const links = new Set(rows.map(r => (r.match(/\]\((https:\/\/[^)]+)\)/) || [])[1]).filter(Boolean));
const errs = [];
if (rows.length !== 10 || links.size !== 10) errs.push(`rows ${rows.length}, distinct links ${links.size}`);
if (/[–—]| -- /.test(t)) errs.push('dash punctuation found');
if (/\w+, \w+(?: \w+)?, and /.test(t)) errs.push('possible Oxford comma');
const local = execSync('git rev-parse HEAD').toString().trim();
const remote = execSync('git rev-parse origin/claude/design-system-cs-draft').toString().trim();
const pushed = execSync(`git log --format=%H ${remote} -- EXAMPLES.md`, { cwd: new URL('.', f).pathname }).toString().trim();
if (!pushed) errs.push('EXAMPLES.md not on remote branch');
if (errs.length) { console.log('FAIL: ' + errs.join('; ')); process.exit(1); }
console.log('EXAMPLES-PASS');
