// Prints SITE_CSS_UNTOUCHED when the live site matches the base branch apart from components.css, the one
// file his approved link changes go into (23 Nov: LinkedIn and Resume).
import { execFileSync } from "node:child_process";
// Compared with where this branch left the base (three dots), plus anything uncommitted, so later commits
// on the base by other sessions do not count.
const paths = ["site/css", ":!site/css/components.css", "site/index.html", "site/haven", "site/mondai", "site/js"];
const out = execFileSync("git", ["diff", "--stat", "origin/claude/sharp-turing-jy21r2...HEAD", "--", ...paths], { encoding: "utf8" }) +
  execFileSync("git", ["diff", "--stat", "HEAD", "--", ...paths], { encoding: "utf8" });
if (out.trim()) { console.log(out); process.exit(1); }
console.log("SITE_CSS_UNTOUCHED");
