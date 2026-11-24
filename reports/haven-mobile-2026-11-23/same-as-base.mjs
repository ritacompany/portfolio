// G7 after landing: Haven at 768, 1024 and 1440 (reduced motion, full page) pixel identical between this
// branch and a checkout of the base branch. Usage: node same-as-base.mjs <base checkout dir>
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
const repo = resolve(new URL("../..", import.meta.url).pathname);
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".jpg": "image/jpeg" };
const serve = (root) => new Promise((ok) => { const s = createServer((q, r) => { let p = resolve(join(root, normalize(decodeURIComponent(new URL(q.url, "http://x").pathname)))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {} try { r.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { r.writeHead(404).end(); } }); s.listen(0, "127.0.0.1", () => ok(s)); });
const a = await serve(join(repo, "site")), b = await serve(join(resolve(process.argv[2]), "site"));
const { chromium } = createRequire(import.meta.url)("playwright");
const br = await chromium.launch(); const bad = [];
async function shot(srv, w) {
  const p = await br.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  await p.goto(`http://127.0.0.1:${srv.address().port}/haven/`, { waitUntil: "networkidle" });
  await p.evaluate(() => { document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")); const c = document.getElementById("chicago-time"); if (c) c.style.visibility = "hidden"; });
  await p.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(500); const buf = await p.screenshot({ fullPage: true }); await p.close(); return buf;
}
for (const w of [768, 1024, 1440]) if (!(await shot(a, w)).equals(await shot(b, w))) bad.push(`${w}: pixels differ`);
await br.close(); a.close(); b.close();
console.log(bad.length ? bad.join("\n") : "SAME_AS_BASE_ABOVE_767_OK"); process.exit(bad.length ? 1 : 0);
