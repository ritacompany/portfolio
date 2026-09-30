// Haven case study motion.
// Text blocks and media frames follow the Metalab rules recorded in prototypes/journey-map/README.md.
// The journey flow is the prototype's straight shuffle, moved onto the page scroll.
(function () {
  var G = window.gsap;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motion = document.documentElement.classList.contains("js-motion") && !!G;

  // If GSAP failed to load, never leave content hidden.
  if (!G) document.documentElement.classList.remove("js-motion");

  // ---- Smooth scroll. Mouse wheels get Lenis smoothing; trackpads already carry their own momentum,
  // so their events go straight to native scroll instead of being smoothed twice, which read as jumpy. ----
  var lenis = null, lastTrackpad = 0;
  function isTrackpad(e) {
    if (!e || e.type !== "wheel") return false;
    var now = performance.now();
    // A gesture that looked like a trackpad stays native for its whole momentum tail
    if (now - lastTrackpad < 250) { lastTrackpad = now; return true; }
    var d = Math.abs(e.deltaY);
    if (e.deltaMode === 0 && (e.deltaX !== 0 || d < 40 || d % 1 !== 0)) { lastTrackpad = now; return true; }
    return false;
  }
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, virtualScroll: function (data) { return !isTrackpad(data.event); } });
    G.ticker.add(function (t) { lenis.raf(t * 1000); });
    G.ticker.lagSmoothing(0);
  }

  // Timing. Metalab's source values (text 1s, mask 0.8s) read as too fast here, so both are slowed.
  var TEXT_DUR = 1.4, TEXT_STAGGER = 0.15, MASK_DUR = 1200, PAIR_DELAY = 300, ARRIVAL_DELAY = 350;
  var MASK_EASE = "cubic-bezier(0.76, 0, 0.24, 1)"; // Power3.easeInOut

  // ---- Text blocks: fade when the block top is 100px inside the screen, 1s, 0.1s stagger, once ----
  function revealText(block, instant, delay) {
    var items = block.querySelectorAll(".tb-item");
    block.dataset.revealed = "true";
    if (!motion || instant) { if (G) G.set(items, { autoAlpha: 1 }); return; }
    G.to(items, { autoAlpha: 1, duration: TEXT_DUR, stagger: TEXT_STAGGER, ease: "power1.out", delay: delay || 0 });
  }

  // ---- Media frames: MaskReveal from the top with the content settling from 1.3, 0.8s Power3.easeInOut, once ----
  // Runs on the compositor through the Web Animations API, and waits for its images to decode so
  // nothing pops in halfway through the reveal.
  function openMask(el, inner) { el.style.clipPath = "none"; inner.style.transform = "none"; el.style.willChange = inner.style.willChange = "auto"; }
  function revealMask(el, instant, extraDelay) {
    var inner = el.querySelector(".mask__scale");
    el.dataset.revealed = "true";
    if (!motion || instant || !el.animate) { openMask(el, inner); return; }
    var delay = (el.dataset.delay ? PAIR_DELAY : 0) + (extraDelay || 0);
    var imgs = [].slice.call(el.querySelectorAll("img"));
    imgs.forEach(function (i) { i.loading = "eager"; });
    Promise.all(imgs.map(function (i) { return i.decode ? i.decode().catch(function () {}) : null; })).then(function () {
      var opts = { duration: MASK_DUR, easing: MASK_EASE, delay: delay, fill: "both" };
      var a = el.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }], opts);
      inner.animate([{ transform: "scale(1.3)" }, { transform: "scale(1)" }], opts);
      a.finished.then(function () { openMask(el, inner); el.getAnimations().concat(inner.getAnimations()).forEach(function (x) { x.cancel(); }); });
    });
  }

  var blocks = [].slice.call(document.querySelectorAll("[data-tb]"));
  var masks = [].slice.call(document.querySelectorAll("[data-mask]"));

  if (motion && "IntersectionObserver" in window) {
    // Blocks already on screen at load wait a beat for the first paint, so the arrival is not rushed
    var arrived = performance.now() + 150;
    function arrivalDelay() { return performance.now() < arrived ? ARRIVAL_DELAY : 0; }
    var textIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealText(e.target, false, arrivalDelay() / 1000); textIO.unobserve(e.target); }
        else if (e.boundingClientRect.bottom < 0) { revealText(e.target, true); textIO.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -100px 0px" });
    blocks.forEach(function (b) { textIO.observe(b); });

    var maskIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealMask(e.target, false, arrivalDelay()); maskIO.unobserve(e.target); }
        else if (e.boundingClientRect.bottom < 0) { revealMask(e.target, true); maskIO.unobserve(e.target); }
      });
    }, { rootMargin: "0px" });
    masks.forEach(function (m) { maskIO.observe(m); });
  } else {
    blocks.forEach(function (b) { revealText(b, true); });
    masks.forEach(function (m) { revealMask(m, true); });
  }

  // ---- Journey flow: Select a Confidante moves from slot 3 to 5, the chat steps slide along, green on landing ----
  // Timing is the prototype's 1700ms timeline at playbackRate 0.85. Below 560 the row turns vertical.
  (function flow() {
    var stage = document.getElementById("flow-stage");
    var map = document.getElementById("flow-map");
    var row = document.getElementById("journey-row");
    if (!stage || !map) return;
    var P = 165, DT = 1700, R = 1376, RATE = 0.85, HOLD = 450, AT = 0.8, VERTICAL_BELOW = 560;
    var IO = "cubic-bezier(.65,0,.35,1)", OUT = "cubic-bezier(.22,1,.36,1)";
    var by = {}, nums = [];
    stage.querySelectorAll(".flow__step").forEach(function (el) { by[el.dataset.id] = el; });
    for (var q = 0; q < 5; q++) {
      var n = document.createElement("li");
      n.className = "flow__num"; n.setAttribute("aria-hidden", "true"); n.textContent = String(q + 1);
      stage.appendChild(n); nums.push(n);
    }
    var sel = by.select, box = stage.parentNode;
    var start = { quiz: 0, review: 1, select: 2, intro: 3, schedule: 4 };
    var vertical = null, anims = [], started = false, timer = null, played = false;

    function X(slot, s) {
      var d = slot * P;
      return (vertical ? "translate(0," + d + "px)" : "translate(" + d + "px,0)") + " scale(" + (s == null ? 1 : s) + ")";
    }
    function at(ms) { return Math.min(1, ms / DT); }
    function A(el, frames) { var a = el.animate(frames, { duration: DT, fill: "both" }); a.pause(); anims.push(a); return a; }
    function slide(el, from, t, dur) {
      A(el, [{ offset: 0, transform: X(from) }, { offset: at(t), transform: X(from), easing: IO }, { offset: at(t + dur), transform: X(from - 1) }, { offset: 1, transform: X(from - 1) }]);
    }
    function endState() { sel.style.transform = X(4); by.intro.style.transform = X(2); by.schedule.style.transform = X(3); }
    function build() {
      anims.forEach(function (a) { a.cancel(); }); anims = [];
      map.classList.toggle("is-vertical", vertical);
      nums.forEach(function (n, i) {
        if (vertical) { n.style.left = "0px"; n.style.top = (i * P + 137 / 2 - 11) + "px"; }
        else { n.style.left = (i * P) + "px"; n.style.top = ""; }
      });
      Object.keys(start).forEach(function (k) { by[k].style.transform = X(start[k]); });
      if (!motion || !stage.animate) { endState(); return; }
      A(sel, [{ offset: 0, transform: X(2), easing: OUT }, { offset: at(224), transform: X(2, 1.06), easing: IO }, { offset: at(1184), transform: X(4, 1.06), easing: OUT }, { offset: at(R), transform: X(4) },
        { offset: at(R + 20), transform: X(4), easing: OUT }, { offset: at(R + 130), transform: X(4, 1.06), easing: OUT }, { offset: at(R + 280), transform: X(4) }, { offset: 1, transform: X(4) }]);
      slide(by.intro, 3, 300, 560);
      slide(by.schedule, 4, 360, 560);
      // A flow that already played stays at its end while the layout changes
      if (played) anims.forEach(function (a) { a.currentTime = DT; });
    }
    function fit() {
      var w = map.clientWidth, v = w < VERTICAL_BELOW;
      if (v !== vertical) { vertical = v; build(); }
      stage.style.setProperty("--flow-scale", String(vertical ? 0.75 : box.clientWidth / 797));
      map.style.setProperty("--flow-scale", "0.75");
    }
    fit();
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(map); else addEventListener("resize", fit);
    if (!motion || !stage.animate) return;

    function reset() { clearTimeout(timer); played = false; anims.forEach(function (a) { a.pause(); a.currentTime = 0; }); }
    function play() { clearTimeout(timer); timer = setTimeout(function () { played = true; anims.forEach(function (a) { a.currentTime = 0; a.playbackRate = RATE; a.play(); }); }, HOLD); }

    // Plays once the row has revealed and the map top is 80% up the screen. Replays after the map leaves below.
    G.ticker.add(function () {
      var r = map.getBoundingClientRect(), h = innerHeight;
      if (!started && row.dataset.revealed === "true" && r.top < h * AT && r.bottom > 0) { started = true; play(); }
      else if (started && r.top > h) { started = false; reset(); }
    });
  })();

  // ---- Quiz: the phone rises over the pillars as the section scrolls, so it covers the icons ----
  (function quizParallax() {
    var media = document.querySelector(".quiz__media"), phone = document.querySelector(".quiz__phone");
    if (!media || !phone || !motion) return;
    var RISE = 0.28; // share of the media height, about 307 pixels at 1440
    G.ticker.add(function () {
      var r = media.getBoundingClientRect(), h = innerHeight;
      if (r.bottom < -200 || r.top > h + 200) return;
      var p = Math.min(1, Math.max(0, (h * 0.9 - r.top) / (r.height + h * 0.2)));
      phone.style.transform = "translate3d(0," + (-RISE * r.height * p).toFixed(1) + "px,0)";
    });
  })();

  window.__haven = { lenis: lenis, revealAll: function () { blocks.forEach(function (b) { revealText(b, true); }); masks.forEach(function (m) { revealMask(m, true); }); } };
})();
