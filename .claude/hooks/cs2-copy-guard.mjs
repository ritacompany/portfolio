#!/usr/bin/env node
// PreToolUse guard for CS2 page copy and slot plans. A write to reference/cs2/copy/section-N.md is
// checked with check-copy.mjs, a write to reference/cs2/layout/section-N.md with check-slot-plan.mjs,
// before it lands; a failing write is refused (exit 2) with the reasons.
// Shell writes into either folder are refused outright so the check cannot be bypassed.
// reference/cs2/APPROVALS.md is Chadwick's own file: every write to it from Claude is refused.
// reference/cs2/review/ holds fewer figures verdicts. Only this hook writes them, in review mode, after
// a sub-agent answers the exact prompt check-figures-review.mjs builds. Claude's writes there are refused.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let payload;
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
const { tool_name: tool, tool_input: input = {} } = payload;
const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();

// Review mode, after an Agent call: record the verdict if the sub-agent got the exact review prompt.
// Subagent mode, on SubagentStop: the desktop app runs sub-agents in the background, so PostToolUse
// only sees the launch notice. This reads the finished sub-agent's own transcript instead: its first
// user message is the prompt, its last assistant text is the answer.
if (process.argv[2] === 'subagent') {
  const tp = payload.agent_transcript_path || (payload.transcript_path && payload.agent_id
    && path.join(payload.transcript_path.replace(/\.jsonl$/, ''), 'subagents', `agent-${payload.agent_id}.jsonl`));
  if (!tp || !fs.existsSync(tp)) process.exit(0);
  let prompt = '', answer = '';
  for (const l of fs.readFileSync(tp, 'utf8').split('\n')) {
    let d; try { d = JSON.parse(l); } catch { continue; }
    const c = d.message?.content;
    const text = typeof c === 'string' ? c : Array.isArray(c) ? c.filter(x => x.type === 'text').map(x => x.text).join('\n') : '';
    if (d.type === 'user' && !prompt && typeof c === 'string') prompt = c;
    if (d.type === 'assistant' && text) answer = text;
  }
  if (!/^CS2 STORY REVIEW section/.test(prompt)) process.exit(0);
  const { record } = await import(path.join(root, 'reference/cs2/check-figures-review.mjs'));
  const res = record(prompt, answer);
  if (res?.refused) { console.error(`CS2 review not recorded for section ${res.section}: ${res.refused}.`); process.exit(2); }
  if (res) console.log(`CS2 review recorded for section ${res.section}: ${res.verdict}.`);
  process.exit(0);
}
if (process.argv[2] === 'review') {
  const texts = [];
  const walk = v => { if (typeof v === 'string') texts.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
  walk(payload.tool_response);
  // A background launch has no answer yet; subagent mode records it when the sub-agent stops.
  if (/async/i.test(texts.join('\n')) && !/^VERDICT:/m.test(texts.join('\n'))) process.exit(0);
  const { record } = await import(path.join(root, 'reference/cs2/check-figures-review.mjs'));
  const res = record(input.prompt || '', texts.join('\n'));
  if (res?.refused) { console.error(`CS2 review not recorded for section ${res.section}: ${res.refused}.`); process.exit(2); }
  if (res) console.log(`CS2 review recorded for section ${res.section}: ${res.verdict}.`);
  process.exit(0);
}
const GUARDED = [
  [/reference\/cs2\/copy\/section-\d+\.md$/, 'check-copy.mjs', 'this CS2 copy breaks his copy rules'],
  [/reference\/cs2\/message\/section-\d+\.md$/, 'check-message-plan.mjs', 'this CS2 message plan fails its check'],
  [/reference\/cs2\/layout\/section-\d+\.md$/, 'check-slot-plan.mjs', 'this CS2 slot plan fails its check'],
];

const APPROVALS = /reference\/cs2\/APPROVALS\.md/;
const DIRS = ['copy', 'layout', 'message', 'review'].map(d => path.join(root, 'reference/cs2', d));
const snapshot = () => Object.fromEntries(DIRS.flatMap(d => fs.existsSync(d) ? fs.readdirSync(d).map(f => {
  const full = path.join(d, f); return [full, fs.statSync(full).mtimeMs];
}) : []));
const snapPath = () => path.join(os.tmpdir(), `cs2guard-${payload.session_id || 'x'}-${payload.tool_use_id || 'x'}.json`);
const checkFor = full => {
  if (/reference\/cs2\/review\//.test(full)) return 'review verdicts are written only by the hook, after a sub-agent review';
  const g = GUARDED.find(([re]) => re.test(full));
  if (!g) return 'files here are named section-N.md only';
  const r = spawnSync('node', [path.join(root, 'reference/cs2', g[1]), full, ...(g[1] === 'check-copy.mjs' ? [] : [full])], { encoding: 'utf8' });
  return r.status === 0 ? null : (r.stdout || r.stderr).trim();
};

// Post mode, after a Bash command: any guarded file it created or changed must pass its check.
if (process.argv[2] === 'post') {
  if (tool !== 'Bash' || !fs.existsSync(snapPath())) process.exit(0);
  const before = JSON.parse(fs.readFileSync(snapPath(), 'utf8'));
  fs.rmSync(snapPath(), { force: true });
  const bad = Object.entries(snapshot()).filter(([f, m]) => before[f] !== m).map(f => [f[0], checkFor(f[0])]).filter(([, e]) => e);
  if (!bad.length) process.exit(0);
  console.error(`Blocked after the fact: a shell command changed CS2 files that now fail their check. Restore them with git checkout or fix them with Edit.\n${bad.map(([f, e]) => `${path.relative(root, f)}: ${e}`).join('\n')}`);
  process.exit(2);
}
if (tool === 'Bash') {
  const cmd = input.command || '';
  if (/(?:>>?|\btee\b|\b(?:sed\s+-i|mv|cp|rm|perl\s+-[a-z]*i)\b)[^;&|]*reference\/cs2\/APPROVALS\.md/.test(cmd)) {
    console.error('Blocked: APPROVALS.md is Chadwick\'s file. Ask him to add the line himself.');
    process.exit(2);
  }
  const F = String.raw`reference\/cs2\/(?:copy|layout|message|review)`;
  const writesCopy = new RegExp(String.raw`(?:>>?|\btee\b(?:\s+-a)?)\s*["']?[^\s"';&|]*${F}\/`).test(cmd)
    || new RegExp(String.raw`\b(?:sed\s+-i|mv|cp|rm|perl\s+-[a-z]*i)\b[^;&|]*${F}\/`).test(cmd)
    || new RegExp(String.raw`\b(?:node|python3?|ruby|perl)\s+-[ec]\b[^;&|]*${F}`).test(cmd)
    || new RegExp(String.raw`\bcd\s+["']?[^\s;&|]*${F}`).test(cmd);
  // Anything the patterns miss (a script file, a cd one level up) is caught after the command runs:
  // snapshot the guarded files now, and the post hook checks whatever changed.
  fs.writeFileSync(snapPath(), JSON.stringify(snapshot()));
  if (writesCopy) {
    console.error('Blocked: CS2 copy and slot plan files are written with Write or Edit only, so their check runs on every change.');
    process.exit(2);
  }
  process.exit(0);
}

const file = input.file_path || '';
if (APPROVALS.test(file) && ['Write', 'Edit', 'MultiEdit', 'NotebookEdit'].includes(tool)) {
  console.error('Blocked: APPROVALS.md is Chadwick\'s file. Ask him to add the line himself.');
  process.exit(2);
}
if (/reference\/cs2\/(?:copy|layout|message)\/(?!section-\d+\.md$)[^/]+$/.test(file)) {
  console.error('Blocked: files in reference/cs2/copy, layout and message are named section-N.md only, so every one is checked.');
  process.exit(2);
}
if (/reference\/cs2\/review\//.test(file)) {
  console.error('Blocked: review verdicts are written only by the hook. Run the review with a sub-agent instead.');
  process.exit(2);
}
const guard = GUARDED.find(([re]) => re.test(file));
if (!guard) process.exit(0);

let next;
const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
if (tool === 'Write') next = input.content ?? '';
else if (tool === 'Edit') {
  next = input.replace_all ? current.split(input.old_string).join(input.new_string) : current.replace(input.old_string, input.new_string);
} else if (tool === 'MultiEdit') {
  next = current;
  for (const e of input.edits || []) next = e.replace_all ? next.split(e.old_string).join(e.new_string) : next.replace(e.old_string, e.new_string);
} else process.exit(0);

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cs2guard-')), path.basename(file));
fs.writeFileSync(tmp, next);
const r = spawnSync('node', [path.join(root, 'reference/cs2', guard[1]), tmp, ...(guard[1] === 'check-copy.mjs' ? [] : [file])], { encoding: 'utf8' });
fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
if (r.status === 0) process.exit(0);
console.error(`Blocked: ${guard[2]}. Rewrite these lines, then save again.\n${(r.stdout || r.stderr).replace(tmp, file)}`);
process.exit(2);
