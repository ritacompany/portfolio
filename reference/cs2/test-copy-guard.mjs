// Proves the copy guard hook refuses bad copy and shell writes, and lets clean copy through.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const hook = path.join(root, '.claude/hooks/cs2-copy-guard.mjs');
const target = path.join(root, 'reference/cs2/copy/section-99.md');
const call = p => spawnSync('node', [hook], { input: JSON.stringify(p), encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: root } });
const cases = [
  ['bad Write', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\nMichael wanted it.\n' } }, 2],
  ['clean Write', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\nThe week is the deadline.\n' } }, 0],
  ['bad Bash redirect', { tool_name: 'Bash', tool_input: { command: `echo hi > ${target}` } }, 2],
  ['unrelated Bash', { tool_name: 'Bash', tool_input: { command: 'ls reference/cs2' } }, 0],
  ['read-only check with 2>&1', { tool_name: 'Bash', tool_input: { command: 'node reference/cs2/check-copy.mjs reference/cs2/copy/section-2.md 2>&1 | tail -1' } }, 0],
  ['bad tee append', { tool_name: 'Bash', tool_input: { command: 'echo hi | tee -a reference/cs2/copy/section-2.md' } }, 2],
  ['bad sed -i', { tool_name: 'Bash', tool_input: { command: "sed -i '' s/a/b/ reference/cs2/copy/section-2.md" } }, 2],
  ['unrelated Write', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/draft/x.md'), content: 'Michael' } }, 0],
];
let ok = true;
for (const [label, p, want] of cases) { const r = call(p); const pass = r.status === want; ok &&= pass; console.log(`${pass ? 'ok  ' : 'FAIL'} ${label} exit=${r.status} want=${want}`); }
fs.writeFileSync(target, 'Section: 2\n\nThe week is the deadline.\n');
const badEdit = call({ tool_name: 'Edit', tool_input: { file_path: target, old_string: 'The week', new_string: 'Michael said the week' } });
const goodEdit = call({ tool_name: 'Edit', tool_input: { file_path: target, old_string: 'The week', new_string: 'Each week' } });
fs.rmSync(target);
ok &&= badEdit.status === 2 && goodEdit.status === 0;
console.log(`${badEdit.status === 2 ? 'ok  ' : 'FAIL'} bad Edit blocked\n${goodEdit.status === 0 ? 'ok  ' : 'FAIL'} clean Edit allowed`);
if (ok) console.log('copy guard discrimination passed');
process.exit(ok ? 0 : 1);
