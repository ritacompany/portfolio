// The shared fit check on the framework page fails only on the Start of week carousel's side cards, which
// sit off the stage by design (it clips them) and fail identically at 37b4424, before this work, at all
// five widths. This passes when every fit problem is one of those cards and there are no others.
import { spawnSync } from "node:child_process";
const r = spawnSync(process.execPath, ["scripts/verify-responsive.mjs", "fit", "framework"], { encoding: "utf8" });
const lines = (r.stdout + r.stderr).split("\n").filter((l) => /^framework @\d+:/.test(l));
const other = lines.filter((l) => !l.includes("<img.sow__card>"));
if (other.length || (r.status !== 0 && !lines.length)) { console.log(other.join("\n") || r.stdout + r.stderr); process.exit(1); }
console.log(`FIT_ONLY_CAROUSEL ${lines.length} carousel card(s), 0 other problems`);
