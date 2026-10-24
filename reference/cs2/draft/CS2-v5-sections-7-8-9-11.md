# CS2 sections 7, 8, 9 and 11 (v5, 24 Oct)

Status: drafted for his read. Replaces v4, which he read as formulaic: every block ran thing, then reason, with short bodies and thin reasoning, and no thread joined the sections.

## The thread

His frame sets it up in sections 2 to 6: Mondai fits a route into tech around busy lives, structure is foundational, an academic structure in hectic lives was an obvious no, so the week became the unit and each week is sized to what a person can actually do. Before any of it was designed he had named the risk he cared about most: a product like this can open one more place to feel behind.

So the thread these four sections carry is a structure that holds when life does not go to plan, without making anyone feel behind, and that is honest about what it knows. Section 7 is where the week lives and how a person reads their progress. Section 8 is the calendar, kept as an assistant so the week never depends on it. Section 9 is the week going wrong: leftovers, falling behind, coming back. Section 11 is the long route, where a person can look ahead without being asked to do it all. Each section opens from the one before and comes back to the line between doing and looking.

## How the reasoning is sourced

- His decisions, reversals and trade offs come from the design chats, his notes and his messages, as traced in the private report (~/Documents/CS2-research/reports/CS2 decision reasoning sources.md).
- Research run at decision time is told as research: his learning app review, Linear, Motion, the rollover pattern research he weighed, the reset research he commissioned against his own lean, and the capacity preview study he made an assistant justify.
- Motivation and UX principles (Fogg, self determination theory, goal gradient, planning fallacy, status quo bias) are used as reasoning about people. The archive records the first four as the grounding he defended the framework with in leadership syncs; status quo bias came back in the reset research. None is told as the moment a decision was made.
- No user testing exists, so nothing here claims a test.

Nothing here quotes his private record; every line is paraphrase, checked by script.

# Section 7: The Action Hub and the Growth Journey

<!-- copy:7 -->
Section: 7

## Block 1

Eyebrow: Where the week lives

Headline: With capacity setting how big each week would be, the next question was where that week should live and what a person sees first.

Before any of this was designed, I had written down the risk I cared about most: a product like this can hand people one more place to feel behind. Our users are fitting a career change into lives that are already full, and some weeks go well and some do not. A journey that runs for a year or two is too far away to pull anyone through a hard Tuesday, and a dashboard of journey numbers would mostly show them how much road was left.

The brief I inherited for the home screen was exactly that dashboard: an overview, progress at a glance and shortcuts. I went the other way and made the Action Hub open straight onto this week's Action Items, the way Linear opens onto the work in front of you. Near goals do more for motivation than distant ones, because progress on them shows up often enough to feel. The week already had a hard edge in the Saturday night deadline, so it was the nearest goal the framework could offer that still meant something.

The long view still matters, so it got its own page, the Growth Journey. Looking further down the route is something a person does now and then, and I did not want them doing it every time they opened the product to get work done. One page for doing and another for looking became a line that shaped almost every decision after it.

## Block 2

Eyebrow: Two dates

Headline: A week only works if a person can tell whether they are on track, so beside the target I added a second date, the pace.

The target comes from the load of the whole journey set against the person's capacity, and it holds steady while the pace moves. The gap between the two is the most honest progress signal the product has. Weekly adjustments only make sense against something fixed, so both dates sit beside the week at all times.

How often the pace moves turned out to matter as much as the number. If it shifted with every finished Action Item, people would watch it tick up and down and panic at each dip. I made it move once a week, when a new week starts, so there is one moment to read it. Duolingo was a useful reference for letting drift show gently. I meant the pace to help people notice slipping early enough to do something about it, and never to feel like a punishment.

Then I overdid it. I gave both the Pathway and the whole journey their own target and pace, because the week runs on the Pathway pair and people still want to know when the whole thing ends. A month later, four dates were competing for attention and the picture was very confusing. I asked myself whether the journey needed a pace at all, then kept it but made it passive, so it lives on the Growth Journey page and stays out of the week.

## Block 3

Eyebrow: Before a career is chosen

Headline: People who joined through events had never taken the career quiz, so they would land in a product with no week to work on.

Card: Rejected | Under construction | A page saying it was still being built. It felt dishonest, as if that part of the product did not exist.
Card: Rejected | Lockout | Blocking the product until a career was chosen. A guide should point to the next step, not shut the door.
Card: Chosen | Quiz first | A minimal empty state that leads with the quiz, with Linear and Notion as precedent.

I found this group while mapping how people enter the product, and nobody had designed for them. The brief kept the sidebar available before a career was chosen. I questioned it, because keeping the sidebar meant taking some filters off the resources page, and I put both options to the founder as a suggestion backed by evidence so it would not read as a decision already made. The sidebar stayed, and the reason for it never came.

That made the empty Action Hub the real design problem. Every option I turned down failed the same test of honesty and guidance. A page that pretends a feature is missing lies about the product, and a lockout shuts the door on someone who has only just arrived. The empty state leads with the quiz, because the next step is the one thing that person needs to see.

## Block 4

Eyebrow: Changing capacity

Headline: Capacity changes live on the Growth Journey, beside the end date they move, because that is where a person sees what a change costs.

Card: Audited | Live preview | An assistant backed dates that move on every keystroke with a study, and when I asked what it measured, the answer was graded feedback on learning. Three preview modes were built to compare, and updating on a button press won.

The obvious home was a settings page next to the calendar controls. I kept asking how it would actually be used. Someone is on the Growth Journey, sees a date they do not like and wants to change the input behind it, and sending them off to a settings page from there felt strange. Capacity moves the journey numbers, so the control belongs where those numbers are. Settings carries it as well, so it sits where people expect to find it.

A change applies from the next week, with a quiet link to apply it now. I worried about someone typing the wrong number and feeling locked in, and decided a little of that anxiety was healthy, the kind that keeps people deliberate about the number. Capacity can go up or down at any time, and nothing should stop someone who can take on more. Only inside recalibration is it limited to going down.

## Block 5

Eyebrow: Teaching in place

Headline: Onboarding was already long, so instead of adding steps, the first visit to the Action Hub does the teaching.

The quiz alone was long, and I was about to pile tips for the Growth Journey and the Action Hub on top of it. Adding more and more to a flow is the laziest fix there is, and every extra step is another place for someone to leave before they have done anything. So the calendar, time and capacity screens run the first time a person enters the Action Hub, as setup for the feature they are about to use, and the week itself teaches the rest.

I tried three practice Action Items as a tutorial before the real journey began, and they did not ship. I also caught myself adding tips for their own sake and cut them back, because a first visit ought to feel like the journey has begun. What stayed is a tip on the one thing the person did not choose, the time Mondai picked, explaining that it came from their availability and can be moved. That time is the first place the calendar shows up.

<!-- end copy:7 -->

<!-- sources: 7.1 report 7.1 (QN1 risk framing, dashboard brief, Linear 6 Mar 2026, doing and looking 9 Apr); 7.2 report 7.2 and 7.3, archive competitive positioning (Duolingo); 7.3 report 7.4; 7.4 report 7.5 (live or commit preview, where it is edited, the one week delay, 27 Aug answer); 7.5 report 7.6 -->

# Section 8: Calendar integration

<!-- copy:8 -->
Section: 8

## Block 1

Eyebrow: Calendar as an assistant

Headline: Calendar integration was in the plan before the framework existed, and I argued that the week had to work without it.

The founder championed structure, and a calendar is the most structured thing a product can hold someone to. I agreed structure was required. What worried me was how much people vary in how they schedule their lives. Right now my own schedule is predictable enough that I would not need a calendar to plan around, and at other times in my life one was essential. Tying every Action Item to a calendar slot would feel like the rigid structure of traditional education, which Mondai exists as an alternative to, and it would add stress to a tool meant to take stress away.

My review of learning apps backed this up. Even the more structured ones let people work at their own pace, and CareerFoundry, which I knew from my own experience, gave structure while still allowing flexibility. It fits what we know about motivation too. People stay with something longer when they feel they chose how to do it, and a schedule imposed from outside wears that feeling down quickly.

So the week became the commitment and the calendar became an assistant to it. With a calendar, Mondai suggests when each Action Item could happen. Without one, the week is a list and nothing is lost.

## Block 2

Eyebrow: The pause

Headline: The first calendar integration, with a step to color code every synced calendar, was hard to build and overwhelming to use, so I paused it.

In 2025 the integration was manual, and it had to tell calendar types apart, so I designed a step where people picked one of sixteen colors for each calendar. I brought a comparison of how other calendar platforms handle color, so the choice would be a recommendation and not a hunch. Development flagged how hard it would be to build, and feedback on the design called it visually overwhelming.

What Mondai needed from a calendar was narrower than what I had designed: knowing when someone is free. Everything else was weight the person had to carry. When the calendar came back in 2026 it was a suggestion system with that one job. In the first week, connecting is offered as a choice, written so it never reads as a requirement, and capacity follows it either way.

## Block 3

Eyebrow: The smallest window

Headline: I first agreed there should be no minimum window for scheduling, then reversed myself, because the scheduler needs room to place a week.

After syncing, a person sets the hours Mondai may use and the times they work best. I accepted no minimum at first and changed my mind one message later. Open time is the window minus the meetings already in it, so a two hour window on a busy day leaves the scheduler nowhere to put anything. I set the floor at eight hours and questioned it straight away, since for someone whose events start at 8am and run all day, eight hours only lasts until 4pm. Eight hours stands until research says otherwise.

Preferred times have to sit inside the window too. Offering 6am to someone whose day starts at 8 makes no sense, so the choices depend on what the person has already said about their day.

## Block 4

Eyebrow: Suggested times

Headline: A calendar gives each Action Item a time, but the week has one deadline, so every scheduled time had to become a suggestion.

This was the two clock problem. A synced Action Item gets a time from the person's calendar, and that time lives outside the weekly framework, while everything is still due at the end of the week. Before designing anything I wrote the research brief myself: the evidence first, then comparable products and what we know about people, and only then the interface.

Motion came up in that research. It moves a missed task to the next open slot on its own. Auto rescheduling looked easy for us to build too, since the AI already schedules the week, and I still declined it. Times that move by themselves get confusing fast, and a time that keeps moving is hard to trust. When a time passes, it simply leaves the card and the reschedule icon stays, so the person can pick a new time whenever they want.

Nothing marks the Action Item as late. The system cannot see whether someone did the work at 3pm or at 9pm, and it should not pretend to know. Only the end of the week decides whether something was missed, which keeps schedules as an assistance tool and never a due date.

## Block 5

Eyebrow: A packed week

Headline: When a calendar is too full to place the week, the times come off and the person works from the plain list instead.

An assistant offered two routes for a packed week: adjust availability in settings, or switch to a manual mode for that week. A manual mode would cost a lot of design for a rare case in an MVP, so a packed week drops to the same plain list people without a calendar use. Whether the whole week falls back or only the items that cannot be placed is still open.

Looking back, this is where the first argument in this section paid off. The week never depended on the calendar, so a packed week, a broken sync and a disconnected calendar can all land in the same safe place, a list with a deadline at the end of the week.

<!-- end copy:8 -->

<!-- sources: 8.1 report 8.1, CS1 verbatim 13 Feb 2025 DM (learning apps, CareerFoundry, own schedule), CS2_MASTER line 47 (stress), archive SDT; 8.2 report 8.2 and 8.3; 8.3 report 8.4, calendar-and-schedule.md section 4, CHADWICK_ANSWERS 27 Aug; 8.4 report 8.5 (two clocks, research brief, Motion, decline, disappear, end of week); 8.5 report 8.6 (the safe state is a retrospective observation, not stated intent) -->

# Section 9: Start of week

<!-- copy:9 -->
Section: 9

## Block 1

Eyebrow: Two years of answers

Headline: Every version of the framework had to answer one question, what happens to unfinished work, and my answers kept failing for two years.

Card: 2024 | Daily quotas | Tasks per day, worked back from a goal date. A daily quota for people whose days vary.
Card: 2025 | Never overdue | Tasks that never expire. I worried they would build up as overdue anyway.
Card: Early 2026 | Move or add | A choice for each unfinished task, plus flex points to stretch dates. A decision and a sum every week.

Everything up to here assumes the week goes to plan, and for the people Mondai is for, plenty of weeks will not. Each answer I tried moved the problem somewhere else: onto the person's day, onto a growing pile of overdue work or onto a decision at the start of the week. By April a three screen start of week flow existed, and we judged it too complex for the MVP.

## Block 2

Eyebrow: Automation

Headline: The founder asked me to automate rollover so nobody had to do the math, and I turned down the obvious way to do it.

The brief was fair. My rollover screen asked people to take on everything or spend a flex point, and it created anxiety and read as a transaction, at the moment a person was already behind. Motivation is lowest right after a bad week, and that is when a product should ask for the least.

Silently moving leftovers into next week was the obvious answer. I turned it down because structure still mattered and because silence would ambush people. Someone used to four Action Items opens a week of six, two of them labeled leftovers, and is expected to just carry on. My flex points were no answer either. They were a mechanic I had invented to manage the leftovers, and the leftovers were the actual problem.

## Block 3

Eyebrow: Sizing the week

Headline: Sizing every week to the hours a person declared was the turn. A leftover then fits inside next week instead of piling on top.

Each Action Item carries its own cognitive load, so capacity, not a fixed count, sets how much a week holds. That one correction changed the whole problem. If a week can never exceed what a person said they can give, a leftover takes the place of new work and the week still fits. Carrying work forward stops being an ambush, the flex points had nothing left to do, and I dropped them.

It also keeps the week doable. In Fogg's behavior model, a behavior happens when motivation, ability and a prompt meet, and motivation is the least reliable of the three because it rises and falls. A week sized to the person keeps the work within what they said they can give, so it never depends on someone feeling great that week. Once every week fit, rollover could be automatic.

## Block 4

Eyebrow: Opening the week

Headline: Automatic could not mean silent, so the week opens on a recap of where the person stands, mirroring the screen that ends a week.

Taking away the decision left the start of the week with no job. I already had a screen for finishing a week early, and asked whether people should get a similar recap when a week begins. The rollover research I weighed found one pattern: the system does the work, shows what it did and offers a way to change it. The recap orients and never asks. Where the person stands, with last week folded in, sits at the top, and leftovers simply appear in the new week.

Because the pace moves once a week, this screen is also where people see it change. I stopped calling it the Sunday flow when the name kept producing a wrong rule, that someone joining on a Wednesday would have to wait for Sunday. It opens whatever week a person is in, with fewer Action Items mid week.

## Block 5

Eyebrow: State rules

Headline: Five states grew out of real cases, and each one got a rule about what the screen is allowed to claim.

Card: Clean slate | Nothing missed | A clean slate only means something if no day was lost, so a week with a lost day goes to rollover.
Card: Rollover | Coach not parent | I rejected headlines that would make people feel bad and held the voice of the screens for finishing early.
Card: Catching up | Earned movement | I ruled that finishing exactly the week's items is not catching up. Catching up should show how much of the gap closed.

Five was never planned as a set. I started with three, added the others as cases came up and added reset last. When the variants passed a dozen I got nervous about the MVP timeline and pruned them.

The rules came from motivation as much as logic. Self determination theory is a good lens here: people keep at something when they feel capable and in control, and a screen that scolds them after a bad week takes both away. That is why the rollover headline stays neutral and its color is magenta, softer against the green and black of the interface and never an alert color. Catching up has to be earned for a related reason. People tend to speed up as a goal gets closer, but only when they can see the gap closing, so the screen shows how much of it closed.

## Block 6

Eyebrow: Recalibration

Headline: After weeks of falling short, the product reads back what a person actually does and recommends a lower capacity to start from.

Rollover can only stay honest for so long. After weeks of slipping, carrying work forward hides the fact that the plan no longer fits the person. People tend to underestimate how long work takes and overestimate the time they will have, so a capacity declared on day one is partly a guess. Recalibration is where the product finally uses what it has seen.

My first version let people type any number right on the screen, and it lost the sense of a recommendation backed by reasoning. I reframed it overnight: show their own weekly average of time spent and Action Items completed, then recommend less work. Here it only lowers, because nobody behind should be invited to set a capacity they already cannot meet. Declining is allowed, but it carries a warning about what keeping the old number means.

## Block 7

Eyebrow: Reset

Headline: For someone returning after weeks away, I leaned toward rebuilding their week without asking, then asked for research that could prove me wrong.

Someone coming back after a long absence is at a low point of motivation, and every choice in front of them is friction at the moment they are most likely to leave again. I leaned toward doing it for them: save their progress, rebuild the week from today and tell them what we did. I did not trust my own lean, so I asked for research and told it to look for what would disprove me as well as what would support me.

It held up. Offered a choice, people disproportionately keep the option they already have, even when it is the worse one, so a button to keep the old plan would win by inertia and leave someone with a schedule built for weeks that are gone. More options at a low motivation moment only slow people down further. So progress is saved and the week is rebuilt from today in one step. I also changed the wording, because saying everything restarts from today made the saved progress look like a lie.

<!-- end copy:9 -->

<!-- sources: 9.1 report 9.1; 9.2 report 9.2 (his 7 May anxiety and transaction line), archive Fogg; 9.3 report 9.2 and 7.5, archive Fogg and cognitive load; 9.4 report 9.3, research-evidence notes (6 May rollover research); 9.5 report 9.4 to 9.7, archive SDT and goal gradient; 9.6 report 9.8, archive planning fallacy; 9.7 report 9.9, start-of-week-states.md (default effect, status quo bias, Hick's law, habit recovery), Samuelson and Zeckhauser 1988 verified -->

# Section 11: Action Items

<!-- copy:11 -->
Section: 11

## Block 1

Eyebrow: Two pages

Headline: With the week as the only place work happens, the rest of the curriculum needed a home that explains how everything fits together.

The week handles what happens now, but a person also needs to see where this week sits in the whole route. The founder looked at the weekly page and could not tell which page it was, which told me the framework was invisible from inside the week. I split the long view into two pages: a Growth Journey overview people land on, and a Pathway page for learning one Pathway at a time.

When the overview drafts kept turning into a second Pathway page, I started over. The only difference between them was that one listed Action Items, so the overview had no job of its own. Its job became the whole route and how the person's own answers shaped it. Progress is never changed on either page; that happens in the Action Hub or inside an Action Item, so the line between doing and looking holds here too.

## Block 2

Eyebrow: Below the Pathway

Headline: Focus Areas started as a sorting tag while they seemed to hold only a few Action Items, until I learned the curriculum runs in order.

Before designing the Pathway page I asked the team for content estimates, because the right amount of hierarchy depends on how much sits inside it. A teammate expected only a few Action Items in each Focus Area, far fewer than I had assumed. With that little inside each one, another level of navigation would add weight without helping anyone find anything, so Focus Areas became a tag for sorting.

Then I found out Focus Areas run in order too, and nobody could say how many each Pathway would have. Once order mattered, the page had to show it with Focus Area headers, a progress rail and locks on later items. A proposed color system did not survive, because a color for each Focus Area breaks down when the number has no limit.

## Block 3

Eyebrow: What stays closed

Headline: Anyone can look ahead along the route, but the order of the curriculum decides what can be marked done.

The sequence is practical. You cannot synthesize a usability finding before you have run the usability session, so order gates completion. Locks first covered every Action Item with unfinished prerequisites. I narrowed them to items beyond this week, so everything inside the week stays visible and can be moved, and for the MVP every Pathway opened for browsing. People can look at any Pathway and any Action Item, even ones they cannot do yet.

The founder twice said the sorting on the Pathway page was still unclear. Pulling this week's Action Items out at the top would have fixed that, and I hesitated, because it would turn a page for looking into a page for doing. I kept the week as the one place work gets done and accepted a page that has to work harder to explain its order.

<!-- end copy:11 -->

<!-- sources: 11.1 report 11.1 and 11.8; 11.2 report 11.3; 11.3 report 11.4 and 11.5 -->
