import type { ComponentType, RefAttributes } from "react";

// One entry per idea. Each experiment replaces one or both sections; leave a section out to keep the
// 14 Nov version. Open one with ?x=<id>, or add ?lab to get the switcher.
//
//   import { HeroMarquee } from "./hero-marquee/HeroMarquee";
//   { id: "hero-marquee", name: "Hero: marquee headline", Hero: HeroMarquee },
//
// A Hero must forward its ref to its <section> so the phone header still knows when the hero has left.
export type Experiment = {
  id: string;
  name: string;
  Hero?: ComponentType<RefAttributes<HTMLElement>>;
  Works?: ComponentType;
};

export const experiments: Experiment[] = [];
