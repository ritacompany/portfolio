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
  It does not decide what goes in a section. The conversation does.
- **The drafts** in `draft/` for rungs 0 to 3 are provisional. Rung 3 gets revisited when its
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

## Timeline and framing

Dates and how close anything was to launch stay out of the copy until Chadwick decides how the piece
handles time. Development delays were outside design and must not read as design decisions made late.
Never frame a decision as last minute.

Correction to `reasoning/THROUGHLINES.md` section 1: rollover did not start in May. It was on screen by
2026-03-24, with Chadwick already calling it a "weird decision making point" and moving flex to the week
level (`reasoning/carry-over.md`). May revised a mechanic that had existed since March.

## Reference material, and how it gets used

The writing craft sources, separate from the evidence about Mondai:

- `docs/about-source/CASE-STUDY-WRITING-PROTOCOL.md`: when to make which move, and the checks before handing
  anything back
- `docs/about-source/READER-EFFECT-TACTICS.md` and `tactics_bank.html`: the reader effect tactics, built for
  the About page; the structure, evidence and pacing tactics carry over to case studies
- `docs/about-source/CASE-STUDY-TACTICS-BRIEF.md`: the brief for a case study tactics bank. No built bank
  has been found in the repo
- `reports/` and `research_notes/`: How case studies end, Case study results without metrics, What gets
  designers interviewed, Expanding card gallery components
- `.claude/case-study-rules.md`: evidence and scope rules

How they are used, so nothing gets skimmed and nothing gets read in full every time:

1. **Once: the index.** Every source above read in full, one line per tactic or principle in
   `CS2_REFERENCE_INDEX.md`: its name, what it does, when it fits and where it lives. A script checks that
   every heading in every source has a line, so coverage is proven rather than claimed.
2. **Before each section: the pull.** Read the index, pick the entries that fit what the section has to
   do, open those in full and bring them into the conversation as moves we could use. Different sections
   will pull different things.
3. **While drafting and at review: the check.** The draft notes which moves it uses. Review checks it
   against those entries and the protocol's final checks.

## The loop, per section

1. **Open.** Claude names the section and what it covers in one or two lines, and brings the reference
   pull for it.
2. **Talk it through.** Chadwick talks about it conversationally: what happened, what was decided,
   what connects to what. Claude asks questions and goes and finds the things he mentions in the
   archive, Figma, Notion or the record, and brings back what it found with where it found it.
3. **Draft.** Claude writes the section from the conversation. Every claim traces to a source.
   Nothing is asserted that came from neither Chadwick nor a source.
4. **Voice pass.** Run `humanizer` over the draft, then `no-ai-slop` in detect mode as a second
   check. Both live in `.claude/skills/` in this repo so they work on any account. Then the house
   copy rules: no em or en dashes, no hyphen pair as a dash, no Oxford commas, sentence case.
5. **Layout and visuals.** Pick the template that fits what the section has to show. The large image
   slots take the real desktop screens. The smaller slots carry the map state for that section or a
   diagram that makes the decision clear. Claude builds the visuals and the section in Figma, on the
   portfolio grid. Screens are read from the Mondai Figma, never redrawn from memory.
6. **Review.** Chadwick reads it. Changes go back to step 2 or 3, not patched on top.
7. **Save.** On approval, the section goes in `draft/`, the status table below is updated and the
   change is committed and pushed to GitHub in the same step. Nothing approved lives only on one
   machine.

A section is done when its copy, layout and visuals are all approved. No second pass.

Also commit and push at the end of every working session, even mid section, with the status table
saying where the conversation stopped.

## Order

The outline. Worked top to bottom. "Map, as planned" is the 28 Aug idea for that section and can change when the section is worked.

| # | Section | What the reader comes away with | Map, as planned | Status |
|---|---|---|---|---|
| 1 | Where it started | What he walked into and the problems the framework had to solve. The route is stated here as given, not as its own section. Problems that belong to a later section are only named here | The route and the week, simplest form | Provisional draft, `draft/CS2-rungs-0-2.md` |
| 2 | The week | The route arrives a week at a time, as Action Items in the Action Hub. One line that the content is generated | Week brackets added | Provisional draft, `draft/CS2-rung-3.md` |
| 3 | Capacity and target date | How much each week holds comes from the time the user says they have | Weeks sized | Not started |
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
