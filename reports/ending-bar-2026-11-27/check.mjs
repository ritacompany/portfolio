// The ending bar on every page that has one, at 390, 768, 1024, 1440: Explore more is hidden, previous sits on the
// left edge and next on the right edge of the bar. Prints ENDING_BAR_OK.
import { chromium } from "playwright";
const base = process.argv[2] || "http://127.0.0.1:4400";
const b = await chromium.launch(); let bad = 0;
for (const path of ["/mondai/framework/", "/haven/"]) for (const w of [390, 768, 1024, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(base + path, { waitUntil: "load" });
  const r = await p.evaluate(() => {
    const bar = document.querySelector(".ending-bar"); if (!bar) return null;
    const B = bar.getBoundingClientRect(), cs = getComputedStyle(bar);
    const pad = parseFloat(cs.paddingLeft), padR = parseFloat(cs.paddingRight);
    const prev = bar.querySelector(".ending-bar__prev").getBoundingClientRect(), next = bar.querySelector(".ending-bar__next").getBoundingClientRect();
    const all = bar.querySelector(".ending-bar__all");
    return { hidden: !all || getComputedStyle(all).display === "none", prevL: prev.left - B.left - pad, nextR: B.right - padR - next.right, sameRow: Math.abs((prev.top + prev.bottom) / 2 - (next.top + next.bottom) / 2) < 4 };
  });
  const ok = r && r.hidden && Math.abs(r.prevL) < 2 && Math.abs(r.nextR) < 2 && r.sameRow;
  if (!ok) bad++;
  console.log(path, w, ok ? "ok" : "WRONG", JSON.stringify(r));
}
await b.close();
console.log(bad ? "ENDING_BAR_FAIL" : "ENDING_BAR_OK"); process.exit(bad ? 1 : 0);
