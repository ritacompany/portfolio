// Cases for cs2-cost-guard.mjs pre mode (reader-check agent limit). Run: node .claude/hooks/tests/cost-guard-cases.mjs
// Prints COST_GUARD_CASES_PASS when every case gets the expected allow or deny.
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import { spawnSync } from 'node:child_process';
const hook = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'cs2-cost-guard.mjs');
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cg-'));
const user = t => ({ type: 'user', message: { content: t } });
const tool = (name, input, id) => ({ type: 'assistant', message: { content: [{ type: 'tool_use', name, input, id }] } });
const agents = (n, from = 0) => Array.from({ length: n }, (_, i) => tool('Agent', { model: 'sonnet' }, 'a' + (from + i)));
const agg = tool('Bash', { command: 'python3 -I aggregate.py r/run1.txt r/run2.txt r/run3.txt' }, 'b1');
const run = rows => {
  const f = path.join(dir, Math.random() + '.jsonl'); fs.writeFileSync(f, rows.map(r => JSON.stringify(r)).join('\n'));
  const r = spawnSync('node', [hook, 'pre'], { input: JSON.stringify({ transcript_path: f, tool_name: 'Agent', tool_input: { model: 'sonnet' }, tool_use_id: 'new' }), encoding: 'utf8' });
  return /"deny"/.test(r.stdout) ? 'deny' : 'allow';
};
const cases = [
  ['first round allowed', [user('do the pass'), ...agents(2)], 'allow'],
  ['fourth agent with no check combined yet is denied', [user('do the pass'), ...agents(3)], 'deny'],
  ['re-check round after a combined check is allowed', [user('do the pass'), ...agents(3), agg], 'allow'],
  ['sixth agent of the re-check round is allowed', [user('do the pass'), ...agents(3), agg, ...agents(2, 3)], 'allow'],
  ['third round is denied', [user('do the pass'), ...agents(3), agg, ...agents(3, 3), agg], 'deny'],
  ['his re-run ask still opens a third round', [user('please re-run the check'), ...agents(6), agg], 'allow'],
];
let bad = 0;
for (const [name, rows, want] of cases) { const got = run(rows); console.log((got === want ? 'ok   ' : 'FAIL ') + name + ' (' + got + ')'); if (got !== want) bad++; }
console.log(bad ? 'COST_GUARD_CASES_FAIL' : 'COST_GUARD_CASES_PASS');
