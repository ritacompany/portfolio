// Local preview of the real site: `npm run dev`, then open http://127.0.0.1:4318.
// Serves site/ the way Vercel will (cleanUrls: /mondai serves /mondai/index.html or /mondai.html).
// Adapted from scripts/lib/serve.mjs on the September homepage branch. No dependencies.

import { createServer } from "node:http";
import { createReadStream, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] || new URL("../site/", import.meta.url).pathname);
const port = Number(process.env.PORT || 4318);
// Third argument "lan" opens it to the home network so a phone on the same wifi can load it.
// Third argument "studio" (npm run studio) stays on this Mac only and adds CSS Studio and the
// proposal CSS to every page it serves. See docs/EDITING_WORKFLOW.md. The files on disk never change.
const studio = process.argv[3] === "studio";
const host = process.argv[3] === "lan" ? "0.0.0.0" : "127.0.0.1";
const STUDIO_DIST = resolve(new URL("../node_modules/cssstudio/dist/", import.meta.url).pathname);
const STUDIO_TAGS = `  <link rel="stylesheet" href="/dev/preview/proposals.css">
  <link rel="stylesheet" href="/__studio/cssstudio.css">
  <script src="/__studio/cssstudio.js"></script>
  <script>addEventListener("DOMContentLoaded", () => CSSStudio.startStudio());</script>
</head>`;

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
  if (studio && pathname.startsWith("/__studio/")) {
    const asset = { "/__studio/cssstudio.js": "cssstudio.js", "/__studio/cssstudio.css": "cssstudio.css" }[pathname];
    if (!asset) { response.writeHead(404).end("not found"); return; }
    response.writeHead(200, { "Content-Type": TYPES[extname(asset)], "Cache-Control": "no-store" });
    createReadStream(join(STUDIO_DIST, asset)).pipe(response);
    return;
  }
  const file = resolvePath(pathname);
  if (file === null) { response.writeHead(403).end("forbidden"); return; }
  if (!file) {
    const missing = resolvePath("/404.html");
    response.writeHead(404, { "Content-Type": TYPES[".html"] });
    if (missing) createReadStream(missing).pipe(response); else response.end("not found");
    return;
  }
  const type = TYPES[extname(file).toLowerCase()] || "application/octet-stream";
  response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  if (studio && extname(file).toLowerCase() === ".html") {
    response.end(readFileSync(file, "utf8").replace("</head>", STUDIO_TAGS));
    return;
  }
  createReadStream(file).pipe(response);
}).listen(port, host, () => console.log(`site at http://${host}:${port}`));
