# Gates: portfolio palette rethink

OWNS: prototypes/portfolio-palette-rethink/**

Scope: explain why the ten-tile palette works in the supplied site view, replace the single-shade strategy with a grounded system and account for the jacket color.

- [x] G1: The diagnosis names the visible mechanism in the supplied site screenshot and the specific error in the previous method.
  EVIDENCE: METHOD.md states that the earlier palettes selected the upper row or manually darkened it, then checked contrast without page context. The supplied site screenshot is shown unmodified in index.html, where the narrow two-row block, grayscale hero and surrounding black field can be inspected together.

- [x] G2: The proposed system preserves the original palette's five color families and paired light and dark behavior without pretending five exact values can reproduce ten.
  EVIDENCE: METHOD.md lists all ten sampled values with computed OKLCH lightness. index.html renders the ten original values as five columns and labels the strict five-value strip as a fallback with a different effect.

- [x] G3: The new visual study shows the palette as a controlled element on a black page and shows how one family can be used without displaying all ten colors.
  EVIDENCE: Reviewed the rendered opening viewport of index.html. It shows the user's compact palette placement in context. The later single-family sample shows only the pink and red pair on black and is labeled a usage study.

- [x] G4: The recommendation identifies a jacket color to test and explains how it interacts with the existing green Mondai and violet Haven imagery.
  EVIDENCE: METHOD.md and index.html select the original deep red #DD2B37 as the first jacket recolor test. They identify the green and violet project images and state that the jacket has not been composited or approved.
