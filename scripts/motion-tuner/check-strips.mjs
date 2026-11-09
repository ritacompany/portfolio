// Gate helper: the strip check for the Contact button clip, with its arguments fixed here so the
// gates file stays plain prose. Exits with motion-check's status.
import { spawnSync } from "node:child_process";
const r = spawnSync(process.execPath, ["scripts/motion-check.mjs", "strips", "output/motion/contact-button-560x520-review", "--state", "docs/motion/contact-button/state_list.md", "--loop"], { stdio: "inherit" });
process.exit(r.status ?? 1);
