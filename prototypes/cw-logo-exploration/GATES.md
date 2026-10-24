# Gates: CW mark revision

OWNS: prototypes/cw-logo-exploration/**

Scope: replace the rejected cut-based studies with coherent close refinements of the original CW mark.

- [x] G1: The revision states a consistent shape rule for each direction and explains the specific failure of the rejected studies.
  EVIDENCE: DESIGN.md records the mask failure and the three complete shape systems.

- [x] G2: Each delivered mark reshapes both the C and W, keeps the recognizable gesture and has no arbitrary cut masks or isolated terminal tricks.
  EVIDENCE: 01-taut.svg, 02-soft-square.svg and 03-balanced.svg are new full-length paths. Visual review in preview.png shows the CW gesture in all three; verify.mjs rejects mask and clipPath elements.

- [x] G3: The delivered marks are compared with the source at header, medium and enlarged scales. The visual review explicitly checks legibility, stroke rhythm, corner consistency and large-scale silhouette.
  EVIDENCE: comparison.html displays every mark at 48, 160 and 490 pixels. DESIGN.md records a scale review for legibility, rhythm, corners and silhouette; preview.png was visually inspected.

- [x] G4: The final critique rejects any weak sketch and recommends a direction only if it improves the original at the sizes Chadwick wants.
  EVIDENCE: DESIGN.md rejects the brush sketch after the large-scale view revealed a self-intersection, then compares the surviving directions and recommends Soft square with its header and large-scale tradeoffs.

- [x] G5: The source stays byte-identical, delivered SVGs are valid and the comparison references the current files.
  CHECK: node prototypes/cw-logo-exploration/verify.mjs
  EXPECT: CW vector verification passed
  EVIDENCE: Direct inspection and execution of verify.mjs through /bin/zsh in /Users/chadwickfenner/Code/portfolio returned exit 0 and matched CW vector verification passed. Combined output SHA256: 20247be865652317c2bc5bd3c7b5a840f93e4edf0940bca798209b47fffd5165. The script checked the original SHA256, parsed all SVGs, rejected mask and clipPath elements, checked current references and inspected preview.png dimensions.
