#!/usr/bin/env node
// Checks a return packet from the browser account (BROWSER_MODE.md) before anything in it is saved.
// Usage: node check-packet.mjs <packet-file>
// The packet is the browser session's whole output: a header, then each file it changed between
//   === FILE reference/cs2/<path> ===   and   === END FILE ===
// Only four files may come back, all for the packet's section: copy/section-N.md, message/section-N.md,
// draft/CS2-section-N.md and HANDOFF.md (required, By: browser). Slot plans, review verdicts and
// APPROVALS.md are refused: those steps run in Claude Code only.
// Each file is written into a scratch copy of reference/cs2 and run through the same check its hook
// runs (check-copy, check-message-plan, check-handoff). A pass does not save anything: Claude saves
// each file with Write, so the guard hooks run again on the real path, and the story review follows.
// Prints PACKET_PASS with the files to save, or lists every problem, prints PACKET_FAIL and exits 1.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkHandoff } from './check-handoff.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.error('usage: check-packet.mjs <packet-file>'); process.exit(2); }
const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const problems = [];

if (!/^CS2 RETURN PACKET\s*$/m.test(raw)) problems.push('first line must be "CS2 RETURN PACKET"');
const n = Number((raw.match(/^Section:\s*(\d+)\s*$/m) || [])[1]);
if (!(n >= 1 && n <= 10)) problems.push('"Section: N" header missing');
if (!/^Loop step reached:\s*[1-8]\s*$/m.test(raw)) problems.push('"Loop step reached: N" header missing (1 to 8)');

const files = [...raw.matchAll(/^=== FILE (\S+) ===\n([\s\S]*?)^=== END FILE ===\s*$/gm)].map(m => ({ rel: m[1], body: m[2] }));
const opened = (raw.match(/^=== FILE /gm) || []).length;
if (opened !== files.length) problems.push(`${opened} files opened but ${files.length} closed with "=== END FILE ==="`);
const allowed = new Map([
  [`reference/cs2/copy/section-${n}.md`, 'copy'],
  [`reference/cs2/message/section-${n}.md`, 'message'],
  [`reference/cs2/draft/CS2-section-${n}.md`, 'draft'],
  ['reference/cs2/HANDOFF.md', 'handoff'],
]);
const seen = new Set();
for (const f of files) {
  if (seen.has(f.rel)) problems.push(`${f.rel}: sent twice`);
  seen.add(f.rel);
  if (!allowed.has(f.rel)) problems.push(`${f.rel}: the browser account may only send copy, message plan, draft notes and HANDOFF.md for section ${n}`);
}
if (!seen.has('reference/cs2/HANDOFF.md')) problems.push('reference/cs2/HANDOFF.md missing: every packet ends with the new handoff');

// Scratch copy of what the checks read, with the packet's files laid over the repo's.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cs2packet-'));
const cs2 = path.join(tmp, 'reference/cs2');
for (const d of ['copy', 'message', 'draft']) fs.mkdirSync(path.join(cs2, d), { recursive: true });
for (const f of ['check-copy.mjs', 'check-message-plan.mjs', 'route-rule.mjs', 'CS2_REFERENCE_INDEX.md', 'APPROVALS.md'])
  if (fs.existsSync(path.join(here, f))) fs.copyFileSync(path.join(here, f), path.join(cs2, f));
for (const f of fs.existsSync(path.join(here, 'copy')) ? fs.readdirSync(path.join(here, 'copy')) : [])
  fs.copyFileSync(path.join(here, 'copy', f), path.join(cs2, 'copy', f));
for (const f of files.filter(f => allowed.has(f.rel))) fs.writeFileSync(path.join(tmp, f.rel), f.body);

const run = (script, ...a) => spawnSync('node', [path.join(cs2, script), ...a], { encoding: 'utf8' });
const longQuote = body => body.split('\n').flatMap((line, i) => [...line.matchAll(/["“]([^"”]+)["”]/g)]
  .filter(m => m[1].trim().split(/\s+/).length >= 12).map(() => `line ${i + 1}`));

for (const f of files.filter(f => allowed.has(f.rel))) {
  const kind = allowed.get(f.rel);
  const at = path.join(tmp, f.rel);
  if (kind === 'copy') {
    const r = run('check-copy.mjs', at);
    if (r.status !== 0) problems.push(`${f.rel} fails check-copy:\n${(r.stdout || r.stderr).trim().split('\n').slice(1).join('\n')}`);
  }
  if (kind === 'message') {
    const r = run('check-message-plan.mjs', at, at);
    if (r.status !== 0) problems.push(`${f.rel} fails check-message-plan:\n${(r.stdout || r.stderr).trim().replace(/\nMESSAGE_FAIL$/, '').split('\n').map(l => `  ${l}`).join('\n')}`);
  }
  if (kind === 'handoff') {
    for (const p of checkHandoff(f.body)) problems.push(`${f.rel}: ${p}`);
    if (!/^By:\s*browser\s*$/m.test(f.body)) problems.push(`${f.rel}: a packet's handoff says "By: browser"`);
  }
  if (kind === 'draft') {
    if (!/^Status:\s*(talking|drafted|built|approved)\b/im.test(f.body)) problems.push(`${f.rel}: no "Status:" line (talking, drafted, built or approved)`);
    for (const l of longQuote(f.body)) problems.push(`${f.rel} ${l}: a quotation of 12 words or more; the repo is public, so point to the source in ~/Documents/CS2-research/ instead`);
  }
  if (/[—–]|\s--\s/.test(f.body)) problems.push(`${f.rel}: dash`);
}
fs.rmSync(tmp, { recursive: true, force: true });

if (problems.length) { console.log(problems.map(p => `  ${p}`).join('\n')); console.log('PACKET_FAIL'); process.exit(1); }
console.log(`PACKET_PASS section ${n}. Save each with Write, in this order:`);
for (const k of ['draft', 'copy', 'message', 'handoff']) for (const f of files) if (allowed.get(f.rel) === k) console.log(`  ${f.rel}`);
