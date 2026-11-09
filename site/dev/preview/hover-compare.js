// Preview only: a small panel, bottom left, always visible, for trying the hover proposals.
// Small links (nav, LinkedIn, Back to top): "Bolder" (proposal 15, option 4) or "Brighter only" (option 5).
// Two sliders: how bold the small links get, and the weight of the text on the light block (proposal 10).
// "Before" shows the hover drawing from before proposal 9. Choices are remembered in this browser only.
(() => {
  const root = document.documentElement;
  const get = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  const css = `
    .hv-panel { position: fixed; left: 12px; bottom: 12px; z-index: 99999; width: 260px; padding: 10px 12px;
      background: #fff; color: #000; font: 12px/1.35 system-ui, sans-serif; -webkit-font-smoothing: auto;
      border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,.35); }
    .hv-panel b { display: block; margin: 0 0 6px; font-weight: 600; }
    .hv-panel .hv-row { display: flex; gap: 6px; margin-bottom: 8px; }
    .hv-panel button { flex: 1; padding: 6px 8px; font: inherit; color: #000; background: #eee; border: 1px solid #bbb; border-radius: 6px; cursor: pointer; }
    .hv-panel button[aria-pressed="true"] { background: #000; color: #fff; border-color: #000; }
    .hv-panel label { display: block; margin-top: 4px; }
    .hv-panel input { display: block; width: 100%; margin: 2px 0 6px; }
    .hv-panel .hv-hide { position: absolute; top: 6px; right: 8px; flex: none; padding: 0 6px; background: none; border: 0; }
    .hv-panel.is-min > :not(b):not(.hv-hide) { display: none; }
    .hv-panel.is-min b { margin: 0; }`;
  const style = document.createElement("style"); style.textContent = css; document.head.append(style);

  const panel = document.createElement("div"); panel.className = "hv-panel";
  panel.innerHTML = `
    <b>Hover tester</b><button class="hv-hide" type="button" aria-label="Minimise">–</button>
    <div>Small links: nav, LinkedIn, Back to top</div>
    <div class="hv-row"><button type="button" data-small="4">Bolder</button><button type="button" data-small="5">Brighter only</button></div>
    <label>How bold: <span data-out="bold"></span> (0.36 Medium, 0.78 Bold)</label>
    <input type="range" min="0" max="0.8" step="0.01" data-dial="bold">
    <label>Text on the light block: <span data-out="weight"></span></label>
    <input type="range" min="0" max="0.4" step="0.01" data-dial="weight">
    <div class="hv-row"><button type="button" data-old>Before</button></div>`;

  const dials = { bold: ["hover-bold-v1", "--bold-weight", 0.36], weight: ["hover-weight-v2", "--hover-weight", 0.05] };
  for (const [name, [key, cssVar, def]] of Object.entries(dials)) {
    const input = panel.querySelector(`[data-dial="${name}"]`), out = panel.querySelector(`[data-out="${name}"]`);
    const set = (v) => { root.style.setProperty(cssVar, v + "px"); out.textContent = Number(v).toFixed(2) + " px"; };
    input.value = get(key) ?? def; set(input.value);
    input.addEventListener("input", () => { set(input.value); put(key, input.value); });
  }

  const SMALL = "hover-small-v3";
  const setSmall = (k) => {
    root.classList.remove("small-2", "small-3", "small-4", "small-5"); root.classList.add("small-" + k); put(SMALL, k);
    panel.querySelectorAll("[data-small]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.small === k)));
    panel.querySelector('[data-dial="bold"]').disabled = k !== "4";
  };
  setSmall(get(SMALL) === "5" ? "5" : "4");
  panel.querySelectorAll("[data-small]").forEach((b) => b.addEventListener("click", () => setSmall(b.dataset.small)));

  const old = panel.querySelector("[data-old]");
  old.setAttribute("aria-pressed", "false");
  old.addEventListener("click", () => old.setAttribute("aria-pressed", String(root.classList.toggle("hover-old"))));

  const hide = panel.querySelector(".hv-hide");
  hide.addEventListener("click", () => { const min = panel.classList.toggle("is-min"); hide.textContent = min ? "+" : "–"; });

  const mount = () => document.body.append(panel);
  document.body ? mount() : document.addEventListener("DOMContentLoaded", mount);
})();
