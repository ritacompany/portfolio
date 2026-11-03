# Fix: connections block sketch drew Pathways as week sized and the gap as a big overrun

Status: not verified

## Evidence
Bad output: reference/cs2/sketches/connections-concepts.html, version 2 (commit dddccc8). Five Pathway brackets each about one week wide under a six week ruler; target and pace drawn at the far end of the whole line with an orange "behind" the width of half a week.
Expected: a Pathway spans many weeks (one Pathway at a time, in order; a Pathway can run up to about 40 weeks), so a week is a thin slice of one Pathway. Target and pace are dates, and the gap the person sees is a few days, shown on the Action Hub and the Growth Journey page.

## Chain
Input: the facts were in the repo: reasoning/pathways-and-hierarchy.md line 19 (one pathway at a time, in order), reasoning/dossier-findings-22oct.md line 88 (pathway cap about 40 weeks), versions/map-and-falling-behind.md Map C (two days ahead or three behind).
Instruction: his global CLAUDE.md, Design work: read the research and flows first, decide and share the concept before building.
Loaded: CLAUDE.md was loaded; none of the three reasoning files was read before drawing. The brief from the parent session described the concept (route as one line cut into weeks) without scale.
Conflict: the brief's concept wording invites compressing the whole route into a few weeks; nothing in it says how long a Pathway runs.
Enforcement: none. Concept first and read first are written requests.
Check: none ran on the drawing's facts; the browser look checked overlaps only.

## Causes
- Cause 1: drew from the brief, not the record, so scale was invented | For: no reasoning file opened before either sketch round; the 40 week cap and days sized gap were both in the repo | Against: none
- Cause 2: skipped the concept sentence, so a wrong mental model reached a build twice | For: CLAUDE.md asks for it; both rounds went straight to SVG | Against: a concept sentence alone would not have carried the scale facts unless the record was read
History: none for diagrams. The concept first rule already exists and was skipped, so restating it is a failed experiment.
Chosen cause: Cause 1; the wrong picture follows directly from the missing scale facts.

## Layer
Layer: 2
Why not earlier layers: 1, no two sources conflict outright; the brief is incomplete rather than contradicting.
Replaces: n/a

## Check
Check: reviewer question on the drawing: does any week look as long as a Pathway, or does the ahead or behind gap read as more than a few days?
Result on bad output: FAIL. Pathway 1 to 5 brackets sit roughly one per week; the behind gap is half a week wide at the end of the whole route.

## Change
Files changed: reference/cs2/HANDOFF.md (connections block line now carries the scale facts any drawing of it must honour, with their sources)
Instruction lines: +1 / -0
Net growth reason: the facts were missing from the brief that started this block; they belong where the next session starts.

## Verification
Fresh run: not run, to save weekly usage.
Before: dddccc8 sketch.
After: pending; the next drawing follows a concept sentence he corrects first.
Check result after: not run.
Second case: not run.
Enforcement test: n/a

## Report
Unverified: no fresh run. He is the check for now: the next sketch goes to him only after he approves a one sentence concept, and he can ask whether a week looks as long as a Pathway.
