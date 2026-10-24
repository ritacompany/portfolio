# Gates: CW logo exploration

OWNS: prototypes/cw-logo-exploration/**

Scope: explore close alternatives to Chadwick's existing CW mark and make them reviewable at header and enlarged sizes.

- [x] G1: The original mark is preserved for comparison and the supplied SVG's visible bounds are measured accurately.
  EVIDENCE: `cmp` confirms the copied SVG is byte-for-byte identical. Analytic cubic bounds are x 0 to 911.38 and y 0 to 270.14 inside the 912 by 271 viewBox. The README correctly calls it tight, not clipped.

- [x] G2: Three distinct vector alternatives retain the recognisable CW gesture while addressing the long C sweep and soft terminals in different ways.
  EVIDENCE: Each SVG rendered in the macOS SVG rasterizer and was reviewed at large size. 01 tightens the C and cuts its opening, 02 adds a separate angled join and 03 shortens the W tail with two cut ends. All keep the original C bowl and W valleys.

- [x] G3: The comparison deliverables present the original and every alternative at header and enlarged sizes without distorting their proportions.
  EVIDENCE: The 1600 by 1060 preview was visually reviewed with 48 pixel header marks and larger marks. The HTML specifies widths of 48, 160 and up to 490 pixels with automatic height. All referenced assets exist and all five SVG files parse as XML.

- [x] G4: The exploration recommends one direction with concrete visual reasons and states what Chadwick would need to decide before adoption.
  EVIDENCE: The comparison page recommends 01 for its shorter C reach, single sharper edge and preserved continuous gesture. It frames the remaining choice as continuous movement versus a more literal two-letter reading.
