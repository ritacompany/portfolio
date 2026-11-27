// Gate G3: site/ unchanged on this branch against claude/page-transition-research.
import { spawnSync } from "node:child_process";
const r = spawnSync("git", ["diff", "--name-only", "origin/claude/page-transition-research", "--", "site"], { encoding: "utf8" });
if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
if (r.stdout.trim()) { console.log("site changed:\n" + r.stdout); process.exit(1); }
console.log("SITE UNTOUCHED");
