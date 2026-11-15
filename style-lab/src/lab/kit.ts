import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { StyleKit } from "./types";

gsap.registerPlugin(ScrollTrigger);

// Builds the kit a style's setup gets, and collects everything it starts so a cleanup can stop it all.
export function makeKit(root: HTMLElement) {
  const stops: Array<() => void> = [];
  const kit: StyleKit = {
    root,
    gsap,
    ScrollTrigger,
    smoothScroll(options) {
      const lenis = new Lenis({ anchors: true, ...options });
      const raf = (t: number) => lenis.raf(t * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.dataset.smooth = "lenis";
      stops.push(() => { gsap.ticker.remove(raf); lenis.destroy(); delete document.documentElement.dataset.smooth; });
      return lenis;
    },
  };
  const stop = () => {
    stops.splice(0).forEach((f) => f());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
  return { kit, stop };
}
