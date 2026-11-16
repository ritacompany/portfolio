import { createElement } from "react";
import { createRoot } from "react-dom/client";
import type { LabStyle } from "../../types";
import { PixelTuner, loadSettings } from "../../tools/PixelTuner";
import { createPixelBreak } from "./engine";
import css from "./style.css?inline";

// His idea, 16 Nov, after the stuck styles: CHDWCK moves a little at first and slides fully under
// Selected works, then breaks into pixel blocks that spread and fade out by the bottom of the works.
// The tuner beside it sets every number, and its last settings are kept in this browser.
const style: LabStyle = {
  id: "pixel-break",
  name: "CHDWCK breaks into pixels",
  remember: "CHDWCK slides under the work, then crumbles into pixels that blow away before About.",
  css,
  setup({ root }) {
    const engine = createPixelBreak(root, loadSettings());
    if (!engine) return;
    const host = document.createElement("div");
    host.dataset.labTool = "pixel-tuner";
    document.body.append(host);
    const ui = createRoot(host);
    ui.render(createElement(PixelTuner, { engine }));
    (window as unknown as { __pixelBreak?: typeof engine }).__pixelBreak = engine;
    return () => {
      ui.unmount();
      host.remove();
      engine.destroy();
      delete (window as unknown as { __pixelBreak?: typeof engine }).__pixelBreak;
    };
  },
};
export default style;
