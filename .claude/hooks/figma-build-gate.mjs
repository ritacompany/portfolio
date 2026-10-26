#!/usr/bin/env node
// PreToolUse gate for Figma writes. Building happens only when Chadwick says so (CS2 loop step 8).
// A Figma write tool is allowed only if his latest typed message in this session says "build"
// (build, rebuild, build it, build section 3) and does not say not to. Everything else is refused
// (exit 2) with a reason that sends the session back to him. Reads stay open.
// Homepage work has its own pass (his D5, 15 Oct 2026): a message that names homepage Figma work
// ("homepage" or "home page" plus "figma") lets the write through, unless it says not to.
import fs from 'node:fs';

const WRITES = /__(use_figma|generate_figma_design|upload_assets|create_new_file|generate_diagram|generate_image|create_shader|update_shader|create_generative_plugin|update_generative_plugin|add_code_connect_map|send_code_connect_mappings)$/;
const SAYS_BUILD = /\b(re)?build\b/i;
const SAYS_DONT = /\b(don'?t|do not|not|no|never|before|until|without)\s+(\w+\s+){0,2}(re)?build\b|\bbuild\w*\s+(comes\s+)?later\b/i;
const NAMES_HOMEPAGE = /\bhome\s?page\b/i;
const NAMES_FIGMA = /\bfigma\b/i;
const HOMEPAGE_DONT = /\b(don'?t|do not|not|no|never|before|until|without)\s+(\w+\s+){0,3}home\s?page\b/i;

let payload;
try { payload = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { process.exit(0); }
if (!WRITES.test(payload.tool_name || '')) process.exit(0);

// A use_figma script that only reads (no node creation, removal, reparenting or property assignment)
// is a read, so it stays open. Without this, a frame too large for get_metadata could not be read at all.
const MUTATES = /figma\.create|\.remove\(|appendChild|insertChild|\.set\(|\.resize\w*\(|setBound|setRange|setValueForMode|setPluginData|setSharedPluginData|loadFontAsync|combineAsVariants|detachInstance|\.\s*(characters|fills|strokes|name|x|y|visible|opacity|layoutMode|fontSize|fontName|description|placeholder|locked|rotation)\s*=(?!=)/;
if (/__use_figma$/.test(payload.tool_name) && !MUTATES.test((payload.tool_input || {}).code || '')) process.exit(0);

function latestTyped(file) {
  if (!file || !fs.existsSync(file)) return null;
  const entries = fs.readFileSync(file, 'utf8').trim().split('\n')
    .map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  for (let i = entries.length - 1; i >= 0; i--) {
    const e = entries[i];
    if (e.type !== 'user' || e.isSidechain || e.isMeta) continue;
    const c = e.message && e.message.content;
    if (typeof c === 'string') return c;
    if (Array.isArray(c) && c.some(x => x.type === 'text')) return c.filter(x => x.type === 'text').map(x => x.text).join('\n');
  }
  return null;
}

// Only his own words count: drop pasted blocks and system reminders before reading his message.
const said = (latestTyped(payload.transcript_path) || '')
  .replace(/<pasted_content[\s\S]*?<\/pasted_content[^>]*>/g, '')
  .replace(/<system-reminder[\s\S]*?<\/system-reminder[^>]*>/g, '');
if (SAYS_BUILD.test(said) && !SAYS_DONT.test(said)) process.exit(0);
if (NAMES_HOMEPAGE.test(said) && NAMES_FIGMA.test(said) && !HOMEPAGE_DONT.test(said)) process.exit(0);
console.error('Blocked: Figma writes wait until Chadwick says to build (CS2 loop step 8), or names a homepage Figma task. His latest message does neither. Bring him the plan and ask; do not build.');
process.exit(2);
