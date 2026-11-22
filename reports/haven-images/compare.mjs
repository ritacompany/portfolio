// Before and after at 2x: the old 1x picture and the new 2x render shown at the same size on a sharp
// screen, side by side (the old files live in commit 35204b7; restore them to run this again), cropped to a 320 x 240 window. Usage: node reports/haven-images/compare.mjs <outdir>
import { createRequire } from "node:module";
import { serve } from "../haven-tablet/serve.mjs";
const { server, base } = await serve();
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const out = process.argv[2];
const pairs = [["profile-current.png","profile-card-2x.webp",0.5,0.45],["schedule-current.png","schedule-2x.webp",0.3,0.4],["security-pin-current.png","security-pin-2x.webp",0.5,0.4],["security-discreet-current.png","security-discreet-2x.webp",0.5,0.4],["chat-still.png","chat-still-2x.webp",0.5,0.3],["profile-background-current.png","profile-background.webp",0.5,0.5],["collage.png","collage-2x.webp",0.5,0.5]];
const page = await browser.newPage({ viewport: { width: 700, height: 300 }, deviceScaleFactor: 2 });
for (const [a, b, fx, fy] of pairs) {
  await page.setContent(`<body style="margin:0;background:#111;display:flex;gap:20px;font:12px sans-serif;color:#aaa">${[a, b].map((f) => `<div><div>${f}</div><div style="width:320px;height:240px;overflow:hidden;position:relative"><img src="${base}/haven/assets/${f}" style="position:absolute" data-f="${fx},${fy}"></div></div>`).join("")}</body>`);
  await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth));
  await page.evaluate(() => { const [w, h] = [document.images[0].naturalWidth, document.images[0].naturalHeight];
    for (const i of document.images) { const [fx, fy] = i.dataset.f.split(",").map(Number); i.style.width = w + "px"; i.style.height = h + "px"; i.style.left = -(w * fx - 160) + "px"; i.style.top = -(h * fy - 120) + "px"; } });
  await page.screenshot({ path: `${out}/${b.replace(".webp", "")}-compare.png` });
}
await browser.close(); server.close(); console.log("COMPARE_DONE");
