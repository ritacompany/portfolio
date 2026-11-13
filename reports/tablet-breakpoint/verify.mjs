// Checks T1 to T7 from ISSUES.md at 768, 834, 1024 and 1180, reduced motion on and off.
// Serves site/ itself, so it needs no running server. Prints TABLET_OK <n> of <n> only when every run passes.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const problems = [];
let runs = 0;

for (const motion of ["reduce", "no-preference"]) for (const w of [768, 834, 1024, 1180]) {
  runs++;
  const page = await browser.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion });
  await page.goto(base + "/mondai/framework/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(1200);
  const found = await page.evaluate(() => {
    const out = [];
    const q = (n) => document.querySelector(`[data-figma-node="${n}"]`);
    const R = (e) => e.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const margin = parseFloat(getComputedStyle(document.querySelector(".fw-sec")).paddingLeft);
    // T1 mark on the right margin with clear space before it
    const t = document.querySelector(".fw-title"), mk = t && t.querySelector(".fw-mark");
    if (mk) {
      const r = document.createRange(); r.setStart(t, 0); r.setEndBefore(mk);
      const gap = R(mk).left - r.getBoundingClientRect().right;
      if (gap < 16) out.push(`T1 mark gap ${gap.toFixed(0)} px`);
      if (Math.abs(R(mk).right - (vw - margin)) > 1.5) out.push(`T1 mark ends ${R(mk).right.toFixed(0)}, margin at ${vw - margin}`);
    }
    // T2 Role, Affiliate and Focus share one top
    const tops = ["5812:16456", "5812:16459", "5812:16462"].map((n) => q(n) && Math.round(R(q(n)).top));
    if (tops.some((v) => v == null) || new Set(tops).size !== 1) out.push(`T2 meta tops ${tops.join(",")}`);
    // T3 the four references in two columns, two rows
    const g = ["5812:16480", "5812:16485", "5812:16491", "5812:16496"].map((n) => q(n) && R(q(n)));
    if (g.some((v) => !v)) out.push("T3 reference labels missing");
    else {
      if (Math.abs(g[0].top - g[1].top) > 1 || Math.abs(g[2].top - g[3].top) > 1) out.push("T3 rows not aligned");
      if (Math.abs(g[0].left - g[2].left) > 1 || Math.abs(g[1].left - g[3].left) > 1 || g[1].left <= g[0].left) out.push("T3 not two columns");
    }
    // T4 Example box halves share one width
    const a = q("5812:17127"), c = q("5812:17128");
    if (a && c && Math.abs(R(a).width - R(c).width) > 1) out.push(`T4 example ${R(a).width.toFixed(0)} vs ${R(c).width.toFixed(0)}`);
    // T5 body measure at most 75 characters a line
    for (const e of document.querySelectorAll(".fw-sec > .s-body-16, .fw-sec > .s-body-16 .para")) {
      if (e.querySelector(".para")) continue;
      const rg = document.createRange(); rg.selectNodeContents(e);
      const lines = new Set([...rg.getClientRects()].filter((x) => x.width > 1).map((x) => Math.round(x.top))).size;
      if (lines > 2 && e.textContent.length / lines > 75) { out.push(`T5 ${Math.round(e.textContent.length / lines)} chars a line: ${e.textContent.slice(0, 30)}`); break; }
    }
    // T6 and T7 no figure wider than its Figma width (the width attribute), none wider than the content
    for (const i of document.querySelectorAll(".fw-sec > img.fig")) {
      const fw = +i.getAttribute("width");
      if (R(i).width > fw + 0.5) out.push(`T6/T7 ${i.dataset.figmaNode} ${R(i).width.toFixed(0)} > ${fw}`);
      if (R(i).right > vw - margin + 0.5) out.push(`T6/T7 ${i.dataset.figmaNode} past the margin`);
    }
    if (document.documentElement.scrollWidth > vw) out.push("sideways scroll");
    return out;
  });
  for (const f of found) problems.push(`${w} ${motion}: ${f}`);
  await page.close();
}
await browser.close();
server.close();
if (problems.length) { console.error(problems.join("\n")); console.error(`${problems.length} problems`); process.exit(1); }
console.log(`TABLET_OK ${runs} of ${runs}`);
