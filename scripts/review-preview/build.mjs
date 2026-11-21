// Builds a review preview: one site page plus everything it loads, with root paths made relative,
// wrapped in a viewer that shows the real page at 390, 768 and 1440 (phone, tablet, desktop).
// Publish the output folder with the Artifact tool: index.html is the page, every other file goes in `files`.
// Usage: node scripts/review-preview/build.mjs <site page dir, e.g. mondai/framework> <out dir> "<Name>"
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const [pageDir, out, name = "Page preview"] = process.argv.slice(2);
if (!pageDir || !out) { console.error("usage: build.mjs <page dir> <out dir> \"<Name>\""); process.exit(1); }
const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, "..", "..", "site");

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "assets"), { recursive: true });
for (const d of ["css", "js", "vendor"]) cpSync(join(site, d), join(out, d), { recursive: true });
for (const d of readdirSync(join(site, "assets"))) {
  const p = join(site, "assets", d);
  if (statSync(p).isDirectory()) cpSync(p, join(out, "assets", d), { recursive: true });
}

// Stylesheets live one level down (css/), so a root path such as url("/assets/x") becomes url("../assets/x").
for (const f of readdirSync(join(out, "css"))) {
  if (!f.endsWith(".css")) continue;
  const p = join(out, "css", f);
  writeFileSync(p, readFileSync(p, "utf8").replace(/url\((["']?)\/(?!\/)/g, "url($1../"));
}

let html = readFileSync(join(site, pageDir, "index.html"), "utf8");
html = html
  .replace(/(src|href)="\/(assets|css|js|vendor)\//g, '$1="$2/')
  .replace(/href="\/[^"]*"/g, 'href="#"')
  .replace(/url\((["']?)\/(?!\/)/g, "url($1");
writeFileSync(join(out, "page.html"), html);

const viewer = readFileSync(join(here, "viewer.html"), "utf8")
  .replaceAll("__TITLE__", `${name} review`).replaceAll("__NAME__", name);
writeFileSync(join(out, "index.html"), viewer);

const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(relative(out, p)); } })(out);
writeFileSync(join(out, "files.json"), JSON.stringify(files.filter(f => f !== "index.html" && f !== "files.json").map(path => ({ path }))));
console.log(`PREVIEW_BUILT ${files.length - 2} files; publish ${join(out, "index.html")} with root ${out} and files from files.json`);
