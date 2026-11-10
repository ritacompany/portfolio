#!/usr/bin/env node
// Proves the Haven work is committed and pushed: no uncommitted change under reference/haven or site/haven, and
// main equals origin/main after a fetch. Control: a planted untracked file under reference/haven must fail it.
// Usage: node pushed-check.mjs   Prints PUSHED_OK.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const git = a => spawnSync('git', a, { cwd: root, encoding: 'utf8' });
const dirty = () => git(['status', '--porcelain', '--', 'reference/haven', 'site/haven']).stdout.trim();
const plant = path.join(root, 'reference/haven/.planted-control');
fs.writeFileSync(plant, 'x'); const caught = dirty().includes('.planted-control'); fs.unlinkSync(plant);
const fails = [];
if (!caught) fails.push('control: planted file not seen'); else console.log('ok  control: planted untracked file caught');
if (dirty()) fails.push('uncommitted: ' + dirty());
git(['fetch', 'origin', 'main']);
const a = git(['rev-parse', 'HEAD']).stdout.trim(), b = git(['rev-parse', 'origin/main']).stdout.trim();
if (a !== b) fails.push(`HEAD ${a.slice(0, 7)} is not origin/main ${b.slice(0, 7)}`);
if (!fs.readFileSync(path.join(root, 'reference/haven/HANDOFF.md'), 'utf8').includes('## Next action')) fails.push('HANDOFF has no next action');
if (fails.length) { console.log('FAILED: ' + fails.join('; ')); process.exit(1); }
console.log('PUSHED_OK');
