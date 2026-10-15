// Proves the Figma copy match hook refuses CS2 Figma text that is not the copy, or breaks the copy rules,
// and leaves real copy, layer names, fonts and non CS2 writes alone.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const hook = path.join(root, '.claude/hooks/figma-copy-match.mjs');
const call = code => spawnSync('node', [hook], {
  input: JSON.stringify({ tool_name: 'mcp__figma-mondai__use_figma', tool_input: { code } }),
  encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: root },
});

// A real sentence of four or more words from the section 2 copy file.
const copy = fs.readFileSync(path.join(root, 'reference/cs2/copy/section-2.md'), 'utf8')
  .replace(/<!--[\s\S]*?-->/g, '').split('\n')
  .filter(l => l.trim() && !/^(Section|##|Eyebrow|Headline|Card|Label|Caption):?/.test(l.trim()));
const real = copy.join(' ').split(/(?<=\.)\s+/).find(s => s.split(/\s+/).length >= 4 && !/["']/.test(s));

const frame = "const f = figma.createFrame(); f.name = 'Mondai CS · Section 2 · The week';";
const cases = [
  ['homepage write, not CS2', "const t = figma.createText(); t.characters = 'Michael wanted pressure here today';", 0],
  ['CS2 write, real copy', `${frame} const t = figma.createText(); t.characters = ${JSON.stringify(real)};`, 0],
  ['CS2 write, layer name and font', `${frame} const t = figma.createText(); t.name = 'Body text block one'; t.fontName = { family: 'Inter Display', style: 'Semi Bold' };`, 0],
  ['CS2 write, invented sentence', `${frame} const t = figma.createText(); t.characters = 'Triage dropped by seventy percent in two weeks.';`, 2],
  ['CS2 write, short name line', `${frame} const t = figma.createText(); t.characters = 'Michael wanted pressure';`, 2],
  ['CS2 write by frame id, invented', "const n = await figma.getNodeByIdAsync('4228:6731'); const t = figma.createText(); t.characters = 'The team loved the new weekly view a lot.';", 2],
  ['CS2 write, text held in a variable', `${frame} const copy = { h: 'Every team member agreed the week was right.' }; const t = figma.createText(); t.characters = copy.h;`, 2],
];
let ok = !!real;
console.log(`${real ? 'ok  ' : 'FAIL'} found a real copy sentence: ${real}`);
for (const [label, code, want] of cases) {
  const r = call(code);
  const pass = r.status === want;
  ok &&= pass;
  console.log(`${pass ? 'ok  ' : 'FAIL'} ${label} exit=${r.status} want=${want}${pass ? '' : '\n' + r.stderr}`);
}
if (ok) console.log('figma copy match discrimination passed');
process.exit(ok ? 0 : 1);
