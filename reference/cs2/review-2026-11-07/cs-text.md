# Framework case study, text in reading order

## 1. Hero
Title: Framework CS
Role: Founding designer | Affiliate: Mondai | Focus: Design, research and strategy.
Left: Mondai is an AI tech career navigator designed for the next generation of hustlers.
Right: This case study is focused on [placeholder text]

## 2. Competitive analysis
Headline: There was no direct model for Mondai, so we looked to references like learning or task tracking products that shared overlap.
Card 01. Progress / CareerFoundry: Studies find that tracking real progress against a goal helps people reach it. So, like CareerFoundry, Mondai shows two dates side by side: the target the plan sets and the pace date your progress is heading for.
Card 02. calendar integration / Motion: Motion showed me AI could find free time in someone's calendar. But research shows that pushing people to schedule didn't help them stick with it, so a connected calendar suggests where the work fits, and the plan still runs without one.
Card 03. Home screen / Linear: Linear opens straight onto the work in front of you. Research on motivation finds near goals build confidence and progress while a distant goal does little, so the home screen shows only the next steps and the full Growth Journey, every step to the goal, has its own page.
Card 04. timing / Learning apps: Every learning app I reviewed, even the most structured, let people fit lessons around their day. Research shows having a say raises motivation and that learners with clear goals and plans are more likely to reach them, so the plan keeps a target and a pace while each person fits the work into their own day.
Sources: Harkin et al. 2016; Patall, Cooper and Robinson 2008; Kizilcec, Perez-Sanagustin and Maldonado 2017; Baker, Evans and Dee 2016; Bandura and Schunk 1981; Villar, Callegaro and Yang 2013; Lally et al. 2010

## 3. The foundation we built on
Headline: The user's route to their new career and the curriculum that existed to get them there was defined as the user's "Growth Journey"
Pathways: The growth journey was based on five pathways, each one covering a different aspect of the user's career journey
(diagram labels: Discovery, Cognition, Networking, Branding, Opportunity; Focus areas; Action items)
Hierarchy: Each pathway has two additional layers below it; focus areas and action items.

## 4. Growth Journey
Headline: The whole route has a page of its own, one people open now and then to see how far they've come and what's left.
Body: People need to understand how their current pathway connects to their entire growth journey. This page was designed to offer a zoomed out look of the user's entire journey.
Long term metrics like their journey target, pace and progress sit here out of the user's immediate view.
Keeping them out of view was intentional. Research on recent graduates found that the ones who daydreamed most about getting a job applied to fewer jobs and got fewer offers. Putting a far off finish line in front of someone every week can have the same effect, so the weekly screens stick to the current Pathway and the full journey lives here.

## 5. Pathway
Headline: Each Pathway has its own page, with all of its Focus Areas and Action Items laid out in the order someone works through them.
Body: This page was designed to give the user a closer look at the pathway they're on, including which focus area they're in and what's coming up next. They won't need it every week, but it's there whenever they want to look ahead.
Focus areas: Each pathway is split into focus areas, like user testing or visual design. They run in order and give the user a sense of what that pathway will cover.

## 6. Action hub
Headline: Most of a person's week happens on one screen, the list of Action Items they come back to nearly every day.
Body: I designed the Action Hub to work as a starting point instead of a traditional home screen. It answers one question for the user, what do I need to do this week, and the full curriculum stays on the Growth Journey and Pathway pages.
Each week opens with a short headline and a paragraph the AI writes about that week's work. It should read like a friend telling the user what the week is about before they look at their list, so it talks about the work itself and not about how much they've finished. Action Items are finished in order here, so only the Active one at the top can be checked off.

## 7. Action item
Headline: Someone has to read each piece of work the AI writes, and when I designed the page the AI was still being built.
Body: I couldn't know yet how the AI would behave or what it would do well. The MVP scope was small too: the AI writes each Action Item as text, with no images or video, and nobody types anything into the page. So the page is a set of plain containers the AI can fill however it turns out to work, and I kept the structure loose in case it couldn't use all of it at first. That keeps the page simple for the MVP and leaves me room to grow it into something richer once the AI is ready.

## 8. Personalized timeline
Headline: The amount of action items each user was assigned per week became based on two things:
Capacity: Each user sets their own capacity by informing the user how many hours they can dedicate per week.
Cognitive load: The complexity of an action item and it's required effort
Example: Suzie's capacity is set to 6 hours per week. This week, she has 3 action items, and last week, she had 4. This is because this week's action items require more cognitive load than last week's.

## 9. Calendar setup
Headline: Calendar sync is optional. People who turn it on answer two quick questions about their day, and Mondai plans around the answers.
Body: Setting a preferred time is essentially the user telling the product their own availability, meaning when it can and can't schedule Action Items.
The range needs at least eight hours, because Mondai can only use the time not already taken by the person's own events. A short range on a busy day leaves none.
Sharpest hours are more of a suggestion. Mondai will prioritize this time range for scheduling Action Items when a time within that range is available.

## 10. Schedule view
Headline: With a calendar synced, the Action Hub can show the same week as a schedule, with Mondai finding a time for the Action Items that fit around the person's day.
Body 1: The list stays the home view. Syncing a calendar is optional, so the plan has to work without one, and anyone can switch between the list and the schedule whenever they like.
Body 2: Mondai looks for gaps between the person's own events, inside the hours they chose in setup. The calendar starts at the first of those hours, 8am for instance, so the day opens on the time Mondai can plan in. Each block is as long as its Action Item takes, and this is the only place someone can see how big a piece of work is before they start it.
Body 3: Mondai only reads the calendar. It never writes Action Items into it, because that calendar holds commitments Mondai doesn't own. Action Items and the person's own events each get their own color.
Subhead: Reschedudling an action item
Body 4: People can move their Action Items from the list or the schedule, and Mondai offers only open time in that week, so nothing overlaps their personal schedule. Mondai never moves a time on its own. Automatic moving was easy to build, and I left it out because a plan that rearranges itself gets confusing.
An Action Item is due by the end of its week, not at its time, so one without a time is fine, and finishing it still counts toward the week's progress. When a week has no room left, the item stays in the list without a time.

## 11. Falling behind (part 1)
Headline: When a week ends with work left over, every Action Item that follows moves later.
Body: Research shows that a small weekly set keeps people motivated. Keeping the user focused on their current Pathway target rather than a longer term goal enhances user motivation.
The Action Hub's right rail shows two dates for the Pathway the person is on now.
Label Pathway target: The date this Pathway should be done by, set from the hours the person gives each week. It holds steady through an ordinary week and moves when those hours change.
Label Pathway pace: Where the person's progress says they will finish. It updates once a week, so nobody watches it tick with every finished item. In week one it matches the target.
Label Ahead of target: The gap between the two dates, in days. It is the only ahead or behind signal on the screen. There is no streak.

## 12. Falling behind (part 2)
Headline (same as part 1): When a week ends with work left over, every Action Item that follows moves later.
Label Rollover: An Action Item still open when the week ends on Saturday night.
Subhead: The Rollover effect
Body: A week that comes up short can easily feel like failing, and that feeling makes people less likely to keep going. So nobody has to make up lost time: an unfinished Action Item moves to the front of the next week. A week can only hold the hours the person set aside for it (their capacity). The rollover takes some of those hours, so some of that week's Action Items will get pushed to the next week which creates a domino effect to the rest of the user's weeks. Meaning their pace dates gets pushed out as well and pushing their pace dates later than their targets.

## 13. Buffer flow
Headline: Finish the week's work early and the days that are left become room to catch up or to get further ahead.
Body: The moment the last Action Item of the week is done, this screen celebrates it and offers next week's Action Items to pull forward.
A week only holds the hours a person gave, so finishing early leaves nothing left to do. Pulling work forward is the only way to move the pace ahead of the target, or back toward it after a short week.
So the words follow the gap. Someone ahead is told they can stretch it. Someone still behind gets the finish celebrated too, then hears this is how they close the gap.
It can't wait for the next week. How much someone can pull forward depends on the days left in this one.

## 14. Start of week (carousel of five templates, same headline and body on each slide)
Headline: Whether someone finished last week early or fell short, the next week starts with a recap and a plan for the week.
Body: This is the first screen someone sees when they open the product each week. It lays out the week ahead, and what's on it depends on what they need that week. If they're on track, it says less. If they're struggling to stay on target, it offers ways to catch up.
Template 1 of 5, Clean slate: A clean slate only means something if no day was lost, so a week with a lost day goes to rollover.
Template 2 of 5, Catching up: Finishing every Action Item doesn't close the gap for someone behind, so this screen shows the days they won back and points to finishing early, until they catch up.
Template 3 of 5, Rollover: When a week ends unfinished, the rollover Action Items wait in the new week under a magenta tag. The screen shows where the pace landed and what carried over, so the plan never changes unseen.
Template 4 of 5, Recalibration: Rollover handles one unfinished week. When it keeps happening, the screen suggests a capacity that fits the hours someone has been giving. They can take it, set their own or skip it with a warning.
Template 5 of 5, Reset: After a long absence, the old plan is too far behind to catch up to, so the week rebuilds from today with progress kept and new target dates. It has one button, because a keep my plan option would win by default.

## 15. Ending
In reflection ?/? / Ending section / or whatever [placeholder]
Footer: Explore more case studies: MONDAI: DESIGN SYSTEM CASE STUDY | HAVEN: LGBTQIA + youth app
