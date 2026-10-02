# The Action Item page

The one surface in the product that is not designed for a user. It is designed for an AI to write
into, and the user reads the result.

Sources read in full: `2026-05-02 action-item-page-design-without-ai-features`, `2026-05-13
designing-content-blocks-for-action-item-pages`, `2026-05-15
action-items-page-scrolling-and-layout-strategy`. Continues from `ai-surfaces.md`.

---

## 1. What the page actually is

> "I am trying to create organization for the curriculim output. So I need to think about what kinds of
> content blocks I should have ready and designed"
> Chadwick [2026-05-13 designing-content-blocks-for-action-item-pages #0000]

Not a page with sections. A set of containers an AI chooses between, sized and styled in advance so
that whatever it writes lands in something that reads well.

**He corrected the tool when it drifted toward features**, and the correction is the clearest statement
of the distinction:

> "Your insights are smart but they could easily lean more feature based. Just be careeful not to push
> too much into that. For example in this reference I dont have any specific content listed just spaces
> with filler text for the AI to decide what to do with"
> Chadwick [2026-05-13 #0002]

A definition block is not a glossary feature. It is a shape the AI can pour a definition into. The
difference matters because features need product decisions, roadmap space and state, and containers need
none of that.

**Scope was set by feel, not by taxonomy:** "i think 9-10 is the right scope for mvp" [#0009]. The
archive's ten registers are that decision.

**Two hard constraints, both MVP scoping calls:** read-only, no user input on the page, and text only, no
embedded media [#0002].

---

## 2. Both AI surfaces were cut from this page

This is the thing that makes the page's design problem strange, and it is easy to miss:

> "Apparently for the MVP we are not going to incorporate either the contextual or conversational AI on
> the page itll just be the curriculim output."
> Chadwick [2026-05-02 action-item-page-design-without-ai-features #0000]

So after the eight-product research, the two-surface separation and the leadership document, the MVP
version of the Action Item page has neither surface on it. The AI is entirely upstream. It writes the
content, it does not sit on the page.

Which reframes what the container system is for. With Contextual AI present, the containers hold content
the user can transform. Without it, the containers are the entire interface between the AI and the
person. The page has to be legible with no interaction at all.

He did not treat that as a loss. The next thing he did was ask for the AI-era layout to be kept: "I liked
the clean simple well spaced look that was used on the AI integration designs so i think thats a good
starting point" [#0000]. And he kept the structure loose against the possibility the AI could not use it
yet: "want it to be flexible in case the ai cant use it initially baed on its script ro something"
[#0000].

---

## 3. Not a document

The single sharpest constraint on the page, and it rules out the obvious reference class:

> "i want us to be careful and not use things like notion so much as an example because that is an
> entirely different kind of surface. This shouldn't feel 'like reading a document'"
> Chadwick [2026-05-15 action-items-page-scrolling-and-layout-strategy #0008]

Everything the page needs (long-form text, sections, a right rail, anchor navigation) points at a
documentation pattern, and he refused the destination while keeping the parts. Which is why the impact
moments exist:

> "dont go crazy on the design here in terms of fanciness i think this page needs to be minimal the main
> thing here is content organization... beacuse the main body content will be text and layout base any
> obvious frames are going to naturally be a 'stand out' moment. I like how you referred to the section
> section as a 'stop moment' the breaking of the grid element there really does a good job as adding
> importance to that section"
> Chadwick [2026-05-13 #0011]

The economy is the point. On a page that is almost entirely text, a frame or a broken grid is expensive,
so it is reserved for the blocks that need weight. He named the ones that earn it: the do versus do-not
comparison moments [2026-05-15 #0004].

---

## 4. The right rail, and what it is for

He proposed it and specified its behaviour rather than accepting a default:

> "another thing we need is a way for the user to jump to a certain content section. like an page level
> navigation. I am thinking something on the right with all the diffefrent sections where u click to
> navigate to a certain section on the page."
> Chadwick [2026-05-13 #0013]

Always present rather than conditional, for consistency: "i think in most instances there will be enough
scrolling to need the menu so probably good to just always have it for consistency" [#0019].

And when the build did not do its job he was precise about why it failed rather than that it looked
wrong:

> "why is the right menu taking up so much damn spacE? Why is it not highlighting the sections as you
> scroll? This is literally specifically so the user can more easily navigate the page and right now its
> pointless because everything is so cramped... the highlighted menu item should change as you scroll the
> page based on the content in frame."
> Chadwick [2026-05-15 #0004]

A navigation aid that does not tell you where you are is not a navigation aid. Same failure mode he
caught on the Pathway page, where two orderings collapsed into one list.

**He also added a hierarchy level mid-thread**, having noticed the flat structure would not hold:

> "Can we also add another level of hierarchy somehow? like for instance if there content blocks we are
> designing now were sub sections and there were also main sections within here?"
> Chadwick [2026-05-13 #0015]

---

## 5. Two dependencies he found and did not close

**Estimated time has no source for non-integrated users.**

> "the estimated time ro effort piece is intereseting but i purposely havent been mentioning it yet. its
> based on cognitive load so idk how to shothat to the user. for calendar integrated action items for the
> mp i figured users can estimate how long ana ction item would take based on how much time it takes up
> int heir calendar so if it gets scheduled by the ai for an hour or two or 30 minutes that indicates the
> est. time. but i havent solved that for unscheduled approach"
> Chadwick [2026-05-02 #0002]

Cognitive load is the sizing unit for the entire weekly model, and the only way a user ever sees it is as
a block on a calendar they may not have connected. Non-integrated users get no duration signal at all.
That is a real hole in the system's teachability and he identified it himself, then set it aside.

**Completion has two possible homes and he asked whether they must match.**

> "we also need to figure out if there needs to be a level of similarity between how action items are
> marked as complete on the action hub and the action item page. can we use different approaches here?"
> Chadwick [2026-05-02 #0002]

Not resolved in these sources.

---

## 6. Corrections to the archive

**1. "Focus is on the Contextual AI at MVP" is wrong. Confirmed by Chadwick, 2026-08-27.**
On 2026-05-02 [#0000] Chadwick reports that neither the contextual nor the conversational AI is going on
the Action Item page for MVP, leaving curriculum output only. Nothing in the corpus reverses that, and
asked directly on 2026-08-27 he confirmed: neither surface shipped at MVP. The archive's MVP scope line
needs correcting. Draft decision entry filed at `reasoning/PENDING_ARCHIVE_EDITS.md`.

**2. Partly withdrawn on re-check.** The archive does state the reason, at `:262`: registers rather than
components because feature-based components would constrain what the AI can compose. That is correct and
I was wrong to call it missing. What is missing is that the distinction had to be actively defended
during the design. Chadwick corrected feature-drift in the moment [2026-05-13 #0002], which is what makes
it a live constraint rather than a stated principle.

**3. "Not a document" is missing.**
`:260` describes typographic containers without the rule that keeps them from becoming Notion. The
rejection of the documentation reference class is what forces the impact moments to be scarce.

**4. The estimated-time hole is undocumented.**
Cognitive load is visible only via calendar placement, so non-integrated users have no duration signal
[2026-05-02 #0002]. Given that capacity, target, pace and weekly sizing all run on cognitive load, this
belongs in the cross-system dependencies list.

---

## 7. What the record does not hold

- Whether the Contextual AI returned to this page before launch.
- How completion is marked, and whether it matches the Action Hub.
- Any resolution of the estimated-time problem for non-integrated users.
- Final line length. He asked for min and max values on 2026-05-15 [#0006], flagged that 72 characters
  felt too narrow at large viewports, and no number is settled in these sources.
- No user testing on this page.
