# Throughlines

Patterns that appear across more than one topic file. Observations, not a case study structure.
Written after the nine topic files, deliberately before any decision about how the case study is
organised, so the spine gets built from this rather than this getting shaped to fit a spine.

Nine topic files, 43 corrections to `reference/PRODUCT_KNOWLEDGE_ARCHIVE.md`.

---

## 1. The decisions cluster around one week in May

Almost every load-bearing mechanic was settled between 6 and 24 May 2026, three weeks before launch.
Michael's rollover feedback on 5 May starts it. By 24 May the five states are designed, capacity is the
single input, flex points are gone, and the Start of Week flow has been named and specced.

The exceptions are informative. The AI surfaces were settled in March. The pathway sequence and Focus
Areas were never settled in this record at all, because they came from elsewhere.

So the product has three strata: inherited (pathways, focus areas, the curriculum's linearity), early
and researched (the AI surfaces), and late and compressed (everything about time). The case study is
about the third, and the third is the only one where the reasoning is his.

---

## 2. Every mechanic traces back to one number

Capacity was proposed on 7 May as a way out of the weekly cap problem. By the end of the month it is
the input for Target, Pace, weekly sizing, Rollover absorption, Recalibration triggers and Reset
behaviour, and it is the thing the first Start of Week moment exists to teach.

The dependency chain that produced it is visible in the record and is not obvious:

1. Michael asks for rollover to stop making users do math.
2. Chadwick names the real risk: silence is unsafe if the week can get heavier.
3. He corrects the load model, cognitive load is per item, not per week.
4. Per-item load plus a declared weekly number means the week is assembled, not capped, so it never gets
   heavier, so silence is safe.
5. Capacity now needs collecting, which fights the onboarding length constraint.
6. Tutorial action items resolve that by making the question informed rather than abstract.
7. Killing the modal leaves Sunday with no job.
8. Holding pace still for six days gives it a new one.
9. A moment that fires weekly needs states, and the states need a rename because "Sunday flow" produced
   a wrong first-run mechanic.

Nine steps, one thread, four separate topic files. This is the strongest available evidence for the
claim about seeing the whole system, because no single conversation contains it.

---

## 3. He priced decisions other people were treating as free

Recurring and distinctive. He does not argue about whether something is good, he works out what it
costs elsewhere.

- Keeping the sidebar before career selection means stripping filters off the Resources page.
- Two case conventions is maintainable until an in-product marketing surface appears, then the seam
  shows.
- Adding capacity to Settings forces the question of why Settings can disconnect a calendar but not
  connect one.
- Colour-coding Focus Areas is impossible because the set is unbounded.
- Separating the current week on the Pathway page would clarify it and would turn an orientation surface
  into a work surface.
- A minimum schedule window is required because open blocks are the window minus existing events.

In several of these the cost lands on a surface someone else owns, or on a decision already made.

---

## 4. He audits research, repeatedly, in ways that cost him

Four documented instances, across March, May and again in May.

- **AI surfaces, March.** Source weighting audit, which produced the honest-gap finding. Caught the
  research being reframed as a competitive analysis without being told. Caught it reasoning backwards
  from the existing design.
- **Capacity screen, May.** Asked what a cited study actually measured. The Frontiers study turned out to
  be about graded learning tasks, the Doherty Threshold was about latency not update frequency, and the
  finding that supported his own instinct had been argued away with a gestalt principle that did not
  apply.
- **Sentence case, May.** Set the objective against himself, pruned two irrelevant sources both of which
  supported his side, named his own disciplinary bias toward empirical research and corrected for it, and
  identified his strongest motivation (not redoing every design) as unusable.
- **Reset choice, May.** Had the answer, disclosed the lean out loud, demanded the research anyway.

This is the AI thread, and it is not the one usually told. The claim is not that AI made him faster. It
is that AI produced plausible research fast enough that auditing became the actual work, and he built a
practice for it: name the objective against yourself, check what the study measured, remove what does not
apply, watch for the research shaping itself around where you already are.

His stated method, from the calendar thread, in his order: evidence, comparable products, the person,
how comparable products handled the UI, then the UI. Interface last, as an output.

---

## 5. The record and the archive disagree about who decided things

43 corrections, and they fall into four kinds.

**Reasoning with no source (7).** The pathway sequence argument. The Focus Areas navigability argument.
The Precious app reference. Home-after-career-selection as deliberate spacing. The "slot machine" framing.
All plausible, all with no author in 154 conversations. This is the highest-risk category for an interview,
because they read as his and he may not be able to defend where they came from.

**Conclusions presented as origins (4).** The gatekeeper reading of the rollover modal is what he made of
Michael's push, not what caused it. Get Ahead as rollover's sibling was Michael's comparison. The archive
consistently records the settled reason and drops the trigger.

**Decisions recorded as open, or open recorded as settled (3).** Reset's choice was closed by research he
commissioned. Recalibration's Accept and Keep are not equal weight. Contextual AI at MVP is contradicted.

**Missing entirely (rest).** Capacity bounds. The Recalibration lower-only cap. Where the Recalibration
number comes from. Tutorial action items. Just-in-time teaching. Sentence case. The two-clock problem.
Schedules as assistance. Visibility versus actionability. The estimated-time hole.

The pattern is consistent: the archive is excellent at rules and lossy about arguments, triggers and
people. Which is what he said at the start, and is worse than he thought, because in several places the
distillation invented a reason rather than dropping one.

---

## 6. The organisational picture

Assembled from turns across four files, never stated in one place.

Unpaid, part-time, five people at the decision-making level. He is the design lead and cannot see what
the AI lead is building. Michael is the CEO, reads the designs closely, and reopens things. Lily owns AI,
Allie strategy and research, Kim design, Swyam development. Kristin owns brand.

His pattern with people who outrank him is consistent and worth naming: build the argument, present the
alternatives honestly including the one he did not pick, and never present a conclusion as already made.
Used on Michael for the sidebar, on Kristin for sentence case, on leadership for the framework
presentation. He also says plainly when he does not have a reason from someone: "i know my CEO would say
yes, but I have never been given a why."

He kept moving without answers. The three questions to the AI lead never got a recorded reply and he
designed against the assumption anyway.

---

## 7. Restraint about what the system can know

Appears in three unrelated places, which makes it a real principle rather than a local decision.

- "Active" over "In Progress", because the system knows an item is available, not that anyone is working
  on it.
- A passed calendar slot does not infer completion, because the system cannot observe it. "the system
  isnt a living being."
- Declared capacity over observed, partly because observation has a cold start, and Recalibration is the
  moment observation finally earns its place, shown back as the user's own average.

The product consistently refuses to claim knowledge it does not have. That is unusual and it is a design
position, not a technical limitation.

---

## 8. Things he was wrong about, or changed

Worth more than the smooth decisions and easy to lose.

- Capacity moved out of onboarding on 19 May, moved back on 31 May. The cold-start critique that prompted
  the move was never answered.
- Flex points were his invention. He killed them and he is the one who first said they were not required.
- He accepted "no constraint" on the schedule window and reversed himself one message later.
- He hated sentence case before he argued for it.
- The negative pace movement line was recommended out on 24 May and shipped on 31 May with no recorded
  decision to reverse.
- "Bundle" entered the vocabulary from the tool during the May argument, was mistaken for product
  language, and had to be banned three times. It is still in the archive.

---

## 9. What no topic file has

**No user testing anywhere.** Nine topics, zero. He was explicit about why: "There is no time for us to
test right now." Every decision in this record is argued from research, comparable products, product
logic and stakeholder review.

**No personas in use.** Aisha appears constantly as a shared referent and no persona document is produced
or cited in the corpus. `CS2_GAPS.md` item 3 stands, and the honest answer looks like "discussed, never
made."

**No answers from the AI side.** Three questions in March, no recorded reply, and the AI lead's work is
invisible throughout.

**Almost nothing before March 2026.** The pathways, Focus Areas, the palette, the type choices and the
brutalist direction all arrive as given.
