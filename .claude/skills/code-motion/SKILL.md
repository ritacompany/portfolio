---
name: code-motion
description: Build, render and review a portfolio animation from code. Use for any case study motion, a looping mockup, a scroll driven moment, a rotating phone or a clip rendered to MP4.
---

# Code motion

Rules: .claude/motion-rules.md (a project motion plan wins over it).

1. Reference: write docs/motion/<piece>/style_guide.md, then state_list.md. Real Figma exports only. Motion inside media only.
2. Build a page with window.seek(t) using site/lib/motion.js, plus its reduced motion still (one frame, nothing moves). Samples: site/motion-lab/spring-sample.html (time), site/motion-lab/scroll-sample.html (scroll).
3. Render a clip:
   node scripts/render.mjs --page site/motion-lab/spring-sample.html --width 720 --height 900 --fps 60 --dur 4.6
   Scroll scrub: node scripts/render.mjs --page site/motion-lab/scroll-sample.html --mode scroll --scroll "#scene" --start "top top" --end "bottom bottom" --dur 3 --fps 30
   One still: add --still 1.5. Element only: --clip "#c". Retina: --dpr 2.
4. Review: node scripts/motion-review.mjs output/motion/<clip>.mp4 --every 0.25 --strip <fast moment> --loop
   Render again at --width 390 and review that clip too. Rounds at 30 fps for speed; the final at 60.
5. Score, fix the 3 worst, repeat; 3 rounds, all 8 or more, logged in review_log.md.
6. Determinism check before shipping: render twice, the sha256 lines must match. Run at most two renders at once; three in parallel crashed one Chrome.
