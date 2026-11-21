// G1: every section on the built framework page, plus nav and footer, has a row in AUDIT.md naming the build, the frame
// and where it came from. Section names are read from the page, so a section added later without a row fails.
import { readFileSync } from "node:fs";
const root = new URL("../../", import.meta.url);
const html = readFileSync(new URL("site/mondai/framework/index.html", root), "utf8");
const audit = readFileSync(new URL("reports/fw-sync-2026-11-20/AUDIT.md", root), "utf8");
const alias = { "Introduction": "Hero", "Action hub": "Action Hub", "Action item": "Action Item", "The test": "Ending, The test" };
const secs = [...html.matchAll(/<section class="fw-sec[^"]*"[^>]*aria-label="([^"]+)"/g)].map((m) => alias[m[1]] || m[1]);
const rows = audit.split("\n").filter((l) => /^\| [^-|]/.test(l)).map((l) => l.split("|").map((c) => c.trim()));
const names = rows.map((r) => r[1]);
const need = ["Nav", ...secs, "Ending strip", "Footer"];
const fails = [];
for (const n of need) {
  const hits = names.filter((x) => x === n || x.startsWith(n + ","));
  if (!hits.length) fails.push(`no row for ${n}`);
  for (const r of rows.filter((r) => r[1] === n || r[1].startsWith(n + ","))) if (r.slice(2, 6).some((c) => !c)) fails.push(`row ${r[1]} has an empty cell`);
}
if (secs.length < 13) fails.push(`only ${secs.length} sections read from the page`);
if (fails.length) { console.log(fails.join("\n")); process.exit(1); }
console.log(`AUDIT_OK (${need.length} rows checked)`);
