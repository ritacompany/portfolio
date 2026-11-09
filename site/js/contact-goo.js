// Gooey split on the outlined Button (components.css .button), his pick 9 Nov (option A on
// site/motion-lab/contact-button.html; review log docs/motion/contact-button/review_log.md).
// The two pill borders go transparent; a shape layer behind the content paints both pills filled,
// and one SVG filter blurs, thresholds and erodes them so only the outline of their union shows.
// At rest the seam is a liquid neck. On hover the icon circle tucks in a touch, pulls away to the
// left, the neck stretches and snaps, the icon tips; on leave it pushes out a touch and flows back.
// Press squeezes both shapes. Timing is read off his gooey recording (reference/buttons/, frames
// 22 to 44): one eased move of about 0.38 s with a 10 percent tuck first and an 8 percent
// overshoot at the end, settled, no second bounce. That is a back ease, not a spring.
// Fixed 60 Hz steps, so the motion lab replays it frame for frame through window.seek(t).
// Reduced motion: never starts, the CSS borders stay.
// Tuned on the live tuner (site/motion-lab/contact-goo-tuner.html); its Copy settings line replaces the GOO line below.
export const GOO = { pull: 28, tilt: 18, dur: 380, bounce: 1.7, blur: 12, merge: 40, cut: 18, line: 3, squeeze: 6, pressDur: 140 };
const NS = "http://www.w3.org/2000/svg";
const PAD = 60;
const HZ = 60;

// Back ease, in and out. bounce 0 is a plain cubic ease; 1.7 is the recording (tuck and overshoot
// both near 10 percent of the move).
export function easeBack(x, bounce) {
  const k = bounce * 1.525;
  return x < 0.5
    ? ((2 * x) ** 2 * ((k + 1) * 2 * x - k)) / 2
    : ((2 * x - 2) ** 2 * ((k + 1) * (2 * x - 2) + k) + 2) / 2;
}
const easeOut = (x) => 1 - (1 - x) ** 3;

// Writes the goo values into the filter, so the tuner can change them live.
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
    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12" result="goo"/>
    <feMorphology in="goo" operator="erode" radius="3" result="inner"/>
    <feComposite in="goo" in2="inner" operator="out"/></filter></defs>`;
  document.body.prepend(svg);
  applyFilter();
}

// One eased move per target change: from where the shape is now to the new target, over dur ms.
// A target change mid move starts a new move from the current position, so a quick in and out
// never jumps.
function mover(ease, durOf) {
  const m = { v: 0, from: 0, to: 0, n: 0 };
  return {
    get v() { return m.v; },
    reset() { m.v = m.from = m.to = m.n = 0; },
    step(target) {
      if (target !== m.to) { m.from = m.v; m.to = target; m.n = 0; }
      const steps = Math.max(1, Math.round((durOf() / 1000) * HZ));
      if (m.n < steps) { m.n++; m.v = m.from + (m.to - m.from) * ease(m.n / steps); }
    },
  };
}

export function gooey(btn) {
  ensureFilter();
  const icon = btn.querySelector(".button__icon"), label = btn.querySelector(".button__label"), img = icon.querySelector("img");
  const layer = document.createElement("span");
  layer.className = "goo-shapes"; layer.setAttribute("aria-hidden", "true");
  const sIcon = document.createElement("span"), sLabel = document.createElement("span");
  layer.append(sIcon, sLabel); btn.prepend(layer); btn.classList.add("is-goo");
  let bi, bl;
  const measure = () => {
    const box = (el) => ({ x: el.offsetLeft + PAD, y: el.offsetTop + PAD, w: el.offsetWidth, h: el.offsetHeight });
    bi = box(icon); bl = box(label);
  };
  measure();
  const pull = mover((x) => easeBack(x, GOO.bounce), () => GOO.dur);
  const press = mover(easeOut, () => GOO.pressDur);
  return {
    btn, measure,
    reset() { pull.reset(); press.reset(); },
    step(ptr) {
      const W = btn.offsetWidth, H = btn.offsetHeight;
      const inside = ptr && ptr.x >= -4 && ptr.x <= W + 4 && ptr.y >= -4 && ptr.y <= H + 4;
      pull.step(inside ? GOO.pull : 0);
      press.step(ptr && ptr.down && inside ? GOO.squeeze : 0);
    },
    paint() {
      const g = pull.v, q = press.v;
      const place = (s, b, dx) => { s.style.left = `${b.x + dx + q}px`; s.style.top = `${b.y + q}px`; s.style.width = `${b.w - 2 * q}px`; s.style.height = `${b.h - 2 * q}px`; };
      // The icon moves by transform, so its layout box (bi) stays where it rests.
      place(sIcon, bi, -g); place(sLabel, bl, 0);
      icon.style.transform = `translateX(${-g}px)`;
      img.style.transform = `rotate(${GOO.pull ? -(g / GOO.pull) * GOO.tilt : 0}deg)`;
    },
  };
}

// speed is for the tuner's slow motion only; the site runs at 1.
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
