# Gates: chat phone round 10 on the live Haven page

OWNS: site/haven/chat-rotate.js, site/haven/current.js, site/haven/current.css, site/haven/index.html, scripts/check-chat-rotate.mjs, docs/motion/chat-rotate/**

Scope: port round 10 (haven/case-study 32c4e47) into site/haven so the live page plays it; every check loads site/haven/index.html itself.

- [x] G1: phone at the Figma frame 1 spot and tilt before its own motion starts, outline IoU 0.96 or more
  CHECK: node ../../../scripts/check-chat-rotate.mjs start
  EXPECT: START_MATCH
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1b1673ed210777010d2691633fdf1271dfd584f1cf9bdc34adea3c48d6c2145d; output-bytes=288

- [x] G2: phone face on at the meet, centre mid screen, outline IoU 0.96 or more against frame 2
  CHECK: node ../../../scripts/check-chat-rotate.mjs end
  EXPECT: END_MATCH
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=206f0a8d5968426e9484b637dd4ed0d37837d863382910549a3f370a04b4e18e; output-bytes=297

- [x] G3: paragraph is plain page text, never moves inside the block, Figma offsets within 4 px at both ends
  CHECK: node ../../../scripts/check-chat-rotate.mjs text
  EXPECT: TEXT_MATCH
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=9944d4c3495bb5fc5f0c307cd6d40e8d76f43027fdd7756e86e57e670a475a35; output-bytes=190

- [x] G4: later start and slower rise: turn 0 until the phone centre reaches the screen bottom, then it only rises and lands mid screen
  CHECK: node ../../../scripts/check-chat-rotate.mjs path
  EXPECT: PATH_RISES
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=b8289c2c169eac29bfe3a5abd4bddfa6c468be58d5bf861182066ff218061b89; output-bytes=166

- [x] G5: pair holds still for one full screen of scroll, then both leave at page speed
  CHECK: node ../../../scripts/check-chat-rotate.mjs hold
  EXPECT: HOLD_SCREEN
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=97958ad022977ac2f77ae12154d67b2c99f3ab6452dcb615e8d7b1066a6cf7c9; output-bytes=223

- [x] G6: chip at each frame's offset above the phone centre, right aligned, still through the hold
  CHECK: node ../../../scripts/check-chat-rotate.mjs chip
  EXPECT: CHIP_RIDES
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=93113744b51b1b7fceea5814df0b5ca43c1a63b84b6db0de031d30b96065dac8; output-bytes=161

- [x] G7: CSS sticky hold on the GPU with Lenis and wheel input: never a frame behind, 0 px shake, 0 repaints in the hold, p95 frame under 20 ms
  CHECK: node ../../../scripts/check-chat-rotate.mjs smooth
  EXPECT: SMOOTH_LIVE
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=180de97ee1f81ea709026b14675c3a5ddfea06b13c95bc410202c8e98893deaf; output-bytes=128

- [x] G8: reduced motion: no WebGL mount, frame 2 still in place, no movement inside the block, no hold reserved
  CHECK: node ../../../scripts/check-chat-rotate.mjs reduced
  EXPECT: REDUCED_STILL
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/chat-rotate; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=aa7d2332d333e349ccfbfab06bbbb821eecefab39aefc174b73cb3b2d385f1db; output-bytes=353

- [x] G9: each of G1 to G8 fails on its planted mistake (CHECK_PLANT=1)
  EVIDENCE: 11 Nov, CHECK_PLANT=1 run for start, end, text, path, hold, chip, smooth and reduced on this code: all eight printed FAILED and exited 1

- [x] G10: in the built-in browser at 1440, 768 and 390 the pair holds with no overlap and the chip on screen
  EVIDENCE: 11 Nov, localhost:4318/haven/. 1440 meet and hold: chip top 54, paragraph top 437, phone centre 450, same at half hold. 768 hold: paragraph right 370, phone image left about 425, chip 301 to 341. 390 hold: chip 49 to 89, phone above paragraph (611), 1 px drift. Frames in the session notes folder, chat-rotate-port-frames
