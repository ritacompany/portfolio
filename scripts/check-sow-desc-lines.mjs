// Measures how many lines each Start of week template description wraps to on the built page.
// Usage: node scripts/check-sow-desc-lines.mjs <page url> [max lines, default 3]
// For each width (1440, 1200, 768, 390) it puts each card's data-desc into the real .sow__desc element
// (same font, measure and styles as the live caption) and counts distinct line boxes with a Range.
// Also confirms the visible caption for template 1 matches its data-desc. Prints a table, then
// SOW_DESC_LINES_OK only when every description is at most the limit at every width.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || "/opt/node22/lib/node_modules/playwright")); }
const [url, maxArg = "3"] = process.argv.slice(2);
if (!url) { console.error("usage: node scripts/check-sow-desc-lines.mjs <url> [max]"); process.exit(2); }
const max = Number(maxArg);
const browser = await chromium.launch();
let bad = 0;
const rows = {};
for (const width of [1440, 1200, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const r = await page.evaluate(() => {
    const desc = document.querySelector(".sow__desc");
    const cards = [...document.querySelectorAll(".sow__card")];
    const first = desc.textContent === cards[0].dataset.desc;
    const orig = desc.textContent;
    const out = cards.map((c) => {
      desc.textContent = c.dataset.desc;
      const range = document.createRange(); range.selectNodeContents(desc);
      const tops = new Set([...range.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top)));
      return { title: c.dataset.title, lines: tops.size, w: Math.round(desc.getBoundingClientRect().width) };
    });
    desc.textContent = orig;
    return { first, out };
  });
  if (!r.first) { console.log(`${width}: visible caption does not match template 1 data-desc`); bad++; }
  for (const o of r.out) {
    (rows[o.title] ||= {})[width] = `${o.lines} (${o.w}px)`;
    if (o.lines > max || o.lines < 1) bad++;
  }
  await page.close();
}
await browser.close();
console.log("template".padEnd(16) + [1440, 1200, 768, 390].map((w) => String(w).padEnd(13)).join(""));
for (const [t, v] of Object.entries(rows)) console.log(t.padEnd(16) + [1440, 1200, 768, 390].map((w) => String(v[w]).padEnd(13)).join(""));
if (bad) { console.log(`SOW_DESC_LINES_FAIL ${bad}`); process.exit(1); }
console.log("SOW_DESC_LINES_OK");
