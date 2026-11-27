# Design system CS: how to get the most out of the reference sets

24 Nov 2026. A brief for the organizer session, the one that runs this. Nothing in this file has been
done yet; it is the plan. Nothing here quotes a reference page or a Mondai source: this repo is public,
so quotes and screens stay in the private archives.

## What this is for

Twenty design system case studies are, or will be, captured: the ten in `EXAMPLES.md` and `STUDY.md`
(private archive: https://claude.ai/artifact/Q5CKQKpkyB9bEWRXdpdP7s) and ten more chosen for how they
show the system visually (the visual set, being found in a separate session; it lands next to these
files as `VISUAL-EXAMPLES.md` and `VISUAL-STUDY.md`). `STUDY.md` already says what each page does on
its own. What nobody has done is hold the set against this case study. That comparison is the job:
what CS3 has, what it is missing, where it is weaker than the best of the set, and what to borrow.

Chadwick's stated reasons, 24 Nov, in order of what he struggles with most:

1. Audience and tone. Agents writing CS3 keep missing who reads it and how it should sound. The
   references are the fix: real senior pages to calibrate against, not a description of a voice.
2. Messaging and the organisation of information: what goes first, the order, how each section
   carries its point.
3. Which references match what CS3 is doing, and whether a closer set needs finding.
4. What structure can be taken.
5. Visuals: how the system is shown, and how numbers are shown (data visualisation).

## The role to take

Managing editor of a feature issue, judging every page as the hiring manager would. The managing
editor assigns each reader a lens, holds one standard across all of them, decides what runs and
sends the hard calls to the writer (Chadwick) with a pick. The hiring manager (a head of design or
design systems lead filling a senior or lead role) is the reader every finding is judged against:
would this make them read on, and would it make them trust him with a system other people and agents
build from.

Why not a researcher: the research is done. Why not a content strategist: that role plans content
that does not exist yet, and most of the value here is in comparing against content that does.

## What "our case study" means for the comparison

CS3 is mid build. Compare against what exists, never against draft 1 (superseded 21 Nov):

- `../../outline-2/MATERIAL.md`: outline 2, six sections, the working frame (reader, argument,
  repeat, stake). The frame is a working guess until the content sections are done.
- `../../versions/colour.md`: colour round 1, three versions. The only section with sentences.
- `../../NUMBERS.md`: every number with its baseline, method and confidence.
- `../../concept/DECISION-INVENTORY.md`: the decisions available to tell.
- `../CONTENT.md`: what a senior design system case study puts on the page in 2026.
- `research_notes/Design system case study hooks/hiring-signals-2026.md`: what hiring managers
  look for.

Step 0 of the session writes one page, `BASELINE.md`, that says in plain words what CS3 is right
now: its reader, its argument, its order, what each section will show, its numbers and what is
still missing. Every lens compares against that page, so they all compare against the same thing.

## The rubric: nine dimensions, one standard

Every lens scores against these. For each: what the best page in the set does, what CS3 does, the
gap.

1. **Audience.** Who the page is plainly written for, and what that reader learns on the first screen.
2. **Voice.** First person ownership, register, how a decision is stated, how a limit is stated,
   sentence length, jargon level, how much is explained versus assumed.
3. **Opening.** What sits on the first screen: claim, numbers, image, role card, at a glance card.
4. **Order.** The sequence of sections and why that order works; where the problem, the decisions,
   the proof and the limits sit.
5. **Decisions.** Whether a decision is shown with the option rejected and what it cost.
6. **Numbers.** Baseline, method, stated limits, and how they are set (tiles, charts, inline).
7. **Visuals.** What each image proves, how it is captioned, how dense, how it sits on the page.
8. **AI and agents.** AI as a reader of the system, a tool on the system or a layer on top; whether
   anything is measured.
9. **Honesty and pace.** What is still wrong, written down; length and how a long page stays findable.

## How the work splits

By lens across the whole set, never by page. `STUDY.md` is already the per page pass; repeating it
would cost usage and add nothing. A lens agent reads every page through one or two dimensions, which
is what produces comparisons.

All lens agents run on the main model (this is judgment). Mechanical extraction, such as pulling every
first screen or building a section index of a long page, runs on Sonnet first and is handed in.

| Lens | Dimensions | Starts | Main references |
| --- | --- | --- | --- |
| A. Audience and voice | 1, 2 | Now | All ten; CASSI, Anorbank, Musterhall and Wise for register |
| B. Order and organisation | 3, 4, 9 (pace) | Now | All ten; IndiGo rail, Musterhall card, Fortune 200 phases |
| C. Decisions and numbers | 5, 6, 9 (honesty) | Now | CASSI, Fortune 200, Anorbank, IndiGo |
| D. AI fit and closeness | 8, plus how close each page is to CS3 | Now | WellSky, Diorama, MCP audit; Usborne from the reference board |
| E. Visuals and data | 7, and 6 for how numbers are drawn | When the visual set lands | All twenty; Wise, Musterhall, Fortune 200 first |

Each lens returns one file in `lenses/`: per dimension, the two or three best moves in the set
(paraphrased here; exact lines go to the private archive), what CS3 has, what CS3 lacks, what CS3 does
worse, and for each gap the reference and the exact move to borrow, tied to a section of outline 2.

### The Fortune 200 page is too long to read whole

Chadwick flagged it (24 Nov). About 4,800 words and 45 screens. A Sonnet pass builds a section index
first (heading, word count, what it holds), then each lens reads only its sections: Lens C reads the
audits, the versioning decision and adoption and efficiency; Lens E reads the hub and spoke map, the
token lifecycle and the adoption charts; Lens B reads only the headings, for how a long page is kept
findable. Its visuals are among the best in the set, and it is the best data visualisation reference
for how adoption is defined and then charted.

### Lens A in detail, because it is the one that fixes the repeated failure

Agents miss his audience and tone because they are given a description of a voice. Give them
examples instead.

1. From every reference, Sonnet pulls the sentences that do one of five jobs: state a problem, state
   a decision, state a cost or a rejected option, state a number, state a limit.
2. Lens A ranks them against the hiring manager reader and against how Chadwick talks (casual,
   direct, a design and systems thinker, per his 6 Nov direction in `../../concept/NEXT-SESSIONS.md`),
   and sets them beside the closest sentences in colour round 1.
3. Output: a voice calibration sheet. For each of the five jobs, two reference sentences that land and
   the colour round 1 sentence doing the same job, with what differs (length, ownership, jargon,
   hedging). The quoted lines live in the private archive; the repo holds the pattern only.

The sheet is a proposal for his review. `docs/VOICE.md` stays empty until he approves something; the
sheet never goes into it unapproved.

## Fit: which references match CS3, and whether to hunt for closer ones

Lens D scores every page on how close it is to CS3, on four axes: team size (solo or small team
versus enterprise), stage (a system still being built versus a shipped one with adoption), the AI
relationship (agents read and build from the system), and proof style (a test of the system versus
adoption numbers).

Working read from `STUDY.md`, to be confirmed by Lens D: none of the ten is a close match. The
enterprise pages (JPMorgan, IndiGo, Fortune 200) lend structure and decision telling, but their proof
is adoption across many products, which CS3 cannot have. The AI pages (WellSky, Diorama, MCP audit)
match on agents but measure little. Musterhall and Anorbank match on scale and honesty. The nearest
public match found so far is Usborne's Help Scout page in `../../REFERENCE-BOARD.md`.

The closer hunt is already running (Chadwick, 24 Nov: "can we do a new research path then too for
closer references"): ten designer written case studies where agents read and build from the system and
the system was tested by what they got wrong. It lands here as `CLOSE-EXAMPLES.md` and
`CLOSE-STUDY.md`. Lens D scores those ten with the rest, so the fit read covers thirty pages.

## The gap matrix: the main output

`GAP-MATRIX.md`. Rows: the six sections of outline 2, plus voice and audience as a row of its own.
Columns: what CS3 has; what it is missing; where it is weaker than the set; what to borrow (page and
move); the action. Each action is marked either as a choice inside the direction he has set (the
session makes it) or as a change to the outline, frame or voice (his call, sent with a pick).

From the matrix, four short outputs for the writing sessions:

1. An audience and voice brief: the reader in one paragraph and the calibration sheet. His yes needed.
2. A structure proposal: whether outline 2's order or opening should change, with the pages that
   argue for it. His yes needed.
3. A visual plan per section: what each image must prove, its reference and its caption pattern.
4. A numbers plan: which N ids are set as tiles, charts or inline, and how each limit is stated.

## Checks before anything reaches him

- Gates first with unlazy, in `GATES.md` next to this file.
- An independent reader, in a fresh context, gets the gap matrix and the archives and tries to prove
  each "CS3 lacks" or "CS3 is weaker" row wrong against `BASELINE.md`. A row that fails is cut or fixed.
- Every claim about a reference traces to the archive; every claim about CS3 traces to a file listed
  above.

## Order of work

1. `BASELINE.md`, and the Fortune 200 section index (Sonnet).
2. Lenses A to D in one batch.
3. Lens D's fit read once the closer set lands.
4. Lens E once the visual set lands.
5. Gap matrix, independent check, then the four outputs.
6. One message to him: what CS3 is missing, ranked, and the decisions that are his, each with a pick.
