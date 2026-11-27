# Fix: the filled in ending came out as a wall of text with the numbers buried

Status: verified

## Evidence
Bad output: reference/cs2/review-2026-11-07/ending-filled-preview.html at a84333c. A 96 px headline of 30
words, an eight row chart, then two paragraphs of 87 and 56 words: "Before the first session I wrote down what
would count as a fail: four or more of the eight giving under 70 percent of their number in both weeks. Two
did. The other two tests held as well. Shown the two dates with no explanation, seven of eight predicted..."
No large numbers anywhere. His words: a wall of text, Haven's ending is two or three lines high, the whole
point is to show the numbers, and no research into how case studies end with numbers.
Expected: the numbers as the visual, large, with short labels, and text no taller than Haven's ending.

## Chain
Input: everything needed was in the repo. build/ holds ten Metalab rebuilds; seven end on a results block of
three large numbers with short labels. Haven's ending is in portfolio-haven/site/haven. versions/ending.md
round 3 records his earlier note: look at how Haven ends, short and simple.
Instruction: WORKING_LOOP, Layout per version: pick a layout from his pool, never invent a layout.
Loaded: yes. WORKING_LOOP was read at the start of the turn. build/ and Haven's ending were not opened.
Conflict: ending-research.md, Form check: "any numbers in CS2 sit in a sentence or a chain, never a stat
row." The test plan repeated it: "numbers sit in a sentence, never a stat row." Both written by sessions,
not by him. They point away from the standard results form and toward paragraphs.
Enforcement: none. Nothing makes a session open the reference endings before designing one.
Check: none ran on shape. The checks that ran (fills, dashes, parts) all passed on the bad output.

## Causes
- Cause 1: the Form check line in ending-research.md ruled out a stat row, so the numbers went into sentences | For: the draft says "numbers sit in sentences and one chart, never a stat row (Haven owns the stat block)", copied from that line | Against: it does not explain the length; a sentence based ending could still be short
- Cause 2: nothing a session reads states the ending's length, so no reference set the height to match | For: no Read of build/ or Haven's ending before the draft; fresh run 1, with the form fixed, still wrote 120 words | Against: versions/ending.md round 3 holds his short and simple note, but as history, not as a rule in the file every ending session reads
- Cause 3: the deep research brief covered which numbers to collect, not how endings look | For: none of the three research topics asked for visual examples | Against: his second ask was a design, which needed references regardless of the brief
History: versions/ending.md round 3 (5 Nov) already records "these are stories, not an ending. Look at how
Haven ends: short and simple." The same failure, length and story over a short ending, happened before, and
the note did not prevent it.
Chosen cause: causes 1 and 2 together. Cause 1 is a stale line in a file every ending session reads, and it
steered the form; fresh run 1 proved cause 2, the missing length, was also needed.

## Layer
Layer: 1
Why not earlier layers: layer 1 is the first layer. Both causes sit in one line of ending-research.md, the
file every ending session reads: the stale rule is replaced and the same line now carries the length he set.
Replaces: n/a

## Check
Check: node "<notes>/ending-v2/ending-shape-check.mjs" <file.html>. Pass needs at least 3 large numbers
(class stat__num), at most 45 words of text outside them and no single block over 25 words. Lives in the
shared notes folder for this session group, outside the repo.
Result on bad output: FAIL. "SHAPE_FAIL big numbers 0, need at least 3; text outside the numbers 212 words,
max 45; longest text block 87 words, max 25"

## Change
Files changed: reference/cs2/review-2026-11-07/ending-research.md (Form check line rewritten to say numbers
on the ending are shown large, in the Metalab results form, and why the old line was wrong);
reference/cs2/review-2026-11-07/ending-test-plan.md (the matching line and "in words" removed);
ending-filled-preview.html and ending-filled-example.md redone.
Second change, after fresh run 1: the Form check line also states the length, Haven's ending, his call 12 Nov
(a one or two line title, labels of a few words, a two line close, about 45 words outside the numbers).
Instruction lines: +10 / -5 (ending-research.md Form check 3 lines become 7; test plan 2 lines become 3)
Net growth reason: the old line carried one wrong rule (no stat row); the new one carries the form and the
length he set, plus one line naming this record so the next session does not restore the old rule. Fresh
run 1 shows the form alone was not enough.

## Verification
Fresh run: two Sonnet sub-agents, each given only the project files and his original ask, told not to open
the preview, the example md, fixes/ or each other's output. Run 1 after the first change, run 2 after the
second. Output in the session scratchpad, fresh-run/ and fresh-run-2/.
Before: my v1, SHAPE_FAIL big numbers 0; text 212 words; longest 87. Fresh run 1 (form fix only):
SHAPE_FAIL a stat label over 12 words; text outside the numbers 120 words; longest text block 47 words.
After: fresh run 2, good results: "Eight people lived two real weeks with the plan. | 7 of 8 gave within a
fifth of the hours they typed | 1 of 8 fell under half their hours in any week | 6 of 8 predicted a short
week moves the pace, not the target | One number held up across the plan. Next I would test it over a month."
Check result after: PASS. "SHAPE_OK numbers 3, prose 24 words, longest 15"
Second case: the same run's bad results ending, a broken capacity decision: "SHAPE_OK numbers 3, prose 29
words, longest 17". Modelled on Haven's ending plus the Ro results strip, by its own account.
Enforcement test: n/a

## Report
Unverified: the fresh runs prove the source now steers a session to the right shape; nothing forces a session
to read ending-research.md before drafting an ending, and the shape check is not wired to a hook. If he wants
it enforced, the next step is running ending-shape-check.mjs from the canvas publish guard, his call. The
reader check has not run on the ending copy.
