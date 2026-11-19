// Holds the style contract in the source: a style may change motion, scroll, transitions, rhythm and
// accents, never his type or colours. Every file under src/lab/styles is scanned for colour literals and
// type declarations. Colour accents use his tokens (var(--neutral-200) and so on).
// A planted fixture runs through the same rules first, so a lint that cannot fail is caught.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const HERE = resolve(import.meta.dirname, "..");
const DIR = join(HERE, "src/lab/styles");

const RULES = [
  ["colour literal (hex)", /#[0-9a-fA-F]{3,8}\b/],
  ["colour function", /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/i],
  ["named colour", /(?:^|[:\s,(])(white|black|red|green|blue|gray|grey|silver|yellow|orange|purple|pink)(?=[\s;,)!'"]|$)/i],
  ["type declaration in CSS", /(?:^|[;{\s])(?:font|font-family|font-size|font-weight|font-style|letter-spacing|line-height|text-transform|word-spacing)\s*:/],
  ["type or colour property set from script", /\b(?:fontSize|fontFamily|fontWeight|letterSpacing|lineHeight|textTransform|color|backgroundColor|borderColor)\s*:/],
  ["colour property in CSS", /(?:^|[;{\s])(?:color|-webkit-text-fill-color|-webkit-text-stroke(?:-color)?)\s*:/],
];
// Lines that are only a comment are skipped, so prose can name what a style must not do.
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).split("\n").map((l) => (/^\s*\/\//.test(l) ? "" : l.replace(/\s\/\/.*$/, "")));

function lint(name, src) {
  const out = [];
  strip(src).forEach((line, i) => {
    for (const [what, re] of RULES) if (re.test(line)) out.push(`${name}:${i + 1} ${what}: ${line.trim()}`);
  });
  return out;
}

const fixture = `.works { padding-bottom: 400px; }\n.about__body { color: #fff; font-size: 21px; }\nel.style.letterSpacing = "1px";\nx = { color: "white" };\n`;
const caught = lint("fixture", fixture);
if (caught.length < 4) { console.log(`FAIL control: the planted fixture raised ${caught.length} of 4`); process.exit(1); }

const files = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : /\.(css|ts|tsx|js)$/.test(f) && files.push(p); } };
walk(DIR);
const problems = files.flatMap((f) => lint(relative(HERE, f), readFileSync(f, "utf8")));
problems.forEach((p) => console.log(`FAIL ${p}`));
if (problems.length) process.exit(1);
console.log(`STYLE_LINT_OK ${files.length} files clean, control raised ${caught.length}`);
