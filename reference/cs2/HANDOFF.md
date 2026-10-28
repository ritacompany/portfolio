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

Updated: 2026-10-26 17:20
By: Claude Code
Section: 8
Loop step: 3

## Where it stopped

28 Oct. He rejected the merged schedule view block: it assumed the reader knew a card opens, repeated moving a time (already in the Action Hub block), and sold dimming. Deep research done: reports/Schedule view how it works.md, notes in research_notes/Schedule view how it works/. Three new versions on the canvas at y 9380 (x -1940, -3480, -5020): why a time, effort you can see, what I said no to. Copy and reader check runs in reference/cs2/reader-check/runs/2026-10-28 (sv3.txt is current). Nothing under the image. Frame re-exported again (17997 tall); canvas covers now grow to the exact Figma text box under them, so no frame text shows through. Contradictions from the research waiting on him are listed in the report.

Later 28 Oct he rejected those three too: the block must explain calendar integration as one way (Mondai reads the person's calendar, never writes to it, a team decision) and pay off what Background and the Motion card set up (now P1 and P2 in known-schedule.md). Cut per item deadline and moving on its own. No missed state; dimming plus the time dropping off is enough. The calendar mock should open at the person's boundary start (setup), so it is full at the top; the click interaction goes in a smaller image under it, carrying the Scheduled times copy (still in the Action Hub block in Figma at y 7218). Spots still missing in the frame: Get ahead (before Opening the week, which mirrors the get ahead screen), the Growth Journey page, and the Action Item page (custom build; MVP text only AI; same actions as the Action Hub popover). Fix record: fixes/2026-10-28-schedule-view-thin-content.md, not verified. He approved that concept; three versions built on it are on the canvas at y 9380 (copy runs/2026-10-28/sv5.txt): 1 sync only reads, 2 two clocks, 3 what we took from AI scheduling. V1 and V3 pass the reader check; V2 fails once on its headline term suggested time. Waiting on his pick. Later he rejected those headlines (sync detail belongs in the body; the headline should read as the next sentence after calendar setup). Three transition headlines now on the canvas; not yet reader checked. Calendar stays one block plus his smaller square bottom right for the popover interaction. Then he asked for headers only: schedule view headers must name syncing as the link from setup, in plain language; rollover (the block below) must open on the plain question of what happens to unfinished Action Items, and the block is the place to show systems thinking (how leftovers touch pace, next week and motivation). New headers for both are on the canvas, unchecked. He has not read the bodies. A later full pass of the case study for systems thinking is planned. Process gap found 28 Oct: canvas copy is written to .cs2-canvas/template.html, which no hook checks, so the voice pass (CS2_PROCESS step 4) and check-copy never ran on canvas versions. Built 29 Oct: .claude/hooks/canvas-copy-guard.mjs refuses an Artifact publish of the canvas when check-copy (dashes, Oxford commas, quotes, AI vocabulary) finds problems in the version copy; registered in .claude/settings.json. The voice pass and the three line headline rule are still not enforced. Fix record: fixes/2026-10-29-canvas-copy-unchecked.md, not verified. Later 28 Oct: versions 2 and 3 of both blocks removed. Schedule view and rollover each have one version with header, body and a text frame (The visual I picture) at x -2440; rollover text now keeps 40px margins. Voice pass applied by hand; reader check not run on these. Then he rejected feature lists: bodies must give the reasoning and research behind each decision. Calendar setup, schedule view and rollover bodies rewritten that way on the canvas (sources: Milkman 2011, Buehler 1994, May Hasher and Healey 2023, Rai 2022, Silverman and Barasch 2023; reasoning from reports/Schedule view how it works.md). Not reader checked. 29 Oct: calendar setup headline cut to three lines (Calendar sync unlocks the schedule view, after two quick questions); he switched the session model to Sonnet to save weekly usage. 29 Oct, done on the canvas: four layout blocks built from his pool (setup T2I l1 at x -1940 y 7840; schedule view T2I media+body at y 9380; reads never writes T1I l2 at y 11010; rollover T1I l2 at x -3480 y 10750), text in the text slots, imagery notes inside each dashed gray frame, sources at the bottom, all headlines three lines, copy guard passes. Not reader checked. Text slots sit 40px from the right edge. (Earlier plan: layout copies from his pool (Case study layouts section on page VC, T1I T2I T3I blocks) with imagery notes in the gray frames; matches planned: setup two images, schedule view one image plus two images, rollover one image.

27 Oct. Frame re-exported (17907 tall); he built calendar version 2 into Figma as The schedule view block (frame y 9300). Order problem he raised: Scheduled times sits inside the Action Hub block, before calendar sync is introduced, though times only exist with calendar sync. Recommendation sent: move the Scheduled times part out of the Action Hub into The schedule view block, so the order runs Action Hub (the list) > Calendar setup (sync unlocks the schedule view) > The schedule view (the same Action Hub as a calendar, times on cards, rescheduling, a passed time). The merged block is on the canvas (x -1940, y 9300), copy in reference/cs2/reader-check/runs/2026-10-26/sched.txt: shorter headline, nothing under the image; reuses his approved Scheduled times lines. Passes the reader check with no flags. He approved the move and the merged block on 27 Oct; he builds it into Figma himself. The reader check KNOWN files still list scheduled times as known before the schedule view; update them when the Figma order changes.

Get ahead: not yet in the frame. His frames and states snapshot are in the Wireframes section on page VC; summary and open streak question in reference/cs2/core/get-ahead.md. Recommended place: after the schedule view, before rollover. Waiting on his answer about the streak.

Also on the canvas: calendar setup headline (x -1940, y 7792), three rollover versions replacing Two years of answers (y 10660, my pick 3). Reader check runs: reference/cs2/reader-check/runs/2026-10-26.

Rules he restated: a headline runs at least three lines; never cite research inline, put a sources line at the bottom of the block; a headline does not open with the eyebrow's words. Do not say section numbers to him. Canvas text (Spec 1, notes) is selectable; frame text is image.

The section 8 shortlist (core/section-8.md) is confirmed and kept for when he asks; core/section-8-copy.md was not asked for and is reference only.

## Next action

Work on the CS2 canvas (claude.ai/artifact/MVBwcVxzgtZvVmdsWE9C37), opened in the session he is in. He goes section by section and says what each section needs; Claude drafts nothing he has not asked for. Read his sticky notes there first (ArtifactData list, collection notes) and answer on the canvas. Shortlists are on demand only, for when he asks what can be used in a section. core/section-8-copy.md was written without being asked; it is reference only. Never propose changing the section order.

## Decided in chat, not yet in files

- Use I for decisions he made and we or the team only for team facts.
- The method behind a decision (asking an AI assistant, who asked whom, changed my mind) never goes in copy.
- Shortlists are on demand, not a standing step for every section.

## Open questions for Chadwick

- Section 3 card 02: drop the 18,000 learners line there, keeping the Motion reference and a one line lesson.

## Waiting for Claude Code

- The copy hook flags CSS custom properties (two hyphens) as dashes in HTML. Needs his allow setup edit to fix.
- Two process rules proposed 26 Oct (reader gets sentence first; frame and Spec 1 as the only copy source) wait for his yes.

## Read first

- reference/cs2/core/section-8.md and section-8-copy.md: the confirmed shortlist and the copy from it
- fixes/2026-10-26-cs2-content-selection.md: his feedback, the cause, the four checks, his walkthrough notes
- reference/cs2/reasoning/dossier-findings-22oct.md: the record per flow, the source for shortlists
- The CS2 canvas artifact above, and his Figma frame 4269:9433 (read text with a read-only use_figma script)
