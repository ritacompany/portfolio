# Framework CS, final copy after his review (7 Nov) and the tactics pass (8 Nov, rounds 2 and 3)

Tactics pass applied 8 Nov, his yes to all nine proposals plus cards 03 and 04 (reference/cs2/review-2026-11-07/tactics/proposals.json).

Every block in frame 5763:2448 in page order, with his decisions from the review page applied (marks and notes
in the page's db, collection marks). Three passes run over the whole page: the user (never person, people or
someone), effort (never cognitive load) and casing (Action Item, Pathway, Focus Area, Growth Journey, Action Hub,
Rollover, Recalibration, Reset capitalized as named parts of the framework; rolled over lowercase as a verb).
CHANGED marks a block that differs from the frame. Not yet run: Satoshi line measurement of changed headlines and
captions; the three run reader check.

## Hero (CHANGED)
Left: Designed as an AI guide for people from underrepresented backgrounds working their way into a tech career.
Right 1: Mondai builds each user a curriculum for the tech career they choose, called their Growth Journey, and it can take months to finish. Most users don’t have the same hours free every week, so a plan that expects a steady pace would have them falling behind from the first week.
Right 2: So I designed a weekly framework that turns that curriculum into weeks the user can finish, planned around the hours they say they can give each week. Mondai hasn’t launched, so this case study shows the reasoning rather than results: how much lands in each week, how it fits around their calendar and what happens when a week runs short or ends early.

## Competitive analysis (CHANGED)
Headline: Mondai had no direct model, but learning apps and task trackers each solve part of the problem.
Card labels: 01. Progress / 02. Calendar integration / 03. Home screen / 04. Timing
Card 01: Studies find that tracking real progress against a goal makes reaching it more likely. So, like CareerFoundry, Mondai shows two dates side by side: the target date the plan sets and the pace date the user’s progress points to.
Card 02 (his, user pass applied): Motion uses AI to find free time in a user’s calendar. But research shows that pushing students to schedule didn’t help them stick with it, so a connected calendar suggests where the work fits, and the plan still runs without one.
  User pass: "someone’s calendar" becomes "a user’s calendar".
Card 03: Linear opens straight onto the work in front of you, and so does Mondai: its home screen shows only this week’s work.
Card 04: Every learning app I reviewed, even the most structured, let learners fit lessons around their day. So the plan sets the goal, and each user decides where in their day the work goes.
  Why card 04 lost target and pace: his overkill point. Card 01 already carries target and pace as the borrowed idea, the Growth Journey block names the journey's pair and the rail block defines them; card 04 was the one repeating it.
Sources: Harkin et al. 2016; Baker, Evans and Dee 2016
  Citation check 7 Nov (all seven confirmed by Crossref, findings from abstracts): Kizilcec 2017 is the right year and paper (goal setting and planning in six MOOCs, card 04); the 2020 in the portfolio record is a different paper. Villar 2013 (progress bars in web surveys) and Lally 2010 (habit formation) support no card and are cut. Harkin is card 01, Baker card 02. After the tactics pass (8 Nov) cards 03 and 04 cite no study, so Bandura and Schunk, Patall and Kizilcec are off the sources line. Harkin is mostly health goals, so card 01 says studies, not learners.

## The foundation we built on (CHANGED)
Headline: Mondai calls the whole route to a user’s new career, and the curriculum that gets them there, their Growth Journey.
Pathways: The Growth Journey is made up of five Pathways, taken one at a time and in order, each covering a different part of getting into tech.
Diagram labels: Discovery · Cognition · Branding · Networking · Opportunity (Branding now before Networking) / Focus Areas / Action Items
Hierarchy: Each Pathway holds Action Items, the individual pieces of work the user does, grouped into Focus Areas by theme.

## Growth Journey (CHANGED)
Headline (his): The whole route has a page of its own, one users open now and then to see how far they’ve come and what’s left.
Body 1: Users need to see how the Pathway they’re on fits into the whole journey, so this page zooms out to show all of it.
Body 2 (his): Long term metrics like their journey target, pace and progress sit here out of the user’s immediate view.
Body 3: I kept the journey’s dates here because two sets of dates on the weekly screen would compete.

## Pathway (CHANGED)
Headline: Each Pathway has its own page, with all of its Action Items in the order the user works through them, including the ones still locked.
Body: This page shows the Pathway the user is on up close: its target and pace, what’s coming up next and the Focus Areas it covers. They won’t need it every week, but it’s there whenever they want to look ahead.
Focus Areas: Focus Areas, like user testing or wireframes, group the Pathway’s Action Items by theme and show the user what the Pathway will cover.

## Action Hub (CHANGED)
Eyebrow: Action Hub
Headline: Most of a user’s week happens on one screen: the list of Action Items they come back to nearly every day.
Body 1: I designed the Action Hub around one question for the user: what do I need to do this week?
Body 2 (his, unchanged): Each week opens with a short headline and a paragraph the AI writes about that week’s work. It should read like a friend telling the user what the week is about before they look at their list, so it talks about the work itself and not about how much they’ve finished.
Body 3: Each Action Item builds on the one before, so they’re finished in order and only the one at the top, marked Active, can be checked off.

## Action Item (CHANGED)
Eyebrow: Action Item
Headline: Every Action Item is a piece of work the AI writes for one user, and when I designed its page the AI was still being built.
Body: I couldn’t know yet how the AI would behave or what it would do well. The MVP scope was small too: the AI writes each Action Item as text, with no images or video, and nobody types anything into the page. So the page is built from ten kinds of plain text containers, like a short intro, a set of steps or a list of links, that the AI fills however the content needs, and I kept the structure loose in case it couldn’t use all of it at first. That keeps the page simple for the MVP and leaves me room to grow it into something richer once the AI is ready.

## Personalized timeline (CHANGED)
Headline: How many Action Items a user gets in a week depends on two things, and the user sets one of them.
Capacity: Each user tells Mondai how many hours they can give each week, the first time they open the Action Hub. Everything else is planned from that number. Mondai asks instead of learning the number from how the user works, because learning it would leave the first two or three weeks without a real plan. The risk is that users promise more time than they have, so the screen has them type an exact number of hours, which makes them count, instead of picking a generous range. If their weeks keep falling short, the plan can lower it later.
Effort (label was Cognitive load): How much work each Action Item takes, which Mondai sizes item by item.
Example: Aisha’s capacity is 6 hours a week. Last week that fit 4 Action Items. This week it fits 3, because this week’s take more effort.

## Calendar setup (CHANGED)
Headline (his; delete the two empty line breaks at the end of the layer): Calendar sync is optional. Users who turn it on answer two quick questions about their day, and Mondai plans around the answers.
Body 1: The first question sets a time range, and Mondai only places Action Items inside it.
Body 2 (number cut, his call): The range has to leave room, because Mondai can only use the time not already taken by the user’s own events. A short range on a busy day leaves none.
Body 3: The second asks for their sharpest hours, when they focus best. Mondai fills those first when they’re free, but nothing is locked to them.

## Schedule view (CHANGED)
Headline: With a calendar synced, the Action Hub can show the same week as a schedule, with Mondai finding times for Action Items around the user’s day.
Body 1: The list stays the default view, and the user can switch between the list and the schedule whenever they like.
Body 2: Mondai looks for gaps between the user’s own events, inside the hours they chose in setup. The calendar starts at the first of those hours, 8am for instance, so the day opens on the time Mondai can plan in. Each block is as long as its Action Item takes.
Body 3 (his, unchanged): Mondai only reads the calendar. It never writes Action Items into it, because that calendar holds commitments Mondai doesn’t own. Action Items and the user’s own events each get their own color.
Subhead: Rescheduling an Action Item
Body 4 (his): Users can move their Action Items from the list or the schedule, and Mondai offers only open time in that week, so nothing overlaps their personal schedule. Mondai never moves a time on its own. Automatic moving was easy to build, and I left it out because a plan that rearranges itself gets confusing.
Body 5: An Action Item’s time is only a suggestion. It’s due by the end of its week, Saturday night, so one without a time is fine, and finishing it still counts. When a week has no room left, the item stays in the list without a time.

## Falling behind, part 1: the right rail (CHANGED)
Headline (Satoshi Medium 40, not DM Sans): The Action Hub keeps two dates for the Pathway the user is on: where they’re aiming and where they’re headed.
Body: Both sit in a rail down the right side of the Action Hub. If the target moved every time a week went badly, the user would never see that they’d slipped, and seeing their pace fall behind it is what’s meant to get them back on track.
Pathway target (his): Set from the user’s capacity, it holds steady through an ordinary week and moves when their capacity changes.
Pathway pace (his): It updates once a week, so nobody watches it tick with every finished item. In week one it matches the target.
Ahead of target: The gap between the two dates, in days. It is the only ahead or behind signal on the rail.

## Falling behind, part 2: Rollover (CHANGED)
Headline (Satoshi Medium 40): When an Action Item is still open on Saturday night, everything after it moves a little later.
Rollover label (his): An Action Item carried over from last week.
Subhead (his): The Rollover effect
Body: A week that comes up short can feel like failing, and that feeling makes users less likely to keep going. So nobody has to decide what to do with it while they’re already behind: an unfinished Action Item moves into the next week on its own. Asking users to choose at that moment, with the math on screen, makes it feel like a gate instead of a guide. The Rollover takes up some of the next week’s capacity, so some of that week’s Action Items move to the week after, and the ones behind them move along too. That is why the pace date moves later, and since the journey pace is the last Pathway’s pace, the journey moves with it. The target stays where it was.
Sources line to add under the block: Soman and Cheema 2004.

## Buffer flow (CHANGED)
Headline (his): Finish the week’s work early and the days that are left become room to catch up or to get further ahead.
Body 1 (his): The moment the last Action Item of the week is done, this screen celebrates it and offers next week’s Action Items to pull forward.
Body 2 (his): A week only holds as much as the user’s capacity, so finishing early leaves nothing left to do. Pulling work forward is the only way to move the pace ahead of the target, or back toward it after a short week.
Body 3: What the screen says depends on the gap. A user who is ahead is told they can widen their lead. A user who is behind still gets the finish celebrated, then hears that pulling work forward is how they close the gap.
Body 4: That’s why the screen doesn’t wait for the start of next week: how much a user can pull forward depends on the days left.
Optional Body 5 (streak): The streak shows only here, as something to celebrate, because the gap in days already says whether the user is ahead.
Mock: Every task, every week, no gaps. becomes Every Action Item, every week, no gaps. The 3 Week streak chip stays.

## Start of week (CHANGED)
Headline (his): Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week.
Body: This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up.
1 of 5, Clean slate: This one only shows when nothing carried over. A week with an open Action Item gets Rollover instead.
2 of 5, Catching up: Finishing every Action Item doesn’t close the gap for a user who is behind, so this screen shows how many days they made up last week and points them to finishing early until they’re back on target.
3 of 5, Rollover (his): When a week ends unfinished, the Rollover Action Items wait in the new week under a magenta tag. The screen shows where the pace landed and what carried over, so the plan never changes unseen.
4 of 5, Recalibration (his): Rollover handles one unfinished week. When it keeps happening, the screen suggests a capacity that fits the hours the user has been giving. They can take it, set their own or skip it with a warning.
5 of 5, Reset: After a long absence, the old plan is too far behind to catch up to, so the week rebuilds from today with their progress kept. It has one button, because most users would pick keep my plan just because it’s the default.

## Ending (CHANGED, version A, accepted)
Eyebrow: Where it stands
Headline: The framework is built, so the question left is whether it works for the users it was made for.
Body 1: I decided what success looks like before the first week ran. The framework is meant to give the user weeks they can actually finish, so the measure I’m watching is how many planned weeks close with every Action Item done, and how often Rollover Action Items clear in the week they land in.
Body 2: A user whose work keeps rolling over is the sign the plan doesn’t fit their life, which is the case Recalibration was built for. Testing with the first users comes next, and these are the two numbers I’ll count from it.

## Not changed by him and left as is
Footer links, the Haven hero (not this case study's work, his note).
