# Fix: the four CS2 reader checks give different verdicts on the same copy

Status: verified

## Evidence
Bad output: calendar screen version 2, run 2 of 26 Oct: "V2: 1 PASS. 2 PASS. 3 PASS. 4 PASS." Run 3, with one word changed ("Nothing is ever marked missed" became "No item is marked missed"): "V2 ... 4 FAIL: 'reschedules the same way' and the dimming/'drops the time' restate the known passed-time behavior." The same sentences passed check 4 one run earlier. Across six runs on the calendar block the flagged sentences moved each time, and each round of fixes produced a new set of flags.
Expected: the same copy gets the same verdict, so a fail points at a real sentence and fixing it ends the loop.

## Chain
Input: each run got a prompt Claude wrote fresh in chat, with a hand summarised "reader already knows" paragraph that changed between runs (some named the reschedule icon, some did not; some said overlap inside a block does not count, some did not).
Instruction: the four checks exist in fixes/2026-10-26-cs2-content-selection.md, as one line each.
Loaded: yes, the questions were pasted each time, reworded each time.
Conflict: none found in: the fix record, HANDOFF.md, the canvas notes.
Enforcement: none. A single reviewer gave one free text verdict per version; one run decided pass or fail.
Check: nothing compared two runs on the same text.

## Causes
- Cause 1: the input varied. The known facts and the check wording were rewritten by hand for every run | For: the six prompts differ in what the reader is told; run 3 newly counted the passed time behaviour as known, which earlier prompts phrased differently | Against: run 2 and run 3 had near identical prompts and still disagreed on version 2.
- Cause 2: the verdict was one sample of a free text judgment per version, so any one sentence a reviewer disliked failed the whole version | For: flags landed on different sentences in each run on unchanged text | Against: none found.
- Cause 3: check 4 asks about repetition with no list of what counts as known | For: most flips were on check 4 | Against: check 2 also flipped.
History: fixes/2026-10-26-cs2-content-selection.md created the four checks the same day; this is their first test across several runs.
Chosen cause: causes 1 to 3 together; the input, the unit of judgment and the decision rule all varied.

## Layer
Layer: 2
Why not earlier layers: 1, nothing conflicts; the checks are right, the way they are run is not.
Replaces: n/a

## Check
Check: run the reader check twice, three reviewers each time, on the same copy, and compare the combined verdicts. Pass when both triads give the same PASS or FAIL per version and the same flagged sentences.
Result on bad output: FAIL. The old single run method gave version 2 PASS on run 2 and FAIL on run 3 on near identical text.

## Change
Files changed: reference/cs2/reader-check/prompt.md (fixed reviewer instructions, per sentence yes or no answers in a set format), reference/cs2/reader-check/known-calendar.md (a fixed list of what the reader knows, with the approved copy quoted), reference/cs2/reader-check/number.py (numbers every sentence), reference/cs2/reader-check/aggregate.py (a flag stands only when most runs give it).
Instruction lines: +0 / -0 in process docs; the reviewer prompt replaces the questions retyped in chat.
Net growth reason: n/a

## Verification
Fresh run: twelve fresh sub-agents, each given only prompt.md, a KNOWN file and a numbered COPY file. Outputs kept in reference/cs2/reader-check/runs/2026-10-26/.
Before: six single runs on the calendar block, each with different flags (see Evidence).
After: triad A and triad B on the same calendar text gave identical combined results: "V1 PASS / V2 FAIL V2.S1 Q2 (3/3) schedule view / V3 FAIL Q1 no decision, V3.S1 Q2 (3/3) schedule view". Every flag that stood was unanimous.
Check result after: PASS. The two triads agree exactly. After fixing the three flagged sentences, triad C on the new text: "V1 PASS / V2 PASS / V3 PASS", with no minority flags.
Second case: the approved calendar setup copy with known-setup.md, triad D: "V1 FAIL V1.S1 Q2 (3/3) Calendar sync". Unanimous, and a real gap: the copy opens with calendar sync without saying what it is. So the check still fails copy that deserves it.
Enforcement test: n/a

## Report
Unverified: stability was shown on two blocks only. The KNOWN file is written by Claude from approved copy, so a wrong or missing fact there would skew check 4; it needs updating whenever an earlier block's approved copy changes.
