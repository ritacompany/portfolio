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
    const ph = await pg.evaluate(() => { const t = document.querySelector(".works__title"), r = t.getBoundingClientRect();
      return { cur: !!document.querySelector(".site-cursor"), cls: document.documentElement.classList.contains("has-site-cursor"), sw: document.documentElement.scrollWidth, titleH: r.height, titleW: r.width }; });
    // His phone frame (Mobile frames 6382:29154, Selected works) shows the heading; desktop and tablet hide it.
    must(ph.titleH > 20 && ph.titleW > 150, `Selected works heading hidden on the phone: ${ph.titleW} by ${ph.titleH}`);
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

else if (mode === "touch") {
  // On touch screens each work card shows Learn more: his Small button since 23 Nov (it was a Label/14 link the day
  // before). Phone widths check its look, the visible card text, its place and the press fill; tablet widths only
  // check it is there (the tablet session owns its tablet placement). With a mouse at 1440 it is hidden.
  const { chromium } = createRequire(import.meta.url)("playwright");
  const site = join(ROOT, "site");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2" };
  const server = createServer((req, res) => {
    let f = join(site, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f));
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const BASE = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const notes = [];
  const read = (pg) => pg.evaluate(() => [...document.querySelectorAll(".work-card")].map((c) => {
    const l = c.querySelector(".work-card__more"), cs = getComputedStyle(l), r = l.getBoundingClientRect(), m = c.querySelector(".work-card__media").getBoundingClientRect(), card = c.getBoundingClientRect();
    return { card: c.classList[1], disp: cs.display, fs: cs.fontSize, tt: cs.textTransform, fw: cs.fontWeight, border: cs.borderTopWidth, text: l.textContent.trim(),
      bg: cs.backgroundColor, cx: r.x + r.width / 2, cy: r.y + r.height / 2, right: r.right, cardRight: card.right, below: r.top - m.bottom,
      hidden: [...c.querySelectorAll(".work-card__head > *")].filter((e) => getComputedStyle(e).display !== "none" && getComputedStyle(e).opacity !== "1").map((e) => e.textContent.trim()) };
  }));
  try {
    for (const [w, h, phone] of [[360, 780, true], [390, 844, true], [834, 1112, false], [1180, 820, false]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
      const pg = await ctx.newPage();
      await pg.goto(BASE + "/", { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
      const rest = await read(pg);
      for (const r of rest) {
        must(r.disp !== "none" && r.text.toLowerCase() === "learn more", `${w}: ${r.card} has no Learn more on touch`);
        if (!phone) continue;
        must(r.fs === "16px" && r.fw === "700" && r.tt === "uppercase" && r.border === "3px", `${w}: ${r.card} Learn more is not his Small button: ${r.fs} ${r.fw} ${r.tt} ${r.border}`);
        must(Math.abs(r.right - r.cardRight) < 1, `${w}: ${r.card} Learn more not on the card's right edge (${r.right} vs ${r.cardRight})`);
        must(r.bg === "rgba(0, 0, 0, 0)", `${w}: ${r.card} Learn more filled at rest`);
      }
      if (phone) for (let i = 0; i < rest.length; i++) {
        const sel = `.works__cards > .work-card:nth-child(${i + 1})`;
        await pg.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
        await pg.waitForTimeout(2200); // the text fades in over 1.4 s, 0.15 s apart
        const before = (await read(pg))[i];
        must(before.hidden.length === 0, `${w}: ${before.card} card text still hidden once on screen: ${before.hidden.join(", ")}`);
        const cdp = await ctx.newCDPSession(pg);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: before.cx, y: before.cy }] });
        await pg.waitForTimeout(200);
        const pressed = (await read(pg))[i];
        await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
        await pg.waitForTimeout(200);
        const after = (await read(pg))[i];
        must(pressed.bg === "rgb(210, 210, 219)", `${w}: ${pressed.card} press does not fill the button (Neutral/300): ${pressed.bg}`);
        must(Math.abs(pressed.cx - before.cx) < 0.05 && Math.abs(pressed.cy - before.cy) < 0.05, `${w}: ${pressed.card} Learn more moved off its centre on press`);
        must(after.bg === "rgba(0, 0, 0, 0)", `${w}: ${after.card} fill stuck on after the press: ${after.bg}`);
      }
      notes.push(`${w}: ${phone ? rest.map((r) => `${r.card.replace("work-card-", "")} ${r.below.toFixed(0)} under image`).join(", ") : "present"}`);
      await ctx.close();
    }
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pg = await ctx.newPage();
    await pg.goto(BASE + "/", { waitUntil: "load" }); await pg.waitForTimeout(200);
    must((await read(pg)).every((r) => r.disp === "none"), "Learn more under the card shows with a mouse at 1440");
    await ctx.close();
  } finally { await browser.close(); server.close(); }
  done("TOUCH_LINK_OK", notes.join("; "));
}

else if (mode === "mouse") {
  // His correction, 23 Nov: the Learn more link belongs to the phone and tablet layouts, whatever the pointer,
  // and those layouts have no mouse highlight on the cards.
  const { chromium } = createRequire(import.meta.url)("playwright");
  const site = join(ROOT, "site");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2" };
  const server = createServer((req, res) => {
    let f = join(site, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f));
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const BASE = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const notes = [];
  const look = (pg, sel) => pg.evaluate((s) => {
    const c = document.querySelector(s), q = (x) => c.querySelector(x);
    const img = q(".work-card__media > img:not([hidden])") || q(".work-card__media img");
    const vis = [...c.querySelectorAll(".work-card__media img")].map((i) => getComputedStyle(i).transform).join("|");
    const art = q(".work-card__phone-art");
    const btn = q(".work-card__media .button-sm");
    return { name: getComputedStyle(q(".work-card__name")).color, desc: getComputedStyle(q(".work-card__desc")).color,
      imgs: vis, art: art ? getComputedStyle(art).transform : "", btn: btn ? getComputedStyle(btn).opacity : "none",
      more: getComputedStyle(q(".work-card__more")).display, tap: getComputedStyle(c).webkitTapHighlightColor };
  }, sel);
  try {
    for (const [w, h] of [[402, 874], [834, 1112]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h } });
      const pg = await ctx.newPage();
      await pg.goto(BASE + "/", { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
      for (const sel of [".work-card-mondai", ".work-card-haven"]) {
        await pg.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
        await pg.mouse.move(2, 2); await pg.waitForTimeout(2300);
        const rest = await look(pg, sel);
        must(rest.more !== "none", `${w} mouse: ${sel} has no Learn more link`);
        must(rest.tap === "rgba(0, 0, 0, 0)", `${w}: ${sel} draws a tap flash (${rest.tap})`);
        const b = await pg.evaluate((s) => { const r = document.querySelector(s + " .work-card__media").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, sel);
        await pg.mouse.move(b.x - 4, b.y - 4); await pg.mouse.move(b.x, b.y); await pg.waitForTimeout(1200);
        const hov = await look(pg, sel);
        for (const k of ["name", "desc", "imgs", "art", "btn"]) must(hov[k] === rest[k], `${w} mouse: hovering ${sel} changes ${k}: ${rest[k]} -> ${hov[k]}`);
        const st = await pg.evaluate(() => window.SiteCursor && window.SiteCursor.state);
        must(st === "dot", `${w} mouse: cursor over ${sel} is "${st}", expected the plain dot`);
      }
      notes.push(`${w}: link shown, hover inert, cursor dot`);
      await ctx.close();
    }
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pg = await ctx.newPage();
    await pg.goto(BASE + "/", { waitUntil: "load" }); await pg.waitForTimeout(300);
    await pg.evaluate(() => document.querySelector(".work-card-mondai").scrollIntoView({ block: "center" })); await pg.waitForTimeout(400);
    const more = await pg.evaluate(() => getComputedStyle(document.querySelector(".work-card-mondai .work-card__more")).display);
    must(more === "none", "1440 mouse: Learn more link shows; the cursor carries it there");
    const b = await pg.evaluate(() => { const r = document.querySelector(".work-card-mondai .work-card__media").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
    await pg.mouse.move(b.x - 4, b.y - 4); await pg.mouse.move(b.x, b.y); await pg.waitForTimeout(700);
    const st = await pg.evaluate(() => window.SiteCursor && window.SiteCursor.state);
    must(st === "pill", `1440 mouse: cursor over the Mondai card is "${st}", expected Learn more`);
    notes.push("1440: link hidden, cursor Learn more");
    await ctx.close();
  } finally { await browser.close(); server.close(); }
  done("MOUSE_NARROW_OK", notes.join("; "));
}

else if (mode === "wrap") {
  // His ask, 23 Nov: on the phone, Learn more is his Small button on the description's line, and it drops below the
  // description once the two would be 24 px or less apart. Checked at every phone width from 320 to 767 in 1 px
  // steps on touch: on one line the gap is over 24; wrapped, it only wraps when one line could not keep over 24.
  const { chromium } = createRequire(import.meta.url)("playwright");
  const site = join(ROOT, "site");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2" };
  const server = createServer((req, res) => {
    let f = join(site, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f));
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const BASE = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 402, height: 874 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.goto(BASE + "/", { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
  const flips = {};
  let rows = 0, wraps = 0;
  try {
    // The look once: his Small button.
    const look = await pg.evaluate(() => { const b = document.querySelector(".work-card-mondai .work-card__more"), cs = getComputedStyle(b), r = b.getBoundingClientRect();
      return { fs: cs.fontSize, fw: cs.fontWeight, tt: cs.textTransform, border: cs.borderTopWidth, radius: cs.borderTopLeftRadius, w: r.width, h: r.height }; });
    must(look.fs === "16px" && look.fw === "700" && look.tt === "uppercase" && look.border === "3px" && Math.abs(look.w - 129.5) < 2 && Math.abs(look.h - 33.7) < 2,
      `Learn more is not his Small button: ${JSON.stringify(look)}`);
    for (let w = 320; w <= 767; w++) {
      await pg.setViewportSize({ width: w, height: 874 });
      const cards = await pg.evaluate(() => [...document.querySelectorAll(".work-card")].map((c) => {
        const d = c.querySelector(".work-card__desc").getBoundingClientRect(), m = c.querySelector(".work-card__more").getBoundingClientRect(), cr = c.getBoundingClientRect(), img = c.querySelector(".work-card__media").getBoundingClientRect();
        return { card: c.classList[1].replace("work-card-", ""), dl: d.left, dr: d.right, dt: d.top, db: d.bottom, ml: m.left, mr: m.right, mt: m.top, cl: cr.left, cr: cr.right, imgB: img.bottom };
      }));
      for (const k of cards) {
        const sameLine = Math.abs(k.mt - k.dt) < 3 && k.ml > k.dr;
        must(Math.abs(k.mr - k.cr) < 1, `${w}: ${k.card} Learn more off the right edge (${k.mr} vs ${k.cr})`);
        must(Math.abs(k.dl - k.cl) < 1, `${w}: ${k.card} description not on the left edge (${k.dl} vs ${k.cl})`);
        if (sameLine) {
          rows++;
          must(k.ml - k.dr > 24, `${w}: ${k.card} button only ${(k.ml - k.dr).toFixed(1)} from the description on one line`);
          must(Math.abs(k.dt - k.imgB - 20) < 1.5 && Math.abs(k.mt - k.imgB - 20) < 1.5, `${w}: ${k.card} description or button not 20 under the image`);
        } else {
          wraps++;
          const room = (k.cr - k.cl) - (k.dr - k.dl) - (k.mr - k.ml);
          must(room <= 24.5, `${w}: ${k.card} wrapped though one line had ${room.toFixed(1)} px between them`);
          must(k.mt >= k.db + 19, `${w}: ${k.card} wrapped button not under the description`);
        }
        const state = sameLine ? "row" : "wrap";
        if (!flips[k.card]) flips[k.card] = { last: state, at: [] };
        else if (flips[k.card].last !== state) { flips[k.card].at.push(`${state} from ${w}`); flips[k.card].last = state; }
      }
    }
  } finally { await browser.close(); server.close(); }
  must(wraps > 0, "the button never wrapped between 320 and 767, so the wrap was not exercised");
  done("WRAP_OK", `${rows} one line, ${wraps} wrapped; ` + Object.entries(flips).map(([k, v]) => `${k}: ${v.at.join(", ") || v.last}`).join("; "));
}

else { console.log("usage: check.mjs <heads|moved|live|fit|overlap|touch|mouse|wrap>"); process.exit(2); }
