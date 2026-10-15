#!/usr/bin/env node
// Checks that TRACKER.md is an ordered plan, not a flat list.
// Every inventory row (H, F, C, S ids) needs a Stage number and a Waits on cell.
// Waits on is "nothing" or a list of ids; each id must exist and sit in an earlier stage.
// Prints "tracker order OK" and exits 0, or lists every failure and exits 1.
import fs from 'node:fs';

const file = process.argv[2] || 'TRACKER.md';
const lines = fs.readFileSync(file, 'utf8').split('\n');
const rows = new Map();
const fails = [];
let header = null;

for (const line of lines) {
  if (!line.startsWith('|')) { header = null; continue; }
  const cells = line.split('|').slice(1, -1).map(c => c.trim());
  if (cells[0] === '#') { header = cells.map(c => c.toLowerCase()); continue; }
  if (!header || /^-+$/.test(cells[0])) continue;
  const id = cells[0];
  if (!/^[HFCS]\d+[a-z]?$/.test(id)) continue;
  const stage = header.indexOf('stage');
  const waits = header.indexOf('waits on');
  if (stage < 0 || waits < 0) { fails.push(`${id}: table has no Stage or Waits on column`); continue; }
  const n = Number(cells[stage]);
  const deps = cells[waits];
  if (!Number.isInteger(n)) fails.push(`${id}: Stage "${cells[stage]}" is not a number`);
  if (!deps) fails.push(`${id}: Waits on is empty`);
  rows.set(id, { n, deps: deps && deps.toLowerCase() !== 'nothing' ? deps.match(/\b[HFCSD]\d+[a-z]?\b/g) || [] : [] });
}

if (rows.size === 0) fails.push('no inventory rows found');
for (const [id, { n, deps }] of rows) {
  for (const d of deps) {
    if (d.startsWith('D')) continue; // decisions are listed separately
    const dep = rows.get(d);
    if (!dep) fails.push(`${id}: waits on ${d}, which is not in the tracker`);
    else if (!(dep.n < n)) fails.push(`${id} (stage ${n}) waits on ${d} (stage ${dep.n}), which is not earlier`);
  }
}

if (fails.length) { console.log(fails.join('\n')); console.log(`tracker order FAILED (${fails.length})`); process.exit(1); }
console.log(`tracker order OK (${rows.size} rows)`);
