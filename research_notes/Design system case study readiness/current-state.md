# Mondai design system library: current state, 19 Oct 2026

Read only measurement of Figma file HXNz5yqngCJtDF8NUK86Cd ("Design System + Workspace") through the
Figma plugin API, plus the Mondai repo and GitHub (ritacompany/mondai). Nothing was changed in Figma, in
either repo or on GitHub. Every number below was read today unless it is marked as from the 1 Oct audit
(`process/ds-audit/audit-data.json` on PR #98, read on GitHub) or from a repo file.

Scope note: "library pages" means the 14 design system pages (Branding to Typography). The 1 Oct audit
counted components on the same pages, so library page numbers compare like for like.

## Figma library today

### Pages (23, of which 5 are separators)

Branding; Buttons & chips; Calendars; Cards & containers; Content; Grids & spacing; Icons; Input fields;
Lists; Navigation; Notifications; Selection control; Progress indicators; Typography; separator; Mobile 1
Workspace [MVP]; separator; Desktop 1 Workspace [MVP]; separator; Archived; Unsorted (empty, 0 children);
separator; Cover.

### Variables: collections, modes, counts

424 local variables in 9 collections.

| Collection | Modes | Variables | Alias another variable | Raw value | Retired names | Hidden from publishing |
| --- | --- | --- | --- | --- | --- | --- |
| Color | Dark | 81 | 81 (all to Color primitives) | 0 | 0 | no, published |
| Size | Default | 27 | 23 (22 to Size primitives, 1 to Layout) | 4 | 0 | no, published |
| Layout | Desktop, Tablet, Mobile | 20 | 2 (to Layout, in all 3 modes) | 18 | 0 | no, published |
| Typography | Default | 20 | 0 | 20 | 0 | each variable hidden |
| Content | English | 26 (strings) | 0 | 26 | 0 | collection hidden |
| Color primitives | Dark | 130 | 40 (within the collection) | 90 | 41 | collection hidden |
| Size primitives | Default | 116 (90 numbers, 26 strings) | 24 (within the collection) | 92 | 86 | collection hidden |
| Doc boards | Dark | 2 | 2 (to Color primitives) | 0 | 0 | collection hidden |
| Retired containers | Dark | 2 | 2 (to Color primitives) | 0 | 2 | collection hidden |
| Total | | 424 | 174 of 424 | 250 of 424 | 129 of 424 | |

- Published to library users: 128 of 424 variables (Color 81, Size 27, Layout 20). The other 296 are
  hidden at variable or collection level.
- Not retired: 295 of 424. The 129 "Retired/" variables are kept so the MVP file keeps working until it is
  rebound (PR #173 body). Six more in Size primitives are named "Deprecated/" (Core frame horizontal
  padding 1 to 3, Page margin Flush, Standard, Focused) and two in Layout are named "Retiring/" (Grid
  column margin, Shell margin column 1).
- Every variable has explicit scopes: 0 of 424 use ALL_SCOPES.
- One collection has more than one mode: Layout (Desktop, Tablet, Mobile). The colour collections have one
  mode, named Dark.

### Variables with code syntax

- Any code syntax set: 421 of 424.
- WEB: 421 of 424. ANDROID: 0 of 424. iOS: 0 of 424.
- Format is CSS custom properties, for example `var(--color-neutral-600)`.
- The 3 without code syntax: Retired/Semantic/Alert/Trim and Retired/Semantic/Alerts/Backgrounds (Color
  primitives) and Radius/1000 (Size primitives, hidden).
- Published variables with WEB code syntax: 128 of 128.

### Variables with a description

- 311 of 424 have a non empty description.
- Published: 128 of 128 (Color 81 of 81, Size 27 of 27, Layout 20 of 20).
- Typography 20 of 20, Content 26 of 26, Retired containers 2 of 2.
- Color primitives 43 of 130 (only 2 of the 89 non retired ones), Size primitives 92 of 116 (6 of the 30
  non retired ones), Doc boards 0 of 2.

### Styles

- Text styles: 19 local. Description on 19 of 19. Bound to variables: 19 of 19, font size only (no line
  height or letter spacing binding). Families: Heebo (Bold, Regular) and IBM Plex Mono (Regular, Bold).
  Names: Headers/Large header 1, Large header 2, Large header 2 Leading 122, Header 1, Header 2, Header 3;
  Body/Body, Body Leading 158; Label/Standard/Regular, Small; Label/Mono/Large, Regular, Regular Tight,
  Small, Small Tight, Micro; Numbers/Large, Medium, Date.
- Effect styles: 0 local. There are no shadow or elevation styles.
- Paint styles: 3 local (Gradients/Strokes/Divider stroke, Gradients/Strokes/Fading container stroke,
  Gradients/Mondai mark). Description on 1 of 3 (Mondai mark).
- Grid styles: 4 local (Mondai Mobile Grid, Mondai Tablet Grid, Mondai Desktop Grid, Mondai Shell Grid).

### Components

Library pages (14 pages):

| Page | Component sets | Standalone components | Variants | Sets with description | Standalone with description |
| --- | --- | --- | --- | --- | --- |
| Branding | 2 | 0 | 6 | 2 of 2 | none |
| Buttons & chips | 16 | 1 | 178 | 16 of 16 | 1 of 1 |
| Calendars | 7 | 6 | 85 | 7 of 7 | 6 of 6 |
| Cards & containers | 8 | 1 | 50 | 5 of 8 | 1 of 1 |
| Content | 2 | 0 | 14 | 2 of 2 | none |
| Grids & spacing | 0 | 0 | 0 | none | none |
| Icons | 6 | 0 | 28 | 5 of 6 | none |
| Input fields | 5 | 3 | 26 | 5 of 5 | 3 of 3 |
| Lists | 10 | 0 | 50 | 10 of 10 | none |
| Navigation | 19 | 3 | 93 | 18 of 19 | 2 of 3 |
| Notifications | 5 | 0 | 40 | 5 of 5 | none |
| Selection control | 2 | 0 | 6 | 2 of 2 | none |
| Progress indicators | 8 | 3 | 28 | 8 of 8 | 3 of 3 |
| Typography | 0 | 0 | 0 | none | none |
| Total | 90 | 17 | 604 | 85 of 90 | 16 of 17 |

- Components and component sets with a non empty description: 101 of 107 (sets and standalone together).
- Missing a description: Event card, RSVP Component and Event banner (Cards & containers, moved there from
  Unsorted 18 to 19 Oct), chevron-right (Icons), _Breadcrumb items core (Navigation), Sidebar/tooltip
  (standalone, Navigation).
- Outside the library pages: Mobile 1 Workspace [MVP] holds 19 sets, 5 standalone and 116 variants,
  including local copies of seven Calendars sets (Hour row, Date container, Calendar item, Calendar list
  items, "Calendar hover " with a trailing space, Calendar hover status indicator) and two sets named
  "(unused copy)". Archived holds 4 sets with 39 variants. Desktop 1 Workspace and Cover hold none. Whole
  file: 113 sets, 22 standalone components, 759 variants.

### Component sets with default property names

13 of 90 library sets have a property still named "Property 1": Mondai Logo, Mondai text logo, Draggable
button, Journey progress history, Divider, List icon, Floating Career Header, Top rail notification bar,
Tutorial tooltip, Step marker, Wave loading indicator, Pathway status indicator, Journey progress container.

### Variant values that look truncated, misspelled or inconsistent

Read from every variant property on the 90 library sets. The "Defaul" and "Hove" defects named in the 15 Oct
plan are not present today.
- Inconsistent state words: "Select Hover" (Large selection chip) beside "Selected hover" everywhere else;
  "Press" (Extended onboarding selection) beside "Pressed" everywhere else.
- Abbreviations: Calendar item Duration uses "1 HR", "45 MN", "30 MN", "15 MN".
- Placeholder value: "Variant2" (Mondai text logo, its only variant).
- "Black alt." with a trailing full stop (Button Type).
- Onboarding chip has "Disabled" as both a Type and a State value.
- Properties with only one value: Button "Container style" (Default), Search bar "Type" (Default), Tooltip
  "Dark Mode" (False), Scrollbar and Scrollbar 2 "Horizontal" (False), Action item "Type" (Standard),
  Breadcrumb main "Type" (without container), Journey progress container "Property 1" (Default).
- Duplicate set: "Scrollbar" and "Scrollbar 2" carry the same properties and values.
- State held in a property named Status: Calendar list items "Status" is Default, Hover, Pressed.
- Title case property names against the sentence case rule: "Long Format Buttons", "Dark Mode".
- Tooltip "Tail" values mix arrow glyphs with spaced hyphens between the two directions.

### Token binding in library components (same method as the 1 Oct audit)

Method replicated from `process/ds-audit/page-scan.js`: every node inside each component master on the 12
library pages that hold components, nested instances excluded. A property counts as bound when every visible
solid paint (or the radius, gap or padding) is linked to a variable; text counts as styled when it has a text
style. Added today: which kind of variable the link points at.

| Property | Bound today | On role variables | On hidden primitives | Other library | 1 Oct audit, bound |
| --- | --- | --- | --- | --- | --- |
| Colour (fills, text fills, strokes) | 2,828 of 2,911 (97.1%) | 2,009 of 2,911 (69.0%) | 798 | 21 | 2,327 of 2,402 (96.9%) |
| Corner radius | 530 of 984 (53.9%) | 529 | 1 | 0 | 316 of 826 (38.3%) |
| Gap | 109 of 1,615 (6.7%) | 107 | 2 | 0 | 9 of 1,281 (0.7%) |
| Padding | 29 of 1,536 (1.9%) | 16 | 13 | 0 | 4 of 1,319 (0.3%) |
| Text style on text | 1,211 of 1,284 (94.3%) | | | | 964 of 1,029 (93.7%) |

- No library component links a retired or missing variable.
- Spacing is still almost entirely raw: Buttons & chips has 0 of 218 gaps and 0 of 297 paddings bound;
  Calendars 0 of 418 and 0 of 352.

### Icons

Still TDesign. Of 440 nested instances inside Buttons & chips components, 363 point at remote components:
"Tdesign icon set" 249 (1 Oct audit: 234), plus 49, Astronaut 48, raised hand and hand tones 10, Person
shrugging 4, a remote User avatar 3. The other 77 are local (Icons 37, Buttons & chips 36, 4 unresolved).

## Change since 1 Oct audit

| Measure | 1 Oct 2026 | 19 Oct 2026 |
| --- | --- | --- |
| Variables | 235 | 424 (295 not retired, 128 published) |
| Collections | 4 (Colors, Dimension, Containers & Fills, Design System Organization) | 9 (5 role or content collections, 4 hidden holding collections) |
| Modes | 1 per collection, "Mode 1" | Layout 3 (Desktop, Tablet, Mobile); others 1, colour named Dark |
| Variables with code syntax | 0 of 235 | 421 of 424 (WEB only) |
| Variables with a description | 71 of 235 | 311 of 424; published 128 of 128 |
| Hidden variables | 1 | 296 (incl. whole primitive collections) |
| Variables on ALL_SCOPES | 1 | 0 |
| Text styles | 18, 0 bound to variables | 19, 19 of 19 bind font size |
| Effect styles | 0 | 0 |
| Paint styles | 3 | 3 |
| Grid styles | 2 | 4 |
| Library components (sets plus standalone) | 94 | 107 (90 sets, 17 standalone) |
| Variants | 542 | 604 |
| Components with a description | 4 of 94 | 101 of 107 |
| Colour bound to a variable | 96.9% | 97.1%, but only 69.0% to roles |
| Radius bound | 38.3% | 53.9% |
| Gap bound | 0.7% | 6.7% |
| Padding bound | 0.3% | 1.9% |
| Icons | TDesign | TDesign |

Reading the change:
- The picker and the code contract moved most: raw values are hidden, every published role has a scope,
  description and web code name. "0 variables with code syntax" is now 421 of 424.
- Component descriptions moved from 4 of 94 to 101 of 107.
- Component wiring barely moved for spacing. Colour coverage was already 97% and still is; what changed is
  that 69% now lands on roles while 798 colour properties still point at hidden primitives, which is the
  15 Oct audit's flaw 1 still standing in the library pages.
- Type is wired for size only. Effects are still absent. Still one theme, now decided (2 Oct, dark only).
- None of this is published yet: the working log (re-checked 15 Oct) says "Do not publish yet", and PR
  #179 says "Nothing is published yet".

## Tokens chat steps awaiting him

Source: the 15 Oct token cleanup audit, `process/token-picker/audit/AUDIT.md` on branch
`claude/cool-archimedes-v8g7x9` (open draft PR #179, "Token cleanup and roles"), section "Order that fixes
it". The working log line "steps 1 to 4: missing roles, rebind components, code names, stray links" is that
order.

1. Missing roles: add roles for values components use but no role holds (radius 2, 4, 6 and several spacing
   steps), so components can be rebound. Branch record: Radius XS, S, M added 15 to 16 Oct; the 19 Oct
   entry restored his 2 Oct ladder; about 390 spacing links whose values have no role are left for his call
   (`roles/SIZE-RESULT.md`).
2. Rebind components to roles: spacing and radius by value, colour by meaning with his review. Branch record:
   3,258 size links moved 15 to 16 Oct; a colour mapping draft of 9,784 raw colour links (7,914 with a same
   value role) waits on his review (`roles/COLOUR-MAPPING.md`). Measured today in library components:
   gap and padding still 6.7% and 1.9% bound; 798 colour properties on primitives.
3. Code names and descriptions, so an AI can tell what a role is for. Measured today: done for all 128
   published variables.
4. Stray links: clear 15 links on the Mobile workspace to retired variables and 239 links to other or older
   published libraries.

Then one publish and a rebind of the MVP file. The branch's `system-audit/BUILD-RESULT.md` records further
work on 17 to 19 Oct (44 new colour roles, renames, a revert of visible 17 Oct colour changes on 18 Oct, and
the 2 Oct spacing ladder restored on 19 Oct, his "A for 1"), described as built "from the accepted proposal".
The working log's waiting line still dates from 15 Oct and does not mention that later work.

## Design system plan picks (#177)

Source: PR #177, "Design system plan: chat audit, case study strategy and how the work runs", open draft,
15 Oct, branch `claude/relaxed-rubin-saov6x`, file `design-system-plan/PLAN.md`.

The five picks are not written in any file. PLAN.md says "Every item, one line each, is in the chat message
that delivered this plan, with a pick", and neither the PR body, its three commits, ASKS.md nor the repo
holds that message. What follows is every decision the plan text itself reserves to him; matching these to
"the five picks" is an inference, not a reading.

- Merge #177: the plan "merges on his yes" because it touches process files (it adds asks rows and removes
  one rejected grid line).
- Start the Library, Case study and Process threads: they "start only on his yes".
- Move the lead chat into a Claude Code Project (M17): "His call ... if Projects shows in his sidebar menu".
- Clean up the Design System chat group (M21): yes to archive the closed chats and close superseded PRs once
  carried items have homes.
- Process thread changes to the kit, hooks, settings and skills wait for his "now" or the next process
  review (asks rows A124 to A131 on the branch).

The plan's substance in brief: the case study is "a design system built for two audiences, the people who
use the product and the agents who build it", told in three acts; an agent usability test runs before and
after the token publish; work runs in waves (Now, then 0 the token publish, 1 three ready pages, 2 four
mapped pages and Icons, 3 the rest); 87 open items are listed in DS-INVENTORY.md.

## Design system decisions since 1 Oct

From `mondai/reference/DECISIONS.md`. Every entry below carries a "Decided by" line.

| Date | Title | Decided by line |
| --- | --- | --- |
| 2 Oct | Component or not: when an element is library work | yes |
| 2 Oct | Stage 4 screens are drawn from his complete design system | yes |
| 2 Oct | Content frames end on a column edge (grid) | yes |
| 2 Oct | Mondai is dark only (colour collections one mode, named Dark) | yes |
| 2 Oct | Spacing roles: the gaps in the ladders are filled (Gap, Padding, Area ladders; code names) | yes |
| 2 Oct | Core frame padding 32 top and bottom (spacing) | yes |
| 6 Oct | Component or not: acted on elements get states, repetition never makes a component | yes |
| 7 Oct | Shell grid for pages with no sidebar (Shell Margin tokens, Shell layout grid style) | yes |
| 9 Oct | Date numbers have their own Bold style (Numbers/Date text style) | yes |
| 9 Oct | Buttons in a dialog or popover usually fill | yes |
| 10 Oct | Progress stepper completed step is an outlined ring with a check (library override) | yes |
| 10 Oct | Date boxes: number Neutral/100, weekday or month label green | yes |
| 10 Oct | LinkedIn links carry the LinkedIn logo | yes |
| 16 Oct | Sentence case everywhere (titles, buttons, nav and handoff labels) | yes |

Not in DECISIONS.md: the 14 Oct token restructure. Its entry is drafted in
`process/token-picker/DECISION-DRAFT.md` on the PR #179 branch and is not written to the log (PR #173 body:
"not written to DECISIONS.md"). No entry covers publishing or library versions.

## How changes and versions are recorded

- `process/DS-CHANGE-CHECK.md` (agreed 8 Oct): nothing is logged change by change. When a developer pulls,
  he saves a named version in Figma version history, "Dev pulled, what they pulled, date". To find changes,
  a duplicate of that version is compared with the current file and Claude lists removed, added, renamed and
  changed components, variants, properties, variables and styles. The why lives in DECISIONS.md. Limit
  noted there: free plans keep 30 days of history.
- `process/library-sync/` holds the 30 Sep audit and fix of the Input fields update not reaching the MVP
  file, with a gates file, before and after scans and a verify script. It is a one off fix record, not a
  changelog.
- There is no changelog file and no library release notes in the repo. Whether any "Dev pulled" named
  versions exist in Figma could not be read (see below).
- In practice changes are recorded per piece of work: PR bodies and branch files (PR #173, #179 and their
  `process/token-picker/` evidence with before and after snapshots), the working log for what is in flight
  and DECISIONS.md for rulings.
- The 15 Oct plan proposes "a named version saved before any library publish, through the plugin API's
  version save, tested before it is relied on"; that is not in place yet.

## Could not measure

- Figma version history and named versions: the plugin API cannot list version history, so whether any
  "Dev pulled" or pre publish versions exist is unknown.
- Publish state: whether today's local variables, styles and components differ from the last published
  library version is not readable through this API. Statements about publishing come from the working log
  and PR #179 text.
- The five picks of #177: not recorded in any file read (see that section).
- Remote icon library names: the API names the remote component set ("Tdesign icon set") but not the library
  file it came from; the TDesign attribution rests on that set name and the 1 Oct audit note.
- Variant value checks covered the 90 library sets only, not the Mobile workspace or Archived sets.
