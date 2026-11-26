// Add shadcn or 21st.dev components: npm run ui:add -- button
//   21st.dev: npm run ui:add -- "https://21st.dev/r/<author>/<component>"
//   (21st.dev's registry now asks for an account; pasting the component's code into
//   src/components/ui works too, since it imports @/lib/utils and @/components/ui like shadcn.)
// Why this wrapper: the current shadcn CLI writes `import { cn } from "cn"` in this project instead of
// the configured @/lib/utils alias, and installs an unrelated npm package called cn. This runs the CLI,
// then points those imports back at src/lib/utils.ts and removes the stray package.
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
if (!args.length) {
  console.error("usage: npm run ui:add -- <component or registry url> [...]");
  process.exit(1);
}
const run = (cmd, a) => execFileSync(cmd, a, { stdio: "inherit", shell: process.platform === "win32" });
run("npx", ["-y", "shadcn@latest", "add", ...args, "--yes"]);

const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(n) ? [p] : [];
  });
let fixed = 0;
for (const file of walk("src")) {
  const s = readFileSync(file, "utf8");
  const t = s.replace(/from\s+(["'])cn\1/g, 'from "@/lib/utils"');
  if (t !== s) { writeFileSync(file, t); fixed++; }
}
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
if (pkg.dependencies?.cn) run("npm", ["uninstall", "cn"]);
console.log(`ui:add done, ${fixed} file(s) pointed at @/lib/utils`);
