#!/usr/bin/env node
// Validates a fix record made from templates/FIX.md.
// Usage: node check-fix-record.mjs <path-to-fix-record.md>
// Prints "fix record complete" and exits 0 only when every required slot is filled honestly.
import fs from 'node:fs';

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error(`usage: check-fix-record.mjs <fix-record.md> (not found: ${file ?? 'none'})`);
  process.exit(2);
}
const text = fs.readFileSync(file, 'utf8');
const problems = [];

// Value of a "Field: value" line; empty string if absent.
const field = name => {
  const m = text.match(new RegExp(`^${name}:[ \\t]*(.*)$`, 'mi'));
  return m ? m[1].trim() : '';
};
const isPlaceholder = v => !v || /<[^>]*>/.test(v) || /^(todo|tbd|\.\.\.)$/i.test(v);
const isNA = v => /^(n\/a|na|none|-)$/i.test(v.trim());

for (const h of ['Evidence', 'Chain', 'Causes', 'Layer', 'Check', 'Change', 'Verification', 'Report']) {
  if (!new RegExp(`^## ${h}\\s*$`, 'm').test(text)) problems.push(`missing section: ## ${h}`);
}

const status = field('Status').toLowerCase();
if (!['verified', 'not verified'].includes(status)) problems.push('Status must be "verified" or "not verified"');
const verified = status === 'verified';

const always = ['Bad output', 'Expected', 'Input', 'Instruction', 'Loaded', 'Conflict', 'Enforcement',
  'History', 'Chosen cause', 'Why not earlier layers', 'Check', 'Result on bad output', 'Files changed',
  'Instruction lines', 'Unverified'];
for (const f of always) if (isPlaceholder(field(f))) problems.push(`unfilled: ${f}`);

const causes = text.match(/^- Cause \d+:.*\| *For:.*\| *Against:.*$/gim) || [];
const realCauses = causes.filter(c => !/<[^>]*>/.test(c));
if (realCauses.length < 2) problems.push(`need 2+ filled causes with For/Against evidence (found ${realCauses.length})`);

const layer = Number(field('Layer'));
if (!(layer >= 1 && layer <= 6)) problems.push('Layer must be a number 1-6');
if (layer === 6 && (isPlaceholder(field('Replaces')) || isNA(field('Replaces'))))
  problems.push('layer 6 (instruction text) must name the existing line it replaces');

if (!/\bFAIL/i.test(field('Result on bad output')))
  problems.push('check was not shown failing on the bad output (Result on bad output must say FAIL)');

const lines = field('Instruction lines').match(/\+\s*(\d+)\s*\/\s*-\s*(\d+)/);
if (!lines) problems.push('Instruction lines must read "+N / -M"');
else if (Number(lines[1]) > Number(lines[2])) {
  const r = field('Net growth reason');
  if (isPlaceholder(r) || isNA(r)) problems.push('instruction lines grew; Net growth reason is required');
}

if (verified) {
  const fresh = field('Fresh run');
  if (isPlaceholder(fresh) || isNA(fresh)) problems.push('verified needs a Fresh run');
  if (/same (context|session)/i.test(fresh)) problems.push('Fresh run must not be the same context that made the fix');
  for (const f of ['Before', 'After']) if (isPlaceholder(field(f))) problems.push(`verified needs ${f}`);
  if (!/\bPASS/i.test(field('Check result after'))) problems.push('verified needs Check result after to say PASS');
  const second = field('Second case');
  if (isPlaceholder(second) || isNA(second)) problems.push('verified needs a Second case');
  if (layer === 4) {
    const e = field('Enforcement test');
    if (isPlaceholder(e) || isNA(e)) problems.push('layer 4 needs an Enforcement test showing it blocks a skipped step');
  }
} else if (isNA(field('Unverified'))) {
  problems.push('not verified: Unverified must list what remains');
}

if (problems.length) {
  console.log(`fix record incomplete (${problems.length}):`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log(`fix record complete (status: ${status}, layer ${layer})`);
