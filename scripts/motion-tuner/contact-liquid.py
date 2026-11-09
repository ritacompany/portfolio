#!/usr/bin/env python3
"""Builds the liquid Contact button tuner: one self contained page Chadwick opens, feels and tunes.
It inlines site/js/contact-liquid.js as is, so what he tunes is the engine that ships.
Panel design follows docs/motion/contact-liquid/research.md (grouped by what you feel, speed and bounce
springs with a response graph, presets, A and B, undo, slow motion, debug view, demo replay, copy back).
Usage: python3 scripts/motion-tuner/contact-liquid.py site/motion-lab/contact-liquid-tuner.html"""
import base64, re, sys, pathlib

R = pathlib.Path(__file__).resolve().parents[2]
pg = (R / "site/motion-lab/contact-button-playground.html").read_text()
fonts = "\n".join(re.findall(r"@font-face\{[^}]*\}", pg)[:2])
icon = "data:image/svg+xml;base64," + base64.b64encode((R / "site/assets/ui/mail-asterisk.svg").read_bytes()).decode()
engine = (R / "site/js/contact-liquid.js").read_text().replace("export ", "")

PAGE = r"""<title>Liquid Contact tuner</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
FONTS
/* Layout: an editor. The button on its real footer canvas fills the left and stays in view; the panel on
   the right groups every value by what you feel. On a phone the stage sticks to the top and the panel
   scrolls under it. One dark look on purpose: the button only ever sits on the footer's black. */
:root{color-scheme:dark;
  --canvas:#040405;      /* the footer, behind the button */
  --app:#0b0b0d;         /* editor ground */
  --s1:#131316;          /* panel groups */
  --s2:#1b1b1f;          /* controls, menus */
  --edge:rgba(255,255,255,.08);
  --ink:#e8e7ee;         /* text, matches Neutral 100 */
  --soft:#a9a9b3;        /* secondary text, 7:1 on s1 */
  --mute:#7c7c87;        /* hints */
  --tint:#9cc0ff;        /* focus and changed marks, desaturated for dark */
  --ui:Satoshi,"Helvetica Neue",Arial,sans-serif;
  --num:ui-monospace,"SF Mono",Menlo,Consolas,monospace}
*{box-sizing:border-box;margin:0}
html,body{background:var(--app)}
body{color:var(--ink);font:400 14px/1.45 var(--ui);-webkit-font-smoothing:antialiased;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:20px 48px}
.app{max-width:1400px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) 400px;gap:20px;align-items:start}
.left{position:sticky;top:max(20px,env(safe-area-inset-top,0px));display:grid;gap:12px;min-width:0}
header{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:baseline;justify-content:space-between}
header h1{font-weight:700;font-size:20px;letter-spacing:-.02em}
header p{color:var(--soft);font-size:13px;max-width:60ch}
.stage{position:relative;height:min(62vh,560px);min-height:320px;border:1px solid var(--edge);border-radius:14px;background:var(--canvas);display:grid;place-items:center;touch-action:none;overflow:hidden}
.zoomer{transform-origin:center;transition:transform .3s ease}
.stage.is-zoom .zoomer{transform:scale(2)}
.ghost{position:absolute;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;border:2px solid var(--ink);box-shadow:0 0 0 2px var(--canvas);pointer-events:none;display:none;z-index:3}
.stage.is-demo .ghost{display:block}
.badge{position:absolute;left:12px;top:12px;font:500 11px/1 var(--num);color:var(--mute);letter-spacing:.04em;display:flex;gap:8px}
.badge b{color:var(--tint);font-weight:500}
.tools{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.tools .sep{width:1px;height:22px;background:var(--edge);margin:0 2px}
.seg{display:inline-flex;border:1px solid var(--edge);border-radius:999px;overflow:hidden;background:var(--s1)}
.seg button{border:0;border-radius:0}
button,select,.file{font:inherit;font-size:13px;color:var(--ink);background:var(--s1);border:1px solid var(--edge);border-radius:999px;padding:7px 12px;cursor:pointer;line-height:1.1}
button:hover,select:hover{background:var(--s2)}
button[aria-pressed=true]{background:var(--ink);color:var(--canvas)}
button:disabled{opacity:.35;cursor:default}
button:focus-visible,select:focus-visible,input:focus-visible,summary:focus-visible{outline:2px solid var(--tint);outline-offset:2px}
select{appearance:none;padding-right:28px;background-image:linear-gradient(45deg,transparent 50%,var(--soft) 50%),linear-gradient(135deg,var(--soft) 50%,transparent 50%);background-position:calc(100% - 15px) 52%,calc(100% - 10px) 52%;background-size:5px 5px;background-repeat:no-repeat}
.panel{display:grid;gap:10px;min-width:0}
details{background:var(--s1);border:1px solid var(--edge);border-radius:12px}
summary{list-style:none;cursor:pointer;padding:12px 14px;display:flex;gap:10px;align-items:baseline;justify-content:space-between}
summary::-webkit-details-marker{display:none}
summary h2{font-size:13px;font-weight:700;letter-spacing:.01em}
summary span{font-size:12px;color:var(--mute);text-align:right}
details[open] summary{border-bottom:1px solid var(--edge)}
.rows{display:grid;gap:12px;padding:12px 14px 14px}
.row{display:grid;gap:6px}
.row .top{display:flex;align-items:center;gap:8px}
.row label{flex:1;color:var(--soft);font-size:13px}
.row .dot{width:6px;height:6px;border-radius:50%;background:var(--tint);visibility:hidden}
.row.is-changed .dot{visibility:visible}
.row .reset{padding:2px 7px;font-size:11px;visibility:hidden}
.row.is-changed .reset{visibility:visible}
.row input[type=number],.row input[type=text]{width:74px;font:12px var(--num);color:var(--ink);background:var(--s2);border:1px solid var(--edge);border-radius:6px;padding:4px 6px;text-align:right}
.row input[type=range]{width:100%;accent-color:var(--ink);height:18px}
.row input[type=color]{width:36px;height:26px;border:1px solid var(--edge);border-radius:6px;background:var(--s2);padding:2px}
.row .hint{font-size:12px;color:var(--mute)}
canvas.graph{width:100%;height:56px;display:block;border-radius:8px;background:var(--app)}
.out{display:grid;gap:10px;background:var(--s1);border:1px solid var(--edge);border-radius:12px;padding:12px 14px}
.out .tools{gap:6px}
textarea{width:100%;min-height:72px;font:12px/1.5 var(--num);color:var(--ink);background:var(--app);border:1px solid var(--edge);border-radius:8px;padding:8px;resize:vertical}
.msg{font-size:12px;color:var(--tint);min-height:1em}
/* The button, as components.css and contact-liquid.css draw it. */
.button{display:inline-flex;align-items:center;border-radius:73px;color:var(--ink);text-decoration:none;position:relative}
.button__icon{display:grid;place-items:center;flex:none;width:78px;height:75.92px;margin-right:-3px;border:3.309px solid var(--ink);border-radius:72.793px}
.button__icon img{width:44.117px;height:44.117px;display:block;max-width:none}
.button__label{padding:20.745px calc(18px + .04em) 20.745px 18px;border:3px solid var(--ink);border-radius:65px;font:700 40px/46px var(--ui);letter-spacing:-.04em;text-transform:uppercase;white-space:nowrap}
.button.is-liquid .button__icon,.button.is-liquid .button__label{border-color:transparent;position:relative;z-index:1}
.liquid-layer{z-index:0;max-width:none}
@media (max-width:980px){.app{display:flex;flex-direction:column;gap:12px}.left{display:contents}.stage{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;width:100%;height:280px;min-height:0;box-shadow:0 10px 0 var(--app)}.panel{margin-top:8px}}
@media (max-width:520px){.stage{height:220px}.zoomer{transform:scale(.72)}.stage.is-zoom .zoomer{transform:scale(1.3)}header p{display:none}}
@media (prefers-reduced-motion:reduce){.zoomer{transition:none}}
</style>
<div class="app">
<div class="left">
<header><h1>Liquid Contact tuner</h1><p>The real footer button on the engine that ships. Push it from inside, brush past an edge, pull out of it, press and hold. Change a value and feel it again.</p></header>
<div class="stage" id="stage">
<div class="badge"><span id="slot-badge">Editing</span><span id="speed-badge"></span></div>
<div class="zoomer"><a class="button" id="btn" href="#" aria-label="Contact"><span class="button__icon" aria-hidden="true"><img src="ICON" alt=""></span><span class="button__label">Contact</span></a></div>
<span class="ghost" id="ghost"></span>
</div>
<div class="tools">
<select id="preset" aria-label="Preset"></select>
<span class="sep"></span>
<button type="button" id="undo" title="Undo (Ctrl or Cmd Z)">Undo</button><button type="button" id="redo" title="Redo (Shift Ctrl or Cmd Z)">Redo</button>
<span class="sep"></span>
<button type="button" id="save-a" title="Keep these settings as A">Save A</button><button type="button" id="save-b" title="Keep these settings as B">Save B</button>
<div class="seg"><button type="button" id="show-a" disabled>A</button><button type="button" id="show-b" disabled>B</button></div>
<span class="sep"></span>
<button type="button" id="demo" aria-pressed="false" title="Play a scripted pass through every state">Play demo</button>
<button type="button" id="debug" aria-pressed="false" title="Show rest shapes, pointer reach and the caught point">Debug view</button>
<div class="seg" id="speed" aria-label="Speed"><button type="button" data-v="0.1">0.1×</button><button type="button" data-v="0.25">¼×</button><button type="button" data-v="0.5">½×</button><button type="button" data-v="1" aria-pressed="true">1×</button></div>
<div class="seg" id="zoom" aria-label="Zoom"><button type="button" data-v="1" aria-pressed="true">1×</button><button type="button" data-v="2">2×</button></div>
</div>
</div>
<div class="panel" id="panel"></div>
</div>
<script type="module">
ENGINE
// Tuner. Every control writes straight into CFG, which the engine reads each frame.
const SHIP = { ...DEFAULTS };
const SPRING_PAIRS = { outT: "outBounce", dentT: "dentBounce", iconT: "iconBounce", pressT: "pressBounce" };
const GROUPS = [
 ["Rest", "How it sits before you touch it.", [
  ["line", "Line weight", 1, 6, 0.25, "px"], ["restGap", "Gap between circle and pill", -3, 24, 0.5, "px", "0 is Figma: they touch"]]],
 ["Colours", "Outline, body and the colour hidden behind it.", [
  ["lineColor", "Outline", "color"], ["bodyColor", "Body", "color", "Same as the footer makes it invisible"], ["hiddenOn", "Show hidden colour", "toggle"], ["hiddenColor", "Hidden colour", "color", "Not decided yet; this is the reference cyan"], ["hiddenAlpha", "Hidden colour strength", 0, 1, 0.05, ""]]],
 ["Push from inside", "The outline bulges out around the pointer.", [
  ["bulge", "How far it bulges", 0, 40, 0.5, "px"], ["reach", "How wide the bulge is", 10, 120, 1, "px"], ["outT", "Speed", 0.12, 1.5, 0.01, "s"], ["outBounce", "Bounce", 0, 0.9, 0.01, ""], ["ripple", "Ripple along the edge", 0, 0.2, 0.005, ""]]],
 ["Pull out", "Leaving, the edge sticks to the pointer, stretches, then lets go.", [
  ["drag", "How far it stretches", 0, 70, 1, "px", "0 turns it off"], ["dragSpan", "How much edge comes with it", 6, 90, 1, "px"], ["release", "Let go distance", 10, 140, 1, "px"]]],
 ["Brush past", "Near an edge from outside, the body dents and the hidden colour shows.", [
  ["dent", "How deep it dents", 0, 40, 0.5, "px"], ["dentReach", "How close before it reacts", 8, 120, 1, "px"], ["dentSpan", "How wide the dent is", 8, 100, 1, "px"], ["dentT", "Speed", 0.12, 1.5, 0.01, "s"], ["dentBounce", "Bounce", 0, 0.9, 0.01, ""]]],
 ["Mail circle", "On hover the circle pulls away and tips.", [
  ["pull", "Pull distance", 0, 80, 1, "px"], ["pullDir", "Pull direction", "seg", [["Left", 0], ["Right", 1], ["Away from pointer", 2]]], ["follow", "Follows the pointer up and down", 0, 0.6, 0.01, ""], ["tilt", "Icon tip", 0, 90, 1, "°"], ["iconT", "Speed", 0.12, 1.5, 0.01, "s"], ["iconBounce", "Bounce", 0, 0.9, 0.01, ""]]],
 ["Melt", "While the circle moves the shapes melt together and snap apart.", [
  ["gooHover", "Melt while hovered", 0, 20, 0.5, ""], ["gooRest", "Melt at rest", 0, 20, 0.5, "", "Above 0 joins them at rest"], ["gooT", "Melt fade time", 0.1, 2.5, 0.05, "s"], ["neck", "Neck strength", 6, 60, 1, ""], ["cutoff", "Neck cutoff", 2, 40, 0.5, ""]]],
 ["Press", "Holding down squeezes both shapes.", [
  ["squeeze", "Squeeze", 0, 16, 0.5, "px"], ["pressT", "Speed", 0.12, 1.2, 0.01, "s"], ["pressBounce", "Bounce", 0, 0.9, 0.01, ""]]],
];
const PRESETS = {
 "Mix (default)": {},
 "Gooey reference (joined at rest)": { gooRest: 9, bulge: 0, drag: 0, dent: 0, hiddenOn: 0 },
 "Liquid outline only": { pull: 0, tilt: 0, follow: 0, gooHover: 0 },
 "No hidden colour": { hiddenOn: 0 },
 "Calm": { bulge: 7, reach: 56, outT: 0.6, outBounce: 0.25, drag: 14, dent: 9, dentT: 0.8, dentBounce: 0.15, pull: 22, tilt: 10, iconT: 0.6, iconBounce: 0.3, squeeze: 3 },
 "Wild": { bulge: 26, reach: 64, outT: 0.3, outBounce: 0.82, ripple: 0.09, drag: 48, dragSpan: 44, release: 90, dent: 30, dentSpan: 46, dentBounce: 0.7, pull: 52, tilt: 40, iconBounce: 0.8, follow: 0.3, squeeze: 9, pressBounce: 0.7 },
};
const KEY = "liquid-contact-tuner";
const store = { get() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; } }, set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} } };
const saved = store.get();
if (saved && saved.cfg) Object.assign(CFG, sanitize(saved.cfg));
const slots = { A: saved && saved.A ? sanitize(saved.A) : null, B: saved && saved.B ? sanitize(saved.B) : null };
let undo = [], redo = [], speed = 1, debugOn = false, demoOn = false, demoStart = 0, clockNow = 0, demoPt = null, slot = null;

function sanitize(o) { const r = {}; for (const k in o) if (k in DEFAULTS && typeof o[k] === typeof DEFAULTS[k]) r[k] = o[k]; return r; }
const snap = () => JSON.stringify(CFG);
function commit(prev) { if (prev !== snap()) { undo.push(prev); if (undo.length > 200) undo.shift(); redo = []; } persist(); refreshButtons(); }
function persist() { store.set({ cfg: CFG, A: slots.A, B: slots.B }); }
function applyAll(obj, label) { const prev = snap(); Object.assign(CFG, DEFAULTS, obj); slot = label || null; syncAll(); commit(prev); }
function set(k, v) { const prev = snap(); CFG[k] = v; syncRow(k); drawGraphs(); commit(prev); }

// Rows
const panel = document.getElementById("panel"), rows = {}, graphs = [];
const fmt = (v, step) => { const d = (String(step).split(".")[1] || "").length; return (+v).toFixed(d); };
for (const [title, hint, items] of GROUPS) {
  const det = document.createElement("details"); det.open = true;
  det.innerHTML = `<summary><h2>${title}</h2><span>${hint}</span></summary><div class="rows"></div>`;
  const box = det.querySelector(".rows");
  for (const it of items) {
    const [k, name, a, b, step, unit, note] = it, row = document.createElement("div");
    row.className = "row"; row.dataset.key = k; const id = "c-" + k;
    if (a === "color") {
      row.innerHTML = `<div class="top"><span class="dot"></span><label for="${id}">${name}</label><button type="button" class="reset" title="Back to shipped">Reset</button><input type="text" id="${id}-hex" aria-label="${name} hex" spellcheck="false"><input type="color" id="${id}"></div>${b ? `<p class="hint">${b}</p>` : ""}`;
      const col = row.querySelector("input[type=color]"), hex = row.querySelector("input[type=text]");
      let before = null;
      col.addEventListener("focus", () => { before = snap(); });
      col.addEventListener("input", () => { CFG[k] = col.value; hex.value = col.value; mark(k); });
      col.addEventListener("change", () => commit(before || snap()));
      hex.addEventListener("change", () => { if (/^#[0-9a-f]{6}$/i.test(hex.value)) set(k, hex.value.toLowerCase()); else syncRow(k); });
    } else if (a === "toggle") {
      row.innerHTML = `<div class="top"><span class="dot"></span><label for="${id}">${name}</label><button type="button" class="reset" title="Back to shipped">Reset</button><input type="checkbox" id="${id}"></div>`;
      row.querySelector("input").addEventListener("change", (e) => set(k, e.target.checked ? 1 : 0));
    } else if (a === "seg") {
      row.innerHTML = `<div class="top"><span class="dot"></span><label>${name}</label><button type="button" class="reset" title="Back to shipped">Reset</button></div><div class="seg" role="group" aria-label="${name}">${b.map(([t, v]) => `<button type="button" data-v="${v}">${t}</button>`).join("")}</div>`;
      row.querySelector(".seg").addEventListener("click", (e) => { const x = e.target.closest("button"); if (x) set(k, +x.dataset.v); });
    } else {
      row.innerHTML = `<div class="top"><span class="dot"></span><label for="${id}">${name}${unit ? ` <span class="hint">${unit}</span>` : ""}</label><button type="button" class="reset" title="Back to shipped">Reset</button><input type="number" id="${id}-n" min="${a}" max="${b}" step="${step}" aria-label="${name} value"></div><input type="range" id="${id}" min="${a}" max="${b}" step="${step}">${note ? `<p class="hint">${note}</p>` : ""}`;
      const rng = row.querySelector("input[type=range]"), num = row.querySelector("input[type=number]");
      let before = null;
      rng.addEventListener("pointerdown", () => { before = snap(); });
      rng.addEventListener("keydown", () => { if (!before) before = snap(); });
      rng.addEventListener("input", () => { if (!before) before = snap(); CFG[k] = +rng.value; num.value = fmt(rng.value, step); mark(k); drawGraphs(); });
      rng.addEventListener("change", () => { commit(before || snap()); before = null; });
      num.addEventListener("change", () => { const v = Math.min(b, Math.max(a, +num.value)); if (!isNaN(v)) set(k, v); else syncRow(k); });
    }
    row.querySelector(".reset").addEventListener("click", () => set(k, SHIP[k]));
    row.querySelector("label").addEventListener("dblclick", () => set(k, SHIP[k]));
    rows[k] = { row, it }; box.appendChild(row);
    if (SPRING_PAIRS[k]) { /* graph goes after the bounce row */ }
    if (Object.values(SPRING_PAIRS).includes(k)) {
      const T = Object.keys(SPRING_PAIRS).find((x) => SPRING_PAIRS[x] === k), c = document.createElement("canvas");
      c.className = "graph"; c.setAttribute("aria-label", "How this spring moves to its target"); c.setAttribute("role", "img");
      box.appendChild(c); graphs.push([c, T, k]);
    }
  }
  panel.appendChild(det);
}
const out = document.createElement("div"); out.className = "out";
out.innerHTML = `<div class="tools"><button type="button" id="copy-claude" title="Copy a message you can paste to Claude">Copy for Claude</button><button type="button" id="copy-json">Copy JSON</button><button type="button" id="reset-all">Reset all</button></div>
<label class="hint" for="paste">Paste settings to load them</label><textarea id="paste" spellcheck="false" placeholder='{"pull": 40, "bulge": 12}'></textarea>
<div class="tools"><button type="button" id="load">Load pasted</button></div><p class="msg" id="msg" role="status"></p>`;
panel.appendChild(out);

function mark(k) { const r = rows[k]; if (r) r.row.classList.toggle("is-changed", CFG[k] !== SHIP[k]); }
function syncRow(k) {
  const r = rows[k]; if (!r) return; const [, , a, b, step] = r.it, v = CFG[k];
  if (a === "color") { r.row.querySelector("input[type=color]").value = v; r.row.querySelector("input[type=text]").value = v; }
  else if (a === "toggle") r.row.querySelector("input").checked = !!v;
  else if (a === "seg") r.row.querySelectorAll(".seg button").forEach((x) => x.setAttribute("aria-pressed", +x.dataset.v === v));
  else { r.row.querySelector("input[type=range]").value = v; r.row.querySelector("input[type=number]").value = fmt(v, step); }
  mark(k);
}
function syncAll() { Object.keys(DEFAULTS).forEach(syncRow); drawGraphs(); refreshButtons(); }
function drawGraphs() {
  for (const [c, T, B] of graphs) {
    const dpr = devicePixelRatio || 1, w = c.clientWidth || 300, h = 56; c.width = w * dpr; c.height = h * dpr;
    const x = c.getContext("2d"); x.scale(dpr, dpr); x.clearRect(0, 0, w, h);
    const { k, d } = springK(CFG[T], CFG[B]), N = 90; let p = 0, v = 0; const pts = [];
    for (let i = 0; i <= N; i++) { pts.push(p); v = (v + (1 - p) * k) * d; p += v; }
    const max = Math.max(1.05, ...pts), y = (q) => h - 8 - (q / max) * (h - 16);
    x.strokeStyle = "rgba(255,255,255,.12)"; x.setLineDash([3, 4]); x.beginPath(); x.moveTo(0, y(1)); x.lineTo(w, y(1)); x.stroke(); x.setLineDash([]);
    x.strokeStyle = "#e8e7ee"; x.lineWidth = 1.5; x.beginPath(); pts.forEach((q, i) => { const X = (i / N) * w; i ? x.lineTo(X, y(q)) : x.moveTo(X, y(q)); }); x.stroke();
    x.fillStyle = "#7c7c87"; x.font = "10px ui-monospace,Menlo,monospace"; x.fillText("1.5 s", w - 30, h - 2);
  }
}
function refreshButtons() {
  document.getElementById("undo").disabled = !undo.length; document.getElementById("redo").disabled = !redo.length;
  document.getElementById("show-a").disabled = !slots.A; document.getElementById("show-b").disabled = !slots.B;
  document.getElementById("show-a").setAttribute("aria-pressed", slot === "A"); document.getElementById("show-b").setAttribute("aria-pressed", slot === "B");
  document.getElementById("slot-badge").innerHTML = slot ? `Showing <b>${slot}</b>` : "Editing";
  document.getElementById("speed-badge").textContent = speed === 1 ? "" : `${speed}× speed`;
}

// Toolbar
const preset = document.getElementById("preset");
preset.innerHTML = `<option value="">Presets</option>` + Object.keys(PRESETS).map((n) => `<option>${n}</option>`).join("");
preset.addEventListener("change", () => { if (preset.value) applyAll(PRESETS[preset.value]); preset.value = ""; });
const doUndo = () => { if (!undo.length) return; redo.push(snap()); Object.assign(CFG, JSON.parse(undo.pop())); slot = null; syncAll(); persist(); };
const doRedo = () => { if (!redo.length) return; undo.push(snap()); Object.assign(CFG, JSON.parse(redo.pop())); slot = null; syncAll(); persist(); };
document.getElementById("undo").addEventListener("click", doUndo);
document.getElementById("redo").addEventListener("click", doRedo);
addEventListener("keydown", (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); e.shiftKey ? doRedo() : doUndo(); } });
const saveSlot = (s) => { slots[s] = { ...CFG }; slot = s; persist(); refreshButtons(); say(`Saved as ${s}`); };
const showSlot = (s) => { if (!slots[s]) return; const prev = snap(); Object.assign(CFG, slots[s]); slot = s; syncAll(); commit(prev); };
document.getElementById("save-a").addEventListener("click", () => saveSlot("A"));
document.getElementById("save-b").addEventListener("click", () => saveSlot("B"));
document.getElementById("show-a").addEventListener("click", () => showSlot("A"));
document.getElementById("show-b").addEventListener("click", () => showSlot("B"));
const stage = document.getElementById("stage"), ghost = document.getElementById("ghost");
document.getElementById("demo").addEventListener("click", (e) => { demoOn = !demoOn; demoStart = clockNow; e.currentTarget.setAttribute("aria-pressed", demoOn); e.currentTarget.textContent = demoOn ? "Stop demo" : "Play demo"; stage.classList.toggle("is-demo", demoOn); });
document.getElementById("debug").addEventListener("click", (e) => { debugOn = !debugOn; e.currentTarget.setAttribute("aria-pressed", debugOn); });
const seg = (id, fn) => document.getElementById(id).addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; for (const x of e.currentTarget.children) x.setAttribute("aria-pressed", x === b); fn(+b.dataset.v); });
seg("speed", (v) => { speed = v; refreshButtons(); });
seg("zoom", (v) => stage.classList.toggle("is-zoom", v === 2));
document.getElementById("btn").addEventListener("click", (e) => e.preventDefault());

// Copy and paste
const msg = document.getElementById("msg"); let msgT;
function say(t) { msg.textContent = t; clearTimeout(msgT); msgT = setTimeout(() => { msg.textContent = ""; }, 2400); }
function changed() { const o = {}; for (const k in DEFAULTS) if (CFG[k] !== SHIP[k]) o[k] = CFG[k]; return o; }
function copy(text, label) {
  navigator.clipboard.writeText(text).then(() => say(`${label} copied`), () => { const t = document.getElementById("paste"); t.value = text; t.select(); say("Copy blocked here; the text is selected in the box, copy it from there"); });
}
document.getElementById("copy-claude").addEventListener("click", () => {
  const c = changed();
  copy(`Liquid Contact button settings from the tuner. Changed from shipped: ${JSON.stringify(c)}. Full settings for CFG in site/js/contact-liquid.js: ${JSON.stringify(CFG)}`, "Message for Claude");
});
document.getElementById("copy-json").addEventListener("click", () => copy(JSON.stringify(CFG, null, 1), "JSON"));
document.getElementById("reset-all").addEventListener("click", () => applyAll({}));
function importText(text) {
  const m = String(text).match(/\{[\s\S]*?\}(?![\s\S]*\{)/) || String(text).match(/\{[\s\S]*\}/);
  try { const o = sanitize(JSON.parse(m ? m[0] : text)); if (!Object.keys(o).length) throw 0; const prev = snap(); Object.assign(CFG, o); slot = null; syncAll(); commit(prev); say(`Loaded ${Object.keys(o).length} settings`); return true; }
  catch { say("Could not read those settings. Paste the JSON or the message from Copy for Claude."); return false; }
}
document.getElementById("load").addEventListener("click", () => importText(document.getElementById("paste").value));

// Run
syncAll();
await (document.fonts && document.fonts.ready);
let run = null;
run = startLiquid(stage, {
  force: true, speed: () => speed, debug: () => debugOn,
  source: (u, clock) => {
    clockNow = clock;
    if (!demoOn) return run ? run.ptr.get(u) || null : null;
    demoPt = demoAt(clock - demoStart, u.btn.offsetWidth, u.btn.offsetHeight); return demoPt;
  },
});
const btn = document.getElementById("btn");
(function ghostLoop() {
  if (demoOn && demoPt) { const b = btn.getBoundingClientRect(), s = stage.getBoundingClientRect(), k = b.width / btn.offsetWidth || 1;
    ghost.style.transform = `translate(${b.left - s.left + demoPt.x * k}px, ${b.top - s.top + demoPt.y * k}px) scale(${demoPt.down ? 0.75 : 1})`; }
  requestAnimationFrame(ghostLoop);
})();
addEventListener("resize", drawGraphs);
window.__tuner = { ready: true, DEFAULTS: SHIP, CFG, set, importText, speed: () => speed, debug: () => debugOn, demoOn: () => demoOn };
</script>
"""

out = PAGE.replace("FONTS", fonts).replace("ICON", icon).replace("ENGINE", engine)
pathlib.Path(sys.argv[1]).write_text(out)
print("wrote", sys.argv[1], len(out))
