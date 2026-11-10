// Gate for the gooey split on the footer Contact button (site/js/contact-goo.js).
// On Home, Framework and Haven at 1440: the button turns gooey (borders transparent, two shapes,
// the goo-ring filter), the icon pulls left past 20 px on hover, squeezes on press, returns within
// 1 px after leave, with no console errors. With reduced motion the borders stay and nothing moves.
// Prints GOO_OK only when every assertion passed.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";
const root = resolve(new URL("../site", import.meta.url).pathname);
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png" };
const srv = createServer((q, r) => { let p = resolve(join(root, decodeURIComponent(new URL(q.url, "http://x").pathname))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); if (!p.startsWith(root)) throw 0; r.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { r.writeHead(404).end(); } });
await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${srv.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
const problems = [];
const iconX = (p) => p.locator("a.button .button__icon").evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m41);
for (const url of ["/", "/mondai/framework/", "/haven/"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text())); p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(base + url, { waitUntil: "networkidle" });
  const btn = p.locator("a.button"); await btn.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  const s = await btn.evaluate((e) => ({ goo: e.classList.contains("is-goo"), border: getComputedStyle(e.querySelector(".button__label")).borderTopColor, shapes: e.querySelectorAll(".goo-shapes span").length, filter: !!document.getElementById("goo-ring") }));
  if (!s.goo || s.shapes !== 2 || !s.filter || s.border !== "rgba(0, 0, 0, 0)") { problems.push(`${url} not gooey: ${JSON.stringify(s)}`); await p.close(); continue; }
  const bb = await btn.boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.7, bb.y + bb.height / 2, { steps: 6 }); await p.waitForTimeout(1500);
  const hx = await iconX(p); if (hx > -20) problems.push(`${url} icon pulled only ${hx.toFixed(1)} px on hover`);
  const w0 = await btn.evaluate((e) => parseFloat(e.querySelector(".goo-shapes span:last-child").style.width));
  await p.mouse.down(); await p.waitForTimeout(500);
  const w1 = await btn.evaluate((e) => parseFloat(e.querySelector(".goo-shapes span:last-child").style.width));
  if (!(w1 < w0 - 4)) problems.push(`${url} press did not squeeze: ${w0} to ${w1}`);
  await p.mouse.up(); await p.mouse.move(5, 5, { steps: 6 }); await p.waitForTimeout(2000);
  const lx = await iconX(p); if (Math.abs(lx) > 1) problems.push(`${url} icon did not return: ${lx.toFixed(2)} px`);
  if (errs.length) problems.push(`${url} console errors: ${errs.join("; ")}`);
  await p.close();
  const r = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await r.goto(base + url, { waitUntil: "networkidle" }); await r.waitForTimeout(500);
  const rs = await r.locator("a.button").evaluate((e) => ({ goo: e.classList.contains("is-goo"), border: getComputedStyle(e.querySelector(".button__label")).borderTopColor }));
  if (rs.goo || rs.border === "rgba(0, 0, 0, 0)") problems.push(`${url} reduced motion still gooey: ${JSON.stringify(rs)}`);
  await r.close();
}
await b.close(); srv.close();
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("GOO_OK 3 pages");
