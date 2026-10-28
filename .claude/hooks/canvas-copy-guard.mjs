#!/usr/bin/env node
// PreToolUse guard for the CS2 canvas. Publishing .cs2-canvas/cs2-canvas.html carries the version copy
// Chadwick reads, and that file is outside reference/cs2/copy, so cs2-copy-guard never sees it.
// This pulls the version text out of the page, runs check-copy.mjs --fragments on it (dashes, Oxford
// commas, quotes, AI vocabulary, named colleagues) and refuses the publish (exit 2) with the reasons.
// It cannot judge voice, so the no-ai-slop pass still has to be run; it only enforces what a script can.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

let payload;
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
const { tool_name: tool, tool_input: input = {} } = payload;
if (tool !== 'Artifact') process.exit(0);
const file = input.file_path;
if (!file || !/cs2-canvas\.html$/.test(file) || input.asset || (input.action && input.action !== 'publish')) process.exit(0);
const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
const page = path.isAbsolute(file) ? file : path.join(root, file);
if (!fs.existsSync(page)) process.exit(0);

const html = fs.readFileSync(page, 'utf8');
const unescape = s => s.replace(/<[^>]+>/g, '').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
const pieces = [];
for (const m of html.matchAll(/<p class="(?:eb|hl|tx|nl|nt)"[^>]*>([\s\S]*?)<\/p>/g)) {
  const t = unescape(m[1]);
  if (t && !/^Sources?:/.test(t)) pieces.push(t); // a sources line sits at the bottom of a block and names years on purpose
}
if (!pieces.length) process.exit(0);

const tmp = path.join(os.tmpdir(), `canvas-copy-${process.pid}.txt`);
fs.writeFileSync(tmp, pieces.join('\n') + '\n');
const checker = path.join(root, 'reference/cs2/check-copy.mjs');
const r = spawnSync('node', [checker, tmp, '--fragments'], { encoding: 'utf8' });
fs.rmSync(tmp, { force: true });
if (r.status === 0) process.exit(0);
const out = (r.stdout || '') + (r.stderr || '');
const lines = out.split('\n').filter(l => /line (\d+):/.test(l)).map(l => {
  const n = Number(l.match(/line (\d+):/)[1]);
  return `${l.trim()}  <-  "${(pieces[n - 1] || '').slice(0, 70)}"`;
});
console.error(`Canvas copy failed check-copy (publish refused). Fix the text in .cs2-canvas/template.html, run the no-ai-slop pass, then publish again:\n${(lines.length ? lines : [out.trim()]).join('\n')}`);
process.exit(2);
