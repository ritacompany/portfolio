#!/usr/bin/env node
// The fewer figures review. A sub-agent in the same Claude session answers it, never the session that
// wrote the plan, and the guard hook, not Claude, records its verdict. No separate login is needed.
//
//   node check-figures-review.mjs --prompt N      prints the exact review prompt for section N. Claude
//                                                 gives it word for word to a foreground sub-agent.
//   node check-figures-review.mjs <copy> <msg>    passes only when review/section-N.json holds a PASS
//                                                 for this exact copy and message plan.
//
// After the sub-agent answers, the hook (PostToolUse on Agent, see cs2-copy-guard.mjs) checks that the
// prompt it was given is exactly the one this script builds from the files on disk, then writes
// review/section-N.json. Claude's own writes to review/ are refused, so a verdict cannot be typed in,
// and any change to the copy or the message plan makes the old verdict stale.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const here = path.dirname(new URL(import.meta.url).pathname);
export const files = n => ({ copy: path.join(here, 'copy', `section-${n}.md`), msg: path.join(here, 'message', `section-${n}.md`), out: path.join(here, 'review', `section-${n}.json`) });
export const hashOf = (copyText, msgText) => crypto.createHash('sha256').update(copyText + '\n\u0000\n' + msgText).digest('hex').slice(0, 16);

export const buildPrompt = (n, copyText, msgText) => `CS2 FIGURES REVIEW section ${n} hash ${hashOf(copyText, msgText)}

You are a strict reviewer of a figure plan for one section of a portfolio case study. You did not write
it. Judge only from the text below. Do not open any file or use any tool.

For each block, answer:
1. Could this block's claim be proven with fewer figures than the plan gives it? Read the eyebrow,
   headline, cards and body as plain text. If they already make the reader see the claim, any figure is
   one too many. If one figure would do, a second is one too many.
2. Does any figure show the five Pathways (the stages of the journey) as a row, line or sequence,
   however it is worded, when the claim is not about their order?

Reply with one line per block, exactly "Block N: PASS" or "Block N: FAIL because <one short reason>",
then a last line exactly "VERDICT: PASS" if every block passes, otherwise "VERDICT: FAIL". Nothing else.

=== COPY ===
${copyText}
=== MESSAGE PLAN ===
${msgText}`;

// Called by the hook with the sub-agent's prompt and answer. Returns what it recorded, or null.
export const record = (prompt, answer) => {
  const m = (prompt || '').match(/^CS2 FIGURES REVIEW section (\d+) hash ([0-9a-f]{16})$/m);
  if (!m) return null;
  const f = files(m[1]);
  if (!fs.existsSync(f.copy) || !fs.existsSync(f.msg)) return null;
  const expected = buildPrompt(m[1], fs.readFileSync(f.copy, 'utf8'), fs.readFileSync(f.msg, 'utf8'));
  if (prompt.trim() !== expected.trim()) return { section: m[1], refused: 'the prompt was not the exact one the script builds, so no verdict was recorded' };
  const verdict = (answer.match(/^VERDICT: (PASS|FAIL)\s*$/m) || [])[1];
  if (!verdict) return { section: m[1], refused: 'the answer had no VERDICT line' };
  const blocks = answer.split('\n').filter(l => /^Block \d+: (PASS|FAIL)/.test(l.trim())).map(l => l.trim());
  const result = { section: m[1], hash: m[2], verdict: blocks.some(b => /: FAIL/.test(b)) ? 'FAIL' : verdict, blocks, at: new Date().toISOString() };
  fs.mkdirSync(path.dirname(f.out), { recursive: true });
  fs.writeFileSync(f.out, JSON.stringify(result, null, 2) + '\n');
  return result;
};

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const args = process.argv.slice(2);
  if (args[0] === '--prompt') {
    const f = files(args[1]);
    if (!fs.existsSync(f.msg)) { console.error(`no message plan at ${f.msg}`); process.exit(2); }
    process.stdout.write(buildPrompt(args[1], fs.readFileSync(f.copy, 'utf8'), fs.readFileSync(f.msg, 'utf8')));
    process.exit(0);
  }
  const [copy, msg] = args;
  if (!copy || !msg || !fs.existsSync(copy) || !fs.existsSync(msg)) { console.error('usage: check-figures-review.mjs --prompt N | <copy-file> <message-file>'); process.exit(2); }
  const msgText = fs.readFileSync(msg, 'utf8');
  const n = (msgText.match(/^Section: (\d+)/m) || [])[1];
  const out = path.join(path.dirname(msg), '..', 'review', `section-${n}.json`);
  const how = `run node reference/cs2/check-figures-review.mjs --prompt ${n} and give its output word for word to a foreground sub-agent`;
  if (!fs.existsSync(out)) { console.log(`no review yet: ${how}`); console.log('REVIEW_FAIL'); process.exit(1); }
  const r = JSON.parse(fs.readFileSync(out, 'utf8'));
  if (r.hash !== hashOf(fs.readFileSync(copy, 'utf8'), msgText)) { console.log(`the review is for an older copy or message plan: ${how}`); console.log('REVIEW_FAIL'); process.exit(1); }
  if (r.verdict !== 'PASS') { console.log(r.blocks.filter(b => /FAIL/.test(b)).join('\n')); console.log('change the message plan, then review again'); console.log('REVIEW_FAIL'); process.exit(1); }
  console.log('REVIEW_PASS');
}
