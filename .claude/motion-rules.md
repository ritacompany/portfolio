# Motion rules

Read on demand for any animation work. Where this project has its own motion plan (for the Haven case
study, docs/HAVEN_MOTION_PLAN.md, on the haven/case-study archive branch until the Haven page is
ported to main), the plan wins wherever the two differ.

## Scope
- These rules cover motion inside media: loops, a rotating phone, scroll driven mockups and any clip rendered to video.
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
1. node scripts/render.mjs, then node scripts/motion-review.mjs on the clip.
2. Look at contact.png, strip.png and phone.png. Always render again at 390 wide too: a scaled down sheet once hid a cropped phone.
3. Score 1 to 10, harshly: motion quality, composition, readability at phone size, pacing, loop seam, fidelity to Figma.
4. Fix the 3 worst. At least 3 rounds; every score 8 or more. Log each round in docs/motion/<piece>/review_log.md.
5. Before shipping, render twice: the two sha256 lines must match.
