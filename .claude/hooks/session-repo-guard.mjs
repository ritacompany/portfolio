#!/usr/bin/env node
// Blocks starting a new cloud session with no repository attached.
// Why: on 24 Nov a checker session was started with no repo, judged pages for CS3
// without ever seeing it and told Chadwick it had the repo when it did not.
// Fix record: fixes/2026-11-25-checker-session-without-repos.md
import fs from 'node:fs';
let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { process.exit(0); }
const name = input.tool_name || '';
if (!/create_session$/.test(name)) process.exit(0);
const src = (input.tool_input && input.tool_input.source_url) || '';
if (String(src).trim()) process.exit(0);
process.stderr.write(
  'Blocked: this would start a session with no repository, so it could not see the portfolio or CS3. ' +
  'Pass source_url (for example https://github.com/ritacompany/portfolio), or do the work with an in-session Agent, which sees the repos on disk.\n'
);
process.exit(2);
