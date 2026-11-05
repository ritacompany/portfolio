# CS2 intro and ending, round 1 (5 Nov)

Owed this round, skipped to save budget: the canvas and the reader check (all versions, intro and ending).
Ran: humanizer as the skill on the final text of all six versions (dash scan clean). The no-ai-slop pass was
not run; he prefers humanizer for this round.

Written against frame 4269:9433 read 5 Nov (read only). The page now runs: Hero (title "Framework CS" is a
placeholder, role line Founding designer / Mondai / Design, research and strategy, intro sentence, right
column "This case study is focused on" plus gibberish), Background, Competitive analysis, The foundation
(Growth Journey, five Pathways, Focus Areas, Action Items), Growth Journey page, Pathway page, Action Hub,
Calendar setup, Schedule view, Scheduled times, Personalized timeline (capacity, cognitive load), Buffer
flow, Falling behind, Start of week. The page ends on Start of week.

Facts used and where they trace: Background and role line (frame); target, pace and gap, and the hours the
person gives setting the Pathway date (Pathway page and Action Hub frame copy); optional calendar (Calendar
setup frame); rollover, buffer flow and start of week (frame copy, versions/falling-behind.md,
buffer-flow.md, start-of-week.md); recalibration looks at progress and never hours spent, only goes down
while behind (outline block 13, start-of-week-states.md); capacity proposed as the way out of the weekly cap
problem (reasoning/capacity.md, carry-over.md); the system refuses to claim what it cannot observe
(reasoning/THROUGHLINES.md section 7).

---

## Intro (Hero block)

Every version keeps: the role line, what Mondai is in one clause, the starting problem (a fixed curriculum
with calendar plans and no framework to connect them), the three parts the page covers (the route, the week,
a week that goes wrong) and the one number the person gives. Role line is the same in all three: Founding
designer at Mondai. Design, research and strategy.

### Intro A: the problem first

Covers: starting problem, the three parts in order, the one number, role.
Eyebrow: Framework case study
Headline: A fixed curriculum, cut into weeks a person can actually finish
Role line: Founding designer at Mondai. Design, research and strategy.
Body: Mondai is an AI career tool that builds a personalized route into tech. When I started on the MVP, that
route was a list in a fixed order, with calendar integration planned and nothing tying the pieces together.
A list does not know that one person has four free hours a week and another has fifteen. This case study is
the framework I built to fix that.
Right column: This case study is focused on
- How the route is organized, from Growth Journey down to Action Items
- How one number from the person sizes every week
- What happens when a week comes up short
Sources: Mondai design record
Visual: Right column is plain text on black, the three lines set as a short list under the lead-in.

### Intro B: the person's one number

Covers: the one number first, starting problem, route, week, a week that goes wrong, role.
Eyebrow: Framework case study
Headline: Tell Mondai how many hours you have, and the whole plan changes shape
Role line: Founding designer at Mondai. Design, research and strategy.
Body: A person changing careers gives Mondai one fact about their life: the hours they can spare each week.
Everything else on this page follows from it. It sets how many Action Items land in a week, when a Pathway
should be done and what happens when a week falls short. Mondai is an AI career tool, and when I started on
its MVP the curriculum was a fixed list with no framework behind it. I built that framework.
Right column: This case study is focused on how a curriculum in a fixed order becomes a week sized to one
person's life, and how it recovers when the week does not go to plan.
Sources: Mondai design record
Visual: A single large number input mock ("6 hours a week") beside the intro, grey frame, he draws it.

### Intro C: the page as a map

Covers: Mondai in one clause, starting problem, the three parts as a labeled preview, the one number, role.
Eyebrow: Framework case study
Headline: The framework behind a career plan that has to fit a busy week
Role line: Founding designer at Mondai. Design, research and strategy.
Body: Mondai is an AI career tool that creates personalized pathways into tech for people with full lives.
Its curriculum began as a fixed list with calendar integration planned. I built the framework that connects
it: what the route is, how it becomes a week and how it holds up when a week goes wrong. The hours a person
gives each week is the thread through all of it.
Right column: This case study is focused on
- The route: Growth Journey, Pathways, Focus Areas and Action Items
- The week: the Action Hub, the optional calendar and capacity
- The slip: rollover, buffer flow and start of week
Sources: Mondai design record
Visual: Right column set as three labeled rows with thin rules, matching the page's three parts.

Pick: C. It names the parts in the order the page runs, so a stranger can find themselves on it, and it keeps
the hours as a thread without spending the whole intro on it. B is the strongest opening line but promises a
payoff the first two parts only reach at Personalized timeline.

---

## Ending (new short block after Start of week)

Proposal: a separate short block after Start of week, one headline and a short body, no new screen
required. Folding it into Start of week would bury it, since that block is already about six templates.

Every version keeps: the hours the person gives set the week's size, set the Pathway target, drive rollover
and what the plan suggests after short weeks, and the person can change the number. Sources line the same in
all three: Mondai design record

### Ending A: trace it back

Covers: the full chain from hours to week, target, rollover, buffer flow, recalibration.
Eyebrow: What holds it together
Headline: Every screen on this page, from the Action Hub to start of week, traces back to the hours a person gives each week
Body: The hours a person gives sets how many Action Items land in a week and the date a Pathway should be
done. When a week comes up short, the unfinished item rolls over and the next week takes fewer new ones, so
it still fits those hours. When a week finishes early, buffer flow offers next week's work. After several
short weeks, start of week looks at their progress and suggests fewer hours. Change the number and each of
these moves with it. That is why I kept it to one input.
Visual: One line from a big number down to the Action Hub, Pathway target, rollover and recalibration tiles.

### Ending B: what the system will not guess

Covers: declared hours, progress not time spent, target and pace, restraint, ability to change it.
Eyebrow: What holds it together
Headline: Mondai never guesses how much time someone has, so the plan only ever moves on what they told it
Body: The hours are declared by the person, not measured from what they do. Mondai cannot see whether
someone worked on a task, so a passed calendar slot does not count as done and a quiet week does not lower
the number. Suggestions to lower it come from their progress over several short weeks, never from hours
spent, and only while they are behind. The same number sizes the week and sets each Pathway date, so one
honest input keeps every date honest. They can change it whenever their life does.
Visual: A settings row showing the hours with an edit control, plain, one grey frame.

### Ending C: why one number

Covers: weekly cap problem, one input over many, hours set once and editable, what it drives.
Eyebrow: What holds it together
Headline: Early on, the weekly plan hit a cap with no good answer, and one question about hours solved it
Body: A cap on Action Items per week was the first idea, and it did not hold, because the same six hours can
mean three heavy items one week and four light ones the next. Asking for the hours instead sized the week
properly. The person says it once during setup and can change it in settings, and it now sets the week, the
Pathway dates and when the plan suggests less. I refused to add a step for each of those jobs. One number
does them all.
Visual: Two small week columns, one with three heavy items and one with four light, same height. Grey frame.

Pick: A. It is the only version that shows the whole system closing on its single input, which is the claim
the page is built to earn. B has the sharper idea but leans on the restraint theme, which the page never sets
up earlier. C is the most honest about the decision but depends on the weekly cap story, which no block
introduces.
