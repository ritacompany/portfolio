#!/usr/bin/env node
// Proves the Figma location check and hooks catch what went wrong on 3 and 20 Nov.
// Usage: node scripts/test-figma-locations.mjs [hooks]
//   no argument: the registry and pointer checks on planted cases, then the real repo
//   hooks: the pre and stop hooks of .claude/hooks/figma-location.mjs on planted transcripts
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { checkRegistry, checkPointers, load } from './check-figma-locations.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const { reg, texts } = load(root);
const today = '2026-11-20';
const clone = o => JSON.parse(JSON.stringify(o));
let ok = true;
const t = (label, pass, detail = '') => { ok &&= pass; console.log(`${pass ? 'ok  ' : 'FAIL'} ${label}${pass || !detail ? '' : `\n     ${detail}`}`); };
const has = (ps, re) => ps.some(p => re.test(p));

if (process.argv[2] !== 'hooks') {
  // Planted case 1, 20 Nov: the handoff says the frame is in the Portfolio Design file.
  const planted = 'Where the frame lives: his personal Portfolio Design file in Figma (file IarvWaqjIwrZ2afQmMxKm6, framework case study WIP frame 4269:9433, page VC).';
  const p1 = checkPointers(reg, { 'reference/cs2/HANDOFF.md': `${planted}\nSee reference/figma-locations.json.` });
  t('stale pointer in a handoff fails (frame 4269:9433)', has(p1, /4269:9433.*stale/), p1.join(' | '));
  t('a restated file key in a handoff fails', has(p1, /restates Figma file key IarvWaqjIwrZ2afQmMxKm6/), p1.join(' | '));
  const p1b = checkPointers(reg, { 'reference/cs2/WORKING_LOOP.md': 'open https://www.figma.com/design/abc/x?node-id=1-2' });
  t('a restated figma.com link fails', has(p1b, /figma\.com link/), p1b.join(' | '));
  const p1c = checkPointers(reg, { 'reference/cs2/HANDOFF.md': 'frame 4269-9433 from a pasted link' });
  t('a stale node written with a dash (URL form) fails', has(p1c, /4269:9433/), p1c.join(' | '));
  const p1d = checkPointers(reg, { 'reference/cs2/HANDOFF.md': 'nothing about Figma here' });
  t('a handoff that does not point at the registry fails', has(p1d, /does not point at/), p1d.join(' | '));
  // Positive control: the live frame id is allowed, and so is a node that only contains a stale id's digits.
  const p1e = checkPointers(reg, { 'reference/cs2/HANDOFF.md': 'frame 6331:20607 and layer 14269:94331; reference/figma-locations.json' });
  t('control: live frame id and look alike digits pass', p1e.length === 0, p1e.join(' | '));

  // Planted case 2: a live entry nobody re-verified.
  const old = clone(reg); old.designs[0].verified = '2026-11-01';
  const p2 = checkRegistry(old, today);
  t('a live entry verified 19 days ago fails', has(p2, /last verified 2026-11-01/), p2.join(' | '));
  const edge = clone(reg); edge.designs[0].verified = '2026-11-13';
  t('control: an entry verified exactly 7 days ago passes', checkRegistry(edge, today).length === 0, checkRegistry(edge, today).join(' | '));
  // Planted case 3: a design in a file the session would not know to search.
  const orphan = clone(reg); orphan.files = orphan.files.filter(f => f.key !== '5RO0m4bYYrTvbiaOgaU3tI');
  t('a design whose file is not in the known list fails', has(checkRegistry(orphan, today), /not in the files list/));
  const both = clone(reg); both.stale.push({ design: 'cs2-framework', file: '5RO0m4bYYrTvbiaOgaU3tI', node: '6331:20607', was: 'x', since: today, why: 'x' });
  t('a node that is both live and stale fails', has(checkRegistry(both, today), /both live/));
  const noname = clone(reg); delete noname.designs[0].frame.name;
  t('a frame without a name fails (the name is what gets searched)', has(checkRegistry(noname, today), /frame name and id required/));

  // The real repo.
  const seeded = reg.designs.find(d => d.id === 'cs2-framework');
  t('registry seeded with the 20 Nov CS2 location', seeded?.file === '5RO0m4bYYrTvbiaOgaU3tI' && seeded.page.id === '5658:1061' && seeded.frame.id === '6331:20607' && seeded.verified === today);
  t('registry holds the collection frame 6331:27875', reg.designs.some(d => d.frame.id === '6331:27875' && d.file === '5RO0m4bYYrTvbiaOgaU3tI'));
  t('the Portfolio Design CS2 frame is marked stale', reg.stale.some(s => s.file === 'IarvWaqjIwrZ2afQmMxKm6' && s.node === '4269:9433' && s.design === 'cs2-framework'));
  const real = [...checkRegistry(reg, today), ...checkPointers(reg, texts)];
  t('the real registry and resume files pass', real.length === 0, real.join(' | '));
  const base = spawnSync('git', ['show', '4d0b2a8:reference/cs2/HANDOFF.md'], { cwd: root, encoding: 'utf8' });
  if (base.status === 0) {
    const pb = checkPointers(reg, { 'reference/cs2/HANDOFF.md': base.stdout });
    t('the 20 Nov handoff (before this fix) fails the check', has(pb, /4269:9433/) && has(pb, /does not point at/), pb.length + ' problems');
  }
  console.log(ok ? 'ALL_LOCATION_TESTS_PASS' : 'LOCATION_TESTS_FAIL');
  process.exit(ok ? 0 : 1);
}

// Hooks, on planted transcripts.
const hook = path.join(root, '.claude/hooks/figma-location.mjs');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'figloc-'));
const run = (mode, payload) => spawnSync('node', [hook, mode], { input: JSON.stringify(payload), encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: root } });
const transcript = (name, calls, reply) => {
  const f = path.join(tmp, `${name}.jsonl`);
  const lines = [{ type: 'user', message: { content: 'carry on with the framework case study frame' } }];
  for (const k of calls) lines.push({ type: 'assistant', message: { content: [{ type: 'tool_use', name: 'mcp__figma__get_metadata', input: { fileKey: k, nodeId: '4269:9433' } }] } });
  lines.push({ type: 'assistant', message: { content: [{ type: 'text', text: reply }] } });
  fs.writeFileSync(f, lines.map(l => JSON.stringify(l)).join('\n'));
  return f;
};
const sid = s => `test-${s}-${process.pid}-${Date.now()}`;
const BAD = 'Figma is blocked: the Figma login only has a View seat on the Portfolio Design file and hit its rate limit. Reconnect the Figma connector and I will carry on.';

// 20 Nov exactly: one file tried, then "Figma is blocked".
const s1 = { session_id: sid('a'), transcript_path: transcript('a', ['IarvWaqjIwrZ2afQmMxKm6'], BAD) };
const r1 = run('stop', s1);
t('stop: the 20 Nov reply after one file is held back', /"decision":"block"/.test(r1.stdout) && /5RO0m4bYYrTvbiaOgaU3tI/.test(r1.stdout) && /mondai framework cS most current/.test(r1.stdout), r1.stdout || r1.stderr);
const r1b = run('stop', s1);
t('stop: held a second time while still untried', /"decision":"block"/.test(r1b.stdout));
const r1c = run('stop', s1);
t('stop: lets it through on the third try so it cannot wedge', r1c.stdout.trim() === '' && r1c.status === 0);
const r1d = run('stop', { ...s1, transcript_path: transcript('a2', ['IarvWaqjIwrZ2afQmMxKm6'], 'The frame is missing from the file.') });
t('stop: a "frame is missing" reply is held too', /"decision":"block"/.test(r1d.stdout), r1d.stdout);
// Every known file tried: the report may go out.
const r2 = run('stop', { session_id: sid('b'), transcript_path: transcript('b', ['IarvWaqjIwrZ2afQmMxKm6', '5RO0m4bYYrTvbiaOgaU3tI'], BAD) });
t('stop: same reply after every known file was tried goes through', r2.stdout.trim() === '' && r2.status === 0, r2.stdout);
// A reply that claims nothing about Figma is never touched.
const r3 = run('stop', { session_id: sid('c'), transcript_path: transcript('c', [], 'Section 3 copy is saved and pushed.') });
t('stop: an ordinary reply is never held', r3.stdout.trim() === '' && r3.status === 0, r3.stdout);
const r3b = run('stop', { session_id: sid('d'), transcript_path: transcript('d', [], 'The build is blocked on his yes for the hero copy.') });
t('stop: "blocked" with no Figma or frame in it is not held', r3b.stdout.trim() === '', r3b.stdout);
// Pre hook: a call on the stale frame gets the current location.
const p1 = run('pre', { tool_name: 'mcp__figma__get_metadata', tool_input: { fileKey: 'IarvWaqjIwrZ2afQmMxKm6', nodeId: '4269:9433' } });
t('pre: a call on stale frame 4269:9433 is told the current location', /additionalContext/.test(p1.stdout) && /6331:20607/.test(p1.stdout), p1.stdout);
const p2 = run('pre', { tool_name: 'mcp__figma__use_figma', tool_input: { fileKey: '5RO0m4bYYrTvbiaOgaU3tI', code: "await figma.getNodeByIdAsync('6331:20607')" } });
t('pre: a call on the live frame adds nothing', p2.stdout.trim() === '' && p2.status === 0, p2.stdout);
const p3 = run('pre', { tool_name: 'mcp__figma__get_metadata', tool_input: { fileKey: 'ZZZZZZZZZZZZZZZZZZZZZZ' } });
t('pre: an unknown file is flagged for the registry', /not in reference\/figma-locations\.json/.test(p3.stdout), p3.stdout);
const p4 = run('pre', { tool_name: 'Bash', tool_input: { command: 'ls' } });
t('pre: a non Figma call is untouched', p4.stdout.trim() === '' && p4.status === 0);
// Wiring.
const settings = fs.readFileSync(path.join(root, '.claude/settings.json'), 'utf8');
t('both hooks are registered', /figma-location\.mjs\\" pre/.test(settings) && /figma-location\.mjs\\" stop/.test(settings));
fs.rmSync(tmp, { recursive: true, force: true });
console.log(ok ? 'HOOK_TESTS_PASS' : 'HOOK_TESTS_FAIL');
process.exit(ok ? 0 : 1);
