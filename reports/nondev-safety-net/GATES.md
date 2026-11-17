# Gates: non developer safety net report (17 Nov 2026)

- [x] G1 Research covers the 13 named areas, each with at least one source.
  MANUAL: read REPORT.md audit table; every area has a row and the sources list names a source for it.
- [x] G2 Every research claim in the report passed an independent check (Sonnet agent against primary sources).
  MANUAL: the claim check verdicts are listed in REPORT.md under "How the research was checked".
- [x] G3 Every audit row names the existing script or hook, or says missing, and each named file exists.
  CHECK: node reports/nondev-safety-net/gates.mjs g3
  EXPECT: PATHS_OK
- [x] G4 Ranked recommendations each name a tool and a cost.
  MANUAL: each numbered recommendation has "Runs with" and "Cost" lines.
- [x] G5 No em or en dashes in the report.
  CHECK: node reports/nondev-safety-net/gates.mjs g5
  EXPECT: NO_DASH_OK
- [x] G6 Committed and pushed with only this folder staged; nothing under site/haven changed by this session.
  CHECK: node reports/nondev-safety-net/gates.mjs g6
  EXPECT: PUSHED_OK
