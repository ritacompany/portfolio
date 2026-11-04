# Fix: CS2 sessions sent to the Mondai MVP file for screens that are in his portfolio frame

Status: verified

## Evidence
Bad output: the Pathway page session called use_figma on file 5RO0m4bYYrTvbiaOgaU3tI (the Mondai MVP file) to read frame 2670:11674, hit the View seat call limit, and reported "MVP file: I didn't read it. The figma-mondai View seat hit its limit". He asked why it was going through that channel at all.
Expected: the session reads the Pathway page screen from his portfolio frame 4269:9433 (block 4811:27970), where it already sits, and never touches a Mondai file.

## Chain
Input: yes. The screen is in his portfolio frame (Pathway block image, read 3 Nov).
Instruction: WORKING_LOOP.md line 53 said to decide visuals "from how the Mondai designs actually work (his desktop MVP folder in Figma)". HANDOFF.md Next action item 1 said "The screen is in his MVP file (... frame Pathway page 2670:11674)" and a later line said "His Mondai MVP screens: file 5RO0m4bYYrTvbiaOgaU3tI ... read it sparingly". The parent session's brief repeated that.
Loaded: yes, both files read first, as CLAUDE.md requires.
Conflict: his correction (3 Nov) that the case study is not built from any Mondai file. CS2_PROCESS.md line 202 still calls the live MVP file product truth for truth.json snapshots; WORKING_LOOP wins over CS2_PROCESS per CLAUDE.md, left for his call.
Enforcement: none. The pointers were followed because they were the only ones given.
Check: a grep of the two resume files for MVP file pointers.

## Causes
- Cause 1: stale pointers in WORKING_LOOP.md and HANDOFF.md | For: both named the MVP file; the session went exactly there | Against: none found
- Cause 2: the parent session's brief | For: it named the file and frame | Against: the brief copied HANDOFF.md, so it is downstream of cause 1
History: none for this pointer.
Chosen cause: cause 1, the source the brief was copied from.

## Layer
Layer: 1
Why not earlier layers: layer 1 is the first; a stale line is misleading, so it is removed.
Replaces: n/a

## Check
Check: grep -nE "MVP folder|MVP file|5RO0m4" reference/cs2/WORKING_LOOP.md reference/cs2/HANDOFF.md, PASS when no match.
Result on bad output: FAIL, WORKING_LOOP.md:53 "desktop MVP folder in Figma" and HANDOFF.md:28 "The MVP file copy is gone." (the two other HANDOFF pointers were removed earlier the same turn, commit 78d9ae6).

## Change
Files changed: reference/cs2/WORKING_LOOP.md, reference/cs2/HANDOFF.md; then, on his yes, reference/cs2/CS2_PROCESS.md line 202, reference/cs2/truth.json (flowsSource and a fixed list) and reference/check-truth.mjs (snapshots in fixed skip the age check). Before, check-truth told sessions: product-flows.md is 12 days old; read it again from Figma 5RO0m4bYYrTvbiaOgaU3tI (figma-mondai connection). After, only the frame snapshot is age checked, read from his portfolio frame.
Instruction lines: +0 / -0 (one phrase in WORKING_LOOP reworded to "from how the screens in his portfolio frame actually work"; HANDOFF status lines reworded)
Net growth reason: n/a

## Verification
Fresh run: a Sonnet sub-agent given only HANDOFF.md and WORKING_LOOP.md, asked where it would look at the Pathway page and Action Item page screens.
Before: HANDOFF sent the Pathway screen read to file 5RO0m4bYYrTvbiaOgaU3tI frame 2670:11674.
After: Pathway page in his Portfolio Design file IarvWaqjIwrZ2afQmMxKm6, frame 4269:9433, block 4811:27970; asked whether either file sends it to a Mondai file or figma-mondai: no, both send it away from it.
Check result after: PASS (grep, no match).
Second case: the Action Item page block, same run: IarvWaqjIwrZ2afQmMxKm6, frame 4269:9433, placeholder 4787:13139. No Mondai file.
Enforcement test: n/a

## Report
Unverified: none. The product flow map is now a saved snapshot that never refreshes; if the product changes, it goes stale without a warning.
