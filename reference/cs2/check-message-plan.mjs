#!/usr/bin/env node
// Checks a CS2 step 5 message plan (reference/cs2/message/section-N.md) before any layout is planned.
// Usage: node check-message-plan.mjs <message-file> [real-path-or-copy-file]
// The second argument is the plan's real path (the hook checks a temp copy) or the copy file itself.
// Passes when every copy block has a message block whose answers agree with each other:
// "Still missing from the copy: nothing" means 0 figures, anything else means at least one; one
// "Figure N:" line per figure, each saying what part of the claim it proves; labels only with a figure;
// no layout piece named; no figure of the Pathways in a row unless Chadwick approved it in APPROVALS.md.
// Prints MESSAGE_PASS and exits 0, or lists every problem and exits 1.
import fs from 'node:fs';
import path from 'node:path';

import { ROUTE, approved } from './route-rule.mjs';

const [file, second] = process.argv.slice(2);
if (!file || !fs.existsSync(file)) { console.error('usage: check-message-plan.mjs <message-file> [real-path-or-copy-file]'); process.exit(2); }
const text = fs.readFileSync(file, 'utf8');
const problems = [];
const n = (text.match(/^Section: (\d+)/m) || [])[1];
if (!n) problems.push('first line must be "Section: N"');
const real = second && /message\/section-\d+\.md$/.test(second) ? second : null;
const cs2Dir = path.resolve(path.dirname(real || file), '..');
const copy = second && !real ? second : n && path.join(cs2Dir, 'copy', `section-${n}.md`);
const blocks = text.split(/^## /m).slice(1);
if (copy && fs.existsSync(copy)) {
  const want = (fs.readFileSync(copy, 'utf8').match(/^## /gm) || []).length;
  if (blocks.length !== want) problems.push(`${blocks.length} message blocks for ${want} copy blocks`);
}
if (/\b(TextAnd\dImages?|TitleAndText|StatRows|MediaSlider\w*|layout \d)\b/i.test(text)) problems.push('a layout piece is named: the message plan comes before layout');

blocks.forEach((b, i) => {
  const k = i + 1;
  const field = name => (b.match(new RegExp(`^- ${name}:\\s*(.*)$`, 'im')) || [])[1];
  for (const name of ['Claim', 'What the reader has to see', 'Still missing from the copy', 'Figure count'])
    if (!field(name)?.trim()) problems.push(`block ${k}: no "- ${name}:" line`);
  const missing = (field('Still missing from the copy') || '').trim().toLowerCase();
  const count = Number((field('Figure count') || '').match(/^\d+/)?.[0] ?? NaN);
  if (field('Figure count')?.trim() && !Number.isFinite(count)) problems.push(`block ${k}: figure count must start with a digit`);
  const figs = [...b.matchAll(/^- Figure \d+:\s*(.*)$/gim)].map(m => m[1]);
  if (missing && Number.isFinite(count)) {
    if (/^nothing\b/.test(missing) && count !== 0) problems.push(`block ${k}: nothing is missing from the copy but the figure count is ${count}`);
    if (!/^nothing\b/.test(missing) && count === 0) problems.push(`block ${k}: something is missing from the copy but the figure count is 0`);
  }
  if (count > 2) problems.push(`block ${k}: ${count} figures; at most two, and a second only when the first and the copy leave a named part unproven`);
  if (Number.isFinite(count) && figs.length !== count) problems.push(`block ${k}: figure count ${count} but ${figs.length} "- Figure N:" lines`);
  figs.forEach((f, j) => { if (!/\bProves:\s*\S/i.test(f)) problems.push(`block ${k}: figure ${j + 1} does not say "Proves:" which part of the claim`); });
  if (/^- Labels:/im.test(b) && count === 0) problems.push(`block ${k}: labels with no figure; text items belong in the copy as cards`);
  if (figs.some(f => ROUTE.test(f)) && !approved(cs2Dir, n, k))
    problems.push(`block ${k}: a figure draws the Pathways as a row or line; only with his line "- Section ${n} block ${k}: route figure" in APPROVALS.md`);
});
if (!blocks.length) problems.push('no "## " blocks');

if (problems.length) { console.log(problems.join('\n')); console.log('MESSAGE_FAIL'); process.exit(1); }
console.log(`MESSAGE_PASS (${blocks.length} blocks)`);
