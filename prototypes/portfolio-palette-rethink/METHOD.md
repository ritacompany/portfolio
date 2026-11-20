# Portfolio color system reconsidered

## What the previous method actually was

The first proposal selected the five bright swatches from the supplied image. The second manually lowered their brightness and checked their contrast against the image's near black and off white. I did not derive a palette from the website composition or test the colors in the hero, work cards or footer. I also treated all five colors as equal accents. My claim that the darker version would fit the site better was unsupported.

## What the new site screenshot shows

Observed: the site is overwhelmingly black, with large white type and a grayscale person in the hero. The original palette appears as a small, left aligned five by two block between the hero and About. It is an interruption in the page rhythm, not a full page color field. The Mondai image introduces green and the Haven image introduces violet later in the scroll.

Interpretation: the ten tiles work as one graphic object. Each column makes a bright and dark relationship visible at once. The black gaps keep those relationships crisp. The lower row adds weight and sometimes changes hue or saturation, so it is not merely a darker copy of the upper row. The small scale lets this intense object coexist with the restrained page. This interpretation needs testing in Figma, but it explains the visible difference better than matching five hex values in isolation.

## Measured color relationships

The values below were sampled from the center of each swatch in the original supplied image. OKLCH lightness is computed from those samples. It describes perceptual lightness more usefully than the brightness slider in an RGB picker.

- Green to teal: `#00B659` at 67.9 lightness, then `#1E5553` at 41.3. The lower color also shifts toward blue.
- Pink to red: `#F895A7` at 77.7, then `#DD2B37` at 58.4. The lower color is redder and more chromatic.
- Citron to olive: `#E5EEA1` at 92.5, then `#96A701` at 69.1. The lower color loses the pale surface quality but remains relatively light.
- Violet to plum: `#DD5BFE` at 70.1, then `#712384` at 42.1. The lower color adds a deep anchor.
- Periwinkle to indigo: `#A1A5F9` at 75.2, then `#402A99` at 38.7. The lower color adds the deepest anchor.

The previous darker set sat mostly between those two rows. That removed the strongest part of the original: visible separation inside each column. A single middle shade cannot reproduce a two-value relationship.

## Recommendation

Keep the original ten values as five named color relationships. Treat the complete five by two block as one signature graphic on the homepage. Use one relationship at a time elsewhere, only when it has a clear job. Keep black and white responsible for page structure and text. Let the Mondai and Haven images retain their own project colors without forcing brand accents onto them.

This is five color families, but ten actual values. If the cap means five exact hex values, preserving the distinctive two-row effect and meeting that cap are incompatible. The stronger choice is to keep the pairs and control how often color appears.

The visual study also includes a strict five-value fallback that alternates bright and deep originals. It restores contrast across a row but cannot retain the paired relationships that make the small two-row block feel complete. Use it only if five actual hex values is a firm limit.

The first jacket recolor to test is `#DD2B37`. It is already the sharp red note in the original composition. Against the black hero it has more presence than teal, plum or indigo, and it does not repeat the green Mondai or violet Haven imagery. This is a test direction, not a finished color decision. The current Figma hero image is grayscale, so the jacket choice still needs a real composite in the intended image and a full-page review.

## What would change the recommendation

If a single pair fails to carry the same tension when used alone in the site layout, keep the ten-tile motif as a standalone artwork and restrict the wider interface to black, white and one jacket color. If the red jacket overwhelms the person or competes with the page title, test the green upper value next before inventing another palette.
