#!/usr/bin/env node
// Tuner panel guard. After a Write or Edit to a page in site/dev or site/motion-lab, if the page has its
// own sliders or selects and does not load the shared edit panel (site/dev/preview/edit-panel.js), send
// the session back with what to do. Home made option panels that float over the thing being tuned are
// the failure this stops: he cannot see the result while he changes it.
// An editor he approved with its own structure opts out in its <head>:
//   <meta name="edit-panel" content="exempt: <why, and when he approved it>">
// Test: node .claude/hooks/tuner-panel-guard.mjs --file <page.html>   (exit 2 means it would block)
import { readFileSync, existsSync } from "node:fs";
import { relative, resolve } from "node:path";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
let file = null;
const i = process.argv.indexOf("--file");
if (i > 0) file = process.argv[i + 1];
else { try { file = JSON.parse(readFileSync(0, "utf8"))?.tool_input?.file_path || null; } catch {} }
if (!file) process.exit(0);
const rel = relative(root, resolve(root, file)).split("\\").join("/");
if (!/^site\/(dev|motion-lab)\/.+\.html?$/.test(rel) || rel.startsWith("site/dev/preview/")) process.exit(0);
const abs = resolve(root, rel);
if (!existsSync(abs)) process.exit(0);
const s = readFileSync(abs, "utf8");
const ownControls = /type\s*[=:]\s*["']?range\b|\.type\s*=\s*["']range["']|<select\b/i.test(s);
const usesPanel = /edit-panel\.js/.test(s);
const exempt = /<meta\s+name=["']edit-panel["']\s+content=["']exempt:/i.test(s);
if (!ownControls || exempt) process.exit(0);
const msg = usesPanel
  ? `${rel} loads the shared edit panel but also builds its own sliders or selects. Move them into an EditPanel.register group (contract at the top of site/dev/preview/edit-panel.js) so every control sits in the docked panel, beside the page and never over it.`
  : `${rel} has its own sliders or selects. Tuners, options pages and previews use the shared edit panel, not a panel of their own:\n` +
    `  <script src="/dev/preview/edit-panel.js" data-fluid defer></script>\n` +
    `then register the controls (contract at the top of site/dev/preview/edit-panel.js; worked example site/dev/week-carousel/index.html). ` +
    `Lay the page out from its own width (container queries on body) so it docks beside the panel down to the 800 px browser pane. ` +
    `Only an editor whose own structure Chadwick approved opts out, with <meta name="edit-panel" content="exempt: ...">.`;
process.stderr.write(msg + "\n");
process.exit(2);
