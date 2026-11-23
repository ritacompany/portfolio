// Canvas screenshots of Haven on a phone: touch emulation, deviceScaleFactor 2, motion on, the page
// scrolled through first so every reveal has fired, then one viewport shot per section.
// Usage: node reports/haven-mobile-2026-11-23/shoot.mjs <out dir> <widths> [--preview] [--css a.css,b.css]
//        [--burger] [--sections hero,quiz] [--tap <selector>] [--hover <selector>]
import { createServer } from "node:http";
import { readFileSync, statSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const argv = process.argv.slice(2);
const opt = (n) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null);
const [outDir, widthArg] = argv;
const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const preview = argv.includes("--preview");
const css = [...(preview ? ["site/dev/haven-phone/phone.css"] : []), ...(opt("--css") ? opt("--css").split(",") : [])];
const SECTIONS = {
  hero: [".hero", 0], data: [".data", 0], stats: [".stats", -120], insights: [".cards-research", -80],
  timeline: [".mvp", 240], wires: [".wires__row", -160], testing: [".testing", 0], bridge: ["#bridge", -200],
  program: [".program__row", -120], quiz: [".quiz__stage", -40], quiztext: [".quiz", 380], journey: ["#flow-map", -160],
  profile: [".profile__block", 0], chat: ["#chat-rotate", 500], security: [".security__media", -80],
  ending: [".ending .stage-wrap", -140], close: [".ending__bottom", -60], bar: [".ending-bar", -500],
};
const want = opt("--sections") ? opt("--sections").split(",") : Object.keys(SECTIONS);
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/haven/`;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
mkdirSync(outDir, { recursive: true });
for (const w of widthArg.split(",").map(Number)) {
  const ctx = await browser.newContext({ viewport: { width: w, height: Math.round(w * 2.16) }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  if (preview) await page.route("**/haven/haven.js", (r) => r.fulfill({ contentType: "text/javascript", body: readFileSync(join(repo, "site/dev/haven-phone/haven.js")) }));
  await page.goto(base, { waitUntil: "networkidle" });
  for (const c of css) await page.addStyleTag({ content: readFileSync(join(repo, c), "utf8") });
  if (argv.includes("--burger")) await page.evaluate(() => { const b = document.createElement("button"); b.className = "haven-burger"; b.type = "button"; b.setAttribute("aria-label", "Menu"); b.innerHTML = '<img src="/assets/ui/menu.svg" alt="" width="18" height="12">'; document.querySelector(".site-nav .navbar").appendChild(b); });
  await page.evaluate(() => document.fonts.ready);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= H; y += w) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(110); }
  await page.waitForTimeout(2000);
  for (const k of want) {
    const [sel, off] = SECTIONS[k];
    const top = await page.evaluate((sel) => { const e = document.querySelector(sel); return e ? e.getBoundingClientRect().top + scrollY : null; }, sel);
    if (top == null) continue;
    // Arrive from above, as a reader does, so the scroll driven pieces sit where they would.
    for (let i = 5; i >= 0; i--) { await page.evaluate((y) => scrollTo(0, y), Math.max(0, top + off - i * 90)); await page.waitForTimeout(70); }
    await page.waitForTimeout(1400);
    if (opt("--tap") && k === "ending") { const b = await page.locator(opt("--tap")).first().boundingBox(); if (b) { await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(1200); } }
    if (opt("--hover") && k === "bar") { await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), opt("--hover")); const cdp = await ctx.newCDPSession(page); await cdp.send("DOM.enable"); await cdp.send("CSS.enable"); const { root: r } = await cdp.send("DOM.getDocument"); const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: r.nodeId, selector: opt("--hover") }); await cdp.send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: ["hover"] }); await page.waitForTimeout(300); }
    await page.screenshot({ path: join(outDir, `${k}-${w}.png`) });
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log("shots in", outDir);
