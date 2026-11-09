// Builds the preview of the site that Chadwick tries in the review loop (docs/SITE_BUILD_PLAN.md).
// Copies the site folder without dev, motion-lab and lib, and rewrites root paths to relative ones so
// the copy works at the artifact address. Usage: node scripts/build-preview.mjs site <out dir>, then
// publish <out dir>/index.html with the Artifact tool to https://claude.ai/artifact/WEWiXsm3fsWdV2gd7z5BST
// (root <out dir>, every other file in files).
import { cpSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
const [src, out] = process.argv.slice(2);
cpSync(src, out, { recursive: true, filter: (p) => !/\/(dev|motion-lab|lib)(\/|$)/.test(relative(src, p) ? "/" + relative(src, p) : "") });
const walk = (d) => readdirSync(d).flatMap((f) => statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]);
for (const f of walk(out).filter((f) => f.endsWith(".html"))) {
  const up = relative(dirname(f), out) || ".";
  let s = readFileSync(f, "utf8");
  s = s.replace(/(src|href)="\/([^"]*)"/g, (m, a, p) => {
    let [path, hash] = p.split("#");
    if (path === "" || path.endsWith("/")) path += "index.html";
    return `${a}="${up}/${path}${hash !== undefined ? "#" + hash : ""}"`;
  });
  writeFileSync(f, s);
}
console.log("preview at", out, walk(out).length, "files");
