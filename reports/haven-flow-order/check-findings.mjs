// Findings file names every source and has no dash punctuation (em, en or a doubled hyphen).
import { readFileSync } from "node:fs";
// Markdown table separator rows (pipes and hyphens only) are layout, not punctuation.
const t = readFileSync(new URL("./FINDINGS.md", import.meta.url), "utf8").split("\n").filter((l) => !/^[\s|:-]+$/.test(l)).join("\n");
const dash = new RegExp("[\\u2013\\u2014]|" + "-".repeat(2));
const ok = !dash.test(t) && ["State=Early", "State=Revised", "6394:30516", "IarvWaqjIwrZ2afQmMxKm6", "final-copy.md", "prototypes/journey-map"].every((s) => t.includes(s));
console.log(ok ? "FINDINGS_OK" : "FINDINGS_BAD");
process.exit(ok ? 0 : 1);
