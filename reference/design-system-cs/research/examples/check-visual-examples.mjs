// G1: ten visual examples, none already used, a spread of devices, two strong on data, public safe.
import { read, rows, publicSafe } from './check-visual-common.mjs';
const errs = []; const r = rows();
if (r.length !== 10) errs.push('rows ' + r.length);
const generic = /(^|\.)(medium\.com|contra\.com|designsystemscollective\.com|uxdesign\.cc|substack\.com|github\.io|netlify\.app|vercel\.app|framer\.website|framer\.ai|webflow\.io|squarespace\.com|super\.site|pages\.dev|linkedin\.com)$/;
const used = ['../EXAMPLES.md', '../../REFERENCE-BOARD.md', '../../../../reports/Design system portfolio case studies.md']
  .flatMap(p => [...read(p).matchAll(/https?:\/\/[^\s)>"\]]+/g)].map(m => m[0].replace(/[.,;]$/, '')));
const host = u => new URL(u).hostname.replace(/^www\./, '');
for (const x of r) {
  if (used.includes(x.url)) errs.push('already used: ' + x.url);
  const h = host(x.url);
  if (!generic.test(h) && used.some(u => { try { return host(u) === h; } catch { return false; } })) errs.push('same site already used: ' + x.url);
  if (!/\d{4}/.test(x.date)) errs.push(x.n + ' no year');
  if (!/,/.test(x.author)) errs.push(x.n + ' author lacks role');
}
const tags = new Set(r.flatMap(x => [...x.devices.matchAll(/`([^`]+)`/g)].map(m => m[1])));
if (tags.size < 6) errs.push('device kinds ' + tags.size);
const data = r.filter(x => /\*\*data\*\*/.test(x.devices)).length;
if (data < 2) errs.push('data pages ' + data);
// positive control: the exclusion list really holds the first ten
if (!used.some(u => u.includes('nessgrixti.com'))) errs.push('exclusion list did not load');
publicSafe(read('./VISUAL-EXAMPLES.md'), errs, 'VISUAL-EXAMPLES');
if (errs.length) { console.log('FAIL ' + errs.join('; ')); process.exit(1); } console.log('VISUAL-EXAMPLES-PASS');
