// Checks the media settle research deliverable. node reports/media-settle/verify.mjs <research|page-untouched>
import { readFileSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
const D = "reports/media-settle/";
const fail = (m) => { console.log("FAIL " + m); process.exit(1); };
const mode = process.argv[2];
if (mode === "research") {
  const r = readFileSync(D + "README.md", "utf8");
  for (const s of ["## Cause", "## Evidence", "## Options", "Recommendation:", "Growth Journey", "Action Hub", "Pathway", "Calendar setup"]) if (!r.includes(s)) fail("README missing " + s);
  if (/[–—]/.test(r)) fail("README has a dash");
  for (const f of ["compare-1440.mp4", "compare-390.mp4", "now-1440-frames.png", "option-a-1440-frames.png", "option-b-1440-frames.png", "pathway-now-frames.png", "hub-now-frames.png"]) if (statSync(D + f).size < 10000) fail("small " + f);
  for (const [f, w] of [["compare-1440.mp4", 1440], ["compare-390.mp4", 1170]]) {
    const out = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 ${D + f}`).toString().trim();
    if (+out !== w) fail(`${f} width ${out}, want ${w}`);
  }
  const ahead = execSync("git rev-list --count origin/claude/relaxed-ride-5mlbdu..HEAD -- reports/media-settle").toString().trim();
  if (ahead !== "0") fail("research not pushed");
  console.log("RESEARCH_OK");
} else if (mode === "page-untouched") {
  // The two commits made before his pick touch only the report folder
  const files = execSync("git show --name-only --format= 52cc8f9 a16c231").toString().trim().split("\n").filter(Boolean);
  if (!files.length) fail("no files read from the research commits");
  const outside = files.filter((f) => !f.startsWith("reports/media-settle/"));
  if (outside.length) fail("research commits touched " + outside.join(", "));
  console.log("PAGE_UNTOUCHED_OK");
} else fail("unknown mode");
