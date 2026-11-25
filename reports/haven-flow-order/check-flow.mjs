// Reads the journey flow order on a Haven page at desktop, tablet and phone widths, before and after
// the slide, and with reduced motion. Order is measured from where each circle is drawn, not from the DOM.
// Usage: node reports/haven-flow-order/check-flow.mjs <base url> <path> <start order> <end order>
// Orders are comma lists of data ids, e.g. quiz,review,select,schedule,intro
// Prints FLOW_ORDER_OK only when every width matches both orders and Select lands on slot 5.
import { chromium } from "playwright";

const [base, path, startArg, endArg, ariaArg] = process.argv.slice(2);
const want = { start: startArg.split(","), end: endArg.split(",") };
const sizes = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 1366 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "phone", width: 390, height: 844 },
];
const browser = await chromium.launch();
let fail = 0;

async function order(page) {
  return page.evaluate(() => {
    const map = document.getElementById("flow-map");
    const vertical = map.classList.contains("is-vertical");
    const steps = [...document.querySelectorAll("#flow-stage .flow__step")].map((el) => {
      const r = el.getBoundingClientRect();
      return { id: el.dataset.id, c: vertical ? r.top + r.height / 2 : r.left + r.width / 2, r };
    }).sort((a, b) => a.c - b.c);
    const nums = [...document.querySelectorAll("#flow-stage .flow__num")].map((n) => n.getBoundingClientRect());
    const sel = steps.find((s) => s.id === "select");
    const n5 = nums[4];
    // Select sits on slot 5 when its centre lines up with the number 5 along the flow axis.
    const aligned = vertical
      ? Math.abs((sel.r.top + sel.r.height / 2) - (n5.top + n5.height / 2)) < 4
      : Math.abs((sel.r.left + sel.r.width / 2) - (n5.left + n5.width / 2)) < 4;
    return { vertical, ids: steps.map((s) => s.id), aligned,
      aria: document.getElementById("flow-stage").getAttribute("aria-label") };
  });
}

for (const s of sizes) {
  for (const reduced of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: s.width, height: s.height }, reducedMotion: reduced ? "reduce" : "no-preference" });
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: "load" });
    await page.waitForTimeout(400);
    const label = `${s.name} ${s.width}${reduced ? " reduced motion" : ""}`;
    if (!reduced) {
      const before = await order(page);
      const okStart = before.ids.join() === want.start.join();
      console.log(`${label} start: ${before.ids.join(" > ")} ${okStart ? "ok" : "WRONG"}`);
      if (!okStart) fail++;
      await page.evaluate(() => document.getElementById("flow-map").scrollIntoView({ block: "center" }));
      await page.waitForFunction(() => document.getElementById("flow-map").dataset.bumpDone === "true", null, { timeout: 15000 })
        .catch(() => { console.log(`${label}: slide never finished`); fail++; });
      await page.waitForTimeout(300);
    }
    const after = await order(page);
    const okEnd = after.ids.join() === want.end.join() && after.aligned;
    console.log(`${label} end${after.vertical ? " (vertical)" : ""}: ${after.ids.join(" > ")} select on slot 5: ${after.aligned} ${okEnd ? "ok" : "WRONG"}`);
    if (!okEnd) fail++;
    if (ariaArg && after.aria !== ariaArg) { console.log(`${label} aria-label WRONG: ${after.aria}`); fail++; }
    await ctx.close();
  }
}
await browser.close();
if (fail) { console.log(`FLOW_ORDER_FAIL ${fail}`); process.exit(1); }
console.log("FLOW_ORDER_OK");
