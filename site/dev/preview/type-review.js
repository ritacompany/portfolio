// Type review: a tool on the preview link only (never shipped; scripts/build-preview.mjs injects it).
// Chadwick turns it on, clicks any text and sees which text style it uses, or that it uses none. He can
// try any style or colour on it, add a new style, mark every unstyled text on the page, and copy his
// changes as notes to send back. Changes live in this browser only (localStorage) until he sends them.
(() => {
  const STYLES = [
    { name: "Display/212", size: 212, weight: 400, lh: 176, track: -5.5 },
    { name: "Display/96", size: 96, weight: 500, lh: 94, track: -4 },
    { name: "Heading/64", size: 64, weight: 500, lh: 70, track: -4 },
    { name: "Heading/40", size: 40, weight: 500, lh: 46, track: -4 },
    { name: "Heading/24", size: 24, weight: 500, lh: 28, track: -4 },
    { name: "Heading/20", size: 20, weight: 500, lh: 26, track: -2 },
    { name: "Body/16", size: 16, weight: 400, lh: 22, track: -1 },
    { name: "Body/16 M", size: 16, weight: 500, lh: 21, track: -1 },
    { name: "Label/14", size: 14, weight: 400, lh: 20, track: 2 },
    { name: "Label/14 C", size: 14, weight: 400, lh: 14, track: 6, caps: true },
    { name: "Label/12", size: 12, weight: 400, lh: 17, track: 4 },
    { name: "Label/12 C", size: 12, weight: 400, lh: 17, track: 10, caps: true },
  ];
  const COLORS = ["000", "050", "100", "200", "300", "400", "500", "525", "550", "590", "600", "700", "800", "900"].map((n) => `Neutral/${n}`);
  const KEY = "type-review-v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { added: [], changes: [] }; } catch { return { added: [], changes: [] }; } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const state = load();
  const all = () => STYLES.concat(state.added);
  const page = document.title.split(",")[0];

  const css = getComputedStyle(document.documentElement);
  const colorVar = (c) => `var(--neutral-${c.split("/")[1]})`;
  const hexOf = (c) => css.getPropertyValue(`--neutral-${c.split("/")[1]}`).trim();
  const rgb = (hex) => { const h = hex.replace("#", ""); const f = h.length === 3 ? h.split("").map((x) => x + x).join("") : h; return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)); };

  const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const textEls = () => [...document.querySelectorAll("body *")].filter((e) => ownText(e) && !e.closest(".tr-ui") && e.getBoundingClientRect().width > 0);
  const label = (e) => (e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 48);
  const path = (e) => { const n = e.getAttribute("data-figma-node"); return n ? `[data-figma-node="${n}"]` : e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/)[0] : ""); };

  function match(e) {
    const s = getComputedStyle(e), size = parseFloat(s.fontSize), w = +s.fontWeight;
    const lh = s.lineHeight === "normal" ? NaN : parseFloat(s.lineHeight);
    const tr = parseFloat(s.letterSpacing) / size * 100 || 0;
    const caps = s.textTransform === "uppercase";
    const hit = all().find((st) => Math.abs(st.size - size) < 0.6 && st.weight === w && Math.abs(st.track - tr) < 0.6 && (!!st.caps === caps));
    const colHex = s.color.match(/\d+/g).slice(0, 3).map(Number);
    const col = COLORS.find((c) => { const v = hexOf(c); return v && rgb(v).every((x, i) => Math.abs(x - colHex[i]) < 3); });
    return { style: hit ? hit.name : null, color: col || s.color, size, w, lh, tr: Math.round(tr * 10) / 10, caps };
  }

  function apply(e, st, color) {
    if (st) {
      const s = all().find((x) => x.name === st);
      Object.assign(e.style, { fontSize: s.size + "px", fontWeight: s.weight, lineHeight: (s.lh / s.size).toFixed(3), letterSpacing: s.track / 100 + "em", textTransform: s.caps ? "uppercase" : "none" });
    }
    if (color) e.style.color = colorVar(color);
  }
  // Re-apply saved changes on this page after a reload.
  for (const c of state.changes) if (c.page === page) { const e = document.querySelector(c.sel); if (e) apply(e, c.style, c.color); }

  // UI
  const ui = document.createElement("div");
  ui.className = "tr-ui";
  ui.innerHTML = `
    <button class="tr-toggle" type="button" aria-pressed="false">Type review</button>
    <div class="tr-panel" hidden>
      <p class="tr-hint">Click any text on the page.</p>
      <div class="tr-sel" hidden>
        <p class="tr-text"></p>
        <p class="tr-now"></p>
        <label>Style <select class="tr-style"></select></label>
        <label>Colour <select class="tr-color"></select></label>
        <label class="tr-allrow"><input type="checkbox" class="tr-all"> Change every text like this on the page</label>
      </div>
      <details class="tr-new"><summary>Add a style</summary>
        <label>Name <input class="tr-n" placeholder="Body/20"></label>
        <label>Size <input class="tr-s" type="number" value="20"></label>
        <label>Weight <select class="tr-w"><option>400</option><option>500</option><option>700</option></select></label>
        <label>Line height px <input class="tr-l" type="number" value="26"></label>
        <label>Tracking % <input class="tr-t" type="number" step="0.5" value="-2"></label>
        <label><input type="checkbox" class="tr-c"> Capitals</label>
        <button type="button" class="tr-add">Add style</button>
      </details>
      <label class="tr-allrow"><input type="checkbox" class="tr-unstyled"> Mark text with no style</label>
      <p class="tr-count"></p>
      <div class="tr-actions"><button type="button" class="tr-copy">Copy my notes</button><button type="button" class="tr-clear">Clear</button></div>
      <ol class="tr-log"></ol>
    </div>`;
  document.body.append(ui);
  const $ = (s) => ui.querySelector(s);
  const fillStyles = () => { $(".tr-style").innerHTML = `<option value="">(keep)</option>` + all().map((s) => `<option>${s.name}</option>`).join(""); };
  fillStyles();
  $(".tr-color").innerHTML = `<option value="">(keep)</option>` + COLORS.map((c) => `<option>${c}</option>`).join("");

  let on = false, picked = null;
  const log = () => {
    $(".tr-log").innerHTML = state.changes.map((c) => `<li>${c.page}: “${c.text}” → ${[c.style, c.color].filter(Boolean).join(", ")}${c.all ? " (all like it)" : ""}</li>`).join("")
      + state.added.map((s) => `<li>New style ${s.name}: ${s.size}px, ${s.weight}, ${s.lh}px line, ${s.track}% tracking${s.caps ? ", capitals" : ""}</li>`).join("");
  };
  log();

  $(".tr-toggle").addEventListener("click", () => {
    on = !on; $(".tr-toggle").setAttribute("aria-pressed", on); $(".tr-panel").hidden = !on;
    document.documentElement.classList.toggle("tr-on", on);
    if (!on) { document.querySelectorAll(".tr-picked,.tr-unstyled-mark").forEach((e) => e.classList.remove("tr-picked", "tr-unstyled-mark")); $(".tr-unstyled").checked = false; }
  });
  document.addEventListener("click", (ev) => {
    if (!on || ev.target.closest(".tr-ui")) return;
    const e = ev.target.closest("*"); const t = ownText(e) ? e : [...e.querySelectorAll("*")].find(ownText) || e;
    ev.preventDefault(); ev.stopPropagation();
    document.querySelectorAll(".tr-picked").forEach((x) => x.classList.remove("tr-picked"));
    picked = t; t.classList.add("tr-picked");
    const m = match(t);
    $(".tr-hint").hidden = true; $(".tr-sel").hidden = false;
    $(".tr-text").textContent = `“${label(t)}”`;
    $(".tr-now").innerHTML = `${m.style ? `<b>${m.style}</b>` : `<b class="tr-bad">No style</b>`} · ${m.color}<br>${m.size}px, weight ${m.w}, line ${isNaN(m.lh) ? "normal" : m.lh + "px"}, tracking ${m.tr}%${m.caps ? ", capitals" : ""}`;
    $(".tr-style").value = ""; $(".tr-color").value = ""; $(".tr-all").checked = false;
  }, true);

  const change = () => {
    if (!picked) return;
    const st = $(".tr-style").value || null, color = $(".tr-color").value || null;
    if (!st && !color) return;
    const allLike = $(".tr-all").checked;
    const targets = allLike ? textEls().filter((e) => e.className === picked.className && e.tagName === picked.tagName) : [picked];
    targets.forEach((e) => apply(e, st, color));
    state.changes = state.changes.filter((c) => !(c.page === page && c.sel === path(picked)));
    state.changes.push({ page, sel: path(picked), text: label(picked), style: st, color, all: allLike });
    save(); log();
    const m = match(picked);
    $(".tr-now").innerHTML = `${m.style ? `<b>${m.style}</b>` : `<b class="tr-bad">No style</b>`} · ${m.color} (changed)`;
  };
  $(".tr-style").addEventListener("change", change);
  $(".tr-color").addEventListener("change", change);

  $(".tr-add").addEventListener("click", () => {
    const name = $(".tr-n").value.trim(); if (!name) return;
    state.added = state.added.filter((s) => s.name !== name);
    state.added.push({ name, size: +$(".tr-s").value, weight: +$(".tr-w").value, lh: +$(".tr-l").value, track: +$(".tr-t").value, caps: $(".tr-c").checked });
    save(); fillStyles(); log(); $(".tr-style").value = name; if (picked) change();
  });

  $(".tr-unstyled").addEventListener("change", (ev) => {
    const els = textEls(); let n = 0;
    els.forEach((e) => { const bad = ev.target.checked && !match(e).style; e.classList.toggle("tr-unstyled-mark", bad); if (bad) n++; });
    $(".tr-count").textContent = ev.target.checked ? `${n} text${n === 1 ? "" : "s"} on this page use no style.` : "";
  });

  $(".tr-copy").addEventListener("click", async () => {
    const text = ["Type review notes", ...state.changes.map((c) => `- ${c.page}: "${c.text}" (${c.sel}) to ${[c.style, c.color].filter(Boolean).join(", ")}${c.all ? ", every text like it" : ""}`),
      ...state.added.map((s) => `- New style ${s.name}: ${s.size}px, weight ${s.weight}, line ${s.lh}px, tracking ${s.track}%${s.caps ? ", capitals" : ""}`)].join("\n");
    try { await navigator.clipboard.writeText(text); $(".tr-copy").textContent = "Copied"; } catch { prompt("Copy these notes", text); }
    setTimeout(() => { $(".tr-copy").textContent = "Copy my notes"; }, 1500);
  });
  $(".tr-clear").addEventListener("click", () => { if (confirm("Clear every change and added style?")) { state.changes = []; state.added = []; save(); location.reload(); } });
})();
