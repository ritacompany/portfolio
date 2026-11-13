// Serves site/ for the home tablet checks, so they need no running server. With strip set, home.css is
// served without the tablet block (from its "Tablet only, 768 to 1199" comment to the phone parts comment).
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };

export function stripTablet(css) {
  const a = css.indexOf("/* Tablet only, 768 to 1199"), b = css.indexOf("/* Phone parts that exist only under 768");
  if (a < 0 || b < a) throw new Error("tablet block markers not found in home.css");
  return css.slice(0, a) + css.slice(b);
}

export async function serve() {
  const state = { strip: false };
  const server = createServer((req, res) => {
    let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
    try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
    if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
    try {
      let body = readFileSync(p);
      if (state.strip && p === join(root, "css/home.css")) body = stripTablet(body.toString("utf8"));
      res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream", "cache-control": "no-store" }).end(body);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { base: `http://127.0.0.1:${server.address().port}`, state, close: () => server.close() };
}
