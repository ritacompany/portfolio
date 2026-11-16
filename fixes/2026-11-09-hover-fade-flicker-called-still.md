# Fix: hovers were reported as "nothing moves" while every one of them flickered

Status: verified

## Evidence
Bad output: I told him "every hover on the preview is now only the text color and the light block ... All 55 hovers pass with nothing moving." He then saw "some kind of flicker ... when I move away", text that "almost feels like it's lifting", and some links with no change at all.
Expected: a highlight that swaps from rest to hover and back in one frame, with nothing in between, and an honest list of the links that have no hover.

## Chain
Input: yes. The Phase 2 easing (200 ms on background and colour) was in components.css, and I had read it.
Instruction: .claude/motion-rules.md, Scope: the rules cover "interactive UI motion such as a hover or press effect on a button", which get a scripted pointer and frame by frame review. A 200 ms colour fade is motion under that line.
Loaded: the rules were read for the card hover in this same session, but not applied to the link hovers, which were treated as static styling.
Conflict: none in the files. The Phase 2 session had added the easing as "hover reads as one system" without a review, and I treated its output as settled.
Enforcement: scripts/verify-hover-still.mjs compared letter positions only at rest and fully hovered. Nothing looked at the frames in between.
Check: counting the colours a link shows on each animation frame while the pointer arrives and leaves. That count was 12 states for every highlight (10 in between); it should be 2.

## Causes
- Cause 1: the check measured the end states only, so a fade with low contrast frames in between passed. | For: frames.cjs counted 12 states per link going in and out; verify-hover-still passed the same build. | Against: none.
- Cause 2: the 200 ms easing was never reviewed as motion. | For: motion-rules scope names hover effects; no review log exists for the easing. | Against: a review would have needed someone to judge a 200 ms fade as a flicker, and a frame count makes that mechanical anyway.
History: fixes/2026-11-09-phase-3-built-without-his-checkpoint.md (no check-in) and the hover geometry check from earlier today, which tested letter positions but not frames in between.
Chosen cause: Cause 1. The check that gates the preview could not see the problem, so the preview went out with it and I reported it as clean.

## Layer
Layer: 4
Why not earlier layers: 1, nothing conflicts. 2, the source (the easing) is fixed too, but without a check the next eased hover comes back the same way. 3, order is not the problem. The check runs outside me: scripts/build-preview.mjs refuses to build the preview when it fails.
Replaces: n/a

## Check
Check: node scripts/verify-hover-still.mjs <preview dir>. It fails any hover that moves a letter, and any hover that shows a colour between rest and hover in the 400 ms after the pointer arrives (work cards and the Contact button excepted, as separate motion pieces).
Result on bad output: FAIL. On the earlier build with the fades, 35 hovers fade through in-between frames (Haven nav links through 16).

## Change
Files changed: site/dev/preview/proposals.css (highlights, rows and the Small button fill swap at once; Haven's nav colour swaps at once), scripts/verify-hover-still.mjs (the in-between frame count), this record.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: scripts/build-preview.mjs on the fixed proposals runs the check itself and builds (HOVER_STILL_OK 55 hovers). frames.cjs, a separate script, counts 2 states (rest, hover) going in and out for the nav, footer links, email, LinkedIn and Back to top.
Before: 12 states going in and 12 going out on each.
After: 2 and 2.
Check result after: PASS. HOVER_STILL_OK 55 hovers.
Second case: Haven's nav, which faded through its own 0.3 s rule from haven.css: it failed the new check (16 in-between frames) until its colour swap was made instant, then passed.
Enforcement test: the preview build refused a build while the Haven nav still faded ("preview refused: a hover moves something").

## Report
Unverified: whether the instant swap feels right to him. That is his call on the preview link. Side effect for him to judge: Haven's nav now turns dark over the bridge at once instead of over 0.3 s. Links with no hover at all, by measurement: the cw logo on every page, the three links in the bar at the end of each case study, and Haven's skip link (keyboard only).
