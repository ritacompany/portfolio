// Phase 1 gate for Haven moving onto the shared nav, footer and tokens (no change to its spacing or motion).
//   body    the case study body renders as it did at the base commit (reduced motion, header hidden):
//           no pixel off by more than 64 levels; a token value change may shift colors slightly
//   motion  nav fixed at 24, turns dark over the bridge, live clock, no console error or failed request
//   files   only index.html, haven.css and current.css changed under site/haven since the base commit
// Usage: node scripts/verify-haven.mjs body|motion|files
import { createServer } from "node:http";
import { readFileSync, statSync, mkdtempSync } from "node:fs";
import { execFileSync, execSync } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";

const BASE = "87d58cd"; // main with the Haven tactics copy (9 Nov), Haven still on its own nav; was 5f91a6c before that copy merged in
const mode = process.argv[2];
const repo = resolve(new URL("..", import.meta.url).pathname);
const fail = (m) => { console.error(m); process.exit(1); };

if (mode === "files") {
  const out = execFileSync("git", ["diff", "--name-only", BASE, "--", "site/haven"], { cwd: repo, encoding: "utf8" }).trim().split("\n").filter(Boolean);
  const extra = out.filter((f) => !["site/haven/index.html", "site/haven/haven.css", "site/haven/current.css"].includes(f));
  if (extra.length) fail(`unexpected Haven changes:\n${extra.join("\n")}`);
  console.log(`HAVEN_FILES_OK ${out.length} file(s)`);
  process.exit(0);
}
if (!["body", "motion"].includes(mode)) fail(`unknown mode ${mode}`);

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".mp4": "video/mp4" };
const serve = (root) => new Promise((ok) => {
  const s = createServer((req, res) => {
    let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
    try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
    try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { res.writeHead(404).end(); }
  });
  s.listen(0, "127.0.0.1", () => ok(s));
});
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const now = await serve(join(repo, "site"));
const problems = []; let token = "";

try {
  if (mode === "body") {
    const dir = mkdtempSync(join(tmpdir(), "haven-base-"));
    execSync(`git archive ${BASE} site | tar -x -C ${dir}`, { cwd: repo });
    const then = await serve(join(dir, "site"));
    const shoot = async (server) => {
      const p = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
      await p.goto(`http://127.0.0.1:${server.address().port}/haven/`, { waitUntil: "networkidle" });
      await p.evaluate(() => document.fonts.ready);
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
      await p.waitForTimeout(300);
      // The body ends where the old footer began (base) or where main ends (now).
      const end = await p.evaluate(() => { const f = document.querySelector("main .case-footer"); const m = document.querySelector("main").getBoundingClientRect(); return Math.round((f ? f.getBoundingClientRect().top : m.bottom) + scrollY); });
      await p.addStyleTag({ content: "header{visibility:hidden!important}" });
      const shot = (await p.screenshot({ fullPage: true })).toString("base64");
      await p.close();
      return { end, shot };
    };
    const a = await shoot(then), b = await shoot(now);
    then.close();
    if (a.end !== b.end) problems.push(`body height ${b.end}, base ${a.end}`);
    const page = await browser.newPage();
    const r = await page.evaluate(async ({ a, b, h }) => {
      const load = (d) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = "data:image/png;base64," + d; });
      const [ia, ib] = await Promise.all([load(a), load(b)]);
      const px = (img) => { const c = new OffscreenCanvas(1440, h), x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, 1440, h).data; };
      const pa = px(ia), pb = px(ib); let strong = 0, faint = 0;
      for (let i = 0; i < pa.length; i += 4) { const d = Math.max(Math.abs(pa[i] - pb[i]), Math.abs(pa[i + 1] - pb[i + 1]), Math.abs(pa[i + 2] - pb[i + 2])); if (d > 64) strong++; else if (d > 4) faint++; }
      return { strong, faint, total: pa.length / 4 };
    }, { a: a.shot, b: b.shot, h: Math.min(a.end, b.end) });
    console.log(`body ${b.end} px; strong ${r.strong}, faint ${(100 * r.faint / r.total).toFixed(3)}%`);
    if (r.strong) problems.push(`${r.strong} body pixels changed by more than 64 levels`);
    token = "HAVEN_BODY_UNCHANGED";
  }
  if (mode === "motion") {
    const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errs = []; p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    p.on("response", (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
    await p.goto(`http://127.0.0.1:${now.address().port}/haven/`, { waitUntil: "networkidle" });
    await p.waitForTimeout(800);
    const clock = await p.$eval("#chicago-time", (e) => e.textContent);
    if (clock === "10:24pm CST" || !/^\d{1,2}:\d{2}(:\d{2})?(am|pm) C[DS]T$/.test(clock)) problems.push(`clock reads ${clock}`);
    const bridgeY = await p.$eval("#bridge", (e) => e.getBoundingClientRect().top + scrollY);
    let light = false;
    for (let y = bridgeY - 900; y < bridgeY + 3000 && !light; y += 100) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); light = await p.$eval(".site-nav", (e) => e.classList.contains("is-on-light")); }
    if (!light) problems.push("nav never turned dark over the bridge");
    const top = await p.$eval(".site-nav .navbar", (e) => e.getBoundingClientRect().top);
    if (Math.abs(top - 24) > 0.5) problems.push(`nav at ${top} after scrolling, want fixed at 24`);
    if (errs.length) problems.push(errs.join("\n"));
    token = "HAVEN_MOTION_OK";
  }
} finally { await browser.close(); now.close(); }
if (problems.length) fail(problems.join("\n"));
console.log(token);
