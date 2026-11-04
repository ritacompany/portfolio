# Gates: editor layout research and structure

Request (4 Nov): research how real tools lay out their editors, from outside sources, so the Falling behind
editor is organised by what things are, with left and right panels, not generic collapsible sections.

- [x] G1: research note cites at least 6 distinct real tools, each with a source URL
  CHECK: node check.mjs g1
  EXPECT: RESEARCH_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/.claude/worktrees/jovial-wiles-6aeace/docs/motion/cs2-falling-behind-editor; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f2eb3a9ec6a12d22b3fe0f5bab4b98579a7288220438f917eb7b6120a8432887; output-bytes=28
- [x] G2: structure gives every current editor setting a home, none dropped
  CHECK: node check.mjs g2
  EXPECT: ALL_HOMED
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/.claude/worktrees/jovial-wiles-6aeace/docs/motion/cs2-falling-behind-editor; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=628022b86630d24abd6353056056b2481ddd857575a3b8186c93c9ce1821a195; output-bytes=13
- [x] G3: every region in the structure names the tool pattern it comes from
  CHECK: node check.mjs g3
  EXPECT: REGIONS_GROUNDED
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/.claude/worktrees/jovial-wiles-6aeace/docs/motion/cs2-falling-behind-editor; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=bf848ed9e1a321686a270f9eb161691e243a005a06e99875c81cb92f3ec34f31; output-bytes=19
- [x] G4: structure shown to Chadwick in chat before any build (manual)

## Build to the approved structure (5 Nov)

- [x] G5: every one of the 73 DEFAULTS keys has a control in the rebuilt editor
  CHECK: in the built in browser, run fbCoverage() on cs2-falling-behind-editor.html
  EXPECT: total 73, covered 73, missing none
  EVIDENCE: {"total":73,"covered":73,"missing":[]}
- [x] G6: every scene list row selects its object, the canvas marks it and the right panel shows its own properties
  EVIDENCE: all 12 rows checked; canvas clicks on labels, items, tag, background and outside the frame select the same rows
- [x] G7: timeline bars write their setting (checkAt, tagAt, liftAt, moveAt and moveDur by body and both edges, arriveDur by its end) and undo restores them
- [x] G8: both panels hide, show and resize while the frame stays centred and inside the canvas (dx 0, dy 0 in every state)
- [x] G9: no console errors from the page itself
