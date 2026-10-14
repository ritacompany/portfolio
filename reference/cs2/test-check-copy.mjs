// Proves check-copy.mjs catches what it exists to catch: planted violations, a clean control,
// and the real copy that broke the rules (section 1 Draft 3, section 2 Draft 4).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const here = import.meta.dirname;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cs2copy-'));
const run = (body, section = 2, raw = false) => {
  const f = path.join(tmp, `c${Math.random().toString(36).slice(2)}.md`);
  fs.writeFileSync(f, raw ? `Section: ${section}\n\n${body}\n` : `Section: ${section}\n\n## 1\n\nEyebrow: The week\n\nHeadline: The week is the unit.\n\n${body}\n`);
  const r = spawnSync('node', [path.join(here, 'check-copy.mjs'), f], { encoding: 'utf8' });
  return { status: r.status, out: r.stdout };
};
const draftCopy = (file, start, end) => {
  const lines = fs.readFileSync(path.join(here, 'draft', file), 'utf8').split('\n');
  const a = lines.findIndex(l => l.startsWith(start));
  const b = lines.findIndex((l, i) => i > a && l.startsWith(end));
  return lines.slice(a + 1, b).join('\n');
};

const planted = [
  ['name', 'Michael wanted the other risk covered.', 'colleague name'],
  ['quote', 'The lead said "it is not worth shipping" at kickoff.', 'quotation marks'],
  ['em dash', 'The week holds the work — nothing else.', 'dash'],
  ['spaced hyphen', 'The week holds the work - nothing else.', 'dash'],
  ['Oxford comma', 'It held the route, the week, and the calendar.', 'Oxford comma'],
  ['two by two', 'None of them sat where Mondai needed to be.', 'two by two'],
  ['early term', 'Each Pathway broke into Action Items.', 'before section'],
  ['AI vocabulary', 'This pivotal shift changed the work.', 'AI vocabulary'],
  ['negative parallelism', "It wasn't just a task; it was a daily burden.", 'negative parallelism'],
];
let ok = true;
for (const [label, line, expect] of planted) {
  const section = label === 'early term' ? 1 : 2;
  const r = run(line, section);
  const caught = r.status === 1 && r.out.includes(expect);
  ok &&= caught;
  console.log(`${caught ? 'ok  ' : 'MISS'} planted ${label}`);
}
const clean = run('The week is the deadline. Inside it, the user picks the order.\n\nLabel: One level up. Ahead or behind.', 2);
const cleanOk = clean.status === 0 && clean.out.includes('CS2COPY_PASS');
ok &&= cleanOk;
console.log(`${cleanOk ? 'ok  ' : 'FALSE ALARM'} clean control passes${cleanOk ? '' : '\n' + clean.out}`);
const shape = [
  ['essay, no blocks', run('The week is the deadline.\n\nInside it, the user picks the order.', 2, true), 'no "## " blocks'],
  ['block with no eyebrow', run('## 1\n\nHeadline: The week is the unit.\n\nThe week is the deadline.', 2, true), 'no Eyebrow: line'],
  ['two body paragraphs', run('The week is the deadline.\n\nInside it, the user picks the order.'), 'body paragraphs, max 1'],
  ['body over 70 words', run(Array(75).fill('word').join(' ')), 'max 70'],
];
for (const [label, r, expect] of shape) {
  const caught = r.status === 1 && r.out.includes(expect);
  ok &&= caught;
  console.log(`${caught ? 'ok  ' : 'MISS'} shape ${label}`);
}
const noHeader = spawnSync('node', [path.join(here, 'check-copy.mjs'), (() => { const f = path.join(tmp, 'nh.md'); fs.writeFileSync(f, 'Plain line.\n'); return f; })()], { encoding: 'utf8' });
ok &&= noHeader.status === 1;
console.log(`${noHeader.status === 1 ? 'ok  ' : 'MISS'} file without a Section header fails`);

const s1 = run(draftCopy('CS2-section-1.md', '## Draft 3', '### Sources for Draft 3'), 1);
const s2 = run(draftCopy('CS2-section-2.md', '### Copy', '### Sources per claim'), 2);
for (const [label, r] of [['section 1 Draft 3', s1], ['section 2 Draft 4', s2]]) {
  const failed = r.status === 1 && r.out.includes('colleague name');
  ok &&= failed;
  console.log(`${failed ? 'ok  ' : 'MISS'} real ${label} fails\n${r.out.split('\n').slice(1).map(l => '      ' + l).join('\n')}`);
}
fs.rmSync(tmp, { recursive: true, force: true });
if (ok) console.log('copy check discrimination passed');
process.exit(ok ? 0 : 1);
