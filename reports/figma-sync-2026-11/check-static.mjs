// Static gates for the 11 Nov Figma sync.
//   ascii  no box-drawing or block characters and no "systems thinker" mono stack on Home or Haven.
//          Self-test first: the same matcher must catch a planted sample, or the gate fails.
//   hex    home.css and components.css carry no hex colour; haven.css carries hex only inside :root,
//          apart from #ececf4 (the phone screen white, no Figma variable, untouched by this sync).
// Usage: node reports/figma-sync-2026-11/check-static.mjs ascii|hex
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const repo = resolve(new URL("../..", import.meta.url).pathname);
const mode = process.argv[2];
const read = (p) => readFileSync(join(repo, p), "utf8");

if (mode === "ascii") {
  const bad = /[─-▟]|systems thinker|JetBrains Mono/i;
  if (!bad.test("x ╔═╗ y") || !bad.test("Systems thinker.")) { console.error("matcher self-test failed"); process.exit(1); }
  const files = ["site/index.html", "site/css/home.css", "site/css/components.css", "site/css/tokens.css", "site/css/base.css",
    "site/haven/index.html", "site/haven/haven.css", "site/haven/current.css", "site/haven/finale.css"];
  const hits = files.filter((f) => bad.test(read(f)));
  if (hits.length) { console.error("ASCII banner material in: " + hits.join(", ")); process.exit(1); }
  console.log(`ASCII_ABSENT ${files.length} files`);
} else if (mode === "hex") {
  const problems = [];
  for (const f of ["site/css/home.css", "site/css/components.css"]) {
    const m = read(f).match(/#[0-9a-fA-F]{3,8}\b/g);
    if (m) problems.push(`${f}: ${m.join(" ")}`);
  }
  let inRoot = false; const outside = [];
  for (const line of read("site/haven/haven.css").split("\n")) {
    if (/^:root\s*\{/.test(line)) inRoot = true;
    if (!inRoot) outside.push(...(line.match(/#[0-9a-fA-F]{6}\b/g) || []));
    if (inRoot && /^\}/.test(line)) inRoot = false;
  }
  const extra = outside.filter((h) => h.toLowerCase() !== "#ececf4");
  if (extra.length) problems.push(`haven.css outside :root: ${extra.join(" ")}`);
  if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
  console.log("HEX_OK");
} else { console.error("usage: ascii|hex"); process.exit(1); }
