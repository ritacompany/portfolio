# CS2 process

Agreed 2026-10-06. This is how CS2 gets written. It replaces `CS2_PLAN.md` and `CS2_METHOD.md`,
which are kept for history only.

Any Claude session, on any account, picking up CS2 starts here: read this file, then the status
table at the bottom, then carry on from the first section that is not approved.

---

## The idea

Write the framework sections first, one at a time, by talking them through. The intro and the story
that ties it together come last, written from what the sections turned out to be.

Why: every earlier round picked a narrative first and fitted the material into it, and every one
failed. Here the material comes first. The story is found at the end, not imposed at the start.

## What carries over

- **The concept ladder** in `CS2_COMPREHENSION.md` is kept as an ordering rule only: the order the
  sections are worked in, and the rule that no product term appears before the reader needs it.
  It does not decide what goes in a section. The conversation does. Its visual plan (the diagram only at
  rungs 2, 3, 5 and 6) and its "not a task to build the layout" scope note are replaced by The map and
  step 5 below.
- **The drafts** in `draft/` for rungs 0 to 3 are provisional. For section 1, only the "The route" and
  "What existed" parts are material, and the route is credited as inherited. The draft's opening and
  promise are the intro, written last. Its Visual A2 spends terms that belong to section 2, and "once the
  build got serious" is timing language the timeline rule keeps out. Rung 3 gets revisited when its
  section comes up. Rungs 0 and 1 are the intro and get rewritten last.
- **The reasoning files** in `reasoning/` are reference to search, not a script to follow.
- **The corrections** recorded in `CS2_COMPREHENSION.md` still stand: audience, no unsourced hiring
  history, no naming the user's problem for them, origin story belongs to CS1, mobile to web stays
  out.

## No pre-picked findings

Research and caveats are not assigned to sections in advance. They come up in the conversation for a
section when they matter there. Claude does not decide ahead of time which finding a section is about,
because that shapes the section and invites citing things wrongly.

## The map

The build up diagram in `CS2_COMPREHENSION.md` is the map. It is not drawn in advance. Each section
draws only the state it needs, inside that section's layout step, so the diagram is shaped by what the
sections turn out to be rather than fixed up front. It appears in every section as the small image
beside the real screen, marking where the reader is. It works as a still; motion comes later.

## Layouts

Each section is laid out from the templates in the Figma file Portfolio Design, page `VC`, section
`Case study layouts` (node 3461:5685), adapted to the portfolio grid and following the Haven CS Master
(3300:12596) for type, motion and reveals. The CS2 page is built in Figma on the `VC` page, section by
section, as a Mondai CS Master. The older frame `WIP Mondai growth journey case study` (3238:22519)
predates the 27 Aug restart and is not the starting point.

Corrected 2026-10-07, his rule: the Case study layouts section already holds finished, laid-out
sections (titles, T1I, T2I, T3I, carousels and so on inside each WIP case study). Pick the existing
section that best matches each part's content, duplicate it into the CS2 master and fill it. Never
draw a block from scratch. Then adapt it to the Haven grid (12 columns, 40 margins and gutters) and
Haven text styles.

Corrected 2026-10-07: the source of truth for layout, type and diagram style is the Figma, read
properly (structure, text styles, spacing), never thumbnails. The HTML in `build/` is Metalab scaffold
and is not a layout source for CS2; `LEDGER.md` only decodes template names. Build the section in
Figma directly. If a quick preview is wanted first, it is still built from the Figma, and it is said
plainly what is real and what is placeholder.

## Timeline and framing

Dates and how close anything was to launch stay out of the copy until Chadwick decides how the piece
handles time. Development delays were outside design and must not read as design decisions made late.
Never frame a decision as last minute.

Correction to `reasoning/THROUGHLINES.md` section 1: rollover did not start in May. It was on screen by
2026-03-24, with Chadwick already calling it a "weird decision making point" and moving flex to the week
level (`reasoning/carry-over.md`). May revised a mechanic that had existed since March. The same correction applies to the
"late and compressed" and "three weeks before launch" framing in that section: use THROUGHLINES for what
was inherited versus designed, never for timing.

## Storage

Corrected 2026-10-07, his rule: Mondai source material (transcripts, chats, his decks and notes, anything
quoting them) never goes into git, in any repo. It stays on his Mac outside git, for example
`~/Documents/CS2-research/`, and repo files only point to where it lives. What is committed here is the
case study's own working files (process, section drafts, status), and only when he approves.

## Reference material, and how it gets used

The writing craft sources, separate from the evidence about Mondai:

- `docs/about-source/CASE-STUDY-WRITING-PROTOCOL.md`: when to make which move, and the checks before handing
  anything back
- `docs/about-source/READER-EFFECT-TACTICS.md` and `tactics_bank.html`: the reader effect tactics, built for
  the About page; the structure, evidence and pacing tactics carry over to case studies
- `docs/about-source/case_study_tactics.html`: the case study tactics bank, 49 tactics, built 22 Sep from
  that brief. Recovered from iCloud on 2026-10-06
- `docs/about-source/CASE-STUDY-TACTICS-BRIEF.md`: the brief the bank was built from
- `reports/` and `research_notes/`: How case studies end, Case study results without metrics, What gets
  designers interviewed, Expanding card gallery components
- `.claude/case-study-rules.md`: evidence and scope rules

How they are used, so nothing gets skimmed and nothing gets read in full every time:

1. **Once: the index.** Done 2026-10-06. `CS2_REFERENCE_INDEX.md` has one line per tactic or principle
   from every source above. `check-reference-index.py` fails if any entry is missing; run it whenever a
   source changes.
2. **Before each section: the pull.** Read the index, pick the entries that fit what the section has to
   do, open those in full and bring them into the conversation as moves we could use. Different sections
   will pull different things.
3. **While drafting and at review: the check.** The draft notes which moves it uses. Review checks it
   against those entries and the protocol's final checks.

## How to run the conversation

Learned the hard way in the 6 Oct process chat. Each of these happened once and was corrected.

- **Bring the material, do not interview.** Claude has the archive, the reasoning files and the record.
  Open a section with what the record holds for it, then ask only what the record cannot answer. Never
  open with questions he would expect Claude to already know ("where did the Growth Journey come from").
- **Think, do not list.** A dump of facts about the product is not help. Say what the material means for
  this section: what the reader needs from it, what is his and what was handed to him, what the honest
  framing is. Then show the supporting facts.
- **Stay inside the section.** Material that belongs to a later section (the two zones, gating, capacity,
  rollover detail) is named at most in one line and left for its own section.
- **Do not get ahead.** No drawing, building or structuring for sections that have not been talked
  through. Nothing is designed in advance "because every section uses it".
- **Answer the question asked.** When he asks whether the approach is right, the answer is about the
  approach, not the contents of the next step.
- **Separate what he designed from what he inherited.** The Pathways curriculum came from Betsy and
  Michael; the journey structure before it was his. The time layer is where the reasoning is his. Never present
  inherited structure as his design, and never present reasoning from the archive as his argument unless
  the record shows him making it (`reasoning/pathways-and-hierarchy.md` section 6).
- **Unsourced claims get asked, not used.** Example: the old Figma frame says the original direction was
  fixed scheduling and keep pace accountability. Nothing in the reference files backs it. Still open.
- **His memory against the record.** His recollection moves something from inherited to designed only if
  the record shows him originating it. Otherwise it is marked as his recollection and he is asked for one
  specific: what he argued, what he changed. Hold every credit claim to the same bar, including ones that
  flatter him.
- **Archive claims.** The archive is lossy and sometimes invents reasons. An archive only claim can go in
  as a product premise, marked as such, never as his reasoning.
- **Never spin.** When he says a line makes him look bad, fix or cut it. Do not reframe it as a strength.
- **Short replies.** Lead with the answer, one question at most, no narration of what was read or what
  will be committed. Detail only when he asks for it.
- **Search CS1 evidence too.** `reference/cs1/CS1-PRIMARY-EVIDENCE-VERBATIM.md` holds pre March 2026
  material (for example his 13 Feb 2025 message on variance in how people schedule their lives). Cite it
  for facts CS2 needs; the story of the argument stays in CS1. "Where it started" means where the
  framework work started, not when he joined Mondai.
- **The two zones** means the Action Hub against the Pathway pages, which is what the record's quotes
  are about. It belongs to section 2.
- **Creative levels do not apply to CS2.** `.claude/portfolio-rules.md` asks for one at the top of each
  reply; that system was retired on 24 Sep 2026 and this process replaces it here.

## Section 1 starting notes

What the 6 Oct chat established for "Where it started", to build on rather than redo:

- Purpose: what he walked into and the problems the framework had to solve. Background, not a feature.
- Inherited: the curriculum. Betsy and Michael built it together (both have education backgrounds); its
  content is AI generated. Confirmed by Chadwick 2026-10-07. Not Michael alone.
- Corrected 2026-10-07 from his Discord record (`~/Documents/CS2-research/discord-framework-trail.md`,
  outside git): the framework work started before the Pathways existed. From 2024 he designed his own
  journey structure (milestones, focus areas, tasks; four milestones: learn, build, connect, pursue),
  first with daily task targets, then weekly from March 2025. The Pathways arrived from Betsy's
  curriculum in September 2025 and replaced his milestones.
- Settled early: the AI surfaces, researched in March. Neither shipped at MVP (`CHADWICK_ANSWERS`).
- Existed but unconnected: onboarding quiz, an intent to use the calendar, career screens. Nothing said
  what a person does week to week.
- Missing: not "anything about time". By 24 March a Sunday rollover modal with a moving pace date and
  flex points was on screen (`reasoning/carry-over.md`), so a dated pace system already existed. What
  nothing decided was how much of the route a week should hold. Whether he originated the modal or built
  on something handed to him is open; the record shows him building and critiquing it.
- Pathway order, confirmed by Chadwick 2026-10-06 and matching the shipped designs: Discovery,
  Cognition, Networking, Branding, Opportunity. The Mondai archive, his 18 March 2026 message and the
  provisional draft `draft/CS2-rungs-0-2.md` have Branding before Networking and are stale on this. Use the
  designs. An archive correction is drafted only with his approval.
- Problems that belong here: a fixed route with nothing deciding how much of it a week holds; people
  whose weeks are irregular (his own argument to Michael, 13 Feb 2025, in CS1 evidence; not a research
  finding).
  Everything below that waits for its own section.
- Open question for him: the fixed scheduling claim above.
- Reference pull done 2026-10-06.
- Corrected 2026-10-07. A section is a stretch of the page in order, built from several layout modules,
  not one idea picked from options. Section 1 runs: what existed and what it did not do (the gap), then
  what the product had to do at once (the demands), then why nothing could be copied, with the research
  and reference products that informed the framework.
- Corrected 2026-10-07. The rule on separating inherited from designed is for accuracy, not the
  subject of any section. Never make credit the point of a section or build a structure around it.
- "The framework" in this case study means the product framework. Do not split it into two frameworks
  on the page.

## The loop, per section

1. **Open.** Claude names the section and what it covers in one or two lines, and brings the reference
   pull for it.
2. **Talk it through.** Chadwick talks about it conversationally: what happened, what was decided,
   what connects to what. Claude asks questions and goes and finds the things he mentions in the
   archive, Figma, Notion or the record, and brings back what it found with where it found it.
3. **Draft.** Claude writes the section from the conversation. Every claim traces to a source.
   Nothing is asserted that came from neither Chadwick nor a source. ASSUMED claims never go in copy;
   they go on the open list until he confirms or cuts them. If he asks for a draft before the talk is
   finished, draft and list what the talk has not covered yet.
4. **Voice pass.** Run `humanizer` over the draft, then `no-ai-slop` in detect mode as a second
   check. Both live in `.claude/skills/` in this repo so they work on any account. Then the house
   copy rules: no em or en dashes, no hyphen pair as a dash, no Oxford commas, sentence case.
5. **Layout and visuals.** Worked beat by beat, so the form is chosen before the layout. Rewritten
   2026-10-09 because layouts kept coming out as walls of text: the template was picked first and filled
   with the copy. This follows the voice pass without waiting for copy approval, so copy and layout are
   reviewed together. A beat is one point the reader has to come away with; a section usually has two to
   four. The research behind this step, with the beat type to form to template table and every
   reference, is `reports/Visual storytelling per beat.md`. For each beat, in this order:
   - **What the reader must understand.** One sentence written as a claim, not a topic. Read in order,
     a section's claims should tell the section on their own. The sentence becomes the beat's Heading/40
     claim. If it cannot be written, the beat is not ready and no layout will fix it. Two beats making the
     same point merge.
   - **Form, with its reference.** First ask whether a sentence says it as well. If yes, the beat is
     text only, and that is a real choice. Otherwise classify the beat with the table in the report and
     write the form with its reference beside it (for example "options: labelled options grid, Figma
     UI3"). A real Mondai screen with one annotation beats a new diagram whenever the screen already holds
     the evidence. The map is a form too: bring it back with one change rather than a new picture. No form
     another case study already leans on (Haven has the two by two). One figure per claim. Draw the difference, not both whole states. Label every arrow or
     leave it out. A single number is a stat, not a chart.
   - **Still test.** The figure alone, as a flat image with no copy around it, must show the point. Its
     headline states the claim, labels sit on the figure, it changes one thing from the previous beat's
     figure and it reads at phone width. Nothing the reader needs lives in a hover, a later carousel
     slide or an animation; the carousel never carries a sequence the argument depends on. Read as
     headings plus visuals only, the section still makes its point. Motion comes later and only animates
     the change between two approved stills.
   - **Template and spans.** Pick the Case study layouts family that fits the form, then state it on
     the Haven grid as column spans (for example "text cols 1 to 5, figure cols 7 to 12"). Body text sits
     at 5 or 6 columns, never wider than 7. Template names are decoded in `LEDGER.md`, but layout comes
     from the Figma templates, not `build/` (see Layouts).
   - **Share, then build.** Bring the section as a short beat list: claim, beat type, form and
     reference, still test result, template and spans. He corrects it there (his global design rule).
     Nothing is built before his yes, and a correction goes back to the claim for that beat, not to the
     last build. After his yes, Claude builds the section in Figma on the Haven grid.

   Across beats, change one thing between neighbouring figures, default to time order, give parallel
   parts the same internal pattern and never put two text only blocks of the same width back to back.
   The map state for the section is the previous state plus one element, the new element loudest.

   Imagery is his to choose (corrected 2026-10-08). Image slots stay empty until he picks. Real screens
   are read from the Mondai Figma, never redrawn from memory. If the live frame is missing, use the
   desktop export, flag it and ask him where the current frame is. Diagrams follow the Haven CS Master's
   diagram style, not Mondai's UI.

   This step was run twice in parallel (8 and 9 Oct). The 8 Oct version on branch
   `claude/confident-poincare-b10757` was never merged; its extra rules are folded in above and its
   report is superseded by this one.
6. **Review.** Chadwick reads copy and layout together. Small wording fixes he asks for are made in
   place. Changes to what the section says go back to step 2 or 3.
7. **Save.** The section file lives in `draft/CS2-section-N.md` from its first draft, with a status line
   at the top. On approval, the status table is updated and the change is committed and pushed to
   GitHub in the same step. Nothing approved lives only on one machine.

Status values, used in the table and the section file: talking, drafted, built, approved. Where a
section stopped goes in a "Where section N stopped" list under its notes, in loop order.

When saving, the session also updates anything the work proved wrong: a starting note, the map plan for
the section, a stale line in the section file. Evidence overrides notes.

A section is done when its copy, layout and visuals are all approved. No second pass.

Also commit and push at the end of every working session, even mid section, with the status table
saying where the conversation stopped.

## Order

The outline. Worked top to bottom. "Map, as planned" is the 28 Aug idea for that section and can change when the section is worked.

| # | Section | What the reader comes away with | Map, as planned | Status |
|---|---|---|---|---|
| 1 | Where it started | What he walked into and the problems the framework had to solve. The route is stated here as given, not as its own section. Problems that belong to a later section are only named here | The route; the week only if the section needs it | Drafted, `draft/CS2-section-1.md`. Draft 2 (8 Oct) revises the opening from Discord, fresh reviewed. Beat list written 9 Oct under the new step 5. On hold until the ChatGPT export: part 1 is not final (his call, 9 Oct) |
| 2 | The week | The route arrives a week at a time, as Action Items in the Action Hub. One line that the content is generated | Week brackets added | Drafted, `draft/CS2-section-2.md`. Draft 2 voice passed and fresh reviewed 8 Oct. Next: his edit pass and layout together, under step 5. What first led to the week may be in ChatGPT, still open |
| 3 | Capacity and target date | How much each week holds comes from the time the user says they have | Weeks sized | Talking, opened 8 Oct, `draft/CS2-section-3.md`. Three questions for him |
| 4 | Pace | The system checks reality against the estimate without judging | Two dates, one fixed, one moving | Not started |
| 5 | Scheduling and rollover | The calendar is where it nearly broke | Calendar timeline underneath | Not started |
| 6 | Recalibration | Falling behind cannot mean failing | Calendar and route brought back together | Not started |
| 7 | The generated content | None of the words are written by a person | Own visual: the typography slot with generated copy | Not started |
| 8 | Handoff and the team | What it took for other people to hold it | To decide | Not started |
| 9 | Intro | Who it is for and the situation they are in. Written last | None | Last |
| 10 | The story | What ties it together, found from the sections. Written last | None | Last |

Section names are working labels, not the eyebrows on the page. The page can label and split them however reads best.

"What the reader comes away with" is the job of the section, not its content. The content comes from
the conversation. Every section gets a layout from the templates, the real screens and the map. Chadwick
can reorder any of it. Where a section stopped mid conversation is noted in its status.
