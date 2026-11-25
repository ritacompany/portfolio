// Haven usability testing insight cards: text and hug check.
// For each of the four .tcard__body cards, at 1440, 1024, 768 and 390 px:
//   padding   computed padding is 32 top, 24 right, 34 bottom, 24 left;
//   hug       the content box height equals the text's own height (the same paragraph measured with no
//             padding, border or min height, its text-box trim kept), so
//             the card is text plus padding plus its 1 px border and nothing else;
//   text      the card text equals the text in his Figma frame (haven cs 6464:56906, file
//             5RO0m4bYYrTvbiaOgaU3tI, page CS, read 25 Nov), checked with the argument figma (the default), or the text
//             currently on the page (argument page) when he keeps the built text.
// Prints CARDS OK only when every card at every width passes; exits 1 otherwise.
// Usage: node reports/haven-testing-cards/check-cards.mjs [figma|page]
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const FIGMA = [
  "Users were not sure if they would be talking to each expert by text, voice or video or something else entirely.",
  "Users had trouble understanding the duration section of the scheduling page. There was a clarity gap.",
  "Users were concerned that the design did not have enough security details to met their needs.",
  "Users wanted to have a more information available that would help them choose between confidantes.",
];
const PAGE = [
  "Users weren’t sure whether they’d talk to the expert by text, voice or video.",
  "Users had trouble understanding the duration section of the scheduling page.",
  "Users were concerned that the design lacked enough security features.",
  "Users wanted to know more about each Confidante before choosing one.",
];
const argv = process.argv.slice(2);
const mode = argv[0] || "figma";
const want = mode === "page" ? PAGE : FIGMA;
const WIDTHS = [1440, 1024, 768, 390];
const PAD = { top: 32, right: 24, bottom: 34, left: 24 };

const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  if (!p.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const { chromium } = createRequire(join(repo, "package.json"))("playwright");
const browser = await chromium.launch();
const problems = [];
try {
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await page.goto(base + "/haven/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const cards = await page.$$eval(".cards-testing .tcard__body", (els) => els.map((el) => {
      const cs = getComputedStyle(el);
      const n = (v) => parseFloat(v);
      const range = document.createRange();
      range.selectNodeContents(el);
      const tops = new Set([...range.getClientRects()].filter((r) => r.width > 0).map((r) => Math.round(r.top)));
      const lh = n(cs.lineHeight);
      const content = el.clientHeight - n(cs.paddingTop) - n(cs.paddingBottom);
      // The text's own height: the same paragraph, same width and type (text-box trim included), with
      // no padding, border, min height or flex sizing, measured off to the side.
      const clone = el.cloneNode(true);
      Object.assign(clone.style, { position: "absolute", left: "-9999px", top: "0", width: el.clientWidth - n(cs.paddingLeft) - n(cs.paddingRight) + "px", padding: "0", border: "0", minHeight: "0", height: "auto", flex: "none", display: "block", boxSizing: "content-box" });
      el.parentNode.appendChild(clone);
      const textH = clone.getBoundingClientRect().height;
      clone.remove();
      return { text: el.textContent.trim(), pad: [n(cs.paddingTop), n(cs.paddingRight), n(cs.paddingBottom), n(cs.paddingLeft)], lines: tops.size, lh, content, textH, height: el.getBoundingClientRect().height };
    }));
    if (cards.length !== 4) problems.push(`${w}: ${cards.length} cards, want 4`);
    cards.forEach((c, i) => {
      const id = `${w} Insight ${i + 1}`;
      const [t, r, b, l] = c.pad;
      if (t !== PAD.top || r !== PAD.right || b !== PAD.bottom || l !== PAD.left) problems.push(`${id}: padding ${t} ${r} ${b} ${l}, want 32 24 34 24`);
      const textH = c.textH;
      if (Math.abs(c.content - textH) > 1) problems.push(`${id}: content ${c.content.toFixed(1)} px, text ${textH.toFixed(1)} px (${c.lines} lines), card ${c.height.toFixed(1)} px does not hug`);
      if (c.text !== want[i]) problems.push(`${id}: text "${c.text}", want "${want[i]}"`);
      console.log(`${id}: ${c.lines} lines, card ${c.height.toFixed(1)} px, padding ${c.pad.join(" ")}`);
    });
    await page.close();
  }
} finally { await browser.close(); server.close(); }
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("CARDS OK");
