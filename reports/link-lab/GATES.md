# Gates: link states lab, first deliverable

OWNS: site/dev/link-lab/**, scripts/build-link-lab.mjs, reports/link-lab/**

Scope: a published lab showing every site link in each state on the real backgrounds with live tuning, autosave and Copy values, with the site's CSS untouched until he approves a change.

- [x] G1: the lab loads without errors at 390, 768 and 1440, shows all 11 components in rest, hover, press, focus and try it, has no sideways scroll, a tuned rest colour leaves hover alone, values survive a reload and Copy values lists the change
  CHECK: node reports/link-lab/check.mjs
  EXPECT: LINK_LAB_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=a386af80da64/16 entries; EXPECT=matched; output-sha256=ee87ea7b4cfa1db54717d1c4f8e27d3f639055a287db29f4e0cd3a0390a7524f; output-bytes=12

- [x] G2: the site's CSS is unchanged from the base branch (nothing moved into site/css without his yes)
  CHECK: node reports/link-lab/site-untouched.mjs
  EXPECT: SITE_CSS_UNTOUCHED
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=a386af80da64/16 entries; EXPECT=matched; output-sha256=fe58241a8965cc0c6e4d80c761b1ef797f2d8861a62c699dae81c0e3a2b1d094; output-bytes=19

- [x] G3: his hover rule still passes on the site
  CHECK: node scripts/verify-hover-still.mjs site
  EXPECT: HOVER_STILL_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=a386af80da64/16 entries; EXPECT=matched; output-sha256=69cddddcb78c9ac9ab71fbab29221e4910c779b69841949cc53156b3c95e2141; output-bytes=25

- [x] G4: the published build matches the committed lab files
  CHECK: node scripts/build-link-lab.mjs /tmp/claude-0/-home-user-portfolio/db648cd1-2f27-5cea-82f9-5bf71c0b0741/scratchpad/link-lab-fresh >/dev/null && diff -r /tmp/claude-0/-home-user-portfolio/db648cd1-2f27-5cea-82f9-5bf71c0b0741/scratchpad/link-lab-fresh /tmp/claude-0/-home-user-portfolio/db648cd1-2f27-5cea-82f9-5bf71c0b0741/scratchpad/link-lab && echo BUILD_MATCHES
  EXPECT: BUILD_MATCHES
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=a386af80da64/16 entries; EXPECT=matched; output-sha256=ae6ee9c877050b560c2768a3681d4e5a8593aa6dbc26efcbb6821cbc32b589b8; output-bytes=14

- [x] G5: the reply gives the link, what each link is used for and asks which one to start with
  EVIDENCE: manual, 23 Nov: the first reply carries the artifact link (version 2 republished after the save fix), the eleven components with where each is used, three findings and one question asking which link to start with
