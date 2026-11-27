# Gates: design system CS, first draft

OWNS: reference/design-system-cs/draft/**

Scope: the first draft of the design system case study (frame, six sections in his voice, every number marked with its Mondai source), checked, on a branch with a draft PR.

- [x] G1: The draft passes its own mechanical check: no em or en dashes, no Oxford comma pattern, five or six sections, under 2,300 words of body (ten minutes), every paragraph with a digit cites a claim id, every cited id exists in CLAIMS.md marked CONFIRMED or ESTIMATE with a Mondai source path, and no quotation marks in the case study body (no quotes of him in a public repo)
  CHECK: node reference/design-system-cs/draft/check-draft.mjs
  EXPECT: DRAFT CHECK PASSED
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=b642e9109b001526099fec72044996cb54be30ccad0999282bc4a22ecdfbc723; output-bytes=42

- [x] G2: The checker catches planted mistakes (an em dash, an Oxford comma, an uncited number, a missing claim id, a quotation) on a copy of the draft
  CHECK: node reference/design-system-cs/draft/check-draft.mjs vaccinate
  EXPECT: VACCINATION PASSED 5 of 5
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=73fc7a966ae92335021cc322e83c24262c0292206b38437d8c259ccb9e3945e2; output-bytes=123

- [x] G3: Frame (four answers) and section list are written at the top of FRAME.md before the draft, and shown to him in the PR description
  EVIDENCE: FRAME.md written before DRAFT.md (first commit on the branch); PR description carries it

- [x] G4: verify-claims ran on every claim in CLAIMS.md through a fresh claim-verifier agent that never saw the draft; every claim matched or was fixed; result recorded in VERIFY.md
  EVIDENCE: VERIFY.md, 22 checked, 21 matched, 1 partial fixed (C1)

- [x] G5: A blind completion check (fresh agent, given the brief and the draft, never this session's report) ran and its findings were fixed or listed
  EVIDENCE: VERIFY.md, Blind completion check: 11 findings, fixed or listed

- [x] G6: Branch pushed and a draft PR open in ritacompany/portfolio; no PR watch, nothing scheduled
  EVIDENCE: draft PR #11, branch claude/design-system-cs-draft; no subscribe or schedule call made
