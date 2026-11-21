// Card to collection transition (docs/motion/card-transition/): review capture and gates, on the preview
// build. Usage:
//   node scripts/build-preview.mjs site <dir>
//   node scripts/check-card-transition.mjs <gate> <dir>   (options: out, dirs, as double dash flags)
// Gates print "<gate> PASS" only after every assertion holds:
//   CAPTURE  frames and contact sheets for A, B and C at 1440 and 390 (Home exit then arrival, 30 fps)
//   G1       hand over across the page change: Home's last exit frame and the arrival's first frame match
//   G2       the arrival's last frame matches a direct visit to /mondai/ at rest
//   G3       one frame before the hand over, every word copy sits within 1.5 px of the real word
//   G4       real clock: a click on the card in each direction lands on /mondai/ with nothing left over
//   G5       reduced motion: the click opens /mondai/ with no veil and no arrival
//   G6       a direct visit gets the page's own entrance: no layer, the nav shows
//   G7       back from the collection: Home shows no veil
//   CONTROL  G1's comparison fails on frames that really differ (the arrival at mid travel)
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const argv = process.argv.slice(2);
const gate = argv[0];
const opt = (k, d) => { const i = argv.indexOf("--" + k); return i > 0 ? argv[i + 1] : d; };
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pv = argv[1] && !argv[1].startsWith("-") ? argv[1] : opt("preview", "");
const root = path.resolve(pv);
if (!gate || !pv) { console.error("usage: node scripts/check-card-transition.mjs <CAPTURE|G1..G7|CONTROL> <preview dir>"); process.exit(2); }
const OUT = path.resolve(repo, opt("out", "output/motion/card-transition"));
const DIRS = (opt("dirs", "A,B,C")).split(",");
const WIDTHS = [[1440, 900], [390, 844]];

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
    const f = path.join(root, p); if (!f.startsWith(root)) throw 0;
    res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(await readFile(f));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const fails = [];
const fail = (m) => { fails.push(m); console.log("  FAIL", m); };
const done = async (ok, extra = "") => { await browser.close(); server.close(); if (ok && !fails.length) { console.log(`${gate} PASS${extra}`); process.exit(0); } console.log(`${gate} FAIL (${fails.length})`); process.exit(1); };

// ---- Pages
async function ctx(w, h, { seek = true, dir = "A", reduced = false } = {}) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: reduced ? "reduce" : "no-preference" });
  await c.addInitScript(([seek, dir]) => { if (seek) window.__CT_SEEK = true; try { localStorage.setItem("card-transition:dir", dir); } catch (e) {} }, [seek, dir]);
  return c;
}
async function homeAtCard(page) {
  await page.goto(base + "/index.html", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => document.querySelector("a.work-card-mondai").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(2200); // let the works entrance finish
  const m = await page.evaluate(() => { const r = document.querySelector("a.work-card-mondai .work-card__media").getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await page.mouse.move(m.x - 40, m.y - 30); await page.mouse.move(m.x, m.y, { steps: 4 });
  await page.waitForTimeout(700);
  return m;
}
const shot = (page) => page.screenshot({ type: "png" });

// Mean channel difference (0 to 255) and the share of pixels off by more than 40, compared in a canvas.
let differ = null;
async function diff(a, b) {
  if (!differ) { const c = await browser.newContext(); differ = await c.newPage(); }
  return differ.evaluate(async ([a, b]) => {
    const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
    const [x, y] = await Promise.all([load(a), load(b)]);
    const w = Math.min(x.width, y.width), h = Math.min(x.height, y.height);
    const px = (img) => { const c = new OffscreenCanvas(w, h), g = c.getContext("2d"); g.drawImage(img, 0, 0); return g.getImageData(0, 0, w, h).data; };
    const p = px(x), q = px(y);
    let sum = 0, big = 0;
    for (let i = 0; i < p.length; i += 4) {
      const d = (Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2])) / 3;
      sum += d; if (d > 40) big++;
    }
    return { mean: sum / (w * h), big: big / (w * h) };
  }, [a.toString("base64"), b.toString("base64")]);
}
const close = (d) => d.mean < 1.0 && d.big < 0.002;

// One direction at one size, stepped: Home exit frames, then the arrival frames.
async function stepped(dir, w, h, { every = 1000 / 30, keep = false } = {}) {
  const c = await ctx(w, h, { dir });
  const page = await c.newPage();
  const m = await homeAtCard(page);
  await page.mouse.down(); await page.waitForTimeout(200); await page.mouse.up(); // the cursor press, then the click
  const exit = [];
  const E = await page.evaluate(() => window.CardTransition.options.exit);
  if (!(await page.evaluate(() => !!window.CardTransition.handoff()))) { fail(`${dir} ${w}: the click did not start the exit`); await c.close(); return null; }
  for (let t = 0; t <= E + 0.1; t += every) { await page.evaluate((t) => window.CardTransition.seekExit(t), t); exit.push({ t, png: await shot(page) }); }
  await page.evaluate((E) => window.CardTransition.seekExit(E), E);
  const lastHome = await shot(page);
  await page.goto(base + "/mondai/index.html", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate(() => { const C = window.CardTransition; return C.run ? { end: C.duration, T: C.travel } : null; });
  if (!info) { fail(`${dir} ${w}: the arrival did not start`); await c.close(); return null; }
  await page.waitForFunction(() => [...document.querySelectorAll(".ct-img")].every((i) => i.complete));
  // Measured before the frames run: the hand over is one way, so this has to come before the run passes it.
  await page.evaluate((t) => window.CardTransition.seek(t), info.T - 1000 / 60);
  const near = await page.evaluate(() => {
    const R = window.CardTransition.run;
    return R && !R.handed ? R.words.map((w) => { const a = w.el.getBoundingClientRect(), b = w.real.getBoundingClientRect(); return { word: w.real.textContent.trim(), dx: Math.abs(a.left - b.left), dy: Math.abs(a.top - b.top), dw: Math.abs(a.width - b.width) }; }) : null;
  });
  const arrive = [];
  for (let t = 0; t <= info.end + 1; t += every) { await page.evaluate((t) => window.CardTransition.seek(t), t); arrive.push({ t, png: await shot(page) }); }
  await page.evaluate((t) => window.CardTransition.seek(t), info.end + 1);
  const lastArrive = await shot(page);
  const state = await page.evaluate(() => ({ layers: document.querySelectorAll(".ct-layer").length, transform: getComputedStyle(document.querySelector(".canvas")).transform }));
  await c.close();
  return { dir, w, h, exit, arrive, lastHome, lastArrive, info, near, state };
}
async function restShot(w, h) {
  const c = await ctx(w, h, { seek: false });
  const page = await c.newPage();
  await page.goto(base + "/mondai/index.html", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(3500);
  await page.mouse.move(w - 2, h - 2); // the cursor sits in a corner in both shots
  const png = await shot(page);
  await c.close();
  return png;
}

async function sheet(name, frames, w, h, cols) {
  const tw = Math.min(360, w), th = Math.round((tw * h) / w);
  const html = `<body style="margin:0;background:#111;font:12px system-ui;color:#ddd;display:grid;grid-template-columns:repeat(${cols},${tw}px);gap:6px;padding:6px;width:max-content">` +
    frames.map((f) => `<figure style="margin:0"><img src="data:image/png;base64,${f.png.toString("base64")}" style="width:${tw}px;height:${th}px;display:block"><figcaption>${f.label}</figcaption></figure>`).join("") + "</body>";
  const c = await browser.newContext({ viewport: { width: 400, height: 400 } }); const p = await c.newPage();
  await p.setContent(html); await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode())));
  writeFileSync(path.join(OUT, name), await p.screenshot({ fullPage: true })); await c.close();
}

// ---- Gates
if (gate === "CAPTURE") {
  rmSync(OUT, { recursive: true, force: true }); mkdirSync(OUT, { recursive: true });
  for (const [w, h] of WIDTHS) for (const dir of DIRS) {
    const r = await stepped(dir, w, h);
    if (!r) continue;
    const pick = r.arrive.filter((f, i) => i % 3 === 0 || i === r.arrive.length - 1);
    const frames = [...r.exit.filter((f, i) => i % 2 === 0).map((f) => ({ png: f.png, label: `home exit ${Math.round(f.t)} ms` })), ...pick.map((f) => ({ png: f.png, label: `arrival ${Math.round(f.t)} ms` }))];
    await sheet(`${dir}-${w}-contact.png`, frames, w, h, w > 600 ? 4 : 6);
    const dense = r.arrive.filter((f) => f.t <= r.info.T + 50 && f.t >= 0).filter((f, i) => i % 1 === 0).slice(0, 36);
    await sheet(`${dir}-${w}-travel.png`, dense.map((f) => ({ png: f.png, label: `${Math.round(f.t)} ms` })), w, h, w > 600 ? 6 : 9);
    console.log(`  ${dir} ${w}: travel ${r.info.T} ms, all done ${r.info.end} ms, ${r.arrive.length} frames`);
  }
  await done(true, ` (sheets in ${path.relative(repo, OUT)})`);
}
if (gate === "G1" || gate === "G2" || gate === "G3" || gate === "CONTROL") {
  let ctrl = 0;
  for (const [w, h] of WIDTHS) {
    const rest = gate === "G2" ? await restShot(w, h) : null;
    for (const dir of DIRS) {
      const r = await stepped(dir, w, h);
      if (!r) continue;
      if (gate === "G1") { const d = await diff(r.lastHome, r.arrive[0].png); console.log(`  ${dir} ${w}: home last vs arrival first mean ${d.mean.toFixed(3)}, off ${(d.big * 100).toFixed(3)}%`); if (!close(d)) fail(`${dir} ${w}: jump across the page change`); }
      if (gate === "CONTROL") { const mid = r.arrive[Math.floor(r.arrive.length / 4)].png; const d = await diff(r.lastHome, mid); console.log(`  ${dir} ${w}: home last vs arrival mid travel mean ${d.mean.toFixed(3)}`); if (!close(d)) ctrl++; }
      if (gate === "G2") { const d = await diff(rest, r.lastArrive); console.log(`  ${dir} ${w}: arrival end vs direct visit mean ${d.mean.toFixed(3)}, off ${(d.big * 100).toFixed(3)}%; layers ${r.state.layers}, transform ${r.state.transform}`); if (!close(d) || r.state.layers || r.state.transform !== "none") fail(`${dir} ${w}: the arrival does not end on the page at rest`); }
      if (gate === "G3" && (!r.near || !r.near.length)) fail(`${dir} ${w}: no word copies to measure`);
      if (gate === "G3") for (const n of r.near || []) { console.log(`  ${dir} ${w}: ${n.word} off by ${n.dx.toFixed(2)}, ${n.dy.toFixed(2)}, width ${n.dw.toFixed(2)}`); if (n.dx > 1.5 || n.dy > 1.5 || n.dw > 1.5) fail(`${dir} ${w}: ${n.word} jumps at the hand over`); }
    }
  }
  if (gate === "CONTROL") { if (ctrl !== WIDTHS.length * DIRS.length) fail(`the comparison passed ${WIDTHS.length * DIRS.length - ctrl} frames that differ`); await done(true); }
  await done(true);
}
if (gate === "G4") {
  for (const [w, h] of WIDTHS) for (const dir of DIRS) {
    const c = await ctx(w, h, { seek: false, dir }); const page = await c.newPage();
    const m = await homeAtCard(page);
    const t0 = Date.now();
    await page.mouse.click(m.x, m.y);
    await page.waitForURL(/mondai\/index\.html/, { timeout: 4000 }).catch(() => {});
    const nav = Date.now() - t0;
    if (!/mondai\/index\.html/.test(page.url())) { fail(`${dir} ${w}: did not reach /mondai/`); await c.close(); continue; }
    const started = await page.evaluate(() => document.documentElement.classList.contains("ct-arriving") || document.querySelectorAll(".ct-layer").length > 0);
    await page.waitForTimeout(4500);
    const s = await page.evaluate(() => {
      const op = (s) => [...document.querySelectorAll(s)].map((e) => +getComputedStyle(e).opacity * (getComputedStyle(e).visibility === "visible" ? 1 : 0));
      return { layers: document.querySelectorAll(".ct-layer").length, arriving: document.documentElement.classList.contains("ct-arriving"), transform: getComputedStyle(document.querySelector(".canvas")).transform,
        ops: op(".page-header, .collection__brand, .collection__mark, .collection__brand h1, .collection__intro, .collection__label, .collection__slashes, .collection__label h2, .collection__rows > li") };
    });
    console.log(`  ${dir} ${w}: navigated after ${nav} ms, arrival ran ${started}, left: layers ${s.layers}, transform ${s.transform}, min opacity ${Math.min(...s.ops)}`);
    if (!started || s.layers || s.arriving || s.transform !== "none" || Math.min(...s.ops) < 1) fail(`${dir} ${w}: did not run or left something behind`);
    await c.close();
  }
  await done(true);
}
if (gate === "G5") {
  const c = await ctx(1440, 900, { seek: false, reduced: true }); const page = await c.newPage();
  const m = await homeAtCard(page);
  await page.mouse.click(m.x, m.y);
  const layerOnHome = await page.evaluate(() => document.querySelectorAll(".ct-layer").length).catch(() => 0);
  await page.waitForURL(/mondai\/index\.html/, { timeout: 4000 }).catch(() => {});
  const s = await page.evaluate(() => ({ url: location.pathname, layers: document.querySelectorAll(".ct-layer").length, arriving: document.documentElement.classList.contains("ct-arriving"), h1: getComputedStyle(document.querySelector(".collection__brand h1")).visibility }));
  console.log(`  reduced: ${JSON.stringify(s)}, layer on Home ${layerOnHome}`);
  if (!/mondai/.test(s.url) || s.layers || s.arriving || layerOnHome || s.h1 !== "visible") fail("reduced motion ran the transition");
  await done(true);
}
if (gate === "G6") {
  const c = await ctx(1440, 900, { seek: false }); const page = await c.newPage();
  await page.goto(base + "/mondai/index.html", { waitUntil: "load" });
  await page.waitForTimeout(300);
  const s = await page.evaluate(() => ({ layers: document.querySelectorAll(".ct-layer").length, checked: document.documentElement.classList.contains("ct-checked"), nav: getComputedStyle(document.querySelector(".page-header")).visibility }));
  await page.waitForTimeout(3000);
  const brand = await page.evaluate(() => +getComputedStyle(document.querySelector(".collection__brand")).opacity);
  console.log(`  direct visit: ${JSON.stringify(s)}, brand opacity after 3.3 s ${brand}`);
  if (s.layers || !s.checked || s.nav !== "visible" || brand < 1) fail("a direct visit was changed");
  await done(true);
}
if (gate === "G7") {
  const c = await ctx(1440, 900, { seek: false }); const page = await c.newPage();
  const m = await homeAtCard(page);
  await page.mouse.click(m.x, m.y);
  await page.waitForURL(/mondai\/index\.html/, { timeout: 4000 });
  await page.waitForTimeout(2500);
  await page.goBack();
  await page.waitForTimeout(500);
  const s = await page.evaluate(() => ({ url: location.pathname, layers: document.querySelectorAll(".ct-layer").length }));
  console.log(`  back: ${JSON.stringify(s)}`);
  if (/mondai/.test(s.url) || s.layers) fail("Home came back with the veil");
  await done(true);
}
console.error("unknown gate " + gate); await done(false);
