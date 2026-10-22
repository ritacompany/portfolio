#!/usr/bin/env node
// Cheap reading for a dossier: from design chats, print only his turns that touch a flow, each with the
// assistant turn just before it (cut short) for context, and the line numbers to cite. One reader can cover
// many chats this way for a fraction of reading them whole. The output quotes the record, so save it outside
// git (~/Documents/CS2-research/).
//
//   node extract-turns.mjs "<regex of flow words>" <corpus file> [...]
//   node extract-turns.mjs "<regex>" --missing <dossier.md>     the chats check-dossier.mjs says are unread
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const ROOT = `${os.homedir()}/Code/mondai/corpus/conversations`;
const [pattern, ...rest] = process.argv.slice(2);
if (!pattern || !rest.length) { console.error('usage: extract-turns.mjs "<regex>" <corpus file ...> | --missing <dossier.md>'); process.exit(2); }
const re = new RegExp(pattern, 'i');
let files = rest;
if (rest[0] === '--missing') {
  const r = spawnSync('node', [path.join(path.dirname(new URL(import.meta.url).pathname), 'check-dossier.mjs'), rest[1]], { encoding: 'utf8' });
  files = ((r.stdout.match(/^Breadth: .*?read: (.+)$/m) || [])[1] || '').split(/,\s*/).filter(Boolean);
}
for (const f of files) {
  const lines = fs.readFileSync(path.join(ROOT, f), 'utf8').split('\n');
  const turns = [];
  lines.forEach((l, i) => { const m = l.match(/^### \[(\d+)\] (human|assistant) · (\S+)/); if (m) turns.push({ who: m[2], date: m[3].slice(0, 10), start: i }); });
  turns.forEach((t, k) => { t.end = k + 1 < turns.length ? turns[k + 1].start : lines.length; });
  const out = [];
  turns.forEach((t, k) => {
    if (t.who !== 'human') return;
    const body = lines.slice(t.start + 1, t.end);
    const prev = turns[k - 1];
    const prevBody = prev ? lines.slice(prev.start + 1, prev.end) : [];
    if (!re.test(body.join('\n')) && !re.test(prevBody.join('\n'))) return;
    if (prev) out.push(`  [assistant, L${prev.start + 2}] ${prevBody.join(' ').replace(/\s+/g, ' ').slice(0, 500)}`);
    body.forEach((l, j) => { if (l.trim()) out.push(`  L${t.start + 2 + j} his ${t.date}: ${l}`); });
  });
  console.log(`=== ${f}${out.length ? '' : ' (nothing on this flow)'}`);
  if (out.length) console.log(out.join('\n'));
}
