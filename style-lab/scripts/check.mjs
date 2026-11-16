// Checks for the style lab. Run after `npm run build`.
//   node scripts/check.mjs figma     the whole page at 1440 (no style) against Figma's renders of his Hero master
//   node scripts/check.mjs overflow  no sideways scroll from 320 to 2560, under every style
//   node scripts/check.mjs typelock  every style keeps his copy, type and colour exactly; a planted change is caught
//   node scripts/check.mjs switch    the ?lab switcher lists every style, switches live, and back to base is clean
//   node scripts/check.mjs behavior  phone menu, phone bar, card hover, footer clock, gooey Contact
//   node scripts/check.mjs reduced   reduced motion: every style shows everything on load
//   node scripts/check.mjs stick     the stuck CHDWCK styles hold the word still through the works
//   node scripts/check.mjs pixels    CHDWCK drifts, breaks into blocks in place, spreads and is gone by the works' end
//   node scripts/check.mjs hosted    the hosted build, wrapped like the host: fonts, images, the reset and the lab layer
//   node scripts/check.mjs tuner     the pixel tuner's sliders, handle, dock, resize, collapse, persistence, phone
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

// Load, wait for fonts, walk the page so lazy images load and scroll reveals fire, wait for every drawn
// image and for running animations to finish, back to the top.
async function settle(page, { step = 400, pause = 30 } = {}) {
  await page.evaluate(async ([step, pause]) => {
    await document.fonts.ready;
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, pause)); }
    window.scrollTo(0, h);
    await new Promise((r) => setTimeout(r, pause));
    const drawn = [...document.images].filter((i) => i.getClientRects().length && !i.complete);
    await Promise.race([
      Promise.all(drawn.map((i) => new Promise((r) => { i.onload = i.onerror = r; }))),
      new Promise((r) => setTimeout(r, 8000)),
    ]);
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  }, [step, pause]);
}
// Long enough for any style's reveal tweens to land.
const SETTLE_TWEENS = 2500;

const fail = (msg) => { console.log(`FAIL ${msg}`); process.exitCode = 1; };
const styleIds = async (browser, pg) => {
  const page = await browser.newPage();
  await page.goto(pg, { waitUntil: "networkidle" });
  const ids = await page.evaluate(() => window.__lab.styles);
  await page.close();
  return ids;
};
const withStyle = (pg, id, extra = "") => `${pg}?${id ? `style=${id}` : ""}${extra}`;

// Mean channel difference, share of pixels off by more than 24 of 255, and the box around them. Masked
// rectangles (live text such as the clock) are left out of both the sum and the count.
async function diff(browser, a, b, masks = []) {
  const page = await browser.newPage();
  const d = await page.evaluate(async ([a, b, masks]) => {
    const load = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = `data:image/png;base64,${s}`; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    if (ia.width !== ib.width || ia.height !== ib.height) return { size: [ia.width, ia.height, ib.width, ib.height] };
    const c = document.createElement("canvas"); c.width = ia.width; c.height = ia.height;
    const x = c.getContext("2d");
    x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, c.width, c.height).data;
    x.clearRect(0, 0, c.width, c.height); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, c.width, c.height).data;
    const masked = (px, py) => masks.some((m) => px >= m.x && px < m.x + m.width && py >= m.y && py < m.y + m.height);
    let sum = 0, off = 0, n = 0, box = [1e9, 1e9, -1, -1];
    for (let k = 0; k < da.length; k += 4) {
      const p = k / 4, px = p % c.width, py = (p / c.width) | 0;
      if (masks.length && masked(px, py)) continue;
      n++;
      const m = Math.max(Math.abs(da[k] - db[k]), Math.abs(da[k + 1] - db[k + 1]), Math.abs(da[k + 2] - db[k + 2]));
      sum += m;
      if (m > 24) {
        off++;
        box = [Math.min(box[0], px), Math.min(box[1], py), Math.max(box[2], px), Math.max(box[3], py)];
      }
    }
    return { mean: sum / n, offShare: off / n, box };
  }, [a.toString("base64"), b.toString("base64"), masks]);
  await page.close();
  return d;
}
const crop = async (browser, png, clip) => {
  const page = await browser.newPage({ viewport: { width: clip.width, height: clip.height } });
  await page.setContent(`<body style="margin:0"><div style="width:${clip.width}px;height:${clip.height}px;background:url(data:image/png;base64,${png.toString("base64")}) ${-clip.x}px ${-clip.y}px no-repeat"></div></body>`);
  const out = await page.screenshot({ clip: { x: 0, y: 0, width: clip.width, height: clip.height } });
  await page.close();
  return out;
};

// Figma's renders, saved in reference/ (hero and works 15 Nov by the playground; About and the footer
// 15 Nov for this lab): Hero image 6109:21821 (1440 by 916), Works section 6109:21845 (1440 by 1345),
// About 6109:21873 (1440 by 725), Footer instance 6109:21959 (1440 by 777).
// About's body copy differs from Figma on purpose (Figma holds an older draft), so About is checked as
// its label column in pixels plus every box against the frame's metadata.
const ABOUT_BOXES = [
  // selector, index, x, y, width (Figma metadata, y from the section's top; text boxes are cap trimmed)
  [".about-story .about__label", 0, 40, 33, null],
  [".about-story .about__body", 0, 741, 33, 659],
  [".about-role .about__label", 0, 40, 553, null],
  [".about-role .about__when", 0, 40, 578, null],
  [".about-role .about__body", 0, 740, 553, 660],
  [".about-role", 0, 0, 517, 1440],
];
const ABOUT_HEIGHT = 725;
// Hero and works limits as the playground set them. The footer's sits just above what text antialiasing
// and the bottom row's glyph placement leave (1.61 of 255, 1.72% on 15 Nov); the 14 Nov footer fails it
// (2.77, 2.29%), as does the footer with only the Bold Contact label left over (2.00, 1.89%).
const LIMITS = { hero: { mean: 0.8, off: 0.01 }, works: { mean: 4, off: 0.02 }, aboutLabels: { mean: 0.8, off: 0.01 }, footer: { mean: 1.8, off: 0.019 } };

async function figma(browser, pg) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await page.goto(pg, { waitUntil: "networkidle" });
  await settle(page);
  const geo = await page.evaluate(() => {
    const top = (s) => document.querySelector(s).getBoundingClientRect().top + scrollY;
    const rect = (s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left, y: r.top + scrollY, width: r.width, height: r.height }; };
    return {
      works: top(".works"), about: top(".about"), footer: top(".footer"), aboutH: document.querySelector(".about").getBoundingClientRect().height,
      nav: rect(".footer__nav"), time: rect(".footer__meta time"), page: document.documentElement.scrollHeight,
    };
  });
  const full = await page.screenshot({ fullPage: true });
  const pad = (r, p = 4) => ({ x: Math.floor(r.x - p), y: Math.floor(r.y - p), width: Math.ceil(r.width + 2 * p), height: Math.ceil(r.height + 2 * p) });
  const ftop = Math.floor(geo.footer);
  const parts = [
    ["hero", "reference/figma-hero-1440.png", { x: 0, y: 0, width: 1440, height: 916 }, null, []],
    ["works", "reference/figma-works-1440.png", { x: 0, y: Math.floor(geo.works), width: 1440, height: 1345 }, null, []],
    ["aboutLabels", "reference/figma-about-1440.png", { x: 0, y: Math.floor(geo.about), width: 700, height: 725 }, { x: 0, y: 0, width: 700, height: 725 }, []],
    ["footer", "reference/figma-footer-1440.png", { x: 0, y: ftop, width: 1440, height: Math.min(777, geo.page - ftop) }, null,
      // The live clock and the nav list (Figma lists Testimonials; the site lists Contact until that section exists).
      [pad(geo.time, 6), pad(geo.nav, 6)].map((r) => ({ ...r, y: r.y - ftop }))],
  ];
  for (const [name, file, clip, refClip, masks] of parts) {
    let ref = readFileSync(join(HERE, file));
    if (refClip) ref = await crop(browser, ref, refClip);
    if (clip.height < 777 && name === "footer") ref = await crop(browser, ref, { x: 0, y: 0, width: 1440, height: clip.height });
    const shot = await crop(browser, full, clip);
    const d = await diff(browser, ref, shot, masks);
    if (d.size) { fail(`${name}: sizes differ ${d.size}`); continue; }
    const line = `${name}: mean diff ${d.mean.toFixed(3)} of 255, ${(d.offShare * 100).toFixed(3)}% of pixels off${d.box[2] >= 0 ? `, within x ${d.box[0]} to ${d.box[2]}, y ${d.box[1]} to ${d.box[3]}` : ""}`;
    const limit = LIMITS[name];
    if (d.mean > limit.mean || d.offShare > limit.off) fail(line); else console.log(`ok ${line}`);
  }
  // About boxes against the frame's metadata.
  const boxes = await page.evaluate((list) => {
    const at = document.querySelector(".about").getBoundingClientRect().top;
    return list.map(([s, i]) => { const r = document.querySelectorAll(s)[i].getBoundingClientRect(); return { x: r.left, y: r.top - at, width: r.width }; });
  }, ABOUT_BOXES);
  ABOUT_BOXES.forEach(([s, , x, y, w], k) => {
    const b = boxes[k];
    const bad = Math.abs(b.x - x) > 1.5 || Math.abs(b.y - y) > 1.5 || (w !== null && Math.abs(b.width - w) > 1.5);
    const line = `about box ${s}: x ${b.x.toFixed(2)} y ${b.y.toFixed(2)} w ${b.width.toFixed(2)} (Figma ${x}, ${y}${w === null ? "" : `, ${w}`})`;
    if (bad) fail(line); else console.log(`ok ${line}`);
  });
  if (Math.abs(geo.aboutH - ABOUT_HEIGHT) > 1.5) fail(`about height ${geo.aboutH} (Figma ${ABOUT_HEIGHT})`); else console.log(`ok about height ${geo.aboutH}`);
  await page.close();
  if (!process.exitCode) console.log("FIGMA_OK hero, works, About and footer at 1440");
}

async function overflow(browser, pg) {
  const ids = [null, ...(await styleIds(browser, pg))];
  for (const id of ids) {
    for (const w of [320, 360, 390, 414, 430, 600, 767, 768, 900, 1024, 1199, 1200, 1280, 1366, 1440, 1680, 1920, 2560]) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      await page.goto(withStyle(pg, id), { waitUntil: "networkidle" });
      await settle(page, { step: 600, pause: 20 });
      const r = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      if (r.sw > r.cw) fail(`${id ?? "base"} ${w}: page is ${r.sw} wide in a ${r.cw} window`);
      await page.close();
    }
  }
  if (!process.exitCode) console.log(`NO_OVERFLOW_OK 18 widths, ${ids.length} styles (base included)`);
}

// Every visible character on the page, in order, with the type and colour its element computes. A style
// that splits words into letters still passes, since each letter inherits; a style that changes a word,
// a size or a colour does not. The clock is skipped (it ticks); the switcher is outside the canvas.
function readType() {
  const out = [];
  const roots = [document.querySelector(".canvas"), document.getElementById("site-menu")];
  for (const root of roots) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode, p = n.parentElement;
      if (p.closest("time")) continue;
      const t = n.textContent.replace(/\s+/g, "");
      if (!t) continue;
      const cs = getComputedStyle(p);
      const key = [cs.fontFamily, cs.fontSize, cs.fontWeight, cs.fontStyle, cs.letterSpacing, cs.lineHeight, cs.textTransform, cs.color].join(" | ");
      for (const ch of t) out.push([ch, key]);
    }
  }
  return out;
}
const firstMismatch = (a, b) => {
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (!a[i] || !b[i] || a[i][0] !== b[i][0] || a[i][1] !== b[i][1]) {
      const ctx = (arr) => arr.slice(Math.max(0, i - 12), i + 12).map((x) => x[0]).join("");
      return { at: i, base: a[i], style: b[i], near: ctx(a) };
    }
  }
  return null;
};
async function typelock(browser, pg) {
  const ids = await styleIds(browser, pg);
  for (const width of [1440, 390]) {
    const read = async (id, plant) => {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(withStyle(pg, id), { waitUntil: "networkidle" });
      await settle(page);
      await page.waitForTimeout(id ? SETTLE_TWEENS : 100);
      if (plant) await page.addStyleTag({ content: "@layer lab { .about-role .about__body { font-size: 21px; } }" });
      const t = await page.evaluate(readType);
      await page.close();
      return t;
    };
    const base = await read(null);
    // Control: a one pixel size change on one paragraph must be caught.
    const planted = firstMismatch(base, await read(null, true));
    if (!planted) fail(`${width}: control not caught, the comparator is blind`);
    else console.log(`ok ${width}: control caught at character ${planted.at} ("${planted.near}")`);
    for (const id of ids) {
      const m = firstMismatch(base, await read(id));
      if (m) fail(`${width} ${id}: type or copy changed at character ${m.at} near "${m.near}": base ${JSON.stringify(m.base)} vs ${JSON.stringify(m.style)}`);
      else console.log(`ok ${width} ${id}: ${base.length} characters, type and colour identical`);
    }
  }
  if (!process.exitCode) console.log(`TYPE_LOCK_OK ${ids.length} styles at 1440 and 390, control caught`);
}

async function switcher(browser, pg) {
  const ids = await styleIds(browser, pg);
  if (!ids.length) fail("no styles registered");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${pg}?lab`, { waitUntil: "networkidle" });
  const listed = await page.evaluate(() => ({
    ids: [...document.querySelectorAll("[data-lab-switcher] [data-style-id]")].map((b) => b.dataset.styleId),
    remember: document.querySelector("[data-lab-remember]")?.textContent.trim(),
  }));
  if (JSON.stringify(listed.ids) !== JSON.stringify(ids)) fail(`switcher lists ${listed.ids} but registry has ${ids}`);
  if (!listed.remember) fail("switcher shows no line on what to remember");
  for (const id of ids) {
    await page.click(`[data-lab-switcher] [data-style-id="${id}"]`);
    await page.waitForTimeout(300);
    if (new URL(page.url()).searchParams.get("style") !== id) fail(`picking ${id}: the address did not follow (${page.url()})`);
    const s = await page.evaluate(() => ({
      attr: document.documentElement.dataset.style, lab: window.__lab,
      remember: document.querySelector("[data-lab-remember]")?.textContent.trim(),
      pressed: document.querySelector("[data-lab-switcher] [data-style-id][data-variant='secondary']")?.dataset.styleId,
    }));
    if (s.attr !== id || s.lab.style !== id || !s.lab.setupRan || !s.remember) fail(`picking ${id}: ${JSON.stringify(s)}`);
    else console.log(`ok picked ${id}: data-style set, setup ran, "${s.remember.slice(0, 60)}"`);
  }
  // Back to the base after every style: nothing a style left behind may show (tweens reverted,
  // classes and CSS removed), so the page reads exactly as a fresh base page.
  await page.click("[data-lab-switcher] button:first-of-type");
  await page.waitForTimeout(400);
  for (const y of [1200, 2400, 0]) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(150); }
  const after = await page.evaluate(readVisibility);
  const leftovers = await page.evaluate(() => ({ attr: document.documentElement.dataset.style ?? null, tags: document.querySelectorAll("style[data-lab-style]").length, cls: document.documentElement.className }));
  const fresh = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fresh.goto(`${pg}?lab`, { waitUntil: "networkidle" });
  await fresh.waitForTimeout(400);
  const base = await fresh.evaluate(readVisibility);
  await fresh.close();
  const diffs = after.map((x, i) => (x !== base[i] ? `${base[i]} vs ${x}` : null)).filter(Boolean);
  if (diffs.length || leftovers.attr || leftovers.tags || /lab-/.test(leftovers.cls)) fail(`back to base left something: ${JSON.stringify(leftovers)} ${diffs.slice(0, 3).join("; ")}`);
  else console.log(`ok back to base after ${ids.length} styles: ${after.length} text elements as on a fresh page, no style CSS left`);
  await page.close();
  // Direct link without the switcher.
  const direct = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await direct.goto(withStyle(pg, ids[0]), { waitUntil: "networkidle" });
  await direct.waitForTimeout(200);
  const d = await direct.evaluate(() => ({ attr: document.documentElement.dataset.style, ran: window.__lab.setupRan, switcher: !!document.querySelector("[data-lab-switcher]") }));
  if (d.attr !== ids[0] || !d.ran || d.switcher) fail(`direct ?style: ${JSON.stringify(d)}`);
  await direct.close();
  if (!process.exitCode) console.log(`SWITCH_OK ${ids.length} styles listed and loaded`);
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
  for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
  if (!(await page.evaluate(() => document.getElementById("site-menu").contains(document.activeElement)))) fail("Tab left the open menu");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);
  const closed = await page.evaluate(() => ({
    hidden: document.getElementById("site-menu").hidden,
    locked: document.body.classList.contains("is-locked"),
    focus: document.activeElement?.matches(".page-header .navbar__menu"),
  }));
  if (!(closed.hidden && !closed.locked && closed.focus)) fail(`menu close: ${JSON.stringify(closed)}`);
  await page.evaluate(() => window.scrollTo(0, document.querySelector(".hero").offsetHeight + 200));
  await page.waitForTimeout(400);
  const bar = await page.evaluate(() => {
    const h = document.querySelector(".page-header");
    return { past: h.classList.contains("is-past-hero"), pos: getComputedStyle(h).position, logo: getComputedStyle(h.querySelector(".navbar__logo")).display };
  });
  if (!(bar.past && bar.pos === "fixed" && bar.logo === "block")) fail(`phone bar: ${JSON.stringify(bar)}`);
  await page.close();

  // Desktop: card hover; the footer clock ticks; the outlined Contact button goes gooey.
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
  const t1 = await page.textContent(".footer__meta time");
  await page.waitForTimeout(1300);
  const t2 = await page.textContent(".footer__meta time");
  if (!(/^\d{1,2}:\d{2}:\d{2}[ap]m C[SD]T$/.test(t2) && t1 !== t2)) fail(`clock: "${t1}" then "${t2}"`);
  const goo = await page.evaluate(() => ({ goo: document.querySelector(".footer .button")?.classList.contains("is-goo"), shapes: !!document.querySelector(".footer .goo-shapes"), filter: !!document.getElementById("goo-ring") }));
  if (!(goo.goo && goo.shapes && goo.filter)) fail(`goo: ${JSON.stringify(goo)}`);
  await page.close();
  if (!process.exitCode) console.log(`BEHAVIOR_OK menu, bar, hover, clock ${t2}, goo`);
}

// Reduced motion: each text element's effective opacity and accumulated translation, right after load
// with no scrolling, must equal the base page's. A style that hides things for a reveal fails here if
// it does so without honouring the reader's setting.
function readVisibility() {
  const out = [];
  for (const el of document.querySelectorAll(".canvas *")) {
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    let o = 1, tx = 0, ty = 0;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const cs = getComputedStyle(e);
      o *= parseFloat(cs.opacity);
      if (cs.visibility === "hidden") o = 0;
      if (cs.transform !== "none") { const m = new DOMMatrix(cs.transform); tx += m.e; ty += m.f; }
    }
    out.push(`${el.className}|${o.toFixed(3)}|${tx.toFixed(1)}|${ty.toFixed(1)}`);
  }
  return out;
}
async function reduced(browser, pg) {
  const ids = await styleIds(browser, pg);
  for (const width of [1440, 390]) {
    const read = async (id, plant) => {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      await page.goto(withStyle(pg, id), { waitUntil: "networkidle" });
      if (plant) await page.addStyleTag({ content: "@layer lab { .about-role .about__body { opacity: 0; transform: translateY(40px); } }" });
      await page.waitForTimeout(600);
      const v = await page.evaluate(readVisibility);
      const ran = await page.evaluate(() => window.__lab.setupRan);
      await page.close();
      return { v, ran };
    };
    const base = await read(null);
    // Control: a paragraph hidden for a reveal must be caught.
    const planted = await read(null, true);
    if (!planted.v.some((x, i) => x !== base.v[i])) fail(`${width}: control not caught, the comparator is blind`);
    else console.log(`ok ${width}: control caught`);
    for (const id of ids) {
      const s = await read(id);
      const bad = s.v.map((x, i) => (x !== base.v[i] ? `${base.v[i]} vs ${x}` : null)).filter(Boolean);
      if (s.ran || bad.length || s.v.length !== base.v.length) fail(`${width} ${id}: setup ran ${s.ran}, ${bad.length} elements differ: ${bad.slice(0, 3).join("; ")}`);
      else console.log(`ok ${width} ${id}: ${s.v.length} text elements fully shown, setup skipped`);
    }
  }
  if (!process.exitCode) console.log(`REDUCED_OK ${ids.length} styles at 1440 and 390, control caught`);
}

// Stuck CHDWCK styles: from the hold's start to its end the word's top stays put on screen (within
// 1 px), after the end it leaves with the works, and a click on a card under it still reaches the card.
// Control: the base page, where the word scrolls away, must fail the same hold test.
async function stick(browser, pg) {
  const ids = (await styleIds(browser, pg)).filter((id) => id.startsWith("stuck-"));
  if (!ids.length) fail("no stuck styles registered");
  const probe = async (id, width) => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(withStyle(pg, id), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const [s0, s1] = id
      ? (await page.evaluate(() => document.querySelector(".hero__name").dataset.stick)).split(" ").map(Number)
      : [16, 1300];
    const tops = [];
    for (const y of [s0 + 1, (s0 + s1) / 2, s1 - 1, s1 + 300]) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(250);
      tops.push(await page.evaluate(() => document.querySelector(".hero__name").getBoundingClientRect().top));
    }
    // A point inside the word that also lies on a card, mid hold.
    await page.evaluate((y) => scrollTo(0, y), (s0 + s1) / 2);
    await page.waitForTimeout(250);
    const hit = await page.evaluate(() => {
      const n = document.querySelector(".hero__name").getBoundingClientRect();
      for (const c of document.querySelectorAll(".work-card__media")) {
        const r = c.getBoundingClientRect();
        const x = Math.max(r.left, n.left) + 20, y = (Math.max(r.top, n.top) + Math.min(r.bottom, n.bottom)) / 2;
        if (x < Math.min(r.right, n.right) && y > Math.max(r.top, n.top) && y < Math.min(r.bottom, n.bottom)) {
          return { found: true, card: !!document.elementFromPoint(x, y)?.closest(".work-card") };
        }
      }
      return { found: false };
    });
    await page.close();
    return { tops, s0, s1, hit };
  };
  const held = (t) => Math.abs(t[0] - t[1]) <= 1 && Math.abs(t[1] - t[2]) <= 1;
  const control = await probe(null, 1440);
  if (held(control.tops)) fail(`control: the base page also reads as held ${control.tops}`);
  else console.log(`ok control: base page word moves (${control.tops.map((t) => t.toFixed(0)).join(", ")})`);
  for (const id of ids) {
    for (const width of [1440, 1024]) {
      const r = await probe(id, width);
      const left = r.tops[3] < r.tops[2] - 250;
      const line = `${width} ${id}: held ${r.s0.toFixed(0)} to ${r.s1.toFixed(0)}, tops ${r.tops.map((t) => t.toFixed(1)).join(", ")}, card click ${JSON.stringify(r.hit)}`;
      if (!held(r.tops) || !left || !r.hit.found || !r.hit.card) fail(line); else console.log(`ok ${line}`);
    }
  }
  if (!process.exitCode) console.log(`STICK_OK ${ids.length} styles at 1440 and 1024, control moves`);
}

// Pixel breakup (G12). Reads the engine's own frame through window.__pixelBreak and checks the page.
async function pixels(browser, pg) {
  const open = async (id, width) => {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(withStyle(pg, id), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    return page;
  };
  const at = async (page, y) => { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(250); };
  // Ink mask of the word's box with every section but the hero's name hidden: share of ink kept.
  const inkMask = async (page, box) => {
    const shot = await page.screenshot({ clip: box });
    return page.evaluate(async (b64) => {
      const img = await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = `data:image/png;base64,${b64}`; });
      const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
      const x = c.getContext("2d"); x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, c.width, c.height).data; const m = [];
      for (let k = 0; k < d.length; k += 4) m.push(d[k] + d[k + 1] + d[k + 2] > 300 ? 1 : 0);
      return m;
    }, shot.toString("base64"));
  };
  for (const width of [1440, 1024]) {
    // Control: the base page has no engine and no canvas.
    const base = await open(null, width);
    const baseWorksH = await base.evaluate(() => document.querySelector(".works").offsetHeight);
    const control = await base.evaluate(() => ({ engine: !!window.__pixelBreak, canvas: !!document.querySelector(".lab-px-layer canvas") }));
    await base.close();
    if (control.engine || control.canvas) fail(`${width} control: base page has the breakup ${JSON.stringify(control)}`);
    else console.log(`ok ${width} control: base page has no breakup`);

    const page = await open("pixel-break", width);
    await page.evaluate(() => window.__pixelBreak.freeze(3));
    const f0 = await page.evaluate(() => window.__pixelBreak.frame());
    const set = await page.evaluate(() => window.__pixelBreak.settings);
    const lines = [];
    let bad = false;
    // It breaks the moment the works title first touches the word's bottom (breakAfter 0 by default).
    await at(page, f0.sBreak - 1);
    const meetGap = await page.evaluate(() => document.querySelector(".works__title").getBoundingClientRect().top - document.querySelector(".hero__name").getBoundingClientRect().bottom);
    if (set.breakAfter !== 0 || Math.abs(meetGap) > 2) { bad = true; lines.push(`break is ${meetGap.toFixed(1)} px from the title touching the word's bottom (breakAfter ${set.breakAfter})`); }
    await at(page, 0);
    // Extra space under the works.
    const worksH = await page.evaluate(() => document.querySelector(".works").offsetHeight);
    if (Math.abs(worksH - baseWorksH - set.extraSpace) > 1) { bad = true; lines.push(`works ${worksH} vs base ${baseWorksH}, extra ${set.extraSpace}`); }
    // Drift: the word's screen top moves by drift times the scroll.
    const y1 = Math.max(10, f0.sBreak * 0.2), y2 = f0.sBreak * 0.8;
    await at(page, y1); const t1 = await page.evaluate(() => document.querySelector(".hero__name").getBoundingClientRect().top);
    await at(page, y2); const t2 = await page.evaluate(() => document.querySelector(".hero__name").getBoundingClientRect().top);
    const want = -set.drift * (y2 - y1);
    if (Math.abs(t2 - t1 - want) > 1) { bad = true; lines.push(`drift moved ${(t2 - t1).toFixed(1)} want ${want.toFixed(1)}`); }
    // The works slide over it: the works title is painted above the word where they overlap.
    // Just before and just after the break, with the works hidden, the ink must match.
    await page.addStyleTag({ content: "[data-section='works'] { visibility: hidden !important; } [data-lab-tool], [data-lab-switcher] { display: none !important; }" });
    await at(page, f0.sBreak - 2);
    const fb = await page.evaluate(() => window.__pixelBreak.frame());
    const vis = await page.evaluate(() => getComputedStyle(document.querySelector(".hero__name")).visibility);
    const layerCss = await page.evaluate(() => { const a = getComputedStyle(document.querySelector(".hero__name")), b = getComputedStyle(document.querySelector(".lab-px-layer")); return [a.zIndex, a.mixBlendMode, b.zIndex, b.mixBlendMode].join(); });
    if (layerCss !== "3,difference,3,difference") { bad = true; lines.push(`word and pieces not over the works inverting: ${layerCss}`); }
    const box = { x: Math.max(0, fb.word.x), y: Math.max(0, fb.word.y), width: Math.min(width - Math.max(0, fb.word.x), fb.word.w), height: Math.min(900 - Math.max(0, fb.word.y), fb.word.h) };
    if (box.height < 40) { bad = true; lines.push(`word not on screen at the break (${JSON.stringify(box)})`); }
    const before = await inkMask(page, box);
    await at(page, fb.sBreak + 2);
    const fa = await page.evaluate(() => window.__pixelBreak.frame());
    const visAfter = await page.evaluate(() => getComputedStyle(document.querySelector(".hero__name")).visibility);
    const box2 = { ...box, y: box.y + (fa.word.y - fb.word.y) };
    const after = await inkMask(page, { ...box2, y: Math.max(0, box2.y) });
    let inkB = 0, both = 0;
    for (let k = 0; k < before.length; k++) { if (before[k]) { inkB++; if (after[k]) both++; } }
    const cover = inkB ? both / inkB : 0;
    if (vis !== "visible" || visAfter !== "hidden" || fa.phase !== "break" || cover < 0.9) { bad = true; lines.push(`swap: DOM ${vis} then ${visAfter}, phase ${fa.phase}, canvas covers ${(cover * 100).toFixed(1)}% of the word's ink`); }
    // Halfway: pieces have lifted off and moved away from where they rested.
    await at(page, (f0.sBreak + f0.sEnd) / 2);
    const fm = await page.evaluate(() => window.__pixelBreak.frame());
    if (!(fm.phase === "break" && fm.meanMove > 20 && fm.drawn > 0)) { bad = true; lines.push(`halfway: ${fm.drawn} drawn, mean move ${fm.meanMove.toFixed(1)} px`); }
    // Mixed sizes: whole, half and quarter pieces all exist.
    if (!(f0.sizes[0] > 0 && f0.sizes[1] > 0 && f0.sizes[2] > 0)) { bad = true; lines.push(`sizes ${f0.sizes}`); }
    // All at once: with the ripple at 0, the earliest and latest pieces lift off together, so just
    // after the break every drawn piece has started moving the same amount of its flight.
    if (set.stagger !== 0) { bad = true; lines.push(`default ripple is ${set.stagger}, not all at once`); }
    // The end: works bottom at the window bottom, nothing drawn and the canvas empty.
    await at(page, f0.sEnd + 2);
    const fe = await page.evaluate(() => window.__pixelBreak.frame());
    const empty = await page.evaluate(() => { const c = document.querySelector(".lab-px-layer canvas"); const d = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; let a = 0; for (let k = 3; k < d.length; k += 4) a += d[k]; return a; });
    const worksBottom = await page.evaluate(() => document.querySelector(".works").getBoundingClientRect().bottom);
    if (fe.phase !== "gone" || fe.drawn !== 0 || empty !== 0 || Math.abs(worksBottom - 900) > 4) { bad = true; lines.push(`end: phase ${fe.phase}, ${fe.drawn} drawn, canvas alpha ${empty}, works bottom ${worksBottom.toFixed(1)}`); }
    await page.close();
    const summary = `${width}: ${f0.total} pieces (${f0.sizes[0]} whole, ${f0.sizes[1]} half, ${f0.sizes[2]} quarter), break at ${f0.sBreak.toFixed(0)}, gone at ${f0.sEnd.toFixed(0)}, drift ${(t2 - t1).toFixed(1)} of ${want.toFixed(1)}, swap covers ${(cover * 100).toFixed(1)}%, halfway mean move ${fm.meanMove.toFixed(0)} px, works +${worksH - baseWorksH}`;
    if (bad) fail(`${summary}; ${lines.join("; ")}`); else console.log(`ok ${summary}`);
  }
  if (!process.exitCode) console.log("PIXELS_OK 1440 and 1024, control has none");
}

// The tuner (G13).
async function tuner(browser, pg) {
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(withStyle(pg, "pixel-break"), { waitUntil: "networkidle" });
  await page.evaluate(() => { localStorage.clear(); });
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.evaluate(() => window.__pixelBreak.freeze(3));
  const f0 = await page.evaluate(() => window.__pixelBreak.frame());
  const sig = async () => { await page.waitForTimeout(250); return page.evaluate(() => { const f = window.__pixelBreak.frame(); return `${f.drawn}|${f.sum.toFixed(2)}|${f.sBreak.toFixed(1)}|${f.sEnd.toFixed(1)}`; }); };
  const sliders = await page.$$eval("[data-tuner] input[type=range][data-setting]", (els) => els.map((e) => ({ key: e.dataset.setting, min: +e.min, max: +e.max, value: +e.value })));
  const dead = [];
  for (const sl of sliders) {
    // Hold the page mid breakup, then move this one slider and compare the drawn result.
    await page.evaluate((y) => scrollTo(0, y), (f0.sBreak + f0.sEnd) * 0.5);
    const before = await sig();
    const target = sl.value - sl.min > (sl.max - sl.min) / 2 ? sl.min + (sl.max - sl.min) * 0.2 : sl.min + (sl.max - sl.min) * 0.8;
    await page.$eval(`[data-tuner] input[data-setting="${sl.key}"]`, (el, v) => {
      const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      set.call(el, String(v)); el.dispatchEvent(new Event("input", { bubbles: true }));
    }, target);
    const fr = await page.evaluate(() => window.__pixelBreak.frame());
    if (fr.sBreak !== f0.sBreak || fr.sEnd !== f0.sEnd) await page.evaluate((y) => scrollTo(0, y), (fr.sBreak + fr.sEnd) * 0.5);
    const after = await sig();
    if (before === after) dead.push(sl.key);
    await page.click("[data-tuner-reset]");
    await page.waitForTimeout(150);
  }
  if (dead.length) fail(`sliders with no effect: ${dead.join(", ")}`); else console.log(`ok ${sliders.length} sliders each change the result`);
  // Layer: under, then over again.
  await page.click('[data-tuner] [data-layer="0"]'); await page.waitForTimeout(250);
  const under = await page.evaluate(() => [getComputedStyle(document.querySelector(".hero__name")).zIndex, getComputedStyle(document.querySelector(".lab-px-layer")).mixBlendMode].join());
  await page.click('[data-tuner] [data-layer="1"]'); await page.waitForTimeout(250);
  const over = await page.evaluate(() => [getComputedStyle(document.querySelector(".hero__name")).zIndex, getComputedStyle(document.querySelector(".lab-px-layer")).mixBlendMode].join());
  if (under !== "-1,normal" || over !== "3,difference") fail(`layer toggle: under ${under}, over ${over}`); else console.log("ok layer toggles between under the work and over it inverting");
  // The bob runs on its own: with the clock running, two frames a moment apart differ without scrolling.
  await page.evaluate((y) => scrollTo(0, y), (f0.sBreak + f0.sEnd) * 0.5);
  await page.evaluate(() => window.__pixelBreak.freeze(null));
  await page.waitForTimeout(300);
  const a1 = await page.evaluate(() => window.__pixelBreak.frame().sum);
  await page.waitForTimeout(400);
  const a2 = await page.evaluate(() => window.__pixelBreak.frame().sum);
  await page.evaluate(() => window.__pixelBreak.freeze(3));
  if (a1 === a2) fail("pieces do not float when the page is still"); else console.log("ok pieces keep floating with the page still");
  // Drag the break point handle 120 px right.
  await page.evaluate((y) => scrollTo(0, y), Math.max(0, f0.sBreak - 300));
  await page.waitForTimeout(300);
  const ox0 = await page.evaluate(() => window.__pixelBreak.settings.originX);
  const h = await page.$eval("[data-handle=origin]", (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(h.x + 60, h.y, { steps: 4 }); await page.mouse.move(h.x + 120, h.y, { steps: 4 }); await page.mouse.up();
  await page.waitForTimeout(200);
  const ox1 = await page.evaluate(() => window.__pixelBreak.settings.originX);
  const wordW = await page.evaluate(() => window.__pixelBreak.frame().word.w);
  if (Math.abs((ox1 - ox0) * wordW - 120) > 3) fail(`origin drag moved ${((ox1 - ox0) * wordW).toFixed(1)} px, want 120`); else console.log(`ok break point handle dragged 120 px (origin ${ox0.toFixed(3)} to ${ox1.toFixed(3)})`);
  // Dock: drag the grip to the left half.
  const g = await page.$eval("[data-tuner-grip]", (e) => { const r = e.getBoundingClientRect(); return { x: r.left + 40, y: r.top + r.height / 2 }; });
  await page.mouse.move(g.x, g.y); await page.mouse.down(); await page.mouse.move(300, g.y, { steps: 6 }); await page.mouse.up();
  await page.waitForTimeout(200);
  const dock = await page.$eval("[data-tuner]", (e) => ({ dock: e.dataset.dock, left: e.getBoundingClientRect().left }));
  if (dock.dock !== "left" || dock.left > 40) fail(`dock: ${JSON.stringify(dock)}`); else console.log("ok dragged to the left side and docked there");
  // Resize: drag the inner edge 80 px outward.
  const w0 = await page.$eval("[data-tuner]", (e) => e.getBoundingClientRect().width);
  const rz = await page.$eval("[data-tuner-resize]", (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + 200 }; });
  await page.mouse.move(rz.x, rz.y); await page.mouse.down(); await page.mouse.move(rz.x + 80, rz.y, { steps: 5 }); await page.mouse.up();
  await page.waitForTimeout(200);
  const w1 = await page.$eval("[data-tuner]", (e) => e.getBoundingClientRect().width);
  if (Math.abs(w1 - w0 - 80) > 2) fail(`resize: ${w0} to ${w1}`); else console.log(`ok resized ${w0} to ${w1}`);
  // Collapse and expand.
  await page.click("[data-tuner-collapse]"); await page.waitForTimeout(150);
  const collapsed = await page.evaluate(() => !document.querySelector("[data-tuner]") && !!document.querySelector("[data-tuner-expand]"));
  await page.click("[data-tuner-expand]"); await page.waitForTimeout(150);
  const expanded = await page.evaluate(() => !!document.querySelector("[data-tuner]"));
  if (!collapsed || !expanded) fail(`collapse ${collapsed}, expand ${expanded}`); else console.log("ok collapses and expands");
  // Persist: set block size 7, reload, still 7 and still docked left at the new width.
  await page.$eval('[data-tuner] input[data-setting="block"]', (el) => { const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; set.call(el, "7"); el.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.waitForTimeout(200);
  await page.reload({ waitUntil: "networkidle" }); await page.waitForTimeout(500);
  const kept = await page.evaluate(() => ({ block: window.__pixelBreak.settings.block, origin: window.__pixelBreak.settings.originX, dock: document.querySelector("[data-tuner]")?.dataset.dock, w: document.querySelector("[data-tuner]")?.getBoundingClientRect().width }));
  if (kept.block !== 7 || Math.abs(kept.origin - ox1) > 1e-6 || kept.dock !== "left" || Math.abs(kept.w - w1) > 1) fail(`after reload: ${JSON.stringify(kept)}`); else console.log("ok settings, dock and width survive a reload");
  // Copy settings: the JSON box holds the settings.
  await page.click("[data-tuner-copy]");
  const parsed = await page.$eval("[data-tuner-json]", (e) => { try { return JSON.parse(e.value); } catch { return null; } });
  if (!parsed || parsed.block !== 7 || !("spread" in parsed)) fail("settings JSON missing"); else console.log("ok settings JSON ready to copy");
  await page.evaluate(() => localStorage.clear());
  await page.close();
  // Phone: fits the screen, no sideways scroll, collapses.
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(withStyle(pg, "pixel-break"), { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  // Folded by default on the phone; open it.
  const startsFolded = await page.evaluate(() => !document.querySelector("[data-tuner]") && !!document.querySelector("[data-tuner-expand]"));
  if (!startsFolded) fail("phone: tuner should start folded");
  await page.click("[data-tuner-expand]"); await page.waitForTimeout(150);
  const phone = await page.evaluate(() => { const p = document.querySelector("[data-tuner]").getBoundingClientRect(); return { l: p.left, r: p.right, h: p.height, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }; });
  await page.click("[data-tuner-collapse]"); await page.waitForTimeout(150);
  const phoneCollapsed = await page.evaluate(() => !document.querySelector("[data-tuner]"));
  await page.close();
  if (phone.l < 0 || phone.r > 390 || phone.h > 844 * 0.6 || phone.sw > phone.cw || !phoneCollapsed) fail(`phone: ${JSON.stringify(phone)}, collapsed ${phoneCollapsed}`);
  else console.log(`ok 390: panel ${phone.l.toFixed(0)} to ${phone.r.toFixed(0)}, ${phone.h.toFixed(0)} tall, no sideways scroll, collapses`);
  if (!process.exitCode) console.log("TUNER_OK sliders, handle, dock, resize, collapse, persistence, copy, phone");
}

// The hosted build (G15): built by scripts/hosted.mjs, wrapped the way the host wraps a page (its own
// document with a small unlayered reset, the page in the body), then checked: fonts and images load
// from the relative paths, the site CSS still wins over the reset, and a style's lab layer still
// outranks the site CSS (the bug this caught: a style tag in the head ranked lab below legacy).
async function hosted(browser) {
  const { execSync } = await import("node:child_process");
  const { writeFileSync } = await import("node:fs");
  const dir = join(HERE, "dist-hosted");
  execSync(`node scripts/hosted.mjs ${dir}`, { cwd: HERE, stdio: "ignore" });
  const reset = "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"><style>:root{color-scheme:light;padding:env(safe-area-inset-top,0) 0 env(safe-area-inset-bottom,0)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>";
  writeFileSync(join(dir, "wrapped.html"), `${reset}${readFileSync(join(dir, "index.html"), "utf8")}</body></html>`);
  const srv = await serve(dir);
  const read = async (hash) => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`${srv.url}wrapped.html${hash}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => ({
      style: document.documentElement.dataset.style ?? null,
      font: getComputedStyle(document.querySelector(".hero__lede")).fontFamily,
      satoshi: document.fonts.check("500 20px Satoshi"),
      img: document.querySelector(".work-card-mondai img").naturalWidth,
      wordmarkMax: getComputedStyle(document.querySelector(".footer__wordmark")).maxWidth,
      worksH: document.querySelector(".works").offsetHeight,
      extra: window.__pixelBreak?.settings.extraSpace ?? null,
      blend: getComputedStyle(document.querySelector(".hero__name")).mixBlendMode,
      z: getComputedStyle(document.querySelector(".hero__name")).zIndex,
      switcher: !!document.querySelector("[data-lab-switcher]"),
    }));
    await page.close();
    return r;
  };
  const base = await read("#base");
  const px = await read("");
  const inv = await read("#stuck-invert");
  srv.server.close();
  const checks = [
    ["opens on pixel-break with the switcher", px.style === "pixel-break" && px.switcher],
    ["#base opens the base", base.style === null],
    ["Satoshi loads and the reset does not win", base.satoshi && /Satoshi/.test(base.font)],
    ["images load from the relative paths", base.img > 0],
    ["the reset's img max-width does not win", base.wordmarkMax === "none"],
    ["lab outranks the site CSS (works +extra)", px.extra !== null && Math.abs(px.worksH - base.worksH - px.extra) <= 1],
    ["lab outranks the site CSS (stuck-invert blend)", inv.blend === "difference" && inv.z === "3"],
  ];
  for (const [what, ok] of checks) if (!ok) fail(`hosted: ${what}: ${JSON.stringify({ base, px, inv })}`); else console.log(`ok hosted: ${what}`);
  if (!process.exitCode) console.log("HOSTED_OK wrapped like the host, fonts, images, layers");
}

async function layers(browser, pg) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${pg}?lab`, { waitUntil: "networkidle" });
  await settle(page);
  const r = await page.evaluate(() => {
    const name = document.querySelector(".hero__name");
    const before = getComputedStyle(name).position;
    name.classList.add("fixed");
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

const modes = { figma, overflow, typelock, switch: switcher, behavior, reduced, stick, pixels, tuner, hosted, layers };
if (!modes[mode]) { console.error(`usage: node scripts/check.mjs ${Object.keys(modes).join("|")}`); process.exit(2); }
if (!existsSync(join(HERE, "dist/index.html"))) { console.error("run npm run build first"); process.exit(2); }
const pgSrv = await serve(join(HERE, "dist"));
const browser = await chromium.launch();
try { await modes[mode](browser, pgSrv.url); }
finally { await browser.close(); pgSrv.server.close(); }
