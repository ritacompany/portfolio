# Calendar section: copy check and layout game plan (5 Nov)

Written for the parent session and for his other account, which builds the calendar UI. Read from his frame
4269:9433 (file IarvWaqjIwrZ2afQmMxKm6) on 5 Nov with a read only script, plus a screenshot of the Action Hub
block. Nothing in Figma was edited. The page above the calendar, in frame order: Action hub (with its rail
and Pathway card), then Calendar setup, Schedule view, Scheduled times. Growth Journey and Pathway page are
copy only so far (versions/growth-journey.md, versions/pathway-page.md) and say nothing about calendars, so
they cannot clash. Falling behind and Start of week come after the calendar in the page, so they are checked
the other way round: nothing in the calendar may introduce what they introduce.

What the reader has met by the time the calendar starts: Action Items, Active, the week, the Pathway target,
pace and gap, the hours a person gives each week (Personalized timeline is later in the frame, but the Action
Hub notes already say hours). The Action Hub image already shows the List and Schedule switch with nothing
said about it, so the calendar is where it gets explained. Not yet met: rollover, Saturday night, the
magenta tag, focus hours.

## Part 1: copy check, per line

Verdicts: HOLDS (leave it), WRONG (says something false or broken), REPEATS (already said above or beside it),
TERM (introduces or drifts a term). Fixes are the smallest edit, not a rewrite.

### Calendar setup (frame text)

| Line | Verdict | Fix |
|---|---|---|
| Intro: calendar sync is optional, two quick questions, Mondai plans around the answers | HOLDS | None. First time the page says calendar, so no repeat. |
| Setting a preferred time is the user telling the product their availability. When the product can and can not schedule action items. | WRONG and TERM | The second sentence is a fragment. Preferred time is a third name for the first question (intro says question, next line says range). Fix: The first question asks which hours Mondai may use. That is the person telling it when it can and can not schedule Action Items. Capital A and I on Action Items. |
| The range needs at least eight hours because Mondai can only use time not already taken by their events. A short range on a busy day leaves none. | HOLDS | None. Range is defined by the fixed line above. |
| Sharpest hours are more of a suggestion. Mondai will prioritize that range when a time in it is open. | HOLDS, TERM check | The reasoning holds (focus hours decide which gaps fill first, never a limit). The label has to match the word on the focus screen. Every draft and the handoff say focus hours; the frame says sharpest hours. Confirm the screen label and use that one word in this block and the schedule view. |

### Schedule view (frame text)

| Line | Verdict | Fix |
|---|---|---|
| Headline: with a calendar synced, the Action Hub can show the same week as a schedule, with Mondai finding a time for each Action Item around the person's day | WRONG (small) | Each overclaims. Scheduled times says an item with no room stays in the list with no time. Fix: finding a time for the Action Items that fit around the person's day. Rest holds: same week, Action Hub and Action Item are already introduced. |
| The list view is still accessible because sync is optional and the framework has to work with or without it. The user can easily switch back and forth between the two modes | HOLDS | Not a repeat, because the Action Hub says nothing about the switch. Optional trim: easily and as they choose add nothing. |
| The top row of the calendar is set from the preferred time boundaries, for instance 8am to 9pm, so 8am is the earliest time they see | HOLDS, with two fixes | Typo: top top row. Preferred time boundaries is the old name from setup, use the fixed wording there. The frame image opens at 6AM, so the example and the picture disagree. Make the image start on the same hour the example names (see checklist). |
| One way integration: Mondai reads the calendar, Action Items do not transfer to the personal calendar | HOLDS | None. Not said anywhere above. |
| Action Items and personal events get their own color. Post MVP we will revisit matching colors. | HOLDS, TERM | Colors line holds. Post MVP is a process word a stranger has not met and we is a team fact about a roadmap. Fix: Later I plan to carry over the colors from the person's own calendar settings. |

Missing from the page, owed here and written nowhere in the frame: block length shows how big an Action Item is
(the list cannot show it). Add one sentence beside the calendar image. It repeats nothing.

### Scheduled times (frame text)

| Line | Verdict | Fix |
|---|---|---|
| I wanted to make sure the framework I designed allowed the user the freedom to reschedule their action items. | TERM (small) | Capitalize Action Items. Otherwise holds. |
| This interaction can take place from both list and schedule view variations of the action hub. Mondai never moves one on its own. | WRONG (small) | One has no clear referent, and Action Hub is lowercase. Fix: Rescheduling works from the list and from the schedule. Mondai never moves a time on its own. |
| When the user chooses to switch times, Mondai will offer available times within the user's calendar to reschedule the task to. | TERM | Switch times, reschedule and the task are three words for one action. Fix: When someone moves a time, Mondai offers only open time in that week, so nothing lands on a meeting. Keeps the reasoning (open time only, inside the week) in plainer words. |
| Because calendar integration's position in the product is tool rather than deadline linked, with no impact on weekly progress it's also entirely okay for a action item to not have a scheduled time | WRONG | Run on, a action item and tool rather than deadline linked is jargon. Meaning holds and it is the two clocks point. Fix: A time is there to help someone find room, not to set a deadline, so an Action Item with no time is fine and finishing it counts toward the week the same. Do not name Saturday here, Falling behind introduces it. |
| If someone's calendar has no room at the beginning of a week, the action items that can't be placed stay in the list without a schedule time time, so nothing overlaps their personal schedule | REPEATS and WRONG | Typo: schedule time time. It repeats the previous line (an item with no time is fine). Fold it into the previous line as the cause: when a week has no room the item stays in the list with no time. |

### Earlier drafts (versions/calendar-part.md), line by line

The six schedule view lines in the drafts have mostly moved into the frame. The three Rollover versions no
longer belong here.

| Draft point | Verdict | Fix |
|---|---|---|
| Schedule view headline, A B and C | Superseded by the frame headline | Use the frame headline with the small fix above. |
| Mondai places times from the setup answers, gaps between events, focus hours first | REPEATS in part | Setup already says it fills the sharp hours first. Keep only: it finds gaps between the person's events. |
| Block length shows the size of the Action Item | HOLDS | Missing from the frame. Add (see above). |
| The time is theirs, moved from either view, automatic moving was easy to build and left out | HOLDS | Frame has the never moves on its own half. Add the reason in one sentence: I could have moved times automatically and left it out because a plan that rearranges itself gets confusing. Beside the picker image. |
| Two clocks: a time on Tuesday and the deadline Saturday night | WRONG for this position | Saturday night is introduced later by Falling behind. Say the week is the one that counts and name no day. |
| A passed time drops off the card, nothing marked missed because Mondai cannot see whether work happened | HOLDS | Not in the frame. Add one sentence beside the picker image or leave out for space. It is the softest point, so cut it first. |
| One way sync | REPEATS | The frame already says it. Drop from the drafts. |
| Anything still open on Saturday night goes to rollover (Schedule C) | WRONG | Names rollover before the page introduces it. Drop. |
| Rollover A, B and C: the stakes, three options, the decision, carried tag, target and pace | REPEATS | Falling behind now owns the stakes and the rollover sentence, Start of week owns the magenta tag, the Action Hub owns pace. His comment on Falling behind was that options not taken confuse. Drop all three. Sources Rai, Sharif, Chang, Milkman and Duckworth 2022 and Silverman and Barasch 2023 leave with them. |

Summary: of the 14 frame lines, 4 hold as written, 4 hold with a typo, capital letter or word check, and 6
need a real fix (preferred time fragment, each Action Item, rescheduling referent, switch times wording, the
deadline sentence, the no room sentence). One point is missing (block length). The Rollover drafts are out.

## Part 2: layout game plan

Goal: more content sits higher, so the reader sees the substance before scrolling.

### Points

A. Same week, two views: the list stays home, the schedule is one switch away (needs the image).
B. How times land: gaps between events, hours from setup, block length is the Action Item's size (the image
   shows it).
C. The time is theirs: moved from either view, open time only, never moved on its own (picker image).
D. A time is help and not a deadline: no time is fine, a full week stays in the list.
E. One way sync and colors: Mondai reads and never writes (a text point, the image shows the colors).

### Recommendation: T2I media and body, merging Schedule view and Scheduled times into one block

Calendar setup keeps its own block above and is untouched. Schedule view and Scheduled times become one block,
the decision already in the handoff (the schedule view plus his smaller interaction square).

- Large image (1090 by 749 pool, about 1065 by 732 at his margins): the week calendar. It carries A and B
  and E visually: the switch with Schedule active, Action Items placed in gaps in different block lengths,
  the person's own events in their colors.
- Text column beside it (x 1138, width 278, starting at the top): A, B and E in three short paragraphs.
  A beside the calendar because the picture is the same week as the list. B beside it because block length
  is only visible there. E beside it because the colors are on that image.
- Small image (449 by 359 at the bottom right): the reschedule picker with the popover open. C and D go
  together in the open space to the left of it, since a point without an image sits with text beside an
  image, never alone. C because the picker is the proof of open time only. D because the picker only offers
  open time and that is why an unplaced item can stay in the list.

Why this layout over T1I and T3I. T1I gives the calendar a 1156 wide image but only a 212 wide text column
that would stack five points in a thin strip and push text below the fold. T3I needs three images and there
are two. T2I puts the big image and the text column in the first 749 pixels together, then the small image
and its text on the next screen. Reader sees A, B and E before any scroll, which is the goal. Merging also
removes one headline block (about 1500 pixels of the page) and the two paragraphs that repeat each other.

What would change the pick: if he wants a third image (for example the synced screen), T3I. If he insists on
keeping three blocks, keep the layout of each as it is and apply only the copy fixes.

## Part 3: build spec for the calendar image

### His correction, 5 Nov: the Action Items sit at the top of the image

More content up higher means the Action Items, not the text column. In his current image the grid opens early
and the Action Item blocks land low, so a reader sees the top of a calendar with nothing of ours in it. The
build fixes that in the data, not by cropping:
- Aisha's preferred hours start at 8am and her focus hours are the morning (both shown on his setup screens;
  if his boundaries screen says otherwise, use its hours and shift the times below by the same amount).
- The grid's first row is 8am, the same hour the copy example names.
- Every Action Item sits in the first three hours of the grid, so all four blocks are visible above the
  image's midline. Default times, rising with list order and one item per day: Write a discussion guide Mon
  9am to 10am (done), Conduct usability testing sessions Wed 9am to 10am (Active), Synthesize usability
  findings Thu 10am to 11am, Update wireframes based on findings Fri 9am to 9:30am (the 30 minute block).
  This replaces the afternoon defaults in problem 3.
- Aisha's own events fill the afternoons and a few mornings around the Action Items, so the gaps read as
  found, not empty.

### The motion idea: let the reader see more than the top of the calendar

His idea: as the reader scrolls onto the calendar, the calendar scrolls too, so more of the day shows. His
worry: if the reader takes control of the calendar for a moment, they will wonder why they cannot keep
controlling it.

Recommendation: a scroll linked pan inside the image, with no pinning. The page keeps scrolling normally the
whole time. While the calendar crosses the screen, its grid moves up inside its frame in step with the
scroll, from 8am to the evening, then stops when the block leaves. Scrolling back reverses it. The reader
never takes control of anything, so nothing is taken away from them later, which removes his worry.
Why this over the alternatives:
- Pinning the section and scrubbing the calendar while the page stands still is scroll hijacking: the page
  stops responding the way the reader expects, which is the confusion he named.
- Letting the reader scroll the calendar with the mouse inside the frame traps the wheel and breaks page
  scrolling for trackpad users.
- A taller static image shows the whole day but pushes the text and the small image far down, which undoes
  the first correction.
Because the Action Items are at the top, the first frame a reader sees is already the right picture; the pan
only adds the rest of her day. Reduced motion shows the 8am view with no pan. Build it through the code
motion skill (the motion rules in .claude/motion-rules.md), from a tall export of his calendar, never a
redrawn one. The other account works out the exact distance and easing; this is the direction.


Source of truth is the Action Hub list view image in his frame (Action hub block). The hub shows no times
on its cards. The calendar adds times and nothing else new.

What the hub image shows, read 5 Nov:
- Browser chrome at mondaibyrita.com, left sidebar.
- Header: WEEK 3, MARCH 15 - 23.
- Headline: Real users. Real answers.
- AI paragraph: Hi Aisha, this week is about getting out of your head and into theirs. You'll be running usability tests, talking to real users and translating what you learn directly into your designs.
- Counter: 2/4 WEEKLY ACTION ITEMS COMPLETE, and the List and Schedule switch.
- ACTIVE: Conduct usability testing sessions, tag USER TESTING, green outline, subline: Run a moderated usability test with 3 target users on your current prototype.
- NOT STARTED: Synthesize usability findings (tag USER TESTING, subline: Review recordings and notes to identify patterns and prioritize key pain points), then Update wireframes based on findings (tag USER TESTING, subline: Revise your low fidelity wireframes to address the top issues uncovered in testing).
- Below the crop, text layers exist: completed 1 with Write a discussion guide for usability testing (subline: Outline the questions and prompts to guide usability sessions and keep discussions focused).
- Right rail: 02 Cognition Pathway, Pathway target Aug 30 2026, Pathway pace Aug 28 2026, Ahead of target +2d, Growth Journey UX Designer Journey with Discovery complete, Cognition in progress, Branding, Networking, Opportunity not started.
- Focus Areas are not labeled anywhere in this image. The cards carry one tag, USER TESTING, which is a Focus Area tag on every item. Do not add other Focus Area names.
- Hidden text layers on the hub cards (not rendered): Conduct usability testing sessions carries a time FRI 3pm to 4pm, Update wireframes carries Fri 3pm to 4pm, Write a discussion guide carries mon 9am to 10pm. These are leftovers from the scheduling image. Treat them as draft values, not as part of the hub image.

### Problems found in his frame that the calendar cannot copy

Raise these with him before the build. Each one has a default so the build is not blocked.

1. Week dates. The hub says March 15 to 23, which is nine days. March 15 2026 is a Sunday, so a Sunday to
   Saturday week is March 15 to 21. The current schedule view image shows MARCH 15 - 23 above columns SUN 24
   to SAT 30, and Tuesday the 26th, which is not a Tuesday in March 2026. Default: build SUN 15 to SAT 21 with
   header MARCH 15 - 21, and ask him to change the hub header to 15 - 21 so the two match. A seven column
   week cannot carry 15 - 23.
2. Counter. The hub says 2/4 complete but its list names one completed item (completed 1) and three open
   ones. Four items, one done, would read 1/4. Default: build the calendar with the same 2/4 as the hub
   and flag it. If he fixes the hub, the calendar follows.
3. Times against order. Action Items are finished in order, so times must rise down the list. His
   Scheduled times image gives Synthesize usability findings Wed 6pm while the Active item is Fri 3pm, and
   gives Conduct and Update wireframes the same Fri 3pm to 4pm slot. Default set that obeys order:
   Write a discussion guide Mon 9am to 10am (done), Conduct usability testing sessions Wed 3pm to 4pm
   (Active), Synthesize usability findings Thu 2pm to 3pm, Update wireframes based on findings Fri 3pm to
   4pm. The same values go on the Scheduled times small image. The 10pm in the hidden layer is a typo for 10am.
4. Work blocks in his image read 8pm to 2:30pm, which runs backward. Default 8am to 2:30pm.
5. Top row hour. The image starts at 6AM, the copy example says 8am, the earlier draft said 9AM. Default:
   open the grid on the start hour of Aisha's setup answer as shown on his boundaries screen, and use that
   hour in the copy example too.

### Checklist for the build (tick each)

Week and header
- [ ] Header reads WEEK 3 and the same month and dates as the hub (default MARCH 15 - 21, see problem 1).
- [ ] Seven columns Sunday to Saturday, dates 15 to 21, today's column consistent with the Active item.
- [ ] Any date inside the popover, a block hover or tooltip, or the picker uses a day from this same week.
- [ ] No date later in the week than Saturday 21 appears in the grid or in any popover.

Items
- [ ] The four Action Items carry the exact hub titles: Write a discussion guide for usability testing, Conduct usability testing sessions, Synthesize usability findings, Update wireframes based on findings.
- [ ] Conduct usability testing sessions is the only Active item, green outline, same as the hub.
- [ ] Write a discussion guide for usability testing is the completed item and is dimmed, not struck through, not marked missed.
- [ ] Synthesize usability findings and Update wireframes based on findings are not started, in that order.
- [ ] Every item shows the single Focus Area tag the hub shows, USER TESTING, and no other tag.
- [ ] Counter matches the hub (2/4 WEEKLY ACTION ITEMS COMPLETE) unless he has changed the hub.
- [ ] The List and Schedule switch is visible with Schedule selected.
- [ ] Headline and AI paragraph match the hub word for word (Real users. Real answers. and the Hi Aisha paragraph).

Times
- [ ] Times rise with list order, no two Action Items overlap, no Action Item overlaps one of Aisha's events.
- [ ] Block height follows duration, with both an hour block and a 30 minute block on screen, no title in blocks under 30 minutes.
- [ ] Action Items green, Mondai events magenta, Aisha's own events in their source colors.
- [ ] Action Items sit in gaps between her events inside the hours from setup, the sharp hours filled first.
- [ ] The first row of the grid is 8am, the start hour from her setup answer and the copy example.
- [ ] All four Action Item blocks sit in the first three hours of the grid, visible in the top half of the image.
- [ ] Nothing on the image implies Mondai wrote into her calendar.
- [ ] The popover, if open, sits on the Active item and offers Go to action item, Complete (Active only) and Reschedule.
- [ ] The reschedule picker offers only open time inside the same week.

Right rail (only if the image keeps it)
- [ ] 02 Cognition Pathway, target Aug 30 2026, pace Aug 28 2026, Ahead of target +2d, exactly as the hub.
- [ ] Growth Journey states as the hub: Discovery complete, Cognition in progress, the other three not started.

If the rail is dropped for room, say so in the build note so the hub's one target and one pace story is not
contradicted by a different number elsewhere on the page.

## Part 4: the copy, round 1 (5 Nov)

Fixes from Part 1 applied, Schedule view and Scheduled times merged into one block (T2I). Humanizer run as the
skill. Reader check owed. Lines marked keep are his frame text unchanged.

### Calendar setup
- Intro line: keep.
- Replaces the preferred time line: The first question asks which hours Mondai may use. That is the person telling it when it can and can't schedule Action Items.
- Eight hour range line: keep.
- Sharpest hours line: keep, using whichever word his focus screen shows (sharpest or focus) in both blocks.

### Schedule view (merged block)
Eyebrow: Schedule view
Headline: With a calendar synced, the Action Hub can show the same week as a schedule, with Mondai finding a time for the Action Items that fit around the person's day.

Beside the calendar:
The list stays the home view. Syncing a calendar is optional, so the plan has to work without one, and anyone can switch between the list and the schedule whenever they like.

Mondai looks for gaps between the person's own events, inside the hours they chose in setup. Each block is as long as its Action Item takes, and this is the only place someone can see how big a piece of work is before they start it.

Mondai only reads the calendar. It never writes Action Items into it, because that calendar holds commitments Mondai doesn't own. Action Items and the person's own events each get their own color.

Beside the reschedule picker:
I wanted people free to move their Action Items. Rescheduling works from the list and from the schedule, and Mondai offers only open time in that week, so nothing lands on a meeting. Mondai never moves a time on its own. Automatic moving was easy to build, and I left it out because a plan that rearranges itself gets confusing.

A time only helps someone find room. The week is what counts, so an Action Item with no time is fine, and finishing it counts the same. When a week has no room left, the item stays in the list without a time.

Sources: Mondai design record

Reader check round 1 FAIL, two flags 3/3 (runs/2026-11-05-cal1): the 8am top row line (image detail, reads as a hard limit after setup framed hours as preferences) and the later colors plan (nothing depends on it). Both were his frame lines; both cut above. Re-run owed.
