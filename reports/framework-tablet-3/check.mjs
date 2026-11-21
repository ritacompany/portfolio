// Round 3 check: the framework page against Haven at tablet, and nothing moved where round 3 should not reach.
//  1. Hero, at 768, 1024, 1150 and 1180: the title's left edge within 2 px of Haven's, the hero text's left edge
//     and width within 8 px of Haven's, the tagline width within 8 px.
//  2. At 1180 the page is in its desktop composition, as Haven is (Haven's tablet ends at 1159).
//  3. Body text (outside the hero) is at most 520 wide at 768, 1024 and 1150, and at least one block reaches 520.
//  4. Route swap: at 390, 1200 and 1440 every element box on the framework page is identical with framework.css
//     as committed at BASE (default HEAD) and as it is now. Control: at 768 the two differ.
// Prints ROUND3_OK only when every part passes.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const BASE = process.env.BASE || "HEAD";
const baseCss = execFileSync("git", ["-C", repo, "show", `${BASE}:site/css/framework.css`]);
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  let p = resolve(join(root, normalize(decodeURIComponent(u.pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) return res.writeHead(403).end();
  // the page asks for /css/framework.css; a ?base cookie on the request picks the committed copy
  const base = (req.headers.cookie || "").includes("css=base");
  let body;
  try { body = base && p.endsWith(join("css", "framework.css")) ? baseCss : readFileSync(p); } catch { return res.writeHead(404).end(); }
  res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream", "cache-control": "no-store" }).end(body);
});
await new Promise((r) => server.listen(0, r));
const origin = `http://localhost:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
const problems = [];

async function open(path, w, css) {
  const ctx = await b.newContext({ viewport: { width: w, height: 1000 }, reducedMotion: "reduce" });
  if (css) await ctx.addCookies([{ name: "css", value: css, url: origin }]);
  const page = await ctx.newPage();
  await page.goto(origin + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  return { page, ctx };
}
const heroHaven = () => {
  const R = (s) => document.querySelector(s).getBoundingClientRect();
  const tag = document.querySelector(".hero__tagline span"), txt = document.querySelector(".hero__background p");
  return { title: R(".hero .display").left, tagline: tag.getBoundingClientRect().width, textX: txt.getBoundingClientRect().left, textW: txt.getBoundingClientRect().width };
};
const heroFw = () => {
  const q = (n) => document.querySelector(`[data-figma-node="${n}"]`);
  const z = parseFloat(getComputedStyle(document.querySelector(".fw")).zoom) || 1;
  const t = q("5812:16453"), rg = document.createRange(); rg.selectNodeContents(t);
  const para = q("5812:16468").querySelector(".para") || q("5812:16468");
  return { title: t.getBoundingClientRect().left, tagline: q("5812:16466").getBoundingClientRect().width, textX: para.getBoundingClientRect().left, textW: para.getBoundingClientRect().width, z };
};

for (const w of [768, 1024, 1150, 1180]) {
  const H = await open("/haven/", w); const hv = await H.page.evaluate(heroHaven); await H.ctx.close();
  const F = await open("/mondai/framework/", w); const fw = await F.page.evaluate(heroFw);
  const near = (k, tol) => { if (Math.abs(hv[k] - fw[k]) > tol) problems.push(`${w} hero ${k}: Haven ${hv[k].toFixed(1)}, framework ${fw[k].toFixed(1)}`); };
  near("title", 2); near("textX", 8); near("textW", 8); near("tagline", 8);
  // 1180 is past Haven's tablet edge (1160): both pages are in their desktop composition, the framework page
  // scaled from 1440 by the window (zoom 1180 / 1440), as it is from 1200 up.
  if (w === 1180 && Math.abs(fw.z - 1180 / 1440) > 0.002) problems.push(`1180 not in the desktop composition (zoom ${fw.z})`);
  if (w < 1160) {
    const widths = await F.page.evaluate(() => [...document.querySelectorAll(".fw-sec > .s-body-16")].filter((e) => !e.closest('[data-figma-node="5812:16447"]') && e.dataset.figmaNode !== "5812:17137") /* his tablet frame sets the Calendar answers to 578 (21 Nov) */.map((e) => e.getBoundingClientRect().width));
    const max = Math.max(...widths);
    if (max > 520.5) problems.push(`${w} body ${max.toFixed(0)} wide, want at most 520`);
    if (max < 519.5) problems.push(`${w} no body block reaches 520 (widest ${max.toFixed(0)})`);
  }
  await F.ctx.close();
}

const boxes = () => [...document.querySelectorAll(".fw *")].map((e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.left)},${Math.round(r.top + scrollY)},${Math.round(r.width)},${Math.round(r.height)}`; }).join(" ");
for (const w of [390, 768, 1200, 1440]) {
  const A = await open("/mondai/framework/", w, "base"); const a = await A.page.evaluate(boxes); await A.ctx.close();
  const N = await open("/mondai/framework/", w); const n = await N.page.evaluate(boxes); await N.ctx.close();
  if (w === 768) { if (a === n) problems.push("control: 768 is identical before and after, so the swap is not swapping"); }
  else if (a !== n) problems.push(`${w}: element boxes moved against ${BASE}`);
}

await b.close(); server.close();
if (problems.length) { console.log(problems.join("\n") + `\n${problems.length} problems`); process.exit(1); }
console.log("ROUND3_OK");
