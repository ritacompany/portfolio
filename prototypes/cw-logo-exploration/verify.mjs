import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = new URL('.', import.meta.url);
const file = name => new URL(name, root);
const read = name => readFileSync(file(name), 'utf8');
const variants = ['01-taut.svg', '02-soft-square.svg', '03-balanced.svg'];
const originalHash = '431e21b1dc8d91fde93651d1d4a5d5bce2dac8063476291f57880d854aa6386c';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
function assertNoMasks(svg) {
  assert(!/<\s*(?:mask|clipPath)\b/i.test(svg), 'A design still uses a cut mask');
}

const source = readFileSync(file('original.svg'));
const sourceHash = createHash('sha256').update(source).digest('hex');
assert(sourceHash === originalHash, 'The source SVG changed');

let controlFailed = false;
try { assertNoMasks('<svg><mask id="cut"/></svg>'); } catch { controlFailed = true; }
assert(controlFailed, 'Mask check did not detect the positive control');

for (const name of variants) {
  const svg = read(name);
  assertNoMasks(svg);
  assert(/<path\b/.test(svg), `${name} has no path`);
  assert(/viewBox="[^"]+"/.test(svg), `${name} has no viewBox`);
  assert(!svg.includes('fill="none" stroke="none"'), `${name} has no visible mark`);
}

const comparison = read('comparison.html');
for (const name of ['original.svg', ...variants]) {
  const matches = comparison.match(new RegExp(`src="${name.replace('.', '\\.')}"`, 'g')) ?? [];
  assert(matches.length === 3, `${name} does not appear at all three scales`);
}
for (const oldName of ['01-tightened.svg', '02-open-join.svg', '03-chiseled.svg']) {
  assert(!comparison.includes(oldName), `Old proposal ${oldName} is still shown`);
}
for (const size of ['48 px', '160 px', '490 px']) {
  assert(comparison.includes(size), `Missing ${size} comparison`);
}

const svgPaths = ['original.svg', ...variants].map(name => file(name).pathname);
execFileSync('python3', ['-c', 'import sys, xml.etree.ElementTree as E; [E.parse(p) for p in sys.argv[1:]]', ...svgPaths]);

assert(existsSync(file('preview.png')), 'Visual overview is missing');
const png = readFileSync(file('preview.png'));
assert(png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), 'Overview is not a PNG');
assert(png.readUInt32BE(16) >= 1200 && png.readUInt32BE(20) >= 800, 'Overview is too small');

console.log('CW vector verification passed');
