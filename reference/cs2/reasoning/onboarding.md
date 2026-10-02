# Onboarding and career selection

One constraint governs this entire topic: the flow was already too long before any of these decisions
were made. Everything here is a fight against adding a step.

Sources read in full: `2026-04-30 onboarding-career-flow` (runs through 12 May), `2026-05-07
ui-flow-solving-for-framework-mapping-mvp`, `2026-05-17 refining-product-onboarding-flow-and-design`,
`2026-05-19 capacity-modification-placement-in-onboarding`, `2026-05-31 mvp-onboarding-flow-deep-dive`.

---

## 1. The constraint, stated repeatedly

> "I just dont want to keep adding STEPS. There are already so many. The onboarding quiz is already so
> damn long. There is additional onboarding layers for those who havent chose a career yet, there is
> additional onboarding i am adding for growth journey tooltips and action hub tooltips this is just
> pushing it overboard."
> Chadwick [2026-05-07 ui-flow-solving-for-framework-mapping-mvp #0014]

> "well yeah I agree but the laziest onboarding solution ever is adding more and more and more to the
> flow."
> Chadwick [2026-05-07 #0014]

That second line is the design principle of this whole area. Every teaching need in the product arrives
as a request for a step, and the step is always the lazy answer.

---

## 2. The idea that resolved it

His, mid-thought, in a message he had been holding for hours:

> "How weird would it be to use the action hub as an actual tutorial that shows them how to work through
> it like maybe 3 or so tutorial driven action items before the journey starts"
> Chadwick [2026-05-07 ui-flow-solving-for-framework-mapping-mvp #0018]

This solves two problems at once, which is why it stuck. Teaching stops being a step and becomes product
use. And it produces the lived experience that declared capacity is otherwise guessing without:

> "Three tutorial action items inside the actual Action Hub does something the First Sunday flow alone
> can't: it gives Aisha lived experience of the product before you ask her to commit to capacity. She's
> actually done action items by the time the capacity question comes up, so it becomes 'given what that
> felt like, how many of these can you do per week' rather than the abstract 'how many hours do you want
> to commit.'"
> Claude [2026-05-07 #0019, assistant turn]

The general form of the move, which recurs: teaching that has to happen inside the product is cheaper
than teaching that happens before it. On 17 May this became the whole model. Tooltips fire on first
interaction, tutorial action items carry the mechanics, and the first Start of Week carries the
framework. No separate teaching layer.

> "The tooltips you drew on Growth Journey Overview and Action Hub Overview don't exist as a separate
> teaching layer. The teaching is built into the tutorial action items and the First Sunday flow itself."
> Claude [2026-05-17 refining-product-onboarding-flow-and-design #0001, assistant turn], describing the
> model they had landed on

---

## 3. The empty state, and two rejections

The problem: a user finishes the quiz, does not pick a career, and lands in a product with no Action Hub
to show them.

**Rejected: pretending the product is not built yet.**

> "approach 1 feels dishonest. it feels like that part of the product doesnt exist. so it woudl have to be
> very clear what the uer has to do next and i dont think 'being built' language here makes sense."
> Chadwick [2026-04-30 onboarding-career-flow #0006]

**Rejected: locking the user out.**

> "the product should feel like a guide and guide them to their next steps not lock them out like that."
> Chadwick [2026-04-30 #0002]

Note the date. This is a week before "gatekeeper" appears anywhere in the corpus, and the argument is
already fully formed and applied to a real decision. See the correction in
`start-of-week-states.md`, section 8, which this refines.

**Also rejected: a stepper**, on system-consistency grounds rather than aesthetic ones: "i wouldnt want
to go in a 'stepper' progress bar direction as that is used other places for other things that dont
match with this" [#0006]. A component already meant something else, so it could not mean this.

**Landed on** a persistent step indicator that names the path without blocking it, with the steps
viewable rather than all displayed. His framing: "could it just br some kind of card that says like 'step
1 out of 2' on the top or something with a way for the user to see the steps by clciking a next arrow"
[#0008].

---

## 4. Taking the nav question to Michael

The clearest single example in the corpus of him working a dependency he did not own.

> "does the user even really need to do anything outside of the career page? should the nav even be there
> yet if the user hasnt selected a career? i know my CEO would say yes, but I have never been given a why.
> so if my assumption is correct and this is the actual best choice then I need to pass something on to
> him to defend the reasoning."
> Chadwick [2026-04-30 #0008]

He then made the case by enumerating what the sidebar actually buys the user at that moment, and found it
was almost nothing:

> "being able to acess account settings isnt a good reason. the only other accessible nav item at this
> point would be resources and potentially events. i know my ceo wants to use events as a marketing tactic
> too for Rita events so idk if that comes into play but to me its such a limited reason because i just
> dont see the user going to view the events that way very purposely without being invested enough to have
> made a career decision. it also complicates things more because then i need to get rid of certain
> filtering options on the resources page."
> Chadwick [2026-04-30 #0010]

Two moves worth noticing. He engaged with the CEO's likely reason (events as marketing) rather than
arguing past it. And he priced the decision: keeping the nav means stripping filters off the Resources
page, which is a cost the nav decision was not being charged for.

**And he specified how to present it**, which is a communication decision as much as a design one:

> "We can present the idea we are discussing now, along with the other alternatives we explored (very
> minimally) with a reason why those options dont work. this allows him to see the full thought process of
> the decision... i also wanted to present two options so i dont want the recommendation to feel like a
> decision has been made but more of a suggestion based on evidence."
> Chadwick [2026-04-30 #0010, #0012]

Show the process, offer real alternatives, do not present a conclusion as a fait accompli. He also named
the audience constraint plainly: "my ceo gets confused easy so it needs to be CLEAR what we are looking at
here" [#0032], which is why he insisted the slides use actual screenshots of the real designs rather than
approximations.

---

## 5. Entry points nobody had accounted for

Late in the thread he found a whole population the empty states did not cover:

> "You are only showing examples of people who have already started the quiz or seomthing but anyone who
> enters and registers through the event flow will not have taken the quiz at all."
> Chadwick [2026-04-30 #0086]

So the home page needs at least three versions: no career chosen, quiz not taken, and quiz partially
taken. He designed the third pre-emptively against a decision that had not been made:

> "i think the percentage of quiz done is good to design now too just in case Michael decides that we need
> to let the user exit the onboarding quiz."
> Chadwick [2026-04-30 #0080]

And he set the hierarchy per version by what that user needs next: events lead for the never-quizzed user,
career selection leads for the quizzed-but-undecided one [#0080].

---

## 6. Corrections to the archive

**1. Tutorial action items are missing.**
They are Chadwick's idea [2026-05-07 #0018], they are the mechanism that makes declared capacity an
informed answer rather than a guess, and they carry the product's teaching. The archive's onboarding
section does not have them.

**2. The just-in-time teaching model is not stated.**
Teaching lives inside the product (tooltips on first interaction, tutorial items, first Start of Week)
rather than in front of it. That is the rule that generated several documented decisions and it is not
written down as a rule.

**3. "Selection is followed by the home page, not by setup" has no source.**
`:332`. The routing is stated as fact on 2026-05-31 [#0000]. The reasoning attached to it in the archive
("deliberate spacing, not a routing accident... Home gives them somewhere to stop") appears nowhere in the
corpus. Plausible, unsourced.

**4. The empty state work is missing entirely.**
Three home page versions by entry point, the rejection of "coming soon" language as dishonest, the
rejection of lock-out, the stepper rejected on component-meaning grounds. None of it is in the archive,
and the entry-point problem is a real product finding.

**5. The nav-before-career-selection question is not recorded as open or closed.**
Chadwick built an argument to change it and the record contains no answer from Michael.

---

## 7. What the record does not hold

- Michael's answer on the sidebar, or whether the presentation was ever given.
- Whether tutorial action items shipped at MVP. They are proposed and adopted in conversation and the
  sources do not confirm they were built.
- No user testing on any onboarding surface.
- The final count of onboarding steps. It changed at least three times across these sources.
