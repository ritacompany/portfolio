// Captures a live page animation so a review can see the motion itself, not just read the code.
// Rules: .claude/motion-rules.md (Review loop, live capture).
//
//   node scripts/live-capture.mjs --page site/motion-lab/live-review-test.html --target "#pieces" --items "#pieces .card" --hover "#pieces .card"
//
// The page clock is frozen and stepped one frame at a time (Playwright clock), so every frame is captured
// at its true time even though screenshots are slow. For each width (--widths, default 1440,390) it runs
// twice: motion on, and reduced motion on. Each run scrolls the target in from below the screen over the
// first --scroll seconds (default 0.6), then holds while the entrance plays, for --dur seconds in all.
//
// Writes output/motion/live/<page>/:
//   <width>-<motion|reduced>/f000.png ...  every frame
//   <width>-<motion|reduced>-contact.png   frames every --every seconds (default 0.1), labelled with time
//   hover-<width>.png                      frames after the pointer lands on the first --hover element
//   report.md and report.json              measurements, with P0 flags for what a number can decide
//
// Measured: layout shift (the browser's own layout-shift score), text cut off inside --target at the end,
// any movement under reduced motion, each --items element's start, settle and vertical travel, and on
// hover the time to first response and the size change. Pacing, composition and feel stay for the eye.
import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const str = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const PAGE = str("page"), TARGET = str("target");
if (!PAGE || !TARGET) { console.error('Usage: node scripts/live-capture.mjs --page <path> --target "<selector>" [--items sel] [--hover sel] [--widths 1440,390] [--dur 3] [--fps 30]'); process.exit(2); }
const ITEMS = str("items", null), HOVER = str("hover", null);
const WIDTHS = str("widths", "1440,390").split(",").map(Number);
const DUR = Number(str("dur", 3)), FPS = Number(str("fps", 30)), SCROLL = Number(str("scroll", 0.6)), EVERY = Number(str("every", 0.1));
const name = path.basename(PAGE).replace(/\.html$/, "");
const OUT = path.join(root, "output/motion/live", name);
rmSync(OUT, { recursive: true, force: true }); mkdirSync(OUT, { recursive: true });

// Playwright: PLAYWRIGHT_MODULE, this repo's node_modules, or the sibling portfolio-site checkout.
const pw = [process.env.PLAYWRIGHT_MODULE, path.join(root, "node_modules/playwright/index.mjs"), path.join(root, "../portfolio-site/node_modules/playwright/index.mjs")].filter(Boolean).find((p) => existsSync(p));
if (!pw) { console.error("Playwright not found. Run: npm i -D playwright && npx playwright install chromium"); process.exit(2); }
const { chromium } = await import(pathToFileURL(pw).href);

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".mp4": "video/mp4" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
    const file = path.join(root, p); if (!file.startsWith(root)) throw 0;
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" }); res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/${PAGE.replace(/^\//, "")}`;
const browser = await chromium.launch({ headless: true, channel: process.env.MOTION_BROWSER || "chrome" }).catch(() => chromium.launch({ headless: true }));

const step = 1000 / FPS, frames = Math.round(DUR * FPS);
const report = { page: PAGE, target: TARGET, runs: [], hover: [], p0: [] };

// Runs in the page: the state of every watched element, scroll independent.
function probe([target, items]) {
  const t = document.querySelector(target);
  const els = items ? [...document.querySelectorAll(items)] : [];
  const st = els.map((e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return { top: r.top + scrollY, vtop: r.top, inView: r.bottom > 0 && r.top < innerHeight - 100 && r.width > 0, h: r.height, w: r.width, op: +cs.opacity, tf: cs.transform }; });
  const clipped = [];
  if (t) for (const e of t.querySelectorAll("*")) {
    if (!e.childNodes.length || ![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    // Not a visible defect: screen reader only text and decorative tickers marked aria-hidden.
    if (e.closest('[aria-hidden="true"]') || e.getBoundingClientRect().width <= 1 || e.getBoundingClientRect().height <= 1) continue;
    let a = e; while (a && a !== t.parentElement) { const cs = getComputedStyle(a); if ((cs.overflow !== "visible" || cs.overflowX !== "visible") && (e.scrollWidth > a.clientWidth + 1 || e.scrollWidth > e.clientWidth + 1)) { clipped.push(e.textContent.trim().slice(0, 40)); break; } a = a.parentElement; }
  }
  const tr = t ? t.getBoundingClientRect() : null;
  const after = tr ? tr.bottom + scrollY : 0;
  return { st, clipped, cls: window.__cls || 0, shifts: window.__shifts || [], after, sy: scrollY, tTop: tr ? tr.top : 0, tIn: !!tr && tr.bottom > 0 && tr.top < innerHeight };
}

async function sheet(files, out, cols) {
  const p = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const imgs = await Promise.all(files.map(async ([f, label]) => [`data:image/png;base64,${(await readFile(f)).toString("base64")}`, label]));
  await p.setContent(`<body style="margin:0;background:#222;font:12px system-ui;color:#ddd"><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:4px;padding:4px">${imgs.map(([s, l]) => `<div><img src="${s}" style="width:100%;display:block"><div>${l}</div></div>`).join("")}</div></body>`);
  await p.screenshot({ path: out, fullPage: true }); await p.close();
}

for (const W of WIDTHS) {
  const H = W < 700 ? 844 : 900;
  for (const reduced of [false, true]) {
    const tag = `${W}-${reduced ? "reduced" : "motion"}`, dir = path.join(OUT, tag); mkdirSync(dir);
    const ctx = await browser.newContext({ viewport: { width: W, height: H }, reducedMotion: reduced ? "reduce" : "no-preference" });
    await ctx.addInitScript(() => {
      window.__cls = 0; window.__shifts = [];
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push(Math.round(e.startTime)); } }).observe({ type: "layout-shift", buffered: true });
    });
    const page = await ctx.newPage();
    await page.clock.install({ time: 0 }); await page.clock.pauseAt(1000); // paused: time moves only when stepped
    await page.goto(url, { waitUntil: "load" });
    await page.clock.runFor(100);
    const topAt = async () => page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, TARGET);
    const docTop = await topAt();
    const scrollTo = (y) => page.evaluate((y) => { if (window.lenis) window.lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y); }, y);
    const y0 = docTop - H * 1.05, y1 = docTop - H * 0.15;
    await scrollTo(Math.max(0, y0)); await page.clock.runFor(100);
    await page.evaluate(() => { window.__cls = 0; window.__shifts = []; window.__t0 = performance.now(); });
    const samples = [];
    for (let i = 0; i < frames; i++) {
      const t = i / FPS;
      // Aim at where the target is now: pins, spacers and late layout move it after load.
      if (t <= SCROLL) { const k = t / SCROLL, e = k * k * (3 - 2 * k), now = await topAt(); await scrollTo(Math.max(0, now - H * (1.05 - 0.9 * e))); }
      await page.clock.runFor(step);
      const f = path.join(dir, `f${String(i).padStart(3, "0")}.png`);
      await page.screenshot({ path: f });
      samples.push({ t, f, ...(await page.evaluate(probe, [TARGET, ITEMS])) });
    }
    const last = samples.at(-1);
    const push = Math.round(Math.max(...samples.map((s) => Math.abs(s.after - last.after))));
    const run = { width: W, reduced, cls: +last.cls.toFixed(4), shiftsMs: last.shifts, pushPx: push, clipped: [...new Set(last.clipped)], items: [] };
    run.reachedTarget = last.tIn;
    if (!last.tIn) report.toolErrors = [...(report.toolErrors || []), `${tag}: the capture never brought the target into view (it ended ${Math.round(last.tTop)} px from the top). Nothing about this run is a finding.`];
    if (ITEMS) last.st.forEach((fin, j) => {
      const seq = samples.map((s) => ({ t: s.t, sy: s.sy, ...s.st[j] }));
      // Pinned or sticky: holds its place on screen while the page scrolls. Its page position is not motion.
      const moving = seq.filter((s, k) => k && Math.abs(s.sy - seq[k - 1].sy) > 2);
      const pinned = moving.length > 2 && moving.every((s, k) => k === 0 || Math.abs(s.vtop - moving[k - 1].vtop) < 1);
      if (pinned) seq.forEach((s) => { s.top = fin.top; });
      const s0 = seq[0], start = seq.find((s) => s.op > 0.01 && Math.abs(s.op - s0.op) > 0.01) || seq.find((s) => Math.abs(s.top - s0.top) > 0.5);
      const settle = [...seq].reverse().find((s) => Math.abs(s.top - fin.top) > 0.5 || Math.abs(s.op - fin.op) > 0.01 || Math.abs(s.h - fin.h) > 0.5);
      const travel = Math.max(...seq.filter((s) => s.op > 0.01).map((s) => Math.abs(s.top - fin.top)), 0);
      const grew = Math.max(...seq.filter((s) => s.op > 0.01).map((s) => Math.abs(s.h - fin.h)), 0);
      run.items.push({ i: j + 1, pinned, inView: fin.inView, start: start ? +start.t.toFixed(2) : null, settled: settle ? +(settle.t + 1 / FPS).toFixed(2) : 0, travelPx: Math.round(travel), heightChangePx: Math.round(grew), endOpacity: +fin.op.toFixed(2) });
    });
    const starts = run.items.map((x) => x.start).filter((x) => x !== null);
    run.staggerGaps = starts.slice(1).map((s, k) => +(s - starts[k]).toFixed(2));
    run.durations = run.items.map((x) => (x.start === null ? null : +(x.settled - x.start).toFixed(2)));
    if (run.cls > 0.01 || push > 1) report.p0.push(`${tag}: layout shift: the target's bottom edge moved ${push} px during the entrance (browser score ${run.cls})`);
    if (run.clipped.length) report.p0.push(`${tag}: text cut off: ${run.clipped.join(" | ")}`);
    const risers = run.items.filter((x) => x.travelPx > 2);
    if (!reduced && risers.length) report.p0.push(`${tag}: items ${risers.map((x) => x.i).join(", ")} travel ${risers.map((x) => x.travelPx).join(", ")} px while visible: a rise on entry is rejected (motion-patterns.md, fade up); fine only if the style guide says this piece travels`);
    const hidden = run.items.filter((x) => x.inView && x.endOpacity < 0.99);
    if (last.tIn && hidden.length) report.p0.push(`${tag}: items ${hidden.map((x) => x.i).join(", ")} are on screen but not fully visible at the end (opacity ${hidden.map((x) => x.endOpacity).join(", ")})`);
    if (reduced) { const moved = run.items.filter((x) => x.start !== null && (x.travelPx > 0 || x.settled > 0.05)); run.movedUnderReduced = moved.map((x) => x.i); if (moved.length) report.p0.push(`${tag}: items ${moved.map((x) => x.i).join(", ")} still animate with reduced motion on`); }
    if (!last.tIn) report.p0 = report.p0.filter((p) => !p.startsWith(tag + ":"));
    report.runs.push(run);
    const pick = samples.filter((_, i) => i % Math.max(1, Math.round(EVERY * FPS)) === 0).map((s) => [s.f, `${s.t.toFixed(2)} s`]);
    await sheet(pick, path.join(OUT, `${tag}-contact.png`), W < 700 ? 8 : 5);

    if (HOVER && !reduced) {
      const el = page.locator(HOVER).first(); await el.scrollIntoViewIfNeeded(); await page.clock.runFor(3000);
      const box0 = await el.boundingBox(); await page.mouse.move(box0.x + box0.width / 2, box0.y + box0.height / 2);
      const hs = [];
      for (let i = 0; i < 45; i++) { await page.clock.runFor(step); const b = await el.boundingBox(); const f = path.join(dir, `hover${String(i).padStart(2, "0")}.png`); await page.screenshot({ path: f }); hs.push({ t: (i + 1) * step, b, f }); }
      const first = hs.find((h) => Math.abs(h.b.width - box0.width) > 0.5 || Math.abs(h.b.y - box0.y) > 0.5);
      const end = hs.at(-1).b;
      const hv = { width: W, firstResponseMs: first ? Math.round(first.t) : null, sizeChangePct: +(((end.width - box0.width) / box0.width) * 100).toFixed(1) };
      report.hover.push(hv);
      if (hv.firstResponseMs === null) report.p0.push(`${W}: hover shows no change in size or position within 1.5 s (check color only hover by eye)`);
      else if (hv.firstResponseMs > 400) report.p0.push(`${W}: hover takes ${hv.firstResponseMs} ms to respond (over 400 ms)`);
      if (hv.sizeChangePct < -0.5) report.p0.push(`${W}: hover shrinks the target by ${-hv.sizeChangePct}%`);
      await sheet(hs.filter((_, i) => i % 3 === 0).map((h) => [h.f, `+${Math.round(h.t)} ms`]), path.join(OUT, `hover-${W}.png`), 5);
    }
    await ctx.close();
  }
}
await browser.close(); server.close();

const md = [`# Live capture: ${PAGE}`, "", `Target ${TARGET}${ITEMS ? `, items ${ITEMS}` : ""}. ${FPS} fps, ${DUR} s, page clock stepped frame by frame.`, "",
  "## P0 from measurement", ...(report.p0.length ? report.p0.map((p) => `- ${p}`) : ["- none"]), "",
  ...(report.toolErrors ? ["## Capture problems (fix the capture, not the page)", ...report.toolErrors.map((p) => `- ${p}`), ""] : []),
  "## Runs", ...report.runs.flatMap((r) => [`### ${r.width} wide, ${r.reduced ? "reduced motion" : "motion on"}`,
    `- Content below pushed ${r.pushPx} px; browser layout shift score ${r.cls}${r.shiftsMs.length ? ` at ${r.shiftsMs.join(", ")} ms` : ""}`, `- Text cut off: ${r.clipped.length ? r.clipped.join(" | ") : "none"}`,
    ...(r.items.length ? [`- Starts ${r.items.map((x) => x.start ?? "none").join(", ")} s; gaps ${r.staggerGaps.join(", ") || "n/a"} s; durations ${r.durations.map((d) => d ?? "none").join(", ")} s`,
      `- Vertical travel ${r.items.map((x) => x.travelPx).join(", ")} px; height change during entrance ${r.items.map((x) => x.heightChangePx).join(", ")} px`] : []), ""]),
  "## Hover", ...(report.hover.length ? report.hover.map((h) => `- ${h.width} wide: first response ${h.firstResponseMs ?? "none"} ms, size change ${h.sizeChangePct}%`) : ["- not captured"]), "",
  "Look at every contact sheet and hover sheet too: pops, pacing and composition are for the eye."].join("\n");
writeFileSync(path.join(OUT, "report.md"), md + "\n"); writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
console.log(md); console.log(`\nWrote ${path.relative(root, OUT)}`);
console.log(report.toolErrors ? `LIVE_CAPTURE_INCOMPLETE ${report.toolErrors.length}` : report.p0.length ? `LIVE_CAPTURE_P0 ${report.p0.length}` : "LIVE_CAPTURE_CLEAN");
