// Turns a rendered clip into review images to look at. Rules: .claude/motion-rules.md.
//
//   node scripts/motion-review.mjs output/motion/spring-sample.mp4 --state docs/motion/spring-sample/state_list.md --loop
//   node scripts/motion-review.mjs output/motion/clip.mp4 --cuts 0.3,2.8 --loop
//
// Writes next to the clip, in <name>-review/:
//   contact.png  one frame every --every seconds (default 0.25), 6 across, each labelled with its time
//   strip-cut-<t>s.png   every frame from 0.2 s before to 0.2 s after each cut, to catch a stutter or a pop.
//                        Cuts come from --cuts (comma separated seconds) or --state (a state list: lines
//                        "- 0.30 s: ..."). With --loop the seam at the clip end gets strip-seam-<t>s.png,
//                        taken across the wrap. strips.json lists every strip with its time.
//   strip.png    12 consecutive frames from --strip <seconds>, kept for a one off look
//   phone.png    one frame a second scaled to 360 wide, the size it reads at on a phone
//   seam.txt     with --loop: how far the last frame is from the first (PSNR; 40 dB or more is a clean seam)
// Phone scale is a read check only. A section that recomposes on mobile is rendered again at 390 wide.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";

const argv = process.argv.slice(2);
const clip = argv[0];
if (!clip || clip.startsWith("--")) { console.error("Usage: node scripts/motion-review.mjs <clip.mp4> [--every s] [--strip s] [--loop]"); process.exit(2); }
const str = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const every = Number(str("every", 0.25)), stripAt = Number(str("strip", 0));
const dir = path.join(path.dirname(clip), path.basename(clip, path.extname(clip)) + "-review");
mkdirSync(dir, { recursive: true });

const run = (args) => { const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { encoding: "utf8" }); if (r.status !== 0) { console.error(r.stderr); process.exit(1); } return r.stderr; };
const probe = (entries) => spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entries, "-of", "csv=p=0", clip], { encoding: "utf8" }).stdout.trim();
const dur = Number(probe("format=duration") || spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", clip], { encoding: "utf8" }).stdout.trim());
const [num, den] = probe("stream=r_frame_rate").split("/").map(Number);
const fps = num / (den || 1);

const count = Math.floor(dur / every + 1e-6), cols = 6, rows = Math.ceil(count / cols);
// Time labels need ffmpeg built with drawtext. Without it the tiles are unlabelled and times.txt maps them.
const hasText = /drawtext/.test(spawnSync("ffmpeg", ["-hide_banner", "-filters"], { encoding: "utf8" }).stdout);
const label = hasText ? "drawtext=text='%{pts\\:hms}':x=8:y=8:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=4," : "";
run(["-i", clip, "-vf", `fps=1/${every},scale=320:-2,${label}tile=${cols}x${rows}:padding=4:color=0x333333`, "-frames:v", "1", path.join(dir, "contact.png")]);
run(["-ss", String(stripAt), "-i", clip, "-vf", `scale=240:-2,${label}tile=12x1:padding=2`, "-frames:v", "1", path.join(dir, "strip.png")]);
run(["-i", clip, "-vf", `fps=1,scale=360:-2,tile=${Math.min(5, Math.ceil(dur))}x${Math.ceil(dur / 5)}:padding=4:color=0x333333`, "-frames:v", "1", path.join(dir, "phone.png")]);

const t = (i) => (i * every).toFixed(2) + " s";
writeFileSync(path.join(dir, "times.txt"), `contact.png, read left to right, ${cols} across:\n` +
  Array.from({ length: rows }, (_, r) => Array.from({ length: Math.min(cols, count - r * cols) }, (_, c) => t(r * cols + c)).join("  ")).join("\n") +
  `\n\nstrip.png: 12 frames from ${stripAt} s at ${fps} fps, ${(1 / fps).toFixed(3)} s apart\nphone.png: one frame a second from 0 s\n`);

if (argv.includes("--loop")) {
  const lastT = Math.max(0, dur - 1 / fps);
  run(["-i", clip, "-vf", "select=eq(n\\,0)", "-frames:v", "1", path.join(dir, "first.png")]);
  run(["-ss", String(lastT), "-i", clip, "-frames:v", "1", path.join(dir, "last.png")]);
  const out = spawnSync("ffmpeg", ["-i", path.join(dir, "first.png"), "-i", path.join(dir, "last.png"), "-lavfi", "psnr", "-f", "null", "-"], { encoding: "utf8" }).stderr;
  const m = out.match(/average:(\S+)/);
  const psnr = m ? m[1] : "unknown";
  const verdict = psnr === "inf" || Number(psnr) >= 40 ? "clean seam" : "visible seam: the last frame does not lead into the first";
  writeFileSync(path.join(dir, "seam.txt"), `last frame vs first frame PSNR ${psnr} dB: ${verdict}\n`);
  console.log(`seam  PSNR ${psnr} dB, ${verdict}`);
}
// Cut strips. A loop is read as two copies back to back, so a window across the seam wraps cleanly.
const loop = argv.includes("--loop");
let cuts = [];
if (str("cuts", null)) cuts = str("cuts").split(",").map(Number);
if (str("state", null)) cuts = cuts.concat([...readFileSync(str("state"), "utf8").matchAll(/^\s*-\s*(\d+(?:\.\d+)?)\s*s\s*:/gm)].map((m) => Number(m[1])));
const strips = [];
const seen = new Set();
for (const f of readdirSync(dir)) if (/^strip-(cut|seam)-/.test(f)) rmSync(path.join(dir, f));
for (let c of cuts.concat(loop ? [dur] : [])) {
  const seam = loop && (c >= dur - 1e-3 || c <= 1e-3);
  if (seam) c = dur;
  const key = (seam ? "seam" : "cut") + c.toFixed(2);
  if (seen.has(key) || (!loop && c > dur + 1e-3)) continue;
  seen.add(key);
  const a = Math.max(0, c - 0.2), b = loop ? c + 0.2 : Math.min(dur, c + 0.2);
  const n = Math.round((b - a) * fps) + 1, rowsN = Math.ceil(n / 12);
  const file = `strip-${seam ? "seam" : "cut"}-${c.toFixed(2)}s.png`;
  run([...(loop ? ["-stream_loop", "1"] : []), "-i", clip, "-vf", `select='between(t\\,${a.toFixed(4)}\\,${b.toFixed(4)})',scale=200:-2,${label}tile=12x${rowsN}:padding=2`, "-frames:v", "1", "-fps_mode", "passthrough", path.join(dir, file)]);
  strips.push({ t: Number(c.toFixed(2)), kind: seam ? "seam" : "cut", from: Number(a.toFixed(2)), to: Number(b.toFixed(2)), file });
}
writeFileSync(path.join(dir, "strips.json"), JSON.stringify({ clip, duration: dur, loop, strips }, null, 1));
console.log(`review images in ${dir}: contact.png, strip.png, phone.png, times.txt` + (strips.length ? `, ${strips.length} cut strips (${strips.map((x) => x.file).join(", ")})` : ""));
