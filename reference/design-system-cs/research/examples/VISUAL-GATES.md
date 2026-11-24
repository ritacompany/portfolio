# Gates: ten more design system examples, chosen for visuals

OWNS: reference/design-system-cs/research/examples/VISUAL-*, check-visual*.mjs, capture-visual.cjs

Scope: ten more designer written design system case studies, picked for how they show the system in
images, feeding Lens E of STRATEGY.md. Research only: no draft, outline or material file changes.

- [ ] G1: VISUAL-EXAMPLES.md lists ten pages, each with author, role, date and its visual devices; none is already in EXAMPLES.md, REFERENCE-BOARD.md or the case studies report; at least six device kinds across the set and at least two pages marked strong on data visualisation; public safe copy
  CHECK: node check-visual-examples.mjs
  EXPECT: VISUAL-EXAMPLES-PASS

- [ ] G2: VISUAL-STUDY.md has one section per page (visuals that carry it, captions and layout, outline 2 section served) and a catalogue of devices that names all twenty pages, grouped by what the device proves; public safe copy
  CHECK: node check-visual-study.mjs
  EXPECT: VISUAL-STUDY-PASS

- [ ] G3: every one of the ten was opened in Chromium; the local archive holds screens down to the page bottom and the page text for each
  CHECK: node check-visual-archive.mjs
  EXPECT: VISUAL-ARCHIVE-PASS

- [ ] G4: a fresh Sonnet agent, given only the links and the criteria, passed every kept page; any failure was replaced and the replacement checked
  EVIDENCE: pending

- [ ] G5: the private archive artifact is published with every screen and the full text, and VISUAL-STUDY.md links to it
  EVIDENCE: pending

- [ ] G6: the files are on the remote branch and a draft PR into claude/design-system-cs-draft is open
  EVIDENCE: pending
