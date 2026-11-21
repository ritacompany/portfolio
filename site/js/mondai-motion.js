// Mondai pages motion: Haven's page motion on the Mondai collection (/mondai/) and the framework case
// study (/mondai/framework/). Pairs with css/mondai-motion.css; style guide and state list in
// docs/motion/mondai-motion/. Lenis is loaded by the page (/vendor/lenis-1.1.20.min.js) before this file.
//   Scroll   Lenis at Haven's setting: lerp 0.1, wheel multiplier 1.
//   Text     each item fades in over 1.4 s, power1 out, once it is 100 px inside the screen, once. Items in
//            one section that arrive together step 0.15 s apart in reading order, at most five steps;
//            items on one line share a step.
//   Media    each product screen opens from its top while the picture settles, 1.2 s Power3 in out, once
//            any pixel shows. The two laptop photos settle from Haven's 1.3; flat browser screens settle
//            from 1.08, so their glitch frame shows from the start instead of flooding in last (his pick,
//            12 Nov; reports/media-settle). Images decode first so nothing pops in mid reveal.
//   Arrival  anything on screen at load waits 0.35 s. Anything already scrolled past shows at once.
//   Reduced  no Lenis, nothing hidden, nothing moves.
// The page markup is left alone: the framework places every item at its Figma position, so there are
// no Haven style block or figure wrappers. Items are found here, and the curtain and settle run on the
// image itself (see clipFor below).
(() => {
  const framework = document.querySelector(".canvas.framework");
  const collection = document.querySelector(".collection");
  if (!framework && !collection) return;
  const root = document.documentElement;
  root.classList.add("mm-ready"); // the script took over; the CSS failsafe stands down
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !Element.prototype.animate) {
    root.classList.add("mm-off");
    return;
  }

  // Haven's values (site/haven/haven.js)
  const T = { textDur: 1.4, stagger: 0.15, trigger: 100, maskDur: 1.2, from: 1.3, fromFlat: 1.08, arrival: 0.35 };
  const PHOTO = ["5812:16775", "5812:17138"]; // Pathway and Calendar setup: laptops photographed on black
  const LINE = 12;          // px: items whose tops sit this close share a step (one line)
  const MAX_STEP = 4;       // Haven's longest block steps five items
  const SMALL = []; // media too small for a curtain fade like text instead (none since the Rollover effect became text, 11 Nov)
  // Scroll linked instead of the entrance (his audit, 11 Nov). The laptop: a curtain and settle inside a
  // laptop frame read wrong, so the whole laptop slides up as it arrives, then moves up faster than the
  // page once the reader is halfway down its screen, so nobody stares at the keyboard.
  // No entrance at all (his note, 12 Nov: the slide in from the left felt wrong): the Rollover panel and
  // its row image are simply there; its label and text fade like every other text item.
  const LAPTOP = "5812:16973";
  // The Capacity card (5812:17089) stays still too: a cursor demo plays on top of it (his 11 Nov ask,
  // site/js/capacity-demo.js, owned by the capacity session).
  const STILL = ["5812:20311", "5812:20316", "5812:17089"];
  const scrolled = new Set([LAPTOP, ...STILL]);
  const TEXT_EASE = "cubic-bezier(0.5, 1, 0.89, 1)"; // power1 out, as Haven's GSAP fade

  // ---- Items
  const q = (s, r = document) => [...r.querySelectorAll(s)];
  let texts = [], masks = [], weeks = [];
  if (framework) {
    const sec = q(".fw-sec > *", framework);
    const own = sec.filter((e) => !scrolled.has(e.dataset.figmaNode));
    texts = own.filter((e) => !e.classList.contains("week") && (!e.classList.contains("fig") || SMALL.includes(e.dataset.figmaNode)));
    masks = own.filter((e) => e.classList.contains("fig") && !SMALL.includes(e.dataset.figmaNode));
    weeks = q(".week", framework);
    texts.push(...q(".ending-bar"));
  } else {
    texts = q(".collection__brand, .collection__intro, .collection__label, .collection__rows > li", collection);
  }
  const weekTexts = (w) => q(".week__slide > .t", w);
  const weekImgs = (w) => q(".week__slide img", w);

  // ---- Power3 in out as Haven's cubic-bezier(0.76, 0, 0.24, 1)
  const bezier = (x1, y1, x2, y2) => {
    const c = (a, b, t) => ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
    const d = (a, b, t) => 3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a;
    return (x) => {
      let t = x;
      for (let i = 0; i < 8; i++) { const e = c(x1, x2, t) - x, s = d(x1, x2, t); if (Math.abs(e) < 1e-6 || !s) break; t -= e / s; }
      return c(y1, y2, Math.min(1, Math.max(0, t)));
    };
  };
  const power3InOut = bezier(0.76, 0, 0.24, 1);

  // ---- Arrival: items on screen at load wait a beat for the first paint. The window opens at the first
  // observer report (it can come late while fonts load), so a slow first paint never skips the wait.
  let arrived = 0;
  const arrivalMs = () => {
    if (!arrived) arrived = performance.now() + 150;
    return performance.now() < arrived ? T.arrival * 1000 : 0;
  };

  // ---- Text
  const show = (el) => { el.style.visibility = "visible"; el.style.opacity = "1"; el.dataset.mmDone = "1"; };
  function fade(el, delay) {
    el.dataset.mmDone = "0";
    el.style.visibility = "visible";
    const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: T.textDur * 1000, delay, easing: TEXT_EASE, fill: "both" });
    a.finished.then(() => { show(el); a.cancel(); }, () => {});
  }
  // Items crossing the trigger in the same frame fade as one block: reading order, one step per line
  let pending = [], queued = false;
  function queueText(els) {
    pending.push(...els);
    if (!queued) { queued = true; requestAnimationFrame(flush); }
  }
  function flush() {
    queued = false;
    const base = arrivalMs();
    const items = pending.splice(0).map((el) => [el, el.getBoundingClientRect()]).sort((a, b) => a[1].top - b[1].top || a[1].left - b[1].left);
    // Steps count within each section, as each Haven block staggers on its own, and stop at Haven's
    // longest block (five cards, 0.6 s), so a tall stack on the phone never keeps a line waiting.
    const lines = new Map();
    for (const [el, r] of items) {
      const sec = el.closest("section, .ending-bar") || document.body;
      const l = lines.get(sec) || { step: -1, top: -Infinity };
      if (r.top - l.top > LINE) { l.step++; l.top = r.top; }
      lines.set(sec, l);
      fade(el, Math.round(base + Math.min(l.step, MAX_STEP) * T.stagger * 1000));
    }
  }

  // ---- Media. Haven clips a figure and scales the layer inside it. Here the image is the frame, so the
  // clip is worked out in the image's own (scaled) space: the visible window stays the image's box while
  // the picture inside settles from 1.3, and its bottom edge travels down the box as the curtain.
  function clipFor(s, p) {
    const side = 50 * (1 - 1 / s);
    const bottom = 100 - (50 + (100 * p - 50) / s);
    return `inset(${side.toFixed(3)}% ${side.toFixed(3)}% ${Math.max(0, bottom).toFixed(3)}% ${side.toFixed(3)}%)`;
  }
  function maskFrames(from) {
    const N = 48, f = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, e = power3InOut(t), s = from + (1 - from) * e;
      f.push({ offset: t, clipPath: clipFor(s, e), transform: `scale(${s.toFixed(4)})` });
    }
    return f;
  }
  // The Foundation diagram is type, frames and arrows, not a screen, so it never moves as one block. It
  // comes in Pathway by Pathway (his pick, 20 Nov; reports/foundation-motion-2026-11-20): 01 to 05 left
  // to right, 0.14 s apart, each rising and fading in, the dotted link to the next drawing from the left,
  // and each Pathway's Focus areas then Action items following under it 0.2 s and 0.4 s after it lands.
  // It starts only once the whole diagram has cleared a line 20 percent up from the bottom of the window,
  // so it plays where the reader is looking (the earlier wipe and row fade started on the first pixel and
  // finished below the screen). One image, so the pieces are copies of it, each clipped to its part, on a
  // layer over the image that is removed when the motion ends. Bands and column edges are measured from
  // the 1791 by 754 export.
  const COLS = "5812:16512";
  const FD = { W: 1791, H: 754, step: 140, down: 200, dur: 600, rise: 12, link: [260, 320], ease: "cubic-bezier(0.22, 1, 0.36, 1)" };
  const FD_ROW = { P: [0, 300], F: [310, 542], X: [542, 754] }; // Pathway label and box, arrow and Focus areas, arrow and Action items
  const fdCol = (i) => [Math.max(0, i * 378 - 4), Math.min(FD.W, i * 378 + 282)];
  const fdPct = (v, of) => (v / of * 100).toFixed(3) + "%";
  const fdInset = (y0, y1, x0 = 0, x1 = FD.W) => `inset(${fdPct(y0, FD.H)} ${fdPct(FD.W - x1, FD.W)} ${fdPct(FD.H - y1, FD.H)} ${fdPct(x0, FD.W)})`;
  const clearCols = (img) => { if (img._mmLayer) { img._mmLayer.remove(); img._mmLayer = null; } };
  function openCols(img, delay) {
    clearCols(img);
    const host = img.offsetParent || img.parentElement;
    const layer = document.createElement("div");
    layer.className = "mm-fd"; layer.setAttribute("aria-hidden", "true");
    // important: the phone and tablet layouts set every section child static and full width
    // fractional layout px (offset values round, and a 0.4 px squash shows as a jump at the hand back);
    // the 1200 to 1439 layout scales the canvas, so screen distances are divided by that scale
    const ir = img.getBoundingClientRect(), hr = host.getBoundingClientRect(), k = hr.width / host.offsetWidth || 1, ics = getComputedStyle(img);
    const box = { position: "absolute", margin: "0", left: `${(ir.left - hr.left) / k - host.clientLeft}px`, top: `${(ir.top - hr.top) / k - host.clientTop}px`, width: ics.width, height: ics.height, "max-width": "none", "pointer-events": "none", visibility: "visible", opacity: "1", "clip-path": "none", transform: "none" };
    Object.entries(box).forEach(([k, v]) => layer.style.setProperty(k, v, "important"));
    host.appendChild(layer); img._mmLayer = layer;
    const src = img.currentSrc || img.src, rise = Math.max(6, FD.rise * img.offsetWidth / 896), anims = [];
    // each piece is the same image drawn the same way, so the hand back to the real image is seamless
    const piece = (clip) => { const d = new Image(); d.src = src; d.alt = ""; d.style.cssText = `position:absolute;left:0;top:0;width:100%;height:100%;max-width:none;margin:0;clip-path:${clip}`; layer.appendChild(d); return d; };
    const up = [{ opacity: 0, transform: `translateY(${rise.toFixed(1)}px)` }, { opacity: 1, transform: "none" }];
    const go = (el, kf, at, dur, easing = FD.ease) => anims.push(el.animate(kf, { duration: dur, delay: delay + at, easing, fill: "both" }));
    for (let i = 0; i < 5; i++) {
      const [x0, x1] = fdCol(i), t = i * FD.step;
      go(piece(fdInset(...FD_ROW.P, x0, x1)), up, t, FD.dur);
      go(piece(fdInset(...FD_ROW.F, x0, x1)), up, t + FD.down, FD.dur);
      go(piece(fdInset(...FD_ROW.X, x0, x1)), up, t + 2 * FD.down, FD.dur);
      if (i < 4) {
        const c1 = fdCol(i + 1)[0];
        go(piece(fdInset(150, 215, x1, x1)), [{ clipPath: fdInset(150, 215, x1, x1) }, { clipPath: fdInset(150, 215, x1, c1) }], t + FD.link[0], FD.link[1], "ease-out");
      }
    }
    Promise.all(anims.map((a) => a.finished)).then(() => { opened(img); clearCols(img); }, () => {});
  }
  const opened = (img) => { img.style.clipPath = "none"; img.style.transform = ""; img.style.willChange = ""; img.dataset.mmDone = "1"; };
  function openMask(imgs, delay) {
    imgs.forEach((i) => { i.loading = "eager"; i.dataset.mmDone = "0"; });
    Promise.all(imgs.map((i) => (i.decode ? i.decode().catch(() => {}) : null))).then(() => {
      const photo = maskFrames(T.from), flat = maskFrames(T.fromFlat);
      imgs.forEach((img) => {
        const id = img.dataset.figmaNode;
        if (id === COLS) { openCols(img, delay); return; }
        img.style.willChange = "clip-path, transform";
        const f = PHOTO.includes(id) ? photo : flat;
        const a = img.animate(f, { duration: T.maskDur * 1000, delay, easing: "linear", fill: "both" });
        a.finished.then(() => { opened(img); a.cancel(); }, () => {});
      });
    });
  }

  // ---- Observers, as Haven: text 100 px inside the screen, media on any pixel, skipped past shows at once
  let textIO = null, maskIO = null, fdIO = null;
  const textDone = new Set(), maskDone = new Set(); // triggered once; a new observer skips them
  function observe() {
    textIO && textIO.disconnect();
    maskIO && maskIO.disconnect();
    fdIO && fdIO.disconnect();
    masks.forEach((el) => { el._mmWatch = false; });
    textIO = new IntersectionObserver((entries) => {
      const now = [];
      for (const e of entries) {
        const group = e.target.classList.contains("week") ? weekTexts(e.target) : [e.target];
        if (e.isIntersecting) { now.push(...group); textIO.unobserve(e.target); textDone.add(e.target); }
        else if (e.boundingClientRect.bottom < 0) { group.forEach(show); textIO.unobserve(e.target); textDone.add(e.target); }
      }
      if (now.length) queueText(now);
    }, { rootMargin: `0px 0px -${T.trigger}px 0px` });
    maskIO = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const imgs = e.target.classList.contains("week") ? weekImgs(e.target) : [e.target];
        if (e.isIntersecting) { openMask(imgs, arrivalMs()); maskIO.unobserve(e.target); maskDone.add(e.target); }
        else if (e.boundingClientRect.bottom < 0) { imgs.forEach(opened); maskIO.unobserve(e.target); maskDone.add(e.target); }
      }
    }, { rootMargin: "0px" });
    // The Foundation diagram: all of it above the 20 percent line, or already reaching past the top. Its
    // clip hides it, so an intersection ratio never rises; while any of it is on screen its box is read
    // every frame instead, and the frame loop stops once it starts.
    fdIO = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target;
        if (e.isIntersecting && !el._mmWatch) {
          el._mmWatch = true;
          const tick = () => {
            if (!el._mmWatch) return;
            const r = el.getBoundingClientRect();
            if (r.bottom <= innerHeight * 0.8 && r.bottom > 0) { el._mmWatch = false; fdIO.unobserve(el); maskDone.add(el); openMask([el], arrivalMs()); return; }
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        } else if (!e.isIntersecting) {
          el._mmWatch = false;
          if (e.boundingClientRect.bottom < 0) { opened(el); fdIO.unobserve(el); maskDone.add(el); }
        }
      }
    }, { rootMargin: "0px" });
    texts.concat(weeks).forEach((el) => textDone.has(el) || textIO.observe(el));
    masks.concat(weeks).forEach((el) => maskDone.has(el) || (el.dataset.figmaNode === COLS ? fdIO : maskIO).observe(el));
  }
  observe();

  // Screens load lazily; start loading and decoding them a screen and a half early, so a curtain never
  // waits on the network once its image shows.
  const preIO = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) {
      preIO.unobserve(e.target);
      const imgs = e.target.classList.contains("week") ? weekImgs(e.target) : [e.target];
      imgs.forEach((i) => { i.loading = "eager"; if (i.decode) i.decode().catch(() => {}); });
    }
  }, { rootMargin: "0px 0px 150% 0px" });
  masks.concat(weeks).forEach((el) => preIO.observe(el));

  // ---- Replay from the panel: everything back to hidden, then the page arrives again from where it is
  const allTexts = () => texts.concat(...weeks.map(weekTexts));
  const allImgs = () => masks.concat(...weeks.map(weekImgs));
  function replay() {
    allTexts().concat(allImgs()).forEach((el) => {
      el.getAnimations().forEach((a) => a.cancel());
      el.style.visibility = el.style.opacity = el.style.clipPath = el.style.transform = el.style.willChange = "";
      clearCols(el);
      delete el.dataset.mmDone;
    });
    textDone.clear(); maskDone.clear();
    arrived = 0;
    observe();
  }

  window.__mm = { lenis: null, T, replay, texts: allTexts, imgs: allImgs }; // read by the page checks

  // ---- Scroll linked moves: pure functions of where the element sits on screen, read every frame, on the
  // gentle sine in out curve the motion rules give scrubs (cubic-bezier(0.37, 0, 0.63, 1)).
  const gentle = bezier(0.37, 0, 0.63, 1);
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const node = (id) => framework && framework.querySelector(`[data-figma-node="${id}"]`);
  const laptop = node(LAPTOP);
  const still = STILL.map(node).filter(Boolean);
  const RISE = 140;       // px the laptop starts below its place
  const SPEED = 0.85;     // extra upward speed past the screen's middle, as a share of the scroll
  function scrub() {
    const vh = innerHeight;
    if (laptop && laptop.offsetParent) {
      laptop.style.transform = "none";
      const r = laptop.getBoundingClientRect();
      // Arrival: from its top at the bottom of the screen to its top at 45 percent up the screen
      const enter = gentle(clamp01((vh - r.top) / (vh * 0.55)));
      // Past the middle of the screen part (the top half of the image), it outruns the page
      const past = Math.max(0, -(r.top + r.height * 0.25));
      const y = RISE * (1 - enter) - Math.min(past * SPEED, r.height * 0.6);
      laptop.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
    requestAnimationFrame(scrub);
  }
  // The page CSS hides every item until its entrance; these move or stay still instead, so they show from the start
  [laptop, ...still].filter(Boolean).forEach((e) => { e.style.visibility = "visible"; e.style.opacity = "1"; e.style.clipPath = "none"; e.dataset.mmDone = "1"; });
  if (laptop) requestAnimationFrame(scrub);

  // ---- Smooth scroll: Haven's Lenis, fixed values
  let lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    window.__mm.lenis = lenis;
  }
})();
