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

Updated: 2026-10-23 08:00
By: Claude Code
Section: 7
Loop step: 4

## Where it stopped

23 Oct, later: he rejected the saved copy for sections 7, 8, 9 and 11 as a product description, not a case study. He was right: the block plans those sections passed were screen inventories and the copy followed them. v2 is in reference/cs2/draft/CS2-v2-sections-7-8-9-11.md: every block planned as problem, options, decision, why and what is open, each line cited to a dossier bullet, then copy written from the plans. Checked by an independent truth reader against the dossiers, a cold reader playing a hiring manager and no-ai-slop detect, and by a script that refuses any eight word run quoted from his private record.

His research folder is in this cloud session at ~/Documents/CS2-research (outside both repos, gone when the session ends). The raw design chat archive is not, so check-truth and check-dossier cannot run here: the v2 block plans cannot be saved into reference/cs2/outline/ or truth reviewed from the cloud, and v2 copy stays in the draft until they are. reference/cs2/copy/ still holds the earlier copy he rejected.

Found while checking: earlier sessions committed quotations from his private record into this public repo (reference/cs2/reasoning/*.md, draft/CS2-section-1.md to 3, outline section plans quoting screen text, and his edited copy file). The voice pass and copy files repeat one phrase from a chat. Nothing was removed; the files are in git history either way.

## Next action

0. On his Mac: save the v2 block plans from draft/CS2-v2-sections-7-8-9-11.md into reference/cs2/outline/section-7.md, 8, 9 and 11 (their claims rewritten as decision claims), pass check-truth and run the exact prompt truth reviews, then save the v2 copy into reference/cs2/copy/. Before that, rewrite ~/Documents/CS2-research/wip-frame.md from Figma (frame-changes-22oct.md) and add cognitive load to outline section 6.
1. His read of the v2 copy.
2. Dossiers for capacity (C3), cognitive load and get ahead (E1, E2) from the raw record; block plan and copy for section 10 after its truth review. Sections 5 and 6 are his own frame blocks and stay his.
3. Story review for each section (loop step 5). My pick for it: cut the packed calendar fallback from section 7 block 3, since section 8 block 4 tells it again.
4. Read the live Figma frames and later chats before asking him any product question. Settled: Focus Areas are linear; a packed calendar removes scheduled times for the week; sync failure is a module over the list titled Calendar sync failure with a Close button; Pathway order is Networking third, Branding fourth; the calendar and capacity screens are feature onboarding on first Action Hub entry.

## Decided in chat, not yet in files

- His frame blocks 1 to 6 are his own text in Figma and stay his (the older copy/section-1.md and section-2.md are pre-restart drafts, not his frame; ignore them). Sections 7, 8, 11 copy is new. 22 Oct: he wants the Background block redone with more clarity (draft in reference/cs2/draft/CS2-background-v2.md, his text untouched); Saturday night deadlines stays; the hierarchy comes after the competitive analysis in his order.

## Open questions for Chadwick

- Whether to scrub his record's quotations from the public repo, including its history (a force push to main, which only he can decide).

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

Everything below is in this repo. His research and the live product flow map stay on his Mac (the repo is public), so work from these files and from the settled facts in Next action.

- reference/cs2/draft/CS2-v2-sections-7-8-9-11.md: v2 of sections 7, 8, 9 and 11, decision led, with block plans cited to the dossiers
- reference/cs2/draft/CS2-voice-pass-22oct.md: the earlier voice pass draft for sections 7, 8, 9 and 11, with every change to his text before and after; the copy files match it
- reference/cs2/outline/frame-changes-22oct.md: what his Figma frame says now, block by block (blocks 1 to 6 are his own text and stay his)
- reference/cs2/outline/outline.md: all 11 sections in his order, as claims
- reference/cs2/outline/section-7.md, section-8.md, section-9.md, section-11.md: block plans, each with a recorded Opus truth review PASS (against the 21 Oct frame record)
- reference/cs2/reasoning/dossier-findings-22oct.md: what he decided and why for the Action Hub, Growth Journey, calendar and start of week flows, with the quotations removed
- reference/cs2/draft/COPY_EDITED_BY_CHADWICK_22OCT.md: the version he edited on 22 Oct for sections 1, 2, 7, 8 and 11. His wording wins over the repo copy where they differ. Sections 1 and 2 in it are his text
- reference/cs2/copy/section-7.md, section-8.md, section-9.md, section-11.md: the saved copy after the voice pass. reference/cs2/COPY_SO_FAR.md is the same in one file
- reference/cs2/draft/CS2-background-v2.md: a clearer Background block for him to take from or ignore
- reference/dossier-reader-prompt.md and fixes/2026-10-22-asking-him-product-questions.md: read the frames and later chats before asking him a product question
- BROWSER_MODE.md for what a browser session may do and the return packet
