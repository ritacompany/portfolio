// Builds site/dev/haven-flow-vertical/: the flow order proposal with the phone flow at the sizes in his
// Figma frame "Haven phone, journey flow (390, sizes as built 23 Nov)" (6394:30516), read 25 Nov.
// Run build-dev.mjs first; this reads its output and never writes site/haven.
// Run from the repo root: node reports/haven-flow-order/build-vertical.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "site/dev/haven-flow-order/";
const OUT = "site/dev/haven-flow-vertical/";
mkdirSync(OUT, { recursive: true });
function swap(text, from, to, label) {
  if (!text.includes(from)) throw new Error("not found: " + label);
  return text.replace(from, to);
}

// Figma frame values, in px at 390 wide (FIGMA in the CSS below carries the same numbers).
// Circle 151.6, row pitch 151.6 + 16 = 167.6, number column 48 wide at x 46, circle at x 142.5.

let html = readFileSync(SRC + "index.html", "utf8");
html = swap(html, '<script src="/dev/haven-flow-order/haven.js">', '<script src="/dev/haven-flow-vertical/haven.js">', "haven.js");
html = swap(html, "(flow order proposal)", "(vertical flow proposal)", "title");
html = swap(html, '<link rel="stylesheet" href="/haven/pill-tips.css">', '<link rel="stylesheet" href="/haven/pill-tips.css">\n<link rel="stylesheet" href="/dev/haven-flow-vertical/vertical.css">', "css");
writeFileSync(OUT + "index.html", html);

let js = readFileSync(SRC + "haven.js", "utf8");
// The column uses its own pitch at a scale of 1, so the stage is drawn in his frame's px.
js = swap(js, "var P = 160, DT = 1700,", "var P = 160, PV = 167.6, CV = 151.6, DT = 1700,", "pitch");
js = swap(js, "var d = slot * P;", "var d = slot * (vertical ? PV : P);", "X");
js = swap(js, 'if (vertical) { n.style.left = "0px"; n.style.top = (i * P + 137 / 2 - 11) + "px"; }',
  'if (vertical) { n.style.left = "0px"; n.style.top = (i * PV + CV / 2) + "px"; }', "numbers");
js = swap(js, 'stage.style.setProperty("--flow-scale", String(vertical ? 0.75 : box.clientWidth / 777));',
  'stage.style.setProperty("--flow-scale", String(vertical ? 1 : box.clientWidth / 777));', "scale");
writeFileSync(OUT + "haven.js", js);
console.log("BUILD_VERTICAL_OK");
