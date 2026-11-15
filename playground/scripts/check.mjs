// Checks for the playground. Run after `npm run build`.
//   node scripts/check.mjs figma     hero and Selected works at 1440 against Figma's renders of his Hero master
//   node scripts/check.mjs overflow  no sideways scroll from 320 to 2560
//   node scripts/check.mjs behavior  phone menu, phone bar, card hover
//   node scripts/check.mjs layers    a Tailwind utility beats the site CSS; the shadcn button renders
// Each prints one OK token on success and exits 1 otherwise.

import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { createRequire } from "node:module";
// require, not import, so a globally installed Playwright (NODE_PATH) is found too.
const { chromium } = createRequire(import.meta.url)("playwright");

const HERE = resolve(import.meta.dirname, "..");
const mode = process.argv[2];

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json" };
function serve(root) {
  const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
    let file = join(root, path);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok({ server, url: `http://127.0.0.1:${server.address().port}/` })));
}

// Load, wait for fonts, walk the page so lazy images load, wait for every image, back to the top.
async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    // Only drawn images: a lazy image under display: none never loads, so waiting on it would hang.
    const drawn = [...document.images].filter((i) => i.getClientRects().length && !i.complete);
    await Promise.race([
      Promise.all(drawn.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
      new Promise((r) => setTimeout(r, 8000)),
    ]);
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
}

const fail = (msg) => { console.log(`FAIL ${msg}`); process.exitCode = 1; };

// Mean channel difference, share of pixels off by more than 24 of 255, and the box around them.
async function diff(browser, a, b) {
  const page = await browser.newPage();
  const d = await page.evaluate(async ([a, b]) => {
    const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = `data:image/png;base64,${s}`; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    if (ia.width !== ib.width || ia.height !== ib.height) return { size: [ia.width, ia.height, ib.width, ib.height] };
    const c = document.createElement("canvas"); c.width = ia.width; c.height = ia.height;
    const x = c.getContext("2d");
    x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, c.width, c.height).data;
    x.clearRect(0, 0, c.width, c.height); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, c.width, c.height).data;
    let sum = 0, off = 0, box = [1e9, 1e9, -1, -1];
    for (let k = 0; k < da.length; k += 4) {
      const m = Math.max(Math.abs(da[k] - db[k]), Math.abs(da[k + 1] - db[k + 1]), Math.abs(da[k + 2] - db[k + 2]));
      sum += m;
      if (m > 24) {
        off++;
        const p = k / 4, px = p % c.width, py = (p / c.width) | 0;
        box = [Math.min(box[0], px), Math.min(box[1], py), Math.max(box[2], px), Math.max(box[3], py)];
      }
    }
    const n = da.length / 4;
    return { mean: sum / n, offShare: off / n, box };
  }, [a.toString("base64"), b.toString("base64")]);
  await page.close();
  return d;
}

// The hero and works at 1440 against Figma's own renders of Hero image (6109:21821, 1440 by 916) and
// Works section (6109:21845, 1440 by 1345), saved in reference/ on 15 Nov.
async function figma(browser, pg) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await page.goto(pg, { waitUntil: "networkidle" });
  await settle(page);
  const top = await page.evaluate(() => document.querySelector(".works").getBoundingClientRect().top + scrollY);
  const parts = [
    ["hero", "reference/figma-hero-1440.png", { x: 0, y: 0, width: 1440, height: 916 }],
    ["works", "reference/figma-works-1440.png", { x: 0, y: Math.floor(top), width: 1440, height: 1345 }],
  ];
  for (const [name, file, clip] of parts) {
    const shot = await page.screenshot({ fullPage: true, clip });
    const d = await diff(browser, readFileSync(join(HERE, file)), shot);
    if (d.size) { fail(`${name}: sizes differ ${d.size}`); continue; }
    const line = `${name}: mean diff ${d.mean.toFixed(3)} of 255, ${(d.offShare * 100).toFixed(3)}% of pixels off${d.box[2] >= 0 ? `, within x ${d.box[0]} to ${d.box[2]}, y ${d.box[1]} to ${d.box[3]}` : ""}`;
    const limit = LIMITS[name];
    if (d.mean > limit.mean || d.offShare > limit.off) fail(line); else console.log(`ok ${line}`);
  }
  await page.close();
  if (!process.exitCode) console.log("FIGMA_OK hero and works at 1440");
}
// Limits sit just above what text antialiasing (hero) and the card art leave: the card images are
// exports without Figma's grain effect, which alone is 9 of 255 on the Haven image.
const LIMITS = { hero: { mean: 0.8, off: 0.01 }, works: { mean: 4, off: 0.02 } };

async function overflow(browser, pg) {
  for (const w of [320, 360, 390, 414, 430, 600, 767, 768, 900, 1024, 1199, 1200, 1280, 1366, 1440, 1680, 1920, 2560]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(pg, { waitUntil: "networkidle" });
    await settle(page);
    const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    if (r.sw > r.cw) fail(`${w}: page is ${r.sw} wide in a ${r.cw} window`);
    await page.close();
  }
  if (!process.exitCode) console.log("NO_OVERFLOW_OK 18 widths");
}

async function behavior(browser, pg) {
  // Phone: menu opens, locks the page, takes focus; Escape closes it and gives focus back.
  let page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(pg, { waitUntil: "networkidle" });
  await settle(page);
  await page.click(".navbar__menu");
  await page.waitForTimeout(400);
  const opened = await page.evaluate(() => ({
    open: document.getElementById("site-menu").hasAttribute("data-open"),
    visible: getComputedStyle(document.getElementById("site-menu")).opacity === "1",
    locked: document.body.classList.contains("is-locked"),
    focus: document.activeElement?.classList.contains("menu__close"),
    expanded: document.querySelector(".page-header .navbar__menu").getAttribute("aria-expanded"),
  }));
  if (!(opened.open && opened.visible && opened.locked && opened.focus && opened.expanded === "true")) fail(`menu open: ${JSON.stringify(opened)}`);
  await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab"); await page.keyboard.press("Tab");
  const trapped = await page.evaluate(() => document.getElementById("site-menu").contains(document.activeElement));
  if (!trapped) fail("Tab left the open menu");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);
  const closed = await page.evaluate(() => ({
    hidden: document.getElementById("site-menu").hidden,
    locked: document.body.classList.contains("is-locked"),
    focus: document.activeElement?.matches(".page-header .navbar__menu"),
  }));
  if (!(closed.hidden && !closed.locked && closed.focus)) fail(`menu close: ${JSON.stringify(closed)}`);
  // Phone: the bar drops back in, fixed, once the hero has gone.
  await page.evaluate(() => window.scrollTo(0, document.querySelector(".hero").offsetHeight + 200));
  await page.waitForTimeout(400);
  const bar = await page.evaluate(() => {
    const h = document.querySelector(".page-header");
    return { past: h.classList.contains("is-past-hero"), pos: getComputedStyle(h).position, logo: getComputedStyle(h.querySelector(".navbar__logo")).display };
  });
  if (!(bar.past && bar.pos === "fixed" && bar.logo === "block")) fail(`phone bar: ${JSON.stringify(bar)}`);
  await page.close();

  // Desktop: hovering a card eases its image in and turns its labels white.
  page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(pg, { waitUntil: "networkidle" });
  await settle(page);
  await page.hover(".work-card-mondai .work-card__media");
  await page.waitForTimeout(1200);
  const hover = await page.evaluate(() => {
    const m = new DOMMatrix(getComputedStyle(document.querySelector(".work-card-mondai .work-card__media > img")).transform);
    return { scale: m.a, color: getComputedStyle(document.querySelector(".work-card-mondai .work-card__name")).color };
  });
  if (!(Math.abs(hover.scale - 1.035) < 0.002 && hover.color === "rgb(255, 255, 255)")) fail(`card hover: ${JSON.stringify(hover)}`);
  await page.close();
  if (!process.exitCode) console.log("BEHAVIOR_OK menu, bar, hover");
}

async function layers(browser, pg) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${pg}?lab`, { waitUntil: "networkidle" });
  await settle(page);
  const r = await page.evaluate(() => {
    const name = document.querySelector(".hero__name");
    const before = getComputedStyle(name).position;
    name.classList.add("fixed"); // a Tailwind utility the lab switcher already uses
    const after = getComputedStyle(name).position;
    name.classList.remove("fixed");
    const btn = document.querySelector('[data-slot="button"]');
    const bs = btn && getComputedStyle(btn);
    return { before, after, button: !!btn, radius: bs?.borderTopLeftRadius, font: bs?.fontFamily };
  });
  if (r.before !== "absolute" || r.after !== "fixed") fail(`utility did not beat the site CSS: ${JSON.stringify(r)}`);
  if (!r.button || r.radius === "0px" || !/Satoshi/.test(r.font || "")) fail(`shadcn button not styled: ${JSON.stringify(r)}`);
  await page.close();
  if (!process.exitCode) console.log(`LAYERS_OK utility over site CSS, shadcn button radius ${r.radius}`);
}

const modes = { figma, overflow, behavior, layers };
if (!modes[mode]) { console.error(`usage: node scripts/check.mjs ${Object.keys(modes).join("|")}`); process.exit(2); }
if (!existsSync(join(HERE, "dist/index.html"))) { console.error("run npm run build first"); process.exit(2); }
const pgSrv = await serve(join(HERE, "dist"));
const browser = await chromium.launch();
try { await modes[mode](browser, pgSrv.url); }
finally { await browser.close(); pgSrv.server.close(); }
