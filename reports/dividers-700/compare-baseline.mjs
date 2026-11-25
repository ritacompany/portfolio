// Runs verify-responsive in one mode and fails if it reports any problem line that the saved
// baseline (taken on the base branch before the divider change) did not already have.
// Usage: node scripts/compare-baseline.mjs <fit|overlap> <baseline file>
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const [mode, file] = process.argv.slice(2);
let out = "";
try { out = execFileSync("node", ["scripts/verify-responsive.mjs", mode, "all"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
catch (e) { out = (e.stdout || "") + (e.stderr || ""); }
const before = new Set(readFileSync(file, "utf8").split("\n").map((l) => l.trim()).filter(Boolean));
const fresh = out.split("\n").map((l) => l.trim()).filter(Boolean).filter((l) => !before.has(l));
if (fresh.length) { console.log(fresh.join("\n")); process.exit(1); }
console.log(`NO_NEW_${mode.toUpperCase()}_PROBLEMS`);
