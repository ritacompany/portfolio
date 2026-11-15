// Checks for the playground. Run after `npm run build`.
//   node scripts/check.mjs parity    hero and Selected works match the 14 Nov plain HTML site, pixel for pixel
//   node scripts/check.mjs overflow  no sideways scroll from 320 to 1920
//   node scripts/check.mjs behavior  phone menu, phone bar, card hover
//   node scripts/check.mjs layers    a Tailwind utility beats the site CSS; the shadcn button renders
// Each prints one OK token on success and exits 1 otherwise.
//
// The reference is site/ at commit cbb837f (branch claude/relaxed-ride-5mlbdu, 14 Nov), pulled with
// git archive into a temp folder, so nothing in the repo's own site/ is touched.

import { execSync } from "node:child_process";
import { createReadStream, existsSync, mkdtempSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { createRequire } from "node:module";
// require, not import, so a globally installed Playwright (NODE_PATH) is found too.
const { chromium } = createRequire(import.meta.url)("playwright");

const REF_COMMIT = "cbb837f65f97b1cbd124925379a7f6386591f98f";
const HERE = resolve(import.meta.dirname, "..");
const REPO = resolve(HERE, "..");
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

function referenceSite() {
  try { execSync(`git -C "${REPO}" cat-file -e ${REF_COMMIT}`, { stdio: "ignore" }); }
  catch { execSync(`git -C "${REPO}" fetch --depth=50 origin claude/relaxed-ride-5mlbdu`, { stdio: "ignore" }); }
  const dir = mkdtempSync(join(tmpdir(), "pg-ref-"));
  execSync(`git -C "${REPO}" archive ${REF_COMMIT} site | tar -x -C "${dir}"`);
  return join(dir, "site");
}

// The last row is left out: on the site the About section starts there (sections overlap by half a
// pixel), here nothing follows the works.
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

async function parity(browser, pg, ref) {
  const widths = process.env.WIDTHS ? process.env.WIDTHS.split(",").map(Number) : [1920, 1440, 1280, 1200, 1199, 1024, 768, 767, 430, 390, 360, 320];
  let worst = 0;
  for (const w of widths) {
    const shots = [];
    for (const base of [ref, pg]) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      await page.goto(base, { waitUntil: "networkidle" });
      await settle(page);
      const bottom = await page.evaluate(() => Math.ceil(document.querySelector(".works").getBoundingClientRect().bottom + scrollY));
      const png = await page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: w, height: bottom - 1 } });
      shots.push({ bottom, png });
      await page.close();
    }
    if (shots[0].bottom !== shots[1].bottom) { fail(`${w}: works ends at ${shots[0].bottom} on the site, ${shots[1].bottom} here`); continue; }
    const page = await browser.newPage();
    const d = await page.evaluate(async ([a, b]) => {
      const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = `data:image/png;base64,${s}`; });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      const c = document.createElement("canvas"); c.width = ia.width; c.height = ia.height;
      const x = c.getContext("2d");
      x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, c.width, c.height).data;
      x.clearRect(0, 0, c.width, c.height); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, c.width, c.height).data;
      let sum = 0, off = 0;
      for (let k = 0; k < da.length; k += 4) {
        const m = Math.max(Math.abs(da[k] - db[k]), Math.abs(da[k + 1] - db[k + 1]), Math.abs(da[k + 2] - db[k + 2]));
        sum += m; if (m > 24) off++;
      }
      const n = da.length / 4;
      let box = [1e9, 1e9, -1, -1];
      for (let k = 0; k < da.length; k += 4) { const m = Math.max(Math.abs(da[k] - db[k]), Math.abs(da[k + 1] - db[k + 1]), Math.abs(da[k + 2] - db[k + 2])); if (m > 24) { const p = k / 4, px = p % c.width, py = (p / c.width) | 0; box = [Math.min(box[0], px), Math.min(box[1], py), Math.max(box[2], px), Math.max(box[3], py)]; } }
      return { mean: sum / n, offShare: off / n, box };
    }, [shots[0].png.toString("base64"), shots[1].png.toString("base64")]);
    await page.close();
    worst = Math.max(worst, d.mean);
    const line = `${w}px: ${shots[0].bottom}px tall, mean diff ${d.mean.toFixed(3)} of 255, ${(d.offShare * 100).toFixed(3)}% of pixels off${d.box[2] >= 0 ? `, within x ${d.box[0]} to ${d.box[2]}, y ${d.box[1]} to ${d.box[3]}` : ""}`;
    if (d.mean > 0.1 || d.offShare > 0.0002) fail(line); else console.log(`ok ${line}`);
  }
  if (!process.exitCode) console.log(`PARITY_OK ${widths.length} widths, worst mean diff ${worst.toFixed(3)}`);
}

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

const modes = { parity, overflow, behavior, layers };
if (!modes[mode]) { console.error(`usage: node scripts/check.mjs ${Object.keys(modes).join("|")}`); process.exit(2); }
if (!existsSync(join(HERE, "dist/index.html"))) { console.error("run npm run build first"); process.exit(2); }
const pgSrv = await serve(join(HERE, "dist"));
const refSrv = mode === "parity" ? await serve(referenceSite()) : null;
const browser = await chromium.launch();
try { await modes[mode](browser, pgSrv.url, refSrv?.url); }
finally { await browser.close(); pgSrv.server.close(); refSrv?.server.close(); }
