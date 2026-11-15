import { forwardRef, type CSSProperties } from "react";

// Hero, Figma 5812:22863 (14 Nov site build). Desktop draws CHDWCK as his outlined SVG across the
// full width; under 768 it turns a quarter and runs down the left edge as live text, with Figma's
// per-letter nudges on top of the word's tracking.
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
    <section ref={ref} className="hero" aria-label="Introduction">
      <div className="hero__intro layout-grid">
        <p className="hero__lede layout-col-1 layout-span-4">
          <span className="hero__lede-wide">
            I’m a system-minded, nuance led designer, designing for what we know now, while leaving space for what may
            change our minds.
          </span>
          <span className="hero__lede-phone">
            I’m a system-minded designer who designs for what we know now, while leaving space for what may change our
            minds.
          </span>
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
        <img className="hero__wordmark" src="/assets/home/chdwck-hero.svg" alt="" width={1440} height={293} />
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
