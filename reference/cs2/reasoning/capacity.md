# Capacity

The single scheduling input. Where it is collected, where it can be changed, what bounds it has,
and how the Recalibration recommendation is derived.

Sources read in full: `2026-05-17 refining-product-onboarding-flow-and-design`, `2026-05-19
capacity-modification-placement-in-onboarding` (81 human turns, the largest single session in the
corpus on this topic), `2026-05-31 mvp-onboarding-flow-deep-dive`. Continues from `carry-over.md`,
where capacity was first proposed.

---

## 1. Where capacity is collected, and the decision he reversed

Capacity was proposed on 7 May as the way out of the weekly cap problem, and immediately created a
placement problem: onboarding was already long and he refused to keep adding steps.

> "I just dont want to keep adding STEPS. There are already so many... Giving this one small input
> it's own page in the onboarding flow seems completely unnecessary and frankly not creative."
> Chadwick [2026-05-07 ui-flow-solving-for-framework-mapping-mvp #0014]

**On 19 May he moved it out of onboarding entirely.** The proposal came with a direct challenge:

> "The user has zero lived experience. They don't know what an action item feels like, how long they
> take, what completion feels like. Asking them to set capacity at onboarding produces a guess. Asking
> them at First Sunday produces an informed answer... you keep designing the capacity onboarding step
> anyway, which tells me there's resistance somewhere. Worth asking yourself honestly: are you
> committed to capacity at onboarding because it's the right pedagogical moment, or because the
> architecture as currently planned requires it?"
> Claude [2026-05-19 capacity-modification-placement-in-onboarding #0049, assistant turn]

> "wait this cold actually be really smart. so then the pattern start with calendar integration, the
> user ends up at the action hub and are prompted to add their capacity. you may have figured out a
> whole bunch right here lol."
> Chadwick [2026-05-19 #0048]

**On 31 May he reversed it.**

> "i think youre confusing thing. theres no way all onboarding steps would be able to be done in the
> start of week flow. capacity being set there is kind of a crazy thing to want to do for onboarding
> flow...... its like one element of the rpoduct that is being focused on"
> Chadwick [2026-05-31 mvp-onboarding-flow-deep-dive #0010]

Final shape: capacity is an onboarding step, then the first-time start-of-week moment fires after it
and before the Action Hub. Confirmed by the CTA change: "ill change the button on cpacity from save
and start journey to just save and continue" Chadwick [2026-05-31 #0034].

**Why this matters for the case study.** The cold-start critique is correct and he never rebutted it.
He reversed on scope, not on the argument. The archive records the outcome ("declared at onboarding")
and none of this, so it reads as a first principle rather than a decision that was made, unmade and
remade inside three weeks.

---

## 2. The vocabulary correction that fixed the mental model

Mid-argument he corrected the naming, which is the sharpest single line in this material:

> "you keep saying first sunday but all it really is is a start of a week flow. so if the user starts
> on a wednesday that week's actions are just less. doesnt need to be overcomplicated."
> Chadwick [2026-05-19 #0050]

The assistant kept treating Sunday as a hard gate on the first run, and he shut it down:

> "no STOP. i have gone over this over and voer you are getting confused by semantics. stop using
> sunday flow. NO... youre basically proposing if the user starts any day other than a sunday they
> have to wait until the following sunday to start that makes ZERO sense in any reality."
> Chadwick [2026-05-19 #0068]

Also his: "lets change it and stop calling it sunday hehe" [2026-05-19 #0059]. The rename from Sunday
flow to Start of Week is his, and it exists because a name was producing a wrong mechanic.

---

## 3. Where capacity can be changed

He rejected the proposed answer on the grounds that it did not match how the product is used:

> "this home feels very odd to me quite honestly if you think about how it will be used... the user
> shouldnt have to go all the way to account to change this should it? is that odd or is it really the
> correct choice alone? it just feels weird to go from the sunday flow or growth journey to a random
> settings page"
> Chadwick [2026-05-19 #0002]

And he asked the underlying IA question directly, twice, rather than accepting a location:

> "Does it technically need a 'hierarchy position' or is it just accessible from plaes on mulitple
> pages?"
> Chadwick [2026-05-19 #0002]

> "you never answered me before when i was asking do all things like this need a 'functional home'? or
> do some exists in spaces between?"
> Chadwick [2026-05-19 #0008]

**The argument that decided it** is journey-level ownership, and it is his:

> "Yes, but 1 is modified by change to 2. So that tells me 2 is where it should live."
> Chadwick [2026-05-19 #0002], on capacity being both a weekly operational input and a journey-shaping
> one

Landing: the edit surface is reached from the Growth Journey Target tile via a small edit icon
[#0016], from the Start of Week moment, and from Settings as a real control rather than a link out.
Settings was forced by consistency, and he is the one who spotted the precedent:

> "here is the one problem with that. the setting for calendar integration is in settings. so i do
> think it does need a place within settings as well not a link out."
> Chadwick [2026-05-19 #0004]

Which surfaced a genuine product hole he then named precisely: Settings could disconnect a calendar
but not connect one, and "does the system have access to my calendar" and "am i using calendar
integrated mode" are two different functional layers that were being treated as one [#0008].

---

## 4. The one-week delay, and the escape valve

The delay was proposed as productive friction and he tested it against the failure case immediately:

> "what if the user accidentally sets the wrong amount of hours - then theyre locked in. What if for
> instance, the user realizes mid week they cant get it done - how much of an issue is this anxiety?
> is it a natural form of anxiety that is actually positive? its not our job to eliminate natural
> emotions in certain instances because they are actually ptoductive to the user in relation to the
> product."
> Chadwick [2026-05-19 #0004]

That is the sharpest framing of the anti-escape-hatch idea anywhere in the record, and it is more
honest than the archive's version because it does not assume friction is automatically good.

Resolution: default applies next week, with a deliberately quiet opt-in override.

> "Primary action: Save (16px, primary green) → applies next Sunday. Below: Apply this week instead
> (14px, muted) → only visible after change is made"
> Claude [2026-05-19 #0009, assistant turn], answered "this is smart. i like this." Chadwick [#0008]

He set the hierarchy treatment himself before seeing it: "i think probably like a link rathe than a
full button appearance may be best to minimize it's hierachial value" [#0006], with the constraint
that sits behind most of his copy decisions:

> "i want to be tactful about avoiding getting into a situation where the user doesnt understand the
> decisions but i also dont want us to have to overexplain everything and wear the user out."
> Chadwick [2026-05-19 #0006]

---

## 5. Bounds

> "id say probably 40 hours. aweek is max and 4 hours a week is minimum. A journey with one hour a
> week available just isnt realistic and discredits the importance of taking the journey seriously."
> Chadwick [2026-05-19 #0002]

The floor is a values decision, not a math one. It says the product would rather refuse a plan than
serve one that cannot work.

**A second, tighter bound applies inside Recalibration only.** He arrived at it by asking why the
opposite was allowed:

> "wait but what is your reasoning for even allowing above 10"
> Chadwick [2026-05-19 #0151]

> "i jsut dont understand why the user would ever on this screen set it above what they already cant
> meet. They can edit this from the journey page anyway... but still limit to one number below their
> current capacity for this flow."
> Chadwick [2026-05-19 #0155]

So the Recalibration moment can only lower capacity. Raising it is a Growth Journey action, available at
any time and effective the following week. That separation is the mechanic that stops Recalibration from
becoming a place to bargain, and it is not documented anywhere.

**Confirmed and sharpened by Chadwick, 2026-08-27:** there is no global cap. The constraint is scoped to
the Recalibration moment only, because the user is already behind at that point. Everywhere else the user
can raise capacity if their life actually changed. See `CHADWICK_ANSWERS_2026-08-27.md`.

---

## 6. Recalibration: the reframe

He rewrote the moment himself, overnight, and called his own previous framing wrong:

> "so as I sit with this I'm realizing something huge.. our framing is all wrong. What our approach
> should actually be: The product tells the user their average time spent on action items per week &
> how many action items they complete on avg per week... then It offers them a recommendation - les
> work for the user... So the user's 'average time spent on action items per week' metric is a direct
> indicator of what their capacity should be set at. That's how we get our recc and we show all this
> to the user."
> Chadwick [2026-05-19 #0090]

Recalibration stopped being an ask and became a read-back with a recommendation attached. The number
is derived from the user's own behaviour, which is what makes it feel like observation rather than
judgement, and it is also the closest the product gets to observed capacity without paying the
cold-start cost that declared capacity exists to avoid.

He named the hard part in the same message: "the most difficult part of this I think is figuring out
how to allow the user to edit that suggestion and how that updates things - since then it wouldnt be
a suggestion anymore."

**Declining is not equal weight.** He was explicit:

> "my only thought is what happens if a user cancels? there needs to be some kind of message that lets
> the user know how bad of a decision this is lol."
> Chadwick [2026-05-19 #0122]

> "i think you are totally wrong and didnt do the digging in you need to here........ we definitely
> need to make sure the user understands this is not recommended right? dont just agree but i honestly
> dont feel like u dug deep enough here"
> Chadwick [2026-05-19 #0124]

Landing: a confirmation over a dark overlay, orange "CONFIRM" eyebrow, the structural consequence
named plainly, and the line that does the emotional work, "We'll check in again next week"
[2026-05-19 #0127, #0131, assistant turns]. The re-prompt cadence is his: "I think A but I think its
going to prompt them again next week? thoughts? i dont think it should wait another three weeks"
[#0130].

Escalation on repeated declines was proposed and rejected for MVP, on the grounds that the changing
diagnostic numbers escalate on their own [#0131].

---

## 7. Live preview versus commit, and an audit of the research

The onboarding capacity screen updates six dates: journey target plus five pathway targets. The
question was whether they update per keystroke.

His instinct was against live, and he refused to let it be settled by the research as first cited:

> "I don't think you're thinking about this hard enough. There are clearly also issues with the
> immediate feedback too. What does the research actually mean in this context? Would the research
> results also apply if there was a slightly delay before the numbers shifted so it isn't so
> immediate? Does this not work if a button is required for everything to update? ... Don't just
> respond to please or displease."
> Chadwick [2026-05-17 refining-product-onboarding-flow-and-design #0022]

The research defence collapsed under that question. The concessions, verbatim:

> "The Frontiers multimedia learning study (Wang et al., 2022) compared immediate vs delayed feedback
> for correctness on learning task questions... It's not analogous to a number input where the user
> isn't being graded... The Doherty Threshold (400ms response time) was also sloppy of me... The NNG
> simultaneous-animations finding was actually the one piece I cited that genuinely supports your
> concern, and I tried to neutralize it with Common Fate gestalt."
> Claude [2026-05-17 #0025, assistant turn]

**And the reason that actually decided it was found in the product, not the literature:**

> "Mondai's whole product rhythm is commit-then-reveal-on-Sunday... Live-updating the onboarding screen
> actually breaks that pattern. The screen would be teaching the user a faster feedback loop than the
> product itself delivers."
> Claude [2026-05-17 #0025, assistant turn]

It was then settled by building all three modes (live, 600ms debounce, commit) behind a toggle in one
prototype so he could feel them rather than argue [#0025]. Commit won.

**This is the strongest AI-use beat in the corpus so far.** He did not accept a cited source as
settling anything. He asked what the study actually measured, the citation did not survive contact,
and the real reason turned out to be internal consistency with the product's own rhythm. The
literature was doing decoration until he pushed.

---

## 8. Two layers: moment and interaction

The framing that resolved a week of stuck onboarding design:

> "The mistake I'd guard against is treating 'moment' and 'interaction' as the same thing... Layer 1:
> The framing... Layer 2: The interaction itself. This should be standard, fast, clear, and
> learnable... Most overdesigned onboarding steps fail because they let Layer 2 absorb the expressive
> energy that should have lived in Layer 1."
> Claude [2026-05-19 #0035, assistant turn]

Chadwick's context for why it landed, and this is the useful half:

> "i was only putting these together because the ai in the chat did. I was trying to explain that the
> ai's outputs no matter how much I tried to change it kept trying to make the input in itself
> something special."
> Chadwick [2026-05-19 #0036]

So the two-layer split was articulated to diagnose a failure he was already fighting in another
session. This is very likely the origin of the Two-Layer Principle in
`reference/CREATIVE_PROTOCOL.md`, though the protocol generalises it to structural skeleton versus
expressive surface. Provenance stated as likely, not confirmed.

---

## 9. How he corrected the tool

Two turns worth keeping for the AI thread, because they are diagnosis rather than complaint.

> "You keep getting stuck in your ideas of what you think fits my design system which is great but you
> pushed too hard into it... I feel like you're conflating things like layout with branding/the design
> system too much... Youre stuck to certain patterns you have summized and or created that are holding
> you back."
> Chadwick [2026-05-19 #0096]

The fix he prescribed was to drop fidelity: mid-fi wireframes, neutral colours, real type hierarchy
and spacing only [#0098]. Result:

> "wait this is WAYWAYWAY better output id honestly prefer u write this into ur memory or something
> ebcause we just fixed a serious issue in your outputs... layout is the biggest challenge. you killed
> it."
> Chadwick [2026-05-19 #0100]

He also repeatedly redirected the tool away from design and toward research:

> "ur main purpose is research and helping come up with solutions... youre not doing hte real work you
> need to be doing here stop thinking about design. design is secondary to ux."
> Chadwick [2026-05-31 #0010]

And named the pattern he was guarding against by name:

> "i literally just said that so u dont fall into the default ai pleasing before truth algorithm"
> Chadwick [2026-05-31 #0030]

---

## 10. Corrections to the archive

**1. "Accept and Keep are equal-weight options" is wrong.**
`:134`. The record has him insisting the decline path carry a warning, then a confirmation over a dark
overlay with an orange CONFIRM eyebrow and the consequence named [2026-05-19 #0122, #0124, #0127].
Keep is deliberately heavier than Accept.

**2. The Recalibration re-prompt cadence is missing.**
After a decline the recommendation re-fires the next week, not after another three weeks [#0130].
Escalation on repeat declines was considered and rejected. Neither is documented.

**3. Capacity bounds are missing entirely.**
4 hours minimum, 40 maximum, with his reason for the floor [#0002]. And inside Recalibration only,
the new capacity is capped at one below current, so that flow can lower capacity but never raise it
[#0155]. That second rule is load bearing and appears nowhere.

**4. The Recalibration recommendation's derivation is missing.**
`:134` says it "presents a system suggestion to right-size the plan" without saying the suggestion is
the user's own observed weekly average hours, shown back to them alongside average items completed
[#0090]. That derivation is the whole reason the moment works.

**5. "Live updates were tested and rejected" overstates it, and gives the weaker reason.**
`:74`. No user testing exists. Three interaction modes were built behind a toggle in one prototype and
Chadwick chose from feel [2026-05-17 #0025]. The phrase "slot machine" appears nowhere in the corpus.
The deciding reason in the record is that live updating teaches a faster feedback loop than the
product actually delivers, which is a better argument and is missing.

**6. Capacity at onboarding reads as a premise and was a reversal.**
`:66`. Moved to the first Start of Week moment on 2026-05-19 [#0048], moved back on 2026-05-31
[#0010]. The cold-start critique that prompted the move was never answered.

**7. "Sunday flow" is his rejected term.**
He renamed it Start of Week on 2026-05-19 [#0059, #0068] because the old name kept producing the wrong
mechanic on first run. The archive still uses "Sunday flow" at `:324`.

---

## 11. What the record does not hold

- No user testing on the capacity input, the onboarding step, or Recalibration.
- No resolution on how the user edits the Recalibration recommendation without it ceasing to be a
  recommendation. He named this as the hardest part [#0090] and the sources do not close it.
- No confirmed answer on whether Settings gained a way to connect a calendar, only the finding that it
  could disconnect but not connect [#0008].
- Whether the Recalibration lower-only cap was implemented, or only decided in conversation.
