#!/usr/bin/env node
// Checks a CS2 loop step 5 output (the slot plan) before he sees it.
// Usage: node check-slot-plan.mjs <plan-file>
// Passes only when the file holds a slot plan table (layout piece, slot, what goes in it, why) with a
// filled row per slot, and nothing from Haven, no Figma build work, no carried over template content
// and no visuals. Prints SLOTPLAN_PASS and exits 0, or lists every violation and exits 1.
// The judgment half (is anything taken from Haven or a template rather than from this section) is a
// yes/no question for a separate reviewer; see step 5 in CS2_PROCESS.md.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const HEADER = ['layout piece', 'slot', 'what goes in it', 'why'];
const BANNED = [
  [/\bhaven\b/i, 'Haven named: the plan borrows from or measures against Haven'],
  [/\buse_figma\b|\bduplicat(e|ed|ing)\b/i, 'Figma build work (duplicating or writing to Figma)'],
  [/\b\d{3,5}:\d{3,6}\b/, 'Figma node id: the plan points at a built or template frame'],
  [/\b(built|rebuilt|placed|filled) (it |the section |the frame )?in figma\b/i, 'Figma build reported as done'],
  [/\b(robinhood|midjourney|windsurf|suno|metalab|calvin klein|the atlantic|headspace)\b/i,
    'template source named: its images and diagrams are template content'],
  [/\b(template'?s?|existing|current) (image|images|diagram|diagrams|illustration|graphic|screenshot)s?\b/i,
    'carries over template imagery'],
  [/\b(as in|from|kept from|keep) the template\b/i, 'carries over template content'],
  [/\b(five|5)\b[^|.]{0,30}\b(pathway|stage)s?\b|\bpathway (marks|circles|dots|row|line|route)\b|\bacross the (five )?pathways\b|\broute (diagram|line|map)\b|\bthe map\b/i,
    'route diagram: a row of the five Pathways is not a standing figure; it needs his yes for a claim about their order'],
  [/!\[|<svg|<img|\.(png|svg|jpe?g|gif)\b/i, 'a visual instead of words'],
];

const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.error('usage: check-slot-plan.mjs <plan-file>'); process.exit(2); }
const lines = fs.readFileSync(file, 'utf8').split('\n');
const problems = [];

const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
let rows = 0;
let inTable = false;
lines.forEach((l, i) => {
  for (const [re, why] of BANNED) if (re.test(l)) problems.push(`line ${i + 1}: ${why}: ${l.trim().slice(0, 100)}`);
  if (/^\s*\|/.test(l)) {
    const c = cells(l);
    if (!inTable) {
      inTable = c.length === HEADER.length && c.every((x, k) => x.toLowerCase() === HEADER[k]);
      return;
    }
    if (c.every(x => /^:?-+:?$/.test(x))) return;
    rows++;
    if (c.length !== HEADER.length) problems.push(`line ${i + 1}: row has ${c.length} cells, needs ${HEADER.length}`);
    else c.forEach((x, k) => { if (!x) problems.push(`line ${i + 1}: empty "${HEADER[k]}" cell`); });
  } else inTable = false;
});
// The message plan comes first: a slot plan saved to layout/section-N.md needs a passing message/section-N.md.
const real = process.argv[3];
if (real && /layout\/section-(\d+)\.md$/.test(real)) {
  const msg = real.replace(/layout\/(section-\d+\.md)$/, 'message/$1');
  if (!fs.existsSync(msg)) problems.unshift(`no message plan at ${msg}: write the claims and what each block must show first`);
  else {
    const m = spawnSync('node', [new URL('./check-message-plan.mjs', import.meta.url).pathname, msg], { encoding: 'utf8' });
    if (m.status !== 0) problems.unshift(`message plan fails: ${m.stdout.trim().split('\n').join('; ')}`);
  }
}
if (rows < 2) problems.unshift(`no slot plan table: needs a table headed | Layout piece | Slot | What goes in it | Why | with a row per slot (found ${rows} rows)`);

if (problems.length) { console.log(problems.join('\n')); console.log('SLOTPLAN_FAIL'); process.exit(1); }
console.log(`SLOTPLAN_PASS (${rows} slots)`);
