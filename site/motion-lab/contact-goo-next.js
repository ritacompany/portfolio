// Gooey split on the outlined Button (components.css .button), his pick 9 Nov. Built to move like
// his recording of the Framer Gooey Liquid Button (reference/buttons/ on main), read frame by frame.
// This file is the next site/js/contact-goo.js, byte for byte: it lives in the motion lab until his
// yes, then it is copied over (the site review gate, docs/SITE_BUILD_PLAN.md).
// The two pill borders go transparent; a shape layer behind the content paints the icon circle, the
// label pill and a neck between them filled, and one SVG filter blurs, thresholds and erodes them so
// only the outline of their union shows. At rest the neck is a wide liquid fillet. On hover the icon
// circle tucks in a touch, pulls away, the neck thins to a thread and snaps a little past half way,
// the circle overshoots and settles. Leave is the same move back: the circle pushes out a touch, comes
// home, the neck reforms as a thread and fills out. Press squeezes both shapes.
// Fixed 60 Hz steps, so the motion lab replays it frame for frame through window.seek(t).
// Reduced motion: never starts, the CSS borders stay.
export const GOO = { pull: 28, tilt: 20, blur: 8, merge: 48, cut: 24, line: 3, squeeze: 6, pressDur: 140 };
const NS = "http://www.w3.org/2000/svg";
const PAD = 60;
const HZ = 60;

// The hover curve, one value per 60 Hz frame, read off the recording (frames 23 to 46 of the first
// hover, circle travel as a fraction of the full pull). Tuck of 10 percent over 8 frames, launch,
// 8 percent overshoot held for 5 frames, settled at 24 frames (0.4 s). Leave in the recording is
// this same curve mirrored, so one table serves both directions.
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
  const m = { v: 0, from: 0, to: 0, n: 0 };
  return {
    get v() { return m.v; },
    reset() { m.v = m.from = m.to = m.n = 0; },
    step(target) {
      if (target !== m.to) { m.from = m.v; m.to = target; m.n = 0; }
      const steps = Math.max(1, Math.round((durOf() / 1000) * HZ));
      if (m.n < steps) { m.n++; m.v = m.from + (m.to - m.from) * curve(m.n / steps); }
    },
  };
}

export function gooey(btn) {
  ensureFilter();
  const icon = btn.querySelector(".button__icon"), label = btn.querySelector(".button__label"), img = icon.querySelector("img");
  const layer = document.createElement("span");
  layer.className = "goo-shapes"; layer.setAttribute("aria-hidden", "true");
  const sNeck = document.createElement("span"), sIcon = document.createElement("span"), sLabel = document.createElement("span");
  layer.append(sNeck, sIcon, sLabel); btn.prepend(layer); btn.classList.add("is-goo");
  let bi, bl, H;
  const measure = () => {
    const box = (el) => ({ x: el.offsetLeft + PAD, y: el.offsetTop + PAD, w: el.offsetWidth, h: el.offsetHeight });
    bi = box(icon); bl = box(label); H = btn.offsetHeight;
  };
  measure();
  const pull = mover(tableEase, () => DUR);
  const press = mover(easeOut, () => GOO.pressDur);
  return {
    btn, measure,
    reset() { pull.reset(); press.reset(); },
    step(ptr) {
      const W = btn.offsetWidth;
      // The circle slides left, so the hit area follows it.
      const inside = ptr && ptr.x >= -4 - pull.v && ptr.x <= W + 4 && ptr.y >= -4 && ptr.y <= H + 4;
      pull.step(inside ? GOO.pull : 0);
      press.step(ptr && ptr.down && inside ? GOO.squeeze : 0);
    },
    paint() {
      const g = pull.v, q = press.v, p = GOO.pull ? g / GOO.pull : 0;
      const place = (s, b, dx) => { s.style.left = `${b.x + dx + q}px`; s.style.top = `${b.y + q}px`; s.style.width = `${b.w - 2 * q}px`; s.style.height = `${b.h - 2 * q}px`; };
      // The icon moves by transform, so its layout box (bi) stays where it rests.
      place(sIcon, bi, -g); place(sLabel, bl, 0);
      // The neck runs from the circle's centre into the label pill, as tall as the recording has it
      // for this much travel; the filter rounds it into the fillet, then the thread, then the snap.
      const nh = Math.max(0, neckHeight(p) * (H - 2 * q));
      const x0 = bi.x + bi.w / 2 - g, x1 = bl.x + Math.min(bl.w, bl.h) / 2;
      sNeck.style.display = nh > 0.5 ? "" : "none";
      sNeck.style.left = `${x0}px`; sNeck.style.width = `${Math.max(0, x1 - x0)}px`;
      sNeck.style.top = `${bl.y + bl.h / 2 - nh / 2}px`; sNeck.style.height = `${nh}px`;
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
