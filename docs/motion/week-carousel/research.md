# Start of week carousel: research and recommendations

Framework page, section 5812:20498. Live prototype with every option on a toggle:
http://localhost:4318/dev/week-carousel/ (sliders for duration, side card size and brightness, and a reduced motion switch).

## When readers actually move a carousel

Your framing holds up. Readers move a carousel when the next item promises something they want, and skip it when it does not.

- The first item decides it. NN/g calls the first item a letter of recommendation for the rest: if it looks relevant people keep going, if not they skip the whole carousel. ([NN/g, mobile carousels](https://www.nngroup.com/articles/mobile-carousels/))
- What they can see of the next item is the strongest pull. NN/g ranks cues: dots are weak, arrows moderate, a partly visible next item (the "illusion of continuity") strong. ([NN/g, mobile carousels](https://www.nngroup.com/articles/mobile-carousels/))
- Dots on their own get missed. Baymard found about half of desktop users had trouble finding extra images shown only by dots, and 50 to 80% missed truncated items reachable only by arrows. ([Baymard, thumbnails](https://baymard.com/blog/always-use-thumbnails-additional-images), [Baymard, truncated thumbnails](https://baymard.com/blog/truncating-product-gallery-thumbnails))
- Five is the ceiling. NN/g: keep it to five frames or fewer, and reach the last in 3 to 4 steps. We have five, so we are at the limit, not over it. ([NN/g, designing effective carousels](https://www.nngroup.com/articles/designing-effective-carousels/))
- Sideways scrolling is a desktop problem. Most mice only scroll vertically and few people know Shift plus wheel. NN/g calls horizontal scrolling one of the few interactions that consistently draws negative reactions on desktop. ([NN/g, horizontal scrolling](https://www.nngroup.com/articles/horizontal-scrolling/))
- Center mode has a real precedent: Material 3's centered hero carousel, where a neighbor grows into the large center slot as you scroll. I found no usability study that tests the scale effect itself, so the case for it is the continuity cue above, not measured data. ([Compose HorizontalCenteredHeroCarousel](https://developer.android.com/reference/kotlin/androidx/compose/material3/carousel/HorizontalCenteredHeroCarousel.composable))
- Motion timing: NN/g puts most UI animation at 100 to 500 ms, with the top end for large moves across big screens. ([NN/g, animation duration](https://nngroup.com/articles/animation-duration))

## His issues, each with a recommendation

1. **The "Scroll to view more templates" line.** Drop it. With center mode the dimmed next card is the strong cue NN/g describes, and the dots back it up. The line also tells mouse users to do the one thing their mouse cannot do. Clicking the side card brings it to the center, so mouse users have a way in that the line never gave them.
2. **Order under the card.** Dots directly under the card, then Template 2 of 5, title and text.
   - NN/g states the rule directly: page dots should be centered and placed "directly below the elements they control." In their testing, dots moved off that spot were harder to identify and understand, and dots are commonly overlooked even when placed by the book. Under a block of text, they are further from the card and easier to miss. ([NN/g, 4 iOS rules to break](https://www.nngroup.com/articles/4-ios-rules-break/))
   - Apple puts the page control between the content and the bottom edge, and Baymard calls dots directly under the image "the standard mobile pattern for indicating additional views." ([Apple HIG, page controls](https://developer.apple.com/design/human-interface-guidelines/page-controls), [Baymard, page control UI](https://baymard.com/blog/page-control-ui))
   - Baymard recommends pairing dots with "Image 2 of 6" text instead of relying on dots alone. Template 2 of 5 directly under the dots does that, and then works as the title's eyebrow. ([Baymard, page control UI](https://baymard.com/blog/page-control-ui))
   - The descriptions run one to three lines. With dots under the text they would sit at a different distance from the card on every template; under the card they never move.
   - What I could not find: a test comparing dots above versus below a caption. No study I found settles it, so this rests on NN/g's placement finding and the patterns above, not on a head to head test.
3. **The sideways scroll feels too fast.** The cause is native scroll snap: a trackpad flick carries momentum past several templates and the browser snaps at its own speed, and a dot click uses the browser's own smooth scroll. Fix: one template per gesture (the rest of the flick is ignored), every move at a fixed 600 ms ease in out. A move here carries scale and brightness across about 480 px, so it sits a little above NN/g's 500 ms. Drag on touch still follows the finger, then settles. Vertical wheel is left alone so the page keeps scrolling.
4. **Text stays in place and only changes.** Three options in the prototype:
   - A, crossfade in place: the old text fades out as the card starts moving, the new text fades in as the card lands. My pick: all the motion stays in the card, the text just changes.
   - B, rise into place: as A, but the new lines rise 10 px, staggered label, title, text. Livelier, but it is a second motion competing with the card.
   - C, tied to the scroll: text dims as the cards travel and is gone at the halfway point. Feels the most physical on a slow drag, but a reader who stops mid drag sees half faded text.
5. **Center mode.** Matches his Figma frames: the center card is 543 px, side cards 331 px (61%), dimmed. Clean slate opens centered with nothing to its left; Reset ends with nothing to its right. Side cards are clickable.

## What the build needs

- Clean 2x exports of each template's center frame (543 x 538) from Figma. The current images have the side peeks baked in, so they cannot be scaled independently. The prototype fakes it by cropping.
- Below 1200 the section stacks. Proposal: the same carousel, center card at the content width, side cards peeking in at the edges.
- Reduced motion: no travel or fades. The cards jump to their sizes and the text swaps at once.
