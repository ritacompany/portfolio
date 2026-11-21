// Full page shots and a layout dump of the framework page at given widths, reduced motion on.
// Usage: node reports/tablet-breakpoint/shoot.mjs <outdir> 768,834,1024,1180 [motion]
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
const [out, ws, motion] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
for (const w of ws.split(",").map(Number)) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion ? "no-preference" : "reduce" });
  await p.goto(`http://localhost:${process.env.PORT||4318}/mondai/framework/`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach(i => i.loading = "eager"));
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/fw-${w}.png`, fullPage: true });
  const dump = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const rows = [`scrollWidth ${document.documentElement.scrollWidth} client ${vw} height ${document.body.scrollHeight}`];
    for (const s of document.querySelectorAll(".fw-sec")) {
      const r = s.getBoundingClientRect();
      rows.push(`SEC ${s.getAttribute("aria-label")} top ${Math.round(r.top + scrollY)} h ${Math.round(r.height)}`);
      for (const c of s.children) {
        const q = c.getBoundingClientRect(); const cs = getComputedStyle(c);
        rows.push(`  ${c.tagName.toLowerCase()}.${[...c.classList].join(".")} [${c.dataset.figmaNode||""}] x ${Math.round(q.left)} w ${Math.round(q.width)} h ${Math.round(q.height)} y ${Math.round(q.top + scrollY)} disp ${cs.display} fs ${cs.fontSize} ${q.right > vw + 0.5 ? "OVERFLOW" : ""} ${(c.textContent||"").trim().slice(0,40)}`);
      }
    }
    return rows.join("\n");
  });
  writeFileSync(`${out}/fw-${w}.txt`, dump);
  await p.close();
}
await b.close();
console.log("shot");
