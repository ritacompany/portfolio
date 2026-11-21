// Scroll feel, preview only. One setting for every page with smooth scroll (Home, Haven and the Mondai pages),
// so they all scroll the same. Registers a group with the edit panel (edit-panel.js) and sets the live
// Lenis on whichever page is open.
//   Why      Haven ran lerp 0.075 with the wheel at 0.9 until 7 Oct. It went back to Lenis's defaults
//            (lerp 0.1, wheel 1) when a soft snap was added, the snap came out the same day and the
//            light default stayed. Home copied it. The preview starts at the 7 Oct values.
//   Values   Mode: lerp glides toward the target a fraction each frame; duration runs each scroll over a
//            fixed time on an easing. Wheel and touch speed: how far one flick travels. Smooth touch:
//            Lenis takes over touch scrolling (off is the phone's own scroll). Anchor offset: where a
//            link to a section lands. Reduced motion preview: native scroll and instant CSS motion.
//            The panel saves them in this browser, so a value set on Home also applies on Haven.
//   Ships    on his yes, as the values in haven.js and home-motion.js; this file then goes.
(() => {
  const reducedSystem = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const EASINGS = {
    expo: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Lenis's own default
    quart: (t) => 1 - Math.pow(1 - t, 4),
    cubic: (t) => 1 - Math.pow(1 - t, 3),
    sine: (t) => Math.sin((t * Math.PI) / 2),
    linear: (t) => t,
  };
  const DEFAULTS = {
    mode: "lerp", lerp: 0.075, duration: 1.2, easing: "expo", wheel: 0.9,
    syncTouch: false, touch: 1, touchLerp: 0.075, inertia: 35, anchorOffset: 0, reduce: false,
  };

  const V = { ...DEFAULTS };
  let lenis = null, lenisHadAnchors = false;
  const current = () => ["__haven", "__hm", "__mm"].map((k) => window[k] && window[k].lenis).find(Boolean) || null;

  function apply() {
    document.documentElement.classList.toggle("ep-reduce-preview", !!V.reduce);
    const l = lenis;
    if (!l) return;
    const o = l.options;
    o.lerp = V.lerp;
    o.duration = V.mode === "duration" ? V.duration : undefined;
    o.easing = EASINGS[V.easing] || EASINGS.expo;
    o.wheelMultiplier = V.wheel;
    o.touchMultiplier = V.touch;
    o.syncTouch = !!V.syncTouch && !V.reduce;
    o.syncTouchLerp = V.touchLerp;
    o.touchInertiaMultiplier = V.inertia;
    o.smoothWheel = !V.reduce;
    if (lenisHadAnchors) o.anchors = V.anchorOffset ? { offset: V.anchorOffset } : true;
    if (l.virtualScroll && l.virtualScroll.options) {
      l.virtualScroll.options.wheelMultiplier = V.wheel;
      l.virtualScroll.options.touchMultiplier = V.touch;
    }
  }

  // Haven's Lenis has no anchor handling, so links to a section jump natively there. Give them the same
  // glide and offset as Home's while this preview layer is on.
  document.addEventListener("click", (e) => {
    if (!lenis || lenisHadAnchors || V.reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    const a = e.composedPath().find((n) => n instanceof HTMLAnchorElement && (n.getAttribute("href") || "").startsWith("#"));
    if (!a || a.closest(".ep")) return;
    const href = a.getAttribute("href");
    let target = null;
    try { target = href.length > 1 && document.querySelector(href); } catch {}
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: V.anchorOffset });
  });

  const set = (k) => (v) => { V[k] = v; apply(); };
  const live = (v) => !v.reduce;
  const lerpOnly = (v) => v.mode === "lerp" && !v.reduce;
  const durOnly = (v) => v.mode === "duration" && !v.reduce;
  const touchOnly = (v) => !!v.syncTouch && !v.reduce;
  const def = {
    id: "scroll",
    title: "Scroll feel",
    note: reducedSystem
      ? "Reduced motion is on for this device, so smooth scroll is off and these do nothing here."
      : "Every page with smooth scroll shares these. Reduced motion preview keeps scripted motion running.",
    controls: [
      { key: "mode", label: "Mode", type: "select", options: [["lerp", "Lerp"], ["duration", "Duration"]], value: DEFAULTS.mode, onInput: set("mode"), enabledWhen: live },
      { key: "lerp", label: "Smoothing", min: 0.02, max: 0.2, step: 0.005, value: DEFAULTS.lerp, onInput: set("lerp"), hint: "Lower glides longer", enabledWhen: lerpOnly },
      { key: "duration", label: "Duration", min: 0.3, max: 2.5, step: 0.05, unit: "s", value: DEFAULTS.duration, onInput: set("duration"), enabledWhen: durOnly },
      { key: "easing", label: "Easing", type: "select", value: DEFAULTS.easing, onInput: set("easing"), enabledWhen: durOnly,
        options: [["expo", "Expo out"], ["quart", "Quart out"], ["cubic", "Cubic out"], ["sine", "Sine out"], ["linear", "Linear"]] },
      { key: "wheel", label: "Wheel speed", min: 0.3, max: 2, step: 0.05, unit: "x", value: DEFAULTS.wheel, onInput: set("wheel"), enabledWhen: live },
      { key: "syncTouch", label: "Smooth touch", type: "toggle", value: DEFAULTS.syncTouch, onInput: set("syncTouch"), hint: "Off is the phone's own scroll", enabledWhen: live },
      { key: "touch", label: "Touch speed", min: 0.5, max: 3, step: 0.1, unit: "x", value: DEFAULTS.touch, onInput: set("touch"), enabledWhen: touchOnly },
      { key: "touchLerp", label: "Touch smoothing", min: 0.02, max: 0.2, step: 0.005, value: DEFAULTS.touchLerp, onInput: set("touchLerp"), enabledWhen: touchOnly },
      { key: "inertia", label: "Touch fling", min: 5, max: 80, step: 1, value: DEFAULTS.inertia, onInput: set("inertia"), enabledWhen: touchOnly },
      { key: "anchorOffset", label: "Anchor offset", min: -240, max: 240, step: 4, unit: "px", value: DEFAULTS.anchorOffset, onInput: set("anchorOffset"),
        hint: "Negative lands higher, clear of the nav", enabledWhen: live },
      { key: "reduce", label: "Reduced motion preview", type: "toggle", value: DEFAULTS.reduce, onInput: set("reduce") },
    ],
    actions: [
      { label: "7 Oct (0.075, 0.9)", onClick: (g) => g.set({ mode: "lerp", lerp: 0.075, wheel: 0.9 }) },
      { label: "Lenis default (0.1, 1)", onClick: (g) => g.set({ mode: "lerp", lerp: 0.1, wheel: 1 }) },
      { label: "Glide one screen", onClick: () => {
        const y = lenis ? lenis.scroll : scrollY;
        const max = document.documentElement.scrollHeight - innerHeight;
        const to = y + innerHeight > max - 4 ? 0 : y + innerHeight * 0.85;
        lenis ? lenis.scrollTo(to) : scrollTo({ top: to, behavior: "smooth" });
      } },
    ],
  };
  window.__scrollFeel = { get V() { return { ...V }; }, apply, lenis: null, DEFAULTS };

  // Values from the old Scroll feel box carry over once, then its key goes.
  let carry = null;
  try {
    const old = JSON.parse(localStorage.getItem("scroll-feel") || "null");
    if (old) {
      carry = {};
      if (typeof old.lerp === "number") carry.lerp = old.lerp;
      if (typeof old.wheel === "number") carry.wheel = old.wheel;
      localStorage.removeItem("scroll-feel");
    }
  } catch {}
  let registered = false;
  const register = () => {
    if (registered) return;
    registered = true;
    if (!window.EditPanel) return void (window.EditPanelQueue ||= []).push(def); // panel not loaded: old values are dropped
    const g = window.EditPanel.register(def);
    if (carry) g.set(carry);
  };

  // Pages create their Lenis after their scripts load, so keep checking until one exists. The group only
  // shows on a page that has one (or would have one, when the device asks for reduced motion).
  if (reducedSystem && (document.querySelector(".home, .canvas.framework") || /\/haven\//.test(location.pathname))) register();
  let tries = 0;
  (function wait() {
    const l = current();
    if (l) { lenis = l; lenisHadAnchors = !!l.options.anchors; window.__scrollFeel.lenis = l; register(); apply(); return; }
    if (++tries < 200) setTimeout(wait, 50);
  })();
})();
