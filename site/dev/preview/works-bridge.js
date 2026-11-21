// Selected works in the edit panel, preview only. Home motion (home-motion.js, owned by another session)
// still draws its own white box; this file puts every one of its controls into the edit panel instead and
// hides the box (edit-panel.css). The ASCII styles in Reveal style (ascii-reveal.js) draw over the
// same reveal; its timing still comes from the sliders here. Each change is sent through the box's own sliders, so home-motion.js
// applies and saves it exactly as before. Goes once home-motion.js registers with the panel itself.
(() => {
  if (!document.querySelector(".home")) return;
  const LABELS = {
    worksGap: ["Gap above the section", "px"],
    titleAt: ["Title holds at", "vh"],
    hold: ["Title holds alone for", "vh"],
    revealFrom: ["Reveal starts, image top at", "of screen"],
    revealAt: ["Reveal done, card middle at", "of screen"],
    band: ["Checker edge width", "of image"],
    cell: ["Reveal square size", "px"],
    rise: ["Cards rise by", "px"],
    overlay: ["Dark layer on hover", ""],
    roleFrom: ["Product Designer leaves from", "of screen"],
    roleTo: ["and is gone at", "of screen"],
  };
  const SECTIONS = [
    ["works", "Selected works reveal", ["revealFrom", "revealAt", "band", "cell", "rise"], "How each card image dissolves in and rises as you scroll."],
    ["works-layout", "Selected works layout", ["worksGap", "titleHold", "titleAt", "hold", "overlay"], null],
    ["nav", "Nav", ["roleFrom", "roleTo"], null],
  ];
  let tries = 0;
  (function wait() {
    const box = document.querySelector(".hm-panel");
    if (!box || !window.__hm || !window.__hm.V) { if (++tries < 200) setTimeout(wait, 50); return; }
    if (box.closest(".ep") || window.__hm.usesEditPanel) return;
    const { V, DEFAULTS = {} } = window.__hm;
    const send = (k, v) => {
      const i = box.querySelector(`[data-k="${k}"]`);
      if (!i) return;
      i.value = String(typeof v === "boolean" ? +v : v);
      i.dispatchEvent(new Event("input", { bubbles: true }));
    };
    const control = (k) => {
      const i = box.querySelector(`[data-k="${k}"]`);
      if (!i) return null;
      if (k === "titleHold") return { key: k, label: "Title holds in place", type: "toggle", value: V[k] === 1, default: DEFAULTS[k] === 1, onInput: (v) => send(k, v ? 1 : 0) };
      const [label, unit] = LABELS[k] || [k, ""];
      return { key: k, label, unit, min: +i.min, max: +i.max, step: +i.step, value: V[k], default: DEFAULTS[k] ?? V[k], onInput: (v) => send(k, v),
        hint: k === "band" || k === "cell" ? "Checker squares style only (Reveal style)" : undefined,
        enabledWhen: k === "titleAt" || k === "hold" ? (vals) => !!vals.titleHold : undefined };
    };
    const click = (sel) => () => { const b = box.querySelector(sel); if (b) b.click(); };
    for (const [id, title, keys, note] of SECTIONS) {
      const def = {
        id: "home-" + id, title, note, persist: false,
        controls: keys.map(control).filter(Boolean),
        actions: id === "works" ? [{ label: "Replay reveals", onClick: click("[data-replay]") }] : [],
      };
      window.EditPanel ? window.EditPanel.register(def) : (window.EditPanelQueue ||= []).push(def);
    }
    document.documentElement.classList.add("ep-has-home");
  })();
})();
