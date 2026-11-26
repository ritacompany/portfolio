import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Art = { src: string; width: number; height: number; alt?: string };

type Props = {
  variant: "mondai" | "haven";
  href: string;
  name: string;
  kind?: string;
  description: string;
  desktopArt: Art;
  /** The phone crop, drawn under 768 (and Haven's art from 768 up). */
  phoneArt: ReactNode;
  /** Mondai draws Learn more over its image on desktop. */
  overlayButton?: boolean;
  className?: string;
};

// Work card, tracker H11. The whole card is the link. Hover eases the image in 3.5 percent, the
// labels go white and Learn more fills; press settles the image to 1 percent. States live in
// styles/legacy/home.css so they match the plain HTML site exactly.
export function WorkCard({ variant, href, name, kind, description, desktopArt, phoneArt, overlayButton, className }: Props) {
  return (
    <a className={cn("work-card", `work-card-${variant}`, className)} href={href}>
      <span className="work-card__head">
        <span className="work-card__name">{name}</span>
        {kind && (
          <>
            <span className="work-card__slashes" aria-hidden="true">
              //
            </span>
            <span className="work-card__kind">{kind}</span>
          </>
        )}
        <span className="work-card__desc">{description}</span>
      </span>
      <span className="work-card__media">
        <img className="work-card__desk-art" src={desktopArt.src} alt={desktopArt.alt ?? ""} width={desktopArt.width} height={desktopArt.height} />
        <span className="work-card__phone-art" data-bleed="">
          {phoneArt}
        </span>
        {overlayButton && (
          <span className="button-sm" data-overlay="">
            Learn more
          </span>
        )}
      </span>
      <span className="work-card__more link-nav-sm">Learn more</span>
    </a>
  );
}
