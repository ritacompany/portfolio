#!/usr/bin/env node
// Checks reference/cs2/HANDOFF.md, the resume point either account picks CS2 up from.
// Usage: node check-handoff.mjs [file]   (defaults to HANDOFF.md beside this script)
// It needs the header lines (Updated, By, Section, Loop step) and every heading below with something
// under it ("None" is fine). The repo is public and his record never goes in git (CS2_PROCESS.md,
// Storage), so a quotation of eight words or more is refused: point to where the source lives instead.
// Prints HANDOFF_PASS and exits 0, or lists every problem, prints HANDOFF_FAIL and exits 1.
import fs from 'node:fs';
import path from 'node:path';

export const HEADINGS = [
  'Where it stopped',
  'Next action',
  'Decided in chat, not yet in files',
  'Open questions for Chadwick',
  'Waiting for Claude Code',
  'Read first',
];

export function checkHandoff(raw) {
  const text = raw.replace(/<!--[\s\S]*?-->/g, '');
  const problems = [];
  if (!/^# CS2 handoff\s*$/m.test(text)) problems.push('first heading must be "# CS2 handoff"');
  const field = name => (text.match(new RegExp(`^${name}:\\s*(.+)$`, 'm')) || [])[1]?.trim();
  const updated = field('Updated');
  if (!updated || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(updated) || Number.isNaN(Date.parse(updated.replace(' ', 'T'))))
    problems.push('"Updated: YYYY-MM-DD HH:MM" line missing or malformed');
  if (!/^(Claude Code|browser)$/.test(field('By') || '')) problems.push('"By:" must be "Claude Code" or "browser"');
  const section = Number(field('Section'));
  if (!(section >= 1 && section <= 10)) problems.push('"Section:" must be a section number from the status table, 1 to 10');
  const step = Number(field('Loop step'));
  if (!(step >= 1 && step <= 8)) problems.push('"Loop step:" must be a step of the loop in CS2_PROCESS.md, 1 to 8');

  const parts = text.split(/^## /m).slice(1).map(p => { const [h, ...rest] = p.split('\n'); return [h.trim(), rest.join('\n').trim()]; });
  for (const h of HEADINGS) {
    const found = parts.find(([t]) => t === h);
    if (!found) problems.push(`heading "## ${h}" missing`);
    else if (!found[1]) problems.push(`"## ${h}" is empty: write None if there is nothing`);
  }
  text.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/["“]([^"”]+)["”]/g))
      if (m[1].trim().split(/\s+/).length >= 8) problems.push(`line ${i + 1}: a quotation of 8 words or more; point to where the source lives instead`);
    if (/[—–]|\s--\s/.test(line)) problems.push(`line ${i + 1}: dash`);
  });
  return problems;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2] || path.join(path.dirname(new URL(import.meta.url).pathname), 'HANDOFF.md');
  if (!fs.existsSync(file)) { console.log(`HANDOFF_FAIL ${file} does not exist`); process.exit(1); }
  const problems = checkHandoff(fs.readFileSync(file, 'utf8'));
  if (problems.length) { console.log(problems.map(p => `  ${p}`).join('\n')); console.log('HANDOFF_FAIL'); process.exit(1); }
  console.log('HANDOFF_PASS');
}
