import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

// What a style is given when it starts.
export type StyleKit = {
  /** The page canvas (.canvas.home). Query sections with [data-section="hero|works|about|footer"]. */
  root: HTMLElement;
  gsap: typeof GSAP;
  ScrollTrigger: typeof ST;
  /** Starts Lenis smooth scrolling, wired to ScrollTrigger and to in-page anchor links. */
  smoothScroll: (options?: ConstructorParameters<typeof Lenis>[0]) => Lenis;
};

/**
 * One whole page style. A style may change motion, scroll behaviour, section transitions, spacing
 * rhythm and accent treatments, and nothing else: never his copy, fonts, sizes or colours.
 * scripts/lint-styles.mjs and the typelock check hold that line.
 *
 * - css is injected inside @layer lab only while the style is live, so it needs no scoping and any
 *   Tailwind utility still beats it. Use his tokens (var(--neutral-200) and so on) for any accent.
 * - setup runs once after the page mounts and may return a cleanup. It is never called under
 *   prefers-reduced-motion, so a style can hide things before revealing them without stranding anyone.
 */
export type LabStyle = {
  id: string;
  name: string;
  /** What a person would remember from it, in one line. */
  remember: string;
  /** The reference it was studied from (a Refero site or style). */
  reference?: { label: string; url?: string };
  css?: string;
  setup?: (kit: StyleKit) => void | (() => void);
};
