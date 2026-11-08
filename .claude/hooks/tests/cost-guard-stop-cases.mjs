// Cases for cs2-cost-guard.mjs stop mode (process doc edited: a passing fix record must exist).
// Run: node .claude/hooks/tests/cost-guard-stop-cases.mjs
// Each case builds a throwaway git repo and runs the hook with HOME pointed at an empty folder, the way a
// cloud container looks (no ~/.claude/skills). Prints COST_GUARD_STOP_CASES_PASS when every case matches.
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { spawnSync } from 'node:child_process';
const here = path.dirname(new URL(import.meta.url).pathname);
const repo = path.resolve(here, '..', '..', '..');
const hook = path.join(repo, '.claude/hooks/cs2-cost-guard.mjs');
const checker = path.join(repo, '.claude/skills/fix-the-process/scripts/check-fix-record.mjs');
const good = fs.readFileSync(path.join(repo, 'fixes/2026-11-08-reader-check-fixes-left-unchecked.md'), 'utf8');
const bad = fs.readFileSync(path.join(repo, '.claude/skills/fix-the-process/templates/FIX.md'), 'utf8');
const REC = 'fixes/2026-11-08-sample.md';
const tool = (name, input) => ({ type: 'assistant', message: { content: [{ type: 'tool_use', name, input, id: 't' + Math.random() }] } });
const editDoc = tool('Edit', { file_path: 'reference/cs2/WORKING_LOOP.md' });
const editRec = tool('Edit', { file_path: REC });
const bashRec = tool('Bash', { command: 'python3 edit.py' });

const run = ({ record, committed, oldCommit, rows }) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cgs-'));
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'cgs-home-'));
  const g = (a, env = {}) => spawnSync('git', a, { cwd: root, encoding: 'utf8', env: { ...process.env, ...env } });
  g(['init', '-q']); g(['config', 'user.email', 't@t']); g(['config', 'user.name', 't']);
  fs.mkdirSync(path.join(root, '.claude/skills/fix-the-process/scripts'), { recursive: true });
  fs.copyFileSync(checker, path.join(root, '.claude/skills/fix-the-process/scripts/check-fix-record.mjs'));
  fs.mkdirSync(path.join(root, 'fixes'));
  fs.writeFileSync(path.join(root, 'README'), 'x'); g(['add', '-A']); g(['commit', '-qm', 'base']);
  if (record) {
    fs.writeFileSync(path.join(root, REC), record);
    if (committed || oldCommit) {
      const when = oldCommit ? new Date(Date.now() - 2 * 864e5).toISOString() : new Date().toISOString();
      g(['add', '-A']); g(['commit', '-qm', 'rec'], { GIT_AUTHOR_DATE: when, GIT_COMMITTER_DATE: when });
    }
  }
  const start = { type: 'user', timestamp: new Date(Date.now() - 3600e3).toISOString(), message: { content: 'do the work' } };
  const t = path.join(root, 'transcript.jsonl');
  fs.writeFileSync(t, [start, ...rows].map(r => JSON.stringify(r)).join('\n'));
  const r = spawnSync('node', [hook, 'stop'], { input: JSON.stringify({ transcript_path: t }), encoding: 'utf8', env: { ...process.env, HOME: home, CLAUDE_PROJECT_DIR: root } });
  return /"block"/.test(r.stdout) && /fix record/.test(r.stdout) ? 'block' : 'allow';
};

const cases = [
  ['passing record edited with Edit, no ~/.claude copy of the checker', { record: good, rows: [editDoc, editRec] }, 'allow'],
  ['passing record written through Bash, uncommitted', { record: good, rows: [editDoc, bashRec] }, 'allow'],
  ['passing record written through Bash and committed this session', { record: good, committed: true, rows: [editDoc, bashRec] }, 'allow'],
  ['failing record is still blocked', { record: bad, rows: [editDoc, editRec] }, 'block'],
  ['no record is still blocked', { rows: [editDoc] }, 'block'],
  ['an old passing record from before this session does not count', { record: good, oldCommit: true, rows: [editDoc] }, 'block'],
  ['no process doc edited, no record needed', { rows: [bashRec] }, 'allow'],
];
let n = 0;
for (const [name, c, want] of cases) { const got = run(c); console.log((got === want ? 'ok   ' : 'FAIL ') + name + ' (' + got + ')'); if (got !== want) n++; }
console.log(n ? 'COST_GUARD_STOP_CASES_FAIL' : 'COST_GUARD_STOP_CASES_PASS');
