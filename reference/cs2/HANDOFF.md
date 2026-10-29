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

Updated: 2026-10-29 14:00
By: Claude Code
Section: 8
Loop step: 3

## Where it stopped

How to work: reference/cs2/WORKING_LOOP.md. Read it before anything else.

Calendar setup, The schedule view and Rollover are rebuilt on the canvas on layouts from his pool (setup x -1940 y 7840, schedule view x -1940 y 9380, rollover x -3480 y 10750). Each has a three line headline, a body that gives the reasoning and research behind each decision, a sources line and an imagery note in the gray frame. One way sync is folded into the schedule view. Reader check PASS on all three (runs/2026-10-29, copy files setup4, sched2, roll2), canvas copy guard passes, no-ai-slop run by hand. He has not reviewed this build yet.

Still missing from his frame: Get ahead (goes before Opening the week, which refers to the get ahead screen; streak question open in core/get-ahead.md), the Growth Journey page and the Action Item page (custom build; MVP text only AI; same actions as the Action Hub popover). Scheduled times copy still sits in the Action Hub block in Figma (y 7218); approved 27 Oct to move under the schedule view as his smaller interaction square. He builds Figma himself.

Research for these blocks: reports/Schedule view how it works.md and research_notes/. Contradictions still open are listed in that report (dimming, eight hour floor, his setup subtitle still says Mondai will only place items inside the range).

## Next action

He rejected round 4 on 29 Oct: too little content, it repeated the calendar setup block (how the two setup answers place items is already there; never restate it), it rewrote his approved Scheduled times copy instead of reusing it word for word, and it never covered the design decisions behind the calendar itself. He is continuing the schedule view by hand. His own lines, to keep:

The list view is still accessible because calendar sync is optional and the framework has to work with or without it.
The product uses one way calendar integration, meaning Mondai is able to read the user's calendar but the action items do not get transferred over to the user's personal calendar of choice.

Content the schedule view has not used yet, the design decisions behind the calendar component (source: research_notes/Schedule view how it works/mondai_mechanics.md and reports/Schedule view how it works.md): a Sunday to Saturday week grid so the view matches the weekly framework; Action Items in green, Mondai events in magenta, the person's own events in their source color; block height follows duration, with short 15 minute blocks too small to show title or time; clicking any block opens an anchored popover with Go to action item, the state action and Reschedule, a quick step before a decision rather than jumping to the detail page; only the active Action Item can be completed, matching the sequence; rescheduling stays inside the week because moving work to next week is rollover's job; the reschedule picker only offers open time so an item never lands on a meeting; drag to reschedule deferred to a later version; reconnecting mid week re-places times and disconnecting clears them and returns to the list; a packed week falls back to the list for items that cannot be placed. Reuse his approved Scheduled times copy (Action Hub block, frame y 7218) as written.

Schedule view points with the reasoning (from reference/cs2/reasoning/calendar-and-schedule.md): same week two views, the list stays home because sync is optional and the plan runs without it; Mondai places times from the setup answers (preferred hours, focus hours first) in gaps between the person's events; the time belongs to the person, moved from either view, and he checked automatic rescheduling was easy to build then left it out because a plan that moves itself gets confusing; two clocks, a time on Tuesday and the deadline Saturday night, and he made the week the one that counts because schedules are help, not due dates; a passed time drops off softly, nothing marked missed, because Mondai cannot see whether work was done; one way sync, Mondai never writes into a calendar that holds commitments it does not own; block length is the only place a person sees an Action Item's size. Rollover points: unfinished items at Saturday night and why that moment matters (a missed step is when people give up, and a lost user for Mondai); three options weighed, push everything forward (heavier week after a bad one), ask the person to sort (decisions while behind), drop it (the Pathway slips quietly); the decision, carry forward automatically without the week growing; the magenta carried tag instead of a warning color (showing a lapse lowers later engagement); target holds and pace moves once a week, shown with an image since the reader knows both; repeated slipping means the plan looks at progress and suggests changes, which opens the week flow (start of week, catch up, get ahead).

Points proposed 29 Oct for the calendar part, his reasoning first: setup 1 why personalize (school timetable), 2 preferred hours (a calendar shows busy, not willing; range with an eight hour floor), 3 focus hours (decides which gaps fill first, never a limit). Schedule view 4 same week two views, 5 a specific time helps, 6 the two clocks (times are suggestions, Saturday the only deadline; his words, recommendations not due dates), 7 one way sync, 8 effort you can see in block length. Rollover 9 the problem, 10 three ways out each pulling on something else, 11 the decision (leftovers move on their own, counted first), 12 what it touches (magenta tag, pace, run of hard weeks to recalibration).

## Decided in chat, not yet in files

- Bodies give reasoning and research for each decision; a feature list fails (29 Oct).
- Headlines introduce the screen or problem and connect to the block before without signposting; problem headlines carry no solution.
- No missed state; dimming plus the time dropping off is enough.
- Calendar stays one section plus his smaller interaction square.

## Open questions for Chadwick

- The streak in the get ahead frames versus There is no streak in approved copy.
- Section 3 card 02: drop the 18,000 learners line there, keeping the Motion reference and a one line lesson.

## Waiting for Claude Code

- Voice pass and the three line headline rule are not enforced by any hook; fixes/2026-10-29-canvas-copy-unchecked.md and fixes/2026-10-28-schedule-view-thin-content.md are not verified.
- The copy hook flags CSS custom properties (two hyphens) as dashes in HTML. Needs his allow setup edit to fix.

## Read first

- reference/cs2/WORKING_LOOP.md
- The CS2 canvas (claude.ai/artifact/MVBwcVxzgtZvVmdsWE9C37) and his notes on it
- His Figma frame 4269:9433 on page VC (read text with a read only use_figma script)
- reports/Schedule view how it works.md
