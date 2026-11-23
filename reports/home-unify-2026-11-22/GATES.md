# Gates: one Home, with the preview work moved into the real site

OWNS: site/index.html, site/css/**, site/js/**, site/dev/preview/**, site/assets/home/**, scripts/verify-figma-sync.mjs, scripts/build-preview.mjs, reports/home-unify-2026-11-22/**, docs/SITE_BUILD_PLAN.md

Scope: this branch holds the working branch, main and PR 40 as one Home; the approved preview motion (fixed nav, text fades, card press, site cursor) runs on the real site without any tuning panel; the Mondai card rests without the hover darkening; nothing else regresses; he gets a phone link to review Home.

- [x] G1: The branch contains the working branch, main and PR 40 heads.
  CHECK: node reports/home-unify-2026-11-22/check.mjs heads
  EXPECT: HEADS_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=2300c95fc45bbe7f78d7203b20d4492f94917aa26cf53768c675ecbfea41bcfd; output-bytes=17

- [x] G2: Every 1440 value read from his newest Home frame (6364:28896) still matches the page.
  CHECK: node scripts/verify-figma-sync.mjs
  EXPECT: /^FIGMA_SYNC_OK \d+ checks$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=4068465f5a27e0efdd3c184773e4f16ce1acda7cc499c7e7c62dafa58ce765cc; output-bytes=25

- [x] G3: Tokens still equal his library.
  CHECK: node scripts/verify-tokens.mjs
  EXPECT: TOKENS_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=a14b68f9c220a6cd9847ab4357d556903bf0ac37e7c1196a384e068fcee74cbc; output-bytes=64

- [x] G4: No hover moves a letter on any page of the real site.
  CHECK: node scripts/verify-hover-still.mjs site
  EXPECT: HOVER_STILL_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=69cddddcb78c9ac9ab71fbab29221e4910c779b69841949cc53156b3c95e2141; output-bytes=25

- [x] G5: Every local link and asset resolves.
  CHECK: node scripts/check-site.mjs
  EXPECT: site check OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=56fe23ccee23c88cd1204dabb80ac34e28a5ac6abdd0c62e5faa2e532f956f21; output-bytes=27

- [x] G6: Nothing new is cut off at 390, 768, 1024, 1200 or 1366 on any page, compared with the working branch (its 20 framework problems are in baseline-fit.txt and belong to the framework sessions).
  CHECK: node reports/home-unify-2026-11-22/check.mjs fit
  EXPECT: NO_NEW_FIT_PROBLEMS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=e2525da4a8aeae7883e3d161510cc0440b22fdb5c782c97c5e6d8e554e08ead4; output-bytes=55

- [x] G7: No new text overlaps at those widths, compared with the working branch (its 15 framework overlaps are in baseline-overlap.txt).
  CHECK: node reports/home-unify-2026-11-22/check.mjs overlap
  EXPECT: NO_NEW_OVERLAP_PROBLEMS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=2f26477bb190f6522e2a7279170f88e42287b7fbb1368a99a08f07da12216f60; output-bytes=59

- [x] G8: No sideways scroll, failed request, console error or unrendered image at those widths.
  CHECK: node scripts/verify-responsive.mjs health all
  EXPECT: RESPONSIVE_HEALTH_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=3b1dfe4adbc1d3f8a1bba687655975d9145612ba5cf9c220340f25a6e892a705; output-bytes=36

- [x] G9: The moved pieces live in site/ and the preview copies and their panels are gone from both.
  CHECK: node reports/home-unify-2026-11-22/check.mjs moved
  EXPECT: MOVED_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=b3e59fe7bd71b170cc966fe629cc442414c0359ca9445c363df76371e30c64a7; output-bytes=9

- [x] G10: On the real site, served fresh: at 1440 the nav stays fixed after scrolling, the cursor turns into Learn more over each work card, About text fades in and the Mondai card at rest is not darkened; at 390 there is no site cursor, no sideways scroll and the Selected works heading shows, as his phone frame draws it.
  CHECK: node reports/home-unify-2026-11-22/check.mjs live
  EXPECT: LIVE_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=2fb6d0af1ac4/16 entries; EXPECT=matched; output-sha256=949fb627311111b72ad01d47757b8157a575a819e75bb0b7eff7d3ddc81a2ce7; output-bytes=101

- [x] G11: He has a phone link to the Home page built from this branch.
  EVIDENCE: preview built with node scripts/build-preview.mjs site <scratchpad>/preview (HOVER_STILL_OK 50 hovers, 179 files) and published 22 Nov as https://claude.ai/artifact/MCp5KFuB72Z5UriV23LkEf version 1, version 2 with the touch Learn more (HOVER_STILL_OK 49 hovers); the old preview link McviYhengPB92skSvB2YEu is not readable from this account

- [x] G12: On touch screens each work card shows Learn more: at phone widths (360, 390) it is his Small button on the card's right edge 20 under the image, card text visible, pressing fills it Neutral/300 around a fixed centre and the fill does not stick; at tablet widths (834, 1180) it is present; with a mouse at 1440 it is hidden.
  CHECK: node reports/home-unify-2026-11-22/check.mjs touch
  EXPECT: TOUCH_LINK_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=3c3b0f9869f1/16 entries; EXPECT=matched; output-sha256=1502b25ce40b768abb38fa05d8a7ea1643b5b53a2a2f085f1d4e85cac04d24fe; output-bytes=142

- [x] G13: Below 1200 wide with a mouse (402 and 834) each card shows the Learn more link, hovering the card changes nothing (label colour, image size, no Learn more button) and the cursor stays a plain dot over it; the card draws no tap flash; at 1440 with a mouse the link stays hidden and the cursor still turns into Learn more.
  CHECK: node reports/home-unify-2026-11-22/check.mjs mouse
  EXPECT: MOUSE_NARROW_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=3c3b0f9869f1/16 entries; EXPECT=matched; output-sha256=60d46c68e44a188727ddb9be000c38f37cc5c9b0895d70ca7feb28585d2fa4f3; output-bytes=137

- [x] G14: At every phone width from 320 to 767 the button shares the description's line only while more than 24 px from it, and drops under the description only when one line could not keep that; both 20 under the image on one line.
  CHECK: node reports/home-unify-2026-11-22/check.mjs wrap
  EXPECT: WRAP_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=3c3b0f9869f1/16 entries; EXPECT=matched; output-sha256=5b4161953cd2b63cf29cb4b5672f86a38297f404780a5c1444b66b911396025c; output-bytes=76
