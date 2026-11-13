// Full page shots and a layout dump of the Haven page at given widths.
// Usage: node reports/haven-tablet/shoot.mjs <outdir> 768,834,1024,1180 [motion]   (needs the site served on PORT, default 4318)
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
const [out, ws, motion] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
for (const w of ws.split(",").map(Number)) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion ? "no-preference" : "reduce" });
  await p.goto(`http://localhost:${process.env.PORT || 4318}/haven/`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/haven-${w}.png`, fullPage: true });
  const dump = await p.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const rows = [`scrollWidth ${document.documentElement.scrollWidth} client ${vw} height ${document.body.scrollHeight}`];
    const walk = (el, depth) => {
      for (const c of el.children) {
        const q = c.getBoundingClientRect(); const cs = getComputedStyle(c);
        if (q.width === 0 && q.height === 0) continue;
        rows.push(`${"  ".repeat(depth)}${c.tagName.toLowerCase()}.${[...c.classList].join(".")} x ${Math.round(q.left)} r ${Math.round(q.right)} w ${Math.round(q.width)} h ${Math.round(q.height)} y ${Math.round(q.top + scrollY)} fs ${cs.fontSize} ${q.right > vw + 0.5 ? "OVERFLOW" : ""} ${c.children.length ? "" : (c.textContent || "").trim().slice(0, 40)}`);
        if (depth < 4) walk(c, depth + 1);
      }
    };
    walk(document.querySelector("main"), 0);
    return rows.join("\n");
  });
  writeFileSync(`${out}/haven-${w}.txt`, dump);
  await p.close();
}
await b.close();
console.log("shot");
