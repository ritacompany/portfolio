#!/usr/bin/env node
// Checks CS2 page copy against Chadwick's copy rules. Used by the copy guard hook and by hand.
// Usage: node check-copy.mjs <copy-file> [--section N]
// A copy file holds page copy only. Its first line is "Section: N". Lines inside <!-- --> are ignored.
// Copy is written as blocks: each "## " block has an Eyebrow: line, a Headline: line and at most one body
// paragraph of at most 70 words. Card: lines are text items set beside the body, not on a figure:
// "Card: label | title | body", label and title at most three words each, body at most two sentences.
// Figure text (labels, captions) is not copy: it is written in the message plan once a figure is chosen,
// so the copy never decides that a block has a figure. The eyebrow names the topic and never repeats the headline.
// A headline runs 12 to 25 words, the length of his own.
// Prints CS2COPY_PASS and exits 0, or lists every violation and exits 1.
import fs from 'node:fs';

const NAMES = ['Betsy', 'Michael']; // colleagues; add any other name that must never reach copy
// Product terms and the section that introduces each (from the concept ladder in CS2_COMPREHENSION.md).
const TERMS = [
  ['Growth Journey', 1], ['Pathway', 1], ['week', 2], ['Action Item', 2], ['Action Hub', 2], ['target date', 3],
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
// --fragments: loose text pulled from a Figma write. Word rules only; no header, blocks or term order.
const fragments = args.includes('--fragments');
if (!fragments && !Number.isFinite(section)) problems.push('line 1: missing "Section: N" header, so product terms cannot be checked');

const text = raw.replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '));
const lines = text.split('\n');
lines.forEach((line, i) => {
  const n = i + 1;
  if (/^Section:\s*\d+/.test(line)) return;
  for (const name of NAMES) if (new RegExp(`\\b${name}\\b`).test(line)) problems.push(`line ${n}: colleague name "${name}"`);
  // Any capitalized word acting as a person who said, wanted or made something: catches names not on the list.
  const credit = line.match(/\b([A-Z][a-z]+)(?:'s)? (?:said|asked|wanted|suggested|told|proposed|built|wrote|designed|decided|pushed|insisted|argued|came up with|handed)\b/);
  if (credit && !/^(I|The|This|That|It|They|We|He|She|Nobody|Everyone|Someone|No|One|Each|Every|Mondai|Research)$/.test(credit[1]))
    problems.push(`line ${n}: "${credit[0]}" names a person as the one who said or made something`);
  if (/["“”]/.test(line)) problems.push(`line ${n}: quotation marks (no quotes from anyone)`);
  if (/(^|[\s(])['‘][^'‘’\n]{3,}['’](?=[\s.,;:!?)]|$)/.test(line)) problems.push(`line ${n}: single quotation marks (no quotes from anyone)`);
  if (/[—–]|\s--\s|\w\s-\s\w/.test(line)) problems.push(`line ${n}: dash`);
  // A leading subordinate clause ("When the week ended, ...") is not a list item, so it is set aside first.
  const listPart = line.split(/(?<=[.!?])\s+/).map(s => s.replace(/^\s*(?:When|If|Because|After|Before|While|Although|Though|Since|Once|As|Until|Unless|Whenever)\b[^,]*,\s*/, '')).join(' ');
  if (/\b[\w'-]+(?: [\w'-]+){0,2}, [\w'-]+(?: [\w'-]+){0,2}, (?:and|or) /i.test(listPart)) problems.push(`line ${n}: Oxford comma`);
  if (/two by two|\b2 ?x ?2\b|\b2 by 2\b|\bmatrix\b|\bquadrant|upper right|sat where|in the corner/i.test(line)) problems.push(`line ${n}: two by two, in words`);
  if (Number.isFinite(section)) for (const [term, from] of TERMS)
    if (section < from && new RegExp(`\\b${term}`, 'i').test(line)) problems.push(`line ${n}: product term "${term}" before section ${from} introduces it`);
  for (const [re, label] of AI_PATTERNS) if (re.test(line)) problems.push(`line ${n}: ${label}`);
});

const blocks = fragments ? [] : text.split(/^## /m).slice(1);
if (!fragments && !blocks.length) problems.push('no "## " blocks: copy is written as blocks (eyebrow, headline, cards, one short body)');
for (const b of blocks) {
  const [title, ...rest] = b.split('\n');
  if (!/^Eyebrow:\s*\S/m.test(b)) problems.push(`block "${title.trim()}": no Eyebrow: line`);
  if (!/^Headline:\s*\S/m.test(b)) problems.push(`block "${title.trim()}": no Headline: line`);
  const eyebrow = (b.match(/^Eyebrow:\s*(.+)$/m) || [])[1]?.trim().toLowerCase();
  const headline = (b.match(/^Headline:\s*(.+)$/m) || [])[1]?.trim().toLowerCase();
  if (eyebrow && headline && headline.includes(eyebrow)) problems.push(`block "${title.trim()}": eyebrow repeats the headline`);
  // His headlines run 12 to 25 words, measured 23 Oct from his frame blocks 5 and 6 and his Haven case study:
  // a full sentence or two that says what the person needs or why, never a short label.
  const hw = headline ? headline.split(/\s+/).filter(Boolean).length : 0;
  if (headline && (hw < 12 || hw > 25)) problems.push(`block "${title.trim()}": headline ${hw} words, his headlines run 12 to 25`);
  for (const m of b.matchAll(/^(Label|Caption):\s*(.+)$/gm))
    problems.push(`block "${title.trim()}": ${m[1]}: "${m[2].trim().slice(0, 40)}" is figure text; it goes in the message plan once a figure is chosen (text items are Card: lines)`);
  for (const m of b.matchAll(/^Card:\s*(.+)$/gm)) {
    const parts = m[1].split('|').map(x => x.trim());
    if (parts.length !== 3 || parts.some(x => !x)) { problems.push(`block "${title.trim()}": card needs "label | title | body"`); continue; }
    for (const [k, x] of [['label', parts[0]], ['title', parts[1]]]) if (x.split(/\s+/).length > 3) problems.push(`block "${title.trim()}": card ${k} "${x}" over 3 words`);
    const sentences = parts[2].split(/[.?!](\s|$)/).filter(x => x && x.trim()).length;
    if (sentences > 2) problems.push(`block "${title.trim()}": card body over 2 sentences`);
  }
  const paras = rest.join('\n').split(/\n\s*\n/).map(p => p.trim())
    .filter(p => p && !/^(Eyebrow|Headline|Label|Caption|Card):/.test(p));
  if (paras.length > 1) problems.push(`block "${title.trim()}": ${paras.length} body paragraphs, max 1 (move detail into Card: lines)`);
  for (const p of paras) { const w = p.split(/\s+/).length; if (w > 70) problems.push(`block "${title.trim()}": body ${w} words, max 70`); }
}

if (problems.length) {
  console.log(`CS2COPY_FAIL ${file} (${problems.length})`);
  for (const p of problems) console.log(`  ${p}`);
  process.exit(1);
}
console.log(`CS2COPY_PASS ${file}`);
