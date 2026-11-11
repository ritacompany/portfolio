// Runs the framework page motion gates (framework-page-GATES.md) end to end.
// Usage, from the repository root: node docs/motion/framework-page-gates.mjs <browser|copy|dashes>
// browser: starts the studio server on a free port, loads /mondai/framework/ in headless Chromium at
//   1440, 768 and 390 with motion and with reduced motion, runs framework-page-check.js and asserts.
// copy: no change to the approved page markup against the commit before this round.
// dashes: no em or en dash in this round's docs.
import { readFileSync } from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const mode = process.argv[2];
const fail = (m) => { console.error("FAIL " + m); process.exit(1); };

if (mode === "copy") {
  const d = execFileSync("git", ["diff", "--name-only", "6341aa0", "--", "site/mondai"], { cwd: root, encoding: "utf8" }).trim();
  if (d) fail("site/mondai changed since 6341aa0: " + d);
  console.log("COPY_UNCHANGED_OK");
} else if (mode === "dashes") {
  const files = ["framework-page.md", "framework-page-GATES.md", "framework-page-check.js", "framework-page-gates.mjs", "framework-carry-gates.mjs",
    "cs2-falling-behind-final/style_guide.md", "cs2-falling-behind-final/state_list.md", "cs2-falling-behind-final/review_log.md",
    "../../site/dev/preview/fb-carry.js", "../../site/dev/preview/fb-carry.css"];
  const bad = files.filter((f) => /[\u2013\u2014]| -{2} /.test(readFileSync(path.join(root, "docs/motion", f), "utf8")));
  if (bad.length) fail("dash in " + bad.join(", "));
  console.log("NO_DASHES_OK " + files.length);
} else if (mode === "browser") {
  const { chromium } = await import(path.join(root, "node_modules/playwright/index.mjs"));
  const check = readFileSync(path.join(root, "docs/motion/framework-page-check.js"), "utf8");
  const port = 4390 + Math.floor((Date.now() / 1000) % 50);
  const server = spawn(process.execPath, ["scripts/serve.mjs", "site", "studio"], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
  const stop = () => { try { server.kill(); } catch {} };
  try {
    for (let i = 0; i < 50; i++) { try { await fetch(`http://127.0.0.1:${port}/`); break; } catch { await new Promise((r) => setTimeout(r, 100)); } }
    const browser = await chromium.launch();
    const runs = [[1440, 900, false], [768, 1024, false], [390, 844, false], [1440, 900, true], [390, 844, true]];
    const problems = [];
    for (const [w, h, reduced] of runs) {
      const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: reduced ? "reduce" : "no-preference" });
      const errors = [], bad = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("response", (r) => { if (r.status() >= 400 && !/geist|4321|__studio/.test(r.url())) bad.push(r.status() + " " + r.url()); });
      page.on("requestfailed", (r) => { if (!/geist|4321|__studio/.test(r.url())) bad.push("failed " + r.url()); });
      await page.goto(`http://127.0.0.1:${port}/mondai/framework/`, { waitUntil: "load" });
      await page.waitForTimeout(800);
      const r = await page.evaluate(check);
      const tag = `${w}${reduced ? " reduced" : ""}`;
      if (errors.length) problems.push(`${tag}: page errors ${errors.join("; ")}`);
      if (bad.length) problems.push(`${tag}: site requests failed ${bad.join("; ")}`);
      if (r.notFinal.length) problems.push(`${tag}: not final ${r.notFinal.length}`);
      if (!reduced) {
        if (!r.lenis) problems.push(`${tag}: Lenis not running`);
        if (r.belowFold === 0 || r.startHidden !== r.belowFold) problems.push(`${tag}: below fold hidden ${r.startHidden} of ${r.belowFold}`);
        if (r.timingDiffs.length) problems.push(`${tag}: timing ${r.timingDiffs.join(", ")}`);
      } else {
        if (!r.mmOff || r.lenis || r.hiddenAtLoad !== 0) problems.push(`${tag}: reduced motion not final at load (mmOff ${r.mmOff}, lenis ${r.lenis}, hidden ${r.hiddenAtLoad})`);
      }
      console.log(`${tag}: items ${r.items}, hidden below fold ${r.startHidden}/${r.belowFold}, not final ${r.notFinal.length}, lenis ${r.lenis}`);
      await page.close();
    }
    await browser.close();
    if (problems.length) fail(problems.join(" | "));
    console.log("BROWSER_GATES_OK 5 runs");
  } finally { stop(); }
} else fail("mode must be browser, copy or dashes");
