#!/usr/bin/env node
// Proves bank-walk.md gives exactly one valid verdict to every entry of both banks, and that every USED or NEW
// names a proposal that exists in proposals.json. Controls: a walk with one entry dropped, one with an unknown
// proposal id and one with a bad verdict must each fail.
// Usage: node walk-check.mjs   Prints WALK_OK when the controls fail and the real walk passes.
import fs from 'node:fs';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../..');
const ids = f => [...fs.readFileSync(path.join(root, 'docs/about-source', f), 'utf8').matchAll(/\{id:'(t\d+\w?)'/g)].map(m => m[1]);
const cs = ids('case_study_tactics.html').map(i => 'cs-' + i), re = ids('tactics_bank.html').map(i => 're-' + i);
const props = new Set(JSON.parse(fs.readFileSync(path.join(here, 'proposals.json'), 'utf8')).map(p => p.id));
const VERDICT = /^(USED|NEW|NO GAP|NO|RULE)\b|^(audit run|outline check|checked)/;

function check(text) {
  const errs = [];
  const lines = [...text.matchAll(/^- ((?:cs|re)-t\d+\w?) ([^:]+): (.*)$/gm)];
  const seen = new Map();
  for (const [, id, , body] of lines) {
    seen.set(id, (seen.get(id) || 0) + 1);
    if (!VERDICT.test(body)) errs.push(`${id}: no valid verdict`);
    if (/^(USED|NEW)/.test(body)) {
      const named = [...body.matchAll(/\bh-[\w-]+/g)].map(m => m[0]);
      if (!named.length) errs.push(`${id}: USED names no proposal`);
      for (const n of named) if (!props.has(n)) errs.push(`${id}: unknown proposal ${n}`);
    }
  }
  for (const id of [...cs, ...re]) if (seen.get(id) !== 1) errs.push(`${id}: ${seen.get(id) || 0} lines`);
  for (const id of seen.keys()) if (![...cs, ...re].includes(id)) errs.push(`${id}: not a bank entry`);
  return errs;
}
const walk = fs.readFileSync(path.join(here, 'bank-walk.md'), 'utf8');
const fails = [];
const ctl = [
  ['dropped entry', walk.replace(/^- cs-t21 .*\n/m, '')],
  ['unknown proposal', walk.replace('USED h-bridge', 'USED h-nonexistent')],
  ['bad verdict', walk.replace(/^(- re-t09 [^:]+: )NO\./m, '$1MAYBE.')],
];
for (const [name, t] of ctl) { const e = check(t); console.log(e.length ? `ok  control caught: ${name}` : `CONTROL FAIL: ${name}`); if (!e.length) fails.push(name); }
console.log(`banks: ${cs.length} cs, ${re.length} re`);
if (cs.length !== 49 || re.length !== 44) fails.push('bank sizes');
const errs = check(walk); errs.forEach(e => console.log('ERR ' + e)); if (errs.length) fails.push('walk');
const used = new Set([...walk.matchAll(/\bh-[\w-]+/g)].map(m => m[0]));
console.log('proposals not tied to a bank entry (his copy rules instead): ' + [...props].filter(p => !used.has(p)).join(', '));
if (fails.length) { console.log('FAILED: ' + fails.join('; ')); process.exit(1); }
console.log('WALK_OK');
