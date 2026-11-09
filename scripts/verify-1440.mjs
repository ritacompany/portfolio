// Phase 3 regression gate: responsive work must leave the 1440 build exactly where Phase 1 left it.
// Runs every Phase 0 and Phase 1 check in sequence and prints DESKTOP_1440_OK only when each one
// exited 0 and printed its own success token.
// Usage: node scripts/verify-1440.mjs
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const repo = resolve(new URL("..", import.meta.url).pathname);
const runs = [];
for (const page of ["collection", "home", "framework"]) {
  for (const [mode, token] of [["boxes", /^BOXES_OK (\d+)\/\1$/m], ["pixels", /^PIXELS_OK$/m], ["health", /^HEALTH_OK$/m], ["a11y", /^A11Y_OK$/m], ["shared", /^SHARED_OK$/m]]) {
    runs.push([["scripts/verify-pages.mjs", mode, page], token]);
  }
}
for (const [mode, token] of [["grid", /^GRID_OK/m], ["sizes", /^SIZES_OK (\d+)\/\1$/m], ["pixels", /^PIXELS_OK$/m], ["focus", /^FOCUS_OK$/m], ["health", /^HEALTH_OK$/m]]) {
  runs.push([["scripts/verify-components.mjs", mode], token]);
}
runs.push([["scripts/verify-haven.mjs", "body"], /^HAVEN_BODY_UNCHANGED$/m]);
runs.push([["scripts/verify-haven.mjs", "motion"], /^HAVEN_MOTION_OK$/m]);
runs.push([["scripts/check-site.mjs"], /^site check OK/m]);

const failed = [];
for (const [args, token] of runs) {
  const r = spawnSync(process.execPath, args, { cwd: repo, encoding: "utf8", timeout: 300000 });
  const out = `${r.stdout || ""}${r.stderr || ""}`;
  const ok = r.status === 0 && token.test(out);
  console.log(`${ok ? "ok  " : "FAIL"} ${args.slice(1).join(" ") || args[0]} (${args[0].replace("scripts/", "")})${ok ? "" : `\n${out.trim().split("\n").slice(-8).join("\n")}`}`);
  if (!ok) failed.push(args.join(" "));
}
if (failed.length) { console.error(`${failed.length} of ${runs.length} failed`); process.exit(1); }
console.log(`DESKTOP_1440_OK ${runs.length}/${runs.length}`);
