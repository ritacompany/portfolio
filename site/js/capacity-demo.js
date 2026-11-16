// Capacity card cursor demo (docs/motion/capacity-stepper/). The card stays the still export; live
// copies of its two arrow buttons, the hours and the Action Items count sit exactly over it. A cursor
// comes in, presses the right arrow twice (6, 7, 8 hours), the left arrow once (back to 7), then leaves.
// Button states are Mondai's Secondary button: default, hover and pressed, sampled from his library
// screenshot (13 Nov). Hours to Action Items: 6 and 7 about 4, 8 about 5 (his rule, 13 Nov: the count
// steps up every couple of hours).
// Pure function of time: seek(t) paints frame t. Live mode plays once when the card is on screen.
// Reduced motion: nothing mounts, the card stays the export at 6 hours.
import { clamp, range, cubicBezier } from "../lib/motion.js";

const IMG_W = 616, IMG_H = 596; // the @2x export's own pixels; every position below is in these
const NODE = "5812:17089";
export const DUR = 5.2;

// Geometry measured on timeline@2x.webp
const G = {
  num: { cx: 308.5, top: 224, h: 128, patch: [252, 210, 366, 366] },
  items: { cx: 240.2, top: 425, h: 10, patch: [232, 418, 249, 441] },
  btn: { d: 55, stroke: 2, patchD: 64, chevR: 19, L: [188, 288], R: [427.5, 288] },
};
// Mondai Secondary button, sampled from his screenshot: outline, arrow (arrow dimmed by a #060606 veil)
const STATE = {
  default: { ring: "#5c675d", veil: 0 },
  hover: { ring: "#767c74", veil: 0 },
  pressed: { ring: "#434942", veil: 0.31 }, // #f0fae9 under a 0.31 veil of #060606 reads #a4aea3
};
const HOURS_TO_ITEMS = { 6: 4, 7: 4, 8: 5 };

// Timeline (seconds). Presses: down, up. The value changes on release, as a click does.
const PRESS = [
  { side: "R", down: 1.42, up: 1.56, to: 7 },
  { side: "R", down: 1.92, up: 2.06, to: 8 },
  { side: "L", down: 3.36, up: 3.50, to: 7 },
];
const glide = cubicBezier(0.33, 0, 0.18, 1); // quick start, long settle: a hand landing on a target
const leave = cubicBezier(0.45, 0, 0.75, 0.4); // eases out of rest, still moving as it leaves
const MOVES = [
  { t0: 0.35, t1: 1.25, from: [700, 560], via: [560, 360], to: [433, 296], ease: glide },
  { t0: 2.40, t1: 3.10, from: [433, 296], via: [312, 318], to: [193, 296], ease: glide },
  { t0: 3.90, t1: 4.80, from: [193, 296], via: [150, 420], to: [120, 700], ease: leave },
];

const bez = (a, b, c, p) => (1 - p) ** 2 * a + 2 * (1 - p) * p * b + p * p * c;
function cursorAt(t) {
  let pos = MOVES[0].from;
  for (const m of MOVES) {
    if (t < m.t0) break;
    const p = m.ease(range(t, m.t0, m.t1));
    pos = [bez(m.from[0], m.via[0], m.to[0], p), bez(m.from[1], m.via[1], m.to[1], p)];
  }
  return pos;
}
function valueAt(t) {
  let v = 6;
  for (const p of PRESS) if (t >= p.up) v = p.to;
  return v;
}
// 0..1 press depth for the cursor dip: 50 ms in, 70 ms out
function pressDepth(t) {
  let d = 0;
  for (const p of PRESS) d = Math.max(d, Math.min(range(t, p.down, p.down + 0.05), 1 - range(t, p.up, p.up + 0.07)));
  return d;
}
function stateOf(side, t, tip) {
  for (const p of PRESS) if (p.side === side && t >= p.down && t < p.up) return "pressed";
  const [cx, cy] = G.btn[side];
  return Math.hypot(tip[0] - cx, tip[1] - cy) <= G.btn.d / 2 ? "hover" : "default";
}

const pct = (x, total) => `${(x / total) * 100}%`;
const cq = (x) => `${(x / IMG_W) * 100}cqw`;
function place(el, x0, y0, x1, y1) {
  Object.assign(el.style, { left: pct(x0, IMG_W), top: pct(y0, IMG_H), width: pct(x1 - x0, IMG_W), height: pct(y1 - y0, IMG_H) });
}
const make = (cls, parent) => { const el = document.createElement("div"); el.className = cls; parent.appendChild(el); return el; };

const CURSOR_SVG = `<svg class="capdemo__cursor" viewBox="0 0 13 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1 1 L1 16.6 L4.9 12.9 L7.5 18.8 L10.1 17.7 L7.5 11.9 L12.4 11.9 Z" fill="#0a0a0a" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/></svg>`;

export function mount(img) {
  const box = document.createElement("div");
  box.className = "capdemo";
  box.setAttribute("aria-hidden", "true");
  img.insertAdjacentElement("afterend", box);

  // Patches cover the export's own hours, count and buttons
  const n = G.num, it = G.items, b = G.btn;
  place(make("capdemo__patch", box), ...n.patch);
  place(make("capdemo__patch", box), ...it.patch);
  const btn = {};
  for (const side of ["L", "R"]) {
    const [cx, cy] = b[side];
    const patch = make("capdemo__patch", box);
    patch.style.borderRadius = "50%";
    place(patch, cx - b.patchD / 2, cy - b.patchD / 2, cx + b.patchD / 2, cy + b.patchD / 2);
    const ring = make("capdemo__btn", box);
    place(ring, cx - b.d / 2, cy - b.d / 2, cx + b.d / 2, cy + b.d / 2);
    ring.style.borderWidth = cq(b.stroke);
    // The arrow is the export's own pixels, cut out with a circle
    const chev = make("capdemo__chev", box);
    Object.assign(chev.style, { inset: "0", backgroundImage: `url("${img.currentSrc || img.src}")`, backgroundSize: "100% 100%",
      clipPath: `circle(${cq(b.chevR)} at ${pct(cx, IMG_W)} ${pct(cy, IMG_H)})` });
    const dim = make("capdemo__dim", box);
    place(dim, cx - b.chevR, cy - b.chevR, cx + b.chevR, cy + b.chevR);
    btn[side] = { ring, dim, last: "" };
  }
  const num = make("capdemo__num", box);
  const items = make("capdemo__items", box);
  box.insertAdjacentHTML("beforeend", CURSOR_SVG);
  const cursor = box.lastElementChild;

  // Type: font size from the measured glyph height (figure height 0.71 em for Heebo, 0.698 em for Plex Mono)
  const HEEBO_FIG = 0.712, PLEX_FIG = 0.698;
  num.style.fontSize = cq(n.h / HEEBO_FIG);
  items.style.fontSize = cq(it.h / PLEX_FIG);

  function layout() {
    Object.assign(box.style, { left: `${img.offsetLeft}px`, top: `${img.offsetTop}px`, width: `${img.offsetWidth}px`, height: `${img.offsetHeight}px` });
  }
  // Text boxes: line-height 1, so the figure top sits (ascent gap) below the box top; tuned against the export
  const NUM_GAP = 0.146, ITEMS_GAP = 0.152;
  Object.assign(num.style, { left: "0", width: "100%", top: `calc(${pct(n.top, IMG_H)} - ${cq((n.h / HEEBO_FIG) * NUM_GAP)})`, paddingLeft: cq((n.cx - IMG_W / 2) * 2) });
  Object.assign(items.style, { left: "0", width: "100%", top: `calc(${pct(it.top, IMG_H)} - ${cq((it.h / PLEX_FIG) * ITEMS_GAP)})`, paddingLeft: cq((it.cx - IMG_W / 2) * 2) });

  let lastV = -1;
  function seek(t) {
    t = clamp(t, 0, DUR);
    const tip = cursorAt(t), v = valueAt(t);
    if (v !== lastV) { num.textContent = String(v); items.textContent = String(HOURS_TO_ITEMS[v]); lastV = v; }
    for (const side of ["L", "R"]) {
      const s = stateOf(side, t, tip), o = btn[side];
      if (s !== o.last) { o.ring.style.borderColor = STATE[s].ring; o.dim.style.opacity = STATE[s].veil; o.last = s; }
    }
    const k = 1 - 0.1 * pressDepth(t);
    cursor.style.transform = `translate(${cq(tip[0])}, ${pct(tip[1], IMG_H).replace("%", "")}cqh) scale(${k})`;
    cursor.style.transform = `translate(${(tip[0] / IMG_W) * 100}cqw, ${(tip[1] / IMG_W) * 100}cqw) scale(${k})`;
  }
  layout();
  seek(0);
  return { box, seek, layout };
}

// Live mode on the framework page
function live() {
  if (window.__RENDER__) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const img = document.querySelector(`img[data-figma-node="${NODE}"]`);
  if (!img) return;
  const start = () => {
    const demo = mount(img);
    new ResizeObserver(demo.layout).observe(img);
    addEventListener("resize", demo.layout);
    let t0 = null, played = false;
    const tick = (now) => {
      if (t0 === null) t0 = now;
      const t = (now - t0) / 1000;
      demo.seek(t);
      if (t < DUR) requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => {
      if (played || !es.some((e) => e.isIntersecting)) return;
      played = true; io.disconnect();
      setTimeout(() => requestAnimationFrame(tick), 400); // a beat after the card is fully in view
    }, { threshold: 0.9 });
    io.observe(img);
  };
  const ready = () => document.fonts.ready.then(() => (img.complete ? start() : img.addEventListener("load", start, { once: true })));
  Promise.all([document.fonts.load('700 100px "Heebo"', "678"), document.fonts.load('400 20px "IBM Plex Mono"', "45")]).then(ready, ready);
}
live();
