# CS2 sections 7, 8, 9 and 11 (v4, 24 Oct)

Status: drafted for his read. v3 with the research behind each decision added. Replaces v3.

## What changed from v3

His 25 Aug CS2 docs set the rule this follows: the decision goes in the body and the research in a caption, never "we used loss aversion". Copy files take that caption as one checked Aside: line per block (check-copy.mjs).

The research comes in two kinds, kept apart (private map: ~/Documents/CS2-research/reports/decision-research-map.md, with the 23 Oct report's research table):

- Research run at decision time in the design chats: his learning app review, Motion, the rollover pattern research he weighed, the reset research he commissioned against his own lean, and the capacity preview study he made an assistant justify. The body tells these as his thinking.
- The principles the archive says were used to defend the framework in leadership syncs: cognitive load theory, planning fallacy, goal gradient, undo over confirm. They sit in asides beside the decision they fit, and are never told as the reason at the time. Loss aversion and Zeigarnik are left out: the first clashes with his own reason for the weekly pace, the second has no support left.

Nothing here quotes his private record; every line is paraphrase, checked by script.

# Section 7: The Action Hub and the Growth Journey

<!-- copy:7 -->
Section: 7

## Block 1

Eyebrow: Landing on the week

Headline: A journey can run for years, but the person opening Mondai needs to know what to do this week, so the home became the week.

The early brief for a home screen was a dashboard: an overview, progress at a glance and shortcuts. I dropped the traditional home screen for a starting point that lands on this week's Action Items, the way Linear opens straight onto the work in front of you. Looking further along the route is something a person does now and then, not daily, so it lives on its own page.

## Block 2

Eyebrow: The pace date

Headline: I designed a second date beside the target, the pace, that shows where a person's progress is actually heading.

The target comes from the load of the whole journey against the person's capacity, so it holds steady while the pace moves. Both sit beside the week at all times, because they are the only thing the weekly adjustments can be measured against. The pace moves once a week, so nobody panics each time it ticks, and I meant it to prevent falling behind rather than react to it.

## Block 3

Eyebrow: One pair of dates

Headline: I first gave both the Pathway and the whole journey their own target and pace. A month later, two pairs of dates were confusing.

The week runs on the Pathway pair, and people still need to know when the whole journey ends, so both levels felt necessary. Together they competed, and it was extremely confusing. I questioned whether the journey needed a pace at all, then kept it but made it passive, on the Growth Journey page and out of the weekly view.

## Block 4

Eyebrow: Before a career is chosen

Headline: People who registered through events never took the career quiz, so they would land in a product with no week to work on.

Card: Rejected | Under construction | A page saying it was still being built. It felt dishonest, as if that part of the product did not exist.
Card: Rejected | Lockout | Blocking the product until a career was chosen. A guide should point to the next step, not shut the door.
Card: Chosen | Quiz first | A minimal empty state that leads with the quiz, with Linear and Notion as precedent.

The brief kept the sidebar available before a career was chosen. I questioned it, since keeping it meant removing filters from the resources page, but the sidebar stayed, and the empty Action Hub inside it leads with the quiz.

## Block 5

Eyebrow: Changing capacity

Headline: Capacity is changed from the Growth Journey, beside the end date it moves, rather than only from a settings page.

Card: Audited | Live preview | An assistant cited a study for dates that move on every keystroke, and asked what it measured, it was graded feedback on learning. I built three modes to compare, and the button won.

Capacity's impact is at journey level, so I put the control where that date lives, and agreed settings needed a place for it too. A change applies from the following week, with a quiet link to apply it now. I treated a little friction there as healthy, the kind of anxiety that is productive rather than something to design away.

## Block 6

Eyebrow: Teaching in place

Headline: Onboarding was already long, so instead of adding steps, the first visit to the Action Hub carries the teaching.

Adding more and more steps is the lazy fix. I put tips on the calendar and reschedule buttons for the first visit, tried three practice Action Items that did not ship, and cut tips back when they were being added for their own sake. The live design carries a tip on the time Mondai picks, explaining it came from the person's availability and can be moved.

<!-- end copy:7 -->

<!-- sources: 7.5 card report 7.5 (live or commit preview); 7.1 report 7.1; 7.2 report 7.2; 7.3 report 7.3; 7.4 report 7.4; 7.5 report 7.5; 7.6 report 7.6 -->

# Section 8: Calendar integration

<!-- copy:8 -->
Section: 8

## Block 1

Eyebrow: Calendar as an assistant

Headline: Calendar integration was in the plan before the framework existed, and I argued that the week had to work without it.

People schedule their lives in very different ways: a predictable stretch of life needs no calendar, a chaotic one depends on it. Tying every Action Item to a calendar would recreate the rigid structure of traditional education. My review of learning apps showed the lasting ones give structure and still let people set their own pace. The week became the commitment, and the calendar an assistant to it.

Aside: CareerFoundry | The clearest case in that review, structured enough to guide and flexible enough to fit a working life.

## Block 2

Eyebrow: The pause

Headline: An earlier manual integration, with a step to color code each synced calendar, was flagged as hard to build and overwhelming. I paused it.

When the calendar came back in 2026, it was a suggestion system whose job is finding when a person is free. In the first week, connecting is offered as a choice and written so it never reads as a requirement.

## Block 3

Eyebrow: The smallest window

Headline: I first agreed there should be no minimum window for scheduling, then reversed myself, because the scheduler needs room to place a week.

After syncing, a person sets the hours Mondai may use and when they work best. Preferred times have to sit inside that window; offering 6am to someone whose day starts at 8 makes no sense. A two hour window full of meetings cannot hold a week of work, so the window needs at least eight hours.

## Block 4

Eyebrow: Suggested times

Headline: A calendar gives each Action Item a time, but the week has one deadline, so every scheduled time is a suggestion.

I wrote the research brief myself: what the research says, what comparable products do, what we know about people, and only then the interface. Auto rescheduling looked easy to build, since the AI already schedules the week, and I declined it because times moving on their own would get confusing fast. A passed time leaves the card, the reschedule icon stays and only the week's end decides late.

Aside: Motion | The closest precedent moves a missed task into the next free slot on its own, the pattern I checked and turned down.

## Block 5

Eyebrow: A packed week

Headline: When a calendar is too full to place the week, the times come off and the person works from the plain list instead.

Fixing a packed week by hand would cost a lot of design for a rare case in an MVP, so a packed week drops to the same plain list people without a calendar use. Whether the whole week falls back or only the items that cannot be placed is still open.

<!-- end copy:8 -->

<!-- sources: 8.1 report 8.1 (learning app review, 13 Feb 2025); 8.2 report 8.2 and 8.3; 8.3 report 8.4 (eight hours is his 27 Aug answer); 8.4 report 8.5 and research table (Motion); 8.5 report 8.6 -->

# Section 9: Start of week

<!-- copy:9 -->
Section: 9

## Block 1

Eyebrow: Two years of answers

Headline: Unfinished Action Items needed somewhere to go, and my answers kept failing for two years before one held.

Card: 2024 | Daily quotas | Tasks per day, worked back from a goal date. A daily quota for people whose days vary.
Card: 2025 | Never overdue | Tasks that never expire. I worried they would build up as overdue anyway.
Card: Early 2026 | Move or add | A choice for each unfinished task, plus flex points to stretch dates. A decision and a sum every week.

By April a three screen start of week flow existed, and we judged it too complex for the MVP.

## Block 2

Eyebrow: Automation

Headline: The brief was to automate rollover so nobody had to do the math. I rejected the obvious way to do it.

Silently moving leftovers into next week would remove structure, and it would ambush people: someone used to four Action Items opens a week of six, two of them labeled leftovers. My own flex points were no answer either. The problem was the leftover items, and flex points were a mechanic I had invented to manage them.

## Block 3

Eyebrow: Sizing the week

Headline: Sizing every week to the hours a person declared was the turn. A leftover then fits inside next week instead of piling on top.

Each Action Item carries its own cognitive load, so capacity, not a fixed count, sets how much a week holds. Once a week never exceeds what a person said they can give, carrying leftovers forward stops being an ambush, and my flex points had nothing left to do. I dropped them. Rollover became automatic, but never invisible.

Aside: Cognitive load theory | A week that never holds more than a person can carry keeps the work within reach.

## Block 4

Eyebrow: Opening the week

Headline: Automatic could not mean silent, so the week opens on a recap of where the person stands, mirroring the screen that ends a week.

The rollover research I weighed found one pattern: the system does the work, then shows what it did. So the recap orients rather than asks, and leftovers simply appear in the new week. I stopped calling it the Sunday flow when the name kept producing a wrong rule, that someone joining on a Wednesday should wait for Sunday. It opens whatever week a person is in.

Aside: Undo over confirm | Resolving the carry over first and then showing it orients people instead of questioning them.

## Block 5

Eyebrow: State rules

Headline: Five states grew out of real cases, and each one got a rule about what the screen is allowed to claim.

Card: Clean slate | Nothing missed | A clean slate only means something if no day was lost, so a week with a lost day goes to rollover.
Card: Rollover | Coach not parent | I rejected headlines that would make people feel bad and held the voice of the get ahead screens.
Card: Catching up | Earned movement | I ruled that finishing exactly the week's items is not catching up. Catching up should show how much of the gap closed.

As variants grew past a dozen, I pruned them to keep the MVP buildable.

Aside: Goal gradient | People speed up as they see the distance to a goal close, so the closing has to be visible.

## Block 6

Eyebrow: Recalibration

Headline: After weeks of falling short, the product reads back what a person actually does and recommends a lower capacity to start from.

My first version let people type any number right on the screen, which lost the sense of a recommendation backed by reasoning. I reframed it: show their own weekly average, then recommend less work. It only lowers, because nobody behind should be invited to set a capacity they already cannot meet. Declining is allowed, but it carries a warning.

Aside: Planning fallacy | People tend to overestimate the time they will have, so a declared capacity needs a way down.

## Block 7

Eyebrow: Reset

Headline: For someone returning after weeks away, I leaned toward rebuilding their week without asking, then asked for research that could prove me wrong.

It held up: at a low motivation moment, a choice tends to default to keeping a schedule built for weeks that have passed. So progress is saved and the week is rebuilt from today in one step. I also changed the wording, since saying everything restarts from today made the saved progress look like a lie.

Aside: Status quo bias | Given a choice, people disproportionately stick with the option they already have.

<!-- end copy:9 -->

<!-- sources: 9.1 report 9.1; 9.2 report 9.2; 9.3 report 9.2 and 7.5; 9.4 report 9.3 and research-evidence notes (6 May rollover research); 9.5 report 9.4 to 9.7; 9.6 report 9.8; 9.7 report 9.9 (status quo bias verified, Samuelson and Zeckhauser 1988) -->

# Section 11: Action Items

<!-- copy:11 -->
Section: 11

## Block 1

Eyebrow: Two pages

Headline: With the week as the only place work happens, the rest of the curriculum needed a home that explains how everything fits.

A stakeholder looking at the weekly page could not tell where it sat in the hierarchy. I split the long view into two pages: a Growth Journey overview people land on, and a Pathway page for learning one Pathway. When overview drafts kept turning into a second Pathway page, I started over. Progress is not changed on either page; that happens in the Action Hub or inside an Action Item.

## Block 2

Eyebrow: Below the Pathway

Headline: Focus Areas were a sorting tag while they seemed to hold only a few Action Items, until the curriculum turned out to be in order.

Before designing the Pathway page I asked for content estimates, and a teammate's estimate put far fewer Action Items in each Focus Area than I expected. Once the order mattered, the page had to show it: Focus Area headers, a progress rail and locks on later items. A proposed color system did not survive, because the number of Focus Areas has no limit.

## Block 3

Eyebrow: What stays closed

Headline: Anyone can look ahead along the route, but the curriculum's order decides what can be marked done.

You cannot synthesize a usability finding before running the session, so order gates completion. Locks narrowed from every unfinished prerequisite to only items beyond this week, and for the MVP every Pathway opened for browsing. The Pathway page stays a place to look, not to work, even where pulling out this week's items would have read more clearly.

<!-- end copy:11 -->

<!-- sources: 11.1 report 11.1; 11.2 report 11.3; 11.3 report 11.4 and 11.5 -->
