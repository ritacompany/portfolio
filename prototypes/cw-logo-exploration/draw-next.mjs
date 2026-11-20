import { writeFileSync } from 'node:fs';

const here = new URL('.', import.meta.url);
const ink = '#DEDEE5';

function save(name, label, viewBox, content) {
  writeFileSync(new URL(name, here), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${label}"><title>${label}</title>${content}</svg>\n`);
}

// Structure: the horizontal C floor and both W floors share one quiet radius.
// The rising diagonal is the mark's spine, and the outer turns are tighter.
const structure = 'M 153 42 L 129 42 C 76 42 43 71 41 119 L 41 161 C 42 213 69 242 117 245 L 167 245 C 224 245 293 178 404 54 L 413 43 L 413 125 C 413 156 428 173 451 173 L 455 173 C 480 171 502 139 523 107 L 523 191 C 523 226 539 245 568 245 L 577 245 C 617 244 667 166 695 98 L 706 69 C 722 102 758 124 802 124 C 830 124 856 109 879 88';
save('04-structure.svg', 'CW monogram, structured curve', '-9 -13 930 300', `<path d="${structure}" fill="none" stroke="${ink}" stroke-width="34" stroke-linecap="butt" stroke-linejoin="round"/>`);

function point(x, y) { return [x, y]; }
function cubic(a, b, c, d, t) {
  const u = 1 - t;
  return point(
    u*u*u*a[0] + 3*u*u*t*b[0] + 3*u*t*t*c[0] + t*t*t*d[0],
    u*u*u*a[1] + 3*u*u*t*b[1] + 3*u*t*t*c[1] + t*t*t*d[1]
  );
}
function tangent(a, b, c, d, t) {
  const u = 1 - t;
  return point(
    3*u*u*(b[0]-a[0]) + 6*u*t*(c[0]-b[0]) + 3*t*t*(d[0]-c[0]),
    3*u*u*(b[1]-a[1]) + 6*u*t*(c[1]-b[1]) + 3*t*t*(d[1]-c[1])
  );
}
function fmt(n) { return Number(n.toFixed(2)); }
function ribbon(knots, widths) {
  const left = [], right = [];
  for (let i = 0; i < knots.length - 1; i += 1) {
    const [a, b, c] = knots[i], d = knots[i + 1][0];
    for (let step = 0; step <= 80; step += 1) {
      if (i > 0 && step === 0) continue;
      const t = step / 80, p = cubic(a, b, c, d, t), v = tangent(a, b, c, d, t);
      const len = Math.hypot(v[0], v[1]);
      const n = point(-v[1] / len, v[0] / len);
      const eased = t*t*(3-2*t), w = widths[i]*(1-eased) + widths[i+1]*eased;
      left.push(point(p[0]+n[0]*w/2, p[1]+n[1]*w/2));
      right.push(point(p[0]-n[0]*w/2, p[1]-n[1]*w/2));
    }
  }
  const vertices = [...left,...right.reverse()];
  const x = vertices.map(p => p[0]), y = vertices.map(p => p[1]);
  const box = [Math.min(...x)-10,Math.min(...y)-10,Math.max(...x)-Math.min(...x)+20,Math.max(...y)-Math.min(...y)+20].map(fmt).join(' ');
  const d = `M ${vertices.map(p => `${fmt(p[0])} ${fmt(p[1])}`).join(' L ')} Z`;
  return {box,d};
}

// Pressure: a controlled ink rhythm runs through the C and all W turns.
// The crest widths are stronger than in the prior Taut ribbon study.
const pressure = [
  [[145,37],[108,15],[61,29]],
  [[39,79],[16,132],[28,194]],
  [[66,226],[111,263],[178,251]],
  [[234,216],[300,178],[364,91]],
  [[408,18],[409,64],[406,132]],
  [[432,157],[451,178],[477,152]],
  [[518,91],[516,132],[502,215]],
  [[536,239],[575,264],[646,190]],
  [[699,54],[699,83],[731,105]],
  [[762,112],[808,129],[843,93]],
  [[880,72],[880,72],[880,72]]
];
const pressureShape = ribbon(pressure,[12,33,44,36,12,38,12,46,12,33,10]);
save('05-pressure.svg', 'CW monogram, controlled pressure', pressureShape.box, `<path d="${pressureShape.d}" fill="${ink}"/>`);

// Compact: a shorter C rise and a shorter exit give the W more space.
// The C opening and right exit share an upward angle.
const compact = 'M 147 45 C 105 23 59 37 41 83 C 19 136 34 198 74 226 C 111 251 160 249 209 225 C 259 202 318 142 374 75 L 385 62 C 388 103 383 138 396 158 C 408 181 429 184 451 169 C 473 154 489 128 508 102 C 505 141 503 186 517 212 C 530 236 551 246 576 238 C 613 227 650 154 680 80 C 705 112 747 128 785 119 C 810 113 829 99 847 83';
save('06-compact.svg', 'CW monogram, compact gesture', '-9 -13 900 300', `<path d="${compact}" fill="none" stroke="${ink}" stroke-width="35" stroke-linecap="round" stroke-linejoin="round"/>`);
