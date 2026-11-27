# Fix: the card transition paused between pages and the review never showed it

Status: not verified

## Evidence
Bad output: his 24 Nov screen recording of the published test build, direction B. Frame differences from 19.37 s to 19.77 s are all near zero: the card sits still on black for about 0.4 s between Home's fade and the move. His words: "it doesn't feel smooth ... there's a pause". He was also shown no video.
Expected: the move runs continuously from the release to the landing, with no still stretch and no empty frame, and a video he can watch before he tries it.

## Chain
Input: the review had everything it needed to time the page change, but its capture did not include it.
Instruction: .claude/motion-rules.md, Review loop: live pieces go through scripts/live-capture.mjs; this piece used its own stepped capture (scripts/check-card-transition.mjs CAPTURE).
Loaded: yes. The rules and the code-motion skill were read on 21 Nov.
Conflict: the stepped capture freezes each page's clock and seeks frame by frame, so the time between the two pages (the load) never exists in it. Every review round and the hand-over gate (G1) passed on frames that skip the load.
Enforcement: none for real-clock timing across a page change.
Check: a real-clock recording of a click with a realistic network delay, measured for still stretches, would have failed the 22 Nov build.

## Causes
- Cause 1: the review captured only stepped frames, so a pause caused by real time (the page load) was invisible to every reviewer. | For: G1 passed with pixel-identical hand-over frames while his recording shows a 0.4 s freeze; G8 on the 22 Nov build fails with 0.4 s at 1440. | Against: none.
- Cause 2: the design itself waited for the page to load before moving, plus a 150 ms image wait. | For: the code held frame 0 until images decoded. | Against: this is the product defect, and the review should have caught it either way.
History: fixes/2026-11-22-transition-built-on-retired-collection-page.md (different failure).
Chosen cause: both. Cause 2 was fixed in the design; cause 1 is the process gap.

## Layer
Layer: 4
Why not earlier layers: 1, 2 and 3 do not apply because nothing conflicted and the stepped capture is right for what it measures; it needed a second, real-clock check beside it. The check runs as a gate the session must pass, not as a note.
Replaces: n/a

## Check
Check: `node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G8 output/ct-preview` (real clock, the collection held back 0.3 s on the network, a recorded click: no still stretch over 0.12 s in the first 0.7 s, no frame far darker than both neighbours).
Result on bad output: FAIL. The 22 Nov build: "B 1440: the move pauses for 400 ms", "B 390: the move pauses for 320 ms". A middle build: "B 390: 1 empty frame(s) between the pages".

## Change
Files changed: site/dev/preview/card-transition.js and .css (the move starts on Home, continues on the collection, the collection's first paint waits for it), scripts/build-preview.mjs (opt-in render-blocking for one preview script), scripts/check-card-transition.mjs (G8), docs/motion/card-transition/GATES.md (G8).
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done in a fresh session. G8 passes on the current build at 1440 and 390 for B and C.
Before: still for 0.4 s at 1440.
After: longest still 0.08 s; no dark frame.
Check result after: G8 PASS.
Second case: the phone width (390) fails before and passes after.
Enforcement test: G8 fails on the 22 Nov build and on the build with the empty frame.

## Report
Unverified: G8 is a gate in this piece's GATES.md only; other motion pieces that change pages have no real-clock check. The published build runs inside claude.ai, where the hidden measuring frame has not been tested; if he still sees a pause there, that frame is being blocked and the move falls back to the old behaviour.
