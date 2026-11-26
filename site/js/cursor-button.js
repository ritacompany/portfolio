// Cursor button: over a card image the system cursor turns into the Small button, which follows the
// pointer. Style guide and state list: docs/motion/cursor-button/. Styles: css/cursor-button.css.
// Use: put data-cursor="Label" on the image box inside a link. Only for a fine pointer that can hover;
// touch never sees it. Keyboard focus is handled in each page's CSS (a still button in the middle).
//   Follow   critically damped spring per axis, so it trails by a hair and never overshoots (it is text).
//   Presence one spring from 0 (gone) to 1 (in): scale 0.6 to 1 and opacity ride on it. Faster out.
//   Press    mouse down fills it white (his 10 Nov ruling on the Small button), 0.96.
//   Reduced  sits on the pointer, appears and goes at once, no scale.
// The motion is a stepper on a fixed 1/240 s step, so the tuner can replay any moment exactly
// (CursorButton.simulate) and the live page and the clip run the same numbers.
(() => {
  const config = window.CursorButtonConfig || {
    followK: 320, followD: 35.8, // critical damping for k 320 is 2 * sqrt(320) = 35.78
    enterK: 200, leaveK: 420,    // presence springs, both critically damped
    from: 0.6,                   // scale it grows from and shrinks back to
    press: 0.96,
  };
  const DT = 1 / 240;

  const fresh = () => ({ x: 0, y: 0, vx: 0, vy: 0, p: 0, vp: 0 });
  // One fixed step. input: { x, y, inside, reduced }
  function step(s, input) {
    if (input.reduced) {
      s.x = input.x; s.y = input.y; s.vx = s.vy = 0; s.p = input.inside ? 1 : 0; s.vp = 0;
      return s;
    }
    if (input.inside && s.p < 0.01) { s.x = input.x; s.y = input.y; s.vx = s.vy = 0; } // enter where the pointer is
    const k = config.followK, d = config.followD;
    s.vx += (k * (input.x - s.x) - d * s.vx) * DT; s.x += s.vx * DT;
    s.vy += (k * (input.y - s.y) - d * s.vy) * DT; s.y += s.vy * DT;
    const pk = input.inside ? config.enterK : config.leaveK, pd = 2 * Math.sqrt(pk);
    s.vp += (pk * ((input.inside ? 1 : 0) - s.p) - pd * s.vp) * DT; s.p += s.vp * DT;
    if (!input.inside && s.p < 0.002) { s.p = 0; s.vp = 0; }
    return s;
  }
  function paint(el, s, pressed, reduced) {
    const p = Math.min(1, Math.max(0, s.p));
    const scale = (reduced ? 1 : config.from + (1 - config.from) * p) * (pressed ? config.press : 1);
    el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(4)})`;
    el.style.opacity = p.toFixed(3);
    el.classList.toggle("is-pressed", !!pressed);
    el.style.visibility = p > 0 ? "visible" : "hidden";
  }
  // Replays a scripted pointer from 0 to t: path(t) returns { x, y, inside, down }.
  function simulate(path, t, reduced = false) {
    const s = fresh();
    for (let i = 0, n = Math.round(t / DT); i < n; i++) step(s, { ...path(i * DT), reduced });
    return s;
  }
  function makeButton(parent = document.body) {
    const el = document.createElement("span");
    el.className = "cursor-btn button-sm";
    el.setAttribute("aria-hidden", "true");
    parent.appendChild(el);
    return el;
  }
  window.CursorButton = { config, step, paint, simulate, fresh, makeButton, DT };

  // ---- Live wiring
  if (window.__RENDER__ || document.documentElement.hasAttribute("data-cursor-manual")) return;
  const can = matchMedia("(hover: hover) and (pointer: fine)");
  const rm = matchMedia("(prefers-reduced-motion: reduce)");
  const zones = [...document.querySelectorAll("[data-cursor]")];
  if (!zones.length) return;

  let el = null, s = fresh(), zone = null, pressed = false, last = 0, acc = 0, raf = 0;
  const ptr = { x: 0, y: 0 };
  const root = document.documentElement;
  const sync = () => root.classList.toggle("cursor-btn-on", can.matches);
  sync();
  can.addEventListener?.("change", sync);

  function frame(now) {
    acc += Math.min(0.1, (now - last) / 1000); last = now;
    const input = { x: ptr.x, y: ptr.y, inside: !!zone, reduced: rm.matches };
    while (acc >= DT) { step(s, input); acc -= DT; }
    paint(el, s, pressed && !!zone, rm.matches);
    if (zone || s.p > 0) raf = requestAnimationFrame(frame);
    else raf = 0;
  }
  function wake() { if (!raf) { last = performance.now(); acc = 0; raf = requestAnimationFrame(frame); } }

  zones.forEach((z) => {
    z.addEventListener("pointerenter", (e) => {
      if (!can.matches || e.pointerType !== "mouse") return;
      el ||= makeButton();
      zone = z; el.textContent = z.dataset.cursor;
      ptr.x = e.clientX; ptr.y = e.clientY;
      z.classList.add("is-cursor");
      wake();
    });
    z.addEventListener("pointermove", (e) => { if (zone === z) { ptr.x = e.clientX; ptr.y = e.clientY; } });
    z.addEventListener("pointerleave", (e) => {
      if (zone !== z) return;
      ptr.x = e.clientX; ptr.y = e.clientY;
      zone = null; pressed = false; z.classList.remove("is-cursor");
      wake();
    });
    z.addEventListener("pointerdown", (e) => { if (zone === z && e.button === 0) { pressed = true; wake(); } });
  });
  addEventListener("pointerup", () => { if (pressed) { pressed = false; wake(); } });
  // The page scrolls under a still pointer: the image can slide away from it without a pointerleave.
  addEventListener("scroll", () => {
    if (!zone) return;
    const r = zone.getBoundingClientRect();
    if (ptr.x < r.left || ptr.x > r.right || ptr.y < r.top || ptr.y > r.bottom) {
      zone.classList.remove("is-cursor"); zone = null; pressed = false; wake();
    }
  }, { passive: true });
  // Coming back with the browser's back button restores the page from its cache with the button mid-air.
  addEventListener("pageshow", (e) => {
    if (!e.persisted || !el) return;
    zone && zone.classList.remove("is-cursor");
    zone = null; pressed = false; s = fresh(); paint(el, s, false, true);
  });
})();
