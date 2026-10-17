#!/usr/bin/env node
// Checks a CS2 loop step 5 output (the slot plan) before he sees it.
// Usage: node check-slot-plan.mjs <plan-file> [real-path]
// With the real path (the guard hook passes it) it also needs a passing message/section-N.md, matches each
// block's image slots to that plan's figure count and needs a PASS from the story review.
// Every row's "What goes in it" starts with "Block N" so slots can be matched to the message plan.
// Passes only when the file holds a slot plan table (layout piece, slot, what goes in it, why) with a
// filled row per slot, and nothing from Haven, no Figma build work, no carried over template content
// and no visuals. Prints SLOTPLAN_PASS and exits 0, or lists every violation and exits 1.
// The judgment half (is anything taken from Haven or a template rather than from this section) is a
// yes/no question for a separate reviewer; see step 5 in CS2_PROCESS.md.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROUTE, approved } from './route-rule.mjs';

const HEADER = ['layout piece', 'slot', 'what goes in it', 'why'];
// His layout pool (Case study layouts, decoded in LEDGER.md). A layout piece outside it is refused.
const POOL = /^(TitleAndText position [123]|TextAnd1Image layout [1-4]|TextAnd2Images layout [1-5]|TextAnd3Images layout [1246]|MediaSliderAndText|VideoScrollerAndText|StatRows|Quote|MinimalQuote|ReviewCardWithBackground)$/i;

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
  [/!\[|<svg|<img|\.(png|svg|jpe?g|gif)\b/i, 'a visual instead of words'],
];

const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.error('usage: check-slot-plan.mjs <plan-file>'); process.exit(2); }
const lines = fs.readFileSync(file, 'utf8').split('\n');
const problems = [];

const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
let rows = 0;
const media = [];
let maxBlock = 0;
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
    if (c.length !== HEADER.length) { problems.push(`line ${i + 1}: row has ${c.length} cells, needs ${HEADER.length}`); return; }
    c.forEach((x, k) => { if (!x) problems.push(`line ${i + 1}: empty "${HEADER[k]}" cell`); });
    if (!POOL.test(c[0])) problems.push(`line ${i + 1}: "${c[0]}" is not a layout from his pool`);
    const block = Number((c[2].match(/^Block (\d+)\b/i) || [])[1]);
    if (!block) problems.push(`line ${i + 1}: "What goes in it" must start with "Block N"`);
    // Any slot that is not plainly a text slot counts as an image slot, whatever it is called.
    if (!/^(eyebrow|headline|title|heading|body|text|copy|caption|cards?|list|rows?|items?)\b/i.test(c[1])) {
      media.push({ block, line: i + 1, text: c[2] });
    }
    maxBlock = Math.max(maxBlock, block || 0);
  } else inTable = false;
});
// The message plan comes first: a slot plan saved to layout/section-N.md needs a passing message/section-N.md.
const real = process.argv[3];
if (real && /layout\/section-(\d+)\.md$/.test(real)) {
  const msg = real.replace(/layout\/(section-\d+\.md)$/, 'message/$1');
  if (!fs.existsSync(msg)) problems.unshift(`no message plan at ${msg}: write the claims and what each block must show first`);
  else {
    const here = path.dirname(new URL(import.meta.url).pathname);
    const m = spawnSync('node', [path.join(here, 'check-message-plan.mjs'), msg, msg], { encoding: 'utf8' });
    if (m.status !== 0) problems.unshift(`message plan fails: ${m.stdout.trim().split('\n').join('; ')}`);
    const mt = fs.readFileSync(msg, 'utf8');
    const section = (mt.match(/^Section: (\d+)/m) || [])[1];
    const cs2Dir = path.resolve(path.dirname(msg), '..');
    const mblocks = mt.split(/^## /m).slice(1);
    if (maxBlock > mblocks.length) problems.push(`a slot names block ${maxBlock} but the message plan has ${mblocks.length} blocks`);
    mblocks.forEach((b, i) => {
      const want = Number((b.match(/^- Images:\s*(\d+)/im) || [])[1] ?? 0);
      const got = media.filter(x => x.block === i + 1).length;
      if (got !== want) problems.push(`block ${i + 1}: ${got} image slots for ${want} images in the message plan`);
    });
    for (const x of media) if (ROUTE.test(x.text) && !approved(cs2Dir, section, x.block))
      problems.push(`line ${x.line}: block ${x.block} image slot draws the Pathways as a row or line; only with his line "- Section ${section} block ${x.block}: route figure" in APPROVALS.md`);
    const copy = path.join(cs2Dir, 'copy', `section-${section}.md`);
    if (!problems.length) {
      const rv = spawnSync('node', [path.join(here, 'check-figures-review.mjs'), copy, msg, file], { encoding: 'utf8', env: process.env });
      if (rv.status !== 0) problems.push(`story review: ${rv.stdout.trim().split('\n').join('; ')}`);
    }
  }
}
if (rows < 2) problems.unshift(`no slot plan table: needs a table headed | Layout piece | Slot | What goes in it | Why | with a row per slot (found ${rows} rows)`);

if (problems.length) { console.log(problems.join('\n')); console.log('SLOTPLAN_FAIL'); process.exit(1); }
console.log(`SLOTPLAN_PASS (${rows} slots)`);
