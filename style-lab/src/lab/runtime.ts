import { styles } from "./registry";
import { makeKit } from "./kit";
import type { LabStyle } from "./types";

const params = new URLSearchParams(location.search);
export const showSwitcher = params.has("lab");
export const activeStyle: LabStyle | null = styles.find((s) => s.id === params.get("style")) ?? null;

declare global {
  interface Window { __lab?: { style: string | null; styles: string[]; setupRan: boolean; reduced: boolean } }
}

// Before the first render: mark the page and inject the style's CSS into the lab layer, so the first
// paint is already styled and nothing flashes.
export function applyStyleCss() {
  const html = document.documentElement;
  window.__lab = { style: activeStyle?.id ?? null, styles: styles.map((s) => s.id), setupRan: false, reduced: matchMedia("(prefers-reduced-motion: reduce)").matches };
  if (!activeStyle) return;
  html.dataset.style = activeStyle.id;
  if (activeStyle.css) {
    const tag = document.createElement("style");
    tag.dataset.labStyle = activeStyle.id;
    tag.textContent = `@layer lab {\n${activeStyle.css}\n}`;
    document.head.append(tag);
  }
}

// After mount: run the style's setup unless the reader asked for reduced motion.
export function runStyle(root: HTMLElement) {
  if (!activeStyle?.setup || window.__lab?.reduced) return () => {};
  const { kit, stop } = makeKit(root);
  const cleanup = activeStyle.setup(kit);
  window.__lab!.setupRan = true;
  return () => { cleanup?.(); stop(); };
}
