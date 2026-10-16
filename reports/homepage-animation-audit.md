# Homepage animation audit (H21)

16 Oct 2026. Status: done, awaiting Chadwick's review. Nothing here is approved.

Question: which animations were already worked out for the homepage, and which still fit the
current master (`4226:8899`) and superpowers section (`4270:5765`)?

## The short answer

Very little homepage motion was ever built. The September homepage work was deliberately
motion free: `docs/HOMEPAGE_RESPONSIVE_SPEC.md` on both branches calls itself the source of truth
for "non-motion behavior" and repeats "States have no animation" for every component.
`site/main.js` opens with the comment "No motion." What was worked out was states, a menu, a
live clock and a panel, all without movement.

The real motion system from that period is the Haven case study grammar in
`docs/HAVEN_MOTION_PLAN.md`. It was written for the Haven page, but its smooth scroll and
reveal rules are the one piece worth carrying to the homepage.

So H7 (hero and element motion) starts close to fresh. The hero marquee, the nav reveal, the
element travel, parallax and the grid were never built anywhere.

## Sources read

| Source | Branch | What it holds |
|---|---|---|
| `site/index.html`, `site/styles.css`, `site/main.js` | `claude/optimistic-euler-q7025d` (13 Sep) | The canonical September homepage, responsive 320 to 2048 |
| `docs/HOMEPAGE_RESPONSIVE_SPEC.md`, `docs/DECISIONS.md` | both | Behavior spec and decisions |
| `site/homepage.js`, `site/index.html`, studies | `codex/homepage-responsive` (19 Sep WIP) | Later homepage revision with the Mondai panel |
| `docs/HAVEN_MOTION_PLAN.md`, `site/haven-ending-anim.html` | `codex/homepage-responsive` | Haven case study motion |
| `site/mondai-pattern-study/` | `codex/homepage-responsive` | Square pattern placement lab |
| `prototypes/journey-map/` | `main` | Haven flow animation, built |
| `public/index.html`, `public/styles.css` | `main` | Current deploy placeholder |

## Inventory

### Built for the homepage

| # | What it is | Where | Motion | Fits the current master? |
|---|---|---|---|---|
| A1 | Sticky header, logo plus HOME, ABOUT, CONTACT, visible from the top of the page | optimistic-euler `site/styles.css` `.site-header` | None, position sticky only | **No, as designed.** The master has no nav in the hero; the nav appears at the superpowers section (H8). Keep the mechanics: the canvas uses `overflow: clip` instead of `hidden`, the fix that made sticky work at all |
| A2 | Hover, focus and pressed states for nav, cards, Mondai index rows and footer links: underline and brighten on hover, 2px focus outline, Neutral 500 when pressed, 44px hit areas | Spec "Default, hover, focus and active states" on every component | None by rule | **Partly.** The focus outline, pressed color and 44px floor still hold. The card rules do not: they style a "view cue" the current cards no longer have, and the current titles are bracketed. H11 now proposes small motion on hover, which overturns the September "no animation" rule if approved |
| A3 | Compact full screen menu below 1120px, opened from the CONTACT pill, focus trapped, Escape closes, scroll locked | optimistic-euler `site/main.js` | None | **Yes, with one change.** The master nav still ends in a CONTACT pill, so the trigger idea holds. It must only exist once the nav has appeared (after the hero), per H8 |
| A4 | Live Chicago clock in the footer, ticking each second, daylight time aware | Both branches, `main.js` and `homepage.js` | Text update only | **Yes, directly.** The master footer still reads CHICAGO, IL // 10:24PM CST. Reuse the codex version, which prints the zone correctly as CDT or CST |
| A5 | Mondai panel: a full screen overlay opened from the Mondai card, listing the case studies | codex `site/homepage.js`, `.mondai-panel` | None | **No.** The Mondai card now opens a separate collection page (`4288:36293`). The dialog mechanics (focus to close, Escape, focus returned to the trigger) are reused in the H14 about panel |
| A6 | "Foundation ready" deploy placeholder, with a rule that draws in over 900ms | `main` `public/` | One CSS keyframe | **No.** Placeholder only; it goes when the site replaces it (S0) |

### Built or planned for other pages

| # | What it is | Where | Motion | Fits the current homepage? |
|---|---|---|---|---|
| B1 | Smooth scroll: Lenis, duration 1.2, driven by the GSAP ticker with lag smoothing off | `HAVEN_MOTION_PLAN.md`, "Settled by the prototype" | Weighted scroll | **Yes, recommended site wide.** H7 already asks for scroll speed tuned so the superpowers step feels short, which needs a controlled scroll. One setting for the whole site keeps the homepage and case studies feeling like one product |
| B2 | Text entrance: each text block fades in over 1s, title then body 0.1s apart, once, when the block is 100px into the screen. Reduced motion makes it instant | `HAVEN_MOTION_PLAN.md`, "Page wide rules" | Fade only, no movement | **Yes, for the lower page.** Fits work captions and the footer. Not for the hero or the superpowers headline, which get their own moments (H1, H7) |
| B3 | Media entrance, MaskReveal: the frame opens top to bottom as a curtain while the image inside settles from 1.3 to 1 scale, 0.8s, ease in out, once | `HAVEN_MOTION_PLAN.md` | Clip and scale | **Yes, for the two work cards.** It gives the cards an entrance without inventing a new grammar. Check it against the H11 hover scale so the two do not fight |
| B4 | Rejected text effects: line splits, masked rises, tilt, blur, word cascades and scroll lit text were tried and turned down as aggressive or hard to read | `prototypes/journey-map/README.md` via the plan | n/a | **Still binding.** The H1 marquee is a different thing (a moving line, not a reveal), but the settling on hover must not slide into these |
| B5 | Confidante journey flow: the straight shuffle, 1700ms timeline | `main` `prototypes/journey-map/` | Built | **Not homepage.** Stays with the Haven case study |
| B6 | Haven ending animation | codex `site/haven-ending-anim.html` | Built study | **Not homepage.** Haven case study |
| B7 | Mondai square pattern lab | codex `site/mondai-pattern-study/` | None, a placement tool for the Mondai website hero | **Not homepage motion.** Ignore for H7 |

### Never worked out anywhere

These all start fresh in H7, H8, H9 and H16a: the hero marquee and its settle on hover (H1), the
nav appearing at the superpowers section (H8), the three hero elements travelling into the
superpower boxes (H7), parallax, the background grid (H9), the footer black and white transition
(H16a) and the superpower box animations (H15b, informed by the H6t cats test).

## What to carry forward

1. **Adopt B1 to B3 as the site wide base grammar** when H7 starts: Lenis scroll, one text fade,
   one media curtain. The homepage's special moments (marquee, element travel, cats) sit on top of
   that base rather than each inventing their own entrance.
2. **Reuse A3, A4 and the A1 sticky fix in the build** (S1); they are behavior, not design, and
   they survived the redesign.
3. **Retire A2's "no animation" rule** only if Chadwick approves the H11 hover motion. Until then
   both exist and the H11 page says so.
4. **Drop A5 and A6.**

What would change this: if Chadwick remembers a specific homepage animation from September that is
not in any of these files (for example something prototyped in Figma or in a chat that never
reached the repo), it needs adding here before H7 starts.
