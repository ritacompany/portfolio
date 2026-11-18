// Spacing rhythm of the framework page: for each section, every element in reading order with its box and
// the gap from the element above it in the same column (trimmed text boxes, so gaps are cap top to baseline).
// Usage: node reports/framework-tablet-2/measure.mjs 1440,768 [motion]
import { serve, chromium, open } from "./serve.mjs";
const [ws = "1440,768", motion] = process.argv.slice(2);
const { server, base } = await serve();
const b = await chromium.launch();
for (const w of ws.split(",").map(Number)) {
  const page = await open(b, base, w, motion ? "no-preference" : "reduce");
  const rows = await page.evaluate(() => {
    const out = [];
    const z = parseFloat(getComputedStyle(document.querySelector(".fw")).zoom) || 1;
    for (const s of document.querySelectorAll(".fw-sec")) {
      const sr = s.getBoundingClientRect();
      out.push(`SEC ${s.getAttribute("aria-label")} h ${(sr.height / z).toFixed(0)}`);
      const kids = [...s.children].filter((c) => getComputedStyle(c).display !== "none" && !c.matches(".panel-card,.panel-example,.vrule"));
      const boxes = kids.map((c) => ({ c, r: c.getBoundingClientRect() }));
      for (const { c, r } of boxes) {
        // nearest element above in the same column (horizontal overlap), by bottom edge
        let above = null;
        for (const o of boxes) if (o.c !== c && o.r.bottom <= r.top + 0.5 && o.r.left < r.right - 1 && o.r.right > r.left + 1 && (!above || o.r.bottom > above.r.bottom)) above = o;
        const gap = above ? ((r.top - above.r.bottom) / z).toFixed(1) : `top ${((r.top - sr.top) / z).toFixed(1)}`;
        const cls = [...c.classList].filter((k) => k.startsWith("s-") || ["fig", "rule", "sow", "fw-logo"].includes(k)).join(".");
        const fs = getComputedStyle(c).fontSize;
        out.push(`  ${c.dataset.figmaNode || "-"} ${cls} fs ${fs} x ${(r.left / z).toFixed(0)} w ${(r.width / z).toFixed(0)} h ${(r.height / z).toFixed(1)} gap ${gap} | ${(c.textContent || "").trim().slice(0, 34)}`);
      }
      const last = Math.max(...boxes.map((o) => o.r.bottom));
      out.push(`  bottom space ${((sr.bottom - last) / z).toFixed(1)}`);
    }
    return out.join("\n");
  });
  console.log(`===== ${w}\n${rows}`);
  await page.close();
}
await b.close(); server.close();
