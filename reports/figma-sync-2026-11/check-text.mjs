// Figma sync gate, 11 Nov 2026. Every text layer read from his file (figma-read.json) is found on the
// built page by its text, then its computed colour, weight, size, line height and tracking are compared
// to the Figma values. Colour and weight are also checked at 768, where no Figma frame exists, because
// the tokens do not change by breakpoint.
// Usage: node reports/figma-sync-2026-11/check-text.mjs [home|phone|haven|tablet|all] [--dump]
// Prints TEXT_SYNC_OK and exits 0 only when every compared row matches.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const here = new URL(".", import.meta.url).pathname;
const repo = resolve(here, "../..");
const root = join(repo, "site");
const read = JSON.parse(readFileSync(join(here, "figma-read.json"), "utf8"));
const which = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : "all";
const dump = process.argv.includes("--dump");

// Rows the site does not draw as live text, with the reason. Anything not here must match.
const SKIP = {
  "4929:12404": "CHDWCK hero is his text outlined to an SVG (fill checked by verify-figma-sync)",
  "4928:11945": "phone CHDWCK is outlined (fill checked by verify-figma-sync)",
  "4943:12632": "second, lavender hero in the master: exploration, his call",
  "I4945:12651;4659:11794": "lavender hero", "4945:12676": "lavender hero", "4945:12679": "lavender hero", "4945:12683": "lavender hero",
  "I4889:12775;4923:12570": "Testimonials on hold at his ask", "4928:11988": "Testimonials on hold at his ask",
  "I4889:12775;4889:13133": "footer time is the live clock, text differs by design",
  "4929:12357": "footer time is the live clock, text differs by design",
  "4683:20258": "Haven title is drawn as an image in the hero",
  "4683:20428": "Case study end point: the approved Haven copy folds it into the Identity launch line (DIFF Q5)",
  "4268:7388": "drawn inside the profile image profile-current.png", "4268:7391": "drawn inside the profile image",
  "4268:7392": "drawn inside the profile image",
  "4264:7198": "insight tooltip over the pills is not built (DIFF Q6)"
};
// Rows drawn by the site under a different text key (copy set as one element).
const ALIAS = {
  "I4889:12775;4889:13132": "@2026, chadwick fenner", "4929:12356": "@2026, chadwick fenner",
  "4659:13187": "identity was the first phase. community is the next."
};
// Properties deliberately left as they are, with the reason (each is a row in DIFF.md).
const KEPT = {
  "4923:12099": [["fs"], "// mark kept at 15.17 (--mark-15), decided 10 Nov"],
  "4923:12102": [["lh"], "13.75 description keeps the Label/14 line, 10 Nov D20"],
  "I4923:12095;4868:13523": [["fs"], "Learn more kept full size, 10 Nov D41"],
  "4928:12053": [["fs"], "phone card drawn at 98.2 percent in the frame; site keeps Heading/20"],
  "4929:12236": [["fs"], "phone card drawn at 98.2 percent in the frame; site keeps Heading/20"],
  "4928:12055": [["fs", "ls"], "phone card drawn at 98.2 percent in the frame; site keeps Label/12 C"],
  "4929:12207": [["lh"], "13.75 description keeps the Label/14 line, 10 Nov D20"],
  "4929:12228": [["lh"], "13.75 description keeps the Label/14 line, 10 Nov D20"],
  "3558:22566": [["ls"], "Insight 1 label tracks 2 percent, its three siblings 1 percent: his call (DIFF Q3)"],
  "3558:22569": [["fw", "ls"], "Insight 1 body is Regular, its three siblings Medium: his call (DIFF Q3)"],
  "4683:20371": [["ls"], "Insight 1 card body tracks 2 percent, its four siblings 1 percent: his call (DIFF Q3)"],
  "3530:4896": [["ls"], "Scheduling a chat eyebrow tracks +0.2 percent, every other eyebrow -2 percent: his call (DIFF Q4)"]
};
const WEIGHT = { "Regular": 400, "Medium": 500, "SemiBold": 600, "Semi Bold": 600, "Bold": 700, "Bold Italic": 700, "ExtraBold": 800 };
const norm = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();

const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".jpg": "image/jpeg" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const runs = [
  ["home", "/", 1440, 900, read.home, "full"],
  ["tablet", "/", 768, 1024, read.home, "colour"],
  ["phone", "/", 402, 874, read.phone, "full"],
  ["haven", "/haven/", 1440, 900, read.haven, "full"]
].filter((r) => which === "all" || r[0] === which);

const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const problems = []; let compared = 0, skipped = 0;
try {
  for (const [name, path, w, h, rows, mode] of runs) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const live = rows.filter((r) => !SKIP[r[0]]);
    skipped += rows.length - live.length;
    const got = await page.evaluate((keys) => {
      const norm = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
      const hex = (c) => { const m = c.match(/[\d.]+/g); return m ? "#" + m.slice(0, 3).map((v) => (+v).toString(16).padStart(2, "0")).join("") : c; };
      const all = [...document.body.querySelectorAll("*")].filter((el) => !["SCRIPT", "STYLE", "svg"].includes(el.tagName));
      return keys.map((key) => {
        // smallest elements whose own text starts with the Figma text
        const hits = all.filter((el) => { const t = norm(el.textContent || ""); return t && t.startsWith(key) && t.length <= key.length + 400; })
          .filter((el) => ![...el.children].some((c) => norm(c.textContent || "").startsWith(key)));
        return hits.map((el) => { const cs = getComputedStyle(el);
          return { c: hex(cs.color), fw: +cs.fontWeight, fs: parseFloat(cs.fontSize), lh: cs.lineHeight === "normal" ? null : parseFloat(cs.lineHeight),
            ls: cs.letterSpacing === "normal" ? 0 : parseFloat(cs.letterSpacing), sel: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "") }; });
      });
    }, live.map((r) => norm(ALIAS[r[0]] || r[1])));
    live.forEach((r, i) => {
      const [id, text, style, fs, lh, ls, , col] = r;
      const want = { c: col, fw: WEIGHT[style], fs, lh, ls };
      const keys = (mode === "colour" ? ["c", "fw"] : ["c", "fw", "fs", "lh", "ls"]).filter((k) => !(KEPT[id] && KEPT[id][0].includes(k)));
      const cands = got[i];
      compared++;
      if (!cands.length) { problems.push(`${name} ${id} "${text}": not on the page`); return; }
      const miss = (g) => keys.filter((k) => want[k] != null && !(typeof want[k] === "number"
        ? Math.abs(g[k] - want[k]) <= (k === "fs" ? 0.05 : k === "lh" ? 0.65 : k === "ls" ? 0.02 : 0) : g[k] === want[k]));
      const best = cands.map((g) => ({ g, m: miss(g) })).sort((a, b) => a.m.length - b.m.length)[0];
      if (dump) console.log(name, id, text.slice(0, 30), best.g.sel, JSON.stringify(best.g));
      if (best.m.length) problems.push(`${name} ${id} "${text.slice(0, 40)}" ${best.g.sel}: ` + best.m.map((k) => `${k} ${typeof best.g[k] === "number" ? +best.g[k].toFixed(3) : best.g[k]} want ${want[k]}`).join(", "));
    });
    await page.close();
  }
} finally { await browser.close(); server.close(); }

if (problems.length) { console.error(problems.join("\n")); console.error(`text sync: ${problems.length} of ${compared} rows differ (${skipped} skipped with a reason)`); process.exit(1); }
console.log(`TEXT_SYNC_OK ${compared} rows (${skipped} skipped with a reason)`);
