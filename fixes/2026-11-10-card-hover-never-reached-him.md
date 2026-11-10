# Fix: the work card hover he specified on 9 Nov never reached the preview

Status: not verified

## Evidence
Bad output: the preview on 10 Nov showed proposal R3 only, an instant swap with no motion and no fill near
the middle: `.work-card:hover .work-card__media .button-sm { opacity: 1; }` (site/dev/preview/proposals.css).
His words on 10 Nov: "this is probably the fourth or fifth maybe even sixth time I've said this".
Expected: at rest the image only; on hover the black layer and Learn more come in; with the pointer near
the middle Learn more switches to its filled state.

## Chain
Input: yes. His spec is quoted in docs/motion/card-hover/style_guide.md (9 Nov).
Instruction: SITE_BUILD_PLAN.md step 3, "Work card hover", with the module in site/motion-lab/card-hover/.
Loaded: the plan was read by later sessions; they worked steps 1 and 6 (hover highlight, phone layouts).
Conflict: SITE_BUILD_PLAN.md step 3 says "He sees nothing until the review passes", which kept it off the
preview, while R3 put a different static version on the preview the same day.
Enforcement: none. scripts/build-preview.mjs excludes site/motion-lab, so the module could not reach him.
Check: none on the preview output for the card hover.

## Causes
- Cause 1: the module lived in site/motion-lab, which the preview build leaves out | For: build-preview.mjs filters out motion-lab; the module was never copied to site/dev/preview | Against: a session could still have moved it by hand
- Cause 2: the motion pipeline had to pass renders and review rounds before he could see anything, and each session picked a different step first | For: plan step 3 wording; the lab page and renders were never made | Against: other motion pieces did finish that pipeline
History: none for this piece.
Chosen cause: both; cause 1 is the mechanical one, cause 2 is why nobody moved it.

## Layer
Layer: 3
Why not earlier layers: 1, the two versions (R3 and the lab) are now one; 2, the build script is right to
leave the lab out.
Replaces: n/a

## Check
Check: node .unlazy/home-motion/check.mjs <preview build> hover
Result on bad output: FAIL (page.waitForFunction timeout, no home motion on the old preview build)

## Change
Files changed: site/dev/preview/home-motion.js, home-motion.css (new, injected by build-preview into every
preview page); R3 hover rules removed from proposals.css.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done. Same session built and checked it.
Before: R3 instant swap, no near fill.
After: HOME_MOTION_OK hover (rest clear, overlay 0.5 and outline on hover, fill within 150 px of the middle,
clear on leave).
Check result after: PASS
Second case: Haven card, same code path; not separately checked.
Enforcement test: n/a

## Report
Unverified: whether a fresh session keeps preview work in site/dev/preview. He tries the hover on the
preview and says whether it is right.
