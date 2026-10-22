# CS2 copy so far (22 Oct)

Copy exists for Sections 1, 2, 7, 8 and 11. Before this edit, Sections 7, 8 and 11 had each passed a recorded Opus truth review but had not had a voice pass or a read from Chadwick. Sections 3 to 6, 9 and 10 are unwritten. Sections 1 and 2 came from earlier work and were unchanged in the downloaded draft.


# Section 1: Hero

## Block 1

Eyebrow: Before the framework

Headline: The product had useful pieces but no framework to join them into one plan a person could follow.

When I started there was a curriculum of career paths, an onboarding quiz, career pages and a plan to sync
calendars. Each piece had been designed on its own and then made to fit with the others. Nothing turned them into
one plan someone could follow from start to finish, so I had to build a framework that could hold all of them.

## Block 2

Eyebrow: What Mondai is

Headline: The product combines a career route with a flexible schedule, and we found no direct design reference for that combination.

Mondai is an AI career guide. It builds a route into a tech career around each person's goals and the time
they actually have. A bootcamp has a route but holds everyone to one timetable. A task app fits around your
life but doesn't lead anywhere. Mondai had to do both at once, and no product we could find did.

## Block 3

Eyebrow: Competitive analysis

Headline: Each of the few products I studied offered something useful; I kept only what fit Mondai's mission.

Card: 01. Progress | CareerFoundry | Studies find that tracking real progress against a goal helps people reach it. Like CareerFoundry, Mondai shows two dates side by side: the target date set by the plan and the pace date indicated by a person's progress.
Card: 02. Calendar integration | Motion | Motion showed me that AI could find free time in someone's calendar. A study of 18,000 learners found that pushing people to schedule did not help them stick with it, so Mondai's connected calendar suggests where work fits and the plan still runs without one.
Card: 03. Home screen | Linear | Linear opens straight onto the work in front of you. Research on motivation finds that near goals build confidence and support progress while a distant goal does little, so Mondai's home screen shows only the next steps. The full Growth Journey, with every step to the goal, has its own page.
Card: 04. Timing | Learning apps | Every learning app I reviewed, even the most structured, let people fit lessons around their day. Research shows that having a say raises motivation and that learners with clear goals and plans are more likely to reach them. The plan therefore keeps a target and a pace while each person fits the work into their own day.


# Section 2: Background

## Block 1

Eyebrow: The unit of time

Headline: Not every life runs on a calendar, so the week became the unit.

Card: 01 | Per day | Tasks counted per day, worked back from a goal date.
Card: 02 | Calendar led | Too rigid for people whose weeks vary.
Card: 03 | The week | Room inside it, pressure at its edge.

The people this is for don't have regular weeks. They still need a little pressure to get things done.

## Block 2

Eyebrow: Due Saturday night

Headline: Pressure at the edge of the week, freedom inside it.

Everything is due Saturday night. Inside the week, the work happens whenever life allows. Connect a
calendar and each Action Item, one piece of work, gets a suggested slot. Without a calendar, the week is a list. A
missed slot isn't a missed item.

Card: Research | Long goals | Nearer steps and seeing your own progress tend to help people keep going.

## Block 3

Eyebrow: Locks

Headline: The week boundary decides what gets locked.

Card: 01 | Beyond this week | Locked.
Card: 02 | Inside this week | Visible and can be moved.
Card: 03 | The order | Only controls what can be marked done.

The Pathways, the five stages of the journey, run in order, so the first proposal was to lock every
Action Item that wasn't available yet. I cut that back to the week.

## Block 4

Eyebrow: One level up

Headline: The product opens on the week, with one level above it: the current Pathway and whether
the person is ahead or behind.

There was a case for showing people where they stood in the whole journey. A pace for the whole journey
would mostly show them how far they still had to go. Later I cut the journey level target and pace
altogether because they made the picture more confusing.

## Block 5

Eyebrow: For looking

Headline: The whole journey has its own pages, and nothing can be checked off there.

I hesitated because pulling this week's items out on the Pathway page would have made the weekly work
clearer. But I kept the week as the one place work gets done.

## Block 6

Eyebrow: Built for each person

Headline: The AI builds each person's Action Items from their onboarding answers.

The week someone opened was built from their onboarding answers. The AI did not yet know how much time
that person actually had.


# Section 7: The Action Hub and the Growth Journey

## Block 1

Eyebrow: Before a career is chosen

Headline: An empty Action Hub invites the quiz.

Someone who has not taken the quiz opens an empty Action Hub with an invitation to take the quiz and be matched with tech careers. A page that says it is still being built feels dishonest, as if that part of the product does not exist.

## Block 2

Eyebrow: Home base

Headline: The week is a list with times and a target.

The list view shows this week's Action Items with suggested times and weekly progress. The Pathway target and pace sit in the rail beside it. They are the only anchor for weekly adjustments. Each card shows its scheduled time, while the schedule view shows where the items sit among the week's events.

## Block 3

Eyebrow: No calendar

Headline: The list still works without a calendar.

Without a calendar, the same list shows a Schedule smarter prompt that offers to connect one. The view stays visible instead of disappearing. For a week too packed to schedule, the proposed fallback was a plain list with no specific times; everything would be due by the end of the week.

## Block 4

Eyebrow: First time

Headline: A short tip explains the scheduled time.

An Action Item's time slot carries a tip explaining that Mondai picked the time from the person's availability and that the icon reschedules it at any time. Tips appear only where they earn their place, and the first visit has to feel like a real start.

## Block 5

Eyebrow: The long view

Headline: The Growth Journey page holds the bigger goal.

The page shows a personalized summary, the journey target, journey pace, progress and the five Pathways. It holds the journey numbers because carrying both levels in one place was confusing. Capacity can be changed here because it changes the journey numbers.


# Section 8: Calendar integration

## Block 1

Eyebrow: First week

Headline: Calendar integration is offered, not forced.

In week one a person chooses to connect a calendar or manage their own schedule. The calendar step is written as a choice, without pressuring the person to connect.

## Block 2

Eyebrow: Boundaries

Headline: After sync, the person sets the window.

Once the calendar is synced, the person sets a preferred time window and their sharpest hours, and Mondai suggests a range. The preferred times depend on that window. The time bar version was selected.

## Block 3

Eyebrow: Moving things

Headline: A scheduled time is a suggestion that can be moved.

The schedule view lets a person move an Action Item to a new time. Scheduled times are suggestions rather than due dates because completion is decided at the end of the week. Mondai does not reschedule on its own, since that could get confusing fast.

## Block 4

Eyebrow: Edge cases

Headline: A packed calendar falls back to the plain list.

When the calendar is too full, a notice says it is packed this week and the scheduled times are removed. The idea was to switch that week to the approach used without a calendar, since a manual flow could be a lot of work for a fringe case. When a sync fails, a module over the list says the calendar lacks available times or could not sync.


# Section 11: Action Items

## Block 1

Eyebrow: Two pages

Headline: The Pathway page lists one Pathway at a time.

The Growth Journey stays the overview, and the Pathway page is where someone learns a single Pathway. It lists that Pathway's Focus Areas and Action Items, with breadcrumbs back to the journey page.

## Block 2

Eyebrow: Sequence

Headline: Focus Areas run in order, so Action Items do too.

Focus Areas turned out to be linear, so Action Items follow their order instead of sitting under a sorting tag. The Action Items are numbered on the page. A rail marks each one Complete, Current or Not started, and those in later Focus Areas are locked.
