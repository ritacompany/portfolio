// Checks reference/design-system-cs/versions/colour.md. Prints COLOUR-PASS only when every check passes.
import { readFileSync } from 'node:fs';
const dir = new URL('.', import.meta.url).pathname;
const md = readFileSync(dir + 'colour.md', 'utf8');
const fails = [];
const parts = md.split(/^## Version /m).slice(1).map(p => p.split(/^## (?!Version)/m)[0]);
const versions = Object.fromEntries(parts.map(p => [p[0], p]));
if (Object.keys(versions).join('') !== 'ABC') fails.push('versions present: ' + Object.keys(versions).join(''));
const POOL = ['T1I', 'T2I', 'T3I', 'Robinhood', 'Suno', 'Atoms', 'The Atlantic', 'Calvin Klein', 'Headspace', 'Ro', 'Windsurf'];
const layouts = [];
// Page copy = the fields that go on the page.
const COPY_FIELDS = /^(Eyebrow|Headline|Side text|Caption \d|Note \d[^:]*|Body[^:]*|Sources):\s*/;
const POINTS = {
  P1: [/3,555/, /(using|used) most/],
  P2: [/what (it|they) do|do the same thing/, /551/, /share|by value/],
  P3: [/icon/, /one step darker than the text/],
  P4: [/65% to 78%/, /renamed/, /leaner public palette/],
  P5: [/Gold/],
  P6: [/dark only/i],
  P7: [/published\s+role/, /Text\/Display/],
};
for (const [k, v] of Object.entries(versions)) {
  const lay = (v.match(/^Layout: (\S+)/m) || [])[1];
  if (!lay || !POOL.some(p => lay.startsWith(p))) fails.push(`${k}: layout not in pool (${lay})`);
  layouts.push(lay);
  // collect copy: field line plus continuation lines until blank line
  const blocks = v.split(/\n\s*\n/);
  let copy = [], images = [];
  let inField = false;
  for (const b of blocks) {
    const m = b.match(COPY_FIELDS);
    if (m) { copy.push(b.replace(COPY_FIELDS, '')); inField = /^Body/.test(m[1]); continue; }
    if (/^(Image \d)/.test(b)) { images.push(b); inField = false; continue; }
    if (inField && !/^(Image|Evidence|Layout|Angle|Covers|Eyebrow|Headline)\b/.test(b)) { copy.push(b); continue; }
    inField = false;
  }
  const text = copy.join('\n').replace(/\s+/g, ' ');
  for (const [p, res] of Object.entries(POINTS)) for (const re of res) if (!re.test(text)) fails.push(`${k}: ${p} missing ${re}`);
  if (!images.some(i => /#39F145/.test(i) && /Text\/Accent/.test(i) && /real/.test(i))) fails.push(`${k}: P8 chain visual missing from image notes`);
  if (!new RegExp('^Covers: P1, P2, P3, P4, P5, P6, P7, P8$', 'm').test(v)) fails.push(`${k}: Covers line incomplete`);
  if ((v.match(/^Sources:/gm) || []).length !== 1) fails.push(`${k}: needs exactly one sources line`);
  if (/["“”‘’]/.test(text)) fails.push(`${k}: quote marks in copy`);
  if (/\b(delve|crucial|pivotal|showcase|testament|underscore|vibrant|tapestry|seamless|leverage)\b/i.test(text)) fails.push(`${k}: AI vocabulary`);
  // Oxford comma: a list ending ", and X" or ", or X" whose sentence has an earlier comma-separated item
  for (const s of text.split(/(?<=[.;:])\s/)) if (/,\s(\S+\s){0,3}\S+,\s(and|or)\s/.test(s)) fails.push(`${k}: possible Oxford comma: ${s.slice(0, 80)}`);
  const head = (v.match(/^Headline: ([\s\S]*?)\n\n/m) || [])[1] || '';
  const words = head.replace(/\s+/g, ' ').split(' ').slice(1);
  const caps = words.filter(w => /^[A-Z]/.test(w) && !/^(I|MVP|Text\/\w+|Green\/\d+|Mondai)$/.test(w.replace(/[,.]/g, '')));
  if (caps.length) fails.push(`${k}: headline not sentence case: ${caps.join(' ')}`);
  if (/^Colour/.test(head)) fails.push(`${k}: headline opens with the eyebrow`);
  if (/[Cc]olleague|asked (an |the )?(AI|Claude)|Claude/.test(text)) fails.push(`${k}: process story or names`);
}
if (new Set(layouts.map(l => l && l.replace(/,$/, ''))).size !== layouts.length) fails.push('two versions share a layout');
// Dashes anywhere in the file
if (/[–—]/.test(md)) fails.push('em or en dash in file');
if (/\s--\s|\w\s-\s\w/.test(md)) fails.push('hyphen used as a dash');
// Checks recorded
if (!/^### Humanizer pass/m.test(md) || !/Draft[\s\S]*Audit[\s\S]*Final/.test(md.split('### Humanizer pass')[1] || '')) fails.push('humanizer pass not recorded');
const claims = readFileSync(dir + 'colour-claims.md', 'utf8');
const verdictRows = claims.match(/^\| K\d+ \| (MATCH|PARTLY|NO MATCH)[^|]*\|/gm) || [];
if (verdictRows.length < 22) fails.push(`claim check: ${verdictRows.length} verdicts recorded, need 22`);
if (/^\| K\d+ \| (PARTLY|NO MATCH)(?![^|]*fixed)/m.test(claims)) fails.push('claim check: an unfixed PARTLY or NO MATCH');
if (!/^Canvas: https:\/\/claude\.ai\//m.test(md)) fails.push('canvas link missing at top');
if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
console.log('COLOUR-PASS');
