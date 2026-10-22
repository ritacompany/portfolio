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

Updated: 2026-10-22 12:00
By: Claude Code
Section: 1
Loop step: 1

## Where it stopped

The process is rebuilt and enforced (fixes/2026-10-21-cs2-process-rebuild.md, fixes/2026-10-22-case-study-knowledge-layer.md). His split, 22 Oct: Claude does the outline and the writing; layout and imagery are his. Budget: weekly limit at 80% on 22 Oct, resets Monday 26 Oct, so run cheap: Sonnet for readers, no full chat reads, Opus only where a gate needs it.

Done 22 Oct: the start of week dossier passes check-dossier.mjs (one Opus judge round failed it on breadth and conflicts; those fixes are applied by hand, not re-judged). reference/cs2/outline/outline.md is written, passes check-truth.mjs and was shown to him; two Opus truth review rounds failed it, fixed by hand, not re-reviewed (he chose to skip that spend). His answers are applied: block 6 is capacity only, the Growth Journey sits with the Action Hub in section 7, section 11 is Action Items only, Networking is third and Branding fourth, calendar and capacity setup is feature onboarding.

## Next action

1. Outline sign off: he reads the updated outline; any order change is cheap now.
2. Each section in his order from 7: a lean dossier per flow (extract-turns plus one Sonnet reader), block plan, truth review, copy, voice pass. Sections 5 and 6 first need no flow dossier except C3 for 6.
3. Drafting can move to his second account (BROWSER_MODE.md) to save this account.

## Decided in chat, not yet in files

None

## Open questions for Chadwick

- Whether, after two truth review rounds, remaining FAILs go to him and his APPROVALS.md line lifts the copy block (not built).

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

- The Figma WIP frame 4269:9433 in Portfolio Design, read it before anything else
- reference/cs2/truth.json and the top of reference/check-truth.mjs (the format)
- ~/Documents/CS2-research/product-flows.md (not in git), the flow map from the live MVP file
