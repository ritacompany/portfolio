// Gates for the link states lab (reports/link-lab/GATES.md). Serves site/, opens the lab at 390, 768 and 1440,
// and checks: no script errors, forced state rules copied, no sideways scroll, every component rendered in
// every state, a tuned rest colour leaves the hover colour alone, values survive a reload and Copy values
// lists the change. Prints LINK_LAB_OK only when all of that holds.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";
const root = resolve(new URL("../../site", import.meta.url).pathname);
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = createServer((q, s) => { let p = resolve(join(root, normalize(decodeURIComponent(new URL(q.url, "http://x").pathname)))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {} try { s.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { s.writeHead(404).end(); } });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/dev/link-lab/`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch(); const fails = [];
for (const w of [390, 768, 1440]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } }); const p = await ctx.newPage();
  const errs = []; p.on("pageerror", (e) => errs.push(e.message)); p.on("response", (r) => { if (r.status() >= 400) errs.push("404 " + r.url()); });
  await p.goto(url); await p.waitForTimeout(400);
  const r = await p.evaluate(() => ({ forced: document.getElementById("lab-forced").textContent.split("\n").filter(Boolean).length, sw: document.documentElement.scrollWidth, cw: innerWidth,
    comps: document.querySelectorAll(".comp").length, cells: [...document.querySelectorAll(".comp")].every((c) => ["rest", "hover", "press", "focus", "live"].every((s) => c.querySelector(`.cell[data-state=${s}] a`))) }));
  if (errs.length) fails.push(`${w}: ${errs.join("; ")}`);
  if (r.forced < 20) fails.push(`${w}: only ${r.forced} forced rules`);
  if (r.sw > r.cw) fails.push(`${w}: sideways scroll ${r.sw} > ${r.cw}`);
  if (r.comps !== 11 || !r.cells) fails.push(`${w}: components ${r.comps}, every state present ${r.cells}`);
  if (w === 1440) {
    await p.click("#knobs-footer summary");
    await p.selectOption(".knob[data-c=footer][data-k=rest] select", "neutral-300");
    const c = await p.evaluate(() => [getComputedStyle(document.querySelector("#comp-footer [data-state=rest] a")).color, getComputedStyle(document.querySelector("#comp-footer [data-state=hover] a")).color]);
    if (c[0] !== "rgb(210, 210, 219)" || c[1] !== "rgb(4, 4, 5)") fails.push("tuned rest changed hover: " + c);
    await ctx.grantPermissions(["clipboard-read", "clipboard-write"]); await p.click("#copy");
    const clip = await p.evaluate(() => navigator.clipboard.readText());
    if (!/Text at rest: Neutral\/300 #d2d2db \(site: Neutral\/100/.test(clip)) fails.push("copy text: " + clip);
    await p.reload(); await p.waitForTimeout(300);
    const kept = await p.evaluate(() => getComputedStyle(document.querySelector("#comp-footer [data-state=rest] a")).color);
    if (kept !== "rgb(210, 210, 219)") fails.push("not kept after reload: " + kept);
  }
  await ctx.close();
}
await b.close(); server.close();
if (fails.length) { console.log(fails.join("\n")); process.exit(1); }
console.log("LINK_LAB_OK");
