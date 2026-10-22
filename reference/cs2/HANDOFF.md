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

Updated: 2026-10-22 16:00
By: Claude Code
Section: 1
Loop step: 1

## Where it stopped

Weekly limit near 90% on 22 Oct (resets Monday 26 Oct). His rule: never edit anything he wrote; a change to his text goes before and after in a separate note. No copy is written for any section after 2. The copy gate needs an Opus truth review PASS on the section's block plan; sections 7, 8 and 11 each failed three or more reviews on claims stretching past their sources, each time fixed, and re-reviews are the only thing between those plans and copy. His APPROVALS.md mechanism is not built and only he can build it.

What is in the repo for picking this up without Claude Code: reference/cs2/outline/outline.md (all 11 sections, his order, claims), outline/section-7.md, section-8.md and section-11.md (block plans), reference/cs2/reasoning/dossier-findings-22oct.md (what the four passing dossiers say he decided and why, with no quotations; the research itself stays on his Mac), fixes/2026-10-22-asking-him-product-questions.md and reference/dossier-reader-prompt.md (how readers must open the live frames before asking him anything).

## Next action

1. Truth review PASS per plan (reference/review-truth.mjs, Opus): sections 7, 8, 11. When one passes, write its copy in reference/cs2/copy/section-N.md to the shape in BROWSER_MODE.md. Layout and imagery are his.
2. Still to do: dossiers for capacity (C3, section 6) and get ahead (E1, E2, section 10); block plans for sections 5, 6, 9 (start of week dossier is done) and 10.
3. Product questions: read the Figma frames and the later chats first (reference/dossier-reader-prompt.md). Settled: Focus Areas are linear; a packed calendar removes scheduled times for the week; sync failure is a module over the list with Refresh calendar; Pathway order is Networking third, Branding fourth; the calendar and capacity screens are feature onboarding on first Action Hub entry.

## Decided in chat, not yet in files

None

## Open questions for Chadwick

- Whether, after truth review rounds, remaining FAILs go to him and his APPROVALS.md line lifts the copy block (not built).

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

- The Figma WIP frame 4269:9433 in Portfolio Design, read it before anything else
- reference/cs2/truth.json and the top of reference/check-truth.mjs (the format)
- ~/Documents/CS2-research/product-flows.md (not in git), the flow map from the live MVP file
