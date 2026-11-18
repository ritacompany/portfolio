import type { LabStyle } from "../../types";
import css from "./style.css?inline";

// The proof style: it exercises every knob the contract allows (smooth scroll, section transitions,
// spacing rhythm, an accent) so the lab's checks have something real to hold. Not from a reference.
const style: LabStyle = {
  id: "soft-landing",
  name: "Proof: soft landing",
  remember: "Every section arrives a beat late and settles into place, like it was set down gently.",
  css,
  setup({ root, gsap, smoothScroll }) {
    smoothScroll({ lerp: 0.085 });
    const sections = root.querySelectorAll<HTMLElement>('[data-section]:not([data-section="hero"])');
    sections.forEach((el) => {
      gsap.from(el.children, {
        opacity: 0, y: 48, duration: 1.1, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    // The hero's lede and location rise in once, on load; CHDWCK is left alone.
    gsap.from(root.querySelectorAll(".hero__intro > *"), { opacity: 0, y: 24, duration: 1.2, ease: "expo.out", stagger: 0.1, delay: 0.15 });
  },
};
export default style;
