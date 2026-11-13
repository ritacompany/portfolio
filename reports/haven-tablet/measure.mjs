// Scans the Haven page for layout problems at given widths. Serves site/ itself.
// Usage: node reports/haven-tablet/measure.mjs 768,834,1024,1180 [motion]
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const [ws = "768,834,1024,1180", motion] = process.argv.slice(2);
for (const w of ws.split(",").map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion ? "no-preference" : "reduce" });
  await page.goto(base + "/haven/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(1200);
  const rows = await page.evaluate(() => {
    const out = [], vw = document.documentElement.clientWidth;
    const m = parseFloat(getComputedStyle(document.querySelector("main")).getPropertyValue("--m")) || 32;
    if (document.documentElement.scrollWidth > vw) out.push(`sideways scroll ${document.documentElement.scrollWidth}`);
    const name = (e) => `${e.tagName.toLowerCase()}.${[...e.classList].join(".")} "${(e.textContent || "").trim().slice(0, 28)}"`;
    // text leaves: outside the margins, line length, size
    const leaves = [...document.querySelectorAll("main p, main h1, main h2, main h3, main li, main dd, main dt, main span, main a")]
      .filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.getClientRects().length && !e.closest(".ticker, .end-card, .stage, [aria-hidden=true], .pill-tip, .wires__list, .phone, .pframe, .cr-phone"));
    for (const e of leaves) {
      const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
      if (cs.visibility === "hidden" || +cs.opacity < 0.5) out.push(`hidden text ${name(e)}`);
      if (r.left < m - 0.5 || r.right > vw - m + 0.5) out.push(`text outside margin ${Math.round(r.left)} to ${Math.round(r.right)} ${name(e)}`);
      const rg = document.createRange(); rg.selectNodeContents(e);
      const lines = new Set([...rg.getClientRects()].filter((x) => x.width > 1).map((x) => Math.round(x.top))).size;
      const len = e.textContent.trim().length;
      if (lines > 2 && len / lines > 80) out.push(`long lines ${Math.round(len / lines)} chars ${name(e)}`);
      if (parseFloat(cs.fontSize) < 11) out.push(`small text ${cs.fontSize} ${name(e)}`);
    }
    // sibling text boxes that overlap
    for (let i = 0; i < leaves.length; i++) for (let j = i + 1; j < Math.min(leaves.length, i + 12); j++) {
      const a = leaves[i], b = leaves[j]; if (a.contains(b) || b.contains(a)) continue;
      const A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
      const ox = Math.min(A.right, B.right) - Math.max(A.left, B.left), oy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
      if (ox > 2 && oy > 2) out.push(`overlap ${name(a)} with ${name(b)}`);
    }
    // section bottoms: empty space from last content to section end
    for (const s of document.querySelectorAll("main section")) {
      const S = s.getBoundingClientRect(); let last = S.top;
      for (const e of s.querySelectorAll("*")) { const r = e.getBoundingClientRect(); if (r.height && r.width && getComputedStyle(e).visibility !== "hidden" && !e.closest(".cr-stage") ) last = Math.max(last, Math.min(r.bottom, S.bottom)); }
      out.push(`section ${[...s.classList][0]} h ${Math.round(S.height)} tail ${Math.round(S.bottom - last)}`);
    }
    return out;
  });
  console.log(`== ${w} ${motion || "reduce"}`); console.log(rows.join("\n"));
  await page.close();
}
await browser.close(); server.close();
