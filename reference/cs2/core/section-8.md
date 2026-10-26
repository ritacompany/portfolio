# Core decisions: section 8, calendar integration

Status: confirmed by Chadwick 26 Oct with the picks: setup screen stays; a packed week drops times only from items that cannot be placed; the 18,000 learners study lives here. The selection test from fixes/2026-10-26-cs2-content-selection.md. No copy is written from this until he confirms the list.

How each decision was picked: it shaped how the framework works (not one screen's styling), it shows on a screen in his frame or a frame he plans and a hiring manager needs it to understand why that screen works the way it does. Sources are entries in reasoning/dossier-findings-22oct.md, Calendar integration, unless noted.

Reader arrives knowing: the week has one deadline on Saturday night (section 5), each week is sized to the person's capacity (section 6) and the Action Hub lists this week's Action Items (section 7). Suggested times at the end of section 7 is the handoff into this section.

## Core

1. **The calendar is optional, and without it the week is a plain list that still works.**
   Why: people schedule their lives very differently, and slotting every Action Item into a calendar copies the rigid structure of traditional education, which Mondai is an alternative to. Research backs it: a one off push to schedule slightly lowered persistence for 18,000 online learners.
   Screen: the week 1 choice to connect a calendar or manage your own schedule; the list view without a calendar, with its offer to connect.
   Source: Q2 risk calendar integration had to avoid; Q2 weekly works with or without a calendar; Q4 offered, not forced. Research: Baker, Evans and Dee 2016 (section 3 card 02 cites it; it should live here or there, not both).

2. **The calendar has one job: finding when someone is free. The times it places are suggestions, never deadlines.**
   Why: completion is decided at the end of the week, so a time on an Action Item is help, not a due date. A passed time leaves the card quietly and nothing is marked late, because the product cannot know when the work was really done.
   Screen: the schedule view with Action Items placed between the person's own events; the same item in the list view with its suggested time.
   Source: Q2 his framing of calendar sync as a tool for finding time; Q4 times are recommendations and assistance tools, not due dates; Q4 Feb 2026 scope, a suggestion based system.

3. **The person tells Mondai their preferred hours for the day and the hours they focus best, which sit inside them. Mondai places work there first; nothing is locked.** (Corrected by Chadwick 26 Oct: the range guides placement, it is not a hard limit. The setup screen line "Mondai will only place action items inside your selected time frame" states the old meaning.)
   Why: placement should follow how the person's day usually runs, and focus hours outside the range would point at times the person rarely has.
   Screen: the setup step after syncing (time bar for the window, focus hours below).
   Source: Q4 C2 direction; Q4 preferred times depend on the window.
   Note: the eight hour floor belongs here only as the rule and its reason (open time is the window minus meetings), and only once capacity is already explained.

4. **The person moves a time when they choose; nothing reschedules on its own.**
   Why: times that move by themselves get confusing fast, and it would take the plan out of the person's hands.
   Screen: the reschedule control on an Action Item (his walkthrough: show the custom time popover).
   Source: Q4 no auto reschedule; Q4 the schedule icon stays to reschedule at will.

5. **When a calendar is too packed to place the week, the times come off and the person works from the same plain list.**
   Why: a separate manual mode would cost a lot of design for a rare case, and falling back to the list keeps one experience.
   Screen: the packed calendar notice.
   Source: Q4 D4 packed week.
   Open: whether the whole week falls back or only the items that cannot be placed.

## Cut, and why

- Color coding each synced calendar (2025): superseded, from an earlier version and has no screen in the frame. Its only useful part, that the calendar's job is availability, is already decision 2.
- Choosing the time bar layout over two other versions: a layout pick, not a framework decision. The reader sees the result.
- Agreeing to no minimum window and then reversing: history. Only the rule survives (note under 3).
- Three schedule modes (Mar 2025) and where calendar integration should live (2024): superseded.
- Motion and Fantastical as references: belongs to the competitive analysis card.
- Sync turned on or off from a context menu, and no toggle for integration mode: settings detail.
- First entry tooltips on the calendar and reschedule buttons: belongs to the Action Hub's first visit, if anywhere.
- Sync failure module: an edge case; include only if he wants it beside the packed week.
- Anything about his own schedule or his private notes: never copy.

## Order inside the section (from his walkthrough)

Suggested times hands in from section 7, then 1 and 2 (optional, and what the calendar is for), 3 (setup, if he shows the setup screen; open), the schedule view and how clicking an Action Item ties back to the list view, 4 (reschedule), 5 (packed week).

## For him

- Is anything here not core, or is a core decision missing?
- Does the setup screen (decision 3) stay in the case study?
