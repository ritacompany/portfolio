import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const mode = process.argv[2];
const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "site/index.html"), "utf8");
const css = await readFile(resolve(root, "site/styles.css"), "utf8");
const script = await readFile(resolve(root, "site/homepage.js"), "utf8");

function verify(condition, message) {
  if (!condition) throw new Error(message);
}

if (mode === "structure") {
  for (const assetName of ["mondai-card-simple.png", "haven-card-simple.png"]) {
    const asset = await stat(resolve(root, "site/assets", assetName));
    verify(asset.size > 0, `${assetName} is missing`);
  }
  for (const marker of [
    "simple-hero",
    "simple-work",
    "simple-about",
    "simple-footer",
    "assets/mondai-card-simple.png",
    "assets/haven-card-simple.png",
    "I’m convinced that people would be",
    "to discover our superpowers"
  ]) verify(html.includes(marker), `Missing simplified Master marker: ${marker}`);
  verify(css.includes("font-size: 302px"), "Desktop hero display size is missing");
  verify(css.includes("grid-template-columns: minmax(0, 895px) minmax(0, 1fr)"), "Work card geometry is missing");
  console.log("simplified homepage structure verified");
} else if (mode === "mondai-panel") {
  for (const marker of ["data-mondai-open", "mondai-panel", "Leadership CS", "Framework CS", "Design system CS"]) {
    verify(html.includes(marker), `Missing Mondai panel marker: ${marker}`);
  }
  verify((html.match(/Leadership CS|Framework CS|Design system CS/g) || []).length === 3, "Mondai panel does not contain exactly three destinations");
  for (const marker of ["openMondaiPanel", "closeMondaiPanel", "event.key === \"Escape\"", "mondaiClose.focus()"]){
    verify(script.includes(marker), `Missing Mondai panel behavior: ${marker}`);
  }
  console.log("Mondai case-study panel verified");
} else {
  throw new Error("Usage: node scripts/verify-simplified-homepage.mjs <structure|mondai-panel>");
}
