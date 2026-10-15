// Shared by check-message-plan.mjs and check-slot-plan.mjs: what counts as a Pathway route figure, and
// whether Chadwick approved one. APPROVALS.md is his file; the guard hook refuses Claude's writes to it.
import fs from 'node:fs';
import path from 'node:path';

export const ROUTE = new RegExp([
  /(?<!\b(?:block|section|step|week|figure|card) )\b(five|5)\b[^|.]{0,30}\b(pathway|stage)s?\b/,
  /\b(pathways?|stages|journey)\b[^|.]{0,40}\b(row|line|in order|left to right|strip|sequence|track|timeline|band|steps|chevrons?|arrow)\b/,
  /\b(row|line|strip|sequence|track|timeline|band|chevrons?)\b[^|.]{0,40}\b(pathways|stages)\b/,
  /\bacross the (five )?pathways\b|\broute (diagram|line|map|screen|figure)\b|\bthe map\b/,
  /\b(discovery|cognition|networking|branding|opportunity)\b(?:[^|.]{0,25}\b(discovery|cognition|networking|branding|opportunity)\b){2}/,
].map(r => r.source).join('|'), 'i');
export const approved = (cs2Dir, section, block) => {
  const f = path.join(cs2Dir, 'APPROVALS.md');
  if (!fs.existsSync(f)) return false;
  return new RegExp(`^- Section ${section} block ${block}: route figure\\b`, 'im').test(fs.readFileSync(f, 'utf8'));
};
