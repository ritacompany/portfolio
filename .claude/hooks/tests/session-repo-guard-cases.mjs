// Planted cases for session-repo-guard.mjs: run with node, prints SESSION-GUARD-PASS when every case behaves.
import { spawnSync } from 'node:child_process';
const hook = new URL('../session-repo-guard.mjs', import.meta.url).pathname;
const cases = [
  ['no source', {tool_name:'mcp__claude-code-remote__create_session',tool_input:{prompt:'check links'}}, 2],
  ['blank source', {tool_name:'mcp__claude-code-remote__create_session',tool_input:{source_url:'  '}}, 2],
  ['portfolio source', {tool_name:'mcp__claude-code-remote__create_session',tool_input:{source_url:'https://github.com/ritacompany/portfolio'}}, 0],
  ['other tool', {tool_name:'Bash',tool_input:{command:'ls'}}, 0],
];
let bad = 0;
for (const [n, inp, want] of cases) {
  const r = spawnSync('node', [hook], { input: JSON.stringify(inp) });
  if (r.status !== want) { bad++; console.log(`FAIL ${n}: exit ${r.status}, wanted ${want}`); }
}
console.log(bad ? 'SESSION-GUARD-FAIL' : 'SESSION-GUARD-PASS'); process.exit(bad ? 1 : 0);
