# The two AI surfaces

Contextual AI on the Action Item, conversational AI across the product, and why they never share a
container. This is the best-documented research process in the corpus and the clearest example of how
Chadwick actually used AI to work.

Sources read in full: `2026-03-20 integrating-ai-into-a-new-page` (runs through 21 March), `2026-03-22
exploring-next-steps-from-research`.

---

## 1. The separation came out of the research, not out of the design

He corrected this explicitly, in a draft of the document he was sending to leadership:

> "'As the design evolved, two different types of AI interaction kept coming up: one that modifies what's
> on the page right now, and one that the user can talk to about their journey more broadly' - hmm this
> doesnt seem quite right.... i think the clear separation between the two roles came as a result of
> thsi research. it was more nuanced prior."
> Chadwick [2026-03-20 integrating-ai #0094]

Worth stating plainly because it is the opposite of how these things usually get written up. The two
surfaces were not a design intent that research later validated. They were blurred, the research
separated them, and he refused to let the document imply otherwise.

The starting position was much vaguer, from the first message of the thread:

> "For the MVP we are building now this is going to be mostly text based but requires allowing the user
> to interact with hte text based output. I do not want to tie this to a chat feature but it is
> important that we remember that in the future there will ALSO be a monday ai chat bot that is
> accessibile on every page so there is a need to have the two things work independently."
> Chadwick [2026-03-20 integrating-ai #0002]

Two things exist and must work independently. How they differ was undefined.

---

## 2. The research, and what it produced

Eight products that ship both an inline AI and a conversational AI were studied: GitHub Copilot,
Cursor, Microsoft 365, Notion, Google Docs, Adobe, Figma, Grammarly. The finding was convergence:
competing teams independently landed on the same separation rules.

The rule that came out of it, verbatim from the research summary:

> "Inline AI should be chips you tap, never a text input. Output transforms the content in place. No
> history, no threading. Global chat has a text input, maintains conversation history across sessions,
> lives in its own container (bottom sheet on mobile), and has a named identity with a distinct icon,
> not the same sparkle as the inline AI."
> Claude [2026-03-20 integrating-ai #0073, assistant turn]

And the spatial principle, which is the load-bearing one:

> "Where an AI feature lives on screen tells users what it operates on. Scoped inline AI anchored to the
> content signals it works on this page. A persistent surface signals it works across the whole product.
> Breaking that spatial logic is one of the most reliable ways to create user confusion between AI
> surfaces."
> Claude [2026-03-20 integrating-ai, research document]

**This is the research-to-decision mapping `CS2_GAPS.md` says does not exist.** For this decision it
does exist, with named products, a named convergence finding, and the design rule it produced. Studying
eight products that ship both showed they all separate the two by container, input type and history,
which is why Mondai's two surfaces never share a container.

---

## 3. He audited the research rather than accepting it

Three separate audits, all his, all before using the conclusion.

**Source weighting.**

> "Can you look over your sources and really look at type of info here has the most validity in the
> space of (for instance empirical data with a direct connection to the topic would be the highest) what
> we are doing here? We need to make sure we are not just grabbing a bunch of info and coming to this
> conclusion. We need to figure out what kind of sources we used and make sure that the process we used
> to determine the value of each individual source's impact on our total result is weighted properly. If
> we find discrepancies in this weighting process we may need to take another pass at the research."
> Chadwick [2026-03-20 integrating-ai #0080]

That audit produced an honest-gap finding: no peer-reviewed study directly tests inline AI chip design
versus text input for a career navigation or structured learning product, because the design space is
too new. The foundation is convergent evidence from production design, not empirical data. He cut that
section from the leadership document as unnecessary for that audience [#0090], but the finding stands
and it is the first appearance of the reference-class problem that hits him much harder in May.

**Method confusion.** He caught the research changing shape without saying so:

> "you keep framing this as a competitive analysis. i think that makes sense with how you looked at
> things but it doesnt feel like the document has a clear direction.... its not just about competitive
> analysis its about heuristics and research and shit you know? im getting really confused on your
> sourcing and shit at this point. you didnt present it to me as such a competitive analysis type
> research framework you used before. what is going on here?"
> Chadwick [2026-03-20 integrating-ai #0094]

**Reasoning backwards from where they already were.** The sharpest of the three:

> "i want to make sure youre not conducting this research based on where we were because that is too
> restricting? or like maybe like dont be focused on the methods we used and shit... these things in
> particular just bring up the suspiscision that there may be something here underlying this information"
> Chadwick [2026-03-20 integrating-ai #0098]

He is describing motivated retrieval, in a research document written for him, and catching it from the
inside. Combined with the source-weighting audit and the capacity-screen audit two months later where
a citation did not survive contact, this is the pattern the case study's AI thread should be built on.
Not "AI helped me research faster." AI produced research fast enough that auditing it became the job,
and he did the auditing.

---

## 4. Where he overruled the research

The research said inline AI should never have a text input. He refused the absolute version:

> "im worried about this. as i discussed in the prvious chat some kind of custom input ability here is
> expected. i also think that other products do allow this sometimes? it still doesnt have to chat, it
> can still act and even tell the user what its doign. it is possible and still ok to have it have a
> custom input as long as the custom input handles it correctly."
> Chadwick [2026-03-22 exploring-next-steps-from-research #0008]

The archive's landed position is the compromise that came out of this: preset chips primary, plus a
scoped custom input built as a tag selector rather than a prompt field. The chat mental model is
avoided by constraining the input's shape, not by removing it.

**He also enforced the research against the tool, twice, when it drifted back.** A proposal to put both
surfaces in one panel with a mode toggle:

> "WOAH THIS SHOWS U R NOT LOOKING AT OUR PREVIOSU RESEARCH AT ALL THIS IS A HUGE RED FLAG FOR ME RIGHT
> NOW. im not even going to continue this until u have ur info updated"
> Chadwick [2026-03-22 #0014]

> "why would u have 'ask about task' wtf? contextully again a huge red flag. option b now replacing where
> the chatbot wa before also a huge red flag.. there is supposed to be a clear distinction??????"
> Chadwick [2026-03-22 #0020]

So the "never share a container" rule was tested three times in two days and held each time, once by
him against the research and twice by him for it.

---

## 5. Designing for a surface that will not ship

The decision to design the conversational AI even though it probably would not make MVP is his, stated
plainly:

> "the conversational has to be thought of too even if we dont use it for the mvp... i am designing it as
> if they both exist which just means the conversational part may not end up being included for mvp due
> to other things like time ti takes to make the i work properly for this etc but should be able to be
> easily added later"
> Chadwick [2026-03-22 #0026]

The archive's reason for this (the Contextual AI's constraints only make sense in a world where the
conversational AI exists to catch the overflow) is a good articulation and does not appear in the
record in that form. His stated reason is simpler and about rework cost.

---

## 6. The organisational reality behind the decision

This is the context the case study Background is missing, and it is all in one turn:

> "this is not a full time thing we are all very limited and doign this for free as part of a startup
> part time. so this ai person, the ceo and i are all core leaders of the project with the ceo obviously
> being the main one. there is a group fo 5 people that serve at this top hierarchy of decision making.
> the thing is i dont fully have great insight into what the ai leader has been working on but i know
> that the ceo has called out things with another page i designed that the ai leader wasnt given
> specific instructions to work on so part of the difficulty here is also figuring out what is realistic
> within the timeline."
> Chadwick [2026-03-20 integrating-ai #0102]

Unpaid, part-time, five decision makers, and the design lead cannot see what the AI lead is building.
He designed the two-surface system without knowing whether the two surfaces would share a model.

His response was not to wait:

> "i dont know that this is even possible in the short term and i need to be making progress in the mean
> time so step 1 is putting this document together so i can get their thoughts... i'm going to start
> pressing forward with designing some solutions assuming we are following the research outcome and
> everything on the ai side is fine"
> Chadwick [2026-03-20 integrating-ai #0104]

He wrote the three questions he needed answered on the AI side, sent them, and kept designing against
the assumption. The questions, verbatim from the document he sent: what is being generated and how,
what context the global chat has access to, and whether the two surfaces draw from the same model
[#0109].

**And he corrected the document's framing of his own role:**

> "im not a ui designer i'm a product designer there is a lot more thought and work that is required on
> my end than you are assuming... they didnt 'tell me this is what needs to be in there' and i design."
> Chadwick [2026-03-20 integrating-ai #0098]

---

## 7. Corrections to the archive

**1. The two-surface separation is a research outcome and should be recorded as one.**
The archive presents it as a design constraint. Chadwick's own correction [2026-03-20 #0094] says the
separation came out of the eight-product study and was "more nuanced prior." That provenance is worth
more than the rule.

**2. "Why no text input" overstates the landed position.**
`:413` and the reasoning under it. He explicitly rejected removing custom input [2026-03-22 #0008]. The
landed rule is that the input's shape is constrained to avoid the chat mental model, not that input is
absent. The archive states both facts in different sentences and reads as though the second is a
rationale for the first.

**3. The eight-product study is missing.**
GitHub Copilot, Cursor, Microsoft 365, Notion, Google Docs, Adobe, Figma, Grammarly. The archive lists
Google Docs, Notion and Grammarly as "reference patterns" without the study, the convergence finding, or
the honest gap that came with it.

**4. The reference-class gap was found in March, not May.**
No empirical study exists for this design space. That finding is from the AI surfaces research on
2026-03-21. The May "NO COMPARABLE PRODUCTS" moment reads in the archive and in the case study material
as a late discovery. It was a re-encounter.

---

## 8. What the record does not hold

- No answer from the AI lead to the three questions. They were sent and the record does not contain a
  reply.
- No user testing on either surface.
- Nothing on Rita's voice research or the JFF 2025 statistic cited in the archive at `:427`. Neither
  appears in these sources. It may be in a conversation filtered out of the corpus or outside it.
- The archive's rationale for designing the conversational AI early (that the Contextual AI's
  constraints only make sense alongside it) has no source. His recorded reason is rework cost.
