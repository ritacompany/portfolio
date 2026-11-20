// CS2 results ending (20 Nov). The ending's words are the "Ending, example results" section of
// portfolio reference/cs2/review-2026-11-07/final-copy.md on main, word for word, and nothing else.
// Each "Key: value" line must appear in the ending's text (curly and straight apostrophes treated alike,
// spaces ignored so "6" and "of 8" may sit in separate spans); version C's headline must be gone; the
// ending's own text must have no other words. Prints COPY_OK <n> lines only when all of that holds.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const md = execFileSync("git", ["-C", resolve(process.env.HOME, "Code/portfolio"), "show", "main:reference/cs2/review-2026-11-07/final-copy.md"], { encoding: "utf8" });
const sec = md.split("## Ending, example results")[1].split("\n## ")[0].split("\n").slice(2).filter((l) => l.includes(": "));
const lines = sec.map((l) => { const i = l.indexOf(": "); const k = l.slice(0, i); return ["Eyebrow", "Headline", "Under the numbers"].includes(k) ? l.slice(i + 2) : `${k} ${l.slice(i + 2)}`; });
const html = readFileSync(new URL("../../site/mondai/framework/index.html", import.meta.url), "utf8");
const m = html.match(/<section class="fw-sec fw-end-sec"[\s\S]*?<\/section>/);
if (!m) { console.log("ending section not found"); process.exit(1); }
const text = m[0].replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&");
const norm = (s) => s.replace(/[‘’]/g, "'").replace(/\s+/g, "");
const bad = [];
let rest = norm(text);
for (const l of lines) { const n = norm(l); if (!rest.includes(n)) bad.push(`missing: ${l}`); else rest = rest.replace(n, ""); }
if (rest.length) bad.push(`words on the page that are not in the copy: ${rest}`);
if (lines.length !== 9) bad.push(`expected 9 copy lines, parsed ${lines.length}`);
if (html.includes("The least settled rule")) bad.push("version C headline still on the page");
if (/[–—]/.test(text)) bad.push("dash in the ending");
if (bad.length) { console.log(bad.join("\n")); process.exit(1); }
console.log(`COPY_OK ${lines.length} lines`);
