# Carry-over

How unfinished work moves between weeks. Covers the rollover decision modal, flex points, and the
weekly assembly model that replaced both.

Note on vocabulary: the sources call this "dynamic bundling". Chadwick banned "bundle" as an
AI-invented term on 2026-05-21, so quotes keep it and this file's own prose does not.

Sources read in full: `2026-03-24 calendar-integration-flow`, `2026-05-06
simplifying-product-rollover-automation-and-user-clarity`, `2026-05-07
framework-mapping-and-mvp-rollover-solution`, `2026-05-07 ui-flow-solving-for-framework-mapping-mvp`.
Cross-checked against `2026-05-06 stress-and-serious-life-changes-needed`.

---

## 1. The state before the change

The original design made carry-over an explicit transaction on Sunday. A modal, a visible sum, and
two ways out.

The modal copy, verbatim from the design under discussion:

> IF YOU CARRY THESE TASKS FORWARD / Your pace date shifts from Sept 19 → Sept 21

Chadwick had already flagged the moment as uncomfortable while building it, not after:

> "so this is the first screen a user sees on a sunday of a new week if they did not complete tasks
> on time... it will be. weird decision making point"
> Chadwick [2026-03-24 calendar-integration-flow #0002]

Two structural facts from that session that matter later:

**Sunday, not Monday.** "this happens on sundas not mondays" Chadwick [#0098]. The week boundary was
already fixed before any of the rollover argument happened.

**Flex moved from item level to week level, by him, before it was killed.** The first version let the
user spend flex per task. He collapsed it:

> "not all action items are created equal right? so maybe this action is at the week level or
> something and we can create a general rule for now like if the user uses flex on two tasks it adds
> ______ time... so the action at this level would always be for all tasks for the week instead."
> Chadwick [2026-03-24 calendar-integration-flow #0084]

The direction of travel was already toward fewer decisions and a coarser unit. The kill in May
continued a move he had started in March.

**Flex expanded the timeline, it did not pull work forward.** "the date should always expand with
flex. flex is adding extra time to their overall timelien so they dont have to cram by pulling it
into the current week" Chadwick [#0066]. Worth keeping because the archive describes flex only as a
spendable currency, and this is the part that made it feel fair to him at the time.

---

## 2. What triggered the change

Michael, not Chadwick. This is the first line of the 6 May session:

> "I met with Michael yesterday and he likes everything but he wants to make the rollover aspect of
> the product more intuitive and automated. he is concerned about making the user do the math which i
> totally get im just worried about finding a more passive solution and sitll making it clear to the
> user how it works."
> Chadwick [2026-05-06 simplifying-product-rollover-automation-and-user-clarity #0000]

Michael's reference point was an existing surface in the product:

> "he compared this to the get ahead flow which is more simple and intuitive"
> Chadwick [#0000]

So the sibling relationship between Get Ahead and rollover, which the archive states as a
consistency heuristic, entered the argument as Michael's comparison rather than as a design
principle applied from the start.

---

## 3. What Chadwick conceded and what he defended

He conceded the load immediately and without spin:

> "i felt like i designed it in a pretty intuitive way but also understand where he is coming from.
> it is a lot for the user to digest"
> Chadwick [2026-05-06 #0000]

He did not concede the decision moment:

> "sure but that doesnt mean that having a decision moment isnt valid"
> Chadwick [2026-05-06 #0026]

That resistance held through the session. What he was protecting was not the modal, it was the
absence of an ambush. His argument for why silence alone is not enough:

> "if a user is used to seeing an average of 4 action items per week and sees 6 nd two labelede
> rollover and then just is expected to continue into their week tht creates a big problem"
> Chadwick [2026-05-06 #0028]

This is the load-bearing constraint of the whole mechanic. Removing the decision was safe only if
the week never got heavier. Nothing about the automation is safe without that.

He also protected the colour, on grounds of register rather than convention:

> "the magenta color is tied almost entirely right now to rollover including the tag color. it is not
> an alert color and i specifically chose is because it feels softer with the greena nd black of the
> interface"
> Chadwick [2026-05-06 #0038]

---

## 4. What actually dissolved the problem

Not the automation. The load model.

On 7 May he opened by asking for the framework to be mapped as a system and the tensions named, three
weeks before launch, with an explicit instruction against solutioning first:

> "Do not generate ideas before you have done the reading... The thing I need most is clear thinking,
> not more options."
> Chadwick [2026-05-07 framework-mapping-and-mvp-rollover-solution #0000]

The analysis returned a hard weekly cognitive load cap that rollover was violating. He corrected the
premise, twice.

First, that a cap treated as a maximum excludes half the user base:

> "You're looking at this cap as some max cap where anything over this would be impossible for the
> user to accomplish but this is a huge misnomer. It limits the user pool unecessarily. It can't be
> true that we aim to servce both busy people who have active liveses (hence calendar sync as a
> productivity tool) and people who are dedicating a full 40 hour weekly schedule to their work."
> Chadwick [2026-05-07 #0002]

And in the same turn he named the input that did not exist yet:

> "This may mean we need to add something to the calendar integration onboarding or just onboarding
> itself that asks the uer the maximum amount of hours they are able to dedicate to their growth
> journey per week? would this actually help solve a lot?"
> Chadwick [2026-05-07 #0002]

Second, and this is the one that unlocked it, he supplied a fact about the AI side that the analysis
had wrong:

> "The action items themselves are designated a cognitive load based on what the action is which helps
> determine things like estimated task length. So it's less about the week level view fo the action
> items and more about them at the indiviual level currently I believe. So I think from a design
> perspective we may actually have room here."
> Chadwick [2026-05-07 #0002]

Per-item load plus a declared weekly capacity means the week is assembled, not capped. Claude took
that and returned the model:

> "User says they can dedicate 10 hours per week. The AI bundles roughly 10 hours of items each week
> from the linear sequence. Two items roll over with 4 hours of unfinished work. The next week's
> bundle becomes 6 hours of new items plus 4 hours of rollover, totaling 10 hours... There's no need
> for flex points. There's no need for a decision moment about overload."
> Claude [2026-05-07 framework-mapping #0003, assistant turn]

Chadwick's response, which is where carry-over stops being a feature:

> "ohh this is a great point so we my not need rollover at all."
> Chadwick [2026-05-07 #0022]

The ambush problem from 6 May is solved structurally rather than by copy. The week is always the size
the user said they had, so there is nothing to warn them about.

**Order of events, since it matters for the case study:** Michael asked for less friction. Chadwick
resisted losing the decision moment and named the ambush risk. The ambush risk is what made silent
absorption unsafe. Chadwick then corrected the load model, and the corrected load model removed the
ambush risk, which removed his own objection. He did not give in. His objection got engineered out.

---

## 5. How flex points died

They were his invention and he was the first to hold them lightly:

> "remember the flex point system is in no way something we HAVE to have it was just a solution I came
> up with for the rollover action items."
> Chadwick [2026-05-07 #0002]

He rejected the proposal to keep them as a silent metered resource, hard:

> "this sounds like a huge issue. Limiting something that happens silently then all of a sudden the
> user runs out of something they never decided to use? What? Am I missing something?"
> Chadwick [2026-05-07 #0002]

That is a cleaner objection than anything in the archive: an invisible resource with a visible
failure state is worse than no resource at all.

He then named what flex was actually for, correcting a drift in the conversation:

> "Flex were really less about pace and more about how to handle action item rollover for me. It's
> that consistent build up I'm worried we are still failing to address... the mechanism's relation to
> pace is more of a way for the user to 'keep on target' without falling behind so it's more
> preventitive than reactice to a pace that has fallen behind."
> Chadwick [2026-05-07 #0004]

Once weekly assembly handled build-up preventively, flex had no job left. It was not overruled, it was made
redundant.

---

## 6. What he was still unresolved on

Two things the record shows open rather than settled.

**Whether an always-adjusting system can express falling behind at all.** He kept returning to it:

> "i keep getting confused though because to me this says the user cant actually get behind. you keep
> saying the user can fall behind but technically they cant if the system adjusts their target?"
> Chadwick [2026-05-07 #0006]

And the sharper version, where he is arguing against his own preferred outcome:

> "If the flex points just keep being automatic then the user doesnt fall behind? Is this a positive or
> a negative? Is it actually positive because when designing this as a guide product rather than a
> curriculim product the product is using negative reinforcement in terms of losing the positive pace
> or something? I can tell that's not quite right already"
> Chadwick [2026-05-07 #0022]

**Accumulation.** Sizing the week to capacity caps the week, it does not cap the backlog:

> "The only concern I have here is thise doesn't solve the problem of the accumulation of a lot of
> backed up action items so at some point if things get bad enough it feels like something still needs
> to happens still to help the user get back on track yeah?"
> Chadwick [2026-05-07 #0004]

This is the gap that Recalibration was later built to fill. The record shows the need identified here,
in his words, before the mechanic existed.

He also rejected the proposed label for carried items on sight: "'still working on this' isnt a great
label lol" Chadwick [2026-05-07 #0006].

---

## 7. A constraint on how he works, stated by him

Twice in this material he blocks post-hoc rationalisation of design history:

> "becareful not to 'rebuild with historical context' think bout how you would have approached it if
> you realized this info above from the get go"
> Chadwick [2026-03-24 calendar-integration-flow #0012]

Relevant to the case study directly. He asked for this specific thing not to be done, in March, about
his own work.

---

## 8. Corrections to the archive

**1. The archive gives the conclusion as the trigger.**
`PRODUCT_KNOWLEDGE_ARCHIVE.md:112` says the modal "was killed" because "a decision modal at the worst
possible moment... reads as the system charging admission to keep going." That reasoning is real and it
is the register argument the design landed on. It is not what started it. Michael asked for automation
on 5 May because users were doing math. Chadwick agreed the load was too high and disagreed that the
decision moment was invalid. The gatekeeper framing is the sense that got made of the change, not the
cause of it. Both belong in the record.

**2. "Guide not gatekeeper" is a phrase he adopted, but the argument is his.**
The paired phrase first appears in a Claude turn on 2026-05-06
[stress-and-serious-life-changes-needed #0003], and every human use in the corpus is Chadwick quoting it
back. The guide half and the argument it carries are his, and they predate the phrase. On 2026-04-30 he
rejected a lock-out empty state with "the product should feel like a guide and guide them to their next
steps not lock them out like that" [onboarding-career-flow #0002], and on 2026-05-07 he opened his own
framework brief with "Mondai is not a curriculum product. It is a guide" [framework-mapping #0000]. So:
his position, his application to real decisions, a phrase supplied later that made it repeatable.
Caveat: the corpus starts March 2026 and the product predates it, so the pairing may exist earlier
outside the export.

**3. Flex points were week level before they were killed.**
The archive describes them only as "3 per pathway, spendable currency shown at rollover with math
visible" (`:118`). Chadwick had already moved the decision from item level to week level on 2026-03-24
[#0084]. The archive's version is the earlier design, not the one that was killed.

**4. Get Ahead as rollover's sibling came from Michael.**
The archive states it as a consistency heuristic (`:146`, `:522`). The record has Michael introducing
the comparison [2026-05-06 #0000]. The heuristic is a correct description of the result, and the
result came from a stakeholder comparison.

**5. Declared capacity was proposed here, in this argument.**
The archive presents capacity as the single scheduling input as a settled premise (`:66`). It was
proposed on 2026-05-07 [#0002] as a way out of the cap problem, by Chadwick, in the same turn that
corrected the load model. Capacity exists because rollover needed a denominator.

---

## 9. What the record does not hold

- No user testing on either the modal or the silent version. Nothing in these four sessions.
- No record of Michael seeing or approving the weekly assembly model in these sessions. Approval is reported
  second hand two days later: "Okay Michael basically approved the redirection" Chadwick [2026-05-07
  ui-flow-solving-for-framework-mapping-mvp #0010].
- No decision on what defines sustained underperformance. Chadwick deferred it: "okay yes sure but we
  can focus on this after we get the design requirements nailed down" [same file #0014], and named
  Lily and Michael as the owners.
