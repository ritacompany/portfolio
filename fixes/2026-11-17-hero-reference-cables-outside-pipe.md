# Fix: hero reference drawings showed cables running outside the glass pipe

Status: not verified

## Evidence
Bad output: version 3 and the "cable options" sheet (prototypes/hero-sketch-reference). Cables leave the power box, arc through open air across the inside of the bend and re-enter the pipe. Chadwick: "there's cables that are overlapping with the tube, like they're going outside of it."
Expected: every cable stays inside the tinted pipe, except where the drawing deliberately shows it leaving (above the right riser's mouth into the sockets, or through a drawn hole). The box keeps its size and position.

## Chain
Input: yes. His sketch and his notes (box position, half in or fully out with a hole) were in the conversation.
Instruction: no instruction about cable routing existed. The cables were hand-written bezier paths in build.py with control points picked by eye.
Loaded: n/a, build.py was the source each time.
Conflict: none found in: build.py, variants.py, variants2.py, variants3.py.
Enforcement: nothing. Each version was checked only by looking at one screenshot.
Check: none existed. A containment test on the path geometry would have flagged it in version 1.

## Causes
- Cause 1: cable curves are free beziers not tied to the pipe geometry, so moving the box or pipe leaves them crossing walls | For: check_cables.py finds 68 points outside the glass in version 3, starting at (450,1050) where the curve rises above the pipe's top wall | Against: none found
- Cause 2: I reviewed screenshots at small scale and fixed only the element he named each round | For: he flagged the same box area across four rounds while the cable crossing stayed in every one | Against: a closer look would still be a person checking, not a guarantee
History: no earlier fix records for the hero reference.
Chosen cause: Cause 1. The path data is what produces the crossing, and it is measurable.

## Layer
Layer: 2
Why not earlier layers: layer 1, there is no conflicting source to remove.
Replaces: n/a

## Check
Check: prototypes/hero-sketch-reference/check_cables.py samples every cable path and fails if any point lies outside the pipe outside the allowed zones. Run `python3 check_cables.py` for version 3, and variants4.py runs it on both new options while drawing them.
Result on bad output: FAIL. "version 3: OUTSIDE 68 points, e.g. (450,1050)"

## Change
Files changed: prototypes/hero-sketch-reference/check_cables.py (new), prototypes/hero-sketch-reference/variants4.py (new, routes cables along the pipe and runs the check)
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done. The new options were drawn in the same session that wrote the check.
Before: version 3, OUTSIDE 68 points
After: halfway: CABLES_INSIDE_OK, outside: CABLES_INSIDE_OK
Check result after: PASS. "ALL_OK"
Second case: the "outside" option, with a different route through a grommet, also passes.
Enforcement test: n/a

## Report
Unverified: no fresh session has redrawn the reference using the check. build.py (version 3) still fails the check until he picks an option and it is folded in.
