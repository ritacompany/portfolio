#!/usr/bin/env node
// Keeps Figma calls pointed at where designs are now (reference/figma-locations.json), because Chadwick
// moves files between his two Figma accounts and every hardcoded pointer went stale (3 Nov, 20 Nov).
//   pre  (PreToolUse, mcp__.*): a Figma call on a frame the registry marks stale, or on a file it does not
//        know, gets the current location added to the session's context. Never blocks.
//   stop (Stop): a reply that tells him Figma is blocked, rate limited or a frame is missing is held back
//        while any file in the registry was never tried this session, with the list to try. Lets the reply
//        through after two holds in a row so it cannot wedge a session.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const mode = process.argv[2];
let payload;
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
const root = process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
let reg;
try { reg = JSON.parse(fs.readFileSync(path.join(root, 'reference/figma-locations.json'), 'utf8')); } catch { process.exit(0); }

const fileName = k => (reg.files.find(f => f.key === k) || {}).name || k;
const where = d => `${fileName(d.file)} (${d.file}), page ${d.page.name} ${d.page.id}, frame "${d.frame.name}" ${d.frame.id}`;
const nodeRe = id => new RegExp(`(^|[^\\d])${id.replace(':', '[:-]')}($|[^\\d])`);

if (mode === 'pre') {
  const input = payload.tool_input || {};
  const key = input.fileKey;
  if (!key) process.exit(0);
  const notes = [];
  const text = `${input.nodeId || ''} ${input.code || ''}`;
  for (const s of reg.stale || []) {
    if (s.file !== key || !nodeRe(s.node).test(text)) continue;
    const d = reg.designs.find(x => x.id === s.design);
    notes.push(`${s.node} in ${fileName(key)} is marked stale for ${s.design} (${s.why}). Current location: ${d ? where(d) : 'see the registry'}.`);
  }
  if (!reg.files.some(f => f.key === key))
    notes.push(`File ${key} is not in reference/figma-locations.json. If a live design is here now, add the file and update the design entry with today's date.`);
  if (!notes.length) process.exit(0);
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: `Figma locations: ${notes.join(' ')}` } }));
  process.exit(0);
}

if (mode === 'stop') {
  const entries = [];
  try {
    for (const l of fs.readFileSync(payload.transcript_path, 'utf8').trim().split('\n')) { try { entries.push(JSON.parse(l)); } catch {} }
  } catch {}
  let last = payload.last_assistant_message || '';
  const tried = new Set();
  for (const e of entries) {
    if (e.type !== 'assistant' || e.isSidechain) continue;
    const c = e.message?.content;
    if (!Array.isArray(c)) continue;
    for (const b of c) if (b.type === 'tool_use' && b.input?.fileKey) tried.add(b.input.fileKey);
    const t = c.filter(b => b.type === 'text').map(b => b.text).join('\n');
    if (t.trim() && !payload.last_assistant_message) last = t;
  }
  const FAIL = String.raw`(blocked|rate[ -]?limit\w*|call limit|view seat|no access|not accessible|can(?:no|')t (?:read|open|access|reach|find|see)|unable to (?:read|open|access|reach|find)|missing|not found|(?:does not|doesn't) exist|reconnect\w*)`;
  const CLAIM = new RegExp(String.raw`\b(figma|frame)\b[^.\n]{0,120}\b${FAIL}|\b${FAIL}\b[^.\n]{0,80}\bfigma\b`, 'i');
  if (!CLAIM.test(last)) process.exit(0);
  const untried = reg.files.filter(f => !tried.has(f.key));
  const state = path.join(os.tmpdir(), `figma-location-${(payload.session_id || 'x').replace(/[^\w-]/g, '')}.json`);
  let holds = 0;
  try { holds = JSON.parse(fs.readFileSync(state, 'utf8')).holds || 0; } catch {}
  if (!untried.length || holds >= 2) { try { fs.rmSync(state); } catch {} process.exit(0); }
  fs.writeFileSync(state, JSON.stringify({ holds: holds + 1 }));
  const live = reg.designs.map(d => `"${d.frame.name}" (${d.id}, registry says ${where(d)})`).join('; ');
  console.log(JSON.stringify({
    decision: 'block',
    reason: `This reply tells Chadwick something in Figma is blocked or missing, but these known files were never tried this session: ${untried.map(f => `${f.name} ${f.key} (${f.access})`).join('; ')}. `
      + `A failure on one file is not Figma being blocked. Search each untried file by frame name (${live}) with a read only call. `
      + `If you find it, update reference/figma-locations.json (file, page, frame id, verified today) and carry on. Tell him something is blocked only after every known file was tried, and say which ones.`,
  }));
  process.exit(0);
}
