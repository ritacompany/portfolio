// Screenshots the MVP section at the given widths into the given folder (F1 visual check).
import { createRequire } from "node:module";
import { serve, settle } from "./serve.mjs";
const { server, base } = await serve();
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const [widths, dir] = [process.argv[2].split(",").map(Number), process.argv[3]];
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  await page.goto(`${base}/haven/`); await settle?.(page);
  await page.locator(".mvp").screenshot({ path: `${dir}/mvp-${w}.png` }); await page.close();
}
await browser.close(); server.close();
