// Renders the phone journey flow to an MP4: 390 by 844 viewport at device scale 2 (780 by 1688 frames),
// full frame. Each frame is a screenshot after seeking the page's own WAAPI animations, so the video is
// the page's motion at its true timing (1700 ms timeline at playback rate 0.85, 2 s of wall time).
// Usage: node reports/haven-flow-order/render-flow.mjs <base url> <path> <out.mp4> [fps]
import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";

const [base, path, out, fpsArg] = process.argv.slice(2);
const FPS = Number(fpsArg || 60), RATE = 0.85, DT = 1700;
const HOLD_START = 0.6, PLAY = DT / RATE / 1000, HOLD_END = 1.2;
const dir = "/tmp/claude-0/flow-frames";
rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto(base + path, { waitUntil: "load" });
await p.evaluate(() => document.fonts.ready);
// Put the column in frame: its top 11 px below the top of the screen, so all 822 px fit.
await p.evaluate(() => { const r = document.getElementById("flow-map").getBoundingClientRect(); window.scrollTo(0, scrollY + r.top - 11); });
// Let the page reveal the row and start the flow, then take the clock away from it.
await p.waitForFunction(() => document.getElementById("flow-map").dataset.bumpDone === "true", null, { timeout: 15000 });
const n = await p.evaluate(() => {
  const anims = document.getAnimations().filter((a) => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest("#flow-stage"));
  anims.forEach((a) => { a.pause(); a.currentTime = 0; });
  window.__seek = (ms) => anims.forEach((a) => { a.currentTime = ms; });
  return anims.length;
});
if (n !== 3) throw new Error("expected 3 flow animations, found " + n);

const total = Math.round((HOLD_START + PLAY + HOLD_END) * FPS);
for (let f = 0; f < total; f++) {
  const t = f / FPS - HOLD_START;
  const ms = Math.max(0, Math.min(DT, t * 1000 * RATE));
  await p.evaluate((v) => window.__seek(v), ms);
  await p.screenshot({ path: `${dir}/f${String(f).padStart(4, "0")}.png` });
}
await b.close();
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", `${dir}/f%04d.png`,
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-movflags", "+faststart", out]);
console.log(`RENDER_OK ${total} frames at ${FPS} fps, 780x1688 -> ${out}`);
