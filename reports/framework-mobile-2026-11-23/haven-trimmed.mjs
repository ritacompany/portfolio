// Haven at one phone width with every text box trimmed to cap top and baseline, the way the framework page
// sets its text (.t), so gaps compare like for like. Prints section padding, then each block's gap to the one above.
// Usage: node haven-trimmed.mjs [width] [path]
import { createRequire } from "node:module";
import { serve } from "./serve.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const [w = "390", path = "/haven/"] = process.argv.slice(2);
const { server, base } = await serve();
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: +w, height: 900 }, reducedMotion: "reduce" });
await page.goto(base + path, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "main :is(p,h1,h2,h3,dt,dd,.eyebrow,.h40,.h64,.h24,.h20,.display,.tb-item,span.para,li){ text-box: trim-both cap alphabetic }" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
const out = await page.evaluate(() => {
  const R = (e) => e.getBoundingClientRect();
  const vis = (e) => { const r = R(e), s = getComputedStyle(e); return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none"; };
  const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
  const media = (e) => /^(IMG|VIDEO|CANVAS|svg)$/.test(e.tagName) && R(e).width > 60;
  const main = document.querySelector("main");
  const secs = [...main.querySelectorAll("section, header.hero, .hero")].filter((s, i, a) => vis(s) && !a.some((o) => o !== s && o.contains(s)));
  const o = [];
  for (const s of secs.slice(0, 14)) {
    const sr = R(s);
    const blocks = [...s.querySelectorAll("*")].filter((e) => vis(e) && (ownText(e) || media(e)) && !e.closest("button, .pill, .wires__list, .stats, .flow, .quiz__stage, .ending__cards, .roles, svg *, .card, .data-card"));
    const top = blocks.filter((e) => !blocks.some((x) => x !== e && x.contains(e)));
    o.push(`SEC ${(s.getAttribute("aria-label") || s.className).slice(0, 30)}`);
    let prev = null;
    for (const e of top) { const r = R(e); o.push(`  ${media(e) ? "MEDIA" : parseFloat(getComputedStyle(e).fontSize) + "px"} gap ${prev ? Math.round(r.top - prev.bottom) : "top " + Math.round(r.top - sr.top)} x ${Math.round(r.left)} | ${(e.className || e.tagName).toString().split(" ")[0]} ${e.textContent.trim().slice(0, 24)}`); prev = r; }
    o.push(`  bottom ${Math.round(sr.bottom - prev.bottom)}`);
  }
  return o.join("\n");
});
console.log(out);
await b.close(); server.close();
