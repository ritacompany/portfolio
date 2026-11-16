// Capacity card demo, options round (his asks, 16 Nov): three openings for the Set your capacity panel,
// the clicks as right, right, left, left (6, 7, 8, 7, 6 hours), and three endings that never send the
// cursor off an edge. Same live layers as capacity-demo.js; seek(t) paints frame t.
//   entry "type":   the panel is there but empty; its label types on with a caret, the number and buttons
//                   rise in, then the captions type on. Terminal feel, from the panel's own mono type.
//   entry "rise":   the whole panel rises 24 px out of the card and fades up, MD3 emphasized decelerate.
//   entry "signal": the panel resolves out of horizontal slices that jitter and settle, like the glitch
//                   streaks behind it.
//   end "hide":     the cursor rests, then disappears in place, as macOS hides an idle pointer.
//   end "sink":     the cursor drops a few pixels as it fades.
//   end "shrink":   the cursor collapses into its tip.
import { clamp, range, cubicBezier, rng } from "../../lib/motion.js";

const IMG_W = 616, IMG_H = 596;
export const G = {
  num: { cx: 307.2, top: 224, h: 128, gap: 0.095, patch: [252, 210, 366, 366] },
  items: { cx: 239.0, top: 425.2, h: 8.2, gap: 0.177, patch: [235, 421, 245, 435] },
  btn: { d: 56, stroke: 1.25, patchD: 64, chevR: 19, L: [188, 288], R: [427.5, 288] },
  panel: { x0: 106, y0: 108, x1: 510, y1: 488, r: 26 },
  // The panel's own type, for the type on opening: label, hours caption, Action Items line
  label: { box: [200, 157, 414, 181], x0: 206, x1: 408, chars: 17, caret: "#66d26c" },
  hours: { box: [222, 396, 370, 416], x0: 228, x1: 364, chars: 12, caret: "#dee1dd" },
  line: { box: [172, 419, 444, 439], x0: 178, x1: 437, chars: 27, caret: "#989c98", digitAt: 6 },
};
const HEEBO_FIG = 0.728, PLEX_FIG = 0.698;
const STATE = {
  default: { ring: "#5c675d", veil: 0 },
  hover: { ring: "#767c74", veil: 0 },
  pressed: { ring: "#434942", veil: 0.31 },
};
const HOURS_TO_ITEMS = { 6: 4, 7: 4, 8: 5 };
const glide = cubicBezier(0.33, 0, 0.18, 1);
const emphasized = cubicBezier(0.05, 0.7, 0.1, 1); // MD3 emphasized decelerate, for entrances
const accelerate = cubicBezier(0.3, 0, 1, 1);      // MD3 accelerate, for exits
const ENTRY_DUR = { type: 1.45, rise: 0.75, signal: 0.95, none: 0 };

// Click sequence, relative to S (when the cursor starts moving)
function plan(entry, end) {
  const S = ENTRY_DUR[entry] + 0.35;
  const PRESS = [
    { side: "R", down: S + 1.07, up: S + 1.21, to: 7 },
    { side: "R", down: S + 1.57, up: S + 1.71, to: 8 },
    { side: "L", down: S + 2.95, up: S + 3.09, to: 7 },
    { side: "L", down: S + 3.45, up: S + 3.59, to: 6 },
  ];
  const MOVES = [
    { t0: S, t1: S + 0.9, from: [700, 560], via: [575, 380], to: [440, 304], ease: glide },
    { t0: S + 2.05, t1: S + 2.63, from: [440, 304], via: [320, 368], to: [200, 304], ease: glide },
  ];
  const E = S + 3.59; // last release
  const endAt = { hide: E + 0.55, sink: E + 0.35, shrink: E + 0.45 }[end];
  const endDur = { hide: 0.22, sink: 0.6, shrink: 0.28 }[end];
  return { S, PRESS, MOVES, endAt, endDur, DUR: endAt + endDur + 0.5 };
}
export const durationFor = (entry, end) => plan(entry, end).DUR;

const bez = (a, b, c, p) => (1 - p) ** 2 * a + 2 * (1 - p) * p * b + p * p * c;
const pct = (x, total) => `${(x / total) * 100}%`;
const cq = (x) => `${(x / IMG_W) * 100}cqw`;
function place(el, x0, y0, x1, y1) {
  Object.assign(el.style, { left: pct(x0, IMG_W), top: pct(y0, IMG_H), width: pct(x1 - x0, IMG_W), height: pct(y1 - y0, IMG_H) });
}
const make = (cls, parent) => { const el = document.createElement("div"); el.className = cls; parent.appendChild(el); return el; };
// The export, cut to a rectangle of its own pixels at its own place in the card
function crop(parent, src, [x0, y0, x1, y1], cls = "capdemo__crop") {
  const el = make(cls, parent);
  Object.assign(el.style, { inset: "0", backgroundImage: `url("${src}")`, backgroundSize: "100% 100%",
    clipPath: `inset(${pct(y0, IMG_H)} ${pct(IMG_W - x1, IMG_W)} ${pct(IMG_H - y1, IMG_H)} ${pct(x0, IMG_W)})` });
  return el;
}
const CURSOR_SVG = `<svg class="capdemo__cursor" viewBox="0 0 13 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1 1 L1 16.6 L4.9 12.9 L7.5 18.8 L10.1 17.7 L7.5 11.9 L12.4 11.9 Z" fill="#0a0a0a" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/></svg>`;

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

export function mount(img, { entry = "rise", end = "hide", plateSrc } = {}) {
  const P = plan(entry, end), src = img.currentSrc || img.src;
  const box = make("capdemo", img.parentElement);
  img.insertAdjacentElement("afterend", box);
  box.setAttribute("aria-hidden", "true");
  box.style.setProperty("--capdemo-panel", panelColour(src));
  const p = G.panel;

  // Behind the panel while it moves: the card with the panel taken out (a plate made from the export's
  // own streaks), only during the opening
  const plate = plateSrc && entry !== "type" ? make("capdemo__crop", box) : null;
  if (plate) Object.assign(plate.style, { inset: "0", backgroundImage: `url("${plateSrc}")`, backgroundSize: "100% 100%" });

  // Everything that belongs to the panel moves as one group
  const group = make("capdemo__group", box);
  Object.assign(group.style, { inset: "0" });
  const panelCut = `inset(${pct(p.y0, IMG_H)} ${pct(IMG_W - p.x1, IMG_W)} ${pct(IMG_H - p.y1, IMG_H)} ${pct(p.x0, IMG_W)} round ${cq(p.r)})`;
  const panel = crop(group, src, [0, 0, IMG_W, IMG_H]);
  panel.style.clipPath = panelCut;

  // Type on: an empty panel, then the label and captions are revealed from the export's own pixels
  let cover = null, typed = {};
  if (entry === "type") {
    cover = make("capdemo__patch", group);
    place(cover, p.x0 + 3, p.y0 + 3, p.x1 - 3, p.y1 - 3);
    cover.style.borderRadius = cq(p.r - 3);
    for (const k of ["label", "hours", "line"]) {
      const g = G[k], el = crop(group, src, g.box), caret = make("capdemo__caret", group);
      const h = g.box[3] - g.box[1] - 8;
      place(caret, 0, g.box[1] + 4, (g.x1 - g.x0) / g.chars * 0.8, g.box[1] + 4 + h);
      caret.style.background = g.caret;
      typed[k] = { el, caret, g };
    }
  }

  const n = G.num, it = G.items, b = G.btn;
  const numPatch = make("capdemo__patch", group), itemsPatch = make("capdemo__patch", group);
  place(numPatch, ...n.patch); place(itemsPatch, ...it.patch);
  const btn = {};
  for (const side of ["L", "R"]) {
    const [cx, cy] = b[side];
    const wrap = make("capdemo__btnwrap", group);
    Object.assign(wrap.style, { inset: "0" });
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
    btn[side] = { wrap, patch, ring, dim, last: "" };
  }
  const num = make("capdemo__num", group);
  const items = make("capdemo__items", group);
  const nf = n.h / HEEBO_FIG, itf = it.h / PLEX_FIG;
  Object.assign(num.style, { left: pct(n.cx, IMG_W), fontSize: cq(nf), top: `calc(${pct(n.top, IMG_H)} - ${cq(nf * n.gap)})`, whiteSpace: "nowrap" });
  Object.assign(items.style, { left: pct(it.cx, IMG_W), fontSize: cq(itf * 10), top: `calc(${pct(it.top, IMG_H)} - ${cq(itf * it.gap)})`, transformOrigin: "50% 0", whiteSpace: "nowrap" });

  // Signal: slices of the settled panel, each pushed sideways by a jitter that decays to nothing
  let slices = [];
  if (entry === "signal") {
    const R = rng(7), N = 14, h = (p.y1 - p.y0) / N;
    for (let i = 0; i < N; i++) {
      const y0 = p.y0 + i * h, el = crop(box, src, [p.x0, y0, p.x1, y0 + h + 0.5]);
      slices.push({ el, amp: (R() - 0.5) * 2 * (40 + 60 * R()), freq: 9 + 10 * R(), phase: R() * 6.28, on: 0.05 + 0.4 * R() });
    }
  }

  box.insertAdjacentHTML("beforeend", CURSOR_SVG);
  const cursor = box.lastElementChild;

  function cursorAt(t) {
    let pos = P.MOVES[0].from;
    for (const m of P.MOVES) {
      if (t < m.t0) break;
      const q = m.ease(range(t, m.t0, m.t1));
      pos = [bez(m.from[0], m.via[0], m.to[0], q), bez(m.from[1], m.via[1], m.to[1], q)];
    }
    return pos;
  }
  const valueAt = (t) => { let v = 6; for (const q of P.PRESS) if (t >= q.up) v = q.to; return v; };
  function pressDepth(t) {
    let d = 0;
    for (const q of P.PRESS) d = Math.max(d, Math.min(range(t, q.down, q.down + 0.05), 1 - range(t, q.up, q.up + 0.07)));
    return d;
  }
  function stateOf(side, t, tip) {
    for (const q of P.PRESS) if (q.side === side && t >= q.down && t < q.up) return "pressed";
    const [cx, cy] = b[side];
    return Math.hypot(tip[0] - cx, tip[1] - cy) <= b.d / 2 ? "hover" : "default";
  }
  const vis = (el, o, y = 0) => { el.style.opacity = o; el.style.transform = y ? `translateY(${cq(y)})` : ""; };
  function typeOn(k, t, t0, dur) {
    const { el, caret, g } = typed[k], step = (g.x1 - g.x0) / g.chars;
    const c = Math.floor(clamp((t - t0) / dur) * g.chars + 1e-6); // characters shown
    const shown = g.x0 + c * step;
    el.style.clipPath = `inset(${pct(g.box[1], IMG_H)} ${pct(IMG_W - Math.max(g.box[0], c ? shown : g.box[0]), IMG_W)} ${pct(IMG_H - g.box[3], IMG_H)} ${pct(g.box[0], IMG_W)})`;
    const typing = t >= t0 && t < t0 + dur + 0.12;
    caret.style.opacity = typing ? 1 : 0;
    caret.style.left = pct(shown + 1, IMG_W);
    return c;
  }

  let lastV = -1;
  function seek(t) {
    t = clamp(t, 0, P.DUR);
    // Opening
    let groupO = 1, groupY = 0, numO = 1, numY = 0, btnO = 1, itemsO = 1;
    if (entry === "rise") {
      const q = emphasized(range(t, 0, ENTRY_DUR.rise));
      groupY = 24 * (1 - q); groupO = clamp(range(t, 0, 0.45));
    } else if (entry === "type") {
      typeOn("label", t, 0.1, 0.55);
      const a = range(t, 0.62, 1.02), c = range(t, 0.7, 1.1);
      numO = emphasized(a); numY = 8 * (1 - emphasized(a));
      btnO = emphasized(c);
      typeOn("hours", t, 0.95, 0.3);
      const shown = typeOn("line", t, 1.05, 0.4);
      itemsO = shown > G.line.digitAt ? 1 : 0;
    } else if (entry === "signal") {
      const done = t >= ENTRY_DUR.signal;
      groupO = done ? 1 : 0;
      const decay = 1 - range(t, 0.1, ENTRY_DUR.signal);
      for (const s of slices) {
        const on = t >= s.on * ENTRY_DUR.signal;
        const flick = Math.sin(t * s.freq * 6.28 + s.phase) > 0.35 - 0.6 * (1 - decay); // stutters early, steadies late
        s.el.style.opacity = done ? 0 : on && flick ? 1 : 0;
        const dx = s.amp * decay ** 2 * Math.sign(Math.sin(t * s.freq + s.phase));
        s.el.style.transform = `translateX(${cq(dx)})`;
      }
    }
    if (plate) plate.style.opacity = t < ENTRY_DUR[entry] ? 1 : 0;
    group.style.opacity = groupO;
    group.style.transform = groupY ? `translateY(${cq(groupY)})` : "";
    vis(num, numO); num.style.transform = `translate(-50%, ${cq(numY)})`;
    btn.L.wrap.style.opacity = btnO; btn.R.wrap.style.opacity = btnO;
    items.style.opacity = itemsO;
    items.style.transform = "translateX(-50%) scale(0.1)";

    const tip = cursorAt(t), v = valueAt(t);
    if (v !== lastV) { num.textContent = String(v); items.textContent = String(HOURS_TO_ITEMS[v]); lastV = v; }
    for (const side of ["L", "R"]) {
      const s = stateOf(side, t, tip), o = btn[side];
      if (s !== o.last) { o.ring.style.borderColor = STATE[s].ring; o.dim.style.opacity = STATE[s].veil; o.last = s; }
    }
    // Ending
    let k = 1 - 0.1 * pressDepth(t), co = t >= P.S ? 1 : 0, cy = 0;
    const e = range(t, P.endAt, P.endAt + P.endDur);
    if (end === "hide") co *= 1 - e;
    if (end === "sink") { co *= 1 - accelerate(e); cy = 14 * accelerate(e); }
    if (end === "shrink") { k *= 1 - accelerate(e); co *= e < 1 ? 1 : 0; }
    cursor.style.opacity = co;
    cursor.style.transform = `translate(${(tip[0] / IMG_W) * 100}cqw, ${((tip[1] + cy) / IMG_W) * 100}cqw) scale(${k})`;
  }
  function layout() {
    Object.assign(box.style, { left: `${img.offsetLeft}px`, top: `${img.offsetTop}px`, width: `${img.offsetWidth}px`, height: `${img.offsetHeight}px` });
  }
  layout();
  seek(0);
  return { box, seek, layout, DUR: P.DUR };
}
