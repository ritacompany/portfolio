# Fix: site cursor dot built without opening the reference

Status: not verified

## Evidence
Bad output: `site/dev/preview/site-cursor.css` (commit on branch site-cursor, PR 34): a 12 px Neutral/100 dot, eased behind the pointer, no shadow, a 24 px see-through dot over links. style_guide.md "Take/Leave" was written without measuring the reference.
Expected: the reference dot on cursors.framer.wiki ("Simple Replace"): 24 px rgb(255, 255, 255), drop shadow 0 12px 24px rgba(0,0,0,0.2), drawn on the pointer, no change over links (measured in Chromium 21 Nov).

## Chain
Input: the brief named the reference URL and also said "about 12px"; the reference itself was reachable from the container (Playwright loaded it).
Instruction: exists in .claude/motion-rules.md, "Reference first: before code, write docs/motion/(piece)/style_guide.md from a reference (a site's code, a frame, a clip)".
Loaded: yes, motion-rules.md was read at the start of the session.
Conflict: the brief's "about 12px" contradicted the reference; nothing says which wins when a brief's number and its reference disagree.
Enforcement: none. The style guide is free text; nothing checks it against the reference.
Check: no gate compared the output with the reference; G1 checked against the brief's 12 px, so it certified the wrong dot.

## Causes
- Cause 1: the reference step has no output check, so a style guide written from the brief's words passes | For: style_guide.md cites the reference but holds no measured value; G1 encoded 12 px | Against: the rule text exists and was read
- Cause 2: the brief's own number (about 12px) was taken as the spec over the reference | For: the built size equals the brief's number exactly | Against: the brief also said the reference is the model
History: fixes/2026-11-17-hero-reference-cables-outside-pipe.md and 2026-11-18-hero-flowers-drawn-not-photographed.md are the same family: output built from a description instead of the reference.
Chosen cause: 1. With a check against the real reference, cause 2 cannot get past either.

## Layer
Layer: 2
Layer note: fix the source, the gate checker.
Why not earlier layers: 1, removing the brief's number fixes this brief only; the next brief will carry another.
Replaces: n/a

## Check
Check: `node scripts/check-cursor.mjs REF` measures the dot on the live reference and compares size, fill and drop shadow with ours.
Result on bad output: FAIL: "REF FAIL: size 12x12 vs reference 24x24" (run with the old preview files restored by git stash).

## Change
Files changed: scripts/check-cursor.mjs (REF gate), docs/motion/site-cursor/GATES.md (G0), site/dev/preview/site-cursor.css and .js (dot rebuilt to the measured values), style_guide.md (measured reference block)
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not run. A fresh session building another referenced piece is the real test; this record does not have one.
Before: 12 px Neutral/100 dot, eased, no shadow.
After: 24 px white dot, drop shadow 0 12 24 at 20 percent, on the pointer.
Check result after: PASS: "REF PASS reference 24px rgb(255, 255, 255) / rgba(0, 0, 0, 0.2) 0px 12px 24px 0px; ours 24px"
Second case: none run.
Enforcement test: n/a

## Report
Unverified: the REF gate protects this piece only. Nothing yet makes a new motion piece measure its reference before building; a general version would be a gate in the motion review (motion-check) that fails a style guide without a measured reference block. Chadwick decides whether to add that.
