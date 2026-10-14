#!/usr/bin/env node
// Checks a CS2 step 5 message plan (reference/cs2/message/section-N.md) before any layout is planned.
// Usage: node check-message-plan.mjs <message-file> [copy-file]
// Passes when every block of the copy file has a message block holding a claim, what the reader has to
// see, whether the copy already shows it, and a figure count, and when no layout piece is named.
// Prints MESSAGE_PASS and exits 0, or lists every problem and exits 1.
import fs from 'node:fs';
import path from 'node:path';

const [file, copyArg] = process.argv.slice(2);
if (!file || !fs.existsSync(file)) { console.error('usage: check-message-plan.mjs <message-file> [copy-file]'); process.exit(2); }
const text = fs.readFileSync(file, 'utf8');
const problems = [];
const blocks = text.split(/^## /m).slice(1);
const n = (text.match(/^Section: (\d+)/m) || [])[1];
const copy = copyArg || (n && path.join(path.dirname(file), '..', 'copy', `section-${n}.md`));
if (!n) problems.push('first line must be "Section: N"');
if (copy && fs.existsSync(copy)) {
  const want = (fs.readFileSync(copy, 'utf8').match(/^## /gm) || []).length;
  if (blocks.length !== want) problems.push(`${blocks.length} message blocks for ${want} copy blocks`);
}
const NEED = [[/^- Claim:/m, 'Claim'], [/^- What the reader has to see:/m, 'What the reader has to see'],
  [/^- Already shown by the copy:/m, 'Already shown by the copy'], [/^- Figure count: \d/m, 'Figure count']];
blocks.forEach((b, i) => { for (const [re, name] of NEED) if (!re.test(b)) problems.push(`block ${i + 1}: no "${name}" line`); });
if (/\b(TextAnd\dImages?|TitleAndText|StatRows|MediaSlider|layout \d)\b/i.test(text)) problems.push('a layout piece is named: the message plan comes before layout');
if (problems.length) { console.log(problems.join('\n')); console.log('MESSAGE_FAIL'); process.exit(1); }
console.log(`MESSAGE_PASS (${blocks.length} blocks)`);
