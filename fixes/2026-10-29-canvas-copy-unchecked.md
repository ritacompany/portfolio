# Fix: copy written to the CS2 canvas skipped every copy check and the voice pass

Status: not verified

## Evidence
Bad output: canvas paragraphs published 28 Oct held Oxford commas ("job, classes and family, and a suggestion", "deadline, Saturday night, and the calendar") with no voice pass run first. He asked whether no AI slop was used and said the checks were supposed to be in place.
Expected: every canvas publish passes check-copy and the no-ai-slop pass before he sees it.

## Chain
Input: the copy text was available to every check.
Instruction: CS2_PROCESS step 4 requires humanizer then no-ai-slop; it names the copy folder, not the canvas.
Loaded: CS2_PROCESS was not re-read at canvas publish time; the canvas builder is a separate file set (.cs2-canvas).
Conflict: none found in: CS2_PROCESS.md, HANDOFF.md, cs2-copy-guard.mjs.
Enforcement: cs2-copy-guard fires only on writes to reference/cs2/copy; canvas text goes to .cs2-canvas/template.html, so nothing fired.
Check: none existed on the Artifact publish.

## Causes
- Cause 1: the checks are bound to a folder, and canvas copy lives outside it | For: the hook matcher, and two real Oxford commas published | Against: none
- Cause 2: the agent skipped a written step | For: it said it ran the pass by hand | Against: the same step is also unenforced for Figma-free work, so a rule alone could not hold
History: 13 Oct fix record (cs2-writing-process) built the copy folder guard; it never covered the canvas.
Chosen cause: cause 1.

## Layer
Layer: 4
Why not earlier layers: no conflicting source (1); no bad input (2); order is not the problem (3).
Replaces: n/a

## Check
Check: .claude/hooks/canvas-copy-guard.mjs pulls the version copy out of .cs2-canvas/cs2-canvas.html and runs check-copy.mjs --fragments on it at every Artifact publish of that file.
Result on bad output: FAIL on the canvas as it stood: line 9 Oxford comma, line 11 Oxford comma, exit 2.

## Change
Files changed: .claude/hooks/canvas-copy-guard.mjs (new), .claude/settings.json (PreToolUse matcher Artifact), canvas paragraphs for the two flagged lines.
Instruction lines: +0 / -0
Net growth reason: n/a, the change is a hook, not a rule.

## Verification
Fresh run: guard run on the fixed canvas gives exit 0; on a copy with an em dash, an Oxford comma and "delve" it gives exit 2 with all three reasons; on an unrelated artifact it gives exit 0.
Before: exit 2, two Oxford commas
After: exit 0 on the fixed canvas
Check result after: PASS (exit 0)
Second case: negative control with a dash, an Oxford comma and "delve": FAIL, all three flagged.
Enforcement test: a publish of the flagged canvas is refused with exit 2; the next publish of the fixed canvas goes through the hook live.

## Report
Unverified: the guard enforces only what a script can see (dashes, Oxford commas, quotes, named colleagues, AI vocabulary, dates). The voice pass and the three line headline rule are still judgment calls with nothing enforcing them. The hook has not yet run on a real publish through the harness.
