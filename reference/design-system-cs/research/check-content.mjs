// Structural check for CONTENT.md. Run from the portfolio root.
import { readFileSync, existsSync } from 'node:fs';
const d = 'reference/design-system-cs/research/';
let bad = [];
if (!existsSync(d + 'CONTENT.md')) { console.log('no CONTENT.md'); process.exit(1); }
const s = readFileSync(d + 'CONTENT.md', 'utf8');
for (const h of ['## Craft', '## Scaling with AI', '## Proof', '## Tokens or colour', '## Sources'])
  if (!s.includes(h)) bad.push('missing heading ' + h);
for (const h of ['Table stakes', 'Distinctive', 'Recommendation'])
  if ((s.match(new RegExp('\\*\\*' + h, 'g')) || []).length < 3) bad.push('fewer than 3 ' + h + ' blocks');
const recs = s.split('\n').filter(l => /^\s*\d+\.\s/.test(l) && /Recommend|rank/i.test(s));
const recLines = s.split('\n').filter(l => /^\s*\d+\.\s/.test(l));
const noEv = recLines.filter(l => !/Evidence:/.test(l));
if (recLines.length < 6) bad.push('fewer than 6 ranked items');
if (noEv.length) bad.push(noEv.length + ' ranked items without Evidence:');
const links = (s.match(/https?:\/\/\S+/g) || []).length;
if (links < 10) bad.push('fewer than 10 source links');
if (/[–—]|--/.test(s)) bad.push('dash found');
if (!existsSync(d + 'claim-check.md')) bad.push('no claim-check.md');
console.log(bad.length ? 'FAIL\n' + bad.join('\n') : 'CONTENT-PASS');
process.exit(bad.length ? 1 : 0);
