// Gates for the image check fix (26 Nov). Usage: node reports/images-ci-2026-11-26/gates.mjs scope|control|pushed
import { execSync, spawnSync } from "node:child_process";
const x = (c) => execSync(c, { encoding: "utf8" }).trim();
const mode = process.argv[2];
if (mode === "scope") {
  const files = x("git diff --name-only origin/claude/sharp-turing-jy21r2...HEAD").split("\n").filter(Boolean);
  const ok = (f) => /^site\/.*\.webp$/.test(f) || f === "scripts/check-images.mjs" || f.startsWith("reports/images-ci-2026-11-26/");
  const bad = files.filter((f) => !ok(f));
  if (!files.length || bad.length) { console.log("FAIL", bad); process.exit(1); }
  console.log("SCOPE_OK", files.length);
} else if (mode === "control") {
  // The edited check still fails where it must: a 50 KB cap on home at 1440 has to report heavy pictures.
  const r = spawnSync("node", ["scripts/check-images.mjs", "home", "--widths", "1440", "--max-kb", "50"], { encoding: "utf8" });
  if (r.status !== 1 || !/HEAVY, over 50 KB/.test(r.stdout + r.stderr)) { console.log("FAIL", r.stdout, r.stderr); process.exit(1); }
  console.log("CATCHES_HEAVY_OK");
} else if (mode === "pushed") {
  if (x("git status --porcelain -- site scripts")) { console.log("FAIL dirty"); process.exit(1); }
  if (x("git rev-parse HEAD") !== x("git rev-parse @{u}")) { console.log("FAIL not pushed"); process.exit(1); }
  console.log("PUSHED_OK");
} else { console.log("unknown mode"); process.exit(1); }
