# Gates: closer design system case studies (fit set)

OWNS: reference/design-system-cs/research/examples/CLOSE-*, check-close*.mjs, capture-close.cjs

Scope: find up to ten designer written case studies closer to CS3 than any found so far (strong on the AI relationship and on two of proof style, team size and stage), capture each whole into a private archive, write a public safe pick list and study, and have a fresh agent check every pick from the link alone. Fewer than ten is allowed if fewer qualify; padding is not.

- [ ] G1: CLOSE-EXAMPLES.md lists every pick with author, role, date and a score with evidence on all four axes; no pick repeats a page in EXAMPLES.md, REFERENCE-BOARD.md, the reports file or VISUAL-EXAMPLES.md; no dash punctuation, no Oxford comma, no long quote
  CHECK: node check-close.mjs
  EXPECT: CLOSE-PASS

- [ ] G2: CLOSE-STUDY.md has one section per pick with shape, AI readiness, what was got wrong, limits and a borrow line for each of the six outline 2 sections, plus a voice note; it links the private archive
  CHECK: node check-close.mjs
  EXPECT: CLOSE-PASS

- [ ] G3: the archive holds, for each pick, screens that reach the page bottom and the full page text
  CHECK: node check-close-archive.mjs
  EXPECT: CLOSE-ARCHIVE-PASS

- [x] G4: a fresh Sonnet agent opened every pick from its link alone and ruled on the criteria; every failed pick was replaced or removed (manual: verdicts recorded in CLOSE-EXAMPLES.md)
  EVIDENCE: 24 Nov 2026, a fresh Sonnet agent given only the six shortlist links and the criteria passed 1, failed 3, could not load 1 and failed 2 on a strict reading; three moved to near misses, two failures overruled with the reasons written in CLOSE-EXAMPLES.md under How the checks ran.

- [x] G5: the private archive artifact is published, lists every pick with its screens, and CLOSE-STUDY.md links it (manual)
  EVIDENCE: 24 Nov 2026, https://claude.ai/artifact/AaPQccq74qnUChWtTgnjR4 published with 108 files (page, data, 6 texts, 100 screens); local Playwright run at 390 and 1280 px: no sideways scroll, arrow keys move to a page and its screen loads, no script errors.

- [ ] G6: the files above are committed and identical on the remote branch, with a draft PR into claude/design-system-cs-draft
  CHECK: node check-close-pushed.mjs
  EXPECT: CLOSE-PUSHED-PASS
