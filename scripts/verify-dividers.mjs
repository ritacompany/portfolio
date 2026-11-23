// Every section divider on the site is Neutral/700 (#1d1d21), as drawn in the Figma frame
// "mondai framework cS most current" (6331:20607): his ask, 23 Nov.
//
// Usage: node scripts/verify-dividers.mjs [--widths 390,768,1440]
//
// Two passes on Home, Haven, the Mondai collection and the framework page at each width:
//   named    the known section dividers, each must be present and Neutral/700
//   sweep    every visible 1 px line on the page (a 1 px border, a 1 px inset shadow or a box 1 px
//            thick) drawn in a dark neutral, so a divider missing from the named list still fails.
//            Lines that are not section dividers are listed in NOT_DIVIDERS with the reason.
// Prints "dividers ok" only when nothing fails.

import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const TARGET = "rgb(29, 29, 33)"; // Neutral/700 #1d1d21
const PAGES = { home: "/", haven: "/haven/", collection: "/mondai/", framework: "/mondai/framework/" };

// [selector, edge] where edge is top, bottom or fill (a 1 px box drawn with its background).
const NAMED = {
  home: [[".about__row", "top"], ["footer#contact", "top"]],
  haven: [
    ["section.hero", "bottom"], [".hero__top", "bottom"], [".wires", "bottom"],
    [".rule-b", "bottom"], [".rule-t", "top"], [".section-rule", "top"], ["footer#contact", "top"],
  ],
  collection: [[".context-top, .context-both", "top"], [".context-bottom, .context-both", "bottom"]],
  framework: [[".fw-sec", "bottom"], [".rule", "fill"], ["footer#contact", "top"]],
};
// Lines that are not section dividers. Matched with Element.closest.
const NOT_DIVIDERS = [
  ".fw-end__stat",          // ending stat tops: Figma 6331:25738 binds them to Neutral/600, kept
  ".tl__rows, .tl-mini__rows, .qcol__pillar, .phase__track", // Haven timeline and chart grid lines
  ".panel-card",            // framework diagram panel outline (Neutral/600), a card edge
  ".data-card, .card, .task, .tcard__body, .flow__step, .pill, .badge, .button, .capdemo__btn, .legend__swatch, .phase__stage, .fw-end__dots", // card and chip outlines
  "img, picture, video, svg", // image edges
];
const DARK = new Set(["rgb(18, 18, 20)", "rgb(29, 29, 33)", "rgb(40, 40, 43)", "rgb(54, 54, 60)", "rgb(56, 56, 61)",
  "rgb(14, 14, 15)", "rgb(11, 11, 13)", "rgb(24, 24, 27)", "rgb(16, 17, 16)", "rgb(24, 26, 24)", "rgb(41, 45, 40)", "rgb(34, 35, 33)", "rgb(19, 21, 19)"]);

const argv = process.argv.slice(2);
const widths = (argv.includes("--widths") ? argv[argv.indexOf("--widths") + 1] : "390,768,1440").split(",").map(Number);
const repo = resolve(new URL("..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const fails = [];
let named = 0, swept = 0;

try {
  for (const [key, path] of Object.entries(PAGES)) for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await page.goto(base + path, { waitUntil: "networkidle" });
    const out = await page.evaluate(({ NAMED, NOT_DIVIDERS, DARK }) => {
      const dark = new Set(DARK);
      const visible = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && el.checkVisibility?.({ opacityProperty: false, visibilityProperty: true }) !== false; };
      const insets = (cs) => { // [{edge, color}] from 1 px inset shadows
        const s = cs.boxShadow; if (!s || s === "none") return [];
        return s.split(/,(?![^(]*\))/).map((p) => p.trim()).filter((p) => p.includes("inset")).map((p) => {
          const color = (p.match(/rgba?\([^)]*\)/) || [""])[0];
          const n = (p.replace(/rgba?\([^)]*\)/, "").match(/-?[\d.]+px/g) || []).map(parseFloat);
          const [x = 0, y = 0, blur = 0, spread = 0] = n;
          if (blur !== 0) return null;
          if (spread === 1 && x === 0 && y === 0) return [{ edge: "top", color }, { edge: "bottom", color }];
          if (y === 1 && spread === 0) return [{ edge: "top", color }];
          if (y === -1 && spread === 0) return [{ edge: "bottom", color }];
          if (Math.abs(x) === 1 && spread === 0) return [{ edge: x > 0 ? "left" : "right", color }];
          return null;
        }).filter(Boolean).flat();
      };
      const lines = (el) => { // every 1 px line the element draws
        const cs = getComputedStyle(el), r = el.getBoundingClientRect(), got = [];
        for (const e of ["top", "bottom", "left", "right"]) {
          const wd = parseFloat(cs[`border${e[0].toUpperCase() + e.slice(1)}Width`]);
          if (wd > 0 && wd <= 1 && cs[`border${e[0].toUpperCase() + e.slice(1)}Style`] !== "none") got.push({ edge: e, color: cs[`border${e[0].toUpperCase() + e.slice(1)}Color`] });
        }
        got.push(...insets(cs));
        if ((r.height <= 1.5 || r.width <= 1.5) && cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundImage === "none") got.push({ edge: "fill", color: cs.backgroundColor });
        return got;
      };
      const desc = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "");
      const res = { named: [], sweep: [] };
      for (const [sel, edge] of NAMED) {
        const els = [...document.querySelectorAll(sel)].filter(visible);
        if (!els.length) { res.named.push({ sel, edge, missing: true }); continue; }
        for (const el of els) {
          const l = lines(el).find((x) => x.edge === edge);
          res.named.push({ sel, edge, el: desc(el), color: l ? l.color : "no line" });
        }
      }
      for (const el of document.querySelectorAll("body *")) {
        if (!visible(el) || el.closest(NOT_DIVIDERS.join(","))) continue;
        for (const l of lines(el)) if (dark.has(l.color)) res.sweep.push({ el: desc(el), edge: l.edge, color: l.color });
      }
      return res;
    }, { NAMED: NAMED[key], NOT_DIVIDERS, DARK: [...DARK] });
    for (const n of out.named) {
      if (n.missing) { fails.push(`${key} ${w}: named divider ${n.sel} (${n.edge}) not found`); continue; }
      named++;
      if (n.color !== TARGET) fails.push(`${key} ${w}: ${n.el} ${n.edge} is ${n.color}`);
    }
    for (const s of out.sweep) { swept++; if (s.color !== TARGET) fails.push(`${key} ${w}: sweep ${s.el} ${s.edge} is ${s.color}`); }
    await page.close();
  }
} finally { await browser.close(); server.close(); }

const uniq = [...new Set(fails)];
console.log(`named lines checked ${named}, swept lines checked ${swept}, failing ${uniq.length}`);
if (uniq.length) { for (const f of uniq) console.log("FAIL " + f); process.exit(1); }
console.log("dividers ok");
