import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const mode = process.argv[2];
const html = await readFile(resolve(root, "site/index.html"), "utf8");
const css = await readFile(resolve(root, "site/styles.css"), "utf8");
const script = await readFile(resolve(root, "site/homepage.js"), "utf8");

function verify(condition, message) {
  if (!condition) throw new Error(message);
}

async function verifyAsset(name) {
  const entry = await stat(resolve(root, "site/assets", name));
  verify(entry.size > 0, `${name} is empty`);
}

if (mode === "source") {
  for (const asset of ["mondai-card-vc.png", "haven-card-vc.png", "logo-master.svg", "footer-arrow-master.svg", "bolt-master.svg"]) await verifyAsset(asset);
  for (const marker of [
    "assets/mondai-card-vc.png",
    "assets/haven-card-vc.png",
    "assets/logo-master.svg",
    "assets/footer-arrow-master.svg",
    "assets/bolt-master.svg",
    "I’m convinced that people would be</span><span>happier",
    "data-mondai-open",
    "Leadership CS",
    "Framework CS",
    "Design system CS"
  ]) verify(html.includes(marker), `Missing fidelity marker: ${marker}`);
  verify(!html.includes("simple.png"), "A substituted simple card asset remains");
  verify(!html.includes("looking to relocate"), "Relocation copy remains in the header");
  for (const marker of ["#040405", "#fbf7f8", "#f2f1f8", "#e8e7ee", "#dedee5", "#d2d2db", "#aeaeb4", "#28282b", "font-size: 302px", "grid-template-columns: minmax(0, 895px) minmax(0, 1fr)"]) verify(css.includes(marker), `Missing Figma token or desktop geometry: ${marker}`);
  console.log("source fidelity verified");
} else if (mode === "responsive") {
  for (const marker of [".about-intro {", "flex-direction: column", ".about-intro h2 span { display: block; }", "@media (max-width: 1159px)", "@media (max-width: 767px)", "@media (max-width: 359px)", "grid-template-columns: 1fr", "display: block; padding-bottom: 72px"] ) verify(css.includes(marker), `Missing responsive rule: ${marker}`);
  verify(!css.includes(".about-intro {\n  align-items: end"), "About introduction still uses a horizontal layout");
  for (const marker of ["openMondaiPanel", "closeMondaiPanel", "event.key === \"Escape\"", "mondaiClose.focus()"]) verify(script.includes(marker), `Missing Mondai accessibility behavior: ${marker}`);
  console.log("responsive fidelity verified");
} else {
  throw new Error("Usage: node scripts/verify-homepage-fidelity.mjs <source|responsive>");
}
