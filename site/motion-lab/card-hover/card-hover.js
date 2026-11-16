// Work card hover (his spec, 9 Nov): at rest only the image; on hover a black overlay fades to 75
// percent and Learn more loads in over it. Proposal on the preview link; moves to site/js on his yes.
// Style guide and state list: docs/motion/card-hover/. Lab render: site/motion-lab/card-hover.html.
//
// Every value is a closed form spring of the time since each enter or leave (track), so the live page
// and the lab render run the same maths: the lab feeds scripted pointer times, the page real ones.
// A classic script (no imports) so the preview can add it to any page; exposes window.CardHover.
(() => {
  const CARD = {
    shade: 0.75,               // overlay opacity at full hover
    shadeK: 420, shadeD: 41,   // critically damped, settles in about 0.45 s
    btnDelay: 0.08,            // s after the overlay starts, on enter only
    btnK: 282, btnD: 33.6,     // critically damped, settles in about 0.55 s
    rise: 12,                  // px Learn more rises as it loads in
    from: 0.92,                // scale Learn more grows from
    fadeAt: 0.6,               // Learn more is fully opaque this far into its move
    img: 1.035,                // image scale at full hover (Phase 2)
    imgK: 50, imgD: 14.2,      // heavy spring, settles in about 1.3 s
  };

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  function spring(t, k, d) {
    if (t <= 0) return 0;
    const w0 = Math.sqrt(k), z = d / (2 * w0);
    if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
    if (Math.abs(z - 1) < 1e-9) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const r1 = -w0 * (z - Math.sqrt(z * z - 1)), r2 = -w0 * (z + Math.sqrt(z * z - 1));
    return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  }
  // One spring per change, stacked, so a new target never restarts the motion (same as lib/motion.js).
  function track(t, keys, k, d) {
    let v = keys[0][1];
    for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d);
    return v;
  }

  // Parts of a card, created when the markup does not have them yet (the overlay; Haven's Learn more).
  function parts(card) {
    const media = card.querySelector(".work-card__media");
    let shade = media.querySelector(".work-card__shade");
    if (!shade) { shade = document.createElement("span"); shade.className = "work-card__shade"; shade.setAttribute("aria-hidden", "true"); media.querySelector("img").after(shade); }
    let btn = media.querySelector(".button-sm");
    if (!btn) { btn = document.createElement("span"); btn.className = "button-sm work-card__cta-center"; btn.textContent = "Learn more"; media.append(btn); }
    return { card, media, shade, btn, img: media.querySelector("img") };
  }

  // events: [[t, 0 or 1], ...] starting with [-Infinity, 0]. Draws the card at time t.
  function paint(p, events, t, cfg = CARD) {
    const btnKeys = events.map(([at, v], i) => [i && v ? at + cfg.btnDelay : at, v]);
    const s = clamp(track(t, events, cfg.shadeK, cfg.shadeD));
    const b = clamp(track(t, btnKeys, cfg.btnK, cfg.btnD));
    const g = track(t, events, cfg.imgK, cfg.imgD);
    p.shade.style.opacity = (cfg.shade * s).toFixed(4);
    p.btn.style.opacity = clamp(b / cfg.fadeAt).toFixed(4);
    p.btn.style.translate = `0 ${(cfg.rise * (1 - b)).toFixed(3)}px`;
    p.btn.style.scale = (cfg.from + (1 - cfg.from) * b).toFixed(4);
    p.img.style.transform = `scale(${(1 + (cfg.img - 1) * g).toFixed(5)})`;
    p.card.classList.toggle("is-hot", events[events.length - 1][1] === 1);
    const settled = t - events[events.length - 1][0] > 2;
    return settled;
  }

  function start() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("has-card-hover");
    const cards = [...document.querySelectorAll(".work-card")].map((c) => ({ p: parts(c), events: [[-Infinity, 0]] }));
    let raf = 0;
    const now = () => performance.now() / 1000;
    const frame = () => {
      const t = now(); let busy = false;
      for (const c of cards) if (!paint(c.p, c.events, t, window.CardHover.CARD)) busy = true;
      raf = busy ? requestAnimationFrame(frame) : 0;
    };
    const set = (c, v) => {
      if (c.events[c.events.length - 1][1] === v) return;
      // Reduced motion: the state switches at once (the springs are given a start far in the past).
      c.events.push([reduced ? now() - 10 : now(), v]);
      if (c.events.length > 12) c.events.splice(1, c.events.length - 12);
      if (!raf) raf = requestAnimationFrame(frame);
    };
    for (const c of cards) {
      paint(c.p, c.events, now());
      c.p.card.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") set(c, 1); });
      c.p.card.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") set(c, 0); });
      c.p.card.addEventListener("focus", () => { if (c.p.card.matches(":focus-visible")) set(c, 1); });
      c.p.card.addEventListener("blur", () => set(c, 0));
    }
    window.CardHover.restart = () => { if (!raf) raf = requestAnimationFrame(frame); };
  }

  window.CardHover = { CARD, parts, paint, start };
  if (!window.__CARD_HOVER_MANUAL__ && document.querySelector(".work-card")) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  }
})();
