# Five color core palette

## The correction

The previous study kept Chadwick's original ten values and treated their two-row display as the palette. This proposal instead defines five new primary colors. The outfit does not determine any of them. Lighter and darker colors are generated from each primary color when a layout needs them.

## Evidence used

- The supplied portfolio screenshot places a small color block beneath a largely black and grayscale hero. The block is the design context for this test.
- The supplied original palette establishes five color relationships: green to teal, pink to red, citron to olive, violet to plum and periwinkle to indigo. Those are directional references, not values copied into the new palette.
- A screenshot of the current Figma hero has a dominant `#000000` background and `#F5F4F9` large lettering. These are neutral context colors. They do not count toward the five accent colors.

## Selection method

I chose one OKLCH anchor for each original color relationship. OKLCH separates perceptual lightness, chroma and hue, so each axis can be adjusted for a reason. I set the five anchor hues near the original families, then gave them deliberately uneven lightness. Citron is much lighter than the others and indigo is darkest. Crimson rose supplies the saturated red note that the old palette had in its lower row. The anchors are gamut safe in standard RGB, so their hex values can be used in Figma.

The five primary colors are:

- Signal green: `#25A351`, OKLCH 63 / .16 / 150.
- Crimson rose: `#E52751`, OKLCH 60 / .22 / 16.
- Acid citron: `#B8C625`, OKLCH 79 / .17 / 115.
- Electric violet: `#B637D5`, OKLCH 59 / .24 / 319.
- Royal indigo: `#6555E6`, OKLCH 55 / .21 / 282.

None of these five hex values appears in the original ten-swatch image. That matters because the task is to propose a new core palette, not re-label the previous one.

## Shade recipe

Each optional light or dark value starts at its core anchor in `palette-spec.json`. The recipe records a change in OKLCH lightness, chroma and hue. The green dark value shifts toward teal and the rose dark value shifts toward red because those movements are part of the original relationships. `generate.mjs` converts the result to an RGB hex value. If a requested color falls outside the RGB gamut, the generator lowers chroma while preserving lightness and hue. `palette.json` contains the current outputs.

This is a repeatable way to add shades. A new shade needs a purpose and a chosen lightness step, then it can be generated from the same core. The optional samples do not replace the five primary colors.

## In-context judgment

`index.html` shows the original block, a new five-color block and a two-row block derived from the same five anchors at the original size and position on the supplied site screenshot. The five-color block reads denser and sharper than the original because it replaces the pastel row with saturated mid and dark values. The derived block recovers more of the original light and dark rhythm while remaining tied to the new core palette.

My recommendation is to test the five primary colors as the actual palette in Figma. If the single-row block feels too flat in the live layout, use the derived two-row display as a graphic treatment while keeping the same five primary colors as the system's anchors. The comparison edits only the color block in a screenshot, so it does not establish how these colors will behave in buttons, typography or other page elements. No final palette decision is recorded.
