# Start of Week states

Why a Sunday moment exists at all, how five states were arrived at, and what was argued inside
each one.

Sources read in full: `2026-05-17 refining-product-onboarding-flow-and-design`, `2026-05-21
start-of-week-flow-design-with-capacity-and-rollover-handling`, `2026-05-23
deep-dive-into-week-flow-setup`, `2026-05-25 week-flow-setup-alternatives-and-edge-cases`,
`2026-05-31 designing-rollover-flow-instances`. Continues from `carry-over.md`.

---

## 1. The Sunday moment was killed, then given a different job

The 7 May carry-over argument ended with Sunday having nothing to do. If the week is always sized to
declared capacity, there is no ambush to cushion, and the conclusion at the time was that the moment
"probably becomes just ambient UI" [2026-05-07 framework-mapping #0021, assistant turn].

What brought it back was not rollover. It was pace display cadence.

Chadwick stated the rule as already true on 12 May, correcting the assistant mid-conversation:

> "just want to update your logic so you know this is not true. the pace only updates at the start of
> a new week. this allows us to have a moment to show them and nwo have them panic with every signle
> ti moves slightly up or down."
> Chadwick [2026-05-07 framework-mapping #0040, sent 2026-05-12]

Five days later he made that constraint into the moment's job:

> "i think the pace should only update during the sunday flows.. This is also when the user will be
> informed if they are falling behind (we have not yet designed this part)"
> Chadwick [2026-05-17 refining-product-onboarding-flow-and-design #0002]

**The dependency worth keeping.** Killing the decision modal removed Sunday's original job. Holding
pace still for six days created a new one, because a number that only moves once a week needs a place
to move. The states exist to fill a slot that a display decision opened.

The same session pulled onboarding into the moment. His own note on the flow diagram:

> "Alternatively the above could be solved by the Sunday flow. First time entering action hub is
> first Sunday flow."
> Chadwick, note on attached flow, quoted at [2026-05-17 #0001]

Which is where capacity declaration ended up, rather than as another onboarding step. That argument
belongs in the capacity file.

---

## 2. How five was arrived at

Not designed as a set. Assembled, then audited.

On 21 May he asked for three: clean, rollover, and a third he was not convinced by.

> "you also need to create a third variation for a user that had previous rollovers maybe? im not
> convinced we do need this but i wnt ur knowledge on this."
> Chadwick [2026-05-21 start-of-week-flow-design #0000]

Then he derived the third state himself, by walking a user through a specific week:

> "im trying to think like if a user on week 2 had 2 rollovers from the previous week, completed those
> + whatever 2 other action items were in this week BUT did not get ahaed they wouldnt have any
> rollover but they would still be behind... so maybe the actual instance we need here is a version
> that nudges them to utilize the get ahead flow to catch up?"
> Chadwick [2026-05-21 #0002]

That is Catching Up. The archive's trigger condition (clean close AND still behind AND positive
movement, `:130`) is this walkthrough written as a rule.

He also stopped the state from being defined too loosely, in the same breath:

> "is the one we have just in the case that they completed exactly all fo their action items? they're
> not really catching up then if they havent done any extra last week"
> Chadwick [2026-05-23 deep-dive-into-week-flow-setup #0004]

That objection is why the trigger requires positive movement rather than just a clean week. Without
it, Catching Up fires on a week where nothing was recovered.

Recalibration already existed and was already designed [2026-05-23 #0002]. Reset existed but he had
forgotten to name it:

> "i think this needs to be figured out in relation to reset mechanism as well that occurs right now i
> think after roughly 3 weeks since that is actually one fo the screens too i totally forgot to
> mention to u so put that down on ur list too."
> Chadwick [2026-05-23 #0004]

By 24 May the count is settled: "Ok then reset mechanism is all we have left of the 5 versions"
Chadwick [2026-05-23 #0054].

**He then tested whether five was too few, not too many.** This is the opposite of the instinct the
archive implies:

> "this actually makes me feel hesitant of you giving back the same 4 states... like i think we need
> variations of states? idk like for instance what if a user is ahead but has rollover do we need a
> state for that?"
> Chadwick [2026-05-21 #0002]

The resolution was a distinction between states and variants. States stayed at five, and the
situational nuance became copy and content variants inside them. When the variant count came back at
13 to 17 slots with three copy versions each, he pushed on feasibility rather than accepting it:

> "holy shit that is so many like....... im supposed to get them all done today.... will each version
> not be that much different design wise or something? cuz idk if this is going to work for mvp
> timeline now im nervous."
> Chadwick [2026-05-23 #0012]

And he pruned the list on inspection, rejecting variants that could not exist:

> "as im working through these a lot of these seem like bullshit honestly... 'Clean + ahead but
> slipping toward on-track' for instance this would not be a clean slate because if the user lost a
> day it means they have a rollover"
> Chadwick [2026-05-25 week-flow-setup-alternatives-and-edge-cases #0012]

---

## 3. Content before layout, stated as method

The clearest statement of how he works on a multi-state flow:

> "i want us to use a content first approach so like for instance give me each state, any nuanced
> specific versions of those states etc but for each outline what needs to be on that page what is
> most important etc. It's way easier to design if you know WHAT needs to go on each page first and at
> the ame time figure out hierarchy rather than just designing and throwing all the info at something
> and having to do a million extra iterations cuz u didnt figure this type of stuff out first"
> Chadwick [2026-05-23 #0006]

And a reason for enumerating every variant before designing any, which is operational rather than
aesthetic:

> "if i can break these numbres down to ok these are all the versions i need... itll let me lay out and
> strategize. for instance i may be passing on some of the additional copy work to someone else."
> Chadwick [2026-05-23 #0006]

He also asked for hierarchy to be argued rather than assumed, and pre-emptively blocked agreement:

> "it seems to me like we should be putting more of an emphasis in the hierarchy here on the
> target/pace or something. It doesn't feel like the hierarchy here as any specific logic in terms of
> what is being shown, what that means tot he user and why certain things are the right tings to
> emphasis at this moment."
> Chadwick [2026-05-21 #0019], prefaced with "I dont know if this si true so defeinitely dont agree to
> please me."

---

## 4. The Reset decision

The sharpest single decision in this topic, and the record contains the full argument.

The design had two CTAs: keep the current plan, or update it. Chadwick's instinct was to remove the
choice:

> "so the purpose here is a sentence that kind of really nudges the user to go with it since we know
> not doing so will make it really difficult to catch up depending on where the user is. I almost
> wonder if this si something we should do for the user and not even give them a choice.... honestly.
> Like 'here's what we did'"
> Chadwick [2026-05-23 #0070]

Claude argued to keep it, on the grounds that Reset is the only place the system shows humility.
Chadwick rejected the argument on quality, not on conclusion:

> "but is this really the moment to do that? are you even thinking? i feel like youre giving info with
> no backing like vibes."
> Chadwick [2026-05-23 #0074]

And then set the standard for how to settle it, while naming his own lean so it could be argued
against:

> "i need you to do some thorough research on the product, and this decision... i am leaning towards
> making it not a decision but need to make sure this is supported... dont just find things to support
> do some deep diving and make sure all info is relevant to what we are doing directly."
> Chadwick [2026-05-23 #0076]

The research came back supporting removal: default effect and status quo bias meaning "Keep current
plan" wins by inertia even when it is the worse option, Hick's Law at a low-motivation moment, and
habit recovery research on friction at re-entry [2026-05-23 #0077, #0079, assistant turns]. He closed
it:

> "here's the plan does not add a decision context.... i dont think a user needs to keep their original
> schedule its almost pointless honestly."
> Chadwick [2026-05-23 #0082]

**Worth noting for the case study:** he had the answer before the research and still demanded the
research, out loud, with the lean disclosed. That is the opposite of the pattern where evidence gets
recruited after the fact.

---

## 5. Copy register

Three constraints on voice, all his, all stated as corrections.

**Headline never carries the deficit.** He rejected proposed rollover headlines outright:

> "'Two things followed you here' as a headline is wild this is horrible ur gonna make the user feel
> lieke shit. also 'Two weeks behind now, Aisha' is equally as bad."
> Chadwick [2026-05-31 designing-rollover-flow-instances #0014]

The principle that got written down from this is in the archive at `:459`. The record has the
rejection that produced it.

**Coach, not parent.**

> "u ned to remember this is a coach not a parent wow"
> Chadwick [2026-05-31 #0020]

Plainer and more usable than guide-not-gatekeeper for copy decisions specifically, and it is his own
phrase rather than an adopted one.

**Clinical language fails even when accurate.** On a headline about sustaining three clean weeks:

> "what the hell does this even men"
> Chadwick [2026-05-21 #0025]

> "this language is just so bad and sounds so clinical i specifically gave u all those screenshots of
> the get ahead flow you see the language there this doesnt mimic that"
> Chadwick [2026-05-21 #0027]

Register was set by an existing built surface (Get Ahead), not by a written voice guide. He directed
the copy work by pointing at screens.

---

## 6. Negative movement, and a reversal in the record

On 24 May he raised whether to mirror the positive pace callout:

> "d you think a negative notice like -2 days more behind kind of thing is a baad idea? like the
> negative version of the +2 days ahead... the potential for making the user feel just like bad"
> Chadwick [2026-05-23 #0050]

The answer was to skip it, on an asymmetry argument: positive movement earns surfacing because gain
is invisible without help, negative movement is already visible through the rollover items and the
pace tile, and loss framing lands harder than equivalent gain framing [2026-05-23 #0051, assistant
turn]. He moved on without objecting.

**A week later the opposite shipped.** Both new rollover variants carry explicit negative movement
lines, "first slip this pathway" and "second week carrying", used as the main thing separating the two
screens [2026-05-31 #0001 and #0013, assistant turns]. Chadwick objected to other things in those
outputs and not to this.

The record does not contain a decision to reverse. It contains the reversal. The likely reason is that
once first-slip and second-carry needed to be told apart, the movement line was the only element that
could carry the difference. Flagged rather than asserted.

---

## 7. "Bundle" is a banned word

> "you keep using the word 'bundle' in multiple chats. its a term you made up its not something we are
> using in product so stop using it."
> Chadwick [2026-05-21 #0014]

Repeated twice more when it reappeared [2026-05-23 #0056, #0072]. It is an AI-invented term that
entered the vocabulary during the 7 May carry-over argument and was mistaken for product language.

**This matters beyond vocabulary.** It is a small worked example of the failure mode the whole
reasoning layer exists to catch: a term with no origin in the product becomes load bearing in the
documentation because nobody could see where it came from.

---

## 8. Corrections to the archive

**1. The archive uses the banned word, twice.**
`:104` "Dynamic weekly bundling" and `:136` "Re-bundles from today". Also `:561`. Chadwick banned
"bundle" on 2026-05-21 and enforced it twice more. Needs replacing with product language before the
archive is quoted anywhere user facing or in the case study.

**2. The Reset choice is not an open question.**
`:624` lists "Whether the Reset state should still offer a choice or auto-apply" as a directional
consideration, with the humility argument still live. The record settles it: Chadwick asked for
research specifically to test his lean, the research supported removing the choice, and he closed it
on 2026-05-23 [#0082]. The humility argument was made by Claude, rejected by Chadwick as unsupported,
and then argued against by the research he commissioned. It should move to the rejected list with its
reasoning.

**3. "Why five and not fewer" answers a question he did not ask.**
`:138` defends the number against collapsing. In the record he pushed the other way, asking whether
five was too few and whether states needed variants [2026-05-21 #0002]. The real answer is the
states-versus-variants distinction: five states, situational nuance handled as content variants inside
them. That is a more useful rule than the collapse defence, and it is missing.

**4. Pace movement as a universal element needs a caveat.**
`:142` states it as universal across all states. On 2026-05-24 the explicit recommendation was to
suppress negative movement on Rollover, and Chadwick did not push back. A week later it shipped on
both new rollover variants. Universal is where it landed. The asymmetry argument and the reversal are
missing, and the asymmetry argument is the better piece of thinking.

---

## 9. What the record does not hold

- No user testing on any of the five states.
- No resolution on the duplicate rollover headline. Chadwick defended it on 2026-05-23 [#0034]: "no
  it's not? It's telling the user why they're there? otherwise teh user wouldnt know why they're
  there? ... also desig wise it does WONDERS to have that second title there." It was dropped again on
  2026-05-31 [#0013, assistant turn] with a proposal to retrofit the original. Whether that retrofit
  happened is not in these sources.
- No confirmed threshold numbers. Recalibration at 3 weeks and Reset at 21+ days appear as
  directional throughout, with the definition of sustained underperformance owned by Lily and Michael
  and still undefined.
- Whether an undo was added to Reset alongside auto-apply. It was proposed [2026-05-23 #0079] and
  never resolved in these sources.
