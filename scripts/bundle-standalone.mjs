// Inline the fonts and images a study page links to, so it opens on its own anywhere.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
const [src, out] = process.argv.slice(2);
const base = dirname(resolve(src));
const types = { '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
let html = readFileSync(src, 'utf8');
html = html.replace(/(url\(")([^")]+)("\))|(src=")([^"]+)(")/g, (m, a, u1, b, c, u2, d) => {
  const url = u1 || u2;
  if (/^(data:|https?:)/.test(url)) return m;
  const data = readFileSync(resolve(base, url)).toString('base64');
  const uri = `data:${types[extname(url)]};base64,${data}`;
  return u1 ? a + uri + b : c + uri + d;
});
writeFileSync(out, html);
console.log('wrote ' + out + ' ' + Math.round(html.length / 1024) + ' KB');
