# Fix: flower options came back as line drawings when he expected real photos

Status: not verified

## Evidence
Bad output: the flower pick sheet, versions 1 and 2, showed nine hand drawn SVG line sketches ("Quick line sketches to pick a direction, not finished art").
Expected: real pictures of each flower, so he can judge the actual flower. His words, 18 Nov: "I was expecting it to give me, like, visual, like, actual flower options, like pictures, not just illustrations."

## Chain
Input: the task brief said "Show 4 to 6 options ... with an image of each" and, for the coral, "each with an image or a quick sketch". Photos were reachable (Wikimedia Commons worked once tried).
Instruction: the brief asked for an image. Nothing defined image as photo or drawing.
Loaded: the brief was read in full at the start.
Conflict: the 9 Nov Plan B session brief says "No image generation before the direction is settled and he approves a dollar quote per batch." The agent read that limit as covering all images and drew SVGs to avoid cost. It covers AI generation, not free reference photos.
Enforcement: none. The choice of medium was left to the agent.
Check: nothing compared the sheet's medium to what he expected before it reached him.

## Causes
- Cause 1: the agent stretched the AI generation cost rule to cover free photos | For: it chose sketches straight after recalling that rule; "image or a quick sketch" in the brief let sketches pass | Against: the brief said image for the right side, which leans toward photos
- Cause 2: the handoff and brief never said what form the options should take | For: HANDOFF.md "Next: flowers" said "explore and suggest" with no format, and the parent brief allowed sketches | Against: a careful reading of "image" could still have reached photos
History: no earlier fix record on this. The 9 Nov cost rule exists and is right for AI renders.
Chosen cause: both. The fix goes at the source the next session reads first, which is the handoff.

## Layer
Layer: 2
Why not earlier layers: 1 does not fit because the cost rule is correct for AI renders and stays.
Replaces: n/a

## Check
Check: yes or no question for a reviewer, put to the next flower deliverable: "Does every flower option on the sheet show a real photograph of that flower?"
Result on bad output: FAIL. Versions 1 and 2 of the sheet held SVG drawings only.

## Change
Files changed: prototypes/hero-sketch-reference/HANDOFF.md (the flowers section now says options are shown as real photos, free from Wikimedia Commons, and that AI renders need a dollar quote)
Instruction lines: +1 / -0
Net growth reason: the handoff had no line about the form options take. This line separates free photos from paid renders, which is what the agent got wrong.

## Verification
Fresh run: not run. The redo in this session (version 3 of the sheet, real photos) was made by the same context that found the cause, so it does not count as a fresh run.
Before: version 2, SVG line sketches
After: version 3, photographs from Wikimedia Commons with licences linked
Check result after: PASS on version 3 for this session's output only
Second case: not run
Enforcement test: n/a

## Report
Unverified: no fresh session has done a flower or reference task from the updated handoff yet. Run one and ask the check question of what it hands back.
