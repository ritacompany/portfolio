# Gates: Figma sync, 11 Nov 2026

OWNS: site/index.html, site/css/home.css, site/haven/index.html, site/haven/haven.css, site/haven/current.css, scripts/verify-figma-sync.mjs, reports/figma-sync-2026-11/**, LEDGER.md

Scope: Home and Haven on branch claude/relaxed-ride-5mlbdu match his Figma file as read on 11 Nov, every change traced to a node in DIFF.md, with items that need his call listed and not built.

- [x] G1: Home text at 1440 matches the master 4494:5909 (colour, weight, size, line height, tracking), rows D1 to D4
  CHECK: node reports/figma-sync-2026-11/check-text.mjs home
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: exit 0, TEXT_SYNC_OK 32 rows (8 skipped with a reason), 11 Nov; failed before the change on D1 and D2

- [x] G2: Home text at 402 matches the Mobile frames 4929:12379, including the new phone hero line (D5)
  CHECK: node reports/figma-sync-2026-11/check-text.mjs phone
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: exit 0, TEXT_SYNC_OK 29 rows (3 skipped); failed before on the phone line (not on the page)

- [x] G3: Home colours and weights at 768 match the master (no tablet frame exists)
  CHECK: node reports/figma-sync-2026-11/check-text.mjs tablet
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: exit 0, TEXT_SYNC_OK 32 rows (8 skipped)

- [x] G4: Haven text at 1440 matches Haven CS Master 3300:12596, rows V1 to V24
  CHECK: node reports/figma-sync-2026-11/check-text.mjs haven
  EXPECT: TEXT_SYNC_OK
  EVIDENCE: exit 0, TEXT_SYNC_OK 97 rows (6 skipped); 70 Haven rows failed before

- [x] G5: the 10 Nov Home gate still passes with today's values for the lede and Selected works title
  CHECK: node scripts/verify-figma-sync.mjs
  EXPECT: FIGMA_SYNC_OK
  EVIDENCE: exit 0, FIGMA_SYNC_OK 171 checks

- [x] G6: tokens equal his variables and text styles
  CHECK: node scripts/verify-tokens.mjs
  EXPECT: TOKENS_OK
  EVIDENCE: exit 0, TOKENS_OK 86 tokens

- [x] G7: the ASCII banner is absent from Home and Haven (matcher self-tests on a planted sample first)
  CHECK: node reports/figma-sync-2026-11/check-static.mjs ascii
  EXPECT: ASCII_ABSENT
  EVIDENCE: exit 0, ASCII_ABSENT 9 files; matcher self-test on a planted box and "Systems thinker." sample passes first

- [x] G8: no hex colour in home.css or components.css; haven.css hex only in its :root token block
  CHECK: node reports/figma-sync-2026-11/check-static.mjs hex
  EXPECT: HEX_OK
  EVIDENCE: exit 0, HEX_OK

- [x] G9: Haven still runs its motion with no console error or failed request
  CHECK: node scripts/verify-haven.mjs motion
  EXPECT: HAVEN_MOTION_OK
  EVIDENCE: exit 0, HAVEN_MOTION_OK (clock pattern now accepts seconds)

- [x] G10: screenshots of Home and Haven at 1440, 768 and 390 taken in the built-in browser and compared with the Figma frames
  EVIDENCE: built-in browser at 1440 (Home hero, Haven key insights and quiz), 768 and 402/390 (phone hero: x 156, 4 lines, top 599 vs Figma 598); full page renders and Figma frames in shots/, side by side compare-home-1440.jpg and compare-haven-1440.jpg; section heights within 2.3 px except Q7 and Q8

- [x] G11: DIFF.md gives every difference a node, old value, new value and status; LEDGER.md updated; branch pushed
  EVIDENCE: DIFF.md: 29 applied, 8 kept, 8 for his call, each with node, old, new and status; LEDGER.md State and Open updated; pushed in the commit that carries this ledger
