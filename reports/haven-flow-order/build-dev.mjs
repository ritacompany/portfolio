// Builds the flow order proposal at site/dev/haven-flow-order/ from the live Haven page.
// The live files are read, never written. The dev copy rewrites its relative URLs to /haven/ so every
// asset resolves to the live page, and loads its own haven.js with the corrected flow order.
// Run from the repo root: node reports/haven-flow-order/build-dev.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "site/haven/";
const OUT = "site/dev/haven-flow-order/";
mkdirSync(OUT, { recursive: true });

function swap(text, from, to, label) {
  if (!text.includes(from)) throw new Error("not found: " + label);
  return text.replace(from, to);
}

let html = readFileSync(SRC + "index.html", "utf8");
// Point every page relative URL at the live page, so the copy loads the same assets from /haven/.
html = html.replace(/(\s(?:src|href|srcset|poster|data-[a-z-]+))="(?!\/|https?:|mailto:|data:|#)((?:\.\.\/)?[\w.\/-]+\.(?:js|css|svg|webp|png|jpe?g|woff2|mp4|glb|json))"/g,
  (m, attr, url) => `${attr}="${url.startsWith("../") ? url.slice(2) : "/haven/" + url}"`);
html = swap(html,
  'aria-label="Revised flow: identity quiz, review matches, intro chat, schedule a chat, select a Confidante"',
  'aria-label="Revised flow: identity quiz, review matches, schedule a chat, intro chat, select a Confidante"',
  "aria-label");
// Starting order: Schedule a chat now comes before Intro chat (slots 4 and 5).
html = swap(html,
  '<li class="flow__step" data-id="intro"><span>Intro\nchat</span></li>\n              <li class="flow__step" data-id="schedule"><span>Schedule\na chat</span></li>',
  '<li class="flow__step" data-id="schedule"><span>Schedule\na chat</span></li>\n              <li class="flow__step" data-id="intro"><span>Intro\nchat</span></li>',
  "flow steps");
html = swap(html, '<script src="/haven/haven.js">', '<script src="/dev/haven-flow-order/haven.js">', "haven.js");
html = swap(html, "<title>Haven case study</title>", "<title>Haven case study (flow order proposal)</title>", "title");
writeFileSync(OUT + "index.html", html);

let js = readFileSync(SRC + "haven.js", "utf8");
js = swap(js,
  "var start = { quiz: 0, review: 1, select: 2, intro: 3, schedule: 4 };",
  "var start = { quiz: 0, review: 1, select: 2, schedule: 3, intro: 4 };",
  "start map");
js = swap(js,
  "function endState() { sel.style.transform = X(4); by.intro.style.transform = X(2); by.schedule.style.transform = X(3); }",
  "function endState() { sel.style.transform = X(4); by.schedule.style.transform = X(2); by.intro.style.transform = X(3); }",
  "end state");
js = swap(js,
  "slide(by.intro, 3, 300, 560);\n      slide(by.schedule, 4, 360, 560);",
  "slide(by.schedule, 3, 300, 560);\n      slide(by.intro, 4, 360, 560);",
  "slides");
writeFileSync(OUT + "haven.js", js);
console.log("BUILD_DEV_OK");
