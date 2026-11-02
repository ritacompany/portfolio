#!/usr/bin/env node
// Stop hook (2 Nov, his ask): every work turn loads the unlazy skill. A turn that used tools to change
// or produce something (edits, shell, publishing, Figma writes, sub-agents) cannot end without a Skill
// call for unlazy after his latest message. Quick answers with no work tools pass.
import fs from 'node:fs';
let p = {}; try { p = JSON.parse(fs.readFileSync(0, 'utf8')); } catch {}
if (p.stop_hook_active || !p.transcript_path || !fs.existsSync(p.transcript_path)) process.exit(0);
const rows = fs.readFileSync(p.transcript_path, 'utf8').trim().split('\n').map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
let start = 0;
for (let i = rows.length - 1; i >= 0; i--) {
  const e = rows[i]; if (e.type !== 'user' || e.isSidechain || e.isMeta) continue;
  const c = e.message && e.message.content;
  const t = typeof c === 'string' ? c : Array.isArray(c) && c.some(x => x.type === 'text') ? c.filter(x => x.type === 'text').map(x => x.text).join(' ') : '';
  if (t && !/^Base directory for this skill/.test(t)) { start = i; break; }
}
const WORK = /^(Edit|Write|NotebookEdit|Bash|Artifact|Agent|Workflow)$|use_figma$|generate_figma_design$/;
let work = false, loaded = false;
for (const e of rows.slice(start)) {
  if (e.type !== 'assistant') continue;
  for (const x of (e.message && e.message.content) || []) {
    if (x.type !== 'tool_use') continue;
    if (x.name === 'Skill' && /unlazy/.test((x.input && x.input.skill) || '')) loaded = true;
    else if (WORK.test(x.name)) work = true;
  }
}
if (work && !loaded) process.stdout.write(JSON.stringify({ decision: 'block', reason: 'This turn did work without loading the unlazy skill. Load it (Skill unlazy), check the work against it, then finish.' }));
process.exit(0);
