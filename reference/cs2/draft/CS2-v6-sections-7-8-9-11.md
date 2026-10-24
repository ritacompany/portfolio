Section: 7

<!--
CS2 v6, 24 Oct. All four sections in his layout pattern: eyebrow, headline, a side text of about 55 words,
then frames with a caption under each and annotation notes on a frame where they help.
The spine is motivation: a long journey is acted on one week at a time, so the week is the working surface and
the long goal stays in reach but out of the person's face. Research comes from reports/Near term goal focus
evidence.md (rows it marks safe, hedged as it says) and the reset research in the record. Decision facts reuse
v5 lines that passed four truth reads, his 28 Apr reason for keeping the long goal off the Action Hub, and his
24 Oct ruling that there is no streak.
Lines: Text is paragraph copy. Note is an annotation, label first. Card is a card, label | title | body.
-->

# Section 7: The Action Hub

Eyebrow: The action hub

Headline: Research shows that the user's prime functional experience with the process should be as easily accessible as possible.

Text: Which is exactly what the action hub is. The action hub is one of the primary surfaces the user will interact with. It's the most used touchpoint within an average user's daily flow. Therefore, in the context of the product, motivation became one of the most important factors of this build.

## Right frame: the rail (his text, tidied)

Note: Pathway target | Holds steady through an ordinary week.
Note: Pathway pace | Where their progress is heading. It moves once a week, so nobody watches it tick with every finished item.
Note: Ahead of target | The gap between the two dates, the only ahead or behind signal. There is no streak.

Text: The rail keeps the Pathway's own target and pace. Research shows people keep going when they work from a small weekly set, with the long goal in reach but not in front of them. So keeping people focused on their progress in their current Pathway results in a more motivated user.

## Left frame: the Growth Journey page

Text: The whole journey lives one click away on the Growth Journey page, with its own target and pace. In classic small studies, a distant goal on its own did no better than no goal, and adults did best when near goals were added to it. A goal that feels too far away to reach wears motivation down, so the long goal stays in reach, off the week.

## Next block: suggested times

Eyebrow: Suggested times

Headline: The time on an Action Item is a suggestion, because the week has one deadline and it falls on Saturday night.

Text: A synced Action Item gets a time placed around the person's calendar, and that time lives outside the weekly framework. Nothing is due until the week ends, so a passed time quietly leaves the card and nothing marks the item late. The system cannot see whether someone did the work at 3pm or 9pm, and it should not pretend to know.

Note: Suggested time | Placed around the person's calendar.
Note: Reschedule | Moves the time whenever the person wants.

Text: Motion came up in the research I asked for, and it moves a missed task to the next open slot on its own. Auto rescheduling looked easy for us to build too, and I declined it because times that move by themselves get confusing fast. The person moves a time when they choose.

## Next block: before a career is chosen

Eyebrow: Before a career is chosen

Headline: People who joined through events had never taken the career quiz, so they would land in a product with no week to work on.

Card: Rejected | Under construction | A page saying it was still being built. It felt dishonest, as if that part of the product did not exist.
Card: Rejected | Lockout | Blocking the product until a career was chosen. A guide points to the next step.
Card: Chosen | Quiz first | A minimal empty state that leads with the quiz, with Linear and Notion as precedent.

Text: Nobody had designed for this group. The empty Action Hub leads with the quiz, because choosing a career is the priority and it is what gives the Action Hub a week to show. A lockout would have been structure at its bluntest, shutting someone out at the start of a journey that runs on their motivation.

Section: 8

# Section 8: Calendar integration

## Block 1

Eyebrow: Calendar as an assistant

Headline: Calendar integration was planned before the framework existed, and I argued that the week had to work without a calendar at all.

Text: People vary in how they schedule their lives. At the time my own schedule needed no calendar to plan around, and at other times in my life one had been essential. Tying every Action Item to a calendar slot would feel like the rigid structure of traditional education, which Mondai exists as an alternative to.

Text: My review of learning apps showed that even the more structured ones let people work at their own pace. Scheduling research points the same way. Planning when and where tends to help, but a one off push to schedule slightly hurt persistence for 18,000 online learners. So connecting a calendar is a choice, and without one the week is a list that still works.

## Block 2

Eyebrow: The pause

Headline: The 2025 manual integration asked people to color code every synced calendar. It was hard to build and read as overwhelming, so I paused it.

Text: I designed a step where people gave each synced calendar one of sixteen colors, backed by a comparison of how other calendar platforms handle color. Development flagged how hard it would be to build, and feedback on the design called it visually overwhelming. It came back in 2026 as a suggestion system with one job, finding when someone is free.

## Block 3

Eyebrow: The smallest window

Headline: A person sets the hours Mondai may use, but the scheduler needs room to work, so I reversed myself on having no minimum.

Text: After syncing, a person sets the hours Mondai may place work in and the times they work best. I accepted no minimum, then changed my mind one message later. Open time is the window minus the meetings in it, so a two hour window on a busy day leaves nowhere to put anything. The floor is eight hours until research says otherwise.

Text: Preferred times sit inside that window, so nobody is offered 6am when their day starts at 8.

## Block 4

Eyebrow: A packed week

Headline: When a calendar is too full to place the week, the times come off and the person works from the plain list.

Text: A manual mode for packed weeks would have cost a lot of design for a rare case in an MVP. A packed week drops to the same plain list people without a calendar use, with its deadline at the end of the week. Whether the whole week falls back or only the items that cannot be placed is still open.

Section: 9

# Section 9: Start of week

## Block 1

Eyebrow: Two years of answers

Headline: Everything so far assumes the work gets done. For two years, my answers to unfinished work kept failing.

Card: 2024 | Daily quotas | Tasks per day, worked back from a goal date. A daily quota for people whose days vary.
Card: 2025 | Never overdue | Tasks that never expire. I worried they would build up as overdue anyway.
Card: Early 2026 | Move or add | A choice for each unfinished task, plus flex points to stretch dates. A decision and a sum every week.

Text: Plenty of weeks will not go to plan, and missed subgoals raise the risk of abandoning a goal altogether, so where unfinished work goes is a motivation problem. Each answer I tried moved it somewhere else, onto the person's day, onto a growing overdue pile or onto a decision at the start of the week.

## Block 2

Eyebrow: Automation

Headline: The founder asked me to automate rollover so nobody had to do the math, and the obvious way to automate it was wrong.

Text: My rollover screen asked people to take on everything or spend a flex point. It created anxiety and read as a transaction at a moment when the person was already behind, and motivation dips after a bad week. Silently moving leftovers instead would ambush people: someone used to four Action Items opens a week of six, two labeled leftovers.

## Block 3

Eyebrow: Sizing the week

Headline: Capacity was born here, sizing each week to the hours a person declared so a leftover fits inside next week.

Text: Each Action Item carries its own cognitive load, so the week could be assembled to fit what a person said they can give. A leftover takes the place of new work and the week still fits. My flex points had nothing left to do, and I dropped them. With every week fitting, rollover could be automatic.

Text: In a week long field study, planning helped people pursuing one goal but not six, because seeing all that difficulty at once lowered commitment. And in Fogg's behavior model, motivation is the least reliable part of any behavior. A week sized to the person is still a week they can finish when motivation dips.

## Block 4

Eyebrow: Opening the week

Headline: Automatic could not mean silent, so the week opens on a recap that mirrors the screen people see when they finish a week early.

Text: Rollover research I weighed, on Motion, Sunsama, Duolingo and default bias, found one pattern, in which the system does the work, shows what it did and offers a way to change it. The recap orients first. Where the person stands sits at the top with last week folded in, and the pace changes here, once a week.

Text: I stopped calling it the Sunday flow when the name kept leading to a wrong rule, that someone joining on a Wednesday would wait for Sunday. It opens whatever week a person is in.

## Block 5

Eyebrow: State rules

Headline: Five states grew out of real cases, and each one got a rule about what its screen may claim.

Card: Clean slate | Nothing missed | A clean slate only means something if no day was lost, so a week with a lost day goes to rollover.
Card: Rollover | Coach not parent | I rejected headlines that would make people feel bad and matched the tone of the screens for finishing early.
Card: Catching up | Earned movement | Finishing exactly the week's items closes no gap, so it is not catching up. Catching up shows how much of the gap closed.

Text: Feedback helps on average, but across 607 effects, over a third of feedback interventions lowered performance, mostly when they pointed at the person and not the task. So rollover stays neutral, in magenta, which is not an alert color. There is no streak to break either, since engagement drops after a broken streak.

## Block 6

Eyebrow: Recalibration

Headline: After weeks of falling short, the product reads back what a person actually does and recommends a lower capacity.

Text: People tend to underestimate how long work takes, so a capacity declared on day one is partly a guess. My first version let people type any number, and it lost the sense of a recommendation. I reframed it to show their own weekly average, then recommend less. It only lowers here, and declining carries a warning.

## Block 7

Eyebrow: Reset

Headline: For someone returning after weeks away, I leaned toward rebuilding their week without asking. Then I asked for research that could prove me wrong.

Text: I wanted my lean checked before it shipped, so I asked an AI assistant for research and told it not to just find things that support me. Self determination theory makes the case for a choice, since a rebuilt week can feel like the product took a decision that was theirs.

Text: Against that, people offered a choice disproportionately keep the option they already have, so keeping the old plan would win by inertia and leave someone with a schedule for weeks that are gone. Progress is saved and the week is rebuilt from today in one step. An undo would answer the cost to control, and it is still open.

Section: 11

# Section 11: The Pathway page

## Block 1

Eyebrow: Two pages

Headline: The Growth Journey overview kept turning into a second Pathway page, so I started it over with a job of its own.

Text: The only difference between the drafts was that one listed Action Items. Research on long term goals favors showing the path and its steps over the dream outcome alone, so the overview shows the five Pathways and how the person's own answers shaped them. Learning one Pathway happens on its own page.

## Block 2

Eyebrow: Below the Pathway

Headline: Focus Areas began as a tag for sorting, until I learned they run in order and the Pathway page had to show it.

Text: Before laying out the page I asked the team for content estimates. In March, believing each Pathway held too few Action Items to need another level, I made Focus Areas a tag. Then I found out they run in order, so the page shows Focus Area headers, a progress rail and locks on later items.

## Block 3

Eyebrow: What stays closed

Headline: Anyone can look ahead along the whole route. The order of the curriculum only decides what a person can mark done.

Text: You cannot synthesize a usability finding before running the session, so order gates completion. I narrowed locks to items beyond this week, and every Pathway opened for browsing. Pulling this week's Action Items out here would have read more clearly, and I kept them in the Action Hub, so this page stays a place for looking.
