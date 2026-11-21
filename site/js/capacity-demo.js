// Capacity card demo on the framework page (Personalized timeline, node 5812:17089). His pick, 16 Nov:
// option A. The panel starts empty, Set your capacity types on, the hours and buttons rise in, the
// captions type on, then a cursor (his left_ptr.svg) clicks right, right, left, left (6, 7, 8, 7, 6 hours,
// about 4, 4, 5, 4, 4 Action Items) and disappears in place. Plays once when the card is fully on screen.
// Reduced motion: nothing mounts and the card is the export at 6 hours.
// Pure function of time: seek(t) paints frame t (docs/motion/capacity-stepper/, lab copy in
// site/motion-lab/capacity-demo/options.js).
// Button states are Mondai's Secondary button from his library screenshot (13 Nov). Hours to Action
// Items is his rule (13 Nov): the count steps up every couple of hours.

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const range = (t, a, b) => clamp((t - a) / (b - a));
function cubicBezier(x1, y1, x2, y2) {
  const bx = (u) => 3 * x1 * u * (1 - u) ** 2 + 3 * x2 * u * u * (1 - u) + u ** 3;
  const by = (u) => 3 * y1 * u * (1 - u) ** 2 + 3 * y2 * u * u * (1 - u) + u ** 3;
  return (p) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let lo = 0, hi = 1, u = p;
    for (let i = 0; i < 40; i++) { u = (lo + hi) / 2; if (bx(u) < p) lo = u; else hi = u; }
    return by(u);
  };
}

const NODE = "5812:17089";
const IMG_W = 616, IMG_H = 596; // the @2x export's own pixels; every position below is in these
const G = {
  num: { cx: 307.2, top: 224, h: 128, gap: 0.095, patch: [252, 210, 366, 366] },
  items: { cx: 239.0, top: 425.2, h: 8.2, gap: 0.177, patch: [235, 421, 245, 435] },
  btn: { d: 56, stroke: 1.25, patchD: 64, chevR: 19, L: [188, 288], R: [427.5, 288] },
  panel: { x0: 106, y0: 108, x1: 510, y1: 488, r: 26 },
  label: { box: [200, 157, 414, 181], x0: 206, x1: 408, chars: 17, caret: "#66d26c" },
  hours: { box: [222, 396, 370, 416], x0: 228, x1: 364, chars: 12, caret: "#dee1dd" },
  line: { box: [172, 419, 444, 439], x0: 178, x1: 437, chars: 27, caret: "#989c98", digitAt: 6 },
};
const HEEBO_FIG = 0.728, PLEX_FIG = 0.698; // ink height of "6" and "4" in em
const STATE = {
  default: { ring: "#5c675d", veil: 0 },
  hover: { ring: "#767c74", veil: 0 },
  pressed: { ring: "#434942", veil: 0.31 }, // the arrow under a 0.31 veil of the panel reads #a4aea3
};
const HOURS_TO_ITEMS = { 6: 4, 7: 4, 8: 5 };
const glide = cubicBezier(0.33, 0, 0.18, 1);
const emphasized = cubicBezier(0.05, 0.7, 0.1, 1);

// Timeline (seconds)
const S = 1.25; // cursor starts
const PRESS = [
  { side: "R", down: S + 1.07, up: S + 1.21, to: 7 },
  { side: "R", down: S + 1.57, up: S + 1.71, to: 8 },
  { side: "L", down: S + 2.95, up: S + 3.09, to: 7 },
  { side: "L", down: S + 3.45, up: S + 3.59, to: 6 },
];
const MOVES = [
  { t0: S, t1: S + 0.9, from: [700, 560], via: [575, 380], to: [440, 304] },
  { t0: S + 2.05, t1: S + 2.63, from: [440, 304], via: [320, 368], to: [200, 304] },
];
const HIDE_AT = S + 3.59 + 0.55, HIDE_DUR = 0.22;
export const DUR = HIDE_AT + HIDE_DUR + 0.5;

const bez = (a, b, c, p) => (1 - p) ** 2 * a + 2 * (1 - p) * p * b + p * p * c;
const pct = (x, total) => `${(x / total) * 100}%`;
const cq = (x) => `${(x / IMG_W) * 100}cqw`;
function place(el, x0, y0, x1, y1) {
  Object.assign(el.style, { left: pct(x0, IMG_W), top: pct(y0, IMG_H), width: pct(x1 - x0, IMG_W), height: pct(y1 - y0, IMG_H) });
}
const make = (cls, parent) => { const el = document.createElement("div"); el.className = cls; parent.appendChild(el); return el; };
function crop(parent, src, [x0, y0, x1, y1], cls = "capdemo__crop") {
  const el = make(cls, parent);
  Object.assign(el.style, { inset: "0", backgroundImage: `url("${src}")`, backgroundSize: "100% 100%",
    clipPath: `inset(${pct(y0, IMG_H)} ${pct(IMG_W - x1, IMG_W)} ${pct(IMG_H - y1, IMG_H)} ${pct(x0, IMG_W)})` });
  return el;
}
// The panel as this browser decodes the export, so patches never show as a box
function panelColour(src) {
  try {
    const im = new Image(); im.src = src;
    if (!im.complete || !im.naturalWidth) return "#080808";
    const c = document.createElement("canvas"); c.width = 1; c.height = 1;
    const ctx = c.getContext("2d");
    ctx.drawImage(im, 300 * im.naturalWidth / IMG_W, 204 * im.naturalHeight / IMG_H, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  } catch (e) { return "#080808"; }
}

export function mount(img) {
  const src = img.currentSrc || img.src;
  const box = document.createElement("div");
  box.className = "capdemo";
  box.setAttribute("aria-hidden", "true");
  img.parentElement.appendChild(box); // last child, so it never changes the spacing rules between the section's own items
  box.style.setProperty("--capdemo-panel", panelColour(src));
  const p = G.panel, n = G.num, it = G.items, b = G.btn;

  // An empty panel; the label and captions are revealed from the export's own pixels
  const cover = make("capdemo__patch", box);
  place(cover, p.x0 + 3, p.y0 + 3, p.x1 - 3, p.y1 - 3);
  cover.style.borderRadius = cq(p.r - 3);
  const typed = {};
  for (const k of ["label", "hours", "line"]) {
    const g = G[k], el = crop(box, src, g.box), caret = make("capdemo__caret", box);
    const h = g.box[3] - g.box[1] - 8;
    place(caret, 0, g.box[1] + 4, (g.x1 - g.x0) / g.chars * 0.8, g.box[1] + 4 + h);
    caret.style.background = g.caret;
    typed[k] = { el, caret, g };
  }
  const numPatch = make("capdemo__patch", box), itemsPatch = make("capdemo__patch", box);
  place(numPatch, ...n.patch); place(itemsPatch, ...it.patch);
  const btn = {};
  for (const side of ["L", "R"]) {
    const [cx, cy] = b[side];
    const wrap = make("capdemo__btnwrap", box);
    wrap.style.inset = "0";
    const patch = make("capdemo__patch", wrap);
    patch.style.borderRadius = "50%";
    place(patch, cx - b.patchD / 2, cy - b.patchD / 2, cx + b.patchD / 2, cy + b.patchD / 2);
    const ring = make("capdemo__btn", wrap);
    place(ring, cx - b.d / 2, cy - b.d / 2, cx + b.d / 2, cy + b.d / 2);
    ring.style.borderWidth = cq(b.stroke);
    const chev = crop(wrap, src, [0, 0, IMG_W, IMG_H], "capdemo__chev");
    chev.style.clipPath = `circle(${cq(b.chevR)} at ${pct(cx, IMG_W)} ${pct(cy, IMG_H)})`;
    const dim = make("capdemo__dim", wrap);
    place(dim, cx - b.chevR, cy - b.chevR, cx + b.chevR, cy + b.chevR);
    btn[side] = { wrap, ring, dim, last: "" };
  }
  const num = make("capdemo__num", box);
  const items = make("capdemo__items", box);
  const nf = n.h / HEEBO_FIG, itf = it.h / PLEX_FIG;
  Object.assign(num.style, { left: pct(n.cx, IMG_W), fontSize: cq(nf), top: `calc(${pct(n.top, IMG_H)} - ${cq(nf * n.gap)})`, whiteSpace: "nowrap" });
  // Drawn at ten times the size and scaled down, so a 6 px digit on a phone keeps its baseline
  Object.assign(items.style, { left: pct(it.cx, IMG_W), fontSize: cq(itf * 10), top: `calc(${pct(it.top, IMG_H)} - ${cq(itf * it.gap)})`, transform: "translateX(-50%) scale(0.1)", transformOrigin: "50% 0", whiteSpace: "nowrap" });
  const cursor = document.createElement("img");
  cursor.className = "capdemo__cursor";
  cursor.src = new URL("../assets/framework/capacity-cursor.svg", import.meta.url).href;
  cursor.alt = "";
  box.appendChild(cursor);

  function cursorAt(t) {
    let pos = MOVES[0].from;
    for (const m of MOVES) {
      if (t < m.t0) break;
      const q = glide(range(t, m.t0, m.t1));
      pos = [bez(m.from[0], m.via[0], m.to[0], q), bez(m.from[1], m.via[1], m.to[1], q)];
    }
    return pos;
  }
  const valueAt = (t) => { let v = 6; for (const q of PRESS) if (t >= q.up) v = q.to; return v; };
  function pressDepth(t) {
    let d = 0;
    for (const q of PRESS) d = Math.max(d, Math.min(range(t, q.down, q.down + 0.05), 1 - range(t, q.up, q.up + 0.07)));
    return d;
  }
  function stateOf(side, t, tip) {
    for (const q of PRESS) if (q.side === side && t >= q.down && t < q.up) return "pressed";
    const [cx, cy] = b[side];
    return Math.hypot(tip[0] - cx, tip[1] - cy) <= b.d / 2 ? "hover" : "default";
  }
  function typeOn(k, t, t0, dur) {
    const { el, caret, g } = typed[k], step = (g.x1 - g.x0) / g.chars;
    const c = Math.floor(clamp((t - t0) / dur) * g.chars + 1e-6);
    const shown = g.x0 + c * step;
    el.style.clipPath = `inset(${pct(g.box[1], IMG_H)} ${pct(IMG_W - (c ? shown : g.box[0]), IMG_W)} ${pct(IMG_H - g.box[3], IMG_H)} ${pct(g.box[0], IMG_W)})`;
    caret.style.opacity = t >= t0 && t < t0 + dur + 0.12 ? 1 : 0;
    caret.style.left = pct(shown + 1, IMG_W);
    return c;
  }

  let lastV = -1;
  function seek(t) {
    t = clamp(t, 0, DUR);
    typeOn("label", t, 0.08, 0.42);
    const a = emphasized(range(t, 0.48, 0.8)), c = emphasized(range(t, 0.54, 0.86));
    num.style.opacity = a;
    num.style.transform = `translate(-50%, ${cq(8 * (1 - a))})`;
    btn.L.wrap.style.opacity = c; btn.R.wrap.style.opacity = c;
    typeOn("hours", t, 0.7, 0.22);
    items.style.opacity = typeOn("line", t, 0.78, 0.3) > G.line.digitAt ? 1 : 0;

    const tip = cursorAt(t), v = valueAt(t);
    if (v !== lastV) { num.textContent = String(v); items.textContent = String(HOURS_TO_ITEMS[v]); lastV = v; }
    for (const side of ["L", "R"]) {
      const s = stateOf(side, t, tip), o = btn[side];
      if (s !== o.last) { o.ring.style.borderColor = STATE[s].ring; o.dim.style.opacity = STATE[s].veil; o.last = s; }
    }
    cursor.style.opacity = t >= S ? 1 - range(t, HIDE_AT, HIDE_AT + HIDE_DUR) : 0;
    cursor.style.transform = `translate(${(tip[0] / IMG_W) * 100}cqw, ${(tip[1] / IMG_W) * 100}cqw) scale(${1 - 0.1 * pressDepth(t)})`;
  }
  function layout() {
    // Custom properties, because the stacked layouts force section children to static and auto size.
    // At tablet his frame crops the card (object-fit: cover), so the overlay takes the whole drawn image, centred on the box.
    let x = img.offsetLeft, y = img.offsetTop, w = img.offsetWidth, h = img.offsetHeight;
    if (getComputedStyle(img).objectFit === "cover") {
      const s = Math.max(w / IMG_W, h / IMG_H), rw = IMG_W * s, rh = IMG_H * s;
      x += (w - rw) / 2; y += (h - rh) / 2; w = rw; h = rh;
    }
    for (const [k, v] of [["--cd-x", x], ["--cd-y", y], ["--cd-w", w], ["--cd-h", h]]) box.style.setProperty(k, `${v}px`);
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
  let started = false;
  const start = () => {
    if (started) return; started = true;
    const demo = mount(img);
    new ResizeObserver(demo.layout).observe(img);
    addEventListener("resize", demo.layout);
    let t0 = null;
    const tick = (now) => {
      if (t0 === null) t0 = now;
      const t = (now - t0) / 1000;
      demo.seek(t);
      if (t < DUR) requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      setTimeout(() => requestAnimationFrame(tick), 300); // a beat after the card is fully in view
    }, { threshold: 0.9 });
    io.observe(img);
  };
  const ready = () => {
    img.loading = "eager";
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener("load", start, { once: true });
  };
  Promise.all([document.fonts.load('700 100px "Heebo"', "678"), document.fonts.load('400 20px "IBM Plex Mono"', "45")]).then(ready, ready);
}
live();
