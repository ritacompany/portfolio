import { Fragment, type CSSProperties } from "react";
import { WorkCard } from "./WorkCard";

// The title as Figma tracks it (6109:21871, 6109:21872): -0.04em on the word, with its own value on
// some letters, with "works" fitted to Figma's render (Chrome drops kerning between letters tracked
// differently). Each word's last letter gets 0 so the 13 px gap between the words is exact.
const TITLE: Array<Array<[string, string | undefined]>> = [
  [["S", "-0.02em"], ["el", undefined], ["ecte", "-0.01em"], ["d", "0em"]],
  [["w", undefined], ["o", "-0.0202em"], ["r", "-0.0849em"], ["k", "-0.0279em"], ["s", "0em"]],
];

// Selected works, Hero master 6109:21845. Two cards side by side from 768, stacked under it.
export function SelectedWorks() {
  return (
    <section className="works" id="work" aria-labelledby="works-title">
      <div className="layout-grid">
        <h2 className="works__title" id="works-title" aria-label="Selected works">
          {TITLE.map((word, w) => (
            // The space between the words: flex drops it from 768 up, where the 13 px gap takes over.
            <Fragment key={w}>
              {w > 0 && " "}
            <span aria-hidden="true">
              {word.map(([letters, track], i) => (
                <span key={i} style={track ? ({ "--t": track } as CSSProperties) : undefined}>
                  {letters}
                </span>
              ))}
            </span>
            </Fragment>
          ))}
        </h2>
      </div>
      <div className="works__cards">
        <WorkCard
          variant="mondai"
          href="/mondai/"
          name="Mondai"
          kind="Case study collection"
          description="Tech career navigator"
          desktopArt={{ src: "/assets/home/mondai-card@2x.webp", width: 879, height: 580 }}
          phoneArt={
            <>
              <img className="mondai-art__laptop" src="/assets/home/mondai-card-phone-laptop.webp" alt="" width={817} height={1024} loading="lazy" />
              <img className="mondai-art__glow" src="/assets/home/mondai-card-phone-glow.webp" alt="" width={455} height={467} loading="lazy" />
            </>
          }
          overlayButton
        />
        <WorkCard
          variant="haven"
          href="/haven/"
          name="Haven"
          description="LGBTQIA + youth app"
          desktopArt={{
            src: "/assets/home/haven-card@2x.webp",
            width: 435,
            height: 435,
            alt: "The Haven app on a phone, wrapped in a glowing purple cable",
          }}
          phoneArt={
            <span className="haven-art__clip">
              <img
                src="/assets/home/haven-card-phone.webp"
                alt="The Haven app on a phone, wrapped in a glowing purple cable"
                width={939}
                height={828}
                loading="lazy"
              />
            </span>
          }
        />
      </div>
    </section>
  );
}
