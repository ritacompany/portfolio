// Round 2 fixes (21 Nov) gates. Usage: node reports/fw-fixes-round2-2026-11-21/check.mjs <gate> [port]
// Needs the site served on the port (default 4318: PORT=4318 node scripts/serve.mjs) for images, gap and popover.
// Prints <GATE>_OK and exits 0 only when every assertion passes; prints each failure otherwise.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdtempSync, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { join, extname, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const { chromium } = createRequire(join(root, "package.json"))("playwright");
const [gate = "", port = "4318"] = process.argv.slice(2);
const site = `http://localhost:${port}`;
const fails = [];
const WIDTHS = [390, 768, 1024, 1159, 1160, 1200, 1440];
const IMAGES = { "Target and pace rail": "5812:20260", "Calendar setup": "5812:17138" };

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".png": "image/png",
  ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
// Serves dir under /sub/ only, so any root path (/assets/...) 404s, as on the artifact host.
function serveUnder(dir) {
  return new Promise((res) => {
    const s = createServer((q, r) => {
      const u = decodeURIComponent(q.url.split("?")[0]);
      if (!u.startsWith("/sub/")) { r.writeHead(404); return r.end(); }
      const f = join(dir, u.slice(5) || "index.html");
      if (!existsSync(f) || statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
      r.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" }); r.end(readFileSync(f));
    });
    s.listen(0, () => res(s));
  });
}
function buildPreview(cssOverride, ref = "origin/claude/review-preview-standard") {
  const work = mkdtempSync(join(tmpdir(), "fwr2-"));
  const builder = join(work, "build.mjs"), out = join(work, "out");
  // The standard builder from its branch, run against this checkout's site/.
  const src = execFileSync("git", ["show", `${ref}:scripts/review-preview/build.mjs`], { cwd: root, encoding: "utf8" });
  const viewer = execFileSync("git", ["show", `${ref}:scripts/review-preview/viewer.html`], { cwd: root, encoding: "utf8" });
  const dir = join(root, "scripts", "review-preview");
  writeFileSync(builder, src.replace('const here = dirname(fileURLToPath(import.meta.url));', `const here = ${JSON.stringify(dir)};`)
    .replace('readFileSync(join(here, "viewer.html"), "utf8")', `${JSON.stringify(viewer)}`));
  execFileSync("node", [builder, "mondai/framework", out, "Framework case study"], { cwd: root });
  if (cssOverride) writeFileSync(join(out, "css", "framework.css"), cssOverride);
  return out;
}
// Standard deviation of the element's painted pixels: a blank box (missing image) is near 0.
async function paintedStd(p, node) {
  const el = p.locator(`[data-figma-node="${node}"]`);
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  // the element's own image, and its CSS background when it has one, finished loading (or failed)
  await p.evaluate(async (node) => {
    const e = document.querySelector(`[data-figma-node="${node}"]`);
    const waits = [];
    if (e.tagName === "IMG" && !e.complete) waits.push(new Promise((r) => { e.onload = e.onerror = r; }));
    const bg = getComputedStyle(e).backgroundImage.match(/url\("?([^")]+)"?\)/);
    if (bg) waits.push(new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = bg[1]; }));
    await Promise.race([Promise.all(waits), new Promise((r) => setTimeout(r, 5000))]);
  }, node);
  await p.waitForTimeout(200);
  const box = await el.boundingBox();
  if (!box || box.width < 50 || box.height < 50) return { std: 0, why: `box ${JSON.stringify(box)}` };
  const buf = await el.screenshot();
  const std = await p.evaluate(async (b64) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
    const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data; let n = 0, s = 0, s2 = 0;
    for (let i = 0; i < d.length; i += 16) { const v = (d[i] + d[i + 1] + d[i + 2]) / 3; n++; s += v; s2 += v * v; }
    const m = s / n; return Math.sqrt(s2 / n - m * m);
  }, buf.toString("base64"));
  return { std };
}
async function imagesAt(b, url, label) {
  const bad = [];
  for (const w of WIDTHS) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
    await p.goto(url, { waitUntil: "load" });
    for (const [name, node] of Object.entries(IMAGES)) {
      const { std, why } = await paintedStd(p, node);
      if (!(std > 12)) bad.push(`${label} ${w}: ${name} looks blank (pixel std ${std.toFixed(1)}${why ? ", " + why : ""})`);
    }
    await p.close();
  }
  return bad;
}

const gates = {
  async css() {
    const css = readFileSync(join(root, "site/css/framework.css"), "utf8");
    const hits = [...css.matchAll(/url\(\s*["']?\//g)];
    if (hits.length) fails.push(`${hits.length} url() from a root path in framework.css`);
    // control: the same test finds the root path in the integration branch's file
    const old = execFileSync("git", ["show", "origin/claude/fw-integration:site/css/framework.css"], { cwd: root, encoding: "utf8" });
    if (![...old.matchAll(/url\(\s*["']?\//g)].length) fails.push("control: the test did not find the root paths in the unfixed file");
  },
  async images() {
    const b = await chromium.launch();
    fails.push(...await imagesAt(b, `${site}/mondai/framework/`, "site"));
    const out = buildPreview();
    const s = await serveUnder(out);
    fails.push(...await imagesAt(b, `http://localhost:${s.address().port}/sub/page.html`, "preview"));
    s.close();
    // the same page through the builder his 21 Nov preview used (07e515d, before it rewrote CSS paths): must pass with this CSS
    const outPinned = buildPreview(null, "07e515d");
    const s1 = await serveUnder(outPinned);
    fails.push(...await imagesAt(b, `http://localhost:${s1.address().port}/sub/page.html`, "old-builder preview"));
    s1.close();
    // control: the unfixed CSS through that builder must fail at tablet, as his preview did
    const oldCss = execFileSync("git", ["show", "origin/claude/fw-integration:site/css/framework.css"], { cwd: root, encoding: "utf8" });
    const outOld = buildPreview(oldCss, "07e515d");
    const s2 = await serveUnder(outOld);
    const ctl = await imagesAt(b, `http://localhost:${s2.address().port}/sub/page.html`, "control");
    s2.close();
    if (!ctl.some((f) => f.includes("768: Target and pace rail"))) fails.push("control: unfixed CSS did not fail at 768, so the check cannot see the bug");
    else console.log(`control caught ${ctl.length} blank image(s) with the unfixed CSS`);
    await b.close();
  },
  async gap() {
    const b = await chromium.launch();
    for (const w of WIDTHS) {
      const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
      await p.goto(`${site}/mondai/framework/`, { waitUntil: "networkidle" });
      await p.evaluate(() => document.fonts.ready);
      const r = await p.evaluate(() => {
        const h = document.querySelector('[data-figma-node="5812:20246"]').getBoundingClientRect();
        const t = document.querySelector('[data-figma-node="5812:20247"]').getBoundingClientRect();
        const z = parseFloat(getComputedStyle(document.querySelector(".fw")).zoom) || 1;
        return { gap: t.top - h.bottom, z };
      });
      const design = r.gap / (r.z === 1 ? 1 : r.z);
      if (Math.abs(design - 32) > 1) fails.push(`${w}: heading to body ${design.toFixed(2)} design px, not 32`);
      await p.close();
    }
    await b.close();
  },
  async popover() {
    const html = readFileSync(join(root, "site/mondai/framework/index.html"), "utf8");
    const m = html.match(/data-figma-node="5812:20114" src="([^"]+)"/);
    if (!m) return fails.push("Rescheduling img not found");
    if (m[1].endsWith("/schedule-gaps@2x.webp")) fails.push("still the file name the old preview served");
    const res = await fetch(site + m[1]);
    if (!res.ok) return fails.push(`${m[1]} -> ${res.status}`);
    const sha = createHash("sha256").update(Buffer.from(await res.arrayBuffer())).digest("hex");
    const want = execFileSync("git", ["rev-parse", "78e77f3:site/assets/framework/schedule-gaps@2x.webp"], { cwd: root, encoding: "utf8" }).trim();
    const got = execFileSync("git", ["hash-object", "--stdin"], { cwd: root, input: Buffer.from(await (await fetch(site + m[1])).arrayBuffer()) }).toString().trim();
    if (got !== want) fails.push(`served image is not the PR #29 export (sha256 ${sha.slice(0, 12)})`);
    if (!sha.startsWith("6b8aed6c")) fails.push(`sha256 ${sha.slice(0, 12)} not 6b8aed6c`);
  },
  // His 21 Nov note: on a tablet no text block ends on a last line of one or two words, and the Schedule view intro
  // breaks after "between" into two lines. Start of week is another session's and is skipped. Known exception, listed
  // for him: the Capacity paragraph (5812:17122) runs 7 lines at 904 to 911 and Chrome balances six at most.
  async orphans() {
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 768, height: 900 }, reducedMotion: "reduce" });
    await p.goto(`${site}/mondai/framework/`, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    const scan = () => p.evaluate(() => {
      const out = [];
      for (const e of document.querySelectorAll(".fw .t")) {
        if (!e.offsetParent || e.closest('.sow, [data-figma-node="5812:20498"]') || e.classList.contains("fw-end__num")) continue;
        const blocks = e.querySelectorAll(".para").length ? [...e.querySelectorAll(".para")] : [e];
        for (const blk of blocks) {
          const range = document.createRange(), walker = document.createTreeWalker(blk, NodeFilter.SHOW_TEXT), words = [];
          let n; while ((n = walker.nextNode())) { const re = /\S+/g; let m; while ((m = re.exec(n.data))) { range.setStart(n, m.index); range.setEnd(n, m.index + m[0].length); const rs = range.getClientRects(); if (rs.length) words.push({ w: m[0], top: Math.round(rs[rs.length - 1].top) }); } }
          const lines = [...new Set(words.map((x) => x.top))];
          if (lines.length < 2) continue;
          const last = words.filter((x) => x.top === lines.at(-1));
          if (last.length <= 2) out.push({ node: e.dataset.figmaNode || e.closest("[data-figma-node]")?.dataset.figmaNode, last: last.map((x) => x.w).join(" "), lines: lines.length });
        }
      }
      const i = document.querySelector('[data-figma-node="5812:17150"]'), r = document.createRange(), ws = [];
      const t = i.firstChild; const re = /\S+/g; let m;
      while ((m = re.exec(t.data))) { r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length); ws.push({ w: m[0], top: Math.round(r.getClientRects()[0].top) }); }
      const tops = [...new Set(ws.map((x) => x.top))];
      return { out, intro: { lines: tops.length, end1: ws.filter((x) => x.top === tops[0]).at(-1).w } };
    });
    for (let w = 768; w < 1160; w += 4) {
      await p.setViewportSize({ width: w, height: 900 }); await p.waitForTimeout(60);
      const r = await scan();
      if (r.intro.lines !== 2 || r.intro.end1 !== "between") fails.push(`${w}: intro ${r.intro.lines} lines, first ends "${r.intro.end1}"`);
      for (const o of r.out) {
        if (o.node === "5812:17122" && w >= 904 && w <= 911) continue;
        fails.push(`${w}: ${o.node} ends on "${o.last}"`);
      }
    }
    // control: the same scan without the balance rule finds the short last lines he saw at 768
    await p.setViewportSize({ width: 768, height: 900 });
    await p.addStyleTag({ content: ".framework .fw .fw-sec * { text-wrap: wrap !important; } .framework .fw .fw-sec > .oneline { max-width: 100% !important; }" });
    await p.waitForTimeout(100);
    const c = await scan();
    if (!(c.out.length >= 3 && c.intro.end1 !== "between")) fails.push(`control: unbalanced 768 not caught ${JSON.stringify(c)}`);
    else console.log(`control: ${c.out.length} short last lines and the intro wrap caught at 768 without the rule`);
    await b.close();
  },
  async findings() {
    const f = join(root, "reports/fw-fixes-round2-2026-11-21/FINDINGS.md");
    if (!existsSync(f)) return fails.push("FINDINGS.md missing");
    const t = readFileSync(f, "utf8");
    for (const k of ["## 1440", "## 768", "## Rescheduling", "## Target and pace"]) if (!t.includes(k)) fails.push(`FINDINGS.md lacks ${k}`);
    if (/[–—]|\s--\s/.test(t)) fails.push("FINDINGS.md has a dash");
    if (!existsSync(join(root, "reports/fw-fixes-round2-2026-11-21/schedule-1440-frame-vs-page.png"))) fails.push("compare image missing");
  },
};
if (!gates[gate]) { console.error(`gates: ${Object.keys(gates).join(", ")}`); process.exit(2); }
await gates[gate]();
if (fails.length) { console.log(fails.join("\n")); process.exit(1); }
console.log(`${gate === "css" ? "CSS_PATHS" : gate.toUpperCase()}_OK`);
