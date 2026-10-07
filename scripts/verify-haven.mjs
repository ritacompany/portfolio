// Browser checks for the Haven case study page. Run: node scripts/verify-haven.mjs
// Uses playwright-core with the system Chrome. Set PLAYWRIGHT_MODULE to its index.mjs if the default path moves.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pwPath = process.env.PLAYWRIGHT_MODULE || path.join(process.env.HOME, ".npm/_npx/31e32ef8478fbf80/node_modules/playwright-core/index.mjs");
if (!existsSync(pwPath)) { console.error("playwright-core not found at " + pwPath); process.exit(2); }
const { chromium } = await import(pathToFileURL(pwPath).href);

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(root, p);
    if (!file.startsWith(root)) throw new Error("bad path");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/site/haven/`;
const outDir = path.join(root, "output", "haven");
await mkdir(outDir, { recursive: true });

const results = [];
const pass = (name, ok, detail = "") => { results.push({ name, ok, detail }); console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`); };
const browser = await chromium.launch({ channel: "chrome", headless: true });

async function openPage(width, height, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: opts.reduced ? "reduce" : "no-preference", deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [], failed = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + r.url()); });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return { ctx, page, errors, failed };
}

// ---- Layout at every width ----
for (const w of [1920, 1440, 1280, 1159, 1024, 768, 767, 600, 390, 320]) {
  const { ctx, page, errors, failed } = await openPage(w, 900);
  await page.evaluate(async () => {
    window.__haven.revealAll();
    const imgs = [...document.images]; imgs.forEach((i) => { i.loading = "eager"; });
    await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
  });
  await page.waitForTimeout(300);
  const m = await page.evaluate(() => {
    const doc = document.documentElement;
    const over = [...document.querySelectorAll("main *")].filter((e) => {
      if (e.closest(".scroll-x, .ticker, .mask, .ending")) return false;
      const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1);
    }).map((e) => e.className || e.tagName).slice(0, 5);
    const hiddenText = [...document.querySelectorAll(".tb-item")].filter((e) => getComputedStyle(e).visibility === "hidden").length;
    const fonts = [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.weight).sort().join(",");
    const smallTargets = [...document.querySelectorAll("a, button")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 24 || r.width < 24); }).map((e) => e.textContent.trim()).slice(0, 5);
    const cx = (el) => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; };
    const axis = [cx(document.querySelector(".stats__cross")) , cx(document.querySelector(".stat-total .stat__num")), cx(document.querySelector(".stats__arrow")), cx(document.querySelector(".access__insights-title"))].map((v) => Math.round(v * 10) / 10);
    const bridge = document.querySelector(".bridge").getBoundingClientRect().height;
    return { sw: doc.scrollWidth, cw: doc.clientWidth, over, hiddenText, fonts, smallTargets, h: doc.scrollHeight, axis, bridge, vh: innerHeight };
  });
  pass(`${w}: cross, 6, arrow and 5 key insights share one center line`, Math.max(...m.axis) - Math.min(...m.axis) <= 2, m.axis.join(", "));
  pass(`${w}: feedback block fills the screen`, m.bridge >= Math.min(m.vh, 640) - 1, `${Math.round(m.bridge)} vs ${m.vh}`);
  const r3 = await page.evaluate(() => {
    const q = (s) => document.querySelector(s), R = (e) => e.getBoundingClientRect();
    const tl = q(".mvp__timeline"), tlScroll = [...tl.querySelectorAll("*")].some((e) => e.scrollWidth > e.clientWidth + 1 && /auto|scroll/.test(getComputedStyle(e).overflowX));
    const shown = [...tl.querySelectorAll(".mvp__chart, .phases")].filter((e) => getComputedStyle(e).display !== "none").map((e) => e.className.split(" ")[0]);
    const br = R(q(".bridge")), line = R(q(".bridge__line")), text = R(q(".bridge__text"));
    const media = R(q(".program__media")), roles = [...document.querySelectorAll(".role")].map(R);
    const inside = roles.every((r) => r.left >= media.left + media.width * 0.1 - 1 && r.right <= media.right - media.width * 0.1 + 1 && r.top >= media.top - 1 && r.bottom <= media.bottom + 1);
    const centered = Math.abs((roles[0].left + roles[0].right) / 2 - (media.left + media.right) / 2) <= 2;
    const vMid = Math.abs((roles[0].top + roles[1].bottom) / 2 - (media.top + media.bottom) / 2) <= 3;
    const st = q("#quiz-stage");
    return { tlScroll, shown: shown.join(","), lineShare: line.height / br.height, textLower: text.top >= br.top + br.height * 0.4, sticky: getComputedStyle(q(".bridge")).position, inside, centered, vMid, stageMask: st.hasAttribute("data-mask") || !!st.closest("[data-mask]") };
  });
  pass(`${w}: MVP timeline never scrolls sideways`, !r3.tlScroll && r3.shown === (w >= 1160 ? "mvp__chart" : "phases"), JSON.stringify({ s: r3.tlScroll, shown: r3.shown }));
  pass(`${w}: feedback line runs the block height, statement sits in the lower half, block pins`, r3.lineShare > 0.75 && r3.textLower && r3.sticky === "sticky", JSON.stringify({ l: r3.lineShare.toFixed(2), t: r3.textLower, p: r3.sticky }));
  pass(`${w}: program cards centered inside the texture frame`, r3.inside && r3.centered && r3.vMid, JSON.stringify({ i: r3.inside, c: r3.centered, v: r3.vMid }));
  pass(`${w}: quiz stage has no curtain mask`, !r3.stageMask);
  pass(`${w}: no horizontal page overflow`, m.sw <= m.cw, `${m.sw} vs ${m.cw}`);
  pass(`${w}: no element escapes the viewport`, m.over.length === 0, m.over.join(" | "));
  pass(`${w}: all text blocks visible after reveal`, m.hiddenText === 0, String(m.hiddenText));
  pass(`${w}: Satoshi 400, 500, 700, 900 loaded`, m.fonts.includes("400") && m.fonts.includes("500") && m.fonts.includes("700") && m.fonts.includes("900"), m.fonts);
  pass(`${w}: every request succeeded`, failed.length === 0, failed.join(" | "));
  pass(`${w}: no console or page errors`, errors.length === 0, errors.join(" | "));
  pass(`${w}: interactive targets at least 24px`, m.smallTargets.length === 0, m.smallTargets.join(" | "));
  await page.evaluate(() => window.scrollTo(0, 6000)); await page.waitForTimeout(100);
  const nav = await page.evaluate(() => { const n = document.querySelector(".site-nav"), r = n.getBoundingClientRect(); return { pos: getComputedStyle(n).position, top: Math.round(r.top) }; });
  pass(`${w}: nav stays pinned while scrolling`, nav.pos === "fixed" && nav.top === 0, JSON.stringify(nav));
  await page.evaluate(() => window.scrollTo(0, 0));
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src.split("/").pop()));
  pass(`${w}: every image decoded`, broken.length === 0, broken.join(" | "));
  await page.screenshot({ path: path.join(outDir, `haven-${w}.png`), fullPage: true });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const seg = w >= 1024 ? 2700 : 2400;
  for (let y = 0, i = 0; y < total; y += seg, i++) {
    await page.screenshot({ path: path.join(outDir, `seg-${w}-${String(i).padStart(2, "0")}.png`), fullPage: true, clip: { x: 0, y, width: w, height: Math.min(seg, total - y) } });
  }
  await ctx.close();
}

// ---- Motion at 1440 by 900 ----
{
  const { ctx, page } = await openPage(1440, 900);
  await page.waitForTimeout(1500);
  const heroShown = await page.evaluate(() => getComputedStyle(document.querySelector(".hero .tb-item")).opacity === "1" && document.querySelector(".hero__media").dataset.revealed === "true");
  pass("motion: hero text and media reveal on arrival", heroShown);
  const clipOpen = (c) => { const m = /inset\(\S+ \S+ ([\d.]+)%/.exec(c); return c === "none" ? 100 : m ? 100 - parseFloat(m[1]) : (/inset\(0px 0px 0px/.test(c) ? 100 : NaN); };
  const before = await page.evaluate(() => { const pm = document.querySelector(".problem__media"); return { clip: getComputedStyle(pm).clipPath, sc: getComputedStyle(pm.firstElementChild).transform, vis: getComputedStyle(document.querySelector(".problem .tb-item")).visibility }; });
  pass("motion: below the fold starts hidden, mask closed at scale 1.3", clipOpen(before.clip) === 0 && before.sc.startsWith("matrix(1.3") && before.vis === "hidden", JSON.stringify(before));
  // Wheel until the problem media top enters the screen
  for (let i = 0; i < 40; i++) {
    const top = await page.evaluate(() => document.querySelector(".problem__media").getBoundingClientRect().top);
    if (top < 880) break;
    await page.mouse.wheel(0, 120); await page.waitForTimeout(60);
  }
  await page.waitForTimeout(650);
  const mid = await page.evaluate(() => { const pm = document.querySelector(".problem__media"); return { clip: getComputedStyle(pm).clipPath, sc: new DOMMatrix(getComputedStyle(pm.firstElementChild).transform).a }; });
  const midOpen = clipOpen(mid.clip);
  pass("motion: mask mid reveal opens and scale settles together", midOpen > 0 && midOpen < 100 && mid.sc > 1 && mid.sc < 1.3, JSON.stringify(mid));
  await page.waitForTimeout(1800);
  const end = await page.evaluate(() => { const pm = document.querySelector(".problem__media"); const t = getComputedStyle(pm.firstElementChild).transform; return { clip: getComputedStyle(pm).clipPath, sc: t === "none" ? 1 : new DOMMatrix(t).a, op: getComputedStyle(document.querySelector(".problem .tb-item")).opacity }; });
  pass("motion: mask ends fully open at scale 1, text at full opacity", end.clip === "none" && end.sc === 1 && end.op === "1", JSON.stringify(end));

  // Journey flow
  await page.evaluate(() => { const r = document.getElementById("flow-map").getBoundingClientRect(); window.__haven.lenis.scrollTo(r.top + scrollY - innerHeight * 0.6, { immediate: true }); });
  await page.waitForTimeout(700);
  const startOrder = await page.evaluate(() => { const s = document.querySelector('[data-id="select"]'); return getComputedStyle(s).backgroundColor; });
  await page.waitForTimeout(2800);
  const flowEnd = await page.evaluate(() => {
    const stage = document.getElementById("flow-stage"), sr = stage.getBoundingClientRect();
    const order = [...stage.querySelectorAll(".flow__step")].map((e) => ({ k: e.dataset.id, x: e.getBoundingClientRect().left - sr.left })).sort((a, b) => a.x - b.x).map((o) => o.k).join(",");
    return { order, bg: getComputedStyle(stage.querySelector('[data-id="select"]')).backgroundColor };
  });
  pass("motion: flow ends quiz, review, intro, schedule, select", flowEnd.order === "quiz,review,intro,schedule,select", flowEnd.order);
  pass("motion: Select a Confidante is green before and after the move", startOrder === "rgb(92, 196, 60)" && flowEnd.bg === "rgb(92, 196, 60)", `${startOrder} then ${flowEnd.bg}`);

  // Profile: the page scroll drives the phone screen
  const prof = [];
  for (const k of [0.9, 0.3, -0.2, -0.6]) {
    await page.evaluate((k) => { const r = document.getElementById("profile-frame").getBoundingClientRect(); window.__haven.lenis.scrollTo(r.top + scrollY - innerHeight * k, { immediate: true }); }, k);
    await page.waitForTimeout(700);
    prof.push(await page.evaluate(() => { const t = getComputedStyle(document.querySelector("#profile-frame .phone__content")).transform; return t === "none" ? 0 : Math.round(new DOMMatrix(t).f); }));
  }
  pass("profile: screen rests at the top, then scrolls up inside the phone as the page scrolls past", prof[0] === 0 && prof[1] > -40 && prof[2] < prof[1] && prof[3] < prof[2], prof.join(", "));

  // No hover effects: cards keep one style and pills are plain labels
  const hov = await page.evaluate(() => ({ pillButtons: document.querySelectorAll("button.pill").length, tip: !!document.getElementById("insight-tip") }));
  const card = page.locator(".card").nth(2);
  await card.scrollIntoViewIfNeeded();
  const cardBefore = await card.evaluate((e) => getComputedStyle(e).borderColor + getComputedStyle(e.querySelector(".card__title")).color);
  await card.hover(); await page.waitForTimeout(400);
  const cardAfter = await card.evaluate((e) => getComputedStyle(e).borderColor + getComputedStyle(e.querySelector(".card__title")).color);
  pass("no hover: cards stay bright and pills are static", hov.pillButtons === 0 && !hov.tip && cardBefore === cardAfter && cardBefore.includes("rgb(174, 174, 180)"), cardBefore + " / " + cardAfter);

  // Quiz: labels wipe and decode, phone rises then holds at screen center
  const stageTop = await page.evaluate(() => document.getElementById("quiz-stage").getBoundingClientRect().top + scrollY);
  await page.evaluate((y) => window.__haven.lenis.scrollTo(y - innerHeight * 0.55, { immediate: true }), stageTop);
  await page.waitForTimeout(1300);
  const midLabel = await page.evaluate(() => { const t = document.querySelector('.qcol:nth-child(3) .qcol__text'); return { txt: t.textContent, op: getComputedStyle(t).opacity }; });
  await page.waitForTimeout(2200);
  const endLabels = await page.evaluate(() => [...document.querySelectorAll(".qcol")].filter((c) => c.querySelector(".qcol__label").getBoundingClientRect().top < innerHeight * 0.85).map((c) => c.querySelector(".qcol__text").textContent === c.querySelector(".qcol__text").dataset.text && getComputedStyle(c.querySelector(".qcol__bar")).transform === "matrix(1, 0, 0, 1, 0, 0)"));
  pass("quiz: labels scramble then settle on their text with the bar fully drawn", endLabels.length > 0 && endLabels.every(Boolean) && midLabel.txt !== "BELONGING" && midLabel.op === "1", JSON.stringify({ mid: midLabel.txt, end: endLabels }));
  const pins = [];
  const phoneAbs = await page.evaluate(() => { const st = document.getElementById("quiz-stage"); return st.getBoundingClientRect().top + scrollY + document.querySelector(".quiz__phone").offsetTop; });
  for (const d of [20, 150, 300]) {
    await page.evaluate(([y, d]) => window.__haven.lenis.scrollTo(y - 100 + d, { immediate: true }), [phoneAbs, d]);
    await page.waitForTimeout(150);
    pins.push(await page.evaluate(() => Math.round(document.querySelector(".quiz__phone").getBoundingClientRect().top)));
  }
  const exit = await page.evaluate(async () => { const q = document.querySelector(".quiz"); window.__haven.lenis.scrollTo(q.getBoundingClientRect().bottom + scrollY - innerHeight * 0.25, { immediate: true }); await new Promise((r) => setTimeout(r, 200)); const ph = document.querySelector(".quiz__phone"); return { gap: Math.round(q.getBoundingClientRect().bottom - ph.getBoundingClientRect().bottom), op: +getComputedStyle(ph).opacity }; });
  pass("quiz: phone pins on screen, then releases and eases out of the way", pins[0] === pins[1] && exit.gap >= 200, JSON.stringify({ pins, exit }));
  await ctx.close();
}

// ---- Journey flow on a phone runs vertically and ends in view ----
{
  const { ctx, page } = await openPage(390, 844);
  await page.evaluate(() => { const r = document.getElementById("flow-map").getBoundingClientRect(); window.__haven.lenis.scrollTo(r.top + scrollY - innerHeight * 0.3, { immediate: true }); });
  await page.waitForTimeout(3800);
  const v = await page.evaluate(() => {
    const map = document.getElementById("flow-map"), stage = document.getElementById("flow-stage"), sr = stage.getBoundingClientRect();
    const steps = [...stage.querySelectorAll(".flow__step")];
    const order = steps.map((e) => ({ k: e.dataset.id, y: e.getBoundingClientRect().top - sr.top })).sort((a, b) => a.y - b.y).map((o) => o.k).join(",");
    const inView = steps.every((e) => { const r = e.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; });
    return { vertical: map.classList.contains("is-vertical"), order, inView, bg: getComputedStyle(stage.querySelector('[data-id="select"]')).backgroundColor };
  });
  pass("390: flow runs vertically, every step inside the screen", v.vertical && v.inView, JSON.stringify(v));
  pass("390: vertical flow ends with select last and green", v.order === "quiz,review,intro,schedule,select" && v.bg === "rgb(92, 196, 60)", v.order + " " + v.bg);
  await page.screenshot({ path: path.join(outDir, "flow-390.png") });
  await ctx.close();
}

// ---- Reduced motion ----
{
  const { ctx, page } = await openPage(1440, 900, { reduced: true });
  const r = await page.evaluate(() => ({
    cls: document.documentElement.className,
    hidden: [...document.querySelectorAll(".tb-item")].filter((e) => getComputedStyle(e).visibility === "hidden" || getComputedStyle(e).opacity !== "1").length,
    clipped: [...document.querySelectorAll("[data-mask]")].filter((e) => getComputedStyle(e).clipPath !== "none").length,
    ticker: getComputedStyle(document.querySelector(".ticker__track")).animationName,
    flow: getComputedStyle(document.querySelector('[data-id="select"]')).backgroundColor
  }));
  pass("reduced motion: everything visible without scrolling, no clip, no ticker", !r.cls.includes("js-motion") && r.hidden === 0 && r.clipped === 0 && r.ticker === "none", JSON.stringify(r));
  pass("reduced motion: flow shows its final state", r.flow === "rgb(92, 196, 60)", r.flow);
  await ctx.close();
}

await browser.close();
server.close();
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `\n${failed.length} FAILED of ${results.length}` : `\nHAVEN CHECKS PASSED ${results.length}`);
process.exit(failed.length ? 1 : 0);
