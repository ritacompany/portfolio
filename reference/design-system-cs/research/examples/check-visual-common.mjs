// Shared helpers for the visual set checks.
import fs from 'node:fs';
export const read = p => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
export const rows = () => [...read('./VISUAL-EXAMPLES.md').matchAll(/^\| (\d+) \| \[([^\]]+)\]\((https:[^)]+)\) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|/gm)]
  .map(m => ({ n: +m[1], title: m[2], url: m[3], author: m[4].trim(), date: m[5].trim(), devices: m[6].trim() }));
export function publicSafe(s, errs, name) {
  if (/[–—]| -- /.test(s)) errs.push(name + ': dash punctuation');
  if (/\w+, \w+(?: \w+)?, and /.test(s)) errs.push(name + ': possible Oxford comma');
  const q = [...s.matchAll(/["“]([^"”]{0,400})["”]/g)].filter(m => m[1].split(/\s+/).length > 12);
  if (q.length) errs.push(name + ': long quote');
}
