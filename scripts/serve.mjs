// Local preview of the real site: `npm run dev`, then open http://127.0.0.1:4318.
// Serves site/ the way Vercel will (cleanUrls: /mondai serves /mondai/index.html or /mondai.html).
// Adapted from scripts/lib/serve.mjs on the September homepage branch. No dependencies.

import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createReadStream, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] || new URL("../site/", import.meta.url).pathname);
const port = Number(process.env.PORT || 4318);
// Third argument "lan" opens it to the home network so a phone on the same wifi can load it.
// Third argument "studio" (npm run studio) stays on this Mac only and adds Flare (flare-dev, a free
// visual CSS editor) and the preview proposals to every page it serves. See docs/EDITING_WORKFLOW.md.
// The files on disk never change.
const studio = process.argv[3] === "studio";
const host = process.argv[3] === "lan" ? "0.0.0.0" : "127.0.0.1";
const FLARE = resolve(new URL("../node_modules/flare-dev/dist/flare.js", import.meta.url).pathname);
const FLARE_CLI = resolve(new URL("../node_modules/flare-dev/dist/cli.js", import.meta.url).pathname);
const DOCK = resolve(new URL("./studio/flare-dock.js", import.meta.url).pathname);
const BRIDGE_PORT = Number(process.env.FLARE_BRIDGE_PORT || 4321);
// Studio pages get what the phone preview gets (scripts/build-preview.mjs): every CSS file in
// site/dev/preview in the head and every JS file there at the end of the body, so the page matches
// :4319. Flare looks for its optional bridge on 127.0.0.1:4318 by default, our phone server, so it is
// pointed at 4321.
const PREVIEW_DIR = join(root, "dev/preview");
// Flare's breadcrumb (the row of parents above the panel) scrolls sideways with no scrollbar, so the
// containers above an element are hidden. This wraps it onto several lines so every parent can be clicked.
const FLARE_CRUMBS = `(function wrap(n){const h=document.getElementById("flare-host");if(h&&h.shadowRoot){const s=document.createElement("style");s.textContent=".f-breadcrumb{flex-wrap:wrap;overflow:visible;row-gap:4px}";h.shadowRoot.append(s);return}if(n<100)setTimeout(()=>wrap(n+1),100)})(0)`;
function studioPage(html) {
  let extras = [];
  try { extras = readdirSync(PREVIEW_DIR).filter((f) => /\.(css|js)$/.test(f)).sort(); } catch {}
  const css = extras.filter((f) => f.endsWith(".css")).map((f) => `  <link rel="stylesheet" href="/dev/preview/${f}">\n`).join("");
  const js = extras.filter((f) => f.endsWith(".js")).map((f) => `<script src="/dev/preview/${f}" defer></script>\n`).join("");
  return html
    .replace("</head>", css + `  <script>window.__FLARE_BRIDGE__ = { url: "http://127.0.0.1:${BRIDGE_PORT}" };</script>
  <script src="/__studio/flare-dock.js"></script>
  <script src="/__studio/flare.js"></script>
  <script>${FLARE_CRUMBS}</script>
</head>`)
    .replace("</body>", js + "</body>");
}

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
    const studioFile = { "/__studio/flare.js": FLARE, "/__studio/flare-dock.js": DOCK }[pathname];
    if (!studioFile) { response.writeHead(404).end("not found"); return; }
    response.writeHead(200, { "Content-Type": TYPES[".js"], "Cache-Control": "no-store" });
    createReadStream(studioFile).pipe(response);
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
    response.end(studioPage(readFileSync(file, "utf8")));
    return;
  }
  createReadStream(file).pipe(response);
}).listen(port, host, () => console.log(`site at http://${host}:${port}`));

// Studio also starts Flare's bridge, so comments and Push to Agent reach Claude with no copy and paste
// (review mode in docs/EDITING_WORKFLOW.md). It listens on 127.0.0.1 only and writes pushes to a temp
// folder; starting it empties that folder. If the port is taken a bridge is already running, so that one
// is used. It stops with the studio.
if (studio) {
  const bridge = spawn(process.execPath, [FLARE_CLI, "bridge", "--host", "127.0.0.1", "--port", String(BRIDGE_PORT)], { stdio: ["ignore", "inherit", "inherit"] });
  bridge.on("exit", (code) => { if (code) console.log(`flare bridge exited (${code}); if one is already on ${BRIDGE_PORT}, that one is used`); });
  for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => { bridge.kill(); process.exit(0); });
  process.on("exit", () => bridge.kill());
}
