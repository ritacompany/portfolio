# CW mark exploration

These are unapproved proposals based on Chadwick's supplied `Vector.svg`. `original.svg` is a byte-for-byte copy. The original fits inside its 912 by 271 viewBox and is not clipped.

Open `comparison.html` to see the source, the previous Soft square pick and three new alternatives at 48, 160 and 490 pixels. `preview.png` is a quick overview.

## Current recommendation

**04 Structured curve** is the strongest close refinement. The C bowl has a flatter base, its climb becomes a clear diagonal spine and both W valleys repeat a flatter floor. The outer crests share a small radius, so the large silhouette has one consistent shape rule. Its 48 pixel header mark retains the original gesture and weight.

**05 Controlled pressure** tests a different job: more movement when enlarged through a repeated light crest and heavy valley rhythm. **06 Compact gesture** tests proportion: less C reach, a shorter exit and more space for the W. The first loses some strength in the header; the second stays too close to the original's softness to be the main recommendation.

`02-soft-square.svg` remains for direct comparison with the earlier recommendation. `01-taut.svg` and `03-balanced.svg` remain as prior studies, but are not shown on the current board. The rejected cut studies remain in Git history.

`DESIGN.md` records the visual review and rejected sketches. `draw-next.mjs` generates the three new SVGs. `render-preview.py` generates the overview with Pillow and the macOS `sips` command. Run `node verify.mjs` to check the source, SVG files and comparison references.
