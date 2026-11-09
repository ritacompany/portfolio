// Builds the preview of the site that Chadwick tries in the review loop (docs/SITE_BUILD_PLAN.md).
// Copies the site folder without dev, motion-lab and lib, and rewrites root paths to relative ones so
// the copy works at the artifact address. Usage: node scripts/build-preview.mjs site <out dir>, then
// publish <out dir>/index.html with the Artifact tool to https://claude.ai/artifact/WEWiXsm3fsWdV2gd7z5BST
// (root <out dir>, every other file in files).
// Review tools and proposals in site/dev/preview/ (the type review tool, CSS he tries before a change
// moves into the site) are copied to preview/ and added to every page. They never reach the real site.
import { cpSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
const [src, out] = process.argv.slice(2);
cpSync(src, out, { recursive: true, filter: (p) => !/\/(dev|motion-lab|lib)(\/|$)/.test(relative(src, p) ? "/" + relative(src, p) : "") });
const tools = join(src, "dev/preview");
const extras = existsSync(tools) ? readdirSync(tools).filter((f) => /\.(css|js)$/.test(f)).sort() : [];
if (extras.length) cpSync(tools, join(out, "preview"), { recursive: true });
const walk = (d) => readdirSync(d).flatMap((f) => statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]);
for (const f of walk(out).filter((f) => f.endsWith(".html"))) {
  const up = relative(dirname(f), out) || ".";
  let s = readFileSync(f, "utf8");
  s = s.replace(/(src|href)="\/([^"]*)"/g, (m, a, p) => {
    let [path, hash] = p.split("#");
    if (path === "" || path.endsWith("/")) path += "index.html";
    return `${a}="${up}/${path}${hash !== undefined ? "#" + hash : ""}"`;
  });
  if (extras.length && !relative(out, f).startsWith("preview/")) {
    s = s.replace("</head>", extras.filter((x) => x.endsWith(".css")).map((x) => `  <link rel="stylesheet" href="${up}/preview/${x}">\n`).join("") + "</head>");
    s = s.replace("</body>", extras.filter((x) => x.endsWith(".js")).map((x) => `<script src="${up}/preview/${x}" defer></script>\n`).join("") + "</body>");
  }
  writeFileSync(f, s);
}
console.log("preview at", out, walk(out).length, "files");
// His hover rule: nothing moves on hover, ever. The preview is not built if any hover moves a letter.
import { spawnSync } from "node:child_process";
const check = spawnSync(process.execPath, [new URL("verify-hover-still.mjs", import.meta.url).pathname, out], { encoding: "utf8" });
process.stdout.write(check.stdout); process.stderr.write(check.stderr);
if (check.status !== 0) { console.error("preview refused: a hover moves something (scripts/verify-hover-still.mjs)"); process.exit(1); }
