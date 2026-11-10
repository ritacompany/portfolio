// Tuner: a slider panel on the preview link only (never shipped; scripts/build-preview.mjs injects it).
// Chadwick moves the values the review is deciding, sees them live on the page, and taps Copy values to
// send them back. Values live in this browser only (localStorage) until he sends them.
(() => {
  const KNOBS = [
    { v: "--rv-card-overlay", label: "Card hover overlay", min: 0, max: 1, step: 0.05, unit: "", def: 0.5, fmt: (x) => Math.round(x * 100) + "%" },
    { v: "--rv-portrait-scale", label: "Footer portraits, tablet", min: 0.4, max: 1, step: 0.05, unit: "", def: 0.7, fmt: (x) => Math.round(x * 100) + "%" },
    { v: "--rv-about-gap", label: "About label to text, phone", min: 8, max: 96, step: 4, unit: "px", def: 40 },
    { v: "--rv-learn-scale", label: "Learn more size, phone", min: 0.4, max: 1, step: 0.05, unit: "", def: 0.6, fmt: (x) => Math.round(x * 100) + "%" },
    { v: "--rv-card-gap", label: "Card text to Learn more, phone", min: 0, max: 48, step: 2, unit: "px", def: 16 },
  ];
  const KEY = "tuner-v1";
  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const root = document.documentElement;
  const apply = (k) => { const x = state[k.v] ?? k.def; root.style.setProperty(k.v, x + k.unit); return x; };
  KNOBS.forEach(apply);

  const ui = document.createElement("div"); ui.className = "tn-ui";
  const panel = document.createElement("div"); panel.className = "tn-panel"; panel.hidden = true;
  const toggle = document.createElement("button"); toggle.className = "tn-toggle"; toggle.type = "button";
  toggle.textContent = "Tune"; toggle.setAttribute("aria-pressed", "false");
  toggle.onclick = () => { panel.hidden = !panel.hidden; toggle.setAttribute("aria-pressed", String(!panel.hidden)); };

  for (const k of KNOBS) {
    const row = document.createElement("label"); row.className = "tn-row";
    const name = document.createElement("span"); name.textContent = k.label;
    const out = document.createElement("output");
    const input = document.createElement("input");
    Object.assign(input, { type: "range", min: k.min, max: k.max, step: k.step, value: state[k.v] ?? k.def });
    const show = (x) => { out.textContent = k.fmt ? k.fmt(x) : x + k.unit; };
    show(+input.value);
    input.oninput = () => { state[k.v] = +input.value; apply(k); show(+input.value); save(); };
    row.append(name, out, input); panel.append(row);
  }
  const actions = document.createElement("div"); actions.className = "tn-actions";
  const copy = document.createElement("button"); copy.type = "button"; copy.textContent = "Copy values";
  copy.onclick = async () => {
    const text = "Tuner values (" + (document.title.split(",")[0]) + ", " + innerWidth + " px wide):\n" +
      KNOBS.map((k) => `- ${k.label}: ${k.fmt ? k.fmt(state[k.v] ?? k.def) : (state[k.v] ?? k.def) + k.unit}`).join("\n");
    try { await navigator.clipboard.writeText(text); copy.textContent = "Copied"; }
    catch { prompt("Copy these values", text); }
    setTimeout(() => (copy.textContent = "Copy values"), 1500);
  };
  const reset = document.createElement("button"); reset.type = "button"; reset.textContent = "Reset";
  reset.onclick = () => { state = {}; save(); location.reload(); };
  actions.append(copy, reset); panel.append(actions);
  ui.append(panel, toggle);
  (document.body ? Promise.resolve() : new Promise((r) => addEventListener("DOMContentLoaded", r))).then(() => document.body.append(ui));
})();
