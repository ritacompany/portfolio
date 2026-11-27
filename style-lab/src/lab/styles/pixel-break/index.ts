import { createElement } from "react";
import { createRoot } from "react-dom/client";
import type { LabStyle } from "../../types";
import { PixelTuner, loadSettings } from "../../tools/PixelTuner";
import { createPixelBreak } from "./engine";
import css from "./style.css?inline";

// His idea, 16 Nov, revised the same day: CHDWCK drifts a little and inverts the work as Selected
// works scrolls into it (the stuck, inverting style), then breaks the moment they meet, all at once,
// into 4, 2 and 1 px pieces that hang in the air at their own speeds and fade before About. The
// tuner beside it sets every number, and its last settings are kept in this browser.
const style: LabStyle = {
  id: "pixel-break",
  name: "CHDWCK breaks into pixels",
  remember: "CHDWCK inverts the work as it scrolls in, then lifts apart into pixels that hang in the air and fade before About.",
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
