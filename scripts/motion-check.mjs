// Review checks for the motion review loop. Each fails (exit 1) on the mistake it exists to catch.
// Rules: .claude/motion-rules.md.
//
//   node scripts/motion-check.mjs log docs/motion/<piece>/review_log.md
//       Fails when the last round has an open P0, no fresh eyes entry or no ranked problems.
//   node scripts/motion-check.mjs strips output/motion/<clip>-review --state docs/motion/<piece>/state_list.md [--loop]
//       Fails when any cut (or, for a loop, the seam) has no strip, or a strip is not named with its time.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const [mode, ...argv] = process.argv.slice(2);
const str = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const fail = (msg) => { console.error("FAIL  " + msg); process.exitCode = 1; };
const pass = (msg) => console.log("PASS  " + msg);

if (mode === "log") checkLog(argv[0]);
else if (mode === "strips") checkStrips(argv[0]);
else { console.error("Usage: node scripts/motion-check.mjs <log|strips> ..."); process.exit(2); }

// ---- Review log: rounds are "## Round N" headings. Problems are lines starting "- P0", "- P1", "- P2".
// Every P0 is fixed before the next round, so any P0 in the last round is still open.
function checkLog(file) {
  if (!file || !existsSync(file)) return fail(`no review log at ${file}`);
  const text = readFileSync(file, "utf8");
  const rounds = text.split(/^## Round /m).slice(1);
  if (!rounds.length) return fail(`${file}: no "## Round N" sections`);
  const last = rounds[rounds.length - 1], n = last.split(/\s/)[0];
  const p0 = last.split("\n").filter((l) => /^\s*-\s*P0\b/.test(l));
  const eyes = /^Fresh eyes:[ \t]*\S/m.test(last); // [ \t], not \s: an empty entry must not borrow the next line
  const ranked = /^\s*-\s*P[0-2]\b/m.test(last) || /^No problems? (found|left)/mi.test(last);
  if (p0.length) fail(`${file}: round ${n} has ${p0.length} open P0: ${p0[0].trim()}`);
  if (!eyes) fail(`${file}: round ${n} has no "Fresh eyes:" entry`);
  if (!ranked) fail(`${file}: round ${n} lists no ranked problems (P0, P1, P2) and does not say none were found`);
  if (!p0.length && eyes && ranked) pass(`${file}: round ${n} has no open P0 and a fresh eyes entry`);
}

// ---- Cut strips: every cut, and the seam of a loop, has a strip named strip-<kind>-<t>s.png.
function checkStrips(dir) {
  if (!dir || !existsSync(dir)) return fail(`no review folder at ${dir}`);
  let cuts = [];
  if (str("cuts", null)) cuts = str("cuts").split(",").map(Number);
  if (str("state", null)) cuts = cuts.concat([...readFileSync(str("state"), "utf8").matchAll(/^\s*-\s*(\d+(?:\.\d+)?)\s*s\s*:/gm)].map((m) => Number(m[1])));
  if (!cuts.length) return fail("no cuts given: pass --cuts or --state");
  const files = readdirSync(dir).filter((f) => /^strip-(cut|seam)-/.test(f));
  const bad = files.filter((f) => !/^strip-(cut|seam)-\d+\.\d{2}s\.png$/.test(f));
  if (bad.length) fail(`strips not named with their time: ${bad.join(", ")}`);
  const meta = existsSync(path.join(dir, "strips.json")) ? JSON.parse(readFileSync(path.join(dir, "strips.json"), "utf8")) : null;
  const dur = meta ? meta.duration : null, loop = argv.includes("--loop");
  let missing = [];
  for (let c of cuts) {
    const seam = loop && dur !== null && (c <= 1e-3 || c >= dur - 1e-3);
    const name = seam ? `strip-seam-${dur.toFixed(2)}s.png` : `strip-cut-${c.toFixed(2)}s.png`;
    if (!files.includes(name) || statSync(path.join(dir, name)).size === 0) missing.push(`${c.toFixed(2)} s (${name})`);
  }
  if (loop && dur !== null && !files.includes(`strip-seam-${dur.toFixed(2)}s.png`)) missing.push(`loop seam at ${dur.toFixed(2)} s`);
  missing = [...new Set(missing)];
  if (missing.length) fail(`no strip for: ${missing.join(", ")}`);
  else if (!bad.length) pass(`${dir}: ${cuts.length} cuts${loop ? " and the seam" : ""} each have a strip named with its time`);
}
