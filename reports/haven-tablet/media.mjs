// F7 to F10. Media and fixed-element audit for the Haven page: how far each image is enlarged on a 2x screen,
// paired media heights, the ending bar height and the pills. Usage: node reports/haven-tablet/media.mjs 768,1024,1440
import { createRequire } from "node:module";
import { serve, settle } from "./serve.mjs";
const { server, base } = await serve();
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
let soft = 0;
for (const w of (process.argv[2] || "768,834,1024,1180,1440").split(",").map(Number)) {
  const page = await browser.newPage({ viewport: { width: w, height: 1000 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
  await page.goto(base + "/haven/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager")));
  await settle(page);
  const rows = await page.evaluate(() => {
    const out = [];
    for (const i of document.querySelectorAll("main img, .ending-bar img")) {
      const r = i.getBoundingClientRect(); if (!r.width || !i.naturalWidth || i.src.endsWith(".svg")) continue;
      // object-fit cover may crop: compare the larger of the two axis ratios
      const up = Math.max((r.width * 2) / i.naturalWidth, (r.height * 2) / i.naturalHeight);
      out.push(`${up > 1.05 ? "SOFT" : "ok  "} ${up.toFixed(2)}x ${i.src.split("/").pop()} natural ${i.naturalWidth}x${i.naturalHeight} shown ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    const H = (s) => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().height) : "none"; };
    out.push(`security a ${H(".security__a")} b ${H(".security__b")}`);
    out.push(`ending-bar ${H(".ending-bar")}`);
    return out;
  });
  soft += rows.filter((r) => r.startsWith("SOFT")).length;
  console.log(`== ${w}`); console.log(rows.join("\n"));
  await page.close();
}
await browser.close(); server.close();
// Sharp means no picture is shown larger than its own pixels on a 2x screen (5 percent slack).
if (soft) { console.error(`${soft} soft images`); process.exit(1); }
console.log("MEDIA_SHARP_OK");
