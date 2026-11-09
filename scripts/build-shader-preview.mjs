// Builds the homepage preview with the Mesh drift background and its live editor (site/dev/shader/).
// Runs the normal preview build (scripts/build-preview.mjs), then adds the shader to the homepage only.
// Usage: node scripts/build-shader-preview.mjs <out dir>, then publish <out dir>/index.html with the
// Artifact tool (root <out dir>, every other file in files). Nothing here touches the real site.
import { spawnSync } from "node:child_process";
import { cpSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
const out = process.argv[2];
if (!out) { console.error("usage: node scripts/build-shader-preview.mjs <out dir>"); process.exit(1); }
const root = new URL("..", import.meta.url).pathname;
rmSync(out, { recursive: true, force: true });
const r = spawnSync(process.execPath, [join(root, "scripts/build-preview.mjs"), join(root, "site"), out], { stdio: "inherit" });
if (r.status !== 0) process.exit(r.status);
cpSync(join(root, "site/dev/shader"), join(out, "shader"), { recursive: true });
const page = join(out, "index.html");
let s = readFileSync(page, "utf8");
s = s.replace(/<title>[^<]*<\/title>/, "<title>Mesh drift background</title>"); // keeps the preview apart from the site preview
s = s.replace("</head>", '  <link rel="stylesheet" href="./shader/mesh-drift.css">\n</head>');
s = s.replace("</body>", '<script src="./shader/mesh-drift.js" defer></script>\n</body>');
writeFileSync(page, s);
console.log("shader added to", page);
