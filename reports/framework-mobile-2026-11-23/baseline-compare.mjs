// G14: the proposal against the live page on the repo's own verify-responsive code (fit, overlap, size, health),
// at the five phone widths. Problems are compared with the page name taken out; the proposal must add none.
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const here = dirname(fileURLToPath(import.meta.url));
const run = (mode, page) => { try { return execFileSync("node", [join(here, "verify-responsive-dev.mjs"), mode, page, "--widths", "320,360,375,390,430"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); } catch (e) { return (e.stdout || "") + (e.stderr || ""); } };
const lines = (t, page) => t.split("\n").filter((l) => l.startsWith(page + " @")).map((l) => l.slice(page.length).replace(/ spans .*$/, " past the screen"));
// fit lines carry pixel positions, which move with the margin: they are compared by element and width
let worse = 0;
for (const mode of ["fit", "overlap", "size", "health"]) {
  const live = new Set(lines(run(mode, "framework"), "framework"));
  const dev = lines(run(mode, "framework-dev"), "framework-dev");
  const added = dev.filter((l) => !live.has(l));
  console.log(`${mode}: live ${live.size}, proposal ${dev.length}, new ${added.length}`);
  added.forEach((l) => console.log("  new" + l));
  worse += added.length;
}
console.log(worse ? `BASELINE_WORSE ${worse}` : "BASELINE_SAME");
process.exitCode = worse ? 1 : 0;
