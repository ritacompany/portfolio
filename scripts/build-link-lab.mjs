// Builds the link states lab (site/dev/link-lab) as one folder that works at an artifact address: the page at
// the root, the site's own tokens, base and components CSS beside it, and only the fonts and icons it uses.
// Root paths become relative. Usage: node scripts/build-link-lab.mjs <out dir>. Prints the files to publish.
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const out = resolve(process.argv[2] || "link-lab-build");
const site = new URL("../site/", import.meta.url).pathname;
const lab = join(site, "dev/link-lab");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = [
  "css/tokens.css", "css/base.css", "css/components.css",
  "assets/fonts/satoshi-400.woff2", "assets/fonts/satoshi-500.woff2", "assets/fonts/satoshi-700.woff2",
  "assets/fonts/heebo-var-latin.woff2", "assets/fonts/plex-mono-400.woff2",
  "assets/ui/arrow-out.svg", "assets/ui/arrow-up.svg", "assets/ui/chevron-left.svg", "assets/ui/ctx-arrow.svg", "assets/ui/lock.svg",
];
for (const f of files) { mkdirSync(join(out, f, ".."), { recursive: true }); cpSync(join(site, f), join(out, f)); }

const rel = (s) => s.replace(/\/dev\/link-lab\//g, "").replace(/(["'(])\/(css|assets)\//g, "$1$2/");
writeFileSync(join(out, "index.html"), rel(readFileSync(join(lab, "index.html"), "utf8")));
writeFileSync(join(out, "lab.js"), rel(readFileSync(join(lab, "lab.js"), "utf8")));
writeFileSync(join(out, "lab.css"), readFileSync(join(lab, "lab.css"), "utf8").replace(/\.\.\/\.\.\/assets\//g, "assets/"));

const all = [...files, "lab.js", "lab.css"];
console.log("link lab built at", out);
console.log(JSON.stringify(Object.fromEntries(all.map((f) => [f, join(out, f)]))));
