// Before and after of hiding "Explore more case studies" in the ending bar (his board note, 27 Nov).
// The after is the same page with `.ending-bar__all { display: none }` added.
import { chromium } from "playwright";
const base = process.argv[2] || "http://127.0.0.1:4400";
const out = "reports/ending-bar-2026-11-27/";
const b = await chromium.launch();
for (const [page, path] of [["framework", "/mondai/framework/"], ["haven", "/haven/"]]) {
  for (const w of [1440, 1024]) {
    for (const after of [false, true]) {
      const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
      const p = await ctx.newPage();
      await p.goto(base + path, { waitUntil: "load" });
      if (after) await p.addStyleTag({ content: ".ending-bar__all { display: none; } .ending-bar__next { grid-column: -2; }" });
      const bar = p.locator(".ending-bar").first();
      await bar.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
      await bar.screenshot({ path: `${out}${page}-${w}-${after ? "after" : "before"}.png` });
      await ctx.close();
    }
  }
}
await b.close();
console.log("SHOTS_OK");
