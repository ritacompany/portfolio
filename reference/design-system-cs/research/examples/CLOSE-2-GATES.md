# Gates: second pass, closer design system case studies

OWNS: reference/design-system-cs/research/examples/CLOSE-2-*, check-close-2*.mjs, capture-close-2.cjs

Scope: a second, harder hunt for designer written case studies that explain a system agents build from as a framework (the Marques model), with a with and without agent test. New query families and hosts only; no URL from any earlier set. Up to ten; fewer if fewer qualify; no padding. Capture each whole into a private archive, write a public safe pick list and study, and have a fresh agent check every pick from the link alone.

- [x] G1: CLOSE-2-EXAMPLES.md lists every pick with author, role, date, the four scores plus Structure with evidence and where seniority is shown; no pick repeats a page in any earlier set; no dash punctuation, no Oxford comma, no long quote
  CHECK: node check-close-2.mjs
  EXPECT: CLOSE2-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=3385fc4b5c2f/16 entries; EXPECT=matched; output-sha256=8379e6f4afe314d15e02929507fd349e84e403b7e70e05c6103d8ea258e2c958; output-bytes=12

- [x] G2: CLOSE-2-STUDY.md has one section per pick with link, archive, shape, AI readiness, what was got wrong, limits, visuals and six borrow lines, a comparison against Marques on structure, a voice note and the private archive link
  CHECK: node check-close-2.mjs
  EXPECT: CLOSE2-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=3385fc4b5c2f/16 entries; EXPECT=matched; output-sha256=8379e6f4afe314d15e02929507fd349e84e403b7e70e05c6103d8ea258e2c958; output-bytes=12

- [x] G3: the archive holds, for each pick, screens that reach the page bottom and the full page text
  CHECK: node check-close-2-archive.mjs
  EXPECT: CLOSE2-ARCHIVE-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=3385fc4b5c2f/16 entries; EXPECT=matched; output-sha256=1919665928e5873929e6c2898fdf9695ab3b827c091c289ba86b987217098580; output-bytes=20

- [x] G4: a fresh Sonnet agent opened every pick from its link alone and ruled on the criteria; every failed pick was replaced or removed or overruled with a written reason (manual: verdicts recorded in CLOSE-2-EXAMPLES.md)
  EVIDENCE: 25 Nov 2026, a fresh agent in its own session got only the six shortlist links and the criteria. It passed Yurchenko, Kukkasela, Singh and Gale; failed Kittusamy on the author rule (moved to near misses); failed Hellmuth on the author rule after two rate limited tries (overruled, reason written under How the checks ran). Gale's stage score was also overruled with the reason written.

- [x] G5: the private archive artifact is updated with the new pages and keeps the old entries, or a separate private artifact is linked from CLOSE-2-STUDY.md (manual)
  EVIDENCE: 25 Nov 2026, https://claude.ai/artifact/AaPQccq74qnUChWtTgnjR4 version 3 lists 193 files: the first pass's page, 6 texts and 100 screens kept, plus 6 new texts and 79 new screens; local Playwright run at 390 and 1280 px before publish: no sideways scroll, a second pass page loads its screen, no script errors.

- [x] G6: the files above are committed and identical on the remote branch
  CHECK: node check-close-2-pushed.mjs
  EXPECT: CLOSE2-PUSHED-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=3385fc4b5c2f/16 entries; EXPECT=matched; output-sha256=55bf78bc1aaa916ff34f6525fb80dc159773f66063cfb47b130d4d16c09bfa41; output-bytes=19
