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

Updated: 2026-10-24 12:00
By: Claude Code
Section: 7
Loop step: 4

## Where it stopped

24 Oct, latest: he read v4 as formulaic (every block ran what, then why), thin in its reasoning, short in its bodies and without a thread joining the sections. v5 is in reference/cs2/draft/CS2-v5-sections-7-8-9-11.md: one story with its thread named in the header (a structure that holds when life does not go to plan, without making anyone feel behind, and honest about what it knows), each section opening from the one before, long paragraphs, and reasoning that goes into motivation and UX principles (Fogg, self determination theory, goal gradient, planning fallacy, status quo bias) beside the research run at decision time. check-copy.mjs now allows up to three paragraphs of 150 words (300 a block) and reasoned principles, and refuses a principle written as a tool used. The private map is ~/Documents/CS2-research/reports/decision-research-map.md, beside the 23 Oct report.

reference/cs2/copy/ still holds the earlier rejected copy; v5 replaces it once he has read it and the block plans are rewritten and truth reviewed on his Mac.

Found while checking: earlier sessions committed quotations from his private record into this public repo (reference/cs2/reasoning/*.md, draft/CS2-section-1.md to 3, outline section plans quoting screen text, and his edited copy file). Nothing was removed; the files are in git history either way.

## Next action

0. On his Mac: rewrite the block plans for sections 7, 8, 9 and 11 from draft/CS2-v5-sections-7-8-9-11.md, the private report and decision-research-map.md into reference/cs2/outline/section-7.md, 8, 9 and 11 (their claims rewritten as decision claims), pass check-truth and run the exact prompt truth reviews, then save the v5 copy into reference/cs2/copy/. Read live frames C2, D3, D4 and 2670:11674 first; they settle the window floor, passed times, the packed week and what is numbered on the Pathway page. Before that, rewrite ~/Documents/CS2-research/wip-frame.md from Figma (frame-changes-22oct.md) and add cognitive load to outline section 6.
1. His read of the v5 copy, and his answers to the questions only he can answer (the private report lists 23).
2. Dossiers for capacity (C3), cognitive load and get ahead (E1, E2) from the raw record; block plan and copy for section 10 after its truth review. Sections 5 and 6 are his own frame blocks and stay his.
3. Story review for each section (loop step 5). My pick for it: cut the packed calendar fallback from section 7 block 3, since section 8 block 4 tells it again.
4. Read the live Figma frames and later chats before asking him any product question. Settled: Focus Areas are linear; a packed calendar removes scheduled times for the week; sync failure is a module over the list titled Calendar sync failure with a Close button; Pathway order is Networking third, Branding fourth; the calendar and capacity screens are feature onboarding on first Action Hub entry.

## Decided in chat, not yet in files

- His frame blocks 1 to 6 are his own text in Figma and stay his (the older copy/section-1.md and section-2.md are pre-restart drafts, not his frame; ignore them). Sections 7, 8, 11 copy is new. 22 Oct: he wants the Background block redone with more clarity (draft in reference/cs2/draft/CS2-background-v2.md, his text untouched); Saturday night deadlines stays; the hierarchy comes after the competitive analysis in his order.
- 24 Oct: no streak. His words: "We are not using a streak." The start of week dossier's open streak question is closed, and no CS2 copy may describe a streak. The Mondai archive's Clean state line ("Streak intact where applicable") conflicts and is unchanged until he approves an edit there.

## Open questions for Chadwick

- Whether to scrub his record's quotations from the public repo, including its history (a force push to main, which only he can decide).

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.
- test-figma-copy-match.mjs fails "CS2 write by frame id, invented" (exit 0, want 2) at 433371b too, before the 24 Oct aside change.

## Read first

Everything below is in this repo. His research and the live product flow map stay on his Mac (the repo is public), so work from these files and from the settled facts in Next action.

- reference/cs2/draft/CS2-v5-sections-7-8-9-11.md: v5 of sections 7, 8, 9 and 11, one connected story with the reasoning in full
- reference/cs2/draft/CS2-v4-sections-7-8-9-11.md: v4, superseded
- reference/cs2/draft/CS2-v3-sections-7-8-9-11.md: v3, superseded
- reference/cs2/draft/CS2-v2-sections-7-8-9-11.md: v2, superseded
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
