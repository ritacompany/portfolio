// Gate for the Contact button tuner (site/motion-lab/contact-goo-tuner.html, published for him).
// Proves the page runs the shipped module byte for byte (site/js/contact-goo.js inlined, exports
// stripped), that every slider changes the live button, that Copy settings yields the constants
// line that replaces the GOO line in the module, at 1440 and 390 wide, reduced motion off and on,
// with no console errors. Prints TUNER_OK only when every assertion passed.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
const root = resolve(new URL("../..", import.meta.url).pathname);
const page = readFileSync(resolve(root, "site/motion-lab/contact-goo-tuner.html"), "utf8");
const mod = readFileSync(resolve(root, "site/js/contact-goo.js"), "utf8").replace(/export /g, "").replace("if (!window.__GOO_MANUAL__) startContactGoo();", "");
const problems = [];
if (!page.includes(mod.trim())) problems.push("the tuner does not inline the shipped module as it is now; rerun python3 scripts/motion-tuner/contact-goo.py site/motion-lab/contact-goo-tuner.html");
const shippedLine = readFileSync(resolve(root, "site/js/contact-goo.js"), "utf8").match(/^export const GOO = .*;$/m)[0];
const { chromium } = createRequire(resolve(root, "package.json"))("playwright");
const b = await chromium.launch();
const url = "file://" + resolve(root, "site/motion-lab/contact-goo-tuner.html");
// What the button looks like after one scripted hover and press, as a string: filter values, icon transform at two moments, shape boxes.
async function signature(p) {
  await p.locator("#btn").scrollIntoViewIfNeeded(); await p.waitForTimeout(50);
  const bb = await p.locator("#btn").boundingBox();
  await p.mouse.move(5, 5); await p.waitForTimeout(700);
  await p.mouse.move(bb.x + bb.width * 0.7, bb.y + bb.height / 2, { steps: 3 });
  await p.waitForTimeout(150);
  const mid = await p.evaluate(() => getComputedStyle(document.querySelector("#btn .button__icon")).transform);
  await p.waitForTimeout(900);
  const end = await p.evaluate(() => getComputedStyle(document.querySelector("#btn .button__icon")).transform + " " + getComputedStyle(document.querySelector("#btn img")).transform);
  await p.mouse.down(); await p.waitForTimeout(80);
  const pressMid = await p.evaluate(() => document.querySelector("#btn .goo-shapes span:last-child").style.width);
  await p.waitForTimeout(500);
  const press = await p.evaluate(() => document.querySelector("#btn .goo-shapes span:last-child").style.width);
  await p.mouse.up(); await p.mouse.move(5, 5); await p.waitForTimeout(900);
  const filter = await p.evaluate(() => { const f = document.getElementById("goo-ring"); return [f.querySelector("feGaussianBlur").getAttribute("stdDeviation"), f.querySelector("feColorMatrix").getAttribute("values"), f.querySelector("feMorphology").getAttribute("radius")].join("|"); });
  return { mid, end, pressMid, press, filter };
}
for (const [width, reduced] of [[1440, false], [390, false], [1440, true], [390, true]]) {
  const tag = `${width}${reduced ? " reduced" : ""}`;
  const ctx = await b.newContext({ viewport: { width, height: 900 }, reducedMotion: reduced ? "reduce" : "no-preference", permissions: ["clipboard-read", "clipboard-write"] });
  const p = await ctx.newPage(); const errs = [];
  p.on("console", (m) => m.type() === "error" && errs.push(m.text())); p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(400);
  await p.evaluate(() => { try { localStorage.clear(); } catch {} });
  await p.click("#reset"); await p.waitForTimeout(100);
  const ok = await p.evaluate(() => document.querySelector("#btn").classList.contains("is-goo") && !!document.getElementById("goo-ring") && !!window.GOO);
  if (!ok) { problems.push(`${tag}: the button is not gooey or GOO is not exposed`); await ctx.close(); continue; }
  const over = await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (over) problems.push(`${tag}: the page scrolls sideways`);
  if (reduced) {
    // Reduced motion: the page states it still runs, so the effect must be live here too.
    await p.locator("#btn").scrollIntoViewIfNeeded(); await p.waitForTimeout(50);
    const bb = await p.locator("#btn").boundingBox(); await p.mouse.move(bb.x + bb.width * 0.7, bb.y + bb.height / 2, { steps: 3 }); await p.waitForTimeout(800);
    const x = await p.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector("#btn .button__icon")).transform).m41);
    if (x > -10) problems.push(`${tag}: the tuner button did not react to hover (${x.toFixed(1)} px)`);
    if (errs.length) problems.push(`${tag}: console errors: ${errs.join("; ")}`);
    await ctx.close(); continue;
  }
  // Copy settings at shipped values must equal the module's GOO line.
  await p.click("#copy"); await p.waitForTimeout(200);
  const dump = (await p.locator("#dump").textContent()).trim();
  if (dump !== shippedLine) problems.push(`${tag}: Copy settings line differs from the shipped line:\n  ${dump}\n  ${shippedLine}`);
  const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  if (clip && clip.trim() !== shippedLine) problems.push(`${tag}: clipboard text differs from the dump`);
  if (width === 1440) {
    // Every slider changes the live button: move it to the far end, run the scripted hover and press, compare.
    const base = await signature(p);
    const keys = await p.evaluate(() => [...document.querySelectorAll("input[type=range]")].map((i) => i.id.slice(2)));
    const expected = Object.keys(JSON.parse(shippedLine.replace(/^export const GOO = /, "").replace(/;$/, "").replace(/(\w+):/g, '"$1":')));
    for (const k of expected) if (!keys.includes(k)) problems.push(`no slider for ${k}`);
    for (const k of keys) {
      await p.click("#reset"); await p.waitForTimeout(50);
      const before = await p.evaluate((k) => window.GOO[k], k);
      const moved = await p.evaluate((k) => { const i = document.getElementById("s-" + k); const cur = +i.value, mn = +i.min, mx = +i.max; i.value = String(Math.abs(cur - mn) > Math.abs(mx - cur) ? mn : mx); i.dispatchEvent(new Event("input", { bubbles: true })); return +i.value; }, k);
      const after = await p.evaluate((k) => window.GOO[k], k);
      if (after === before || after !== moved) { problems.push(`${tag}: slider ${k} did not change GOO (${before} to ${after}, slider ${moved})`); continue; }
      const sig = await signature(p);
      if (JSON.stringify(sig) === JSON.stringify(base)) problems.push(`${tag}: slider ${k} changed nothing visible (${before} to ${after})`);
      const text = (await p.locator("#dump").textContent()).trim();
      if (!text.includes(`${k}: ${after}`)) problems.push(`${tag}: settings line does not carry ${k}: ${after}`);
    }
    await p.click("#reset"); await p.waitForTimeout(50);
    const back = (await p.locator("#dump").textContent()).trim();
    if (back !== shippedLine) problems.push(`${tag}: Reset to shipped did not restore the shipped line`);
  }
  if (errs.length) problems.push(`${tag}: console errors: ${errs.join("; ")}`);
  await ctx.close();
}
await b.close();
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("TUNER_OK 1440 and 390, reduced motion off and on, every slider live");
