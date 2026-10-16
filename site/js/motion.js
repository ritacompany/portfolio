// Motion setup. Only the plumbing is here; what moves and how is decided in H7 and approved
// by Chadwick. GSAP 3.13.0 and Lenis 1.1.20 are self hosted in /vendor and loaded as classic
// scripts before this module, so window.gsap and window.Lenis exist.
//
// Lenis settings are the ones settled on the Haven prototype (docs/HAVEN_MOTION_PLAN.md):
// duration 1.2, driven by the GSAP ticker, lag smoothing off. See reports/homepage-animation-audit.md.

export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export function startMotion() {
  const { gsap, Lenis } = window;
  if (!gsap) return { lenis: null };
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  // Reduced motion: native scroll, no smoothing. Components check reducedMotion themselves.
  if (reducedMotion.matches || !Lenis) return { lenis: null };

  const lenis = new Lenis({ duration: 1.2 });
  if (window.ScrollTrigger) lenis.on("scroll", window.ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Pause smooth scroll while a dialog has the page locked.
  new MutationObserver(() => {
    document.body.classList.contains("is-locked") ? lenis.stop() : lenis.start();
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });

  return { lenis };
}
