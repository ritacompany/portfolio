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

1. Content sections, in this order unless he picks another: colour; layout and components; proving
   the checks; the agent test and what the system changed for agents. Each runs the framework CS loop: he names the block
   and what it needs, three versions per round that differ in structure, his comments, revise.
2. The story: what the finished sections argue, found from them, then the frame rewritten.
3. The opening (hero, with the system shown whole) and the ending (still imperfect), last.

- 23 Nov 2026: the outline reshaped to the content research (`../research/CONTENT.md`): colour
  decisions replace a tokens section; the AI part leads with the failed checks and the agent test;
  the pipeline shrinks to one diagram. Decided by: Chadwick, in chat on 23 Nov.

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

### 2. Colour: decided by purpose

- **Job.** His colour decisions and how he knows they held. Not an explanation of token tiers: the
  raw value to role to screen chain is one labelled visual with no paragraph of its own (research,
  `../research/CONTENT.md`, Tokens or colour).
- **Decisions.** One token per job from a usage audit of every colour (N30); the 11 sheets ruled by
  purpose, never by shared value (21 Oct, N31); rules that turn feel into arithmetic (pressed one step
  lighter than hover in dark mode; an icon one step darker than its text); roles only in the pickers
  and three roles renamed for what they paint (22 Oct, N32); gold is not part of the system (19 Aug);
  dark only as a one line scope cut (2 Oct).
- **Visual.** Two or three of the 11 sheets with his ruling as the caption (Mondai
  `process/token-picker/colour-by-job/sheets/`); the one labelled chain visual, to make.
- **Numbers.** N30, N31, N32, N24. N23 stays out until the token audit reading is confirmed.
- **Proof line.** The agent test: every colour agents placed sat on a published role, while
  Text/Display was read as a size (N17, scoped to layers the agents made).
- **Tactic.** t24 refute the rejected option (match by value), with t11 precision with its derivation.

### 3. Layout and components

- **Decisions, in rank order.** A component is decided by interaction, never repetition, with the
  backtrack that forced it (2 and 6 Oct); buttons fill by default at one or two columns, from 236
  buttons in 33 widths (25 Sep); spacing judged on eight real screens, then roles with the ladder
  gaps filled (25 to 27 Sep, 2 Oct); inputs on one outline ladder, no filled state (30 Sep); one 12
  column grid as one line and one labelled screen (23 Sep); documentation as one number (N22).
- **Visual.** The button audit spread beside the rule; spacing before and after previews (Mondai
  `process/spacing-rules/previews/`); one input image; the grid on a real screen (Mondai
  `process/nosidebar-grid/renders/N-signup-grid.png`).
- **Numbers.** N19 (no after count; do not claim a recount), N20, N22.
- **Tactic.** t21 name what it cost.

## Part two: scaling it with AI

### 4. Proving the checks: when a pass means right

- **Job.** The AI part carries its weight through tests and failures, not through tooling: skills,
  MCP and pipeline diagrams are table stakes in 2026 (19 of 21 public systems ship an agent skill;
  research, Scaling with AI).
- **Decisions, in rank order.** 20 Sep: checks passed screens that were wrong, and were rebuilt to
  read the real file; checks count only after catching planted mistakes (N14, N15); the screen
  critic calibrated on frames he had already judged (N16).
- **Visual.** The 20 Sep screen with the wrong buttons beside the system's buttons (to capture);
  the planted mistake catch table.
- **Tactic.** t29 the wrong turn and the signal missed.

### 5. The agent test and what the system changed for agents

- **Decisions.** Fresh agents rebuild a known screen from the library alone (N17, before); what the
  system changed so agents could read it, told as system decisions: code names 0 of 235 to 425 of 431
  (N21), buttons that hugged under the plugin, grid values that came from AI. The pipeline as one
  real diagram with its detours and the overgrowth cut (N28, N29, N18), kept small.
- **Visual.** The settled screen beside an agent's rebuild, mistakes marked (Mondai
  `design-system-ai/evidence/agent-test/reference-M4.1.png` and `build-run1.png`); the pipeline
  diagram, to make.
- **Proof.** N9 (faults handed off 596 to 0 with its method), N1 to N6 (active days), N12 and N13
  (what did not move).
- **Missing.** The agent test's after run: without it this part has a before and no result.
- **Tactic.** t12 before and after.

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
2. The first content block: colour, round 1, three versions. Capture its visuals.
3. Section 1's Figma spread waits for the opening, at the end.
