# Gates: live review proposal

OWNS: reports/live-review/**

Scope: a sourced proposal for commenting and nudging on live site pages, stopped for his yes.

- [x] G1: PROPOSAL.md has a recommendation, the compared tools and a stop for his yes
  CHECK: node reports/live-review/verify.mjs proposal
  EXPECT: proposal ok
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=88c7f3afbb6747ddd81ed80a2b142ffe84b891580fcef1c3c73e47828e1082aa; output-bytes=12

- [x] G2: No em or en dashes in the report files
  CHECK: node reports/live-review/verify.mjs dashes
  EXPECT: dashes ok
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=18c42968ea6130b5eb043c6ee46c4a406fa36d10cd16857875588af07eda405f; output-bytes=10

- [x] G3: The tested comment and nudge payloads and screenshots are kept as evidence
  CHECK: node reports/live-review/verify.mjs evidence
  EXPECT: evidence ok
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=82b544461918436c360938c9585174bfa4dededb15f9fee9927c586db4803adc; output-bytes=12

- [x] G4: Commits touch only reports/live-review and portfolio-site is unchanged
  CHECK: node reports/live-review/verify.mjs scope
  EXPECT: scope ok
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=10c38ce83945a7abe2f8c36aff4ffcc0034e6b32bd00244d3f8fe81dff6e35e3; output-bytes=11

- [x] G5: Resource sourcing ran before proposing (in-product plugin search, web sources, finalists' files read)
  EVIDENCE: manual 14 Nov: SearchPlugins (Annotate, design plugins), two extended web searches, Plannotator docs, browser-annotations README, Agentation listings; Annotate repo cloned and its server, hooks and package read; Flare dist read (bridge, watcher) and tested live on /haven/
