// Falling behind carry on the framework page: browser checks (framework-page-GATES.md, carry gates).
// node docs/motion/framework-carry-gates.mjs [shots-dir]
// Starts the studio server, loads /mondai/framework/ in headless Chromium at 1440, 768 and 390 with
// motion and with reduced motion, scrolls to the Falling behind block and asserts:
//   the carry frame exists, has the scene's ratio, sits inside its section and overlaps no text;
//   the static Rollover panel and card are hidden; the scene's canvas has drawn;
//   motion: the curtain opens and the loop advances while on screen;
//   reduced: no curtain, the scene holds the still at STILL_T and does not move.
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const shots = process.argv[2] || null;
const { chromium } = await import(path.join(root, "node_modules/playwright/index.mjs"));
const port = 4440 + Math.floor((Date.now() / 1000) % 50);
const server = spawn(process.execPath, ["scripts/serve.mjs", "site", "studio"], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
const problems = [];
try {
  for (let i = 0; i < 50; i++) { try { await fetch(`http://127.0.0.1:${port}/`); break; } catch { await new Promise((r) => setTimeout(r, 100)); } }
  const browser = await chromium.launch();
  for (const [w, h, reduced] of [[1440, 900, false], [768, 1024, false], [390, 844, false], [1440, 900, true], [390, 844, true]]) {
    const tag = `${w}${reduced ? " reduced" : ""}`;
    const page = await browser.newPage({ viewport: { width: w, height: h }, reducedMotion: reduced ? "reduce" : "no-preference" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => { if (r.status() >= 400 && !/geist|4321|__studio/.test(r.url())) errors.push(r.status() + " " + r.url()); });
    await page.goto(`http://127.0.0.1:${port}/mondai/framework/`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__fbCarry, null, { timeout: 15000 }).catch(() => problems.push(`${tag}: scene never mounted`));
    // Scroll the frame to the middle of the screen, the way a reader arrives at it
    // Lazy screens above it load and push it down, so aim again until it stays put
    await page.evaluate(async () => {
      const f = document.querySelector(".fb-carry"); if (!f) return;
      const l = window.__mm && window.__mm.lenis;
      for (let i = 0; i < 8; i++) {
        const r = f.getBoundingClientRect(), off = r.top - (innerHeight - r.height) / 2;
        if (i > 1 && Math.abs(off) < 4) break;
        if (l) { l.resize(); l.scrollTo(scrollY + off, { immediate: true }); } else scrollTo(0, scrollY + off);
        await new Promise((res) => setTimeout(res, 300));
      }
    });
    await page.waitForTimeout(2600);
    const r = await page.evaluate(() => {
      const f = document.querySelector(".fb-carry"), sec = f && f.closest("section");
      if (!f) return { missing: true };
      const fr = f.getBoundingClientRect(), sr = sec.getBoundingClientRect();
      const texts = [...sec.querySelectorAll(":scope > .t")].filter((e) => e.getClientRects().length);
      const overlaps = texts.filter((e) => { const b = e.getBoundingClientRect(); return b.left < fr.right && b.right > fr.left && b.top < fr.bottom && b.bottom > fr.top; }).map((e) => e.dataset.figmaNode);
      const replaced = ["5812:20311", "5812:20316"].map((n) => sec.querySelector(`[data-figma-node="${n}"]`)).filter((e) => e && getComputedStyle(e).display !== "none").length;
      const c = f.querySelector("canvas"), ctx = c && c.getContext("2d");
      let lit = 0;
      if (ctx && c.width) { const d = ctx.getImageData(0, 0, c.width, c.height).data; for (let i = 0; i < d.length; i += 4) if (d[i] > 60) lit++; }
      const cs = getComputedStyle(f);
      return { ratio: +(fr.width / fr.height).toFixed(3), width: Math.round(fr.width), inside: fr.top >= sr.top - 1 && fr.bottom <= sr.bottom + 1 && fr.left >= sr.left - 1 && fr.right <= sr.right + 1,
        overlaps, replaced, lit, clip: cs.clipPath, opacity: +cs.opacity, labels: f.querySelectorAll(".fb-label").length };
    });
    const t1 = await page.evaluate(() => window.__fbCarry && window.__fbCarry.scene.time);
    await page.waitForTimeout(700);
    const t2 = await page.evaluate(() => window.__fbCarry && window.__fbCarry.scene.time);
    if (shots) await page.locator(".fb-carry").screenshot({ path: `${shots}/carry-${w}${reduced ? "-reduced" : ""}.png` }).catch(() => {});
    if (shots && !reduced) await page.screenshot({ path: `${shots}/carry-page-${w}.png` });
    if (r.missing) problems.push(`${tag}: no frame`);
    else {
      if (Math.abs(r.ratio - 720 / 680) > 0.02) problems.push(`${tag}: ratio ${r.ratio}`);
      if (!r.inside) problems.push(`${tag}: frame outside its section`);
      if (r.overlaps.length) problems.push(`${tag}: frame overlaps text ${r.overlaps.join(", ")}`);
      if (r.replaced) problems.push(`${tag}: static Rollover panel still shown`);
      if (r.lit < 50) problems.push(`${tag}: canvas not drawn (${r.lit} lit pixels)`);
      if (r.labels !== 2) problems.push(`${tag}: week labels ${r.labels}`);
      if (r.clip !== "none" || r.opacity < 0.99) problems.push(`${tag}: frame not open (clip ${r.clip}, opacity ${r.opacity})`);
      if (!reduced && !(t2 > t1)) problems.push(`${tag}: loop not advancing (${t1} then ${t2})`);
      if (reduced && !(t1 === 5.5 && t2 === 5.5)) problems.push(`${tag}: reduced motion not holding the still (${t1}, ${t2})`);
    }
    if (errors.length) problems.push(`${tag}: ${errors.join("; ")}`);
    console.log(`${tag}: width ${r.width}, ratio ${r.ratio}, overlaps ${r.overlaps ? r.overlaps.length : "?"}, time ${t1} then ${t2}`);
    await page.close();
  }
  await browser.close();
} finally { server.kill(); }
if (problems.length) { console.error("FAIL " + problems.join(" | ")); process.exit(1); }
console.log("CARRY_GATES_OK 5 runs");
