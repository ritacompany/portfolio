# Gates: framework page, version audit, Figma sync and desktop fixes (session 1 of 9, 20 Nov)

OWNS: reports/fw-sync-2026-11-20/**, site/mondai/framework/index.html (hero, Personalized timeline, Schedule view, Falling behind eyebrow and Rollover effect, footer), site/css/framework.css (narrow hunks for those items only)

Scope: the built framework page matches frame 6331:20607 (mondai framework cS most current, file 5RO0m4bYYrTvbiaOgaU3tI) on his twelve items, an audit records every section against that frame, and nothing on Home or Haven moves.

- [x] G1: AUDIT.md covers every section of the page plus nav and footer, each with build versus frame and the Figma version the build came from
  CHECK: node reports/fw-sync-2026-11-20/check-audit.mjs
  EXPECT: AUDIT_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4f061c08f077c6748d74fb4c585c315c5e247ef48500a7de6baebaa70fb599b6; output-bytes=27

- [x] G2: hero second paragraph is Neutral/525 (#90909d) and the first stays Neutral/050, at 1440
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 hero
  EXPECT: HERO_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=e36164c4a7829edef68fdaa7c003c1473564fd493ed7c9c7c65edc09a8b452ec; output-bytes=8

- [x] G3: nav and title at 1440: logo cap top 19, title cap top 164 on the framework page; Home logo 15 and h1 589, Haven logo 24 and h1 130 unchanged
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 nav
  EXPECT: NAV_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=073f5bbb3d36c00886ee9d8a6d0ec79833d8ea563f769e863cb2193a75b970e5; output-bytes=7

- [x] G4: Personalized timeline and Schedule view boxes within 1.5 px of the frame at 1440 (eyebrow, heading, Capacity, Effort, Example panel and text, image, section height; Schedule view notes, Rescheduling, gaps image, section height)
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 boxes
  EXPECT: BOXES_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=24559db4822ed1d1be34d6d68e8c4130473acddb3c8bc24ef7f2ba8c5f7d75e2; output-bytes=9

- [x] G5: the Schedule view intro line is one line at every width where its text fits the room it has, and wraps only where it does not (sweep 320 to 1600 in 10 px steps); proven against a planted partial wrap
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 oneline
  EXPECT: ONELINE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=591d46ad40ef2512a42f4750b42f67c2e92613edc07b9eb732dedc29565bba8b; output-bytes=47

- [x] G6: Rescheduling an Action Item has 32 px between its heading baseline and the body cap top at 390, 768 and 1440
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 resched
  EXPECT: RESCHED_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=b213477cb4391be8e0f14bb38821eb336711f9e1064f57a07f79c0c14560103e; output-bytes=11

- [x] G7: no two section eyebrows share a title; the right rail block reads Target and pace and the Rollover block keeps Falling behind
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 eyebrows
  EXPECT: EYEBROWS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=ad12bef78b3c68528e4b3061923bd208706cd18f47eb7add51ddcc9c2512187b; output-bytes=12

- [x] G8: Rollover effect icon centred on the title's cap height within 1 px at 1440 and the title cap top at 1616; under 1160 the Rollover figure draws a whole card (radius and outline on all four sides)
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 rollover
  EXPECT: ROLLOVER_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=b7b1bca5c015d647343e1eff0f3098cd070b46955217bcc6143b0d5144544769; output-bytes=12

- [x] G9: footer on the framework page matches the frame's Other pages variant: Testimonials in the list, Resume hidden, CONTACT label Medium; Haven and Home footers unchanged
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 footer
  EXPECT: FOOTER_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=f0a13fb3cd9eb5acb40140cc360e58a09d94d3fc6a94e5777c182afc8011fc57; output-bytes=10

- [x] G10: no sideways scroll at 390, 768 and 1440 with reduced motion on and off
  CHECK: node reports/fw-sync-2026-11-20/check.mjs 4318 scroll
  EXPECT: SCROLL_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=6e47fc819fcb3d521bac5f5e81cd3db78056e6589c788c045e41ceadc71a8406; output-bytes=10

- [ ] G11: his eye on the preview at 390, 768 and 1440, and the Capacity question settled (frame and page carry the same approved cut)
  EVIDENCE: pending
