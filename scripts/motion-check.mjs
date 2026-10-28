// Motion checks. Each fails (exit 1) on the mistake it exists to catch. Proven on planted mistakes:
// docs/motion/CHECKS.md. Rules: .claude/motion-rules.md.
//
//   node scripts/motion-check.mjs log docs/motion/<piece>/review_log.md
//       Fails when the last round has an open P0 or no fresh eyes entry.
//   node scripts/motion-check.mjs strips output/motion/<clip>-review --state docs/motion/<piece>/state_list.md [--loop]
//   node scripts/motion-check.mjs strips output/motion/<clip>-review --cuts 0.3,2.8 [--loop]
//       Fails when any cut (or, for a loop, the seam) has no strip, or a strip is not named with its time.
//   node scripts/motion-check.mjs lint [paths...]   (default site/, vendor skipped)
//       Fails on a numeric ScrollTrigger scrub or ScrollTrigger.matchMedia.
//   node scripts/motion-check.mjs perf --page site/haven/ --section "#profile" [--width 1440 --height 900]
//       Scrolls the section in real time with the CPU throttled 4x. Fails on any long animation frame over
//       100 ms, or when more than 5 percent of frames take over 50 ms.
//   node scripts/motion-check.mjs reduced --page site/haven/ --section "#profile" [--media "img, canvas, video, [data-mask]"]
//       With prefers-reduced-motion: reduce, fails if anything inside the section's media changes with time
//       or with scroll.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [mode, ...argv] = process.argv.slice(2);
const str = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const fail = (msg) => { console.error("FAIL  " + msg); process.exitCode = 1; };
const pass = (msg) => console.log("PASS  " + msg);

if (mode === "log") checkLog(argv[0]);
else if (mode === "strips") checkStrips(argv[0]);
else if (mode === "lint") lint(argv.filter((a) => !a.startsWith("--")));
else if (mode === "perf" || mode === "reduced") await browserCheck(mode);
else { console.error("Usage: node scripts/motion-check.mjs <log|strips|lint|perf|reduced> ..."); process.exit(2); }

// ---- Review log: rounds are "## Round N" headings. Problems are lines starting "- P0", "- P1", "- P2".
// Every P0 is fixed before the next round, so any P0 in the last round is still open.
function checkLog(file) {
  if (!file || !existsSync(file)) return fail(`no review log at ${file}`);
  const text = readFileSync(file, "utf8");
  const rounds = text.split(/^## Round /m).slice(1);
  if (!rounds.length) return fail(`${file}: no "## Round N" sections`);
  const last = rounds[rounds.length - 1], n = last.split(/\s/)[0];
  const p0 = last.split("\n").filter((l) => /^\s*-\s*P0\b/.test(l));
  const eyes = /^Fresh eyes:\s*\S/m.test(last);
  const ranked = /^\s*-\s*P[0-2]\b/m.test(last) || /^No problems? (found|left)/mi.test(last);
  if (p0.length) fail(`${file}: round ${n} has ${p0.length} open P0: ${p0[0].trim()}`);
  if (!eyes) fail(`${file}: round ${n} has no "Fresh eyes:" entry`);
  if (!ranked) fail(`${file}: round ${n} lists no ranked problems (P0, P1, P2) and does not say none were found`);
  if (!p0.length && eyes && ranked) pass(`${file}: round ${n} has no open P0 and a fresh eyes entry`);
}

// ---- Cut strips: every cut, and the seam of a loop, has a strip named strip-<kind>-<t>s.png.
function checkStrips(dir) {
  if (!dir || !existsSync(dir)) return fail(`no review folder at ${dir}`);
  let cuts = [];
  if (str("cuts", null)) cuts = str("cuts").split(",").map(Number);
  if (str("state", null)) cuts = cuts.concat([...readFileSync(str("state"), "utf8").matchAll(/^\s*-\s*(\d+(?:\.\d+)?)\s*s\s*:/gm)].map((m) => Number(m[1])));
  if (!cuts.length) return fail("no cuts given: pass --cuts or --state");
  const files = readdirSync(dir).filter((f) => /^strip-(cut|seam)-/.test(f));
  const bad = files.filter((f) => !/^strip-(cut|seam)-\d+\.\d{2}s\.png$/.test(f));
  if (bad.length) fail(`strips not named with their time: ${bad.join(", ")}`);
  const meta = existsSync(path.join(dir, "strips.json")) ? JSON.parse(readFileSync(path.join(dir, "strips.json"), "utf8")) : null;
  const dur = meta ? meta.duration : null, loop = argv.includes("--loop");
  let missing = [];
  for (let c of cuts) {
    const seam = loop && dur !== null && (c <= 1e-3 || c >= dur - 1e-3);
    const name = seam ? `strip-seam-${dur.toFixed(2)}s.png` : `strip-cut-${c.toFixed(2)}s.png`;
    if (!files.includes(name) || statSync(path.join(dir, name)).size === 0) missing.push(`${c.toFixed(2)} s (${name})`);
  }
  if (loop && dur !== null && !files.includes(`strip-seam-${dur.toFixed(2)}s.png`)) missing.push(`loop seam at ${dur.toFixed(2)} s`);
  missing = [...new Set(missing)];
  if (missing.length) fail(`no strip for: ${missing.join(", ")}`);
  else if (!bad.length) pass(`${dir}: ${cuts.length} cuts${loop ? " and the seam" : ""} each have a strip named with its time`);
}

// ---- Lint: numeric scrub lags, so a frame depends on scroll history; matchMedia on ScrollTrigger is deprecated.
function lint(paths) {
  if (!paths.length) paths = ["site"];
  const hits = [];
  const walk = (p) => {
    const full = path.resolve(root, p);
    if (!existsSync(full)) return;
    if (statSync(full).isDirectory()) { for (const f of readdirSync(full)) if (f !== "vendor" && f !== "node_modules") walk(path.join(p, f)); return; }
    if (!/\.(m?js|html)$/.test(full)) return;
    readFileSync(full, "utf8").split("\n").forEach((line, i) => {
      if (/\bscrub\s*:\s*(?:\d|\.\d)/.test(line)) hits.push(`${p}:${i + 1} numeric scrub: ${line.trim()}`);
      if (/ScrollTrigger\s*\.\s*matchMedia/.test(line)) hits.push(`${p}:${i + 1} ScrollTrigger.matchMedia: ${line.trim()}`);
    });
  };
  paths.forEach(walk);
  if (hits.length) fail("scroll lint:\n  " + hits.join("\n  ") + "\n  Use scrub: true or read self.progress; use gsap.matchMedia().");
  else pass(`scroll lint: no numeric scrub or ScrollTrigger.matchMedia in ${paths.join(", ")}`);
}

// ---- Browser checks share a static server and system Chrome, like scripts/render.mjs.
async function browserCheck(which) {
  const PAGE = str("page"), SECTION = str("section");
  if (!PAGE || !SECTION) { console.error("Need --page and --section"); process.exit(2); }
  const W = Number(str("width", 1440)), H = Number(str("height", 900));
  const pwPath = process.env.PLAYWRIGHT_MODULE || path.join(process.env.HOME, ".npm/_npx/31e32ef8478fbf80/node_modules/playwright-core/index.mjs");
  const { chromium } = await import(pathToFileURL(pwPath).href);
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
  const server = createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (p.endsWith("/")) p += "index.html";
      const file = path.join(root, p);
      if (!file.startsWith(root)) throw new Error("bad path");
      const body = await readFile(file);
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const url = `http://127.0.0.1:${server.address().port}/${PAGE.replace(/^\//, "")}`;
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: which === "reduced" ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const range = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect(), top = r.top + scrollY;
    return { start: Math.max(0, top - innerHeight), end: Math.min(document.documentElement.scrollHeight - innerHeight, top + r.height), top, height: r.height };
  }, SECTION);
  if (!range) { await browser.close(); server.close(); return fail(`no element matches ${SECTION}`); }

  if (which === "perf") {
    // Long animation frames come from Chrome's own frame accounting (the LoAF entries a performance trace
    // shows), plus requestAnimationFrame gaps for the share of slow frames.
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.evaluate((y) => window.scrollTo(0, y), range.start);
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      window.__loaf = []; window.__gaps = []; let last = performance.now();
      try { new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__loaf.push(e.duration))).observe({ type: "long-animation-frame", buffered: false }); } catch {}
      const tick = (t) => { window.__gaps.push(t - last); last = t; if (!window.__stop) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    await page.mouse.move(W / 2, H / 2);
    const steps = Math.ceil((range.end - range.start) / 100);
    for (let i = 0; i < steps; i++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(16); }
    await page.waitForTimeout(1500);
    const { loaf, gaps } = await page.evaluate(() => { window.__stop = true; return { loaf: window.__loaf, gaps: window.__gaps.slice(1) }; });
    await browser.close(); server.close();
    const worst = Math.max(0, ...loaf), slow = gaps.filter((g) => g > 50).length, share = gaps.length ? slow / gaps.length : 0;
    const detail = `${gaps.length} frames, ${loaf.length} long animation frames, worst ${worst.toFixed(0)} ms, ${(share * 100).toFixed(1)} percent over 50 ms`;
    if (worst > 100) fail(`perf ${SECTION}: a frame took ${worst.toFixed(0)} ms at 4x CPU throttle (limit 100). ${detail}`);
    else if (share > 0.05) fail(`perf ${SECTION}: ${(share * 100).toFixed(1)} percent of frames over 50 ms at 4x throttle (limit 5). ${detail}`);
    else pass(`perf ${SECTION}: ${detail}`);
    return;
  }

  // Reduced motion: for each media element in the section, compare it across time and across scroll.
  const media = str("media", "img, canvas, video, svg, [data-mask], .phone");
  const count = await page.evaluate(([s, m]) => document.querySelector(s).querySelectorAll(m).length, [SECTION, media]);
  if (!count) { await browser.close(); server.close(); return fail(`reduced ${SECTION}: no media matches "${media}"`); }
  const moved = [];
  const stops = [0, 0.25, 0.5, 0.75, 1].map((f) => range.top + (range.height - H) * f).map((y) => Math.max(0, y));
  for (let i = 0; i < Math.min(count, 12); i++) {
    const loc = page.locator(SECTION).locator(media).nth(i);
    if (!(await loc.isVisible().catch(() => false))) continue;
    let ref = null;
    for (const y of [...new Set(stops.map(Math.round))]) {
      await page.evaluate((y) => { window.scrollTo(0, y); window.dispatchEvent(new Event("scroll")); }, y);
      await page.waitForTimeout(300);
      const box = await loc.boundingBox();
      if (!box || box.y < 0 || box.y + box.height > H || box.height < 4) continue; // only judge it fully on screen
      const a = await loc.screenshot();
      await page.waitForTimeout(700);
      const b = await loc.screenshot();
      if (!a.equals(b)) { moved.push(`media ${i + 1} changes over time at scroll ${y}`); break; }
      if (ref && !ref.equals(a)) { moved.push(`media ${i + 1} changes with scroll at ${y}`); break; }
      ref = a;
    }
  }
  await browser.close(); server.close();
  if (moved.length) fail(`reduced ${SECTION}: motion with prefers-reduced-motion: reduce. ${moved.join("; ")}`);
  else pass(`reduced ${SECTION}: ${count} media elements hold still across time and scroll`);
}
