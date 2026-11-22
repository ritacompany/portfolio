// Checks for reports/home-unify-2026-11-22/GATES.md. Usage: node reports/home-unify-2026-11-22/check.mjs <heads|moved|live>
// Each mode prints its token only after every assertion holds, otherwise the failures, and exits 1.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, extname, normalize } from "node:path";
import { createServer } from "node:http";
import { createRequire } from "node:module";

const ROOT = resolve(new URL("../../", import.meta.url).pathname);
const mode = process.argv[2];
const fails = [];
const must = (ok, why) => { if (!ok) fails.push(why); };
const done = (token, note = "") => {
  if (fails.length) { console.log(fails.map((f) => "FAIL " + f).join("\n")); process.exit(1); }
  console.log(token + (note ? " " + note : ""));
};
const read = (p) => readFileSync(join(ROOT, p), "utf8");

if (mode === "heads") {
  // The three versions of Home, by the commits each one ended on when this branch was made (22 Nov).
  const heads = { "working branch claude/relaxed-ride-5mlbdu": "e622519", "main": "b0822b0", "PR 40 claude/pensive-cray-tn22je": "d74fc5e" };
  for (const [name, sha] of Object.entries(heads)) {
    try { execFileSync("git", ["merge-base", "--is-ancestor", sha, "HEAD"], { cwd: ROOT }); }
    catch { fails.push(`${name} (${sha}) is not in HEAD`); }
  }
  done("HEADS_OK", Object.keys(heads).length + " heads");
}

else if (mode === "moved") {
  const prev = "site/dev/preview";
  for (const f of ["home-motion.js", "home-motion.css", "works-bridge.js", "site-cursor.js", "site-cursor.css", "img"])
    must(!existsSync(join(ROOT, prev, f)), `${prev}/${f} still exists`);
  must(existsSync(join(ROOT, "site/js/home-motion.js")), "site/js/home-motion.js missing");
  must(existsSync(join(ROOT, "site/js/site-cursor.js")), "site/js/site-cursor.js missing");
  must(/\.site-cursor__shape\s*\{/.test(read("site/css/components.css")), "cursor styles not in components.css");
  must(/html\.hm \.home \.hm-item \{ opacity: 0; \}/.test(read("site/css/home.css")), "text entrance styles not in home.css");
  const home = read("site/index.html");
  must(home.includes('src="/js/home-motion.js"') && home.includes('src="/vendor/lenis-1.1.20.min.js"'), "Home does not load Lenis and home-motion.js");
  for (const p of ["site/index.html", "site/haven/index.html", "site/mondai/index.html", "site/mondai/framework/index.html"])
    must(read(p).includes('src="/js/site-cursor.js"'), `${p} does not load the site cursor`);
  // No tuning code on the real site: panels, saved slider values and edit panel registration stay in the preview.
  const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? (/(dev|motion-lab|lib|vendor)$/.test(p) ? [] : walk(p)) : [p]; });
  for (const p of walk(join(ROOT, "site")).filter((p) => /\.(js|css|html)$/.test(p))) {
    const s = readFileSync(p, "utf8"), rel = p.slice(ROOT.length);
    must(!/EditPanel|hm-panel|hm-values|\/dev\/preview\//.test(s), `${rel} carries preview tuning code`);
  }
  done("MOVED_OK");
}

else if (mode === "live") {
  const { chromium } = createRequire(import.meta.url)("playwright");
  const site = join(ROOT, "site");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".otf": "font/otf", ".ttf": "font/ttf", ".json": "application/json" };
  const server = createServer((req, res) => {
    let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
    let f = join(site, p);
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" });
    res.end(readFileSync(f));
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const BASE = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const notes = [];
  try {
    // 1440, mouse.
    let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    let pg = await ctx.newPage();
    const errors = [];
    pg.on("pageerror", (e) => errors.push(String(e)));
    pg.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await pg.goto(BASE + "/", { waitUntil: "load" });
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(300);
    const start = await pg.evaluate(() => ({ hm: document.documentElement.classList.contains("hm"), lenis: !!(window.__hm && window.__hm.lenis) }));
    must(start.hm && start.lenis, `home motion not running at 1440: ${JSON.stringify(start)}`);
    // About text starts hidden below the screen.
    const before = await pg.evaluate(() => getComputedStyle(document.querySelector(".about-story .about__body > p")).opacity);
    must(before === "0", `About text visible before it is reached: opacity ${before}`);
    // Mondai card at rest is not darkened by a baked hover layer (rest export about 20 of 255; with the layer about 13).
    const mean = await pg.evaluate(async () => {
      const img = document.querySelector(".work-card-mondai .work-card__desk-art");
      await img.decode();
      const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight;
      const g = c.getContext("2d"); g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data; let s = 0;
      for (let i = 0; i < d.length; i += 4) s += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      return s / (d.length / 4);
    });
    must(mean > 17, `Mondai card image at rest is dark (mean ${mean.toFixed(1)}): hover layer baked in`);
    // Scroll to the About section with the wheel, then let Lenis settle and the fades run.
    for (let i = 0; i < 30; i++) { await pg.mouse.wheel(0, 120); await pg.waitForTimeout(30); }
    await pg.waitForTimeout(2600);
    const mid = await pg.evaluate(() => {
      const h = document.querySelector(".page-header").getBoundingClientRect(), about = document.querySelector(".about-story").getBoundingClientRect();
      return { y: scrollY, navTop: h.top, navPos: getComputedStyle(document.querySelector(".page-header")).position, aboutTop: about.top,
        op: getComputedStyle(document.querySelector(".about-story .about__body > p")).opacity };
    });
    must(mid.y > 1000, `the wheel did not scroll the page: scrollY ${mid.y}`);
    must(mid.navPos === "fixed" && Math.abs(mid.navTop - 19) < 1, `nav not fixed at the top after scrolling: ${mid.navPos} at ${mid.navTop}`);
    if (mid.aboutTop < 800) must(mid.op === "1", `About text did not fade in once on screen: opacity ${mid.op}`);
    else fails.push(`About never came on screen to test its fade (top ${mid.aboutTop})`);
    // Cursor turns into Learn more over each card's image.
    for (const sel of [".work-card-mondai", ".work-card-haven"]) {
      await pg.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
      await pg.waitForTimeout(600);
      const b = await pg.evaluate((s) => { const r = document.querySelector(s + " .work-card__media").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, sel);
      await pg.mouse.move(b.x - 5, b.y - 5); await pg.mouse.move(b.x, b.y);
      await pg.waitForTimeout(700);
      const st = await pg.evaluate(() => window.SiteCursor && window.SiteCursor.state);
      must(st === "pill", `cursor is "${st}" over ${sel}, expected the Learn more pill`);
    }
    must(errors.length === 0, `console errors at 1440: ${errors.join(" | ")}`);
    notes.push(`1440 nav fixed at ${mid.navTop}, About opacity ${mid.op}, Mondai rest mean ${mean.toFixed(1)}`);
    await ctx.close();
    // 390, touch.
    ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
    pg = await ctx.newPage();
    await pg.goto(BASE + "/", { waitUntil: "load" });
    await pg.waitForTimeout(400);
    const ph = await pg.evaluate(() => ({ cur: !!document.querySelector(".site-cursor"), cls: document.documentElement.classList.contains("has-site-cursor"), sw: document.documentElement.scrollWidth }));
    must(!ph.cur && !ph.cls, "site cursor runs on a phone");
    must(ph.sw <= 390, `sideways scroll on a phone: scrollWidth ${ph.sw}`);
    notes.push(`390 no cursor, scrollWidth ${ph.sw}`);
    await ctx.close();
  } finally { await browser.close(); server.close(); }
  done("LIVE_OK", notes.join("; "));
}

else if (mode === "fit" || mode === "overlap") {
  // Runs scripts/verify-responsive.mjs <mode> all and fails on any problem not already on the working branch
  // (claude/relaxed-ride-5mlbdu at e622519), whose list is saved in baseline-<mode>.txt next to this file.
  // Those framework page problems belong to the framework sessions and are reported, not fixed, here.
  const base = new Set(read(`reports/home-unify-2026-11-22/baseline-${mode}.txt`).split("\n").filter(Boolean));
  let out = "";
  try { out = execFileSync(process.execPath, [join(ROOT, "scripts/verify-responsive.mjs"), mode, "all"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
  catch (e) { out = (e.stdout || "") + (e.stderr || ""); }
  const now = [...new Set(out.split("\n").filter((l) => /^[a-z]+ @\d+/.test(l)))];
  if (!now.length && !new RegExp(`RESPONSIVE_${mode.toUpperCase()}_OK`).test(out)) fails.push("verify-responsive gave neither problems nor its OK token: " + out.slice(-300));
  for (const l of now) if (!base.has(l)) fails.push("new: " + l);
  done(`NO_NEW_${mode.toUpperCase()}_PROBLEMS`, `${now.length} known, ${base.size} on the working branch`);
}

else { console.log("usage: check.mjs <heads|moved|live|fit|overlap>"); process.exit(2); }
