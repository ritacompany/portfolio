# Fix: schedule view versions built from research findings, not from what the case study set up

Status: not verified

## Evidence
Bad output: reference/cs2/reader-check/runs/2026-10-28/sv3.txt, version 3 notes "No deadline per item" and "No moving on its own", and no version saying what calendar integration is (a one way sync that reads the person's calendar and never writes to it).
Expected: a block that pays off the calendar integration the Background (frame y 1510) and the Motion card (frame y 2863) set up: what the sync is, that it only reads, and that it suggests where work fits as a tool beside the plan.

## Chain
Input: the drafting inputs were the three research notes and known-schedule.md. Neither held his frame copy above the block; the Background and Motion lines were never read before drafting (frame copy first pulled 28 Oct, after he flagged it).
Instruction: README step 2 said to use the KNOWN file; nothing said where its contents come from.
Loaded: known-schedule.md was loaded; it listed product facts K1 to K7 only.
Conflict: none found in: prompt.md, README.md, known-schedule.md, HANDOFF.md.
Enforcement: nothing requires the frame copy above a block as a drafting input.
Check: the reader check tests unknown terms and restatement against KNOWN, so a version that ignores an earlier setup passes.

## Causes
- Cause 1: the KNOWN file, the one input shared by drafting and checking, lacked the setups earlier blocks made | For: P1 and P2 were absent from known-schedule.md; all three versions skip the one way sync | Against: research notes did mention read only sync, so the fact was available
- Cause 2: research findings were used as the source of claims, producing refusals (per item deadline) no reader would expect | For: version 3 notes trace to Buehler 1994 and Dietvorst 2018, not to a product decision visible on the screen | Against: those refusals do trace to his record
History: fixes/2026-10-26-reader-check-unstable.md fixed run to run variance, not content selection.
Chosen cause: cause 1; it explains both why the setups were missed and why the check passed them.

## Layer
Layer: 2
Why not earlier layers: no conflicting source to remove (layer 1 does not apply).
Replaces: n/a

## Check
Check: added Q5 to prompt.md for three sonnet reviewers: does the version leave a P promise unpaid. Ran on sv3_num.txt with P1 and P2 in KNOWN.
Result on bad output: did not FAIL. Y1 to Y3 gave V2 Q5 yes once, all else no, so aggregate passes all three versions. A reviewer cannot tell what content is missing from a promise worded this loosely. Q5 was reverted.

## Change
Files changed: reference/cs2/reader-check/known-schedule.md (P1 and P2 from his frame text), reference/cs2/reader-check/README.md (step 2 names the frame text as the source of promises)
Instruction lines: +1 / -0
Net growth reason: step 2 had no source for KNOWN contents; the line replaces memory and research notes as that source.

## Verification
Fresh run: not done. Needs a fresh subagent to draft the schedule view block from the project files with the updated known-schedule.md, then his read.
Before: version 3 note "No deadline per item"
After: not run
Check result after: no output check exists that FAILs the bad output; his read is the check
Second case: not run
Enforcement test: n/a

## Report
Unverified: no automatic check catches a missing payoff. Until one exists, he reads each block against the frame copy above it. Fresh drafting run still to do.
