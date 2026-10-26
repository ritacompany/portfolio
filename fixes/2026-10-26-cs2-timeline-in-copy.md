# Fix: dates and timelines keep appearing in CS2 copy after he ruled them out

Status: verified

## Evidence
Bad output: Spec 1, 24 Oct (v6), section 9 block 1: "Everything so far assumes the work gets done. For two years, my answers to unfinished work kept failing." Cards "2024 | Daily quotas", "2025 | Never overdue", "Early 2026 | Move or add". Section 8 block 2: "The 2025 manual integration". Section 11 block 2: "In March, believing each Pathway held too few Action Items".
Expected: no years, months or spans of time in copy. Explain what the design is, how it works and why, without dates.

## Chain
Input: the agent had the rule.
Instruction: reference/cs2/CS2_PROCESS.md, Timeline and framing: dates stay out of the copy until he decides how the piece handles time.
Loaded: CS2_PROCESS.md is the process file every CS2 session reads; the rule was available and v6 still used dates.
Conflict: the dossiers record decisions with dates and the dossier frame asks how a decision changed over time, which hands the drafter a timeline.
Enforcement: none. check-copy.mjs, which the copy guard hook runs on every copy save, had no date check.
Check: none for dates.

## Causes
- Cause 1: the rule lived only as process text and nothing enforced it | For: the rule predates v6 and v6 broke it in three sections | Against: none found.
- Cause 2: the source material is dated and organized as history | For: dossier entries carry dates and Q5 how it changed | Against: section 7 used the same dossiers without dates, so the source alone does not force it.
History: he has raised timelines in copy several times; the process text rule was the earlier attempt and it failed.
Chosen cause: Cause 1.

## Layer
Layer: 2
Fix the source: the checker the existing hook already runs on every copy save.
Why not earlier layers: 1, there is no conflicting line to remove; the rule is right, it was just not enforced.
Replaces: nothing; the process text rule stays as the reason, the check enforces it.

## Check
Check: check-copy.mjs reports "date or timeline" for any year, month name, "May" followed by a number, or span of years or months.
Result on bad output: FAIL on v6 section 9 (lines 6, 8 and 10 flagged).

## Change
Files changed: reference/cs2/check-copy.mjs (one check), reference/cs2/test-check-copy.mjs (three cases: year, month, span).
Instruction lines: +0 / -0
Net growth reason: no instruction text added.

## Verification
Fresh run: check-copy run on v6 section 9 extracted from Spec 1 and on a clean block that uses "may" as a verb and "after weeks away".
Before: v6 section 9 saved with no date problem reported.
After: v6 section 9 fails with three date or timeline lines; the clean block reports none.
Check result after: test-check-copy.mjs passes, including the three new cases; test-copy-guard.mjs passes.
Second case: the clean block, which must not be flagged, is not flagged.
Enforcement test: the copy guard hook runs check-copy.mjs on writes to reference/cs2/copy/section-N.md (cs2-copy-guard.mjs line 68), so a save with a date is refused.

## Report
Verified for copy saved through reference/cs2/copy/. Copy typed straight into Figma or a spec block bypasses the hook; the read-only Figma script can run the same check on the frame when needed.
Unverified: copy written straight into Figma or a spec block, which no hook sees.
