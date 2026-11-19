import type { StyleKit } from "../../types";

// Holds the hero's CHDWCK on screen from the moment it is fully in view until the bottom of Selected
// works reaches the bottom of the window, then lets it leave with the works. It stays where it first
// sat: at 1440 by 900 that is 16 px of scroll in, with its baseline 40 above the window's bottom.
//
// Not position: sticky or fixed. main is a size container, which also makes it the containing block
// and stacking context for anything fixed inside it, so the word is moved instead: a CSS scroll driven
// animation translates it by exactly the distance scrolled. That runs off the main thread, so it never
// lags the scroll. Browsers without scroll timelines get the same thing from ScrollTrigger.
// From 768 up only: the phone's CHDWCK runs down the left edge, where the stacked cards would bury it.
export function stickWordmark({ root, gsap, ScrollTrigger }: StyleKit) {
  const name = root.querySelector<HTMLElement>(".hero__name");
  const works = root.querySelector<HTMLElement>('[data-section="works"]');
  if (!name || !works) return () => {};
  const html = document.documentElement;
  const wide = matchMedia("(min-width: 768px)");
  const native = CSS.supports("animation-timeline: scroll()");
  let tween: ReturnType<typeof gsap.to> | null = null;

  const measure = () => {
    html.classList.remove("lab-stick-on");
    tween?.scrollTrigger?.kill();
    tween?.kill();
    tween = null;
    gsap.set(name, { clearProps: "transform" });
    if (!wide.matches) return;
    const r = name.getBoundingClientRect();
    const top = r.top + scrollY;
    const worksBottom = works.getBoundingClientRect().bottom + scrollY;
    const gap = 40; // its baseline sits 40 above the hero's bottom in the Hero master
    const s0 = Math.max(0, top + r.height + gap - innerHeight);
    const s1 = Math.max(s0, worksBottom - innerHeight);
    const d = s1 - s0;
    name.style.setProperty("--stick-s0", `${s0}px`);
    name.style.setProperty("--stick-s1", `${s1}px`);
    name.style.setProperty("--stick-d", `${d}px`);
    name.dataset.stick = `${s0.toFixed(1)} ${s1.toFixed(1)}`;
    if (native) html.classList.add("lab-stick-on");
    else tween = gsap.to(name, { y: d, ease: "none", scrollTrigger: { start: s0, end: s1, scrub: true } });
  };

  let raf = 0;
  const remeasure = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
  const ro = new ResizeObserver(remeasure);
  ro.observe(works);
  ro.observe(root);
  wide.addEventListener("change", remeasure);
  document.fonts.ready.then(remeasure);
  measure();
  ScrollTrigger.refresh();

  return () => {
    ro.disconnect();
    wide.removeEventListener("change", remeasure);
    cancelAnimationFrame(raf);
    html.classList.remove("lab-stick-on");
    tween?.kill();
  };
}
