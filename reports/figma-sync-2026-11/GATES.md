# Gates: Figma sync, 11 Nov 2026

OWNS: site/index.html, site/css/home.css, site/haven/index.html, site/haven/haven.css, site/haven/current.css, scripts/verify-figma-sync.mjs, reports/figma-sync-2026-11/**, LEDGER.md

Scope: Home and Haven on branch claude/relaxed-ride-5mlbdu match his Figma file as read on 11 Nov, every change traced to a node in DIFF.md, with items that need his call listed and not built.

- [ ] G1: Home text at 1440 matches the master 4494:5909 (colour, weight, size, line height, tracking), rows D1 to D4
  CHECK: node reports/figma-sync-2026-11/check-text.mjs home
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: pending

- [ ] G2: Home text at 402 matches the Mobile frames 4929:12379, including the new phone hero line (D5)
  CHECK: node reports/figma-sync-2026-11/check-text.mjs phone
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: pending

- [ ] G3: Home colours and weights at 768 match the master (no tablet frame exists)
  CHECK: node reports/figma-sync-2026-11/check-text.mjs tablet
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: pending

- [ ] G4: Haven text at 1440 matches Haven CS Master 3300:12596, rows V1 to V24
  CHECK: node reports/figma-sync-2026-11/check-text.mjs haven
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: pending

- [ ] G5: the 10 Nov Home gate still passes with today's values for the lede and Selected works title
  CHECK: node scripts/verify-figma-sync.mjs
  EXPECT: FIGMA_SYNC_OK
  EVIDENCE: pending

- [ ] G6: tokens equal his variables and text styles
  CHECK: node scripts/verify-tokens.mjs
  EXPECT: TOKENS_OK
  EVIDENCE: pending

- [ ] G7: the ASCII banner is absent from Home and Haven (matcher self-tests on a planted sample first)
  CHECK: node reports/figma-sync-2026-11/check-static.mjs ascii
  EXPECT: ASCII_ABSENT
  EVIDENCE: pending

- [ ] G8: no hex colour in home.css or components.css; haven.css hex only in its :root token block
  CHECK: node reports/figma-sync-2026-11/check-static.mjs hex
  EXPECT: HEX_OK
  EVIDENCE: pending

- [ ] G9: Haven still runs its motion with no console error or failed request
  CHECK: node scripts/verify-haven.mjs motion
  EXPECT: HAVEN_MOTION_OK
  EVIDENCE: pending

- [ ] G10: screenshots of Home and Haven at 1440, 768 and 390 taken in the built-in browser and compared with the Figma frames
  EVIDENCE: pending

- [ ] G11: DIFF.md gives every difference a node, old value, new value and status; LEDGER.md updated; branch pushed
  EVIDENCE: pending
