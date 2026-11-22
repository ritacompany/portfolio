// Gates for the live review build (BUILD_GATES.md). Run from the portfolio repo root:
//   node reports/live-review/check-build.mjs <bridge|dock|nodock|width|plain|doc|scope>
// Starts its own studio on 4330 with a bridge on 4331, so a studio on 4320 keeps running. Starting a
// bridge empties Flare's shared temp inbox, so run this outside a review.
import { spawn, execSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const SITE = resolve("../portfolio-site");
const gate = process.argv[2];
const fail = [];
const ok = (c, m) => { if (!c) fail.push(m); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const procs = [];
process.on("exit", () => { for (const p of procs) p.kill(); });
process.on("unhandledRejection", (e) => { fail.push("error: " + (e && e.message)); finish(); });
function finish() {
  for (const p of procs) p.kill();
  if (fail.length) { console.log("FAIL\n" + fail.join("\n")); process.exit(1); }
  console.log(`BUILD_OK ${gate}`);
  process.exit(0);
}

async function server(mode, port, bridgePort) {
  const p = spawn(process.execPath, ["scripts/serve.mjs", "site", mode].filter(Boolean), {
    cwd: SITE, env: { ...process.env, PORT: String(port), FLARE_BRIDGE_PORT: String(bridgePort || 4331) }, stdio: ["ignore", "pipe", "pipe"],
  });
  procs.push(p);
  let out = "";
  p.stdout.on("data", (d) => (out += d));
  p.stderr.on("data", (d) => (out += d));
  for (let i = 0; i < 50 && !out.includes("site at"); i++) await wait(100);
  return { p, log: () => out };
}

const require = createRequire(join(SITE, "package.json"));
const { chromium } = require("playwright");

async function page(browser, w, h, url) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const pg = await ctx.newPage();
  await pg.goto(url, { waitUntil: "load" });
  await pg.waitForFunction(() => { const h = document.getElementById("flare-host"); return h && h.shadowRoot && h.shadowRoot.querySelector(".f-shell, .f-shell-tab"); }, null, { timeout: 8000 });
  await wait(300);
  // A fresh browser starts with Flare minimized to its tab; open it.
  await pg.evaluate(() => { const t = document.getElementById("flare-host").shadowRoot.querySelector(".f-shell-tab"); if (t) t.click(); });
  await wait(600);
  return pg;
}
const state = (pg) => pg.evaluate(() => {
  const r = document.getElementById("flare-host").shadowRoot;
  const s = r.querySelector(".f-shell");
  const nav = document.querySelector(".site-nav");
  return {
    iw: innerWidth, ih: innerHeight,
    main: document.querySelector("main").getBoundingClientRect().right,
    nav: nav ? nav.getBoundingClientRect().right : null,
    shell: s ? s.getBoundingClientRect().toJSON() : null,
    tab: !!r.querySelector(".f-shell-tab"),
  };
});
const click = (pg, name) => pg.evaluate((n) => {
  const r = document.getElementById("flare-host").shadowRoot;
  const b = [...r.querySelectorAll("button")].find((x) => (x.getAttribute("aria-label") || x.title || x.textContent.trim()) === n);
  if (!b) throw new Error("no button " + n);
  b.click();
}, name);

function inbox(origin) {
  const dir = join(tmpdir(), "flare-dev");
  if (!existsSync(dir)) return [];
  const slug = origin.replace(/^https?:\/\//, "").replace(/\./g, "-").replace(/:/g, "-").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const box = readdirSync(dir).find((d) => d.startsWith(slug + "-") && !d.endsWith("-outbox"));
  if (!box) return [];
  return readdirSync(join(dir, box)).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(readFileSync(join(dir, box, f), "utf8")));
}

const URL0 = "http://127.0.0.1:4330/haven/";

if (gate === "bridge") {
  const s = await server("studio", 4330, 4331);
  await wait(800);
  let health = null;
  try { health = await (await fetch("http://127.0.0.1:4331/health")).json(); } catch (e) {}
  ok(health && health.ok, "bridge did not answer /health on 4331: " + s.log());
  const browser = await chromium.launch();
  const pg = await page(browser, 1440, 900, URL0);
  await click(pg, "Canvas mode"); await wait(1000);
  const comment = await pg.evaluate(() => { const b = [...document.getElementById("flare-host").shadowRoot.querySelectorAll("button")].find((x) => x.title === "Comment tool" || x.title === "Bridge required"); return b ? b.title + (b.disabled ? " off" : " on") : "none"; });
  ok(comment === "Comment tool on", "Flare comment tool: " + comment);
  await browser.close();
  finish();
} else if (gate === "dock") {
  await server("studio", 4330, 4331);
  const browser = await chromium.launch();
  const pg = await page(browser, 1440, 900, URL0);
  const s = await state(pg);
  ok(s.shell && Math.round(s.shell.right) === 1440 && Math.round(s.shell.top) === 0 && Math.round(s.shell.height) === 900, "panel not full height on the right: " + JSON.stringify(s.shell));
  if (!s.shell) { fail.push("panel not open"); finish(); }
  ok(s.shell && Math.round(s.main) <= Math.round(s.shell.left), `main ends at ${s.main}, panel starts at ${s.shell && s.shell.left}`);
  ok(s.nav !== null && Math.round(s.nav) <= Math.round(s.shell.left), `nav ends at ${s.nav}`);
  ok(s.shell && s.shell.left >= 1024, "page under 1024: " + (s.shell && s.shell.left));
  await browser.close();
  finish();
} else if (gate === "nodock") {
  await server("studio", 4330, 4331);
  const browser = await chromium.launch();
  for (const [w, h] of [[1024, 768], [800, 1024]]) {
    const pg = await page(browser, w, h, URL0);
    const s = await state(pg);
    ok(Math.round(s.main) === w, `${w}: main ends at ${s.main}, page squeezed`);
    ok(s.nav === null || Math.round(s.nav) === w, `${w}: nav ends at ${s.nav}`);
    await pg.context().close();
  }
  const pg = await page(browser, 1440, 900, URL0);
  await click(pg, "Minimize"); await wait(500);
  const s = await state(pg);
  ok(s.tab && !s.shell, "minimize did not leave the tab");
  ok(Math.round(s.main) === 1440 && Math.round(s.nav) === 1440, `minimized: main ${s.main}, nav ${s.nav}`);
  await click(pg, "Open Flare"); await wait(500);
  const s2 = await state(pg);
  ok(s2.shell && Math.round(s2.main) <= Math.round(s2.shell.left), "reopened: not docked again");
  await browser.close();
  finish();
} else if (gate === "width") {
  await server("studio", 4330, 4331);
  await wait(800);
  const browser = await chromium.launch();
  const pg = await page(browser, 1440, 900, URL0);
  // A real Flare push: select the Haven title, type a margin, press Push to Agent.
  await click(pg, "Select Element"); await wait(200);
  await pg.mouse.click(200, 130); await wait(500);
  await pg.evaluate(() => { const r = document.getElementById("flare-host").shadowRoot; const sp = [...r.querySelectorAll("button")].find((x) => x.textContent.trim() === "Spacing"); if (sp && !r.querySelector(".f-value-input input")) sp.click(); });
  await wait(400);
  // Spacing shows padding T R B L, then margin T R B L; the seventh field is margin bottom. Typed for real.
  let typed = "ok";
  try {
    const field = pg.locator("#flare-host .f-value-input input").nth(6);
    await field.click(); await field.fill("24"); await field.press("Enter");
  } catch (e) { typed = e.message.split("\n")[0]; }
  const mb = await pg.evaluate(() => getComputedStyle(document.getElementById("haven-title")).marginBottom);
  ok(mb === "24px", "title margin bottom after typing: " + mb);
  ok(typed === "ok", "could not type a value: " + typed);
  await wait(400);
  const pushed = await pg.evaluate(() => { const all = [...document.getElementById("flare-host").shadowRoot.querySelectorAll("button")]; const b = all.find((x) => x.textContent.trim() === "Push to Agent"); if (!b) return "no Push to Agent; buttons: " + all.map((x) => x.textContent.trim()).filter(Boolean).slice(-8).join(", "); b.click(); return "ok"; });
  ok(pushed === "ok", pushed);
  await wait(800);
  let got = inbox("http://127.0.0.1:4330");
  const real = got.find((g) => g.snapshot.changes.some((c) => c.changes && c.changes.length));
  ok(real, "no real push landed");
  ok(real && real.snapshot.viewport && real.snapshot.viewport.mode === "page" && real.snapshot.viewport.width === 1440, "real push width: " + JSON.stringify(real && real.snapshot.viewport));
  // Canvas mode: the stamp must carry the frame's width.
  await click(pg, "Canvas mode"); await wait(1200);
  await pg.evaluate(async () => {
    const snap = { updatedAt: new Date().toISOString(), changes: [{ selector: "#haven-title", path: "#haven-title", textSnippet: "Haven CS", comment: "[CANVAS] check", changes: [] }] };
    await fetch(new URL("/api/agent/push", window.__FLARE_BRIDGE__.url), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ origin: location.origin, snapshot: snap }) });
  });
  await wait(400);
  got = inbox("http://127.0.0.1:4330");
  const canvas = got.find((g) => g.snapshot.changes.some((c) => /\[CANVAS\] check/.test(c.comment || "")));
  // Measured here, apart from the stamp: the canvas frame's own layout width.
  const frameW = await pg.frames().find((f) => f.url().includes("__flare_embed")).evaluate(() => innerWidth);
  ok(canvas && canvas.snapshot.viewport && canvas.snapshot.viewport.mode === "canvas" && canvas.snapshot.viewport.frameWidths[0] === frameW, `canvas push width (frame is ${frameW}): ` + JSON.stringify(canvas && canvas.snapshot.viewport));
  await browser.close();
  finish();
} else if (gate === "plain") {
  await server("", 4332);
  const html = await (await fetch("http://127.0.0.1:4332/haven/")).text();
  ok(!html.includes("__studio") && !html.includes("__FLARE_BRIDGE__"), "plain server injects studio scripts");
  const r = await fetch("http://127.0.0.1:4332/__studio/flare-dock.js");
  ok(r.status === 404, "plain server serves the studio script: " + r.status);
  let bridge = true;
  try { await fetch("http://127.0.0.1:4331/health"); } catch (e) { bridge = false; }
  ok(!bridge, "plain server started a bridge");
  finish();
} else if (gate === "doc") {
  const doc = readFileSync(join(SITE, "docs/EDITING_WORKFLOW.md"), "utf8");
  const part = doc.split(/^## Review mode/m)[1];
  ok(part, "no Review mode section");
  if (part) {
    const sec = part.split(/^## /m)[0];
    for (const [re, m] of [[/start review/i, "start phrase"], [/flare-dev\/dist\/cli\.js watch/, "watch command"], [/stop review/i, "stop phrase"], [/delete|remove/i, "clearing handled files"], [/proposals\.css/, "where changes go"], [/width/i, "width"]]) ok(re.test(sec), "review mode lacks " + m);
    const bad = new RegExp("[" + String.fromCharCode(0x2013, 0x2014) + "]|\\s--\\s");
    ok(!bad.test(sec), "dash in review mode section");
    ok(bad.test("a " + String.fromCharCode(0x2014) + " b"), "dash detector broken");
  }
  finish();
} else if (gate === "scope") {
  const own = ["scripts/serve.mjs", "scripts/studio/flare-dock.js", "docs/EDITING_WORKFLOW.md"];
  const changed = execSync("git log --format= --name-only --grep='^Live review' -n 5", { cwd: SITE, encoding: "utf8" }).split("\n").filter(Boolean);
  ok(changed.length, "no live review commit in portfolio-site");
  for (const f of changed) ok(own.includes(f), "commit touched " + f);
  finish();
} else { fail.push("unknown gate " + gate); finish(); }
