// Confidante profile scroll: a scripted thumb on the straightened mockup.
// Drag tracks the finger, release coasts with iOS's exponential decay (0.5 s time constant),
// the flick back to the top coasts in with just enough speed to land at the top.
// Every loop starts and ends with a hold at the top so the screen reads before it moves.
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var TAU = 0.5, HZ = 120, W = 440, H = 1870, TOP_HOLD = 1.0;
  var script = [
    ["wait", TOP_HOLD],
    ["drag", 90, 0.16, 640], ["coast"], ["wait", 1.0],
    ["drag", 80, 0.15, 620], ["coast"], ["wait", 1.2],
    ["flickTop", 0.1, 380], ["wait", TOP_HOLD + 0.6]
  ];

  var pos = [], touch = [], y = 0, v = 0, fx = 330;
  function push(n, fn) { for (var i = 0; i < n; i++) fn(i); }
  script.forEach(function (st) {
    var n;
    if (st[0] === "wait") { n = Math.round(st[1] * HZ); push(n, function () { pos.push(y); touch.push(null); }); }
    else if (st[0] === "drag") {
      var dist = st[1], dur = st[2], y0 = y, fy0 = st[3]; n = Math.round(dur * HZ);
      push(Math.round(0.07 * HZ), function () { pos.push(y); touch.push([fx, fy0, 1]); });
      push(n, function (i) { var k = (i + 1) / n, e = k * k * (3 - 2 * k) * 0.35 + k * 0.65; y = y0 + dist * e; pos.push(y); touch.push([fx, fy0 - dist * e, 1]); });
      v = dist / dur * 0.9;
      touch.push([fx, fy0 - dist, 0]);
    } else if (st[0] === "coast") {
      var t = 0; while (Math.abs(v) * Math.exp(-t / TAU) > 6) { t += 1 / HZ; y += v * Math.exp(-t / TAU) / HZ; pos.push(y); touch.push(null); }
    } else if (st[0] === "flickTop") {
      var dur2 = st[1], fyS = st[2], ys = y; n = Math.round(dur2 * HZ);
      push(Math.round(0.05 * HZ), function () { pos.push(y); touch.push([fx, fyS, 1]); });
      push(n, function (i) { var k = (i + 1) / n; y = ys - 90 * k; pos.push(y); touch.push([fx, fyS + 90 * k, 1]); });
      touch.push([fx, fyS + 90, 0]);
      // Flick up with exactly the velocity that coasts back to the top, so it lands at 0 and settles
      v = -(y) / TAU; var t2 = 0;
      while (y > 0.5) { t2 += 1 / HZ; y += v * Math.exp(-t2 / TAU) / HZ; pos.push(Math.max(y, 0)); touch.push(null); if (t2 > 3) break; }
      y = 0;
    }
  });
  var total = pos.length / HZ;

  // A phone starts once it is on screen and, if it sits in a reveal frame, once that reveal has finished.
  function attach(frame) {
    var img = frame.querySelector(".phone__content"), dot = frame.querySelector(".touch"), screen = frame.querySelector(".phone__screen");
    var gate = frame.closest("[data-mask]");
    var running = false, visible = false, start = 0, lastDot = 0;
    function ready() { return !gate || gate.dataset.revealDone === "true"; }
    function tick(now) {
      if (!running) return;
      var i = Math.floor(((now - start) / 1000 % total) * HZ);
      img.style.transform = "translateY(" + (-pos[i] / H * 100).toFixed(3) + "%)";
      if (dot) {
        var tch = touch[i], sw = screen.clientWidth / W, on = tch && tch[2] ? 1 : 0;
        lastDot += (on - lastDot) * 0.25;
        if (tch) dot.style.transform = "translate(" + (tch[0] * sw).toFixed(1) + "px," + (tch[1] * sw).toFixed(1) + "px) scale(" + (0.85 + 0.15 * lastDot).toFixed(3) + ")";
        dot.style.opacity = lastDot.toFixed(3);
      }
      requestAnimationFrame(tick);
    }
    function maybeStart() {
      if (running || !visible || !ready()) return;
      running = true; start = performance.now(); requestAnimationFrame(tick);
    }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        visible = e.isIntersecting;
        if (visible) maybeStart(); else { running = false; img.style.transform = "translateY(0)"; }
      });
    }, { threshold: 0.35 }).observe(frame);
    if (gate) gate.addEventListener("revealdone", maybeStart);
  }
  document.querySelectorAll("[data-pscroll]").forEach(attach);
  window.__profileScroll = { pos: pos, touch: touch, hz: HZ, total: total };
})();
