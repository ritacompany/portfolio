import { WorkCard } from "./WorkCard";

// Selected works, Figma 4923:12086. Two cards side by side from 768, stacked under it.
export function SelectedWorks() {
  return (
    <section className="works" id="work" aria-labelledby="works-title">
      <div className="layout-grid">
        <h2 className="works__title" id="works-title">
          Selected works
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
