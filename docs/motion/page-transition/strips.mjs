// Runs the strip check on both page fade clips (gate G4). Prints PASS lines from motion-check.
import { spawnSync } from "node:child_process";
let bad = 0;
for (const w of ["1440", "390"]) {
  const r = spawnSync(process.execPath, ["scripts/motion-check.mjs", "strips", `output/motion/page-fade-${w}-review`, "--state", "docs/motion/page-transition/state_list.md"], { stdio: "inherit" });
  if (r.status !== 0) bad++;
}
process.exit(bad ? 1 : 0);
