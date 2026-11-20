# Gates: new core palette

OWNS: prototypes/portfolio-palette-core/**

Scope: propose five new core colors, derive lighter and darker companions from them and judge both the core block and expanded block against the black portfolio page.

- [x] G1: The five new core colors form a coherent block on the supplied black page while giving each hue a distinct visual weight.
  EVIDENCE: palette.json contains five unique core hex values, none of which matches the original ten samples. METHOD.md states the OKLCH selection method and why the core lightness values are uneven. An independent comparison of the ten originals against palette.json found no reused core hex.

- [x] G2: The optional light and dark samples visibly belong to the five anchors and recover the source block's tonal range without becoming a second primary palette.
  EVIDENCE: palette-spec.json records the five anchors and per-family lightness, chroma and hue deltas. generate.mjs converts those OKLCH values to the 15 hex values in palette.json. The HTML labels the ten companion values as optional samples.

- [x] G3: The comparison makes the difference between the original, the new core block and the expanded block legible at the scale used on the site.
  EVIDENCE: The saturated block in the supplied 444 by 1438 screenshot occupies x 22 through 226 and y 440 through 548. index.html overlays that same 205 by 109 area in two copies, leaving a third copy untouched. Quick Look renders of the original, core and derived views were inspected.

- [x] G4: The recommendation judges the new colors in page context, names the strongest remaining limitation and leaves outfit decisions outside this palette study.
  EVIDENCE: METHOD.md recommends the five core anchors for the Figma palette and the derived block only if the single row feels too flat. It states that the screenshot comparison covers the block, not buttons or type. index.html says the outfit is outside the study and does not recolor it.
