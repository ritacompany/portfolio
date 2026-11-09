#!/usr/bin/env python3
"""Builds the Contact button tuner, a self contained page Chadwick can open, feel and tune.
It inlines site/js/contact-goo.js unchanged in behaviour, so what he tunes is what ships.
Usage: python3 scripts/motion-tuner/contact-goo.py site/motion-lab/contact-goo-tuner.html"""
import base64, re, sys, pathlib
R = pathlib.Path(__file__).resolve().parents[2]
pg = (R / "site/motion-lab/contact-button-playground.html").read_text()
fonts = "\n".join(re.findall(r"@font-face\{[^}]*\}", pg)[:2])
icon = "data:image/svg+xml;base64," + base64.b64encode((R / "site/assets/ui/mail-asterisk.svg").read_bytes()).decode()
mod = (R / "site/js/contact-goo.js").read_text()
mod = mod.replace("export ", "").replace("if (!window.__GOO_MANUAL__) startContactGoo();", "")
PAGE = r"""<title>Contact button tuner</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
FONTS
/* Layout: the footer button on the portfolio's own dark canvas, big and alone, sliders grouped by what you feel (shape, hover, press) under it. One dark look on purpose: the button only ever sits on that canvas. */
:root{color-scheme:dark;--canvas:#040405;--panel:#0b0b0d;--line:#1d1d21;--ink:#e8e7ee;--soft:#aeaeb4;--mute:#6e6e78;--font:Satoshi,"Helvetica Neue",Arial,sans-serif;--neutral-100:#e8e7ee}
*{box-sizing:border-box;margin:0}
body{background:var(--canvas);color:var(--ink);font:400 15px/1.45 var(--font);-webkit-font-smoothing:antialiased;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-block:32px 64px}
.wrap{max-width:1040px;margin:0 auto;display:grid;gap:24px}
header{display:grid;gap:8px}
header h1{font-weight:700;font-size:28px;letter-spacing:-.03em;text-wrap:balance}
header p{color:var(--soft);max-width:64ch}
.stage{position:relative;height:340px;border:1px solid var(--line);border-radius:16px;display:grid;place-items:center;touch-action:none;overflow:hidden;background:var(--canvas)}
.stage .zoomer{transform-origin:center;transition:transform .3s ease}
.stage.is-zoom .zoomer{transform:scale(2)}
.bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.bar .label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);margin-right:4px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden}
.seg button,.btn{font:inherit;font-size:13px;color:var(--ink);background:transparent;border:0;padding:8px 14px;cursor:pointer}
.btn{border:1px solid var(--line);border-radius:999px}
.seg button[aria-pressed=true]{background:var(--ink);color:var(--canvas)}
button:focus-visible,.button:focus-visible,input:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.groups{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
fieldset{border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:16px 18px 18px;display:grid;gap:14px;min-width:0}
legend{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);padding:0 6px}
.hint{font-size:13px;color:var(--mute);margin-top:-6px}
label{display:grid;gap:6px;font-size:13px;color:var(--soft)}
label span{display:flex;justify-content:space-between;gap:8px}
output{color:var(--ink);font-variant-numeric:tabular-nums}
input[type=range]{width:100%;accent-color:var(--ink)}
.out{display:grid;gap:10px;border:1px solid var(--line);border-radius:14px;background:var(--panel);padding:16px 18px}
pre{white-space:pre-wrap;word-break:break-word;font:12px/1.5 ui-monospace,Menlo,monospace;color:var(--soft)}
/* The button, as components.css draws it. */
.button{display:inline-flex;align-items:center;border-radius:73px;color:var(--ink);text-decoration:none;position:relative}
.button__icon{display:grid;place-items:center;flex:none;width:78px;height:75.92px;margin-right:-3px;border:3.309px solid var(--ink);border-radius:72.793px}
.button__icon img{width:44.117px;height:44.117px;display:block}
.button__label{padding:20.745px calc(18px + .04em) 20.745px 18px;border:3px solid var(--ink);border-radius:65px;font:700 40px/46px var(--font);letter-spacing:-.04em;text-transform:uppercase;white-space:nowrap}
.button.is-goo .button__icon,.button.is-goo .button__label{border-color:transparent;position:relative;z-index:1}
.goo-shapes{position:absolute;inset:-60px;filter:url(#goo-ring);pointer-events:none}
.goo-shapes span{position:absolute;background:var(--ink);border-radius:999px}
@media (max-width:560px){.stage{height:260px}.stage .zoomer{transform:scale(.8)}.stage.is-zoom .zoomer{transform:scale(1.4)}}
</style>
<div class="wrap">
<header><h1>Contact button tuner</h1>
<p>This is the real footer button running the code that ships. Hover it, wiggle in and out, press and hold, then leave. Drag a slider and hover again to feel the change. Slow motion and 2x zoom are for looking closely; judge at 1x and actual size. When it feels right, copy the settings and paste the line to me. The effect runs here even with reduced motion on, so you can tune it; the site keeps plain borders under reduced motion.</p></header>
<div class="stage" id="stage"><div class="zoomer"><a class="button" id="btn" href="#" aria-label="Contact"><span class="button__icon" aria-hidden="true"><img src="ICON" alt=""></span><span class="button__label">Contact</span></a></div></div>
<div class="bar">
<span class="label">Speed</span><div class="seg" id="speed"><button type="button" data-v="0.25" aria-pressed="false">¼×</button><button type="button" data-v="0.5" aria-pressed="false">½×</button><button type="button" data-v="1" aria-pressed="true">1×</button></div>
<span class="label">View</span><div class="seg" id="zoom"><button type="button" data-v="1" aria-pressed="true">Actual size</button><button type="button" data-v="2" aria-pressed="false">2× zoom</button></div>
</div>
<div class="groups" id="groups"></div>
<div class="out"><div class="bar"><button type="button" class="btn" id="copy">Copy settings</button><button type="button" class="btn" id="reset">Reset to shipped</button></div><pre id="dump"></pre></div>
</div>
<script type="module">
MODULE
const SHIPPED = { ...GOO };
window.GOO = GOO; // for scripts/motion-tuner/verify-tuner.mjs
const GROUPS = [
 ["Shape at rest", "How the two pills melt into one body and how the line is drawn.", [
  ["blur", "Goo amount", 3, 18, 0.5, ""], ["merge", "Edge sharpness", 8, 60, 1, ""], ["cut", "Neck cutoff", 2, 40, 0.5, ""], ["line", "Line weight", 1, 6, 0.5, "px"]]],
 ["Hover", "How far the circle pulls, how long the move takes, how much it tucks in first and overshoots, and how the icon tips.", [
  ["pull", "Pull distance", 0, 70, 1, "px"], ["dur", "Move time", 120, 900, 10, "ms"], ["bounce", "Tuck and overshoot", 0, 3, 0.1, ""], ["tilt", "Icon tilt", 0, 60, 1, "deg"]]],
 ["Press", "How much the shapes squeeze while you hold, and how fast.", [
  ["squeeze", "Press squeeze", 0, 14, 0.5, "px"], ["pressDur", "Press time", 60, 400, 10, "ms"]]],
];
const KEY = "contact-goo-tuning";
try { Object.assign(GOO, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch {}
const dump = () => { const t = "export const GOO = " + JSON.stringify(GOO).replace(/"/g, "").replace(/,/g, ", ").replace(/:/g, ": ").replace("{", "{ ").replace("}", " }") + ";"; document.getElementById("dump").textContent = t; try { localStorage.setItem(KEY, JSON.stringify(GOO)); } catch {} return t; };
const groups = document.getElementById("groups");
const build = () => { groups.innerHTML = ""; for (const [title, hint, sl] of GROUPS) {
  const fs = document.createElement("fieldset"); fs.innerHTML = `<legend>${title}</legend><p class="hint">${hint}</p>`;
  for (const [k, name, min, max, step, unit] of sl) {
    const l = document.createElement("label"); l.htmlFor = "s-" + k;
    l.innerHTML = `<span>${name}<output id="o-${k}"></output></span><input type="range" id="s-${k}" min="${min}" max="${max}" step="${step}" value="${GOO[k]}">`;
    const inp = l.querySelector("input"), o = l.querySelector("output");
    const show = () => { o.textContent = (+inp.value) + (unit ? " " + unit : "") + (+inp.value === SHIPPED[k] ? "" : " •"); };
    show(); inp.addEventListener("input", () => { GOO[k] = +inp.value; show(); applyFilter(); dump(); });
    fs.appendChild(l);
  } groups.appendChild(fs); } };
build(); dump();
let speed = 1;
const seg = (id, fn) => document.getElementById(id).addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; for (const x of e.currentTarget.children) x.setAttribute("aria-pressed", x === b); fn(+b.dataset.v); });
seg("speed", (v) => { speed = v; });
seg("zoom", (v) => document.getElementById("stage").classList.toggle("is-zoom", v === 2));
document.getElementById("btn").addEventListener("click", (e) => e.preventDefault());
document.getElementById("reset").addEventListener("click", () => { Object.assign(GOO, SHIPPED); applyFilter(); build(); dump(); });
document.getElementById("copy").addEventListener("click", (e) => { const b = e.currentTarget, t = dump();
  navigator.clipboard.writeText(t).then(() => { b.textContent = "Copied"; }, () => { const r = document.createRange(); r.selectNodeContents(document.getElementById("dump")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected, press copy"; })
  .then(() => setTimeout(() => { b.textContent = "Copy settings"; }, 1600)); });
startContactGoo(document.getElementById("stage"), { speed: () => speed, force: true });
</script>
"""
out = PAGE.replace("FONTS", fonts).replace("ICON", icon).replace("MODULE", mod)
pathlib.Path(sys.argv[1]).write_text(out)
print("wrote", sys.argv[1], len(out))
