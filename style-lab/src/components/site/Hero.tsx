import { forwardRef, type CSSProperties } from "react";

// Hero, from his Hero master frame (Desktop 1 MVP, page CS, 6109:21821, 15 Nov). From 768 up CHDWCK
// is live text across the full width with Figma's per-letter tracking; under 768 it turns a quarter
// and runs down the left edge, as in his Mobile frames. One lede for every width: the Hero master's
// new line replaces both the old desktop line and the old shorter phone line.
// Tracking per letter, fitted so every stem lands where Figma draws it at 1440 (within a pixel). Figma
// stores -0.09em on the word plus small per-letter values (-1.12, -1.92, -1.28 px), but Chrome's
// kerning places the letters differently, so the totals below were measured against Figma's render
// (reference/figma-hero-1440.png) rather than copied. Neighbouring values must stay different: two
// letters with equal tracking share a text run and Chrome kerns them again, which moves W by 10 px.
const WORDMARK: Array<[string, string | undefined]> = [
  ["C", "-0.06962em"],
  ["H", "-0.12057em"],
  ["D", "-0.10529em"],
  ["W", "-0.10531em"],
  ["C", "-0.07981em"],
  ["K", undefined],
];

const VERTICAL: Array<[string, string | undefined]> = [
  ["C", "-0.005095em"],
  ["H", "-0.008734em"],
  ["D", "-0.005822em"],
  ["W", "-0.005822em"],
  ["C", "-0.005095em"],
  ["K", undefined],
];

export const Hero = forwardRef<HTMLElement>(function Hero(_props, ref) {
  return (
    <section ref={ref} className="hero" aria-label="Introduction" data-section="hero">
      <div className="hero__intro layout-grid">
        <p className="hero__lede layout-col-1 layout-span-4">
          I’m a system-minded, nuance led designer, looking for tomorrow’s problem in today’s perfectly reasonable
          decision.
        </p>
        <div className="hero__where layout-col-5 layout-span-4">
          <p className="hero__city">Chicago, IL</p>
          <p className="hero__move">
            <img src="/assets/ui/dolly.svg" alt="" />
            <span>Looking to relocate to NYC</span>
          </p>
        </div>
      </div>
      <a className="button button-compact hero__contact" href="mailto:hello@chadwickfenner.com">
        <span className="button__icon" aria-hidden="true">
          <img src="/assets/ui/mail-asterisk.svg" alt="" />
        </span>
        <span className="button__label">Contact</span>
      </a>
      <h1 className="hero__name">
        <span className="visually-hidden">Chadwick Fenner</span>
        <span className="hero__wordmark" aria-hidden="true" data-bleed="">
          {WORDMARK.map(([letter, track], i) => (
            <span key={i} style={track ? ({ "--t": track } as CSSProperties) : undefined}>
              {letter}
            </span>
          ))}
        </span>
        <span className="hero__vertical" aria-hidden="true" data-bleed="">
          {VERTICAL.map(([letter, nudge], i) => (
            <span key={i} style={nudge ? ({ "--t": nudge } as CSSProperties) : undefined}>
              {letter}
            </span>
          ))}
        </span>
      </h1>
    </section>
  );
});
