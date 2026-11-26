# Gates: live review build in portfolio-site

OWNS: reports/live-review/**

Scope (in portfolio-site: scripts/serve.mjs, scripts/studio/flare-dock.js, docs/EDITING_WORKFLOW.md): npm run studio starts Flare's bridge, docks Flare's panel beside the page when the page keeps
1024 px, stamps the width on every push, and the workflow doc says how review mode runs.

- [x] B1: Starting the studio starts the bridge, and Flare on the page reports it connected
  CHECK: node reports/live-review/check-build.mjs bridge
  EXPECT: BUILD_OK bridge
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=76f76901609293f880e22316ff23105bfd0a7bb24867168e4de5411f5e9d662a; output-bytes=16

- [x] B2: At 1440 the open panel runs full height on the right, the page and its fixed nav end at its left edge and keep at least 1024 px
  CHECK: node reports/live-review/check-build.mjs dock
  EXPECT: BUILD_OK dock
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=ae0cd592481acc7cc34901338879c2796303fcf1e0f267c279e71213d32a566f; output-bytes=14

- [x] B3: At 1024 and 800 the page keeps the full window width (no squeeze under its own layout), and minimizing at 1440 gives the page its full width back
  CHECK: node reports/live-review/check-build.mjs nodock
  EXPECT: BUILD_OK nodock
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=3a439e431271a9839898c2f97ebe27f22a347c8988c7693407cdbfadb62b337f; output-bytes=16

- [x] B4: A real Flare push from the page lands with the window width, and a push in Canvas mode lands with the frame width
  CHECK: node reports/live-review/check-build.mjs width
  EXPECT: BUILD_OK width
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=0384276242572ce2ef5753323e3bda9032fb1af016eaeda6eb8572fb282c0379; output-bytes=15

- [x] B5: npm run dev still serves pages with no Flare and no studio script
  CHECK: node reports/live-review/check-build.mjs plain
  EXPECT: BUILD_OK plain
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=a9ad2bdbaa012bb92aeb1f31bf224cfb76d4f538d615f42c0cdbac6da1ba3909; output-bytes=15

- [x] B6: EDITING_WORKFLOW.md has a review mode section with start, the watch, clearing handled files and stop; no dashes in new prose
  CHECK: node reports/live-review/check-build.mjs doc
  EXPECT: BUILD_OK doc
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=2a6d81a164014ed73edd91c41b46743b45c8cd913fe9d58811c8c0b77a7cb07a; output-bytes=13

- [x] B7: Only the owned files changed in portfolio-site
  CHECK: node reports/live-review/check-build.mjs scope
  EXPECT: BUILD_OK scope
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=8c3d5100ceac2eff4dc8858f28064762fd4f2272aec94fbf0b00ecb304bba2ff; output-bytes=15

- [x] B8: Screenshots at 1440 docked, 1024 and in Canvas mode looked at by eye: nothing covers the page at 1440
  EVIDENCE: manual 14 Nov: evidence/build-1440-docked.png shows the panel full height on the right and the page, nav and copy ending at 1100 with nothing over them; evidence/build-1024-canvas.png shows the 1024 frame beside the panels. The site's own dev rail and Type review pill stay on the page as before.
