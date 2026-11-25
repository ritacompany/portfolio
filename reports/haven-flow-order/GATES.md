# Gates: Haven journey flow order

OWNS: reports/haven-flow-order/**, site/dev/haven-flow-order/**

Scope: find the true order of the Confidante selection flow from primary sources, write it up, and build the corrected flow as a proposal in site/dev that works at desktop, tablet and phone with the slide still landing Select a Confidante on slot 5, then ask him before the live page changes.

- [x] G1: the proposal draws the corrected start and end orders at 1440, 1024, 768 and 390, with and without reduced motion, Select a Confidante on slot 5, and the corrected aria-label
  CHECK: node reports/haven-flow-order/check-flow.mjs http://127.0.0.1:4400 /dev/haven-flow-order/ quiz,review,select,schedule,intro quiz,review,schedule,intro,select "Revised flow: identity quiz, review matches, schedule a chat, intro chat, select a Confidante"
  EXPECT: FLOW_ORDER_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=566f4cad3627/16 entries; EXPECT=matched; output-sha256=86c5cd3588c485b45149140e08ae3dd8c66c2bc257e2bb00c34161f47c128e56; output-bytes=1053

- [x] G2: the same checker fails on the live page against the corrected order (positive control that it can fail)
  CHECK: node -e "const r=require('child_process').spawnSync('node',['reports/haven-flow-order/check-flow.mjs','http://127.0.0.1:4400','/haven/','quiz,review,select,schedule,intro','quiz,review,schedule,intro,select'],{encoding:'utf8'});process.stdout.write(r.status!==0&&/FLOW_ORDER_FAIL/.test(r.stdout)?'CONTROL_FAILS_OK\n':'CONTROL_DID_NOT_FAIL\n');process.exit(r.status!==0?0:1)"
  EXPECT: CONTROL_FAILS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=566f4cad3627/16 entries; EXPECT=matched; output-sha256=0081174e95403bb072fb6f2f2023c046c2aaeb13074cb7e6843857edeb4bf145; output-bytes=17

- [x] G3: site checks still pass
  CHECK: node scripts/check-site.mjs
  EXPECT: site check OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ab46ed77fd57/16 entries; EXPECT=matched; output-sha256=99103afc516c3833f4aed24b70458a903e0e72c8c5cbd2d64ee9cd50cd4b6042; output-bytes=27

- [x] G4: responsive checks on haven still pass
  CHECK: node scripts/verify-responsive.mjs fit haven && node scripts/verify-responsive.mjs overlap haven && node scripts/verify-responsive.mjs health haven && node scripts/verify-responsive.mjs size haven
  EXPECT: RESPONSIVE_SIZE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=566f4cad3627/16 entries; EXPECT=matched; output-sha256=72e6700b7676c3de1f405cf1a25eec369817fcb868cc1bf5e80ee36c40ced6b7; output-bytes=136

- [x] G5: hover still check passes
  CHECK: node scripts/verify-hover-still.mjs site
  EXPECT: HOVER_STILL_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=566f4cad3627/16 entries; EXPECT=matched; output-sha256=1519cf1d6f6a5ce323ee5b3c815d3449e4fc91fa0229b3a90823f1ba69261678; output-bytes=25

- [x] G6: findings file states each source's order and contains no em or en dash
  CHECK: node reports/haven-flow-order/check-findings.mjs
  EXPECT: FINDINGS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ab46ed77fd57/16 entries; EXPECT=matched; output-sha256=c938ae8b07197d74ecdeed9bfdcb04b48944980f8caf85d5261f869c21cbb9d2; output-bytes=12

- [x] G7: phone audit on the live page has no more findings than before (30, checks-before.txt) and none about the flow
  EVIDENCE: 25 Nov, audit.mjs on the live page: 30 findings before and after (checks-before.txt, checks-after.txt), all 14 px card body text at 320 to 430, none on the flow. The live page is unchanged until his yes; the audit only serves /haven/, so the dev proposals are covered by G1, G9 and check-site instead.

- [ ] G8: he was asked with a [site change] card showing before and after; site/haven is changed only after his yes
  EVIDENCE: pending

- [x] G9: the vertical proposal at his Figma sizes draws the corrected orders and lands Select on slot 5 at every width
  CHECK: node reports/haven-flow-order/check-flow.mjs http://127.0.0.1:4400 /dev/haven-flow-vertical/ quiz,review,select,schedule,intro quiz,review,schedule,intro,select "Revised flow: identity quiz, review matches, schedule a chat, intro chat, select a Confidante"
  EXPECT: FLOW_ORDER_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ab46ed77fd57/16 entries; EXPECT=matched; output-sha256=86c5cd3588c485b45149140e08ae3dd8c66c2bc257e2bb00c34161f47c128e56; output-bytes=1053

- [x] G10: the phone video is full frame 780 by 1688 at 60 fps and renders the same bytes twice (first, middle and last frames checked by eye: start order, Select passing Intro chat, end order)
  EVIDENCE: 25 Nov, ffprobe 780,1688,60/1,228 frames; two renders sha256 7ceb4774c3adb121 both; frames at 0.3 s, 1.6 s and 3.7 s looked at: start quiz, review, select (green), schedule, intro; middle Select crossing Intro chat on its way to 5; end quiz, review, schedule, intro, select. Step 1's top sits under the 50 px bar (column 822 tall, screen under the bar 794), stated on the canvas.
