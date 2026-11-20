import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(fs.readFileSync(path.join(dir, 'palette-spec.json'), 'utf8'));

function linearRgb(L, C, h) {
  const radians = h * Math.PI / 180;
  const a = C * Math.cos(radians);
  const b = C * Math.sin(radians);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  ];
}

function insideGamut(channels) {
  return channels.every(value => value >= 0 && value <= 1);
}

function encode(value) {
  const encoded = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
  return Math.round(encoded * 255).toString(16).padStart(2, '0').toUpperCase();
}

function renderColor(target) {
  const { L, h } = target;
  let C = target.C;
  let channels = linearRgb(L, C, h);
  if (!insideGamut(channels)) {
    let lower = 0;
    let upper = C;
    for (let step = 0; step < 36; step++) {
      const middle = (lower + upper) / 2;
      if (insideGamut(linearRgb(L, middle, h))) lower = middle;
      else upper = middle;
    }
    C = lower;
    channels = linearRgb(L, C, h);
  }
  return { hex: `#${channels.map(encode).join('')}`, L, C: Number(C.toFixed(4)), h };
}

function adjust(core, delta) {
  return {
    L: Number((core.L + delta.dL).toFixed(4)),
    C: Number((core.C + delta.dC).toFixed(4)),
    h: (core.h + delta.dh + 360) % 360
  };
}

const palette = {
  model: spec.model,
  neutrals: spec.neutrals,
  families: spec.families.map(family => ({
    name: family.name,
    core: renderColor(family.core),
    light: renderColor(adjust(family.core, family.light)),
    dark: renderColor(adjust(family.core, family.dark))
  }))
};

fs.writeFileSync(path.join(dir, 'palette.json'), `${JSON.stringify(palette, null, 2)}\n`);
console.log('Palette generated from five OKLCH anchors.');
