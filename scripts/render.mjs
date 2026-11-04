// Renders a motion page to MP4, frame by frame, from window.seek(t). Rules: .claude/motion-rules.md.
//
//   node scripts/render.mjs --page site/motion-lab/spring-sample.html --width 1080 --height 1080 --fps 60 --dur 4
//   node scripts/render.mjs --page site/motion-lab/scroll-sample.html --mode scroll --scroll "#scene" --start "top top" --end "bottom bottom" --dur 3
//   node scripts/render.mjs --page site/motion-lab/spring-sample.html --still 1.5 --out output/motion/still.png
//
// Time mode: t runs 0 to dur seconds, end exclusive, so a loop's last frame leads into its first.
// Scroll mode: the page is scrolled through a range and t is scroll progress 0 to 1, end inclusive.
//   The range is --scroll <selector> (its top at the bottom of the screen to its bottom at the top,
//   or --start/--end "top top" style edges) or --from and --to in pixels. --dur sets how long the scrub lasts.
// Every frame is drawn --sub times at evenly spaced moments and blended, which gives real motion blur.
// The page runs with window.__RENDER__ = true. A Math.random call during a seek fails the render.
import { createServer } from "node:http";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync, createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const has = (k) => argv.includes("--" + k);
const str = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const num = (k, d) => Number(str(k, d));

const PAGE = str("page");
if (!PAGE) { console.error("Missing --page <path from repo root or URL>"); process.exit(2); }
const MODE = str("mode", "time");
const W = num("width", 1440), H = num("height", 900), DPR = num("dpr", 1);
const FPS = num("fps", 60), DUR = num("dur", 4), SUB = Math.max(1, num("sub", 4)), CRF = num("crf", 16);
const CLIP = str("clip", null);
const STILL = has("still") ? num("still", 0) : null;
const name = path.basename(PAGE.replace(/\/$/, "")).replace(/\.html$/, "") || "render";
const OUT = path.resolve(root, str("out", `output/motion/${name}-${W}x${H}${STILL !== null ? `-t${STILL}.png` : ".mp4"}`));

// Playwright: PLAYWRIGHT_MODULE if set, else the project's own node_modules (npm i -D playwright).
const pwCandidates = [process.env.PLAYWRIGHT_MODULE, path.join(root, "node_modules/playwright/index.mjs"), path.join(root, "node_modules/playwright-core/index.mjs")].filter(Boolean);
const pwPath = pwCandidates.find((p) => existsSync(p));
if (!pwPath) { console.error("Playwright not found. Run: npm i -D playwright && npx playwright install chromium"); process.exit(2); }
const { chromium } = await import(pathToFileURL(pwPath).href);

// Static server over the repo root, because ES modules do not load from file URLs.
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ttf": "font/ttf", ".glb": "model/gltf-binary", ".hdr": "application/octet-stream", ".mp4": "video/mp4" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(root, p);
    if (!file.startsWith(root)) throw new Error("bad path");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = /^https?:/.test(PAGE) ? PAGE : `http://127.0.0.1:${server.address().port}/${PAGE.replace(/^\//, "")}`;

// Software GL and a fixed colour profile keep pixels identical from run to run, WebGL included.
// The installed Chrome if there is one, else Playwright's own Chromium. Keep to one of them for a piece:
// two different browsers can give two different hashes.
const launchArgs = { headless: true, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--force-color-profile=srgb", "--font-render-hinting=none", "--disable-partial-raster", "--hide-scrollbars", "--mute-audio"] };
const browser = await chromium.launch({ ...launchArgs, channel: process.env.MOTION_BROWSER || "chrome" }).catch(() => chromium.launch(launchArgs));
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DPR, reducedMotion: "no-preference" });
await ctx.addInitScript(() => {
  window.__RENDER__ = true;
  window.__seeking = false;
  window.__randomDuringSeek = 0;
  const real = Math.random;
  Math.random = function () { if (window.__seeking) window.__randomDuringSeek++; return real(); };
  // No CSS transitions or keyframe animations in render mode: only seek(t) moves anything.
  const css = "*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}html{scroll-behavior:auto!important}";
  const add = () => { const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s); };
  if (document.head) add(); else document.addEventListener("DOMContentLoaded", add);
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error" && !/status of 404/.test(m.text())) errors.push(m.text()); });
page.on("response", (r) => { if (r.status() >= 400 && !r.url().endsWith("/favicon.ico")) errors.push(`${r.status()} ${r.url()}`); });
await page.goto(url, { waitUntil: "load" });
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => { i.loading = "eager"; return i.decode ? i.decode().catch(() => {}) : null; }));
  if (window.ready) await window.ready; // a page with async setup (models, textures) exposes a promise
});
if (!(await page.evaluate(() => typeof window.seek === "function")) && MODE === "time") {
  console.error("The page has no window.seek(t). Time mode needs one."); await browser.close(); server.close(); process.exit(1);
}

// Scroll range in page pixels.
let y0 = 0, y1 = 0;
if (MODE === "scroll") {
  const sel = str("scroll", null);
  if (sel) {
    const [r0, r1] = await page.evaluate(([sel, start, end]) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error("No element matches " + sel);
      const r = el.getBoundingClientRect(), top = r.top + scrollY, h = r.height, vh = innerHeight;
      const at = (edge) => { const [e, v] = edge.split(" "); const ey = e === "top" ? top : e === "center" ? top + h / 2 : top + h; const vy = v === "top" ? 0 : v === "center" ? vh / 2 : vh; return ey - vy; };
      return [at(start), at(end)];
    }, [sel, str("start", "top bottom"), str("end", "bottom top")]);
    y0 = r0; y1 = r1;
  } else { y0 = num("from", 0); y1 = num("to", 0); }
  const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  y0 = Math.max(0, Math.min(max, y0)); y1 = Math.max(0, Math.min(max, y1));
  if (y1 <= y0) { console.error(`Empty scroll range ${y0} to ${y1}`); await browser.close(); server.close(); process.exit(1); }
}

async function drawAt(t) {
  await page.evaluate(async ([mode, t, y]) => {
    window.__seeking = true;
    if (mode === "scroll") {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    }
    if (typeof window.seek === "function") await window.seek(t, { mode, y });
    window.__seeking = false;
  }, [MODE, t, MODE === "scroll" ? y0 + (y1 - y0) * t : 0]);
  const shot = CLIP ? page.locator(CLIP).screenshot({ type: "png" }) : page.screenshot({ type: "png" });
  return shot;
}

async function finish(code, report) {
  const bad = await page.evaluate(() => window.__randomDuringSeek).catch(() => 0);
  await browser.close(); server.close();
  if (bad) { await rm(OUT, { force: true }); console.error(`FAIL  Math.random was called ${bad} times during seek. Use rng(seed) from site/lib/motion.js. No file written.`); process.exit(1); }
  if (errors.length) { await rm(OUT, { force: true }); console.error("FAIL  page errors:\n  " + errors.join("\n  ") + "\nNo file written."); process.exit(1); }
  if (report) await report();
  process.exit(code);
}

const sha = (file) => new Promise((r) => { const h = createHash("sha256"); createReadStream(file).on("data", (d) => h.update(d)).on("end", () => r(h.digest("hex"))); });
await mkdir(path.dirname(OUT), { recursive: true });

if (STILL !== null) {
  await writeFile(OUT, await drawAt(STILL));
  await finish(0, async () => console.log(`${path.relative(root, OUT)}  sha256 ${await sha(OUT)}`));
}

// Time mode spans [0, dur), scroll mode spans [0, 1] inclusive.
const frames = Math.round(DUR * FPS);
const total = frames * SUB;
const tAt = (i) => MODE === "scroll" ? i / (total - 1) : i / (FPS * SUB);

// Each output frame is the mean of its SUB samples. Bitexact flags keep the file byte identical.
// Samples are averaged in linear light (gamma 2.2 out and back in 16 bit), so fast bright edges do not darken.
const toLin = "lutrgb=r='pow(val/65535\\,2.2)*65535':g='pow(val/65535\\,2.2)*65535':b='pow(val/65535\\,2.2)*65535'";
const toSrgb = "lutrgb=r='pow(val/65535\\,1/2.2)*65535':g='pow(val/65535\\,1/2.2)*65535':b='pow(val/65535\\,1/2.2)*65535'";
const vf = [SUB > 1 ? `format=rgb48le,${toLin},tmix=frames=${SUB}:weights=${Array(SUB).fill(1).join(" ")},${toSrgb},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${FPS}/TB` : `setpts=N/${FPS}/TB`, "pad=ceil(iw/2)*2:ceil(ih/2)*2", "format=yuv420p"].join(",");
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS * SUB), "-i", "-",
  "-vf", vf, "-r", String(FPS), "-c:v", "libx264", "-preset", "medium", "-crf", String(CRF), "-pix_fmt", "yuv420p", "-threads", "1",
  "-map_metadata", "-1", "-fflags", "+bitexact", "-flags:v", "+bitexact", "-movflags", "+faststart", OUT], { stdio: ["pipe", "inherit", "inherit"] });
const ffDone = new Promise((r) => ff.on("close", r));

const started = Date.now();
for (let i = 0; i < total; i++) {
  const png = await drawAt(tAt(i));
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
  if (i % (FPS * SUB) === 0) console.log(`frame ${i / SUB} of ${frames}`);
}
ff.stdin.end();
const code = await ffDone;
if (code !== 0) { console.error("ffmpeg failed"); await finish(1); }
const secs = ((Date.now() - started) / 1000).toFixed(1);
await finish(0, async () => console.log(`${path.relative(root, OUT)}  ${frames} frames at ${FPS} fps, ${W}x${H} @${DPR}x, ${MODE} mode, ${secs} s\nsha256 ${await sha(OUT)}`));
