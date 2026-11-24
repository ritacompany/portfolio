// Records a phone scroll through one section of Haven to a video for the canvas.
// Usage: node record.mjs <out.webm> <selector> <width> [--css a.css,b.css] [--js a.js]
import { createRequire } from "node:module";
import { readFileSync, renameSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
const argv = process.argv.slice(2); const [out, sel, width] = argv; const w = +width;
const opt = (n) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null);
const repo = resolve(new URL("../..", import.meta.url).pathname);
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch(); const h = Math.round(w * 2.16); const dir = join(dirname(resolve(out)), ".rec"); mkdirSync(dir, { recursive: true });
const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, recordVideo: { dir, size: { width: w * 2, height: h * 2 } } });
const p = await ctx.newPage();
await p.goto("http://localhost:8123/haven/", { waitUntil: "networkidle" });
for (const c of (opt("--css") || "").split(",").filter(Boolean)) await p.addStyleTag({ content: readFileSync(join(repo, c), "utf8") });
for (const j of (opt("--js") || "").split(",").filter(Boolean)) await p.addScriptTag({ type: "module", url: "/" + j.replace(/^site\//, "") });
const top = await p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
for (let y = 0; y < top - h; y += w) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(40); }
await p.evaluate((y) => scrollTo(0, y), top - h * 1.05); await p.waitForTimeout(1200);
for (let i = 0; i <= 120; i++) { await p.evaluate((y) => scrollTo(0, y), top - h * 1.05 + i * (h * 1.35 / 120)); await p.waitForTimeout(33); }
await p.waitForTimeout(3500);
const v = p.video(); await ctx.close(); renameSync(await v.path(), resolve(out)); await b.close(); console.log("saved", out);
