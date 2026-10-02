# Pathways and hierarchy

Growth Journey > Pathway > Focus Areas > Action Items. What was designed, what was inherited, and
where the archive's reasoning has no source.

Sources read in full: `2026-03-18 mondai-rita-abc-knowledge`, `2026-03-31 nearly-finished-project`
(the page brief sections), `2026-04-09 your-journey-and-pathways-page`, `2026-04-22
progress-bar-design-for-linear-focus-areas`, `2026-04-30 clarifying-pathway-page-sorting-and-task-
organization`, `2026-05-04 action-hub-schedule-view-design-constraints`. Searched the full 154
conversation corpus for the pathway sequence argument.

---

## 1. The five pathways were not designed in this record. They were inherited.

The earliest statement of the sequence in the corpus is Chadwick stating it as an existing fact, not
arguing for it:

> "onee pathway at a time. ther are 5 for the mvp= discovery, cognition, branding, networking and
> opportunity - in order."
> Chadwick [2026-03-18 mondai-rita-abc-knowledge #0006]

From that point on it appears in every project brief as a given. **No conversation in the corpus
argues why that order.** The prior four-stage framing (Awareness and Education, Preparation and
Production, Storytelling and Networking, Applications and Interviews) also appears already fixed, as
something the five pathways map onto rather than something derived.

**This is a correction to what I told you earlier.** `CS2_GAPS.md` lists "Five pathways, why
sequential" under "not gaps, the reasoning is in the archive." The reasoning is in the archive. It is
not in the record. The archive's prose ("you can't build in a direction you haven't picked...
networking without artifacts to point at reads as fishing... warm outreach outperforms cold at this
audience's odds") returns zero matches anywhere in 154 conversations, in any phrasing.

That prose is plausible and may well be right. It has no author in this record. Treat it as
reconstruction until a source outside the corpus is found, and do not put it in the case study as
your argument unless you actually made it somewhere.

Where to look next, outside this corpus: the pre-March 2026 history, the curriculum team's own
documents, and the Notion pages named in the CS2 material.

---

## 2. Focus Areas were inherited too, and their linearity was news

> "so i found out focus areas are linear as well."
> Chadwick [2026-04-22 progress-bar-design-for-linear-focus-areas #0000]

He found out. Focus Area linearity arrived from the curriculum side mid-design and changed the
Pathway page, because a linear sequence of Focus Areas means the Action Item list is already grouped
whether or not the UI says so. The progress rail on the Pathway page exists to make an inherited
property visible.

He also flagged what the count constraint does to the design, immediately:

> "we dont specifically have a number for how many focus areas would exist per pathway"
> Chadwick [2026-04-22 #0000]

Which is why a colour-coded treatment was rejected on the spot: "i just told you it could be an
unlimited number so why would we start using color sorting logic here" [#0010]. An unbounded set
cannot carry a colour system. Small decision, correct reason, and the kind of thing that only shows up
when someone is holding the constraint rather than the visual.

**The screenless decision.** The archive attributes it to a design judgement about navigation layers.
The record has Chadwick describing Focus Areas as demoted from a formal hierarchy level to a sorting
and orientation device, as an already-settled state, in a page brief:

> "Later on focus areas will become another 'level' of the hierarchy. They still are but in a less
> formal role, only really used for sorting and giving the user of an idea of the kinds of things that
> will be focused on within that individual pathway."
> Chadwick [2026-03-31 nearly-finished-project, page brief]

So the decision predates the corpus too, and the archive's "what breaks if you make Focus Areas
navigable" argument has no conversational source here either.

---

## 3. What he did design: the two zones

The clearest statement of the model, correcting a proposal to treat Pathway pages as a place to work:

> "Pathways as execution doesnt make sense tho. execution is action hub, pathway pages is simply a way
> to look at the tasks and more info about the pathway. it will be uncommon for the user to view the
> action items for a apthway this way honestly its not a primary action since that will be done
> primarily through the action hub. its more for a user to get an idea or overview of the curriculim"
> Chadwick [2026-04-09 your-journey-and-pathways-page #0028]

And the job the Pathway page actually does, in one line:

> "the more important thing at that level is to show 'where am i at tasks wise in this pool of tasks
> and what is coming up next'"
> Chadwick [2026-04-09 #0028]

He enforced it on the design too: no state changes from this page. "i dont think she should be able to
change progress states on this page. that still needs to be done on the action hub or within an action
item itself" [#0056].

**And he protected the zone against his own design instinct.** When separating the current week out on
the Pathway page would have made it clearer:

> "i hesitate slightly because i prefer this to not serve as a 'place people go to get their action
> items done so i fear highlighting those TOO MUCH or separating them too much may not be beneficial"
> Chadwick [2026-04-30 clarifying-pathway-page-sorting #0006]

That is the two-zone model being defended against a local clarity win. Good case study material,
because the cost is visible and he took it deliberately.

---

## 4. Sequence gating, and the reason the archive missed

The real argument is curriculum logic, and it is one line:

> "you cant synthesize a usability finding without the prerequisite action item of conducting a
> usability sesssion duh? like how are you going to synthesize non existent findings????"
> Chadwick [2026-05-04 action-hub-schedule-view-design-constraints #0004]

**He then scoped the gate.** The proposal was to lock everything not yet available. He cut it back to
the week boundary:

> "i think the action items outsied of this week should be locked but once the action item is within
> the week all of them should at least be visible so i dont think they should be 'locked'"
> Chadwick [2026-05-04 #0002]

Consequence, worked out in the same session: nothing inside the week is locked, so every item gets
full reschedule access, and the only thing sequence controls is completion. The user can plan their
time in any order and just cannot complete out of sequence [2026-05-04 #0005, assistant turn].

**And browsing was opened up later.** By 1 May the lock was loosened again at pathway level:

> "in fact all pathways will be unlocked for the mvp now so u can really look at any pathway and any
> task even if u cant actually do it out of order."
> Chadwick [2026-04-30 clarifying-pathway-page-sorting #0008]

Look freely, complete in order. That separation of visibility from actionability is the actual
mechanic and it is stated nowhere in the archive as a principle, only as scattered consequences.

---

## 5. Michael, twice, on the same page

The Pathway page's sorting was reopened by the CEO on two separate occasions.

> "The action items are sorted in two ways: 1. the focus areas are linear so the action items progress
> through the action areas in a linear fashion. 2. Because the curriculim moves through in that same
> order that also means the current action items are at the top... We need to add clarity to two things"
> Chadwick relaying Michael [2026-04-22 progress-bar-design-for-linear-focus-areas #0050]

> "Michael brought up that he doesn't still fully understand the sorting of this page. For instance,
> how we put the in progress tasks at the top and everything is in linear order he is saying this
> still isnt clear. like you know how the action items are in linear order? i know we added the focus
> areas thing but i guess thats not enough clarity"
> Chadwick [2026-04-30 clarifying-pathway-page-sorting #0000]

Worth noticing as a pattern rather than as two incidents. The thing Michael could not read is the same
thing twice: two orderings (status and curriculum sequence) collapsed into one list. That is a genuine
information design problem, not a stakeholder being slow, and Chadwick treated it as one, going back
to structure rather than adding a label.

His constraint on the fix was consistency with a surface that already existed:

> "the style u did with the long lines in version A conflicts exactly with the way the in progress
> states etc are designed on the action hu they are in that exact same style with the line this is
> what i was talking about"
> Chadwick [2026-04-30 #0012]

---

## 6. Corrections to the archive

**1. The pathway sequence reasoning has no source in the record.**
`:44`. The full "why sequential" paragraph returns zero matches across 154 conversations. It may be
correct and it may come from outside this corpus. It should be marked as unsourced in the archive
rather than presented alongside reasoning that does have a record. This also corrects `CS2_GAPS.md`,
which lists it as solidly documented.

**2. "What breaks if you make Focus Areas navigable" has no source either.**
`:50`. Same test, same result. The demotion of Focus Areas to a sorting role is stated by Chadwick as
already settled on 2026-03-31, with no argument attached.

**3. Focus Area linearity is inherited, not designed.**
It arrived from the curriculum side on 2026-04-22 and Chadwick recorded it as a discovery. The archive
presents the Focus Area treatment as a design decision throughout, which reads as more authorship than
the record supports.

**4. The sequence gating reason is weaker than the real one.**
`:200` gives "letting a user complete item 3 before item 1 would validate skipping foundational work",
which is a motivational argument. The record's reason is that the curriculum contains items that
literally cannot be done out of order, with his own example: you cannot synthesise findings from a
session you have not run. Concrete beats motivational, and it is his.

**5. Visibility versus actionability is not stated as a principle.**
All pathways are browsable, all in-week items are visible and reschedulable, and only completion is
gated [2026-04-30 #0008, 2026-05-04 #0002]. The archive carries the consequences in three separate
places without the rule that generates them.

---

## 7. What the record does not hold

- Any argument for the five pathways or their order. Confirmed empty search across the corpus.
- Any argument for Focus Areas being screenless, beyond the fact of the demotion.
- Whether the pathway-level unlock for MVP was a design decision or a scope concession. Stated as
  fact, unattributed.
- No user testing on the Pathway page, including after two rounds of Michael not being able to read
  its sorting.
