# Fix: CS2 sections come out as walls of text with no eyebrows

Status: not verified

## Evidence
Bad output: section 2 copy Draft 5 (`copy/section-2.md` at 73c42bf) is two headings over six body
paragraphs, about 380 words, no eyebrows. The slot plan pours it in whole: "Part 1 copy, its first three
paragraphs" into one text slot. Section 1 build log entry 15: "Eyebrows dropped: section names are
working labels." His report: too much text, eyebrows missing again, the layouts not used the way the
Haven case study uses them.
Expected: blocks the way the Haven case study composes them (read 14 Oct from its master frame): a small
eyebrow naming the topic, a headline that states the claim, one figure that carries the detail as labels,
numbered items or a real screen, then one short paragraph at most.

## Chain
Input: yes. The Haven master and the case study layouts were readable in Figma.
Instruction: `CS2_PROCESS.md` line 275: "Section names are working labels, not the eyebrows on the page."
Nothing in the process says every block has an eyebrow or limits the body under a figure.
Loaded: yes, step 5 is the step being run, and the section 1 log quotes line 275 back as its reason.
Conflict: line 275 was read as "no eyebrows". The 14 Oct fix
(`fixes/2026-10-14-cs2-layout-slot-plan.md`) removed Haven from the process and made `check-slot-plan.mjs`
fail on the word Haven, so the only worked example of how a block is composed left with the borrowed
circles and two by two.
Enforcement: none on shape. `check-copy.mjs` checks words, not structure; `check-slot-plan.mjs` checks
the table, not that a block has an eyebrow or a short body.
Check: none before he saw the frame.

## Causes
- Cause 1: copy is written as an essay in step 3 before any block exists, then step 5 maps paragraphs into slots | For: Draft 5 is prose paragraphs; the slot plan's text rows say "first three paragraphs", "first two paragraphs" | Against: step 5 asks for one claim per beat, which should have split it
- Cause 2: line 275 reads as a ban on eyebrows | For: section 1 log entry 15 drops eyebrows quoting it | Against: the line only says section names are not the eyebrows
- Cause 3: the 14 Oct fix removed Haven as a reference for block grammar along with its content | For: no description of block composition remains anywhere in the process | Against: he objected to Haven's content and forms, which that fix correctly removed
- Cause 4: step 5 says a section has "two to four" beats, so each beat holds 100 to 200 words | For: section 2 got two beats for 380 words | Against: soft wording
History: 9 Oct rewrite of step 5 ("layouts kept coming out as walls of text"); 14 Oct slot plan fix. The wall of text came back after both, so neither touched the cause.
Chosen cause: 1, with 2 and 4. The copy file's shape decides the layout's density before step 5 runs.

## Layer
Layer: 2
Also: layer 1 (rewrite line 275, drop "two to four"), layer 4 (the existing copy guard hook runs the shape check on every save).
Why not earlier layers: layer 1 alone leaves the essay shaped copy file in place.
Replaces: n/a

## Check
Check: `check-blocks.mjs` (proposed, in scratchpad, to merge into `check-copy.mjs`): every `##` block in a
copy file needs `Eyebrow:` and `Headline:` lines and at most one body paragraph of at most 70 words;
`Label:` and `Caption:` lines are figure text.
Result on bad output: FAIL. Draft 5: "no Eyebrow: line", "4 body paragraphs, max 1", "body 80 words, max
70", BLOCKS_FAIL. Section 1 copy also fails: no eyebrows, three blocks over one paragraph, one at 89 words.

## Change
Files changed: reference/cs2/copy/section-2.md, reference/cs2/layout/section-2.md (section 2 only). Process files unchanged until his yes.
Proposed, waiting on his yes (rules are saved only on his say):
1. `check-copy.mjs`: add the block check above. The copy guard hook then refuses essay shaped copy.
2. `CS2_PROCESS.md` line 275 becomes: "Every block has an eyebrow, written for the reader. Section names
   are working labels and are not reused as eyebrows."
3. Step 3: page copy is written as blocks (eyebrow, headline, figure labels, one short body) instead of
   paragraphs.
4. Step 5: drop "a section usually has two to four"; one block per claim.
5. Layouts: the Haven case study is the reference for how a block is composed (eyebrow, claim headline,
   one figure, one short body). Its content and signature forms stay out, and the slot plan check keeps
   refusing them.
Applied now, inside his ask: section 2 copy rewritten as Draft 6 in blocks, slot plan rewritten.
Instruction lines: about +5 / -3 if approved.
Net growth reason: the block shape had no home in the process.

## Verification
Fresh run: not run. Needs the process change first.
Before: Draft 5, BLOCKS_FAIL, about 380 body words, 0 eyebrows.
After: Draft 6 written in this session, BLOCKS_PASS (6 blocks), about 210 words including labels,
6 eyebrows; CS2COPY_PASS; SLOTPLAN_PASS (25 slots). Written knowing the fix, so not proof.
Second case: section 1 fails the same check and has not been redone.
Enforcement test: n/a until the check is merged into the hook path.

## Report
Unverified: the process change waits on his yes. After it, a fresh session should redo section 1 from
the process alone and pass the block check.
