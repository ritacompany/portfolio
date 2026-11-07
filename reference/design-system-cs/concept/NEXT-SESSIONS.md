# Design system CS: briefs for the next two sessions

6 Nov 2026, from the concept chat, which is too heavy to carry on (his call). Each brief stands on its
own. Both write in the portfolio repo (`reference/design-system-cs/`), never quote Mondai sources
there (the repo is public; `reference/cs2/CS2_PROCESS.md`, Storage), write gates first with unlazy,
run verify-claims on every claim before it reaches him, and end with one message to him.

## Where things stand

- Research done: what hiring managers want and the AI design system landscape
  (`research_notes/Design system case study hooks/`); 42 case studies mapped
  (`reports/Design system portfolio case studies.md`, a map, not models: about 30% confidence they
  are good examples); the Mondai session's ranked eight to read first (Mondai repo,
  `design-system-ai/reports/Design system case study examples.md`).
- Material: `concept/DECISION-INVENTORY.md` (19 decisions, whose work each served). `CONCEPT.md`
  is parked except its research sections.
- His direction, 6 Nov:
  - One case study, short: five or six sections, under ten minutes. Get it up now and update it as
    the system develops; a "still imperfect" section carries what is not done.
  - The working outline: opening with an image and before and after numbers; the problem (a system
    only its author could use well), counted; foundations made readable (tokens, grid and spacing,
    components and states); library and usage rules (what, and how and when, for people and
    agents); making it scale (agents build from the library, checks, the harness tested); still
    imperfect.
  - His voice: written as a design and systems thinker, which is how he works; calling himself a
    systems designer in some sense is fine.
  - Numbers he means: efficiency and outcomes, dug out of the data that exists, not only library
    counts.
  - The case study tactics bank (`docs/about-source/case_study_tactics.html`, 49 tactics) is used
    throughout, not only at the end.

## Session 1: "Design system CS: reference board"

Goal: a reference board of good design system case studies, each tied to a section of his outline.

1. Define good before collecting. A page counts only if it meets three or more: recommended by a
   reviewer or curator; lead level or above; the system shipped; a decision told with its cost; a
   number with a starting point; visuals that carry the story.
2. Sources: his Wall of Portfolios links (wallofportfolios.in, the case studies wall and its design
   system tab: Zoho Show, local design libraries, TV UI infra, Ashrof Shecki's reusable components,
   Blade, Isabella Duffner, Siddhartha Gudapati, Rama Krishna Bahara); Case Study Club's design
   system category and the article he found there plus every case study it names (Figma Ninja base
   components, Toptal, Zomato, Plasma: all 403 before, so try archived copies); Michael's case study
   when he shares it; the Mondai session's ranked eight. Build on that report, do not repeat it.
3. Look at the pages: screenshot each one with the preinstalled Chromium (Playwright), since how
   they show the system is half the question and no earlier round saw images.
4. Score each kept page against the tactics bank: which tactics it uses well (ids, for example t06
   answer first, t12 before and after, t29 the wrong turn) and which anti tactics it falls into.
5. Output `reference/design-system-cs/REFERENCE-BOARD.md`: per section of his outline, the two or
   three pages to borrow from, what exactly to borrow (structure, a visual, a line) and the tactic
   behind it. His notes from Wall of Portfolios go in as evidence: the library and usage guideline
   split, render and development time numbers, a tokens section, an executive summary, building a
   foundation for the future.

## Session 2: "Design system CS: efficiency numbers"

Goal: every honest efficiency and outcome number the records can support, each with a baseline,
a method and its source.

1. Sources in the Mondai repo: `design-system-ai/evidence/timing/` (working hours per feature from
   chat transcripts, `per_feature.json`), `design-system-ai/EVIDENCE.md`, screens per sprint from
   the MVP file, the Peer Connect baseline (`process/PROCESS-REVIEW.md`), each sprint's folder and
   close out audit, the hook logs (`node ops/hooks/log-summary.mjs`), his review rounds and the
   share of review comments that repeat an earlier one, `ops/check-ledger.md`, git history.
2. Candidates to measure, not assume: hours and calendar days per feature from strategy to handoff
   across every sprint since Peer Connect (same units as its baseline); screens per working hour;
   fix and handoff time against build time per sprint; review rounds and repeat comments per round;
   agent mistakes caught by checks before he saw them; library before and after counts (buttons 33
   widths to two, 800 raw links to 677 roles, code names 0 of 235 to 421 of 424, descriptions 4 of
   94 to 101 of 107, agent test mean 31 mistakes a build), each rechecked at its source.
3. Output `reference/design-system-cs/NUMBERS.md`: each number with what it measures, the
   baseline, the method, the source, a confidence mark (CONFIRMED, ESTIMATE) and which outline
   section it serves. Numbers with no baseline are listed as such, never dressed up.
4. Hand the next sprint's run (the after numbers he is waiting on) to the evidence chat, which owns
   the agent test.

## After both

The writing session drafts the six sections in his voice from the board and the numbers, following
the protocol (frame, decisions, evidence, sentences), with "still imperfect" written to be updated.
