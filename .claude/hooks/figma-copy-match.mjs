#!/usr/bin/env node
// PreToolUse check for Figma writes to the CS2 case study frames. The copy guard only protects the copy
// files; this makes sure the text that reaches Figma is that copy. A write is a CS2 write when its code
// names a frame id listed in CS2_PROCESS.md or a frame named "Mondai CS". Then every text string in the
// code is checked against the copy rules (check-copy.mjs --fragments), and every string of four or more
// words must appear in a copy file (reference/cs2/copy/) or a layout plan (reference/cs2/layout/), where
// figure text is written. Anything else is refused (exit 2) with the strings at fault. Not a CS2 write: exit 0.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let payload;
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
if (!/__use_figma$/.test(payload.tool_name || '')) process.exit(0);
const code = String((payload.tool_input || {}).code || '');
const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
const cs2 = path.join(root, 'reference/cs2');

const processDoc = fs.existsSync(path.join(cs2, 'CS2_PROCESS.md')) ? fs.readFileSync(path.join(cs2, 'CS2_PROCESS.md'), 'utf8') : '';
const ids = new Set(processDoc.match(/\b\d{4}:\d{4}\b/g) || []);
const targetsCs2 = /Mondai CS/.test(code) || [...ids].some(id => code.includes(id));
if (!targetsCs2) process.exit(0);

const norm = s => s.replace(/\\n/g, ' ').replace(/\\(['"`\\])/g, '$1').replace(/\\u2019|[‘’]/g, "'")
  .replace(/\s+/g, ' ').trim().toLowerCase();

// String literals in the code, minus layer names, fonts and anything that is not prose.
const strings = [];
for (const m of code.matchAll(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g)) {
  const before = code.slice(Math.max(0, m.index - 30), m.index);
  if (/\b(name|family|style|fontName|type|layoutMode|textAutoResize)\s*[:=]\s*$/.test(before)) continue;
  for (const part of m[2].split(/\$\{[^}]*\}/)) {
    const s = part.replace(/\\n/g, ' ').trim();
    if (!/[a-z]/i.test(s) || s.includes('·') || /^[\w.-]+$/.test(s) || /[{};=<>]|=>/.test(s)) continue;
    if (s.split(/\s+/).length >= 2) strings.push(s);
  }
}
if (!strings.length) process.exit(0);

const sources = ['copy', 'layout'].flatMap(d => {
  const dir = path.join(cs2, d);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => norm(fs.readFileSync(path.join(dir, f), 'utf8'))) : [];
});
const problems = [];
for (const s of strings)
  if (s.split(/\s+/).length >= 4 && !sources.some(src => src.includes(norm(s))))
    problems.push(`not in any copy file or layout plan: "${s.slice(0, 80)}"`);

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'figmacopy-')), 'strings.md');
fs.writeFileSync(tmp, strings.join('\n') + '\n');
const r = spawnSync('node', [path.join(cs2, 'check-copy.mjs'), tmp, '--fragments'], { encoding: 'utf8' });
fs.rmSync(path.dirname(tmp), { recursive: true, force: true });
if (r.status !== 0) problems.push(...(r.stdout || r.stderr).split('\n').slice(1).filter(Boolean).map(l => l.trim()));

if (!problems.length) process.exit(0);
console.error(`Blocked: text for the CS2 Figma frames has to come from reference/cs2/copy or the layout plan and pass the copy rules. Fix the copy file first, then build from it.\n${problems.map(p => '  ' + p).join('\n')}`);
process.exit(2);
