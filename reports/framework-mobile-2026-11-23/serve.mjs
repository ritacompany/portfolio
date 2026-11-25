// Serves site/ for the framework phone checks (23 Nov).
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
export const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
export async function serve() {
  const s = createServer((req, res) => {
    let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
    try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
    if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
    let body;
    try { body = readFileSync(p); } catch { res.writeHead(404).end(); return; }
    res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(body);
  });
  await new Promise((r) => s.listen(0, "127.0.0.1", r));
  return { server: s, base: `http://127.0.0.1:${s.address().port}` };
}
