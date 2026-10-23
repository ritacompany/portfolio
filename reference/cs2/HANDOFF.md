# CS2 handoff

<!--
The resume point for CS2 on either account. Whoever picks CS2 up reads this first, then the status
table in CS2_PROCESS.md. Rewritten, never appended: it says where things stand now, not a history.

Claude Code rewrites it at every save, at 75% and 90% of the 5 hour limit (the usage hook says when),
and whenever the stop hook asks; then commits and pushes. The browser account never edits this file in
GitHub: its new version goes in the return packet (BROWSER_MODE.md), and Claude Code saves it.

Format, checked by check-handoff.mjs: the four header lines, then every heading below with something
under it (None if nothing). Section and loop step use the numbers in CS2_PROCESS.md. The repo is
public and his record never goes in git, so no quotations from the research: name the file in
~/Documents/CS2-research/ instead.
-->

Updated: 2026-10-23 00:00
By: Claude Code
Section: 1
Loop step: 1

## Where it stopped

Weekly limit at 93% on 22 Oct (resets Monday 26 Oct); Claude Code stopped there. His rule: never edit anything he wrote; a change to his text goes before and after in a separate note.

Done: copy written for sections 7, 8, 9 and 11, each after a recorded Opus truth review PASS (reference/cs2/copy/section-7.md, section-8.md, section-11.md). None has had the voice pass or his read. Section 7: The Action Hub and the Growth Journey. The copy gate hook (.claude/hooks/cs2-copy-guard.mjs) was patched 22 Oct, with his yes, to read a sub-agent's SubagentHandback answer, so reviews now record. Section 7 is the first section recorded through it.

Section 11 (Action Items) also has a recorded PASS (after its Reader gets line was fixed) and its copy is written: reference/cs2/copy/section-11.md. Section 8 (Calendar integration) also has a recorded PASS and its copy is written: reference/cs2/copy/section-8.md. A review only counts when the sub-agent's first message is the output of `node reference/review-truth.mjs cs2 --prompt <plan>` pasted word for word, run on model Opus. Sections 3 to 6, 9 and 10 have no block plan; dossiers for capacity (C3) and get ahead (E1, E2) are missing.

What is in the repo for picking this up without Claude Code: reference/cs2/outline/outline.md, outline/section-7.md, section-8.md, section-11.md, reference/cs2/reasoning/dossier-findings-22oct.md (what the dossiers say he decided and why, no quotations), fixes/2026-10-22-asking-him-product-questions.md and reference/dossier-reader-prompt.md.

## Next action

0. FIRST: his frame changed since the 21 Oct snapshot. outline/frame-changes-22oct.md holds what it says now (block 6 is now capacity and cognitive load, calendar and hours rows gone; blocks 4 and 6 have new node ids). Rewrite ~/Documents/CS2-research/wip-frame.md from Figma at the start of the next session (this changes the hash, so re-run the exact-prompt reviews for sections 7, 8, 9 and 11), add cognitive load to the outline section 6, and make a dossier for it before any copy there.
1. Voice pass on the copy for sections 7, 8 and 11 (humanizer, then no-ai-slop detect), then his read (shape in BROWSER_MODE.md; check-copy runs in the guard).
2. Section 9 (Start of week) has a recorded PASS and its copy is written (copy/section-9.md). Next: dossiers for capacity (C3) and get ahead (E1, E2); block plans for sections 5, 6 and 10; copy for each after its review. Blocks 1 to 6 of his frame are his own text; a Background block redo draft for him is in draft/CS2-background-v2.md.
3. Voice pass on section 7 copy (humanizer, then no-ai-slop detect) before he reads it.
4. Read the live Figma frames and later chats before asking him any product question. Settled: Focus Areas are linear; a packed calendar removes scheduled times for the week; sync failure is a module over the list titled Calendar sync failure with a Close button; Pathway order is Networking third, Branding fourth; the calendar and capacity screens are feature onboarding on first Action Hub entry.

## Decided in chat, not yet in files

- His frame blocks 1 to 6 are his own text in Figma and stay his (the older copy/section-1.md and section-2.md are pre-restart drafts, not his frame; ignore them). Sections 7, 8, 11 copy is new. 22 Oct: he wants the Background block redone with more clarity (draft in reference/cs2/draft/CS2-background-v2.md, his text untouched); Saturday night deadlines stays; the hierarchy comes after the competitive analysis in his order.

## Open questions for Chadwick

- Whether the second account should write copy for sections 8 and 11 once their reviews record, or wait for Claude Code.

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

Everything below is in this repo. His research and the live product flow map stay on his Mac (the repo is public), so work from these files and from the settled facts in Next action.

- reference/cs2/PICKUP_PROCESS.md: how he wants to be worked with, the copy gate rules and the one failure that repeated all day (read it second)
- reference/cs2/outline/frame-changes-22oct.md: what his Figma frame says now, block by block (blocks 1 to 6 are his own text and stay his)
- reference/cs2/outline/outline.md: all 11 sections in his order, as claims
- reference/cs2/outline/section-7.md, section-8.md, section-9.md, section-11.md: block plans, each with a recorded Opus truth review PASS (against the 21 Oct frame record)
- reference/cs2/reasoning/dossier-findings-22oct.md: what he decided and why for the Action Hub, Growth Journey, calendar and start of week flows, with the quotations removed
- reference/cs2/copy/section-7.md, section-8.md, section-9.md, section-11.md: the copy written so far. reference/cs2/COPY_SO_FAR.md is the same in one file
- reference/cs2/draft/COPY_EDITED_BY_CHADWICK_22OCT.md: the version he edited and ran through ChatGPT on 22 Oct for sections 1, 2, 7, 8 and 11. His wording wins over the repo copy where they differ. Sections 1 and 2 in it are his text
- reference/cs2/draft/CS2-background-v2.md: a clearer Background block for him to take from or ignore
- reference/dossier-reader-prompt.md and fixes/2026-10-22-asking-him-product-questions.md: read the frames and later chats before asking him a product question
- BROWSER_MODE.md for what a browser session may do and the return packet
