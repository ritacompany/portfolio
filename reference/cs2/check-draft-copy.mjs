#!/usr/bin/env node
// Runs check-copy.mjs on page copy held inside a draft file, between <!-- copy:N --> and <!-- end copy:N -->.
// Drafts like draft/CS2-voice-pass-22oct.md carry copy that is not yet in copy/, so the copy guard never
// sees it; this holds it to the same rules. Used by the CS2 checks workflow and by hand.
// Usage: node check-draft-copy.mjs <draft.md> [...]   or   node check-draft-copy.mjs --selftest
// Prints DRAFT_COPY_PASS and exits 0, or lists every failure and exits 1. A file with no copy blocks is skipped.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const checker = path.join(import.meta.dirname, 'check-copy.mjs');

export function checkDraft(raw) {
  const problems = [];
  let blocks = 0;
  for (const m of raw.matchAll(/<!-- copy:(\d+) -->\n([\s\S]*?)<!-- end copy:\1 -->/g)) {
    blocks++;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'draftcopy-'));
    const f = path.join(dir, `section-${m[1]}.md`);
    fs.writeFileSync(f, m[2]);
    const r = spawnSync('node', [checker, f], { encoding: 'utf8' });
    fs.rmSync(dir, { recursive: true, force: true });
    if (r.status !== 0) problems.push(`section ${m[1]}:\n${(r.stdout + r.stderr).trim()}`);
  }
  return { blocks, problems };
}

const args = process.argv.slice(2);
if (args[0] === '--selftest') {
  const block = body => `<!-- copy:7 -->\nSection: 7\n\n## Block 1\n\nEyebrow: Home base\n\nHeadline: The Action Hub keeps the person on this week, with the Pathway target and pace beside it as the anchor.\n\n${body}\n<!-- end copy:7 -->\n`;
  const clean = checkDraft(block('The list view shows this week.')).problems.length === 0;
  const dash = checkDraft(block('The list view shows this week — and more.')).problems.length === 1;
  const name = checkDraft(block('Michael wanted the list view.')).problems.length === 1;
  if (clean && dash && name) { console.log('DRAFT_COPY_SELFTEST_PASS'); process.exit(0); }
  console.log(`clean ${clean} dash caught ${dash} name caught ${name}`);
  process.exit(1);
}
if (!args.length) { console.error('usage: check-draft-copy.mjs <draft.md> [...] | --selftest'); process.exit(2); }
let failed = false;
for (const file of args) {
  const { blocks, problems } = checkDraft(fs.readFileSync(file, 'utf8'));
  if (!blocks) continue;
  if (problems.length) { failed = true; console.log(`${file}\n${problems.join('\n')}`); }
}
if (failed) process.exit(1);
console.log('DRAFT_COPY_PASS');
