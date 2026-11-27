// Captures the before and after crops shown on the review board. Each branch is served from its own worktree.
// Usage: node reports/review-board-2026-11-27/capture.mjs
import { chromium } from "playwright";
const OUT = "reports/review-board-2026-11-27/shots/";
const R = "http://127.0.0.1:4501", SOWT = "http://127.0.0.1:4502", SOWC = "http://127.0.0.1:4503", HL = "http://127.0.0.1:4504", COL = "http://127.0.0.1:4505";
const FW = "/mondai/framework/";
const jobs = [
  ["sow-tablet-before", R + FW, 768, 'section[aria-label="Start of week"]'],
  ["sow-tablet-after", SOWT + FW, 768, 'section[aria-label="Start of week"]'],
  ["sow-copy-before", R + FW, 390, 'section[aria-label="Start of week"]'],
  ["sow-copy-after", SOWC + FW, 390, 'section[aria-label="Start of week"]'],
  ["hl-cal-before", R + FW, 1024, 'section[aria-label="Calendar setup"] .s-heading-40'],
  ["hl-cal-after", HL + "/dev/headline-lines/", 1024, 'section[aria-label="Calendar setup"] .s-heading-40'],
  ["hl-time-before", R + FW, 1024, 'section[aria-label="Personalized timeline"] .s-heading-40'],
  ["hl-time-after", HL + "/dev/headline-lines/", 1024, 'section[aria-label="Personalized timeline"] .s-heading-40'],
  ["collection-1440", COL + "/mondai/", 1440, null],
  ["collection-390", COL + "/mondai/", 390, null],
  ["footer-1440", R + FW, 1440, "footer.footer"],
];
const b = await chromium.launch();
for (const [name, url, w, sel] of jobs) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    if (sel) {
      const el = p.locator(sel).first();
      await el.scrollIntoViewIfNeeded();
      await p.waitForTimeout(1500);
      await el.screenshot({ path: OUT + name + ".png" });
    } else {
      await p.waitForTimeout(1500);
      await p.screenshot({ path: OUT + name + ".png" });
    }
    console.log("ok", name);
  } catch (e) { console.log("FAIL", name, e.message.split("\n")[0]); }
  await ctx.close();
}
await b.close();
