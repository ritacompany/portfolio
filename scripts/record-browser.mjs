// Records motion that runs on the browser clock (page changes, page entrances, smooth scroll) from a
// real Chromium window, for the review loop in .claude/motion-rules.md. seek(t) rendering
// (scripts/render.mjs) cannot capture these: a page change is two documents, and entrances run on the
// page's own timers. Captures every frame headless Chromium paints (DevTools screencast) with its own
// time and lays them on a 60 fps timeline. A visible Chromium window on a virtual screen (Xvfb) was tried
// and skips cross document view transitions entirely, so it is not used.
// The screencast drops frames during a page change at full speed (a 367 ms gap was measured), so by
// default every animation plays ten times slower while filming and the film is sped back up, giving a
// real time clip with every frame. --keep-slow keeps the slowed clip to study frame by frame.
//
//   node scripts/record-browser.mjs docs/motion/<piece>/record.json output/motion/<clip>.mp4 1440x900
//   node scripts/record-browser.mjs docs/motion/<piece>/record.json output/motion/<clip>-390.mp4 390x844
//   options: --reduced (reduced motion on), --slow N (default 10, 1 films at full speed), --keep-slow.
//
// record.json is a list of steps, run in order on the real site served from site/ (scripts/serve.mjs):
//   { "goto": "/" }                      open a page and wait for it to load
//   { "wait": 1500 }                     hold, in ms
//   { "scrollTo": ".work-card-mondai" }  bring an element to the middle of the screen, without motion
//   { "click": ".work-card-mondai", "mark": "Home to collection" }   a real pointer click
//   { "back": true, "mark": "Back to Home" }                         the browser back button
// Prints MARK lines (seconds from the clip start) for writing state_list.md, and RECORDED when done.
// Needs ffmpeg.
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import path from "node:path";

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const flag = (k) => argv.includes("--" + k);
const stepsFile = argv[0];
if (!stepsFile || stepsFile.startsWith("--")) { console.error("Usage: node scripts/record-browser.mjs <record.json> --width W --height H --out clip.mp4 [--reduced] [--slow N] [--keep-slow]"); process.exit(2); }
const steps = JSON.parse(readFileSync(stepsFile, "utf8"));
// Positional form: <record.json> <out.mp4> [WIDTHxHEIGHT], filmed at --slow 10 unless told otherwise.
const pos = argv.filter((a, i) => !a.startsWith("--") && !(i > 0 && argv[i - 1].startsWith("--") && !["--mobile", "--reduced", "--keep-slow"].includes(argv[i - 1])));
const size = (pos[2] || "").match(/^(\d+)x(\d+)$/);
const width = Number(size ? size[1] : opt("width", 1440)), height = Number(size ? size[2] : opt("height", 900));
const out = pos[1] || opt("out", "output/motion/recording.mp4");
const port = Number(opt("port", 4391));
const repo = path.resolve(new URL("..", import.meta.url).pathname);
const local = [process.env.PLAYWRIGHT_MODULE, path.join(repo, "node_modules/playwright/index.mjs")].filter(Boolean).find(existsSync);
const { chromium } = local ? await import(local) : createRequire(import.meta.url)("playwright");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const procs = [];
process.on("exit", () => procs.forEach((p) => { try { p.kill("SIGINT"); } catch {} }));

const server = spawn(process.execPath, [path.join(repo, "scripts/serve.mjs"), opt("site", path.join(repo, "site"))], { env: { ...process.env, PORT: String(port) }, stdio: ["ignore", "pipe", "inherit"] });
procs.push(server);
await new Promise((res, rej) => { server.stdout.on("data", (d) => /site at/.test(String(d)) && res()); server.on("exit", () => rej(new Error("server exited"))); });
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: flag("reduced") ? "reduce" : "no-preference" });
const slow = Number(opt("slow", 10));
if (slow !== 1) {
  // Capture at 1/slow speed so no frame is dropped: every animation on every page (WAAPI entrances,
  // CSS animations, the view transition) plays slow, and every step's wait is stretched to match. The
  // film is then sped back up by the same factor, so the clip runs in real time. --keep-slow keeps it slow.
  await context.addInitScript((k) => {
    const rate = (a) => { try { a.playbackRate = 1 / k; } catch {} };
    const orig = Element.prototype.animate;
    Element.prototype.animate = function (...args) { const x = orig.apply(this, args); rate(x); return x; };
    const all = () => document.getAnimations().forEach(rate);
    addEventListener("pagereveal", (e) => { all(); if (e.viewTransition) e.viewTransition.ready.then(all); });
    document.addEventListener("animationstart", all, true);
    addEventListener("DOMContentLoaded", all); addEventListener("load", all);
  }, slow);
}
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
const frames = [];
cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
  frames.push({ t: metadata.timestamp, data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId }); } catch {}
});
await page.goto(base + (steps[0].goto || "/"), { waitUntil: "load" });
await wait(600);
await cdp.send("Page.startScreencast", { format: "png", maxWidth: width, maxHeight: height, everyNthFrame: 1 });
const t0 = Date.now() / 1000;
const marks = [];
const mark = (name) => name && marks.push([name, Date.now() / 1000]);

for (const s of steps.slice(steps[0].goto ? 1 : 0)) {
  if (s.goto) await page.goto(base + s.goto, { waitUntil: "load" });
  if (s.wait) await page.waitForTimeout(s.wait * slow);
  if (s.scrollTo) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel), r = el.getBoundingClientRect();
      scrollTo(0, r.top + scrollY - (innerHeight - r.height) / 2);
    }, s.scrollTo);
    await page.waitForTimeout(300 * slow);
  }
  if (s.click) { mark(s.mark); await page.click(s.click); await page.waitForLoadState("load"); }
  if (s.back) { mark(s.mark); await page.goBack({ waitUntil: "load" }); }
}
await page.waitForTimeout(300);
const tEnd = Date.now() / 1000;
await cdp.send("Page.stopScreencast").catch(() => {});
await browser.close();
server.kill();

// Each captured frame holds until the next one was painted, laid on a 60 fps timeline.
frames.sort((a, b) => a.t - b.t);
const used = frames.filter((f) => f.t >= t0 - 1);
if (used.length < 2) { console.error("no frames captured"); process.exit(1); }
const tmp = mkdtempSync(path.join(tmpdir(), "record-"));
const lines = [];
used.forEach((f, i) => {
  const file = path.join(tmp, `f${String(i).padStart(5, "0")}.png`);
  writeFileSync(file, Buffer.from(f.data, "base64"));
  const next = used[i + 1] ? used[i + 1].t : Math.max(tEnd, f.t + 0.05);
  lines.push(`file '${file}'`, `duration ${Math.max(0.001, next - f.t).toFixed(4)}`);
});
lines.push(`file '${path.join(tmp, `f${String(used.length - 1).padStart(5, "0")}.png`)}'`);
writeFileSync(path.join(tmp, "list.txt"), lines.join("\n") + "\n");
mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", path.join(tmp, "list.txt"), "-vf", `${slow !== 1 && !flag("keep-slow") ? `setpts=PTS/${slow},` : ""}fps=60,scale=${width}:${height},format=yuv420p`, "-c:v", "libx264", "-crf", "14", out], { encoding: "utf8" });
rmSync(tmp, { recursive: true, force: true });
if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
const clip0 = used[0].t;
const k = slow !== 1 && !flag("keep-slow") ? slow : 1; // marks in clip seconds
// Frame gaps around each mark: the longest wait between painted frames in the 0.6 s after it.
for (const [name, t] of marks) {
  const win = used.filter((f) => f.t >= t && f.t <= t + 0.6 * slow);
  let gap = 0; for (let i = 1; i < win.length; i++) gap = Math.max(gap, win[i].t - win[i - 1].t);
  console.log(`MARK ${((t - clip0) / k).toFixed(2)} s ${name} (${win.length} frames painted in the next ${(0.6 * slow).toFixed(1)} s, longest gap ${(gap * 1000).toFixed(0)} ms)`);
}
// A gap longer than 3 frames at 60 fps (in real time) means the capture dropped frames there: the clip
// would show a cut that the browser never drew. Exit 3 so the caller records again.
let worst = 0;
// The window is the page change itself (0.1 to 0.45 s after the click, real time), edges included, so
// a capture that goes quiet there counts as dropped even if the few frames it has are close together.
for (const [, t] of marks) {
  const a = t + 0.1 * slow, b = t + 0.45 * slow;
  const times = [a, ...used.filter((f) => f.t > a && f.t < b).map((f) => f.t), b];
  for (let i = 1; i < times.length; i++) worst = Math.max(worst, (times[i] - times[i - 1]) / slow);
}
console.log(`RECORDED ${out}`);
if (worst > 0.05) { console.log(`DROPPED_FRAMES: a ${(worst * 1000).toFixed(0)} ms gap after a mark; record again`); process.exit(3); }
console.log("NO_DROPPED_FRAMES");
process.exit(0);
