// Scroll fixes, preview only (his yes, 11 Nov). Findings in docs/motion/smooth-scroll-research.md.
// Acts on whichever Lenis the page made (__haven, __hm or __mm). Leaves scroll-feel.js and its values alone.
//   Carousel  Lenis 1.1.20 takes every wheel event with any vertical part, so a sideways trackpad swipe
//             over a horizontal scroller (the framework page's week carousel) moved the page down and the
//             carousel not at all. A gesture that is more sideways than vertical, over something that
//             scrolls sideways, now goes to the browser, so the carousel swipes and snaps natively.
//   Landing   a link to a section lands with the section's top just under the nav. The offset is read
//             from the page: the nav's bottom edge when the header stays on screen (fixed or sticky),
//             0 when it scrolls away. It is written to --scroll-land for native jumps (scroll-fixes.css)
//             and used for the glide, so the two always agree. Any per section scroll-margin-top a page
//             sets wins. The Scroll feel tab's Anchor offset still adds on top.
//   Ships     on his yes, into the Lenis setup each page shares; this file then goes.
(() => {
  const root = document.documentElement;
  const header = document.querySelector(".page-header");
  const nav = header && (header.querySelector(".navbar") || header);

  // ---- Landing offset from the nav
  let land = 0;
  // The bar stays on screen when the header or the navbar inside it is fixed or sticky.
  const stays = () => [header, nav].some((n) => n && /^(fixed|sticky)$/.test(getComputedStyle(n).position));
  // From layout, not from the screen, so a bar mid animation (Home's phone bar slides in) measures at rest.
  const barBottom = () => {
    if (!stays()) return 0;
    const top = parseFloat(getComputedStyle(header).top) || 0;
    const inner = nav === header || nav.offsetParent !== header ? header.offsetHeight : Math.max(header.offsetHeight, nav.offsetTop + nav.offsetHeight);
    return Math.max(0, Math.round(top + inner));
  };
  const measure = () => {
    const v = barBottom();
    if (v !== land) { land = v; root.style.setProperty("--scroll-land", v + "px"); }
  };
  // The bar as it will be at the destination. Home's phone header scrolls away with the hero and drops
  // back in as a fixed bar past it (is-past-hero, js/home-phone.js), so a link to a section below the
  // hero is measured with that bar in place. Added and removed in one task, so nothing paints.
  const hero = document.querySelector(".hero");
  const landAt = (docTop) => {
    if (stays() || !header || !hero || header.classList.contains("is-past-hero")) return barBottom();
    // A section that starts where the hero ends (phone Work) would stop short of the point where the bar
    // drops in, so it lands at its own top and the bar arrives over its top padding.
    if (docTop < hero.getBoundingClientRect().bottom + scrollY + 1) return barBottom();
    header.classList.add("is-past-hero");
    const v = barBottom();
    header.classList.remove("is-past-hero");
    return v;
  };
  root.style.setProperty("--scroll-land", "0px");
  measure();
  if (nav && "ResizeObserver" in window) new ResizeObserver(measure).observe(nav);
  addEventListener("resize", measure, { passive: true });
  addEventListener("load", measure);
  // Page scripts can fix the header after this runs (Home's phone layout), so measure again late.
  setTimeout(measure, 1500);

  const current = () => ["__haven", "__hm", "__mm"].map((k) => window[k] && window[k].lenis).find(Boolean) || null;
  const extra = () => (window.__scrollFeel && Number(window.__scrollFeel.V.anchorOffset)) || 0;
  const reducePreview = () => root.classList.contains("ep-reduce-preview");

  // Where a link to this element should put the page: under the bar as it will be there, unless the page
  // set this section's own scroll-margin-top (Home's About on phones, 112 px from the frame), which wins.
  // Then the panel's anchor offset.
  const offsetFor = (el) => {
    if (!el || el === document.body || el === root) return 0;
    const keep = root.style.getPropertyValue("--scroll-land");
    root.style.setProperty("--scroll-land", "99999px");
    const own = getComputedStyle(el).scrollMarginTop !== "99999px";
    root.style.setProperty("--scroll-land", keep);
    const docTop = el.getBoundingClientRect().top + scrollY;
    const m = own ? parseFloat(getComputedStyle(el).scrollMarginTop) || 0 : landAt(docTop);
    return -m + extra();
  };
  const targetFor = (href) => {
    if (href === "#" || href === "#top") return { to: 0, el: null };
    let el = null;
    try { el = document.querySelector(href); } catch {}
    if (!el) return null;
    if (el === document.body || el === root || (el.offsetTop === 0 && el.getBoundingClientRect().top + scrollY < 1)) return { to: 0, el };
    return { to: el, el };
  };

  // Capture phase, so this runs before scroll-feel.js's handler, which skips a click already handled.
  // A link inside a dialog (Home's phone menu) is clicked while the page is locked; the menu closes on
  // the same click, so the glide starts on the next frame, once the page is unlocked.
  document.addEventListener("click", (e) => {
    const lenis = current();
    if (!lenis || reducePreview() || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.composedPath().find((n) => n instanceof HTMLAnchorElement && (n.getAttribute("href") || "").startsWith("#"));
    if (!a || a.closest(".ep")) return;
    const fromDialog = !!a.closest("dialog, [role=dialog], .menu");
    if (lenis.isStopped && !fromDialog) return;
    const t = targetFor(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    const go = () => { measure(); lenis.scrollTo(t.to, { offset: t.to === 0 ? 0 : offsetFor(t.el) }); };
    lenis.isStopped ? requestAnimationFrame(() => requestAnimationFrame(go)) : go();
  }, true);

  // ---- Attach to the page's Lenis once it exists
  let tries = 0;
  (function wait() {
    const lenis = current();
    if (!lenis) { if (++tries < 200) setTimeout(wait, 50); return; }
    const o = lenis.options;
    measure();

    // Carousel: hand sideways gestures over a sideways scroller back to the browser.
    const prior = typeof o.virtualScroll === "function" ? o.virtualScroll : null;
    const scrollsSideways = (n) => {
      if (!(n instanceof HTMLElement) || n.scrollWidth <= n.clientWidth + 1) return false;
      return /(auto|scroll)/.test(getComputedStyle(n).overflowX);
    };
    o.virtualScroll = (d) => {
      if (prior && prior(d) === false) return false;
      const ev = d.event;
      if (!ev || !ev.type.includes("wheel") || Math.abs(d.deltaX) <= Math.abs(d.deltaY)) return true;
      const path = ev.composedPath();
      for (const n of path) { if (n === document.body || n === root) break; if (scrollsSideways(n)) return false; }
      return true;
    };

    // Lenis's own anchor handler (Home has anchors on) does not cancel the click and cannot see a section's
    // own scroll-margin-top, so it would fire a second, different glide after ours. Take it off; the
    // handler above covers every link it covered.
    if (o.anchors && o.wrapper === window && lenis.onClick) window.removeEventListener("click", lenis.onClick, false);
    window.__scrollFixes = { get land() { return land; }, lenis };
  })();
})();
