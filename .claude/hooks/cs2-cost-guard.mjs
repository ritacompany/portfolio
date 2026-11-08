#!/usr/bin/env node
// Cost and process guards (3 Nov, his ask: rules that only live in WORKING_LOOP did not hold).
// The 3 Nov session ran nine reader-check agents in one turn and grew to 375k tokens on Opus, with every
// rule against it written down. Each guard below blocks instead of asking.
//   pre:    PreToolUse. Agent: Sonnet or Haiku only, and at most three per turn (six once aggregate.py has
//           run in the turn, so one re-check round fits), unless his latest message asks for more or for Opus. Write/Edit on a process doc: fix-the-process must be loaded first.
//   stop:   Stop. Over 250k tokens: rewrite HANDOFF, commit, push and tell him to start a new session.
//           A process doc edited this session: a fix record in fixes/ written this session (by Write/Edit, or
//           changed in git since the session began) must pass the skill's checker, from ~/.claude or the repo.
//   prompt: UserPromptSubmit. Shows him (not me) a one time notice when the session runs on Opus.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const mode = process.argv[2];
let p = {}; try { p = JSON.parse(fs.readFileSync(0, 'utf8')); } catch {}
const out = o => { process.stdout.write(JSON.stringify(o)); process.exit(0); };
if (!p.transcript_path || !fs.existsSync(p.transcript_path)) process.exit(0);
const rows = fs.readFileSync(p.transcript_path, 'utf8').trim().split('\n').map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);

const text = e => { const c = e.message && e.message.content; return typeof c === 'string' ? c : Array.isArray(c) ? c.filter(x => x.type === 'text').map(x => x.text).join(' ') : ''; };
// Only his typed messages start a turn: skip skill text, hook feedback, notifications and rows that are
// nothing but system reminders.
const typed = e => {
  if (e.type !== 'user' || e.isSidechain || e.isMeta) return '';
  const t = text(e).replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '').trim();
  return t && !/^(Base directory for this skill|Another Claude session sent a message|<task-notification|<side-sessions-event|\[SYSTEM NOTIFICATION|Stop hook feedback|Skill \/\S+ is already loaded|\[Request interrupted)/.test(t) ? t : '';
};
let start = 0, ask = '';
for (let i = rows.length - 1; i >= 0; i--) { const t = typed(rows[i]); if (t) { start = i; ask = t; break; } }
let since = 0;
for (let i = rows.length - 1; i >= 0; i--) { const e = rows[i]; if ((e.type === 'system' && e.subtype === 'compact_boundary') || e.isCompactSummary) { since = i; break; } }
const uses = (from) => rows.slice(from).filter(e => e.type === 'assistant' && !e.isSidechain).flatMap(e => ((e.message && e.message.content) || []).filter(x => x.type === 'tool_use'));

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const PROCESS_DOCS = /(^|\/)(CLAUDE\.md|reference\/cs2\/(WORKING_LOOP|CS2_PROCESS|BROWSER_MODE)\.md|reference\/cs2\/reader-check\/(README|prompt)\.md|\.claude\/(portfolio-rules|case-study-rules)\.md)$/;
const rel = f => path.relative(root, path.resolve(root, f || ''));
const skillLoaded = name => uses(since).some(x => x.name === 'Skill' && ((x.input && x.input.skill) || '').endsWith(name));

if (mode === 'pre') {
  const tool = p.tool_name, inp = p.tool_input || {};
  if (tool === 'Agent' || tool === 'Task') {
    const sonnet = /\b(sonnet|haiku)\b/i.test(inp.model || '');
    if (!sonnet && !/\bopus\b/i.test(ask)) out({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: 'Sub-agents run on Sonnet (model: "sonnet"); forks and Opus agents need him to ask for Opus. Pass model: "sonnet".' } });
    const before = uses(start).filter(x => (x.name === 'Agent' || x.name === 'Task') && x.id !== p.tool_use_id).length;
    const combined = uses(start).some(x => x.name === 'Bash' && /(^|[;&|(]\s*)python3?\s+(-\S+\s+)*\S*aggregate\.py\b/m.test((x.input && x.input.command) || ''));
    const cap = combined ? 6 : 3;
    if (before >= cap && !/\b(more agents|another round|re-?run|run (it|them|the check) again|fan out|\d+ agents)\b/i.test(ask)) out({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: cap === 3 ? 'Three sub-agents already ran this turn (one reader-check round). Combine it with aggregate.py, fix the flags, then one re-check round is allowed.' : 'Two reader-check rounds already ran this turn. A third waits for him.' } });
  }
  if ((tool === 'Write' || tool === 'Edit' || tool === 'MultiEdit') && PROCESS_DOCS.test(rel(inp.file_path)) && !skillLoaded('fix-the-process')) {
    out({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: `${rel(inp.file_path)} is a process doc. Load the fix-the-process skill first: a change to how sessions work needs a cause, a layer and a fix record, and a rule with nothing enforcing it is not a fix.` } });
  }
  process.exit(0);
}

if (mode === 'stop') {
  if (p.stop_hook_active) process.exit(0);
  const last = [...rows].reverse().find(e => e.type === 'assistant' && !e.isSidechain && e.message && e.message.usage);
  const u = last ? last.message.usage : {};
  const ctx = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  const git = a => spawnSync('git', a, { cwd: root, encoding: 'utf8' }).stdout.trim();
  if (ctx > 250000) {
    const handoffAt = Number(git(['log', '-1', '--format=%ct', 'HEAD', '--', 'reference/cs2/HANDOFF.md'])) * 1000;
    const turnAt = Date.parse(rows[start] && rows[start].timestamp) || 0;
    if (!(handoffAt >= turnAt - 60000)) out({ decision: 'block', reason: `This session is at ${Math.round(ctx / 1000)}k tokens, so every message now costs about ${Math.round(ctx / 1000)}k. Rewrite reference/cs2/HANDOFF.md (section, round, his comments on each version, next action), commit and push it, then tell him to start a new session for the next step.` });
  }
  const edited = uses(since).filter(x => ['Write', 'Edit', 'MultiEdit'].includes(x.name)).map(x => rel(x.input && x.input.file_path));
  if (edited.some(f => PROCESS_DOCS.test(f))) {
    // Records touched this session: by Write/Edit, or seen by git (uncommitted, or committed since the
    // session began), so a record written through Bash still counts.
    const began = (rows.find(e => e.timestamp) || {}).timestamp || new Date().toISOString();
    const viaGit = [...git(['ls-files', '--modified', '--others', '--exclude-standard', '--', 'fixes']).split('\n'),
      ...git(['log', `--since=${began}`, '--name-only', '--format=', '--', 'fixes']).split('\n')];
    const records = [...new Set([...edited, ...viaGit].filter(f => /(^|\/)fixes\/[^/]+\.md$/.test(f) && fs.existsSync(path.join(root, f))))];
    // The skill lives in ~/.claude on his Mac; cloud containers only have the repo's copy.
    const home = path.join(os.homedir(), '.claude/skills/fix-the-process/scripts/check-fix-record.mjs');
    const checker = fs.existsSync(home) ? home : path.join(root, '.claude/skills/fix-the-process/scripts/check-fix-record.mjs');
    const ok = records.some(f => /fix record complete/.test(spawnSync('node', [checker, path.join(root, f)], { encoding: 'utf8' }).stdout || ''));
    if (!ok) out({ decision: 'block', reason: 'A process doc changed this session without a passing fix record. Write fixes/YYYY-MM-DD-<slug>.md from the fix-the-process template and run its checker until it prints "fix record complete" (Status: not verified is allowed if you say what is unproven).' });
  }
  process.exit(0);
}

if (mode === 'prompt') {
  const last = [...rows].reverse().find(e => e.type === 'assistant' && !e.isSidechain && e.message && e.message.model);
  if (!last || !/opus/i.test(last.message.model)) process.exit(0);
  const flag = path.join(os.tmpdir(), `cs2-opus-notice-${p.session_id || 'x'}`);
  if (fs.existsSync(flag)) process.exit(0);
  fs.writeFileSync(flag, '');
  out({ systemMessage: 'This session runs on Opus, which uses your limit several times faster than Sonnet. Switch to Sonnet in the model picker unless you are drafting a new section.' });
}
process.exit(0);
