# Calendar setup: why ask preferred hours and focus hours, and why only those two

Paths are short: P = /Users/chadwickfenner/Code/portfolio/.claude/worktrees/confident-davinci-399677, M = /Users/chadwickfenner/Code/Mondai. Corpus conversations are Chadwick talking with an AI assistant; quotes marked "Chadwick" are his turns, anything else is the assistant and is not his decision.

## What Chadwick decided and said about these questions (the record)

### Takeaway
The record holds his reasons for three of the four things: personalizing at all (people schedule their lives too differently for one structure), focus hours depending on the window, and a minimum window (the scheduler places work in the window minus events, so a short window fails). It does not hold a stated reason for keeping setup to exactly two questions; "Two quick things" is screen copy, and the only onboarding length reasoning is a payoff-screen note in the archive that is unsourced.

### Cited Findings
- Personalizing at all, his words: "there is too much variance in how people schedule their lives for the approach to work for everyone", and overly structured calendar integration "feels like we are emulating the structured nature of traditional education". CONFIRMED, his DM, 13 Feb 2025. P/reference/cs1/CS1-PRIMARY-EVIDENCE-VERBATIM.md:80. (CS2 rule: no quoting anyone in CS2 copy; use as reasoning, not as a quote. The same message names the founder; never name him in CS2.)
- The founder replied granting him freedom to implement calendar integration "in a user-centric way". CONFIRMED but founder's words, line 88. Background only.
- His original brief for the setup step: a hard range ("only schedule between the hours of 8am and 9pm") plus a "preferred" time range ("if i like to work on tasks in the morning, afternoon or evening more"). CONFIRMED, his turn, C429 (M/corpus/conversations, the 2026-04-29 calendar-integration-flow-in-action-hub file):43. Note: at this point the window was a hard limit.
- Focus hours depend on the window: "it doesnt make sense from the user perspective if they first set their start time at 8:00am then they choose a focus best option that says 6am. those values have to be dependent on what the user puts in the schedule window." CONFIRMED, same file:471; also P/reference/cs2/reasoning/calendar-and-schedule.md:123-127.
- Minimum window: he proposed "somewhere between 8-12 hours" (file:471), the assistant then said no minimum (file:518), and he reversed it: "how the hell is calendar sync going to schedule action items within a 2 hour window for instance if the user has events overlapping." CONFIRMED, file:531; P/reference/cs2/reasoning/calendar-and-schedule.md:108-117.
- He also doubted 8 as too small: "If the user's calendar events start at say 8am and they are working all day then 8 hours only lasts until like 4pm?" CONFIRMED, P/reference/cs2/reasoning/calendar-and-schedule.md:119-120 [2026-04-29 #0014].
- Final rule settled later: "Eight hours, unless research says otherwise. His reason is the scheduler's, not the user's: without a floor the AI has no boundaries to place work inside, and a one-hour window cannot work." CONFIRMED (his answers doc), P/reference/cs2/reasoning/CHADWICK_ANSWERS_2026-08-27.md:30-32.
- Range suggested from the calendar: he asked whether, since the calendar is already synced, the AI should use the known schedule rather than ask cold (file:566), and then proposed "suggestions like optimal time window" (file:604). The shipped frame text: "Based on your calendar, we suggest a range between 8AM and 9PM." CONFIRMED as frame copy relayed in C519 (M/corpus/conversations, the 2026-05-19 capacity-modification-placement-in-onboarding file):2457 (assistant turn transcribing the frame).
- The focus options as they stand on the frame: "Mornings (8AM to 12PM), Mid-day (12PM to 4PM), Evenings (4PM to 8PM), Late night (8PM to 12AM), No preference", titled "When do you focus best?", description "This helps Mondai prioritize your tasks based on the times you're the most productive." CONFIRMED as frame copy, same file:2459-2464. Note the fixed hour ranges here do not derive from the window, which is in tension with his file:471 rule; P/reference/cs2/reasoning/calendar-and-schedule.md:221-222 flags that the record never closes which one shipped.
- Frame subheading: "Two quick things before we go. We need to know when you're off-limits and when you focus best." CONFIRMED frame copy, same file:2451. This is the only place "two" appears as a design fact; no reasoning for two is recorded.
- "Sharpest hours" wording: the assistant offered "Let's find your best hours"; he rejected it ("wtf?") and the title became "Pick your sharpest hours". CONFIRMED, C429:676-691, 741; P/reference/cs2/reasoning/dossier-findings-22oct.md:267.
- Preference, not limit: corrected by Chadwick 26 Oct: "the range guides placement, it is not a hard limit. The setup screen line 'Mondai will only place action items inside your selected time frame' states the old meaning." CONFIRMED, P/reference/cs2/core/section-8.md:21. Approved copy: "They are preferences, not limits. The range needs at least eight hours, because Mondai can only use the time not already taken by the person's own events." P/reference/cs2/reader-check/known-calendar.md:10.
- Why the focus hours sit inside the range: "focus hours outside the range would point at times the person rarely has." P/reference/cs2/core/section-8.md:22.
- Custom availability only exists for people who synced a calendar; skipping sync goes straight to capacity. M/mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md:302.
- Onboarding length: the archive says "teaching-heavy onboarding tests as universally hated" and the user "has been through a lot of setup by this point". UNSOURCED in the record, M/mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md:306. Do not cite as research.
- Calendar optional at all: a one off push to schedule slightly lowered persistence for 18,000 online learners (Baker, Evans and Dee 2016), already assigned to section 8 decision 1. P/reference/cs2/core/section-8.md:12-13.
- What the record lacks: no user testing on any calendar surface (P/reference/cs2/reasoning/calendar-and-schedule.md:219); the soft warning under 3 hours is an assistant suggestion never confirmed as shipped (P/reference/cs2/reasoning/dossier-findings-22oct.md:288).

### Inferences
- His reason for the minimum is mechanical (available time is window minus events), not psychological, so the eight hour floor should be argued from the scheduler and the free-slot literature, not from wellbeing research.
- The 26 Oct change from limit to preference matters for the research framing: a preference that guides placement is an autonomy-supportive default, not a constraint, which is the SDT reading.

### Gaps
- No recorded reason from Chadwick for exactly two questions. Ask him, or argue it from the published evidence below and mark it as rationale, not history.
- Whether the focus chips shipped as fixed blocks (frame) or derived from the window (his 29 Apr rule).

