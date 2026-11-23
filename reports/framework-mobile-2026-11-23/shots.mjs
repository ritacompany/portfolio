// Section screenshots of a page on touch emulation, for the canvas and for looking.
// Usage: node shots.mjs <path> <widths> <outdir> [dsf]   files <outdir>/<w>-<nn>-<section>.png
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { serve } from "./serve.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const [path, ws, dir, dsf = "2", css = "", only = ""] = process.argv.slice(2);
mkdirSync(dir, { recursive: true });
const { server, base } = await serve();
const browser = await chromium.launch();
for (const w of ws.split(",").map(Number)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: +dsf, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(base + path, { waitUntil: "networkidle" });
  if (css) await page.addStyleTag({ content: css });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
  await page.waitForTimeout(500);
  const n = await page.evaluate(() => { const s = [...document.querySelectorAll("main > section, footer")]; s.forEach((e, i) => e.setAttribute("data-shot", i)); return s.map((e) => (e.getAttribute("aria-label") || e.tagName).toLowerCase().replace(/[^a-z0-9]+/g, "-")); });
  for (let i = 0; i < n.length; i++) {
    if (only && !only.split(",").includes(String(i))) continue;
    const el = page.locator(`[data-shot="${i}"]`);
    if (i === 0) { const b = await el.boundingBox(); await page.screenshot({ fullPage: true, path: `${dir}/${w}-${String(i).padStart(2, "0")}-${n[i]}.png`, clip: { x: 0, y: 0, width: w, height: b.y + b.height } }); }
    else await el.screenshot({ path: `${dir}/${w}-${String(i).padStart(2, "0")}-${n[i]}.png` });
  }
  await ctx.close();
}
await browser.close(); server.close();
