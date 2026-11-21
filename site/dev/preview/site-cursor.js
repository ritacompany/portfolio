// Site cursor, proposal (docs/motion/site-cursor/). Lives in site/dev/preview until Chadwick says yes; then
// this block moves into site/js/site.js and site-cursor.css into site/css/components.css, unchanged.
//
// A 12 px Neutral/100 dot replaces the system cursor on devices that hover with a fine pointer. Over links
// and buttons it grows to a 24 px see-through dot (32 percent) so what is under it stays readable. Over the Mondai card media
// ([data-cursor="button"]) it grows into the Learn more small button in its default look: the shape opens
// from the dot to the pill while the fill drains into the 3 px outline. Mouse down fills it (Neutral/100,
// Neutral/900 text, 98 percent); the card link takes the click. Text fields keep the text cursor.
// Reduced motion: no easing, no morph. Tuned through window.SiteCursor.set() and the edit panel.
(function siteCursor() {
  if (window.SiteCursor) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const O = { lerp: 0.35, dot: 12, ring: 24, alpha: 0.32, morph: 360, link: 200, press: 0.98 };
  const BUTTON = '[data-cursor="button"], .work-card-mondai .work-card__media';
  const LINK = 'a[href], button:not(:disabled), [role="button"], [role="link"], [role="tab"], label[for], summary, select, input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], input[type="range"], [data-cursor="link"]';
  const TEXT = 'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable=""], [contenteditable="true"]';
  let root, shape, label, probe, on = false, x = 0, y = 0, tx = 0, ty = 0, raf = 0, last = 0, shown = false, state = "";

  const vars = () => {
    if (!root) return;
    const s = root.style;
    s.setProperty("--cur-dot", O.dot + "px");
    s.setProperty("--cur-ring", O.ring + "px");
    s.setProperty("--cur-link-alpha", O.alpha);
    s.setProperty("--cur-press", O.press);
  };
  const build = () => {
    root = document.createElement("div");
    root.className = "site-cursor";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = '<span class="site-cursor__shape"><span class="site-cursor__label">Learn more</span></span><span class="site-cursor__probe">Learn more</span>';
    shape = root.firstChild; label = shape.firstChild; probe = root.lastChild;
    vars();
    document.body.append(root);
  };
  const paint = () => { root.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
  // Light easing: a lerp per 60 fps frame, corrected for the real frame time so 120 Hz feels the same.
  const tick = (now) => {
    if (!root) { raf = 0; return; }
    const dt = last ? Math.min(64, now - last) : 1000 / 60; last = now;
    const k = reduce.matches ? 1 : 1 - Math.pow(1 - O.lerp, dt / (1000 / 60));
    x += (tx - x) * k; y += (ty - y) * k;
    if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) { x = tx; y = ty; raf = 0; last = 0; paint(); return; }
    paint(); raf = requestAnimationFrame(tick);
  };
  // One shape for every state. Its box grows from the dot to the link dot or to the small button's exact box
  // (measured from a hidden copy with the button's type and padding) while its inset fill drains to the
  // edge, so the fill reads as flowing outward into the outline. Moves into or out of the button take the
  // morph duration; dot and link moves take the shorter link duration.
  const setState = (next, el) => {
    if (next === state) return;
    const prev = state; state = next;
    if (next === "pill") {
      const text = el.getAttribute("data-cursor-label") || "Learn more";
      label.textContent = probe.textContent = text;
      const r = probe.getBoundingClientRect();
      root.style.setProperty("--cur-pill-w", r.width + "px");
      root.style.setProperty("--cur-pill-h", r.height + "px");
    }
    root.style.setProperty("--cur-dur", (next === "pill" || prev === "pill" ? O.morph : O.link) + "ms");
    if (next !== "pill") root.classList.remove("is-pressed");
    root.dataset.state = next;
  };
  const resolve = (el) => {
    if (!el || !el.closest) return setState("dot");
    if (el.closest(TEXT)) return setState("hidden");
    const btn = el.closest(BUTTON);
    if (btn) return setState("pill", btn);
    setState(el.closest(LINK) ? "link" : "dot");
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
    note: "Dot everywhere, a see-through dot over links, Learn more over the Mondai card. Hold the mouse down on the card for the press look.",
    controls: [
      { key: "lerp", label: "Follow", hint: "Share of the gap closed each frame; 1 sits on the pointer", min: 0.1, max: 1, step: 0.01, value: O.lerp, default: 0.35, onInput: set("lerp") },
      { key: "dot", label: "Dot size", min: 6, max: 24, step: 1, unit: "px", value: O.dot, default: 12, onInput: set("dot") },
      { key: "ring", label: "Dot over links", min: 12, max: 56, step: 1, unit: "px", value: O.ring, default: 24, onInput: set("ring") },
      { key: "alpha", label: "Dot over links, opacity", min: 0.1, max: 1, step: 0.01, value: O.alpha, default: 0.32, onInput: set("alpha") },
      { key: "link", label: "Link move duration", min: 0, max: 600, step: 10, unit: "ms", value: O.link, default: 200, onInput: set("link") },
      { key: "morph", label: "Dot to button", min: 0, max: 900, step: 10, unit: "ms", value: O.morph, default: 360, onInput: set("morph") },
      { key: "press", label: "Press scale", min: 0.9, max: 1, step: 0.005, value: O.press, default: 0.98, onInput: set("press") },
    ],
  };
  if (window.EditPanel) window.EditPanel.register(def); else (window.EditPanelQueue ||= []).push(def);
})();
