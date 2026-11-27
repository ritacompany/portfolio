// Checks the live review proposal against what the task asked. Run from the repo root.
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const which = process.argv[2];
const dir = "reports/live-review";
const fail = (m) => { console.log("FAIL " + m); process.exit(1); };

if (which === "proposal") {
  const p = readFileSync(`${dir}/PROPOSAL.md`, "utf8");
  if (!/## Recommendation/.test(p)) fail("no recommendation section");
  for (const tool of ["Annotate", "Agentation", "Flare", "impeccable"]) if (!p.includes(tool)) fail("missing " + tool);
  if (!/On your yes/.test(p)) fail("no stop for his yes");
  console.log("proposal ok");
} else if (which === "dashes") {
  // Positive control: the detector must catch a known dash.
  const bad = new RegExp("[" + String.fromCharCode(0x2013, 0x2014) + "]|\\s--\\s");
  if (!bad.test("a " + String.fromCharCode(0x2014) + " b")) fail("detector broken");
  // Prose only: the git pathspec separator in the scope check is code, not a dash.
  for (const f of [`${dir}/PROPOSAL.md`, `${dir}/GATES.md`]) {
    if (bad.test(readFileSync(f, "utf8"))) fail("dash in " + f);
  }
  console.log("dashes ok");
} else if (which === "evidence") {
  const c = JSON.parse(readFileSync(`${dir}/evidence/flare-comment-push.json`, "utf8"));
  const n = JSON.parse(readFileSync(`${dir}/evidence/flare-nudge-push.json`, "utf8"));
  const cc = c.snapshot.changes[0];
  if (cc.path !== "#haven-title" || !/heading one step smaller/.test(cc.comment)) fail("comment payload");
  const nc = n.snapshot.changes[0].changes[0];
  if (nc.property !== "margin-bottom" || nc.after !== "24px") fail("nudge payload");
  for (const img of ["flare-panel-over-page.jpg", "flare-canvas-comment.jpg"]) if (!existsSync(`${dir}/evidence/${img}`)) fail("missing " + img);
  console.log("evidence ok");
} else if (which === "scope") {
  const files = execSync("git show --name-only --format= HEAD~0", { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  const mine = execSync("git log --format=%H --grep='^Live review' -n 5", { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  if (!mine.length) fail("no live review commit");
  for (const h of mine) {
    const fs = execSync(`git show --name-only --format= ${h}`, { encoding: "utf8" }).trim().split("\n").filter(Boolean);
    for (const f of fs) if (!f.startsWith(dir + "/")) fail("outside scope: " + f);
  }
  const site = execSync("git -C ../portfolio-site status --porcelain -- scripts/serve.mjs docs/EDITING_WORKFLOW.md package.json", { encoding: "utf8" }).trim();
  if (site) fail("portfolio-site touched: " + site);
  console.log("scope ok " + files.length);
} else fail("unknown check");
