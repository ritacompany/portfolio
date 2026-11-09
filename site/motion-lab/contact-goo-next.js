// Liquid Contact button (components.css .button), both of his Framer recordings in one: the gooey
// split and the liquid outline (reference/buttons/ on main, read frame by frame). His words, 9 Nov:
// the left part separates on hover, then with the cursor on the main part of the button the outline
// does the liquid effect, gooey on the way, no colour behind it.
// This file is the next site/js/contact-goo.js, byte for byte: it lives in the motion lab until his
// yes, then it is copied over (the site review gate, docs/SITE_BUILD_PLAN.md).
//
// How it draws: the two pill borders go transparent and one SVG behind the content paints the icon
// circle, the label pill and a neck between them filled; one filter blurs, thresholds and erodes them
// so only the outline of their union shows. The label pill is a membrane, a ring of points on springs.
//
// What it does:
//   Rest     the Figma default exactly: two outlined pills, the circle crossing the pill by 3 px, each
//            with its own ring (his ask, 9 Nov: at rest the footer looks like the default).
//   Hover    the two rings melt into one body as the circle tucks in, then the circle pulls away along
//            the gooey recording's own per frame curve, the neck thins to a thread and snaps a little
//            past half way, the circle overshoots and settles; the icon tips. Leave is the same move
//            back: the circle lands, the body melts around it, then the two rings separate again.
//   Inside   the outline near the pointer bulges outward over it and the hump follows the pointer; the
//            far edge moves a little too (liquid recording, pointer inside).
//   Leaving  the edge sticks to the pointer, stretches after it into a soft point, lets go past the
//            release distance and wobbles back in about 0.4 s (liquid recording, pointer out).
//   Near     just outside an edge, the body presses in, deeper than the outline, and the colour behind
//            shows in the gap, as the cyan did in the reference. Where that gap reaches the letters the
//            letters take their own colour (his idea, 9 Nov). Both colours and the depth are settings;
//            hiddenOn 0 turns the colour off and leaves the outline moving on its own.
//   Press    both shapes squeeze in.
//   Text     never moves. Reduced motion: never starts, the CSS borders stay.
// Fixed 60 Hz steps, so the motion lab replays it frame for frame through window.seek(t).
export const GOO = {
  pull: 28, tilt: 20, blur: 8, merge: 48, cut: 24, line: 3, squeeze: 9, pressDur: 140,
  // Membrane: bulge and its reach (px) with the pointer inside; stretch after a leaving pointer and
  // the distance at which the edge lets go; the press in from just outside; spring speed and bounce.
  bulge: 16, reach: 46, drag: 22, dragSpan: 30, release: 48, dent: 9, dentReach: 40,
  memT: 0.36, memBounce: 0.6, couple: 0.08, outMax: 20, inMax: 8,
  // Colour behind: on or off, how deep the body presses in from just outside (px, the outline itself
  // only moves dent), the colour in the gap, the page colour the body is drawn in and the colour the
  // letters take where the gap reaches them.
  hiddenOn: 1, deep: 30, hiddenColor: "#90909d", bodyColor: "#040405", textColor: "#040405",
  // The press in builds as the pointer comes near and drains slowly once it is inside (liquid
  // recording: the colour lingers for a moment after the pointer crosses in).
  deepT: 0.55, deepBounce: 0.35, meltT: 0.14,
};
const NS = "http://www.w3.org/2000/svg";
const PAD = 60;
const HZ = 60;

// The hover curve, one value per 60 Hz frame, read off the gooey recording (frames 23 to 46 of the
// first hover, circle travel as a fraction of the full pull). Tuck of 10 percent over 8 frames,
// launch, 8 percent overshoot held for 5 frames, settled at 24 frames (0.4 s). Leave in the recording
// is this same curve mirrored, so one table serves both directions.
export const CURVE = [-0.03, -0.07, -0.08, -0.08, -0.10, -0.08, -0.07, -0.02, 0.07, 0.20, 0.38, 0.60, 0.78, 0.90, 0.98, 1.03, 1.07, 1.08, 1.08, 1.08, 1.07, 1.05, 1.05, 1.00];
export const DUR = (CURVE.length / HZ) * 1000;

// Neck height against the circle's travel, as a fraction of the button height, also read off the
// recording: 0.57 at rest, thicker while the circle tucks in, a thread at 0.38 and gone by 0.6.
const NECK = [[-0.1, 0.61], [0, 0.57], [0.07, 0.53], [0.2, 0.44], [0.38, 0.22], [0.52, 0]];
export function neckHeight(p) {
  if (p <= NECK[0][0]) return NECK[0][1];
  for (let i = 1; i < NECK.length; i++) {
    const [p0, h0] = NECK[i - 1], [p1, h1] = NECK[i];
    if (p <= p1) return h0 + (h1 - h0) * ((p - p0) / (p1 - p0));
  }
  return 0;
}

const easeOut = (x) => 1 - (1 - x) ** 3;
// The recording's curve as an easing: x in 0 to 1 picks the frame.
const tableEase = (x) => (x >= 1 ? 1 : CURVE[Math.min(CURVE.length - 1, Math.max(0, Math.round(x * CURVE.length) - 1))]);
// Spring speed (seconds to settle) and bounce (0 none, 0.9 a lot) to per frame constants at 60 Hz.
function springK(T, bounce) {
  const w = (2 * Math.PI) / Math.max(0.12, T), zeta = 1 - Math.min(0.95, bounce);
  return { k: Math.min(0.9, (w / HZ) ** 2), d: Math.exp((-2 * zeta * w) / HZ) };
}

// Writes the goo values into the filter.
export function applyFilter() {
  const f = document.getElementById("goo-ring");
  if (!f) return;
  f.querySelector("feGaussianBlur").setAttribute("stdDeviation", GOO.blur);
  f.querySelector("feColorMatrix").setAttribute("values", `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${GOO.merge} ${-GOO.cut}`);
  f.querySelector("feMorphology").setAttribute("radius", GOO.line);
}

function ensureFilter() {
  if (document.getElementById("goo-ring")) { applyFilter(); return; }
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "0"); svg.setAttribute("height", "0"); svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.innerHTML = `<defs><filter id="goo-ring" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="sRGB">
    <feGaussianBlur in="SourceGraphic" stdDeviation="${GOO.blur}" result="blur"/>
    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${GOO.merge} ${-GOO.cut}" result="goo"/>
    <feMorphology in="goo" operator="erode" radius="${GOO.line}" result="inner"/>
    <feComposite in="goo" in2="inner" operator="out"/></filter></defs>`;
  document.body.prepend(svg);
  applyFilter();
}

// One move per target change, from where the value is now to the new target, along the curve. A
// target change mid move starts a new move from the current value, so a quick in and out never jumps.
function mover(curve, durOf) {
  // Settled until a target changes: a fresh mover is at rest, not mid move.
  const m = { v: 0, from: 0, to: 0, n: 0, moving: false };
  return {
    get v() { return m.v; },
    get moving() { return m.moving; },
    reset() { m.v = m.from = m.to = m.n = 0; m.moving = false; },
    step(target) {
      if (target !== m.to) { m.from = m.v; m.to = target; m.n = 0; m.moving = true; }
      if (!m.moving) return;
      const steps = Math.max(1, Math.round((durOf() / 1000) * HZ));
      m.n++; m.v = m.from + (m.to - m.from) * curve(m.n / steps);
      if (m.n >= steps) { m.v = m.to; m.moving = false; }
    },
  };
}

// The pill outline sampled every few px: rest position, outward normal, and an offset along the
// normal on a spring. Positive is outward.
function ring(b) {
  const r = Math.min(b.w, b.h) / 2, str = Math.max(0, b.w - 2 * r), arc = Math.PI * r;
  const tot = 2 * str + 2 * arc, n = Math.max(40, Math.round(tot / 4)), P = [];
  for (let i = 0; i < n; i++) {
    const s = (i / n) * tot; let x, y, nx, ny;
    if (s < str) { x = b.x + r + s; y = b.y; nx = 0; ny = -1; }
    else if (s < str + arc) { const a = (s - str) / r - Math.PI / 2; nx = Math.cos(a); ny = Math.sin(a); x = b.x + b.w - r + nx * r; y = b.y + r + ny * r; }
    else if (s < 2 * str + arc) { x = b.x + b.w - r - (s - str - arc); y = b.y + b.h; nx = 0; ny = 1; }
    else { const a = (s - 2 * str - arc) / r + Math.PI / 2; nx = Math.cos(a); ny = Math.sin(a); x = b.x + r + nx * r; y = b.y + r + ny * r; }
    P.push({ x, y, nx, ny, u: 0, v: 0, b: 0, bv: 0 });
  }
  return P;
}
// Signed distance from a point to the pill: negative inside.
function pillDist(b, px, py) {
  const r = Math.min(b.w, b.h) / 2;
  const cx = Math.max(b.x + r, Math.min(b.x + b.w - r, px)), cy = Math.max(b.y + r, Math.min(b.y + b.h - r, py));
  return Math.hypot(px - cx, py - cy) - r;
}
function smooth(pts) {
  const n = pts.length; let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n], b = pts[i], c = pts[(i + 1) % n], e = pts[(i + 2) % n];
    d += `C${(b[0] + (c[0] - a[0]) / 6).toFixed(2)} ${(b[1] + (c[1] - a[1]) / 6).toFixed(2)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(2)} ${(c[1] - (e[1] - b[1]) / 6).toFixed(2)} ${c[0].toFixed(2)} ${c[1].toFixed(2)}`;
  }
  return d + "Z";
}

export function gooey(btn) {
  ensureFilter();
  const icon = btn.querySelector(".button__icon"), label = btn.querySelector(".button__label"), img = icon.querySelector("img");
  const layer = document.createElement("span");
  layer.className = "goo-shapes"; layer.setAttribute("aria-hidden", "true");
  const svg = document.createElementNS(NS, "svg");
  svg.style.cssText = "position:absolute;inset:0;width:100%;height:100%;overflow:visible;display:block";
  const sNeck = document.createElementNS(NS, "rect"), sIcon = document.createElementNS(NS, "rect"), sLabel = document.createElementNS(NS, "path");
  svg.append(sNeck, sIcon, sLabel); layer.append(svg);
  // Rest layer: the same two shapes, each through its own ring filter, so at rest the pills keep their
  // own outlines and cross as in Figma. The union layer above fades in only while the body melts.
  const sep = document.createElement("span");
  sep.className = "goo-sep"; sep.setAttribute("aria-hidden", "true");
  sep.style.cssText = "position:absolute;inset:-60px;pointer-events:none";
  const ssvg = document.createElementNS(NS, "svg");
  ssvg.style.cssText = "position:absolute;inset:0;width:100%;height:100%;overflow:visible;display:block";
  const gI = document.createElementNS(NS, "g"), gL = document.createElementNS(NS, "g");
  gI.setAttribute("filter", "url(#goo-ring)"); gL.setAttribute("filter", "url(#goo-ring)");
  const rIcon = document.createElementNS(NS, "rect"), rLabel = document.createElementNS(NS, "path");
  gI.append(rIcon); gL.append(rLabel); ssvg.append(gI, gL); sep.append(ssvg);
  // Colour layer, unfiltered: the outline shape in the hidden colour with the pressed body drawn over
  // it in the page colour, so only the gap shows. Sits behind the content like the goo layer.
  const tint = document.createElement("span");
  tint.className = "goo-tint"; tint.setAttribute("aria-hidden", "true");
  tint.style.cssText = "position:absolute;inset:-60px;pointer-events:none";
  const tsvg = document.createElementNS(NS, "svg");
  tsvg.style.cssText = "position:absolute;inset:0;width:100%;height:100%;overflow:visible;display:block";
  const tOuter = document.createElementNS(NS, "path"), tBody = document.createElementNS(NS, "path");
  tsvg.append(tOuter, tBody); tint.append(tsvg);
  // The letters again, in the text colour, clipped to the gap.
  const clone = label.cloneNode(true);
  clone.className = label.className + " button__label-tint"; clone.setAttribute("aria-hidden", "true");
  clone.style.cssText = "position:absolute;pointer-events:none;border-color:transparent;z-index:2;clip-path:path(evenodd, 'M0 0Z')";
  // The colour sits under the goo outline, so the gap shows up to the ring and the ring stays whole.
  btn.prepend(tint, sep, layer); btn.append(clone); btn.classList.add("is-goo");
  let bi, bl, W, H, P, room = 1e9;
  const measure = () => {
    W = btn.offsetWidth; H = btn.offsetHeight;
    // On a narrow screen the circle must not slide off the left edge: the pull is capped by the room.
    room = Math.max(6, btn.getBoundingClientRect().left - 12);
    svg.setAttribute("viewBox", `${-PAD} ${-PAD} ${W + 2 * PAD} ${H + 2 * PAD}`);
    tsvg.setAttribute("viewBox", `${-PAD} ${-PAD} ${W + 2 * PAD} ${H + 2 * PAD}`);
    ssvg.setAttribute("viewBox", `${-PAD} ${-PAD} ${W + 2 * PAD} ${H + 2 * PAD}`);
    const fill = getComputedStyle(btn).color;
    for (const s of [sNeck, sIcon, sLabel, rIcon, rLabel]) s.setAttribute("fill", fill);
    const box = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    bi = box(icon); bl = box(label); P = ring(bl);
    clone.style.left = `${bl.x}px`; clone.style.top = `${bl.y}px`; clone.style.width = `${bl.w}px`; clone.style.height = `${bl.h}px`;
  };
  measure();
  const pull = mover(tableEase, () => DUR);
  const press = mover(easeOut, () => GOO.pressDur);
  const mem = { was: false, caught: false, melt: 0, sd: 1e5, still: 0 };
  return {
    btn, measure,
    reset() { pull.reset(); press.reset(); mem.was = mem.caught = false; mem.melt = 0; mem.sd = 1e5; mem.still = 0; for (const p of P) p.u = p.v = p.b = p.bv = 0; },
    step(ptr) {
      // The circle slides left, so the hit area follows it.
      const inside = ptr && ptr.x >= -4 - pull.v && ptr.x <= W + 4 && ptr.y >= -4 && ptr.y <= H + 4;
      const PULL = Math.min(GOO.pull, room);
      pull.step(inside ? PULL : 0);
      press.step(ptr && ptr.down && inside ? GOO.squeeze : 0);
      // The body is one melted shape while the circle moves and a neck can exist; at rest and once the
      // circle is clear, the two rings stand on their own.
      const pNow = PULL ? pull.v / PULL : 0;
      const meltT = pull.moving && neckHeight(pNow) > 0 ? 1 : 0;
      mem.melt += (meltT - mem.melt) * (1 - Math.exp(-1 / (HZ * Math.max(0.03, GOO.meltT / 3))));

      // Membrane on the label pill. The pointer's signed distance to the pill decides the mode.
      const c = GOO, sp = springK(c.memT, c.memBounce), sb = springK(c.deepT, c.deepBounce);
      const px = ptr ? ptr.x : -1e5, py = ptr ? ptr.y : -1e5;
      const sd = ptr ? pillDist(bl, px, py) : 1e5, within = sd <= 0;
      // Leaving from inside catches the edge. It lets go past the release distance, or as soon as the
      // pointer stops moving away (a few frames still or turning back), so a pointer that lingers near
      // the button is free to press the body in.
      if (mem.was && !within && ptr && !ptr.down) { mem.caught = true; mem.still = 0; }
      mem.still = sd > mem.sd + 0.05 ? 0 : mem.still + 1;
      if (mem.caught && (within || !ptr || sd > c.release || mem.still > 4)) mem.caught = false;
      mem.was = within; mem.sd = sd;
      // Over the icon circle the pill is left alone, so the snapped circle has nothing tugging at it.
      const nearLabel = ptr && px >= bl.x - 4;
      const n = P.length;
      for (let i = 0; i < n; i++) {
        const p = P[i], dd = Math.hypot(p.x - px, p.y - py);
        let t = 0, tb = 0;
        if (within) t = c.bulge * Math.exp(-(dd * dd) / (c.reach * c.reach));
        else if (mem.caught) t = Math.min(c.drag, sd) * Math.exp(-(dd * dd) / (c.dragSpan * c.dragSpan));
        else if (nearLabel && sd < c.dentReach) {
          const w = (1 - sd / c.dentReach) * Math.exp(-(dd * dd) / (c.reach * c.reach));
          t = -c.dent * w;
          // The body presses in deeper than the outline; the colour shows between them.
          tb = c.hiddenOn ? -c.deep * w : 0;
        }
        t = Math.max(-c.inMax, Math.min(c.outMax, t));
        const nb = (P[(i - 1 + n) % n].u + P[(i + 1) % n].u) / 2 - p.u;
        p.v = (p.v + (t - p.u) * sp.k + nb * c.couple) * sp.d;
        const nbb = (P[(i - 1 + n) % n].b + P[(i + 1) % n].b) / 2 - p.b;
        p.bv = (p.bv + (tb - p.b) * sb.k + nbb * c.couple) * sb.d;
      }
      for (const p of P) { p.u += p.v; p.b += p.bv; }
    },
    paint() {
      const PULL = Math.min(GOO.pull, room);
      const g = pull.v, q = press.v, p = PULL ? g / PULL : 0;
      const rect = (s, b, dx) => { s.setAttribute("x", b.x + dx + q); s.setAttribute("y", b.y + q); s.setAttribute("width", Math.max(0, b.w - 2 * q)); s.setAttribute("height", Math.max(0, b.h - 2 * q)); s.setAttribute("rx", 999); };
      // The icon moves by transform, so its layout box (bi) stays where it rests.
      rect(sIcon, bi, -g); rect(rIcon, bi, -g);
      // Melt crossfade: the union ring fades in over the two rings, which stay until it is whole.
      const h = mem.melt < 0.01 ? 0 : mem.melt > 0.99 ? 1 : mem.melt;
      layer.style.display = h === 0 ? "none" : ""; layer.style.opacity = h;
      sep.style.display = h === 1 ? "none" : "";
      // The label pill is the membrane: each point sits on its normal, pressed in by the squeeze.
      const outer = smooth(P.map((pt) => [pt.x + pt.nx * (pt.u - q), pt.y + pt.ny * (pt.u - q)]));
      sLabel.setAttribute("d", outer); rLabel.setAttribute("d", outer);
      // Colour behind: the body sits inside the outline by the press depth; the gap takes the hidden
      // colour and the letters inside the gap take the text colour.
      const on = GOO.hiddenOn && P.some((pt) => pt.b < -0.5);
      tint.style.display = on ? "" : "none"; clone.style.display = on ? "" : "none";
      if (on) {
        // The body reaches 1.5 px under the ring, so no hairline of colour shows along the edge at rest.
        const body = smooth(P.map((pt) => [pt.x + pt.nx * (pt.u - q + 1.5 + Math.min(0, pt.b)), pt.y + pt.ny * (pt.u - q + 1.5 + Math.min(0, pt.b))]));
        // The colour stops 1 px inside the ring's outer edge, so none of it fringes past the outline.
        tOuter.setAttribute("d", smooth(P.map((pt) => [pt.x + pt.nx * (pt.u - q - 1), pt.y + pt.ny * (pt.u - q - 1)]))); tOuter.setAttribute("fill", GOO.hiddenColor);
        tBody.setAttribute("d", body); tBody.setAttribute("fill", GOO.bodyColor);
        clone.style.color = GOO.textColor;
        // clip-path coordinates are the clone's own box, which is the label box.
        const local = (d) => d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (m, x, y) => `${(+x - bl.x).toFixed(2)} ${(+y - bl.y).toFixed(2)}`);
        clone.style.clipPath = `path(evenodd, '${local(outer)} ${local(body)}')`;
      }
      // The neck runs from the circle's centre into the label pill, as tall as the recording has it
      // for this much travel; the filter rounds it into the fillet, then the thread, then the snap.
      const nh = Math.max(0, neckHeight(p) * (H - 2 * q));
      const x0 = bi.x + bi.w / 2 - g, x1 = bl.x + Math.min(bl.w, bl.h) / 2;
      sNeck.setAttribute("display", nh > 0.5 ? "" : "none");
      sNeck.setAttribute("x", x0); sNeck.setAttribute("width", Math.max(0, x1 - x0));
      sNeck.setAttribute("y", bl.y + bl.h / 2 - nh / 2); sNeck.setAttribute("height", nh);
      icon.style.transform = `translateX(${-g}px)`;
      img.style.transform = `rotate(${-p * GOO.tilt}deg)`;
    },
  };
}

// speed is for the motion lab's slow motion only; the site runs at 1.
export function startContactGoo(root = document, { speed = () => 1, force = false } = {}) {
  if (!force && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const run = () => {
    const units = [...root.querySelectorAll(".button")].map(gooey);
    if (!units.length) return;
    units.forEach((u) => u.paint());
    const ptr = new Map();
    let down = false;
    const track = (e) => { for (const u of units) { const b = u.btn.getBoundingClientRect(); const k = b.width / u.btn.offsetWidth || 1; ptr.set(u, { x: (e.clientX - b.left) / k, y: (e.clientY - b.top) / k, down }); } };
    addEventListener("pointermove", track, { passive: true });
    addEventListener("pointerdown", (e) => { down = true; track(e); });
    addEventListener("pointerup", (e) => { down = false; track(e); });
    addEventListener("pointercancel", () => { down = false; units.forEach((u) => ptr.set(u, null)); });
    document.documentElement.addEventListener("pointerleave", () => units.forEach((u) => ptr.set(u, null)));
    addEventListener("resize", () => units.forEach((u) => u.measure()));
    let last = performance.now(), acc = 0;
    const loop = (now) => {
      acc += Math.min(0.1, (now - last) / 1000) * speed(); last = now;
      while (acc >= 1 / HZ) { units.forEach((u) => u.step(ptr.get(u) || null)); acc -= 1 / HZ; }
      units.forEach((u) => u.paint());
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(run);
}

if (!window.__GOO_MANUAL__) startContactGoo();
