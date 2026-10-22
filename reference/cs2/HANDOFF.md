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

Updated: 2026-10-22 05:40
By: Claude Code
Section: 1
Loop step: 1

## Where it stopped

The process was rebuilt and is live (fixes/2026-10-21-cs2-process-rebuild.md). Outlines and block plans now live in reference/cs2/outline/ as cited claims; the guard hook refuses any save that fails check-truth.mjs (his frame first in his order, every flow step placed or cut, every claim pointing at a frame or his words, snapshots under three days old), and copy for a section is refused until its block plan has an Opus truth review PASS recorded by the hook. No outline.md exists yet. The trial outline that came closest is in ~/Documents/CS2-research/process-trial-21oct/out-B/outline.md: checks 2 to 5 pass, check 1 fails on three Reader lines.

## Next action

Finish the start of week dossier (see Waiting for Claude Code). Then refresh ~/Documents/CS2-research/wip-frame.md from his Figma frame and write reference/cs2/outline/outline.md in the claims format (start from the trial outline above), run the Opus truth review and fix to PASS, then his read.

## Decided in chat, not yet in files

None

## Open questions for Chadwick

- Pathway order: the Growth Journey page (4355:22827) has Networking third; the Action Hub rail (2667:9484) and the get ahead screen (2820:10408) have Branding third, as his card does. Which is right?
- His frame says every Action Item in a week is due at the same point; the list view gives each item its own suggested time. Same thing on the page, or does the copy need to separate suggested time from due?
- Product onboarding versus feature onboarding: the file names the calendar, time and capacity screens Product onboarding step 1 to 3, while sign up and the quiz sit on the Onboarding page.
- Whether, after two truth review rounds, remaining FAILs go to him and his APPROVALS.md line lifts the copy block (not built).
- Who raised Motion in Sep 2024.

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

- The Figma WIP frame 4269:9433 in Portfolio Design, read it before anything else
- reference/cs2/truth.json and the top of reference/check-truth.mjs (the format)
- ~/Documents/CS2-research/product-flows.md (not in git), the flow map from the live MVP file
