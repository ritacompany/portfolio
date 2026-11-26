// G7: the proposal changes nothing from 768 up. Full page, reduced motion, shipped vs proposal (phone.css
// injected, proposed haven.js swapped in), at 768, 1024 and 1440. Prints SAME_ABOVE_767_OK when identical.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
const repo = resolve(new URL("../..", import.meta.url).pathname), root = join(repo, "site");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".jpg": "image/jpeg" };
const s = createServer((q, r) => { let p = resolve(join(root, normalize(decodeURIComponent(new URL(q.url, "http://x").pathname)))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {} try { r.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { r.writeHead(404).end(); } });
await new Promise((r) => s.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${s.address().port}/haven/`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch(); const bad = [];
async function shot(w, proposal) {
  const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  if (proposal) await p.route("**/haven/haven.js", (r) => r.fulfill({ contentType: "text/javascript", body: readFileSync(join(repo, "site/dev/haven-phone/haven.js")) }));
  await p.goto(base, { waitUntil: "networkidle" });
  if (proposal) await p.addStyleTag({ content: readFileSync(join(repo, "site/dev/haven-phone/phone.css"), "utf8") });
  await p.evaluate(() => { document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")); const c = document.getElementById("chicago-time"); if (c) c.style.visibility = "hidden"; });
  await p.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(500);
  const buf = await p.screenshot({ fullPage: true }); await p.close(); return buf;
}
for (const w of [768, 1024, 1440]) { const a = await shot(w, false), c = await shot(w, true); if (!a.equals(c)) bad.push(`${w}: pixels differ`); }
await b.close(); s.close();
console.log(bad.length ? bad.join("\n") : "SAME_ABOVE_767_OK"); process.exit(bad.length ? 1 : 0);
