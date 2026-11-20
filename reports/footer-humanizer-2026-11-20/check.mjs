import { readFileSync } from 'node:fs';
const dir = new URL('.', import.meta.url).pathname;
const review = readFileSync(dir + 'REVIEW.md', 'utf8');
const mode = process.argv[2];
if (mode === 'coverage') {
  // Every string read from Figma 20 Nov (footer 6331:25758, strip 6331:25757)
  const strings = ['Back to top','Contact','hello@chadwickfenner.com','I’m currently living in Chicago, IL','and seeking opportunities in NYC.','CONTACT','Home','About','Selected works','Testimonials','@2026, Chadwick FENNER','10:24pm CST','Linkedin','Resume','Explore more case studies','MONDAI: DESIGN SYSTEM CASE STUDY','HAVEN: LGBTQIA + youth app'];
  const table = review.split('## What is wrong, line by line')[1]?.split('\n## ')[0] || '';
  const missing = strings.filter(s => !table.includes('`' + s + '`'));
  if (missing.length) { console.log('MISSING: ' + missing.join(' | ')); process.exit(1); }
  console.log('COVERAGE OK');
} else if (mode === 'copy') {
  for (const h of ['## Draft', '## Audit', '## Final']) if (!review.includes(h)) { console.log('NO SECTION ' + h); process.exit(1); }
  const fin = review.split('## Final')[1].split('\n## ')[0];
  const bad = [];
  if (/[—–]/.test(fin)) bad.push('dash');
  if (/\s--\s|\w--\w/.test(fin)) bad.push('double hyphen');
  if (/,\s(and|or)\s/i.test(fin)) bad.push('possible Oxford comma');
  // control: the checker must catch a planted dash and Oxford comma
  const ctl = 'red, white, and blue — x';
  if (!(/[—–]/.test(ctl) && /,\s(and|or)\s/i.test(ctl))) { console.log('CONTROL FAILED'); process.exit(1); }
  if (bad.length) { console.log('BAD: ' + bad.join(', ')); process.exit(1); }
  console.log('COPY OK');
} else { console.log('usage'); process.exit(2); }
