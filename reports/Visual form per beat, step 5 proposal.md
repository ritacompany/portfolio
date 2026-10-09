# Visual form per beat: step 5 proposal

Status: draft for Chadwick's approval. Not applied to `reference/cs2/CS2_PROCESS.md`. Research behind it:
`reports/Visual form per beat.md` and `research_notes/Visual form per beat/`.

## The change in one line

Today step 5 opens with "Pick the template". The template gets chosen before anyone has said what the
reader must understand or how that should be shown, so the image slots get filled with whatever is to
hand and the reasoning falls back into paragraphs. The proposal puts a beat sheet in front of the
template choice: understanding, then form, then layout.

## Proposed text for loop step 5

Replaces the first sentence of step 5 ("Pick the template that fits what the section has to show") and
the last sentence ("Share the concept and template choice per part before building"). Everything else in
step 5 stays as written.

> 5. **Layout and visuals.** Before any template is opened, write the beat sheet for the section. A beat
>    is one point the reader must leave with; a section usually holds two to four. For each beat, in
>    this order:
>
>    1. **What the reader must understand.** The reader's question at this point and its answer as one
>       complete sentence that says what is at stake. That sentence becomes the beat's Heading/40 claim.
>       If it cannot be written, the beat is not ready and no layout will fix it.
>    2. **The relationship.** What the sentence rests on: a gap, a change, a comparison, a sequence, a
>       structure, a position, a cause, a decision, a part of a whole or nothing with a shape. Nothing
>       with a shape means prose, and that is a valid answer.
>    3. **The essential test.** Would the reader miss the point without a visual? If not, the beat stays
>       text, set as a title block with the claim.
>    4. **The visual form, with its reference.** The least elaborate form in that relationship's row of
>       the index in `reports/Visual form per beat.md`, named with its source (for example "position in a
>       landscape: 2x2, Periodic Table of Visualization Methods, strategy group"). A real Mondai screen
>       with one annotation beats a new diagram whenever the screen already holds the evidence. The map
>       is a form too: bring it back with one change rather than drawing a new picture.
>    5. **The layout.** Only now pick the section from Case study layouts (node 3461:5685) whose geometry
>       fits that form, using the form to template table below. It is a starting point, not a standard:
>       duplicate it, then adapt it to the Haven grid (12 columns, 40 margins and gutters) and Haven text
>       styles. Words sit beside the visual they describe.
>    6. **The still test.** Each visual has to make sense cropped out and seen alone, and the section has
>       to make its point read as headings plus visuals only. Note which transitions are real change
>       over time or movement; those are the candidates for motion later.
>
>    The beat sheet is shared as one table per section (beat, what the reader must understand,
>    relationship, form and its reference, template) and agreed with Chadwick before anything is built.
>    Layout is worked out with him a step at a time from there.

## Form to template

Templates are the families that exist in node 3461:5685 (read from the Figma file 2026-10-08), named the
way `LEDGER.md` decodes them. Column spans are on the Haven grid and are a starting recommendation, not a
sourced figure.

| Form the beat needs | Template family in Case study layouts | On the Haven grid |
|---|---|---|
| A claim with no visual (the prose beat) | Title sections ("The vision", "Introduction" style) | Heading/40 claim, Body/16 in 5 to 6 columns |
| One piece of evidence explained beside its text: an annotated screen, a single diagram, a 2x2 | T1I base or T1I l2 | Text 4 to 5 columns, media 7 to 8, caption beside the media |
| A whole system, the map, a timeline or a turn between acts | T1I l3 (full bleed media) | 12 columns, one annotation on the turning point |
| Two things compared: before and after, two options | T2I l1 (two equal images over text) | Two cells of 6 columns, identical crop, scale and label position |
| Three parallel things: options, approaches, existing pieces | T3I base (three equal media) or T3I l2 | Three cells of 4 columns, or base 2x2, same crop and scale |
| One fact to remember | Stats | 6 to 8 columns, right after the text it comes from |
| An optional gallery the argument does not depend on | Carousel | Never used for a sequence the argument needs; unroll that into T2I or T3I |
| Scroll scrubbed video | vsc | Held until the motion pass; as a still it is one poster frame with a caption |

Quote templates (qt, mq, rc) are left out for CS2, because CS2 copy quotes no one.

## How it would read on section 1

An illustration of the procedure only, built from the agreed order in `draft/CS2-section-1.md`. It picks
no imagery and is not a layout decision; section 1 is still worked through with him.

| Beat | Reader must understand | Relationship | Form and reference | Template |
|---|---|---|---|---|
| The gap | The pieces existed but nothing said how a person moves through them | Structure with the links missing | Existing pieces shown apart, unconnected; concept map without edges (Periodic Table, concept group, structure) | T3I base, one cell per piece |
| What it had to hold | It needed structure and room to move in the same system | None with a shape: a judgement | Prose (Knaflic's text first option; Scarr's essential test) | Title section |
| Nothing to copy | Every close product solved one side; none sat where both are | Position in a landscape | 2x2, structure against flexibility, upper right empty (Periodic Table, strategy group) | T1I l2 |

The second beat's tension becomes the third beat's two axes, so the reader sees one thing change between
beats (Hullman). The 2x2 passes the bar the research sets for one: both axes are the trade-off the design
had to resolve, not decoration.

## Recommendations and what earned each

- **R1 Write the reader's sentence before anything else.** Earned by: Knaflic's Big Idea "must be a complete sentence" and must convey what is at stake; Burn-Murdoch's titles answer "What is this showing me? Why does it matter?" (report, research canon and editorial sections).
- **R2 Name the relationship with a shared vocabulary.** Earned by: the FT Visual Vocabulary sorts every form by the relationship the reader needs to see, chosen from the message before the chart (report, catalogue section).
- **R3 Let prose win when the visual is not essential.** Earned by: Simon Scarr's rule that Reuters takes on stories "where the visual aspects are essential to the understanding" (secondhand via Design Week) and Knaflic's chooser starting at simple text.
- **R4 Name conceptual forms from the Periodic Table of Visualization Methods.** Earned by: it is the only catalogue researched with defined concept, strategy and metaphor groups and a structure or process tag; FT, From Data to Viz and Datawrapper start from a dataset CS2 does not have.
- **R5 Prefer a real screen with one annotation where the claim lives.** Earned by: Mayer's signalling (d 0.41 to 0.46) and spatial contiguity (median d 0.79), and Linear's annotated "inverted L" screen in its redesign post.
- **R6 Reuse the map with one change per section.** Earned by: Hullman et al. 2013, where 143 participants preferred transitions that change one thing and parallel structure improved memory for order. It matches The map rule already in `CS2_PROCESS.md`.
- **R7 The carousel never carries the argument.** Earned by: Bostock, "making content visible by scrolling is almost always better than hiding it behind a click", and Aisch's "you should not hide important content behind interactions".
- **R8 Run the still test and the scan test before review.** Earned by: The Pudding's advice to stack steps as static charts when each reads well alone, NN/g's finding that the layer cake scan of headings is the most effective pattern, and the Uxcel review naming walls of text the most common red flag.
- **R9 Show a rejected option meeting the rule and still failing.** Earned by: Stripe's accessible colour post, which puts the rejected palette that passed contrast beside the one shipped so the reader judges it before reading the verdict.

- **R10 No skill. Step 5 and the report's index table carry the procedure.** Earned by: Chadwick's decision on 2026-10-08 not to have AI write skills, and the fact that nothing needs packaging: step 5 lives in `CS2_PROCESS.md`, which every CS2 session reads first, and points to the index. The two searches (`research_notes/Visual form per beat/skill_sourcing.md`) found no skill that does the whole job; their useful rules (talk-craft's claims first with an exhibit of none allowed, understanding-ladder's "pick the lowest rung that fully answers", diagram-design's "would the reader learn more than from a good paragraph?") are already covered by steps 1 to 4. Nothing is installed.

## Open edges the research could not close

- No catalogue names the 2x2, swimlane or journey map. They are cited as Periodic Table strategy or
  process forms.
- No portfolio was found that diagrams a non visual framework like the Growth Journey well. CS2 sets its
  own precedent there, which puts more weight on each diagram's title and its one annotation.
- The Scarr and Tse quotes are secondhand. The column spans and the "about a screen of text before a
  break" pacing are judgement, not sourced figures.
