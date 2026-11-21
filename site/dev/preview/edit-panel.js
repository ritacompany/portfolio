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
//         { key: "ramp", label: "Characters", type: "text", value: " .:-=+*#%@", onInput }, // Enter applies
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
// WHERE VALUES GO
//   Every change is saved in this browser (localStorage) and, when the page runs as the published
//   artifact, to its db as one document per page, tuning/<page>, holding each group's values, what
//   changed from default and the Copy values text. Claude reads that document with ArtifactData. A load
//   inside the artifact applies the stored document over this browser's values, so the Mac and the phone
//   share one set. The foot of the panel says which of the two is saving.
//
// USING IT
//   Open, the panel docks beside the page on a wide screen: the page narrows to make room (fixed bars
//   too) and the panel's left edge drags to resize it, remembered. On a phone, tablet or small laptop it is a sheet across the
//   bottom whose top handle drags its height, and the page gains that much room under its content.
//   The rail on the right edge opens a tab; E opens and closes (not while typing); Escape closes from
//   inside; left and right arrows move between tabs. Click a value to type
//   one: Enter applies, Escape cancels, arrows step, Shift steps ten. Shift plus arrows on a slider also
//   steps ten. The tick on each track is the default; a changed row shows a dot and its reset arrow.
//   Copy values puts every group on the clipboard as plain text to send back.
//   It opens on the tab he last picked if this page has controls there, otherwise on the first tab that has.
//
// STANDALONE PAGES (a tuner, an options page, anything in site/dev or site/motion-lab), one line in <head>:
//     <script src="/dev/preview/edit-panel.js" data-fluid defer></script>
//   The script loads edit-panel.css itself. data-fluid says the page's layout reads its own width
//   (container queries on body, or script measuring its own box), so the panel can dock beside it down
//   to a 480 px page: in the ~800 px desktop browser pane it sits beside the page instead of over it.
//   Leave data-fluid off any page whose breakpoints read the window (every site page): those dock only
//   while the page keeps 1024 px and are a bottom sheet below that. Tabs with no controls are hidden.
(() => {
  if (window.EditPanel) return;
  const me = document.currentScript;
  const FLUID = !!(me && me.hasAttribute("data-fluid")) || document.documentElement.hasAttribute("data-ep-fluid");
  // Load the stylesheet unless the page (or the preview build) already links it; hold the panel hidden
  // until it lands so it never flashes unstyled.
  let cssReady = Promise.resolve();
  if (me && me.src && !document.querySelector('link[rel="stylesheet"][href*="edit-panel.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = new URL("edit-panel.css", me.src).href;
    cssReady = new Promise((r) => { link.onload = link.onerror = r; });
    document.head.append(link);
  }
  const STORE = "edit-panel:v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; } };
  const saved = Object.assign({ values: {}, ui: {} }, load());
  saved.values ||= {}; saved.ui ||= {};
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(saved)); } catch {} };
  const local = (() => { try { const k = "__ep"; localStorage.setItem(k, "1"); localStorage.removeItem(k); return true; } catch { return false; } })();

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
    if (c.type === "text") return JSON.stringify(String(v));
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
  // Closed: a slim rail on the right edge (navigation rail), one button per tab with its changed count,
  // so he lands on a tab in one click and sees what he changed without opening anything. Open: a full
  // height inspector docked beside the page (as Figma's properties panel or browser devtools docked
  // right): the page narrows to make room, so nothing he is tuning sits under it. Tabs on top, the groups
  // of that tab, Copy values and Reset tab pinned at the bottom with a line saying where values save.
  // The left edge is a splitter: drag to resize, arrows step it, a double click restores the width.
  const TABS = ["Scroll", "Motion", "Type"]; // fixed, so the panel reads the same on every page
  const tabs = new Map();
  const EMPTY = { Type: "The type review tool moves in here next. Use its own button for now." };
  const tabOf = (def) => def.tab || (def.id === "scroll" ? "Scroll" : "Motion");
  let railEl = null, tablistEl = null, resetTabBtn = null, gripEl = null, savedEl = null;
  function shell() {
    if (root) return;
    root = el("aside", "ep", { "aria-label": "Edit panel", "data-lenis-prevent": true });
    railEl = el("nav", "ep__rail", { "aria-label": "Edit panel tabs" });
    const panel = el("div", "ep__panel");
    gripEl = el("div", "ep__grip", { role: "separator", tabindex: "0", "aria-label": "Resize edit panel", title: "Drag to resize, double click to reset" });
    gripEl.append(el("span", "ep__griphandle", { "aria-hidden": "true" }));
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
    savedEl = el("p", "ep__saved", { role: "status" });
    const btns = el("div", "ep__footbtns"); btns.append(copyBtn, resetTabBtn);
    foot.append(btns, savedEl);
    panel.append(gripEl, head, body, foot);
    root.append(railEl, panel);
    for (const t of TABS) addTab(t);
    toggleBtn.addEventListener("click", () => { setOpen(false); focusRail(); });
    copyBtn.addEventListener("click", () => copy());
    resetTabBtn.addEventListener("click", () => { for (const g of groups.values()) if (g.tab === activeTab()) g.api.reset(); });
    tablistEl.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const names = [...tabs.keys()].filter((n) => !tabs.get(n).btn.hidden);
      const next = names[(names.indexOf(activeTab()) + d + names.length) % names.length];
      select(next, true); tabs.get(next).btn.focus();
    });
    root.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !e.target.matches(".ep-r__num, .ep-r__hex, .ep-r__text")) { setOpen(false); focusRail(); }
    });
    root.toggleAttribute("data-fluid", FLUID);
    root.style.visibility = "hidden";
    // Once the stylesheet lands the docked page narrows for real, so tell the page's scripts to measure again.
    cssReady.then(() => { root.style.visibility = ""; layout(); if (dock) dispatchEvent(new Event("resize")); });
    (document.body || document.documentElement).append(root);
    grip();
    showSaved();
    setOpen(!!saved.ui.open);
    select(pickTab());
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
    btn.addEventListener("click", () => select(t, true));
    rail.addEventListener("click", () => { select(t, true); setOpen(true); btn.focus(); });
    tablistEl.append(btn); railEl.append(rail); body.append(pane);
    const tab = { btn, rail, pane, badges: [badge, rbadge] };
    tabs.set(t, tab);
    return tab;
  }
  // The tab shown is the one he last picked when this page has controls on it, otherwise the first tab
  // that has any. Only his own picks are remembered, so a page that lands elsewhere never moves his choice.
  let shown = null, pickedHere = false;
  const hasGroups = (t) => [...groups.values()].some((g) => g.tab === t);
  function pickTab() {
    const pref = saved.ui.tab;
    if (pref && tabs.has(pref) && hasGroups(pref)) return pref;
    return [...tabs.keys()].find(hasGroups) || (pref && tabs.has(pref) ? pref : "Scroll");
  }
  const activeTab = () => (shown && tabs.has(shown) ? shown : "Scroll");
  function select(t, byHim = false) {
    shown = t;
    if (byHim) { pickedHere = true; saved.ui.tab = t; save(); }
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
    layout();
  }

  // Docking. Wide screens: the page gives up the panel's width on the right (html margin), and any
  // fixed element that reaches the right edge is moved in by the same amount, since a margin cannot
  // narrow what is fixed to the window. Phones: the sheet covers the bottom, so the page gains that much
  // room under its content and can scroll everything above it. Widths and heights are remembered.
  // The site's breakpoints read the window, not the page, so the panel only docks while the page keeps
  // PAGE_MIN px, the narrowest the desktop layout holds at. On anything narrower (phones, tablets either
  // way up, small laptops) it is a sheet along the bottom and the page keeps the window's width.
  // A standalone page marked data-fluid lays itself out from its own width, so it may dock down to 480.
  const PAGE_MIN = FLUID ? 480 : 1024, WMIN = 280;
  const sheetMode = () => innerWidth - PAGE_MIN < WMIN;
  const W0 = 360, clampW = (w) => Math.round(clamp(w, WMIN, Math.max(WMIN, Math.min(760, innerWidth * 0.6, innerWidth - PAGE_MIN))));
  const clampH = (h) => Math.round(clamp(h, 180, innerHeight * 0.85));
  const sheetH = () => clampH(saved.ui.sheet || innerHeight * 0.55);
  const html = document.documentElement;
  let dock = 0, fixedMoved = new Map(), mo = null, scanQueued = false, laying = false;
  function layout() {
    if (!root || laying) return;
    laying = true;
    const open = root.hasAttribute("data-open");
    const w = clampW(saved.ui.width || W0), h = sheetH();
    root.style.setProperty("--ep-w", w + "px");
    root.style.setProperty("--ep-sheet", h + "px");
    const sm = sheetMode(), docked = open && !sm, sheet = open && sm;
    root.toggleAttribute("data-sheet", sm);
    const before = dock + (html.classList.contains("ep-sheet") ? 1 : 0);
    dock = docked ? w : 0;
    html.classList.toggle("ep-docked", docked);
    html.classList.toggle("ep-sheet", sheet);
    html.style.setProperty("--ep-dock", dock + "px");
    html.style.setProperty("--ep-sheet-h", (sheet ? h : 0) + "px");
    if (gripEl) { gripEl.setAttribute("aria-orientation", sheetMode() ? "horizontal" : "vertical"); gripEl.setAttribute("aria-valuenow", String(sheetMode() ? h : w)); }
    scanFixed();
    if (docked && !mo) {
      mo = new MutationObserver(() => { if (!scanQueued) { scanQueued = true; requestAnimationFrame(() => { scanQueued = false; scanFixed(); }); } });
      mo.observe(document.body, { attributes: true, attributeFilter: ["class"], subtree: true });
    } else if (!docked && mo) { mo.disconnect(); mo = null; }
    // The page's own scripts size canvases and scroll from window size; tell them the room changed.
    if (before !== dock + (sheet ? 1 : 0)) dispatchEvent(new Event("resize"));
    laying = false;
  }
  function scanFixed() {
    if (mo) mo.takeRecords();
    for (const [n, o] of fixedMoved) { n.style.setProperty("right", o.v, o.p); if (o.l !== null) { n.style.setProperty("left", o.l, o.lp); n.style.setProperty("width", o.w, o.wp); } }
    fixedMoved.clear();
    if (!dock || !document.body) { if (mo) mo.takeRecords(); return; }
    const vw = html.clientWidth; // the root's clientWidth is the window's width without its scrollbar, margin or not
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => (n === root ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const found = [];
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (getComputedStyle(n).position !== "fixed") continue;
      const r = n.getBoundingClientRect();
      if (r.width && r.right > vw - dock + 0.5) found.push([n, r]);
    }
    for (const [n, r] of found) {
      const o = { v: n.style.getPropertyValue("right"), p: n.style.getPropertyPriority("right"), l: null, lp: "" };
      const fromRight = vw - r.right;
      if (r.left <= 1 && fromRight <= 1) { o.l = n.style.getPropertyValue("left"); o.lp = n.style.getPropertyPriority("left"); o.w = n.style.getPropertyValue("width"); o.wp = n.style.getPropertyPriority("width"); n.style.setProperty("left", r.left + "px", "important"); n.style.setProperty("width", "auto", "important"); }
      n.style.setProperty("right", Math.max(0, fromRight) + dock + "px", "important");
      fixedMoved.set(n, o);
    }
    if (mo) mo.takeRecords();
  }
  addEventListener("resize", () => { if (!laying) layout(); });

  function grip() {
    let start = null;
    const setSize = (px, commit) => {
      if (sheetMode()) saved.ui.sheet = clampH(px); else saved.ui.width = clampW(px);
      layout();
      if (commit) save();
    };
    const size = () => (sheetMode() ? sheetH() : clampW(saved.ui.width || W0));
    gripEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      gripEl.setPointerCapture(e.pointerId);
      start = { x: e.clientX, y: e.clientY, s: size() };
      root.setAttribute("data-resizing", "");
    });
    gripEl.addEventListener("pointermove", (e) => {
      if (!start) return;
      setSize(start.s + (sheetMode() ? start.y - e.clientY : start.x - e.clientX), false);
    });
    const end = () => { if (!start) return; start = null; root.removeAttribute("data-resizing"); save(); };
    gripEl.addEventListener("pointerup", end);
    gripEl.addEventListener("pointercancel", end);
    gripEl.addEventListener("dblclick", () => { if (sheetMode()) delete saved.ui.sheet; else delete saved.ui.width; layout(); save(); });
    gripEl.addEventListener("keydown", (e) => {
      const d = { ArrowLeft: 1, ArrowUp: 1, ArrowRight: -1, ArrowDown: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      setSize(size() + d * (e.shiftKey ? 64 : 16), true);
    });
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
      const has = hasGroups(name);
      x.pane.querySelector(".ep__empty").hidden = has;
      // A standalone page shows only the tabs it uses; the site preview keeps all three so it reads the same.
      if (FLUID) { x.btn.hidden = !has; x.rail.hidden = !has; }
    }
    if (FLUID && tablistEl) {
      tablistEl.hidden = [...tabs.keys()].filter(hasGroups).length < 2;
      if (resetTabBtn) resetTabBtn.textContent = tablistEl.hidden ? "Reset all" : "Reset tab";
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
    if (!pickedHere) select(pickTab());
    g.replay();
    applyRemote(g, def.id);
    updateCount();
    pushSoon();
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
      if (c.type === "text") { v = String(raw ?? ""); if (c.maxLength) v = v.slice(0, c.maxLength); }
      V[c.key] = v;
      if (persist) { if (same(v, D[c.key])) delete store[c.key]; else store[c.key] = v; save(); }
      rows[c.key].show(from);
      refreshMeta();
      if (!silent) fire(c);
      if (!applyingRemote) pushSoon();
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
      snapshot: () => {
        const changed = {};
        for (const c of controls) if (!same(V[c.key], D[c.key])) changed[c.key] = D[c.key];
        return { title: def.title || def.id, tab: tabOf(def), values: { ...V }, defaultsOfChanged: changed };
      },
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
    } else if (c.type === "text") {
      row.setAttribute("data-wide", "");
      head.append(reset);
      const box = el("input", "ep-r__text", { type: "text", id, autocomplete: "off", spellcheck: "false", maxlength: c.maxLength || 64 });
      row.append(box);
      const commit = () => set(box.value);
      box.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); commit(); }
        else if (e.key === "Escape") { e.preventDefault(); box.value = get(); box.blur(); }
      });
      box.addEventListener("input", () => { if (c.live !== false) commit(); });
      box.addEventListener("blur", commit);
      show = () => { if (document.activeElement !== box) box.value = get(); };
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

  // The published artifact's db. One document per page; values written a moment after the last change.
  // A layer registering later picks its group up from the stored document as it arrives.
  const pageKey = (() => {
    const p = location.pathname.replace(/index\.html?$/, "").replace(/^\/+|\/+$/g, "");
    const parts = p.split("/").filter((x) => x && !/^[0-9a-f-]{20,}$/i.test(x) && x !== "preview");
    return (parts.join("-").replace(/[^a-z0-9-]+/gi, "-").toLowerCase()) || "home";
  })();
  let db = null, remote = null, applyingRemote = false, pushT = 0, lastPush = "", dbState = "none";
  function showSaved(extra) {
    if (!savedEl) return;
    const where = dbState === "db" ? "Saving to the published preview" : dbState === "error" ? "Preview save failed, saving in this browser" : local ? "Saving in this browser" : "Not saving: storage is blocked";
    savedEl.textContent = extra ? `${where}. ${extra}` : where;
    savedEl.toggleAttribute("data-db", dbState === "db");
  }
  function payload() {
    const groupsOut = {};
    for (const [id, g] of groups) groupsOut[id] = g.snapshot();
    return { page: pageKey, path: location.pathname, title: document.title, updatedAt: new Date().toISOString(), groups: groupsOut, text: copyText() };
  }
  function pushSoon() {
    if (!db) return;
    clearTimeout(pushT);
    pushT = setTimeout(pushNow, 500);
  }
  async function pushNow() {
    if (!db) return;
    const data = payload();
    const sig = JSON.stringify(data.groups);
    if (sig === lastPush) return;
    try { await db.doc("tuning/" + pageKey).set(data); lastPush = sig; dbState = "db"; showSaved("Saved " + new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })); }
    catch (err) { dbState = "error"; showSaved(); console.warn("edit panel: db write failed", err); }
  }
  function applyRemote(g, id) {
    const r = remote && remote.groups && remote.groups[id];
    if (!r || !r.values) return;
    applyingRemote = true;
    try { g.api.set(r.values); } finally { applyingRemote = false; }
  }
  async function connect() {
    if (!window.claude || typeof window.claude.use !== "function") return;
    let ns = null;
    try { ns = await window.claude.use("db"); } catch {}
    if (!ns) return;
    db = ns; dbState = "db"; showSaved();
    try {
      const snap = await db.doc("tuning/" + pageKey).get();
      if (snap.exists) { remote = snap.data(); for (const [id, g] of groups) applyRemote(g, id); lastPush = JSON.stringify(payload().groups); }
      else pushSoon();
    } catch (err) { dbState = "error"; showSaved(); console.warn("edit panel: db read failed", err); }
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
    store: () => ({ page: pageKey, state: dbState, doc: "tuning/" + pageKey }),
    flush: () => pushNow(),
  };
  // Calls queued before this file loaded, and any pushed later by a layer that still uses the queue.
  const drain = () => { while (queue.length) { try { register(queue.shift()); } catch (err) { console.error(err); } } };
  window.EditPanelQueue = { push: (...defs) => { defs.forEach((d) => register(d)); return 0; }, get length() { return 0; } };
  if (document.body) drain(); else addEventListener("DOMContentLoaded", drain, { once: true });
  connect();
})();
