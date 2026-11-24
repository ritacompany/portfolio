// preview: render-blocking (scripts/build-preview.mjs puts it in the head; the page paints only after it ran)
// Card to collection transition, proposal (docs/motion/card-transition/). Preview only: lives in
// site/dev/preview until Chadwick says yes. Lands on the new collection page (Figma 6331:27875, PR #30).
//
// Three directions, picked in the edit panel (Motion tab):
//   A. Title: PR #30's idea (the title morph) on this engine, so it starts on the release instead of after
//      the page loads: only the words travel, "Mondai" grows into the wordmark, the picture goes with Home.
//   B. Card: the card's picture frame travels and resizes into the Framework CS card's frame; inside it the
//      Home picture gives way to the framework preview. "Mondai" grows into the wordmark.
//   C. Open: the card's frame grows to fill the screen and becomes the page; the picture dissolves into it.
//      "Mondai" grows into the wordmark.
// Every direction: the move starts on Home on the frame of the release and keeps running while the collection
// loads, so the page load never shows as a pause (his note, 24 Nov: a 0.4 s freeze between the fade and
// the move). Home knows where everything lands because it measured the collection beforehand in a hidden
// frame (which also puts the page in the browser's cache). Home fades a Neutral/900 veil over everything
// that does not continue (220 ms), opens /mondai/, and keeps drawing the move until the browser swaps the
// page. The collection picks the move up from the time it left off, catching up to the clock over about
// 0.15 s instead of jumping, and the browser's view transition is skipped for that one page change. The collection to framework page change
// stays PR #30's in every direction.
// Every frame is a pure function of time (window.CardTransition.seek), so the review capture can step it.
// Reduced motion: no exit, no arrival; the link opens the page at rest.
(function cardTransition() {
  if (window.CardTransition) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const SEEK = !!window.__CT_SEEK; // review capture: nothing runs on its own clock, nothing navigates
  const O = { dir: "B", exit: 220, kA: 90, dA: 19, kB: 90, dB: 19, kC: 80, dC: 18 };
  const DIRS = ["A", "B", "C"];
  const FILL = { A: 0.3, B: 0.3, C: 0.3 };          // spring progress at which the page only items start
  const FADE = { A: [600, 70], B: [600, 70], C: [600, 70] }; // short: the page often arrives late in the move // page only items: fade length and step, ms
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const saved = store.get("card-transition:dir");
  if (saved && DIRS.includes(saved)) O.dir = saved;
  try { const q = new URLSearchParams(location.search).get("ct"); if (q && DIRS.includes(q)) O.dir = q; } catch (e) {}

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
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; };
  const lerpBox = (a, b, p) => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p), w: lerp(a.w, b.w, p), h: lerp(a.h, b.h, p) });
  const TEXT_PROPS = ["font-family", "font-size", "font-weight", "line-height", "letter-spacing", "text-transform", "color", "text-box-trim", "text-box-edge", "font-feature-settings", "-webkit-font-smoothing", "padding-inline-end"];
  const styleOf = (el) => { const cs = getComputedStyle(el), o = {}; for (const p of TEXT_PROPS) o[p] = cs.getPropertyValue(p); return o; };
  const visible = (el) => { if (!el) return false; const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && +cs.opacity > 0; };

  const make = (cls, parent, tag = "div") => { const e = document.createElement(tag); e.className = cls; parent && parent.append(e); return e; };
  function textCopy(text, st, parent) {
    const e = make("ct-text", parent);
    e.textContent = text;
    for (const p in st) if (st[p]) e.style.setProperty(p, st[p]);
    return e;
  }
  const place = (e, x, y, s = 1) => { e.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${s.toFixed(5)})`; };
  const imgCopy = (src, w, h, parent, cls = "ct-img") => {
    const i = make(cls, parent, "img");
    i.alt = ""; i.decoding = "sync"; i.src = src;
    i.style.width = w + "px"; i.style.height = h + "px";
    return i;
  };

  // The card's picture: its background and each visible image at its drawn rect.
  function snapMedia(media) {
    const m = box(media), cs = getComputedStyle(media);
    const imgs = [...media.querySelectorAll("img")].filter(visible).map((img) => ({ src: img.currentSrc || img.src, r: box(img), o: +getComputedStyle(img).opacity }));
    return { r: m, bg: cs.backgroundImage !== "none" ? cs.backgroundImage : "", bgc: cs.backgroundColor, imgs };
  }
  // A frame that clips; inside it the Home picture (with a Neutral/900 shade over it) and, for B, the
  // picture that waits at the destination.
  function drawFrame(snap, parent, dest) {
    const wrap = make("ct-pic", parent);
    const bg = make("ct-bg", wrap);
    bg.style.width = snap.r.w + "px"; bg.style.height = snap.r.h + "px";
    bg.style.backgroundColor = snap.bgc; if (snap.bg) bg.style.backgroundImage = snap.bg;
    const imgs = snap.imgs.map((d) => { const i = imgCopy(d.src, d.r.w, d.r.h, wrap); i.style.opacity = d.o; return { el: i, r: d.r }; });
    const shade = make("ct-shade", wrap);
    let to = null;
    if (dest) { to = imgCopy(dest.src, dest.r.w, dest.r.h, wrap, "ct-img ct-cover"); to.style.opacity = "0"; }
    return { wrap, bg, imgs, shade, to, dest };
  }
  // Draw the frame as the box F: it clips, the Home picture covers it from its centre.
  function paintFrame(M, snap, F, { home = 1, shade = 0, dest = 0 } = {}) {
    const vw = innerWidth, vh = innerHeight, o = snap.r;
    M.wrap.style.clipPath = `inset(${F.y.toFixed(2)}px ${(vw - F.x - F.w).toFixed(2)}px ${(vh - F.y - F.h).toFixed(2)}px ${F.x.toFixed(2)}px)`;
    const s = Math.max(F.w / o.w, F.h / o.h), cx = F.x + F.w / 2, cy = F.y + F.h / 2, ox = o.x + o.w / 2, oy = o.y + o.h / 2;
    place(M.bg, cx - (o.w * s) / 2, cy - (o.h * s) / 2, 1); M.bg.style.transform += ` scale(${s.toFixed(5)})`;
    M.bg.style.opacity = home.toFixed(4);
    for (const i of M.imgs) { place(i.el, cx + (i.r.x - ox) * s, cy + (i.r.y - oy) * s, s); i.el.style.opacity = home.toFixed(4); }
    M.shade.style.opacity = (shade * home).toFixed(4);
    if (M.to) {
      const r = M.dest.r, k = Math.max(F.w / r.w, F.h / r.h);
      place(M.to, cx - (r.w * k) / 2, cy - (r.h * k) / 2, k);
      M.to.style.opacity = dest.toFixed(4);
    }
  }

  // =============================================================== The move, drawn the same on both pages
  // d: the card as Home drew it. D: where it lands on the collection ({ wordmark: { r, src }, kind: { r, st },
  // media: { r, src } }). Times are ms from the release.
  function buildTravel(d, D, dir, parent) {
    const k = O["k" + dir], dd = O["d" + dir], T = settle(k, dd);
    const X = { d, D, dir, k, dd, T };
    X.prog = (t) => (t >= T ? 1 : clamp(spring(t / 1000, k, dd) / spring(T / 1000, k, dd)));
    X.pic = make("ct-layer ct-layer--pic", parent);
    X.wordsLayer = make("ct-layer ct-layer--words", parent);
    X.M = drawFrame(d.media, X.pic, dir === "B" && D.media.src ? { src: D.media.src, r: D.media.r } : null);
    // "Mondai": the card's word fades out while the wordmark, drawn at its full size and scaled down to the
    // word's width, fades in over it; both grow together, pinned at the baseline and the left edge.
    if (d.name && D.wordmark.src) {
      X.nameText = textCopy(d.name.text, d.name.st, X.wordsLayer);
      X.mark = imgCopy(D.wordmark.src, D.wordmark.r.w, D.wordmark.r.h, X.wordsLayer, "ct-img ct-mark");
    }
    // "Case study collection": the card's label travels to the page's label and hands over to it there
    // (different type on each side: Label/12 C capitals on the card, 16 px on two lines on the page).
    if (d.kind) X.kindText = textCopy(d.kind.text, d.kind.st, X.wordsLayer);
    // The page's own label, drawn here too, so it can arrive during the move even before the page has loaded.
    X.kindTo = textCopy(D.kind.text || (d.kind ? d.kind.text : ""), D.kind.st, X.wordsLayer);
    X.kindTo.style.whiteSpace = "normal"; X.kindTo.style.width = D.kind.r.w + "px";
    place(X.kindTo, D.kind.r.x, D.kind.r.y); X.kindTo.style.opacity = "0";
    return X;
  }
  function paintTravel(X, t) {
    const { d, D, dir } = X;
    const p = X.prog(t), vw = innerWidth, vh = innerHeight, media = d.media.r;
    if (dir === "A") {
      // Only the words travel (PR #30's idea, the title morph): the picture stays where it was, darkens and
      // goes with Home in the first quarter.
      paintFrame(X.M, d.media, media, { home: 1 - smooth(range(p, 0.05, 0.3)), shade: 0.65 * smooth(range(p, 0, 0.15)) });
    } else if (dir === "B") {
      // The frame travels to the card's frame; the Home picture is shaded first, then gives way to the
      // framework preview inside the frame (a container transform: only the frame is shared).
      const F = lerpBox(media, D.media.r, p);
      X.F = F;
      paintFrame(X.M, d.media, F, { home: 1 - smooth(range(p, 0.2, 0.5)), shade: 0.6 * smooth(range(p, 0, 0.2)), dest: smooth(range(p, 0.4, 0.75)) });
    } else {
      const F = lerpBox(media, { x: 0, y: 0, w: vw, h: vh }, p);
      paintFrame(X.M, d.media, F, { home: 1 - smooth(range(p, 0.55, 1)), shade: 0.65 * smooth(range(p, 0, 0.25)) }); // dissolves as the cards arrive, so the stage is never empty
    }
    // "Mondai" into the wordmark: left edges and baselines meet, the width carries the size
    if (X.mark) {
      const a = d.name.r, b = D.wordmark.r;
      const w = lerp(a.w, b.w, p), x = lerp(a.x, b.x, p), base = lerp(a.y + a.h, b.y + b.h, p);
      const sm = w / b.w, st = w / a.w;
      place(X.mark, x, base - b.h * sm, sm);
      place(X.nameText, x, base - a.h * st, st);
      const swap = smooth(range(p, 0, 0.15)); // brief: the two shapes differ a little, so they overlap for only a few frames
      X.mark.style.opacity = swap.toFixed(4);
      X.nameText.style.opacity = (1 - swap).toFixed(4);
    }
    // The label: travels, grows to the page's size, hands over at the end
    if (X.kindText) {
      const a = d.kind.r, b = D.kind.r;
      const py = 1 - (1 - p) ** 2; // drops first, so the growing wordmark never runs into it
      const s = lerp(1, parseFloat(D.kind.st["font-size"]) / parseFloat(d.kind.st["font-size"]), p);
      place(X.kindText, lerp(a.x, b.x, p), lerp(a.y, b.y, py), s);
      X.kindText.style.opacity = (1 - smooth(range(p, 0.45, 0.65))).toFixed(4); // gone before the page's label shows: two typesettings never overlap
    }
    X.kindTo.style.opacity = smooth(range(p, 0.65, 0.95)).toFixed(4);
    return p;
  }
  const removeTravel = (X) => { X.pic.remove(); X.wordsLayer.remove(); };

  // Where the move lands, read from the collection itself (its own document, or one in a hidden frame).
  function readDest(doc) {
    const q = (sel) => doc.querySelector(sel);
    const wordmark = q(".collection__wordmark"), wordImg = q(".collection__wordmark img"), kind = q(".collection__kind");
    const link = q(".cs-card__link"), media = link && link.querySelector(".cs-card__media"), img = media && media.querySelector("img");
    if (!wordmark || !wordImg || !kind || !media) return null;
    const win = doc.defaultView;
    const st = (() => { const cs = win.getComputedStyle(kind), o = {}; for (const p of TEXT_PROPS) o[p] = cs.getPropertyValue(p); return o; })();
    return {
      wordmark: { r: box(wordmark), src: wordImg.currentSrc || wordImg.src },
      kind: { r: box(kind), st, text: kind.textContent.trim() },
      media: { r: box(media), src: img ? img.currentSrc || img.src : "" },
    };
  }

  // =============================================================== Home: the exit (B and C)
  const card = document.querySelector("a.work-card-mondai");
  let exiting = null;
  function snapCard(e) {
    const media = card.querySelector(".work-card__media");
    const part = (sel) => { const el = card.querySelector(sel); return visible(el) ? { r: box(el), st: styleOf(el), text: el.textContent.trim() } : null; };
    const m = box(media);
    const pt = e && e.clientX ? { x: e.clientX, y: e.clientY } : { x: m.x + m.w / 2, y: m.y + m.h / 2 };
    return { v: 2, at: Date.now(), dir: O.dir, vw: innerWidth, vh: innerHeight, pt, media: snapMedia(media), name: part(".work-card__name"), kind: part(".work-card__kind") };
  }
  function exitFrame(t) {
    if (!exiting) return;
    exiting.veil.style.opacity = Math.sin(clamp(t / O.exit) * Math.PI / 2).toFixed(4); // sine out: it starts at once but never cuts to black
    if (exiting.X) { paintTravel(exiting.X, t); exiting.lastT = t; }
  }

  // The collection, measured ahead of the click in a hidden frame the size of this window, so the move
  // can start on Home. Doing it once also puts the page and its images in the browser's cache, which makes
  // the page change itself quicker in every direction, A included. Kept per window size.
  const DKEY = "card-transition:dest";
  let dest = null, measuring = false;
  const destKey = () => `${innerWidth}x${innerHeight}`;
  try { const c = JSON.parse(sessionStorage.getItem(DKEY)); if (c && c.key === destKey()) dest = c.D; } catch (e) {}
  function measureDest() {
    if (!card || measuring || SEEK && window.__CT_NO_MEASURE) return;
    if (dest && dest.key === destKey()) return;
    measuring = true;
    const f = document.createElement("iframe");
    f.dataset.ctMeasure = "1";
    f.setAttribute("aria-hidden", "true"); f.tabIndex = -1;
    f.style.cssText = `position:fixed;left:0;top:0;width:${innerWidth}px;height:${innerHeight}px;border:0;visibility:hidden;pointer-events:none;z-index:-1`;
    f.src = card.href;
    const done = () => { measuring = false; f.remove(); };
    f.addEventListener("load", () => {
      const doc = f.contentDocument;
      if (!doc) return done();
      const read = () => {
        const D = readDest(doc);
        if (D) { D.key = destKey(); dest = D; try { sessionStorage.setItem(DKEY, JSON.stringify({ key: D.key, D })); } catch (e) {} }
        done();
      };
      (doc.fonts ? doc.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(read), done);
    });
    setTimeout(() => { if (measuring) done(); }, 8000);
    document.body.append(f);
  }
  function startExit(e) {
    const d = snapCard(e);
    const layer = make("ct-layer ct-layer--exit", document.body);
    const veil = make("ct-veil", layer);
    veil.style.opacity = "0";
    // What continues: the picture and the two shared words. The "//", the description and the phone's
    // Learn more are not on the collection, so they go with Home under the veil.
    const D = dest && dest.key === destKey() ? dest : null;
    let X = null;
    if (D) {
      // The move starts here, now. Its layers sit inside the exit layer, over the veil.
      X = buildTravel(d, D, DIRS.includes(d.dir) ? d.dir : "B", layer);
      d.t0 = performance.timeOrigin + performance.now();
    } else {
      // Not measured yet (a very fast click): the card holds still on the veil and the collection plays
      // the move once it loads, as before.
      const M = drawFrame(d.media, layer);
      paintFrame(M, d.media, d.media.r);
      for (const p of [d.name, d.kind]) if (p) place(textCopy(p.text, p.st, layer), p.r.x, p.r.y);
    }
    exiting = { layer, veil, d, X, lastT: 0 };
    exitFrame(0);
    const cur = window.SiteCursor && window.SiteCursor.element;
    if (cur) cur.style.opacity = "0";
    handoff.save(d);
    if (SEEK) return;
    const t0 = performance.now();
    let gone = false;
    (function tick(now) {
      const t = now - t0;
      exitFrame(t);
      // Open the collection while the veil is still closing (it is 90 percent down by then) and keep drawing
      // the move until the browser swaps pages, so the page load overlaps the move instead of following it.
      if (t >= (X ? O.exit * 0.55 : O.exit) && !gone) { gone = true; location.assign(card.href); if (!X) return; }
      requestAnimationFrame(tick);
    })(t0);
  }
  // The last frame Home drew, so the collection continues from exactly there.
  addEventListener("pagehide", () => {
    if (!exiting || !exiting.X) return;
    const d = exiting.d; d.lastT = exiting.lastT;
    try { sessionStorage.setItem(HKEY, JSON.stringify(d)); } catch (e) {}
    try { window.name = "ct:" + JSON.stringify(d); } catch (e) {}
  });
  function clearExit() {
    if (exiting) { exiting.layer.remove(); exiting = null; }
    const cur = window.SiteCursor && window.SiteCursor.element;
    if (cur) cur.style.opacity = "";
  }
  if (card && !(window.frameElement && window.frameElement.dataset && window.frameElement.dataset.ctMeasure)) {
    // Measure as soon as the card is near the screen, when the browser is idle; a hover or press also asks.
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); idle(measureDest); } }, { rootMargin: "100% 0px" });
      io.observe(card);
    }
    card.addEventListener("pointerenter", measureDest);
    card.addEventListener("focus", measureDest);
    addEventListener("resize", () => { if (dest && dest.key !== destKey()) dest = null; });
    card.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (reduce.matches || exiting) return;
      e.preventDefault();
      startExit(e);
    });
    // The veil already did the browser's fade; skip its view transition for this one page change.
    addEventListener("pageswap", (e) => { if (exiting && e.viewTransition) e.viewTransition.skipTransition(); });
    addEventListener("pageshow", (e) => { if (e.persisted) clearExit(); });
  }

  // =============================================================== Collection: the arrival
  const coll = document.querySelector("main.collection");
  const canvas = coll && coll.closest(".canvas");
  let run = null;
  const imp = (el, p, v) => el && el.style.setProperty(p, v, "important");
  // The page's own entrance (mondai-motion) also animates these items; while the transition owns them
  // its animations are cancelled, so the two never fight over a frame.
  const quiet = (el) => { if (el && el.getAnimations) for (const a of el.getAnimations({ subtree: true })) a.cancel(); };

  function measure() {
    const q = (s) => canvas.querySelector(s);
    // Cards whose head is not yet 100 px inside the screen (the phone's lower cards) stay with the page's
    // own scroll entrance, as on a direct visit; the transition only owns what the visitor can see.
    const cards = [...canvas.querySelectorAll(".collection__cards > li")].filter((li) => {
      const h = li.querySelector(".cs-card__head");
      return (h ? h.getBoundingClientRect().top : li.getBoundingClientRect().top) < innerHeight - 100;
    });
    const P = {
      header: canvas.querySelector(":scope > .page-header"), title: q(".collection__title"),
      wordmark: q(".collection__wordmark"), wordImg: q(".collection__wordmark img"), kind: q(".collection__kind"),
      cards, live: cards.find((li) => li.querySelector(".cs-card__link")),
    };
    if (!P.wordmark || !P.wordImg || !P.kind || !P.live) return null;
    P.liveMedia = P.live.querySelector(".cs-card__media"); P.liveImg = P.liveMedia && P.liveMedia.querySelector("img");
    P.liveHead = P.live.querySelector(".cs-card__head");
    const D = readDest(document);
    return D ? { P, D } : null;
  }

  function prepare(d) {
    const m = measure();
    if (!m) return null;
    const { P, D } = m;
    const dir = DIRS.includes(d.dir) ? d.dir : "B";
    const X = buildTravel(d, D, dir, document.body);
    const R = { d, dir, P, D, X, T: X.T, prog: X.prog };
    const when = (q) => { let t = 0; while (t < R.T && R.prog(t) < q) t += 4; return t; };

    // Where this page picks the move up: from the last frame Home drew, or from the start when Home only
    // held the card still (it had not measured this page yet).
    R.tStart = d.t0 ? (d.lastT != null ? d.lastT : performance.timeOrigin + performance.now() - d.t0) : 0;

    // Page only items fade in place in reading order. B: the live card's head fades and its frame is the
    // one that arrives; C: the whole live card fades with the others.
    const steps = [P.header];
    for (const li of P.cards) steps.push(dir === "B" && li === P.live ? P.liveHead : li);
    R.fadeDur = FADE[dir][0];
    // Never earlier than this page's first frame, so nothing arrives already half faded.
    const base = Math.max(when(FILL[dir]), R.tStart);
    R.fades = steps.filter(Boolean).map((el, i) => ({ el, at: base + i * FADE[dir][1] }));
    R.end = Math.max(R.T, ...R.fades.map((f) => f.at + R.fadeDur));

    // Hold the real page: title block shown with its parts driven one by one, everything else hidden.
    imp(P.title, "opacity", "1"); imp(P.title, "visibility", "visible");
    imp(P.wordmark, "visibility", d.name ? "hidden" : "visible");
    imp(P.kind, "opacity", "0");
    for (const li of P.cards) {
      for (const el of li.querySelectorAll(".cs-card__head, .cs-card__media, .cs-card__media-empty")) { imp(el, "opacity", "1"); imp(el, "visibility", "visible"); }
      for (const img of li.querySelectorAll(".cs-card__media > img")) imp(img, "clip-path", "none");
    }
    for (const f of R.fades) { imp(f.el, "opacity", "0"); imp(f.el, "visibility", "visible"); }
    if (dir === "B") imp(P.liveMedia, "opacity", "0");
    document.documentElement.classList.add("ct-arriving", "ct-checked");
    return R;
  }

  function frame(R, t) {
    const { P, dir } = R;
    for (const el of [P.title, P.kind, P.wordmark, ...P.cards]) quiet(el);
    const p = R.handed ? 1 : paintTravel(R.X, t);
    imp(P.kind, "opacity", R.handed ? "1" : "0"); // the copy carries the label until the hand over

    // ---- Page only items
    for (const f of R.fades) imp(f.el, "opacity", power1Out((t - f.at) / R.fadeDur).toFixed(4));

    // ---- Hand over on the frame the travel settles: the copies become the real wordmark and card frame
    if (t >= R.T && !R.handed) {
      R.handed = true;
      P.wordmark.style.removeProperty("visibility"); imp(P.wordmark, "visibility", "visible");
      imp(P.kind, "opacity", "1");
      if (dir === "B") imp(P.liveMedia, "opacity", "1");
      removeTravel(R.X);
    }
    if (t >= R.end) finish(R);
  }

  function finish(R) {
    if (!R || R.done) return;
    if (!R.handed) frame(R, R.T);
    R.done = true;
    const P = R.P;
    for (const el of [P.title, P.wordmark, P.kind, P.liveMedia, ...R.fades.map((f) => f.el)].filter(Boolean)) { imp(el, "opacity", "1"); imp(el, "visibility", "visible"); }
    document.documentElement.classList.remove("ct-arriving");
    removeEventListener("pointerdown", R.stop, true); removeEventListener("keydown", R.stop, true); removeEventListener("wheel", R.stop, true);
    if (run === R) run = null;
  }

  function arrive(d, { fresh = true } = {}) {
    if (!coll || !d || d.v !== 2) return null;
    if (window.frameElement && window.frameElement.dataset && window.frameElement.dataset.ctMeasure) return null;
    if (fresh && !SEEK && (Date.now() - d.at > 5000)) return null;
    if (Math.abs(d.vw - innerWidth) > 2 || Math.abs(d.vh - innerHeight) > 2) return null;
    if (run) finish(run);
    scrollTo(0, 0);
    const R = prepare(d);
    if (!R) return null;
    run = R;
    frame(R, R.tStart);
    R.stop = () => finish(R);
    if (SEEK) return R;
    addEventListener("pointerdown", R.stop, true); addEventListener("keydown", R.stop, true); addEventListener("wheel", R.stop, { capture: true, passive: true });
    // No waiting: the move continues on this page's first frame. While the browser swapped pages the clock
    // ran on, so the move catches up with it smoothly (the gap closes over about 0.15 s) rather than jumping.
    const a0 = performance.now();
    const clock = d.t0 ? (now) => performance.timeOrigin + now - d.t0 : (now) => now - a0;
    const lag0 = Math.max(0, clock(a0) - R.tStart);
    (function tick(now) {
      if (R.done) return;
      frame(R, clock(now) - lag0 * Math.exp(-(now - a0) / 150));
      if (!R.done) requestAnimationFrame(tick);
    })(a0);
    return R;
  }

  const inMeasure = !!(window.frameElement && window.frameElement.dataset && window.frameElement.dataset.ctMeasure);
  if (coll && !inMeasure) {
    const d = reduce.matches ? null : handoff.take();
    const R = d ? arrive(d) : null;
    if (!R) document.documentElement.classList.add("ct-checked");
    else addEventListener("pagereveal", (e) => { if (e.viewTransition) e.viewTransition.skipTransition(); });
  }

  // =============================================================== Review and tuning
  window.CardTransition = {
    options: O,
    get run() { return run; },
    startExit: (x, y) => startExit(x != null ? { clientX: x, clientY: y } : null),
    seekExit: exitFrame,
    handoff: () => exiting && exiting.d,
    arrive: (d) => arrive(d || handoff.last(), { fresh: false }),
    seek: (t) => run && frame(run, t),
    get duration() { return run ? run.end : 0; },
    get travel() { return run ? run.T : 0; },
    get start() { return run ? run.tStart : 0; },
    get measured() { return !!(dest && dest.key === destKey()); },
    measure: () => measureDest(),
  };

  const set = (k) => (v) => { O[k] = v; if (k === "dir") store.set("card-transition:dir", v); };
  const replay = () => { const d = handoff.last(); if (!d) return; d.dir = O.dir; arrive(d, { fresh: false }); };
  const def = {
    id: "card-transition", title: "Card to collection", tab: "Motion",
    note: coll
      ? "Replay runs the picked direction again here. To feel the whole move, go back to Home and click the Mondai card."
      : "Pick a direction, then click the Mondai card. Each opens the collection page a different way.",
    controls: [
      { key: "dir", label: "Direction", type: "select", options: [["A", "A. Title (baseline): only the words travel; leaves an empty beat while the page loads"], ["B", "B. Card: the picture becomes the Framework CS card"], ["C", "C. Open: the picture fills the screen and becomes the page"]], value: O.dir, default: "B", onInput: set("dir") },
      { key: "exit", label: "Home fade to black", min: 80, max: 600, step: 10, unit: "ms", value: O.exit, default: 220, onInput: set("exit") },
      { key: "kA", label: "A spring stiffness", min: 20, max: 300, step: 5, value: O.kA, default: 90, enabledWhen: (v) => v.dir === "A", onInput: set("kA") },
      { key: "dA", label: "A spring damping", min: 5, max: 40, step: 0.5, value: O.dA, default: 19, enabledWhen: (v) => v.dir === "A", onInput: set("dA") },
      { key: "kB", label: "B spring stiffness", min: 20, max: 300, step: 5, value: O.kB, default: 90, enabledWhen: (v) => v.dir === "B", onInput: set("kB") },
      { key: "dB", label: "B spring damping", min: 5, max: 40, step: 0.5, value: O.dB, default: 19, enabledWhen: (v) => v.dir === "B", onInput: set("dB") },
      { key: "kC", label: "C spring stiffness", min: 20, max: 300, step: 5, value: O.kC, default: 80, enabledWhen: (v) => v.dir === "C", onInput: set("kC") },
      { key: "dC", label: "C spring damping", min: 5, max: 40, step: 0.5, value: O.dC, default: 18, enabledWhen: (v) => v.dir === "C", onInput: set("dC") },
    ],
    actions: coll ? [{ label: "Replay", onClick: replay }] : [],
  };
  if (card || coll) { if (window.EditPanel) window.EditPanel.register(def); else (window.EditPanelQueue ||= []).push(def); }
})();
