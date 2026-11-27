// Gate G2: both version videos exist, 1440x900, 3 to 8 seconds.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
const files = ["reports/mondai-collection-v2/updated-1.mp4", "reports/mondai-collection-v2/updated-2.mp4"];
let ok = true;
for (const f of files) {
  if (!existsSync(f)) { console.log("missing " + f); ok = false; continue; }
  const p = spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:format=duration", "-of", "json", f], { encoding: "utf8" });
  const j = JSON.parse(p.stdout || "{}"); const s = (j.streams || [])[0] || {}; const d = Number(j.format && j.format.duration);
  const good = s.width === 1440 && s.height === 900 && d >= 3 && d <= 8;
  console.log(f, s.width + "x" + s.height, d.toFixed(2) + "s", good ? "ok" : "BAD");
  ok = ok && good;
}
if (ok) console.log("VIDEOS OK"); else process.exit(1);
