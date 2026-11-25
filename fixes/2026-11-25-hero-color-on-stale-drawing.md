# Fix: hero palette test was painted on the old drawing, missing every part decision

Status: not verified

## Evidence
Bad output: refs/palette-test-1.png (sent 25 Nov). Big placeholder flower circles still on the coral tips, chunky coral, a cone planter, plain rectangles for the box and connector, ellipse rings for the spring, one wire spray visible, and color assigned one family per cluster: "the cords are all green, and so is the box that they go into ... the little connector things at the top ... they're green, just like the cords in the box." Chadwick: "do you not redraw this at all before putting in the color? ... stuff has been missed."
Expected: a drawing that shows every decision in HANDOFF.md (no coral tip flowers, slim precious coral, sorrel on the surface, chrome wire spray on the forks, coupling rings and rims on the pipe, a little pot, lever connector, cat toy spring, control box with windows, collar plugs, ribbed boot grips, nodding hellebores, noodle puffs), then several color versions where colors are spread, not grouped by part cluster.

## Chain
Input: yes. HANDOFF.md listed every decision, and the 18 Nov entry already said "Coral (changed 18 Nov): no flowers on the branch tips."
Instruction: HANDOFF.md "Next" still said "Build the flowers into build.py in place of the placeholder circles", and the parts section added a "detailed sketch" step, but no line said the drawing must be updated before color. The session brief said "Do not change the drawing or build.py unless he asks."
Loaded: yes, HANDOFF.md was read at the start of the session and edited throughout.
Conflict: the brief's "do not change the drawing unless he asks" against HANDOFF's "Build the flowers into build.py" as the next step. I followed the brief and then used the unchanged build.py as the base for the palette test anyway.
Enforcement: nothing. The palette test imported build.py directly; no check compared the drawing against the decision list.
Check: none. A script listing each HANDOFF decision and testing the drawing for it would have failed on placeholder circles, missing rings and the single spray.

## Causes
- Cause 1: the color test was built on build.py, which no step forced to match the decisions | For: palette-test-1 imports build.py unchanged; the coral tip circles came straight from its BIG2 list | Against: none found
- Cause 2: color was assigned by part cluster (all cables plus box one color) with no distribution rule tested | For: the table I sent put "green: box, thick cables, stems" as one role | Against: the roles idea itself came from my own strategy message, which he had not rejected
History: fixes/2026-11-17-hero-reference-cables-outside-pipe.md, same drawing, a geometry check added then (check_cables.py). That check passed here because it only covers cables.
Chosen cause: both. Cause 1 put stale shapes on screen; cause 2 produced the clustered color.

## Layer
Layer: 2
Why not earlier layers: layer 1, the conflict was the brief versus HANDOFF; he has now asked for the redraw, so it is resolved by his request, but the base file still needs fixing.
Replaces: n/a

## Check
Check: prototypes/hero-sketch-reference/check_v6.py. Modes: decisions (every HANDOFF decision present in the drawing), cables (all cables inside the glass), spray (each wire spray visible in the render), spread (each palette: no touching parts share a color family, every family on both legs, no family over its area cap).
Result on bad output: FAIL (run against build.py, see Verification)

## Change
Files changed: prototypes/hero-sketch-reference/build_v6.py (new drawing with every decision), check_v6.py (new), GATES-v6.md (new), HANDOFF.md (Next line replaced; old-drawing line marked superseded)
Instruction lines: +1 / -1 (HANDOFF Next line replaced)
Net growth reason: n/a

## Verification
Fresh run: not done. The new drawing and palettes were made in the same session that wrote the check.
Before: build.py: `python3 check_v6.py decisions build.py` prints "BAD missing ['SORREL', 'FORKS', 'HELLEBORE', 'GRIPS']"; the palette-test-1 color assignment fails the touching rule on 14 pairs (box/collar, box/glow, cable1/grip1, cable2/grip2, cable3/grip3, levers/wire1 and more).
After: build_v6.py: DECISIONS_OK, CABLES_OK, SPRAY_OK, SPREAD_OK (GATES-v6.md G1 to G5 met, G5 is the control that the old drawing fails).
Check result after: PASS on all four modes.
Second case: three palettes (a-periwinkle, b-pink, c-green) each pass spread and spray separately.
Enforcement test: n/a

Follow up 25 Nov: he said the flowers had lost their size and looked droopy. The v6 redraw had shrunk them below the old layout (hellebore r 76 against the old r 95) and hung the hellebores straight down, breaking his rule that flowers hold their own next to the pipe and nothing leans oddly. The decisions check now also tests size against the pipe width and that hellebores face out at 30 to 70 degrees. The rejected drawing fails it ("hellebore r 76 small next to a 104px pipe", "hellebore tilt -18 hangs or stands"); the new one passes.

## Report
Unverified: no fresh session has made a color test from HANDOFF.md alone to show it picks up build_v6.py and runs check_v6.py. Nothing outside the agent forces the check before he sees a test; the HANDOFF Next line is the only pointer. A real guard would be a hook that blocks publishing a hero color image unless check_v6.py passed, which he would need to want.
