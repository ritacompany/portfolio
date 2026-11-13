// Serves site/ for the Haven tablet checks. With strip=true, current.css is served without the tablet block
// (from its "Tablet, 768 to 1199" comment to the end of the file), for the route swap test.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
export const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
export const MARK = "/* Tablet, 768 to 1199";
export async function serve(strip = false) {
  const s = createServer((req, res) => {
    let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
    try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
    if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
    try {
      let body = readFileSync(p);
      if (strip && p.endsWith(join("haven", "current.css"))) {
        const t = body.toString(), i = t.indexOf(MARK);
        if (i < 0) throw new Error("tablet block not found in current.css");
        body = t.slice(0, i);
      }
      res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(body);
    } catch (e) { if (String(e).includes("tablet block")) throw e; res.writeHead(404).end(); }
  });
  await new Promise((r) => s.listen(0, "127.0.0.1", r));
  return { server: s, base: `http://127.0.0.1:${s.address().port}` };
}
export async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.waitForTimeout(1200);
}
