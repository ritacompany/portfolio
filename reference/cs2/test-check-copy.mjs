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
  fs.writeFileSync(f, raw ? `Section: ${section}\n\n${body}\n` : `Section: ${section}\n\n## 1\n\nEyebrow: Unit of time\n\nHeadline: The week became the unit because the people this is for do not live regular weeks.\n\n${body}\n`);
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
  ['unlisted name', 'Jordan wanted the other risk covered.', 'names a person'],
  ['single quotes', "The lead called it 'not worth shipping' at kickoff.", 'single quotation marks'],
  ['curly single quotes', 'The lead called it ‘not worth shipping’ at kickoff.', 'single quotation marks'],
  ['Oxford, longer items', 'It held the full route, the weekly plan, and the calendar view.', 'Oxford comma'],
];
let ok = true;
for (const [label, line, expect] of planted) {
  const section = label === 'early term' ? 1 : 2;
  const r = run(line, section);
  const caught = r.status === 1 && r.out.includes(expect);
  ok &&= caught;
  console.log(`${caught ? 'ok  ' : 'MISS'} planted ${label}`);
}
// Sentences that must pass: clause commas, apostrophes, first person.
for (const [label, line] of [
  ['clause commas', 'When the week ended, nothing carried over, and nothing failed.'],
  ['apostrophes', "Don't connect a calendar and the week's work is a list."],
  ['first person', 'I wanted the pressure at the edge of the week.'],
]) {
  const r = run(line, 2);
  const passed = r.status === 0;
  ok &&= passed;
  console.log(`${passed ? 'ok  ' : 'FALSE ALARM'} clean ${label}${passed ? '' : '\n' + r.out}`);
}
// His own headlines, 23 Oct screenshots (frame blocks 5 and 6, Haven): each must pass. Short labels must not.
const his = [
  "Structure had to exist, in fact it's foundational to the type of product we were building.",
  'The amount of action items each user was assigned per week became based on two things:',
  'Users need to understand who the Confidante is before making a decision. They need to feel understood, represented and safe.',
  'People needed to know what to expect before booking an introductory chat.',
  'When speaking out loud is not safe or private, the interaction itself has to lower the barrier to asking for support.',
  "An expert program designed for flexibility, adapting to each user's unique needs and comfort.",
  'Identity shapes what safe, relevant support looks like. The quiz makes room for the experiences behind each match.',
  'For many LGBTQIA+ teenagers, finding a sense of belonging and acceptance can be a difficult and isolating experience.',
  "Minors need a guardian's consent to join a study. Asking would out the teens who need Haven most, so I interviewed two proxy groups instead.",
];
const withHeadline = h => run(`## 1\n\nEyebrow: Topic\n\nHeadline: ${h}\n\nOne plain line of body.`, 11, true);
for (const h of his) {
  const r = withHeadline(h);
  ok &&= r.status === 0;
  console.log(`${r.status === 0 ? 'ok  ' : 'FALSE ALARM'} his headline passes: ${h.slice(0, 40)}${r.status === 0 ? '' : '\n' + r.out}`);
}
for (const [label, h] of [
  ['short label headline', 'The week is a list with times and a target.'],
  ['very short headline', 'Rollover moves the week.'],
  ['run on headline', Array(30).fill('word').join(' ') + '.'],
]) {
  const r = withHeadline(h);
  const caught = r.status === 1 && r.out.includes('his headlines run 12 to 25');
  ok &&= caught;
  console.log(`${caught ? 'ok  ' : 'MISS'} planted ${label}`);
}
const clean = run('The week is the deadline. Inside it, the user picks the order.\n\nCard: 01 | Ahead | Shown against the week.\n\nAside: Loss aversion | A date that holds still makes drift visible, and visible drift drives recovery.', 2);
const cleanOk = clean.status === 0 && clean.out.includes('CS2COPY_PASS');
ok &&= cleanOk;
console.log(`${cleanOk ? 'ok  ' : 'FALSE ALARM'} clean control passes${cleanOk ? '' : '\n' + clean.out}`);
const shape = [
  ['essay, no blocks', run('The week is the deadline.\n\nInside it, the user picks the order.', 2, true), 'no "## " blocks'],
  ['block with no eyebrow', run('## 1\n\nHeadline: The week is the unit.\n\nThe week is the deadline.', 2, true), 'no Eyebrow: line'],
  ['two body paragraphs', run('The week is the deadline.\n\nInside it, the user picks the order.'), 'body paragraphs, max 1'],
  ['body over 70 words', run(Array(75).fill('word').join(' ')), 'max 70'],
  ['label in copy', run('Label: This week'), 'is figure text'],
  ['caption in copy', run('Caption: Research points the same way.'), 'is figure text'],
  ['card with no title', run('Card: 01 | Locked past this week.'), 'label | title | body'],
  ['two asides', run('One line.\n\nAside: Loss aversion | Drift that shows drives recovery.\nAside: Goal gradient | People speed up near the end.'), 'Aside: lines, max 1'],
  ['aside with no sentence', run('One line.\n\nAside: Loss aversion'), 'name | one sentence'],
  ['aside name too long', run('One line.\n\nAside: The famous loss aversion finding | Drift that shows drives recovery.'), 'over 4 words'],
  ['aside two sentences', run('One line.\n\nAside: Loss aversion | Drift that shows drives recovery. People hate losing.'), 'aside over 1 sentence'],
  ['aside too long', run('One line.\n\nAside: Loss aversion | ' + Array(30).fill('word').join(' ') + '.'), 'aside sentence over 25 words'],
  ['aside says used', run('One line.\n\nAside: Loss aversion | We used it to keep the date still.'), 'says the principle was used'],
  ['principle in body', run('I kept the date still because of loss aversion.'), 'named outside the Aside: line'],
  ['principle in card', run('One line.\n\nCard: Kept | Stable date | Planning fallacy made us cautious.'), 'named outside the Aside: line'],
  ['eyebrow repeats headline', run('## 1\n\nEyebrow: The closest products\n\nHeadline: The closest products each solved half of it.\n\nOne line.', 1, true), 'eyebrow repeats the headline'],
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
