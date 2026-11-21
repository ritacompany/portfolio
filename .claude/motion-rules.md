# Motion rules

Read on demand for any animation work on any page of the portfolio, with `.claude/motion-patterns.md`.
If a case study has a motion plan of its own, that plan wins wherever the two differ.

## Two kinds of motion
- **Live** runs in the visitor's browser: scroll entrances, pins, scrubs, staggers, hover, a scripted
  mockup playing on the page. This is the default for anything on a case study page.
- **Clip** is rendered to video: a looping mockup inside a frame, or anything exported for social or Figma.
  Use a clip only when the piece must play identically everywhere, is too heavy to run live (3D, many
  layers) or has to leave the page.
- Say which one at the top of the piece's style guide.

## Interactive pieces
- Interactive UI motion, such as a hover or press effect on a button, gets a scripted pointer through window.seek(t) so it renders and reviews the same way, plus a live page he can use.
- An interactive piece is never done until Chadwick has felt it on a published tuner page (the shipped code
  inlined, the shared edit panel with a control for every value he would feel, Copy values that pastes into the shipped constants) and
  sent settings back or said it feels right. Gates passing, a clip or a screenshot sheet never close it.
  Its GATES.md carries that as an unchecked manual gate until he answers. Worked example: site/dev/week-carousel/index.html.
- Tuners, options pages and preview controls use the shared edit panel, site/dev/preview/edit-panel.js, never a panel of their own: it docks beside what he is tuning instead of over it. A standalone page loads it with one line, `<script src="/dev/preview/edit-panel.js" data-fluid defer></script>`, and lays itself out from its own width (container queries on body). A hook, tuner-panel-guard, sends back any page in site/dev or site/motion-lab that builds its own sliders or selects.
- Page entrances that already run on the browser clock (text fades, image reveals, smooth scroll) stay as built. The renderer cannot capture them frame by frame, so they are reviewed in the browser, not rewritten to fit this contract.

## Both kinds
- Reference first: before code, write docs/motion/<piece>/style_guide.md from a reference (a site's code, a
  frame, a clip): what to take and what not to take. Then docs/motion/<piece>/state_list.md. Then build.
- Every piece has a reduced motion version: the state the motion argues for, at rest. Nothing moves.
- Banned: centered title on a gradient, motion inside media that only fades in, corner labels and frame
  borders, glow on UI, particle bursts, and every pattern marked rejected in motion-patterns.md.
- Real product UI only, from Figma exports. Never redraw a screen.
- Curves a project plan has already settled stay as recorded. New motion inside media uses the closed form
  springs in site/lib/motion.js. Check the start as well as the settle: a stiff spring covers 40 percent of a
  move in 0.2 s and reads as a snap. Presets: UI (tiny overshoot) for phones and chips, TYPE (none) for
  anything with text, HEAVY for big media. A value with several targets uses track().
- Scroll scrubs use a gentle curve (sine in out, cubicBezier(0.37, 0, 0.63, 1)) across most of the range.
  A steep curve leaves the first third of the scroll doing nothing and snaps in the middle.
- Size media to the frame (vh, %, container units), never fixed pixels, so one page works at desktop and
  390 wide.

## Live
- Plumbing is site/js/motion.js: GSAP, ScrollTrigger and Lenis on the GSAP ticker. Do not add a second
  scroll library or a second smooth scroll.
- Start from the shared entrances in motion-patterns.md (text fade, media curtain, stagger) before
  inventing one. A section gets its own moment only when it argues something the shared entrance cannot.
- Animate transform, opacity and clip path only. Reserve every frame's final size before it reveals.
- Entrances fire once. Anything a visitor triggers reverses from where it is.

## Clip: the render contract
- Every clip is a pure function of time or scroll progress. window.seek(t) paints frame t.
- No setTimeout, no carried state between frames, no CSS transitions in render mode. requestAnimationFrame
  only drives seek in live preview, never in render mode (window.__RENDER__ is true there).
- Never Math.random. Use rng(seed) or noise(x, seed) from site/lib/motion.js. The renderer fails any render
  that calls Math.random during a seek.
- Scroll driven clips read progress from the scroll position, so the renderer can scrub them. Never a lagging
  scrub (`scrub: 1`) or a smooth scroll lerp in render mode: both depend on scroll history.

## Review loop, before Chadwick sees anything
Problems are ranked, never scored: a score out of 10 finds nothing to fix (HyperFrames review guide).
- P0: must fix before anyone sees it. A pop, stutter or jump, anything cropped or clipped, layout shift,
  unreadable text at 390 wide, a clip seam that does not loop, a banned or rejected look.
- P1: fix this round unless it would cost more than the piece is worth: pacing, weak composition, a spring
  that snaps at the start.
- P2: note it, fix when cheap.

Each round:
1. Capture.
   Live: `node scripts/live-capture.mjs --page <page> --target "<section>" --items "<moving elements>"`, plus
   `--hover "<element>"` when anything responds to hover. It steps the page clock frame by frame at 1440 and
   390 wide, with motion on and with reduced motion on, and writes contact sheets, hover sheets and a report
   to output/motion/live/<page>/. Every P0 in its report is a P0 here. Look at every sheet for what numbers
   cannot judge. The built in browser is for a last look only: it freezes animation while its pane is hidden.
   Clip: render with `node scripts/render.mjs`, then again at `--width 390`. Then make the sheets with
   `node scripts/motion-review.mjs <clip> --state docs/motion/<piece>/state_list.md --loop`
   (drop `--loop` for a scrub): the contact sheet, the strips around every cut and seam and the 360 wide phone sheet.
2. List your own P0, P1 and P2 problems with times or scroll positions.
3. Fresh eyes: a subagent on Sonnet that sees only style_guide.md, state_list.md and the review images,
   never the code or your list. It returns its own P0, P1 and P2 list. Prompt it as a harsh motion director.
4. Write the round in docs/motion/<piece>/review_log.md:
   ## Round N
   Fresh eyes: <one line summary of what the subagent saw>
   - P0: <time or position> <problem>
   - P1: ...
   (or "No problems found" when both lists are empty)
5. Fix every P0. Run another round only while a P0 is open. P1 and P2 do not need another round.
6. Done when `node scripts/motion-check.mjs log docs/motion/<piece>/review_log.md` passes. Live pieces also
   need live-capture to print LIVE_CAPTURE_CLEAN. Clips also need
   `node scripts/motion-check.mjs strips output/motion/<clip>-review --state docs/motion/<piece>/state_list.md --loop`
   and, before shipping, two renders whose sha256 lines match.
