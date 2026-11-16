// Phase 2 gates for the built pages (the rest after the buttons). Each mode prints its token only when
// every assertion passed.
//   cards    Home work cards: hover eases the image to 1.035 and turns label and description white, Learn
//            more fills; focus shows the same plus a ring; reduced motion keeps the colour change only.
//   links    links and context rows carry a 200 ms colour transition; component sheet pixels still pass.
//   clock    the footer clock on Home and Framework shows the current Chicago time.
//   dots     Framework Start of week dots: first is current at load, a click scrolls the track to that
//            template and the dots follow a sideways scroll.
//   regress  every page gate (boxes, pixels, health, a11y, shared) for Home, Framework and Collection,
//            the component sheet pixels and the site check.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";

const mode = process.argv[2];
const repo = resolve(new URL("..", import.meta.url).pathname);
const problems = [];
const done = (t) => { if (problems.length) { console.error(problems.join("\n")); process.exit(1); } console.log(t); process.exit(0); };
const run = (args) => { try { return execFileSync("node", args, { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); } catch (e) { problems.push(`${args.join(" ")} failed:\n${(e.stdout || "") + (e.stderr || "")}`); return ""; } };

if (mode === "regress") {
  for (const page of ["home", "framework", "collection"]) for (const m of ["boxes", "pixels", "health", "a11y", "shared"]) run(["scripts/verify-pages.mjs", m, page]);
  run(["scripts/verify-components.mjs", "pixels"]);
  try { execFileSync("npm", ["run", "check"], { cwd: repo, stdio: "ignore" }); } catch { problems.push("npm run check failed"); }
  done("REGRESS_OK");
}
if (mode === "links") {
  run(["scripts/verify-components.mjs", "pixels"]);
}

const root = join(repo, "site");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png" };
const srv = createServer((q, r) => { let p = resolve(join(root, decodeURIComponent(new URL(q.url, "http://x").pathname))); try { if (statSync(p).isDirectory()) p = join(p, "index.html"); if (!p.startsWith(root)) throw 0; r.writeHead(200, { "content-type": T[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { r.writeHead(404).end(); } });
await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${srv.address().port}`;
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch();
const errs = [];
const open = async (url, opts = {}) => { const p = await b.newPage({ viewport: { width: 1440, height: 900 }, ...opts }); p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => m.type() === "error" && errs.push(m.text())); await p.goto(base + url, { waitUntil: "networkidle" }); await p.evaluate(() => document.fonts.ready); return p; };

try {
  if (mode === "cards") {
    const p = await open("/");
    const card = p.locator(".work-card-mondai"); await card.scrollIntoViewIfNeeded();
    await p.evaluate(() => document.addEventListener("click", (e) => e.preventDefault(), true));
    const read = () => card.evaluate((c) => ({ s: new DOMMatrix(getComputedStyle(c.querySelector(".work-card__media > img")).transform).a, desc: getComputedStyle(c.querySelector(".work-card__desc")).color, kind: getComputedStyle(c.querySelector(".work-card__kind")).color, btn: getComputedStyle(c.querySelector(".button-sm")).backgroundColor, ring: getComputedStyle(c).outlineStyle }));
    await p.mouse.move(5, 5); await p.waitForTimeout(1200);
    const rest = await read();
    const bb = await card.boundingBox(); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(1200);
    const hov = await read();
    if (Math.abs(rest.s - 1) > 0.001) problems.push(`rest image scale ${rest.s}`);
    if (Math.abs(hov.s - 1.035) > 0.002) problems.push(`hover image scale ${hov.s}`);
    if (hov.desc !== "rgb(255, 255, 255)" || hov.kind !== "rgb(255, 255, 255)") problems.push(`hover text not white: ${hov.desc} ${hov.kind}`);
    if (hov.btn !== "rgb(232, 231, 238)") problems.push(`Learn more did not fill: ${hov.btn}`);
    await p.mouse.down(); await p.waitForTimeout(400); const pr = await read(); await p.mouse.up();
    if (Math.abs(pr.s - 1.01) > 0.003) problems.push(`pressed image scale ${pr.s}`);
    await p.mouse.move(5, 5); await p.waitForTimeout(1200);
    await card.focus(); await p.keyboard.press("Shift+Tab"); await p.keyboard.press("Tab"); await p.waitForTimeout(1200);
    const foc = await read();
    if (foc.ring !== "solid" || Math.abs(foc.s - 1.035) > 0.002) problems.push(`focus: ring ${foc.ring}, scale ${foc.s}`);
    const r = await open("/", { reducedMotion: "reduce" });
    const rc = r.locator(".work-card-mondai"); await rc.scrollIntoViewIfNeeded(); const rb = await rc.boundingBox();
    await r.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await r.waitForTimeout(600);
    const red = await rc.evaluate((c) => ({ s: new DOMMatrix(getComputedStyle(c.querySelector(".work-card__media > img")).transform).a, desc: getComputedStyle(c.querySelector(".work-card__desc")).color }));
    if (red.s !== 1 || red.desc !== "rgb(255, 255, 255)") problems.push(`reduced motion: scale ${red.s}, desc ${red.desc}`);
    if (errs.length) problems.push(`errors: ${errs.join("; ")}`);
    done("CARDS_OK");
  }
  if (mode === "links") {
    const p = await open("/dev/components/");
    const r = await p.evaluate(() => [".link-block", ".link-nav", ".link-footer", ".context"].map((s) => { const e = document.querySelector(s); if (!e) return `${s}: missing`; const cs = getComputedStyle(e); return /background-color/.test(cs.transitionProperty) && /0\.2s/.test(cs.transitionDuration) ? "" : `${s}: ${cs.transitionProperty} ${cs.transitionDuration}`; }).filter(Boolean));
    problems.push(...r);
    if (errs.length) problems.push(`errors: ${errs.join("; ")}`);
    done("LINKS_OK");
  }
  if (mode === "clock") {
    const want = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit" }).format(new Date()).replace(" ", "").toLowerCase();
    for (const url of ["/", "/mondai/framework/"]) {
      const p = await open(url);
      const t = await p.locator("footer.footer time").textContent();
      if (!t.startsWith(want.slice(0, -2).split(":")[0] + ":") || !/(am|pm) C[SD]T$/.test(t)) problems.push(`${url}: clock reads "${t}", Chicago is ${want}`);
      await p.close();
    }
    if (errs.length) problems.push(`errors: ${errs.join("; ")}`);
    done("CLOCK_OK");
  }
  if (mode === "dots") {
    const p = await open("/mondai/framework/");
    const cur = () => p.evaluate(() => [...document.querySelectorAll(".week-dot")].findIndex((d) => d.getAttribute("aria-current") === "true"));
    await p.locator(".week-nav").scrollIntoViewIfNeeded();
    if ((await cur()) !== 0) problems.push(`at load dot ${await cur()} is current`);
    await p.locator(".week-dot").nth(3).click(); await p.waitForTimeout(1200);
    const sl = await p.evaluate(() => { const t = document.querySelector(".week"), s = t.querySelectorAll(".week__slide"); return Math.abs(t.scrollLeft - (s[3].offsetLeft - s[0].offsetLeft)); });
    if (sl > 2) problems.push(`click on dot 4 left the track ${sl}px off template 4`);
    if ((await cur()) !== 3) problems.push(`after click dot ${await cur()} is current`);
    await p.evaluate(() => { const t = document.querySelector(".week"), s = t.querySelectorAll(".week__slide"); t.scrollTo({ left: s[1].offsetLeft - s[0].offsetLeft }); });
    await p.waitForTimeout(600);
    if ((await cur()) !== 1) problems.push(`after scrolling to template 2 dot ${await cur()} is current`);
    if (errs.length) problems.push(`errors: ${errs.join("; ")}`);
    done("DOTS_OK");
  }
  problems.push(`unknown mode ${mode}`); done("");
} finally { await b.close(); srv.close(); }
