// Checks for the Mondai case study collection (/mondai/, Figma 6331:27875) and the cursor button.
// Gates: reports/mondai-collection-2026-11-20/GATES.md. Needs the dev server: PORT=4318 node scripts/serve.mjs
// Usage: node scripts/check-collection.mjs boxes|fit|cursor|home|reduced|retired|copy
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
const req = createRequire(import.meta.url);
let pw;
try { pw = req("playwright"); } catch { pw = createRequire(join(execSync("npm root -g").toString().trim(), "x.js"))("playwright"); }
const { chromium } = pw;
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BASE || "http://127.0.0.1:4318";
const which = process.argv[2];
const fail = (msg) => { console.log("FAIL: " + msg); process.exitCode = 1; };

// Figma boxes at 1440, page coordinates (frame 6331:27875, from get_metadata on 20 Nov)
const FIG = {
  wordmark: { x: 373.27, y: 106, w: 586.43, h: 157.09 },
  cards: [
    { head: { x: 119, y: 319.09 }, media: { x: 119, y: 353.09, w: 394, h: 469 } },
    { head: { x: 523.67, y: 318.75 }, media: { x: 523.67, y: 353.44, w: 394, h: 469 } },
    { head: { x: 928.33, y: 318.75 }, media: { x: 928.33, y: 353.44, w: 394, h: 469 } },
  ],
};
const near = (a, b, tol = 2) => Math.abs(a - b) <= tol;

async function open(page, path, { w = 1440, h = 949, reduced = false } = {}) {
  await page.setViewportSize({ width: w, height: h });
  await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
}

const browser = await chromium.launch();
const page = await browser.newPage();
try {
  if (which === "boxes") {
    await open(page, "/mondai/", { reduced: true });
    const r = await page.evaluate(() => {
      const box = (el) => { const b = el.getBoundingClientRect(); return { x: b.left, y: b.top + scrollY, w: b.width, h: b.height }; };
      return {
        wordmark: box(document.querySelector(".collection__wordmark img")),
        heads: [...document.querySelectorAll(".cs-card__head")].map(box),
        media: [...document.querySelectorAll(".cs-card__media")].map(box),
      };
    });
    const w = r.wordmark, f = FIG.wordmark;
    if (!(near(w.x, f.x) && near(w.y, f.y) && near(w.w, f.w) && near(w.h, f.h))) fail(`wordmark ${JSON.stringify(w)} vs ${JSON.stringify(f)}`);
    FIG.cards.forEach((c, i) => {
      const hd = r.heads[i], m = r.media[i];
      if (!hd || !near(hd.x, c.head.x) || !near(hd.y, c.head.y)) fail(`card ${i} head ${JSON.stringify(hd)} vs ${JSON.stringify(c.head)}`);
      if (!m || !near(m.x, c.media.x) || !near(m.y, c.media.y) || !near(m.w, c.media.w) || !near(m.h, c.media.h)) fail(`card ${i} media ${JSON.stringify(m)} vs ${JSON.stringify(c.media)}`);
    });
    if (!process.exitCode) console.log("BOXES PASS");
  }

  if (which === "fit") {
    for (const w of [390, 768, 1024, 1440]) {
      await open(page, "/mondai/", { w, h: 900, reduced: true });
      const r = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const sel = ".collection__wordmark, .collection__kind, .cs-card__title, .cs-card__icon, .cs-card__soon, .navbar__logo, .link-nav";
        const els = [...document.querySelectorAll(sel)].filter((e) => e.getClientRects().length);
        const bx = els.map((e) => [e, e.getBoundingClientRect()]);
        const hits = [];
        for (let i = 0; i < bx.length; i++) for (let j = i + 1; j < bx.length; j++) {
          const [a, A] = bx[i], [b, B] = bx[j];
          if (a.contains(b) || b.contains(a)) continue;
          const ix = Math.min(A.right, B.right) - Math.max(A.left, B.left), iy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
          if (ix > 1 && iy > 1) hits.push(`${a.className} x ${b.className}`);
        }
        const offscreen = bx.filter(([, B]) => B.right > innerWidth + 0.5 || B.left < -0.5).map(([e]) => e.className);
        return { over, hits, offscreen };
      });
      if (r.over > 0) fail(`${w}: page scrolls sideways by ${r.over}px`);
      if (r.hits.length) fail(`${w}: overlaps ${r.hits.join("; ")}`);
      if (r.offscreen.length) fail(`${w}: off screen ${r.offscreen.join("; ")}`);
    }
    if (!process.exitCode) console.log("FIT PASS");
  }

  if (which === "cursor") {
    await open(page, "/mondai/");
    await page.waitForTimeout(2500); // the entrance finishes
    const m = await page.locator(".cs-card__link .cs-card__media").boundingBox();
    await page.mouse.move(m.x - 40, m.y + m.height / 2);
    await page.mouse.move(m.x + m.width / 2, m.y + m.height / 2, { steps: 12 });
    await page.waitForTimeout(800);
    const st = await page.evaluate(() => {
      const b = document.querySelector(".cursor-btn");
      const zone = document.querySelector(".cs-card__link [data-cursor]");
      if (!b) return null;
      const r = b.getBoundingClientRect();
      return { text: b.textContent, op: +getComputedStyle(b).opacity, cx: r.left + r.width / 2, cy: r.top + r.height / 2, cursor: getComputedStyle(zone).cursor };
    });
    if (!st) fail("no cursor button after hovering the framework image");
    else {
      if (st.text !== "View case study") fail(`label reads "${st.text}"`);
      if (st.op < 0.99) fail(`button opacity ${st.op}`);
      if (!near(st.cx, m.x + m.width / 2, 3) || !near(st.cy, m.y + m.height / 2, 3)) fail(`button centre ${st.cx},${st.cy} not on the pointer`);
      if (st.cursor !== "none") fail(`system cursor shows (${st.cursor})`);
    }
    // Locked cards: not links, and the button goes away over them
    const locked = await page.evaluate(() => [...document.querySelectorAll(".cs-card-locked")].map((c) => ({ link: !!c.querySelector("a"), cursor: !!c.querySelector("[data-cursor]") })));
    if (locked.length !== 2 || locked.some((l) => l.link || l.cursor)) fail(`locked cards ${JSON.stringify(locked)}`);
    const l = await page.locator(".cs-card-locked .cs-card__media").first().boundingBox();
    await page.mouse.move(l.x + l.width / 2, l.y + l.height / 2, { steps: 12 });
    await page.waitForTimeout(800);
    const gone = await page.evaluate(() => +getComputedStyle(document.querySelector(".cursor-btn")).opacity);
    if (gone > 0.01) fail(`button still shows over a locked card (${gone})`);
    if (!process.exitCode) console.log("CURSOR PASS");
  }

  if (which === "home") {
    await open(page, "/");
    const card = page.locator(".work-card-mondai .work-card__media");
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    const m = await card.boundingBox();
    await page.mouse.move(m.x + 30, m.y + 30);
    await page.mouse.move(m.x + m.width * 0.3, m.y + m.height * 0.4, { steps: 10 });
    await page.waitForTimeout(700);
    const a = await page.evaluate(() => { const b = document.querySelector(".cursor-btn"); if (!b) return null; const r = b.getBoundingClientRect(); return { t: b.textContent, x: r.left + r.width / 2, y: r.top + r.height / 2, op: +getComputedStyle(b).opacity }; });
    await page.mouse.move(m.x + m.width * 0.7, m.y + m.height * 0.6, { steps: 10 });
    await page.waitForTimeout(700);
    const b = await page.evaluate(() => { const r = document.querySelector(".cursor-btn").getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    if (!a) fail("no cursor button on the Mondai card");
    else {
      if (a.t !== "View collection") fail(`Mondai label reads "${a.t}"`);
      if (a.op < 0.99) fail(`opacity ${a.op}`);
      if (!near(a.x, m.x + m.width * 0.3, 3)) fail(`first position ${a.x} vs ${m.x + m.width * 0.3}`);
      if (!near(b.x, m.x + m.width * 0.7, 3) || Math.abs(b.x - a.x) < 50) fail(`did not follow: ${a.x} to ${b.x}`);
    }
    // The fixed Learn more stays hidden under the mouse, shows for keyboard focus
    const fixedHover = await page.evaluate(() => +getComputedStyle(document.querySelector(".work-card-mondai .work-card__media .button-sm")).opacity);
    if (fixedHover > 0.01) fail(`fixed button also shows on hover (${fixedHover})`);
    await page.mouse.move(5, 5);
    await page.evaluate(() => document.querySelector(".work-card-mondai").blur());
    await page.keyboard.press("Tab");
    let tries = 0;
    while (tries++ < 20 && !(await page.evaluate(() => document.activeElement?.classList.contains("work-card-mondai")))) await page.keyboard.press("Tab");
    await page.waitForTimeout(500);
    const fixedFocus = await page.evaluate(() => +getComputedStyle(document.querySelector(".work-card-mondai .work-card__media .button-sm")).opacity);
    if (fixedFocus < 0.99) fail(`keyboard focus does not show the still button (${fixedFocus})`);
    if (!process.exitCode) console.log("HOME PASS");
  }

  if (which === "reduced") {
    await open(page, "/mondai/", { reduced: true });
    const anims = await page.evaluate(() => document.getAnimations().length);
    const hidden = await page.evaluate(() => [...document.querySelectorAll(".collection__title, .cs-card__head, .cs-card__media > img")].filter((e) => getComputedStyle(e).opacity !== "1" || getComputedStyle(e).visibility !== "visible" || getComputedStyle(e).clipPath !== "none").length);
    if (anims) fail(`${anims} animations running on load`);
    if (hidden) fail(`${hidden} items hidden on load`);
    const m = await page.locator(".cs-card__link .cs-card__media").boundingBox();
    await page.mouse.move(m.x + 10, m.y + 10);
    await page.mouse.move(m.x + 120, m.y + 200);
    await page.waitForTimeout(60);
    const st = await page.evaluate(() => { const b = document.querySelector(".cursor-btn"); const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, op: getComputedStyle(b).opacity, tr: b.style.transform }; });
    if (!near(st.x, m.x + 120, 1) || !near(st.y, m.y + 200, 1)) fail(`reduced: button at ${st.x},${st.y}, pointer at ${m.x + 120},${m.y + 200}`);
    if (st.op !== "1" || !/scale\(1(\.0+)?\)/.test(st.tr)) fail(`reduced: opacity ${st.op}, ${st.tr}`);
    if (!process.exitCode) console.log("REDUCED PASS");
  }

  if (which === "retired") {
    const files = [];
    const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); if (statSync(p).isDirectory()) { if (!/dev|motion-lab|vendor|assets/.test(f)) walk(p); } else if (/\.html$/.test(f)) files.push(p); });
    walk("site");
    // Rendered pages only: the shared component sheet (site/dev) keeps the list row component, and CSS
    // comments may cite the old frame as history.
    const old = ['"5812:22999"', '"5812:23014"', '"5812:23015"', '"5812:23016"', "collection__rows", 'href="#design-system"'];
    for (const f of files) { const s = readFileSync(f, "utf8"); old.forEach((o) => { if (s.includes(o)) fail(`${f} still has ${o}`); }); }
    const html = readFileSync("site/mondai/index.html", "utf8");
    if (!html.includes('data-figma-node="6331:27875"')) fail("collection page is not from 6331:27875");
    const dec = readFileSync("docs/DECISIONS.md", "utf8");
    if (!/6331:27875/.test(dec) || !/5812:22999/.test(dec)) fail("DECISIONS.md does not record the retirement");
    if (!process.exitCode) console.log("RETIRED PASS");
  }

  if (which === "copy") {
    await open(page, "/mondai/", { reduced: true });
    const text = await page.evaluate(() => document.body.innerText + " " + [...document.querySelectorAll("[data-cursor]")].map((e) => e.dataset.cursor).join(" ") + " " + [...document.querySelectorAll("img[alt]")].map((i) => i.alt).join(" ") + " " + document.title);
    const home = readFileSync("site/index.html", "utf8").match(/data-cursor="[^"]*"/g) || [];
    const all = text + " " + home.join(" ");
    if (/[–—]|\s--\s|\w--\w/.test(all)) fail("a dash");
    if (/\w+, \w+,? (and|or) \w+/.test(all) && /, (and|or) /.test(all)) fail("an Oxford comma");
    for (const label of [...document_labels(all)]) if (label !== label[0] + label.slice(1).toLowerCase()) fail(`label not sentence case: ${label}`);
    if (!process.exitCode) console.log("COPY PASS");
  }
} finally {
  await browser.close();
}
function* document_labels(s) { for (const m of s.matchAll(/data-cursor="([^"]*)"/g)) yield m[1]; }
