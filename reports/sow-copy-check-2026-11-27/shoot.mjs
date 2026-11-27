// The Start of week caption (template number, name, description) for each of the five templates at 390, 768
// and 1440, with the shorter descriptions (PR #38) on top of the current framework page. Also measures whether
// each caption line is centred on the card above it.
import { chromium } from "playwright";
const base = process.argv[2], out = "reports/sow-copy-check-2026-11-27/";
const b = await chromium.launch();
const report = [];
for (const w of [390, 768, 1440]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(base + "/mondai/framework/", { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  const sec = p.locator('section[aria-label="Start of week"]');
  await sec.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  for (let i = 1; i <= 5; i++) {
    await p.click(`[aria-label="Show template ${i} of 5"]`); await p.waitForTimeout(1200);
    const m = await p.evaluate(() => {
      const cap = document.querySelector(".sow__cap"), stage = document.querySelector(".sow__stage");
      const cards = [...document.querySelectorAll(".sow__card")].map((c) => c.getBoundingClientRect());
      const sr = stage.getBoundingClientRect();
      const mid = sr.left + sr.width / 2;
      const front = cards.sort((a, b) => Math.abs(a.left + a.width / 2 - mid) - Math.abs(b.left + b.width / 2 - mid))[0];
      const kids = [...cap.querySelectorAll("*")].filter((e) => e.children.length === 0 && e.textContent.trim());
      return { cardMid: front.left + front.width / 2, lines: kids.map((e) => { const r = e.getBoundingClientRect(); return { t: e.textContent.trim().slice(0, 30), mid: r.left + r.width / 2, align: getComputedStyle(e).textAlign }; }) };
    });
    const off = Math.max(...m.lines.map((l) => Math.abs(l.mid - m.cardMid)));
    report.push(`${w} template ${i}: caption off centre by ${off.toFixed(1)} px (${m.lines.map((l) => l.align).join(",")})`);
    const capBox = await p.locator(".sow__cap").boundingBox();
    const stageBox = await p.locator(".sow__stage").boundingBox();
    const y = stageBox.y + stageBox.height * 0.55;
    await p.screenshot({ path: `${out}${w}-t${i}.png`, clip: { x: 0, y, width: w, height: capBox.y + capBox.height - y + 24 } });
  }
  await ctx.close();
}
await b.close();
console.log(report.join("\n"));
