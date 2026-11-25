# Gates: hero sketch v6 and three palette versions (25 Nov)

OWNS: prototypes/hero-sketch-reference/build_v6.py, prototypes/hero-sketch-reference/check_v6.py, prototypes/hero-sketch-reference/v6-*, prototypes/hero-sketch-reference/GATES-v6.md

Scope: redraw the sketch with every decision in HANDOFF.md, then three palette versions from his five families with colors spread, not grouped.

- [x] G1: Every part decision is drawn: no coral tip flowers, slim coral, sorrel on the surface, wire spray on the forks, coupling rings, rims, pot, lever connector, cat toy spring, ribbed grips, control box with windows, collar plugs, nodding hellebores, noodle puffs
  CHECK: python3 check_v6.py decisions
  EXPECT: DECISIONS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/private/tmp/claude-501/-Users-chadwickfenner-Code-portfolio/14030e87-f918-424f-a7f3-f04a0981e134/scratchpad/wtm/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=96b7d1251f75efed96d3db6288abe1e933222c6edd4342d069b6a3451f0f25eb; output-bytes=13

- [x] G2: Every cable stays inside the glass
  CHECK: python3 check_v6.py cables
  EXPECT: CABLES_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/private/tmp/claude-501/-Users-chadwickfenner-Code-portfolio/14030e87-f918-424f-a7f3-f04a0981e134/scratchpad/wtm/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=3766e9e95b4fc613b03a0645b432296f9fc7c32c4bdbfebef3eda08962dccc1d; output-bytes=31

- [x] G3: Every wire spray burst is visible in every palette render
  CHECK: python3 check_v6.py spray
  EXPECT: SPRAY_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/private/tmp/claude-501/-Users-chadwickfenner-Code-portfolio/14030e87-f918-424f-a7f3-f04a0981e134/scratchpad/wtm/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=14c4819fb89026a0ada5c874e9fa55c2cd2560a38355d3d9aa13551886678f1b; output-bytes=9

- [x] G4: Colors are spread: no touching parts share a family, every family on both legs, no accent family over 40% of the accent area
  CHECK: python3 check_v6.py spread
  EXPECT: SPREAD_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/private/tmp/claude-501/-Users-chadwickfenner-Code-portfolio/14030e87-f918-424f-a7f3-f04a0981e134/scratchpad/wtm/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f58f957c90a43618738ddadd9dd4ffecfe2ce8be6d68e45adc24e457415d5d5c; output-bytes=10

- [x] G5: The old drawing fails the decisions check (control: the check can fail)
  CHECK: python3 -c "import subprocess,sys; r=subprocess.run([sys.executable,'check_v6.py','decisions','build.py']); print('CONTROL_FAILS_OK' if r.returncode==1 else 'CONTROL_PASSED')"
  EXPECT: CONTROL_FAILS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/private/tmp/claude-501/-Users-chadwickfenner-Code-portfolio/14030e87-f918-424f-a7f3-f04a0981e134/scratchpad/wtm/prototypes/hero-sketch-reference; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=a1e37ef527087b91fa39321c9ed14c2a022f6cf1d9e112cdb6d172c6941a06be; output-bytes=71

- [ ] G6: Chadwick has seen the three versions side by side with the line drawing and picked one, or named what to change
  EVIDENCE: pending
