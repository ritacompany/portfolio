# Calendar integration and the schedule view

Two clocks running at once, why the calendar one is advisory, and where the controls ended up.

Sources read in full: `2026-04-29 calendar-integration-flow-in-action-hub`, `2026-05-03
reconciling-calendar-scheduling-with-weekly-framework`, `2026-05-04
action-hub-schedule-view-design-constraints`, `2026-05-30
calendar-integration-toggle-placement-solution` (runs through 31 May). Cross-checked against
`2026-03-24 calendar-integration-flow`.

---

## 1. The problem: two clocks

He named it himself, and it is the reason the whole topic exists:

> "for a user with calendar integration the action item time is scheduled for a specific time based on
> their schedule. so that represents a scheduled date, but that exists outside of the weekly framework.
> the purpose of scheduling is to help the users find time within their busy schedule to move forward in
> their career. again, that's different than the weekly framework... but no matter what theyre all due at
> sunday at 12am no matter what"
> Chadwick [2026-05-03 reconciling-calendar-scheduling-with-weekly-framework #0000]

A calendar-integrated user has a time on Tuesday at 2pm and a deadline at the end of the week. Two
clocks, one piece of work. Everything else in this topic follows from which one is allowed to matter.

**The answer, stated once and never wavered from:**

> "the scheduled date just disappears since the mechanism for completion is end of week. schedule are
> recommendations and assistance tools not due dates this is upsetting for u to ask u should understand
> this."
> Chadwick [2026-05-30 calendar-integration-toggle-placement #0002]

That single sentence is the calendar philosophy. The schedule assists, the week commits. It is what
makes read-only sync coherent rather than a technical limitation, it is why a passed time slot is not a
failure, and it is why disconnecting a calendar loses nothing that mattered.

It is not in the archive.

---

## 2. What happens when a scheduled time passes

This is where the philosophy got tested, because a passed slot looks like failure whatever you do.

He rejected the first proposals as demotivating [#0006], then wrote the resolution himself:

> "i think we have the scheduled time, it passes - the user is alerted in some kind of SOFT way. a way
> that doesnt add anxiety... the system isnt a living being like the ai right so it doesnt 'wonder if the
> user got it done' the state change is not relient on that. so whether or not the user got it done is a
> person level check right - it's more of a reminder to the user that the time passed with no harm or
> foul it is still due at 11:59pm on saturday"
> Chadwick [2026-05-03 #0012]

Two things worth pulling out. The system does not infer completion from a passed time, because it
cannot observe it, which is the same restraint as "Active" over "In Progress" on the Action Item.
And the reminder carries no consequence because the real deadline has not moved.

**He also ruled out automatic rescheduling**, having first checked that it was technically trivial:

> "without being an expert i would think that it wouldnt be difficult to reschedule a task if the ai can
> already schedule a task at the start of the week no?"
> Chadwick [2026-05-03 #0008]

> "so im leaning towards no auto reschedule... i think it could get really confusing quick in our product
> to be honest."
> Chadwick [2026-05-03 #0010]

Confirming a thing is easy to build and then declining to build it is a better decision than declining
because it is hard. The record has both halves, two messages apart.

**The dimming treatment** came from the Google Calendar precedent: the time block stays in place, opacity
drops, information preserved and visual weight reduced [2026-05-03 #0017 and #0019, assistant turns]. He
had explicitly ruled out strikethrough as unmotivating.

---

## 3. His research brief, written out

In the middle of this thread he specified how he wanted the question answered. It is the clearest
statement of his research method anywhere in the corpus and it is reusable:

> "1 what does the research say
> 2 what do other comparable products do
> 3 what we know about people based on psychology, ux, sociology, etc.
>  3.1 what is the user need here?
>  3.2 what does the psychology of the user teach us about how to best help the user navigate this position
> 4 how do comparable products making similar decisions or related decisions handle the ui element of this?
> 5 with all of this how we do handle the ui for this?"
> Chadwick [2026-05-03 #0012]

Note the order. Evidence, then comparable products, then the person, then the UI. The interface question
is last and is treated as an output of the other four.

He also had a tell for when the work had not been done:

> "no bullshit pretending to do the research or just being like oh i already have the info. no, find out
> our best solutions based on ux research, heuristics, other product flows, ui patterns for things like
> this, etc. if you go to fast i'll know you didn't do enough."
> Chadwick [2026-05-03 #0006]

---

## 4. Schedule window and preferred times

The onboarding step that sets the bounds sync operates inside. Two decisions here, both his.

**A minimum window is required, and he worked out why through a counterexample.** He first accepted "no
constraint" [2026-04-29 #0016], then reversed himself one message later:

> "wait sorry i totally looked at this wrong sorry. r u sure a minimum constraint isnt needed? how the
> hell is calendar sync going to schedule action items within a 2 hour window for instance if the user has
> events overlapping."
> Chadwick [2026-04-29 calendar-integration-flow-in-action-hub #0018]

The scheduler needs open blocks, open blocks come out of the window minus existing events, so a window
too small guarantees failure. He also rejected his own first proposed floor for the same class of reason:

> "i could see 8 hours being too little for a variety of reasons. If the user's calendar events start at
> say 8am and they are working all day then 8 hours only lasts until like 4pm?"
> Chadwick [2026-04-29 #0014]

**Preferred times must depend on the window.**

> "the preferred times also needing the time range for those but it doesnt make sense from the user
> perspective if they first set their start time at 8:00am then they choose a focus best option that says
> 6am. those values have to be dependent on what the user puts in the schedule window."
> Chadwick [2026-04-29 #0012]

Which raised a sequencing question he asked rather than assumed: does the window have to be confirmed
before the preferred-time cards can adapt, and if the calendar is already synced at this point, should
the system be proposing windows from the real schedule instead of asking cold [#0020].

---

## 5. Where the controls live

The same information architecture question as capacity, and it resolved the same way.

> "It has a component, not a home."
> Claude [2026-05-30 #0005, assistant turn], summarising the capacity resolution as the precedent

State is expressed at one canonical location and edited from wherever the user is thinking about it.
Calendar sync's canonical home is Settings, with a contextual entry on the Action Hub next to the
List/Schedule switcher.

**He forced the split between connect and disconnect** by refusing a single popover:

> "why would the menu be a popover initially when potentially more than one action could happen with the
> calendar button right? it seems like the logical same location for a user to go to edit those settings
> at any time HENCE why i suggested a context menu with multiple options. It's also not about just
> connecting or disconnecting a calendar its about turning calendar sync on or off remember a user can do
> this when they want."
> Chadwick [2026-05-31, within 05-30 file, #0018]

And he enumerated the states the design had to cover rather than accepting the happy path:

> "what if a user for instance skipped calendar integration during onboarding then selected connect
> calendar then what happens? does it take them to this page? they obvi have to set that stuff up for it
> to work. also what if a user is already integrated and wants to change the settings on the same page?
> ... see you are not looking at all the damn variables here"
> Chadwick [2026-05-30 #0016]

**The sign-in versus calendar confusion trap.** Settings already had Google and Apple toggles for login.
Adding calendar controls would have put two Google toggles on one screen meaning different things. He
caught the language problem before the layout one:

> "dont we probably need better language to make this more clear? like mybe subtext above it or evena.
> title change?"
> Chadwick [2026-05-31, #0026]

That is where the Linked accounts to Sign-in methods rename comes from.

**The Destructive button variant was created here.** He liked a red button in a mock, had no such colour
in the system, and asked the correct question:

> "if i add a red or whatever color you want to call it button like the one you designed what should its
> title be in that like same category of variants make sense?"
> Chadwick [2026-05-31, #0064]

A new component variant named by its role rather than its colour, added because a specific destructive
action needed it. Small, and a good example of the system growing from a real need rather than from
completeness.

---

## 6. Corrections to the archive

**1. The governing principle is missing.**
"Schedules are recommendations and assistance tools, not due dates" [2026-05-30 #0002]. Everything in the
calendar section follows from it: read-only sync, the soft missed-slot treatment, no auto reschedule, and
disconnect being non-destructive. The archive gives read-only a technical reason (permission surface and
data-loss risk) when the real reason is that Mondai has no business writing commitments it does not own.

**2. The two-clock problem is not named.**
The archive documents both clocks in separate places and never states that they coexist or which one
wins. That is the actual design problem of this whole area.

**3. "No auto reschedule" is not recorded as a decision.**
It was considered, confirmed as feasible, and declined on comprehensibility grounds [2026-05-03 #0008,
#0010]. Worth having, because "we didn't build it" and "we decided against it" are different claims in an
interview.

**4. The Precious app reference has no source in the corpus.**
The archive cites "Precious app research on missed-session language" for past-time dimming. Zero matches
across 154 conversations. The dimming decision itself is well sourced, to the Google Calendar precedent
[2026-05-03 #0017, #0019]. Either the Precious reference comes from outside the corpus or it has drifted
in. Do not repeat it in the case study without a source.

**5. The schedule window minimum is undocumented.**
Along with the reason it exists, which is the only reason in this topic that comes from the scheduler's
mechanics rather than from user psychology [2026-04-29 #0018].

---

## 7. What the record does not hold

- The final schedule window minimum value. He proposed 8 to 12 hours, rejected 8, and no number is
  settled in these sources.
- No user testing on any calendar surface.
- Whether the preferred-time cards ended up deriving their options from the confirmed window, or from
  synced calendar data. He raised both and neither is closed here.
- No record of the calendar sync screen in Settings being finished. On 2026-05-31 he was still asking
  where it was [#0046] and calling the attempts "awful" [#0050].
