#!/usr/bin/env node
// Checks CS2 page copy against Chadwick's copy rules. Used by the copy guard hook and by hand.
// Usage: node check-copy.mjs <copy-file> [--section N]
// A copy file holds page copy only. Its first line is "Section: N". Lines inside <!-- --> are ignored.
// Copy is written as blocks: each "## " block has an Eyebrow: line, a Headline: line and at most one body
// paragraph of at most 70 words. Label: and Caption: lines are figure text, not body. A label is one to three
// words, as on the Haven case study. Longer figure text is a card: "Card: label | title | body", label and title
// at most three words each, body at most two sentences. The eyebrow names the topic and never repeats the headline.
// Prints CS2COPY_PASS and exits 0, or lists every violation and exits 1.
import fs from 'node:fs';

const NAMES = ['Betsy', 'Michael']; // colleagues; add any other name that must never reach copy
// Product terms and the section that introduces each (from the concept ladder in CS2_COMPREHENSION.md).
const TERMS = [
  ['Growth Journey', 1], ['Pathway', 1], ['Action Item', 2], ['Action Hub', 2], ['target date', 3],
  ['rollover', 5], ['recalibrat', 6], ['handoff', 8],
];
const AI_PATTERNS = [
  [/\btapestry\b/i, 'AI vocabulary: tapestry'], [/\blandscape\b/i, 'AI vocabulary: landscape'],
  [/\bpivotal\b/i, 'AI vocabulary: pivotal'], [/\bunderscores?\b/i, 'AI vocabulary: underscore'],
  [/\bdelve/i, 'AI vocabulary: delve'], [/\bseamless(ly)?\b/i, 'AI vocabulary: seamless'],
  [/\bleverag/i, 'AI vocabulary: leverage'], [/\brobust\b/i, 'AI vocabulary: robust'],
  [/\btestament\b/i, 'AI vocabulary: testament'], [/\bfast-paced\b/i, 'AI vocabulary: fast-paced'],
  [/\b(?:wasn't|isn't|wasn't|was not|is not|not) just\b[^.]*[;,] (?:it|but)\b/i, 'negative parallelism ("not just X, it was Y")'],
  [/\bdidn't just\b/i, 'negative parallelism ("didn\'t just")'],
  [/^\s*(?:Ultimately|In the end|In short|In summary),/im, 'summary closer'],
  [/\bthe importance of\b/i, 'moralizing closer ("the importance of")'],
];

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--'));
if (!file || !fs.existsSync(file)) { console.error(`usage: check-copy.mjs <copy-file> [--section N]`); process.exit(2); }
const raw = fs.readFileSync(file, 'utf8');
const sectionArg = args.includes('--section') ? Number(args[args.indexOf('--section') + 1]) : NaN;
const sectionLine = raw.match(/^Section:\s*(\d+)/m);
const section = Number.isFinite(sectionArg) ? sectionArg : sectionLine ? Number(sectionLine[1]) : NaN;

const problems = [];
if (!Number.isFinite(section)) problems.push('line 1: missing "Section: N" header, so product terms cannot be checked');

const text = raw.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
const lines = text.split('\n');
lines.forEach((line, i) => {
  const n = i + 1;
  if (/^Section:\s*\d+/.test(line)) return;
  for (const name of NAMES) if (new RegExp(`\\b${name}\\b`).test(line)) problems.push(`line ${n}: colleague name "${name}"`);
  if (/["“”]/.test(line)) problems.push(`line ${n}: quotation marks (no quotes from anyone)`);
  if (/[—–]|\s--\s|\w\s-\s\w/.test(line)) problems.push(`line ${n}: dash`);
  if (/\b[\w'-]+(?: [\w'-]+){0,2}, [\w'-]+(?: [\w'-]+){0,2}, (?:and|or) /i.test(line)) problems.push(`line ${n}: Oxford comma`);
  if (/two by two|\b2 ?x ?2\b|\b2 by 2\b|\bmatrix\b|\bquadrant|upper right|sat where|in the corner/i.test(line)) problems.push(`line ${n}: two by two, in words`);
  if (Number.isFinite(section)) for (const [term, from] of TERMS)
    if (section < from && new RegExp(`\\b${term}`, 'i').test(line)) problems.push(`line ${n}: product term "${term}" before section ${from} introduces it`);
  for (const [re, label] of AI_PATTERNS) if (re.test(line)) problems.push(`line ${n}: ${label}`);
});

const blocks = text.split(/^## /m).slice(1);
if (!blocks.length) problems.push('no "## " blocks: copy is written as blocks (eyebrow, headline, labels, one short body)');
for (const b of blocks) {
  const [title, ...rest] = b.split('\n');
  if (!/^Eyebrow:\s*\S/m.test(b)) problems.push(`block "${title.trim()}": no Eyebrow: line`);
  if (!/^Headline:\s*\S/m.test(b)) problems.push(`block "${title.trim()}": no Headline: line`);
  const eyebrow = (b.match(/^Eyebrow:\s*(.+)$/m) || [])[1]?.trim().toLowerCase();
  const headline = (b.match(/^Headline:\s*(.+)$/m) || [])[1]?.trim().toLowerCase();
  if (eyebrow && headline && headline.includes(eyebrow)) problems.push(`block "${title.trim()}": eyebrow repeats the headline`);
  for (const m of b.matchAll(/^Label:\s*(.+)$/gm)) {
    const w = m[1].trim().replace(/[.]$/, '').split(/\s+/).length;
    if (w > 3) problems.push(`block "${title.trim()}": label "${m[1].trim().slice(0, 50)}" is ${w} words, max 3 (longer figure text is a Card:)`);
  }
  for (const m of b.matchAll(/^Card:\s*(.+)$/gm)) {
    const parts = m[1].split('|').map(x => x.trim());
    if (parts.length !== 3 || parts.some(x => !x)) { problems.push(`block "${title.trim()}": card needs "label | title | body"`); continue; }
    for (const [k, x] of [['label', parts[0]], ['title', parts[1]]]) if (x.split(/\s+/).length > 3) problems.push(`block "${title.trim()}": card ${k} "${x}" over 3 words`);
    const sentences = parts[2].split(/[.?!](\s|$)/).filter(x => x && x.trim()).length;
    if (sentences > 2) problems.push(`block "${title.trim()}": card body over 2 sentences`);
  }
  const paras = rest.join('\n').split(/\n\s*\n/).map(p => p.trim())
    .filter(p => p && !/^(Eyebrow|Headline|Label|Caption|Card):/.test(p));
  if (paras.length > 1) problems.push(`block "${title.trim()}": ${paras.length} body paragraphs, max 1 (move detail onto the figure as Label: lines)`);
  for (const p of paras) { const w = p.split(/\s+/).length; if (w > 70) problems.push(`block "${title.trim()}": body ${w} words, max 70`); }
}

if (problems.length) {
  console.log(`CS2COPY_FAIL ${file} (${problems.length})`);
  for (const p of problems) console.log(`  ${p}`);
  process.exit(1);
}
console.log(`CS2COPY_PASS ${file}`);
