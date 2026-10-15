#!/usr/bin/env node
// The fewer figures review, run by a separate model, never by the session that wrote the plan.
// Usage: node check-figures-review.mjs <copy-file> <message-file> [slot-plan-file]
// Called by check-slot-plan.mjs when the guard hook checks a slot plan save. It sends the copy and the
// message plan to a fresh headless Claude with no tools and no access to the author's reasoning, and
// asks one question per block. Fails closed: if the reviewer cannot run, the save is refused.
// CS2_REVIEW_CMD replaces the reviewer command (tests only; the hook's environment is not the agent's).
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const [copy, msg, slots] = process.argv.slice(2);
if (!copy || !msg || !fs.existsSync(copy) || !fs.existsSync(msg)) { console.error('usage: check-figures-review.mjs <copy-file> <message-file>'); process.exit(2); }

const prompt = `You are a strict reviewer of a figure plan for one section of a portfolio case study.
You did not write it. Judge only from the files below.

For each block, answer these questions:
1. Could this block's claim be proven with fewer figures than the plan gives it? Read the eyebrow,
   headline, cards and body as plain text. If they already make the reader see the claim, any figure
   is one too many. If one figure would do, a second is one too many.
2. Does any figure show the five Pathways (the stages of the journey) as a row, line or sequence,
   however it is worded, when the claim is not about their order?
3. If a slot plan is given: does every non text slot hold exactly a figure the message plan asked for,
   and no more?

Reply with one line per block, exactly "Block N: PASS" or "Block N: FAIL because <one short reason>",
then a last line exactly "VERDICT: PASS" if every block passes, otherwise "VERDICT: FAIL".

=== COPY ===
${fs.readFileSync(copy, 'utf8')}
=== MESSAGE PLAN ===
${fs.readFileSync(msg, 'utf8')}${slots && fs.existsSync(slots) ? `\n=== SLOT PLAN ===\n${fs.readFileSync(slots, 'utf8')}` : ''}`;

const custom = process.env.CS2_REVIEW_CMD;
const r = custom
  ? spawnSync('sh', ['-c', custom], { input: prompt, encoding: 'utf8', timeout: 200000 })
  : spawnSync('claude', ['-p', '--model', 'sonnet', '--tools', ''], { input: prompt, encoding: 'utf8', timeout: 200000 });
const out = `${r.stdout || ''}`.trim();
if (r.error || r.status !== 0 || !/^VERDICT: (PASS|FAIL)\s*$/m.test(out)) {
  console.log(`reviewer could not run, so the save is refused: ${(r.error?.message || r.stderr || out || 'no output').trim().slice(0, 200)}`);
  console.log('Chadwick: if this says the login expired, run claude in a terminal and log in once.');
  console.log('REVIEW_FAIL');
  process.exit(1);
}
const fails = out.split('\n').filter(l => /^Block \d+: FAIL/i.test(l));
if (/^VERDICT: PASS\s*$/m.test(out) && !fails.length) { console.log('REVIEW_PASS'); process.exit(0); }
console.log(fails.join('\n') || out.slice(-300));
console.log('REVIEW_FAIL');
process.exit(1);
