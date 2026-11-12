# Smooth scroll research

11 Nov 2026. Research only; nothing in the site was changed. Measured on the preview at http://localhost:4319
with headless Chromium at 1440 by 900 (the in-app browser pane was hidden, which pauses animation frames).
Scripts used are described under "How this was measured" at the end.

## The short version

- Run one scroll setting on every page. The sites checked do this, and no source recommends tuning feel per page.
- The "stops" are not the scroll engine dropping frames. They come from three things on our pages: Haven's
  sticky feedback block, a long slow tail when smoothing is set low, and Lenis eating sideways swipes over
  the framework page's week carousel.
- Make landing points come from the page itself (nav height and section tops), not from pixels typed into
  a slider. That is what stops the retuning.
- Recommended: Lenis lerp 0.1, wheel 1, on every page, plus three small fixes listed at the end.

## 1. Tighter scroll on Home than on the case studies?

Not normal, and it reads as inconsistent. Scroll speed is something a visitor calibrates their hand to in
the first few seconds. If Home and Haven differ, the second page feels wrong without the visitor knowing why.
Nielsen Norman Group's scrolljacking study found that changed scroll rates disorient people and that rates
tuned too slow cause fatigue ([Scrolljacking 101, 2023](https://www.nngroup.com/articles/scrolljacking-101/)).

What studios ship, checked in their live JavaScript on 11 Nov:

| Site | Library | Setting found | Same across pages |
| --- | --- | --- | --- |
| darkroom.engineering (makers of Lenis) | Lenis, newer API | wheel lerp 0.1, multiplier 1, touch not smoothed | Yes, one root instance |
| lenis.darkroom.engineering | Lenis, React root | wheel lerp 0.125, touch smoothed, stop inertia on navigate | Yes, one root instance |
| dennissnellenberg.com | Locomotive Scroll | lerp 0.1 | Yes |
| cuberto.com, studiofreight.com, locomotive.ca, metalab.com | Lenis | Library present; instance values not readable from the bundle | Not determined |
| basement.studio, unseen.co, activetheory.net, resn.co.nz, obys.agency | Not determined | | |

Observed directly, not reported. The pattern: one instance at the root of the app, values at or near the
Lenis default of 0.1. Nobody slows the wheel below 1. Where pages differ, they differ in what happens at a
section (a pin, a carousel, a reveal), never in the base feel.

Today the source has every page at lerp 0.1, wheel 1 (`site/haven/haven.js:16`,
`site/dev/preview/home-motion.js:63`, `site/js/mondai-motion.js:184`). The preview's Scroll feel layer
overrides that with 0.075 and 0.9, and the in-app browser had saved values of 0.045 and 0.55 from tuning.

## 2. Why scroll seems to stop at certain spots

What it is not. Driving real wheel input down all three pages found no dropped frames after load (median
and 95th percentile both 16.7 ms), no layout shifts, no gap between where Lenis thinks the page is and where
it is, no stale page height and no vertical snapping anywhere. Scroll anchoring and two competing Lenis
instances are ruled out: each page runs one instance (`site/js/motion.js` makes a second one but no page
loads it).

What it is, in order of how likely he is feeling it:

**a. Haven's feedback block holds the screen for 1.2 screens of scrolling.** `.bridge` is
`position: sticky; height: 100vh` (`site/haven/haven.css:205`). Between scroll 6,600 and 7,700 px most of
the screen does not move while the wheel keeps turning. That is a stop by design. It is the only full screen
hold on any of the three pages. The phone in the Insights section also pins in place
(`haven.js`, the `STOP = 100` and `K = 90` block), but it covers a small part of the screen.

**b. Low smoothing makes every flick end in a long crawl.** Lenis eases toward its target with
`1 - exp(-60 × lerp × dt)` each frame (Lenis 1.1.20 source, `Animate.advance`), so the timing is the same at
60 Hz and 120 Hz. For a 300 px flick:

| Setting | Total time to settle | Time spent moving under 1 px a frame |
| --- | --- | --- |
| lerp 0.1 (Lenis default, our source) | 1.1 s | 0.5 s |
| lerp 0.075 (preview default) | 1.4 s | 0.7 s |
| lerp 0.045 (saved in the in-app browser) | 2.4 s | 1.4 s |

Under 1 px a frame the eye reads the page as stopped, but it is still moving, so the next flick lands on a
page that never quite came to rest. With the wheel at 0.55 each flick also travels about half as far. Together
that feels sticky everywhere, and it is most noticeable where nothing else on screen is changing, which is
why it seems to happen at spots.

**c. The framework page's week carousel swallows sideways swipes.** In Lenis 1.1.20, any wheel event with a
vertical part, however small, is taken and `preventDefault` is called (`onVirtualScroll` in the source). A
trackpad swipe to the side always carries a little vertical movement, so over `.week` the carousel does not
move and the page creeps down instead. In the test, a mostly sideways swipe (40 across, 4 down per event)
moved the page 80 px and the carousel 0. Newer Lenis adds `data-lenis-prevent-horizontal` and
`allowNestedScroll` for this ([README](https://github.com/darkroomengineering/lenis/blob/main/README.md));
1.1.20 has the `virtualScroll` option, which can hand sideways gestures back to the browser.

Not measured: image decoding hitches on his Mac's GPU. Headless timing cannot show those. If he still feels a
stop at a specific image after the fixes, that is the next thing to profile, on his machine.

## 3. How sites make scroll land exactly where it should

Four tools, used for different jobs:

- **Anchors.** A link to a section lands at the section top minus the nav. The native way is
  `scroll-margin-top` on the section. Lenis honours an offset through `anchors: { offset }` or
  `scrollTo(el, { offset })`, which its README calls the same as `scroll-padding-top`. Home already uses
  `scroll-margin-top: 112px` on `.about` (`site/css/home.css:278`) and `anchors: true`.
- **CSS scroll snap.** Built into the browser, best for carousels and slide strips. The framework page's week
  carousel already uses `x mandatory` correctly. Lenis does not support CSS snap on the page itself; its
  README points to `lenis/snap` instead.
- **lenis/snap.** Snap points from elements (`addElement(el, { align: 'start' })`) or pixels, `proximity` by
  default, snapping half a screen around a point and waiting 500 ms after the last input. Call `resize()`
  after layout changes ([snap README](https://github.com/darkroomengineering/lenis/blob/main/packages/snap/README.md)).
- **GSAP ScrollTrigger snap.** Snaps to a share of a section's scroll (`0.25`), a list, a function or a
  timeline's labels, with `duration: { min, max }` scaled by speed and a 200 ms debounced recalculation on
  resize ([ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)). Positions are written as
  "top center" (this element's top meets the screen's middle), so they follow the layout.

When snapping is liked: full screen slides, galleries, carousels, onboarding steps, and short pinned
sequences where every stop is a complete frame. When it is disliked: long reading pages. NN/g found people
mistook long scroll takeovers for bugs, missed content and lost their place, and recommends keeping them short
and balanced with normal scrolling. A case study is a long reading page, so vertical snap on Home or the case
studies would cost more than it gives. Haven took a soft snap out on 7 Oct for this reason (`scroll-feel.js`
header).

## 4. A setup that does not need retuning when a section changes

Yes. The retuning comes from mixing two different kinds of value. Split them:

1. **Feel: two global numbers that never depend on layout.** Lerp and wheel speed. Set once, shared by every
   page, never tuned per section. Duration mode is not better here: for the wheel, Lenis restarts the easing
   on every input event, so duration suits `scrollTo` jumps and lerp suits hands on the wheel. Lenis's own
   site and darkroom use lerp.
2. **Landing points: read from the DOM.** Measure the nav once with a `ResizeObserver`, write it to a CSS
   variable, and use it for `scroll-margin-top` on every section and for the Lenis anchor offset. Moving or
   resizing a section then needs nothing.
3. **Motion triggers: written relative to the section and the screen, not in pixels.** "Starts when the
   block's top is 80 percent down the screen" survives a layout change; "starts 100 px in" mostly does too;
   "the phone releases 90 px before 1,870 px" does not. The pixel ones today: Haven's phone pin
   (`STOP = 100`, `K = 90`), the profile scrub (`MAX = 620`, `H = 1870`) and Home's `--hm-works-gap: 320px`.
   These are the values that need redoing when a section changes; Lenis is not.
4. **Holds sized from the section.** A sticky or pinned moment should hold for a share of its own height
   (for example half a screen), stated once, so it scales with the screen.

## Recommendation

One Lenis setting on every page: **lerp 0.1, wheel 1, touch left to the phone.** It is the Lenis default,
what darkroom ships on its own site and what all three of our pages already have in source, so shipping it
means deleting the preview override rather than adding anything. Then three fixes:

1. **Carousel.** Give the framework page's Lenis a `virtualScroll` function that returns false when a gesture
   is more sideways than vertical, so the week carousel swipes natively and vertical scroll stays smooth.
2. **Landing.** Nav height from the DOM into one CSS variable, used for `scroll-margin-top` on sections and
   the Lenis anchor offset on every page, Haven included.
3. **Haven's feedback block.** Decide whether its 1.2 screen hold is wanted. If yes, keep it and it will read
   as a moment rather than a fault once the base scroll stops crawling. If no, shorten the hold to about half
   a screen. This one is his call, because it changes the case study's pacing.

No vertical snapping on Home or the case studies. Keep CSS snap on the carousel.

The Scroll feel tab then only needs the reduced motion preview and the two global numbers for a final look;
everything else follows the layout.

**What would change this.** If 0.1 feels too quick on his trackpad after the fixes, try 0.09, still on every
page; below about 0.07 the crawl in 2b comes back. If a future page is built as full screen slides, that page
gets `lenis/snap` with `proximity` on its slides, and only that page. If he still feels a stop at a specific
image, profile that spot on his own machine.

## How this was measured

Scratch scripts, not in the repo: one drives wheel input at a steady pace and in flicks through `/`,
`/haven/` and `/mondai/framework/` and logs scroll position, Lenis target, Lenis value, page limit and frame
time every frame, plus layout shifts and long frames. A second steps down each page 100 px at a time and
reports ranges where most of the screen does not move. A third sends sideways trackpad swipes over every
horizontal scroller with and without Lenis. The settle times in 2b are computed from the Lenis 1.1.20 source
formula.
