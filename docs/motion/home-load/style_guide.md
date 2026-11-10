# Home load: style guide

Piece: the Home hero as the page first opens (Figma 5812:22863; phone 4928:11925). Plays once per page
load, before anything else on Home moves. His ask, 10 Nov, in his words: "I want to mimic this
essentially, but I don't want to do the outside borderline type of thing it does, but I kind of want to
do a loaded animation, something like this." Creative level L1: match the reference's sequence.

## Reference
Seth Lukin's portfolio, https://sethlukin.com/ (listed on Wall of Portfolios). Built in Framer. The
values below are read from the site's own appear animation config (`__framer__appearAnimationsContent`)
and its page module, not estimated from frames. Times are from the moment Framer starts its appear
animations, which is right after the page is ready.

- 0.0 s: black page, the two nav links (email, LinkedIn) already in place. Nothing else.
- 1.0 s: the bottom corner captions ("Digital product designer, based in Denver" left, the skills list
  right) and the scroll arrow fade in. Opacity only, 0.4 s, ease (0.44, 0, 0.56, 1).
- 1.2 s: SETH rises 150 px into place while it fades in from 0. 0.4 s, ease (0.5, 0, 0.88, 0.77), an ease
  in: it is still moving fast when it lands.
- 1.6 s: LUKIN does the same, 0.4 s, ease (0, 0.72, 0.56, 1), an ease out: it lands softly.
- Then: a pixel character drops in between the two words with a "Hi there!" bubble (Lottie), and a
  WebGL marble texture (Unicorn Studio) sits behind everything at 64 percent.
- On scroll: the hero is fixed. A light sheet with rounded top corners slides up over it while the hero
  fades to 0 and shrinks to 0.8. That rounded sheet, framed by the dark hero around and above it, is
  the "outside borderline" he does not want.

The 150 px rise against 180 px tall letters is a rise of 0.83 of the word's height. Each word is its
own beat 0.4 s apart, so the name assembles left then right.

### Selected works on the reference (for his works reference, not built here)
- The "Featured work" title scrolls with the page (measured 1 to 1); the row of filter chips under it
  sticks below the nav. So on this site it is the filters that stay, not the title.
- Each case study card rises 150 px into place when it enters the screen: a spring, no bounce
  (stiffness 500, damping 100, mass 1), heavily damped so it eases in over about 1.9 s.
- Its reveal comes first and is tied to the scroll: a canvas in the page colour (#EEEEEE) covers the
  image in 3 px pixels and dissolves from top to bottom as the card travels up. It completes once the
  card's centre is within 40 percent of the screen centre (or its bottom is 95 percent up the screen);
  when the scroll stops mid way the dissolve catches up over 0.38 s with a cubic ease out.
- Cards sit in two staggered columns, so they arrive one by one as you scroll.

## What to take
- The order: page frame first, then the small text, then the name in two beats.
  - Nav: in place from the first frame, as the reference's nav links are.
  - Small text: the lede and Chicago with Looking to relocate (and on phones the Contact button) fade
    in together, opacity only.
  - Name: CHDWCK splits into CHD and WCK, each its own beat, rising 0.83 of the word's height while it
    fades in. CHD with the reference's ease in, WCK with its ease out.
- The reference's exact durations, delays and curves (below).
- The black hold at the start: about a second with only the nav, so the name reads as an arrival.
- On phones, the same sequence on the vertical CHDWCK down the left edge: CHD then WCK, each rising up
  the screen.

## What not to take
- The rounded light sheet sliding over a fixed hero, and the frame it leaves around the page (his ask).
- The fixed hero that fades and shrinks on scroll. His Home scrolls the hero away normally.
- The pixel character, the speech bubble and the WebGL marble. They are Seth's identity, not a motion.
- Nothing about the nav animates; it is the frame the hero lands in.

## Timing (the reference's values; his to tune in the Home load panel)
Times from navigation start. The hero waits for the fonts and the wordmark, so on a slow connection it
starts as soon as they are ready, never earlier than the times below.
- 0.0 s: nav in place, the rest of the hero hidden.
- 1.0 s: lede, location and (phone) Contact fade in, 0.4 s, ease (0.44, 0, 0.56, 1).
- 1.2 s: CHD rises 0.83 of the wordmark's height and fades from 0, 0.4 s, ease (0.5, 0, 0.88, 0.77).
- 1.6 s: WCK the same, 0.4 s, ease (0, 0.72, 0.56, 1).
- 2.0 s: settled. Everything else on Home (Lenis, the works hold, the text fades) runs as before.

## How it sits with Home motion
`home-motion.js` owns scroll, the nav's Product Designer exit, the works hold, the card masks and the
text fades below the hero. This layer touches only the hero's lede, location, Contact and wordmark,
none of which Home motion animates, and plays once at load, so the two never act on the same element.
The wordmark is drawn as two halves only while it moves; when the load ends the original image is
back, exactly as the site has it.

## Reduced motion
The still is the hero as it is today, everything in place. With reduced motion nothing is hidden and
nothing moves. If the script does not run, a CSS safety shows the hero after 3 s.
