#!/usr/bin/env node
// Stop hook: CS2 work that is not on GitHub main is invisible to every other session and to his second
// account (29 Oct: twelve commits sat in one worktree and the other account picked up three days back).
// Blocks the stop while CS2 files are uncommitted or commits are not yet on origin/main.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
let payload = {};
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch {}
if (payload.stop_hook_active) process.exit(0);
const run = c => { try { return execSync(c, { cwd: payload.cwd || process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return null; } };
const dirty = run('git status --porcelain -- reference/cs2 .cs2-canvas/template.html');
if (dirty === null) process.exit(0);
run('git fetch -q origin main');
const ahead = run('git rev-list --count origin/main..HEAD') || '0';
const cs2Ahead = Number(ahead) > 0 && run('git diff --name-only origin/main...HEAD -- reference/cs2 .cs2-canvas') ;
if (dirty || cs2Ahead) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason: 'CS2 work is not on GitHub main yet' + (dirty ? ' (uncommitted files in reference/cs2 or the canvas template)' : '') + (cs2Ahead ? ' (commits not pushed)' : '') + '. Commit and push to main, as WORKING_LOOP.md Saving says, so the other account can pick up.' }));
}
process.exit(0);
