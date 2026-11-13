// Start of week carousel, center mode (framework page, 5812:20498). Pairs with sow.css.
// Every card is placed from one position value (pos, 0 to 4): the center card is full size, its
// neighbours shrink to SIDE_SCALE and dim to SIDE_BRIGHT, so a side card grows into the center as it
// arrives. Input moves exactly one template per gesture (sideways wheel or trackpad, drag, arrow keys,
// a click on a side card or a dot), animated at DUR. The template number swaps when the dot does.
// Reduced motion: no travel or fades, everything lands at once.
(function startOfWeek() {
  const root = document.querySelector(".sow");
  if (!root) return;
  const DUR = 900, SIDE_SCALE = 0.65, SIDE_BRIGHT = 0.4, CARD_W = 543, CARD_H = 538;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const stage = root.querySelector(".sow__stage"), cards = [...root.querySelectorAll(".sow__card")];
  const dots = [...root.querySelectorAll(".sow__dot")], cap = root.querySelector(".sow__cap");
  const num = root.querySelector(".sow__num"), title = root.querySelector(".sow__title"), desc = root.querySelector(".sow__desc");
  const N = cards.length;
  let W = 1017, H = 550, K = 1, SPACING = 481, pos = 0, index = 0, numShown = 0;

  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function paint() {
    cards.forEach((c, i) => {
      const d = i - pos, ad = Math.min(Math.abs(d), 1.6), k = Math.min(ad, 1);
      const sk = lerp(1, SIDE_SCALE, k) * K;
      c.style.transform = `translate(${W / 2 + d * SPACING - (CARD_W * sk) / 2}px, ${H / 2 - (CARD_H * sk) / 2}px) scale(${sk})`;
      c.style.filter = `brightness(${lerp(1, SIDE_BRIGHT, k)})`;
      c.style.zIndex = String(10 - Math.round(ad * 4));
      c.classList.toggle("is-center", Math.abs(d) < 0.5);
      c.setAttribute("aria-hidden", Math.abs(d) < 0.5 ? "false" : "true");
    });
    const near = Math.round(pos);
    dots.forEach((b, i) => (i === near ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
    if (near !== numShown) setNum(near);
  }

  // The number crossfades in 200 ms, the same as the dot's own colour change.
  function setNum(i, instant) {
    numShown = i;
    [...num.children].slice(0, -1).forEach((o) => o.remove());
    const old = [...num.children], el = document.createElement("span");
    el.textContent = i + 1; num.append(el);
    if (instant || reduce.matches) { old.forEach((o) => o.remove()); return; }
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease-out" });
    old.forEach((o) => (o.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease-out", fill: "forwards" }).onfinish = () => o.remove()));
  }

  function setText(i) { title.textContent = cards[i].dataset.title; desc.textContent = cards[i].dataset.desc; }

  let swap = 0;
  function textTo(i) {
    clearTimeout(swap);
    if (reduce.matches) { cap.className = "sow__cap"; setText(i); return; }
    cap.className = "sow__cap is-out";
    swap = setTimeout(() => {
      setText(i);
      cap.className = "sow__cap is-pre"; void cap.offsetWidth;
      cap.className = "sow__cap is-in";
    }, DUR * 0.55);
  }

  let raf = 0;
  function go(i) {
    i = Math.max(0, Math.min(N - 1, i));
    if (i !== index) textTo(i);
    index = i;
    cancelAnimationFrame(raf);
    const from = pos, dur = reduce.matches ? 0 : DUR * Math.min(1.6, Math.max(0.6, Math.abs(i - from)) ** 0.5);
    if (!dur) { pos = i; paint(); return; }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      pos = lerp(from, i, ease(t)); paint();
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  // Sideways wheel or trackpad: one template per gesture, the rest of the flick is eaten. Vertical
  // wheel is left alone so the page keeps scrolling.
  let acc = 0, lastWheel = 0, locked = false;
  stage.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    const now = performance.now();
    if (now - lastWheel > 220) { locked = false; acc = 0; }
    lastWheel = now;
    if (locked) return;
    acc += e.deltaX;
    if (Math.abs(acc) > 24) { const dir = Math.sign(acc); acc = 0; locked = true; go(index + dir); }
  }, { passive: false });

  // Drag (mouse or touch): the cards follow the pointer, then settle one template over.
  let down = null, dragged = false;
  const zoom = () => stage.getBoundingClientRect().width / stage.offsetWidth || 1;
  stage.addEventListener("pointerdown", (e) => { down = { x: e.clientX, p: pos, t: performance.now(), z: zoom() }; dragged = false; });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = (e.clientX - down.x) / down.z;
    if (!dragged && Math.abs(dx) > 5) { dragged = true; cancelAnimationFrame(raf); }
    if (!dragged) return;
    let p = down.p - dx / SPACING;
    if (p < 0) p /= 3; if (p > N - 1) p = N - 1 + (p - (N - 1)) / 3;
    pos = p; paint();
  });
  addEventListener("pointerup", (e) => {
    if (!down) return;
    const dx = (e.clientX - down.x) / down.z, v = dx / Math.max(1, performance.now() - down.t);
    const start = Math.round(down.p); down = null;
    if (!dragged) return;
    let target = Math.round(pos);
    if (target === start && (Math.abs(dx) > 60 || Math.abs(v) > 0.4)) target = start - Math.sign(dx);
    go(target);
    setTimeout(() => (dragged = false), 0);
  });
  cards.forEach((c, i) => c.addEventListener("click", () => { if (!dragged) go(i); }));
  dots.forEach((b, i) => b.addEventListener("click", () => go(i)));
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  });

  // Desktop keeps Figma's proportions (1017 stage, 543 card, side centers 481 px out). Narrower, the
  // card is 80% of the stage and the side cards peek in at the edges.
  function fit() {
    W = stage.clientWidth;
    const wide = W >= 700, cw = wide ? W * (543 / 1017) : W * 0.8;
    K = cw / CARD_W; SPACING = cw * (wide ? 481 / 543 : 0.845);
    H = wide ? W * (550 / 1017) : CARD_H * K + 12;
    stage.style.height = H + "px";
    paint();
  }
  addEventListener("resize", fit);
  setText(0); setNum(0, true); fit();
})();
