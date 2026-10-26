# Fix: CS2 copy picks content from the record's history, not from the reader's questions

Status: not verified

## Evidence
Bad output: Spec 1, 24 Oct (v6). Section 8 block 2, the pause: "The 2025 manual integration asked people to color code every synced calendar. It was hard to build and read as overwhelming, so I paused it." Section 8 block 1: "At the time my own schedule needed no calendar to plan around." Section 8 block 3: "I accepted no minimum, then changed my mind one message later." Section 9 block 2: "The founder asked me to automate rollover", placed before rollover is explained. Section 9 block 7: "I asked an AI assistant for research and told it not to just find things that support me." Section 11 block 1 repeats the Growth Journey page his frame already shows in section 7. Recalibration: "reads back what a person actually does" with no explanation of what that is.
Expected: each block names a design decision visible on a screen in his frame, says why (research or reasoning) and explains every product term it uses to a reader who has never seen Mondai. No process narration, no personal life, no private notes as reasons, nothing shown twice.

## Chain
Input: the agent had the frame, the outline, the dossiers and the tactics bank (docs/about-source/case_study_tactics.html, 49 tactics, indexed in reference/cs2/CS2_REFERENCE_INDEX.md).
Instruction: CS2_PROCESS.md "Reference material" step 2 says to pull tactics before each section and step 3 says the draft notes which moves it uses. Loop step 2 says Chadwick talks the section through before drafting.
Loaded: no copy or outline file for sections 7, 8, 9 or 11 names a tactic or the index (grep for READER-EFFECT, case_study_tactics and CS2_REFERENCE_INDEX finds only the pre-restart draft/CS2-section-1.md). The talk-through did not happen for these sections; the copy was written from dossiers.
Conflict: the block plans are built from dossier claims ("Claim: decision | He picked the time bar version"; outline/section-8.md), and the dossier frame asks Q3 options considered and Q5 how it changed (reasoning/dossier-findings-22oct.md). That frame hands the drafter change history and his private notes as material, and the truth review then passes them because they trace. The v6 header says lines were reused because they "passed four truth reads".
Enforcement: the copy guard and truth review check that each claim traces to the record and that copy rules hold. Nothing checks relevance to the reader, reading order of concepts or duplication. The tactics pull is self-run and was skipped.
Check: none existed for relevance, context or duplication.

## Causes
- Cause 1: content is selected from the record (what happened, how it changed) instead of from the screens in his frame and the questions a hiring manager asks of them | For: the pause block, the reversal lines and the founder line all come from dossier Q5 and Q2 entries; the block plans list dossier claims as content | Against: some blocks (recalibration, state rules) are on point, so the record is not always the wrong source.
- Cause 2: the only external check is truth, so any true line ships | For: the v6 header cites truth reads as the reason to reuse lines; nothing failed the pause block | Against: a relevance check alone would not fix ordering of concepts.
- Cause 3: drafting skipped his talk-through and the tactics pull, both self-run steps | For: grep shows no tactics noted; HANDOFF shows copy written from dossiers | Against: the talk-through was skipped because the process let copy start from a passing block plan.
History: eight CS2 process fixes since 13 Oct (fixes/2026-10-13 to 2026-10-22), including a full process rebuild on 21 Oct and a knowledge layer on 22 Oct. Each added steps or gates; the failure came back. Per the skill, this area is past patching: redesign with output checks agreed first.
Chosen cause: Cause 1, with Cause 2 as why it reached him.

## Layer
Layer: 3
Restructure, with a separate reviewer agent (layer 4) for the check.
Why not earlier layers: 1, removing the dossiers would lose the reasons that are needed; 2, the dossier template is not wrong for research, only wrong as a content source.
Replaces: n/a

## Check
Check: a separate reviewer agent given only the copy of one section in frame order (no record, no Mondai knowledge) answers yes or no per block: 1) Does the block name a design decision and say why? 2) Is every product term explained before or where it is used? 3) Does any sentence tell how a decision was reached, his personal life or what he privately thought? (must be no) 4) Is anything already covered in an earlier section? (must be no)
Result on bad output: FAIL by hand reading, not yet run as a reviewer agent: section 8 block 2 fails 1; block 3 fails 2 and 3; section 9 block 2 fails 2; section 11 block 1 fails 4.

## Change
Files changed: none yet. The redesign waits for his walkthrough of the current build, then the checks above are agreed with him.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not run.
Before: see Evidence.
After: not run.
Check result after: not run.
Second case: not run.
Enforcement test: not run.

## Report
Unverified: the redesign itself, the reviewer agent and a fresh run on two sections. He must agree the four check questions first.

## His pass, 26 Oct, every item

Each item maps to the reviewer check question that would catch it (1 decision and why, 2 terms explained before use, 3 no process, personal life or private thoughts, 4 nothing shown twice). Items with no question are listed as gaps.

1. Section 8 block 2, the pause: color coding came from another version of the product and serves no decision on the page. Question 1.
2. Content reads as the first thing found in the record, not chosen from what each section has to prove and what is most impactful. Cause 1; gap: no step picks content from the section's job first.
3. The tactics documents were never used for 7, 8, 9 and 11. Chain, Loaded; gap: no check that a block uses a move.
4. Copy assumes the reader knows the product (Recalibration headline: "what a person actually does" is never explained). Question 2.
5. Private notes and his own thoughts cited as reasons (section 8 block 1, "my own schedule"). Question 3.
6. Smallest window: a minimum is argued before the reader knows why one is needed, what it means or what capacity is. Question 2, and concept order across sections.
7. The method he set: the feature, the decision, then the research or reasoning that explains why. Question 1.
8. Suggested times repeats Saturday night deadlines and brings up the calendar before it is introduced. Questions 2 and 4.
9. "The founder asked me" and similar process framing (section 9 block 2). Question 3.
10. Automation sits where no context for it exists yet. Concept order; gap: no check on order across sections.
11. Section 11 block 1 covers the Growth Journey page, which his frame already places in section 7. Question 4; also the copy did not follow his frame's placement.
12. Reset framed as "research that could prove me wrong" reads like a mistake. Question 3. Asking for research that confirms or contradicts a stated position is fine; the framing is the problem.
13. "My personal experience and life and thoughts" never belong in the case study. Question 3.

Open for him: "I" or "we". Recommendation: "I" for decisions he made, "we" for work the team did together (research, building). Taste and what he is comfortable claiming, so his call.

## His build walkthrough, 26 Oct

- Done or nearly: competitive analysis, the foundation we built on, recalibration, reset. Background works but he is not attached to it; try how it works with the competitive analysis.
- The foundation's hierarchy drawing is his example of the visualization he wants: a picture that makes a concept clear. Every section needs a visual of its own kind, never a copy of that one.
- Transitions are his biggest struggle. Saturday night deadlines sets up capacity; each section should hand the next its question.
- Personalized timeline example: "action items" stacks on two lines; reword.
- Action Hub rail: each of target, pace and ahead of target gets a short, clear description as a side note, not blended into a paragraph. Motivation is the thread to the Growth Journey page; the near goal research line is the right kind of content.
- Suggested times is the transition into the calendar. Annotate that times are placed automatically from the person's schedule and the person can change them; show the custom time popover. The Motion paragraph may not belong here.
- Calendar: show the scheduled view, what happens when an Action Item is clicked and how it ties to the list view; a custom scenario person so the long all day boxes do not dominate; a scroll animation. Whether to show the setup screen is open. Design system fixes wait until his other account is back.
- Start of week: no timeline, no dates, no two years. Walk the reader back into the Action Hub after the calendar. Get ahead uses near identical screens and may come first; the order of get ahead and start of week is open.
- State rules: headline too short; overlaps rollover, which has to be defined before it.
- Add an Action Item page section, made to look better than the current screen.
- The case study has no ending; it stops abruptly after the Pathway page.
