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

Updated: 2026-10-22 23:30
By: Claude Code
Section: 7
Loop step: 4

## Where it stopped

22 Oct, late: a Claude Code session in the cloud picked CS2 up from the main account at its weekly limit. The cloud has no access to ~/Documents/CS2-research on his Mac, so it cannot run truth reviews, write dossiers or save into reference/cs2/copy/ (the copy guard checks every save against the frame record on his Mac).

Done in that session: the voice pass (humanizer, then no-ai-slop detect) on sections 7, 8, 9 and 11, in reference/cs2/draft/CS2-voice-pass-22oct.md. It is built on his 22 Oct edits for 7, 8 and 11 and on copy/section-9.md for 9. Every change to his text is shown before and after; his file is untouched. An independent reader checked each block against the block plans and the dossier findings; its material findings are fixed in the draft. The voice pass draft waits for his read.

Still true from before: copy for sections 7, 8, 9 and 11 has recorded Opus truth review PASSes. reference/cs2/copy/ still holds the text from before his 22 Oct edits. Sections 3 to 6 and 10 have no block plan; dossiers for capacity (C3), cognitive load and get ahead (E1, E2) are missing.

## Next action

0. On his Mac first: his frame changed since the 21 Oct snapshot. outline/frame-changes-22oct.md holds what it says now (block 6 is capacity and cognitive load). Rewrite ~/Documents/CS2-research/wip-frame.md from Figma (this changes the hash, so re-run the exact-prompt truth reviews for sections 7, 8, 9 and 11), add cognitive load to outline section 6 and make a dossier for it.
1. On his Mac: section 9 block 3 contradicts itself (the earned rule above a state where nothing moved). Point its block plan decision claim at the start of week Q2 line in the dossier findings, re-run the section 9 truth review, then rewrite the block; the voice pass left it unchanged. Then his read of the voice pass draft. On his yes, Claude Code on his Mac saves his 22 Oct text with the accepted changes into copy/section-7.md, section-8.md and section-11.md, and the section 9 pass into copy/section-9.md, with Write so the guard runs.
2. Dossiers for capacity (C3), cognitive load and get ahead (E1, E2) from the raw record; block plan and copy for section 10 after its truth review. Sections 5 and 6 are his own frame blocks and stay his.
3. Story review for each section (loop step 5). My pick for it: cut the packed calendar fallback from section 7 block 3, since section 8 block 4 tells it again.
4. Read the live Figma frames and later chats before asking him any product question. Settled: Focus Areas are linear; a packed calendar removes scheduled times for the week; sync failure is a module over the list titled Calendar sync failure with a Close button; Pathway order is Networking third, Branding fourth; the calendar and capacity screens are feature onboarding on first Action Hub entry.

## Decided in chat, not yet in files

- His frame blocks 1 to 6 are his own text in Figma and stay his (the older copy/section-1.md and section-2.md are pre-restart drafts, not his frame; ignore them). Sections 7, 8, 11 copy is new. 22 Oct: he wants the Background block redone with more clarity (draft in reference/cs2/draft/CS2-background-v2.md, his text untouched); Saturday night deadlines stays; the hierarchy comes after the competitive analysis in his order.

## Open questions for Chadwick

- Whether the voice pass changes to his 22 Oct text go into the copy files (draft/CS2-voice-pass-22oct.md lists each one before and after).

## Waiting for Claude Code

- Saving the voice pass lines he accepts into reference/cs2/copy/, on his Mac, once the truth reviews are re-run against the new frame record.
- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

Everything below is in this repo. His research and the live product flow map stay on his Mac (the repo is public), so work from these files and from the settled facts in Next action.

- reference/cs2/draft/CS2-voice-pass-22oct.md: the voice pass draft for sections 7, 8, 9 and 11, with every change to his text before and after
- reference/cs2/outline/frame-changes-22oct.md: what his Figma frame says now, block by block (blocks 1 to 6 are his own text and stay his)
- reference/cs2/outline/outline.md: all 11 sections in his order, as claims
- reference/cs2/outline/section-7.md, section-8.md, section-9.md, section-11.md: block plans, each with a recorded Opus truth review PASS (against the 21 Oct frame record)
- reference/cs2/reasoning/dossier-findings-22oct.md: what he decided and why for the Action Hub, Growth Journey, calendar and start of week flows, with the quotations removed
- reference/cs2/draft/COPY_EDITED_BY_CHADWICK_22OCT.md: the version he edited on 22 Oct for sections 1, 2, 7, 8 and 11. His wording wins over the repo copy where they differ. Sections 1 and 2 in it are his text
- reference/cs2/copy/section-7.md, section-8.md, section-9.md, section-11.md: the copy as saved before his 22 Oct edits. reference/cs2/COPY_SO_FAR.md is the same in one file
- reference/cs2/draft/CS2-background-v2.md: a clearer Background block for him to take from or ignore
- reference/dossier-reader-prompt.md and fixes/2026-10-22-asking-him-product-questions.md: read the frames and later chats before asking him a product question
- BROWSER_MODE.md for what a browser session may do and the return packet
