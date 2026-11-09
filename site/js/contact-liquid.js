// Liquid Contact button: the gooey split mixed with the liquid outline (both from his recordings in
// reference/buttons, motion plan docs/motion/contact-liquid). One engine for the lab, the tuner and,
// once he picks settings, the site.
//
// What it does:
//   Rest      the two Figma pills, crisp, touching, no neck and no colour showing.
//   Inside    the pointer pushes the outline out around it, like a finger inside a balloon.
//   Outside   near an edge, the pointer presses a dent into the body and the hidden colour shows in it.
//   Leaving   the edge sticks to the pointer, stretches after it, lets go and wobbles back.
//   Hover     the mail circle pulls away; while it moves the two shapes melt together and snap apart.
//   Press     both shapes squeeze in.
//
// Every value lives in CFG and is set by the tuner. Springs are set as speed (seconds to settle) and
// bounce (0 none, 0.9 a lot) and turned into per frame constants at a fixed 60 Hz, so a seek(t) replay
// is frame exact. Reduced motion: never starts, the plain CSS borders stay.

export const DEFAULTS = {
  // Shape
  line: 3, restGap: 0, gooRest: 0, gooHover: 9, gooT: 0.7, neck: 26, cutoff: 12,
  // Colours
  lineColor: "#e8e7ee", bodyColor: "#040405", hiddenColor: "#22d3ee", hiddenOn: 1, hiddenAlpha: 1,
  // Pointer inside: the outline bulges toward it
  bulge: 18, reach: 54, outT: 0.36, outBounce: 0.6, ripple: 0.04,
  // Pointer leaving: the edge sticks and stretches after it
  drag: 24, dragSpan: 30, release: 52,
  // Pointer outside: a dent with the hidden colour in it
  dent: 22, dentReach: 52, dentSpan: 44, dentT: 0.55, dentBounce: 0.35,
  // Mail circle
  pull: 32, pullDir: 0, follow: 0.12, tilt: 18, iconT: 0.38, iconBounce: 0.65,
  // Press
  squeeze: 5, pressT: 0.26, pressBounce: 0.4,
};
export const CFG = { ...DEFAULTS };

const HZ = 60, DT = 1 / HZ, PAD = 80, NS = "http://www.w3.org/2000/svg";

// Speed and bounce to the per frame spring v = (v + (target - x) * k) * d, semi implicit at 60 Hz.
export function springK(T, bounce) {
  const w = (2 * Math.PI) / Math.max(0.12, T), zeta = 1 - Math.min(0.95, bounce);
  return { k: Math.min(0.9, (w * DT) ** 2), d: Math.max(0, Math.exp(-2 * zeta * w * DT)) };
}

let uid = 0;
function makeFilters(svg, id) {
  const defs = document.createElementNS(NS, "defs");
  const one = (name, ring) => `<filter id="${id}-${name}" x="-20%" y="-40%" width="140%" height="180%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="b"/>
    <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12" result="g"/>
    ${ring ? `<feMorphology in="g" operator="erode" radius="3" result="i"/><feComposite in="g" in2="i" operator="out"/>` : ""}</filter>`;
  defs.innerHTML = one("fill", false) + one("ring", true);
  svg.appendChild(defs);
  return [...defs.querySelectorAll("filter")];
}

// A pill outline sampled every few px, with rest position, outward normal and arc length per point.
function ring(box) {
  const { x, y, w, h } = box, r = Math.min(w, h) / 2, str = Math.max(0, w - 2 * r), arc = Math.PI * r;
  const tot = 2 * str + 2 * arc, n = Math.max(40, Math.round(tot / 4)), P = [];
  for (let i = 0; i < n; i++) {
    const s = (i / n) * tot; let px, py, nx, ny;
    if (s < str) { px = x + r + s; py = y; nx = 0; ny = -1; }
    else if (s < str + arc) { const a = (s - str) / r - Math.PI / 2; nx = Math.cos(a); ny = Math.sin(a); px = x + w - r + nx * r; py = y + r + ny * r; }
    else if (s < 2 * str + arc) { px = x + w - r - (s - str - arc); py = y + h; nx = 0; ny = 1; }
    else { const a = (s - 2 * str - arc) / r + Math.PI / 2; nx = Math.cos(a); ny = Math.sin(a); px = x + r + nx * r; py = y + r + ny * r; }
    P.push({ rx: px, ry: py, nx, ny, s, ox: 0, oy: 0, vx: 0, vy: 0, d: 0, dv: 0 });
  }
  return { box, P, len: tot, r, caught: false, anchor: 0, inside: false, tx: 0, ty: 0 };
}

function inPill(b, tx, ty, px, py, m = 0) {
  const r = Math.min(b.w, b.h) / 2, x = px - tx, y = py - ty;
  const cx = Math.max(b.x + r, Math.min(b.x + b.w - r, x)), cy = Math.max(b.y + r, Math.min(b.y + b.h - r, y));
  return Math.hypot(x - cx, y - cy) <= r + m;
}

function smooth(pts) {
  const n = pts.length; let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n], e = pts[(i + 2) % n];
    d += `C${(b[0] + (c[0] - a[0]) / 6).toFixed(2)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(2)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(2)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(2)} ${c[0].toFixed(2)} ${c[1].toFixed(2)}`;
  }
  return d + "Z";
}

export function liquid(btn, cfg = CFG) {
  const icon = btn.querySelector(".button__icon"), label = btn.querySelector(".button__label"), img = icon.querySelector("img");
  const id = `liq${++uid}`;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "liquid-layer"); svg.setAttribute("aria-hidden", "true");
  const [fFill, fRing] = makeFilters(svg, id);
  const g = (cls, filter) => { const el = document.createElementNS(NS, "g"); el.setAttribute("class", cls); el.setAttribute("filter", `url(#${id}-${filter})`); svg.appendChild(el); return el; };
  const gHidden = g("liquid-hidden", "fill"), gBody = g("liquid-body", "fill"), gLine = g("liquid-line", "ring");
  const paths = (grp) => [0, 1].map(() => { const p = document.createElementNS(NS, "path"); grp.appendChild(p); return p; });
  const pHidden = paths(gHidden), pBody = paths(gBody), pLine = paths(gLine);
  // At rest each pill keeps its own outline, as in Figma; the merged outline only fades in while hovered,
  // so the two shapes melt together and snap apart in motion but never rest joined.
  const gSep = document.createElementNS(NS, "g"); gSep.setAttribute("class", "liquid-line-sep"); svg.insertBefore(gSep, gLine);
  const pSep = [0, 1].map(() => { const w = document.createElementNS(NS, "g"); w.setAttribute("filter", `url(#${id}-ring)`); const p = document.createElementNS(NS, "path"); w.appendChild(p); gSep.appendChild(w); return p; });
  const debug = document.createElementNS(NS, "g"); debug.setAttribute("class", "liquid-debug"); svg.appendChild(debug);
  btn.prepend(svg); btn.classList.add("is-liquid");

  let rings, W, H;
  const measure = () => {
    W = btn.offsetWidth; H = btn.offsetHeight;
    svg.setAttribute("viewBox", `${-PAD} ${-PAD} ${W + 2 * PAD} ${H + 2 * PAD}`);
    svg.style.cssText = `position:absolute;left:${-PAD}px;top:${-PAD}px;width:${W + 2 * PAD}px;height:${H + 2 * PAD}px;overflow:visible;pointer-events:none`;
    const box = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    rings = [ring(box(icon)), ring(box(label))];
  };
  measure();
  const st = { g: 0, gv: 0, fy: 0, fyv: 0, q: 0, qv: 0, h: 0, over: false };

  function reset() {
    for (const R of rings) { R.caught = false; R.inside = false; for (const p of R.P) { p.ox = p.oy = p.vx = p.vy = p.d = p.dv = 0; } }
    Object.assign(st, { g: 0, gv: 0, fy: 0, fyv: 0, q: 0, qv: 0, h: 0, over: false });
  }

  function step(ptr) {
    const c = cfg, sIcon = springK(c.iconT, c.iconBounce), sOut = springK(c.outT, c.outBounce), sDent = springK(c.dentT, c.dentBounce), sPress = springK(c.pressT, c.pressBounce);
    const [Ri, Rl] = rings;
    const px = ptr ? ptr.x : -1e5, py = ptr ? ptr.y : -1e5, down = !!(ptr && ptr.down);
    // The circle sits restGap further out at rest; it pulls further while hovered.
    const over = !!ptr && (inPill(Ri.box, Ri.tx, Ri.ty, px, py, 4) || inPill(Rl.box, 0, 0, px, py, 4));
    st.over = over;
    const dir = c.pullDir === 1 ? 1 : c.pullDir === 2 ? (px < W * 0.5 ? 1 : -1) : -1;
    st.gv = (st.gv + ((over ? c.pull * dir : 0) - st.g) * sIcon.k) * sIcon.d; st.g += st.gv;
    const fyT = over ? (py - (Ri.box.y + Ri.box.h / 2)) * c.follow : 0;
    st.fyv = (st.fyv + (fyT - st.fy) * sIcon.k) * sIcon.d; st.fy += st.fyv;
    st.qv = (st.qv + ((down && over ? c.squeeze : 0) - st.q) * sPress.k) * sPress.d; st.q += st.qv;
    st.h += ((over ? 1 : 0) - st.h) * (1 - Math.exp(-DT / Math.max(0.05, c.gooT / 3)));
    Ri.tx = -c.restGap + st.g; Ri.ty = st.fy; Rl.tx = 0; Rl.ty = 0;

    for (const R of rings) {
      const P = R.P, n = P.length, tx = R.tx, ty = R.ty;
      const inside = !!ptr && inPill(R.box, tx, ty, px, py, 0);
      let j = 0, best = 1e9;
      for (let i = 0; i < n; i++) { const dd = Math.hypot(P[i].rx + tx - px, P[i].ry + ty - py); if (dd < best) { best = dd; j = i; } }
      // Leaving from inside catches the edge; it lets go past the release distance or when the pointer comes back in.
      if (R.inside && !inside && ptr && c.drag > 0 && !down) { R.caught = true; R.anchor = j; }
      if (R.caught && (inside || !ptr || best > c.release)) R.caught = false;
      R.inside = inside;
      let vx = 0, vy = 0;
      if (R.caught) {
        R.anchor = j; const A = P[j];
        vx = px - (A.rx + tx); vy = py - (A.ry + ty);
        const m = Math.hypot(vx, vy); if (m > c.drag && m > 0) { vx *= c.drag / m; vy *= c.drag / m; }
      }
      const near = !inside && !R.caught && ptr && best < c.dentReach ? 1 - best / c.dentReach : 0;
      for (let i = 0; i < n; i++) {
        const p = P[i], ax = p.rx + tx, ay = p.ry + ty, dp = Math.hypot(ax - px, ay - py);
        // Outline target: bulge toward a pointer inside, stretch after a caught pointer, squeeze on press.
        let gx = -p.nx * st.q, gy = -p.ny * st.q;
        if (inside && !down) { const a = c.bulge * Math.exp(-(dp * dp) / (c.reach * c.reach)); gx += p.nx * a; gy += p.ny * a; }
        if (R.caught) {
          let da = Math.abs(p.s - P[R.anchor].s); da = Math.min(da, R.len - da);
          const f = Math.exp(-(da * da) / (c.dragSpan * c.dragSpan)); gx += vx * f; gy += vy * f;
        }
        const pv = P[(i - 1 + n) % n], nx = P[(i + 1) % n];
        const rx = (pv.ox + nx.ox) / 2 - p.ox, ry = (pv.oy + nx.oy) / 2 - p.oy;
        p.vx = (p.vx + (gx - p.ox) * sOut.k + rx * c.ripple) * sOut.d;
        p.vy = (p.vy + (gy - p.oy) * sOut.k + ry * c.ripple) * sOut.d;
        // Dent depth: pressed in by a pointer just outside, spread along the edge.
        const dT = near * c.dent * Math.exp(-(dp * dp) / (c.dentSpan * c.dentSpan));
        const rd = (pv.d + nx.d) / 2 - p.d;
        p.dv = (p.dv + (dT - p.d) * sDent.k + rd * c.ripple) * sDent.d;
      }
      for (const p of P) { p.ox += p.vx; p.oy += p.vy; p.d += p.dv; }
    }
  }

  function paint(showDebug = false) {
    const c = cfg, blur = c.gooRest + (c.gooHover - c.gooRest) * st.h;
    for (const f of [fFill, fRing]) {
      f.children[0].setAttribute("stdDeviation", blur.toFixed(2));
      f.children[1].setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${c.neck} ${-c.cutoff}`);
    }
    fRing.children[2].setAttribute("radius", c.line);
    gHidden.style.display = c.hiddenOn ? "" : "none";
    gHidden.setAttribute("fill", c.hiddenColor); gHidden.setAttribute("opacity", c.hiddenAlpha);
    gBody.setAttribute("fill", c.bodyColor); gLine.setAttribute("fill", c.lineColor); gSep.setAttribute("fill", c.lineColor);
    // Sequential crossfade, so one outline is always at full strength and nothing reads as a dim ghost.
    const mix = Math.min(1, Math.max(0, (st.h - 0.03) / 0.4));
    gLine.setAttribute("opacity", Math.min(1, mix * 2).toFixed(3)); gSep.setAttribute("opacity", Math.min(1, 2 - mix * 2).toFixed(3));
    rings.forEach((R, k) => {
      const O = R.P.map((p) => [p.rx + R.tx + p.ox, p.ry + R.ty + p.oy]);
      // The body is the outline pulled in by the dent, plus a hair so no colour fringe shows at rest.
      const B = R.P.map((p, i) => [O[i][0] - p.nx * (p.d - 0.6), O[i][1] - p.ny * (p.d - 0.6)]);
      const dO = smooth(O);
      pHidden[k].setAttribute("d", dO); pLine[k].setAttribute("d", dO); pSep[k].setAttribute("d", dO); pBody[k].setAttribute("d", smooth(B));
    });
    icon.style.transform = `translate(${(Rpos().tx).toFixed(2)}px, ${st.fy.toFixed(2)}px)`;
    img.style.transform = `rotate(${(c.pull ? -(st.g / c.pull) * c.tilt * (c.pullDir === 1 ? -1 : 1) : 0).toFixed(2)}deg)`;
    debug.innerHTML = "";
    if (showDebug) {
      for (const R of rings) {
        const rest = smooth(R.P.map((p) => [p.rx + R.tx, p.ry + R.ty]));
        debug.insertAdjacentHTML("beforeend", `<path d="${rest}" fill="none" stroke="#ff5aa5" stroke-width="1" stroke-dasharray="3 3"/>`);
        if (R.caught) { const A = R.P[R.anchor]; debug.insertAdjacentHTML("beforeend", `<circle cx="${A.rx + R.tx + A.ox}" cy="${A.ry + R.ty + A.oy}" r="4" fill="#ffd34d"/>`); }
      }
      if (lastPtr) debug.insertAdjacentHTML("beforeend", `<circle cx="${lastPtr.x}" cy="${lastPtr.y}" r="${c.reach}" fill="none" stroke="#7cf" stroke-width="1"/><circle cx="${lastPtr.x}" cy="${lastPtr.y}" r="${c.dentReach}" fill="none" stroke="#7cf" stroke-width="1" stroke-dasharray="2 4"/>`);
    }
  }
  const Rpos = () => rings[0];
  let lastPtr = null;
  const stepTracked = (ptr) => { lastPtr = ptr; step(ptr); };

  return { btn, measure, reset, step: stepTracked, paint, state: st, rings: () => rings, filters: [fFill, fRing] };
}

// A scripted pointer pass through every state, in button fractions (x of width, y of height), for the lab
// render and the tuner's demo replay. [time s, x, y, down]
export const DEMO = [
  [0, 0.1, -1.6, 0], [0.5, 0.16, -0.5, 0], [0.9, 0.2, -0.12, 0], [1.3, 0.24, 0.25, 0], [2.0, 0.55, 0.45, 0],
  [2.6, 0.82, 0.62, 0], [3.0, 0.78, 1.05, 0], [3.5, 0.72, 1.6, 0], [4.1, 0.72, 2.6, 0], [4.6, 0.5, 1.25, 0],
  [5.0, 0.5, 1.12, 0], [5.4, 0.48, 0.5, 0], [5.6, 0.48, 0.5, 1], [6.3, 0.48, 0.5, 1], [6.5, 0.48, 0.5, 0],
  [7.1, 1.15, 0.45, 0], [7.6, 1.5, 0.4, 0], [8.0, 1.9, 0.4, 0], [8.25, 1.9, -1.6, 0], [8.5, 0.1, -1.6, 0], [9.0, 0.1, -1.6, 0],
];
export function demoAt(t, W, H) {
  const T = DEMO[DEMO.length - 1][0], u = ((t % T) + T) % T;
  let i = 0; while (i < DEMO.length - 2 && DEMO[i + 1][0] <= u) i++;
  const [t0, x0, y0, d0] = DEMO[i], [t1, x1, y1] = DEMO[i + 1], f = (u - t0) / (t1 - t0), e = f * f * (3 - 2 * f);
  return { x: (x0 + (x1 - x0) * e) * W, y: (y0 + (y1 - y0) * e) * H, down: !!d0 };
}

// Runs every .button under root on live pointer input. speed and source are for the tuner only.
export function startLiquid(root = document, { cfg = CFG, speed = () => 1, source = null, debug = () => false, force = false } = {}) {
  if (!force && matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const units = [...root.querySelectorAll(".button")].map((b) => liquid(b, cfg));
  const ptr = new Map(); let down = false;
  const track = (e) => { for (const u of units) { const b = u.btn.getBoundingClientRect(), k = b.width / u.btn.offsetWidth || 1; ptr.set(u, { x: (e.clientX - b.left) / k, y: (e.clientY - b.top) / k, down }); } };
  addEventListener("pointermove", track, { passive: true });
  addEventListener("pointerdown", (e) => { down = true; track(e); });
  addEventListener("pointerup", (e) => { down = false; track(e); });
  addEventListener("pointercancel", () => { down = false; units.forEach((u) => ptr.set(u, null)); });
  document.documentElement.addEventListener("pointerleave", () => units.forEach((u) => ptr.set(u, null)));
  addEventListener("resize", () => units.forEach((u) => u.measure()));
  let last = performance.now(), acc = 0, clock = 0;
  const loop = (now) => {
    acc += Math.min(0.1, (now - last) / 1000) * speed(); last = now;
    while (acc >= DT) { clock += DT; units.forEach((u) => u.step(source ? source(u, clock) : ptr.get(u) || null)); acc -= DT; }
    units.forEach((u) => u.paint(debug()));
    requestAnimationFrame(loop);
  };
  units.forEach((u) => u.paint());
  requestAnimationFrame(loop);
  return { units, ptr };
}
