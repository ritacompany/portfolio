// Home motion (his ask, 10 Nov; moved from the preview on his yes, 22 Nov). Pairs with the "Home motion"
// block at the end of home.css.
//   Scroll   Lenis at Haven's setting (lerp 0.1), so Home and Haven scroll the same. Off with reduced motion.
//   Nav      fixed to the top from 768 up (home.css, once this script adds html.hm).
//   Text     the card labels, About and Current role fade in as Haven's text blocks do: opacity only,
//            1.4 s, 0.15 s apart, once the block is 100 px inside the screen. A block already above the
//            screen (a link that lands lower down) shows at once.
//   Refresh  starts at the top of the page (his ask, 10 Nov); a link with a hash still lands on its section.
// Not here, on purpose: the card rise and square reveal (removed at his call, 16 Nov), the hover layer and
// hover Learn more (his ask, 21 Nov: the site cursor carries Learn more), the tuning panel (preview only),
// the bigger gap above Selected works (his newest frame, 22 Nov, sets the cards at 1042) and the Product
// Designer exit (the newest navbar has no role line from 768 up).
(() => {
  const home = document.querySelector(".home");
  if (!home) return;
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("hm");

  // Touch Learn more (his ask, 22 Nov): pressing a card highlights its Learn more while the finger is down.
  // Done here rather than with :active alone, which iPhone Safari skips without a touch listener.
  home.querySelectorAll(".work-card").forEach((card) => {
    const more = card.querySelector(".link-touch");
    if (!more) return;
    const off = () => more.classList.remove("is-pressed");
    card.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") more.classList.add("is-pressed"); }, { passive: true });
    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((t) => card.addEventListener(t, off, { passive: true }));
    addEventListener("scroll", off, { passive: true });
  });

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) scrollTo(0, 0);

  window.__hm = { lenis: null };
  if (!reduced && window.Lenis) {
    const lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // The phone menu locks the page (body.is-locked); Lenis stops with it.
    new MutationObserver(() => (document.body.classList.contains("is-locked") ? lenis.stop() : lenis.start()))
      .observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.__hm.lenis = lenis;
  }

  const TEXT_DUR = 1400, TEXT_STAGGER = 150, TEXT_EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const blocks = [];
  const block = (el, items) => {
    items = items.filter(Boolean);
    if (el && items.length) { blocks.push({ el, items }); items.forEach((it) => it.classList.add("hm-item")); }
  };
  home.querySelectorAll(".work-card").forEach((c) => { const h = c.querySelector(".work-card__head"); if (h) block(h, [...h.children]); });
  const story = home.querySelector(".about-story");
  if (story) block(story, [story.querySelector(".about__label"), ...story.querySelectorAll(".about__body > *")]);
  const role = home.querySelector(".about-role");
  if (role) block(role, [role.querySelector(".about__label"), role.querySelector(".about__when"), role.querySelector(".about__body")]);

  const show = (b, instant) => {
    if (b.shown) return;
    b.shown = true;
    b.items.forEach((it, i) => {
      it.style.transition = instant ? "none" : `opacity ${TEXT_DUR}ms ${TEXT_EASE} ${i * TEXT_STAGGER}ms`;
      it.classList.add("hm-in");
    });
  };
  if (reduced || !("IntersectionObserver" in window)) { blocks.forEach((b) => show(b, true)); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const b = blocks.find((x) => x.el === e.target);
    if (!b) return;
    if (e.isIntersecting) show(b, false);
    else if (e.boundingClientRect.bottom < 0) show(b, true);
    else return;
    io.unobserve(e.target);
  }), { rootMargin: "0px 0px -100px 0px" });
  blocks.forEach((b) => io.observe(b.el));
})();
