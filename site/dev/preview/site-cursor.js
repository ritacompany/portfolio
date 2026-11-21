// Site cursor, proposal (docs/motion/site-cursor/). Lives in site/dev/preview until Chadwick says yes; then
// this block moves into site/js/site.js and site-cursor.css into site/css/components.css, unchanged.
//
// Copied from the reference, cursors.framer.wiki "Simple Replace": its own component code (framer-DyGFw)
// and the live page, read 21 Nov. A 24 px dot with a 0 12 24 drop shadow at 20 percent black, drawn exactly
// on the pointer and unchanged over ordinary links; every change runs on one spring (stiffness 400,
// damping 30, mass 1); pressed shrinks it to 20 px. Colour is Neutral/100 (his call 21 Nov, to match the
// button) instead of the reference's white.
// States: hidden, dot, dot pressed (any click), button (over the Mondai card media, the Learn more small
// button in its outline look), button pressed (his pick 21 Nov: white ripples out from the pointer, scale
// 0.98; the card link takes the click). Text fields keep the text cursor. Reduced motion: no motion.
(function siteCursor() {
  if (window.SiteCursor) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const O = { lerp: 1, dot: 24, dotPress: 20, stiffness: 400, damping: 30, mass: 1, pressScale: 0.98, pressDur: 140 };
  const BUTTON = '[data-cursor="button"], .work-card-mondai .work-card__media';
  const TEXT = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable=""], [contenteditable="true"]';
  let root, shape, label, ink, inkLabel, probe, on = false, x = 0, y = 0, tx = 0, ty = 0, raf = 0, last = 0, shown = false, state = "";

  // The reference's spring as a CSS easing: sample the damped spring until it settles within 0.1 percent,
  // then hand CSS a linear() curve and that duration, so CSS transitions move exactly like Framer's spring.
  const spring = () => {
    const w0 = Math.sqrt(O.stiffness / O.mass), z = O.damping / (2 * Math.sqrt(O.stiffness * O.mass));
    const x = (t) => {
      if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
      return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    };
    let T = 0.05; while (T < 3 && (Math.abs(1 - x(T)) > 0.001 || Math.abs(1 - x(T + 0.05)) > 0.001)) T += 0.01;
    const n = 40, pts = [];
    for (let i = 0; i <= n; i++) pts.push(+x((T * i) / n).toFixed(4));
    pts[n] = 1;
    return { ease: `linear(${pts.join(", ")})`, ms: Math.round(T * 1000) };
  };
  const vars = () => {
    if (!root) return;
    const s = root.style, sp = spring();
    s.setProperty("--cur-dot", O.dot + "px");
    s.setProperty("--cur-dot-press", O.dotPress + "px");
    s.setProperty("--cur-spring", sp.ease);
    s.setProperty("--cur-morph", sp.ms + "ms");
    s.setProperty("--cur-press", O.pressScale);
    s.setProperty("--cur-press-dur", O.pressDur + "ms");
  };
  const build = () => {
    root = document.createElement("div");
    root.className = "site-cursor";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = '<span class="site-cursor__shape"><span class="site-cursor__label">Learn more</span>'
      + '<span class="site-cursor__ink"><span class="site-cursor__label">Learn more</span></span></span>'
      + '<span class="site-cursor__probe">Learn more</span>';
    shape = root.firstChild; label = shape.firstChild; ink = shape.lastChild; inkLabel = ink.firstChild; probe = root.lastChild;
    vars();
    document.body.append(root);
  };
  const paint = () => { root.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
  // The reference sits on the pointer (lerp 1). Kept as a control in case he wants a trail later.
  const tick = (now) => {
    if (!root) { raf = 0; return; }
    const dt = last ? Math.min(64, now - last) : 1000 / 60; last = now;
    const k = reduce.matches ? 1 : 1 - Math.pow(1 - O.lerp, dt / (1000 / 60));
    x += (tx - x) * k; y += (ty - y) * k;
    if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) { x = tx; y = ty; raf = 0; last = 0; paint(); return; }
    paint(); raf = requestAnimationFrame(tick);
  };
  const setState = (next, el) => {
    if (next === state) return;
    state = next;
    if (next === "pill") {
      const text = el.getAttribute("data-cursor-label") || "Learn more";
      label.textContent = inkLabel.textContent = probe.textContent = text;
      const r = probe.getBoundingClientRect();
      root.style.setProperty("--cur-pill-w", r.width + "px");
      root.style.setProperty("--cur-pill-h", r.height + "px");
    }
    if (next === "hidden") root.classList.remove("is-pressed");
    root.dataset.state = next;
  };
  const resolve = (el) => {
    if (!el || !el.closest) return setState("dot");
    if (el.closest(TEXT)) return setState("hidden");
    const btn = el.closest(BUTTON);
    setState(btn ? "pill" : "dot", btn);
  };
  const move = (e) => {
    if (e.pointerType === "touch") return;
    tx = e.clientX; ty = e.clientY;
    if (!shown) { shown = true; x = tx; y = ty; root.classList.add("is-shown"); paint(); }
    resolve(e.target);
    if (!raf) raf = requestAnimationFrame(tick);
  };
  // Pressed on any click, as the reference does; the button's own press look comes from the same class.
  const down = (e) => { if (e.button === 0 && state !== "hidden" && e.pointerType !== "touch") root.classList.add("is-pressed"); };
  const up = () => root && root.classList.remove("is-pressed");
  const out = (e) => { if (!e.relatedTarget) { shown = false; root.classList.remove("is-shown"); up(); } };
  // Scrolling moves the page under a still pointer, so look again at what is under it.
  const scroll = () => { if (shown) resolve(document.elementFromPoint(tx, ty)); };
  const motion = () => root && root.classList.toggle("is-reduced", reduce.matches);

  const start = () => {
    if (on || !fine.matches) return;
    on = true;
    if (!root) build();
    motion();
    document.documentElement.classList.add("has-site-cursor");
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down, { passive: true });
    addEventListener("pointerup", up, { passive: true });
    addEventListener("blur", up);
    document.addEventListener("pointerout", out, { passive: true });
    addEventListener("scroll", scroll, { passive: true, capture: true });
  };
  const stop = () => {
    if (!on) return;
    on = false; shown = false;
    document.documentElement.classList.remove("has-site-cursor");
    removeEventListener("pointermove", move); removeEventListener("pointerdown", down);
    removeEventListener("pointerup", up); removeEventListener("blur", up);
    document.removeEventListener("pointerout", out);
    removeEventListener("scroll", scroll, { capture: true });
    if (root) { root.remove(); root = null; state = ""; }
  };
  const sync = () => (fine.matches ? start() : stop());
  fine.addEventListener("change", sync);
  reduce.addEventListener("change", motion);
  window.SiteCursor = {
    options: O,
    set(next) { Object.assign(O, next); vars(); },
    get element() { return root; },
    get state() { return state; },
  };
  if (document.body) sync(); else addEventListener("DOMContentLoaded", sync);

  // Tuning, preview only: the shared edit panel, when the page has it.
  const set = (k) => (v) => window.SiteCursor.set({ [k]: v });
  const def = {
    id: "site-cursor", title: "Cursor", tab: "Motion",
    note: "Click anywhere for the dot's press; hold on the Mondai card for the button's press. Defaults are the reference's own values.",
    controls: [
      { key: "dot", label: "Dot size", min: 8, max: 40, step: 1, unit: "px", value: O.dot, default: 24, hint: "Reference: 24", onInput: set("dot") },
      { key: "dotPress", label: "Dot pressed", min: 8, max: 40, step: 1, unit: "px", value: O.dotPress, default: 20, hint: "Reference: 20", onInput: set("dotPress") },
      { key: "stiffness", label: "Spring stiffness", min: 100, max: 1000, step: 10, value: O.stiffness, default: 400, hint: "Reference: 400", onInput: set("stiffness") },
      { key: "damping", label: "Spring damping", min: 5, max: 80, step: 1, value: O.damping, default: 30, hint: "Reference: 30", onInput: set("damping") },
      { key: "pressDur", label: "Button ripple", min: 40, max: 400, step: 10, unit: "ms", value: O.pressDur, default: 140, onInput: set("pressDur") },
      { key: "pressScale", label: "Button pressed scale", min: 0.8, max: 1, step: 0.005, value: O.pressScale, default: 0.98, onInput: set("pressScale") },
      { key: "lerp", label: "Follow", hint: "1 sits on the pointer, as the reference does", min: 0.1, max: 1, step: 0.01, value: O.lerp, default: 1, onInput: set("lerp") },
    ],
  };
  if (window.EditPanel) window.EditPanel.register(def); else (window.EditPanelQueue ||= []).push(def);
})();
