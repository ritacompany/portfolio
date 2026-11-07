# Gates: design system CS, first draft

OWNS: reference/design-system-cs/draft/**

Scope: the first draft of the design system case study (frame, six sections in his voice, every number marked with its Mondai source), checked, on a branch with a draft PR.

- [ ] G1: The draft passes its own mechanical check: no em or en dashes, no Oxford comma pattern, five or six sections, under 2,300 words of body (ten minutes), every paragraph with a digit cites a claim id, every cited id exists in CLAIMS.md marked CONFIRMED or ESTIMATE with a Mondai source path, and no quotation marks in the case study body (no quotes of him in a public repo)
  CHECK: node reference/design-system-cs/draft/check-draft.mjs
  EXPECT: DRAFT CHECK PASSED
  EVIDENCE: pending

- [ ] G2: The checker catches planted mistakes (an em dash, an Oxford comma, an uncited number, a missing claim id, a quotation) on a copy of the draft
  CHECK: node reference/design-system-cs/draft/check-draft.mjs vaccinate
  EXPECT: VACCINATION PASSED 5 of 5
  EVIDENCE: pending

- [ ] G3: Frame (four answers) and section list are written at the top of FRAME.md before the draft, and shown to him in the PR description
  EVIDENCE: pending

- [ ] G4: verify-claims ran on every claim in CLAIMS.md through a fresh claim-verifier agent that never saw the draft; every claim matched or was fixed; result recorded in VERIFY.md
  EVIDENCE: pending

- [ ] G5: A blind completion check (fresh agent, given the brief and the draft, never this session's report) ran and its findings were fixed or listed
  EVIDENCE: pending

- [ ] G6: Branch pushed and a draft PR open in ritacompany/portfolio; no PR watch, nothing scheduled
  EVIDENCE: pending
