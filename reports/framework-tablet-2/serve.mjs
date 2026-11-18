// Serves site/ for the framework tablet checks (round 2, 18 Nov). With strip=true, framework.css is served
// without the tablet block (from its MARK comment to the end of the file), for the route swap test.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
export const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
export const MARK = "/* Tablet, 768 to 1199 (round 2";
export async function serve(strip = false) {
  const s = createServer((req, res) => {
    let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
    try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
    if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
    let body;
    try { body = readFileSync(p); } catch { res.writeHead(404).end(); return; }
    if (strip && p.endsWith(join("css", "framework.css"))) {
      const t = body.toString(), i = t.indexOf(MARK);
      if (i < 0) { res.writeHead(500).end("tablet block not found"); console.error("tablet block not found in framework.css"); process.exit(2); }
      body = t.slice(0, i);
    }
    res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(body);
  });
  await new Promise((r) => s.listen(0, "127.0.0.1", r));
  return { server: s, base: `http://127.0.0.1:${s.address().port}` };
}
export const { chromium } = createRequire(import.meta.url)("playwright");
export async function open(browser, base, w, motion = "reduce", h = 1000) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: motion });
  if (process.env.FIX_CLOCK) await page.clock.setFixedTime(new Date("2026-11-18T22:24:00-06:00")); // the footer clock, so two loads lay out alike
  await page.goto(base + "/mondai/framework/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } scrollTo(0, document.body.scrollHeight); await new Promise((r) => setTimeout(r, 300)); scrollTo(0, 0); });
  await page.waitForTimeout(1500);
  return page;
}
