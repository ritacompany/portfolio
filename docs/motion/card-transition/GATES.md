# Gates: card to collection transition

OWNS: site/dev/preview/card-transition.js, site/dev/preview/card-transition.css, scripts/check-card-transition.mjs, docs/motion/card-transition/**

Status, 21 Nov: every runnable gate (G1 to G7 and the G1 control) printed PASS on the final preview build. Evidence fingerprints were not recorded through the unlazy checker, so the boxes stay unticked until it is run with approval. M1 waits on him. The review log's motion check fails until a fresh eyes round closes round 4 (the reviewer limit per turn was reached).

Scope: three directions (A Open, B Dock, C Zoom) for the move from the Mondai card on Home to the Mondai
collection page, on the preview build. Nothing in the shipped site changes until his yes.

Harness: each check builds the preview into output/ct-preview, then runs `node scripts/check-card-transition.mjs <gate> output/ct-preview`.
It serves the preview build, drives Chromium at 1440 by 900 and 390 by 844 for every direction, and prints
`<gate> PASS` only after every assertion holds. Stepped gates use window.CardTransition.seek, the same
frames the review sheets show.

- [ ] G1: Across the page change, Home's last exit frame and the collection's first arrival frame match (mean difference under 1 of 255, under 0.2 percent of pixels off by more than 40), every direction, both widths.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G1 output/ct-preview
  EXPECT: G1 PASS
- [ ] G1c: Control for G1: the same comparison fails Home's last frame against the arrival a quarter of the way in.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs CONTROL output/ct-preview
  EXPECT: CONTROL PASS
- [ ] G2: The arrival ends on the collection page exactly as a direct visit leaves it, with no copy layer and no transform left.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G2 output/ct-preview
  EXPECT: G2 PASS
- [ ] G3: One frame before the words hand over, each copy sits within 1.5 px of the real title and label.
  CHECK: node scripts/build-preview.mjs site output/ct-preview && node scripts/check-card-transition.mjs G3 output/ct-preview
  EXPECT: G3 PASS
- [ ] G4: On the real clock, a click on the card in each direction reaches /mondai/, the arrival runs and nothing is left over (every page item at full opacity).
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
- [ ] M1 (manual): Chadwick has clicked through all three on the published test build and picked one or sent notes. Open until he answers.
