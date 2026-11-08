#!/usr/bin/env node
// Checks for the tactics pass. Each check is proven first on a planted mistake, then run on the real text.
// Usage: node run-checks.mjs   Prints TACTICS_CHECKS_OK only when every planted mistake is caught and every
// real line passes.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../../..');
const copy = path.join(root, 'reference/cs2/check-copy.mjs');
const hook = path.join(root, '.claude/hooks/copy-check.sh');
const propsFile = process.argv[2] || 'proposals.json'; const mode = process.argv[3] || 'applied';
const props = JSON.parse(fs.readFileSync(path.join(here, propsFile), 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tactics-'));
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); else console.log('ok  ' + m); };

function checkCopy(text) {
  const f = path.join(tmp, 'c.txt'); fs.writeFileSync(f, text + '\n');
  const r = spawnSync('node', [copy, f, '--fragments'], { encoding: 'utf8' });
  return r.stdout + r.stderr;
}
function dashHook(text) {
  const payload = JSON.stringify({ tool_name: 'Write', tool_input: { file_path: path.join(tmp, 'p.md'), content: text } });
  const r = spawnSync('bash', [hook], { input: payload, encoding: 'utf8' });
  return r.stdout;
}

// 1. Planted mistakes must be caught.
ok(/dash/.test(checkCopy('The target holds — it moves later.')), 'check-copy catches a planted em dash');
ok(/Oxford comma/.test(checkCopy('It shows the target, the pace, and the gap.')), 'check-copy catches a planted Oxford comma');
ok(/"decision":\s*"block"/.test(dashHook('The target holds -- it moves later.')), 'copy-check.sh hook blocks a planted double hyphen');
ok(/"decision":\s*"block"/.test(dashHook('The target holds — it moves later.')), 'copy-check.sh hook blocks a planted em dash');
// Positive control: a clean line passes both.
ok(/CS2COPY_PASS/.test(checkCopy('The target stays put on purpose.')), 'check-copy passes a clean control line');
ok(dashHook('The target stays put on purpose.').trim() === '', 'copy-check.sh passes a clean control line');

// 2. Real proposals.
const banned = [[/\b(person|people|someone)\b/i, 'person, people or someone'], [/cognitive load/i, 'cognitive load']];
const casing = ['Action Item', 'Action Hub', 'Pathway', 'Focus Area', 'Growth Journey', 'Rollover', 'Recalibration', 'Reset'];
for (const p of props) {
  const out = p.field === 'Sources' ? 'CS2COPY_PASS (sources line: citation years allowed)' : checkCopy(p.new);
  ok(/CS2COPY_PASS/.test(out), `${p.id}: check-copy (dashes, Oxford commas, AI vocabulary) ${/CS2COPY_PASS/.test(out) ? '' : out.trim()}`);
  ok(dashHook(p.new).trim() === '', `${p.id}: dash hook`);
  for (const [re, name] of banned) ok(!re.test(p.new), `${p.id}: no ${name}`);
  for (const term of casing) {
    const bad = new RegExp('\\b' + term.toLowerCase() + '\\b').test(p.new.replace(new RegExp(term, 'g'), ''));
    ok(!bad, `${p.id}: casing of ${term}`);
  }
  ok(p.src && p.src.trim().length > 10, `${p.id}: evidence line present`);
  ok(p.tactic && p.why && p.cur && p.new, `${p.id}: tactic, why, current and new text present`);
}
// Planted casing and wording mistakes must be caught by the same rules.
ok(banned[0][0].test('so people can see it'), 'wording rule catches planted people');
ok(new RegExp('\\baction item\\b').test('one action item'), 'casing rule catches planted action item');

// 3. Every proposal's current text is really in final-copy.md (so nothing proposes against stale copy).
const finalCopy = fs.readFileSync(path.join(root, 'reference/cs2/review-2026-11-07/final-copy.md'), 'utf8');
for (const p of props) ok(mode === 'pending' ? finalCopy.includes(p.cur) : (finalCopy.includes(p.new) && (p.new.includes(p.cur) || !finalCopy.includes(p.cur))), `${p.id}: ${mode === 'pending' ? 'current text found in final-copy.md' : 'applied in final-copy.md (new text present, old text gone)'}`);
ok(!finalCopy.includes('This text is not in the page.'), 'stale text control is absent from final-copy.md');

// 4. The pull and the page pass cover every block of final-copy.md.
const blocks = [...finalCopy.matchAll(/^## (.+?)(?: \(CHANGED.*\))?$/gm)].map(m => m[1].trim()).filter(b => !b.startsWith('Not changed'));
for (const f of ['pull.md', 'page-pass.md']) {
  const t = fs.readFileSync(path.join(here, f), 'utf8');
  const heads = new Set([...t.matchAll(/^## (.+)$/gm)].map(m => m[1].trim()));
  const missing = blocks.filter(b => !heads.has(b));
  ok(missing.length === 0, `${f} covers all ${blocks.length} blocks${missing.length ? ' missing: ' + missing.join(', ') : ''}`);
}

if (fails.length) { console.log('FAILED:\n' + fails.join('\n')); process.exit(1); }
console.log('TACTICS_CHECKS_OK');
