// Phone audit of the framework page on touch emulation (isMobile, hasTouch, 2x), motion on.
// For each width: sideways scroll, items still hidden after scrolling the whole page by touch sized steps,
// text under 12 px and body copy under 16, boxes past the screen edge (outside sideways scrollers and the
// carousel stage), images rendered sharper than their file allows at 2x, and the :hover rules that reach
// this page outside a (hover: hover) query.
// Usage: node reports/framework-mobile-2026-11-23/audit.mjs [path] [widths]   default /mondai/framework/ 320,360,375,390,430
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path = "/mondai/framework/", ws = "320,360,375,390,430"] = process.argv.slice(2);
const { server, base } = await serve();
const browser = await chromium.launch();
const out = [];
for (const w of ws.split(",").map(Number)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => {
    const R = (e) => e.getBoundingClientRect();
    const main = document.querySelector("main");
    const all = [...main.querySelectorAll("*")];
    const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);
    const name = (e) => `${e.tagName.toLowerCase()}${e.dataset.figmaNode ? "[" + e.dataset.figmaNode + "]" : ""}.${(typeof e.className === "string" ? e.className : "").split(" ").filter(Boolean).slice(0, 2).join(".")} "${(e.getAttribute("alt") || e.textContent || "").trim().slice(0, 32)}"`;
    const res = { vw: innerWidth, scrollW: document.documentElement.scrollWidth, hidden: [], small: [], body: [], past: [], blurry: [], hover: [], tap: getComputedStyle(document.body).webkitTapHighlightColor };
    const inScroller = (e) => { for (let p = e.parentElement; p && p !== main; p = p.parentElement) { const s = getComputedStyle(p); if (/(auto|scroll)/.test(s.overflowX) || p.classList.contains("sow__stage")) return true; } return false; };
    for (const e of all) {
      const b = R(e), s = getComputedStyle(e);
      if (b.width < 1 || b.height < 1 || s.display === "none") continue;
      let op = 1; for (let p = e; p && p !== main; p = p.parentElement) op *= +getComputedStyle(p).opacity;
      const shows = (ownText(e) || e.tagName === "IMG");
      if (shows && (op < 0.05 || s.visibility === "hidden") && !e.closest(".sow__cap.is-out")) res.hidden.push(name(e) + ` opacity ${op.toFixed(2)} ${s.visibility}`);
      if (ownText(e)) {
        const fs = parseFloat(s.fontSize);
        if (fs < 12) res.small.push(`${name(e)} ${fs}px`);
        if (e.closest(".s-body-16") && fs < 16) res.body.push(`${name(e)} ${fs}px`);
      }
      if ((ownText(e) || e.tagName === "IMG") && !inScroller(e) && (b.left < -0.5 || b.right > innerWidth + 0.5)) res.past.push(`${name(e)} ${Math.round(b.left)} to ${Math.round(b.right)}`);
      if (e.tagName === "IMG" && e.naturalWidth && !/\.svg/.test(e.currentSrc)) {
        const k = e.naturalWidth / b.width;
        if (k < 1.95) res.blurry.push(`${name(e)} file ${e.naturalWidth} shown ${Math.round(b.width)} (${k.toFixed(2)}x)`);
      }
    }
    // hover rules reaching this page outside a hover media query
    const walk = (rules, inHover) => {
      for (const ru of rules) {
        if (ru.media) walk(ru.cssRules, inHover || /hover:\s*hover|pointer:\s*fine/.test(ru.media.mediaText));
        else if (ru.cssRules && !ru.selectorText) walk(ru.cssRules, inHover);
        if (ru.selectorText && /:hover/.test(ru.selectorText) && !inHover) {
          const sel = ru.selectorText.replace(/:hover/g, "");
          let hit = false; try { hit = !!document.querySelector(sel); } catch {}
          if (hit) res.hover.push(`${ru.parentStyleSheet.href ? ru.parentStyleSheet.href.split("/").pop() : "inline"}: ${ru.selectorText.slice(0, 90)}`);
        }
      }
    };
    for (const sh of document.styleSheets) { try { walk(sh.cssRules, false); } catch {} }
    return res;
  });
  out.push(`== ${path} @${w}: scrollWidth ${r.scrollW} vw ${r.vw}, tap highlight ${r.tap}, errors ${errors.length}`);
  for (const k of ["hidden", "small", "body", "past", "blurry", "hover"]) out.push(`  ${k} (${r[k].length})` + (r[k].length ? "\n    " + [...new Set(r[k])].join("\n    ") : ""));
  await ctx.close();
}
await browser.close(); server.close();
console.log(out.join("\n"));
