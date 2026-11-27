# Gates: card to collection transition

OWNS: site/dev/preview/card-transition.js, site/dev/preview/card-transition.css, scripts/check-card-transition.mjs, docs/motion/card-transition/**

Status, 22 Nov: rebuilt onto the new collection page (6331:27875, PR #30). Runs are recorded in review_log.md. Evidence fingerprints are not recorded through the unlazy checker, so boxes stay unticked until it runs with approval. M1 waits on him.

Scope: three directions (A Title, PR #30's view transition; B Card; C Open) for the move from the Mondai card on Home to the new Mondai collection page, on the preview build of this branch. Nothing in the shipped site changes until his yes.

Harness: each check builds the preview into output/ct-preview, then runs `node scripts/check-card-transition.mjs <gate> output/ct-preview`. It serves the preview build and drives Chromium at 1440 by 900 and 390 by 844. Stepped gates cover B and C (A is drawn by the browser and cannot be stepped); G4 covers all three.

- [ ] G1: Across the page change, Home's last exit frame and the collection's first arrival frame match (mean difference under 1 of 255, under 0.2 percent of pixels off by more than 40), B and C, both widths.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G1 output/ct-preview
  EXPECT: G1 PASS
- [ ] G1c: Control for G1: the same comparison fails Home's last frame against the arrival a quarter of the way in.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs CONTROL output/ct-preview
  EXPECT: CONTROL PASS
- [ ] G2: The arrival ends on the collection page as a direct visit leaves it (with the Design system image shown; see the note in the script), no copy layer left.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G2 output/ct-preview
  EXPECT: G2 PASS
- [ ] G3: One frame before the hand over, the wordmark copy and B's card frame sit within 1.5 px of the real ones.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G3 output/ct-preview
  EXPECT: G3 PASS
- [ ] G4: On the real clock a click on the card lands on /mondai/ in every direction; B and C run the arrival, A leaves it to the browser; nothing on screen is left hidden.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G4 output/ct-preview
  EXPECT: G4 PASS
- [ ] G5: Reduced motion: the click opens /mondai/ with no veil on Home and no arrival.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G5 output/ct-preview
  EXPECT: G5 PASS
- [ ] G6: A direct visit to /mondai/ keeps the page's own entrance: no layer, the nav shows.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G6 output/ct-preview
  EXPECT: G6 PASS
- [ ] G7: Back from the collection, Home shows no veil.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G7 output/ct-preview
  EXPECT: G7 PASS
- [ ] G8: On the real clock, with the collection held back 0.3 s on the network, a recorded click shows no still stretch over 0.12 s in the first 0.7 s and no frame far darker than both neighbours (his 24 Nov note: a pause). Fails on the 22 Nov build (0.4 s still at 1440, 0.32 s at 390).
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G8 output/ct-preview
  EXPECT: G8 PASS
- [ ] M1 (manual): Chadwick has clicked through all three on the published test build and picked one or sent notes. Open until he answers.
