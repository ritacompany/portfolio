# CS2 sections 7, 8, 9 and 11 (v5, 24 Oct)

Status: drafted for his read. Replaces v4, which he read as formulaic: every block ran thing, then reason, with short bodies and thin reasoning, and no thread joined the sections.

## The thread

His frame sets it up in sections 2 to 6: Mondai fits a route into tech around busy lives, structure is foundational, an academic structure in hectic lives was an obvious no, so the week became the unit and each week is sized to what a person can actually do. Before any of it was designed he had named the risk he cared about most: a product like this can open one more place to feel behind.

So the thread is one tension: the structure the founder championed against a person's control over a life that does not run to plan. Each section resolves it differently. Section 7 holds the structure steady in the target date and hands the person their own numbers, the pace and capacity. Section 8 gives control back through the calendar, keeping only the structure the scheduler needs. Section 9 takes decisions away from people when they are behind, names that cost and leaves the choices about their own life in their hands. Section 11 lets people look anywhere along the route while the order of the curriculum decides only what can be marked done. Along the way the product stays honest about what it knows and never becomes one more place to feel behind.

Round 2 of v5 (24 Oct) rewrote the draft around that one tension after a cold hiring manager read (6.5 of 10, read as separate sections) and a truth read (28 claims fixed).

## How the reasoning is sourced

- His decisions, reversals and trade offs come from the design chats, his notes and his messages, as traced in the private report (~/Documents/CS2-research/reports/CS2 decision reasoning sources.md).
- Research run at decision time is told as research: his learning app review, Linear, Motion, the rollover pattern research he weighed, the reset research he commissioned against his own lean, and the capacity preview study he made an AI assistant justify. Research an AI assistant ran is said to be that.
- Motivation and UX principles (Fogg, self determination theory, goal gradient, planning fallacy, status quo bias, proximal goals) are used as reasoning about people. The archive records the first four as the grounding he defended the framework with in leadership syncs; status quo bias came back in the reset research he had an AI assistant run; proximal goals is the hedged reading in the report (Latham and Seijts). None is told as the moment a decision was made.
- No user testing exists, so nothing here claims a test.

Nothing here quotes his private record; every line is paraphrase, checked by script.

# Section 7: The Action Hub and the Growth Journey

<!-- copy:7 -->
Section: 7

## Block 1

Eyebrow: Where the week lives

Headline: With the week as the unit, the next question was where that week should live and what a person sees first.

The tension running through this framework was set in the first sections. The founder championed structure, while our users are making their way into tech around lives that are already full, where some weeks go well and some do not. Early on I had written down the risk that a product like this can open one more place to feel behind. Holding both sides of that tension is the job of every screen that follows.

The home screen was the first test. The brief I inherited asked for a dashboard with an overview, progress at a glance and shortcuts, and for a journey that can run for years a dashboard mostly shows a person how much road is left. I made the Action Hub open straight onto this week's Action Items, the way Linear lands on the work in front of you. Near goals tend to motivate more when a farther one stays visible, because progress on them shows up often enough to feel, so the rail keeps the Pathway target beside the week. The Saturday night deadline already gave the week a real edge.

The long view still mattered, so it got its own page, the Growth Journey. Looking further down the route is something a person does now and then, and keeping it apart left the Action Hub as the place for getting work done. One page for doing and another for looking became a line I kept coming back to.

## Block 2

Eyebrow: Two dates

Headline: The target date holds the structure steady while the pace date moves with the person, showing when they will finish at their current rate.

The target comes from the cognitive load of the whole journey set against the person's capacity, and nothing that happens in an ordinary week moves it. The pace moves with what the person actually does. Side by side, the gap between them tells a person where they are, and the weekly adjustments the framework makes only mean something against a date that stays put.

If the pace shifted with every finished Action Item, people would watch it tick up and down and panic at each dip. It moves once a week, when a new week starts, which gives people one moment to read it and six days to work without a number twitching beside them. I meant it to help people notice slipping while there is still time to act on it.

Then I overdid it. I gave both the Pathway and the whole journey their own target and pace, because the weekly framework needs the Pathway's own dates and people still want to know when the whole journey ends. A month later the team and I found four competing dates confusing. I asked whether the journey needed a pace at all, then kept it and made it passive, on the Growth Journey page and out of the week.

## Block 3

Eyebrow: Before a career is chosen

Headline: Some people arrive without a career chosen, and the product has to guide them forward without pretending and without locking the door.

Card: Rejected | Under construction | A page saying it was still being built. It felt dishonest, as if that part of the product did not exist.
Card: Rejected | Lockout | Blocking the product until a career was chosen. A guide points to the next step.
Card: Chosen | Quiz first | A minimal empty state that leads with the quiz, with Linear and Notion as precedent.

People who registered through events had never taken the career quiz, so they would land in a product with no week to work on, and nobody had designed for them. I expected the founder to want the sidebar kept before a career was chosen, though I had never been given a reason. Keeping it came at a price, some filtering options on the resources page, so I planned to put both options to the founder as a suggestion based on evidence and not a decision already made. A week later the answer came back that the sidebar had to stay.

So the empty Action Hub had to do the guiding. A lockout would have been structure at its bluntest. The empty state leads with the quiz instead, because choosing a career is the priority and it is what gives the Action Hub a week to show. Linear and Notion both keep a minimal page like this until there is something to put on it.

## Block 4

Eyebrow: Changing capacity

Headline: Capacity moves the end date, so a person changes it from the Growth Journey, right beside that date.

Settings would have been the conventional home, next to the calendar controls. When I pictured someone on the Growth Journey looking at a date they do not like, sending them off to a settings page to change the input behind it felt strange. Capacity changes the journey numbers, so the control sits where those numbers are, and I gave it a place in settings as well for consistency with the calendar.

A change applies from the next week. I worried about someone entering the wrong number and feeling locked in, and decided a little of that anxiety was productive and not ours to remove. For the person who really did get it wrong there is a link to apply the change now, kept quiet on purpose. Capacity can go up or down at any time, and only recalibration limits it to going down.

The capacity screen previews the new dates when the person presses a button. An AI assistant cited a study for updating the dates on every keystroke. When I asked what the study measured, the answer was graded feedback on learning tasks, nothing like this screen, so I dropped the citation. We built three preview modes to compare by feel, and the button won.

## Block 5

Eyebrow: Teaching in place

Headline: Onboarding was already long. Adding more steps is the lazy fix, so the first visit to the Action Hub carries the teaching.

The quiz alone was long, and tips for the Growth Journey and the Action Hub were about to pile on top of it. Every extra step is another place for someone to leave before they have done anything. The calendar, availability and capacity screens run the first time a person enters the Action Hub, as setup for the feature they are about to use, and people learn the rest by using the week.

I proposed three practice Action Items as a tutorial before the real journey began, and they did not ship. I also cut back tips that were there for their own sake, because a first visit ought to feel like the journey has begun. For people who connect a calendar, one tip sits on the time Mondai picked, explaining that it came from their availability and can be moved.

<!-- end copy:7 -->

<!-- sources: 7.1 report 7.1 (QN1 risk framing, dashboard brief, Linear 6 Mar 2026, doing and looking 9 Apr), CS2_COMPREHENSION audience line 146, report line 425 (proximal plus distal); 7.2 report 7.2 and 7.3; 7.3 report 7.4; 7.4 report 7.5 (where it is edited, the one week delay, 27 Aug answer, live or commit preview), capacity.md section 7; 7.5 report 7.6 -->

# Section 8: Calendar integration

<!-- copy:8 -->
Section: 8

## Block 1

Eyebrow: Calendar as an assistant

Headline: Calendar integration was planned before the framework existed, and I argued that the week had to work without a calendar at all.

A calendar is the most structured thing a product can hold someone to, and the push for it came from the same wish for structure. I agreed structure was required. What I pushed on was how much people vary in how they schedule their lives. At the time my own schedule was predictable enough that I would not have needed a calendar to plan around, and at other times in my life one had been essential. Tying every Action Item to a calendar slot would feel like the rigid structure of traditional education, which Mondai exists as an alternative to.

My review of learning apps backed this up. Even the more structured ones let people work at their own pace, and CareerFoundry, which I knew from my own experience, gave structure while still allowing flexibility. Self determination theory explains why that balance holds. People stay with something when they feel they chose how to do it, and a schedule imposed from outside wears that feeling down.

So the week became the commitment and the calendar an assistant to it. With a calendar, Mondai suggests when each Action Item could happen and the person can move any time it picks. Without one, the week is a list and still works.

## Block 2

Eyebrow: The pause

Headline: The 2025 manual integration asked people to color code every synced calendar. It was hard to build and read as overwhelming, so I paused it.

In 2025 the integration was manual and had to tell calendar types apart, so I designed a step where people picked one of sixteen colors for each calendar, and brought a comparison of how other calendar platforms handle color to back the choice. Development flagged how hard it would be to build, and feedback on the design called it visually overwhelming.

That feedback also suggested using the schedule only to find when someone is free, and that is what came back in 2026, as a suggestion system with that one job. In the first week, connecting a calendar is offered as a choice and written so it reads as one, and capacity is set on both paths.

## Block 3

Eyebrow: The smallest window

Headline: A person sets the hours Mondai may use, but the scheduler needs room to work, so I reversed myself on having no minimum.

After syncing, a person sets the window of hours Mondai may place work in and the times they work best. It is their boundary. In April I first worried that an eight hour floor could be too little, since for someone who works all day from 8am an eight hour window ends at 4pm, before they are free. Then I accepted no minimum at all, and one message later changed my mind. Open time is the window minus the meetings already in it, so a two hour window on a busy day leaves the scheduler nowhere to put anything.

In August I set the floor at eight hours, until research says otherwise. A floor is a minimum, so someone whose free time comes late can set a wider window. Preferred times have to sit inside the window too. Offering 6am to someone whose day starts at 8 makes no sense, so the choices follow what the person has already said about their day.

## Block 4

Eyebrow: Suggested times

Headline: A calendar gives each Action Item a time, while the week has one deadline. Those two clocks had to be reconciled before anything was drawn.

A synced Action Item gets a time from the person's calendar, and that time lives outside the weekly framework, while everything is still due at the end of the week. I wrote the research brief for this myself, in order: what the research says, what comparable products do, what we know about people from psychology, UX and sociology, how those products handle the interface and only then our own interface.

Motion came up in the research. It moves a missed task to the next open slot on its own. Auto rescheduling looked easy for us to build as well, since the AI already schedules the week, and I declined it because times that move by themselves get confusing fast. When a time passes, it leaves the card and the reschedule icon stays, so the person can choose a new time whenever they want.

Nothing marks the Action Item as late. The system cannot see whether someone did the work at 3pm or at 9pm, and it should not pretend to know. Lateness is decided once, when the week ends, so a scheduled time is help and not a due date.

## Block 5

Eyebrow: A packed week

Headline: When a calendar is too full to place the week, the times come off and the person works from the plain list.

An AI assistant offered two routes for a packed week, adjusting availability in settings or switching to a manual mode for that week. A manual mode would cost a lot of design for a rare case in an MVP. Because the week was built to work without the calendar, a packed week drops to the same plain list people without a calendar use, with its deadline at the end of the week. Whether the whole week falls back or only the items that cannot be placed is still open.

<!-- end copy:8 -->

<!-- sources: 8.1 report 8.1, CS1 verbatim 13 Feb 2025 DM (learning apps, CareerFoundry, own schedule at the time), CS2_MASTER line 47 (stress), archive SDT; 8.2 report 8.2 and 8.3; 8.3 report 8.4, calendar-and-schedule.md section 4 (#0014 before #0016), CHADWICK_ANSWERS 27 Aug; 8.4 report 8.5 (two clocks, research brief, Motion, decline, disappear, end of week); 8.5 report 8.6 -->

# Section 9: Start of week

<!-- copy:9 -->
Section: 9

## Block 1

Eyebrow: Two years of answers

Headline: Everything so far assumes the work gets done. For two years, my answers to unfinished work kept failing.

Card: 2024 | Daily quotas | Tasks per day, worked back from a goal date. A daily quota for people whose days vary.
Card: 2025 | Never overdue | Tasks that never expire. I worried they would build up as overdue anyway.
Card: Early 2026 | Move or add | A choice for each unfinished task, plus flex points to stretch dates. A decision and a sum every week.

For the people Mondai is for, plenty of weeks will not go to plan. Unfinished Action Items needed somewhere to go. Each answer I tried moved the problem somewhere else, onto the person's day, onto a growing pile of overdue work or onto a decision at the start of the week. By April a three screen start of week flow existed, and I judged it too complex for the MVP.

## Block 2

Eyebrow: Automation

Headline: The founder asked me to automate rollover so nobody had to do the math, and the obvious way to automate it was wrong.

The brief was fair. My rollover screen asked people to take on everything or spend a flex point, and it created anxiety and read as a transaction at a moment when the person was already behind. Motivation dips after a bad week, and that is when a product should ask for the least.

Silently moving leftovers into next week looked like the easy way to automate it. Structure still mattered, and silence would ambush people. Someone used to four Action Items opens a week of six, two of them labeled leftovers, and is expected to carry on. My flex points were no answer either. They were a mechanic I had invented to buy extra time for the leftovers, and the leftovers were the actual problem.

## Block 3

Eyebrow: Sizing the week

Headline: This is where capacity came from. Sizing each week to the hours a person declared let a leftover fit inside next week.

Each Action Item carries its own cognitive load, and once I treated load as belonging to items, the week could be assembled to fit. Capacity, the hours a person says they can give each week, was the number that made that possible. If a week never exceeds that number, a leftover takes the place of new work and the week still fits. Carrying work forward stops being an ambush, the flex points had nothing left to do and I dropped them.

In Fogg's behavior model, a behavior happens when motivation, ability and a prompt meet, and motivation is the least reliable of the three. A week sized to what the person said they can give keeps the work within their ability, so a week when motivation dips is still a week they can finish. With every week fitting, rollover could be automatic.

## Block 4

Eyebrow: Opening the week

Headline: Automatic could not mean silent, so the week opens on a recap that mirrors the screen people see when they finish a week early.

Taking the decision away from people cost them some control, and they needed to see what the system had done for them. I already had a screen for finishing a week early and asked whether people should get a similar recap when a week begins. Rollover research that session, covering Motion, Sunsama, Duolingo and default bias, found one pattern, where the system does the work, shows what it did and offers a way to change it.

The recap orients first and asks only when the plan has to change. Where the person stands sits at the top with last week folded in, and leftovers appear in the new week. Because the pace moves once a week, this is also where people see it change. The week runs Sunday to Saturday, and I stopped calling this the Sunday flow when the name kept leading to a wrong rule, that someone joining on a Wednesday would have to wait for Sunday. It opens whatever week a person is in, with fewer Action Items mid week.

## Block 5

Eyebrow: State rules

Headline: Five states grew out of real cases, and each one got a rule about what its screen may claim.

Card: Clean slate | Nothing missed | A clean slate only means something if no day was lost, so a week with a lost day goes to rollover.
Card: Rollover | Coach not parent | I rejected headlines that would make people feel bad and matched the tone of the screens for finishing early.
Card: Catching up | Earned movement | I ruled that finishing exactly the week's items is not catching up. Catching up should show how much of the gap closed.

Five was not planned as a set. I started with three, added the others as cases came up and added reset last, ending with clean slate, catching up, rollover, recalibration and reset. Copy and content variants inside them passed a dozen, which made me nervous about the MVP timeline, and I pruned the ones that could not exist.

In self determination theory, people keep at something when they feel competent and in control, and a screen that scolds them after a bad week takes both away. The rollover headline stays neutral, and I chose magenta for it because it is not an alert color and feels softer against the green and black of the interface. Catching up has to be earned, because finishing exactly the week's items closes no gap. People also tend to speed up as they see a goal getting closer, so the catching up screen shows how much of the gap closed.

## Block 6

Eyebrow: Recalibration

Headline: Rollover can only stay honest for so long. After weeks of falling short, the product reads back what a person actually does.

After weeks of slipping, carrying work forward hides the fact that the plan no longer fits the person. People tend to underestimate how long work takes, the planning fallacy, so a capacity declared on day one is partly a guess. Recalibration is where the product finally uses what it has seen.

My first version let people type any number on the screen, and it lost the sense of a recommendation backed by reasoning. Overnight I reframed it to show their own weekly average of time spent and Action Items completed, then recommend less work. Here it only lowers, because nobody behind should be invited to set a capacity they already cannot meet. Declining is allowed, with a warning about what keeping the old number means.

Automating so much of the start of the week takes choices away from people. Some stay in their hands: adjusting or declining this recommendation, moving any scheduled time and changing capacity from the Growth Journey.

## Block 7

Eyebrow: Reset

Headline: For someone returning after weeks away, I leaned toward rebuilding their week without asking. Then I asked for research that could prove me wrong.

I leaned toward doing it for them, saving their progress and rebuilding the week from today, because keeping the old plan would make catching up really difficult. An AI assistant argued for keeping the choice so the system could show humility, and I rejected that as having no backing. Autonomy is the stronger case for a choice, the same reasoning behind the calendar, so I wanted my lean checked before it shipped. I asked the assistant for research and told it not to just find things that support me.

Offered a choice, people disproportionately keep the option they already have, so a button to keep the old plan would win by inertia and leave someone with a schedule built for weeks that are gone. The research also pointed to habit studies on friction at the moment of coming back. For someone returning, a choice mostly offers the freedom to keep a plan that no longer works. Progress is saved and the week is rebuilt from today in one step, and an undo as a middle path is still open. I also changed the wording, because saying everything restarts from today made the saved progress look like a lie.

<!-- end copy:9 -->

<!-- sources: 9.1 report 9.1 (28 Apr "overly complex for the mvp", his); 9.2 report 9.2 (his 7 May anxiety and transaction line), archive Fogg and flex points as spendable currency; 9.3 report 9.2 and 7.5, THROUGHLINES section 2 (capacity proposed 7 May as the way out), archive Fogg; 9.4 report 9.3, research-evidence notes (6 May rollover research, B); 9.5 report 9.4 to 9.7, archive SDT and goal gradient (softened); 9.6 report 9.8, archive planning fallacy, 27 Aug answer; 9.7 report 9.9, start-of-week-states.md lines 147 and 173 to 175 (default effect, status quo bias, habit recovery, Gmail undo send), Samuelson and Zeckhauser 1988 verified -->

# Section 11: Action Items

<!-- copy:11 -->
Section: 11

## Block 1

Eyebrow: Two pages

Headline: After the week has handled what happens now, a person still needs to see where this week sits in the whole route.

Rollover, recalibration and reset all look back at weeks that have happened. Everything ahead, the rest of the curriculum, still needed a home. When the founder could not tell which page they were on, I answered that the page sorts the hierarchy into a framework someone can use. To make that hierarchy visible, I split the long view into two pages, a Growth Journey overview people land on and a Pathway page for learning one Pathway at a time.

When the overview drafts kept turning into a second Pathway page, I started over. The only difference between them was that one listed Action Items, so the overview had no job of its own. Its job became the whole route and how the person's own answers shaped it. Progress is not changed on either page; that happens in the Action Hub or inside an Action Item, so apart from capacity, which is the person's own setting, these pages stay places for looking.

## Block 2

Eyebrow: Below the Pathway

Headline: Focus Areas began as a tag for sorting. Then I learned they run in order, and the Pathway page had to show it.

Before laying out the Pathway page I asked the team for content estimates, because the right amount of hierarchy depends on how much sits inside it. A teammate expected only a few Action Items in each Focus Area, far fewer than I had assumed. In March, believing each Pathway held too few Action Items to need another level, I made Focus Areas a tag for sorting.

Then I found out Focus Areas run in order, like the Pathways above them, and nobody could say how many each Pathway would have. Once order mattered, the page had to show it with Focus Area headers, a progress rail and locks on later items. When an AI assistant proposed a color for each Focus Area, I turned it down, because colors break down when the number has no limit.

## Block 3

Eyebrow: What stays closed

Headline: Anyone can look ahead along the whole route. The order of the curriculum only decides what a person can mark done.

The sequence is practical, since you cannot synthesize a usability finding before running the usability session, so order gates completion. Locks first covered every Action Item with unfinished prerequisites. I narrowed them to items beyond this week, so everything inside the week stays visible and can be moved. For the MVP every Pathway opened for browsing, so a person can look at any Pathway and any Action Item, even ones they cannot do yet.

Twice the founder said the sorting on the Pathway page was still unclear. Pulling this week's Action Items out would have made the weekly work clearer, and I hesitated, because it would turn a page for looking into a page for doing. I kept the week as the one place work gets done and accepted a page that has to explain its order through its headers, rail and locks.

<!-- end copy:11 -->

<!-- sources: 11.1 report 11.1 and 11.8, section11-pathway-page notes line 48 (his reply); 11.2 report 11.3 (18 and 19 Mar, 22 Apr, colour rejected against an assistant); 11.3 report 11.4 and 11.5 -->
