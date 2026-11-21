# Design system CS: outline 2 and its material

21 Nov 2026. Outline 2 replaces draft 1's outline (his call, 21 Nov, below). This file is protocol
steps 2 and 3: for each section, the decisions, the visual, the numbers and the one tactic. No
sentences yet. Nothing here quotes Mondai sources or him: paths point into the Mondai repo; numbers
are ids in `../NUMBERS.md`; decisions are rows in `../concept/DECISION-INVENTORY.md`.

## Decided by him

- 21 Nov 2026: outline 2. Part one shows the system and its craft apart from AI (the visual system,
  how the tokens are set up, grid, spacing and components); part two is scaling it with AI, given
  more weight than draft 1 gave it. Headings name the subject, never the solution (his rule, logged
  as RULE against t36 in `reference/cs2/review-2026-11-07/tactics/bank-walk.md`). Decided by:
  Chadwick, in chat on 21 Nov, after saying draft 1's direction was off, too broad and
  light on AI.

- 21 Nov 2026, later: content first, story last, the way the framework CS is written
  (`reference/cs2/WORKING_LOOP.md`). The content sections (tokens, layout and components, setting
  agents up, proving it works) are written first, block by block, from what he wants to show. The
  story, the opening (hero) and the ending are found and written last, around that content. The frame
  below is a working guess until then, not a brief. Decided by: Chadwick, in chat on 21 Nov.

## Order of work

1. Content sections, in this order unless he picks another: tokens; layout and components; setting
   agents up to build from it; proving it works. Each runs the framework CS loop: he names the block
   and what it needs, three versions per round that differ in structure, his comments, revise.
2. The story: what the finished sections argue, found from them, then the frame rewritten.
3. The opening (hero, with the system shown whole) and the ending (still imperfect), last.

## The frame (working, rewritten after the content sections)

1. **Reader.** A hiring manager for a senior or lead product design role, deciding in a scan whether
   he can be trusted with a system other people and agents build from.
2. **Argument.** Agents build well only from a system crafted well, so making it ready for AI meant
   making the system itself better, not adding documents on top. Contestable: most AI design system
   accounts treat AI readiness as a layer (MCP, agent files, design.md).
3. **Repeat.** He built the system properly first (tokens, grid, components), then set agents up to
   build from it and tested whether they could.
4. **Stake.** Every screen built off the system lands as rework if the system is wrong; once agents
   build, a wrong system fails with every check green.

## Part one: the system and its craft

### 1. Opening: the system itself (written last)

- **Job.** Show the system before any story; one line on where it started (Sep 2024, a button, a
  palette, four brand images, two typefaces) and what changed in 2026.
- **Visual.** To capture from the published library file in Figma: a spread of the library (colour
  roles, type, buttons, inputs) and one real product screen built from it. Nothing in either repo
  shows the system whole yet.
- **Numbers.** One before and after pair at most here: N22 or N21 (library readable), N9 (faults
  handed off). Pick at the sentences step.
- **Tactic.** t06 answer first, with t17 the nut graf.
- **Missing.** Whether Mondai frames can be shown publicly (`../GAPS.md` item 15).

### 2. Tokens: how the setup works

- **Decisions.** Raw values hidden as primitives, published roles named for their job, collections
  split by job (Mondai `process/token-picker/MAPPING.md`, the 14 Oct structure); dark only, one mode
  (inventory, 2 Oct); gold is not part of the system (inventory, 19 Aug).
- **Visual.** To make: the chain from a raw value to a named role to a layer on a real screen.
  Existing before and after of one component's bindings: Mondai
  `process/token-picker/before-after/before-inline-notification.png` and
  `after-inline-notification.png`.
- **Numbers.** N23 (collections, published count, bindings to retiring variables), N21 (code names),
  N24 (text styles bound to size variables).
- **Tactic.** t24 refute the rejected option: one mixed list of raw values and roles, and why it lost.
- **Caution.** N23 and Mondai `design-system-ai/EVIDENCE.md` hold the 14 Oct restructure back:
  he disputed it on 15 Oct, and the re-audit found the variables match the 14 Oct snapshot. He then
  published the library on 20 Oct (Mondai `design-system-plan/PLAN.md`, Update 21 Oct) and the live
  read on 6 Nov shows the 9 collections. Read as settled by the publish (ASSUMED); confirm with the
  tokens chat's record before this section's sentences.

### 3. Layout and components

- **Decisions.** One 12 column grid with margins on column edges (23 Sep); spacing between areas
  judged on eight real screens (25 to 27 Sep); spacing roles with the ladder gaps filled (2 Oct);
  buttons fill by default, one or two columns wide (25 Sep); inputs on one outline ladder with
  states named for the job (30 Sep); a component is decided by interaction, never repetition
  (2 and 6 Oct).
- **Visual.** Spacing roles labelled on a real screen: from Mondai `process/spacing-rules/previews/`
  (48 against 64 sets) and `process/nosidebar-grid/renders/N-signup-grid.png` for the grid. A
  component page with its usage note beside the variant grid: capture from Figma.
- **Numbers.** N19 (33 widths across 236 buttons to the two width rule), N20 (raw spacing links moved
  onto roles), N22 (descriptions).
- **Tactic.** t21 name what it cost (fewer components means more written rules; every desktop layout
  touched by the grid).

## Part two: scaling it with AI

### 4. Setting agents up to build from it

- **Decisions.** The system fed to an AI as a document still needed a designer's eye (Mar 2026);
  the work moved to skills and agents that carry the system's rules: the design system page skill
  and its page builder agent (Mondai `.claude/skills/design-system-page/SKILL.md`,
  `.claude/agents/ds-page-builder.md`), the five stage pipeline from strategy doc to handoff
  (`.claude/skills/new-work/SKILL.md`), the screen critic run before he sees a round
  (`.claude/agents/screen-critic.md`). The cut when the process overgrew (N29).
- **Visual.** To make: the pipeline as his real stages, detours included (t46 warns against a
  textbook diagram). One agent build in Figma: N18's three screens.
- **Numbers.** N18 (three screens in 9.7 minutes), N28 (thirteen agents at once: what failed), N29.
- **Tactic.** t14 clues before the reveal: what the system had to change so agents could read it,
  shown before the pipeline.

### 5. Proving it works

- **Decisions.** 20 Sep: agent screens passed every check and were wrong; checks rebuilt to read the
  real file. A check counts only after it catches planted mistakes (Mondai
  `.claude/skills/vaccinate/SKILL.md`, `ops/check-ledger.md`). The agent usability test (Mondai
  `design-system-ai/evidence/AGENT-TEST-BEFORE.md`).
- **Visual.** The settled screen beside an agent's rebuild with mistakes marked: Mondai
  `design-system-ai/evidence/agent-test/reference-M4.1.png` and `build-run1.png`. The sprint table.
- **Numbers.** N17 (about 31 mistakes a build, before), N9 (faults handed off 596 to 0), N14 and N15
  (checks proven), N16 (the screen critic), N1 to N6 (time per feature, ESTIMATE), N11.
- **Tactic.** t29 the wrong turn and the signal missed, with t12 before and after.
- **Missing.** The agent test's after run (owned by the evidence chat in Mondai).

### 6. Ending: still imperfect (written last)

- **Items.** Component wiring (N25), the after run, the disputed token audit if still open, the grid
  audit's 27 of 33 (N15).
- **Visual.** None; a dated list.
- **Tactic.** t28 the limitations paragraph.

## Scope

Colour meaning, the mono and Heebo label split and sentence case belong to the framework CS; the
team and the operation belong to the leadership CS. The pipeline appears here only as what the
system makes possible.

## Next

1. Confirm the token audit reading (section 2 caution) against the tokens chat's record.
2. The first content block: tokens, from what he wants it to show. Capture its visuals from Figma.
3. Section 1's Figma spread waits for the opening, at the end.
