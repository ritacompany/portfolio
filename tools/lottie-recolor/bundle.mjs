// Rebuilds lotties.js from every .json in ./lotties so the editor can list them
// when opened straight from disk (file:// cannot fetch, but it can load a script).
// Run: node tools/lottie-recolor/bundle.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, "lotties");
const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
const bundle = files.map((f) => ({
  name: basename(f, ".json"),
  data: JSON.parse(readFileSync(join(dir, f), "utf8")),
}));
writeFileSync(join(here, "lotties.js"), `window.BUNDLED_LOTTIES = ${JSON.stringify(bundle)};\n`);
console.log(`Bundled ${bundle.length}: ${bundle.map((b) => b.name).join(", ")}`);
