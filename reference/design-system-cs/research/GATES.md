# Gates: content research for the design system CS

21 Nov 2026. Written before the research session starts. The session works these; the lead re-runs
the check on return.

- [ ] G1: `CONTENT.md` answers, for each part (craft: foundations and components; scaling with AI;
  proof), what is table stakes a reviewer assumes, what is distinctive at senior and lead level, and a
  ranked recommendation of what to put on the page.
  CHECK: node reference/design-system-cs/research/check-content.mjs
  EXPECT: CONTENT-PASS
- [ ] G2: Every recommendation names the evidence we hold for it (NUMBERS.md id, DECISION-INVENTORY
  row or a Mondai path) or says "no evidence yet". Checked by the same script (each Recommendation
  line carries "Evidence:").
  CHECK: node reference/design-system-cs/research/check-content.mjs
  EXPECT: CONTENT-PASS
- [ ] G3: Every research claim has an opened source with a link; claims went through an independent
  check (a fresh agent that sees claims and sources, never the draft), recorded in `claim-check.md`.
  CHECK: node reference/design-system-cs/research/check-content.mjs
  EXPECT: CONTENT-PASS
- [ ] G4: It answers directly whether a tokens or colour section belongs, and what it would show
  that is not table stakes.
- [ ] G5: No dash punctuation, no Oxford commas, no quotes of Chadwick or Mondai sources (public repo).
  CHECK: node reference/design-system-cs/research/check-content.mjs
  EXPECT: CONTENT-PASS

## Status, 21 Nov 2026 (research session)

- G1, G2, G5: check prints CONTENT-PASS. G4: answered under Tokens or colour in CONTENT.md.
- G3: met in a second turn after his yes: independent check run, 15 supported, 5 partly, 1 not
  supported, 1 could not open; all corrected in CONTENT.md.
