// Builds the lab as one hosted page (a claude.ai Artifact) so it can be scrolled for real away from
// this machine: node scripts/hosted.mjs <out dir>
// The page's JS and CSS are inlined (the host only serves scripts from a few CDNs); images and fonts
// ship beside it as files and are referenced relative to the page. The host wraps the page in its own
// document and adds a small unlayered reset; the reverts at the end hand those properties back to the
// site CSS. It opens on the pixel breakup with the switcher and tuner showing.
import { execSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const HERE = resolve(import.meta.dirname, "..");
const out = resolve(process.argv[2] ?? join(HERE, "dist-hosted"));
const build = join(HERE, "dist-hosted-build");
rmSync(build, { recursive: true, force: true });
execSync(`npx vite build --base ./ --outDir ${build} --emptyOutDir`, {
  cwd: HERE, stdio: "inherit", env: { ...process.env, VITE_LAB_HOSTED: "1", VITE_LAB_START: "pixel-break" },
});
const appDir = join(build, "_app");
const files = readdirSync(appDir);
const rel = (s) => s.replace(/(["'(`])\/assets\//g, "$1./assets/");
const js = rel(readFileSync(join(appDir, files.find((f) => f.endsWith(".js"))), "utf8")).replace(/<\/script/gi, "<\\/script");
const css = rel(readFileSync(join(appDir, files.find((f) => f.endsWith(".css"))), "utf8")).replace(/<\/style/gi, "<\\/style");

const page = `<title>CHDWCK style lab</title>
<style>${css}</style>
<style>
/* The host's reset is unlayered, so it would beat every layered site rule; hand these back. */
:root { color-scheme: dark; }
body { font: revert-layer; color: revert-layer; background: var(--neutral-900); }
img { max-width: revert-layer; }
</style>
<div id="root"></div>
<script type="module">${js}</script>
`;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "index.html"), page);
cpSync(join(build, "assets"), join(out, "assets"), { recursive: true });
rmSync(build, { recursive: true, force: true });
const list = [];
const walk = (d, p = "") => { for (const f of readdirSync(d, { withFileTypes: true })) f.isDirectory() ? walk(join(d, f.name), `${p}${f.name}/`) : list.push(`${p}${f.name}`); };
walk(join(out, "assets"), "assets/");
writeFileSync(join(out, "files.json"), JSON.stringify(Object.fromEntries(list.map((f) => [f, f])), null, 1));
console.log(`HOSTED_OK ${out} index.html ${(page.length / 1024).toFixed(0)} KB, ${list.length} asset files`);
