#!/usr/bin/env node
// PreToolUse guard for CS2 page copy. Any write to reference/cs2/copy/section-N.md is checked with
// reference/cs2/check-copy.mjs before it lands; a failing write is refused (exit 2) with the reasons.
// Shell writes into the copy folder are refused outright so the check cannot be bypassed.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let payload;
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
const { tool_name: tool, tool_input: input = {} } = payload;
const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
const COPY = /reference\/cs2\/copy\/section-\d+\.md$/;

if (tool === 'Bash') {
  const cmd = input.command || '';
  if (/reference\/cs2\/copy\//.test(cmd) && /(>|\btee\b|\bsed\s+-i|\bmv\b|\bcp\b|\brm\b|\bperl\s+-[a-z]*i)/.test(cmd)) {
    console.error('Blocked: CS2 copy files are written with Write or Edit only, so the copy check runs on every change.');
    process.exit(2);
  }
  process.exit(0);
}

const file = input.file_path || '';
if (!COPY.test(file)) process.exit(0);

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
const r = spawnSync('node', [path.join(root, 'reference/cs2/check-copy.mjs'), tmp], { encoding: 'utf8' });
fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
if (r.status === 0) process.exit(0);
console.error(`Blocked: this CS2 copy breaks his copy rules. Rewrite these lines, then save again.\n${(r.stdout || r.stderr).replace(tmp, file)}`);
process.exit(2);
