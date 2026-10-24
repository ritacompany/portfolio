import { readFileSync, writeFileSync } from 'node:fs';

const source = readFileSync(new URL('./original.svg', import.meta.url), 'utf8');
const path = source.match(/<path d="([^"]+)"/)[1];
const color = '#DEDEE5';

function warpX(x, squeeze) {
  if (x <= 165) return x;
  if (x < 455) return 165 + (x - 165) * squeeze;
  return 165 + 290 * squeeze + (x - 455);
}

function round(n) {
  return Number(n.toFixed(3));
}

function warpedPath(squeeze) {
  let coordinate = 0;
  const tokens = path.match(/[MCZ]|[-+]?(?:\d*\.?\d+)(?:e[-+]?\d+)?/gi);
  return tokens.map(token => {
    if (/^[MCZ]$/.test(token)) return token;
    const n = Number(token);
    const result = coordinate % 2 === 0 ? warpX(n, squeeze) : n;
    coordinate += 1;
    return String(round(result));
  }).join(' ');
}

function polygon(points, squeeze) {
  return `<polygon points="${points.map(([x, y]) => `${round(warpX(x, squeeze))},${y}`).join(' ')}" fill="black"/>`;
}

const cuts = {
  cTip: [[143, 12], [190, 12], [190, 61], [128, 61], [128, 47]],
  split: [[280, 45], [302, 45], [392, 205], [370, 205]],
  shortTail: [[835, 27], [980, 27], [980, 135], [856, 135], [856, 83]]
};

const variants = [
  {
    file: '01-tightened.svg',
    label: 'Tightened sweep',
    squeeze: 0.78,
    width: 875,
    cuts: ['cTip']
  },
  {
    file: '02-open-join.svg',
    label: 'Open join',
    squeeze: 0.87,
    width: 905,
    cuts: ['split']
  },
  {
    file: '03-chiseled.svg',
    label: 'Hard stops',
    squeeze: 0.86,
    width: 900,
    cuts: ['cTip', 'shortTail']
  }
];

for (const variant of variants) {
  const polygons = variant.cuts.map(key => polygon(cuts[key], variant.squeeze)).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 ${variant.width} 340" role="img" aria-label="CW monogram, ${variant.label}"><title>CW monogram, ${variant.label}</title><mask id="cuts" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1200" height="600"><rect x="-100" y="-100" width="1200" height="600" fill="white"/>${polygons}</mask><path d="${warpedPath(variant.squeeze)}" fill="${color}" mask="url(#cuts)"/></svg>\n`;
  writeFileSync(new URL(`./${variant.file}`, import.meta.url), svg);
}

const padded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 950 340" role="img" aria-label="Original CW monogram with added canvas padding"><title>Original CW monogram with added canvas padding</title><path d="${path}" fill="${color}"/></svg>\n`;
writeFileSync(new URL('./original-padded.svg', import.meta.url), padded);
