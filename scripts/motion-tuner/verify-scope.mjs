// Gate helper: the Contact button branch changes only the Contact button files when diffed against
// its base branch. Prints SCOPE_OK when every changed path is on the allowed list.
import { spawnSync } from "node:child_process";
const base = process.argv[2] || "origin/claude/lucid-carson-u56t7v";
const r = spawnSync("git", ["diff", "--name-only", `${base}...HEAD`], { encoding: "utf8" });
if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
const allowed = [/^site\/js\/contact-goo\.js$/, /^site\/css\/components\.css$/, /^site\/motion-lab\//, /^scripts\/motion-tuner\//, /^scripts\/verify-contact-goo\.mjs$/, /^docs\/motion\/contact-button\//, /^docs\/SITE_BUILD_PLAN\.md$/];
const files = r.stdout.split("\n").filter(Boolean);
const bad = files.filter((f) => !allowed.some((re) => re.test(f)));
if (bad.length) { console.error("outside the Contact button scope:\n" + bad.join("\n")); process.exit(1); }
console.log(`SCOPE_OK ${files.length} file(s) against ${base}`);
