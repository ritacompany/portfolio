// Runs the framework page motion gates (framework-page-GATES.md) end to end.
// Usage, from the repository root: node docs/motion/framework-page-gates.mjs <browser|copy|dashes>
// browser [site|dist]: serves site/ (or builds and serves dist/) the normal way on a free port, loads /mondai/framework/ in headless Chromium at
//   1440, 768 and 390 with motion and with reduced motion, runs framework-page-check.js and asserts.
// copy: no change to the approved page markup against the commit before this round.
// dashes: no em or en dash in this round's docs.
import { readFileSync } from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const mode = process.argv[2], argv1 = process.argv[3];
const fail = (m) => { console.error("FAIL " + m); process.exit(1); };

if (mode === "copy") {
  // The words on both Mondai pages are the approved copy. Against 9fd175b (the motion going live), the
  // only change allowed is his audit cut of 11 Nov: the two sources lines on the framework page.
  const words = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").split(/\s+/).filter(Boolean).join(" ");
  const CUT = ["Sources: Harkin et al. 2016; Baker, Evans and Dee 2016", "Sources: Soman and Cheema 2004"];
  for (const f of ["site/mondai/framework/index.html", "site/mondai/index.html"]) {
    let before = words(execFileSync("git", ["show", "9fd175b:" + f], { cwd: root, encoding: "utf8" }));
    let now = words(readFileSync(path.join(root, f), "utf8"));
    // Added: the approved subhead "The Rollover effect" (final-copy.md, Rollover block), live text now
    // where it was a flattened image
    if (f.includes("framework")) { if (!now.includes("The Rollover effect")) fail("the Rollover effect subhead is missing"); now = now.replace("The Rollover effect", " ").split(/\s+/).filter(Boolean).join(" "); }
    if (f.includes("framework")) for (const c of CUT) { if (!before.includes(c)) fail("baseline lacks " + c); before = before.replace(c, " ").split(/\s+/).filter(Boolean).join(" "); }
    if (before !== now) { let i = 0; while (before[i] === now[i]) i++; fail(`${f} words differ at: ${now.slice(Math.max(0, i - 40), i + 60)}`); }
  }
  console.log("COPY_UNCHANGED_OK beyond the two cut sources lines and the subhead made live");
} else if (mode === "dashes") {
  const files = ["framework-page.md", "framework-page-GATES.md", "framework-page-check.js", "framework-page-gates.mjs", "framework-audit-gates.mjs", "../../site/js/mondai-motion.js", "../../site/css/mondai-motion.css"];
  const bad = files.filter((f) => /[\u2013\u2014]| -{2} /.test(readFileSync(path.join(root, "docs/motion", f), "utf8")));
  if (bad.length) fail("dash in " + bad.join(", "));
  console.log("NO_DASHES_OK " + files.length);
} else if (mode === "browser") {
  const { chromium } = await import(path.join(root, "node_modules/playwright/index.mjs"));
  const check = readFileSync(path.join(root, "docs/motion/framework-page-check.js"), "utf8");
  const port = 4390 + Math.floor((Date.now() / 1000) % 50);
  // Served the normal way, from site/ or from the built output in dist/ (npm run build:site), never studio
  const served = argv1 === "dist" ? "dist" : "site";
  if (served === "dist") execFileSync(process.execPath, ["scripts/build.mjs", "site"], { cwd: root, stdio: "ignore" });
  const server = spawn(process.execPath, ["scripts/serve.mjs", served], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
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
        if (r.lenisLerp !== 0.1) problems.push(`${tag}: Lenis lerp ${r.lenisLerp}, Haven's is 0.1`);
      } else {
        if (!r.mmOff || r.lenis || r.hiddenAtLoad !== 0) problems.push(`${tag}: reduced motion not final at load (mmOff ${r.mmOff}, lenis ${r.lenis}, hidden ${r.hiddenAtLoad})`);
      }
      console.log(`${tag}: items ${r.items}, hidden below fold ${r.startHidden}/${r.belowFold}, not final ${r.notFinal.length}, lenis ${r.lenis}`);
      await page.close();
    }
    // The collection page fits one screen: everything arrives on load, so after the entrances it is all in
    for (const [w, h, reduced] of [[1440, 900, false], [390, 844, false], [390, 844, true]]) {
      const tag = `collection ${w}${reduced ? " reduced" : ""}`;
      const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: reduced ? "reduce" : "no-preference" });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("response", (r) => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
      await page.goto(`http://127.0.0.1:${port}/mondai/`, { waitUntil: "load" });
      const early = await page.evaluate(() => [...document.querySelectorAll(".collection__brand, .collection__intro, .collection__label, .collection__rows > li")].filter((e) => +getComputedStyle(e).opacity < 0.99).length);
      await page.waitForTimeout(2800);
      const c = await page.evaluate(() => ({ n: document.querySelectorAll(".collection__brand, .collection__intro, .collection__label, .collection__rows > li").length,
        hidden: [...document.querySelectorAll(".collection__brand, .collection__intro, .collection__label, .collection__rows > li")].filter((e) => +getComputedStyle(e).opacity < 0.99).length,
        lerp: window.__mm && window.__mm.lenis ? window.__mm.lenis.options.lerp : null }));
      if (errors.length) problems.push(`${tag}: ${errors.join("; ")}`);
      if (!c.n || c.hidden) problems.push(`${tag}: ${c.hidden} of ${c.n} items not in`);
      if (!reduced && (early === 0 || c.lerp !== 0.1)) problems.push(`${tag}: no entrance (${early} hidden at load) or Lenis ${c.lerp}`);
      if (reduced && (early !== 0 || c.lerp !== null)) problems.push(`${tag}: reduced motion hid ${early} or ran Lenis`);
      console.log(`${tag}: items ${c.n}, hidden at load ${early}, after ${c.hidden}, lenis ${c.lerp}`);
      await page.close();
    }
    await browser.close();
    if (problems.length) fail(problems.join(" | "));
    console.log(`BROWSER_GATES_OK ${served} 5 runs`);
  } finally { stop(); }
} else if (mode === "suites") {
  // The site's own suites. verify-1440 must fail on nothing beyond the three failures already on fa3779d,
  // the commit before the motion moved into the site (home lede box, framework footer box, Haven body:
  // all from the Figma sync, none from motion); every verify-responsive mode must pass.
  const BASE = ["boxes home (verify-pages.mjs)", "boxes framework (verify-pages.mjs)", "body (verify-haven.mjs)"];
  let out = "";
  try { out = execFileSync(process.execPath, ["scripts/verify-1440.mjs"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); } catch (e) { out = String(e.stdout || ""); }
  const failed = [...out.matchAll(/^FAIL (.+)$/gm)].map((m) => m[1].trim());
  const extra = failed.filter((f) => !BASE.includes(f));
  if (extra.length) fail("verify-1440 new failures: " + extra.join(", "));
  for (const m of ["health", "fit", "overlap", "size"]) {
    const o = execFileSync(process.execPath, ["scripts/verify-responsive.mjs", m, "all"], { cwd: root, encoding: "utf8" });
    if (!new RegExp(`RESPONSIVE_${m.toUpperCase()}_OK`).test(o)) fail("verify-responsive " + m);
  }
  console.log(`SUITES_OK verify-1440 ${failed.length} known failures, 0 new; verify-responsive 4 modes`);
} else fail("mode must be browser, copy, dashes or suites");
