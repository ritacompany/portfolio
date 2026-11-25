// G2: one section per visual page with every field, a catalogue naming all twenty pages, public safe.
import { read, rows, publicSafe } from './check-visual-common.mjs';
const s = read('./VISUAL-STUDY.md'); const errs = []; const r = rows();
const secs = s.split(/\n## \d+\. /).slice(1);
if (secs.length !== 10) errs.push('sections ' + secs.length);
for (const x of r) if (!s.includes(x.url)) errs.push('missing link ' + x.url);
secs.forEach((x, i) => { for (const f of ['Link', 'Archive', 'Visuals that carry it', 'Captions and layout', 'Serves']) if (!x.includes(`- ${f}:`)) errs.push(`section ${i + 1} lacks ${f}`); });
const cat = s.split(/\n## Catalogue/)[1] || '';
if (!cat) errs.push('no catalogue');
const groups = (cat.match(/\n### /g) || []).length; if (groups < 4) errs.push('catalogue groups ' + groups);
const first = ['Wise', 'JPMorgan', 'IndiGo', 'CASSI', 'Musterhall', 'Diorama', 'WellSky', 'Anorbank', 'MCP audit', 'Fortune 200'];
const second = r.map(x => x.title.split(':')[0].trim());
for (const n of [...first, ...second]) if (!cat.includes(n)) errs.push('catalogue lacks ' + n);
if (!/claude\.ai\/artifact\/\w+/.test(s)) errs.push('no archive link');
publicSafe(s, errs, 'VISUAL-STUDY');
if (errs.length) { console.log('FAIL ' + errs.join('; ')); process.exit(1); } console.log('VISUAL-STUDY-PASS');
