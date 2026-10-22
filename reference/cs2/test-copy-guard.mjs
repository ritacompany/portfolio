// Proves the copy guard hook refuses bad copy and shell writes, and holds clean copy until its block plan
// has a truth review PASS (fixes/2026-10-21-cs2-process-rebuild.md).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const hook = path.join(root, '.claude/hooks/cs2-copy-guard.mjs');
const target = path.join(root, 'reference/cs2/copy/section-99.md');
const call = p => spawnSync('node', [hook], { input: JSON.stringify(p), encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: root } });
const cases = [
  ['bad Write', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\nMichael wanted it.\n' } }, 2],
  ['clean Write', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\n## 1\n\nEyebrow: Due Saturday night\n\nHeadline: The week is the deadline.\n\nInside it, the order is yours.\n' } }, 2],
  ['outline in the old order', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/outline/outline.md'), content: '## 1. Where it started\nFrame block: proposed\nReader gets: the gap.\nFlows: D1\n' } }, 2],
  ['Bash into the outline', { tool_name: 'Bash', tool_input: { command: 'echo x > reference/cs2/' + 'outline/outline.md' } }, 2],
  ['essay Write, no blocks', { tool_name: 'Write', tool_input: { file_path: target, content: 'Section: 2\n\nThe week is the deadline.\n\nInside it, the order is yours.\n' } }, 2],
  ['bad Bash redirect', { tool_name: 'Bash', tool_input: { command: `echo hi > ${target}` } }, 2],
  ['unrelated Bash', { tool_name: 'Bash', tool_input: { command: 'ls reference/cs2' } }, 0],
  ['read-only check with 2>&1', { tool_name: 'Bash', tool_input: { command: 'node reference/cs2/check-copy.mjs reference/cs2/copy/section-2.md 2>&1 | tail -1' } }, 0],
  ['bad tee append', { tool_name: 'Bash', tool_input: { command: 'echo hi | tee -a reference/cs2/copy/section-2.md' } }, 2],
  ['bad sed -i', { tool_name: 'Bash', tool_input: { command: "sed -i '' s/a/b/ reference/cs2/copy/section-2.md" } }, 2],
  ['unrelated Write', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/draft/x.md'), content: 'Michael' } }, 0],
  ['slot plan borrowing from Haven', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/layout/section-99.md'), content: 'Section: 2\n\n| Layout piece | Slot | What goes in it | Why |\n|---|---|---|---|\n| TextAnd1Image layout 1 | Image | Haven circles | Haven has them |\n| TextAnd1Image layout 1 | Text | The claim | It leads |\n' } }, 2],
  ['slot plan before any message plan', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/layout/section-99.md'), content: 'Section: 2\n\n| Layout piece | Slot | What goes in it | Why |\n|---|---|---|---|\n| TextAnd1Image layout 1 | Image | The Action Hub screen he picks | The screen holds the evidence |\n| TextAnd1Image layout 1 | Text | The claim | It leads |\n' } }, 2],
  ['clean message plan', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Moves: cs-t01\n- Images: 1\n- Image 1: the Action Hub screen he picks | Supports: the edge is Saturday night\n' } }, 0],
  ['message plan naming a layout piece', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Moves: cs-t01\n- Images: 1\n- Image 1: the Action Hub screen he picks, TextAnd1Image layout 1 | Supports: the edge is Saturday night\n' } }, 2],
  ['bad Bash into message', { tool_name: 'Bash', tool_input: { command: 'echo hi > reference/cs2/' + 'message/section-2.md' } }, 2],
  ['message plan: move not in the index', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Moves: cs-t999\n- Images: 1\n- Image 1: the Action Hub screen he picks | Supports: the edge is Saturday night\n' } }, 2],
  ['message plan: Pathway row image', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Moves: cs-t01\n- Images: 1\n- Image 1: a row of the five Pathways with the week marked | Supports: the edge is Saturday night\n' } }, 2],
  ['message plan: no moves', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/message/section-99.md'), content: 'Section: 99\n\n## 1\n- Claim: the week is the deadline.\n- What the reader has to see: one edge at Saturday night.\n- Images: 1\n- Image 1: the Action Hub screen he picks | Supports: the edge is Saturday night\n' } }, 2],
  ['Claude writes his approvals file', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/APPROVALS.md'), content: '- Section 1 block 1: route figure\n' } }, 2],
  ['Claude appends to his approvals file', { tool_name: 'Bash', tool_input: { command: 'echo x >> reference/cs2/' + 'APPROVALS.md' } }, 2],
  ['reading his approvals file', { tool_name: 'Bash', tool_input: { command: 'cat reference/cs2/APPROVALS.md' } }, 0],
  ['Claude writes a review verdict', { tool_name: 'Write', tool_input: { file_path: path.join(root, 'reference/cs2/review/section-1.json'), content: '{"verdict":"PASS"}' } }, 2],
  ['Bash into review', { tool_name: 'Bash', tool_input: { command: 'echo x > reference/cs2/' + 'review/section-1.json' } }, 2],
  ['bad Bash into layout', { tool_name: 'Bash', tool_input: { command: 'echo hi > reference/cs2/layout/section-2.md' } }, 2],
];
let ok = true;
for (const [label, p, want] of cases) { const r = call(p); const pass = r.status === want; ok &&= pass; console.log(`${pass ? 'ok  ' : 'FAIL'} ${label} exit=${r.status} want=${want}`); }
fs.writeFileSync(target, 'Section: 2\n\n## 1\n\nEyebrow: The week\n\nHeadline: Due Saturday night.\n\nThe week is the deadline.\n');
const badEdit = call({ tool_name: 'Edit', tool_input: { file_path: target, old_string: 'The week', new_string: 'Michael said the week' } });
const goodEdit = call({ tool_name: 'Edit', tool_input: { file_path: target, old_string: 'The week', new_string: 'Each week' } });
fs.rmSync(target);
ok &&= badEdit.status === 2 && goodEdit.status === 2 && /truth review/.test(goodEdit.stderr);
console.log(`${badEdit.status === 2 ? 'ok  ' : 'FAIL'} bad Edit blocked\n${goodEdit.status === 2 && /truth review/.test(goodEdit.stderr) ? 'ok  ' : 'FAIL'} clean Edit held for its block plan's truth review`);
if (ok) console.log('copy guard discrimination passed');
process.exit(ok ? 0 : 1);
