#!/usr/bin/env node
/**
 * Verify that the durable project records actually carry the responsive
 * outcome, rather than leaving it in a session transcript.
 *
 * Prints RECORDS OK only when every assertion passes.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(join(ROOT, file), "utf8");

const spec = read("docs/HOMEPAGE_RESPONSIVE_SPEC.md");
const next = read("NEXT.md");
const decisions = read("docs/DECISIONS.md");

const failures = [];
const need = (condition, message) => {
  if (!condition) failures.push(message);
};

// The specification must carry the implemented behaviour, not just the plan.
need(
  spec.includes("## Implemented responsive behaviour"),
  "the specification has no `Implemented responsive behaviour` section"
);

// Each structural boundary must appear together with its measured cause.
for (const boundary of ["600px", "1120px", "1440px"]) {
  need(
    spec.includes(`| ${boundary} |`),
    `the boundary table does not record ${boundary}`
  );
}
need(
  /relocation note and the navigation overlap from 1110/.test(spec),
  "the 1120 boundary is not tied to the measured 1110 pixel overlap"
);
need(
  /stop holding two groups on one line/.test(spec),
  "the 600 boundary is not tied to a measured content failure"
);

// Every section must report a responsive status, not a wide-only one.
const sections = [
  "Hero and navigation",
  "Work cards",
  "Mondai index",
  "About",
  "Footer"
];
for (const section of sections) {
  const pattern = new RegExp(
    `### ${section}\\n\\nStatus: verified across the full range`
  );
  need(pattern.test(spec), `section "${section}" does not report a verified status`);
}
need(
  !/Status: approved for wide desktop/.test(spec),
  "a section still reports the wide-desktop-only status"
);
need(
  !/Status: committed wide baseline for responsive work/.test(spec),
  "a section still reports the committed-wide-baseline status"
);

// The evidence must name the checks and the browser limitation honestly.
for (const token of ["`regress`", "`sweep`", "`a11y`", "`menu`", "`zoom`", "`sticky`"]) {
  need(spec.includes(token), `the verification table does not name ${token}`);
}
need(
  /not\s+\n?verified/.test(spec) && /Safari, Firefox/.test(spec),
  "the specification does not record cross-browser coverage as not verified"
);

// The next-step list must no longer ask for the responsive build.
need(
  !/implement compact, tablet\s*\n?\s*and mobile behavior/i.test(next),
  "NEXT.md still lists the responsive implementation as pending"
);
need(
  !/Start one end-to-end implementation task/i.test(next),
  "NEXT.md still asks for the implementation task to be started"
);
need(
  /Review the finished responsive homepage/i.test(next),
  "NEXT.md does not point at the finished homepage for review"
);

// The durable decision record must carry the outcome.
need(
  /2026-09-13: Responsive homepage implemented/.test(decisions),
  "docs/DECISIONS.md has no entry for the responsive implementation"
);

if (failures.length) {
  console.log(`RECORDS FAIL ${failures.length}`);
  for (const failure of failures) console.log(`  ${failure}`);
  process.exit(1);
}

console.log("RECORDS OK");
