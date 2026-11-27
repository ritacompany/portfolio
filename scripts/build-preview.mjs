// Builds the preview of the site that Chadwick tries in the review loop (docs/SITE_BUILD_PLAN.md).
// Copies the site folder without dev, motion-lab and lib, and rewrites root paths to relative ones so
// the copy works at the artifact address. Usage: node scripts/build-preview.mjs HEAD <out dir> builds from
// the last commit (use this: the checkout is shared and holds other sessions' unsaved edits);
// node scripts/build-preview.mjs site <out dir> builds from the working tree. It ends by printing the
// Artifact publish call for the one preview link, PREVIEW_URL below.
// The link belongs to the claude.ai account Claude Code on his Mac is signed in to, so any session there
// can update it. Published 11 Nov 2026; the 9 Nov link before it was made on a different account and
// reads as not found from here.
export const PREVIEW_URL = "https://claude.ai/artifact/McviYhengPB92skSvB2YEu";
// Review tools and proposals in site/dev/preview/ (the type review tool, CSS he tries before a change
// moves into the site) are copied to preview/ and added to every page. They never reach the real site.
import { cpSync, readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";
let [src, out] = process.argv.slice(2);
import { execSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
if (!existsSync(src)) {
  // A git ref: build from what is committed, not from the shared working tree.
  const tmp = mkdtempSync(join(tmpdir(), "preview-src-"));
  const repo = new URL("..", import.meta.url).pathname;
  execSync(`git -C "${repo}" archive ${src} site | tar -x -C "${tmp}"`);
  console.log("built from", src, execSync(`git -C "${repo}" rev-parse --short ${src}`).toString().trim());
  src = join(tmp, "site");
}
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
    // A preview script whose first line says "preview: render-blocking" goes in the head with
    // blocking="render": the browser paints nothing of the page until it has run (deferred, so the page
    // is parsed). Used by card-transition.js, whose first frame must be the move, not an empty page.
    const blocking = (x) => readFileSync(join(tools, x), "utf8").split("\n", 1)[0].includes("preview: render-blocking");
    const js = extras.filter((x) => x.endsWith(".js"));
    s = s.replace("</head>", js.filter(blocking).map((x) => `  <script src="${up}/preview/${x}" defer blocking="render"></script>\n`).join("") + "</head>");
    s = s.replace("</body>", js.filter((x) => !blocking(x)).map((x) => `<script src="${up}/preview/${x}" defer></script>\n`).join("") + "</body>");
  }
  writeFileSync(f, s);
}
console.log("preview at", out, walk(out).length, "files");
// His hover rule: nothing moves on hover, ever. The preview is not built if any hover moves a letter.
import { spawnSync } from "node:child_process";
const check = spawnSync(process.execPath, [new URL("verify-hover-still.mjs", import.meta.url).pathname, out], { encoding: "utf8" });
process.stdout.write(check.stdout); process.stderr.write(check.stderr);
if (check.status !== 0) { console.error("preview refused: a hover moves something (scripts/verify-hover-still.mjs)"); process.exit(1); }
out = resolve(out);
const files = walk(out).map((f) => relative(out, f)).filter((f) => f !== "index.html").sort();
writeFileSync(join(out, "..", "publish-files.json"), JSON.stringify(files.map((path) => ({ path }))));
console.log(`publish: first Artifact read ${PREVIEW_URL} (a publish without that read is refused), then Artifact publish, url ${PREVIEW_URL}, file_path ${join(out, "index.html")}, root ${out},
  files = the list in ${join(out, "..", "publish-files.json")} (${files.length} files). Leave capabilities out so the db stays.`);
