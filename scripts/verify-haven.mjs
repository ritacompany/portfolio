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
    return { sw: doc.scrollWidth, cw: doc.clientWidth, over, hiddenText, fonts, smallTargets, h: doc.scrollHeight };
  });
  pass(`${w}: no horizontal page overflow`, m.sw <= m.cw, `${m.sw} vs ${m.cw}`);
  pass(`${w}: no element escapes the viewport`, m.over.length === 0, m.over.join(" | "));
  pass(`${w}: all text blocks visible after reveal`, m.hiddenText === 0, String(m.hiddenText));
  pass(`${w}: Satoshi 400, 500, 700, 900 loaded`, m.fonts.includes("400") && m.fonts.includes("500") && m.fonts.includes("700") && m.fonts.includes("900"), m.fonts);
  pass(`${w}: every request succeeded`, failed.length === 0, failed.join(" | "));
  pass(`${w}: no console or page errors`, errors.length === 0, errors.join(" | "));
  pass(`${w}: interactive targets at least 24px`, m.smallTargets.length === 0, m.smallTargets.join(" | "));
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
  const before = await page.evaluate(() => { const pm = document.querySelector(".problem__media"); return { ly: getComputedStyle(pm).getPropertyValue("--left-y").trim(), sc: getComputedStyle(pm.firstElementChild).transform, vis: getComputedStyle(document.querySelector(".problem .tb-item")).visibility }; });
  pass("motion: below the fold starts hidden, mask closed at scale 1.3", before.ly === "0%" && before.sc.startsWith("matrix(1.3") && before.vis === "hidden", JSON.stringify(before));
  // Wheel until the problem media top enters the screen
  for (let i = 0; i < 40; i++) {
    const top = await page.evaluate(() => document.querySelector(".problem__media").getBoundingClientRect().top);
    if (top < 880) break;
    await page.mouse.wheel(0, 120); await page.waitForTimeout(60);
  }
  await page.waitForTimeout(380);
  const mid = await page.evaluate(() => { const pm = document.querySelector(".problem__media"); return { ly: parseFloat(getComputedStyle(pm).getPropertyValue("--left-y")), sc: new DOMMatrix(getComputedStyle(pm.firstElementChild).transform).a }; });
  pass("motion: mask mid tween opens and scale settles together", mid.ly > 0 && mid.ly < 100 && mid.sc > 1 && mid.sc < 1.3, JSON.stringify(mid));
  await page.waitForTimeout(1200);
  const end = await page.evaluate(() => { const pm = document.querySelector(".problem__media"); return { ly: getComputedStyle(pm).getPropertyValue("--left-y").trim(), sc: new DOMMatrix(getComputedStyle(pm.firstElementChild).transform).a, op: getComputedStyle(document.querySelector(".problem .tb-item")).opacity }; });
  pass("motion: mask ends fully open at scale 1, text at full opacity", end.ly === "100%" && end.sc === 1 && end.op === "1", JSON.stringify(end));

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
  pass("motion: Select a Confidante turns green only after landing", startOrder === "rgb(4, 4, 5)" && flowEnd.bg === "rgb(120, 183, 101)", `${startOrder} then ${flowEnd.bg}`);

  // Insight tooltip
  await page.evaluate(() => { const p = document.querySelector(".profile .pill"); p.scrollIntoView({ block: "center" }); });
  await page.waitForTimeout(300);
  await page.focus(".profile .pill");
  const tip = await page.evaluate(() => { const t = document.getElementById("insight-tip"), p = document.querySelector(".profile .pill"); return { shown: !t.hidden, text: t.textContent.slice(0, 40), described: p.getAttribute("aria-describedby") }; });
  await page.keyboard.press("Escape");
  const tipGone = await page.evaluate(() => document.getElementById("insight-tip").hidden);
  pass("tooltip: focus shows the insight, Escape hides it", tip.shown && tip.described === "insight-tip" && tipGone, JSON.stringify(tip));
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
  pass("390: vertical flow ends with select last and green", v.order === "quiz,review,intro,schedule,select" && v.bg === "rgb(120, 183, 101)", v.order + " " + v.bg);
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
  pass("reduced motion: flow shows its final state", r.flow === "rgb(120, 183, 101)", r.flow);
  await ctx.close();
}

await browser.close();
server.close();
const failed = results.filter((r) => !r.ok);
console.log(failed.length ? `\n${failed.length} FAILED of ${results.length}` : `\nHAVEN CHECKS PASSED ${results.length}`);
process.exit(failed.length ? 1 : 0);
