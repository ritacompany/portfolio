// Checks the five Start of week descriptions agree in final-copy.md, the page builder and the built page,
// and that none has a dash or an Oxford comma. Usage: node reports/start-of-week-copy-2026-11-21/check-sync.mjs
// Prints SOW_COPY_SYNC_OK only when all three sources hold the same five texts and the copy rules pass.
import { readFileSync } from "node:fs";
const names = ["Clean slate", "Catching up", "Rollover", "Recalibration", "Reset"];
const fc = readFileSync("reference/cs2/review-2026-11-07/final-copy.md", "utf8");
const py = readFileSync("scripts/framework-page/build.py", "utf8");
const page = readFileSync("site/mondai/framework/index.html", "utf8");
const unesc = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
let bad = 0;
names.forEach((n, i) => {
  const a = fc.match(new RegExp(`^${i + 1} of 5, ${n}(?: \\(his\\))?: (.+)$`, "m"))?.[1];
  const b = py.match(new RegExp(`"Template ${i + 1} of 5", "${n}", "([^"]+)"`))?.[1];
  const c = unesc(page.match(new RegExp(`data-title="${n}" data-desc="([^"]+)"`))?.[1] || "");
  const ok = a && a === b && b === c;
  const dash = /[–—]|--/.test(a || "");
  const oxford = /, (and|or) /.test(a || "") && /\w+, \w+[^.]*, (and|or) /.test(a || "");
  if (!ok || dash || oxford) { bad++; console.log(`FAIL ${n}: same=${!!ok} dash=${dash} oxford=${oxford}`); }
  else console.log(`ok   ${n} (${a.length} chars)`);
});
if (bad) { console.log(`SOW_COPY_SYNC_FAIL ${bad}`); process.exit(1); }
console.log("SOW_COPY_SYNC_OK");
