# Gates: portfolio status audit, 25 Nov

OWNS: reports/status-2026-11-25/**

Scope: STATUS.md with Done, Open and Next, every branch fact checked against GitHub, committed and pushed with a draft PR into main.

- [x] G1: STATUS.md has Done, Open and Next, and Next holds exactly three items
  CHECK: node verify.mjs sections
  EXPECT: sections ok
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reports/status-2026-11-25; path=f3608d64db42/16 entries; EXPECT=matched; output-sha256=433f07c55171fddcda81f6f2a17757cfe8531a09f549042ea3d93de95bd3d51e; output-bytes=12

- [x] G2: No em dash, en dash or double hyphen in STATUS.md
  CHECK: node verify.mjs dashes
  EXPECT: dashes ok
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reports/status-2026-11-25; path=f3608d64db42/16 entries; EXPECT=matched; output-sha256=18c42968ea6130b5eb043c6ee46c4a406fa36d10cd16857875588af07eda405f; output-bytes=10

- [x] G3: The branch facts STATUS.md states hold on the remote branches
  CHECK: node verify.mjs branches
  EXPECT: branches ok
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reports/status-2026-11-25; path=f3608d64db42/16 entries; EXPECT=matched; output-sha256=df65860c20ee3c15ca21ad8b2c36f7bf8f9ee835a77aee5ebd31e79dd88b20ac; output-bytes=12

- [x] G4: The audit commit is pushed to claude/portfolio-status
  CHECK: node verify.mjs pushed
  EXPECT: pushed ok
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reports/status-2026-11-25; path=f3608d64db42/16 entries; EXPECT=matched; output-sha256=952ad52a53e7b8732c6b13b89d3c658f0a07148787083484a48b1346b78f6f58; output-bytes=10

- [x] G5: Draft PR into main exists for claude/portfolio-status
  EVIDENCE: create_pull_request returned PR #52, https://github.com/ritacompany/portfolio/pull/52, draft, base main, head claude/portfolio-status (25 Nov)
