# Fix: CS2 figure labels written as sentences, eyebrows repeating headlines

Status: verified

## Evidence
Bad output: section 1 copy after a3e358b, block 3: "Label: CareerFoundry. A fixed curriculum at a fixed
pace. Fall behind and the course doesn't move for you. I kept its order and left the pacing." (25 words),
and "Eyebrow: The closest products" over "Headline: The closest products each solved half of it." Section 2
block 3: "Eyebrow: What gets locked" over "Headline: The same line decides what gets locked."
Expected: labels as on the Haven case study, one to three words ("Insight 1", "Total interviews",
"Subject matter experts"). Longer figure text as Haven's cards: a small label, a short title, one or two
sentences. The eyebrow names the topic and never repeats the headline.

## Chain
Input: yes. The Haven master was read on 14 Oct; its text layers are one to three word labels and short cards.
Instruction: the a3e358b process text defined `Label:` as "text that sits on the figure", with no shape.
Loaded: yes. The fresh run followed it and moved whole sentences into Label: lines.
Conflict: the same fix capped body paragraphs at 70 words, so the only place left for removed detail was the uncapped Label: line.
Enforcement: none on labels or eyebrow wording.
Check: none. The echo was spotted at review and reported rather than fixed.

## Causes
- Cause 1: Label: was defined as figure text with no shape, so it became a dump for sentences cut from the body | For: every long label in both files is a sentence that used to be body | Against: none found
- Cause 2: no check compares eyebrow and headline | For: both echoes passed the a3e358b check | Against: the process says the eyebrow names the topic
History: a3e358b added blocks and eyebrows. This failure came from that fix's own definition of Label:.
Chosen cause: 1 and 2. The definition invited it, and nothing checked it.

## Layer
Layer: 2
Also: layer 4 (the copy guard hook already runs check-copy.mjs on every save).
Why not earlier layers: layer 1 does not fit because nothing conflicts. The definition was missing a shape, which is fixed at the source (the check and the step 3 line).
Replaces: n/a

## Check
Check: `node reference/cs2/check-copy.mjs <copy file>`. Fails a Label: over three words, a Card: that is not "label | title | body" with label and title at most three words and a body of at most two sentences, and an eyebrow whose text appears in its headline.
Result on bad output: FAIL. Section 1: 9 problems, including "label ... is 25 words, max 3" and "Block 3: eyebrow repeats the headline". Section 2: 12 problems, including "Block 3: eyebrow repeats the headline".

## Change
Files changed: reference/cs2/check-copy.mjs, reference/cs2/test-check-copy.mjs (long label, card shape and eyebrow echo cases), reference/cs2/CS2_PROCESS.md step 3 (one line pair), reference/cs2/copy/section-1.md and section-2.md, reference/cs2/layout/section-1.md and section-2.md (wording points at cards and new eyebrows)
Instruction lines: +3 / -2 in CS2_PROCESS.md
Net growth reason: the label and card shape had no home in the process. One line names it, and the check holds it.

## Verification
Fresh run: a general purpose subagent given only the repo and "write section 3's page copy as step 3 describes", with no mention of labels, cards or eyebrows. Output saved to the scratchpad only, so it could not collide with another session's edits.
Before: section 1 and 2 copy as of a3e358b, CS2COPY_FAIL as above.
After: section 3 test copy, six blocks. Labels "Free time", "Booked time", "Hours given", "4 hours minimum", "Settings". Cards such as "02 | What shipped | Ask how many hours a week someone can give this." Eyebrows "Where the hours come from", "The calendar's job", "Load, not a cap", none echoing their headline.
Check result after: PASS. CS2COPY_PASS on the section 3 test copy; CS2COPY_PASS on section 1 and section 2.
Second case: sections 1 and 2, rewritten in this session, both pass.
Enforcement test: `node reference/cs2/test-check-copy.mjs`: "ok shape long label", "ok shape card with no title", "ok shape eyebrow repeats headline", "copy check discrimination passed".

## Report
Unverified: none for labels and eyebrows. Separately, another session has uncommitted edits to CS2_PROCESS.md and CS2_COMPREHENSION.md that drop the standing map diagram (`fixes/2026-10-14-cs2-visual-before-message.md`, not verified). The section 1 and 2 slot plans still use the map and will need that session's change. The Figma frames wait on his say to build.
