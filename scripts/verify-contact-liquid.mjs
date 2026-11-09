// Gates for the liquid Contact button mix (site/js/contact-liquid.js), docs/motion/contact-liquid/.
//   (no mode)  behaviour on the lab page through window.seek(t): crisp rest with no merged outline and no
//              hidden colour; a dent with the hidden colour when the pointer nears from outside; the
//              outline bulges toward a pointer inside; the edge stretches after a pointer leaves; the
//              circle pulls and tips; press squeezes; it returns to rest; seek is frame exact; no errors.
//   tuner      the tuner page: a control for every setting, presets, A and B, undo, paste import, slow
//              motion, zoom, debug view, demo replay, no sideways scroll at 390, no errors.
//   regress    site check passes and the other session's goo files are unchanged since 93a5512.
// Each mode prints its token only when every assertion passed.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";

const mode = process.argv[2] || "behaviour";
const repo = resolve(new URL("..", import.meta.url).pathname);
const problems = [];
const done = (token) => { if (problems.length) { console.error(problems.join("\n")); process.exit(1); } console.log(token); };

if (mode === "regress") {
  execFileSync("npm", ["run", "check"], { cwd: repo, stdio: "inherit" });
  const owned = ["site/js/contact-goo.js", "scripts/motion-tuner/contact-goo.py", "scripts/verify-contact-goo.mjs", "docs/motion/contact-button"];
  const diff = execFileSync("git", ["diff", "--name-only", "93a5512", "HEAD", "--", ...owned], { cwd: repo, encoding: "utf8" })
    + execFileSync("git", ["diff", "--name-only", "--", ...owned], { cwd: repo, encoding: "utf8" });
  if (diff.trim()) problems.push(`other session's files changed:\n${diff}`);
  done("REGRESS_OK");
  process.exit(0);
}

const root = join(repo, "site");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png" };
const srv = createServer((q, r) => { let p = resolve(join(root, decodeURIComponent(new URL(q.url, "http://x").pathname))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); if (!p.startsWith(root)) throw 0; r.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { r.writeHead(404).end(); } });
await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${srv.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
const errs = [];
const watch = (p) => { p.on("console", (m) => m.type() === "error" && errs.push(m.text())); p.on("pageerror", (e) => errs.push(String(e))); };

// Counts pixels of the hidden colour (cyan family) around the button.
const cyanCount = async (p, sel) => {
  const png = await p.locator(sel).screenshot();
  return p.evaluate(async (data) => {
    const i = new Image(); i.src = "data:image/png;base64," + data; await i.decode();
    const c = new OffscreenCanvas(i.width, i.height), x = c.getContext("2d"); x.drawImage(i, 0, 0);
    const d = x.getImageData(0, 0, i.width, i.height).data; let n = 0;
    for (let k = 0; k < d.length; k += 4) if (d[k] < 120 && d[k + 1] > 150 && d[k + 2] > 170) n++;
    return n;
  }, png.toString("base64"));
};

try {
  if (mode === "behaviour") {
    const p = await b.newPage({ viewport: { width: 900, height: 600 } }); watch(p);
    await p.goto(base + "/motion-lab/contact-liquid.html?seek=1", { waitUntil: "networkidle" });
    await p.waitForFunction(() => window.__liquidReady && window.liquidUnit);
    const at = (t) => p.evaluate((t) => {
      window.seek(t); const u = window.liquidUnit, R = u.rings(), st = u.state;
      let out = 0, mag = 0, dent = 0;
      for (const r of R) for (const q of r.P) { out = Math.max(out, q.ox * q.nx + q.oy * q.ny); mag = Math.max(mag, Math.hypot(q.ox, q.oy)); dent = Math.max(dent, q.d); }
      const line = document.querySelector(".liquid-line"), sep = document.querySelector(".liquid-line-sep");
      return { out, mag, dent, g: st.g, q: st.q, h: st.h, caught: R.some((r) => r.caught), lineOp: +line.getAttribute("opacity"), sepOp: +sep.getAttribute("opacity"),
        blur: +document.querySelector("filter feGaussianBlur").getAttribute("stdDeviation"), tilt: document.querySelector(".button__icon img").style.transform,
        d: [...document.querySelectorAll(".liquid-line path")].map((x) => x.getAttribute("d")).join("") };
    }, t);
    const rest = await at(0);
    if (rest.lineOp !== 0 || rest.sepOp !== 1 || rest.blur !== 0) problems.push(`rest is not crisp and separate: ${JSON.stringify({ l: rest.lineOp, s: rest.sepOp, b: rest.blur })}`);
    if ((await cyanCount(p, "#host")) !== 0) problems.push("hidden colour shows at rest");
    const near = await at(0.95);
    if (near.dent < 6) problems.push(`dent only ${near.dent.toFixed(1)} px with the pointer just outside`);
    const cy = await cyanCount(p, "#host"); if (cy < 40) problems.push(`hidden colour only ${cy} px in the dent`);
    const inside = await at(2.0);
    if (inside.out < 4) problems.push(`outline bulge only ${inside.out.toFixed(1)} px with the pointer inside`);
    if (Math.abs(inside.g) < 20) problems.push(`circle pulled only ${inside.g.toFixed(1)} px while hovered`);
    if (!/rotate\((?!0\.00deg)/.test(inside.tilt)) problems.push(`icon did not tip: ${inside.tilt}`);
    const exit = await at(3.35);
    if (!exit.caught || exit.mag < 8) problems.push(`edge did not stretch after the pointer left: caught ${exit.caught}, ${exit.mag.toFixed(1)} px`);
    const press = await at(6.1);
    if (press.q < 3) problems.push(`press squeeze only ${press.q.toFixed(1)} px`);
    const back = await at(8.98);
    if (back.mag > 1 || Math.abs(back.g) > 1 || back.dent > 1 || back.sepOp !== 1) problems.push(`did not return to rest: ${JSON.stringify({ mag: back.mag, g: back.g, dent: back.dent, sep: back.sepOp })}`);
    const a = await at(4.2), a2 = await at(4.2);
    if (a.d !== a2.d) problems.push("seek(4.2) gave two different frames");
    if (errs.length) problems.push(`console errors: ${errs.join("; ")}`);
    done("LIQUID_OK");
  }

  if (mode === "tuner") {
    for (const [w, h] of [[1440, 1000], [390, 844]]) {
      const p = await b.newPage({ viewport: { width: w, height: h } }); watch(p);
      await p.goto("file://" + join(repo, "site/motion-lab/contact-liquid-tuner.html"));
      await p.waitForFunction(() => window.__tuner && window.__tuner.ready, null, { timeout: 10000 });
      const r = await p.evaluate(async () => {
        const T = window.__tuner, out = {};
        out.missing = Object.keys(T.DEFAULTS).filter((k) => !document.querySelector(`[data-key="${k}"]`));
        // A control changes the engine value.
        const el = document.querySelector('[data-key="pull"] input[type=range]'); el.value = 50; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true }));
        out.pull = T.CFG.pull;
        // Undo restores it.
        document.getElementById("undo").click(); out.undo = T.CFG.pull;
        // Presets change values.
        const sel = document.getElementById("preset"); sel.value = sel.options[sel.options.length - 1].value; sel.dispatchEvent(new Event("change", { bubbles: true }));
        out.presetChanged = JSON.stringify(T.CFG) !== JSON.stringify(T.DEFAULTS);
        // A and B: save A, change, save B, recall A.
        document.getElementById("reset-all").click();
        document.getElementById("save-a").click(); T.set("bulge", 2); document.getElementById("save-b").click(); document.getElementById("show-a").click();
        out.ab = T.CFG.bulge === T.DEFAULTS.bulge; document.getElementById("show-b").click(); out.ab = out.ab && T.CFG.bulge === 2;
        // Paste import.
        T.importText(JSON.stringify({ tilt: 33 })); out.paste = T.CFG.tilt === 33;
        // Speed, zoom, debug, demo.
        document.querySelector('#speed [data-v="0.25"]').click(); out.speed = T.speed() === 0.25;
        document.querySelector('#zoom [data-v="2"]').click(); out.zoom = document.getElementById("stage").classList.contains("is-zoom");
        document.getElementById("debug").click(); out.debug = T.debug();
        document.getElementById("demo").click(); await new Promise((ok) => setTimeout(ok, 1500)); out.demo = T.demoOn() && !!document.querySelector(".liquid-debug circle");
        out.hscroll = document.documentElement.scrollWidth - innerWidth;
        return out;
      });
      if (r.missing.length) problems.push(`${w}: no control for ${r.missing.join(", ")}`);
      if (r.pull !== 50) problems.push(`${w}: slider did not set pull (${r.pull})`);
      if (r.undo !== 32) problems.push(`${w}: undo gave pull ${r.undo}`);
      for (const k of ["presetChanged", "ab", "paste", "speed", "zoom", "debug", "demo"]) if (!r[k]) problems.push(`${w}: ${k} failed`);
      if (r.hscroll > 0) problems.push(`${w}: sideways scroll ${r.hscroll}px`);
      await p.close();
    }
    if (errs.length) problems.push(`console errors: ${errs.join("; ")}`);
    done("TUNER_OK");
  }
} finally { await b.close(); srv.close(); }
