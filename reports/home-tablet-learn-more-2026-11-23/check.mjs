// Checks for reports/home-tablet-learn-more-2026-11-23/GATES.md.
// Usage: node reports/home-tablet-learn-more-2026-11-23/check.mjs <wrap|mouse|press|phone> [page path, default /]
// The page path lets the same checks run on the preview at /dev/home-tablet/ before the change reaches Home.
// Each mode prints its token only after every assertion holds, otherwise the failures, and exits 1.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve, extname, normalize } from "node:path";
import { createServer } from "node:http";
import { createRequire } from "node:module";

const ROOT = resolve(new URL("../../", import.meta.url).pathname);
const mode = process.argv[2];
const PAGE = process.argv[3] || "/";
const fails = [];
const must = (ok, why) => { if (!ok) fails.push(why); };
const done = (token, note = "") => {
  if (fails.length) { console.log(fails.slice(0, 40).map((f) => "FAIL " + f).join("\n") + (fails.length > 40 ? `\n... ${fails.length - 40} more` : "")); process.exit(1); }
  console.log(token + (note ? " " + note : ""));
};

async function open() {
  const { chromium } = createRequire(join(ROOT, "package.json"))("playwright");
  const site = join(ROOT, "site");
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2" };
  const server = createServer((req, res) => {
    let f = join(site, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)));
    if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
    if (!existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f));
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  const browser = await chromium.launch();
  return { browser, server, url: `http://127.0.0.1:${server.address().port}${PAGE}` };
}

if (mode === "wrap") {
  // His ask, 23 Nov, for tablet: description at the left and Learn more at the right of one line under the image;
  // at 24 px or less apart the button drops below the description. Every width 768 to 1199 in 1 px steps, touch.
  const { browser, server, url } = await open();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 1366 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
  const flips = {};
  let rows = 0, wraps = 0;
  try {
    for (let w = 768; w <= 1199; w++) {
      await pg.setViewportSize({ width: w, height: 1366 });
      const cards = await pg.evaluate(() => [...document.querySelectorAll(".work-card")].map((c) => {
        const R = (s) => c.querySelector(s).getBoundingClientRect();
        const d = R(".work-card__desc"), m = R(".work-card__more"), cr = c.getBoundingClientRect(), img = R(".work-card__media"), n = R(".work-card__name");
        const cs = getComputedStyle(c.querySelector(".work-card__more"));
        return { card: c.classList[1].replace("work-card-", ""), dl: d.left, dr: d.right, dt: d.top, db: d.bottom, ml: m.left, mr: m.right, mt: m.top, mw: m.width, mh: m.height,
          cl: cr.left, cr: cr.right, imgT: img.top, imgB: img.bottom, imgL: img.left, nb: n.bottom, fs: cs.fontSize, bw: cs.borderTopWidth, disp: cs.display };
      }));
      for (const k of cards) {
        must(k.disp !== "none" && k.fs === "16px" && k.bw === "3px" && Math.abs(k.mw - 129.5) < 2 && Math.abs(k.mh - 33.7) < 2, `${w}: ${k.card} Learn more is not his Small button`);
        must(k.dt >= k.imgB + 19, `${w}: ${k.card} description is not under the image`);
        must(Math.abs(k.dl - k.imgL) < 1, `${w}: ${k.card} description not at the image's left edge`);
        must(k.nb <= k.imgT, `${w}: ${k.card} name line not above the image`);
        must(Math.abs(k.mr - k.cr) < 1, `${w}: ${k.card} Learn more off the right edge (${k.mr} vs ${k.cr})`);
        const sameLine = Math.abs(k.mt - k.dt) < 3 && k.ml > k.dr;
        if (sameLine) {
          rows++;
          must(k.ml - k.dr > 24, `${w}: ${k.card} button only ${(k.ml - k.dr).toFixed(1)} from the description on one line`);
          must(Math.abs(k.dt - k.imgB - 20) < 1.5 && Math.abs(k.mt - k.imgB - 20) < 1.5, `${w}: ${k.card} description or button not 20 under the image`);
        } else {
          wraps++;
          const room = (k.cr - k.cl) - (k.dr - k.dl) - (k.mr - k.ml);
          must(room <= 24.5, `${w}: ${k.card} wrapped though one line had ${room.toFixed(1)} px between them`);
          must(Math.abs(k.mt - k.db - 20) < 1.5, `${w}: ${k.card} wrapped button not 20 under the description`);
        }
        const state = sameLine ? "row" : "wrap";
        if (!flips[k.card]) flips[k.card] = { last: state, from: 768, at: [] };
        else if (flips[k.card].last !== state) { flips[k.card].at.push(`${state} from ${w}`); flips[k.card].last = state; }
      }
      // His call, 13 Nov: the two images end on one line.
      if (cards.length === 2) must(Math.abs(cards[0].imgB - cards[1].imgB) < 1, `${w}: image bottoms differ (${cards[0].imgB.toFixed(1)} vs ${cards[1].imgB.toFixed(1)})`);
    }
  } finally { await browser.close(); server.close(); }
  must(wraps > 0 && rows > 0, `both states not exercised (${rows} one line, ${wraps} wrapped)`);
  done("TABLET_WRAP_OK", `${rows} one line, ${wraps} wrapped; ` + Object.entries(flips).map(([k, v]) => `${k}: starts ${v.at.length ? (v.last === "row" ? "wrap" : "row") : v.last}${v.at.length ? ", " + v.at.join(", ") : ""}`).join("; "));
}

else if (mode === "mouse") {
  // No mouse hover at tablet widths: hovering a card or its Learn more changes nothing, and the cursor stays a dot.
  // CONTROL=1 adds a hover fill to prove this check can fail.
  const { browser, server, url } = await open();
  const notes = [];
  const look = (pg, sel) => pg.evaluate((s) => {
    const c = document.querySelector(s), q = (x) => c.querySelector(x), cs = (e) => getComputedStyle(e);
    return { name: cs(q(".work-card__name")).color, desc: cs(q(".work-card__desc")).color,
      imgs: [...c.querySelectorAll(".work-card__media img, .work-card__phone-art")].map((i) => cs(i).transform).join("|"),
      btn: cs(q(".work-card__more")).backgroundColor + " " + cs(q(".work-card__more")).color, mediaBtn: cs(q(".work-card__media .button-sm") || c).opacity };
  }, sel);
  try {
    for (const w of [834, 1024, 1180]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 1100 } });
      const pg = await ctx.newPage();
      await pg.goto(url, { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready);
      if (process.env.CONTROL) await pg.addStyleTag({ content: ".work-card:hover .work-card__more { background: rgb(1, 2, 3) !important; }" });
      await pg.waitForTimeout(300);
      for (const sel of [".work-card-mondai", ".work-card-haven"]) {
        await pg.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
        await pg.mouse.move(2, 2); await pg.waitForTimeout(2300);
        const rest = await look(pg, sel);
        for (const part of [".work-card__media", ".work-card__more"]) {
          const b = await pg.evaluate(([s, p]) => { const r = document.querySelector(s + " " + p).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, [sel, part]);
          await pg.mouse.move(b.x - 4, b.y - 4); await pg.mouse.move(b.x, b.y); await pg.waitForTimeout(1200);
          const hov = await look(pg, sel);
          for (const k of Object.keys(rest)) must(hov[k] === rest[k], `${w}: hovering ${sel} ${part} changes ${k}: ${rest[k]} -> ${hov[k]}`);
          const st = await pg.evaluate(() => window.SiteCursor && window.SiteCursor.state);
          must(st === "dot", `${w}: cursor over ${sel} ${part} is "${st}", expected the plain dot`);
          await pg.mouse.move(2, 2); await pg.waitForTimeout(400);
        }
      }
      notes.push(`${w}: hover inert, cursor dot`);
      await ctx.close();
    }
  } finally { await browser.close(); server.close(); }
  done("TABLET_NO_HOVER_OK", notes.join("; "));
}

else if (mode === "press") {
  // On touch at tablet widths a press fills Learn more with Neutral/300 and lets go clean, the button not moving.
  // CONTROL=1 removes the press fill to prove this check can fail.
  const { browser, server, url } = await open();
  const notes = [];
  const read = (pg) => pg.evaluate(() => [...document.querySelectorAll(".work-card")].map((c) => {
    const l = c.querySelector(".work-card__more"), r = l.getBoundingClientRect();
    return { card: c.classList[1], bg: getComputedStyle(l).backgroundColor, cx: r.x + r.width / 2, cy: r.y + r.height / 2 };
  }));
  try {
    for (const [w, h] of [[768, 1024], [834, 1194], [1024, 1366], [1180, 820]]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
      const pg = await ctx.newPage();
      await pg.goto(url, { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready);
      if (process.env.CONTROL) await pg.addStyleTag({ content: ".work-card .work-card__more { background: none !important; }" });
      await pg.waitForTimeout(300);
      for (let i = 0; i < 2; i++) {
        await pg.evaluate((n) => document.querySelectorAll(".work-card")[n].scrollIntoView({ block: "center" }), i);
        await pg.waitForTimeout(2200);
        const before = (await read(pg))[i];
        must(before.bg === "rgba(0, 0, 0, 0)", `${w}: ${before.card} filled at rest: ${before.bg}`);
        const cdp = await ctx.newCDPSession(pg);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: before.cx, y: before.cy }] });
        await pg.waitForTimeout(200);
        const pressed = (await read(pg))[i];
        await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
        await pg.waitForTimeout(200);
        const after = (await read(pg))[i];
        must(pressed.bg === "rgb(210, 210, 219)", `${w}: ${pressed.card} press does not fill the button (Neutral/300): ${pressed.bg}`);
        must(Math.abs(pressed.cx - before.cx) < 0.05 && Math.abs(pressed.cy - before.cy) < 0.05, `${w}: ${pressed.card} Learn more moved on press`);
        must(after.bg === "rgba(0, 0, 0, 0)", `${w}: ${after.card} fill stuck on after the press: ${after.bg}`);
      }
      notes.push(`${w}: both fill on press`);
      await ctx.close();
    }
  } finally { await browser.close(); server.close(); }
  done("TABLET_PRESS_OK", notes.join("; "));
}

else if (mode === "phone") {
  // The phone session owns everything under 768: the phone block of home.css must be byte for byte what it was
  // when this branch started (eecbef2), and so must the desktop rules outside the new tablet block.
  const block = (css) => { const i = css.indexOf("@media (max-width: 767.98px) {\n  /* Mobile type"); const s = i >= 0 ? i : css.indexOf("/* Phone, under 768"); return css.slice(s, css.indexOf("@media (max-width: 767.98px) and (prefers-reduced-motion")); };
  const base = execFileSync("git", ["show", "eecbef2:site/css/home.css"], { cwd: ROOT, encoding: "utf8" });
  const now = readFileSync(join(ROOT, "site/css/home.css"), "utf8");
  must(block(base).length > 2000, "could not find the phone block at eecbef2");
  must(block(base) === block(now), "the phone block of site/css/home.css changed");
  const strip = (css) => css.replace(/\n\/\* Tablet, 768 to 1199: his phone pattern[\s\S]*?\n}\n/, "\n");
  must(strip(now) === base, "home.css changed outside the new tablet block");
  done("PHONE_UNTOUCHED_OK", `${block(now).length} chars of phone rules unchanged`);
}

else { console.log("usage: check.mjs <wrap|mouse|press|phone> [page path]"); process.exit(2); }
