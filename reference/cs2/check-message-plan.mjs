#!/usr/bin/env node
// Checks a CS2 step 5 message plan (reference/cs2/message/section-N.md) before any layout is planned.
// Usage: node check-message-plan.mjs <message-file> [real-path-or-copy-file]
// The second argument is the plan's real path (the hook checks a temp copy) or the copy file itself.
// Rewritten 16 Oct on his notes: visuals are image slots he fills, never figures Claude draws, and the
// writing has to use the tactics and case study books. Each block needs:
//   - Claim: the point, in plain words.
//   - What the reader has to see: to believe it.
//   - Moves: ids from CS2_REFERENCE_INDEX.md that the block's copy uses, at least one.
//   - Images: a count. Then one "- Image N: <the real thing he supplies> | Supports: <the point it backs>".
// No layout piece named (layout is pass 2), no drawn diagram or chart, no Pathway row without his
// line in APPROVALS.md. Prints MESSAGE_PASS and exits 0, or lists every problem and exits 1.
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

const indexFile = path.join(path.dirname(new URL(import.meta.url).pathname), 'CS2_REFERENCE_INDEX.md');
const MOVES = new Set(fs.existsSync(indexFile) ? [...fs.readFileSync(indexFile, 'utf8').matchAll(/^- ([a-z]+-[a-z]*\d+) ·/gm)].map(m => m[1]) : []);
const DRAWN = /\b(diagram|chart|graph|data vi[sz]\w*|infographic|illustration|drawn|draw|circles?|timeline drawing|flow ?chart|icons?)\b/i;

blocks.forEach((b, i) => {
  const k = i + 1;
  const field = name => (b.match(new RegExp(`^- ${name}:\\s*(.*)$`, 'im')) || [])[1];
  for (const name of ['Claim', 'What the reader has to see', 'Moves', 'Images'])
    if (!field(name)?.trim()) problems.push(`block ${k}: no "- ${name}:" line`);
  const moves = (field('Moves') || '').match(/[a-z]+-[a-z]*\d+/g) || [];
  if (field('Moves') && !moves.length) problems.push(`block ${k}: Moves names no index id`);
  for (const m of moves) if (!MOVES.has(m)) problems.push(`block ${k}: move "${m}" is not in CS2_REFERENCE_INDEX.md`);
  const count = Number((field('Images') || '').match(/^\d+/)?.[0] ?? NaN);
  if (field('Images')?.trim() && !Number.isFinite(count)) problems.push(`block ${k}: Images must start with a digit`);
  const imgs = [...b.matchAll(/^- Image \d+:\s*(.*)$/gim)].map(m => m[1]);
  if (Number.isFinite(count) && imgs.length !== count) problems.push(`block ${k}: Images ${count} but ${imgs.length} "- Image N:" lines`);
  imgs.forEach((f, j) => {
    if (!/\|\s*Supports:\s*\S/i.test(f)) problems.push(`block ${k}: image ${j + 1} does not say "Supports:" which point it backs`);
    if (DRAWN.test(f.split('|')[0])) problems.push(`block ${k}: image ${j + 1} asks for a drawn visual; image slots hold real things he supplies`);
  });
  if (imgs.some(f => ROUTE.test(f)) && !approved(cs2Dir, n, k))
    problems.push(`block ${k}: an image shows the Pathways as a row or line; only with his line "- Section ${n} block ${k}: route figure" in APPROVALS.md`);
});
if (!blocks.length) problems.push('no "## " blocks');

if (problems.length) { console.log(problems.join('\n')); console.log('MESSAGE_FAIL'); process.exit(1); }
console.log(`MESSAGE_PASS (${blocks.length} blocks)`);
