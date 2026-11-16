import { styles } from "./registry";
import { makeKit } from "./kit";
import type { LabStyle } from "./types";

const params = new URLSearchParams(location.search);
// The hosted preview (npm run build:preview) always shows the switcher and opens on the style named
// in VITE_LAB_START, since a hosted page may not pass its query string through.
const hosted = import.meta.env.VITE_LAB_HOSTED === "1";
export const showSwitcher = hosted || params.has("lab");
const find = (id: string | null) => styles.find((s) => s.id === id) ?? null;
// A hosted page passes only a plain #name through its link, so a style can also be named there:
// #stuck-behind opens that style, #base opens the Figma base. Section anchors (#about) are ignored.
const fromHash = location.hash.slice(1);
const hashPick = fromHash === "base" ? "" : find(fromHash) ? fromHash : null;
const startId = params.get("style") ?? hashPick ?? (hosted ? import.meta.env.VITE_LAB_START ?? null : null);

declare global {
  interface Window { __lab?: { style: string | null; styles: string[]; setupRan: boolean; reduced: boolean } }
}

let current: LabStyle | null = find(startId);
let root: HTMLElement | null = null;
let stopCurrent: () => void = () => {};
const listeners = new Set<(id: string | null) => void>();

export const activeStyleId = () => current?.id ?? null;
export function onStyleChange(f: (id: string | null) => void) { listeners.add(f); return () => { listeners.delete(f); }; }

function injectCss(style: LabStyle | null) {
  const html = document.documentElement;
  document.querySelectorAll("style[data-lab-style]").forEach((t) => t.remove());
  if (style) html.dataset.style = style.id;
  else delete html.dataset.style;
  if (style?.css) {
    const tag = document.createElement("style");
    tag.dataset.labStyle = style.id;
    tag.textContent = `@layer lab {\n${style.css}\n}`;
    document.head.append(tag);
  }
}

function start() {
  window.__lab!.style = current?.id ?? null;
  window.__lab!.setupRan = false;
  if (!root || !current?.setup || window.__lab!.reduced) { stopCurrent = () => {}; return; }
  const { run, stop } = makeKit(root);
  run(current.setup);
  window.__lab!.setupRan = true;
  stopCurrent = stop;
}

// Before the first render: mark the page and inject the style's CSS into the lab layer, so the first
// paint is already styled and nothing flashes.
export function applyStyleCss() {
  window.__lab = { style: current?.id ?? null, styles: styles.map((s) => s.id), setupRan: false, reduced: matchMedia("(prefers-reduced-motion: reduce)").matches };
  injectCss(current);
}

// After mount: run the style's setup unless the reader asked for reduced motion.
export function runStyle(el: HTMLElement) {
  root = el;
  start();
  return () => { stopCurrent(); root = null; };
}

// Live switch, no reload: undo the running style (its tweens are reverted, its listeners removed), go
// back to the top, swap the CSS, start the new one. The address follows when the page allows it.
export function setStyle(id: string | null) {
  stopCurrent();
  current = find(id);
  window.scrollTo(0, 0);
  injectCss(current);
  requestAnimationFrame(() => {
    start();
    listeners.forEach((f) => f(current?.id ?? null));
  });
  try {
    const url = new URL(location.href);
    if (hosted) url.hash = id ?? "base";
    else if (id) url.searchParams.set("style", id);
    else url.searchParams.delete("style");
    history.replaceState(null, "", url);
  } catch { /* a sandboxed frame may refuse; the switch itself has happened */ }
}
