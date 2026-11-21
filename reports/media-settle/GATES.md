# Gates: media settle research and fix

OWNS: reports/media-settle/**, site/js/mondai-motion.js

Scope: find why the media entrance feels odd on the Growth Journey, show options at 1440 and 390, then build his pick and check it.

- [x] G1: report states the cause with measured evidence for all four screens, two options, a recommendation, and clips at 1440 and 390, pushed on the branch
  CHECK: node reports/media-settle/verify.mjs research
  EXPECT: RESEARCH_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=faef86a8ad6501bb9f32299c2961b01fdedb2c70fcc6efa0fdcd5e9cdb0da452; output-bytes=12

- [x] G2: nothing on the page changed before his pick (the two research commits touch only the report folder)
  CHECK: node reports/media-settle/verify.mjs page-untouched
  EXPECT: PAGE_UNTOUCHED_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=6d537783eab8cd5ada40d66fe8722416255b7ecb98f3679ed25bbdc1f0217592; output-bytes=18

- [x] G3: his pick built in mondai-motion.js and checked in the built-in browser at 1440, 768 and 390 with reduced motion on and off
  EVIDENCE: he picked A, 12 Nov. Built-in browser, localhost:4318. Motion on, first keyframe logged per image as it entered: Pathway and Calendar setup scale(1.3) at 1440 and 768; Growth Journey, Action Hub, Schedule view, Buffer, Right rail, Timeline, Schedule gaps and all five week slides scale(1.08); Foundation wipe unchanged. Every screen settles to clip none and transform none, no sideways scroll at 768 or 390; Growth Journey screenshotted settled at 1440 and 390 with its glitch frame intact. At 390 Pathway and Schedule view opened before the logger reached them, so their start value there is read from the 1440 and 768 runs (same code path). Reduced motion forced on in a same origin frame at 1440, 768 and 390: mm-off set, no Lenis, 0 animations, 12 of 12 screens and 5 of 5 week slides showing, 0 hidden text; the same frame with motion on at 390 holds 10 screens and 79 text items for their entrances, so the check can fail.
