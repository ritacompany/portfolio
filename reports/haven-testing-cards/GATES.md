# Gates: Haven testing insight cards

OWNS: reports/haven-testing-cards/**, site/haven/index.html, site/haven/haven.css, site/haven/current.css

Scope: the four Haven usability testing insight cards carry his chosen text and hug it with 32 px top, 24 px sides and 34 px bottom at 1440, 1024, 768 and 390, with the site checks still passing.

- [x] G1: every card has padding 32 24 34 24, hugs its text and matches his Figma text at all four widths (shown failing on the page before the change, 25 Nov)
  CHECK: node reports/haven-testing-cards/check-cards.mjs figma
  EXPECT: CARDS OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=005173ee0564c80fac3bee023d015a8b910fd4a5b3855026d605c1090f9cee0b; output-bytes=961

- [x] G2: the site check still passes
  CHECK: node scripts/check-site.mjs
  EXPECT: site check OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=15e1ac1a4f4962e5a2bb4cdd73b63a3612a1091676f4de2f346c4dbc1e93b7d5; output-bytes=27

- [x] G3: Haven still fits at every width
  CHECK: node scripts/verify-responsive.mjs fit haven
  EXPECT: RESPONSIVE_FIT_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=b8a3fc756b14dd6d69706efa1ea146853bfae6fcaad92d304669d534bb8d928e; output-bytes=32

- [x] G4: Haven text still does not overlap
  CHECK: node scripts/verify-responsive.mjs overlap haven
  EXPECT: RESPONSIVE_OVERLAP_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=ea08368d64fd986df204358e428e77c15dc9b375e888b4d9c5b090df10bc533b; output-bytes=36

- [x] G5: Haven health still passes
  CHECK: node scripts/verify-responsive.mjs health haven
  EXPECT: RESPONSIVE_HEALTH_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=37e55671bf48ce2e46a34e4c62f46939a32b79438cebd5b32ad6c00982a38e58; output-bytes=35

- [x] G6: Haven text size floor still passes
  CHECK: node scripts/verify-responsive.mjs size haven
  EXPECT: RESPONSIVE_SIZE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=0d4d5beee37f1bff91f0eafd99e8e5d14fb9e780b5b155a024a3911391d4a2ea; output-bytes=33

- [x] G7: the hover still check passes on the site
  CHECK: node scripts/verify-hover-still.mjs site
  EXPECT: HOVER_STILL_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=eb467d695822/16 entries; EXPECT=matched; output-sha256=1519cf1d6f6a5ce323ee5b3c815d3449e4fc91fa0229b3a90823f1ba69261678; output-bytes=25

- [x] G8: he approved the text and padding through a [site change] question card before site/ was edited
  EVIDENCE: manual; 25 Nov question card tagged [site change], his answer "Yes, your Figma text" (Figma text verbatim, padding 32 24 34 24, no min height), given before any edit under site/
