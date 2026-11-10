// Edit: a tool on the preview link only (never shipped; scripts/build-preview.mjs injects it).
// Built to reports/edit-tool-mobile-ux/REPORT.md (in ~/Code/portfolio): a photo editor style strip at the
// bottom of the phone. Tap Edit, tap anything on the page, pick a tab (Text, Space, Size, Colour) and a
// chip, then drag the ruler. Undo, redo and hold to compare sit in the strip. Copy sends the changes.
// Changes live in this browser only (localStorage) until he sends them.
(() => {
  const KEY = "edit-v2";
  const STYLES = { "Display/96": [96, 500, 94, -0.04], "Heading/64": [64, 500, 70, -0.04], "Heading/40": [40, 500, 46, -0.04], "Heading/24": [24, 500, 28, -0.04], "Heading/20": [20, 500, 26, -0.02], "Body/16": [16, 400, 22, -0.01], "Body/16 M": [16, 500, 21, -0.01], "Label/14": [14, 400, 20, 0.02], "Label/12": [12, 400, 17, 0.04] };
  // prop, chip label, step, px on screen per step, min, max
  const TABS = {
    Text: [["style", "Style"], ["font-size", "Size", 1, 10, 1, 400], ["font-weight", "Weight", 100, 40, 100, 900], ["line-height", "Line height", 1, 10, 0, 400], ["letter-spacing", "Letter spacing", 0.1, 8, -20, 20]],
    Space: [["margin-top", "Above", 1, 8, -400, 800], ["margin-bottom", "Below", 1, 8, -400, 800], ["margin-left", "Left", 1, 8, -400, 800], ["margin-right", "Right", 1, 8, -400, 800], ["padding-top", "Inside top", 1, 8, 0, 800], ["padding-bottom", "Inside bottom", 1, 8, 0, 800], ["padding-left", "Inside left", 1, 8, 0, 800], ["padding-right", "Inside right", 1, 8, 0, 800], ["row-gap", "Gap", 1, 8, 0, 400]],
    Size: [["width", "Width", 4, 8, 0, 2000], ["max-width", "Max width", 4, 8, 0, 2000]],
    Colour: [["color", "Text colour"]],
  };
  const MEDIA = { phone: "(max-width: 767.98px)", tablet: "(min-width: 768px) and (max-width: 1199.98px)", desktop: "(min-width: 1200px)" };
  const band = () => (innerWidth < 768 ? "phone" : innerWidth < 1200 ? "tablet" : "desktop");
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  // ---- state: changes plus undo history ----
  let S; try { S = JSON.parse(localStorage.getItem(KEY)) || null; } catch { S = null; }
  S = S || { changes: [], undo: [], redo: [] };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
  const sheet = document.createElement("style"); sheet.id = "edit-changes";
  const render = () => {
    const by = {};
    for (const c of S.changes) ((by[c.scope] ||= {})[c.sel] ||= {})[c.prop] = c.value;
    sheet.textContent = Object.entries(by).map(([sc, sels]) => {
      const body = Object.entries(sels).map(([s, d]) => `${s} { ${Object.entries(d).map(([p, v]) => `${p}: ${v} !important;`).join(" ")} }`).join("\n");
      return sc === "all" ? body : `@media ${MEDIA[sc]} {\n${body}\n}`;
    }).join("\n");
  };
  const find = (sel, prop, sc) => S.changes.find((c) => c.sel === sel && c.prop === prop && c.scope === sc);
  const write = (sel, name, prop, value, sc) => { // live write, no history
    S.changes = S.changes.filter((c) => !(c.sel === sel && c.prop === prop && c.scope === sc));
    if (value !== null) S.changes.push({ page: location.pathname, sel, name, prop, value, scope: sc });
    render();
  };
  const snapshot = (sel, name, props, sc) => props.map((p) => ({ sel, name, prop: p, scope: sc, value: (find(sel, p, sc) || {}).value ?? null }));
  const commit = (before, after, meta) => { S.undo.push({ before, after, meta }); if (S.undo.length > 200) S.undo.shift(); S.redo = []; save(); };
  const applySnap = (snap) => snap.forEach((x) => write(x.sel, x.name, x.prop, x.value, x.scope));

  // ---- selection helpers ----
  const selOf = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (n.dataset.figmaNode) { parts.unshift(`[data-figma-node="${n.dataset.figmaNode}"]`); break; }
      let s = n.tagName.toLowerCase();
      const cls = [...n.classList].find((c) => !c.startsWith("ed-"));
      if (cls) s += "." + cls;
      const sib = n.parentElement ? [...n.parentElement.children].filter((x) => x.tagName === n.tagName) : [];
      if (sib.length > 1) s += `:nth-of-type(${sib.indexOf(n) + 1})`;
      parts.unshift(s);
      if (parts.length > 4) break;
    }
    return parts.join(" > ");
  };
  const short = (el) => { const c = [...el.classList].find((x) => !x.startsWith("ed-")); return el.tagName.toLowerCase() + (c ? "." + c : ""); };
  const nameOf = (el) => { const t = (el.innerText || el.getAttribute("alt") || "").trim().replace(/\s+/g, " "); return short(el) + (t ? ` "${t.slice(0, 28)}${t.length > 28 ? "…" : ""}"` : ""); };
  const hasText = (el) => !!(el.innerText || "").trim() && !/^(IMG|SVG|PICTURE|VIDEO)$/i.test(el.tagName);
  const isFlex = (el) => /flex|grid/.test(getComputedStyle(el).display);
  const BLOCK = "p,h1,h2,h3,h4,h5,h6,li,a,button,figure,picture,section,header,footer,nav,ul,ol,div";
  const smart = (t) => { // inline text wrappers resolve to their block; images stay
    if (/^(IMG|SVG|PICTURE|VIDEO)$/i.test(t.tagName)) return t;
    if (t.closest && t.closest("svg")) return t.closest("svg");
    if (getComputedStyle(t).display === "inline" && t.parentElement) return t.parentElement.closest(BLOCK) || t;
    return t;
  };

  // ---- UI ----
  const h = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const pill = h("button", "ed-pill", "Edit");
  const top = h("div", "ed-top"); const copyBtn = h("button", "ed-copy"); const doneBtn = h("button", "ed-done", "Done"); top.append(copyBtn, doneBtn);
  const banner = h("div", "ed-banner", "Original"); banner.hidden = true;
  const box = h("div", "ed-box"); const tag = h("div", "ed-tag"); const mBox = h("div", "ed-mbox"); const pBox = h("div", "ed-pbox");
  const strip = h("div", "ed-strip");
  const rowA = h("div", "ed-a"); const secBtn = h("button", "ed-secbtn", "Sections"); const crumbs = h("div", "ed-crumbs"); const upBtn = h("button", "ed-up", "Up"); const scopeBtn = h("button", "ed-scope");
  rowA.append(secBtn, crumbs, upBtn, scopeBtn);
  const rowB = h("div", "ed-b"); const vName = h("div", "ed-vname"); const vVal = h("button", "ed-vval"); const vNote = h("div", "ed-vnote"); const cmpBtn = h("button", "ed-cmp", "Compare"); rowB.append(vName, vVal, vNote, cmpBtn);
  const rowC = h("div", "ed-c"); const ruler = h("div", "ed-ruler"); const track = h("div", "ed-track"); const needle = h("div", "ed-needle"); ruler.append(track); rowC.append(ruler, needle);
  const rowD = h("div", "ed-d");
  const hint = h("div", "ed-hint", "Tap anything on the page to edit it");
  const rowE = h("div", "ed-e");
  const undoBtn = h("button", "ed-undo", "↶"); const redoBtn = h("button", "ed-redo", "↷");
  undoBtn.setAttribute("aria-label", "Undo"); redoBtn.setAttribute("aria-label", "Redo");
  const tabBtns = Object.keys(TABS).map((t) => { const b = h("button", "ed-tab", t); b.dataset.tab = t; return b; });
  rowE.append(undoBtn, ...tabBtns, redoBtn);
  strip.append(rowA, rowB, rowC, rowD, hint, rowE);
  const dlg = h("dialog", "ed-sheet");
  [pill, copyBtn, doneBtn, upBtn, scopeBtn, vVal, undoBtn, redoBtn, cmpBtn, secBtn, ...tabBtns].forEach((b) => (b.type = "button"));

  let on = false, cur = null, tab = "Text", chip = "font-size", scopeAll = false, comparing = false;
  const sc = () => (scopeAll ? "all" : band());
  const chipsFor = (el) => Object.fromEntries(Object.entries(TABS).map(([t, list]) => [t, list.filter(([p]) => {
    if (t === "Text" || t === "Colour") return hasText(el);
    if (p === "row-gap") return isFlex(el);
    return true;
  })]));
  const def = () => Object.values(TABS).flat().find((x) => x[0] === chip) || TABS.Text[1];

  const current = () => { const v = parseFloat(getComputedStyle(cur).getPropertyValue(chip)); return isNaN(v) ? 0 : v; };
  const orig = new WeakMap(); // value with the changes off, for the white dot on the ruler
  const origOf = (el, prop) => {
    let m = orig.get(el); if (!m) orig.set(el, (m = {}));
    if (!(prop in m)) { sheet.disabled = true; m[prop] = parseFloat(getComputedStyle(el).getPropertyValue(prop)) || 0; sheet.disabled = false; }
    return m[prop];
  };
  const fmt = (v) => (chip === "font-weight" ? String(Math.round(v)) : (Math.round(v * 10) / 10) + " px");

  // ---- the ruler: a native horizontal scroll strip under a fixed needle ----
  let base = 0, pps = 8, step = 1, scrubbing = false, before = null, lastVal = null, building = false;
  const SPAN = 4000;
  const buildRuler = () => {
    const [, , st, px, min, max] = def(); step = st; pps = px;
    base = current(); lastVal = base;
    const o = origOf(cur, chip);
    const every = chip === "font-weight" ? 1 : chip === "letter-spacing" || chip.includes("width") ? 10 : 4;
    building = true;
    const ticks = []; const n = Math.floor(SPAN / pps);
    for (let i = -n; i <= n; i++) {
      const v = base + i * step; if (v < min - 1e-9 || v > max + 1e-9) continue;
      const major = Math.round(v / step) % every === 0;
      ticks.push(`<i style="left:${SPAN + i * pps}px" class="${major ? "M" : ""}${Math.abs(v - o) < step / 2 ? " O" : ""}"></i>`);
    }
    track.innerHTML = ticks.join(""); track.style.width = SPAN * 2 + "px";
    const centre = () => { ruler.scrollLeft = SPAN - ruler.clientWidth / 2; };
    centre(); setTimeout(() => { centre(); setTimeout(() => (building = false), 30); }, 0);
    ruler.setAttribute("role", "slider"); ruler.setAttribute("aria-valuemin", min); ruler.setAttribute("aria-valuemax", max);
  };
  const valFromScroll = () => { const [, , , , min, max] = def(); const off = ruler.scrollLeft + ruler.clientWidth / 2 - SPAN; const v = base + Math.round(off / pps) * step; return Math.min(max, Math.max(min, Math.round(v * 100) / 100)); };
  const setVal = (v) => {
    const sel = selOf(cur), unit = chip === "font-weight" ? "" : "px";
    if (/^(margin|padding)-(top|bottom)$|width/.test(chip) && getComputedStyle(cur).display === "inline") write(sel, nameOf(cur), "display", "inline-block", sc());
    write(sel, nameOf(cur), chip, v + unit, sc());
    showValue(); place();
  };
  ruler.addEventListener("scroll", () => {
    if (building || !cur) return;
    if (!scrubbing) { scrubbing = true; before = snapshot(selOf(cur), nameOf(cur), [chip, "display"], sc()); }
    const v = valFromScroll(); if (v !== lastVal) { lastVal = v; setVal(v); }
    clearTimeout(ruler._t); ruler._t = setTimeout(endScrub, 200);
  }, { passive: true });
  const endScrub = () => { if (!scrubbing || !cur) return; scrubbing = false; commit(before, snapshot(selOf(cur), nameOf(cur), [chip, "display"], sc()), { el: selOf(cur), tab, chip }); drawRows(); };
  ruler.addEventListener("click", (e) => { // tap the left or right third: one step
    const r = ruler.getBoundingClientRect(), x = e.clientX - r.left;
    if (x > r.width / 3 && x < (2 * r.width) / 3) return;
    ruler.scrollBy({ left: (x < r.width / 3 ? -1 : 1) * pps });
  });

  // ---- value: tap to type, double tap to reset ----
  let tapT = 0;
  vVal.onclick = () => {
    if (!cur || chip === "style" || chip === "color") return;
    const now = Date.now();
    if (now - tapT < 320) {
      clearTimeout(vVal._t); tapT = 0;
      const sel = selOf(cur), b = snapshot(sel, nameOf(cur), [chip], sc());
      write(sel, nameOf(cur), chip, null, sc()); commit(b, snapshot(sel, nameOf(cur), [chip], sc()), { el: sel, tab, chip }); drawRows(); return;
    }
    tapT = now;
    vVal._t = setTimeout(() => {
      const inp = h("input", "ed-type"); inp.type = "text"; inp.inputMode = "decimal"; inp.value = Math.round(current() * 100) / 100;
      vVal.replaceWith(inp); inp.focus(); inp.select(); keyboard(1);
      const done = () => { const n = parseFloat(inp.value); inp.replaceWith(vVal); keyboard(0);
        if (!isNaN(n)) { const sel = selOf(cur), b = snapshot(sel, nameOf(cur), [chip, "display"], sc()); setVal(n); commit(b, snapshot(sel, nameOf(cur), [chip, "display"], sc()), { el: sel, tab, chip }); }
        drawRows(); };
      inp.onblur = done; inp.onkeydown = (e) => { if (e.key === "Enter") inp.blur(); };
    }, 330);
  };
  const showValue = () => {
    if (!cur) return;
    const sel = selOf(cur);
    vName.textContent = (def()[1] || chip) + (scopeAll ? " · all widths" : "");
    if (chip === "style" || chip === "color") return;
    vVal.textContent = fmt(current());
    vVal.classList.toggle("is-changed", !!find(sel, chip, sc()));
    vNote.textContent = !scopeAll && find(sel, chip, "all") ? "also set for all widths" : scopeAll && find(sel, chip, band()) ? `a ${band()} value overrides this here` : "";
    ruler.setAttribute("aria-valuenow", current()); ruler.setAttribute("aria-valuetext", vVal.textContent);
  };

  // ---- rows ----
  const drawCrumbs = () => {
    crumbs.textContent = "";
    if (!cur) return;
    const chain = []; for (let n = cur; n && n !== document.body; n = n.parentElement) chain.unshift(n);
    chain.slice(-5).forEach((n) => { const b = h("button", n === cur ? "is-cur" : "", short(n)); b.type = "button"; b.onclick = () => select(n); crumbs.append(b); });
    crumbs.scrollLeft = crumbs.scrollWidth;
  };
  const drawRows = () => {
    strip.classList.toggle("is-idle", !cur);
    scopeBtn.textContent = scopeAll ? "All widths" : cap(band()); scopeBtn.classList.toggle("is-all", scopeAll);
    copyBtn.textContent = `Copy ${S.changes.length}`; copyBtn.disabled = !S.changes.length;
    undoBtn.disabled = !S.undo.length; redoBtn.disabled = !S.redo.length;
    drawCrumbs();
    if (!cur) { tabBtns.forEach((b) => { b.classList.remove("is-on"); b.disabled = true; }); place(); return; }
    upBtn.disabled = !cur.parentElement || cur.parentElement === document.body;
    const avail = chipsFor(cur);
    if (!avail[tab].length) tab = Object.keys(avail).find((t) => avail[t].length);
    if (!avail[tab].some(([p]) => p === chip)) chip = (avail[tab].find(([p]) => p !== "style") || avail[tab][0])[0];
    const sel = selOf(cur);
    tabBtns.forEach((b) => { const t = b.dataset.tab; b.disabled = !avail[t].length; b.classList.toggle("is-on", t === tab);
      b.classList.toggle("has-dot", avail[t].some(([p]) => S.changes.some((c) => c.sel === sel && (c.prop === p || (p === "style" && c.prop === "font-size"))))); });
    rowD.textContent = "";
    avail[tab].forEach(([p, label]) => { const c = h("button", "ed-chip" + (p === chip ? " is-on" : "") + (S.changes.some((x) => x.sel === sel && x.prop === p) ? " has-dot" : ""), label); c.type = "button"; c.onclick = () => { chip = p; drawRows(); }; rowD.append(c); });
    rowD.querySelector(".is-on")?.scrollIntoView({ inline: "nearest", block: "nearest" });
    strip.dataset.mode = chip === "style" ? "style" : chip === "color" ? "color" : "ruler";
    rowC.querySelector(".ed-alt")?.remove();
    if (chip === "style") drawStyles(); else if (chip === "color") drawColour(); else buildRuler();
    showValue(); place();
  };
  const drawStyles = () => {
    const alt = h("div", "ed-alt"); const cs = getComputedStyle(cur);
    Object.entries(STYLES).forEach(([n, v]) => { const b = h("button", "ed-style", n); b.type = "button";
      if (Math.round(parseFloat(cs.fontSize)) === v[0] && +cs.fontWeight === v[1]) b.classList.add("is-on");
      b.onclick = () => { const sel = selOf(cur), nm = nameOf(cur), P = ["font-size", "font-weight", "line-height", "letter-spacing"], bf = snapshot(sel, nm, P, sc());
        [[P[0], v[0] + "px"], [P[1], String(v[1])], [P[2], v[2] + "px"], [P[3], v[3] + "em"]].forEach(([p, x]) => write(sel, nm, p, x, sc()));
        commit(bf, snapshot(sel, nm, P, sc()), { el: sel, tab, chip }); drawRows(); };
      alt.append(b); });
    rowC.append(alt); vVal.textContent = n0(cs); vNote.textContent = "";
  };
  const n0 = (cs) => `${Math.round(parseFloat(cs.fontSize))} / ${cs.fontWeight}`;
  const hex = (rgb) => { const m = String(rgb).match(/\d+(\.\d+)?/g); return m ? "#" + m.slice(0, 3).map((x) => (+x).toString(16).padStart(2, "0")).join("") : rgb; };
  const tokens = () => { const out = []; for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; } for (const r of rules) if (r.selectorText === ":root" && r.style) for (const p of r.style) if (/^--neutral-\d+$/.test(p)) out.push(p); } return [...new Set(out)]; };
  const drawColour = () => {
    const alt = h("div", "ed-alt ed-colour");
    const sw = h("span", "ed-sw"); const inp = h("input", "ed-hex");
    Object.assign(inp, { type: "text", inputMode: "text", maxLength: 7, autocomplete: "off", spellcheck: false });
    inp.setAttribute("autocapitalize", "off"); inp.setAttribute("autocorrect", "off");
    const sel = selOf(cur), nm = nameOf(cur); let bf = null;
    const now = () => getComputedStyle(cur).color; inp.value = hex(now()); sw.style.background = now();
    inp.oninput = () => { const m = inp.value.trim().replace(/^#?/, "#"); const ok = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(m); inp.classList.toggle("is-bad", !ok); if (!ok) return; bf ||= snapshot(sel, nm, ["color"], sc()); write(sel, nm, "color", m, sc()); sw.style.background = m; vVal.textContent = m; place(); };
    inp.onblur = () => { keyboard(0); if (bf) { commit(bf, snapshot(sel, nm, ["color"], sc()), { el: sel, tab, chip }); bf = null; drawRows(); } };
    inp.onfocus = () => keyboard(1);
    const tk = h("div", "ed-tokens");
    tokens().forEach((t) => { const b = h("button", "ed-token"); b.type = "button"; b.title = t.replace("--", ""); b.style.background = `var(${t})`; b.setAttribute("aria-label", t.replace("--", ""));
      b.onclick = () => { const b0 = snapshot(sel, nm, ["color"], sc()); write(sel, nm, "color", `var(${t})`, sc()); commit(b0, snapshot(sel, nm, ["color"], sc()), { el: sel, tab, chip }); drawRows(); }; tk.append(b); });
    alt.append(sw, inp, tk); rowC.append(alt);
    vVal.textContent = (find(sel, "color", sc()) || {}).value || hex(now()); vNote.textContent = "";
  };

  // ---- outline, label and space overlay ----
  const place = () => {
    if (!cur || comparing) { box.hidden = tag.hidden = mBox.hidden = pBox.hidden = true; return; }
    const r = cur.getBoundingClientRect(), cs = getComputedStyle(cur);
    Object.assign(box.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" }); box.hidden = false;
    tag.textContent = `${short(cur)} · ${Math.round(r.width)} × ${Math.round(r.height)}`; tag.hidden = false;
    tag.style.left = Math.max(4, Math.min(r.left, innerWidth - 200)) + "px"; tag.style.top = (r.top > 30 ? r.top - 24 : r.bottom + 4) + "px";
    const showSpace = tab === "Space";
    mBox.hidden = pBox.hidden = !showSpace;
    if (showSpace) {
      const m = ["Top", "Right", "Bottom", "Left"].map((s) => Math.max(0, parseFloat(cs["margin" + s]) || 0));
      Object.assign(mBox.style, { left: r.left - m[3] + "px", top: r.top - m[0] + "px", width: r.width + m[1] + m[3] + "px", height: r.height + m[0] + m[2] + "px", borderWidth: m.map((x) => x + "px").join(" ") });
      const p = ["Top", "Right", "Bottom", "Left"].map((s) => parseFloat(cs["padding" + s]) || 0);
      Object.assign(pBox.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", borderWidth: p.map((x) => x + "px").join(" ") });
    }
  };
  addEventListener("scroll", () => requestAnimationFrame(place), { passive: true });
  addEventListener("resize", () => { requestAnimationFrame(place); if (on) drawRows(); });

  const select = (el) => {
    cur = el; drawRows();
    const r = el.getBoundingClientRect(), limit = innerHeight - strip.offsetHeight - 8;
    if (r.top < 40 || r.top > limit - 20) { scrollBy({ top: r.top - Math.min(120, limit / 3) }); place(); }
  };
  upBtn.onclick = () => cur && cur.parentElement && cur.parentElement !== document.body && select(cur.parentElement);
  scopeBtn.onclick = () => { scopeAll = !scopeAll; drawRows(); };
  tabBtns.forEach((b) => (b.onclick = () => { tab = b.dataset.tab; chip = ""; drawRows(); }));

  // ---- undo, redo, compare ----
  const restore = (entry, which) => { applySnap(entry[which]); save(); const el = document.querySelector(entry.meta.el); if (el) { cur = el; tab = entry.meta.tab; chip = entry.meta.chip; } drawRows(); };
  undoBtn.onclick = () => { const e = S.undo.pop(); if (!e) return; S.redo.push(e); restore(e, "before"); };
  redoBtn.onclick = () => { const e = S.redo.pop(); if (!e) return; S.undo.push(e); restore(e, "after"); };
  const cmp = (v) => { comparing = v; sheet.disabled = v; banner.hidden = !v; place(); };
  cmpBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); cmp(true); });
  ["pointerup", "pointercancel", "pointerleave"].forEach((t) => cmpBtn.addEventListener(t, () => comparing && cmp(false)));
  cmpBtn.oncontextmenu = (e) => e.preventDefault();

  // ---- sheets, one at a time ----
  const open = (fill) => { dlg.textContent = ""; fill(); if (!dlg.open) dlg.showModal(); };
  const closeBtn = () => { const b = h("button", "ed-close", "Close"); b.type = "button"; b.onclick = () => dlg.close(); return b; };
  secBtn.onclick = () => open(() => {
    dlg.append(h("h3", "", "Sections"), closeBtn());
    const all = [...document.querySelectorAll("header, nav, main > *, section, footer")].filter((n) => !n.closest(".ed-ui") && n.getBoundingClientRect().height > 0);
    all.filter((n) => !all.some((o) => o !== n && o.contains(n))).forEach((sec, i) => {
      const d = h("details"); d.append(h("summary", "", `${i + 1}. ${(sec.getAttribute("aria-label") || sec.querySelector("h1,h2,h3")?.innerText || short(sec)).trim().slice(0, 40)}`));
      d.ontoggle = () => { if (!d.open || d.dataset.b) return; d.dataset.b = 1;
        [sec, ...sec.querySelectorAll("*")].filter((n) => { if (n.closest("svg") && n.tagName.toLowerCase() !== "svg") return false; if (n.getBoundingClientRect().height < 2) return false; let k = 0; for (let x = n; x && x !== sec; x = x.parentElement) k++; return k <= 4 && (n === sec || n.children.length || hasText(n) || /IMG|SVG/i.test(n.tagName)); })
          .slice(0, 60).forEach((el) => { const b = h("button", "ed-row", (el === sec ? "Whole section · " : "") + nameOf(el)); b.type = "button";
            b.onclick = () => { dlg.close(); tab = "Space"; chip = el === sec ? "padding-top" : "margin-top"; el.scrollIntoView({ block: "center" }); select(el); }; d.append(b); });
      };
      dlg.append(d);
    });
  });
  const changesText = () => "Edit tool changes:\n" + S.changes.map((c) => `- ${c.page} ${c.name} [${c.scope === "all" ? "every width" : c.scope}]: ${c.prop} ${c.value}   (${c.sel})`).join("\n");
  const copySheet = () => open(() => {
    dlg.append(h("h3", "", `${S.changes.length} changes`), closeBtn());
    const list = h("div", "ed-list");
    S.changes.forEach((c) => { const row = h("div", "ed-crow"); row.append(h("span", "", `${c.name} · ${c.prop} ${c.value} · ${c.scope === "all" ? "all widths" : c.scope}`));
      const x = h("button", "", "Remove"); x.type = "button";
      x.onclick = () => { const b = snapshot(c.sel, c.name, [c.prop], c.scope); write(c.sel, c.name, c.prop, null, c.scope); commit(b, snapshot(c.sel, c.name, [c.prop], c.scope), { el: c.sel, tab, chip }); drawRows(); copySheet(); };
      row.append(x); list.append(row); });
    const ta = h("textarea", "ed-out"); ta.readOnly = true; ta.value = changesText();
    const canClip = !!(navigator.clipboard && window.isSecureContext);
    ta.hidden = canClip;
    const go = h("button", "ed-primary", canClip ? "Copy for Claude" : "Select all, then tap Copy"); go.type = "button";
    go.onclick = async () => { if (canClip) { try { await navigator.clipboard.writeText(ta.value); go.textContent = "Copied"; return; } catch {} } ta.hidden = false; ta.focus(); ta.setSelectionRange(0, ta.value.length); };
    const clr = h("button", "ed-clear", "Clear all"); clr.type = "button"; clr.onclick = () => { if (confirm("Clear every change on every page?")) { S = { changes: [], undo: [], redo: [] }; save(); render(); dlg.close(); drawRows(); } };
    dlg.append(list, go, ta, clr);
  });
  copyBtn.onclick = copySheet;

  // ---- keyboard: lift the strip above it (Safari does not move fixed elements) ----
  const keyboard = (onKb) => { if (!window.visualViewport) return; const vv = visualViewport; const lift = onKb ? Math.max(0, innerHeight - vv.height - vv.offsetTop) : 0; strip.style.transform = lift ? `translateY(${-lift}px)` : ""; };
  window.visualViewport && visualViewport.addEventListener("resize", () => keyboard(document.activeElement && strip.contains(document.activeElement)));

  // ---- on, off and picking ----
  const setH = () => document.documentElement.style.setProperty("--ed-strip-h", on ? strip.offsetHeight + "px" : "0px");
  const setOn = (v) => {
    on = v; document.body.classList.toggle("ed-on", on);
    pill.hidden = on; strip.hidden = top.hidden = !on;
    if (!on) { cur = null; if (dlg.open) dlg.close(); }
    drawRows(); setH();
  };
  pill.onclick = () => setOn(true); doneBtn.onclick = () => setOn(false);
  const mine = (t) => [pill, top, strip, dlg, banner].some((u) => u.contains(t));
  document.addEventListener("click", (e) => {
    if (!on || mine(e.target)) return;
    e.preventDefault(); e.stopPropagation();
    let t = smart(e.target);
    if (cur && t === cur) { // tap the selection again: one level deeper toward the finger
      let n = e.target; while (n.parentElement && n.parentElement !== cur) n = n.parentElement;
      if (n !== cur && cur.contains(n)) t = n;
    }
    if (t === document.body || t === document.documentElement) { cur = null; drawRows(); return; }
    select(t);
  }, true);
  new ResizeObserver(setH).observe(strip);

  const mount = () => {
    const vp = document.querySelector('meta[name="viewport"]'); if (vp && !/viewport-fit/.test(vp.content)) vp.content += ", viewport-fit=cover";
    document.head.append(sheet); render();
    strip.hidden = top.hidden = true;
    [pill, top, strip, dlg, banner].forEach((u) => u.classList.add("ed-ui"));
    document.body.append(mBox, pBox, box, tag, banner, top, strip, pill, dlg);
    drawRows();
  };
  document.body ? mount() : addEventListener("DOMContentLoaded", mount);
})();
