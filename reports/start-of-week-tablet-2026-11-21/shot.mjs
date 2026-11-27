// Screenshots of the Start of week carousel at given widths. Usage: node shot.mjs <url> <outdir> [widths...]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [url = "http://localhost:4318/mondai/framework/", out = ".", ...ws] = process.argv.slice(2);
const T = +(process.env.T || 2);
const widths = ws.length ? ws.map(Number) : [390, 768, 1024, 1150, 1440];
const b = await chromium.launch();
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: "reduce" });
  await p.goto(url, { waitUntil: "networkidle" });
  const sow = p.locator(".sow");
  await sow.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
  await p.evaluate((i) => document.querySelectorAll(".sow__dot")[i].click(), T); await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelectorAll("[data-reveal],.reveal").forEach(e => e.style.opacity = 1));
  const sec = p.locator('.fw-sec[data-figma-node="5812:20498"]');
  await sec.screenshot({ path: `${out}/sow-${w}.png` });
  await p.close();
}
await b.close();
