// Builds site/dev/haven-flow-mobile/: the live Haven page with the phone journey flow redrawn to his Figma
// frame "haven update journey mobile" (6445:24415, read 25 Nov): a "Flow updates" heading over five rows of
// number, rule and label chip. Desktop and tablet are unchanged. The live files are read, never written.
// Run from the repo root: node reports/haven-flow-order/build-mobile.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "site/haven/";
const OUT = "site/dev/haven-flow-mobile/";
mkdirSync(OUT, { recursive: true });
function swap(text, from, to, label) {
  if (!text.includes(from)) throw new Error("not found: " + label);
  return text.replace(from, to);
}

let html = readFileSync(SRC + "index.html", "utf8");
html = html.replace(/(\s(?:src|href|srcset|poster|data-[a-z-]+))="(?!\/|https?:|mailto:|data:|#)((?:\.\.\/)?[\w.\/-]+\.(?:js|css|svg|webp|png|jpe?g|woff2|mp4|glb|json))"/g,
  (m, attr, url) => `${attr}="${url.startsWith("../") ? url.slice(2) : "/haven/" + url}"`);
html = swap(html, '<script src="/haven/haven.js">', '<script src="/dev/haven-flow-mobile/haven.js">', "haven.js");
html = swap(html, "<title>Haven case study</title>", "<title>Haven case study (phone flow proposal)</title>", "title");
html = swap(html, '<link rel="stylesheet" href="/haven/pill-tips.css">', '<link rel="stylesheet" href="/haven/pill-tips.css">\n<link rel="stylesheet" href="/dev/haven-flow-mobile/mobile.css">', "css");
// The phone labels from his frame (shorter than the desktop circles), and the heading above the list.
const phone = { quiz: "Identity quiz", review: "Review matches", select: "Select Confidante", schedule: "Schedule chat", intro: "Intro chat" };
for (const [id, label] of Object.entries(phone)) {
  html = html.replace(new RegExp(`(<li class="flow__step[^"]*" data-id="${id}")`), `$1 data-phone="${label}"`);
}
if ((html.match(/data-phone=/g) || []).length !== 5) throw new Error("phone labels");
html = swap(html, '<div class="flow tb-item" id="flow-map">', '<div class="flow tb-item" id="flow-map">\n          <p class="flow__label">Flow updates</p>', "heading");
writeFileSync(OUT + "index.html", html);

let js = readFileSync(SRC + "haven.js", "utf8");
// The phone list: rows 62 apart (33 chip + 29 gap) drawn at a scale of 1, so stage px are Figma px.
js = swap(js, "var P = 160, DT = 1700,", "var P = 160, PV = 62, CV = 33, DT = 1700,", "pitch");
js = swap(js, "var d = slot * P;", "var d = slot * (vertical ? PV : P);", "X");
js = swap(js, 'if (vertical) { n.style.left = "0px"; n.style.top = (i * P + 137 / 2 - 11) + "px"; }',
  'if (vertical) { n.style.left = "0px"; n.style.top = (i * PV + CV / 2) + "px"; }', "numbers");
js = swap(js, 'stage.style.setProperty("--flow-scale", String(vertical ? 0.75 : box.clientWidth / 777));',
  'stage.style.setProperty("--flow-scale", String(vertical ? 1 : box.clientWidth / 777));', "scale");
writeFileSync(OUT + "haven.js", js);
console.log("BUILD_MOBILE_OK");
