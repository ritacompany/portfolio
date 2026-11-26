---
name: code-motion
description: Plan, build and review any portfolio animation, live in the browser or rendered to video. Use for scroll entrances, stagger, sticky or pinned sections, parallax, scroll scrubs, hover motion, a scripted mockup on the page, a looping mockup, a rotating phone or a clip rendered to MP4.
---

# Code motion

Rules: .claude/motion-rules.md. Patterns and principles: .claude/motion-patterns.md. A project motion plan
wins over both.

1. Pick live or clip (motion-rules.md, "Two kinds of motion"). Live is the default on a page.
2. Reference: write docs/motion/<piece>/style_guide.md, naming live or clip and the patterns it uses from
   motion-patterns.md, then state_list.md. Real Figma exports only.
3. Build.
   Live: on the page, through site/js/motion.js (GSAP, ScrollTrigger, Lenis). Shared entrances first.
   Clip: a page with window.seek(t) using site/lib/motion.js. Samples: site/motion-lab/spring-sample.html
   (time), site/motion-lab/scroll-sample.html (scroll). Render:
   `node scripts/render.mjs --page site/motion-lab/spring-sample.html --width 720 --height 900 --fps 60 --dur 4.6`
   Scroll scrub: add `--mode scroll --scroll "#scene" --start "top top" --end "bottom bottom"`.
   One still: `--still 1.5`. Element only: `--clip "#c"`. Retina: `--dpr 2`.
   Both: a reduced motion version, at rest.
4. Review as motion-rules.md sets out: live in the built in browser at 1440 and 390 plus reduced motion;
   clips through motion-review.mjs at both widths. Rounds at 30 fps for speed; the final at 60.
5. Rank problems P0, P1, P2 (no scores). Spawn a fresh eyes subagent on Sonnet with only the style guide,
   state list and review images; log both lists as a round in review_log.md. Fix every P0; another round
   only while a P0 is open. Done when motion-check log passes, and for clips the strips check too.
6. Clips only: render twice before shipping, the sha256 lines must match. Run at most two renders at once;
   three in parallel crashed one Chrome.
