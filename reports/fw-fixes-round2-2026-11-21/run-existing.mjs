// G5: runs every existing framework check named in the round 2 brief, in order, against the site on 4318.
// Prints each check's last line and ALL_EXISTING_OK only when all of them exit 0.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const url = "http://localhost:4318/mondai/framework/";
// fw-sync check.mjs takes one gate per run; its gates are read from its own file so none is skipped.
const syncSrc = readFileSync(join(root, "reports/fw-sync-2026-11-20/check.mjs"), "utf8");
const syncGates = [...syncSrc.slice(syncSrc.indexOf("const gates = {")).matchAll(/^  async (\w+)\(/gm)].map((m) => m[1]);
const runs = [
  ["reports/framework-tablet-2/verify.mjs"], ["reports/framework-tablet-2/motion.mjs"],
  ["reports/framework-tablet-3/check.mjs"], ["reports/tablet-breakpoint/verify.mjs"],
  ...syncGates.map((g) => ["reports/fw-sync-2026-11-20/check.mjs", "4318", g]),
  ["reports/figma-tablet-sections-2026-11-20/build-check.mjs", url],
  ["reports/framework-tablet-4/check.mjs"], ["reports/falling-behind-motion-2026-11-20/check.mjs"],
];
let bad = 0;
for (const args of runs) {
  const r = spawnSync("node", args, { cwd: root, encoding: "utf8", timeout: 600000 });
  const out = (r.stdout + r.stderr).trim().split("\n");
  const ok = r.status === 0;
  if (!ok) bad++;
  console.log(`${ok ? "PASS" : "FAIL"} ${args.join(" ")} :: ${ok ? out.at(-1) : out.slice(-8).join(" | ")}`);
}
console.log(bad ? `${bad} existing check(s) failed` : `ALL_EXISTING_OK (${runs.length} runs, fw-sync gates: ${syncGates.join(", ")})`);
process.exit(bad ? 1 : 0);
