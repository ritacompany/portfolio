// Phase 0 gate G1: site/css/tokens.css against the values read live from Figma file
// 5RO0m4bYYrTvbiaOgaU3tI on 8 Nov 2026 (local Portfolio and Haven collections, twelve text styles).
// The expected values below are copied from that Figma read, not from tokens.css.
// Prints TOKENS_OK and exits 0 only when every value matches.

import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../site/css/tokens.css", import.meta.url), "utf8");
const vars = Object.fromEntries([...css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]));
const resolve = (v, depth = 0) => {
  const m = /^var\((--[\w-]+)\)$/.exec(v || "");
  return m && depth < 5 ? resolve(vars[m[1]], depth + 1) : v;
};

const portfolio = {
  "Neutral/000": "#ffffff", "Neutral/050": "#f2f1f8", "Neutral/100": "#e8e7ee", "Neutral/200": "#dedee5",
  "Neutral/300": "#d2d2db", "Neutral/400": "#c9c9d4", "Neutral/500": "#aeaeb4", "Neutral/525": "#90909d",
  "Neutral/550": "#7b7b86", "Neutral/575": "#65656e", "Neutral/590": "#4b4b52", "Neutral/600": "#38383d",
  "Neutral/650": "#36363c", "Neutral/675": "#28282b", "Neutral/700": "#1d1d21", "Neutral/800": "#121214",
  "Neutral/825": "#0e0e0f", "Neutral/850": "#0b0b0d", "Neutral/900": "#040405", "Neutral/1000": "#000000",
  "Babylon/100": "#01f76c", "Babylon/200": "#00c455", "Babylon/300": "#0aa04b", "Babylon/400": "#077938",
  "Babylon/500": "#015224", "Bloom/100": "#9090f7", "Bloom/200": "#301687", "xoxo/100": "#f47f97",
  "xoxo/200": "#d2142a", "Juice/100": "#dfec90", "Juice/200": "#849906", "Barney/100": "#d236fd",
  "Barney/200": "#5c1071", "Metadata/12": "#e8e7ee"
};
const haven = {
  "Violet/200": "#db98ff", "Mantis/Bright": "#71f949", "Nimbus/300": "#6854ec",
  "Violet/300": "#d080fc", "Goldfish/500": "#d2401f", "Mantis/500": "#78b765"
};
// [name, weight, size px, line height ratio, tracking ratio]
const type = [
  ["Display/212", 400, 212, 0.83, -0.055], ["Display/96", 500, 96, 0.98, -0.04],
  ["Heading/64", 500, 64, 1.09, -0.04], ["Heading/40", 500, 40, 1.15, -0.04],
  ["Heading/24", 500, 24, 1.16, -0.04], ["Heading/20", 500, 20, 1.32, -0.02],
  ["Body/16", 400, 16, 1.4, -0.01], ["Body/16 M", 500, 16, 1.32, -0.01],
  ["Label/14", 400, 14, 1.4, 0.02], ["Label/14 C", 400, 14, 1, 0.06],
  ["Label/12", 400, 12, 1.4, 0.04], ["Label/12 C", 400, 12, 1.4, 0.1]
];

const cssName = (prefix, name) => "--" + prefix + name.toLowerCase().replace(/\//g, "-").replace(/ /g, "-");
const problems = [];
let checked = 0;

for (const [prefix, set] of [["", portfolio], ["haven-", haven]]) {
  for (const [name, hex] of Object.entries(set)) {
    const key = cssName(prefix, name);
    const got = resolve(vars[key]);
    checked++;
    if (!got) problems.push(`${name}: ${key} missing`);
    else if (got.toLowerCase() !== hex) problems.push(`${name}: ${key} is ${got}, Figma ${hex}`);
  }
}

for (const [name, weight, size, lh, track] of type) {
  const key = cssName("", name);
  checked++;
  const m = /^(\d{3})\s+([\d.]+)px\/([\d.]+)\s+var\(--font\)$/.exec(vars[key] || "");
  if (!m) { problems.push(`${name}: ${key} missing or not a font shorthand (${vars[key]})`); continue; }
  if (+m[1] !== weight) problems.push(`${name}: weight ${m[1]}, Figma ${weight}`);
  if (+m[2] !== size) problems.push(`${name}: size ${m[2]}, Figma ${size}`);
  if (Math.abs(+m[3] - lh) > 0.005) problems.push(`${name}: line height ${m[3]}, Figma ${lh}`);
  const t = /^(-?[\d.]+)em$/.exec(vars[key + "-track"] || "");
  if (!t) problems.push(`${name}: ${key}-track missing or not em (${vars[key + "-track"]})`);
  else if (Math.abs(+t[1] - track) > 0.0005) problems.push(`${name}: tracking ${t[1]}em, Figma ${track}em`);
}

if (problems.length) { console.error(problems.join("\n")); console.error(`tokens: ${problems.length} problem(s)`); process.exit(1); }
console.log(`TOKENS_OK ${checked} tokens (${Object.keys(portfolio).length} Portfolio, ${Object.keys(haven).length} Haven, ${type.length} type)`);
