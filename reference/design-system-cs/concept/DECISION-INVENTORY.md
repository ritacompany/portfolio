# Design system CS: decision inventory

23 Oct 2026. Material first, story last. His call on 23 Oct: no direction is set for the whole case
study yet; the framework CS learned that a story picked first and filled in fails
(`reference/cs2/CS2_PROCESS.md`, The idea). This file is the material the story will be found from
after the next pass. `CONCEPT.md` beside it is parked: its research (sections 1 to 3) stands, its
three concepts are not the direction.

Each row is a design system decision with what prompted it and whose work it serves. "Serves" is a
reading, not a frame: P is the people using the product, T is the team building from the system
(designers and developers), A is agents building from it. A row can serve all three.

Sources: the Mondai decision log (`mondai/reference/DECISIONS.md` in the Mondai repo, by date and
title) and `reference/design-system-cs/SOURCES.md` here. Quotes stay in Mondai. "Decided by" is
CONFIRMED where the log names him, ASSUMED where it does not.

## Foundations

| Date | Decision | What prompted it | Serves | Decided by | Missing for the case study |
| --- | --- | --- | --- | --- | --- |
| Sep 2024 | A temporary system so three designers stay consistent under a time crunch; brutalist direction written up so separate features cohere | Starting from a CTA button, a palette, four brand images and two typefaces (`ANSWERS.md` item 4) | T | CONFIRMED (`SOURCES.md` section 1) | Where the brutalist direction came from (GAPS 5) |
| Aug 2025 | The system moves from a page in the design board to its own shared library file | Developers to use components directly from it | T | CONFIRMED (`SOURCES.md` section 4) | Whether developers did (GAPS 10) |
| 2 Oct 2026 | Dark only, one mode | The 1 Oct audit's open question; developers set up one theme | T | CONFIRMED | None |
| 19 Aug 2026 | Gold is not part of the system | A colour that never existed spread because it was written down and every later session repeated it | P, A | ASSUMED | Who caught it |
| May 2026 | Colour carries meaning (magenta for rollover, not an alert); the mono and Heebo label split; sentence case | Brand and voice reasoning (`reference/cs2/reasoning/design-system-and-voice.md`, framework CS owns it) | P | CONFIRMED | Scope: shared with the framework CS, note and leave |

## Layout: grid and spacing

| Date | Decision | What prompted it | Serves | Decided by | Missing |
| --- | --- | --- | --- | --- | --- |
| 23 Sep 2026 | One 12 column grid on the core frame; margins land on column edges | Earlier grid values had come from AI sessions, not from him, and were removed so they could not return | P, T, A | ASSUMED (no Decided by line) | The before screen |
| 25 to 27 Sep 2026 | Spacing between areas: three revisions in two days, ending at 32, 40 or 48 by the gap inside | He judged eight screens laid out at 48 against 64 | P | CONFIRMED (Why line names him) | Before and after previews exist (`process/spacing-rules/previews/`) |
| 2 Oct 2026 | Spacing roles: the gaps in the ladders are filled ("A for 1" of three options) | 800 screen links pointed at the raw scale because the ladder had no step for them | T, A | CONFIRMED | None |
| 7 Oct 2026 | Shell grid for pages with no sidebar, built the same way as the core frame | The shell was the one layer that changed between page types | P, T | CONFIRMED | None |

## Components and states

| Date | Decision | What prompted it | Serves | Decided by | Missing |
| --- | --- | --- | --- | --- | --- |
| 25 Sep 2026 | Fill by default; buttons one or two columns wide | 236 buttons in 33 widths; screens built through the Figma plugin hugged by default (80 of 145 buttons on one page) | P, T, A | CONFIRMED (approval recorded, `SOURCES.md` section 3) | None |
| 26 Sep 2026 | Small labels only sit under a header | A read of every MVP page showed the finished pages already worked this way; two features did not | P | ASSUMED | None |
| 30 Sep 2026 | Input states: one outline ladder, no filled state; states as tokens named for the job | A filled state was covering for value text that looked like placeholder text | P, T | CONFIRMED (he simplified the inputs himself) | None |
| 2 and 6 Oct 2026 | Component or not: acted on elements get states; repetition never makes a component | An AI session's redesign marked 41 element types as new components and he had to backtrack | T, A | CONFIRMED | None |
| 9 and 10 Oct 2026 | Date numbers get their own Bold style; date box colours fixed as a pattern | Medium numbers read weak and he was kerning by hand on every screen | P | CONFIRMED | None |

## The system with its builders

| Date | What happened | Serves | Evidence | Missing |
| --- | --- | --- | --- | --- |
| Jul 2025 | Designers were not using the system correctly; he ran a workshop on components, variables and auto layout | T | `SOURCES.md` section 4 | What changed after (GAPS 11) |
| Oct 2025 | Cleaning up other designers' screens: images in place of system icons, no auto layout | T | `SOURCES.md` section 1 | None |
| Mar 2026 | The whole system fed to an AI as a PDF to write screen prompts; it still needed a designer's eye | A | Mondai `EVIDENCE.md`, act one | None |
| 20 Sep 2026 | Agent screens passed every check written for them and were wrong; checks rebuilt to read the real file | A | Mondai `EVIDENCE.md`, act two | None |
| 22 Oct 2026 | Agent usability test, before: three runs, mean 31 mistakes a build; seven library defects | A | Mondai `evidence/AGENT-TEST-BEFORE.md` | The after run (evidence chat) |

## What the inventory already shows

Read, not decided: agents are not a separate chapter in this material. Several of his system
decisions were prompted by what AI did to the system (the grid values, gold, buttons hugging by
default, components multiplying), alongside decisions prompted by people using the product and by
the team. If the story is found from these rows after the next pass, the AI is likely to sit inside
the system's decisions rather than on top of them, without anyone setting that direction first.

## The next pass

1. The design system work still running (library pages, tokens, the defect fixes) adds rows here as
   decisions land; the library and tokens chats log them in DECISIONS.md and this file reads them.
2. Him: GAPS 5, 10 and 11, and which rows he would defend first in an interview (GAPS 9).
3. Then the protocol in order: frame, the three to five decisions, evidence, sentences.
