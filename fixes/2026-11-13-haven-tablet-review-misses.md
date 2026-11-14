# Fix: the Haven tablet audit passed a page with twelve visible problems

Status: not verified

## Evidence
Bad output: reports/haven-tablet/ISSUES.md (commit 41b148b) listed two issues and said "Checked and fine at all four widths ... the MVP chart turning into two phase lists below 1160, the 2x2 insight cards, the five step flow, the chat pair and the ending cards all hold their 1440 composition or the page's existing small screen version." His review the same day found twelve more (FEEDBACK-13NOV.md F1 to F12): blurry media, a quiz phone with no room to move, hover-only ending cards, unequal security screens, a taller ending bar, a testing section and insight cards recomposed away from desktop, pills that fade in.
Expected: an audit that finds these before he does, each with a measurement.

## Chain
Input: the page, 1440 shots and the tablet grid were all there. The media files' real pixel sizes were one command away.
Instruction: the task said compare with 1440 and "Haven's 2x2 and its layout choices are his; match them, never redesign".
Loaded: yes, read at the start.
Conflict: the earlier responsive versions on the page (two phase lists, two column insight cards, stacked testing row) were built by an earlier session, not chosen by him. The audit read "his layout choices" as "whatever the page does now" and so treated the recompositions as approved.
Enforcement: none. measure.mjs only measured what it was written to measure: margins, line length, text size, overlap, section tails.
Check: no check measured image resolution on a 2x screen, hover-only content, the room a scroll motion needs, paired media heights, a shared component's height or whether a section keeps its desktop arrangement.

## Causes
- Cause 1: the audit's checks covered layout geometry only, so anything outside it passed by default | For: every F item is in an unmeasured category (resolution, interaction, motion, parity); the two found issues were both geometry | Against: the section crops were viewed by eye and blur, the hover cards and the stacked testing row were visible in them
- Cause 2: the earlier small screen versions were treated as his approved design | For: ISSUES.md names them as fine because they are "the page's existing small screen version"; git shows they came from the Haven update session, not him | Against: none found
- Cause 3: crops were viewed at 420 px wide per width, too small to see softness | For: the side by side crops scale every width to 420, a 0.3 to 0.55 reduction that hides blur | Against: the hover card problem is a behaviour, not a resolution, and was missed too
History: the framework tablet audit (reports/tablet-breakpoint) used the same geometry only method; his notes on that page have not come back yet.
Chosen cause: 1 and 2 together. The checks only covered geometry, and the reading of "his choices" waved through what the checks did not cover.

## Layer
Layer: 2
Why not earlier layers: the source is the check scripts. Layer 1, no stale line to delete, the instruction is right and was misread; it is now answered by the parity checks themselves.
Replaces: n/a

## Check
Check: node reports/haven-tablet/verify.mjs (F2 to F12, eight runs) and node reports/haven-tablet/media.mjs 768,1024,1180,1440 (sharpness on a 2x screen)
Result on bad output: FAIL. verify.mjs: "55 problems" (F2, F4, F5, F6, F8, F10, F11, F12 at every width that has them). media.mjs: "32 soft images", up to 7.98x at 1024.

## Change
Files changed: reports/haven-tablet/verify.mjs (F2 to F12 checks), reports/haven-tablet/media.mjs (new, pass or fail), reports/haven-tablet/GATES.md (round 2 gates run both, so the unlazy Stop hook holds a done claim while they fail)
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done. The proof so far is the same context: the checks fail on the bad page and pass on the fixed one.
Before: verify.mjs 55 problems; quiz phone held 0 scroll steps at 768 and 1024
After: verify.mjs 8 problems, all F12 (ending bar, shared stylesheet, waiting on his call); quiz phone holds 6 steps at 768 and 1024, as at 1440
Check result after: PASS for F2 to F11 except F7 and F9 (need sharp exports); FAIL kept on purpose for F12 and media until those land
Second case: not run. The home and framework pages have no equivalent of these checks yet.
Enforcement test: n/a

## Report
Unverified: a fresh session auditing another page with these scripts has not been run, and the scripts are Haven specific. To close it: run a fresh session on the framework page's tablet audit with an equivalent media and parity check and see whether it finds what he would. Media sharpness needs 2x exports from his Figma (the Figma connector is on a view seat that hit its limit).
