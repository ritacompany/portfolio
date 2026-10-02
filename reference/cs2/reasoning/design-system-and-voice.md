# Design system and voice

Not the values. Those live in Figma and this file does not transcribe them. This is the reasoning
behind the system's rules, and the rules Chadwick used to correct AI output.

Sources read in full: `2026-05-15 sentence-case-vs-title-case-research-backed-design-analysis`. Rules
drawn across `2026-05-19 capacity-modification-placement-in-onboarding`, `2026-05-13
designing-content-blocks-for-action-item-pages`, `2026-05-31 mvp-onboarding-flow-deep-dive`,
`2026-04-22 progress-bar-design-for-linear-focus-areas`, `2026-05-30
calendar-integration-toggle-placement-solution`.

Out of scope here: the brochure site, which is a separate system with its own file, and where he
explicitly banned product references. "stop using the rita procduct system like all the labels and
stuff. you shouldnt be referencing product design at all" [2026-05-26
glitch-treatment-and-layout-rhythm-exploration #0008].

---

## 1. Sentence case: the most rigorously argued decision in the corpus

The setup, which is the interesting part:

> "So a long time ago one of my designers suggested strongly that we use sentence case as it's more modern
> and what a younger gen z generation prefers. I remember initially kind of HATING the idea but then as I
> read more and more I realized she was right. I was talking to the branding lead Kristin yesterday and
> talked to her about this to make sure we are consistent and she is definitely not into the idea which I
> understand because I was there before too."
> Chadwick [2026-05-15 sentence-case #0000]

He had already changed his mind once, in the direction he was now defending, against a stakeholder who
held his own former position. That is the worst possible setup for honest research, and he named it and
set the objective against himself:

> "I am not looking for research to support my current view... Your objsctive here is not your default
> objective of 'satisfying the user'. I don't care what the outcome is only that it is accurate. In order
> for me to ensure this information makes sense I need you to include direct linked sources for every
> insight or claim you make."
> Chadwick [2026-05-15 #0000]

**Then he pruned the evidence twice, both times against his own side.**

> "The Gen Z trend documented in journalism and linguistics is all-lowercase, not sentence case... This has
> nothing to do with what we are talking about. This is about conversational text... I want you to remove
> any research or insights that is grounded in stuff like this that is not relevant to the case at hand"
> Chadwick [2026-05-15 #0002]

> "just noting the dyslexia association research is also not relevant here is it? i expeted you to remove
> anything you deemed irrelevent?"
> Chadwick [2026-05-15 #0004]

**And he named his own disciplinary bias and corrected for it:**

> "maybe stop focusing so much on empirical research. i tend to lean towards that because my psychology
> background but often in ux and product thts not the kind of stuff we rely on beacuse its such a young
> field."
> Chadwick [2026-05-15 #0004]

**He also identified his strongest motivation and ruled it out as an argument:**

> "if we decide on not going with sentence case it means i have to redo ALL the designs so honestly that is
> a strong argument for sentence case currently for me but I know the brand leader will not be satisfied
> with that reasoning lol."
> Chadwick [2026-05-15 #0002]

**What survived** was register-matching: title case carries an institutional voice, sentence case carries
a conversational one, and Mondai's positioning is a guide rather than an institution. The mechanism is not
generational; younger users are just quicker to register the difference [2026-05-15 #0005, assistant turn].
His read:

> "if u think about who mondai is, it is very clear to me that it is the type of product that should
> utilize sentence case."
> Chadwick [2026-05-15 #0006]

**The marketing versus product split** is where he found the real cost, and it is a systems observation
rather than a typographic one:

> "sometimes there is marketing/ui cross over likeusing a banner for instance in product that connects to
> something marketing wise. The branding should feel consistent so it would be weird if the banner was just
> different than everything else and it would feel disconnected."
> Chadwick [2026-05-15 #0006]

Two case conventions is a maintainable position until a marketing surface appears inside the product, at
which point the seam is visible to the user.

**How he handled the stakeholder:** not a case for his position.

> "i want to present this whole marketing vs product aspect... mention that its ok and the companies that do
> it but that it is harder to maintain and the crossover issues within product etc. i want her to know the
> negatives and positives of each"
> Chadwick [2026-05-15 #0008]

The same move as the nav argument for Michael. Present the full picture including the option he did not
pick, so the recommendation reads as evidence rather than as a decision already taken. He rejected the
first document for failing exactly this: "This is nothing like we discussed. It's literally a document
arguing FOR something???!" [#0016].

---

## 2. Colour carries meaning, and the meanings were argued

**Magenta is not an alert.**

> "the magenta color is tied almost entirely right now to rollover including the tag color. it is not an
> alert color and i specifically chose is because it feels softer with the greena nd black of the interface"
> Chadwick [2026-05-06 simplifying-product-rollover-automation #0038]

The archive records the rule ("magenta, not orange, since rollover is not an error"). The reason is
softness against the interface's existing green and black, chosen deliberately so that carrying work
forward does not read as a warning.

**Orange is the warning colour**, used once, on the Recalibration decline confirmation
[2026-05-19 #0126].

**The Destructive variant was created rather than borrowed.** He liked a red button in a mock, had no such
colour in the system, and asked the naming question rather than the colour question: what should it be
called "in that like same category of variants" [2026-05-31, within 05-30 file, #0064]. Named by role,
peer to Primary and Secondary, added because one destructive action needed it.

**Colour is refused where the set is unbounded.** On colour-coding Focus Areas:

> "i just told you it could be an unlimited number so why would we start using color sorting logic here"
> Chadwick [2026-04-22 progress-bar-design-for-linear-focus-areas #0010]

---

## 3. The mono and Heebo split

Two type registers doing different jobs. IBM Plex Mono all-caps for system language and metrics, Heebo
for everything the product says in its own voice.

He corrected the tool when it treated the split as absolute:

> "no sweetie thats the mono label style. we have a heebo label style too its just use more for supporting
> text or information below a section rather than a header label ro sub header label typically."
> Chadwick [2026-05-19 capacity-modification-placement-in-onboarding #0008]

So it is not mono-for-labels. It is mono for system speech, Heebo for supporting text, decided by what is
speaking rather than by the element's position. The proposal he was rejecting had been to use the mono
label style on an interactive link, on the grounds that all-caps mono reads as informational rather than
actionable, which he did not dispute.

---

## 4. His rules for AI output

Gathered across topics, because they never appear in one place and they are the operating manual for the
whole working method.

**Fidelity is a tool, not a target.** The single most effective correction in the corpus:

> "You keep getting stuck in your ideas of what you think fits my design system which is great but you
> pushed too hard into it... I feel like you're conflating things like layout with branding/the design
> system too much... honestly id rather it be more of a lower fidelity wireframe. Focusing on organization,
> layout and meeting the user's needs as effectively as possible."
> Chadwick [2026-05-19 #0096]

Result, one output later: "wait this is WAYWAYWAY better output... layout is the biggest challenge. you
killed it" [#0100]. Dropping fidelity freed the layout thinking that fidelity was absorbing. This is the
Two-Layer Principle applied to the tool rather than to the interface.

**Consistency is not sameness.**

> "Not every metric for instance needs to be in the exact same format."
> Chadwick [2026-05-19 #0096]

**Constraints are not an excuse to stop.**

> "U can be creative within restraints in fact restrains foster creativity but when ur given restraints u
> just stop."
> Chadwick [2026-05-21 #0114]

**Research is the job, design is secondary.**

> "ur main purpose is research and helping come up with solutions... youre not doing hte real work you need
> to be doing here stop thinking about design. design is secondary to ux."
> Chadwick [2026-05-31 mvp-onboarding-flow-deep-dive #0010]

**Agreement is a failure mode with a name.**

> "i literally just said that so u dont fall into the default ai pleasing before truth algorithm"
> Chadwick [2026-05-31 #0030]

**Speed is the tell.**

> "if you go to fast i'll know you didn't do enough."
> Chadwick [2026-05-03 reconciling-calendar-scheduling #0006]

**Ask as many questions as the work needs.**

> "i noticed that you usually dont ask more thn 3 questions so if you need to ask more that will have an
> important impact on the final outpack please ask whatever is necessary without a limit id prefer that
> over a non optimal result."
> Chadwick [2026-05-26 #0002]

---

## 5. Corrections to the archive

**1. The sentence case decision is missing entirely.**
No mention of case convention anywhere in the archive. It is a researched, stakeholder-negotiated
typographic standard with a named rationale (register-matching), it governs every string in the product,
and it has a live open edge: the marketing and product split breaks at any in-product marketing surface.
That last part is a cross-system dependency.

**2. Magenta's reason is recorded as a negative only.**
`:132` says magenta not orange because rollover is not an error. The positive reason is his: it is softer
against the green and black already in the interface [2026-05-06 #0038].

**3. The mono and Heebo split is stated as if positional.**
The record has him correcting exactly that reading [2026-05-19 #0008]. The rule is what is speaking, not
where the text sits.

**4. The Destructive variant's origin is worth keeping.**
`:` calendar section records it as a peer variant. It was created in the moment for one action and named
by role rather than colour [2026-05-31 #0064]. Small, and a clean example of the system growing only when
something needed it.

---

## 6. What the record does not hold

- Kristin's response to the sentence case document, or whether the decision held.
- Any user testing on case, colour or type. He was explicit that there was no time: "There is no time for
  us to test right now" [2026-05-15 #0010].
- Whether the marketing and product case split was ever formally agreed or just left.
- The origin of the core palette, type choices and the brutalist direction. All predate the corpus and
  appear as given.
