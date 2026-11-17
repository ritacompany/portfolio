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
  const files = x("git show " + "-".repeat(2) + "name-only " + "-".repeat(2) + "format= HEAD").trim().split("\n");
  if (!files.every((p) => p.startsWith("reports/nondev-safety-net/"))) fail(files);
  if (x("git rev-parse HEAD") !== x("git rev-parse @{u}")) fail("not pushed");
  console.log("PUSHED_OK");
} else fail("unknown mode");
