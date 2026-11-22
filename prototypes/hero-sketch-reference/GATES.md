# Gates: hero reference round 6 (17 Nov)

His asks this round. Deferred by him: flower types, flower layout, color distribution, extra detail.

- [x] G1: The whole box is visible, sitting in front of the tube (opaque, drawn over the pipe and cables, no tint)
  CHECK: python3 check_round.py box
  EXPECT: BOX_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=88b4504e7e675bfff251cd28047ee74507f04ec0413b3d8f59b40bef1141d454; output-bytes=7
- [x] G2: Nothing new is added to the tube (no gasket, sleeve, clip, ribbon or connector block)
  CHECK: python3 check_round.py clean
  EXPECT: CLEAN_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=d58ce06c5a35e4660452a1658768a7aefd2a606cd860251fec1f3d126d3ce673; output-bytes=9
- [x] G3: Three plug placements on three different faces (hidden back, top, right side), every cable inside the glass
  CHECK: python3 check_round.py placements
  EXPECT: PLACEMENTS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=fb608b9fbd4c06e438ddb19775c98e5bac3221ce93e98cef82fde2cb6defcc4e; output-bytes=82
- [x] G4: The planter is opaque in both the color map and the line art
  CHECK: python3 check_round.py planter
  EXPECT: PLANTER_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=bb9d02e1ceaf9102df899c93ec94e94fcbb7e78bc8029a1cb678e5b1fa835c28; output-bytes=11
- [x] G5: The coral is a color clearly different from the tube
  CHECK: python3 check_round.py coral
  EXPECT: CORAL_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=ddec480ce89a8a9413b18a3664331879836ec4be4e57ca94091566b05a42a3fd; output-bytes=9
- [x] G6: Flowers and coral branches unchanged from version 3
  CHECK: python3 check_round.py flowers
  EXPECT: FLOWERS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=7560eb6054136ec5037c300aefce5db6db0478e2c5c804817f346bb22eb12e1f; output-bytes=11
