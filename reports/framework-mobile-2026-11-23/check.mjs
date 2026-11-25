// Framework page on a phone, the gates in GATES.md (23 Nov). Touch emulation (isMobile, hasTouch), 2x.
// Usage: node reports/framework-mobile-2026-11-23/check.mjs <path> [G1,G2,...]
//   path  /dev/framework-mobile/ (the proposal) or /mondai/framework/ (live, to show each gate failing first)
// Prints "Gn PASS" or "Gn FAIL: why" per gate, then PHONE_OK <n> of <n> when every gate asked for passed.
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path = "/dev/framework-mobile/", only] = process.argv.slice(2);
const want = only ? only.split(",") : ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12", "G13", "G14"];
const PHONES = [320, 360, 375, 390, 430];
const { server, base } = await serve();
const browser = await chromium.launch();
const results = [];
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol;

async function open(w, { motion = "reduce", p = path, mobile = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile, reducedMotion: motion });
  const page = await ctx.newPage();
  await page.goto(base + p, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // the screens load lazily: bring every image in before measuring, so a figure is never 0 tall
  await page.evaluate(async () => {
    document.querySelectorAll("img[loading=lazy]").forEach((i) => { i.loading = "eager"; });
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
    scrollTo(0, 0);
  });
  return { ctx, page };
}
// Boxes of the framework's own text (.t is trimmed to cap top and baseline, so a box gap is the gap he sees).
const MEASURE = () => {
  const R = (e) => e.getBoundingClientRect();
  const n = (id) => document.querySelector(`[data-figma-node="${id}"]`);
  window.__R = R; window.__n = n;
};

async function gate(id, fn) {
  if (!want.includes(id)) return;
  const bad = [];
  try { await fn(bad); } catch (e) { bad.push(String(e).slice(0, 200)); }
  results.push(bad.length ? `${id} FAIL: ${[...new Set(bad)].slice(0, 6).join("; ")}` : `${id} PASS`);
}

// G1 side margin 16 on the page and the nav
await gate("G1", async (bad) => {
  for (const w of PHONES) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => {
      const xs = [...document.querySelectorAll(".fw-sec > p.t, .fw-sec > h2")].filter((e) => e.offsetParent).map((e) => Math.round(e.getBoundingClientRect().left));
      const rights = [...document.querySelectorAll(".fw-sec > .s-body-16")].filter((e) => e.offsetParent).map((e) => Math.round(innerWidth - e.getBoundingClientRect().right));
      return { minX: Math.min(...xs), maxX: Math.max(...xs.filter((x) => x < 100)), logo: Math.round(document.querySelector(".navbar__logo").getBoundingClientRect().left), minRight: Math.min(...rights) };
    });
    if (r.minX !== 16 || r.maxX !== 16) bad.push(`@${w} text left ${r.minX} to ${r.maxX}`);
    if (r.logo !== 16) bad.push(`@${w} nav logo at ${r.logo}`);
    if (r.minRight < 16) bad.push(`@${w} body ${r.minRight} from the right edge`);
    await ctx.close();
  }
});

// G2 title on one line, as large as it fits: at least 0.17 of the content width, ink inside the screen with
// its left edge within 4 of the margin (Haven's ink on the margin).
await gate("G2", async (bad) => {
  for (const w of PHONES) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => {
      const h = document.querySelector("h1"); const fs = parseFloat(getComputedStyle(h).fontSize);
      const rg = document.createRange(); rg.selectNodeContents(h); const rects = [...rg.getClientRects()];
      const c = document.createElement("canvas").getContext("2d"); c.font = getComputedStyle(h).font; c.letterSpacing = getComputedStyle(h).letterSpacing;
      const m = c.measureText(h.textContent.trim());
      const left = rects[0].left + m.actualBoundingBoxLeft * -1, right = rects[0].left + m.actualBoundingBoxRight;
      return { fs, lines: new Set(rects.map((x) => Math.round(x.top))).size, inkL: left, inkR: right };
    });
    const content = w - 32;
    if (r.lines !== 1) bad.push(`@${w} ${r.lines} lines`);
    if (r.fs / content < 0.17) bad.push(`@${w} title ${r.fs.toFixed(1)} px, ${(r.fs / content).toFixed(3)} of the content width`);
    if (r.inkR > w - 8) bad.push(`@${w} ink reaches ${r.inkR.toFixed(1)}`);
    if (Math.abs(r.inkL - 16) > 4) bad.push(`@${w} ink starts at ${r.inkL.toFixed(1)}`);
    await ctx.close();
  }
});

// G3 eyebrow 16, Heading/40 28 on 32.2
await gate("G3", async (bad) => {
  for (const w of [320, 390, 430]) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => ({
      eyebrows: [...document.querySelectorAll(".fw-sec > h2")].map((e) => getComputedStyle(e).fontSize + "/" + getComputedStyle(e).lineHeight),
      heads: [...document.querySelectorAll(".fw-sec > .s-heading-40")].map((e) => getComputedStyle(e).fontSize + "/" + getComputedStyle(e).lineHeight),
    }));
    const eb = r.eyebrows.filter((x) => x !== "16px/21.12px"), hd = r.heads.filter((x) => x !== "28px/32.2px");
    if (eb.length) bad.push(`@${w} eyebrows ${[...new Set(eb)].join(",")}`);
    if (hd.length) bad.push(`@${w} headings ${[...new Set(hd)].join(",")}`);
    await ctx.close();
  }
});

// G4 sections: 64 from the section top to the first text, 88 from the last thing to the section foot
await gate("G4", async (bad) => {
  for (const w of [320, 390, 430]) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => [...document.querySelectorAll("main .fw-sec")].map((s, i) => {
      const kids = [...s.children].filter((e) => e.getBoundingClientRect().height > 0 && getComputedStyle(e).display !== "none");
      const sr = s.getBoundingClientRect();
      return { i, label: s.getAttribute("aria-label"), top: Math.round(kids[0].getBoundingClientRect().top - sr.top), bottom: Math.round(sr.bottom - Math.max(...kids.map((k) => k.getBoundingClientRect().bottom))) };
    }));
    for (const s of r) {
      if (s.i > 0 && s.top !== 64) bad.push(`@${w} ${s.label} top ${s.top}`);
      if (s.bottom !== 88) bad.push(`@${w} ${s.label} bottom ${s.bottom}`);
    }
    await ctx.close();
  }
});

// G5 rhythm: eyebrow to heading 40, heading to what follows 80, subhead or label to its body 20
await gate("G5", async (bad) => {
  for (const w of [320, 390, 430]) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => {
      const gap = (a, b) => Math.round((b.getBoundingClientRect().top - a.getBoundingClientRect().bottom) * 10) / 10;
      const out = [];
      for (const s of document.querySelectorAll("main .fw-sec")) {
        const k = [...s.children].filter((e) => e.getBoundingClientRect().height > 0 && getComputedStyle(e).display !== "none");
        for (let i = 1; i < k.length; i++) {
          const a = k[i - 1], b = k[i], g = gap(a, b);
          if (a.tagName === "H2" && b.matches(".s-heading-40, .s-display-96") && g !== 40) out.push(`eyebrow to heading ${g} (${a.textContent.trim().slice(0, 20)})`);
          if (a.matches(".s-heading-40, .s-display-96") && g !== 80) out.push(`heading to next ${g} (${s.getAttribute("aria-label")})`);
          if (a.matches(".s-heading-20:not(h2):not(.fb-effect), .s-label-14-c") && b.matches(".s-body-16") && b.dataset.figmaNode !== "5812:20247" && g !== 20) out.push(`subhead to body ${g} (${a.textContent.trim().slice(0, 20)})`);
          if (a.matches(".fb-effect") && b.matches(".s-body-16")) {
            // the flex row's words are untrimmed: compare the words' baseline (6 over the box foot)
            const g2 = Math.round((b.getBoundingClientRect().top - (a.getBoundingClientRect().bottom - 6)) * 10) / 10;
            if (Math.abs(g2 - 20) > 0.5) out.push(`Rollover effect to body ${g2}`);
          }
        }
      }
      return out;
    });
    r.forEach((x) => bad.push(`@${w} ${x}`));
    await ctx.close();
  }
});

// G6 hero details as one wrapping row: Role and Affiliate side by side 32 apart, Focus beside them only when
// it fits, label 16 over value, rows 32 apart, title 48 over the labels
await gate("G6", async (bad) => {
  for (const w of [...PHONES, 600]) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => {
      const b = (id) => document.querySelector(`[data-figma-node="${id}"]`).getBoundingClientRect();
      const [h1, rl, rv, al, av, fl, fv] = ["5812:16453", "5812:16456", "5812:16457", "5812:16459", "5812:16460", "5812:16462", "5812:16463"].map(b);
      return { h1b: h1.bottom, rl, rv, al, av, fl, fv };
    });
    const { rl, rv, al, av, fl, fv } = r;
    if (!near(rl.top, al.top)) bad.push(`@${w} Role and Affiliate not on one row`);
    if (!near(al.left - rv.right, 32, 1) && !near(al.left - Math.max(rl.right, rv.right), 32, 1)) bad.push(`@${w} Affiliate ${Math.round(al.left - rv.right)} from Role`);
    if (!near(rv.top - rl.bottom, 16) || !near(av.top - al.bottom, 16) || !near(fv.top - fl.bottom, 16)) bad.push(`@${w} label to value not 16`);
    if (!near(rl.top - r.h1b, 48)) bad.push(`@${w} title to details ${Math.round(rl.top - r.h1b)}`);
    const fits = w >= 500;
    if (fits && !near(fl.top, rl.top)) bad.push(`@${w} Focus should share the row`);
    if (!fits && !near(fl.top - Math.max(rv.bottom, av.bottom), 32)) bad.push(`@${w} Focus ${Math.round(fl.top - rv.bottom)} under the first row`);
    await ctx.close();
  }
});

// G7 the hero text 40 under the tagline
await gate("G7", async (bad) => {
  for (const w of [320, 390, 430]) {
    const { ctx, page } = await open(w);
    const g = await page.evaluate(() => {
      const t = document.querySelector('[data-figma-node="5812:16466"]').getBoundingClientRect();
      const p = document.querySelector('[data-figma-node="5812:16468"]').getBoundingClientRect();
      return Math.round(p.top - t.bottom);
    });
    if (g !== 40) bad.push(`@${w} tagline to text ${g}`);
    await ctx.close();
  }
});

// G8 no hover look on the carousel dots on a phone, a press still shows
await gate("G8", async (bad) => {
  const { ctx, page } = await open(390);
  await page.locator(".sow").scrollIntoViewIfNeeded();
  const dot = page.locator(".sow__dot").nth(2);
  const rest = await dot.evaluate((e) => getComputedStyle(e).backgroundColor);
  await dot.hover();
  await page.waitForTimeout(300);
  const hovered = await dot.evaluate((e) => getComputedStyle(e).backgroundColor);
  if (hovered !== rest) bad.push(`dot changes under hover: ${rest} to ${hovered}`);
  const press = await page.evaluate(() => {
    for (const sh of document.styleSheets) { let rules; try { rules = sh.cssRules; } catch { continue; }
      const walk = (rs, ok) => { for (const r of rs) { if (r.media) { if (walk(r.cssRules, matchMedia(r.media.mediaText).matches)) return true; } else if (ok && r.selectorText && /\.sow__dot:active/.test(r.selectorText)) return true; } return false; };
      if (walk(rules, true)) return true; }
    return false;
  });
  if (!press) bad.push("no pressed state for the dots");
  await ctx.close();
});

// G9 no tap flash on the carousel and the links
await gate("G9", async (bad) => {
  const { ctx, page } = await open(390);
  const r = await page.evaluate(() => [".sow__card", ".sow__dot", ".sow__stage", ".navbar a", ".footer a"].map((s) => [s, getComputedStyle(document.querySelector(s)).webkitTapHighlightColor]));
  for (const [s, c] of r) if (c !== "rgba(0, 0, 0, 0)") bad.push(`${s} flashes ${c}`);
  await ctx.close();
});

// G10 the start of week carousel works by touch: a swipe moves one template, a tap on a dot jumps to it
await gate("G10", async (bad) => {
  for (const w of [320, 390]) {
    const { ctx, page } = await open(w, { motion: "no-preference" });
    const stage = page.locator(".sow__stage");
    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const b = await stage.boundingBox();
    const cdp = await ctx.newCDPSession(page);
    const y = b.y + b.height / 2;
    const pts = (x) => [{ x, y, id: 1 }];
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: pts(b.x + b.width * 0.8) });
    for (let i = 1; i <= 8; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: pts(b.x + b.width * (0.8 - 0.07 * i)) }); await page.waitForTimeout(16); }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await page.waitForTimeout(1300);
    const cur = () => page.evaluate(() => [...document.querySelectorAll(".sow__dot")].findIndex((d) => d.getAttribute("aria-current") === "true"));
    const after = await cur();
    if (after !== 1) bad.push(`@${w} swipe left landed on dot ${after + 1}`);
    await page.locator(".sow__dot").nth(3).tap();
    await page.waitForTimeout(1300);
    const t = await cur();
    if (t !== 3) bad.push(`@${w} tapping dot 4 landed on ${t + 1}`);
    await ctx.close();
  }
});

// G11 by touch with motion on: no sideways scroll, nothing left hidden after scrolling the page, no text or
// image past the screen edge outside the carousel stage
await gate("G11", async (bad) => {
  for (const w of PHONES) {
    const { ctx, page } = await open(w, { motion: "no-preference" });
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const main = document.querySelector("main"); const out = [];
      const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      for (const e of main.querySelectorAll("*")) {
        const b = e.getBoundingClientRect(), s = getComputedStyle(e);
        if (b.width < 1 || b.height < 1 || s.display === "none" || e.closest(".capdemo")) continue;
        if (!(ownText(e) || e.tagName === "IMG")) continue;
        let op = 1; for (let p = e; p && p !== main; p = p.parentElement) op *= +getComputedStyle(p).opacity;
        if (op < 0.05 || s.visibility === "hidden") out.push(`hidden ${e.tagName} ${(e.textContent || e.alt).trim().slice(0, 20)}`);
        if (!e.closest(".sow__stage") && (b.left < -0.5 || b.right > innerWidth + 0.5)) out.push(`past edge ${(e.textContent || e.alt).trim().slice(0, 20)}`);
      }
      if (document.documentElement.scrollWidth > innerWidth) out.push(`scrolls sideways ${document.documentElement.scrollWidth}`);
      return out;
    });
    r.forEach((x) => bad.push(`@${w} ${x}`));
    await ctx.close();
  }
});

// G12 tablet and desktop untouched: every element box on the proposal equals the live page at 768, 1024 and 1440
await gate("G12", async (bad) => {
  for (const w of [768, 1024, 1440]) {
    const boxes = [];
    for (const p of ["/mondai/framework/", path]) {
      const { ctx, page } = await open(w, { p, mobile: false });
      boxes.push(await page.evaluate(() => [...document.querySelectorAll("main *")].map((e) => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.width, b.height].map((v) => Math.round(v * 10) / 10).join(","); })));
      await ctx.close();
    }
    const diff = boxes[0].filter((b, i) => b !== boxes[1][i]).length;
    if (boxes[0].length !== boxes[1].length || diff) bad.push(`@${w} ${diff} boxes differ`);
  }
});

// G13 the ending's tag and number do not touch: verify-responsive flags "Capacity" over "6 of 8" because it
// compares em boxes, and the 104 px number's em box rises above its trimmed line. This measures the ink.
await gate("G13", async (bad) => {
  for (const w of PHONES) {
    const { ctx, page } = await open(w);
    const r = await page.evaluate(() => [...document.querySelectorAll(".fw-end__stat")].map((st) => {
      const tag = st.querySelector(".t"); const num = st.querySelector(".fw-end__num");
      const c = document.createElement("canvas").getContext("2d"); c.font = getComputedStyle(num).font; c.letterSpacing = getComputedStyle(num).letterSpacing;
      const digit = num.firstChild.textContent.trim();
      const baseline = num.getBoundingClientRect().bottom; // trimmed to the alphabetic baseline
      const inkTop = baseline - c.measureText(digit).actualBoundingBoxAscent;
      return Math.round(inkTop - tag.getBoundingClientRect().bottom);
    }));
    r.forEach((g, i) => { if (g < 16) bad.push(`@${w} stat ${i + 1} ink gap ${g}`); });
    await ctx.close();
  }
});

// G14 Home's phone menu (his yes, 23 Nov): under 768 the burger replaces the three links and opens the full screen
// menu by touch, which closes from its X; from 768 the links show and the burger does not
await gate("G14", async (bad) => {
  for (const w of [...PHONES, 768]) {
    const { ctx, page } = await open(w, { mobile: w < 768 });
    const vis = (s) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== "hidden"; }, s);
    const burger = await vis(".page-header .navbar__menu"), links = await vis(".page-header .navbar__links");
    if (w >= 768) { if (burger || !links) bad.push(`@${w} burger ${burger}, links ${links}`); await ctx.close(); continue; }
    if (!burger || links) { bad.push(`@${w} burger ${burger}, links ${links}`); await ctx.close(); continue; }
    const hb = await page.locator(".page-header .navbar__menu").boundingBox();
    if (Math.round(hb.x + hb.width - 13) !== w - 16) bad.push(`@${w} burger icon right edge ${Math.round(hb.x + hb.width - 13)}`);
    if (hb.height < 44 || hb.width < 44) bad.push(`@${w} burger target ${Math.round(hb.width)} by ${Math.round(hb.height)}`);
    await page.locator(".page-header .navbar__menu").tap();
    await page.waitForTimeout(400);
    const m = await page.evaluate(() => { const e = document.getElementById("site-menu"), b = e.getBoundingClientRect(); return { open: e.hasAttribute("data-open"), op: getComputedStyle(e).opacity, full: b.width === innerWidth && b.height === innerHeight, text: e.innerText.replace(/\s+/g, " ").trim() }; });
    if (!m.open || m.op !== "1" || !m.full) bad.push(`@${w} menu open ${m.open}, opacity ${m.op}, full screen ${m.full}`);
    if (!/About Works Contact hello@chadwickfenner\.com/.test(m.text)) bad.push(`@${w} menu reads "${m.text}"`);
    await page.locator("#site-menu .menu__close").tap();
    await page.waitForTimeout(800); // the dialog hides on transitionend or after 600 ms
    if (await vis("#site-menu")) bad.push(`@${w} menu still shows after the X`);
    await ctx.close();
  }
});

await browser.close(); server.close();
console.log(results.join("\n"));
const ok = results.filter((x) => x.endsWith("PASS")).length;
if (ok === results.length) console.log(`PHONE_OK ${ok} of ${results.length}`);
else { console.log(`PHONE_FAIL ${results.length - ok} of ${results.length}`); process.exitCode = 1; }
