// Home motion, preview only (his ask, 10 Nov). Moves into site/js on his yes. Pairs with home-motion.css.
//   Scroll     Lenis at Haven's setting (lerp 0.1), so Home and Haven scroll the same.
//   Nav        fixed to the top; Product Designer rides up and out as the page moves into Selected works.
//   Works      the title holds while the cards rise over it; Haven arrives after Mondai (it lags, then
//              catches up). Each card opens from the top the first time it comes in (Haven's mask).
//   Text       card labels, About and Current role fade in as Haven's text blocks do (1.4 s, 0.15 s apart,
//              once the block is 100 px inside the screen).
//   Cards      at rest the image only; hover brings in the black layer and Learn more as the outline; the
//              pointer near the middle swaps Learn more to its filled state.
//   Panel      sliders for every value he may tune, saved in this browser only.
(() => {
  const home = document.querySelector(".home");
  if (!home) return;
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = matchMedia("(min-width: 768px)");
  const hoverable = matchMedia("(hover: hover) and (pointer: fine)");
  const vendor = new URL("../vendor/", document.currentScript ? document.currentScript.src : location.href);

  // Tunable values. CSS ones are variables on :root; the rest are read here every frame.
  const DEFAULTS = {
    worksGap: 320,   // px, hero to the Selected works title (was 165)
    titleAt: 38,     // vh, where the title holds
    hold: 70,        // vh, scroll the title holds alone before the first card comes in
    lag: 260,        // px, how far behind Mondai the Haven card starts
    overlay: 0.5,    // black layer on hover (R3 said about 50 percent)
    near: 150,       // px from the middle of Learn more at which it fills
    roleFrom: 0.7,   // Product Designer starts to leave when the works section top is this far down the screen
    roleTo: 0.35,    // and is gone by here
  };
  const KEY = "hm-values";
  let V = { ...DEFAULTS };
  try { V = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(V)); } catch {} };
  const applyCss = () => {
    root.style.setProperty("--hm-works-gap", V.worksGap + "px");
    root.style.setProperty("--hm-title-at", V.titleAt + "vh");
    root.style.setProperty("--hm-hold", V.hold + "vh");
    root.style.setProperty("--rv-card-overlay", V.overlay);
  };
  applyCss();
  root.classList.add("hm");

  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

  // ---- Smooth scroll, Haven's setting.
  let lenis = null;
  if (!reduced) {
    const s = document.createElement("script");
    s.src = new URL("lenis-1.1.20.min.js", vendor).href;
    s.onload = () => {
      if (!window.Lenis) return;
      lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: true });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      new MutationObserver(() => (document.body.classList.contains("is-locked") ? lenis.stop() : lenis.start()))
        .observe(document.body, { attributes: true, attributeFilter: ["class"] });
      window.__hm.lenis = lenis;
    };
    document.head.append(s);
  }

  // ---- Nav: Product Designer in its own clipped line, so it can leave upward.
  const role = home.querySelector(".navbar__role");
  let roleInner = null;
  if (role) {
    roleInner = document.createElement("span");
    roleInner.style.textBox = "trim-both cap alphabetic";
    roleInner.append(...role.childNodes);
    role.append(roleInner);
  }

  // ---- Works: title and cards share a stage, so the title stops holding when the cards' bottom reaches it
  //      and leaves with them instead of showing again underneath.
  const works = home.querySelector(".works");
  const titleRow = works && works.querySelector(":scope > .grid");
  const cardsWrap = works && works.querySelector(".works__cards");
  if (works && titleRow && cardsWrap) {
    const stage = document.createElement("div");
    stage.className = "hm-stage";
    titleRow.before(stage);
    stage.append(titleRow, cardsWrap);
  }
  const cards = [...home.querySelectorAll(".work-card")];
  const haven = home.querySelector(".work-card-haven");

  // ---- Text blocks (Haven: opacity only, 1.4 s, power1.out, 0.15 s apart, once, 100 px inside the screen).
  const TEXT_DUR = 1400, TEXT_STAGGER = 150, TEXT_EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const blocks = [];
  const block = (el, items) => { if (el && items.length) { el.dataset.hmText = ""; blocks.push({ el, items: items.filter(Boolean) }); } };
  block(titleRow, [titleRow && titleRow.firstElementChild]);
  cards.forEach((c) => { const h = c.querySelector(".work-card__head"); block(h, h ? [...h.children] : []); });
  const story = home.querySelector(".about-story");
  if (story) block(story, [story.querySelector(".about__label"), ...story.querySelectorAll(".about__body > *")]);
  const roleRow = home.querySelector(".about-role");
  if (roleRow) block(roleRow, [roleRow.querySelector(".about__label"), roleRow.querySelector(".about__when"), roleRow.querySelector(".about__body")]);
  blocks.forEach((b) => b.items.forEach((it) => it.classList.add("hm-item")));

  const showText = (b, instant) => {
    b.el.dataset.hmShown = "";
    b.items.forEach((it, i) => {
      it.style.transition = instant ? "none" : `opacity ${TEXT_DUR}ms ${TEXT_EASE} ${i * TEXT_STAGGER}ms`;
      it.classList.add("hm-in");
    });
  };

  // ---- Card masks (Haven: open from the top while the image settles from 1.3, 1.2 s, Power3 in out).
  const MASK_DUR = 1200, MASK_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
  const medias = cards.map((c) => c.querySelector(".work-card__media")).filter(Boolean);
  const openMask = (m) => { m.classList.remove("hm-mask"); m.classList.add("hm-open"); m.dataset.hmShown = ""; };
  const revealMask = (m, instant, delay = 0) => {
    if (m.dataset.hmShown !== undefined) return;
    m.dataset.hmShown = "";
    if (instant || !m.animate) return openMask(m);
    const art = m.querySelector(".work-card__desk-art");
    const opts = { duration: MASK_DUR, easing: MASK_EASE, delay, fill: "both" };
    const a = m.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }], opts);
    if (art) art.animate([{ scale: "1.3" }, { scale: "1" }], opts);
    a.finished.then(() => { openMask(m); m.getAnimations({ subtree: true }).forEach((x) => x.cancel()); }).catch(() => {});
  };

  const motionOn = () => !reduced;
  let io = null;
  const watch = () => {
    if (io) io.disconnect();
    if (!motionOn() || !("IntersectionObserver" in window)) {
      blocks.forEach((b) => showText(b, true));
      medias.forEach((m) => openMask(m));
      return;
    }
    medias.forEach((m) => { if (m.dataset.hmShown === undefined) m.classList.add("hm-mask"); });
    const arrived = performance.now() + 150;
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        // Cards are watched through their outer link: a fully clipped element never counts as visible.
        const isMedia = e.target.classList.contains("work-card");
        const media = isMedia && e.target.querySelector(".work-card__media");
        if (e.isIntersecting) {
          const late = performance.now() < arrived ? 350 : 0;
          if (isMedia) revealMask(media, false, late);
          else { const b = blocks.find((x) => x.el === e.target); if (b && b.el.dataset.hmShown === undefined) { showText(b, false); } }
          io.unobserve(e.target);
        } else if (e.boundingClientRect.bottom < 0) {
          if (isMedia) revealMask(media, true); else { const b = blocks.find((x) => x.el === e.target); if (b) showText(b, true); }
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -100px 0px" });
    blocks.forEach((b) => b.el.dataset.hmShown === undefined && io.observe(b.el));
    medias.forEach((m) => m.dataset.hmShown === undefined && io.observe(m.closest(".work-card")));
  };
  watch();

  // ---- Per frame: Product Designer and Haven's lag. Both follow the scroll, so nothing to time.
  const frame = () => {
    const vh = innerHeight;
    if (roleInner) {
      let p = 0;
      if (wide.matches && works) {
        const top = works.getBoundingClientRect().top;
        p = clamp((V.roleFrom * vh - top) / Math.max(1, (V.roleFrom - V.roleTo) * vh));
        if (reduced) p = p > 0.5 ? 1 : 0;
      }
      roleInner.style.transform = `translateY(${(-1.3 * p).toFixed(4)}em)`;
      roleInner.style.opacity = (1 - p).toFixed(4);
      role.style.visibility = p >= 1 ? "hidden" : "";
    }
    if (haven && cardsWrap) {
      let y = 0;
      if (wide.matches && !reduced) y = V.lag * clamp(cardsWrap.getBoundingClientRect().top / vh);
      haven.style.transform = y ? `translateY(${y.toFixed(2)}px)` : "";
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  // ---- Card hover. Mouse only: a tap on a phone or tablet opens the card.
  cards.forEach((card) => {
    const media = card.querySelector(".work-card__media");
    if (!media) return;
    let btn = media.querySelector(".button-sm");
    if (!btn) { const src = home.querySelector(".work-card__media .button-sm"); if (!src) return; btn = src.cloneNode(true); btn.removeAttribute("data-figma-node"); media.append(btn); }
    // Distance from the pointer to the middle of Learn more. During its 12 px load-in the centre is a few
    // px low, which is well inside the radius.
    const near = (e) => {
      const r = btn.getBoundingClientRect();
      return Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) <= V.near;
    };
    card.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && hoverable.matches) card.classList.add("hm-hot"); });
    card.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || !hoverable.matches) return;
      card.classList.add("hm-hot");
      card.classList.toggle("hm-near", media.contains(e.target) && near(e));
    });
    card.addEventListener("pointerleave", () => card.classList.remove("hm-hot", "hm-near"));
    card.addEventListener("focus", () => { if (card.matches(":focus-visible")) card.classList.add("hm-hot", "hm-near"); });
    card.addEventListener("blur", () => card.classList.remove("hm-hot", "hm-near"));
  });

  // ---- Panel.
  const SLIDERS = [
    ["worksGap", "Gap above Selected works", 120, 800, 10, "px"],
    ["titleAt", "Title holds at", 15, 60, 1, "vh"],
    ["hold", "Title holds alone for", 0, 160, 5, "vh of scroll"],
    ["lag", "Haven starts behind Mondai by", 0, 600, 10, "px"],
    ["overlay", "Black layer on hover", 0, 0.9, 0.05, ""],
    ["near", "Learn more fills within", 40, 320, 5, "px"],
    ["roleFrom", "Product Designer starts leaving at", 0.2, 1, 0.05, "of screen"],
    ["roleTo", "and is gone at", 0, 0.9, 0.05, "of screen"],
  ];
  const panel = document.createElement("div");
  panel.className = "hm-panel";
  panel.setAttribute("data-closed", "");
  panel.innerHTML = `<div class="hm-panel__top"><span>Home motion</span><button type="button" data-t>Open</button></div>` +
    SLIDERS.map(([k, label, min, max, step, unit]) =>
      `<label><span>${label}<b data-v="${k}"></b></span><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}"></label>`).join("") +
    `<div class="hm-panel__row"><button type="button" data-replay>Replay reveals</button><button type="button" data-copy>Copy values</button><button type="button" data-reset>Reset</button></div>`;
  const show = () => SLIDERS.forEach(([k, , , , , unit]) => {
    panel.querySelector(`[data-k="${k}"]`).value = V[k];
    panel.querySelector(`[data-v="${k}"]`).textContent = ` ${V[k]} ${unit}`;
  });
  panel.addEventListener("input", (e) => { const k = e.target.dataset.k; if (!k) return; V[k] = parseFloat(e.target.value); applyCss(); save(); show(); });
  panel.querySelector("[data-t]").addEventListener("click", (e) => {
    const closed = panel.toggleAttribute("data-closed"); e.target.textContent = closed ? "Open" : "Close";
  });
  panel.querySelector("[data-replay]").addEventListener("click", () => {
    blocks.forEach((b) => { delete b.el.dataset.hmShown; b.items.forEach((it) => { it.style.transition = "none"; it.classList.remove("hm-in"); }); });
    medias.forEach((m) => { delete m.dataset.hmShown; m.classList.remove("hm-open"); });
    lenis ? lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(watch));
  });
  panel.querySelector("[data-copy]").addEventListener("click", (e) => {
    const text = SLIDERS.map(([k, label, , , , unit]) => `${label}: ${V[k]} ${unit}`.trim()).join("\n");
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(
      () => { e.target.textContent = "Copied"; setTimeout(() => (e.target.textContent = "Copy values"), 1200); },
      () => prompt("Copy these values", text));
  });
  panel.querySelector("[data-reset]").addEventListener("click", () => { V = { ...DEFAULTS }; save(); applyCss(); show(); });
  show();
  document.body.append(panel);

  window.__hm = { V, lenis, blocks, medias, DEFAULTS };
})();
