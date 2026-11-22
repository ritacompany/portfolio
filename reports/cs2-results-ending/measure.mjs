// CS2 results ending (20 Nov). Measures the ending's parts at 1440: the preview he reviewed
// (portfolio/reference/cs2/review-2026-11-07/ending-filled-preview.html) and the built section, in the same
// terms: each part's first cap top and last baseline from the top of the ending, and the ending's height.
// "node measure.mjs" prints both tables and ENDING_1440_OK when every part is within 1.5 px of the preview.
import { resolve } from "node:path";
import { serve, chromium, open } from "../framework-tablet-2/serve.mjs";
const PREVIEW = resolve(process.env.HOME, "Code/portfolio/reference/cs2/review-2026-11-07/ending-filled-preview.html");
const PARTS = ["eyebrow", "title", "ctx", "stats", "passed", "key", "close"];

const probeFn = (map) => {
  // cap top and baseline of an element's first and last line, measured with trim probes in its own font
  const capAndBase = (e) => {
    const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    if (cs.textBoxTrim && cs.textBoxTrim !== "none") return { cap: r.top, base: r.bottom };
    const p = document.createElement("p");
    p.textContent = "Hx";
    p.style.cssText = `position:absolute;left:0;top:0;margin:0;padding:0;white-space:nowrap;font:${cs.font};letter-spacing:${cs.letterSpacing}`;
    document.body.append(p);
    const h = (t) => { p.style.textBox = t; return p.getBoundingClientRect().height; };
    const full = h("none"), capOff = full - h("trim-start cap alphabetic"), baseOff = full - h("trim-end cap alphabetic");
    p.remove();
    return { cap: r.top + capOff, base: r.bottom - baseOff };
  };
  const root = document.querySelector(map.root), top = root.getBoundingClientRect().top, out = { height: root.getBoundingClientRect().height };
  for (const [k, sel] of Object.entries(map.parts)) {
    const els = [...root.querySelectorAll(sel)];
    if (!els.length) { out[k] = null; continue; }
    // first text leaf at the top, last at the bottom
    const leaves = els.flatMap((e) => [e, ...e.querySelectorAll("*")]).filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
    const first = leaves.reduce((a, c) => (c.getBoundingClientRect().top < a.getBoundingClientRect().top ? c : a));
    const last = leaves.reduce((a, c) => (c.getBoundingClientRect().bottom > a.getBoundingClientRect().bottom ? c : a));
    const blocks = els.map((e) => e.getBoundingClientRect());
    out[k] = { cap: Math.round((capAndBase(first).cap - top) * 10) / 10, base: Math.round((capAndBase(last).base - top) * 10) / 10, left: Math.round(Math.min(...blocks.map((r) => r.left))) };
  }
  return out;
};

const b = await chromium.launch();
const p1 = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p1.goto("file://" + PREVIEW);
await p1.evaluate(() => document.fonts.ready);
const prev = await p1.evaluate(probeFn, { root: "#board", parts: { eyebrow: ".eyebrow", title: ".title", ctx: ".ctx", stats: ".stats", passed: ".bar-line", key: ".close__key", close: "p.close" } });
const { server, base } = await serve(false);
const p2 = await open(b, base, 1440);
const built = await p2.evaluate(probeFn, { root: '[data-figma-node="5812:21559"]', parts: { eyebrow: ".fw-end__eyebrow", title: ".fw-end__title", ctx: ".fw-end__ctx", stats: ".fw-end__stats", passed: ".fw-end__passed", key: ".fw-end__key", close: ".fw-end__close" } });
b.close(); server.close();

const bad = [];
console.log("part      preview cap/base/left      built cap/base/left");
for (const k of PARTS) {
  const a = prev[k], c = built[k];
  console.log(k.padEnd(9), JSON.stringify(a).padEnd(32), JSON.stringify(c));
  if (!c) { bad.push(`${k} missing`); continue; }
  for (const f of ["cap", "base", "left"]) if (Math.abs(a[f] - c[f]) > 1.5) bad.push(`${k} ${f}: preview ${a[f]}, built ${c[f]}`);
}
console.log(`height    ${prev.height}   ${built.height}`);
if (Math.abs(prev.height - built.height) > 1.5) bad.push(`height: preview ${prev.height}, built ${built.height}`);
if (bad.length) { console.log(bad.join("\n")); process.exit(1); }
console.log("ENDING_1440_OK 7 parts and height");
