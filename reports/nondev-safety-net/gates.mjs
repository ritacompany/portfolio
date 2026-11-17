// Gate checks for REPORT.md. Usage: node reports/nondev-safety-net/gates.mjs g3|g5|g6
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
const report = readFileSync("reports/nondev-safety-net/REPORT.md", "utf8");
const fail = (m) => { console.log("FAIL", m); process.exit(1); };
const mode = process.argv[2];
if (mode === "g3") {
  const paths = [...report.matchAll(/`((?:scripts|reports|\.claude\/hooks)\/[^`\s]+\.(?:mjs|sh|py))`/g)].map((m) => m[1]);
  const missing = paths.filter((p) => !existsSync(p));
  if (!paths.length || missing.length) fail(missing);
  console.log("PATHS_OK", paths.length);
} else if (mode === "g5") {
  const dash = [0x2013, 0x2014].some((c) => report.includes(String.fromCharCode(c))) || report.includes(" " + "-".repeat(2) + " ");
  if (dash) fail("dash in report");
  console.log("NO_DASH_OK");
} else if (mode === "g6") {
  const x = (c) => execSync(c).toString();
  const files = x("git show " + "-".repeat(2) + "name-only " + "-".repeat(2) + "format= da8d645").trim().split("\n");
  if (!files.every((p) => p.startsWith("reports/nondev-safety-net/"))) fail(files);
  if (x("git rev-parse HEAD") !== x("git rev-parse @{u}")) fail("not pushed");
  console.log("PUSHED_OK");
} else if (!["g7", "g8", "g9", "g10"].includes(mode)) fail("unknown mode");

// Build gates (17 Nov). Each runs the real script and checks it fails where it must.
import { spawnSync } from "node:child_process";
const run = (args) => { const r = spawnSync("node", ["scripts/check-images.mjs", ...args], { encoding: "utf8" }); return { code: r.status, out: r.stdout + r.stderr }; };
if (mode === "g7") {
  const r = run(["home", "--widths", "390"]);
  if (r.code !== 1 || !/mondai-card-phone-laptop\.webp is stretched/.test(r.out)) fail(r.out);
  console.log("CATCHES_SOFT_OK");
} else if (mode === "g8") {
  const r = run(["home", "--widths", "1440"]);
  const n = Number((r.out.match(/IMAGES_OK (\d+)/) || [])[1]);
  if (r.code !== 0 || !(n > 0)) fail(r.out);
  console.log("PASSES_SHARP_OK", n);
} else if (mode === "g9") {
  const r = run(["home", "--widths", "1440", "--max-kb", "50"]);
  if (r.code !== 1 || !/HEAVY, over 50 KB/.test(r.out)) fail(r.out);
  console.log("CATCHES_HEAVY_OK");
} else if (mode === "g10") {
  const y = readFileSync(".github/workflows/site-checks.yml", "utf8");
  const need = ["push:", "npm run check", "scripts/check-images.mjs all", "scripts/verify-responsive.mjs health all", "playwright install"];
  const miss = need.filter((n) => !y.includes(n));
  if (miss.length || (y.match(/success\(\) \|\| failure\(\)/g) || []).length !== 3) fail(miss);
  console.log("WORKFLOW_OK");
}
