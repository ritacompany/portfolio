# Fix: open questions put to him that the product and the record already answer

Status: not verified

## Evidence
Bad output: the wrap-up of 22 Oct asked him "does the whole week switch to the plain list" for the packed calendar and said Focus Areas were a conflict for him ("your 19 Mar line says a sorting tag, the live Pathway page shows numbered Focus Areas"). Earlier the same day the outline asked "which Pathway order is right", whether "due at the same point" matches the suggested times, and "who raised Motion". His reply: the answers are in the other screens and the research, and he should not have to explain how the Action Hub or calendar integration works.
Expected: the question never reaches him when a frame, a later chat turn or the research settles it. Frame 2616:14229 reads "Your calendar is packed this week so we've removed" scheduled times, which answers the packed calendar question. His 22 Apr 2026 turn "so i found out focus areas are linear as well" with the live Pathway page (numbered Focus Areas, a rail, later ones locked) answers the Focus Areas one.

## Chain
Input: the material existed. The flow map holds the packed calendar frame text, and the corpus holds the 22 Apr turn on linear Focus Areas.
Instruction: the standing rules say "Never ask what existing context answers" (.claude/portfolio-rules.md, HOW TO WORK) and "Ask me only when the answer depends on something only I hold".
Loaded: the rules are injected every turn. The dossier readers got a prompt that said to write "Not in the record: ask him" when a thing is missing, with no step to look at the live frames first.
Conflict: none found in: .claude/portfolio-rules.md, reference/check-dossier.mjs, CLAUDE.md. The dossier format itself invites "ask him" as an acceptable answer for anything not found in chat text.
Enforcement: nothing. check-dossier.mjs accepts "Not in the record: ask him" on any statement, and the handoff and outline carry "Open question for him" lines with no check on what they are about.
Check: a reviewer question on the final message and the handoff: "does any question to him concern how the product behaves, rather than taste, risk, history only he holds or a choice between options?"

## Causes
- Cause 1: readers and I treat "not found in the chat text" as "unknown", and the screens never get opened for behaviour questions | For: the packed calendar and Focus Areas answers sat in the flow map and the live Pathway page, and no reader step opens them | Against: the Focus Areas fact was also in a corpus turn the reader did cite elsewhere
- Cause 2: the wrap-up rule asks me to put a question in a box, so I fill the box | For: each wrap-up ended with a question | Against: the rule says none is fine
History: rules against asking what context answers already exist (.claude/portfolio-rules.md) and the failure happened anyway, so another rule of that kind repeats a failed experiment. Earlier fixes in fixes/2026-10-21-cs2-process-rebuild.md and fixes/2026-10-22-case-study-knowledge-layer.md added gates for sources, not for what gets asked.
Chosen cause: 1, because both cases were answerable from artefacts the readers never opened, and the dossier format makes "ask him" a pass.

## Layer
Layer: 3
Why not earlier layers: 1 there is no conflicting source to remove. 2 the dossier format is the source, but changing what check-dossier.mjs accepts needs his call on the process he built. A code check cannot tell product behaviour from taste, so layer 4 is not available here.
Replaces: n/a

## Check
Check: yes/no reviewer question, run by a sub-agent on the handoff and the final message: "does any question to the user concern how the product behaves, rather than taste, risk, history only he holds or a choice between options?"
Result on bad output: FAIL (not run; the packed calendar and Focus Areas questions of 22 Oct would fail it). Not executed this turn to save weekly budget.

## Change
Files changed: reference/dossier-reader-prompt.md (new, the reader prompt readers must paste in), reference/cs2/outline/section-11.md (Focus Areas claims from the live page and his 22 Apr turn), ~/Documents/CS2-research/dossiers/growth-journey.md (Q5 entry)
Instruction lines: +24 / -0
Net growth reason: the prompt file is new, since no reader prompt existed in the repo; each spawn wrote its own, which is why the "look at the screens first" step was missing.

## Verification
Fresh run: a fresh Sonnet agent was given only the prompt file and the calendar dossier's Q7 (8 open items) and opened the live frames in the MVP file and searched later chats.
Before: all 8 Q7 items marked "Not in the record: ask him", including the D4 trigger and the D5 trigger and copy.
After: 3 of 8 answered without him. D4: whole week switches (frame 2616:14541 says "this week"); D5: sync failure frame 2693:9409 has a Refresh calendar button; colour assignment step: not in the live flow. Of the remaining 5, 3 are history only he holds (who set one way read only, Motion influence, the Nov 2025 screens) and 2 are product behaviour that neither the frames nor the chats show as shipped (the under 3 hour warning, the settings re-entry flow), now written with the frame opened and what it showed.
Check result after: the reviewer yes/no question was not run. By hand: the 2 remaining behaviour items carry the frame they opened, the 3 history items are history.
Second case: not run
Enforcement test: n/a (layer 3)

## Report
Unverified: a second flow was not run, and nothing forces a future session to paste the prompt file into a reader (it is a request, not enforcement). The test also showed each live frame costs 75k to 128k characters through get_design_context, so a reader needs a text-only way to read frames. Open for him: whether the packed calendar, sync failure and the other answered items go into the calendar dossier and section 8 plan, and whether the 2 unshown behaviours (the under 3 hour warning, the settings re-entry flow) shipped.
