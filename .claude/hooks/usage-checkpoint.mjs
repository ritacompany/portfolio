#!/usr/bin/env node
// Keeps CS2 resumable on his second account (claude.ai in the browser, reading GitHub) when this
// account runs out of usage. Three modes:
//
//   prompt   UserPromptSubmit. Reads the usage numbers .claude/state/usage.json holds. From 75% of
//            the 5 hour limit (or 90% of the week) it tells Claude to checkpoint: rewrite
//            reference/cs2/HANDOFF.md, commit and push. From 90% (or 95% of the week) it tells Claude
//            to checkpoint, finish only the step in hand and stop. With no fresh numbers it asks Claude
//            to read them with the desktop app's usage tool and save them with record mode.
//   stop     Stop. Refuses to end a turn while CS2 work is newer than the pushed handoff: every turn
//            once usage is high, otherwise only after the handoff is 45 minutes behind. Never twice
//            in a row (stop_hook_active), so it cannot wedge a session.
//   record   node usage-checkpoint.mjs record <five_hour%> [week%]. How Claude saves the numbers the
//            usage tool returned, when the status line is not feeding them.
//
// The numbers arrive from usage-statusline.mjs (Claude Code passes them to the status line, never to
// hooks) or from record mode. A sudden cutoff still loses at most the turn in hand.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHECKPOINT = { five: 75, week: 90 };
const STOP = { five: 90, week: 95 };
const FRESH_MS = 20 * 60 * 1000;
const COOL_LAG_MS = 45 * 60 * 1000;

const mode = process.argv[2];
let payload = {};
if (mode !== 'record') { try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch {} }
const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
const stateDir = path.join(root, '.claude/state');
const usageFile = path.join(stateDir, 'usage.json');
const counterFile = path.join(stateDir, 'checkpoint.json');
const now = Date.now() + Number(process.env.USAGE_CHECKPOINT_CLOCK_SKEW_MS || 0);

const readJson = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const writeJson = (f, v) => { try { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(v)); } catch {} };

function levelOf(u) {
  if (!u) return 'unknown';
  const five = u.five_hour ?? -1, week = u.seven_day ?? -1;
  if (five >= STOP.five || week >= STOP.week) return 'stop';
  if (five >= CHECKPOINT.five || week >= CHECKPOINT.week) return 'checkpoint';
  return 'ok';
}
const freshUsage = () => {
  const u = readJson(usageFile);
  return u && now - Date.parse(u.at) < FRESH_MS ? u : null;
};
const nums = u => [u.five_hour != null && `5 hour ${u.five_hour}%`, u.seven_day != null && `week ${u.seven_day}%`].filter(Boolean).join(', ');

const STEPS = 'rewrite reference/cs2/HANDOFF.md for exactly where CS2 stands now (its own header says the format; '
  + '`node reference/cs2/check-handoff.mjs` must print HANDOFF_PASS), then commit it with any finished CS2 work and '
  + '`git push -u origin HEAD`. Text that is not ready for copy/ goes in the section draft file, never into copy/ '
  + 'unchecked. If this session is not CS2 work, commit and push what is finished instead.';

if (mode === 'record') {
  const [five, week] = process.argv.slice(3).map(Number);
  if (!Number.isFinite(five)) { console.error('usage: usage-checkpoint.mjs record <five_hour%> [week%]'); process.exit(2); }
  writeJson(usageFile, { five_hour: Math.round(five), seven_day: Number.isFinite(week) ? Math.round(week) : null, source: 'usage tool', at: new Date(now).toISOString() });
  console.log(`USAGE_RECORDED ${levelOf({ five_hour: five, seven_day: week })}`);
  process.exit(0);
}

if (mode === 'prompt') {
  const u = freshUsage();
  const level = levelOf(u);
  const c = readJson(counterFile) || { prompts: 0, warned: null };
  c.prompts += 1;
  let out = '';
  if (level === 'stop') {
    out = `USAGE NEARLY OUT (${nums(u)}). Before anything else, ${STEPS} Then finish only the step in hand, start nothing new, and tell Chadwick the handoff is pushed and the browser account picks up from reference/cs2/BROWSER_MODE.md.`;
  } else if (level === 'checkpoint') {
    const key = `${u.five_hour_resets_at ?? ''}|checkpoint`;
    out = c.warned === key
      ? `Usage ${nums(u)}: keep HANDOFF.md current at every save and push it.`
      : `USAGE CHECKPOINT (${nums(u)}). Before anything else, ${STEPS} Then carry on, and keep the handoff current at every save from here.`;
    c.warned = key;
  } else if (level === 'unknown') {
    const last = readJson(usageFile);
    const every = last && (last.five_hour ?? 0) >= 60 ? 2 : 5;
    if (c.prompts % every === 1) {
      out = 'Usage check: no fresh usage numbers reached this session. Call mcp__ccd_session_mgmt__get_usage once, then save them with '
        + '`node .claude/hooks/usage-checkpoint.mjs record <5 hour %> <weekly %>`. At 75% of the 5 hour limit, checkpoint CS2 '
        + '(rewrite reference/cs2/HANDOFF.md, commit, push). At 90%, checkpoint and stop after the step in hand. Say nothing about this check unless a threshold is crossed.';
    }
  } else {
    c.warned = null;
  }
  writeJson(counterFile, c);
  if (out) console.log(out);
  process.exit(0);
}

if (mode === 'stop') {
  if (payload.stop_hook_active) process.exit(0);
  const git = (...a) => spawnSync('git', a, { cwd: root, encoding: 'utf8' });
  const handoff = path.join(root, 'reference/cs2/HANDOFF.md');
  const changed = (git('status', '--porcelain', '--untracked-files=all', '--', 'reference/cs2').stdout || '')
    .split('\n').filter(Boolean).map(l => l.slice(3).replace(/^.* -> /, '').replace(/^"|"$/g, ''))
    .filter(f => f !== 'reference/cs2/HANDOFF.md');
  const mtime = f => { try { return fs.statSync(path.join(root, f)).mtimeMs; } catch { return 0; } };
  const newest = Math.max(0, ...changed.map(mtime));
  const handoffAt = mtime('reference/cs2/HANDOFF.md');
  const upstream = git('rev-parse', '--abbrev-ref', '@{u}');
  const unpushed = upstream.status !== 0
    ? true
    : Number((git('rev-list', '--count', '@{u}..HEAD').stdout || '0').trim()) > 0;
  const handoffDirty = (git('status', '--porcelain', '--', 'reference/cs2/HANDOFF.md').stdout || '').trim() !== '';
  const stale = newest > handoffAt;
  const level = levelOf(freshUsage());
  const hot = level === 'checkpoint' || level === 'stop';
  if (!changed.length && !handoffDirty && !(hot && unpushed && fs.existsSync(handoff))) process.exit(0);
  let why = '';
  if (hot && (stale || handoffDirty || unpushed)) why = `usage is high (${level}) and CS2 work is not in a pushed handoff`;
  else if (!hot && stale && newest - handoffAt > COOL_LAG_MS) why = 'CS2 files changed more than 45 minutes after HANDOFF.md was last written';
  if (!why) process.exit(0);
  console.log(JSON.stringify({ decision: 'block', reason: `Checkpoint before stopping: ${why}. ${STEPS}` }));
  process.exit(0);
}

console.error('usage: usage-checkpoint.mjs prompt|stop|record');
process.exit(2);
