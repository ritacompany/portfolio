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

Updated: 2026-10-26 15:30
By: Claude Code
Section: 8
Loop step: 1

## Where it stopped

26 Oct. His Figma frame (WIP Mondai framework case study, 4269:9433, 16 blocks) and the Spec 1 document beside it (4496:16282, the v6 copy for sections 7, 8, 9 and 11 with his feedback) are the current state. The frame is the source; the repo copy files are older and are not to be built from.

He did a full pass on Spec 1 and a walkthrough of his build. Both are in fixes/2026-10-26-cs2-content-selection.md. The cause, as he corrected it: the record is the right source, but nothing picks the core decisions out of it, so low weight entries (the color coding pause, reversals, his private notes, how a decision was reached) reached the copy. He agreed four reader checks that every section must pass (in that file).

The first test of the fix: reference/cs2/core/section-8.md, a core decisions shortlist for section 8 (calendar). Waiting for his check.

The working view is the CS2 canvas artifact (claude.ai/artifact/MVBwcVxzgtZvVmdsWE9C37): his frame and Spec 1 on a board, with sticky notes saved to the page. Read his notes with ArtifactData list, collection notes.

## Next action

Work section by section in his frame's order. Do not propose changing the section order; he decides order himself as sections are worked. For each section: core decisions shortlist from the record, his check, then copy only from the confirmed shortlist, then the four reader checks. Start with his reaction to core/section-8.md.

## Decided in chat, not yet in files

- Use I for decisions he made and we or the team only for team facts.
- The method behind a decision (asking an AI assistant, who asked whom, changed my mind) never goes in copy.

## Open questions for Chadwick

- Section 8: is anything on the shortlist not core, or missing? Does the calendar setup screen stay?

## Waiting for Claude Code

- The copy hook flags CSS custom properties (two hyphens) as dashes in HTML. Needs his allow setup edit to fix.
- Two process rules proposed 26 Oct (reader gets sentence first; frame and Spec 1 as the only copy source) wait for his yes.

## Read first

- fixes/2026-10-26-cs2-content-selection.md: his feedback, the cause, the four checks, his walkthrough notes
- reference/cs2/core/section-8.md: the first core decisions shortlist
- reference/cs2/reasoning/dossier-findings-22oct.md: the record per flow, the source for shortlists
- The CS2 canvas artifact above, and his Figma frame 4269:9433 (read text with a read-only use_figma script; the build gate lets reads through)
