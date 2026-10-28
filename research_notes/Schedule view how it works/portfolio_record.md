# Schedule view: the portfolio record (reasoning behind scheduling, calendar sync and the schedule view)

Scope: what the portfolio repo holds about why scheduling exists, what was rejected, and what is already approved nearby. All paths are relative to the worktree root. Source types: HIS WORDS (his own quoted turns, as recorded in a reasoning file), DECISION RECORD (dossier, core decisions, his 27 Aug answers, handoff), DRAFT (canvas or copy not yet approved, or reference only), APPROVED COPY (reader-check KNOWN files, which hold his approved lines). Quotes kept under 15 words. Note: the repo is public and HANDOFF.md:13 says his raw record never goes in git; the short quotes below already sit in committed reasoning files, but the case study copy itself quotes no one (memory rule).

## 1. Why was scheduling built at all? What problem did people have?

### Takeaway
The record frames it as a person problem, not a feature: finding time for a career inside a life that is already full. There is no user research, interview or test behind it; the evidence is his framing, his Feb 2025 argument about variance in how people live, and one outside study used to argue against forcing it.

### Cited Findings
- For users the job is to find time for a career inside a life that is already full; his brochure line, June 2026. DECISION RECORD (dossier) | reference/cs2/reasoning/dossier-findings-22oct.md:207
- His framing of calendar sync as a tool for finding time, 26 May 2026. DECISION RECORD | dossier-findings-22oct.md:209
- His statement of purpose (3 May 2026): scheduling exists to "help the users find time within their busy schedule." HIS WORDS | reference/cs2/reasoning/calendar-and-schedule.md:17-22
- Calendar integration was the founder's idea, not his; inherited. DECISION RECORD | dossier-findings-22oct.md:173, :274. In Sep 2024 he proposed handing it to another designer | :253, :275.
- The risk it had to avoid: overly structured scheduling copies traditional education and ignores how much people vary (his Feb 2025 message to the founder). DECISION RECORD | dossier-findings-22oct.md:210; full message in reference/cs1/CS1-PRIMARY-EVIDENCE-VERBATIM.md:78-88 (13 Feb 2025, verbatim, FACT). The founder replied the same day granting him freedom on implementation | CS1-PRIMARY-EVIDENCE-VERBATIM.md:88; dossier :256.
- Mar 2025: weekly works with or without a calendar and gives structure. HIS WORDS (dossier) | dossier-findings-22oct.md:214. 9 Mar 2025 note: making calendar integration a priority shapes the whole product and may not suit everyone | :257.
- Nov 2025 feedback on the earlier integration: too narrow, visually overwhelming, purpose should be availability only (his notes, Gemini summarised); 18 Nov 2025 he told dev to hold off on all calendar work. DECISION RECORD | dossier-findings-22oct.md:213, :262
- Feb 2026 scope: calendar became a suggestion based system on the home screen, no manual process at MVP. HIS WORDS (dossier) | dossier-findings-22oct.md:246, :264
- Why times show on the list card: to show where the week's items sit among the person's events (3 May 2026). HIS WORDS (dossier) | dossier-findings-22oct.md:304, :327
- A secondary job: for calendar users, the size of the placed block is the only signal of how long an Action Item takes (cognitive load). He said he had not solved it for people without a calendar (2 May 2026). HIS WORDS | reference/cs2/reasoning/action-item-page.md:124-135, :165-168
- Capacity (hours per week) was born partly from calendar sync: he argued the product serves busy people "hence calendar sync as a productivity tool" and full time learners alike (7 May 2026). HIS WORDS | reference/cs2/reasoning/carry-over.md:121-134
- One outside study is cited for this area: Baker, Evans and Dee 2016, a scheduling nudge for about 18,000 MOOC learners that slightly lowered persistence. RESEARCH | reports/Near term goal focus evidence.md:131; used in core/section-8.md:12-14 to argue the calendar is optional.

### Inferences
- The honest "why" for a case study: the calendar answers "when", the week answers "by when". Scheduling was kept because people are busy, and constrained because people vary.
- The estimated-time point is an unclaimed second reason the schedule view matters: it is the only place the sizing unit becomes visible.

### Gaps
- No user testing, interview or analytics on any calendar surface (calendar-and-schedule.md:220; carry-over.md:285 for the adjacent rollover area).
- No interview transcripts or Notion findings about scheduling were found in the repo; Notion findings live outside git (memory note cs2-notion-findings, unconfirmed).

## 2. Alternatives considered and rejected, and why

### Takeaway
Four rejections are in the record with his reasoning: auto rescheduling (feasible, declined as confusing), marking items missed or striking them through (demotivating, and the product cannot know), per item due dates (the week is the only deadline), and hard limits on the setup range (corrected to preferences). A manual mode for packed weeks was also rejected.

### Cited Findings
- Auto reschedule: he first checked it was easy to build ("wouldnt be difficult to reschedule a task"), then declined: "could get really confusing quick in our product." 3 May 2026. HIS WORDS | calendar-and-schedule.md:59-70; decision in dossier-findings-22oct.md:241; core/section-8.md:27-30
- Comparable products weighed for this: Motion auto reshuffles missed tasks without asking; Sunsama refuses as too opinionated (assistant words, 3 May 2026). DECISION RECORD | dossier-findings-22oct.md:222, :249
- Missed or failed treatment: he rejected the first proposals as demotivating and ruled out strikethrough as unmotivating. HIS WORDS (paraphrased in file) | calendar-and-schedule.md:46, :72-74
- Inferring completion from a passed time: rejected because "the system isnt a living being"; whether it got done is "a person level check." 3 May 2026. HIS WORDS | calendar-and-schedule.md:48-57; THROUGHLINES.md:141-153
- Per item due dates: "schedule are recommendations and assistance tools not due dates" (30 May 2026). HIS WORDS | calendar-and-schedule.md:29-36; dossier-findings-22oct.md:73, :240
- Earlier options he had himself: Mar 2026 expired task options (extend with flex points or push to next week); flex later killed. HIS WORDS (dossier) | dossier-findings-22oct.md:60; carry-over.md:36-44
- Three schedule modes (Mar 2025: general, scheduled days, scheduled with calendar) superseded. DECISION RECORD | dossier-findings-22oct.md:217; core/section-8.md:43
- Hard limits: the setup range guides placement, it is not a hard limit; corrected by him 26 Oct 2026. DECISION RECORD | core/section-8.md:21. Approved copy: "preferences, not limits" | reader-check/known-schedule.md:9
- Schedule window minimum: he first accepted no constraint, then reversed one message later because a 2 hour window with overlapping events cannot be scheduled; also rejected 8 hours as maybe too little (29 Apr 2026). HIS WORDS | calendar-and-schedule.md:108-121. Settled at eight hours "unless research says otherwise" (27 Aug 2026) | reference/cs2/reasoning/CHADWICK_ANSWERS_2026-08-27.md:30-32. An assistant proposal of a soft warning under 3 hours is unresolved | dossier-findings-22oct.md:224, :288
- Packed week: assistant offered adjusting availability or a manual mode; he proposed switching to the non calendar list because a manual flow is a lot of work for a fringe case (28 Apr 2026). HIS WORDS (dossier) | dossier-findings-22oct.md:226, :238; core/section-8.md:32-36. Whole week versus only unplaceable items: he picked only unplaceable items on 26 Oct | core/section-8.md:3
- Hiding the schedule view without a calendar: rejected; it stays visible as an empty state offering to connect (10 Mar 2026). HIS WORDS (dossier) | dossier-findings-22oct.md:314, :329
- A toggle for calendar mode on the Action Hub: rejected (19 May 2026) | dossier-findings-22oct.md:229, :322. A popover for sync settings: rejected for a context menu, because sync is turned on or off, not only connected (31 May) | calendar-and-schedule.md:147-154

### Inferences
- "We decided against it" beats "we did not build it": the auto reschedule record has both halves two messages apart (calendar-and-schedule.md:69-70, :199-202 makes this point).

### Gaps
- Who decided sync is read only is not in the record; it appears only as a locked decision in an assistant recap (dossier-findings-22oct.md:285, :289).
- Whether Motion shaped anything beyond the auto reschedule call (dossier-findings-22oct.md:293).

## 3. Suggested times as suggestions, Mondai never moving times, passed times, one card in both views

### Takeaway
All four are settled and his approved lines exist. A passed time is a soft reminder with no consequence, the item stays open until Saturday night, and the card is one component in both views. The calendar block dimming is the one detail not confirmed by him.

### Cited Findings
- Approved Scheduled times copy (his lines): a person can move any Action Item whenever they want; Mondai never moves one, because self shifting times "get confusing fast"; the first time is a suggestion; a passed time drops off the card and the item stays open. APPROVED COPY | reader-check/known-setup.md:9 (also known-calendar.md:9)
- The approved merged schedule view block (27 Oct): same week, same Action Items, clicking opens the same card as the list; the reschedule menu shows the first given time; a passed block dims and the time drops off the card; "Nothing is marked missed." APPROVED (merged block) | reference/cs2/reader-check/runs/2026-10-26/sched.txt:1-6; approval recorded in HANDOFF.md:24 and commit 17690d7 (27 Oct 2026)
- Passed time, his resolution: alert "in some kind of SOFT way" that adds no anxiety; "no harm or foul" because it is still due Saturday 11:59pm. HIS WORDS, 3 May 2026 | calendar-and-schedule.md:48-53
- The time can leave the card once it no longer applies; the schedule icon stays for rescheduling at will (3 May 2026). HIS WORDS (dossier) | dossier-findings-22oct.md:242
- Dimming in place came from the Google Calendar precedent, in assistant turns, not his. DECISION RECORD | calendar-and-schedule.md:72-73; flagged unconfirmed in commit d3b2fba (26 Oct 2026 handoff)
- One card component in both views; reschedule menu shows the first scheduled time: version 2 built from the 3 May record, which he built into Figma. DRAFT then APPROVED | commit d3b2fba handoff text; HANDOFF.md:24
- Card shows the scheduled time; schedule view shows where items sit among the week's events (3 May 2026). HIS WORDS (dossier) | dossier-findings-22oct.md:327
- A first visit tooltip on the time slot says Mondai picked it from availability and the icon reschedules it (9 May 2026 idea). DRAFT copy | reference/cs2/copy/section-7.md:31-33; dossier-findings-22oct.md:243. Cut from section 8 as belonging to the first visit | core/section-8.md:46
- Disconnecting a calendar loses nothing that mattered, because the schedule never held the commitment. DECISION RECORD (reasoning) | calendar-and-schedule.md:34-36, :189-193

### Inferences
- The restraint is a pattern, not a one off: "Active" over "In Progress", passed slots not inferring completion, declared over observed capacity (THROUGHLINES.md:141-153).

### Gaps
- His own confirmation that the calendar block dims (versus only the card dropping the time).
- Date conflict to resolve before any copy: his 3 May line says "due at sunday at 12am" (calendar-and-schedule.md:21) while the same thread says "11:59pm on saturday" (:52). Approved copy uses Saturday night (known-schedule.md:5). Equivalent in practice, but do not quote the Sunday wording.

## 4. Research and principles cited for this area

### Takeaway
Thin and mostly negative: one MOOC study against forced scheduling, Google Calendar as a dimming precedent, Motion and Sunsama as rescheduling comparators, and his own research brief. One cited source (Precious app) has no trace.

### Cited Findings
- Baker, Evans and Dee 2016, N = 18,043, scheduling nudge, slight harm. RESEARCH | reports/Near term goal focus evidence.md:131. Placement: it lives in section 8, not section 3 card 02 (core/section-8.md:3); section 3 card 02 still carries it in his 22 Oct edit (draft/COPY_EDITED_BY_CHADWICK_22OCT.md:35) and HANDOFF.md:46 has the drop as an open question.
- Kizilcec et al. 2020: plan making raised early engagement, not completion, across about 250,000 learners. RESEARCH | reports/Near term goal focus evidence.md:53 (not yet tied to calendar copy).
- Google Calendar precedent for dimming past events (assistant turns, 3 May 2026). calendar-and-schedule.md:72-73
- Motion and Sunsama on rescheduling (3 May 2026); Motion and Fantastical as 2024 calendar examples. dossier-findings-22oct.md:219-222. Motion naming is kept for the competitive analysis card, not this block | core/section-8.md:44; his 26 Oct talk-through said no Motion name (commit 457275a handoff text).
- His research brief for this question, in order: research, comparable products, psychology of the person, then UI last (3 May 2026). HIS WORDS | calendar-and-schedule.md:83-93
- Block rule he restated: never cite research inline; a sources line at the bottom of the block. DECISION RECORD | HANDOFF.md:30
- Behavioural evidence for this block is being gathered separately: research_notes/Schedule view how it works/behavioral_evidence.md (adjacent researcher, not read here).

### Gaps
- "Precious app research on missed session language" is in the Mondai archive with zero matches in 154 conversations; do not use | calendar-and-schedule.md:204-208.

## 5. The most memorable design tension

### Takeaway
The two clocks: a calendar user's Action Item has a time on Tuesday and a deadline on Saturday night, and the design had to decide which one counts. He chose the week, which turned the calendar into an assistant with no authority: it suggests, never moves, never marks anything missed and cannot fail the person.

### Cited Findings
- He named the two clocks himself: a scheduled time "exists outside of the weekly framework" (3 May 2026). HIS WORDS | calendar-and-schedule.md:13-25
- The governing principle and everything that follows from it (read only sync, soft passed slot, no auto reschedule, non destructive disconnect). DECISION RECORD | calendar-and-schedule.md:27-36, :189-197; listed as missing from the Mondai archive | THROUGHLINES.md:113-114
- Supporting angle: declining auto reschedule after confirming it was trivial. calendar-and-schedule.md:59-70
- Supporting angle: the system refusing to claim knowledge it lacks. THROUGHLINES.md:141-153

### Inferences
- For a hiring manager the memorable line is the authority split, not the feature list: the calendar knows when you are free, only the person knows whether the work got done.

### Gaps
- No evidence of how real users reacted to a passed time.

## 6. What nearby blocks already say (do not repeat)

### Takeaway
Order is Action Hub (the list) > Calendar setup (sync unlocks the schedule view) > The schedule view > Get ahead (recommended) > Rollover. The schedule view block is already approved and now owns scheduled times, rescheduling and passed times.

### Cited Findings
- Reader already knows: one Saturday night deadline, capacity sizing, the Action Hub list, Pathway target and pace, and the full calendar setup copy (preferred hours, focus hours, preferences not limits, eight hour floor and why). Not yet known: the schedule view, suggested times, rescheduling. APPROVED COPY | reader-check/known-schedule.md:5-11
- Action Hub block approved 26 Oct: headline about the one screen people come back to; rail note on near goals (Bandura and Schunk 1981; Latham and Seijts 1999); no streak. APPROVED | reference/cs2/core/action-hub-versions.md:3-13
- Move of Scheduled times out of the Action Hub into the schedule view block, approved 27 Oct. HANDOFF.md:24
- Rollover knows the passed time line and that sync unlocks the schedule view. known-rollover.md:9-10. Get ahead placement recommended after the schedule view; streak question open. core/get-ahead.md:19-22; HANDOFF.md:26
- Packed week fallback and the optional calendar (18,000 learners) are core decisions for this section with no approved copy yet. core/section-8.md:11-36; section-8-copy.md is reference only, never a proposal (:3)
- Stale: known-calendar.md and known-setup.md still list scheduled times before the schedule view; update when the Figma order changes. HANDOFF.md:24. His setup screen subtitle still states the old hard limit meaning (commit c295d7b handoff text).

### Gaps
- Whether the packed week notice gets its own block or joins the schedule view block is not decided in the files.
