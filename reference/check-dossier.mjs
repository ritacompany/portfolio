#!/usr/bin/env node
// Knowledge check for a case study dossier: one product flow, built from the raw record (design chats,
// ChatGPT, Discord, Notion, CS1 evidence, the live Figma flow map). Dossiers quote the record, so they live
// outside git (~/Documents/CS2-research/dossiers/). Agreed checks, 21 Oct: depth, exact sources, breadth,
// conflicts surfaced. Meaning (is the answer right, is a conflict missed) is judged by an Opus reviewer.
//
//   node check-dossier.mjs <dossier.md>       DOSSIER_PASS or the failures
//
// Format:
//   # Dossier: <flow>
//   Flow steps: F1, F2, ...                    (ids from check-truth.mjs --ids, all named under Q1)
//   Topic: week-states                          (corpus index topic; every design chat tagged with it 20 or
//                                               more times is cited or listed under ## Chats read)
//   ## Q1 What it does | Q2 The problem it solves | Q3 Options considered | Q4 What he decided and why
//   ## Q5 How it changed | Q6 Inherited or his | Q7 Open
//   - <statement> [<source>:<file>#L<line>] "<exact words from that file>"
//   - <statement> Not in the record: ask him
//   ## Chats read                              "- <corpus file>: <what it held, or nothing new>"
//   ## Sources searched                        one "- <source>: <what it held, or nothing>" per source
//   ## Conflicts                               "- <topic>: <cite> vs <cite> | for Chadwick", or "- None found"
// Sources: corpus, chatgpt, discord, notion, cs1, figma (figma cites a frame id; its words come from the
// flow map line for that frame). Summaries (the archive, reasoning files, findings and trail notes) are
// search aids and cannot be cited, and neither can chats that were case study or portfolio writing.
// Q4 and Q6 cite his own turns only, never the assistant's.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const H = os.homedir();
const ROOTS = {
  corpus: [`${H}/Code/mondai/corpus/conversations`],
  chatgpt: [`${H}/Documents/CS2-research/chatgpt-flat`],
  discord: [`${H}/Documents/CS2-research/discord`, `${H}/Documents/CS2-research/discord-work`],
  notion: [`${H}/Documents/CS2-research/notion-exports`, `${H}/Documents/CS2-research/notion-notes`],
  cs1: [`${H}/Code/portfolio/reference/cs1`],
  figma: [`${H}/Documents/CS2-research/product-flows.md`],
};
const QS = ['Q1 What it does', 'Q2 The problem it solves', 'Q3 Options considered', 'Q4 What he decided and why', 'Q5 How it changed', 'Q6 Inherited or his', 'Q7 Open'];
const norm = s => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[*_`>]/g, '').replace(/\s+/g, ' ').trim();

const find = (src, file) => {
  for (const root of ROOTS[src]) {
    const direct = path.join(root, file);
    if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;
  }
  for (const root of ROOTS[src]) {           // nested exports: match by trailing path
    const stack = [root];
    while (stack.length) {
      const d = stack.pop();
      if (!fs.existsSync(d) || !fs.statSync(d).isDirectory()) continue;
      for (const e of fs.readdirSync(d)) {
        const f = path.join(d, e);
        if (fs.statSync(f).isDirectory()) stack.push(f);
        else if (f.endsWith(file)) return f;
      }
    }
  }
  return null;
};
// Speaker of the turn holding a position in a chat export.
const speaker = (text, at) => {
  const before = text.slice(0, at);
  const m = [...before.matchAll(/^### (?:\[\d+\] (human|assistant)|#\d+ (USER|ASSISTANT))/gm)].pop();
  return m ? (m[1] || m[2]).toLowerCase().replace('user', 'human') : null;
};

const file = process.argv[2];
if (!file || !fs.existsSync(file)) { console.error('usage: check-dossier.mjs <dossier.md>'); process.exit(2); }
const text = fs.readFileSync(file, 'utf8');
const fails = [];
const section = name => { const m = text.split(/^## /m).find(s => s.startsWith(name)); return m ? m.slice(name.length) : null; };
const bullets = s => s.split('\n').filter(l => /^- /.test(l));
const CITE = /\[(corpus|chatgpt|discord|notion|cs1|figma):([^\]#]+?)(?:#L(\d+))?\]\s*"([^"]+)"/g;
const cache = {};

const checkCite = (src, ref, excerpt, q) => {
  if (norm(excerpt).length < 20) return `excerpt under 20 characters: "${excerpt}"`;
  let f, body;
  if (src === 'figma') {
    f = ROOTS.figma[0];
    body = fs.readFileSync(f, 'utf8').split('\n').filter(l => l.includes(ref.trim())).join('\n');
    if (!body) return `frame ${ref} is not in the flow map`;
  } else {
    f = find(src, ref.trim());
    if (!f) return `${src}:${ref} not found`;
    body = cache[f] ??= fs.readFileSync(f, 'utf8');
    // Chats that were portfolio or case study writing are drafting, not the record (one is titled
    // "building a framework case study with fabricated metrics"), so they cannot back a dossier.
    if (/(case.?stud|portfolio|-cs-notes)/i.test(path.basename(f)) || /^# .*(case stud|portfolio)/im.test(body.split('\n').slice(0, 3).join('\n')))
      return `${src}:${ref} is case study or portfolio writing, not the record`;
  }
  const nb = norm(body), ne = norm(excerpt);
  const at = nb.indexOf(ne);
  if (at < 0) return `excerpt not found verbatim in ${src}:${ref}: "${excerpt.slice(0, 80)}"`;
  if ((q === 'Q4' || q === 'Q6') && (src === 'corpus' || src === 'chatgpt')) {
    const raw = body.indexOf(excerpt.trim().slice(0, 40));
    const who = speaker(body, raw >= 0 ? raw : Math.round(at * body.length / nb.length));
    if (who !== 'human') return `${q} cites the assistant's turn, not his: "${excerpt.slice(0, 60)}"`;
  }
  return null;
};

// Flow steps named under Q1
const steps = ((text.match(/^Flow steps: (.+)$/m) || [])[1] || '').split(/[,\s]+/).filter(Boolean);
if (!steps.length) fails.push('no "Flow steps:" line');

for (const q of QS) {
  const s = section(q);
  if (s === null) { fails.push(`missing section ## ${q}`); continue; }
  const bs = bullets(s);
  if (!bs.length) fails.push(`${q}: no answer`);
  for (const b of bs) {
    const cites = [...b.matchAll(CITE)];
    if (!cites.length && !/Not in the record: ask him/.test(b)) fails.push(`${q}: uncited statement: ${b.slice(0, 90)}`);
    for (const [, src, ref, , ex] of cites) { const e = checkCite(src, ref, ex, q.slice(0, 2)); if (e) fails.push(`${q}: ${e}`); }
    if (/\[(archive|reasoning|findings|trail)[:\]]/i.test(b)) fails.push(`${q}: cites a summary, not the record: ${b.slice(0, 80)}`);
  }
  if (q.startsWith('Q1')) for (const id of steps) if (!new RegExp(`\\b${id}\\b`).test(s)) fails.push(`Q1 does not name flow step ${id}`);
}

// Breadth in code: every design chat the corpus index tags heavily with this flow's topic is accounted for.
const topic = (text.match(/^Topic: ([\w-]+)$/m) || [])[1];
if (!topic) fails.push('no "Topic:" line (a topic from the corpus index, for example week-states)');
else {
  const idx = JSON.parse(fs.readFileSync(path.join(ROOTS.corpus[0], '..', 'index.json'), 'utf8'));
  const due = idx.filter(c => (c.topics[topic] || 0) >= 20 && !/(case.?stud|portfolio)/i.test(c.file + ' ' + c.name)).map(c => c.file);
  const missed = due.filter(f => !text.includes(f));
  if (missed.length) fails.push(`Breadth: ${missed.length} of ${due.length} design chats tagged ${topic} are neither cited nor under ## Chats read: ${missed.join(', ')}`);
}

const searched = section('Sources searched');
if (searched === null) fails.push('missing section ## Sources searched');
else for (const src of Object.keys(ROOTS)) if (!new RegExp(`^- ${src}: \\S`, 'm').test(searched)) fails.push(`Sources searched: no line for ${src}`);

const conflicts = section('Conflicts');
if (conflicts === null) fails.push('missing section ## Conflicts');
else for (const b of bullets(conflicts)) {
  if (/^- None found/.test(b)) continue;
  const cites = [...b.matchAll(CITE)];
  if (cites.length < 2) fails.push(`Conflicts: needs both sides cited: ${b.slice(0, 80)}`);
  for (const [, src, ref, , ex] of cites) { const e = checkCite(src, ref, ex, 'C'); if (e) fails.push(`Conflicts: ${e}`); }
}
if (conflicts !== null && !bullets(conflicts).length) fails.push('Conflicts: empty (write "- None found" if none)');

if (fails.length) { console.log(fails.join('\n')); console.log('DOSSIER_FAIL'); process.exit(1); }
console.log('DOSSIER_PASS');
