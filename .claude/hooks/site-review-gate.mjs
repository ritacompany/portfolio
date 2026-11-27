#!/usr/bin/env node
// PreToolUse block for the website (his yes, 9 Nov 2026, after Phase 3 was built without him).
// The review loop in docs/SITE_BUILD_PLAN.md: propose on the preview link, build only after his yes, he
// tries it on the preview link, notes, and only his yes closes a piece. This hook holds step 2: a change to
// the shipped site is refused unless Chadwick approved it.
//
// Gated paths: everything under site/ except site/dev/ and site/motion-lab/ (where proposals are made
// for him to look at), plus scripts/framework-page/ (it writes site/mondai/framework/index.html).
// Approved means one of:
//   - his latest typed message, or one of the two before it while the latest does not say stop,
//     approves: starts with yes, yeah, yep, go, approved, do it, looks good or ship it, or says
//     "go ahead", "approved", "build it" or "make the change(s)";
//   - his latest answer to a question card that carries the tag [site change] starts with Yes,
//     Approve or Build.
// Reads stay open. Refusals exit 2 with the reason, which sends the session back to him.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const STOP = /\b(stop|wait|hold on|hold off|pause|don'?t (do|change|touch|build|ship)|do not (do|change|touch|build|ship))\b/i;
const APPROVE_START = /^\s*(yes|yeah|yep|yup|go|approved?|do it|looks good|ship it)\b/i;
const APPROVE_ANY = /\b(go ahead|approved|build it|make (the|those|these) changes?)\b/i;
const CARD_TAG = /\[site change\]/i;
const CARD_YES = /^\s*(yes|approve|build)\b/i;

const clean = (t) => t
  .replace(/<pasted_content[\s\S]*?<\/pasted_content[^>]*>/g, '')
  .replace(/<system-reminder[\s\S]*?<\/system-reminder[^>]*>/g, '')
  .replace(/<task-notification[\s\S]*?<\/task-notification[^>]*>/g, '');

function gatedPath(p, root) {
  if (!p) return false;
  const rel = path.relative(root, path.resolve(root, p)).split(path.sep).join('/');
  if (rel.startsWith('..')) return false;
  if (rel.startsWith('scripts/framework-page/')) return true;
  if (!rel.startsWith('site/')) return false;
  return !/^site\/(dev|motion-lab)\//.test(rel);
}

// A shell command changes the site when a gated path is the target of a write, not merely mentioned
// (a command that writes docs/ while its text mentions site/ stays open).
const G = String.raw`(?:\./)?(?:site/(?!dev/|motion-lab/)|scripts/framework-page/)`;
const BASH_WRITES = [
  new RegExp(String.raw`python3?\s+\S*scripts/framework-page/build\.py`),
  new RegExp(String.raw`>>?\s*['"]?${G}`),
  new RegExp(String.raw`\btee\s+(?:-a\s+)?['"]?${G}`),
  new RegExp(String.raw`\b(?:sed\s+-i|perl\s+-p?i)\b[^|;&\n]*\s['"]?${G}`),
  new RegExp(String.raw`\b(?:cp|mv|rm|touch|mkdir|ln|rsync)\b[^|;&\n]*\s['"]?${G}`),
  new RegExp(String.raw`\bgit\s+(?:checkout|restore|apply)\b[^|;&\n]*\s['"]?${G}`),
  // A script that writes files and names a gated file as a string literal, like open('site/css/x.css', 'w').
  new RegExp(String.raw`(?=[\s\S]*(?:writeFile|open\([^)]*,\s*['"][wa]|\.write_text\())[\s\S]*['"]${G}[\w.\-/@]*\.\w+['"]`),
];
function bashWritesSite(cmd) {
  return !!cmd && BASH_WRITES.some((r) => r.test(cmd));
}

function entries(file) {
  if (!file || !fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').trim().split('\n').map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
}
function textOf(c) {
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) return c.filter((x) => x.type === 'text').map((x) => x.text).join('\n');
  return '';
}

export function approved(transcript) {
  const all = entries(transcript).filter((e) => e.type === 'user' && !e.isSidechain && !e.isMeta);
  const typed = [];
  let lastCard = null, lastCardIdx = -1, lastTypedIdx = -1;
  all.forEach((e, i) => {
    const c = e.message && e.message.content;
    if (Array.isArray(c)) {
      for (const x of c) {
        if (x.type !== 'tool_result') continue;
        const t = typeof x.content === 'string' ? x.content : textOf(x.content);
        if (/Your questions have been answered/.test(t)) { lastCard = t; lastCardIdx = i; }
      }
    }
    const t = textOf(c);
    if (t && !/^Base directory for this skill/.test(t)) { typed.push(clean(t)); lastTypedIdx = i; }
  });
  const recent = typed.slice(-3);
  const last = recent[recent.length - 1] || '';
  if (lastCard && lastCardIdx > lastTypedIdx && CARD_TAG.test(lastCard)) {
    const m = lastCard.match(/"=\s*"([^"]*)"/);
    if (m && CARD_YES.test(m[1])) return true;
  }
  if (STOP.test(last)) return false;
  return recent.some((t) => !STOP.test(t) && (APPROVE_START.test(t) || APPROVE_ANY.test(t)));
}

// Motion goes clip first (his words, 26 Nov 2026: "you show a video, and then if I like it enough, then
// I'll have you build it so I can feel it"). The 26 Nov page fade went into site/ on a yes to a written
// plan, with no clip (fixes/2026-11-26-page-fade-built-before-clip.md). So a change to a site .css or .js
// file that a motion piece names in docs/motion/<piece>/style_guide.md, or a change that adds motion to
// any site file, is refused until that piece's review_log.md passes scripts/motion-check.mjs log. His yes
// does not lift this: the clip is what he says yes to.
const MOTION_ADDED = /@keyframes|view-transition|\.animate\(|\bgsap\.(?:to|from|fromTo|timeline)\b/;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const MOTION_CHECK = path.resolve(HERE, '../../scripts/motion-check.mjs');
function relOf(p, root) { return path.relative(root, path.resolve(root, p)).split(path.sep).join('/'); }
export function motionPieces(root) {
  const base = path.join(root, 'docs/motion');
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base).filter((d) => fs.existsSync(path.join(base, d, 'style_guide.md'))).map((d) => {
    const guide = fs.readFileSync(path.join(base, d, 'style_guide.md'), 'utf8');
    const files = new Set((guide.match(/site\/[\w.\-/@]+\.(?:css|js)\b/g) || []).filter((f) => gatedPath(f, root)));
    return { piece: d, files, log: path.join(base, d, 'review_log.md') };
  });
}
function logPasses(log, root) {
  if (!fs.existsSync(log)) return false;
  const r = spawnSync(process.execPath, [MOTION_CHECK, 'log', log], { cwd: root, encoding: 'utf8' });
  return r.status === 0;
}
function addedText(tool, input) {
  if (tool === 'Write') return input.content || '';
  if (tool === 'Edit') return input.new_string || '';
  if (tool === 'MultiEdit') return (input.edits || []).map((e) => e.new_string || '').join('\n');
  return '';
}
// Returns a refusal reason, or '' when the change may go ahead.
export function motionBlock(tool, input, root) {
  const pieces = motionPieces(root);
  let named = [];
  let addsMotion = false;
  let rel = '';
  if (/^(Write|Edit|MultiEdit)$/.test(tool)) {
    rel = relOf(input.file_path || '', root);
    named = pieces.filter((p) => p.files.has(rel));
    addsMotion = /\.(css|js|mjs|html)$/.test(rel) && MOTION_ADDED.test(addedText(tool, input));
  } else if (tool === 'Bash') {
    const cmd = input.command || '';
    named = pieces.filter((p) => [...p.files].some((f) => cmd.includes(f)));
    rel = named.length ? [...named[0].files].find((f) => cmd.includes(f)) : '';
  }
  const open = named.filter((p) => !logPasses(p.log, root));
  if (open.length) return `Blocked: motion goes clip first. ${rel} belongs to the motion piece ${open.map((p) => p.piece).join(', ')}, and its review_log.md does not pass (node scripts/motion-check.mjs log docs/motion/${open[0].piece}/review_log.md). Make the clip first: a seek(t) render, or for motion on the browser clock (page changes, entrances) a real browser recording with scripts/record-browser.mjs. Review it (motion-rules.md, Review loop), show him the clip, and build into site/ only after he says yes to the clip.`;
  if (addsMotion && !named.length) return `Blocked: motion goes clip first. This change adds motion to ${rel}, and no motion piece names that file. Start docs/motion/<piece>/ (style_guide.md naming ${rel}, state_list.md), make and review the clip, show him the clip, and build into site/ only after he says yes to it.`;
  return '';
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  let payload;
  try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
  const root = payload.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const input = payload.tool_input || {};
  const tool = payload.tool_name || '';
  let touches = false;
  if (/^(Write|Edit|MultiEdit|NotebookEdit)$/.test(tool)) touches = gatedPath(input.file_path || input.notebook_path, root);
  else if (tool === 'Bash') touches = bashWritesSite(input.command);
  if (!touches) process.exit(0);
  const why = motionBlock(tool, input, root);
  if (why) { console.error(why); process.exit(2); }
  if (approved(payload.transcript_path)) process.exit(0);
  console.error('Blocked by the site review loop: Chadwick has not approved a change to the site in his recent messages, or his latest says to stop. Step 1 of the loop (docs/SITE_BUILD_PLAN.md, Review loop): tell him in plain words what you want to change and why, put a working version in site/motion-lab or site/dev on the preview link for him to try, and ask. If you ask with a question card, put [site change] in the question and start the approving option with Yes. Do not build until he says yes.');
  process.exit(2);
}
