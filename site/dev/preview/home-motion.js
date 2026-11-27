// Home motion, preview only (his ask, 10 Nov). Moves into site/js on his yes. Pairs with home-motion.css.
//   Scroll     Lenis at Haven's setting (lerp 0.1), so Home and Haven scroll the same.
//   Nav        fixed to the top; Product Designer rides up and out as the page moves into Selected works.
//   Works      the title holds while the cards rise over it; Haven arrives after Mondai (it lags, then
//              catches up). The images show plainly: no cover reveal over them (his ask, 21 Nov).
//   Text       card labels, About and Current role fade in as Haven's text blocks do (1.4 s, 0.15 s apart,
//              once the block is 100 px inside the screen).
//   Cards      no hover layer and no hover Learn more (his ask, 21 Nov): the site cursor carries Learn more
//              on a fine pointer. Pressing the card swaps the static Learn more to the white button.
//              Product Designer rests at the nav link colour. A refresh starts at the top of the page.
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
    rise: 150,       // px each card rises as it comes in (the reference: 150)
    titleHold: 0,    // 1 holds the title while the cards rise (the first pass); 0 scrolls it, as the reference
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
    root.classList.toggle("hm-hold", V.titleHold === 1);
  };
  applyCss();
  root.classList.add("hm");

  // A refresh starts at the top (his ask, 10 Nov); a link to a section still lands on it.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) scrollTo(0, 0);

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
  // Card art from his master frame (preview copies; they replace site/assets/home on his yes).
  const img = new URL("img/", document.currentScript ? document.currentScript.src : location.href);
  const art = { mondai: "mondai-card@2x.webp", haven: "haven-card@2x.webp" };
  cards.forEach((c) => {
    const i = c.querySelector(".work-card__desk-art"), k = c.classList.contains("work-card-mondai") ? "mondai" : "haven";
    if (i) { i.src = new URL(art[k], img).href; i.width = k === "mondai" ? 1758 : 886; i.height = k === "mondai" ? 1159 : 886; }
  });

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

  // ---- Cards, from Seth Lukin's works (docs/motion/home-load/style_guide.md, "Selected works on the
  //      reference"). Each card rises 150 px once it comes in, on a spring with no bounce (stiffness 500,
  //      damping 100, mass 1, about 1.9 s), and rises again once it has gone back below the screen (his ask).
  //      The checker cover that cleared off the image is gone (his ask, 21 Nov): the image shows plainly.
  const SPRING_K = 500, SPRING_D = 100;
  function spring(t, k, d) {
    if (t <= 0) return 0;
    const w0 = Math.sqrt(k), z = d / (2 * w0);
    if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
    if (Math.abs(z - 1) < 1e-9) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
    const r1 = -w0 * (z - Math.sqrt(z * z - 1)), r2 = -w0 * (z + Math.sqrt(z * z - 1));
    return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
  }
  const medias = cards.map((c) => c.querySelector(".work-card__media")).filter(Boolean);
  const reveals = cards.map((card) => ({ card, media: card.querySelector(".work-card__media"), enteredAt: null, done: false, lift: 0 }));
  const finish = (r) => { r.done = true; r.card.style.transform = ""; if (r.media) r.media.dataset.hmShown = ""; };
  const resetReveal = (r) => {
    r.done = false; r.enteredAt = null; r.lift = V.rise; if (r.media) delete r.media.dataset.hmShown;
    r.card.style.transform = `translateY(${V.rise}px)`;
  };

  const motionOn = () => !reduced;
  let io = null;
  const watch = () => {
    if (io) io.disconnect();
    if (!motionOn() || !("IntersectionObserver" in window)) {
      blocks.forEach((b) => showText(b, true));
      reveals.forEach(finish);
      return;
    }
    reveals.forEach((r) => {
      if (r.done) return;
      // A card already above the screen at load (a jump link) is shown as it is.
      if (r.card.getBoundingClientRect().bottom < 0) finish(r); else resetReveal(r);
    });
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const b = blocks.find((x) => x.el === e.target);
        if (!b) return;
        if (e.isIntersecting) { if (b.el.dataset.hmShown === undefined) showText(b, false); io.unobserve(e.target); }
        else if (e.boundingClientRect.bottom < 0) { showText(b, true); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -100px 0px" });
    blocks.forEach((b) => b.el.dataset.hmShown === undefined && io.observe(b.el));
  };
  watch();

  // ---- Per frame: Product Designer's exit and each card's rise.
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
    const now = performance.now() / 1000;
    for (const r of reveals) {
      if (r.done || !r.media) continue;
      const rect = r.media.getBoundingClientRect();
      // Back below the screen: reset, so the rise and the reveal play again next time (his ask).
      if (r.enteredAt !== null && rect.top - (r.lift || 0) > vh + 4) { r.enteredAt = null; }
      // A card comes in when its image does (Haven's sits 132 px lower, so it follows Mondai).
      if (r.enteredAt === null && rect.top < vh) r.enteredAt = now;
      const t = r.enteredAt === null ? 0 : now - r.enteredAt;
      r.lift = V.rise * (1 - spring(t, SPRING_K, SPRING_D));
      r.card.style.transform = `translateY(${r.lift.toFixed(2)}px)`;
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  // ---- Card press. No hover state (his ask, 21 Nov): the site cursor carries Learn more on a fine pointer.
  //      Each card gets the static Learn more in its media (touch and keyboard focus show it); pressing the
  //      card swaps it to the white button (his call, 10 Nov).
  cards.forEach((card) => {
    const media = card.querySelector(".work-card__media");
    if (!media) return;
    let btn = media.querySelector(".button-sm");
    if (!btn) { const src = home.querySelector(".work-card__media .button-sm"); if (!src) return; btn = src.cloneNode(true); btn.removeAttribute("data-figma-node"); media.append(btn); }
    card.addEventListener("pointerdown", (e) => { if (e.button === 0) card.classList.add("hm-press"); });
    ["pointerup", "pointercancel", "pointerleave"].forEach((t) => card.addEventListener(t, () => card.classList.remove("hm-press")));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter") card.classList.add("hm-press"); });
    card.addEventListener("blur", () => card.classList.remove("hm-press"));
  });

  // ---- Panel.
  const SLIDERS = [
    ["worksGap", "Gap above Selected works", 120, 800, 10, "px"],
    ["titleAt", "Title holds at", 15, 60, 1, "vh"],
    ["hold", "Title holds alone for", 0, 160, 5, "vh of scroll"],
    ["rise", "Cards rise by", 0, 300, 10, "px"],
    ["titleHold", "Title holds in place (0 off, 1 on)", 0, 1, 1, ""],
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
  panel.addEventListener("input", (e) => {
    const k = e.target.dataset.k; if (!k) return; V[k] = parseFloat(e.target.value); applyCss(); save(); show();
  });
  panel.querySelector("[data-t]").addEventListener("click", (e) => {
    const closed = panel.toggleAttribute("data-closed"); e.target.textContent = closed ? "Open" : "Close";
  });
  panel.querySelector("[data-replay]").addEventListener("click", () => {
    blocks.forEach((b) => { delete b.el.dataset.hmShown; b.items.forEach((it) => { it.style.transition = "none"; it.classList.remove("hm-in"); }); });
    reveals.forEach((r) => { r.done = false; });
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

  window.__hm = { V, lenis, blocks, medias, reveals, finish, DEFAULTS };
})();
