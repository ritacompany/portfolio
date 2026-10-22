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

Updated: 2026-10-22 19:00
By: Claude Code
Section: 1
Loop step: 1

## Where it stopped

Weekly limit at 93% on 22 Oct (resets Monday 26 Oct); Claude Code stopped there. His rule: never edit anything he wrote; a change to his text goes before and after in a separate note.

Done: section 7 (The Action Hub and the Growth Journey) has a recorded Opus truth review PASS and its copy is written and passes the guard: reference/cs2/copy/section-7.md. The copy gate hook (.claude/hooks/cs2-copy-guard.mjs) was patched 22 Oct, with his yes, to read a sub-agent's SubagentHandback answer, so reviews now record. Section 7 is the first section recorded through it.

Not yet: truth reviews for sections 8 and 11 (plans fixed after their last FAIL; substantive PASS for 11 on 22 Oct but never recorded). A review only counts when the sub-agent's first message is the output of `node reference/review-truth.mjs cs2 --prompt <plan>` pasted word for word, run on model Opus. Sections 3 to 6, 9 and 10 have no block plan; dossiers for capacity (C3) and get ahead (E1, E2) are missing.

What is in the repo for picking this up without Claude Code: reference/cs2/outline/outline.md, outline/section-7.md, section-8.md, section-11.md, reference/cs2/reasoning/dossier-findings-22oct.md (what the dossiers say he decided and why, no quotations), fixes/2026-10-22-asking-him-product-questions.md and reference/dossier-reader-prompt.md.

## Next action

1. Exact-prompt Opus reviews for the section 8 and 11 plans; write each section's copy after its PASS is recorded (shape in BROWSER_MODE.md; check-copy runs in the guard).
2. Dossiers for capacity (C3) and get ahead (E1, E2); block plans for sections 5, 6, 9, 10; copy for each after its review.
3. Voice pass on section 7 copy (humanizer, then no-ai-slop detect) before he reads it.
4. Read the live Figma frames and later chats before asking him any product question. Settled: Focus Areas are linear; a packed calendar removes scheduled times for the week; sync failure is a module over the list titled Calendar sync failure with a Close button; Pathway order is Networking third, Branding fourth; the calendar and capacity screens are feature onboarding on first Action Hub entry.

## Decided in chat, not yet in files

None

## Open questions for Chadwick

- Whether the second account should write copy for sections 8 and 11 once their reviews record, or wait for Claude Code.

## Waiting for Claude Code

- The knowledge layer is built and enforced (fixes/2026-10-22-case-study-knowledge-layer.md): a block plan is refused until each of its flows has a dossier from the raw record passing check-dossier.mjs. The start of week dossier (~/Documents/CS2-research/dossiers/start-of-week.md) does not pass yet: fix the list in start-of-week.review.md beside it, then an Opus re-judge. Other flows have no dossier yet.
- Delete ~/Documents/CS2-research/PRODUCT_BRIEF.md, written from notes; nothing reads it now.
- test-handoff.mjs fails "an empty heading is refused" at 87e0ff3 too, before this change.

## Read first

- The Figma WIP frame 4269:9433 in Portfolio Design, read it before anything else
- reference/cs2/truth.json and the top of reference/check-truth.mjs (the format)
- ~/Documents/CS2-research/product-flows.md (not in git), the flow map from the live MVP file
