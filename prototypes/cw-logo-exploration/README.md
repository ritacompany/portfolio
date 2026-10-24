# CW mark exploration

These are proposals based on Chadwick's supplied `Vector.svg`. No direction has been approved for the portfolio.

Open `comparison.html` to compare the source and three alternatives at 48, 160 and 490 pixels wide. `preview.png` gives a quick overview. `original.svg` is a byte-for-byte copy of the supplied file. `original-padded.svg` changes only the canvas. The original path fits inside its 912 by 271 viewBox, but comes within one unit of its right and bottom edges. The tighter export is a spacing issue, not a clipped contour.

## Directions

1. **Tightened sweep:** compresses the C's long rise and gives its opening one angled cut. This is the recommended first direction because it changes the large silhouette without losing the continuous gesture.
2. **Open join:** adds a diagonal break between C and W. It makes the letter transition deliberate at medium size, but the gap is subtle at 48 pixels.
3. **Hard stops:** cuts both ends and shortens the W finish. It gives the large mark a more abrupt ending, which also removes some of the original flourish.

The alternatives retain the source path as their foundation. `make-variants.mjs` applies coordinate changes and vector masks, then writes the SVGs. The masks are part of each SVG file and rendered in the macOS SVG rasterizer used for this review. The selected direction should receive a final optical pass in its actual header context before replacing the current mark.
