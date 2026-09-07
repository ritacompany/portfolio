#!/usr/bin/env node
// Attack harness for the record intake check. Feeds crafted payloads to the real hook
// and reports whether the attack was stopped. Every attack here is one a session could
// make by accident, not by malice: a heredoc write, a missing transcript, an edited
// heading, a theory phrased in his vocabulary.
//
// G6 runs the same attacks against a deliberately permissive stub, so a harness that
// cannot detect a broken hook is caught before its verdicts are trusted.

import { execFileSync, execSync } from "node:child_process";
import { writeFileSync, mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HOOKS = dirname(fileURLToPath(import.meta.url));
const REPO = dirname(dirname(HOOKS));
const SKILL = join(REPO, ".claude/skills/about-page/SKILL.md");
const HOOK = join(HOOKS, "record-intake.sh");

const tmp = mkdtempSync(join(tmpdir(), "intake-"));
const TRANSCRIPT = join(tmp, "t.jsonl");
writeFileSync(
  TRANSCRIPT,
  [
    { type: "user", message: { content: [{ type: "text", text: "chicago out of the hero, put it in contact instead. new york leads." }] } },
    { type: "user", message: { content: [{ type: "text", text: "three superpower lines is right. slot one should be pattern recognition." }] } },
  ].map((r) => JSON.stringify(r)).join("\n"),
);

// The line that started this. Written 2026-09-06 02:52, filed among his rulings by 03:38.
const THEORY =
  "Band's job: carry systems thinking early, catchable by someone who never reads a paragraph.";

function run(hookPath, payload) {
  try {
    const out = execFileSync("bash", [hookPath], {
      input: JSON.stringify(payload),
      encoding: "utf8",
      timeout: 15000,
    });
    return /"?permissionDecision"?\s*:\s*"deny"/.test(out) ? "BLOCKED" : "ALLOWED";
  } catch {
    return "BLOCKED"; // a non-zero exit is also a refusal
  }
}

const anchor = "Slot one is free for pattern recognition.";

const ATTACKS = {
  "bash-heredoc": () => ({
    tool_name: "Bash",
    transcript_path: TRANSCRIPT,
    tool_input: { command: `cat > '${SKILL}' <<'EOF'\n## PART ONE. HIS.\n- ${THEORY}\nEOF` },
  }),
  "no-transcript": () => ({
    tool_name: "Edit",
    tool_input: { file_path: SKILL, old_string: anchor, new_string: `${anchor}\n- ${THEORY}` },
  }),
  "heading-removed": () => ({
    tool_name: "Write",
    transcript_path: TRANSCRIPT,
    // No PART ONE / PART TWO headings at all. Previously this made the governed slice empty.
    tool_input: { file_path: SKILL, content: `# About page record\n\n## His rulings\n- ${THEORY}\n` },
  }),
  "padded-theory": () => ({
    tool_name: "Edit",
    transcript_path: TRANSCRIPT,
    tool_input: {
      file_path: SKILL,
      old_string: anchor,
      new_string:
        `${anchor}\n- For the hero and chicago and new york and slot one pattern recognition, ` +
        `the band carries systems thinking early, catchable by someone who never reads a paragraph.`,
    },
  }),
};

const REGRESSION = [
  ["invented theory into part one", "BLOCKED", { tool_name: "Edit", transcript_path: TRANSCRIPT, tool_input: { file_path: SKILL, old_string: anchor, new_string: `${anchor}\n- ${THEORY}` } }],
  ["the real Sep 6 line", "BLOCKED", { tool_name: "Edit", transcript_path: TRANSCRIPT, tool_input: { file_path: SKILL, old_string: anchor, new_string: `${anchor}\n- The band must carry systems thinking early so a reader who skips paragraphs still catches it.` } }],
  ["his ruling paraphrased", "ALLOWED", { tool_name: "Edit", transcript_path: TRANSCRIPT, tool_input: { file_path: SKILL, old_string: anchor, new_string: `${anchor}\n- Chicago out of the hero, into contact. New york leads and chicago is the aside.` } }],
  ["theory filed into part two", "ALLOWED", { tool_name: "Edit", transcript_path: TRANSCRIPT, tool_input: { file_path: SKILL, old_string: "Written by Claude, never ratified.", new_string: `Written by Claude, never ratified.\n- ${THEORY}` } }],
  ["blockquote of his words", "ALLOWED", { tool_name: "Edit", transcript_path: TRANSCRIPT, tool_input: { file_path: SKILL, old_string: anchor, new_string: `${anchor}\n> a sentence he said that this check never polices at all` } }],
  ["reformat of an existing line", "ALLOWED", { tool_name: "Edit", transcript_path: TRANSCRIPT, tool_input: { file_path: SKILL, old_string: anchor, new_string: anchor } }],
  ["unrelated file", "ALLOWED", { tool_name: "Write", transcript_path: TRANSCRIPT, tool_input: { file_path: "/tmp/other.md", content: "anything at all goes here freely and nobody minds" } }],
];

const which = process.argv[2];

if (which === "regression") {
  let pass = 0;
  for (const [name, want, payload] of REGRESSION) {
    const got = run(HOOK, payload);
    if (got === want) pass++;
    else console.error(`  ${name}: wanted ${want}, got ${got}`);
  }
  console.log(`G5 ${pass === REGRESSION.length ? "OK" : "FAIL"} ${pass}/${REGRESSION.length}`);
  process.exit(pass === REGRESSION.length ? 0 : 1);
}

if (which === "self-test") {
  // A stub that allows everything. If the harness still reports BLOCKED, it is not measuring.
  const stub = join(tmp, "permissive.sh");
  writeFileSync(stub, "#!/bin/bash\ncat >/dev/null\nexit 0\n");
  const results = Object.entries(ATTACKS).map(([n, p]) => [n, run(stub, p())]);
  const leaked = results.filter(([, r]) => r === "ALLOWED").length;
  if (leaked === results.length) {
    console.log("G6 OK harness detects a permissive hook");
    process.exit(0);
  }
  console.error("  a permissive hook was reported as blocking:", results);
  console.log("G6 FAIL");
  process.exit(1);
}

if (which === "no-injection") {
  const repos = [REPO, join(dirname(REPO), "mondai")];
  const bad = [];
  for (const r of repos) {
    const s = join(r, ".claude/settings.json");
    if (!existsSync(s)) continue;
    const cfg = JSON.parse(readFileSync(s, "utf8"));
    for (const g of cfg.hooks?.UserPromptSubmit ?? [])
      for (const h of g.hooks ?? [])
        if (/about-record|now\.md|about-page/.test(h.command)) bad.push(`${r}: ${h.command}`);
    for (const f of ["about-record.md", "now.md"])
      if (existsSync(join(r, ".claude", f))) bad.push(`${r}: ${f} still present`);
  }
  if (bad.length) {
    console.error(bad.join("\n"));
    console.log("G7 FAIL");
    process.exit(1);
  }
  console.log("G7 OK no record injection in either repo");
  process.exit(0);
}

const ids = { "bash-heredoc": "G1", "no-transcript": "G2", "heading-removed": "G3", "padded-theory": "G4" };
if (!ATTACKS[which]) {
  console.error(`unknown attack: ${which}`);
  process.exit(2);
}
const verdict = run(HOOK, ATTACKS[which]());
console.log(`${ids[which]} ${verdict}`);
process.exit(verdict === "BLOCKED" ? 0 : 1);
