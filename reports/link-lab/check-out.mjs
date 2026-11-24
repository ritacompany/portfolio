// LinkedIn and Resume, his call 23 Nov: rest on the nav's Neutral/200, hover to Neutral/050 like the nav, and the
// arrow rests on Neutral/300 and hovers to Neutral/000 (his yes, 24 Nov). Checks the real footer on Home, Haven and Framework at 1440 and 390.
// Prints OUT_LINKS_OK only when text and arrow match at rest and on hover everywhere.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
const root = resolve(new URL("../../site", import.meta.url).pathname);
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".webp": "image/webp", ".png": "image/png" };
const server = createServer((q, s) => { let p = resolve(join(root, normalize(decodeURIComponent(new URL(q.url, "http://x").pathname)))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {} try { s.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { s.writeHead(404).end(); } });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch(); const fails = [];
const REST = "rgb(222, 222, 229)", HOVER = "rgb(242, 241, 248)", ARROW_REST = "rgb(210, 210, 219)", ARROW_HOVER = "rgb(255, 255, 255)";
for (const page of ["index.html", "haven/index.html", "mondai/framework/index.html"]) for (const w of [1440, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(`${base}/${page}`); await p.waitForTimeout(300);
  const a = p.locator("footer .footer__out[href]").first(); await a.scrollIntoViewIfNeeded();
  const read = () => p.evaluate(() => { const a = document.querySelector("footer .footer__out[href]"), i = a.querySelector("img"), r = document.querySelector("footer .footer__out:not([href])");
    return { text: getComputedStyle(a).color, arrow: getComputedStyle(i).backgroundColor, mask: getComputedStyle(i).maskImage || getComputedStyle(i).webkitMaskImage, resume: r && getComputedStyle(r).color }; });
  const rest = await read(); await a.hover(); await p.waitForTimeout(50); const hov = await read();
  const tag = `${page} ${w}`;
  if (rest.text !== REST || rest.arrow !== ARROW_REST) fails.push(`${tag} rest ${JSON.stringify(rest)}`);
  if (rest.resume && rest.resume !== REST) fails.push(`${tag} resume rest ${rest.resume}`);
  if (!/arrow-out\.svg/.test(rest.mask)) fails.push(`${tag} arrow not masked: ${rest.mask}`);
  if (hov.text !== HOVER || hov.arrow !== ARROW_HOVER) fails.push(`${tag} hover ${JSON.stringify(hov)}`);
  await p.close();
}
await b.close(); server.close();
if (fails.length) { console.log(fails.join("\n")); process.exit(1); }
console.log("OUT_LINKS_OK");
