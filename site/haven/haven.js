// Haven case study motion.
// Text blocks and media frames follow the Metalab rules recorded in prototypes/journey-map/README.md.
// The journey flow is the prototype's straight shuffle, moved onto the page scroll.
(function () {
  var G = window.gsap;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motion = document.documentElement.classList.contains("js-motion") && !!G;

  // If GSAP failed to load, never leave content hidden.
  if (!G) document.documentElement.classList.remove("js-motion");

  // ---- Smooth scroll: Lenis duration 1.2, driven by the GSAP ticker ----
  var lenis = null;
  if (motion && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.2 });
    G.ticker.add(function (t) { lenis.raf(t * 1000); });
    G.ticker.lagSmoothing(0);
  }

  // ---- Text blocks: fade when the block top is 100px inside the screen, 1s, 0.1s stagger, once ----
  function revealText(block, instant) {
    var items = block.querySelectorAll(".tb-item");
    block.dataset.revealed = "true";
    if (!motion || instant) { if (G) G.set(items, { autoAlpha: 1 }); return; }
    G.to(items, { autoAlpha: 1, duration: 1, stagger: 0.1 });
  }

  // ---- Media frames: MaskReveal from the top with the content settling from 1.3, 0.8s Power3.easeInOut, once ----
  function revealMask(el, instant) {
    var inner = el.querySelector(".mask__scale");
    var delay = parseFloat(el.dataset.delay || "0");
    el.dataset.revealed = "true";
    if (!motion || instant) { if (G) { G.set(el, { "--left-y": "100%", "--right-y": "100%" }); G.set(inner, { scale: 1 }); } return; }
    G.to(el, { "--left-y": "100%", "--right-y": "100%", duration: 0.8, ease: "power3.inOut", delay: delay });
    G.to(inner, { scale: 1, duration: 0.8, ease: "power3.inOut", delay: delay });
  }

  var blocks = [].slice.call(document.querySelectorAll("[data-tb]"));
  var masks = [].slice.call(document.querySelectorAll("[data-mask]"));

  if (motion && "IntersectionObserver" in window) {
    var textIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealText(e.target); textIO.unobserve(e.target); }
        else if (e.boundingClientRect.bottom < 0) { revealText(e.target, true); textIO.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -100px 0px" });
    blocks.forEach(function (b) { textIO.observe(b); });

    var maskIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { revealMask(e.target); maskIO.unobserve(e.target); }
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
    var sel = by.select, label = sel.querySelector("span"), box = stage.parentNode;
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
    function endState() {
      sel.style.transform = X(4); sel.style.backgroundColor = "var(--flow-key)"; sel.style.borderColor = "var(--flow-key)";
      label.style.color = "var(--n900)"; by.intro.style.transform = X(2); by.schedule.style.transform = X(3);
    }
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
      A(sel, [{ offset: 0, backgroundColor: "#040405", borderColor: "#aeaeb4" }, { offset: at(R), backgroundColor: "#040405", borderColor: "#aeaeb4" }, { offset: at(R + 130), backgroundColor: "#78b765", borderColor: "#78b765" }, { offset: 1, backgroundColor: "#78b765", borderColor: "#78b765" }]);
      A(label, [{ offset: 0, color: "#f2f1f8" }, { offset: at(R), color: "#f2f1f8" }, { offset: at(R + 130), color: "#040405" }, { offset: 1, color: "#040405" }]);
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

  // ---- Insight pills: each names a research or testing insight; hover or focus shows it ----
  var INSIGHTS = {
    i1: "Interview insight 1. When choosing between experts they value elements that humanize them. Users want to know that experts will understand them.",
    i2: "Interview insight 2. Users were uncomfortable discussing sensitive identity topics aloud, especially when someone nearby could overhear.",
    i3: "Interview insight 3. A one size fits all identity model could flatten the demographic differences that shape each user’s unique experience.",
    i4: "Interview insight 4. Users need to choose a time when they could be alone. A time that they will feel safe to engage with an expert.",
    i5: "Interview insight 5. Users are concerned with using an LGBTQIA+ product in case disapproving guardians or peers may find out.",
    t1: "Testing insight 1. Users were unsure of what mode of communication they would be chatting with the expert through.",
    t2: "Testing insight 2. Users had trouble understanding the duration section of the scheduling page.",
    t3: "Testing insight 3. Users were concerned that the design lacked enough security features.",
    t4: "Testing insight 4. Users wanted to know more about the Confidante in order to determine the right choice.",
    r1: "Confidante role 1. A community liaison that connects the user to different people and communities."
  };
  var tip = document.getElementById("insight-tip"), openPill = null;
  function place(pill) {
    var r = pill.getBoundingClientRect();
    var left = Math.min(Math.max(16, r.left + scrollX), scrollX + document.documentElement.clientWidth - tip.offsetWidth - 16);
    var top = r.top + scrollY - tip.offsetHeight - 8;
    if (r.top - tip.offsetHeight - 8 < 8) top = r.bottom + scrollY + 8;
    tip.style.left = left + "px"; tip.style.top = top + "px";
  }
  function show(pill) {
    var text = INSIGHTS[pill.dataset.insight]; if (!text) return;
    if (openPill && openPill !== pill) hide();
    tip.textContent = text; tip.hidden = false; openPill = pill;
    pill.setAttribute("aria-describedby", "insight-tip"); pill.setAttribute("aria-expanded", "true");
    place(pill);
  }
  function hide() {
    if (!openPill) return;
    openPill.removeAttribute("aria-describedby"); openPill.setAttribute("aria-expanded", "false");
    tip.hidden = true; openPill = null;
  }
  document.querySelectorAll(".pill[data-insight]").forEach(function (p) {
    p.setAttribute("aria-expanded", "false");
    p.addEventListener("mouseenter", function () { show(p); });
    p.addEventListener("mouseleave", function () { if (document.activeElement !== p) hide(); });
    p.addEventListener("focus", function () { show(p); });
    p.addEventListener("blur", hide);
    p.addEventListener("click", function () { if (openPill === p && p.matches(":hover") === false) hide(); else show(p); });
  });
  addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  addEventListener("scroll", function () { if (openPill) place(openPill); }, { passive: true });

  window.__haven = { lenis: lenis, revealAll: function () { blocks.forEach(function (b) { revealText(b, true); }); masks.forEach(function (m) { revealMask(m, true); }); } };
})();
