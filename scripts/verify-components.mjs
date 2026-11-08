// Phase 0 gates for the component sheet (site/dev/components/). One mode per gate:
//   grid    12 columns, 40 margin, 40 gutter at 1440
//   sizes   every Figma variant in scripts/figma-components.json is on the sheet once at its Figma size
//   pixels  each coded stage against its Figma reference image
//   focus   Button and Small button take keyboard focus and show a ring of 2 px or more
//   health  no horizontal scroll, failed request or console error at 1440
//   haven   nothing under site/haven changed since the Phase 0 start commit
// Each mode prints its success token only after every assertion passed, and exits 1 otherwise.
// Usage: node scripts/verify-components.mjs <mode> [--shots <dir>]

import { createServer } from "node:http";
import { readFileSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const mode = process.argv[2];
const shotsDir = process.argv.includes("--shots") ? process.argv[process.argv.indexOf("--shots") + 1] : null;
const repo = resolve(new URL("..", import.meta.url).pathname);
const fail = (msg) => { console.error(msg); process.exit(1); };

if (mode === "haven") {
  const base = "05af44f";
  const out = execFileSync("git", ["diff", "--name-only", base, "--", "site/haven"], { cwd: repo, encoding: "utf8" }).trim();
  const untracked = execFileSync("git", ["ls-files", "--others", "--exclude-standard", "site/haven"], { cwd: repo, encoding: "utf8" }).trim();
  if (out || untracked) fail(`site/haven changed since ${base}:\n${out}\n${untracked}`);
  console.log("HAVEN_UNCHANGED");
  process.exit(0);
}
if (!["grid", "sizes", "pixels", "focus", "health"].includes(mode)) fail(`unknown mode ${mode}`);

const spec = JSON.parse(readFileSync(join(repo, "scripts/figma-components.json"), "utf8"));
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { const body = readFileSync(p); res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(body); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/dev/components/`;

// The repo devDependency when installed, else the preinstalled global Playwright.
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const consoleErrors = [], failed = [];
page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
page.on("pageerror", (e) => consoleErrors.push(String(e)));
page.on("requestfailed", (r) => failed.push(r.url()));
page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const problems = [];
let token = "";
try {
  if (mode === "grid") {
    const cols = await page.$$eval("[data-grid-test] > *", (els) => els.map((e) => { const b = e.getBoundingClientRect(); return { x: b.x, w: b.width }; }));
    if (cols.length !== 12) problems.push(`grid has ${cols.length} columns`);
    const colW = (1440 - 2 * 40 - 11 * 40) / 12;
    cols.forEach((c, i) => {
      const x = 40 + i * (colW + 40);
      if (Math.abs(c.w - colW) > 0.1) problems.push(`column ${i + 1} width ${c.w.toFixed(2)}, want ${colW.toFixed(2)}`);
      if (Math.abs(c.x - x) > 0.1) problems.push(`column ${i + 1} x ${c.x.toFixed(2)}, want ${x.toFixed(2)}`);
    });
    token = `GRID_OK 12 columns of ${colW.toFixed(2)} px`;
  }

  if (mode === "sizes") {
    let ok = 0, total = 0;
    for (const set of spec.sets) {
      for (const v of set.variants) {
        total++;
        const els = await page.$$(`[data-stage="${set.key}"] [data-figma-node="${v.node}"]`);
        if (els.length !== 1) { problems.push(`${set.key} ${v.name}: found ${els.length} on the sheet`); continue; }
        const box = await els[0].evaluate((e) => { const b = e.getBoundingClientRect(), s = e.closest(".stage").getBoundingClientRect(); return { x: b.x - s.x, y: b.y - s.y, w: b.width, h: b.height }; });
        const off = ["w", "h", "x", "y"].filter((k) => Math.abs(box[k] - v[k]) > 1);
        if (off.length) problems.push(`${set.key} ${v.name}: ${off.map((k) => `${k} ${box[k].toFixed(2)} vs Figma ${v[k]}`).join(", ")}`);
        else ok++;
      }
    }
    token = `SIZES_OK ${ok}/${total}`;
    if (ok !== total) problems.push(`sizes: ${ok}/${total} match`);
  }

  if (mode === "pixels") {
    const limit = 0.04, results = [];
    if (shotsDir) mkdirSync(shotsDir, { recursive: true });
    for (const set of spec.sets) {
      const stage = await page.$(`[data-stage="${set.key}"]`);
      await stage.scrollIntoViewIfNeeded();
      // Clip to whole pixels at the stage origin so a subpixel page offset cannot add a row.
      // Browsers snap borders to whole pixels on their own, so a stage at a half pixel offset can
      // land a row off. The comparison below registers the two images within 1 px before counting.
      const box = await stage.evaluate((e) => { const b = e.getBoundingClientRect(); return { x: b.x + scrollX, y: b.y + scrollY }; });
      const shot = await page.screenshot({ fullPage: true, clip: { x: Math.round(box.x), y: Math.round(box.y), width: set.w, height: set.h } });
      if (shotsDir) writeFileSync(join(shotsDir, `${set.key}-code.png`), shot);
      const r = await page.evaluate(async ({ src, data, w, h }) => {
        const load = (s) => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = s; });
        const [fig, code] = await Promise.all([load(src), load("data:image/png;base64," + data)]);
        const paint = (img) => { const c = new OffscreenCanvas(w, h), x = c.getContext("2d"); x.fillStyle = "#000"; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h).data; };
        const a = paint(fig), b = paint(code);
        let diff = Infinity;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          let d = 0;
          for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
            const xs = Math.min(w - 1, Math.max(0, x + dx)), ys = Math.min(h - 1, Math.max(0, y + dy));
            const i = (y * w + x) * 4, j = (ys * w + xs) * 4;
            if (Math.abs(a[i] - b[j]) > 64 || Math.abs(a[i + 1] - b[j + 1]) > 64 || Math.abs(a[i + 2] - b[j + 2]) > 64) d++;
          }
          diff = Math.min(diff, d);
        }
        return { diff, total: w * h, fw: fig.naturalWidth, fh: fig.naturalHeight, cw: code.naturalWidth, ch: code.naturalHeight };
      }, { src: new URL(set.image, url).href, data: shot.toString("base64"), w: set.w, h: set.h });
      const share = r.diff / r.total;
      results.push(`${set.key} ${(share * 100).toFixed(2)}%`);
      if (r.cw !== set.w || r.ch !== set.h) problems.push(`${set.key}: code stage ${r.cw}x${r.ch}, want ${set.w}x${set.h}`);
      if (share > limit) problems.push(`${set.key}: ${(share * 100).toFixed(2)}% of pixels differ, limit ${limit * 100}%`);
    }
    console.log(results.join("\n"));
    token = "PIXELS_OK";
  }

  if (mode === "focus") {
    for (const sel of ['[data-stage="button"] .button', '[data-stage="small-button"] .button-sm']) {
      const el = await page.$(sel);
      if (!el) { problems.push(`${sel} missing`); continue; }
      const tag = await el.evaluate((e) => e.tagName + (e.getAttribute("href") ? " href" : ""));
      if (!/^(BUTTON|A href)$/.test(tag)) problems.push(`${sel} is ${tag}, not a focusable control`);
      await page.evaluate(() => document.activeElement && document.activeElement.blur());
      await el.evaluate((e) => e.previousElementSibling); // keep order explicit for readers
      // Reach it by keyboard: focus the element before it, then Tab.
      await el.evaluate((e) => { const f = document.createElement("button"); f.id = "focus-probe"; f.style.cssText = "position:fixed;top:0;left:0;opacity:0"; e.before(f); f.focus(); });
      await page.keyboard.press("Tab");
      const st = await el.evaluate((e) => { const s = getComputedStyle(e); return { focused: document.activeElement === e, visible: e.matches(":focus-visible"), style: s.outlineStyle, width: parseFloat(s.outlineWidth), color: s.outlineColor }; });
      await page.evaluate(() => document.getElementById("focus-probe").remove());
      if (!st.focused) problems.push(`${sel}: Tab did not focus it`);
      else if (!st.visible || st.style === "none" || st.width < 2) problems.push(`${sel}: ring ${st.style} ${st.width}px ${st.color}`);
    }
    token = "FOCUS_OK";
  }

  if (mode === "health") {
    const sw = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
    if (sw.s > sw.c) problems.push(`horizontal scroll: ${sw.s} > ${sw.c}`);
    if (failed.length) problems.push(`failed requests:\n${failed.join("\n")}`);
    if (consoleErrors.length) problems.push(`console errors:\n${consoleErrors.join("\n")}`);
    token = "HEALTH_OK";
  }
} finally {
  await browser.close();
  server.close();
}

if (problems.length) fail(problems.join("\n"));
console.log(token);
