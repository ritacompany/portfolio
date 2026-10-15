# Portfolio launch tracker

Any Claude or Codex session, on any account, starts here. This is the single running list of
what is left before the portfolio goes up, who owns each item and what is decided. It came from
Chadwick's 15 Oct 2026 progress note. Nothing he raised in that note is left out; if an item is
not here, add it rather than keeping it in a chat.

Status values: open, decision (needs Chadwick), in progress (name the session), done.
Owner values: C (Chadwick only), AI (Claude or Codex alone, Chadwick audits), both.

## Read first: at risk right now

These are not on GitHub. If this Mac or this account is lost, they are lost.

| Item | Where it lives | Risk |
|---|---|---|
| Haven case study, 12 commits dated 30 Sep to 7 Oct | local branch `haven/case-study`, worktree `~/Code/portfolio-haven` | never pushed |
| Homepage WIP commit `7bb1556` (about-source, Haven motion plan, audits) | local branch `codex/homepage-responsive` | one commit ahead of its remote |
| Uncommitted edits to `NEXT.md`, `docs/DECISIONS.md`, `reference/cs2/layout/section-1.md` | main checkout `~/Code/portfolio` | belong to a running session; that session must commit them |
| 5 research reports, 6 research note folders, `output/` (chess portrait and Figma exports), `.claude/launch.json` | main checkout, untracked | never committed |
| CS1 work | `reference/cs1/` has no commit since setup, though a "CS1 assembly" session ran 14 Oct | CS1 progress may exist only in Figma or chat |

Fix: decision D1 below.

## Launch definition (v1)

The site can go up when all of these are true. Anything not on this list is v1.1 and does not
block launch.

- [ ] L1 Homepage live: hero, work, about, footer, built from the master frame
- [ ] L2 Mondai collection page live, linking to all three Mondai case studies
- [ ] L3 CS1 (operation) finished and approved
- [ ] L4 CS2 (framework) finished and approved
- [ ] L5 CS3 (design system) finished and approved
- [ ] L6 Every link and hover on the live site works; no placeholder copy or image ships
- [ ] L7 Deployed on Vercel at the real domain, indexing switched on

Open on L1: whether Haven is in the v1 work section (question Q1).

## Critical path

The case studies are the long pole, not the homepage. CS2 has 2 of 10 sections at the copy
stage, 1 in conversation, 5 not started and 2 written last (`reference/cs2/CS2_PROCESS.md` status table). CS3 has no material in
this repo at all. The homepage is mostly designed and has a working code base from September.
So Chadwick's hours go to case study content and the hero visuals first; everything mechanical
moves to AI.

## Inventory

### Homepage (master frame in Figma, never edited directly; AI works on a duplicate)

| # | Item | Owner | Status |
|---|---|---|---|
| H1 | Hero headline. Current: "I'm really not that cool". Candidate: the "convinced people would be happy if we encouraged one another to discover our superpowers" line, possibly as a marquee that settles on hover (centered, or left aligned at the superpower indent) | C copy, AI motion | decision |
| H2 | One small hero line that says who he is as a designer, without adding visual weight | both | open |
| H3 | The "homosexual 1991 to current" line: keep, tune or cut | C | open |
| H4 | Chicago. "Seeking roles in NYC" is at the top; Chicago is only in the footer. His earlier ruling (about-page record): Chicago out of the hero, into contact; if it appears sooner, New York leads and Chicago is the aside | C | decision (reopening a ruling is his) |
| H5 | Hero elements, seven in total. Placeholders now. Known: pink 3D element; a second 3D element, undecided; disco ball (current one is inspiration only, would need his own version, does not map to a superpower); his photo (may change or need fixing) | C creates, AI supports | open |
| H6 | Superpower visuals, one per superpower. "Energy that draws people in": welcome mat. "Pattern recognition": cats pattern, worried the animation gets too complex on a real photo. "Quietly moving the needle": kooky red wig idea (Drag Race España judge wig, blue eye outfit reference). Made in his ChatGPT/Codex image tool | C creates, AI tests animation feasibility | open |
| H7 | Hero to superpower transition: three hero elements travel into the superpower frames | AI prototype, C approves | v1.1 (see D2) |
| H8 | Navigation: none in the hero; nav appears once past the hero. Contact button stays as is for now | AI | open |
| H9 | Background grid: hero only, continuous, or changes at the superpower section. Never behind work or about | AI prototypes options, C picks | open |
| H10 | Section titles: work and about have none; about already has an "About" label on its paragraph | C | decision |
| H11 | Work section: links, hover and states. Simple first, refine later | AI proposes, C approves | open |
| H12 | Mondai card image: the launcher path and attack graphic sits on top of the screen instead of inside the mockup; fix ratio without breaking text. Source layers are in the "Hero Mondai hero frame" | AI on duplicate | open |
| H13 | Mondai collection page (opens from the Mondai card): needs card hover/arrow, page interactions, components | AI proposes, C approves | open |
| H14 | About: done. Later it moves into a left slide-out panel, no scroll, collapsible, once the superpowers leave it | AI build | v1.1 (see D2) |
| H15 | Superpower section under the hero, one visual and one simple animation per superpower | both | v1.1 (see D2) |
| H16 | Footer: unfinished. Footer transition (black and white animated) merges into the footer frame. He has options | C picks, AI animates | open |
| H17 | Gray line or blur at the top of the page, source unknown | AI | open |
| H18 | Layer cleanup in the master (on a duplicate, then he swaps it in) | AI | open |
| H19 | Final colors | C | open |
| H20 | Header inspiration: "hero inspiration" frame, VS Goods narrow buttons | reference | open |
| H21 | Earlier animations and parallax: audit which survive the redesign | AI | open |
| H22 | Order: superpowers before or after work | C | decision (D2) |
| H23 | Something else he meant to add about the nav reveal and forgot | C | open |

### Case studies

| # | Item | Owner | Status |
|---|---|---|---|
| C1a | CS1 operation: find where its current state lives (Q2) | both | open |
| C1b | CS1 operation: finish and approve | both | open |
| C2 | CS2 framework: sections 3 to 8, then intro and story. Process: `reference/cs2/CS2_PROCESS.md` | both | in progress, CS2 sessions |
| C3 | CS3 design system: no material in this repo yet | both | open |
| C4 | Haven: on a local branch only (D1); in v1 or not (Q1) | C | decision |

### Site build

| # | Item | Owner | Status |
|---|---|---|---|
| S1 | Build the homepage in code from the current master. A responsive homepage exists from Sep (`codex/homepage-responsive`, `haven/case-study`) built against an older master; reuse what holds | AI | open, needs Figma link |
| S2 | Vercel: holding page on `main` is set to noindex; real deploy | AI | open |
| S3 | Build the Mondai collection page and the case study pages in code | AI | open, after designs |
| S4 | Site wide QA: every link, hover and state, all breakpoints | AI, C audits | open |
| S5 | Domain: which one, owned or not, DNS to Vercel | C decides, AI sets up | open |

### Working setup

| # | Item | Owner | Status |
|---|---|---|---|
| P1 | Everything on GitHub so another account can pick up (handoff below) | AI | in progress |
| P2 | Usage-aware stopping (handoff below) | AI | in progress |
| P3 | Parallel sessions (below) | both | decision |
| P4 | Skills checked with him before use, overlaps resolved (below) | AI | decision |
| P5 | Process methods instead of more rules: blind claim audit is already researched (`reports/Self audit of plan logic.md`, 14 Oct) | AI | done, applied below |
| P6 | Figma access: both connectors work. "figma-mondai" is the Rita Dev work account; the second is his personal account. The file in `docs/PROJECT_CONTEXT.md` now shows only an "Old" page, so the master frame is in another file | C sends link | decision |
| P7 | `NEXT.md` still describes the chess portrait. Is that the hero photo of him (Q3)? Once answered, `NEXT.md` points here | C | open |

## Decisions waiting on Chadwick

Each has a recommendation. He can overrule any of them.

- **D1 Push the local-only branches.** Push `haven/case-study` and the `codex/homepage-responsive`
  WIP to GitHub. Recommend yes: it is the only copy. Separately, confirm the GitHub repo is
  private now: a personal conversation corpus untracked in Sep (8ec7b83) is still in history
  already on GitHub, whatever D1 decides.
- **D2 Ship v1 with work right under the hero; superpowers become v1.1.** Evidence: hiring
  managers decide in a 10 to 30 second scan, and NN/g measured 81% of viewing time in the
  first three screens (`reports/What gets designers interviewed.md`). A superpower section
  above work pushes the case studies toward screen three. It also takes H7, H14 and H15 off
  the launch path, which removes the hardest motion work from the deadline. What changes it:
  if the superpower section fits in one screen with the first work card visible beneath it.
- **D3 Freeze CS2 process changes until sections 3 to 8 are drafted.** Seven of the last ten
  CS2 commits are checks, hooks and process fixes; two sections hold copy after seven weeks since
  the restart. Content moves, process stays as it is unless a section is actually blocked.
- **D4 Concurrency.** At most two working sessions at once plus this coordinator. The plan is
  Pro: on 15 Oct the weekly limit was 47% used with 3 days 18 hours left. Every parallel
  session multiplies burn.

## Questions

- Q1 Is Haven in the v1 work section?
- Q2 Where is CS1 right now: Figma, a draft file, a chat?
- Q3 Is the chess portrait the hero photo of him?

## Parallel sessions

Two at a time, each owns its files, none touches the master frame.

1. **Figma hygiene** (after the link): duplicate the master, find the gray line, clean layers,
   fix the Mondai card mockup. Hands back a duplicate for him to compare and swap in.
2. **Motion and grid lab** (after the link): an HTML prototype of the hero marquee (H1), the nav
   reveal (H8), three grid options (H9) and work card hover (H11). He reacts to real motion
   instead of describing it.
3. CS2 keeps running in its own sessions, under D3.

Later, once visuals exist: a cats animation feasibility test (H6), footer animation (H16), the
v1 site build (S1).

## Handoff: never lose work to a usage cutoff

Prediction cannot be relied on: no hook can read the usage meter, only a live session can,
and a cutoff can land mid step. So the protection is granularity, with the meter as an early
warning.

1. Work is cut into steps small enough that losing one costs little. Each finished step is
   committed and pushed to GitHub immediately, approved or not; unapproved work is labelled
   as such in the commit message and in its status. This line is the rule for every account,
   because memory on one Mac does not travel.
2. At every step boundary the session reads the usage meter. At 85% of either the five hour or
   weekly limit it stops starting new work, writes where it is into the "In flight" section
   below, commits and pushes.
3. Every session's state lives in files on `main`, never only in a branch or a chat. Worktree
   branches are merged back to `main` when the step lands.
4. The other account reads `CLAUDE.md`, then this file, then the file for the area it picks up
   (`reference/cs2/CS2_PROCESS.md` for CS2).

## In flight

Each running session keeps one line here: session, item, where it stopped, next step.

- Coordinator (15 Oct): wrote this tracker and ran a blind claim audit on it; seven holes found and fixed. Next: D1 to D4 and Q1 to Q3 from Chadwick, then the
  Figma link to start the two parallel sessions.
