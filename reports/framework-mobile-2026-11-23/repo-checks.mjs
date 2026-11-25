// G15: the repo's own checks on the live site, each with its success token, plus the carousel check on the proposal page.
import { execFileSync, execFile } from "node:child_process";
import { promisify } from "node:util";
import { serve } from "./serve.mjs";
const run = promisify(execFile);
const { server, base } = await serve();
const SCRATCH = join(dirname(fileURLToPath(import.meta.url)), ".carousel-shots");
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const repo = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const checks = [
  [["scripts/verify-responsive.mjs", "health", "framework"], /RESPONSIVE_HEALTH_OK/],
  [["scripts/verify-hover-still.mjs", "site"], /HOVER_STILL_OK/],
  [["scripts/check-site.mjs"], /site check OK/],
  [["scripts/check-week-carousel.mjs", base + "/mondai/framework/", SCRATCH], /CAROUSEL_CHECK_PASSED/],
  [["scripts/check-week-carousel.mjs", base + "/dev/framework-mobile/", SCRATCH], /CAROUSEL_CHECK_PASSED/],
];
let ok = 0;
for (const [args, token] of checks) {
  let out = "", code = 0;
  try { out = (await run("node", args, { cwd: repo, encoding: "utf8", timeout: 600000, maxBuffer: 1 << 26 })).stdout; } catch (e) { out = (e.stdout || "") + (e.stderr || ""); code = e.code || 1; }
  const pass = code === 0 && token.test(out);
  console.log(`${pass ? "PASS" : "FAIL"} ${args.join(" ")} :: ${out.trim().split("\n").slice(-1)[0]}`);
  if (pass) ok++;
}
server.close();
console.log(ok === checks.length ? `REPO_CHECKS_OK ${ok} of ${checks.length}` : `REPO_CHECKS_FAIL ${checks.length - ok} of ${checks.length}`);
process.exitCode = ok === checks.length ? 0 : 1;
