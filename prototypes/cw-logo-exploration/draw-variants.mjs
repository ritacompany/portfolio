import { writeFileSync } from 'node:fs';

const root = new URL('.', import.meta.url);
const fill = '#DEDEE5';

function point(x, y) { return [x, y]; }
function cubic(a, b, c, d, t) {
  const u = 1 - t;
  return point(
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]
  );
}
function tangent(a, b, c, d, t) {
  const u = 1 - t;
  return point(
    3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]),
    3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1])
  );
}
function fmt(n) { return Number(n.toFixed(2)); }
function list(points) { return points.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join(' L '); }

function ribbon(knots, widths) {
  const left = [];
  const right = [];
  for (let i = 0; i < knots.length - 1; i += 1) {
    const [a, b, c] = knots[i];
    const d = knots[i + 1][0];
    for (let step = 0; step <= 80; step += 1) {
      if (i > 0 && step === 0) continue;
      const t = step / 80;
      const p = cubic(a, b, c, d, t);
      const v = tangent(a, b, c, d, t);
      const length = Math.hypot(v[0], v[1]);
      const normal = point(-v[1] / length, v[0] / length);
      const eased = t * t * (3 - 2 * t);
      const width = widths[i] * (1 - eased) + widths[i + 1] * eased;
      left.push(point(p[0] + normal[0] * width / 2, p[1] + normal[1] * width / 2));
      right.push(point(p[0] - normal[0] * width / 2, p[1] - normal[1] * width / 2));
    }
  }
  const outline = [...left, ...right.reverse()];
  const x = outline.map(p => p[0]);
  const y = outline.map(p => p[1]);
  const minX = Math.min(...x) - 10;
  const minY = Math.min(...y) - 10;
  const maxX = Math.max(...x) + 10;
  const maxY = Math.max(...y) + 10;
  return {
    d: `M ${list(outline)} Z`,
    box: [minX, minY, maxX - minX, maxY - minY].map(fmt).join(' ')
  };
}

function save(name, title, box, markup) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" role="img" aria-label="${title}"><title>${title}</title>${markup}</svg>\n`;
  writeFileSync(new URL(name, root), svg);
}

const taut = [
  [[145, 37], [108, 15], [61, 29]],
  [[39, 79], [16, 132], [28, 194]],
  [[66, 226], [111, 263], [178, 251]],
  [[234, 216], [300, 178], [364, 91]],
  [[408, 18], [409, 64], [406, 132]],
  [[432, 157], [451, 178], [477, 152]],
  [[518, 91], [516, 132], [502, 215]],
  [[536, 239], [575, 264], [646, 190]],
  [[699, 54], [699, 83], [731, 105]],
  [[762, 112], [808, 129], [843, 93]],
  [[880, 72], [880, 72], [880, 72]]
];
const tautShape = ribbon(taut, [6, 31, 41, 34, 6, 35, 6, 42, 6, 32, 5]);
save('01-taut.svg', 'CW monogram, taut ribbon', tautShape.box, `<path d="${tautShape.d}" fill="${fill}"/>`);

const squarePath = 'M 143 42 C 104 17 59 28 39 78 C 23 117 24 174 42 205 C 61 240 93 250 136 250 L 150 250 C 192 248 237 215 275 178 L 410 45 L 410 121 C 410 150 421 167 446 167 L 459 167 C 481 167 498 146 521 104 L 521 191 C 521 230 537 249 564 249 L 578 249 C 617 248 660 179 694 101 L 694 72 L 710 72 L 710 106 C 762 125 809 124 875 77';
save('02-soft-square.svg', 'CW monogram, soft square', '-21 -22 940 320', `<path d="${squarePath}" fill="none" stroke="${fill}" stroke-width="34" stroke-linecap="butt" stroke-linejoin="bevel"/>`);

const balancedPath = 'M 144 42 C 107 19 64 28 43 77 C 20 130 31 203 84 233 C 132 263 196 241 254 200 C 311 160 372 78 417 27 L 424 168 C 428 197 441 214 462 214 C 486 213 515 158 543 91 L 552 183 C 558 214 569 231 591 228 C 630 223 672 146 704 67 C 728 108 783 140 878 76';
save('03-balanced.svg', 'CW monogram, balanced W', '-21 -22 940 330', `<path d="${balancedPath}" fill="none" stroke="${fill}" stroke-width="34" stroke-linecap="butt" stroke-linejoin="bevel"/>`);
