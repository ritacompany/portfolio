// Edit panel, preview only (never shipped; scripts/build-preview.mjs injects it into every page).
// One dark panel that holds every slider on the preview, so tuning lives in one place on the Mac and on
// the phone over wifi. Pairs with edit-panel.css.
//
// CONTRACT for other preview layers
//   Register a group of controls. Works before or after this file loads, in any script order:
//
//     const def = {
//       id: "scroll",                    // unique; registering the same id again replaces the group
//       title: "Scroll feel",
//       tab: "Scroll",                   // optional; "Scroll", "Motion" or "Type", a new name adds a tab.
//                                        // Left out: "scroll" goes to Scroll, everything else to Motion.
//       note: "Optional line under the title",
//       persist: true,                   // default true: the panel saves values in this browser and replays
//                                        // them through onInput on the next load. Pass false if the layer
//                                        // saves its own values and passes them in as value.
//       controls: [
//         { key: "lerp", label: "Smoothing", min: 0.02, max: 0.2, step: 0.005, unit: "", value: 0.1,
//           default: 0.1,                // optional; what reset returns to (the first value if left out)
//           hint: "Lower glides longer", // optional; small line under the label
//           enabledWhen: (v) => v.mode === "lerp", // optional; dims the row when it has no effect
//           onInput: (value, key, values) => {} },
//         { key: "on", label: "A switch", type: "toggle", value: false, onInput },
//         { key: "mode", label: "Mode", type: "select", options: [["lerp", "Lerp"], ["dur", "Duration"]], value: "lerp", onInput },
//         { key: "tint", label: "Tint", type: "color", value: "#1a1a1a", onInput }, // hex in, hex out
//       ],
//       actions: [{ label: "Preset", onClick: (group) => group.set({ lerp: 0.075 }) }],
//     };
//     window.EditPanel ? window.EditPanel.register(def) : (window.EditPanelQueue ||= []).push(def);
//
//   register returns the group handle (queued calls get theirs from EditPanel.group(id) once loaded):
//     group.get(key)  group.values()  group.set({ key: value }, { silent })  group.reset()
//   Also on window.EditPanel: group(id), unregister(id), open(), close(), toggle(), copy().
//   onInput runs on every change (slider drag, typed value, reset, preset, replay of a saved value).
//
// USING IT
//   The rail on the right edge opens a tab; E opens and closes (not while typing); Escape closes from
//   inside; left and right arrows move between tabs. Click a value to type
//   one: Enter applies, Escape cancels, arrows step, Shift steps ten. Shift plus arrows on a slider also
//   steps ten. The tick on each track is the default; a changed row shows a dot and its reset arrow.
//   Copy values puts every group on the clipboard as plain text to send back.
(() => {
  if (window.EditPanel) return;
  const STORE = "edit-panel:v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; } };
  const saved = Object.assign({ values: {}, ui: {} }, load());
  saved.values ||= {}; saved.ui ||= {};
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch {} };

  const groups = new Map();
  let root = null, body = null, countEl = null, copyBtn = null, toggleBtn = null;
  const uid = (() => { let n = 0; return (p) => `ep-${p}-${++n}`; })();
  const el = (tag, cls, attrs = {}) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") e.textContent = v;
      else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v === true ? "" : v);
    }
    return e;
  };

  // Values
  const decimals = (step) => { const s = String(step || 1); return s.includes(".") ? s.split(".")[1].length : 0; };
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const snap = (c, x) => {
    const step = c.step || 1, d = decimals(step);
    return +clamp(Math.round((x - c.min) / step) * step + c.min, c.min, c.max).toFixed(d);
  };
  const fmt = (c, v) => {
    if (c.type === "toggle") return v ? "on" : "off";
    if (c.type === "select") { const o = (c.options || []).find((o) => o[0] === v); return o ? o[1] : String(v); }
    if (c.type === "color") return String(v).toUpperCase();
    return Number(v).toFixed(decimals(c.step));
  };
  const parseHex = (s) => {
    const m = String(s).trim().replace(/^#/, "").match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) return null;
    const h = m[1].length === 3 ? m[1].split("").map((x) => x + x).join("") : m[1];
    return "#" + h.toLowerCase();
  };
  const same = (a, b) => (typeof a === "number" && typeof b === "number" ? Math.abs(a - b) < 1e-9 : a === b);

  // Panel shell, built once the first group arrives (a page with nothing to tune shows nothing).
  // Closed: a slim rail on the right edge, one button per tab with its changed count, so he lands on a
  // tab in one click and sees what he changed without opening anything. Open: a full height panel
  // docked right with the tabs on top, the groups of that tab, and Copy values and Reset tab pinned at
  // the bottom. It floats over the page rather than squeezing it, so the widths he tunes stay true.
  const TABS = ["Scroll", "Motion", "Type"]; // fixed, so the panel reads the same on every page
  const tabs = new Map();
  const EMPTY = { Type: "The type review tool moves in here next. Use its own button for now." };
  const tabOf = (def) => def.tab || (def.id === "scroll" ? "Scroll" : "Motion");
  let railEl = null, tablistEl = null, resetTabBtn = null;
  function shell() {
    if (root) return;
    root = el("aside", "ep", { "aria-label": "Edit panel", "data-lenis-prevent": true });
    railEl = el("nav", "ep__rail", { "aria-label": "Edit panel tabs" });
    const panel = el("div", "ep__panel");
    const head = el("div", "ep__head");
    const name = el("span", "ep__name", { text: "Edit" });
    countEl = el("span", "ep__count", { "aria-label": "changed values" });
    toggleBtn = el("button", "ep__btn ep__btn--icon ep__toggle", { type: "button", "aria-label": "Close edit panel", "aria-keyshortcuts": "E", title: "Close (E)" });
    toggleBtn.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>`;
    const top = el("div", "ep__top"); top.append(name, countEl, toggleBtn);
    tablistEl = el("div", "ep__tabs", { role: "tablist", "aria-label": "Sections" });
    head.append(top, tablistEl);
    body = el("div", "ep__body");
    const foot = el("div", "ep__foot");
    copyBtn = el("button", "ep__btn ep__btn--primary", { type: "button", text: "Copy values" });
    resetTabBtn = el("button", "ep__btn", { type: "button", text: "Reset tab" });
    foot.append(copyBtn, resetTabBtn);
    panel.append(head, body, foot);
    root.append(railEl, panel);
    for (const t of TABS) addTab(t);
    toggleBtn.addEventListener("click", () => { setOpen(false); focusRail(); });
    copyBtn.addEventListener("click", () => copy());
    resetTabBtn.addEventListener("click", () => { for (const g of groups.values()) if (g.tab === activeTab()) g.api.reset(); });
    tablistEl.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const names = [...tabs.keys()];
      const next = names[(names.indexOf(activeTab()) + d + names.length) % names.length];
      select(next); tabs.get(next).btn.focus();
    });
    root.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !e.target.matches(".ep-r__num, .ep-r__hex")) { setOpen(false); focusRail(); }
    });
    (document.body || document.documentElement).append(root);
    setOpen(!!saved.ui.open);
    select(saved.ui.tab && tabs.has(saved.ui.tab) ? saved.ui.tab : "Scroll");
  }
  function addTab(t) {
    if (tabs.has(t)) return tabs.get(t);
    const id = uid("tab");
    const btn = el("button", "ep__tab", { type: "button", role: "tab", id, "aria-selected": "false", tabindex: "-1" });
    btn.append(el("span", null, { text: t }));
    const badge = el("span", "ep__badge", { hidden: true }); btn.append(badge);
    const rail = el("button", "ep__railbtn", { type: "button", "aria-label": `Open ${t}`, title: `${t} (E)` });
    rail.append(el("span", "ep__railname", { text: t }));
    const rbadge = el("span", "ep__badge", { hidden: true }); rail.append(rbadge);
    const pane = el("div", "ep__pane", { role: "tabpanel", "aria-labelledby": id, hidden: true });
    pane.append(el("p", "ep__empty", { text: EMPTY[t] || "Nothing to tune on this page." }));
    btn.addEventListener("click", () => select(t));
    rail.addEventListener("click", () => { select(t); setOpen(true); btn.focus(); });
    tablistEl.append(btn); railEl.append(rail); body.append(pane);
    const tab = { btn, rail, pane, badges: [badge, rbadge] };
    tabs.set(t, tab);
    return tab;
  }
  const activeTab = () => saved.ui.tab && tabs.has(saved.ui.tab) ? saved.ui.tab : "Scroll";
  function select(t) {
    saved.ui.tab = t; save();
    for (const [name, x] of tabs) {
      const on = name === t;
      x.btn.setAttribute("aria-selected", String(on)); x.btn.tabIndex = on ? 0 : -1;
      x.rail.toggleAttribute("data-active", on);
      x.pane.hidden = !on;
    }
    updateCount();
  }
  const focusRail = () => { const x = tabs.get(activeTab()); if (x) x.rail.focus(); };
  function setOpen(open) {
    if (!root) return;
    root.toggleAttribute("data-open", open);
    for (const x of tabs.values()) x.rail.setAttribute("aria-expanded", String(open));
    saved.ui.open = open; save();
  }
  addEventListener("keydown", (e) => {
    if (!root || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
    if (e.key !== "e" && e.key !== "E") return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    e.preventDefault();
    setOpen(!root.hasAttribute("data-open"));
  });

  function updateCount() {
    if (!countEl) return;
    let n = 0;
    const per = {};
    for (const g of groups.values()) { const c = g.changed(); n += c; per[g.tab] = (per[g.tab] || 0) + c; }
    countEl.textContent = n ? `${n} changed` : "";
    countEl.hidden = !n;
    for (const [name, x] of tabs) {
      x.badges.forEach((b) => { b.textContent = per[name] ? String(per[name]) : ""; b.hidden = !per[name]; });
      x.pane.querySelector(".ep__empty").hidden = [...groups.values()].some((g) => g.tab === name);
    }
    if (resetTabBtn) resetTabBtn.disabled = !per[activeTab()];
  }

  // Groups
  function register(def) {
    if (!def || !def.id) throw new Error("EditPanel.register needs an id");
    shell();
    const old = groups.get(def.id);
    const g = buildGroup(def);
    g.tab = tabOf(def);
    const tab = addTab(g.tab);
    if (old) old.node.remove();
    tab.pane.append(g.node);
    groups.set(def.id, g);
    g.replay();
    updateCount();
    return g.api;
  }

  function buildGroup(def) {
    const persist = def.persist !== false;
    const store = (saved.values[def.id] ||= {});
    const controls = (def.controls || []).map((c) => ({ ...c, type: c.type || "range" }));
    const V = {}, D = {}, rows = {};
    for (const c of controls) {
      let v = c.value;
      if (c.type === "range") v = Number(v);
      if (c.type === "color") v = parseHex(v) || "#000000";
      D[c.key] = c.default !== undefined ? (c.type === "color" ? parseHex(c.default) : c.default) : v;
      V[c.key] = v;
    }
    const collapsed = () => !!(saved.ui.collapsed || {})[def.id];
    const node = el("section", "ep-g", { "data-group": def.id });
    const head = el("div", "ep-g__head");
    const tog = el("button", "ep-g__toggle", { type: "button", "aria-expanded": String(!collapsed()) });
    tog.innerHTML = `<svg class="ep-g__chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M3 2l3 3-3 3"/></svg>`;
    tog.append(el("span", "ep-g__title", { text: def.title || def.id }));
    const gcount = el("span", "ep-g__count");
    tog.append(gcount);
    const greset = el("button", "ep__btn ep__btn--quiet", { type: "button", text: "Reset", "aria-label": `Reset ${def.title || def.id}` });
    head.append(tog, greset);
    const inner = el("div", "ep-g__body", { id: uid("g") });
    tog.setAttribute("aria-controls", inner.id);
    if (collapsed()) inner.hidden = true;
    if (def.note) inner.append(el("p", "ep-g__note", { text: def.note }));
    node.append(head, inner);
    tog.addEventListener("click", () => {
      const now = !collapsed();
      (saved.ui.collapsed ||= {})[def.id] = now; save();
      inner.hidden = now; tog.setAttribute("aria-expanded", String(!now));
    });

    const fire = (c) => { try { c.onInput && c.onInput(V[c.key], c.key, { ...V }); } catch (err) { console.error(err); } };
    const refreshEnabled = () => {
      for (const c of controls) if (c.enabledWhen) {
        let on = true; try { on = !!c.enabledWhen({ ...V }); } catch {}
        rows[c.key].row.toggleAttribute("data-off", !on);
      }
    };
    const changedCount = () => controls.filter((c) => !same(V[c.key], D[c.key])).length;
    const refreshMeta = () => {
      const n = changedCount();
      gcount.textContent = n ? `${n} changed` : "";
      greset.disabled = !n;
      refreshEnabled();
      updateCount();
    };
    const setValue = (c, raw, { silent = false, from } = {}) => {
      let v = raw;
      if (c.type === "range") { v = Number(raw); if (!Number.isFinite(v)) return false; v = snap(c, v); }
      if (c.type === "toggle") v = !!raw;
      if (c.type === "color") { v = parseHex(raw); if (!v) return false; }
      if (c.type === "select" && !(c.options || []).some((o) => o[0] === v)) return false;
      V[c.key] = v;
      if (persist) { if (same(v, D[c.key])) delete store[c.key]; else store[c.key] = v; save(); }
      rows[c.key].show(from);
      refreshMeta();
      if (!silent) fire(c);
      return true;
    };

    for (const c of controls) {
      const r = buildRow(c, () => V[c.key], () => D[c.key], (v, opt) => setValue(c, v, opt));
      rows[c.key] = r;
      inner.append(r.row);
    }
    if (def.actions && def.actions.length) {
      const bar = el("div", "ep-g__actions");
      for (const a of def.actions) {
        const b = el("button", "ep__btn", { type: "button", text: a.label });
        b.addEventListener("click", () => { try { a.onClick && a.onClick(api); } catch (err) { console.error(err); } });
        bar.append(b);
      }
      inner.append(bar);
    }

    const api = {
      id: def.id,
      get: (k) => V[k],
      values: () => ({ ...V }),
      defaults: () => ({ ...D }),
      set: (obj, opt = {}) => { for (const [k, v] of Object.entries(obj || {})) { const c = controls.find((x) => x.key === k); if (c) setValue(c, v, opt); } },
      reset: () => { for (const c of controls) setValue(c, D[c.key]); },
    };
    greset.addEventListener("click", () => api.reset());
    refreshMeta();
    return {
      node, api, changed: changedCount, title: def.title || def.id, controls,
      // Replay saved values through onInput, so a layer that trusts the panel starts where he left it.
      replay: () => {
        if (!persist) return;
        for (const c of controls) if (c.key in store && !same(store[c.key], V[c.key])) setValue(c, store[c.key]);
      },
      text: () => [def.title || def.id].concat(controls.map((c) => {
        const ch = !same(V[c.key], D[c.key]);
        return `  ${c.label}: ${fmt(c, V[c.key])}${c.unit && c.type === "range" ? " " + c.unit : ""}${ch ? `  (default ${fmt(c, D[c.key])})` : ""}`;
      })).join("\n"),
    };
  }

  function buildRow(c, get, getDefault, set) {
    const row = el("div", "ep-r", { "data-key": c.key, "data-type": c.type });
    const id = uid(c.key);
    const label = el("label", "ep-r__label", { for: id, text: c.label || c.key });
    const reset = el("button", "ep-r__reset", { type: "button", "aria-label": `Reset ${c.label || c.key}`, title: "Reset to default" });
    reset.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6.5A5 5 0 1 1 3 9"/><path d="M3 3v3.5h3.5"/></svg>`;
    reset.addEventListener("click", () => set(getDefault()));
    const dot = el("span", "ep-r__dot", { "aria-hidden": "true" });
    const head = el("div", "ep-r__head");
    const labelWrap = el("div", "ep-r__labels");
    labelWrap.append(dot, label);
    head.append(labelWrap);
    row.append(head);
    if (c.hint) row.append(el("p", "ep-r__hint", { text: c.hint }));
    let show;

    if (c.type === "range") {
      const num = el("input", "ep-r__num", { type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false", "aria-label": `${c.label} value` });
      const unit = c.unit ? el("span", "ep-r__unit", { text: c.unit }) : null;
      const valueWrap = el("div", "ep-r__value");
      valueWrap.append(num); if (unit) valueWrap.append(unit);
      head.append(valueWrap, reset);
      const track = el("div", "ep-r__track");
      const range = el("input", "ep-r__range", { type: "range", id, min: c.min, max: c.max, step: c.step || 1 });
      const tick = el("i", "ep-r__tick", { "aria-hidden": "true" });
      track.append(range, tick);
      row.append(track);
      const pct = (v) => ((v - c.min) / (c.max - c.min || 1)) * 100;
      show = (from) => {
        const v = get();
        if (from !== "range") range.value = v;
        if (from !== "num" || document.activeElement !== num) num.value = fmt(c, v);
        track.style.setProperty("--p", pct(v) + "%");
        tick.style.left = pct(getDefault()) + "%";
        range.setAttribute("aria-valuetext", fmt(c, v) + (c.unit ? " " + c.unit : ""));
      };
      range.addEventListener("input", () => set(range.value, { from: "range" }));
      range.addEventListener("keydown", (e) => {
        if (!e.shiftKey) return;
        const dir = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (!dir) return;
        e.preventDefault();
        set(get() + dir * (c.step || 1) * 10);
      });
      const commit = () => {
        const v = parseFloat(String(num.value).replace(",", "."));
        if (!Number.isFinite(v)) { num.value = fmt(c, get()); return; }
        set(v); num.value = fmt(c, get());
      };
      num.addEventListener("focus", () => num.select());
      num.addEventListener("blur", commit);
      num.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); commit(); num.select(); }
        else if (e.key === "Escape") { e.preventDefault(); num.value = fmt(c, get()); num.blur(); }
        else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          const base = parseFloat(num.value); const cur = Number.isFinite(base) ? base : get();
          set(cur + (e.key === "ArrowUp" ? 1 : -1) * (c.step || 1) * (e.shiftKey ? 10 : 1));
          num.value = fmt(c, get()); num.select();
        }
      });
    } else if (c.type === "toggle") {
      const sw = el("button", "ep-r__switch", { type: "button", id, role: "switch" });
      sw.innerHTML = `<span class="ep-r__knob" aria-hidden="true"></span>`;
      head.append(sw, reset);
      sw.addEventListener("click", () => set(!get()));
      show = () => sw.setAttribute("aria-checked", String(!!get()));
    } else if (c.type === "select") {
      const sel = el("select", "ep-r__select", { id });
      for (const [v, t] of c.options || []) sel.append(el("option", null, { value: v, text: t }));
      head.append(sel, reset);
      sel.addEventListener("change", () => set(sel.value));
      show = () => { sel.value = get(); };
    } else if (c.type === "color") {
      const sw = el("input", "ep-r__swatch", { type: "color", "aria-label": `${c.label} picker` });
      const hex = el("input", "ep-r__hex", { type: "text", id, autocomplete: "off", spellcheck: "false", maxlength: 7, "aria-label": `${c.label} hex` });
      const wrap = el("div", "ep-r__value");
      wrap.append(sw, hex);
      head.append(wrap, reset);
      sw.addEventListener("input", () => set(sw.value));
      const commit = () => {
        if (!set(hex.value)) { hex.setAttribute("aria-invalid", "true"); return; }
        hex.removeAttribute("aria-invalid");
      };
      hex.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); commit(); }
        else if (e.key === "Escape") { e.preventDefault(); hex.removeAttribute("aria-invalid"); show(); hex.blur(); }
      });
      hex.addEventListener("blur", () => { commit(); if (hex.hasAttribute("aria-invalid")) { hex.removeAttribute("aria-invalid"); show(); } });
      show = () => { const v = get(); sw.value = v; if (document.activeElement !== hex) hex.value = v.toUpperCase(); hex.removeAttribute("aria-invalid"); };
    }
    const baseShow = show;
    show = (from) => {
      baseShow(from);
      const changed = !same(get(), getDefault());
      row.toggleAttribute("data-changed", changed);
      reset.disabled = !changed;
    };
    show();
    return { row, show };
  }

  // Copy values. The phone opens the preview over wifi (http), where navigator.clipboard is missing,
  // so fall back to a selected textarea and execCommand, and if that fails too, show the text to copy.
  function copyText() {
    const page = (document.title || location.pathname).split(",")[0].trim();
    const head = `Edit panel values, ${page}, ${new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`;
    return [head, ...[...groups.values()].map((g) => g.text())].join("\n\n");
  }
  async function copy() {
    const text = copyText();
    let ok = false;
    try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); ok = true; } } catch {}
    if (!ok) {
      const ta = el("textarea", "ep__copybuf", { readonly: true });
      ta.value = text;
      root.querySelector(".ep__panel").append(ta); ta.select();
      try { ok = document.execCommand("copy"); } catch {}
      if (ok) ta.remove();
      else {
        ta.className = "ep__copyshow";
        ta.addEventListener("blur", () => ta.remove(), { once: true });
        ta.focus(); ta.select();
      }
    }
    if (copyBtn) {
      copyBtn.textContent = ok ? "Copied" : "Select and copy";
      copyBtn.toggleAttribute("data-done", ok);
      clearTimeout(copy.t);
      copy.t = setTimeout(() => { copyBtn.textContent = "Copy values"; copyBtn.removeAttribute("data-done"); }, 1400);
    }
    return text;
  }

  const queue = window.EditPanelQueue || [];
  window.EditPanel = {
    register,
    group: (id) => (groups.has(id) ? groups.get(id).api : null),
    unregister: (id) => { const g = groups.get(id); if (g) { g.node.remove(); groups.delete(id); updateCount(); } },
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => root && setOpen(!root.hasAttribute("data-open")),
    copy,
    copyText,
  };
  // Calls queued before this file loaded, and any pushed later by a layer that still uses the queue.
  const drain = () => { while (queue.length) { try { register(queue.shift()); } catch (err) { console.error(err); } } };
  window.EditPanelQueue = { push: (...defs) => { defs.forEach((d) => register(d)); return 0; }, get length() { return 0; } };
  if (document.body) drain(); else addEventListener("DOMContentLoaded", drain, { once: true });
})();
