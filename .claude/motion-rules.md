# Motion rules

Read on demand for any animation work. docs/HAVEN_MOTION_PLAN.md wins wherever the two differ.

## Render contract
- Every animation is a pure function of time or scroll progress. window.seek(t) paints frame t.
- No setTimeout, no carried state between frames, no CSS transitions in render mode. requestAnimationFrame only drives seek in live mode, never in render mode (window.__RENDER__ is true there).
- Never Math.random. Use rng(seed) or noise(x, seed) from site/lib/motion.js. The renderer fails any render that calls Math.random during a seek.
- Scroll driven motion reads progress from the scroll position, so the renderer can scrub it by scrolling. Never a lagging scrub (`scrub: 1`) or Lenis lerp in render mode: both depend on scroll history. Lenis with ScrollTrigger is wired as in lenis.dev/llms.txt (`lenis.on('scroll', ScrollTrigger.update)` on the GSAP ticker).
- Size media to the frame (vh, %, container units), never fixed pixels, so one page renders at desktop and 390 wide.

## Look
- Banned: centered title on a gradient, motion inside media that only fades in, corner labels and frame borders, glow on UI, particle bursts.
- Text blocks keep the settled page fade (plan wins over the guide's ban on fading in). The ban applies to motion inside media.
- Real Haven UI only, from Figma exports. Never redraw a screen.

## Easing
- Settled page values stay as the plan records them: text fade 1.4 s power1.out, MaskReveal 1.2 s Power3.easeInOut, profile loop timings. cubicBezier and power3InOut in the library reproduce them under seek.
- New motion inside media uses closed form springs. Check the start as well as the settle: a stiff spring covers 40 percent of a move in 0.2 s and reads as a snap. Presets: UI (tiny overshoot) for phones and chips, TYPE (none) for anything with text, HEAVY for big media. A value with several targets uses track().

## Reference first
- Before code, write docs/motion/<piece>/style_guide.md from a reference (Metalab code, a frame, a clip): what to take and what not to take. Then a state list. Then build.

## Review loop, before Chadwick sees anything
1. node scripts/render.mjs, then node scripts/motion-review.mjs on the clip.
2. Look at contact.png, strip.png and phone.png. Always re-render at 390 wide too: a scaled down sheet hid a cropped phone in the sample.
3. Score 1 to 10, harshly: motion quality, composition, readability at phone size, pacing, loop seam, fidelity to Figma.
4. Fix the 3 worst. At least 3 rounds; every score 8 or more. Log each round in docs/motion/<piece>/review_log.md.
