// Screenshots of the journey flow, live page and proposal, after the slide lands, at three widths.
// Usage: node reports/haven-flow-order/shoot.mjs <base url>
import { chromium } from "playwright";
const base = process.argv[2];
const b = await chromium.launch();
for (const [tag, path] of [["before", "/haven/"], ["after", "/dev/haven-flow-order/"]]) {
  for (const [name, w, h] of [["desktop", 1440, 900], ["tablet", 1024, 1366], ["phone", 390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    await p.goto(base + path, { waitUntil: "load" });
    await p.evaluate(() => document.getElementById("flow-map").scrollIntoView({ block: "center" }));
    await p.waitForFunction(() => document.getElementById("flow-map").dataset.bumpDone === "true", null, { timeout: 15000 });
    await p.waitForTimeout(400);
    await p.locator("#flow-map").screenshot({ path: `reports/haven-flow-order/shots/${tag}-${name}.png` });
    await ctx.close();
  }
}
await b.close();
console.log("SHOTS_OK");
