# Gates: colour section, round 1

OWNS: reference/design-system-cs/versions/**, reference/design-system-cs/concept/DECISION-INVENTORY.md

Scope: three versions of the colour section (A, B, C) in `colour.md`, checked, pushed and published as the
private canvas page, written before the copy (23 Nov 2026).

- [x] G1: Three versions, A B and C, present, each on a different layout from his pool (T1I, T2I, T3I or a
  named WIP layout); they differ in structure and order (angle line per version).
  CHECK: node reference/design-system-cs/versions/check-colour.mjs
  EXPECT: COLOUR-PASS
  EVIDENCE: COLOUR-PASS, 23 Nov; A T3I, B T2I, C T1I
- [x] G2: Every version carries every point P1 to P8 (Covers line plus the marker text of each point in its
  page copy; P8 in its image notes).
  CHECK: node reference/design-system-cs/versions/check-colour.mjs
  EXPECT: COLOUR-PASS
  EVIDENCE: COLOUR-PASS, 23 Nov
- [x] G3: Humanizer pass run as the skill on all page copy, draft then audit then final, recorded in colour.md.
  CHECK: node reference/design-system-cs/versions/check-colour.mjs
  EXPECT: COLOUR-PASS
  EVIDENCE: recorded under Checks run on this round; no-ai-slop detect pass also run
- [x] G4: Every factual claim checked by an independent agent that saw claims and sources only; every PARTLY
  or NO MATCH fixed in the copy.
  CHECK: node reference/design-system-cs/versions/check-colour.mjs
  EXPECT: COLOUR-PASS
  EVIDENCE: colour-claims.md, 24 claims, 18 MATCH, 4 PARTLY fixed, 2 NO MATCH fixed (K9, K10 removed)
- [x] G5: No em or en dashes, no hyphen pairs as dashes, no Oxford commas, no quote marks in copy, headlines in
  sentence case. Positive control: a planted dash, Oxford comma and dropped point made the check fail (23 Nov).
  CHECK: node reference/design-system-cs/versions/check-colour.mjs
  EXPECT: COLOUR-PASS
  EVIDENCE: COLOUR-PASS; control failed as expected
- [x] G6: Canvas page published privately as Design system CS canvas, its link at the top of colour.md, and
  the work pushed to claude/design-system-cs-draft.
  EVIDENCE: https://claude.ai/artifact/F6GSt8iFZJu6NbPyfnE9TG; push recorded in git log
