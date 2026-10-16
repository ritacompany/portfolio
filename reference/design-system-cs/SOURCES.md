# Design system CS: sources

Gathered 16 Oct 2026 for row C2. An index, not a draft: no copy, no conclusions about him.
Every source stays where it is; this file points at it. Mondai product mechanics are not restated.

## How to read the marks

- **CONFIRMED**: his own words or a record that names him as the one who decided or did it.
- **PARAPHRASE**: someone else's summary of what he said or did (an AI session's log, a causal
  chain built from his messages). Go back to the source before quoting.
- **ASSUMED**: the work exists, but the source does not say who did it. Since Sep 2026 most
  Figma execution in the Mondai repo was done by AI sessions he directed and approved; those rows
  are ASSUMED as his until he says how he wants that framed (see GAPS.md).

## Where the sources live

| Short name | Path or key | What it is |
|---|---|---|
| Discord | `~/Documents/CS2-research/discord-work/flat.json` | His own Discord messages, 2017 to 2026 (a personal data export, so only his side) |
| ChatGPT | `~/Documents/CS2-research/chatgpt-flat/` | His ChatGPT conversations, one file per chat, named by date |
| Corpus | `~/Code/mondai/corpus/conversations/` | His Claude conversations, Mar to Sep 2026 |
| Decisions | `~/Code/mondai/mondai/reference/DECISIONS.md` | Mondai's dated decision log, many entries "Decided by: Chadwick" |
| Process | `~/Code/mondai/process/` | Audits, research and proposals behind those decisions |
| Working log | `~/Code/mondai/ops/WORKING-LOG-history.md` | AI session history of the Figma work, Sep to Oct 2026 |
| CS1 evidence | `reference/cs1/CS1-PRIMARY-EVIDENCE-VERBATIM.md`, `reference/cs1/cs1-causal-chain.md` | This repo. Built for the operation CS; several items are design system material it left alone |
| Library | Figma `HXNz5yqngCJtDF8NUK86Cd` | The design system file, today named Design System + Workspace; in Aug 2025 it was "Rita ABC Design System" |
| MVP file | Figma `5RO0m4bYYrTvbiaOgaU3tI` | Desktop 1 (MVP), the screens that consume the library |
| Old design board | Figma `mcNOHZeNSgR70T7TCK4PYN` | "Rita ABC Design Board", where the system lived on a page before Aug 2025 |

Rita ABC is Mondai's earlier name. Dates below are the date of the message or file.

---

## 1. The starting state

| Date | Source | What it shows | Mark |
|---|---|---|---|
| 29 Aug 2024 | ChatGPT `2024-08-29_9ec8fc5a_design-system-essentials.md` #0000 | He asks what to set criteria for in "a termporary design system that allows 3 designers to establish consistency", under a time crunch | CONFIRMED |
| 29 Aug 2024 | Discord, DM with Michael | Builds an auto layout frame "Michael's preferences" for the founder | CONFIRMED |
| 3 Sep 2024 | Discord, group DM | Placeholder icons; wants a Gen Z icon set "to replace the Tdesigns eventually" | CONFIRMED |
| 15 Sep 2024 | Discord, DMs with ella and Michael | "Most of the stuff I added today is in the Design System page not the main Design page" | CONFIRMED |
| 15 Sep 2024 | ChatGPT `2024-09-15_66e7483a_brutalism-ux-design-guidance.md` | Directing "a small team of fresh ux designers"; writing up the brutalist inspiration so separate features cohere | CONFIRMED |
| Sep 2024 | `reference/cs1/cs1-causal-chain.md` section 3 | "Sept 2024: builds the Design System page" | PARAPHRASE |
| 17 Sep 2024 | Discord, group DM | A grid set up as a component "keeps messing things up" | CONFIRMED |
| 17 Dec 2024 | ChatGPT `2024-12-17_6761be6d_design-handoff-guidelines-cleanup.md` | Compiles what developers want from designers (algorithmic colour, spacing and type) to share with the design team | CONFIRMED |
| 22 Jan 2025 | Discord, DM with teresa | "We don't have a design system put fully together yet, just components and not all of them" | CONFIRMED |
| 21 Jan 2025 | Discord, DM with ella | "it's our first time doing one so we are learning as we go" | CONFIRMED |
| 24 to 25 Jul 2025 | Discord, group DM and rita-abc-buildx | Settings screens "didn't follow the design system"; "The design system is not adapted for web either" | CONFIRMED |
| 30 Jul 2025 | CS1 verbatim, section 6 | "no one feels confident in design systems, components, variables, auto layout, etc" | CONFIRMED |
| 22 and 30 Oct 2025 | CS1 verbatim, section 7 | Cleaning up other designers' work: images in place of system icons, no auto layout, "creating components for those pages"; 12 to 13 hour days | CONFIRMED |
| 1 Oct 2026 | `~/Downloads/Mondai-design-system-audit.pptx`, 17 slides | Snapshot of the library: 235 variables in 4 collections, 18 text styles, 94 components with 542 variants, one mode. Colour 97% tokenised; spacing, radius and type not wired (1,272 gaps and 1,315 paddings typed by hand); 0 code names; 90 of 94 components undescribed; icons from TDesign. Made by an AI session (PptxGenJS, "My pick" on the decision slide) | ASSUMED (commissioned by him; who asked for it is not recorded) |

## 2. The system's structure

| Date | Source | What it shows | Mark |
|---|---|---|---|
| 22 Jan 2025 | Discord, DM with teresa | "Successfully translated the base colors to variables (not the status/neutrals)" | CONFIRMED |
| 20 Jan 2025 | Discord, DM with teresa | Separates old content from the new "official" design system on the design page | CONFIRMED |
| 10 Jan 2025 | Discord, DM with sharon | Plans to put the design system in a separate file | CONFIRMED |
| 12 Jun 2025 | Discord, rita-abc-full-team | The system is "on it's own page" of the design board, `mcNOHZeNSgR70T7TCK4PYN` node `21-643` | CONFIRMED |
| 18 Sep 2026 | Working log history, lines 60 to 112; `~/Code/mondai/.claude/skills/design-system-page/reference/pages.md` | Every page measured: 14 pages, 77 component sets, 1,760 variants. Old [v2] boards retired; 13 pages rebuilt to one board standard by parallel agents, one per Figma page, finished 19 Sep | ASSUMED (AI sessions; the board standard is in the skill) |
| 18 Sep 2026 | pages.md | Page ids in the library: Branding `2:43160`, Typography `2:43501`, Grids & spacing `15:948`, Icons `4:3287`, Input fields `4:6809`, Navigation `4:6430`, Lists `4:6129`, Cards & containers `4:6395`, Progress indicators `4:5766`, Selection control `3:5170`, Notifications `105:495`, Calendars `2992:33432`, Content `3227:13697` | n/a, location |
| read 16 Oct 2026 | Figma library, Grids & spacing `15:948`, screenshot | Board shows 17 spacing steps, 7 radii, three page margin tiers (Flush, Standard, Focused) and a grid of gutter 32; core frame padding marked deprecated. This is older than the 23 Sep and 26 Sep grid decisions (gutter 24, margin 48), so the page itself is a "before" | n/a, artefact |
| 30 Sep 2026 | Decisions, "Input field states: one outline ladder, no filled state" | Interaction states as semantic tokens named for the job (Border/Control, Border/Hover, Border/Focus and others); he simplified the inputs himself; published by him on 1 Oct | CONFIRMED |
| 30 Sep 2026 | Decisions, "Design system boards: fewest auto layout frames" | Rule for how the library's own pages are built | ASSUMED (no Decided by line) |
| 30 Sep 2026 | Decisions, "Tablet grid" | Tablet grid saved as a style in the library; mobile keeps Nandita's grid | ASSUMED; Nandita named as author of the mobile grid |
| 2 Oct 2026 | Decisions, "Mondai is dark only"; "Spacing roles: the gaps in the ladders are filled" | Single mode named Dark; Dimension collection rebuilt and published by him ("A for 1" from three options in `process/token-gaps/options.png`) | CONFIRMED |
| 9 Oct 2026 | Decisions, "Date numbers have their own Bold style" | A text style added for a case the type scale could not cover | ASSUMED |

## 3. Decisions and their reasons

| Date | Source | What it shows | Mark |
|---|---|---|---|
| 20 Jan 2025 | Discord, DM with teresa | Naming: tag as umbrella term, two names "to help differentiate them" | CONFIRMED |
| 8 Jan 2025 | Discord, DM with teresa | Shares an article on naming design tokens | CONFIRMED |
| 3 Aug 2025 | Discord, rita-abc-buildx | Log in screens moved to dark so the system does not need two colour options "FOR NOW"; variables could add modes later | CONFIRMED |
| 15 May 2026 | Corpus `2026-05-15--sentence-case-vs-title-case...`; already reasoned in `reference/cs2/reasoning/design-system-and-voice.md` section 1 | Sentence case: argued, researched, taken to the brand lead | CONFIRMED |
| May 2026 | `reference/cs2/reasoning/design-system-and-voice.md` sections 2 and 3 | Colour carries meaning (magenta for rollover, not an alert); the mono and Heebo label split | CONFIRMED |
| 19 Aug 2026 | Decisions, "Gold is not part of the design system" | A colour that spread by being written down is removed | ASSUMED |
| 23 Sep 2026 | Decisions, "Core frame grid: one grid, margins on column edges" | One 12 column grid; margins as tokens on column edges | ASSUMED |
| 25 Sep 2026 | `process/BUTTON-AUDIT-MVP.md` | 236 buttons in 33 widths, 47 set to hug | n/a, measurement |
| 25 Sep 2026 | `process/BUTTON-RESEARCH.md`, `process/BUTTON-RULES-PROPOSAL.md` | How other systems size buttons; rule approved by him: two widths, fill by default | CONFIRMED (approval recorded) |
| 25 Sep 2026 | `process/GRID-SPACING-RESEARCH.md`, `process/REGION-GAP-MERGED.md` | Gap between regions researched against Carbon, Material, Atlassian and others; three revisions in one day | CONFIRMED (Decisions: "Chadwick approved 48 on 25 Sep") |
| 26 to 27 Sep 2026 | `process/SPACING-RULES-PROPOSAL.md` | He dropped 56 and 64 and set steps 32, 40 and 48 with a floor beside bare content | CONFIRMED |
| 26 Sep 2026 | `process/LABEL-SIZE-RULE.md` | Label sizes set from an audit of how finished pages actually used them | ASSUMED |
| 30 Sep and 7 Oct 2026 | Decisions, "Desktop grid for pages with no sidebar" then "Shell grid" | A grid for no sidebar pages, then replaced by a shell grid a week later | ASSUMED |
| 2 Oct 2026 | Decisions, "Component or not" | When an element is library work. Triggered by his comment "it feels like you're just making everything a component" | CONFIRMED |
| 6 Oct 2026 | Decisions, "acted on elements get states"; `~/Code/mondai/journey-advisement/research/component-rule/` | Replaces the repetition test with an interaction test, backed by research on Carbon, Material and Figma | ASSUMED |
| 2 Oct 2026 | Decisions, "Stage 4 screens are drawn from his complete design system" | "i cant judge if the design looks right without seeing what it will ACTUALLY look like" | CONFIRMED |
| 7 Oct 2025 and 11 Nov 2025 | Discord, DMs with kristin | Adding depth and polish to "a lot of flat brutalist ui elements"; struggling to make the system "feel flexible enough" | CONFIRMED |
| 25 Nov 2025 | `reference/cs1/cs1-causal-chain.md` section 10 | Runs the WCAG 3:1 check; spots that icons need a hover state colour | PARAPHRASE |

## 4. Adoption by others

| Date | Source | What it shows | Mark |
|---|---|---|---|
| 11 Jan 2025 | Discord, group DM | "Aside from Teresa since we already know you're doing the design system" | CONFIRMED; Teresa owned design system work in early 2025 |
| 22 to 26 Jan 2025 | Discord, DMs with teresa and Michael | He had let Teresa "take the reins"; adds design system tasks to Notion, assigned to both | CONFIRMED |
| 23 Jan 2025 | Discord, design-review | Offers a walkthrough to another team once the system is done, for alignment | CONFIRMED |
| 28 Jul to 4 Aug 2025 | Discord, DMs with Michael and sierrac28 | Approving and applying the system; designers "weren't using it correctly (and in a separate file)"; cleans the system up and flags components to fix | CONFIRMED |
| 29 to 31 Jul 2025 | CS1 verbatim section 6; Discord | Workshop on design system, components, variables and auto layout; reason given is dev's view of the file | CONFIRMED |
| 30 Jul 2025 | Discord, group DM with kim and others | Aligning a web design system with the designers working on web | CONFIRMED |
| 14 Aug 2025 | ChatGPT `2025-08-14_689e41d9_design-system-transfer-steps.md` | Devs will use components "directly from the design system I created in Figma" through Figma MCP; moving it from his personal file to the paid dev team | CONFIRMED |
| 15 Aug 2025 | Discord, group DM | Announces the system is available to the team at `HXNz5yqngCJtDF8NUK86Cd` | CONFIRMED |
| 27 Aug 2025 | ChatGPT `2025-08-27_68af8429_component-update-issue.md` | Library publish not reaching a consuming file (missing variant) | CONFIRMED |
| 2 Oct 2025 | Discord, DM with uncodedlifestyle | Emojis moved to a community library so the system uses them without sourcing them | CONFIRMED |
| 16 Oct 2025 | CS1 causal chain section 9; Discord rita-abc-buildx | Documented layout standard for desktop pages with and without the sidebar | CONFIRMED |
| 28 Nov 2025 | Discord, rita-abc-design | Starts a design channel to keep the team synced on the system | CONFIRMED |
| 7 Nov 2025 | Discord, DMs with Michael and noble_swan | Work allocation blocked because so much depends on the system in the ritadev file | CONFIRMED |
| 10 Mar 2026 | CS1 verbatim; Discord DM with Michael | Asks for two designers to get access to the system; feeds the whole system to an AI as a PDF | CONFIRMED |
| 20 Apr 2026 | Corpus `2026-04-20--redesigning-core-frame-grid-system...` | Handoff of breakpoint margins to developer Swyam as system variables | PARAPHRASE (assistant turn) |
| 4 Aug 2026 | ChatGPT `2026-08-04_6a724e5e_mondai-design-system-setup.md` | A designer asks to use the system in her own file; publishing as a library | CONFIRMED |
| 30 Sep 2026 | `process/library-sync/AUDIT-2026-09-30.md` | Library update not reaching the MVP screens: overrides and a duplicate imported component set; 202 instances cleared, 62 fields moved off a deleted state | ASSUMED (AI session, his calls quoted) |
| 8 Oct 2026 | `process/DS-CHANGE-CHECK.md` | Developers work from Figma with no GitHub access; named versions mark what they pulled | CONFIRMED ("Agreed with Chadwick") |
| 21 Sep 2026 | ChatGPT `2026-09-21_6ab19430_figma-variant-separation-methods.md` | His icon set of 1,000 to 2,000 icons in the library and a publishing problem | CONFIRMED |
| 16 May 2026 | CS1 verbatim section 6 | Promotions on the design team (names must be anonymised; belongs to the leadership CS) | CONFIRMED, not this CS's to use |

## 5. Before and after

Pairs where both ends exist. None is a finished before and after; each is a candidate.

| Topic | Before | After | Mark |
|---|---|---|---|
| Where the system lived | A page in the design board, Sep 2024 to Jun 2025 (`mcNOHZeNSgR70T7TCK4PYN`) | Its own library file, shared with dev, 15 Aug 2025 (`HXNz5yqngCJtDF8NUK86Cd`) | CONFIRMED |
| Library pages | [v2] boards, mixed layouts, before 18 Sep 2026 | 13 pages on one board standard, 19 Sep 2026 | ASSUMED |
| Button widths | 33 widths across 236 buttons (`process/BUTTON-AUDIT-MVP.md`) | Two widths, fill by default (Decisions, 25 Sep 2026); per button data in `process/button-audit/buttons.json` | CONFIRMED rule, ASSUMED execution |
| Label sizes | `process/label-audit/before.json` | `process/label-audit/after.json` | ASSUMED |
| Library sync | `process/library-sync/gates/audit-before.json` | `audit-after.json` | ASSUMED |
| Spacing previews | `process/spacing-rules/previews/` (before and after images on five real screens) | same folder | ASSUMED |
| Tokens wired on screens | Home page 0% of 1,835 gaps linked (audit deck slide 13, 1 Oct 2026) | Cohorts page 89% linked after its rebuild | ASSUMED |
| Grids & spacing board | Figma `15:948` still shows gutter 32 and margin tiers | Decisions 23 and 26 Sep 2026: gutter 24, margin 48 | n/a, the board is out of date |

## Not used, and why

- `~/Code/mondai-brochure/references/Mondai Product Design System.pdf` and
  `~/Downloads/Mondai Brochure Website + Design System.pdf`: the brochure site is a separate system
  he ruled out of product references. Open the first only if the product PDF is the one from Apr 2026.
- Corpus `2026-08-10` and ChatGPT `2026-08-10_6a7aa145_design-system-setup.md`: the portfolio's own
  Figma file, not Mondai.
- The framework CS owns the Growth Journey, scheduling and AI strategy; the leadership CS owns
  mentoring and promotions. Rows above that touch them are noted and left for them.
- Figma reads: the connector lists only the first page of each file, so the library was read by
  node id from `pages.md`. Only `15:948` was screenshotted this session.
