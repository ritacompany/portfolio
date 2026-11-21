// Card to collection transition, proposal (docs/motion/card-transition/). Preview only: lives in
// site/dev/preview until Chadwick says yes, then moves into site/js/site.js and the pages unchanged.
//
// One script on both pages. Home: a release on the Mondai card draws a copy of the card exactly where it
// is, fades a Neutral/900 veil over everything else (220 ms), keeps where every part of the card sat in
// this tab's session storage and opens /mondai/. Collection: reads that, starts on the same frame (the
// card alone on Neutral/900) and plays one of three directions, then hands the words to the real title
// and label with no jump.
//   A. Open: the card's frame grows to fill the screen and becomes the page.
//   B. Dock: the card closes along an arc into the Mondai mark beside the title.
//   C. Zoom: the page arrives as a half size miniature under the card's name and the view zooms in.
// Every frame is a pure function of time (window.CardTransition.seek), so the review capture can step it.
// Reduced motion: no exit, no arrival; the link opens the page at rest.
(function cardTransition() {
  if (window.CardTransition) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const SEEK = !!window.__CT_SEEK; // review capture: nothing runs on its own clock, nothing navigates
  const O = {
    dir: "A", exit: 220,
    kA: 80, dA: 18, kB: 120, dB: 22, kC: 40, dC: 13,
  };
  const FILL = { A: 0.6, B: 0.6, C: 0.3 }; // share of the travel (spring progress) at which the page only items start
  // C draws the page while it moves, so its items fade quicker than the shared 1.4 s and start at once.
  const FADE = { A: [1000, 120], B: [1000, 120], C: [700, 80] }; // share of the travel at which the page only items start to fade in
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const saved = store.get("card-transition:dir");
  if (saved && /^[ABC]$/.test(saved)) O.dir = saved;
  try { const q = new URLSearchParams(location.search).get("ct"); if (q && /^[ABC]$/.test(q)) O.dir = q; } catch (e) {}

  // ---- Handoff between the two pages: session storage, with window.name as the fallback
  const HKEY = "card-transition:handoff";
  const handoff = {
    save(d) {
      const s = JSON.stringify(d);
      try { sessionStorage.setItem(HKEY, s); sessionStorage.setItem(HKEY + ":last", s); } catch (e) {}
      try { window.name = "ct:" + s; } catch (e) {}
    },
    take() {
      let s = null;
      try { s = sessionStorage.getItem(HKEY); sessionStorage.removeItem(HKEY); } catch (e) {}
      try { if (!s && window.name.startsWith("ct:")) s = window.name.slice(3); if (window.name.startsWith("ct:")) window.name = ""; } catch (e) {}
      try { return s ? JSON.parse(s) : null; } catch (e) { return null; }
    },
    last() { try { return JSON.parse(sessionStorage.getItem(HKEY + ":last")); } catch (e) { return null; } },
  };

  // ---- Math: the closed form spring from site/lib/motion.js, eases, colour
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const range = (x, a, b) => clamp((x - a) / (b - a));
  const power1Out = (p) => 1 - (1 - clamp(p)) ** 2;
  const smooth = (p) => { p = clamp(p); return p * p * (3 - 2 * p); };
  function spring(t, k, d) {
    if (t <= 0) return 0;
    const w0 = Math.sqrt(k), z = d / (2 * w0);
    if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
    if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const r1 = -w0 * (z - Math.sqrt(z * z - 1)), r2 = -w0 * (z + Math.sqrt(z * z - 1));
    return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  }
  function settle(k, d, tol = 0.005) {
    let last = 0;
    for (let t = 0; t < 6; t += 1 / 240) if (Math.abs(1 - spring(t, k, d)) > tol) last = t;
    return Math.round(last * 1000);
  }
  const rgb = (s) => (s.match(/[\d.]+/g) || [0, 0, 0, 1]).map(Number).concat([1]).slice(0, 4);
  const mix = (a, b, p) => { const x = rgb(a), y = rgb(b); return `rgba(${x.map((v, i) => (i < 3 ? Math.round(lerp(v, y[i], p)) : +lerp(v, y[i], p).toFixed(3))).join(", ")})`; };
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; };
  const lerpBox = (a, b, p) => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), w: lerp(a.w, b.w, p), h: lerp(a.h, b.h, p) });
  const TEXT_PROPS = ["font-family", "font-size", "font-weight", "line-height", "letter-spacing", "text-transform", "color", "text-box-trim", "text-box-edge", "font-feature-settings", "-webkit-font-smoothing"];
  const styleOf = (el) => { const cs = getComputedStyle(el), o = {}; for (const p of TEXT_PROPS) o[p] = cs.getPropertyValue(p); return o; };
  const visible = (el) => { if (!el) return false; const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && +cs.opacity > 0; };
  const px = (v) => parseFloat(v) || 0;

  // Parts that are only on the card (the description, the phone's Learn more): copied with their own box,
  // every visual property inlined, so the copy draws exactly what Home drew.
  const BOX_PROPS = ["display", "box-sizing", "width", "height", "padding", "border", "border-radius", "background-color", "background-image", "box-shadow", "color", "font", "letter-spacing", "text-transform", "text-box-trim", "text-box-edge", "white-space", "zoom", "align-items", "justify-content", "gap", "-webkit-text-stroke", "text-align", "opacity", "-webkit-font-smoothing", "position", "inset", "translate"];
  function serial(el) {
    const copy = el.cloneNode(true), a = [el, ...el.querySelectorAll("*")], b = [copy, ...copy.querySelectorAll("*")];
    a.forEach((n, i) => {
      const cs = getComputedStyle(n), o = b[i];
      o.removeAttribute("class"); o.removeAttribute("id"); o.removeAttribute("href");
      o.setAttribute("style", BOX_PROPS.map((p) => `${p}:${cs.getPropertyValue(p)}`).join(";"));
    });
    copy.style.position = "static"; copy.style.inset = "auto"; copy.style.translate = "none"; copy.style.margin = "0";
    return copy.outerHTML;
  }
  const make = (cls, parent) => { const e = document.createElement("div"); e.className = cls; parent && parent.append(e); return e; };
  function textCopy(text, st, parent) {
    const e = make("ct-text", parent);
    e.textContent = text;
    for (const p in st) if (st[p]) e.style.setProperty(p, st[p]);
    return e;
  }
  function extraCopy(x, parent) { const e = make("ct-text", parent); e.innerHTML = x.html; return e; }
  const place = (e, x, y, s = 1) => { e.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${s.toFixed(5)})`; };

  // Everything the card draws in its media: the background and each visible image at its drawn rect.
  function snapMedia(media) {
    const m = box(media), cs = getComputedStyle(media);
    const imgs = [...media.querySelectorAll("img")].filter(visible).map((img) => ({ src: img.currentSrc || img.src, r: box(img), o: +getComputedStyle(img).opacity }));
    return { r: m, bg: cs.backgroundImage !== "none" ? cs.backgroundImage : "", bgc: cs.backgroundColor, imgs };
  }
  function drawMedia(snap, parent) {
    const wrap = make("ct-pic", parent);
    const bg = make("ct-bg", wrap);
    bg.style.width = snap.r.w + "px"; bg.style.height = snap.r.h + "px";
    bg.style.backgroundColor = snap.bgc; if (snap.bg) bg.style.backgroundImage = snap.bg;
    const imgs = snap.imgs.map((d) => {
      const i = document.createElement("img");
      i.className = "ct-img"; i.alt = ""; i.decoding = "sync"; i.src = d.src;
      i.style.width = d.r.w + "px"; i.style.height = d.r.h + "px"; i.style.opacity = d.o;
      wrap.append(i);
      return { el: i, r: d.r };
    });
    return { wrap, bg, imgs };
  }
  // Draw the picture as if its frame were the box F: the frame clips, the picture covers it from its centre.
  function paintMedia(M, snap, F, radius = 0, opacity = 1) {
    const vw = innerWidth, vh = innerHeight, o = snap.r;
    M.wrap.style.clipPath = `inset(${F.y.toFixed(2)}px ${(vw - F.x - F.w).toFixed(2)}px ${(vh - F.y - F.h).toFixed(2)}px ${F.x.toFixed(2)}px round ${radius.toFixed(2)}px)`;
    M.wrap.style.opacity = opacity.toFixed(4);
    const s = Math.max(F.w / o.w, F.h / o.h), cx = F.x + F.w / 2, cy = F.y + F.h / 2, ox = o.x + o.w / 2, oy = o.y + o.h / 2;
    place(M.bg, cx - (o.w * s) / 2, cy - (o.h * s) / 2, 1);
    M.bg.style.transform += ` scale(${s.toFixed(5)})`;
    for (const i of M.imgs) place(i.el, cx + (i.r.x - ox) * s, cy + (i.r.y - oy) * s, s);
  }

  // =============================================================== Home: the exit
  const card = document.querySelector("a.work-card-mondai");
  let exiting = null;
  function snapCard(e) {
    const media = card.querySelector(".work-card__media");
    const part = (sel) => { const el = card.querySelector(sel); return visible(el) ? { r: box(el), st: styleOf(el), text: el.textContent.trim() } : null; };
    const m = box(media);
    const pt = e && e.clientX ? { x: e.clientX, y: e.clientY } : { x: m.x + m.w / 2, y: m.y + m.h / 2 };
    return {
      v: 1, at: Date.now(), dir: O.dir, vw: innerWidth, vh: innerHeight, pt,
      media: snapMedia(media),
      name: part(".work-card__name"), slashes: part(".work-card__slashes"), kind: part(".work-card__kind"),
      extras: [...card.querySelectorAll(".work-card__desc, .work-card__more, .work-card__learn")].filter(visible).map((el) => ({ r: box(el), html: serial(el) })),
    };
  }
  function buildCardCopy(d, layer) {
    const M = drawMedia(d.media, layer);
    paintMedia(M, d.media, d.media.r);
    const texts = ["name", "slashes", "kind"].map((k) => d[k]).filter(Boolean).map((p) => {
      const e = textCopy(p.text, p.st, layer); place(e, p.r.x, p.r.y); return e;
    });
    for (const x of d.extras) place(extraCopy(x, layer), x.r.x, x.r.y);
    return { M, texts };
  }
  function exitFrame(t) {
    if (!exiting) return;
    exiting.veil.style.opacity = (1 - (1 - clamp(t / O.exit)) ** 4).toFixed(4); // quart out
  }
  function startExit(e) {
    const d = snapCard(e);
    const layer = make("ct-layer ct-layer--exit", document.body);
    const veil = make("ct-veil", layer);
    veil.style.opacity = "0";
    buildCardCopy(d, layer);
    exiting = { layer, veil, d };
    const cur = window.SiteCursor && window.SiteCursor.element;
    if (cur) cur.style.opacity = "0";
    handoff.save(d);
    if (SEEK) return;
    const t0 = performance.now();
    const go = () => location.assign(card.href);
    (function tick(now) {
      const t = now - t0;
      exitFrame(t);
      if (t >= O.exit) { go(); return; }
      requestAnimationFrame(tick);
    })(t0);
  }
  function clearExit() {
    if (exiting) { exiting.layer.remove(); exiting = null; }
    const cur = window.SiteCursor && window.SiteCursor.element;
    if (cur) cur.style.opacity = "";
  }
  if (card) {
    card.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduce.matches || exiting) return;
      e.preventDefault();
      startExit(e);
    });
    // Back to Home from the collection: the page comes back from the cache as it was left.
    addEventListener("pageshow", (e) => { if (e.persisted) clearExit(); });
  }

  // =============================================================== Collection: the arrival
  const coll = document.querySelector("main.collection");
  const canvas = coll && coll.closest(".canvas");
  let run = null;
  const imp = (el, p, v) => el.style.setProperty(p, v, "important");
  // The page's own entrance (mondai-motion) also fades these items; while the transition owns them its
  // animations are cancelled, so the two never fight over a frame.
  const quiet = (el) => { if (el && el.getAnimations) for (const a of el.getAnimations()) if (a.id !== "ct") a.cancel(); };

  function measure() {
    const q = (s) => canvas.querySelector(s);
    const P = {
      header: canvas.querySelector(":scope > .page-header"), brand: q(".collection__brand"), mark: q(".collection__mark"),
      h1: q(".collection__brand h1"), intro: q(".collection__intro"), label: q(".collection__label"),
      slashes: q(".collection__slashes"), kind: q(".collection__label h2"), rows: [...canvas.querySelectorAll(".collection__rows > li")],
    };
    if (!P.h1 || !P.label || !P.kind) return null;
    const D = {};
    for (const k of ["mark", "h1", "slashes", "kind"]) if (P[k]) D[k] = { r: box(P[k]), st: styleOf(P[k]) };
    return { P, D };
  }

  function prepare(d) {
    const m = measure();
    if (!m) return null;
    const { P, D } = m;
    const dir = /^[ABC]$/.test(d.dir) ? d.dir : "A";
    const k = O["k" + dir], dd = O["d" + dir], T = settle(k, dd);
    const R = { d, dir, P, D, k, dd, T, words: [], fades: [] };

    // Layers: the picture (behind the page for C, so the miniature page sits over the card) and the words.
    R.pic = make("ct-layer ct-layer--pic" + (dir === "C" ? " is-under" : ""), document.body);
    R.wordsLayer = make("ct-layer ct-layer--words", document.body);
    R.M = drawMedia(d.media, R.pic);
    if (dir === "C") { canvas.style.position = "relative"; canvas.style.zIndex = "1"; canvas.style.transformOrigin = "0 0"; }

    // Shared words: copies drawn in the collection's own style, starting at the card's size, spacing and colour.
    const pairs = [["name", "h1"], ["slashes", "slashes"], ["kind", "kind"]];
    for (const [from, to] of pairs) {
      const a = d[from], b = D[to];
      if (!b) continue;
      if (!a) { R.fades.push(P[to]); continue; } // not on the card at this width (the phone has no //): fades in
      if (dir === "C" && to === "h1") { R.h1Rides = { a, b }; continue; } // the real title rides the page
      const s0 = px(a.st["font-size"]) / px(b.st["font-size"]);
      const el = textCopy(P[to].textContent.trim(), b.st, R.wordsLayer);
      R.words.push({ el, a, b, s0, real: P[to], ls0: px(a.st["letter-spacing"]) / s0, ls1: px(b.st["letter-spacing"]) });
    }
    R.extras = d.extras.map((p) => ({ p, el: extraCopy(p, R.wordsLayer) }));

    // Page only items fade in place in reading order: one step per line, the shared 1.4 s power1 out.
    const order = [P.header, P.intro, ...P.rows].filter(Boolean);
    R.fadeDur = FADE[dir][0];
    const when = (q) => { let t = 0; while (t < R.T && spring(t / 1000, k, dd) / spring(R.T / 1000, k, dd) < q) t += 4; return t; };
    R.fadeList = order.map((el, i) => ({ el, at: when(FILL[dir]) + i * FADE[dir][1] }));
    // C: the label copy travels down past the intro to reach its place, so the intro waits until it has
    // passed (75 percent of the travel) and the two lines never cross.
    if (dir === "C" && P.intro) {
      const f = R.fadeList.find((x) => x.el === P.intro); if (f) f.at = when(0.75);
    }
    // A shared word the card does not draw at this width (the phone has no //) fades in as its partner lands.
    R.extraFades = R.fades.map((el) => ({ el, at: when(0.85) }));
    R.end = Math.max(R.T, ...R.fadeList.concat(R.extraFades).map((f) => f.at + R.fadeDur));

    // Hold the real page: brand and label boxes shown (their parts are driven one by one), page items hidden.
    imp(P.brand, "opacity", "1"); imp(P.brand, "visibility", "visible");
    imp(P.label, "opacity", "1"); imp(P.label, "visibility", "visible");
    for (const w of R.words) imp(w.real, "visibility", "hidden");
    for (const f of R.fadeList.concat(R.extraFades)) { imp(f.el, "opacity", "0"); imp(f.el, "visibility", "visible"); }
    if (P.mark) imp(P.mark, "opacity", "0");
    if (R.h1Rides) imp(P.h1, "visibility", "visible");
    document.documentElement.classList.add("ct-arriving", "ct-checked");
    return R;
  }

  // C's camera: page point (x, y) is drawn at (tx + s x, ty + s y).
  function camera(R, p) {
    const a = R.d.name, b = R.D.h1;
    const s0 = px(a.st["font-size"]) / px(b.st["font-size"]);
    const tx0 = a.r.x - s0 * b.r.x, ty0 = a.r.y - s0 * b.r.y;
    return { s0, tx0, ty0, s: lerp(s0, 1, p), tx: lerp(tx0, 0, p), ty: lerp(ty0, 0, p) };
  }
  const toWorld = (c, r) => ({ x: (r.x - c.tx0) / c.s0, y: (r.y - c.ty0) / c.s0, w: r.w / c.s0, h: r.h / c.s0 });
  const toScreen = (c, r) => ({ x: c.tx + c.s * r.x, y: c.ty + c.s * r.y, w: r.w * c.s, h: r.h * c.s });

  function frame(R, t) {
    const { d, D, P, dir } = R;
    // The spring rescaled so it reaches exactly 1 on the frame it settles: the hand over never jumps.
    const p = t >= R.T ? 1 : clamp(spring(t / 1000, R.k, R.dd) / spring(R.T / 1000, R.k, R.dd));
    const media = d.media.r, vw = innerWidth, vh = innerHeight;
    let cam = null;

    // ---- The picture
    if (dir === "A") {
      const F = lerpBox(media, { x: 0, y: 0, w: vw, h: vh }, p);
      paintMedia(R.M, d.media, F, 0, 1 - smooth(range(p, 0.35, 0.85)));
    } else if (dir === "B") {
      const M = D.mark ? D.mark.r : { x: D.h1.r.x - 60, y: D.h1.r.y, w: 40, h: 40 };
      const px1 = p, py1 = 1 - (1 - p) ** 1.6; // y leads x: the centre travels on an arc, not a diagonal
      const w = lerp(media.w, M.w, p), h = lerp(media.h, M.h, p);
      const cx = lerp(media.x + media.w / 2, M.x + M.w / 2, px1), cy = lerp(media.y + media.h / 2, M.y + M.h / 2, py1);
      const F = { x: cx - w / 2, y: cy - h / 2, w, h };
      paintMedia(R.M, d.media, F, Math.min(w, h) / 2 * smooth(range(p, 0.2, 0.85)), 1 - smooth(range(p, 0.5, 0.85)));
    } else {
      cam = camera(R, p);
      canvas.style.transform = p >= 1 ? "" : `translate3d(${cam.tx.toFixed(2)}px, ${cam.ty.toFixed(2)}px, 0) scale(${cam.s.toFixed(5)})`;
      paintMedia(R.M, d.media, toScreen(cam, toWorld(cam, media)), 0, 1 - smooth(range(p, 0, 0.3)));
    }

    // ---- Shared words
    for (const w of R.words) {
      let to = w.b.r;
      if (cam) to = toScreen(cam, w.b.r); // C: the label lands where the page's own label is this frame
      // The label and // drop first (y leads x), so the growing name never runs into them on the card's line.
      const py = w.real === P.h1 ? p : 1 - (1 - p) ** 2;
      const x = lerp(w.a.r.x, to.x, p), y = lerp(w.a.r.y, to.y, py);
      place(w.el, x, y, lerp(w.s0, 1, p));
      w.el.style.letterSpacing = lerp(w.ls0, w.ls1, p).toFixed(3) + "px";
      w.el.style.color = mix(w.a.st.color, w.b.st.color, p);
    }
    if (R.h1Rides) {
      const { a, b } = R.h1Rides, s0 = cam.s0;
      P.h1.style.letterSpacing = lerp(px(a.st["letter-spacing"]) / s0, px(b.st["letter-spacing"]), p).toFixed(3) + "px";
      P.h1.style.color = mix(a.st.color, b.st.color, p);
    }
    // Description and the phone's Learn more: not on the collection, they fade where they are (C: with the world).
    for (const x of R.extras) {
      const r = cam ? toScreen(cam, toWorld(cam, x.p.r)) : x.p.r;
      place(x.el, r.x, r.y, cam ? cam.s / cam.s0 : 1);
      x.el.style.opacity = (1 - smooth(range(p, 0, 0.12))).toFixed(4);
    }

    // ---- The mark
    if (P.mark) {
      const m = dir === "A" ? range(p, 0.5, 1) : dir === "B" ? range(p, 0.6, 1) : range(p, 0.3, 0.7);
      imp(P.mark, "opacity", power1Out(m).toFixed(4));
    }
    for (const el of [P.brand, P.label, P.mark, ...R.fadeList.map((f) => f.el), ...R.extraFades.map((f) => f.el)]) quiet(el);
    // ---- Page only items
    for (const f of R.fadeList.concat(R.extraFades)) imp(f.el, "opacity", power1Out((t - f.at) / R.fadeDur).toFixed(4));

    // ---- Hand over: the words become the real title and label on the frame the travel settles
    if (t >= R.T && !R.handed) {
      R.handed = true;
      for (const w of R.words) { w.real.style.removeProperty("visibility"); w.el.remove(); }
      R.pic.remove(); R.wordsLayer.remove();
      if (R.h1Rides) { P.h1.style.letterSpacing = ""; P.h1.style.color = ""; }
      if (dir === "C") { canvas.style.transform = ""; canvas.style.position = ""; canvas.style.zIndex = ""; canvas.style.transformOrigin = ""; }
    }
    if (t >= R.end) finish(R);
  }

  function finish(R) {
    if (!R || R.done) return;
    if (!R.handed) frame(R, R.T);
    R.done = true;
    const P = R.P;
    for (const el of [P.brand, P.label, P.mark, P.h1, ...R.fadeList.map((f) => f.el), ...R.extraFades.map((f) => f.el)].filter(Boolean)) {
      imp(el, "opacity", "1"); imp(el, "visibility", "visible");
    }
    document.documentElement.classList.remove("ct-arriving");
    removeEventListener("pointerdown", R.stop, true); removeEventListener("keydown", R.stop, true); removeEventListener("wheel", R.stop, true);
    if (run === R) run = null;
  }

  function arrive(d, { fresh = true } = {}) {
    if (!coll || !d || d.v !== 1) return null;
    if (fresh && !SEEK && (Date.now() - d.at > 5000)) return null;
    if (Math.abs(d.vw - innerWidth) > 2 || Math.abs(d.vh - innerHeight) > 2) return null;
    if (run) finish(run);
    scrollTo(0, 0);
    const R = prepare(d);
    if (!R) return null;
    run = R;
    frame(R, 0);
    R.stop = () => finish(R);
    if (SEEK) return R;
    addEventListener("pointerdown", R.stop, true); addEventListener("keydown", R.stop, true); addEventListener("wheel", R.stop, { capture: true, passive: true });
    const go = () => {
      const t0 = performance.now();
      (function tick(now) { if (R.done) return; frame(R, now - t0); if (!R.done) requestAnimationFrame(tick); })(t0);
    };
    // Images were decoded on Home a moment ago; wait at most 150 ms for this page's copy, holding frame 0.
    Promise.race([Promise.all(R.M.imgs.map((i) => i.el.decode().catch(() => {}))), new Promise((r) => setTimeout(r, 150))]).then(go);
    return R;
  }

  if (coll) {
    const d = reduce.matches ? null : handoff.take();
    const R = d ? arrive(d) : null;
    if (!R) document.documentElement.classList.add("ct-checked");
  }

  // =============================================================== Review and tuning
  window.CardTransition = {
    options: O,
    get run() { return run; },
    // Home: start the exit from a click at (x, y) without navigating; seekExit(t) paints it.
    startExit: (x, y) => startExit(x != null ? { clientX: x, clientY: y } : null),
    seekExit: exitFrame,
    handoff: () => exiting && exiting.d,
    // Collection: start from a handoff (the last one by default) and paint time t.
    arrive: (d) => arrive(d || handoff.last(), { fresh: false }),
    seek: (t) => run && frame(run, t),
    get duration() { return run ? run.end : 0; },
    get travel() { return run ? run.T : 0; },
  };

  const set = (k) => (v) => { O[k] = v; if (k === "dir") store.set("card-transition:dir", v); };
  const replay = () => { const d = handoff.last(); if (!d) return; d.dir = O.dir; arrive(d, { fresh: false }); };
  const def = {
    id: "card-transition", title: "Card to collection", tab: "Motion",
    note: coll
      ? "Replay runs the move again here in the direction picked. Pick a direction, then go back to Home and click the Mondai card to feel the whole thing."
      : "Pick a direction, then click the Mondai card. Each opens the collection page a different way.",
    controls: [
      { key: "dir", label: "Direction", type: "select", options: [["A", "A. Open: the card becomes the page"], ["B", "B. Dock: the card closes into the logo"], ["C", "C. Zoom: the view pushes into the card"]], value: O.dir, default: "A", onInput: set("dir") },
      { key: "exit", label: "Home fade to black", min: 80, max: 600, step: 10, unit: "ms", value: O.exit, default: 220, onInput: set("exit") },
      { key: "kA", label: "A spring stiffness", min: 20, max: 300, step: 5, value: O.kA, default: 80, enabledWhen: (v) => v.dir === "A", onInput: set("kA") },
      { key: "dA", label: "A spring damping", min: 5, max: 40, step: 0.5, value: O.dA, default: 18, enabledWhen: (v) => v.dir === "A", onInput: set("dA") },
      { key: "kB", label: "B spring stiffness", min: 20, max: 300, step: 5, value: O.kB, default: 120, enabledWhen: (v) => v.dir === "B", onInput: set("kB") },
      { key: "dB", label: "B spring damping", min: 5, max: 40, step: 0.5, value: O.dB, default: 22, enabledWhen: (v) => v.dir === "B", onInput: set("dB") },
      { key: "kC", label: "C spring stiffness", min: 20, max: 300, step: 5, value: O.kC, default: 40, enabledWhen: (v) => v.dir === "C", onInput: set("kC") },
      { key: "dC", label: "C spring damping", min: 5, max: 40, step: 0.5, value: O.dC, default: 13, enabledWhen: (v) => v.dir === "C", onInput: set("dC") },
    ],
    actions: coll ? [{ label: "Replay", onClick: replay }] : [],
  };
  if (card || coll) { if (window.EditPanel) window.EditPanel.register(def); else (window.EditPanelQueue ||= []).push(def); }
})();
