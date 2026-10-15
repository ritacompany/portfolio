# Portfolio launch tracker

Any Claude or Codex session, on any account, starts here. This is the single running list of
what is left before the portfolio goes up, who owns each item and what is decided. It comes
from Chadwick's 15 Oct 2026 notes and from reading the Figma file the same day. If an item is
not here, add it rather than keeping it in a chat.

Status: open, decision (needs Chadwick), in progress (name the session), done.
Owner: C (Chadwick only), AI (Claude or Codex alone, Chadwick audits), both.

Names: the three Mondai case studies are the **framework CS**, the **design system CS** and the
**leadership CS**. CS1, CS2 and CS3 are retired as names. Folders on disk still say `cs1` and
`cs2` (`reference/cs2/` is the framework CS) until someone renames them.

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

The site goes up when all of these are true. Anything else is after launch.

- [ ] L1 Homepage live: hero, superpowers, work, about panel, footer
- [ ] L2 Mondai collection page live. If the design system CS is not ready, the Mondai card
      goes straight to the framework CS and the collection page waits
- [ ] L3 Framework CS finished and approved
- [ ] L4 Design system CS finished and approved (wanted for launch, not required)
- [ ] L5 Every link, hover and state works; no placeholder copy or image ships
- [ ] L6 Deployed on Vercel at chadwickfenner.com, indexing on

The leadership CS is after launch (C4).

## What reading the Figma file turned up

| # | Finding | Fix | Owner |
|---|---|---|---|
| F1 | Typo "some fo the right people" in the superpowers copy, in both the master About and the superpowers frame | "some of the" | C or AI |
| F2 | Footer email reads CHADWICK@CHADWICKFENER.COM, missing an N | Fix spelling, and check the real mailbox address | C |
| F3 | The superpower lines differ between frames: "The eye to see" vs "An eye for"; "pulls people in" vs "draws people in"; periods on two of three | Pick one version | C |
| F4 | Mondai card: the screen graphic sits flat on top of the monitor and overhangs its bezel instead of sitting in the display | Re-place inside the screen, perspective matched; text must stay sharp | AI |
| F5 | Works section: the cards take 649 of its 1004 height, leaving about 320 of empty black below | Tighten, unless the space is meant for a later item | C decides |
| F6 | The gray line: a light gradient across the top few pixels of the hero render. Not traced yet; the read tools (get_metadata, get_screenshot) can trace it now, Suspects: an effect on the hero top bar, or the older "Master" frame at the same position | Trace and remove on a duplicate | AI |
| F7 | Footer transition is a 291 tall gray placeholder | His animated black and white piece goes here | C picks, AI animates |
| F8 | The superpowers frame is 2068 tall, about 2.3 screens at 900. With the 812 hero above it, work starts near 2,880 down | See D2 | both |
| F9 | Two layouts exist for the collection page (list and cards) | Pick one | C |
| F10 | The collection page still lists the leadership CS | Remove the row for launch | AI |

## Inventory

### Homepage

| # | Item | Owner | Status |
|---|---|---|---|
| H1 | Hero headline. Current: "I'm not really that cool," as a cropped marquee. Candidate: the "convinced that people would be happier" line. Idea: it settles on hover, centered or left at the superpower indent | C copy, AI motion | decision |
| H2 | Who he is as a designer. The top bar already says [ Product Designer ]; the superpowers section under the hero now carries the rest (D2) | both | open |
| H3 | "Homosexual 1991 to current" line: keep, tune or cut | C | open |
| H4 | Chicago. Top bar: [ Seeking roles in NYC ]. Footer: "Chicago, IL", "Looking to relocate to NYC". His earlier ruling (about-page record): Chicago out of the hero, into contact; if it appears sooner, New York leads and Chicago is the aside. Reopening it is his call | C | decision |
| H5 | Hero elements, seven in total. His canvas plan: one sticker, two 3D, one flat shaped object (CD), two images, one label. Notes: "3d = eye", "3d = alien thing?", "image = pattern recognition (babies?)", "sticker = babies", "image = me, photo of me smiling with new haircut", "label = ?", "all contingent on babies thing", "dont love the look for that". Current placeholders: two cats, magenta block, spiked disco ball (inspiration only, needs his own version), chess photo of him, two gray ellipses | C creates, AI supports | open |
| H6 | Superpower visuals, one each. Energy that draws people in: welcome mat. Pattern recognition: cats pattern, worried a real photo makes the animation too complex. Quietly moving the needle: kooky red wig (Drag Race España judge wig, blue eye outfit). Slot 01 is empty, 02 and 03 hold cat placeholders | C creates, AI tests animation | open |
| H7 | Hero to superpowers transition: three hero elements travel into the superpower frames | AI prototype, C approves | open, v1 (D2) |
| H8 | Navigation: none in the hero; appears after it (cw logo, Work, About, Contact button as in the superpowers frame) | AI | open |
| H9 | Background grid: hero has one; could continue, stop, or change at the superpowers section. Never behind work or about | AI prototypes, C picks | open |
| H10 | Section titles for work and about, given the about rows already carry labels | C | decision |
| H11 | Work cards: links, hover, states. Simple first | AI proposes, C approves | open |
| H12 | Mondai card mockup (F4) | AI | open |
| H13 | Collection page interactions, card hover and arrow, components | AI proposes, C approves | open |
| H14 | About becomes a left slide-out panel: no scroll, collapsible, opened from a button in the superpowers section and from the nav | AI build | open, v1 (D2) |
| H15 | Superpowers section under the hero, one visual and one simple animation each | both | open, v1 (D2) |
| H16 | Footer finish and the transition (F7) | C picks, AI animates | open |
| H17 | Gray line (F6) | AI | open |
| H18 | Layer cleanup in the master, on a duplicate he swaps in | AI | open |
| H19 | Final colors | C | open |
| H20 | Header inspiration: VS Goods narrow creative buttons; his HERO INSPIRATION frame `4238:11292` | reference | open |
| H21 | Earlier animations and parallax: check what survives the redesign | AI | open |
| H22 | Something else he meant to add and forgot | C | open |

### Case studies

| # | Item | Owner | Status |
|---|---|---|---|
| C1 | Framework CS: sections 3 to 8, then intro and story. Process: `reference/cs2/CS2_PROCESS.md` | both | in progress, framework CS sessions |
| C2 | Design system CS: no material in the repo yet | both | open |
| C3 | Haven: on the work section; its branch state is in triage (P1) | C | open |
| C4 | Leadership CS: after launch. Needs more conversations with Michael; the first approach did not land with him. May become smaller pieces about the organizational and process work, under a name other than case study | C | after launch |

### Site build

| # | Item | Owner | Status |
|---|---|---|---|
| S1 | Build the homepage in code from the current master. A Sep responsive homepage exists on older branches against an older design; reuse what holds | AI | open |
| S2 | Collection page and case study pages in code | AI | open, after designs |
| S3 | Site wide QA: links, hovers, states, breakpoints | AI, C audits | open |
| S4 | Vercel deploy and the chadwickfenner.com domain (holding page on `main` is noindex) | AI, C for domain access | open |

### Working setup

| # | Item | Owner | Status |
|---|---|---|---|
| P1 | Unpushed branches and uncommitted files: what each holds and whether it is current | both | in progress, session "at-risk-triage" |
| P2 | Usage-aware handoff (below) | AI | done |
| P3 | Skills (below) | AI | done |
| B1 | Figma build gate blocked homepage Figma work | C | done (D5) |

## Decisions

- **D2 Superpowers sit between the hero and work. Decided by Chadwick, 15 Oct.** His reason:
  the hero does not say who he is, and the superpowers section does that in a step short
  enough that a hiring manager keeps going, with the about panel a click away. That holds: the
  hiring research in `reports/What gets designers interviewed.md` says reviewers scan in 10 to
  30 seconds and spend 81% of viewing time in the first three screens, and both point to
  keeping the step short, not to removing it. Design input from F8: the superpowers frame is
  about 2.3 screens tall today (2068 at a 900 screen). Aim for work to start inside the third screen; scroll speed and
  pinned motion can carry part of that.
- **D4 Two working sessions at once, plus the coordinator.** Agreed. Recheck the pace after the
  weekly limit resets on 19 Oct.
- **D5 Homepage Figma tasks pass the build gate. Decided by Chadwick, 15 Oct.** The gate lets a
  Figma write through when his latest typed message names homepage Figma work ("homepage" or
  "home page" plus "figma") and does not say not to. Framework CS work still needs "build".
  Proven by `node reference/cs2/test-figma-gate.mjs` (18 cases; the old gate fails the two new
  pass cases).

## Skills

- **figma-use**: always loaded before any `use_figma` call, no need to ask. Figma edits still
  need a task he gave.
- **top-design**: the award-site skill. Used for the homepage motion and polish.
- **gsap-scrolltrigger**: for the scroll choreography (hero to superpowers travel, pinned
  sections). Fits with top-design, which recommends ScrollTrigger for multi-step sequences and
  Lenis for weighted scroll. Not motion-framer, which is React; the site is plain HTML and JS.
- **no-ai-slop** for copy outside the case studies. **humanizer** only when he asks to compare.
- **deep-research**: not needed for anything open now. Use it when a question needs a
  multi-source web report that the `reports/` folder does not already answer.
- **unlazy**: gates on long builds.

Motion is built in code against the real frames, not in Figma. That is where current models
are strongest: motion written as code (HTML, canvas, SVG, Three.js) and rendered, then edited
by changing the code.

## Parallel sessions

At most two at a time besides the coordinator. None edits the master frame.

1. **at-risk-triage**: running.
2. **Motion lab**, next: an HTML prototype from the real frames of the hero marquee (H1), nav
   reveal (H8), grid options (H9), work card hover (H11) and a first pass of the hero to
   superpowers travel (H7). He reacts to real motion instead of describing it. Needs no Figma
   writes, so B1 does not block it.
3. **Figma hygiene**, unblocked by D5; starts when his message names it: duplicate the master, trace the gray line, clean layers, fix
   the Mondai mockup, fix F1 and F10.

The framework CS keeps running in its own sessions.

## Handoff: never lose work to a usage cutoff

No hook can read the usage meter; only a live session can, and a cutoff can land mid step. So
the protection is small steps, with the meter as an early warning.

1. Every finished step is committed and pushed to GitHub at once, approved or not;
   unapproved work says so in its commit message and status. This holds for every account,
   because memory on one Mac does not travel.
2. At each step boundary the session reads the usage meter. At 85% of the five hour or weekly
   limit it starts nothing new, writes where it is under "In flight", commits and pushes.
3. State lives in files on `main`, never only in a branch or a chat.
4. The other account reads `CLAUDE.md`, then this file, then the area file it picks up
   (`reference/cs2/CS2_PROCESS.md` for the framework CS).

## In flight

One line per running session: session, item, where it stopped, next step.

- Coordinator (15 Oct): tracker rebuilt after reading the Figma file; blind audit found three holes and one wrong number, all fixed. D5 done. Next: start the motion lab.
- at-risk-triage (15 Oct): `haven/case-study` and the `7bb1556` WIP are now pushed to GitHub, so
  nothing in a branch is local only. Waiting on Chadwick for merge, archive or drop per item; the
  item by item table is in this session's report.
