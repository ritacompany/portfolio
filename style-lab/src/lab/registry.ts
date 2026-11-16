import type { LabStyle } from "./types";
import softLanding from "./styles/soft-landing";
import stuckInvert from "./styles/stuck-invert";
import stuckBehind from "./styles/stuck-behind";

// One entry per style. Each lives in its own folder under styles/: index.ts (the LabStyle) and, if it
// needs one, style.css imported with ?inline. Open one with ?style=<id>, or add ?lab for the switcher.
// No ?style means the Figma base: his Hero master, still, as drawn.
export const styles: LabStyle[] = [stuckInvert, stuckBehind, softLanding];
