# Gates: portfolio status audit, 25 Nov

OWNS: reports/status-2026-11-25/**

Scope: STATUS.md with Done, Open and Next, every branch fact checked against GitHub, committed and pushed with a draft PR into main.

- [ ] G1: STATUS.md has Done, Open and Next, and Next holds exactly three items
  CHECK: node reports/status-2026-11-25/verify.mjs sections
  EXPECT: sections ok
  EVIDENCE: pending

- [ ] G2: No em dash, en dash or double hyphen in STATUS.md
  CHECK: node reports/status-2026-11-25/verify.mjs dashes
  EXPECT: dashes ok
  EVIDENCE: pending

- [ ] G3: The branch facts STATUS.md states hold on the remote branches
  CHECK: node reports/status-2026-11-25/verify.mjs branches
  EXPECT: branches ok
  EVIDENCE: pending

- [ ] G4: The audit commit is pushed to claude/portfolio-status
  CHECK: node reports/status-2026-11-25/verify.mjs pushed
  EXPECT: pushed ok
  EVIDENCE: pending

- [x] G5: Draft PR into main exists for claude/portfolio-status
  EVIDENCE: create_pull_request returned PR #52, https://github.com/ritacompany/portfolio/pull/52, draft, base main, head claude/portfolio-status (25 Nov)
