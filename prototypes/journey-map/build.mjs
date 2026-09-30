// Builds journey-section.html from journey-template.html.
// U(n) in the template becomes calc(n * var(--u)); the four Satoshi faces are inlined as base64.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const b = f => fs.readFileSync(path.join(here, f)).toString('base64');
let h = fs.readFileSync(path.join(here, 'journey-template.html'), 'utf8')
  .replace(/U\(([\d.]+)\)/g, 'calc($1 * var(--u))')
  .replace('__SAT400__', b('fonts/satoshi-400.woff2'))
  .replace('__SAT500__', b('fonts/satoshi-500.woff2'))
  .replace('__SAT700__', b('fonts/satoshi-700.woff2'))
  .replace('__SAT900__', b('fonts/satoshi-900.woff2'));
fs.writeFileSync(path.join(here, 'journey-section.html'), h);
console.log('U left:', (h.match(/U\(/g) || []).length, 'placeholders left:', (h.match(/__[A-Z0-9]+__/g) || []).length, 'bytes', h.length);
