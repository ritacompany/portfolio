import type { LabStyle } from "../../types";
import { stickWordmark } from "../stuck-shared/stick";
import shared from "../stuck-shared/stick.css?inline";
import css from "./style.css?inline";

// The same hold as stuck-invert with no blend: CHDWCK stays behind, and the title and cards pass over
// it. The plain version, to see how much of the effect is the blend.
const style: LabStyle = {
  id: "stuck-behind",
  name: "Stuck CHDWCK, behind",
  remember: "CHDWCK stays put like a backdrop and the work slides over the top of it.",
  reference: { label: "Refero: Elvina Prasad", url: "https://refero.design/styles/5df2af07-6ce2-4805-bf45-6ee595e623e0" },
  css: `${shared}\n${css}`,
  setup: stickWordmark,
};
export default style;
