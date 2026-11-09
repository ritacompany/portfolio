#!/usr/bin/env node
// Copy checks for the Haven tactics pass, on the CS2 tactics/run-checks.mjs pattern. Every rule is proven on a
// planted mistake and a clean control first, then run on every new line of every proposal.
// Usage: node run-checks.mjs [proposals.json] [pending|applied]
//   pending: each proposal's current text must be in final-copy.md (nothing proposed against stale copy).
//   applied: accepted proposals' new text must be in final-copy.md and site/haven/index.html, old text gone;
//            marks.json (his marks, read from the review page db) decides which were accepted.
// Prints HAVEN_TACTICS_CHECKS_OK only when all of that holds.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../../..');
const copy = path.join(root, 'reference/cs2/check-copy.mjs');
const hook = path.join(root, '.claude/hooks/copy-check.sh');
const props = JSON.parse(fs.readFileSync(path.join(here, process.argv[2] || 'proposals.json'), 'utf8'));
const mode = process.argv[3] || 'pending';
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'haven-'));
const fails = [];
const ok = (c, m) => { if (!c) fails.push(m); else console.log('ok  ' + m); };

function checkCopy(text) {
  const f = path.join(tmp, 'c.txt'); fs.writeFileSync(f, text + '\n');
  const r = spawnSync('node', [copy, f, '--fragments'], { encoding: 'utf8' });
  const out = r.stdout + r.stderr;
  // check-copy's credit rule reads any capitalized word before wanted, built or designed as a person's name.
  // On Haven, Users, Testers and Confidantes start sentences that way. Only those words are let through;
  // every other problem, and a real name, still fails (proven below).
  const probs = out.split('\n').filter(l => /^\s+line \d+:/.test(l));
  const real = probs.filter(l => !/"(Users|Testers|Confidantes|Haven|Interviews|Testing)(?:'s)? \w+" names a person/.test(l));
  return probs.length && !real.length ? 'CS2COPY_PASS (Haven role words let through: ' + probs.length + ')' : out;
}
function dashHook(text) {
  const payload = JSON.stringify({ tool_name: 'Write', tool_input: { file_path: path.join(tmp, 'p.md'), content: text } });
  return spawnSync('bash', [hook], { input: payload, encoding: 'utf8' }).stdout;
}
const banned = [[/\b(person|people|someone|somebody)\b/i, 'person, people or someone'], [/cognitive load/i, 'cognitive load']];
const casingBad = t => /\bconfidantes?\b/.test(t) ? ['Confidante'] : [];
const oxford = t => /\b[\w'’-]+(?: [\w'’-]+){0,3}, [\w'’-]+(?: [\w'’-]+){0,3}, (?:and|or) /i.test(t);
const sentenceCase = t => !/(?:^|[.:!?] )([A-Z][a-z]+) ([A-Z][a-z]+) ([A-Z][a-z]+)\b/.test(t.replace(/\b(The Trevor Project|Face ID|Family Acceptance Project|Your events)\b/g, 'x'));

// 1. Planted mistakes caught, clean controls pass.
ok(/dash/.test(checkCopy('The chat lasts 30 minutes — it can end early.')), 'check-copy catches a planted em dash');
ok(/Oxford comma/.test(checkCopy('It hides the icon, the app, and the alerts.')), 'check-copy catches a planted Oxford comma');
ok(oxford('It hides the icon, the app switcher, and the alerts.'), 'own Oxford rule catches a planted one with a two word item');
ok(!oxford('It hides the icon, the app switcher and the alerts.'), 'own Oxford rule passes the same list without it');
ok(/quotation/.test(checkCopy('Users said “it felt safe” after the test.')), 'check-copy catches a planted quote');
ok(/AI vocabulary/.test(checkCopy('The setup is a seamless way in.')), 'check-copy catches planted AI vocabulary');
ok(/"decision":\s*"block"/.test(dashHook('The chat lasts 30 minutes -- it can end early.')), 'dash hook blocks a planted double hyphen');
ok(/"decision":\s*"block"/.test(dashHook('The chat lasts 30 minutes – it can end early.')), 'dash hook blocks a planted en dash');
ok(/CS2COPY_PASS/.test(checkCopy('The chat lasts 30 minutes and can end early.')), 'check-copy passes a clean control');
ok(dashHook('The chat lasts 30 minutes and can end early.').trim() === '', 'dash hook passes a clean control');
ok(/names a person/.test(checkCopy('Betsy wanted a shorter flow.')), 'credit rule still catches a planted colleague name');
ok(/CS2COPY_PASS/.test(checkCopy('Users wanted a shorter flow.')), 'credit rule lets Users through');
ok(banned[0][0].test('so people can choose a time'), 'wording rule catches a planted people');
ok(banned[0][0].test('could stop someone from using it'), 'wording rule catches a planted someone');
ok(casingBad('pick a confidante first').length === 1, 'casing rule catches a planted lowercase confidante');
ok(casingBad('pick a Confidante first').length === 0, 'casing rule passes Confidante');
ok(!sentenceCase('Users Need Safe Spaces to talk.'), 'sentence case rule catches a planted title case run');
ok(sentenceCase('Users need safe spaces, says The Trevor Project.'), 'sentence case rule passes a named organization');

// 2. Humanizer record: draft, audit and final for every proposal, final equal to the new text.
const hum = fs.readFileSync(path.join(here, 'humanizer.md'), 'utf8');
const humBlocks = Object.fromEntries([...hum.matchAll(/^## (h-[\w-]+)\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)].map(m => [m[1], m[2]]));
ok(!/^Final: /m.test('Draft: x\nAudit: y'), 'humanizer rule catches a planted entry with no final');

// 3. Every new line of every proposal.
let n = 0;
for (const p of props) {
  for (const [label, text] of [['new', p.new], ...p.also.map(([, t], i) => [`also ${i + 1}`, t])]) {
    n++;
    const id = `${p.id} ${label}`;
    const out = checkCopy(text);
    ok(/CS2COPY_PASS/.test(out), `${id}: check-copy (dashes, Oxford commas, quotes, AI vocabulary) ${/CS2COPY_PASS/.test(out) ? '' : out.trim()}`);
    ok(dashHook(text).trim() === '', `${id}: dash hook`);
    ok(!oxford(text), `${id}: own Oxford rule`);
    for (const [re, name] of banned) ok(!re.test(text), `${id}: no ${name}`);
    ok(casingBad(text).length === 0, `${id}: casing of Confidante`);
    ok(sentenceCase(text), `${id}: sentence case`);
  }
  ok(p.src && p.src.trim().length > 8, `${p.id}: evidence line present`);
  ok(p.tactic && p.why && p.cur && p.new && p.pick, `${p.id}: tactic, why, current, new and pick present`);
  ok(['accept', 'change', 'discuss', 'reject'].includes(p.pick), `${p.id}: pick is one of the four choices`);
  const hb = humBlocks[p.id] || '';
  const fin = (hb.match(/^Final: (.*)$/m) || [])[1];
  ok(fin === p.new, `${p.id}: humanizer final equals the new text`);
  ok(/^Draft: /m.test(hb) || /only|cut|swap|typo/i.test(hb.split('\n')[0]), `${p.id}: humanizer draft recorded (or a cut or word swap stated)`);
  ok(/^Audit: /m.test(hb) || /only|cut|swap|typo/i.test(hb.split('\n')[0]), `${p.id}: humanizer audit recorded (or a cut or word swap stated)`);
}
ok(new Set(props.map(p => p.id)).size === props.length, 'proposal ids unique');

// 4. Current text against the copy source.
const finalCopy = fs.readFileSync(path.join(root, 'reference/haven/final-copy.md'), 'utf8');
const page = fs.readFileSync(path.join(root, 'site/haven/index.html'), 'utf8').replace(/&amp;/g, '&');
ok(!finalCopy.includes('This text is not in the page.'), 'stale text control is absent from final-copy.md');
if (mode === 'pending') {
  for (const p of props) for (const [cur] of [[p.cur], ...p.also]) ok(finalCopy.includes(cur), `${p.id}: current text found in final-copy.md`);
} else {
  const marks = JSON.parse(fs.readFileSync(path.join(here, 'marks.json'), 'utf8'));
  for (const p of props) {
    const m = marks[p.id]; const take = m && (m.choice === 'accept' || m.choice === 'change');
    const want = take ? (m.final || p.new) : null;
    for (const [cur, nw] of [[p.cur, want], ...p.also.map(([c, t]) => [c, take ? t : null])]) {
      if (take) ok(finalCopy.includes(nw) && page.includes(nw) && (nw.includes(cur) || (!finalCopy.includes(cur) && !page.includes(cur))), `${p.id}: applied in final-copy.md and index.html`);
      else ok(finalCopy.includes(cur), `${p.id}: not accepted, current text kept`);
    }
  }
}

// 5. The pull and the page pass cover every block of final-copy.md.
const blocks = [...finalCopy.matchAll(/^## (.+)$/gm)].map(m => m[1].trim());
for (const f of ['pull.md', 'page-pass.md']) {
  const t = fs.readFileSync(path.join(here, f), 'utf8');
  const heads = new Set([...t.matchAll(/^## (.+)$/gm)].map(m => m[1].trim()));
  const missing = blocks.filter(b => !heads.has(b));
  ok(missing.length === 0, `${f} covers all ${blocks.length} blocks${missing.length ? ' missing: ' + missing.join(', ') : ''}`);
}
if (fails.length) { console.log('FAILED:\n' + fails.join('\n')); process.exit(1); }
console.log(`${props.length} proposals, ${n} new lines checked`);
console.log('HAVEN_TACTICS_CHECKS_OK');
