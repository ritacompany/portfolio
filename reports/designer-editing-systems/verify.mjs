import fs from 'node:fs';
const t = fs.readFileSync(new URL('./REPORT.md', import.meta.url), 'utf8');
const fail = m => { console.log('FAIL ' + m); process.exit(1); };
const cands = t.match(/^\*\*\d+\. .+$/gm) || [];
if (cands.length < 8) fail('candidates ' + cands.length);
// each candidate block has at least one link
const blocks = t.split(/^\*\*\d+\. /m).slice(1);
const noLink = blocks.filter(b => !/\]\(https?:\/\//.test(b.split(/^### |^---/m)[0]) && !/plugin directory/i.test(b));
if (noLink.length) fail('candidate without link ' + noLink.length);
const head = t.split('\n').slice(0, 6).join('\n');
if (!/\*\*Summary\.\*\*/.test(head)) fail('no summary at top');
if (!/^## Recommendation/m.test(t)) fail('no recommendation');
if (!/\*\*First step:\*\*/.test(t)) fail('no first step');
if (/—|–| -- /.test(t)) fail('dash found');
// positive control for dash detector
if (!/—/.test('a—b')) fail('control');
console.log(`report verification passed (${cands.length} candidates)`);
