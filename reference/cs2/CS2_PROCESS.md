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
  rungs 2, 3, 5 and 6) and its "not a task to build the layout" scope note are replaced by step 5 below.
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

## Keeping the whole framework in view

The goal, his, 14 Oct: at every point the reader knows which piece of the framework they are in and how
it connects to the pieces they already have. The old way, one diagram repeated in every section with a
piece added each time, is dropped. The writing carries the connection instead:

- The whole framework is drawn once, in one figure, where the story first needs it.
- Each section's first block says what the reader already has and what this piece adds to it. Its
  last block hands over to the question the next section answers.
- A route diagram appears only where a block's claim is about the route or how its pieces connect,
  and its slot says what that claim needs from it. The build up plan in `CS2_COMPREHENSION.md` is
  retired.

## Layouts

Layout pieces are the families in `Case study layouts` (Portfolio Design file, page `VC`, node
3461:5685), decoded by name and slot in `LEDGER.md`, for example TextAnd1Image layout 1. Step 5 plans with
them by name and slot only. Whatever sits in their slots now (images, diagrams, text) is scaffold and
never carries into CS2. Neither does anything from another case study's content or signature forms.
How a block is composed follows the Haven case study: eyebrow, claim headline, a figure only when
step 5 finds the claim needs one, one short body. The HTML in `build/` is not a layout source. Where and how sections get built is step 8.

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
- **Designed versus inherited is for accuracy, never the subject of copy.** Never present inherited
  structure as his design, or archive reasoning as his argument unless the record shows him making it
  (`reasoning/pathways-and-hierarchy.md` section 6). Copy never says who built what.
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
  nothing decided was how much of the route a week should hold. The carry forward mechanic is his from 9 Mar
  2025 (ChatGPT export); who designed the March 2026 modal itself is still open.
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
   finished, draft and list what the talk has not covered yet. Page copy goes in `copy/section-N.md`
   (first line `Section: N`), written as blocks: each `## ` block holds an `Eyebrow:` line, a
   `Headline:` line that states the claim, optional `Card:` lines (label | title | one or two sentences)
   that are text items set beside the body, and one body paragraph of at most 70 words. No figure text:
   labels and captions are written in step 5, only once a figure is chosen, so the copy never decides
   that a block has a figure. The eyebrow names the topic and never repeats the headline. Notes and sources stay in the draft file. A hook refuses any copy save
   that breaks the copy rules or the block shape, and Figma takes its text from the copy file only.
4. **Voice pass.** Run `humanizer` over the draft, then `no-ai-slop` in detect mode as a second
   check. Both live in `.claude/skills/` in this repo so they work on any account. Sentence case.
   Names, quotes, dashes, Oxford commas and early product terms are caught by `check-copy.mjs`.
5. **Message plan, then slot plan.** Two passes, message first. Rewritten 14 Oct after a trial of three
   setups in fresh runs (`fixes/2026-10-14-cs2-visual-before-message.md`); the old single pass picked
   figures and layout together. Follows the voice pass without waiting for copy approval, so copy and
   layout are reviewed together. One block in the copy file is one beat. Forms and references are in
   `reports/Visual storytelling per beat.md`.

   Pass 1 writes `message/section-N.md`: first line `Section: N`, then a `## ` block per copy block, with
   no layout piece named anywhere:
   - `- Claim:` the headline as a claim. Read in order, the claims tell the section on their own.
   - `- What the reader has to see:` to believe it, in one sentence.
   - `- Still missing from the copy:` read the eyebrow, headline, cards and body as plain text and name
     what the reader still cannot see or believe. If nothing can be named, write `nothing` and the block
     is text only.
   - `- Figure count:` 0 when nothing is missing, otherwise 1, or 2 when the first figure and the copy
     together still leave a named part unproven.
   - `- Figure N:` one line per figure: what it shows, where it comes from (a real Mondai screen he picks,
     or a new figure in words) and `Proves:` which part of the claim. A real screen beats a new diagram.
   - `- Labels:` the words that sit on the figure, only when there is one.

   Pass 2 writes `layout/section-N.md` from the message plan and the `LEDGER.md` decoder: first line
   `Section: N`, then one table `| Layout piece | Slot | What goes in it | Why |`, a row per slot, each
   "What goes in it" starting `Block N`. A block's image slots equal its figure count.

   Fewest figures wins over variety. Two text only blocks in a row are set apart by layout piece or width,
   never by adding a figure. No form another case study leans on (Haven has the two by two). Draw the
   difference, not both whole states. Label every arrow or leave it out. A single number is a stat.
   Nothing the reader needs lives in a hover, a later carousel slide or an animation.

   Enforced by the guard hook on every save, not by the session: the message plan's answers must agree
   (nothing missing means no figure, one figure line per figure, each saying what it proves); a slot plan
   needs a passing message plan and matching image slots; a figure of the Pathways as a row or line needs
   his line `- Section N block M: route figure` in `APPROVALS.md`, a file only he writes; and a slot plan
   needs a PASS from the fewer figures review. To get one, run `check-figures-review.mjs` in prompt mode for
   the section (its header comment shows how) and give its output word for word to a foreground sub-agent; the hook records the verdict
   only if the prompt matches exactly, and only the hook can write it. Step 5 ends with the two files: no visuals and no Figma. A correction goes back
   to that block's claim in pass 1.

   Imagery is his to choose (corrected 2026-10-08). An image slot says what could go there and stays
   unfilled until he picks. Real screens are read from the Mondai Figma, never redrawn from memory.
6. **Review pack.** One per section, sent once, his decision 16 Oct: the copy, a before and after
   wireframe shown in the chat (never Figma) and one list of every call Claude made, each with its pick
   and reason. He replies once and flags only what he disagrees with; a line he leaves stands. Claude
   decides wording trims, layout picks and anything inside a direction he has set, and lists them instead
   of asking. At most one question per pack, and only for what he alone holds: what existed, taste, what
   he is comfortable claiming. Small fixes are made in place; changes to what the section says go back to
   step 2 or 3.
7. **Save.** The section file lives in `draft/CS2-section-N.md` from its first draft, with a status line
   at the top. On approval, the status table is updated and the change is committed and pushed to
   GitHub in the same step. Nothing approved lives only on one machine.

Status values, used in the table and the section file: talking, drafted, built, approved. Where a
section stopped goes in a "Where section N stopped" list under its notes, in loop order.

When saving, the session also updates anything the work proved wrong: a starting note, a stale line in the section file. Evidence overrides notes.

A section is done when its copy, layout and visuals are all approved. No second pass.

Also commit and push at the end of every working session, even mid section, with the status table
saying where the conversation stopped.

8. **Build.** Only when he says to build a section; a hook refuses Figma writes until his latest message does. Changed 16 Oct,
   his call: sections are built straight into `WIP Mondai framework case study` (4269:9433) in the Portfolio
   Design file, under its Background block and in reading order, one after another. The old Workstation
   frames (section 1 4228:6859, section 2 4228:6731) are superseded. Format and styling follow the Haven
   case study (3300:12596), the finished one; the leadership case study is out of date and is not a
   reference. Haven gives the block grammar and type, never its content or signature forms. The Background
   block's job is the person and their situation; its final words are written with the intro (section 9),
   and it never states the problem or the thesis, which section 1 opens with. Text comes from the copy
   file and slots from the approved slot plan, body text no wider than 7 columns.

## Order

The outline. Worked top to bottom.

| # | Section | What the reader comes away with | Status |
|---|---|---|---|
| 1 | Where it started | What he walked into and the problems the framework had to solve. The route is stated here as given, not as its own section. Problems that belong to a later section are only named here | Copy and slot plan approved 16 Oct from the review pack: all three blocks text only (`copy/section-1.md`, `message/section-1.md`, `layout/section-1.md`). Next: rebuild Figma 4228:6859 from them when he says build, then he approves the build |
| 2 | The week | The route arrives a week at a time, as Action Items in the Action Hub. One line that the content is generated | Built 14 Oct, not yet reviewed (an approval on 14 Oct was sent by mistake and withdrawn). Copy Draft 5 in `copy/section-2.md` with his two wording fixes; notes in `draft/CS2-section-2.md`. Figma 4228:6731 built from the copy file on the two beat list. Next: his review of the build and his image pick for the Action Hub screen slot. What first led to the week: his 9 Mar 2025 notes, found in the ChatGPT export (`~/Documents/CS2-research/chatgpt-findings.md`) |
| 3 | Capacity and target date | How much each week holds comes from the time the user says they have | Talking, opened 8 Oct, reopened 14 Oct, `draft/CS2-section-3.md`. Three questions for him |
| 4 | Pace | The system checks reality against the estimate without judging | Not started |
| 5 | Scheduling and rollover | The calendar is where it nearly broke | Not started |
| 6 | Recalibration | Falling behind cannot mean failing | Not started |
| 7 | The generated content | None of the words are written by a person | Not started |
| 8 | Handoff and the team | What it took for other people to hold it | Not started |
| 9 | Intro | Who it is for and the situation they are in. Written last | Last |
| 10 | The story | What ties it together, found from the sections. Written last | Last |

Every block has an eyebrow, written for the reader. Section names are working labels and are not reused as eyebrows.

"What the reader comes away with" is the job of the section, not its content. The content comes from
the conversation. Every section gets a layout from the templates and the real screens. Chadwick
can reorder any of it. Where a section stopped mid conversation is noted in its status.
