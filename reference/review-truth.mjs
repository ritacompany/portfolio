#!/usr/bin/env node
// Truth review: the judgment half of the truth check. check-truth.mjs proves every claim points at a
// source; this has a sub-agent that did not write the file open those sources and judge what code cannot
// (does the source say it, does a study fit the decision). Only the guard hook records the verdict, from
// the sub-agent's own transcript, so the writer cannot.
//
//   node review-truth.mjs <cs> --prompt <file>    the exact prompt, word for word, for a sub-agent
//   node review-truth.mjs <cs> <file>             TRUTH_REVIEW_PASS only with a PASS for this exact file
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const at = p => p.startsWith('~/') ? path.join(os.homedir(), p.slice(2)) : path.join(repo, p);
const cfgOf = cs => JSON.parse(fs.readFileSync(path.join(repo, 'reference', cs, 'truth.json'), 'utf8'));
const rel = f => path.relative(repo, path.resolve(f));
const hashOf = (cs, f) => crypto.createHash('sha256').update(fs.readFileSync(f, 'utf8')).update('\0')
  .update(fs.readFileSync(at(cfgOf(cs).frame), 'utf8')).update(fs.readFileSync(at(cfgOf(cs).flows), 'utf8')).digest('hex').slice(0, 16);
const outFor = (cs, f) => path.join(repo, 'reference', cs, 'review', `${path.basename(f, '.md')}.truth.json`);

export const buildPrompt = (cs, f) => {
  const c = cfgOf(cs);
  return `CASE STUDY TRUTH REVIEW ${cs} ${rel(f)} hash ${hashOf(cs, f)}

You are checking a portfolio case study file for truth. You did not write it and owe it nothing. Open the
sources yourself; trust nothing the file says about its own sources.

Sources of truth (they win over every note, archive or draft in the repo):
- His frame, the spine: ${at(c.frame)} (read from ${c.frameSource}).
- The outline, which sets the order and the flow steps each section owns: ${at(c.outline)}. Use no other outline.
- The live product: ${at(c.flows)}, one line per flow step with frame ids (read from ${c.flowsSource}).
  For anything it does not settle, call get_metadata or get_screenshot on that file. Never call use_figma.
- Who it is for and what existed before him: his words in the frame and ${c.background.filter(b => b.startsWith('^approved')).map(b => b.replace(/^\^approved:|\\|\$$/g, '')).join(', ')}.
- Research: the report each claim cites, in ${repo}/reports/.

Each check is pass or fail:
1. Product truth: every claim about how the product works matches a screen, in the file's own names.
   Headlines, "Reader gets" and "Reader has to see" lines are claims too. Anything beyond what the map or
   a screen shows (a layout, a framing, "every", "nothing is lost", a change the person can skip) fails.
2. Flow coverage: every flow step this file is responsible for lands in a section or block, or is cut for
   Chadwick to approve.
3. Background truth: every claim about who the product is for, the company or what existed before him
   traces to his words above, and the cited block actually says it.
4. Research earns its place: every finding behind a decision has an effect big enough and close enough to
   carry it. A few percent, a null result used as a reason, a correlation stated as cause, an effect its
   own report calls inflated, or a study of a different situation fails, even when flagged.
5. His frame is the spine: his order, titles and the rows inside each block are kept; moving any of them
   is a proposal for him, never applied.

Reply with exactly five lines "Check N: PASS" or "Check N: FAIL because <the words and what the source
says>", then "VERDICT: PASS" only if all five pass, otherwise "VERDICT: FAIL". Nothing else.

=== FILE UNDER REVIEW ===
${fs.readFileSync(f, 'utf8')}`;
};

// The verdict counts only from an Opus reviewer: on 21 Oct a Sonnet reviewer passed two files an Opus
// judge failed on overstatements (fixes/2026-10-21-cs2-process-rebuild.md).
export const record = (prompt, answer, model = '') => {
  const m = (prompt || '').match(/^CASE STUDY TRUTH REVIEW (\S+) (\S+) hash ([0-9a-f]{16})$/m);
  if (!m) return null;
  const [, cs, file] = m, f = path.join(repo, file);
  if (!fs.existsSync(f) || prompt.trim() !== buildPrompt(cs, f).trim()) return { file, refused: 'the prompt was not the exact one the script builds for the current file' };
  if (!/opus/i.test(model)) return { file, refused: `the reviewer ran on ${model || 'an unknown model'}; run the review with model opus` };
  const verdict = (answer.match(/^VERDICT: (PASS|FAIL)\s*$/m) || [])[1];
  if (!verdict) return { file, refused: 'the answer had no VERDICT line' };
  const checks = answer.split('\n').map(l => l.trim()).filter(l => /^Check \d: (PASS|FAIL)/.test(l));
  const res = { file, hash: m[3], verdict: checks.length === 5 && !checks.some(x => /FAIL/.test(x)) ? verdict : 'FAIL', checks, at: new Date().toISOString() };
  fs.mkdirSync(path.dirname(outFor(cs, f)), { recursive: true });
  fs.writeFileSync(outFor(cs, f), JSON.stringify(res, null, 2) + '\n');
  return res;
};

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  const [cs, a, b] = process.argv.slice(2);
  if (a === '--prompt') { process.stdout.write(buildPrompt(cs, b)); process.exit(0); }
  if (!cs || !a || !fs.existsSync(a)) { console.error('usage: review-truth.mjs <cs> --prompt <file> | <file>'); process.exit(2); }
  const how = `run node reference/review-truth.mjs ${cs} --prompt ${rel(a)} and give its output word for word to a fresh sub-agent`;
  const out = outFor(cs, a);
  const r = fs.existsSync(out) && JSON.parse(fs.readFileSync(out, 'utf8'));
  if (!r || r.hash !== hashOf(cs, a)) { console.log(`no truth review for this version: ${how}`); console.log('TRUTH_REVIEW_FAIL'); process.exit(1); }
  if (r.verdict !== 'PASS') { console.log(r.checks.filter(x => /FAIL/.test(x)).join('\n')); console.log('TRUTH_REVIEW_FAIL'); process.exit(1); }
  console.log('TRUTH_REVIEW_PASS');
}
