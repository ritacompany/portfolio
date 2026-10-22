#!/usr/bin/env node
// Truth check for a case study outline or section plan, against that case study's sources of truth
// (reference/<cs>/truth.json: his frame snapshot and the product flow map, both read from Figma).
// Won the blind trial of 21 Oct (fixes/2026-10-21-cs2-process-rebuild.md). The guard hook runs it on
// every outline save; review-truth.mjs then judges what code cannot (does a study fit, does a source say it).
//
//   node check-truth.mjs <cs> --ids                  list flow step ids
//   node check-truth.mjs <cs> <outline>              an outline: his frame first, every flow step placed
//   node check-truth.mjs <cs> <plan> --section       a section plan: held to its section in the outline
//
// Format. Sections from his frame come first, in his order, with his titles. Block plans add
// "### Block N: <headline>" under their one section. Every flow step id (--ids) sits under a Flows: line
// or in a final "## Cut" as "- <id> | <reason> | waits for his yes".
//   ## <n>. <section title>
//   Frame block: <his block number, or proposed>
//   Reader gets: <one or two lines>
//   Flows: <step ids>
//   Claim: product | <claim> | src: <frame ids from the flow map>
//   Claim: background | <claim> | src: frame:<block> or approved:<file>:<line>
//   Claim: research | <claim> | src: <report path> | effect: <size with its number> | backs: <the decision>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const at = p => p.startsWith('~/') ? path.join(os.homedir(), p.slice(2)) : path.join(repo, p);
const [cs, arg, mode] = process.argv.slice(2);
const cfgPath = path.join(repo, 'reference', cs || '', 'truth.json');
if (!cs || !fs.existsSync(cfgPath)) { console.error('usage: check-truth.mjs <cs> --ids | <file> [--section]'); process.exit(2); }
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const fails = [];

// The sources must be fresh reads, so every session starts from his frame and the live product.
for (const [k, src] of [['frame', 'frameSource'], ['flows', 'flowsSource']]) {
  const f = at(cfg[k]);
  if (!fs.existsSync(f)) { console.log(`missing ${cfg[k]}: read it from ${cfg[src]}`); console.log('TRUTH_FAIL'); process.exit(1); }
  const days = (Date.now() - fs.statSync(f).mtimeMs) / 864e5;
  if (days > cfg.maxAgeDays) fails.push(`0 sources: ${cfg[k]} is ${Math.floor(days)} days old; read it again from ${cfg[src]}`);
}

const steps = [];
let letter = null, i = 0;
for (const line of fs.readFileSync(at(cfg.flows), 'utf8').split('\n')) {
  const h = line.match(/^## ([A-Z])\. /);
  if (h) { letter = h[1]; i = 0; continue; }
  if (/^## /.test(line)) { letter = null; continue; }
  if (letter && /^- /.test(line)) steps.push({ id: `${letter}${++i}`, text: line.slice(2), frames: line.match(/\d+:\d+/g) || [] });
}
const frameIds = new Set(steps.flatMap(s => s.frames));
const blocks = [...fs.readFileSync(at(cfg.frame), 'utf8').matchAll(/^(\d)\. \*\*(.+?)\*\* \((\d+:\d+)\)/gm)].map(m => ({ n: +m[1], title: m[2] }));

if (arg === '--ids') { for (const s of steps) console.log(`${s.id}  ${s.text}`); process.exit(0); }
if (!arg || !fs.existsSync(arg)) { console.error(`no file ${arg}`); process.exit(2); }
const text = fs.readFileSync(arg, 'utf8');

// 5. His frame is the spine
const sectionsOf = t => [...t.matchAll(/^## (\d+)\. (.+)\n(?:.*\n)*?Frame block: (.+)\n(?:.*\n)*?Flows: (.*)$/gm)]
  .map(m => ({ n: m[1], title: m[2].trim(), block: m[3].trim(), flows: m[4].split(/[,\s]+/).filter(x => /^[A-Z]\d+$/.test(x)) }));
const sections = sectionsOf(text);
if (!sections.length) fails.push('5 frame: no sections in the required format');
let required = steps.map(s => s.id);
if (mode === '--section') {
  const own = fs.existsSync(at(cfg.outline)) && sectionsOf(fs.readFileSync(at(cfg.outline), 'utf8')).find(s => s.n === sections[0]?.n);
  if (!own) fails.push(`5 frame: section ${sections[0]?.n} is not in ${cfg.outline}`);
  else {
    if (own.title.toLowerCase() !== sections[0].title.toLowerCase()) fails.push(`5 frame: title "${sections[0].title}" is not the outline's "${own.title}"`);
    required = own.flows;
  }
} else blocks.forEach((b, k) => {
  const s = sections[k];
  if (!s || s.block !== String(b.n)) fails.push(`5 frame: section ${k + 1} must be his block ${b.n} "${b.title}"`);
  else if (s.title.toLowerCase() !== b.title.toLowerCase()) fails.push(`5 frame: section ${k + 1} title "${s.title}" is not his "${b.title}" (propose a change, do not apply it)`);
});

// 2. Flow coverage
const covered = new Set();
for (const m of text.matchAll(/^Flows: (.+)$/gm)) for (const id of m[1].split(/[,\s]+/)) covered.add(id.trim());
for (const m of (text.split(/^## Cut/m)[1] || '').matchAll(/^- ([A-Z]\d+) \|.+\| *waits for his yes/gm)) covered.add(m[1]);
const missing = required.filter(id => !covered.has(id));
if (missing.length) fails.push(`2 coverage: flow steps in no section and not cut: ${missing.join(', ')}`);

// 1, 3, 4. Every claim points at a source of truth
for (const [, type, rest] of text.matchAll(/^Claim: (\w+) \| (.+)$/gm)) {
  const parts = rest.split('|').map(x => x.trim());
  const field = k => (parts.find(p => p.startsWith(k + ':')) || '').slice(k.length + 1).trim();
  const src = field('src');
  if (type === 'product') {
    const ids = src.match(/\d+:\d+/g) || [];
    if (!ids.length || ids.some(x => !frameIds.has(x))) fails.push(`1 product: "${parts[0]}" src ${src || 'none'} is not a frame in the flow map`);
  } else if (type === 'background') {
    if (!cfg.background.some(r => new RegExp(r).test(src))) fails.push(`3 background: "${parts[0]}" src ${src || 'none'} is not his words`);
  } else if (type === 'research') {
    const effect = field('effect');
    const pct = (effect.match(/(\d+(?:\.\d+)?)\s*(?:%|percent)/) || [])[1];
    if (!/\d/.test(effect)) fails.push(`4 research: "${parts[0]}" states no effect size`);
    else if (pct && +pct < 10) fails.push(`4 research: "${parts[0]}" effect ${effect} is too small to carry "${field('backs')}"`);
    else if (/\b(no (significant )?effect|null|did ?n[o']t|correlat)/i.test(effect)) fails.push(`4 research: "${parts[0]}" effect "${effect}" is null or correlational`);
    if (!field('backs')) fails.push(`4 research: "${parts[0]}" names no decision it backs`);
    if (!fs.existsSync(path.join(repo, src))) fails.push(`4 research: "${parts[0]}" src ${src} not found`);
  } else fails.push(`claim type "${type}" unknown: use product, background or research`);
}
for (const [re, why] of cfg.corrections) if (new RegExp(re, 'i').test(text)) fails.push(`3 background: contradicts his correction, ${why}`);

if (fails.length) { console.log(fails.join('\n')); console.log('TRUTH_FAIL'); process.exit(1); }
console.log('TRUTH_PASS');
