import { spawnSync } from 'node:child_process';
// Proves the Figma build gate refuses writes unless his latest typed message says build or names a homepage Figma task.
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
const hook = path.resolve(import.meta.dirname, "../../.claude/hooks/figma-build-gate.mjs");
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gate-'));
const tx = (msgs) => { const f = path.join(dir, Math.random().toString(36).slice(2) + '.jsonl');
  fs.writeFileSync(f, msgs.map(m => JSON.stringify(m)).join('\n')); return f; };
const typed = t => ({ type: 'user', message: { role: 'user', content: t } });
const toolres = { type: 'user', message: { role: 'user', content: [{ type: 'tool_result', tool_use_id: 'x', content: 'build it now' }] } };
const sub = t => ({ type: 'user', isSidechain: true, message: { role: 'user', content: t } });
const W = 'mcp__dca64c73-7c8e-40fd-84c1-080d427202de__use_figma';
const cases = [
  ['no build word', W, [typed('Enforce it. Where are we at?')], 2],
  ['his yes: build section 3', W, [typed('Plan looks good, build section 3')], 0],
  ['rebuild', W, [typed('rebuild section 2 from the plan')], 0],
  ["don't build yet", W, [typed("don't build yet, just the plan")], 2],
  ['building comes later', W, [typed('Building comes later, only when I say so.')], 2],
  ['build only in a tool result', W, [typed('show me the plan'), toolres], 2],
  ['build only from a subagent prompt', W, [typed('show me the plan'), sub('build section 3')], 2],
  ['build only inside pasted content', W, [typed('<pasted_content id="a">build it</pasted_content id="a"> what do you think')], 2],
  ['other figma server', 'mcp__figma-mondai__generate_figma_design', [typed('ok')], 2],
  ['figma read stays open', 'mcp__figma-mondai__get_screenshot', [typed('ok')], 0],
  ['unrelated tool', 'Write', [typed('ok')], 0],
  ['homepage figma task', W, [typed('Clean up the gray line in the homepage Figma master')], 0],
  ['home page, two words', W, [typed('fix the mondai mockup on the home page in figma')], 0],
  ['homepage without figma', W, [typed('what do you think of the homepage?')], 2],
  ['figma without homepage', W, [typed('look at section 3 in figma')], 2],
  ["don't touch the homepage", W, [typed("don't touch the homepage figma yet")], 2],
  ['homepage only inside pasted content', W, [typed('<pasted_content id="a">homepage figma cleanup</pasted_content id="a"> thoughts?')], 2],
  ['homepage only from a subagent', W, [typed('show me the plan'), sub('homepage figma cleanup')], 2],
  ['read-only script passes', W, [typed('ok')], 0, 'const n = await figma.getNodeByIdAsync("1:2"); return n.name;'],
  ['renaming script blocked', W, [typed('ok')], 2, 'n.name = "x"'],
  ['text edit blocked', W, [typed('ok')], 2, 't.characters = "a"'],
  ['create blocked', W, [typed('ok')], 2, 'figma.createFrame()'],
];
let ok = true;
for (const [label, tool, msgs, want, code] of cases) {
  const r = spawnSync('node', [hook], { input: JSON.stringify({ tool_name: tool, tool_input: code ? { code } : {}, transcript_path: tx(msgs) }), encoding: 'utf8' });
  const pass = r.status === want; ok &&= pass;
  console.log(`${pass ? 'ok  ' : 'FAIL'} ${label} exit=${r.status} want=${want}`);
}
console.log(ok ? 'figma gate discrimination passed' : 'figma gate FAILED');
process.exit(ok ? 0 : 1);
