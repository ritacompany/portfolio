// Haven case study motion.
// Text blocks and media frames follow the Metalab rules recorded in prototypes/journey-map/README.md.
// The journey flow is the prototype's straight shuffle, moved onto the page scroll.
(function () {
  var G = window.gsap;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motion = document.documentElement.classList.contains("js-motion") && !!G;

  // If GSAP failed to load, never leave content hidden.
  if (!G) document.documentElement.classList.remove("js-motion");

  // ---- Smooth scroll: one Lenis lerp for every wheel and trackpad, slightly slower than default.
  // An earlier version handed trackpads to native scroll; switching mid gesture read as stopping. ----
  var lenis = null;
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
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
    G.to(items, { autoAlpha: 1, duration: TEXT_DUR, stagger: TEXT_STAGGER, ease: "power1.out", delay: (delay || 0) + parseFloat(block.dataset.delay || "0") });
  }

  // ---- Media frames: MaskReveal from the top with the content settling from 1.3, 0.8s Power3.easeInOut, once ----
  // Runs on the compositor through the Web Animations API, and waits for its images to decode so
  // nothing pops in halfway through the reveal.
  function openMask(el, inner) { el.style.clipPath = "none"; inner.style.transform = "none"; el.style.willChange = inner.style.willChange = "auto"; el.dataset.revealDone = "true"; el.dispatchEvent(new Event("revealdone")); }
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
    var P = 160, DT = 1700, R = 1376, RATE = 0.85, HOLD = 450, AT = 0.8, VERTICAL_BELOW = 560;
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
      stage.style.setProperty("--flow-scale", String(vertical ? 0.75 : box.clientWidth / 777));
      map.style.setProperty("--flow-scale", "0.75");
    }
    fit();
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(map); else addEventListener("resize", fit);
    if (!motion || !stage.animate) return;

    var doneTimer = null;
    function reset() { clearTimeout(timer); clearTimeout(doneTimer); played = false; map.dataset.bumpDone = "false"; anims.forEach(function (a) { a.pause(); a.currentTime = 0; }); }
    function play() { clearTimeout(timer); timer = setTimeout(function () { played = true; anims.forEach(function (a) { a.currentTime = 0; a.playbackRate = RATE; a.play(); }); doneTimer = setTimeout(function () { map.dataset.bumpDone = "true"; }, DT / RATE + 350); }, HOLD); }

    // Plays once the row has revealed and the map top is 80% up the screen. Replays after the map leaves below.
    G.ticker.add(function () {
      var r = map.getBoundingClientRect(), h = innerHeight;
      if (!started && row.dataset.revealed === "true" && r.top < h * AT && r.bottom > 0) { started = true; play(); }
      else if (started && r.top > h) { started = false; reset(); }
    });
  })();

  // ---- Feedback block: the line draws down the full height, then the statement fades in.
  // The block stays pinned while the next sections slide over it, so the turn to the solutions lands.
  (function bridge() {
    var el = document.getElementById("bridge"); if (!el) return;
    var line = el.querySelector(".bridge__line"), copy = el.querySelector(".bridge__copy");
    if (!motion) return;
    copy.dataset.delay = "0.55";
    line.style.transform = "scaleY(0)";
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting && e.boundingClientRect.top > 0) return;
        io.disconnect();
        line.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 1400, easing: MASK_EASE, fill: "forwards" })
          .finished.then(function () { line.style.transform = "none"; });
      });
    }, { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
  })();

  // ---- Quiz: a frameless composition, so no curtain. Each pillar draws its outline, its label tag wipes in
  // as a white bar and the label decodes from scrambled characters, then the icon settles on top. ----
  var SCRAMBLE = "_!X$0-+*#";
  function rnd(not) { var c; do { c = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]; } while (c === not); return c; }
  function scramble(el, done) {
    var text = el.dataset.text, n = text.length, step = 0, phase = 1;
    var ms = Math.max(28, Math.min(45, 1500 / (n * 4))); // about 1.5 s per label
    var label = el.parentNode; label.style.width = label.offsetWidth + "px";
    el.style.opacity = 1;
    var t = setInterval(function () {
      var out = [], i;
      if (phase === 1) {
        var shown = Math.min(step + 1, n);
        for (i = 0; i < shown; i++) out.push(text[i] === " " ? " " : rnd(out[i - 1]));
        for (i = shown; i < n; i++) out.push(" ");
        if (++step >= n * 2) { phase = 2; step = 0; }
      } else {
        var fixed = Math.floor(step / 2);
        for (i = 0; i < fixed && i < n; i++) out.push(text[i]);
        if (fixed < n) out.push(text[fixed] === " " ? " " : (step % 2 === 0 ? "_" : rnd()));
        for (i = out.length; i < n; i++) out.push(text[i] === " " ? " " : rnd());
        if (++step >= n * 2) { clearInterval(t); el.textContent = text; label.style.width = ""; if (done) done(); return; }
      }
      el.textContent = out.join("");
    }, ms);
  }
  (function quiz() {
    var stage = document.getElementById("quiz-stage"); if (!stage) return;
    var phone = stage.querySelector(".quiz__phone");
    var cols = [].slice.call(stage.querySelectorAll(".qcol"));
    if (!motion) return;
    var colIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        colIO.unobserve(e.target);
        var c = e.target.closest(".qcol"), path = c.querySelector("path"), bar = c.querySelector(".qcol__bar"), text = c.querySelector(".qcol__text"), icon = c.querySelector(".qcol__icon");
        path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1600, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" });
        bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, delay: 300, easing: "cubic-bezier(0.87, 0, 0.13, 1)", fill: "forwards" });
        setTimeout(function () { scramble(text); }, 850);
        icon.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 1000, delay: 1300, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" });
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    // Each column triggers from its label, so the tallest pillar reads first as the section scrolls in
    cols.forEach(function (c) { colIO.observe(c.querySelector(".qcol__label")); });

    // Phone: once in view it holds its place on screen, centered, until its bottom is 100px above the
    // section's bottom rule, then it travels on with the page.
    var shown = false, section = stage.closest("section"), STOP = 100;
    G.ticker.add(function () {
      var r = stage.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -600 || r.top > vh + 400) return;
      if (!shown && r.top < vh * 0.85) { shown = true; phone.style.opacity = "1"; phone.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900 }); }
      var y0 = phone.offsetTop, h = phone.offsetHeight;
      var pin = Math.max(72, (vh - h) / 2);
      var natural = r.top + y0;
      var maxO = section.getBoundingClientRect().bottom - STOP - (r.top + y0 + h);
      var raw = pin - natural, K = 90, o;
      // Soft release: the pin hands over to the page over 180px instead of snapping from still to moving
      if (raw <= maxO - K) o = raw; else if (raw >= maxO + K) o = maxO; else o = raw - Math.pow(raw - (maxO - K), 2) / (4 * K);
      o = Math.max(0, o);
      // Exit: once released, the phone rises faster than the page and clears the screen quickly,
      // so the next section arrives on its own
      var past = Math.max(0, raw - maxO);
      phone.style.transform = "translate3d(0," + (o - past * 0.9).toFixed(1) + "px,0)";
    });
  })();

  // ---- Confidante profile: the page scroll drives the phone. The reader first sees the profile at rest;
  // as they keep scrolling past it, the shared experiences scroll up inside the phone, with a little inertia. ----
  (function profileScrub() {
    var frame = document.getElementById("profile-frame"); if (!frame || !motion) return;
    var img = frame.querySelector(".phone__content"), MAX = 620, H = 1870, cur = 0;
    G.ticker.add(function () {
      var r = frame.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -200 || r.top > vh) return;
      // starts once the whole phone has been in view; runs over most of a screen of scrolling
      var p = Math.min(1, Math.max(0, (vh * 0.42 - r.top) / (vh * 0.85)));
      var target = MAX * p * p * (3 - 2 * p);
      cur += (target - cur) * 0.14;
      img.style.transform = "translateY(" + (-cur / H * 100).toFixed(3) + "%)";
    });
  })();

  // ---- Footer clock, Chicago time ----
  (function clock() {
    var el = document.getElementById("chicago-time"); if (!el) return;
    function tick() {
      var t = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).formatToParts(new Date());
      var g = function (k) { return (t.find(function (x) { return x.type === k; }) || {}).value || ""; };
      el.textContent = g("hour") + ":" + g("minute") + g("dayPeriod").toLowerCase() + " " + g("timeZoneName");
    }
    tick(); setInterval(tick, 30000);
  })();

  // ---- Nav reads over the light feedback block by switching to dark ----
  (function navOnLight() {
    var nav = document.querySelector(".site-nav"), bridge = document.getElementById("bridge"), after = document.querySelector(".after-bridge");
    if (!nav || !bridge) return;
    function check() {
      var n = nav.getBoundingClientRect().bottom - 12, b = bridge.getBoundingClientRect(), a = after.getBoundingClientRect();
      nav.classList.toggle("is-on-light", b.top <= n && b.bottom > n && a.top > n);
    }
    if (G) G.ticker.add(check); else addEventListener("scroll", check, { passive: true });
    check();
  })();

  window.__haven = { lenis: lenis, revealAll: function () { blocks.forEach(function (b) { revealText(b, true); }); masks.forEach(function (m) { revealMask(m, true); }); document.querySelectorAll(".bridge__line").forEach(function (l) { l.style.transform = "none"; }); } };
})();
