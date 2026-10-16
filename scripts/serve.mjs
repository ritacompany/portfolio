// Local preview of the real site: `npm run dev`, then open http://127.0.0.1:4318.
// Serves site/ the way Vercel will (cleanUrls: /mondai serves /mondai/index.html or /mondai.html).
// Adapted from scripts/lib/serve.mjs on the September homepage branch. No dependencies.

import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] || new URL("../site/", import.meta.url).pathname);
const port = Number(process.env.PORT || 4318);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const isFile = (p) => { try { return statSync(p).isFile(); } catch { return false; } };

function resolvePath(pathname) {
  const target = resolve(join(root, normalize(pathname)));
  if (target !== root && !target.startsWith(root + "/")) return null;
  for (const candidate of [target, join(target, "index.html"), target + ".html"]) {
    if (isFile(candidate)) return candidate;
  }
  return undefined;
}

createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400).end("bad request"); return; }
  const file = resolvePath(pathname);
  if (file === null) { response.writeHead(403).end("forbidden"); return; }
  if (!file) {
    const missing = resolvePath("/404.html");
    response.writeHead(404, { "Content-Type": TYPES[".html"] });
    if (missing) createReadStream(missing).pipe(response); else response.end("not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`site at http://127.0.0.1:${port}`));
