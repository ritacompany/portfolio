# Motion rules

Read on demand for any animation work on any page of the portfolio. If a case study has a motion plan
of its own, that plan wins wherever the two differ.

## Scope
- These rules cover motion inside media (loops, a rotating phone, scroll driven mockups, any clip rendered to video) and interactive UI motion such as a hover or press effect on a button: those get a scripted pointer through window.seek(t) so they render and review the same way, plus a live page he can use.
- An interactive piece is never done until Chadwick has felt it on a published tuner page (the shipped code
  inlined, the shared edit panel with a control for every value he would feel, Copy values that pastes into the shipped constants) and
  sent settings back or said it feels right. Gates passing, a clip or a screenshot sheet never close it.
  Its GATES.md carries that as an unchecked manual gate until he answers. Worked example: site/dev/week-carousel/index.html.
- Tuners, options pages and preview controls use the shared edit panel, site/dev/preview/edit-panel.js, never a panel of their own: it docks beside what he is tuning instead of over it. A standalone page loads it with one line, `<script src="/dev/preview/edit-panel.js" data-fluid defer></script>`, and lays itself out from its own width (container queries on body). A hook, tuner-panel-guard, sends back any page in site/dev or site/motion-lab that builds its own sliders or selects.
- Page entrances that already run on the browser clock (text fades, image reveals, smooth scroll) stay as built. The renderer cannot capture them frame by frame, so they are reviewed in the browser, not rewritten to fit this contract.

## Reduced motion
- Every piece has a reduced motion version: one still frame, the state the motion argues for (the phone facing the viewer, the screen at rest). Nothing inside the media moves.

## Render contract
- Every animation is a pure function of time or scroll progress. window.seek(t) paints frame t.
- No setTimeout, no carried state between frames, no CSS transitions in render mode. requestAnimationFrame only drives seek in live mode, never in render mode (window.__RENDER__ is true there).
- Never Math.random. Use rng(seed) or noise(x, seed) from site/lib/motion.js. The renderer fails any render that calls Math.random during a seek.
- Scroll driven motion reads progress from the scroll position, so the renderer can scrub it by scrolling. Never a lagging scrub (`scrub: 1`) or a smooth scroll lerp in render mode: both depend on scroll history. Lenis with ScrollTrigger is wired as in lenis.dev/llms.txt (`lenis.on('scroll', ScrollTrigger.update)` on the GSAP ticker).
- Scroll scrubs use a gentle curve (sine in out, cubicBezier(0.37, 0, 0.63, 1)) across most of the range. A steep curve leaves the first third of the scroll doing nothing and snaps in the middle.
- Size media to the frame (vh, %, container units), never fixed pixels, so one page renders at desktop and 390 wide.

## Look
- Banned: centered title on a gradient, motion inside media that only fades in, corner labels and frame borders, glow on UI, particle bursts.
- Text blocks may keep a settled page fade; the fade ban applies to motion inside media.
- Real product UI only, from Figma exports. Never redraw a screen.

## Easing
- Curves a project plan has already settled stay as recorded. cubicBezier and power3InOut in the library reproduce them under seek.
- New motion inside media uses closed form springs. Check the start as well as the settle: a stiff spring covers 40 percent of a move in 0.2 s and reads as a snap. Presets: UI (tiny overshoot) for phones and chips, TYPE (none) for anything with text, HEAVY for big media. A value with several targets uses track().

## Reference first
- Before code, write docs/motion/<piece>/style_guide.md from a reference (a site's code, a frame, a clip): what to take and what not to take. Then docs/motion/<piece>/state_list.md. Then build.

## Review loop, before Chadwick sees anything
Problems are ranked, never scored: a score out of 10 finds nothing to fix (HyperFrames review guide).
- P0: must fix before anyone sees it. A pop, stutter or jump at a cut or seam, anything cropped or
  clipped, a broken render contract, unreadable text at 390 wide, a seam that does not loop, a banned look.
- P1: fix this round unless it would cost more than the piece is worth: pacing, weak composition, a
  spring that snaps at the start.
- P2: note it, fix when cheap.

Each round:
1. Render (node scripts/render.mjs), then again at --width 390.
2. Make the sheets from the state list: node scripts/motion-review.mjs <clip> --state docs/motion/<piece>/state_list.md --loop
   (drop --loop for a scrub). That gives the contact sheet, a strip from 0.2 s before to 0.2 s after
   every cut and the loop seam, and the 360 wide phone sheet. Look at all of them, for both widths.
3. List your own P0, P1 and P2 problems with times.
4. Fresh eyes: a subagent on Sonnet that sees only style_guide.md, state_list.md and the review images,
   never the code or your list. It returns its own P0, P1 and P2 list. Prompt it as a harsh motion director.
5. Write the round in docs/motion/<piece>/review_log.md:
   ## Round N
   Fresh eyes: <one line summary of what the subagent saw>
   - P0: <time> <problem>
   - P1: ...
   (or "No problems found" when both lists are empty)
6. Fix every P0. Run another round only while a P0 is open. P1 and P2 do not need another round.
7. Done when both pass:
   node scripts/motion-check.mjs log docs/motion/<piece>/review_log.md
   node scripts/motion-check.mjs strips output/motion/<clip>-review --state docs/motion/<piece>/state_list.md --loop
8. Before shipping, render twice: the two sha256 lines must match.
