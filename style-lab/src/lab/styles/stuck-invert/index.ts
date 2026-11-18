import type { LabStyle } from "../../types";
import { stickWordmark } from "../stuck-shared/stick";
import shared from "../stuck-shared/stick.css?inline";
import css from "./style.css?inline";

// From the Elvina Prasad style on Refero (5df2af07): the opening words hold still while the work
// scrolls through them, and a difference blend flips the colours wherever the two cross. Here the
// held word is CHDWCK and it holds through the bottom of Selected works.
const style: LabStyle = {
  id: "stuck-invert",
  name: "Stuck CHDWCK, inverting",
  remember: "CHDWCK holds still while the work slides under it, and flips colour wherever they cross.",
  reference: { label: "Refero: Elvina Prasad", url: "https://refero.design/styles/5df2af07-6ce2-4805-bf45-6ee595e623e0" },
  css: `${shared}\n${css}`,
  setup: stickWordmark,
};
export default style;
