# CS2 ending, round 2 (5 Nov)

Round 1 (in intro-and-ending.md) was judged generic. This round starts over from the reader.

## Where the ending sits, and why it is its own block

The frame (4269:9433, read 5 Nov) no longer ends on the Action Item page: Action item now sits after the
Action hub, and the page ends on Start of week, template 5 of 5 (Reset), then the footer. So the ending
follows Start of week. It is its own short block, not folded in, for three reasons. The Start of week body
is shared by all five carousel slides, so anything added there repeats on each. The Reset caption belongs to
one template and is already doing that job. And the ending draws on the whole page, not on one screen. The
loop forbids text only blocks, so each version carries one layout with images.

## The reader and what the ending must do

The reader is a hiring manager or design lead who has just scrolled roughly 24,000 pixels of mechanics:
the route, the Action Hub, the calendar, capacity, rollover, five start of week templates. The risk is that
they leave with a pile of mechanics and no picture of the designer. What every screen acted out, without the
page ever saying it, is one stance: when the plan and the user's life disagree, the plan is what changes,
and it changes in the open, with the cost shown and the decision left to the user.

The ending must do this: name that stance once as his intent, then prove it with one worked example in real
numbers and end on a fact, never a summing up line (his voice ends on the last fact).

Every version carries the same four points, in a different structure and with a different lead:
P1 the user's hours drive the plan; P2 Mondai does the bookkeeping on its own and in the open;
P3 the decisions stay with the user; P4 the cost is shown as a date before they choose.
Each adds facts the page has not taught yet (the recommendation returns next week, recalibration only
lowers, raising capacity from the Growth Journey page, capacity limits) so it is not a recap.

## Version A: the long run (one user across the whole plan)

Covers: P1 P2 P3 P4, told as one person's year.
Layout: T1I, media and body. Image 260,0 1156x749; text column 24,431.
Eyebrow: The long run
Headline: A plan that runs for more than a year will be wrong about the user's life at some point, and the framework has to be ready when it is.
Body: I designed the framework so that when the plan and the user's week disagree, the plan is the one that changes. Take Aisha, who set her capacity to 10 hours a week. When one of her weeks comes up short, the unfinished Action Items roll into the next week and that week takes fewer new ones, so it still fits the hours she gave. When short weeks keep happening, start of week shows her she has been averaging around 6.3 hours and recommends 6. Taking it moves her journey target from June 12, 2027 to January 10, 2028, and she sees that new date before she decides, because the plan never changes without her seeing it. She can also set her own number or skip the recommendation, and it comes back the next week. If she then stays away for 24 days, the week rebuilds from today and she picks up at Action Item 19 of 56 with all of her progress kept.
Image: Aisha's Growth Journey page again, after recalibration: journey target January 10, 2028, progress kept. A bookend to the Growth Journey block near the top, the same screen after her life changed.
Sources: Mondai design record

## Version B: who decides (what Mondai does against what only the user does)

Covers: P1 P2 P3 P4, split into two labelled halves.
Layout: T2I, media and body. Large image 24,0 1090x749; small image 967,773 449x359; text column 1138,0.
Eyebrow: Who decides
Headline: Mondai keeps track of the hours, the dates and whatever carries over, while every choice about how the user spends their time stays with them.
Body: I gave Mondai the parts of the plan that are only arithmetic and kept every choice about the user's time with the user.
Label: What Mondai does on its own
It sizes each week to the hours the user gave, moves anything unfinished into the next week and updates the pace once a week. Each start of week shows what moved and why, so none of it happens out of sight.
Label: What only the user decides
Mondai never moves a scheduled time or writes into the user's calendar, and it never changes their capacity for them. When their weeks keep coming up short, it shows them they have been averaging about 6.3 of the 10 hours they set and recommends 6, along with what that costs: the journey target moves from June 12, 2027 to January 10, 2028. They can take it, set their own number or skip it, and the recommendation comes back the next week. That moment can only lower capacity, because the user is already behind when it appears. Raising it is open from the Growth Journey page whenever their life frees up more time, and it takes effect the following week.
Images: large, a crop of the recalibration choice (Set my own capacity, Skip recalibration, Update capacity) with the what changes panel; small, a rollover Action Item under its magenta tag, the bookkeeping shown in the open.
Sources: Mondai design record

## Version C: two numbers (what the user says, then what their weeks show)

Covers: P1 P2 P3 P4, built on declared against observed hours.
Layout: T3I, three media and body. Images 24,0 and 732,0 and 24,701, each 684x677; text in the fourth cell 732,701.
Eyebrow: Two numbers
Headline: The plan sizes every week from the hours the user says they have, and it only changes that number once their own weeks give it a reason to.
Body: During setup the user tells Mondai how many hours they can give each week, anywhere from 4 to 40, and that one number sizes every week and sets every target date. I made it a number the user declares, because a new user has no history yet and anything Mondai estimated on day one would be a guess. The second number only appears once there is something real behind it. After a run of short weeks, start of week shows the user their own average, about 6.3 hours against the 10 they set, and recommends 6. In that moment it can only suggest less, since they are already behind, and they can still set their own number or skip it. Taking the recommendation moves the journey target from June 12, 2027 to January 10, 2028. More hours is always the user's call, made from the Growth Journey page and counted from the following week.
Images, in reading order: the capacity input at setup (10 hours a week); the recalibration read back (averaging around 6.3 hours, recommends 6); the capacity control on the Growth Journey page.
Sources: Mondai design record

## Where each fact traces

- 10 hours set, 6.3 average, recommends 6, journey target June 12, 2027 to January 10, 2028, set my own or skip: frame, Recalibration template (CONFIRMED).
- 24 days, rebuilds from today, progress kept, Action Item 19 of 56: frame, Reset template (CONFIRMED).
- Rollover and the lighter next week; the plan never changes unseen: frame, Falling behind and Rollover caption (CONFIRMED).
- Pace updates once a week; Mondai never moves a time and only reads the calendar: frame (CONFIRMED).
- Recommendation returns the next week after a skip: reasoning/capacity.md section 6 (CONFIRMED as his decision; whether it shipped is not recorded).
- Recalibration can only lower; raising from the Growth Journey page any time, effective the following week: reasoning/CHADWICK_ANSWERS_2026-08-27.md (CONFIRMED).
- Capacity limits 4 to 40 hours: reasoning/capacity.md section 10 item 3 (CONFIRMED as decided; the frame does not show it, so check it shipped).
- Declared because a new user has no history: reasoning/THROUGHLINES.md section 7 and capacity.md (CONFIRMED).
- More than a year: the journey runs from a March 2026 week 3 to June 12, 2027 (ESTIMATE).
- Aisha as the user's name: the person in every screen on the page.
- "The parts of the plan that are only arithmetic" in B: PARAPHRASE of the frame's own rollover copy, the math already accounts for them.

## Things found on the way that need him

- The outline's correction says recalibration never looks at hours spent. The frame and capacity.md say
  it shows the user their own average hours (6.3). The versions follow the frame.
- The buffer flow screen shows a 3 week streak badge, while the Action hub copy says there is no streak.
- Background still reads one of the primary feature.
