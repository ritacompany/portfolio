// His audit of the framework page, 11 Nov: checks for the fixes built in this round.
// node docs/motion/framework-audit-gates.mjs   (from the repository root; serves site/ the normal way)
import { chromium } from "../../node_modules/playwright/index.mjs";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const problems = [], ok = (c, m) => { if (!c) problems.push(m); };
const html = readFileSync(path.join(root, "site/mondai/framework/index.html"), "utf8");
ok(!/Sources:/.test(html), "a sources line is still on the page");
ok(/data-figma-node="5812:20346"[^>]*>\s*<img src="\/assets\/framework\/rollover-icon@2x\.png"[^>]*>The Rollover effect</.test(html), "the Rollover effect is not live text with its icon");

const port = 4480 + Math.floor((Date.now() / 1000) % 15);
const server = spawn(process.execPath, ["scripts/serve.mjs", "site"], { cwd: root, env: { ...process.env, PORT: String(port) }, stdio: "ignore" });
try {
  for (let i = 0; i < 50; i++) { try { await fetch(`http://127.0.0.1:${port}/`); break; } catch { await new Promise((r) => setTimeout(r, 100)); } }
  const browser = await chromium.launch();
  const url = `http://127.0.0.1:${port}/mondai/framework/`;
  const q = (id) => `[data-figma-node="${id}"]`;

  // Layout, at rest (reduced motion)
  for (const w of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    const m = await page.evaluate((ids) => {
      const g = (id) => document.querySelector(`[data-figma-node="${id}"]`);
      const box = (e) => e.getBoundingClientRect();
      const line = g(ids.sched), lh = parseFloat(getComputedStyle(line).lineHeight);
      const eff = g(ids.effect), icon = eff.querySelector("img"), text = document.createRange(); text.selectNodeContents(eff.lastChild);
      const ib = box(icon), tb = text.getBoundingClientRect();
      const rule = g(ids.vrule), body = g(ids.body);
      const a = document.querySelector(".ending-bar__prev"), n = document.querySelector(".ending-bar__next");
      const cs = getComputedStyle(a);
      return { lines: Math.round(box(line).height / lh), iconW: +ib.width.toFixed(1), iconH: +ib.height.toFixed(1),
        iconOff: +Math.abs((ib.top + ib.bottom) / 2 - (tb.top + tb.bottom) / 2).toFixed(1), effShown: eff.getClientRects().length > 0,
        ruleShown: rule.getClientRects().length > 0, ruleBelow: rule.getClientRects().length ? Math.round(box(rule).bottom - box(body).bottom) : null,
        padL: cs.paddingLeft, padR: cs.paddingRight, chevronBg: getComputedStyle(a.querySelector("img")).backgroundColor,
        nextBg: getComputedStyle(n.querySelector("img")).backgroundColor };
    }, { sched: "5812:17150", effect: "5812:20346", vrule: "5812:20343", body: "5812:20350" });
    if (w === 1440) ok(m.lines === 1, `1440: the schedule line takes ${m.lines} lines`);
    if (w === 390) ok(m.lines > 1, `390: the schedule line does not wrap (${m.lines})`);
    ok(m.effShown, `${w}: the Rollover effect subhead is hidden`);
    ok(Math.abs(m.iconW - 14.6) < 0.2 && Math.abs(m.iconH - 16.1) < 0.2, `${w}: icon ${m.iconW} by ${m.iconH}, not 25 percent smaller`);
    ok(m.iconOff <= 1, `${w}: icon centre ${m.iconOff} px off the text centre`);
    if (m.ruleShown) ok(m.ruleBelow >= 8 && m.ruleBelow <= 24, `${w}: the line ends ${m.ruleBelow} px past the text`);
    ok(m.padL === m.padR, `${w}: ending bar link padding ${m.padL} and ${m.padR}`);
    ok(/rgba\(0, 0, 0, 0\)|transparent/.test(m.chevronBg) && /rgba\(0, 0, 0, 0\)|transparent/.test(m.nextBg), `${w}: chevron still has a background`);
    console.log(`${w}: schedule ${m.lines} line(s), icon ${m.iconW}x${m.iconH} off ${m.iconOff}, line past text ${m.ruleBelow}, bar padding ${m.padL}/${m.padR}`);
    await page.close();
  }

  // Ending bar hover: the chevron turns light with the text
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.locator(".ending-bar__prev").scrollIntoViewIfNeeded();
    await page.locator(".ending-bar__prev").hover();
    const f = await page.evaluate(() => getComputedStyle(document.querySelector(".ending-bar__prev img")).filter);
    ok(/invert\(1\)/.test(f), `hover: chevron filter ${f}`);
    await page.close();
  }

  // Scroll linked moves, with motion on and with reduced motion
  for (const [w, reduced] of [[1440, false], [390, false], [1440, true]]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: reduced ? "reduce" : "no-preference" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url, { waitUntil: "networkidle" });
    const read = async (id, off) => {
      await page.evaluate(({ id, off }) => {
        const e = document.querySelector(`[data-figma-node="${id}"]`), t = e.style.transform; e.style.transform = "none";
        const y = e.getBoundingClientRect().top + scrollY + off; e.style.transform = t;
        const l = window.__mm && window.__mm.lenis; if (l) l.scrollTo(y, { immediate: true }); else scrollTo(0, y);
      }, { id, off });
      await page.waitForTimeout(250);
      return page.evaluate((id) => { const e = document.querySelector(`[data-figma-node="${id}"]`); return { t: e.style.transform, op: getComputedStyle(e).opacity, vis: getComputedStyle(e).visibility, clip: getComputedStyle(e).clipPath }; }, id);
    };
    const tag = `${w}${reduced ? " reduced" : ""}`;
    const lap0 = await read("5812:16973", -700), lap1 = await read("5812:16973", 0), lap2 = await read("5812:16973", 700);
    const ty = (t) => { const m = /translate3d\([^,]+,\s*(-?[\d.]+)px/.exec(t || ""); return m ? +m[1] : 0; };
    const fbId = w < 1200 ? "5812:20314" : "5812:20311";
    const fb0 = await read(fbId, -800), fb1 = await read(fbId, 200);
    const tx = (t) => { const m = /translate3d\((-?[\d.]+)px/.exec(t || ""); return m ? +m[1] : 0; };
    if (!reduced) {
      ok(ty(lap0.t) > 0, `${tag}: the laptop is not below its place as it arrives (${lap0.t})`);
      ok(ty(lap1.t) === 0 || Math.abs(ty(lap1.t)) < 1, `${tag}: the laptop is not at its place mid read (${lap1.t})`);
      ok(ty(lap2.t) < -100, `${tag}: the laptop does not outrun the page past its screen (${lap2.t})`);
      ok(tx(fb0.t) < -100, `${tag}: the Rollover panel is not off to the left before it arrives (${fb0.t})`);
      ok(tx(fb1.t) === 0, `${tag}: the Rollover panel is not in place once arrived (${fb1.t})`);
    } else {
      ok(!lap0.t && !lap2.t && !fb0.t, `${tag}: something moves with reduced motion`);
    }
    for (const [n, s] of [["laptop", lap1], ["panel", fb1]]) ok(s.op === "1" && s.vis === "visible" && s.clip === "none", `${tag}: ${n} hidden (${s.op} ${s.vis} ${s.clip})`);
    ok(!errors.length, `${tag}: ${errors.join("; ")}`);
    console.log(`${tag}: laptop ${ty(lap0.t)} / ${ty(lap1.t)} / ${ty(lap2.t)}, panel ${tx(fb0.t)} / ${tx(fb1.t)}`);
    await page.close();
  }
  await browser.close();
} finally { server.kill(); }
if (problems.length) { console.error("FAIL " + problems.join(" | ")); process.exit(1); }
console.log("AUDIT_FIXES_OK");
