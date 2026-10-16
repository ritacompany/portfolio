# Portfolio launch tracker

Any Claude or Codex session, on any account, starts here. This is the ordered plan for getting
the portfolio up: what happens in what order, who does it and what it waits on.

The source is his own notes, kept verbatim in `reference/launch/2026-10-15-progress-notes.md`.
Judge this file against those notes, never the other way round. If something in the notes is
not here, add it with its Stage and Waits on.

`node scripts/check-tracker-order.mjs` must print "tracker order OK" after any edit: every row
has a Stage and a Waits on, and nothing waits on something in the same or a later stage.

Owner: C (Chadwick only), AI (Claude or Codex, Chadwick audits), both.
Status: open, decision (needs Chadwick), in progress (name the session), done.

Names: the Mondai case studies are the **framework CS**, the **design system CS** and the
**leadership CS**. CS1, CS2 and CS3 are retired as names. `reference/cs2/` is the framework CS.

## The order, in one view

The hero is the hinge. Its elements, three of which become the superpower visuals, decide the
hero layout, the superpowers section, the grid, the motion and the build. So the first job is
his: settle the element roster now, then the two superpower concepts that do not exist yet,
once the cats test is in hand. While he does that, AI works only on things that do not depend on the hero: Figma cleanup, the work and
collection page foundations, a cats animation test that feeds his decision, and the site setup.
The case studies run alongside the whole time because they are the longest pole.

| Stage | Chadwick | AI |
|---|---|---|
| 1 | Hero element roster (H5); headline and hero copy (H1 with AI help, H3, H4); header style (H23); footer pick (H16); colors (H19); copy fixes (F2, F3); collection layout (F9); framework CS and design system CS content | Cats animation test (H6t); Figma cleanup on a duplicate (H17, H18, F1, F10); Mondai mockup (H12); simple work card states (H11); about panel proposal (H14); audit of earlier animations (H21); site setup (S0) |
| 2 | Superpower concepts, with the cats test in hand (H6) | Nav (H8); collection page states (H13); footer animation (H16a) |
| 3 | Make the visuals (H5m); section titles (H10) | Superpowers section layout, shorter (H15a) |
| 4 | Hero composition (H20); superpowers section with visuals (H15b) | Grid options (H9) |
| 5 | Approve motion | Hero and element motion (H7) |
| 6 | Audit | Build in code (S1, S2) |
| 7 to 8 | Domain access, final review | QA and launch (S3, S4) |

## Where the design lives

Figma file `IarvWaqjIwrZ2afQmMxKm6`, section "Portfolio home" (`3461:5700`).

| Frame | Node | What it is |
|---|---|---|
| Master | `4226:8899` | The homepage: hero, work, about, footer. 1440 by 3391. Nobody edits it directly; AI works on duplicates |
| Superpowers section | `4270:5765` | The future section under the hero. 1440 by 2068 |
| Mondai case studies frame | `4288:36293` | Collection page, list layout with arrows and case study pills |
| Collection page, card layout | `4285:34478` | An alternative: three image cards, the design system card shows real components |
| mondai hero frame | `4282:15444` | Layered source for the Mondai card mockup, 2000 by 1200 |
| Older "Master" | `3461:7711` | A second frame named Master at the same position as the real one, 915 tall |
| Exploration | `3461:5702` | Hero variants, footer studies and his element notes |
| HERO INSPIRATION | `4238:11292` | His main hero reference, in "Notes & assets" (`3461:7616`) |

## Launch definition (v1)

- [ ] L1 Homepage live: hero, superpowers, work, about panel, footer
- [ ] L2 Mondai collection page live. If the design system CS is not ready, the Mondai card
      goes straight to the framework CS and the collection page waits
- [ ] L3 Framework CS finished and approved
- [ ] L4 Design system CS finished and approved (wanted for launch, not required)
- [ ] L5 Every link, hover and state works; no placeholder copy or image ships
- [ ] L6 Deployed on Vercel at chadwickfenner.com, indexing on

The leadership CS is after launch (C4).

## Inventory

| # | Item | Owner | Stage | Waits on | Status |
|---|---|---|---|---|---|
| H5 | Hero element roster: seven elements, which three carry the superpowers. His canvas plan: one sticker, two 3D, one flat object (CD), two images, one label. Open: the disco ball (loves it, does not map to a superpower, would need his own version), the second 3D element, the photo of him (may go or be fixed), "babies" (his canvas note says all contingent on it) | C | 1 | nothing | decision |
| H6 | Superpower concepts. Energy that pulls people in: welcome mat. Pattern recognition: no settled idea; cats pattern considered, worried the animation gets too complex on a real photo. Quietly moving the needle: "potentially" a kooky red wig. Two of three still need a settled concept | C | 2 | H6t | open |
| H6t | Cats animation test: how a cat cutout pattern could move, built from the cat cutouts on the canvas, so he can keep or drop the cats idea on evidence | AI | 1 | nothing | done, awaiting his review: `prototypes/homepage-foundations/cats-motion-test.html` (Multiply recommended, Sort backup, Ripple overcomplicated) |
| H1 | Hero headline: keep "I'm not really that cool," or move to the "convinced that people would be happier" line as a marquee that settles on hover, centered or left at the superpower indent. He asked for help with this messaging | both | 1 | nothing | decision: options ready, awaiting his pick: `prototypes/homepage-foundations/headline-options.html` (both lines as the marquee, settle centered or left at the indent; AI recommends A in the hero, B kept as the superpowers headline) |
| H3 | "Homosexual 1991 to current" line: keep, tune or cut | C | 1 | nothing | open |
| H4 | Chicago and New York in the hero. His earlier ruling: Chicago out of the hero, into contact; if it appears sooner, New York leads and Chicago is the aside. Reopening it is his call | C | 1 | nothing | decision |
| H16 | Footer: pick the black and white animated transition from his options and finish the footer frame (transition and footer in one frame) | C | 1 | nothing | decision: options ready, awaiting his pick: `prototypes/homepage-foundations/footer-transitions.html` (A stripes from his reference, B his own bar study 3744:3304; AI recommends B) |
| H19 | Final colors, including the contact button | C | 1 | nothing | open |
| F2 | Footer email reads CHADWICK@CHADWICKFENER.COM, missing an N; confirm the real address | C | 1 | nothing | open |
| F3 | Superpower lines are worded differently in the About section and the superpowers frame; pick one | C | 1 | nothing | open |
| F9 | Collection page: list layout or card layout | C | 1 | nothing | decision |
| H17 | Gray line at the top of the master: trace and remove on a duplicate | AI | 1 | nothing | done, awaiting his review: copy `4308:6176`. Cause: Inner shadow effect (#5C5C61, y 4, blur 4) on master frame `4226:8899`, removed in the copy |
| H18 | Layer cleanup in the master, on a duplicate he swaps in | AI | 1 | nothing | done, awaiting his review: copy `4308:6176`. Three hidden old superpowers layouts deleted, 25 default-named layers and 13 text layers renamed, nothing visible changed |
| F1 | Typo "some fo the right people" in both frames | AI | 1 | nothing | done, awaiting his review: copy `4308:6176` (`4308:6238`) and superpowers frame (`4250:11960`) |
| F10 | Collection page still lists the leadership CS; remove the row for launch | AI | 1 | nothing | done, awaiting his review: Leadership CS row `4288:36323` hidden in `4288:36293` |
| H12 | Mondai card: the screen graphic sits on top of the monitor and overhangs the bezel; place it inside the display, ratio close to the screen, text kept sharp. Source layers in `4282:15444` | AI | 1 | nothing | done, awaiting his review: copy `4308:6176`, layers "Display glass" and "Mondai screen" in the Mondai card, perspective warped at 3x from `4282:15444` |
| H11 | Work cards: links, hover and states, simple foundation first ("we just need to create our foundation first") | AI proposes, C approves | 1 | nothing | done, awaiting his review: `prototypes/homepage-foundations/work-card-states.html` |
| H14 | About becomes a left slide-out panel, no scroll, collapsible, opened from a button in the superpowers section and from the nav | AI proposes, C approves | 1 | D2 | done, awaiting his review: `prototypes/homepage-foundations/about-panel.html` (reasoning on the page; button label is a placeholder) |
| S0 | Site setup: code base, fonts, deploy pipeline, so the build in stage 6 is assembly, not setup. The Sep homepage code is against an older design; reuse what holds | AI | 1 | nothing | done, awaiting his review: `docs/SITE_SETUP.md`, code in `site/` (deploy unchanged, still the holding page) |
| C1 | Framework CS: sections 3 to 8, then intro and story. Process: `reference/cs2/CS2_PROCESS.md` | both | 1 | nothing | in progress, framework CS sessions |
| C2 | Design system CS: sources in `reference/design-system-cs/` (SOURCES.md, GAPS.md) | both | 1 | nothing | sources gathered, awaiting his review |
| C3 | Haven: in the work section; branch state is in triage | C | 1 | nothing | open |
| H22 | Something else he meant to add about the hero and forgot | C | 1 | nothing | open |
| H23 | Header style: VS Goods narrow creative buttons with the small background; does it work with this design | both | 1 | nothing | decision: options ready, awaiting his pick: `prototypes/homepage-foundations/header-styles.html` (take 1 today's spread, take 2 narrow buttons on a plate; AI recommends take 2; VS Goods screenshot not found in the named frames, take 2 built from his description) |
| H21 | Earlier animations for this page: check which still work after the redesign, before new motion is planned | AI | 1 | nothing | done, awaiting his review: `reports/homepage-animation-audit.md` (little homepage motion existed; Haven scroll and reveal grammar recommended as the base) |
| H5m | Make the visuals: his own disco ball if it stays, the 3D elements, the superpower visuals, the photo | C | 3 | H5, H6, H6t | open |
| H8 | Navigation: none in the hero; appears once past it, at the superpowers section (cw logo, Work, About, Contact) | AI | 2 | H14, H23 | built on default today's header style, provisional: `prototypes/homepage-foundations/nav-scroll.html` (drops in as the hero leaves, About opens the H14 panel; a toggle shows it with H23 take 2) |
| H15a | Superpowers section layout, shortened so work starts within the third screen (frame is 2068 tall today) | both | 3 | H6, H1, F3 | open |
| H13 | Collection page: Mondai card hover and arrow, page interactions, components, simple first. If the design system CS misses launch, the card links straight to the framework CS with labels changed to match | AI proposes, C approves | 2 | F9, F10 | open |
| H16a | Footer transition animation | AI | 2 | H16 | options ready, awaiting his pick: both H16 options animated and scroll scrubbed in `prototypes/homepage-foundations/footer-transitions.html` |
| F5 | About 320 of empty black below the work cards: tighten or keep for something | C | 2 | H11 | open |
| H20 | Hero composition in Figma with the real elements and final copy | C | 4 | H5m, H1, H3, H4, H23 | open |
| H15b | Superpowers section with the real visuals, one simple animation idea each | both | 4 | H5m, H15a, F3 | open |
| H10 | Section titles for work and about, once the About content has moved into the panel | C | 3 | H14 | decision |
| H9 | Background grid: continue, stop or change at the superpowers section; never behind work or about. His note: easier once the superpowers section is in place | AI prototypes, C picks | 4 | H15a | open |
| H7 | Hero to superpowers motion: the three superpower elements travel from the hero into their frames; hero marquee; simple element animations; parallax where it helps; scroll speed tuned so the superpowers step before work feels short | AI, C approves | 5 | H20, H15b, H21, H8 | open |
| S1 | Build the homepage in code | AI | 6 | S0, H7, H9, H10, H16a, H8, H11, F5, H12, H19, F1, F2, F3 | open |
| S2 | Build the collection page and the case study pages | AI | 6 | S0, H13, C1 | open |
| S3 | Site wide QA: links, hovers, states, breakpoints | AI, C audits | 7 | S1, S2 | open |
| S4 | Deploy to Vercel on chadwickfenner.com, indexing on | AI, C for domain access | 8 | S3 | open |
| C4 | Leadership CS: after launch. Needs more conversations with Michael; the first approach did not land with him. May become smaller pieces about the organizational and process work, under a name other than case study | C | 9 | S4 | after launch |

## Decisions

- **D2 Superpowers sit between the hero and work. Decided by Chadwick, 15 Oct.** The hero does
  not say who he is; the superpowers section does, in a short step, with the about panel a
  click away. Hiring research (`reports/What gets designers interviewed.md`: 10 to 30 second
  scans, 81% of viewing in the first three screens) points to keeping that step short, which
  is H15a.
- **D6 The superpowers section ships at launch, under the hero. Recommended 16 Oct.** The case
  studies are the long pole: the framework CS has 5 of 10 sections not started and the design
  system CS is only gathering sources. The homepage path with superpowers (stages 1 to 6) is
  shorter than that, so including it does not move the launch date. Fallback, at no cost: if
  the homepage ever becomes the thing launch waits on, ship the master as it is today, with the
  superpowers as a row in the About section, and add the section after launch.
- **D7 Which line goes where (H1), his call.** With the superpowers section under the hero, the
  "convinced that people would be happier" line can only lead one of them. Recommended: the hero
  keeps "I'm not really that cool," as the marquee, and the superpowers section opens with the
  "convinced" line, as the superpowers frame already does. A sentence that long cannot be read in
  a moving marquee, which is why his note already needed a hover-settle fix for it; the short
  line can. His note 1 proposed the opposite, which is why it is his call.
- **D4 Two working sessions at once, plus the coordinator.** Recheck the pace after the weekly
  limit resets on 19 Oct.
- **D5 Homepage Figma tasks pass the build gate. Decided by Chadwick, 15 Oct.** The gate lets a
  Figma write through when his latest typed message names homepage Figma work ("homepage" or
  "home page" plus "figma"). Framework CS work still needs "build". Proven by
  `node reference/cs2/test-figma-gate.mjs`.

## Skills

- **figma-use**: always loaded before any `use_figma` call, no need to ask. Figma edits still
  need a task he gave.
- **top-design** (the award-site skill) and **gsap-scrolltrigger**: stage 4 motion. Not
  motion-framer, which is React; the site is plain HTML and JS.
- **no-ai-slop** for copy outside the case studies. **humanizer** only when he asks to compare.
- **deep-research**: only for a question the `reports/` folder does not already answer.
- **unlazy**: gates on long builds.

## Sessions

At most two besides the coordinator, and only on rows whose Waits on is done.

1. **Figma hygiene** (H17, H18, F1, F10, H12): starts when his message names homepage Figma
   work. Duplicate the master; never edit it.
2. **Foundations** (H6t, H11, H14, H21, S0): the cats test, the simple work card states, the about
   panel proposal and the site setup.

## Handoff: never lose work to a usage cutoff

1. Every finished step is committed and pushed to GitHub at once, approved or not;
   unapproved work says so in its commit message and status.
2. At each step boundary the session reads the usage meter. At 85% of the five hour or weekly
   limit it starts nothing new, writes where it is under "In flight", commits and pushes.
3. State lives in files on `main`, never only in a branch or a chat.
4. Another account reads `CLAUDE.md`, then this file, then the notes it came from, then the
   area file it picks up (`reference/cs2/CS2_PROCESS.md` for the framework CS).

## In flight

- **Foundations (16 Oct):** H6t, H11, H14, H21 and S0 are done and pushed, all awaiting his review. Prototypes in `prototypes/homepage-foundations/` (open with any static server, for example `python3 -m http.server --directory prototypes`). Nothing touched Figma or the deploy.
- **Coordinator (15 Oct):** tracker rebuilt as an ordered plan from his verbatim notes, after he
  flagged that the flat list scheduled motion ahead of the hero elements it depends on. Fix
  record: `fixes/2026-10-15-tracker-ordering.md`. Next: start the stage 1 AI sessions on his
  word.
- **at-risk-triage:** both local-only branches are pushed. His keep, merge or drop call on each
  item is open.
- **Uncommitted main-checkout work** belongs to the framework CS and research sessions and is
  backed up, unreviewed, on branch `wip/main-checkout-2026-10-15`. `output/` (298 MB) and
  `.playwright-cli/` exist only on this Mac.
