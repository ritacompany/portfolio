# Mondai schedule view: how it works

All paths are under /Users/chadwickfenner/Code/Mondai. Source keys used below:

- ARCHIVE = mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md (canonical product doc, corrected at decision time)
- RULES = mondai/reference/PRODUCT_RULES.md
- SCREENS = mondai/reference/desktop-screens/ (PNG exports of the shipped desktop MVP, 20 Sep 2026; README line 3)
- FIGMA = Desktop 1 (MVP) file 5RO0m4bYYrTvbiaOgaU3tI, node 2882:34507, the schedule view frame (viewed live 28 Oct 2026)
- Corpus transcripts, all in corpus/conversations/, named by date and slug (filenames abbreviated with * to avoid the double hyphen in the real names):
  - C0324 = 2026-03-24*calendar-integration-flow*
  - C0428 = 2026-04-28*understanding-the-action-hub-page*
  - C0429 = 2026-04-29*calendar-integration-flow-in-action-hub*
  - C0430 = 2026-04-30*ai-driven-scheduling-onboarding-design*
  - C0503 = 2026-05-03*reconciling-calendar-scheduling-with-weekly-framework*
  - C0504 = 2026-05-04*action-hub-schedule-view-design-constraints*
  - C0520 = 2026-05-20*scheduled-mode-action-items-rescheduling-architecture*
  - C0528 = 2026-05-28*mvp-framework-documentation-for-swyam*
  - C0530 = 2026-05-30*calendar-integration-toggle-placement-solution*
  - C0810 = 2026-08-10*calendar-view-documentation-for-mobile-design*

Corpus files are design chat transcripts. Where a line is the AI assistant speaking, the fact is only as strong as Chadwick's reply to it; I note when he confirmed. Recency order: C0324 oldest, then C0428 to C0530, then C0810, then SCREENS (Sep) and FIGMA (live). ARCHIVE has no per-section dates.

## 1. What the schedule view is, what a person sees and does

### Takeaway
A Sunday to Saturday week grid on the Action Hub that shows the same week's Action Items placed as timed green blocks between the person's own synced calendar events. Every block, tall or short, opens the same anchored popover, and the popover is where the actions live.

### Cited Findings
- Two views: List is the default and always available; Schedule is the same week's items placed against real calendar events, available only with calendar sync. It answers "when am I doing this in the context of my actual week." ARCHIVE:154-158
- Switch is a List / Schedule segmented control top right of the item list, with a calendar icon button to its right. SCREENS action-hub/list-view.png; ARCHIVE:390-395
- Three entities on the grid: Action Item (green, carries state, reschedulable within the week), Mondai event (magenta, RSVP not move), external calendar event (source colour, read only). Colour signals what you can do before you touch the card. ARCHIVE:162-168
- Grid chrome: weekday header (e.g. SUN 24 to SAT 30) with today highlighted, an ALL DAY row, hour rows down the left, past/current/upcoming date states. C0810:152-153, 311-313; FIGMA (Tue 26 highlighted, Sun 24 and Mon 25 dimmed)
- FIGMA hour rows run 6AM to at least 8PM; onboarding slider spans 6AM to about 12AM. FIGMA; SCREENS onboarding/step-2-time-boundaries.png; C0429:649
- Card sizes in the design system: 1 HR, 45 MN, 30 MN, 15 MN and Untethered (all day / multi hour), each in Default, Hover and Selected. C0810:311
- Tall cards are 30 min or more; short cards are under 30 min, drawn in 15 minute segments and too small to show title, time or status. C0810:121-123; C0504:160; ARCHIVE:172
- Card content: mono caps eyebrow (e.g. USER TESTING), title, time range with arrow ("3pm → 4pm"), status. C0810:150
- FIGMA example week (Aisha): Work 8AM to 2:30PM Mon to Fri at Franklin University, school pickup, pottery class, dinners, "Do taxes", Sam's birthday in the all day row. Action Items sit in the gaps: Sun 9AM "Write a discussion guide" (completed, greyed), Tue 4 to 5PM "Conduct usability testing sessions" (ACTIVE, green border), Wed 6 to 7PM "Synthesize usability findings" (NOT STARTED), Fri 3 to 4PM "Update wireframes based on findings" (NOT STARTED). FIGMA
- Popover anatomy in FIGMA: "02 PATHWAY · WEEK 3 | USER TESTING", title, ACTIVE, a day and time line, then three rows: Go to action item (chevron), Mark as complete (check), Reschedule (icon). FIGMA
- One popover, content variants for active item, completed item and Mondai event; it serves tall cards as an action surface and short cards as an action surface that also restores dropped content. ARCHIVE:170-174
- It is deliberately not a detail viewer; full detail lives on the Action Item detail page. ARCHIVE:176
- Live variant list in the design system (Aug): Not Started, Active, Complete, External Event (no actions), Mondai Event (View details only). C0810:312
- Per the Aug read of Figma, "Go to action item" is primary in every variant, the state action (Mark as complete / Mark as active / Undo completion) is second, Reschedule third; completed items keep Reschedule; label is "Undo completion." Chadwick replied "just go." C0810:321-331
- Popover actions mirror the List view; Chadwick: same interactions as the list, no reason they would differ. C0810:183
- Sequence gating: only the Active item can be marked complete; Not Started items are viewable, not actionable; Active is system assigned by sequence. ARCHIVE:196-200. Within the current week every item is visible and reschedulable, completion is gated by sequence; future weeks are locked and not shown. C0504:116-121, 129-138
- Considered and rejected interactions: card click straight to detail (C0504:283), bottom sheet on tap (C0504:49), long press (C0520:69). Final: tap or click any card opens the anchored popover (C0520:110-123). Hover preview is a desktop nice to have only. C0520:146 region (edge case 6)
- Drag to reschedule is not in MVP; marked v2. C0810:141; C0520:146
- Early March concept (superseded) had source layer toggles, an "unscheduled tasks" side panel for drag to schedule, and the all day row holding week assigned but unplaced tasks. C0324:22

### Inferences
- INFERRED: In FIGMA, external events carry a magenta dot and grey border, while ARCHIVE:166 says "source color." The dot colour may be a placeholder; check before stating colours.
- INFERRED: In FIGMA the popover reads "FRI: 9AM → 10AM" for an item drawn Tue 4 to 5PM, and its row order puts Go to action item first. Mockup text, not a mechanic.
- INFERRED: FIGMA places items in sequence order across the week, one per day with free days between, never inside work hours.

### Gaps
- No written spec for the all day row in the current model (who goes there besides external all day events and Untethered items).

## 2. How Mondai chooses a suggested time

### Takeaway
The docs say only what goes in: open calendar time, the person's boundaries and sharpest hours, and item duration. Placement is read only and never overlaps an event. No ordering, spacing or cognitive load rule for placement is written down.

### Cited Findings
- For MVP, AI picks the times instead of a scheduling flow. C0430:12
- Inputs, per the assistant (accepted by Chadwick): available calendar windows, user preferences, task duration; the same function runs at hour 0 or hour 72. C0503:356
- Placement goes in open blocks; read only sync, reading availability is enough. ARCHIVE:405-411
- Boundaries step (shipped): "PREFERRED TIME FRAME / Set your boundaries." Subcopy says Mondai will only place items inside the selected time frame. Range slider 6AM to about 12AM, a "Mondai suggests" callout ("Based on your calendar, we suggest a range between 8AM and 9PM"). SCREENS onboarding/step-2-time-boundaries.png
- Sharpest hours step (shipped): "SELECT YOUR SHARPEST HOURS / When do you focus best?" Subcopy says it helps Mondai prioritize tasks by your most productive times. Tiles: Mornings 8AM to 12PM, Mid-day 12PM to 4PM, Evenings 4PM to 8PM, Late night 8PM to 12AM, No preference. SCREENS onboarding/step-2-time-boundaries.png
- Window minimum history: assistant proposed 8 hours (C0429:479), Chadwick said too little (C0429:490), 10 proposed (C0429:500), Chadwick: "no constraint" (C0429:514), then reopened (C0429:531). Landed as no hard minimum, soft warning under 3 hours, and a "can't schedule" state downstream. C0429:553-559, 653
- Cognitive load is sized per Action Item; weekly bundling never exceeds declared capacity. That governs how many items a week gets, not when they sit. ARCHIVE:102-106; RULES:29
- March idea (flex era, superseded): a suggested time should explain itself ("calendar gap + habit reasoning"). C0324:3344, 3370. Not seen in later designs.
- Onboarding coach mark idea: "Mondai picked this time based on your availability." C0430:71, 109. No evidence it shipped.

### Inferences
- INFERRED: The 8 hour minimum in the case study brief has no surviving decision in the Mondai repo. The only 8 hour mention is a rejected proposal (C0429:479-490). Chadwick should confirm against Figma before using it.
- INFERRED: The shipped copy treats boundaries as a hard limit ("only place inside"), and sharpest hours as a preference ("prioritize"). The brief's "preferences, not limits" fits sharpest hours only.
- Contradiction: C0429:657 specced dynamic chips (thirds of the window: Early, Mid-day, Later). SCREENS shows fixed ranges in five tiles. SCREENS is newer and wins. The "No preference 8PM → 12AM" sublabel in SCREENS looks like a copy slip.

### Gaps
- No written placement algorithm: order of items, use of sharpest hours, buffers around events, spreading across days, weekends. C0504:75 raised whether placement follows the completion sequence; no answer found.
- No doc says whether Sunday or Saturday are placeable. FIGMA has an item on Sunday, so weekends are not excluded.

## 3. The Action Item card: list vs schedule

### Takeaway
In List, a card is a full width row with a status circle and the scheduled time with a reschedule icon. In Schedule, the card is a time block and the anchored popover carries the actions. Reschedule opens a "SELECT A NEW TIME" panel, not a drawer or a modal.

### Cited Findings
- List card (shipped): status circle on the left, title, one line description, focus area tag (USER TESTING), time like "MON: 9AM → 10PM." Small popovers off the circle: "Mark as complete", "Undo completion", "View action item / More actions available when this action item becomes the active one." SCREENS action-hub/list-view.png
- List interaction model: card body goes to detail, left circle handles status. C0504:151
- Schedule card opens the anchored popover; "Go to action item" goes to the full Action Item detail page. ARCHIVE:170-176; C0520:110-123
- Reschedule surface (shipped): anchored panel "SELECT A NEW TIME", DAY pills Sun to Sat, OPEN TIME BLOCKS pills (5:30pm, 6:00pm ...), Cancel / Confirm. SCREENS action-hub/list-view.png; ARCHIVE:180
- The May sheet design had free time fields and the line "Move within this week. Pace date will adjust if needed." C0810:141. Superseded by open block pills. ARCHIVE:184
- Popover closes when reschedule opens; schedule updates, card moves. C0520:146
- For integrated users the card shows the scheduled time; non integrated cards show no time. C0503:322, 330

### Inferences
- INFERRED: "Drawer, modal or side panel": none. Both the card popover and the reschedule picker are anchored popovers on desktop (SCREENS, FIGMA). C0520 says "bottom sheet," which was mobile first framing.

### Gaps
- No live Figma read of the schedule view reschedule state (node 2882:34603 exists per process/token-picker/colour-by-job/CHANGELOG-mvp.md:623).

## 4. Rescheduling and whether Mondai re-places items

### Takeaway
Rescheduling is the person's move, within the week, into open blocks only. Mondai does not auto-move missed items. It only re-places on reconnect, and strips times when the week will not fit.

### Cited Findings
- Within week only; next week is Rollover's job. ARCHIVE:182; RULES:35; Chadwick: C0810:184
- Open block pills, not free time entry, so an Action Item can never land on a meeting. ARCHIVE:184
- Header "SELECT A NEW TIME" not "RESCHEDULE," on purpose. ARCHIVE:186
- Reschedule lives on the schedule view, because that is where the decision happens. C0520:110, 140
- Auto reschedule was explored (Motion reshuffles missed tasks, C0503:281) and Chadwick said no: "could get really confusing." C0503:379. Sunsama precedent: it refuses for the same reason. C0503:580
- Reconnect mid-week: AI re-places the current week, state preserved. C0810:147 (from the C0528 spec, which is a PDF not in the repo)
- Disconnect: scheduled times go away, back to weekly list. ARCHIVE:386. Broken / revoked sync acts as non integrated plus a reconnect nudge. ARCHIVE:388
- Turn off sync confirm: "Turn off calendar sync?" with Keep sync on / Turn off sync (destructive). C0530:1224

### Gaps
- No rule for a new external event that lands on an already placed Action Item. Read only sync and open blocks prevent overlap when placing or rescheduling. A calendar changing after placement is never addressed. Mark as an open question.

## 5. When a scheduled time passes

### Takeaway
Nothing punitive. The item stays fully completable until the week ends; no "missed" language, no auto move. Sources disagree on whether the time dims or vanishes from the card.

### Cited Findings
- ARCHIVE version: time dims to lower opacity, reschedule gets a slight lift, card body stays active, no strikethrough or "missed." ARCHIVE:188-194
- Why: Precious app study, "you missed your training session" drove disengagement; Zeigarnik effect means the person already knows; Google Calendar 2011 dim past events precedent; fading the whole card says the item is dead. ARCHIVE:192-194, 524; C0503:558-560, 576
- SDT autonomy supportive feedback, no judgment, offer choices. C0503:566-572
- LATER in the same session Chadwick proposed the time disappears entirely, with the icon left to reschedule (C0503:622). Agreed (C0503:626-659). The original time moves into the reschedule menu: "Originally scheduled Fri 3pm → 4pm." Chadwick confirmed (C0503:667-695).
- Reason given: passed time, never scheduled and couldn't fit all collapse into one card state; no Saturday "wall of dimmed cards"; "the system is not keeping score." C0503:630-634
- C0530:96 restates: when a scheduled time passes it silently disappears from the card.
- C0810:197 (Aug) re-read C0503 and reported "dims," missing the later turn.
- Item does not auto fail; stays completable through the end of the week. C0810:147; C0528:80

### Inferences
- Contradiction: ARCHIVE:190 (dim) vs C0503:622-695 and C0530:96 (disappear). C0503 shows dim was decided first and replaced within the same session; C0530 (later) repeats disappear. ARCHIVE appears to carry the earlier version. Check Figma before writing this beat.
- INFERRED: Either way, on the grid the block stays where it was (no auto move); only its time label treatment is in question.

## 6. What the schedule view does that the list cannot, and why

### Takeaway
It turns "this week" into "this Tuesday at 4" around the person's real life, and gives the most context for moving something. With no calendar to place against it would be worse than the list, so sync gates it.

### Cited Findings
- Chadwick: scheduling helps people find time in a busy schedule to move forward in their career; that is separate from the weekly framework. C0503:12
- Two date model: scheduled time is a helper, not a deadline; the week end is the one deadline for everyone. C0503:86-87, 303. Things (When vs Deadline), Asana, Motion, Morgen precedents. C0503:301
- Without calendar data the grid degrades to a blank grid with only Mondai items, worse than list, so the tab is hidden or disabled. ARCHIVE:160, 584
- Schedule view is the point of highest context for a reschedule; forcing a trip to list is "gatekeeper behavior." C0520:140
- Connect prompt lives on the disabled Schedule tab, where the person feels the absence. ARCHIVE:397
- Implementation intentions (Gollwitzer): naming when raises follow through; used to defend the weekly container. corpus/conversations/2026-05-06*simplifying-product-rollover*:2047, 2077

### Gaps
- No Mondai document ties implementation intentions directly to the schedule view; that link would be Chadwick's own argument.

## 7. User research, analytics and principles

### Takeaway
No user research, usability findings or analytics on scheduling or calendar sync exist in the repo. The grounding is secondary research and named principles.

### Cited Findings
- Principles in ARCHIVE: Cognitive Load Theory, SDT, Zeigarnik (do not remind of passed time), Planning Fallacy, Consistency. ARCHIVE:515-529
- Slider research: NN/G slider rules, Baymard (over 50% misread dual sliders), steering law; steppers added for precision. C0429:437-465, 715-717
- Competitive study of calendar popovers (Google, Apple, Notion Calendar, Fantastical, Reclaim, Sunsama); Apple HIG on popovers. C0520:63-71; C0504:253-255
- process/ux-knowledge/A-community-sources.md:120 records that no community sources on scheduling UX were found.

### Gaps
- No interviews, tests or metrics about scheduling found. Any user evidence claim needs a source outside this repo.

## 8. Edge cases

### Cited Findings
- No calendar connected: Schedule tab hidden or disabled; list only; no times on cards. ARCHIVE:160; C0503:330
- Busy week / items that do not fit: Chadwick decided Mondai drops to the non integrated version that week, no decision asked of the person, with a neutral banner. C0428:401-413. Suggested copy: calendar is packed this week so we've removed scheduled times; finish before Sunday. C0428:407 region; quoted as a real artifact in corpus/conversations/2026-06-01*preparing-for-product-manager-interviews*:333
- Orange "Unscheduled" badges were tried first and dropped: not an error. C0428:373, 407
- Contradiction: C0503:622 says only the items it cannot place lose their time (partial). C0428:401 says the whole week switches. C0503 is later. A Figma frame "Non calendar integrated schedule view" carries copy starting "Either your calendar lacks ava..." (process/token-picker/colour-by-job/CHANGELOG-text-levels-mvp.md:81), so the shipped wording differs from both.
- Mondai never places at 3am or over an event just to fit something. C0503:366
- Packed state is distinct from sync failure (refresh action) and from no sync. C0810:147; C0528:72
- Weekends: week is Sunday to Saturday; boundary moments fire Sunday. RULES:26; ARCHIVE:100. FIGMA places an item on Sunday.
- Deadline contradiction: C0503:159 and 211 give the deadline as Sunday 11:59pm on a "Sunday to Sunday" week. RULES:26 and ARCHIVE:100 say Sunday to Saturday. C0528:80 says completable "through Saturday." The canonical docs point to a week ending Saturday night with the new week on Sunday; the 11:59pm Sunday wording predates that.

### Gaps
- No doc on what the grid shows on Saturday night once times have passed, or how Mondai events interact with placement (whether an RSVP blocks time).
