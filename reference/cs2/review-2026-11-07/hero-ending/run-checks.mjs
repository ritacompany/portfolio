#!/usr/bin/env node
// Copy checks for the hero and ending versions, on the tactics/run-checks.mjs pattern.
// Every check is proven on a planted mistake and a clean control first, then run on every field of every version.
// Usage: node run-checks.mjs [versions.json]   Prints HERO_END_CHECKS_OK only when all of that holds.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../../..');
const copy = path.join(root, 'reference/cs2/check-copy.mjs');
const hook = path.join(root, '.claude/hooks/copy-check.sh');
const V = JSON.parse(fs.readFileSync(path.join(here, process.argv[2] || 'versions.json'), 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'heroend-'));
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); else console.log('ok  ' + m); };

function checkCopy(text) {
  const f = path.join(tmp, 'c.txt'); fs.writeFileSync(f, text + '\n');
  const r = spawnSync('node', [copy, f, '--fragments'], { encoding: 'utf8' });
  return r.stdout + r.stderr;
}
function dashHook(text) {
  const payload = JSON.stringify({ tool_name: 'Write', tool_input: { file_path: path.join(tmp, 'p.md'), content: text } });
  return spawnSync('bash', [hook], { input: payload, encoding: 'utf8' }).stdout;
}
const banned = [[/\b(person|people|someone)\b/i, 'person, people or someone'], [/cognitive load/i, 'cognitive load']];
const casing = ['Action Item', 'Action Hub', 'Pathway', 'Focus Area', 'Growth Journey', 'Rollover', 'Recalibration', 'Reset'];
const casingBad = t => casing.filter(term => new RegExp('\\b' + term.toLowerCase() + 's?\\b').test(t.replace(new RegExp(term, 'g'), '')));

// 1. Planted mistakes are caught, clean controls pass.
ok(/dash/.test(checkCopy('The target holds — it moves later.')), 'check-copy catches a planted em dash');
ok(/Oxford comma/.test(checkCopy('It shows the target, the pace, and the gap.')), 'check-copy catches a planted Oxford comma');
ok(/"decision":\s*"block"/.test(dashHook('The target holds -- it moves later.')), 'dash hook blocks a planted double hyphen');
ok(/"decision":\s*"block"/.test(dashHook('The target holds – it moves later.')), 'dash hook blocks a planted en dash');
ok(/CS2COPY_PASS/.test(checkCopy('The target stays put on purpose.')), 'check-copy passes a clean control');
ok(dashHook('The target stays put on purpose.').trim() === '', 'dash hook passes a clean control');
ok(banned[0][0].test('so people can see it'), 'wording rule catches a planted people');
ok(casingBad('one action item rolled over').length === 1, 'casing rule catches a planted action item');
ok(casingBad('a recalibration screen').length === 1, 'casing rule catches a planted recalibration');
ok(casingBad('work that rolls over into the Action Hub').length === 0, 'casing rule passes rolls over as a verb');

// 2. Every field of every version.
let n = 0;
for (const v of V) for (const [field, text] of v.fields) {
  n++;
  const id = `${v.id} ${field}`;
  const out = checkCopy(text);
  ok(/CS2COPY_PASS/.test(out), `${id}: check-copy ${/CS2COPY_PASS/.test(out) ? '' : out.trim()}`);
  ok(dashHook(text).trim() === '', `${id}: dash hook`);
  for (const [re, name] of banned) ok(!re.test(text), `${id}: no ${name}`);
  const cb = casingBad(text); ok(cb.length === 0, `${id}: casing ${cb.join(', ')}`);
}
ok(V.filter(v => v.block === 'Hero').length === 3 && V.filter(v => v.block === 'Ending').length === 3, 'three versions per block');
ok(['Hero', 'Ending'].every(b => V.filter(v => v.block === b && v.pick).length === 1), 'exactly one pick per block');
ok(V.every(v => v.note && v.note.length > 80), 'every version has a note');
// Hero must not use a product term the page has not introduced yet.
const unmet = /\b(Growth Journey|Pathways?|Focus Areas?|Action Items?|Action Hub|Rollover|Recalibration|Reset|capacity|pace date|target date)\b/;
ok(unmet.test('the Action Hub'), 'unmet term rule catches a planted Action Hub');
for (const v of V.filter(v => v.block === 'Hero')) ok(!v.fields.some(([, t]) => unmet.test(t)), `${v.id}: no term the page has not introduced`);
if (fails.length) { console.log('FAILED:\n' + fails.join('\n')); process.exit(1); }
console.log(`${n} fields checked`); console.log('HERO_END_CHECKS_OK');
