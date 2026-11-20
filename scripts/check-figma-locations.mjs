#!/usr/bin/env node
// Checks reference/figma-locations.json, the one home for where each live design is in Figma, and the
// files a new session reads first, so none of them sends a session to a file or frame that has moved.
// Usage: node scripts/check-figma-locations.mjs [--today YYYY-MM-DD]
// Prints the registry as a short list first (what a session needs before a Figma call), then the verdict.
// Fails when: the registry is malformed; a live entry was last verified more than maxAgeDays ago; a resume
// file restates a Figma file key or figma.com link instead of pointing at the registry; a resume file
// names a frame the registry marks stale; HANDOFF.md does not point at the registry.
// Prints FIGMA_LOCATIONS_PASS and exits 0, or lists every problem, prints FIGMA_LOCATIONS_FAIL, exits 1.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const REGISTRY = 'reference/figma-locations.json';
// The files a session reads before it starts. Each points at the registry and holds no Figma pointer.
export const RESUME_FILES = ['CLAUDE.md', 'reference/cs2/HANDOFF.md', 'reference/cs2/BROWSER_MODE.md', 'reference/cs2/WORKING_LOOP.md', 'reference/cs2/CS2_PROCESS.md', 'reference/cs2/truth.json'];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const NODE = /^\d+:\d+$/;
const days = (a, b) => Math.floor((Date.parse(b) - Date.parse(a)) / 86400000);

export function checkRegistry(reg, today) {
  const p = [];
  if (!reg || typeof reg !== 'object') return ['registry is not a JSON object'];
  const max = Number(reg.maxAgeDays);
  if (!(max > 0)) p.push('maxAgeDays must be a positive number');
  const files = Array.isArray(reg.files) ? reg.files : (p.push('files must be a list'), []);
  const keys = new Set();
  for (const f of files) {
    if (!/^[0-9a-zA-Z]{22,128}$/.test(f.key || '')) p.push(`file ${f.name || '?'}: key missing or malformed`);
    if (!f.name || !f.account || !f.access) p.push(`file ${f.key}: name, account and access are all required`);
    keys.add(f.key);
  }
  const designs = Array.isArray(reg.designs) ? reg.designs : (p.push('designs must be a list'), []);
  const ids = new Set();
  for (const d of designs) {
    const at = `design ${d.id || '?'}`;
    if (!d.id) p.push('a design has no id');
    if (ids.has(d.id)) p.push(`${at}: duplicate id`);
    ids.add(d.id);
    if (!keys.has(d.file)) p.push(`${at}: file ${d.file} is not in the files list, so a session could not search it`);
    if (!d.page?.name || !NODE.test(d.page?.id || '')) p.push(`${at}: page name and id (like 5658:1061) required`);
    if (!d.frame?.name || !NODE.test(d.frame?.id || '')) p.push(`${at}: frame name and id required; the name is what a session searches by when the id moves`);
    if (!DATE.test(d.verified || '')) p.push(`${at}: verified must be YYYY-MM-DD`);
    else if (max > 0 && days(d.verified, today) > max)
      p.push(`${at}: last verified ${d.verified}, more than ${max} days ago; read ${d.frame?.id} in ${d.file} (or find it by name in the other files) and update verified`);
  }
  for (const s of reg.stale || []) {
    if (!ids.has(s.design)) p.push(`stale entry ${s.node}: design ${s.design} is not in designs`);
    if (!NODE.test(s.node || '') || !s.file) p.push(`stale entry for ${s.design}: node and file required`);
    const live = designs.find(d => d.file === s.file && d.frame?.id === s.node);
    if (live) p.push(`node ${s.node} is both live (${live.id}) and stale`);
  }
  return p;
}

// texts: { 'reference/cs2/HANDOFF.md': '...', ... }
export function checkPointers(reg, texts) {
  const p = [];
  const keys = (reg.files || []).map(f => f.key);
  const stale = reg.stale || [];
  for (const [name, raw] of Object.entries(texts)) {
    if (raw == null) continue;
    raw.split('\n').forEach((line, i) => {
      const at = `${name}:${i + 1}`;
      for (const k of keys) if (line.includes(k)) p.push(`${at}: restates Figma file key ${k}; point at ${REGISTRY} instead`);
      if (/figma\.com\/(design|file)\//.test(line)) p.push(`${at}: restates a figma.com link; point at ${REGISTRY} instead`);
      for (const s of stale)
        if (new RegExp(`(^|[^\\d])${s.node.replace(':', '[:-]')}($|[^\\d])`).test(line))
          p.push(`${at}: names ${s.node} (${s.was}), which the registry marks stale for ${s.design}: ${s.why}`);
    });
  }
  const handoff = texts['reference/cs2/HANDOFF.md'];
  if (handoff != null && !handoff.includes('figma-locations.json')) p.push(`reference/cs2/HANDOFF.md: does not point at ${REGISTRY}`);
  return p;
}

export function show(reg) {
  const name = k => (reg.files.find(f => f.key === k) || {}).name || k;
  const out = ['Live designs (reference/figma-locations.json):'];
  for (const d of reg.designs) out.push(`  ${d.id}: ${name(d.file)} ${d.file}, page ${d.page.name} ${d.page.id}, frame "${d.frame.name}" ${d.frame.id}, verified ${d.verified}`);
  out.push('Known files, search these by frame name when a frame is not where it says:');
  for (const f of reg.files) out.push(`  ${f.name} ${f.key}: ${f.access}`);
  return out.join('\n');
}

export function load(dir = root) {
  const reg = JSON.parse(fs.readFileSync(path.join(dir, REGISTRY), 'utf8'));
  const texts = Object.fromEntries(RESUME_FILES.map(f => [f, fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), 'utf8') : null]));
  return { reg, texts };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = process.argv.slice(2);
  const ti = a.indexOf('--today');
  const today = ti >= 0 ? a[ti + 1] : new Date().toISOString().slice(0, 10);
  let reg, texts;
  try { ({ reg, texts } = load()); } catch (e) { console.log(`  ${REGISTRY}: ${e.message}`); console.log('FIGMA_LOCATIONS_FAIL'); process.exit(1); }
  console.log(show(reg));
  const problems = [...checkRegistry(reg, today), ...checkPointers(reg, texts)];
  if (problems.length) { console.log(problems.map(x => `  ${x}`).join('\n')); console.log('FIGMA_LOCATIONS_FAIL'); process.exit(1); }
  console.log('FIGMA_LOCATIONS_PASS');
}
