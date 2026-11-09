# Paste into Transported Framework CS (5812:16446)

In frame order, top to bottom. Find each layer by the text it starts with now, select all its text and paste the new text. Lines in one block that sit in one layer are separated the way the layer already separates them. Both cuts (tw-hero, tw-end) accepted 8 Nov and applied below.

**Starts with:** Mondai is an AI tech career navigator

Designed as an AI guide for newcomers from underrepresented backgrounds finding their way into tech.

**Starts with:** asdsdasddfaassdf (the placeholder list under This case study is focused on; hide that label)

There’s no set path into tech, so Mondai’s AI writes each user a curriculum for the career they choose, and it can take months. Most users don’t have the same hours free every week, so a plan that expects a steady pace would leave them behind from week one.

When I started on the MVP, the curriculum was a list in a fixed order, with calendar integration planned and nothing connecting them. I designed the weekly framework that turns it into weeks each user can finish. Mondai hasn’t launched, so this case study shows the reasoning rather than results.

**Starts with:** There was no direct model for Mondai

Mondai had no direct model, but learning apps and task trackers each solve part of the problem.

**Starts with:** 02. calendar integration

02. Calendar integration

**Starts with:** 04. timing

04. Timing

**Starts with:** Studies find that tracking

Studies find that tracking real progress against a goal makes reaching it more likely. So, like CareerFoundry, Mondai shows two dates side by side: the target date the plan sets and the pace date the user’s progress points to.

**Starts with:** Motion showed me

Motion uses AI to find free time in a user’s calendar. But research shows that pushing students to schedule didn’t help them stick with it, so a connected calendar suggests where the work fits, and the plan still runs without one.

**Starts with:** Linear opens straight

Linear opens straight onto the work in front of you, and so does Mondai: its home screen shows only this week’s work.

**Starts with:** Every learning app I reviewed

Every learning app I reviewed, even the most structured, let learners fit lessons around their day. So the plan sets the goal, and each user decides where in their day the work goes.

**Starts with:** Sources: Harkin

Sources: Harkin et al. 2016; Baker, Evans and Dee 2016

**Starts with:** The user’s route to their new career

Mondai calls the whole route to a user’s new career, and the curriculum that gets them there, their Growth Journey.

**Starts with:** The growth journey was based on five pathways

The Growth Journey is made up of five Pathways, taken one at a time and in order, each covering a different part of getting into tech.

**Starts with:** Networking (third diagram label)

Branding

**Starts with:** Branding (fourth diagram label)

Networking

**Starts with:** Focus areas (all five diagram labels)

Focus Areas

**Starts with:** Action items (all five diagram labels)

Action Items

**Starts with:** Each pathway has two additional layers

Each Pathway holds Action Items, the individual pieces of work the user does, grouped into Focus Areas by theme.

**Starts with:** The whole route has a page of its own

The whole route has a page of its own, one users open now and then to see how far they’ve come and what’s left.

**Starts with:** People need to understand

Users need to see how the Pathway they’re on fits into the whole journey, so this page zooms out to show all of it.
Long term metrics like their journey target, pace and progress sit here out of the user’s immediate view.
I kept the journey’s dates here because two sets of dates on the weekly screen would compete.

**Starts with:** Each Pathway has its own page

Each Pathway has its own page, with all of its Action Items in the order the user works through them, including the ones still locked.

**Starts with:** This page was designed to give the user

This page shows the Pathway the user is on up close: its target and pace, what’s coming up next and the Focus Areas it covers. They won’t need it every week, but it’s there whenever they want to look ahead.

**Starts with:** Focus areas (label)

Focus Areas

**Starts with:** Each pathway is split into focus areas

Focus Areas, like user testing or wireframes, group the Pathway’s Action Items by theme and show the user what the Pathway will cover.

**Starts with:** Action hub (eyebrow)

Action Hub

**Starts with:** Most of a person's week

Most of a user’s week happens on one screen: the list of Action Items they come back to nearly every day.

**Starts with:** I designed the Action Hub to work as a starting point

I designed the Action Hub around one question for the user: what do I need to do this week?
Each week opens with a short headline and a paragraph the AI writes about that week’s work. It should read like a friend telling the user what the week is about before they look at their list, so it talks about the work itself and not about how much they’ve finished.
Each Action Item builds on the one before, so they’re finished in order and only the one at the top, marked Active, can be checked off.

**Starts with:** Action item (eyebrow)

Action Item

**Starts with:** Someone has to read each piece of work

Every Action Item is a piece of work the AI writes for one user, and when I designed its page the AI was still being built.

**Starts with:** I couldn’t know yet

I couldn’t know yet how the AI would behave or what it would do well. The MVP scope was small too: the AI writes each Action Item as text, with no images or video, and nobody types anything into the page. So the page is built from ten kinds of plain text containers, like a short intro, a set of steps or a list of links, that the AI fills however the content needs, and I kept the structure loose in case it couldn’t use all of it at first. That keeps the page simple for the MVP and leaves me room to grow it into something richer once the AI is ready.

**Starts with:** The amount of action items

How many Action Items a user gets in a week depends on two things, and the user sets one of them.

**Starts with:** Each user sets their own capacity

Each user tells Mondai how many hours they can give each week, the first time they open the Action Hub. Everything else is planned from that number. Mondai asks instead of learning the number from how the user works, because learning it would leave the first two or three weeks without a real plan. The risk is that users promise more time than they have, so the screen has them type an exact number of hours, which makes them count, instead of picking a generous range. If their weeks keep falling short, the plan can lower it later.

**Starts with:** Cognitive load (label)

Effort

**Starts with:** The complexity of an action item

How much work each Action Item takes, which Mondai sizes item by item.

**Starts with:** Suzie’s capacity is set to 6 hours

Aisha’s capacity is 6 hours a week. Last week that fit 4 Action Items. This week it fits 3, because this week’s take more effort.

**Starts with:** Calendar sync is optional. People who turn it on (also delete the two empty lines at the end)

Calendar sync is optional. Users who turn it on answer two quick questions about their day, and Mondai plans around the answers.

**Starts with:** Setting a preferred time is essentially

The first question sets a time range, and Mondai only places Action Items inside it.
The range has to leave room, because Mondai can only use the time not already taken by the user’s own events. A short range on a busy day leaves none.
The second asks for their sharpest hours, when they focus best. Mondai fills those first when they’re free, but nothing is locked to them.

**Starts with:** With a calendar synced

With a calendar synced, the Action Hub can show the same week as a schedule, with Mondai finding times for Action Items around the user’s day.

**Starts with:** The list stays the home view

The list stays the default view, and the user can switch between the list and the schedule whenever they like.

**Starts with:** Mondai looks for gaps

Mondai looks for gaps between the user’s own events, inside the hours they chose in setup. The calendar starts at the first of those hours, 8am for instance, so the day opens on the time Mondai can plan in. Each block is as long as its Action Item takes.

**Starts with:** Mondai only reads the calendar

Mondai only reads the calendar. It never writes Action Items into it, because that calendar holds commitments Mondai doesn’t own. Action Items and the user’s own events each get their own color.

**Starts with:** Reschedudling an action item

Rescheduling an Action Item

**Starts with:** People can move their Action Items

Users can move their Action Items from the list or the schedule, and Mondai offers only open time in that week, so nothing overlaps their personal schedule. Mondai never moves a time on its own. Automatic moving was easy to build, and I left it out because a plan that rearranges itself gets confusing.
An Action Item’s time is only a suggestion. It’s due by the end of its week, Saturday night, so one without a time is fine, and finishing it still counts. When a week has no room left, the item stays in the list without a time.

**Starts with:** The Action Hub’s right rail shows two dates (also set it to Satoshi Medium 40, tracking minus 4 percent, like the other headlines)

The Action Hub keeps two dates for the Pathway the user is on: where they’re aiming and where they’re headed.

**Starts with:** Research shows that a small weekly set

Both sit in a rail down the right side of the Action Hub. If the target moved every time a week went badly, the user would never see that they’d slipped, and seeing their pace fall behind it is what’s meant to get them back on track.

**Starts with:** The date this Pathway should be done by (also delete the two empty lines at the end)

Set from the user’s capacity, it holds steady through an ordinary week and moves when their capacity changes.

**Starts with:** Where the person's progress says

It updates once a week, so nobody watches it tick with every finished item. In week one it matches the target.

**Starts with:** The gap between the two dates

The gap between the two dates, in days. It is the only ahead or behind signal on the rail.

**Starts with:** When a week ends with work left over (also Satoshi Medium 40, minus 4 percent)

When an Action Item is still open on Saturday night, everything after it moves a little later.

**Starts with:** An Action Item still open when the week ends

An Action Item carried over from last week.

**Starts with:** The Rollover effect

The Rollover effect

**Starts with:** A week that comes up short can easily feel

A week that comes up short can feel like failing, and that feeling makes users less likely to keep going. So nobody has to decide what to do with it while they’re already behind: an unfinished Action Item moves into the next week on its own. Asking users to choose at that moment, with the math on screen, makes it feel like a gate instead of a guide. The Rollover takes up some of the next week’s capacity, so some of that week’s Action Items move to the week after, and the ones behind them move along too. That is why the pace date moves later, and since the journey pace is the last Pathway’s pace, the journey moves with it. The target stays where it was.

**Starts with:** Finish the week’s work early

Finish the week’s work early and the days that are left become room to catch up or to get further ahead.

**Starts with:** The moment the last Action Item

The moment the last Action Item of the week is done, this screen celebrates it and offers next week’s Action Items to pull forward.
A week only holds as much as the user’s capacity, so finishing early leaves nothing left to do. Pulling work forward is the only way to move the pace ahead of the target, or back toward it after a short week.
What the screen says depends on the gap. A user who is ahead is told they can widen their lead. A user who is behind still gets the finish celebrated, then hears that pulling work forward is how they close the gap.
That’s why the screen doesn’t wait for the start of next week: how much a user can pull forward depends on the days left.

**Starts with:** Whether someone finished last week early (the same headline is in all five Start of week templates)

Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week.

**Starts with:** This is the first screen someone sees (the same body is in all five templates)

This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up.

**Starts with:** A clean slate only means something if no day was lost

This one only shows when nothing carried over. A week with an open Action Item gets Rollover instead.

**Starts with:** Finishing every Action Item doesn’t close the gap

Finishing every Action Item doesn’t close the gap for a user who is behind, so this screen shows how many days they made up last week and points them to finishing early until they’re back on target.

**Starts with:** When a week ends unfinished, the rollover

When a week ends unfinished, the Rollover Action Items wait in the new week under a magenta tag. The screen shows where the pace landed and what carried over, so the plan never changes unseen.

**Starts with:** Rollover handles one unfinished week

Rollover handles one unfinished week. When it keeps happening, the screen suggests a capacity that fits the hours the user has been giving. They can take it, set their own or skip it with a warning.

**Starts with:** After a long absence

After a long absence, the old plan is too far behind to catch up to, so the week rebuilds from today with their progress kept. It has one button, because most users would pick keep my plan just because it’s the default.

**Starts with:** In reflection ?/?

What’s still open

**Starts with:** Ending section

The least settled rule is the one for when Recalibration steps in, because no user had lived a week with the plan yet.

**Starts with:** or whatever

Right now it steps in after three weeks in a row where a user finishes less than about half the hours they set. That line is a starting point, and the first users’ weeks will move it.
It comes too early if most users who see it skip it and catch up anyway, and too late if users stop coming back before it ever shows.

**New text layer under the Rollover effect body, in the sources style (Satoshi Regular 12, like the competitive analysis sources):**

Sources: Soman and Cheema 2004

**Buffer flow mock (Heebo, inside the screen):** Every task, every week, no gaps. becomes Every Action Item, every week, no gaps. The 3 Week streak chip stays.
