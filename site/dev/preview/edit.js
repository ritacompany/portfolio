// Edit: a tool on the preview link only (never shipped; scripts/build-preview.mjs injects it).
// Chadwick taps Edit, then taps anything on the page: text, a block, a card, a section. A panel shows that
// element's text and spacing, and he changes any of it live: text style, size, weight, line height,
// letter spacing, colour (hex), margins, padding, gap and width. Each change applies at the width he is on
// (phone, tablet or desktop) or at every width. Copy changes gives the full list to paste back to Claude.
// Changes live in this browser only (localStorage) until he sends them.
(() => {
  const KEY = "edit-v1";
  const STYLES = { "Display/96": [96, 500, 94, -4], "Heading/64": [64, 500, 70, -4], "Heading/40": [40, 500, 46, -4], "Heading/24": [24, 500, 28, -4], "Heading/20": [20, 500, 26, -2], "Body/16": [16, 400, 22, -1], "Body/16 M": [16, 500, 21, -1], "Label/14": [14, 400, 20, 2], "Label/12": [12, 400, 17, 4] };
  const FIELDS = [
    ["Text", [["font-size", "Size", 1, "px"], ["font-weight", "Weight", 100, ""], ["line-height", "Line height", 1, "px"], ["letter-spacing", "Letter spacing", 0.1, "px"], ["color", "Colour", 0, "hex"]]],
    ["Space outside", [["margin-top", "Top", 2, "px"], ["margin-bottom", "Bottom", 2, "px"], ["margin-left", "Left", 2, "px"], ["margin-right", "Right", 2, "px"]]],
    ["Space inside", [["padding-top", "Top", 2, "px"], ["padding-bottom", "Bottom", 2, "px"], ["padding-left", "Left", 2, "px"], ["padding-right", "Right", 2, "px"], ["row-gap", "Gap between rows", 2, "px"], ["column-gap", "Gap between columns", 2, "px"]]],
    ["Size", [["width", "Width", 4, "px"], ["max-width", "Max width", 4, "px"]]],
  ];
  const band = () => (innerWidth < 768 ? "phone" : innerWidth < 1200 ? "tablet" : "desktop");
  const MEDIA = { phone: "(max-width: 767.98px)", tablet: "(min-width: 768px) and (max-width: 1199.98px)", desktop: "(min-width: 1200px)" };
  let state; try { state = JSON.parse(localStorage.getItem(KEY)) || []; } catch { state = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const sheet = document.createElement("style"); sheet.id = "edit-changes";
  const render = () => {
    const by = {};
    for (const c of state) (by[c.scope] ||= {})[c.sel] = { ...(by[c.scope] || {})[c.sel], [c.prop]: c.value };
    sheet.textContent = Object.entries(by).map(([scope, sels]) => {
      const body = Object.entries(sels).map(([s, d]) => `${s} { ${Object.entries(d).map(([p, v]) => `${p}: ${v} !important;`).join(" ")} }`).join("\n");
      return scope === "all" ? body : `@media ${MEDIA[scope]} {\n${body}\n}`;
    }).join("\n");
  };
  const selOf = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (n.dataset.figmaNode) { parts.unshift(`[data-figma-node="${n.dataset.figmaNode}"]`); break; }
      let s = n.tagName.toLowerCase();
      const cls = [...n.classList].filter((c) => !c.startsWith("ed-"))[0];
      if (cls) s += "." + cls;
      const sib = n.parentElement ? [...n.parentElement.children].filter((x) => x.tagName === n.tagName) : [];
      if (sib.length > 1) s += `:nth-of-type(${sib.indexOf(n) + 1})`;
      parts.unshift(s);
      if (parts.length > 4) break;
    }
    return parts.join(" > ");
  };
  const nameOf = (el) => {
    const t = (el.innerText || el.getAttribute("alt") || "").trim().replace(/\s+/g, " ");
    return (el.className && typeof el.className === "string" ? el.className.split(" ")[0] : el.tagName.toLowerCase()) + (t ? ` "${t.slice(0, 32)}${t.length > 32 ? "…" : ""}"` : "");
  };
  const hex = (rgb) => { const m = rgb.match(/\d+(\.\d+)?/g); return m ? "#" + m.slice(0, 3).map((x) => (+x).toString(16).padStart(2, "0")).join("") : rgb; };
  const set = (el, prop, value, scope) => {
    const sel = selOf(el);
    state = state.filter((c) => !(c.sel === sel && c.prop === prop && c.scope === scope));
    if (value !== null) state.push({ page: location.pathname, sel, name: nameOf(el), prop, value, scope });
    save(); render();
  };

  // UI
  const ui = document.createElement("div"); ui.className = "ed-ui";
  const toggle = document.createElement("button"); toggle.type = "button"; toggle.className = "ed-toggle"; toggle.textContent = "Edit";
  const panel = document.createElement("div"); panel.className = "ed-panel"; panel.hidden = true;
  const box = document.createElement("div"); box.className = "ed-box"; box.hidden = true;
  ui.append(panel, toggle);
  let on = false, cur = null, scope = "band";
  const outline = () => { if (!cur) return (box.hidden = true); const r = cur.getBoundingClientRect(); Object.assign(box.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" }); box.hidden = false; };
  addEventListener("scroll", outline, { passive: true }); addEventListener("resize", outline);

  const field = (prop, label, step, unit) => {
    const el = cur;
    const cs = getComputedStyle(el);
    const row = document.createElement("label"); row.className = "ed-row";
    const name = document.createElement("span"); name.textContent = label;
    const input = document.createElement("input");
    const sc = scope === "band" ? band() : "all";
    const mine = state.find((c) => c.sel === selOf(el) && c.prop === prop && c.scope === sc);
    if (unit === "hex") { input.type = "text"; input.value = mine ? mine.value : hex(cs.getPropertyValue(prop)); input.placeholder = "#f2f1f8"; }
    else { input.type = "number"; input.step = step; input.inputMode = "decimal"; const v = parseFloat(mine ? mine.value : cs.getPropertyValue(prop)); input.value = isNaN(v) ? "" : Math.round(v * 100) / 100; }
    if (mine) row.classList.add("ed-changed");
    const commit = () => {
      if (input.value === "") return set(el, prop, null, sc);
      const v = unit === "hex" ? (input.value.startsWith("#") ? input.value : "#" + input.value) : input.value + unit;
      // Vertical space and width do nothing on inline text, so the element becomes inline-block first.
      if (/^(margin|padding)-(top|bottom)$|width/.test(prop) && getComputedStyle(el).display === "inline") set(el, "display", "inline-block", sc);
      set(el, prop, v, sc); row.classList.add("ed-changed"); outline();
    };
    input.onchange = commit; input.oninput = () => { if (unit !== "hex") commit(); };
    const minus = document.createElement("button"), plus = document.createElement("button");
    minus.type = plus.type = "button"; minus.textContent = "−"; plus.textContent = "+";
    if (unit === "hex") { minus.hidden = plus.hidden = true; }
    minus.onclick = () => { input.value = Math.round(((+input.value || 0) - (step || 1)) * 100) / 100; commit(); };
    plus.onclick = () => { input.value = Math.round(((+input.value || 0) + (step || 1)) * 100) / 100; commit(); };
    row.append(name, minus, input, plus);
    return row;
  };
  const draw = () => {
    panel.textContent = "";
    const head = document.createElement("div"); head.className = "ed-head";
    if (!cur) { head.textContent = "Tap anything on the page to edit it, or change spacing section by section below."; panel.append(head, sectionsView(), actions()); return; }
    const back = document.createElement("button"); back.type = "button"; back.textContent = "← All sections";
    back.onclick = () => { cur = null; outline(); draw(); };
    head.append(back);
    const title = document.createElement("strong"); title.textContent = nameOf(cur);
    const up = document.createElement("button"); up.type = "button"; up.textContent = "Select parent";
    up.onclick = () => { if (cur.parentElement && cur.parentElement !== document.body) { cur = cur.parentElement; outline(); draw(); } };
    const where = document.createElement("select");
    where.innerHTML = `<option value="band">Only on ${band()}</option><option value="all">Every width</option>`; where.value = scope;
    where.onchange = () => { scope = where.value; draw(); };
    head.append(title, up, where); panel.append(head);
    const style = document.createElement("select");
    style.innerHTML = `<option value="">Text style…</option>` + Object.keys(STYLES).map((s) => `<option>${s}</option>`).join("");
    style.onchange = () => { const s = STYLES[style.value]; if (!s) return; const sc = scope === "band" ? band() : "all";
      [["font-size", s[0] + "px"], ["font-weight", String(s[1])], ["line-height", s[2] + "px"], ["letter-spacing", s[3] / 100 + "em"]].forEach(([p, v]) => set(cur, p, v, sc)); draw(); outline(); };
    panel.append(style);
    for (const [group, list] of FIELDS) {
      const g = document.createElement("details"); g.open = group === "Text" || group === "Space outside";
      const sm = document.createElement("summary"); sm.textContent = group; g.append(sm);
      list.filter(([p]) => !/gap/.test(p) || /flex|grid/.test(getComputedStyle(cur).display)).forEach(([p, l, st, u]) => g.append(field(p, l, st, u)));
      panel.append(g);
    }
    const clear = document.createElement("button"); clear.type = "button"; clear.textContent = "Undo changes on this element";
    clear.onclick = () => { const s = selOf(cur); state = state.filter((c) => c.sel !== s); save(); render(); draw(); outline(); };
    panel.append(clear, actions());
  };
  // Sections view: every section of the page, and inside each one every element with its space above,
  // space below and inner gap, so a whole section's spacing can be set in one place. Tap a name for every
  // control on that element.
  function sectionsView() {
    const wrap = document.createElement("div"); wrap.className = "ed-sections";
    const all = [...document.querySelectorAll("header, nav, main > *, section, footer")]
      .filter((n) => !n.closest(".ed-ui") && n.getBoundingClientRect().height > 0);
    const secs = all.filter((n) => !all.some((o) => o !== n && o.contains(n)));
    secs.forEach((sec, i) => {
      const d = document.createElement("details");
      const sm = document.createElement("summary");
      sm.textContent = `${i + 1}. ${sec.getAttribute("aria-label") || (sec.querySelector("h1,h2,h3")?.innerText || nameOf(sec)).trim().slice(0, 40)}`;
      d.append(sm);
      d.ontoggle = () => {
        if (!d.open || d.dataset.built) return; d.dataset.built = "1";
        const kids = [sec, ...sec.querySelectorAll("*")].filter((n) => {
          if (n.closest("svg") && n.tagName !== "svg") return false;
          const r = n.getBoundingClientRect(); if (r.height < 2) return false;
          const depth = (() => { let k = 0; for (let x = n; x && x !== sec; x = x.parentElement) k++; return k; })();
          return depth <= 4 && (n === sec || n.children.length || (n.innerText || "").trim() || /IMG|SVG|PICTURE|VIDEO|A|BUTTON/.test(n.tagName));
        }).slice(0, 60);
        for (const el of kids) {
          const item = document.createElement("div"); item.className = "ed-item";
          const pick = document.createElement("button"); pick.type = "button"; pick.className = "ed-pick"; pick.textContent = (el === sec ? "Section " : "") + nameOf(el);
          pick.onclick = () => { cur = el; el.scrollIntoView({ block: "center" }); outline(); draw(); };
          pick.onmouseenter = () => { cur = el; outline(); cur = null; };
          item.append(pick);
          const keep = cur; cur = el;
          const props = el === sec ? [["padding-top", "Top padding", 4, "px"], ["padding-bottom", "Bottom padding", 4, "px"]].concat(/flex|grid/.test(getComputedStyle(el).display) ? [["row-gap", "Gap", 4, "px"]] : [])
            : [["margin-top", "Space above", 2, "px"], ["margin-bottom", "Space below", 2, "px"]].concat(/flex|grid/.test(getComputedStyle(el).display) ? [["row-gap", "Gap inside", 2, "px"]] : []);
          props.forEach(([p, l, st, u]) => item.append(field(p, l, st, u)));
          cur = keep;
          d.append(item);
        }
      };
      wrap.append(d);
    });
    return wrap;
  }
  function actions() {
    const a = document.createElement("div"); a.className = "ed-actions";
    const copy = document.createElement("button"); copy.type = "button"; copy.textContent = `Copy changes (${state.length})`;
    copy.onclick = async () => {
      const text = "Edit tool changes:\n" + state.map((c) => `- ${c.page} ${c.name} [${c.scope === "all" ? "every width" : c.scope}]: ${c.prop} ${c.value}   (${c.sel})`).join("\n");
      try { await navigator.clipboard.writeText(text); copy.textContent = "Copied"; } catch { prompt("Copy these changes", text); }
    };
    const reset = document.createElement("button"); reset.type = "button"; reset.textContent = "Clear all";
    reset.onclick = () => { if (confirm("Clear every change on every page?")) { state = []; save(); render(); draw(); } };
    a.append(copy, reset); return a;
  }
  toggle.onclick = () => { on = !on; toggle.setAttribute("aria-pressed", String(on)); panel.hidden = !on; if (!on) { cur = null; outline(); } else draw(); };
  document.addEventListener("click", (e) => {
    if (!on || ui.contains(e.target)) return;
    e.preventDefault(); e.stopPropagation();
    cur = e.target.closest("img, svg") || e.target; outline(); draw();
  }, true);
  const mount = () => { document.head.append(sheet); render(); document.body.append(box, ui); };
  document.body ? mount() : addEventListener("DOMContentLoaded", mount);
})();
