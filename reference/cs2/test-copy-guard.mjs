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
  ['clean Write', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\n## 1\n\nEyebrow: Due Saturday night\n\nHeadline: The week is the deadline.\n\nInside it, the order is yours.\n' } }, 0],
  ['essay Write, no blocks', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\nThe week is the deadline.\n\nInside it, the order is yours.\n' } }, 2],
  ['bad Bash redirect', { tool_name: 'Bash', tool_input: { command: `echo hi > ${target}` } }, 2],
  ['unrelated Bash', { tool_name: 'Bash', tool_input: { command: 'ls reference/cs2' } }, 0],
  ['read-only check with 2>&1', { tool_name: 'Bash', tool_input: { command: 'node reference/cs2/check-copy.mjs reference/cs2/copy/section-2.md 2>&1 | tail -1' } }, 0],
  ['bad tee append', { tool_name: 'Bash', tool_input: { command: 'echo hi | tee -a reference/cs2/copy/section-2.md' } }, 2],
  ['bad sed -i', { tool_name: 'Bash', tool_input: { command: "sed -i '' s/a/b/ reference/cs2/copy/section-2.md" } }, 2],
  ['unrelated Write', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/draft/x.md'), content: 'Michael' } }, 0],
  ['slot plan borrowing from Haven', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/layout/section-99.md'), content: 'Section: 2\n\n| Layout piece | Slot | What goes in it | Why |\n|---|---|---|---|\n| TextAnd1Image layout 1 | Image | Haven circles | Haven has them |\n| TextAnd1Image layout 1 | Text | The claim | It leads |\n' } }, 2],
  ['slot plan before any message plan', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/layout/section-99.md'), content: 'Section: 2\n\n| Layout piece | Slot | What goes in it | Why |\n|---|---|---|---|\n| TextAnd1Image layout 1 | Image | The Action Hub screen he picks | The screen holds the evidence |\n| TextAnd1Image layout 1 | Text | The claim | It leads |\n' } }, 2],
  ['clean message plan', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Already shown by the copy: no.\n- Figure count: 1, the Action Hub screen he picks.\n' } }, 0],
  ['message plan naming a layout piece', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Already shown by the copy: no.\n- Figure count: 1, the Action Hub screen he picks, TextAnd1Image layout 1.\n' } }, 2],
  ['bad Bash into message', { tool_name: 'Bash', tool_input: { command: 'echo hi > reference/cs2/' + 'message/section-2.md' } }, 2],
  ['bad Bash into layout', { tool_name: 'Bash', tool_input: { command: 'echo hi > reference/cs2/layout/section-2.md' } }, 2],
];
let ok = true;
for (const [label, p, want] of cases) { const r = call(p); const pass = r.status === want; ok &&= pass; console.log(`${pass ? 'ok  ' : 'FAIL'} ${label} exit=${r.status} want=${want}`); }
fs.writeFileSync(target, 'Section: 2\n\n## 1\n\nEyebrow: The week\n\nHeadline: Due Saturday night.\n\nThe week is the deadline.\n');
const badEdit = call({ tool_name: 'Edit', tool_input: { file_path: target, old_string: 'The week', new_string: 'Michael said the week' } });
const goodEdit = call({ tool_name: 'Edit', tool_input: { file_path: target, old_string: 'The week', new_string: 'Each week' } });
fs.rmSync(target);
ok &&= badEdit.status === 2 && goodEdit.status === 0;
console.log(`${badEdit.status === 2 ? 'ok  ' : 'FAIL'} bad Edit blocked\n${goodEdit.status === 0 ? 'ok  ' : 'FAIL'} clean Edit allowed`);
if (ok) console.log('copy guard discrimination passed');
process.exit(ok ? 0 : 1);
