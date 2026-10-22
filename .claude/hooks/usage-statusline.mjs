#!/usr/bin/env node
// Status line for this repo. Claude Code hands the status line the account's plan usage
// (rate_limits.five_hour and seven_day, used_percentage). Hooks never receive it, so this script is
// the one place the numbers arrive: it saves them to .claude/state/usage.json (untracked) for
// usage-checkpoint.mjs to read, then prints a short status line.
import fs from 'node:fs';
import path from 'node:path';

let d = {};
try { d = JSON.parse(fs.readFileSync(0, 'utf8')); } catch {}
const root = process.env.CLAUDE_PROJECT_DIR || d.workspace?.project_dir || d.cwd || process.cwd();
const rl = d.rate_limits || null;
const pct = w => (typeof w?.used_percentage === 'number' ? Math.round(w.used_percentage) : null);
const five = pct(rl?.five_hour);
const week = pct(rl?.seven_day);
if (five !== null || week !== null) {
  try {
    const dir = path.join(root, '.claude/state');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'usage.json'), JSON.stringify({
      five_hour: five, seven_day: week,
      five_hour_resets_at: rl?.five_hour?.resets_at ?? null,
      seven_day_resets_at: rl?.seven_day?.resets_at ?? null,
      at: new Date().toISOString(),
    }));
  } catch {}
}
const parts = [];
if (five !== null) parts.push(`5h ${five}%`);
if (week !== null) parts.push(`week ${week}%`);
process.stdout.write(parts.length ? parts.join(' · ') : 'usage n/a');
