// Card to collection transition (docs/motion/card-transition/): review capture and gates, on the preview
// build. Usage:
//   node scripts/build-preview.mjs site <dir>
//   node scripts/check-card-transition.mjs <gate> <dir>   (options: out, dirs, as double dash flags)
// Gates print "<gate> PASS" only after every assertion holds:
//   CAPTURE  frames and contact sheets for A, B and C at 1440 and 390 (Home exit then arrival, 30 fps)
//   G1       hand over across the page change: Home's last exit frame and the arrival's first frame match
//   G2       the arrival's last frame matches a direct visit to /mondai/ at rest
//   G3       one frame before the hand over, the wordmark copy (and B's card frame) sit within 1.5 px of the real ones
//   G4       real clock: a click on the card in each direction lands on /mondai/ with nothing left over 
//   G5       reduced motion: the click opens /mondai/ with no veil and no arrival
//   G6       a direct visit gets the page's own entrance: no layer, the nav shows
//   G7       back from the collection: Home shows no veil
//   G8       real clock, the collection held back 0.3 s on the network: no still stretch over 0.12 s in
//            the first second after the click (his 24 Nov note: a pause before the move), and no frame far
//            darker than both its neighbours (an empty page painted between the two)
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
// A, B and C all run on this script (A was PR #30's view transition until 24 Nov).
const DIRS = (opt("dirs", "A,B,C")).split(",");
const ALL = ["A", ...DIRS.filter((d) => d !== "A")];
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
async function ctx(w, h, { seek = true, dir = "B", reduced = false } = {}) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: reduced ? "reduce" : "no-preference" });
  await c.addInitScript(([seek, dir]) => { if (seek) window.__CT_SEEK = true; try { localStorage.setItem("card-transition:dir", dir); } catch (e) {} }, [seek, dir]);
  return c;
}
async function homeAtCard(page, wantMeasured = true) {
  await page.goto(base + "/index.html", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => document.querySelector("a.work-card-mondai").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(2200); // let the works entrance finish
  const m = await page.evaluate(() => { const r = document.querySelector("a.work-card-mondai .work-card__media").getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await page.mouse.move(m.x - 40, m.y - 30); await page.mouse.move(m.x, m.y, { steps: 4 });
  await page.waitForTimeout(700);
  // Home measures the collection in a hidden frame before the move can start on Home.
  if (wantMeasured && await page.evaluate(() => "measured" in window.CardTransition)) await page.waitForFunction(() => window.CardTransition.measured, null, { timeout: 15000 });
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
  const info = await page.evaluate(() => { const C = window.CardTransition; return C.run ? { end: C.duration, T: C.travel, start: C.start } : null; });
  if (!info) { fail(`${dir} ${w}: the arrival did not start`); await c.close(); return null; }
  await page.waitForFunction(() => [...document.querySelectorAll(".ct-img")].every((i) => i.complete));
  // Measured before the frames run: the hand over is one way, so this has to come before the run passes it.
  await page.evaluate((t) => window.CardTransition.seek(t), info.T - 1000 / 60);
  const near = await page.evaluate(() => {
    const R = window.CardTransition.run;
    if (!R || R.handed) return null;
    const out = [];
    const cmp = (word, a, b) => out.push({ word, dx: Math.abs(a.left - b.left), dy: Math.abs(a.top - b.top), dw: Math.abs(a.width - b.width) });
    if (R.X.mark) cmp("wordmark", R.X.mark.getBoundingClientRect(), R.P.wordImg.getBoundingClientRect());
    if (R.X.F) cmp("card frame", { left: R.X.F.x, top: R.X.F.y, width: R.X.F.w }, R.P.liveMedia.getBoundingClientRect());
    return out;
  });
  const arrive = [];
  for (let t = info.start; t <= info.end + 1; t += every) { await page.evaluate((t) => window.CardTransition.seek(t), t); arrive.push({ t, png: await shot(page) }); }
  await page.evaluate((t) => window.CardTransition.seek(t), info.end + 1);
  const lastArrive = await shot(page);
  const state = await page.evaluate(() => ({ layers: document.querySelectorAll(".ct-layer").length, transform: getComputedStyle(document.querySelector(".canvas")).transform }));
  await c.close();
  return { dir, w, h, exit, arrive, lastHome, lastArrive, info, near, state };
}
// Same direction stored as the run it is compared with, so the edit panel's "changed" dot matches too.
async function restShot(w, h, dir = "B") {
  const c = await ctx(w, h, { seek: false, dir });
  const page = await c.newPage();
  await page.goto(base + "/mondai/index.html", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // PR #30's page never loads the Design system card's glitch image on a direct visit (lazy, and held at a
  // zero height clip that never opens; seen on that branch alone, 22 Nov). The comparison uses the page as
  // designed, with that image shown.
  await page.evaluate(() => { for (const i of document.querySelectorAll(".cs-card__media > img")) { i.loading = "eager"; i.style.setProperty("clip-path", "none", "important"); } });
  await page.waitForFunction(() => [...document.querySelectorAll(".cs-card__media > img")].every((i) => i.complete && i.naturalWidth));
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
    for (const dir of DIRS) {
      const rest = gate === "G2" ? await restShot(w, h, dir) : null;
      const r = await stepped(dir, w, h);
      if (!r) continue;
      if (gate === "G1") { const d = await diff(r.lastHome, r.arrive[0].png); console.log(`  ${dir} ${w}: home last vs arrival first mean ${d.mean.toFixed(3)}, off ${(d.big * 100).toFixed(3)}%`); if (!close(d)) fail(`${dir} ${w}: jump across the page change`); }
      if (gate === "CONTROL") { const mid = r.arrive[Math.floor(r.arrive.length / 4)].png; const d = await diff(r.lastHome, mid); console.log(`  ${dir} ${w}: home last vs arrival mid travel mean ${d.mean.toFixed(3)}`); if (!close(d)) ctrl++; }
      if (gate === "G2" && process.env.CT_DUMP) { mkdirSync(OUT, { recursive: true }); writeFileSync(path.join(OUT, `g2-${dir}-${w}-rest.png`), rest); writeFileSync(path.join(OUT, `g2-${dir}-${w}-end.png`), r.lastArrive); }
      if (gate === "G2") { const d = await diff(rest, r.lastArrive); console.log(`  ${dir} ${w}: arrival end vs direct visit mean ${d.mean.toFixed(3)}, off ${(d.big * 100).toFixed(3)}%; layers ${r.state.layers}, transform ${r.state.transform}`); if (!close(d) || r.state.layers || r.state.transform !== "none") fail(`${dir} ${w}: the arrival does not end on the page at rest`); }
      if (gate === "G3" && (!r.near || !r.near.length)) fail(`${dir} ${w}: no word copies to measure`);
      if (gate === "G3") for (const n of r.near || []) { console.log(`  ${dir} ${w}: ${n.word} off by ${n.dx.toFixed(2)}, ${n.dy.toFixed(2)}, width ${n.dw.toFixed(2)}`); if (n.dx > 1.5 || n.dy > 1.5 || n.dw > 1.5) fail(`${dir} ${w}: ${n.word} jumps at the hand over`); }
    }
  }
  if (gate === "CONTROL") { if (ctrl !== WIDTHS.length * DIRS.length) fail(`the comparison passed ${WIDTHS.length * DIRS.length - ctrl} frames that differ`); await done(true); }
  await done(true);
}
if (gate === "G4") {
  for (const [w, h] of WIDTHS) for (const dir of ALL) {
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
      // Inside the page's own entrance trigger (100 px inside the screen) only: below it the page waits for a scroll, as it should.
      const op = (s) => [...document.querySelectorAll(s)].filter((e) => e.getBoundingClientRect().top < innerHeight - 100).map((e) => +getComputedStyle(e).opacity * (getComputedStyle(e).visibility === "visible" ? 1 : 0));
      return { layers: document.querySelectorAll(".ct-layer").length, arriving: document.documentElement.classList.contains("ct-arriving"), transform: getComputedStyle(document.querySelector(".canvas")).transform,
        ops: op(".page-header, .collection__title, .collection__wordmark, .collection__kind, .collection__cards > li, .cs-card__head, .cs-card__media") };
    });
    console.log(`  ${dir} ${w}: navigated after ${nav} ms, arrival ran ${started}, left: layers ${s.layers}, transform ${s.transform}, min opacity ${Math.min(...s.ops)}`);
    if (!started || s.layers || s.arriving || s.transform !== "none" || Math.min(...s.ops) < 1) fail(`${dir} ${w}: wrong owner for the page change or something left behind`);
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
  const s = await page.evaluate(() => ({ url: location.pathname, layers: document.querySelectorAll(".ct-layer").length, arriving: document.documentElement.classList.contains("ct-arriving"), h1: getComputedStyle(document.querySelector(".collection__wordmark")).visibility }));
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
  const brand = await page.evaluate(() => +getComputedStyle(document.querySelector(".collection__title")).opacity);
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
if (gate === "G8") {
  // His 24 Nov note: a pause between Home's fade and the move. Real clock, the collection page held back on
  // the network the way the published build is (about 0.3 s), a video of the click, and the longest run
  // of still frames inside the first second after the click. A pause is a still run inside the move.
  const { execFileSync } = await import("node:child_process");
  const { readdirSync, readFileSync } = await import("node:fs");
  const DELAY = Number(opt("delay", 300));
  for (const [w, h] of WIDTHS) for (const dir of DIRS) {
    const vdir = path.join(OUT, `g8-${dir}-${w}`); rmSync(vdir, { recursive: true, force: true }); mkdirSync(vdir, { recursive: true });
    const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, recordVideo: { dir: vdir, size: { width: w, height: h } } });
    await c.addInitScript((dir) => { try { localStorage.setItem("card-transition:dir", dir); } catch (e) {} }, dir);
    const page = await c.newPage();
    const born = Date.now(); // the video starts with the page
    const m = await homeAtCard(page);
    await c.route("**/mondai/index.html", async (route) => { await new Promise((r) => setTimeout(r, DELAY)); await route.continue(); });
    await page.waitForTimeout(600);
    const clickAt = (Date.now() - born) / 1000;
    await page.mouse.click(m.x, m.y);
    await page.waitForURL(/mondai\/index\.html/, { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await c.close();
    const vid = path.join(vdir, readdirSync(vdir).find((f) => f.endsWith(".webm")));
    const log = path.join(vdir, "diff.txt");
    execFileSync("ffmpeg", ["-v", "error", "-i", vid, "-vf", `scale=240:-1,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=${log}`, "-f", "null", "-"]);
    const rows = []; let t = null;
    for (const line of readFileSync(log, "utf8").split("\n")) {
      const a = line.match(/pts_time:([\d.]+)/); if (a) t = +a[1];
      const b = line.match(/YAVG=([\d.]+)/); if (b && t !== null) rows.push([t, +b[1]]);
    }
    // Still: below 0.5 (screen recording noise reaches 0.3 at 1440; the move itself runs above 1).
    const STILL = 0.5;
    // The click, as timed against the page's birth: the first frame that changes from there on (Home keeps a
    // little motion of its own, so the veil's first frame is the marker).
    const near = rows.filter((r) => r[0] >= clickAt - 0.3 && r[1] > 1);
    if (!near.length) { fail(`${dir} ${w}: no click found in the video`); continue; }
    const start = near[0][0];
    if (process.env.CT_DEBUG) console.log(dir, w, "clickAt", clickAt.toFixed(2), rows.filter((r) => r[0] > clickAt - 0.6 && r[0] < clickAt + 1.6).map((r) => r[0].toFixed(2) + ":" + r[1].toFixed(2)).join(" "));
    let longest = 0, run = 0, at = 0;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] <= start || rows[i][0] > start + 1.0) continue;
      const dt = rows[i][0] - rows[i - 1][0];
      if (rows[i][1] < STILL) { run += dt; if (run > longest) { longest = run; at = rows[i][0] - start - run; } } else run = 0;
    }
    // A flash: one frame much darker than both its neighbours (an empty page painted between the two).
    const lum = path.join(vdir, "lum.txt");
    execFileSync("ffmpeg", ["-v", "error", "-i", vid, "-vf", `scale=240:-1,format=gray,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=${lum}`, "-f", "null", "-"]);
    const L = []; let lt = null;
    for (const line of readFileSync(lum, "utf8").split("\n")) {
      const a = line.match(/pts_time:([\d.]+)/); if (a) lt = +a[1];
      const b = line.match(/YAVG=([\d.]+)/); if (b && lt !== null) L.push([lt, +b[1]]);
    }
    let flashes = 0;
    for (let i = 1; i < L.length - 1; i++) {
      if (L[i][0] <= start || L[i][0] > start + 1.5) continue;
      const lo = Math.min(L[i - 1][1], L[i + 1][1]);
      if (lo > 2 && L[i][1] < lo * 0.6) { flashes++; console.log(`  ${dir} ${w}: dark frame at ${((L[i][0] - start) * 1000).toFixed(0)} ms (${L[i][1].toFixed(1)} against ${lo.toFixed(1)})`); }
    }
    if (flashes) fail(`${dir} ${w}: ${flashes} empty frame(s) between the pages`);
    console.log(`  ${dir} ${w}: longest still stretch in the first second after the click ${(longest * 1000).toFixed(0)} ms (from ${(at * 1000).toFixed(0)} ms), network delay ${DELAY} ms`);
    if (longest > 0.12) fail(`${dir} ${w}: the move pauses for ${(longest * 1000).toFixed(0)} ms`);
  }
  await done(true);
}
console.error("unknown gate " + gate); await done(false);
