#!/usr/bin/env node
// Checks CS2 page copy against Chadwick's copy rules. Used by the copy guard hook and by hand.
// Usage: node check-copy.mjs <copy-file> [--section N]
// A copy file holds page copy only. Its first line is "Section: N". Lines inside <!-- --> are ignored.
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

if (problems.length) {
  console.log(`CS2COPY_FAIL ${file} (${problems.length})`);
  for (const p of problems) console.log(`  ${p}`);
  process.exit(1);
}
console.log(`CS2COPY_PASS ${file}`);
