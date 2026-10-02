# CS2: the comprehension problem, and how the piece solves it

Written 2026-08-28 after Chadwick rejected three spine proposals in a row. He was right to. The
proposals were all "one problem the case study is about", which is the shape for a case study about a
feature. CS2 is about a system. For a system the organising question is not which problem leads, it is
**what order the reader learns things in**.

His words: "it feels like you're writing this for somebody that already understands how this all
works. we're trying to show the reader how this all works, right, as part of this. so that cannot just
take a back seat to developing some kind of specific spine structure."

---

## What the research says

Three sources, checked rather than assumed.

**1. The best-regarded case study of a complex system does not front-load the system.**
Simon Pan's Uber piece, repeatedly cited as the benchmark for this exact problem, runs its sections in
this order: Design by accretion, Recapture the magic in 10 months, Early insights from the field, Rider
expectations changed over time, Reframing the problem, Working backwards from perfect, **Introducing
Rendezvous**, Better understanding where the rider is, Communicating location more intuitively,
Positive results. The mechanism arrives at section seven of ten. The reader is given the concept at the
point it becomes necessary to follow the solution, not as a preamble.

**2. Narrative craft calls the alternative an info dump and has a rule for avoiding it.**
Rather than opening with a data dump, proceed through the story until you reach a point that will not
make sense without explanation, then explain it. Deliver background just in time to inform the current
event. Relevance and pacing are the whole game.

**3. Technical writing sets the floor for an unfamiliar audience.**
Start from zero assumptions. Define every term on first use. Build up slowly. Test the explanation on
someone who does not know the subject, because if they are confused the audience will be.

Together: **control the rate at which new concepts reach the reader, and never spend a term before you
have paid for it.**

## The rule for CS2

> No product term appears in the piece until the sentence before it has made the reader need it.

Every Mondai noun is a debt. Growth Journey, Pathway, Focus Area, Action Item, capacity, target, pace,
rollover, recalibration. Each one gets introduced at the last possible moment, in the place where the
story stops making sense without it, and each one is paid for by a visual rather than a paragraph.

## The concept ladder

The order the reader has to learn things in. This is the spine. Each rung names the term it spends and
what has to be true before it can be spent.

| # | What the reader learns | Term spent | Cannot come earlier because |
|---|---|---|---|---|
| 0 | Who this is for and what they are up against | none | The promise has not been made yet. This is the person it will be made to | Any product term here is unearned |
| 1 | The route into tech is not school to internship to job any more, and nobody walks you through it | none | Nothing existed that could make this promise | This is the reason the product exists |
| 2 | Mondai turns that into an ordered sequence someone can actually walk | Growth Journey, Pathway | The features existed and nothing said how they connected, so the promise had nothing to stand on | Meaningless before the reader knows there is a route to walk |
| 3 | The sequence is handed over a bit at a time, weekly | the week, Action Item | A whole career shown at once is the fastest way to make someone quit | Needs a sequence to divide |
| 4 | How much you get is calculated from how much time you actually have | capacity, target date | The system was sizing weeks for a life the user does not have | Needs the week to size |
| 5 | The system watches whether reality matched the estimate | pace | A number that moves against you is a judgement unless it is designed not to be | Needs a target to compare against |
| 6 | Some people want it in their calendar, and that is where it nearly broke | scheduling, rollover | A calendar that helps and a calendar that judges are the same interface | Only lands once 3, 4 and 5 exist |
| 7 | Falling behind had to stop meaning failure | recalibration | Missed weeks accumulated until the week itself became unsurvivable | Needs the break at 6 to have happened |
| 8 | None of the words are written by a person | curriculum, the generated surfaces | The one thing that makes the journey personal is the one thing the user cannot see | Needs the reader to have seen the surfaces first |
| 9 | What it took to make other people able to hold it | handoff, the team | A promise only one person can keep is not a product | Closing, not setup |

Rungs 0 and 1 spend nothing. That is deliberate. The piece opens with a person and a situation, not with
a framework.

## The visual that carries it

Not a sitemap at the top. **One diagram that gets built up across the piece.** The same figure returns at
rungs 2, 3, 5 and 6, each time with one more layer added, so the reader assembles the system by watching
it assemble rather than by memorising it.

- At rung 2 it is a line with five marks on it. Nothing else.
- At rung 3 the line gains week brackets.
- At rung 5 it gains two dates, one fixed and one that moves.
- At rung 6 a second timeline appears underneath it, the calendar, running at a different rate. **That is
  the conflict, drawn.** The reader sees the problem before the prose explains it.

**Rung 8 gets its own visual and it is not this diagram.** The generated content is shown, not described.
The closing moment typography system is the right artefact: seven treatments across three size bands,
built so a model's output of unknown length still lands. Showing the same slot rendering different
generated copy at different lengths demonstrates the constraint in a way no paragraph does. Motion is
worth considering here, though only if it is genuinely good. A weak animation costs more than a still
does.

Rung 8 is also split rather than saved whole for the end: a single sentence at rung 3 establishes that
the weekly content is written by a model, so the reader is not surprised later, and the full treatment
lands at 8 once they can appreciate what it constrained. This serves "MORE AI FOCUS" without stranding
it in the last quarter.

This is progressive disclosure applied to the case study itself, which is also the thing the product
does. It is craft evidence rather than decoration.

Everything else visual hangs off this: real screens appear only after the concept they demonstrate has
been paid for, so no screenshot is ever the first time the reader meets a term.

## What this replaces

The three rejected spines (the calendar problem, designing for a generator, the week that had to hold)
are not deleted. They become rungs 6, 8 and 4 respectively. Each was a real part of the study. None of
them was the study.

## The test

Before the piece ships, one pass reading it as someone who has never heard of Mondai, marking every
sentence where a term appears that has not been paid for. Any hit is a defect, not a style note.

---

## Visual constraint: stills first, motion later

Stated by Chadwick 2026-08-28. He will eventually have a lot of animated UI elements, and he has a
reference site whose loading and frame behaviour he wants to draw on. He will not have them at first,
because time is the binding constraint.

The consequence for planning, and it is not a small one:

**Every visual in CS2 must fully carry its rung as a still.** Motion is an upgrade applied later, never
a dependency. If a figure only makes its point once it animates, the figure is wrong and gets redrawn.

Practically:

- The build-up timeline diagram works as four separate stills. Later it can become one figure that
  gains its layers on scroll. Same asset, same point, better delivery.
- The rung 8 typography demonstration works as a set of rendered examples side by side. Later the slot
  can cycle through generated copy of different lengths. Same point either way.
- Nothing in the piece may say "watch what happens when" as its only way of making a point.

This also protects the deadline. The piece ships complete, then gets better, rather than shipping with
holes where the motion was going to go.

**Scope reminder, his words:** "this is not a task to build the layout... in fact I don't think we should
be utilizing that." Pass 4 produces prose plus placement of visual elements in the story. It does not
produce the built page.


---

## Foundation corrections from Chadwick, 2026-08-28

Recorded here because they existed only in conversation and would be lost on the next compaction.

**Target audience.** Generally younger, and entering tech for the first time. Not career changers as the
primary case. Project trajectory is likely to go B2B with universities first.

This kills the opening persona used in revisions 1 and 2, a mother with school age children and a part
time job. He was explicit that the *concept* was right and the instance was wrong: "that example should
have been a concept that translated to more than just one example." The replacement is a situation
rather than a person, so a student and a career changer both land inside it.

**No unsourced claims about hiring history.** He rejected "getting into tech used to have a shape,
school then an internship then a job" on the grounds that neither of us can verify it. Only the present
condition is assertable: there is no defined path.

**Do not nominate the user's central problem.** He rejected "so you guess at the order" because it puts
too much weight on order being the thing that hurts, which is an assumption we have not established.
Describe the environment, do not diagnose the person.

**CS1 owns the origin story.** The founder as mentor, and how he came to the product, belong to the
operations case study. CS2 does not repeat them. The Mondai overview page carries shared context.

**The mobile to web transition stays out of CS2.** Naming it creates an expectation of mobile screens
that this study will not show.

## Rejection history, so it is not repeated

He rejected three rounds of proposals before this structure landed. The pattern matters more than the
individual options.

1. **Round one and two, five options across two rounds,** all of them subjects: the calendar problem,
   designing for a generator, the week that had to hold, making it hold in someone else's head. He
   rejected all of them the same way: "these are like problems that are elements of the growth journey.
   they're not things that should define the study."

2. **The diagnosis, his:** "maybe you're conflating the opening line versus a spine." Correct. A single
   problem is the shape for a case study about a feature. CS2 is about a system, so the organising
   question is what order the reader learns things in.

3. **Round three, three narrative shapes** (decision log, level by level, six part). He declined to
   choose, because the shape question skipped the real one: "this type of case study in particular is so
   reliant on painting a picture of what the framework actually is."

**The standing rule this produces:** do not propose a subject for CS2. The subject is the Growth Journey
and always was. Propose structure, and only structure that serves comprehension.

The three rejected subjects are not deleted. They are rungs 6, 8 and 4 respectively.
