# Liquid Contact button: review log

## Round 1 (9 Nov, 30 fps, 720 and 390 wide)

Renders: output/motion/contact-liquid.mp4 and contact-liquid-390.mp4. Seams 49.8 dB and 48.1 dB, clean.

My list:
- P1 The dent with the hidden colour is thinner than the reference wedge. Fixed: depth 18 to 22 px, width 36 to 44 px.
- P1 The bulge from inside is subtler than the reference bump. Fixed: 14 to 18 px, reach 50 to 54 px.

Fresh eyes: Sonnet, given the style guide, state list and review images only; every state shown.
- P1 At 7.0 s the circle and pill read as joined while the circle flows back after the pointer leaves. Decided: this is the gooey reference's merge on return; it fades to separate crisp outlines before rest (8.0 s on), so it never rests joined.
- P1 The cyan at 1.0 to 1.5 s is a thin crescent; narrower than the reference wedge. Fixed with the dent change above.
- P1 The reference outline is a 1 px grey line; here 3 px Neutral 100, so kinks read less. Kept: 3 px matches the Figma border; Line weight is in the tuner for him.
- P2 The gooey stretch happens between 0.25 s frames. Left: it is visible in the strips and in the tuner at slow speed.
- P2 The pointer ring sits on the label text at 2.0 to 2.75 s. Left: render aid only.
- P2 At 390 the circle comes within 6 px of the frame at 1.5 s. Left: lab frame only; the footer has room.

P0 open: no

Final render at 60 fps rendered twice; the sha256 lines matched.
