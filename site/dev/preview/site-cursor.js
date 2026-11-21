// Site cursor, proposal (docs/motion/site-cursor/). Lives in site/dev/preview until Chadwick says yes; then
// this block moves into site/js/site.js and site-cursor.css into site/css/components.css, unchanged.
//
// Copied from the reference, cursors.framer.wiki "Simple Replace", measured on the live page 21 Nov:
// a 24 px pure white dot with a 0 12 24 drop shadow at 20 percent black, drawn exactly on the pointer
// (no lag) and unchanged over ordinary links. Over the Mondai card media ([data-cursor="button"]) it springs
// into the Learn more small button in its default look (his call: outline, Neutral/100 text). It turns
// white only on mouse down; three press transitions are on trial (O.pressStyle: flood, sweep, thicken).
// The card link takes the click. Text fields keep the text cursor. Reduced motion: no morph.
(function siteCursor() {
  if (window.SiteCursor) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const O = { lerp: 1, dot: 24, morph: 420, pressStyle: "flood", pressScale: 0.98, pressDur: 220 };
  const BUTTON = '[data-cursor="button"], .work-card-mondai .work-card__media';
  const TEXT = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable=""], [contenteditable="true"]';
  let root, shape, label, ink, inkLabel, probe, on = false, x = 0, y = 0, tx = 0, ty = 0, raf = 0, last = 0, shown = false, state = "";

  const vars = () => {
    if (!root) return;
    const s = root.style;
    s.setProperty("--cur-dot", O.dot + "px");
    s.setProperty("--cur-morph", O.morph + "ms");
    s.setProperty("--cur-press", O.pressScale);
    s.setProperty("--cur-press-dur", O.pressDur + "ms");
    root.dataset.press = O.pressStyle;
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
    if (next !== "pill") root.classList.remove("is-pressed");
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
  const down = (e) => { if (e.button === 0 && state === "pill") root.classList.add("is-pressed"); };
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
    note: "Hold the mouse down on the Mondai card to feel the press. Keys 1, 2, 3 switch the press option.",
    controls: [
      { key: "pressStyle", label: "Press option", type: "select", value: O.pressStyle, default: "flood",
        options: [["flood", "A Flood from the pointer"], ["sweep", "B Sweep left to right"], ["thicken", "C Outline thickens inward"]], onInput: set("pressStyle") },
      { key: "pressDur", label: "Press fill duration", min: 60, max: 600, step: 10, unit: "ms", value: O.pressDur, default: 220, onInput: set("pressDur") },
      { key: "pressScale", label: "Press scale", min: 0.8, max: 1, step: 0.005, value: O.pressScale, default: 0.98, hint: "The reference dot shrinks to about 0.83 on press", onInput: set("pressScale") },
      { key: "morph", label: "Dot to button", min: 0, max: 900, step: 10, unit: "ms", value: O.morph, default: 420, onInput: set("morph") },
      { key: "dot", label: "Dot size", min: 8, max: 40, step: 1, unit: "px", value: O.dot, default: 24, hint: "Reference: 24", onInput: set("dot") },
      { key: "lerp", label: "Follow", hint: "1 sits on the pointer, as the reference does", min: 0.1, max: 1, step: 0.01, value: O.lerp, default: 1, onInput: set("lerp") },
    ],
  };
  if (window.EditPanel) window.EditPanel.register(def); else (window.EditPanelQueue ||= []).push(def);
  addEventListener("keydown", (e) => {
    const m = { 1: "flood", 2: "sweep", 3: "thicken" }[e.key];
    if (!m || (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]"))) return;
    const g = window.EditPanel && window.EditPanel.group && window.EditPanel.group("site-cursor");
    g ? g.set({ pressStyle: m }) : window.SiteCursor.set({ pressStyle: m });
  });
})();
