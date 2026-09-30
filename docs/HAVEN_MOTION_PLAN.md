# Haven motion and responsive plan

Status: proposal, 30 Sep 2026, revised the same day against `prototypes/journey-map/README.md` on branch
`claude/journey-map-prototype`. That README wins wherever the two differ. Nothing on the full page is built.

Creative level: L1 for the page motion grammar (match what Metalab does). L2 for the Haven moments inside the
media (new work, one memorable moment required).

## Request inventory

Every ask from the 30 Sep message, with where it is answered. This list is the gate: nothing ships as "done"
while a row is open.

| # | Ask | Answer |
|---|-----|--------|
| R1 | Is `codex/homepage-responsive` the right branch for Haven work, or does each case study need its own | Own branch. See "Where the work lives" |
| R2 | What a worktree means | See "Where the work lives" |
| R3 | Pick up Haven case study work, find where it lives | Figma only: `Haven CS Master` 3300:12596 on the `VC` page. No Haven page exists in code yet |
| R4 | Use skills to discover the right animation skills and double check | See "Skills" |
| R5 | Confidante profile animation using the two Assets mockups | Found `Confidante profile` 3507:10680 and `Confidante profile expanded` 3001:7169. Spec under "Confidante profile" |
| R6 | How to animate a mockup at all | Slice the Figma frame into fixed chrome plus a scrolling content layer. See "Confidante profile" |
| R7 | The point of the profile scroll is showing more shared experiences | The loop stops on each group of shared experience cards, not a single smooth pan |
| R8 | Ideas for animating other elements, not necessarily UI changes | See "Section by section" |
| R9 | Study Metalab case studies (Robinhood, Midjourney, Uber) for an animation pattern | Read Uber, Robinhood and Midjourney in the browser and their shipped code. See "What Metalab does" |
| R10 | Links vs video as reference | Links were enough. Their code was readable, so no video needed |
| R11 | Uber pattern of UI on the left and a complementary video on the right | It is `textAnd2Images` with a video in one slot. Mapped to Haven under "Section by section" |
| R12 | Separate study of how Metalab shows UI statically | Done inline instead of a subagent because it took one pass. See "Static presentation" |
| R13 | The scrolling screen near the end of Uber | It is a looping video inside the same reveal, not a scroll-linked effect |
| R14 | Design a few extra screens so short flows exist, kept simple | Most flows already have two or more states in Assets. Only two optional new screens. See "New screens" |
| R15 | Keep this fast, little time available | Two primitives cover the whole page. Build order under "Plan" |
| R16 | Use AI to help plan and solve | This document plus the build order is that plan |
| R17 | The intro image "fold" that grows vertically and changes size at once | It is a clip path opening from the top while the image inside scales from 1.3 to 1. Exact values under "What Metalab does" |
| R18 | Metalab combines animations cleanly | They use one entrance for all media and one for all text. The combination is consistency, not variety |
| R19 | Next step: responsiveness for case studies, starting with Haven | See "Responsive and motion together" |
| R20 | Do responsive and motion together or apart | Together, as modules. See "Responsive and motion together" |
| R21 | The earlier flow change animation and how text loads, done on the other account | Found on `claude/journey-map-prototype`. Its README records the text fade, the flow timing and the settled decisions. See "Settled by the prototype" |
| R23 | Apply the same text block fade and MaskReveal rules across the full case study page (other chat, 30 Sep) | See "Page wide rules" and "Plan". Needs the Haven page built first, it does not exist in code |
| R22 | Make a list of everything said and gate the output against it | This table |

## Where the work lives

**Branch.** Give Haven its own branch, `haven/case-study`. The current branch carries a lot of verified but
uncommitted homepage work (the `GATES.md` ledger shows it passing). Commit that first, then branch Haven from it
so the Haven page inherits the tokens, fonts and `styles.css` it will reuse. One branch per case study keeps each
reviewable on its own.

**Worktree.** A worktree is a second folder on disk checked out from the same repository on a different branch.
Two sessions can then work on two branches at the same time without touching each other's files. Choose it only
when a homepage session and a Haven session run in parallel. It starts from the last commit, so uncommitted
homepage work would not be in it. That is one more reason to commit first.

## Skills

Enabled and relevant: `motion-design` (timing, easing, choreography), `gsap-scrolltrigger`, `scroll-reveal-libraries`,
`scrollytelling`, `emil-design-eng` (restraint and polish), `top-design`. No mobile mockup animation skill exists
beyond these. The build needs `motion-design` for timing review and `emil-design-eng` for the restraint pass. The page
uses GSAP and Lenis because the prototype already does.

## What Metalab does

Read from the shipped code on `metalab.com/work/uber`, checked against Robinhood and Midjourney.

**Stack.** Next.js, GSAP with ScrollTrigger, Lenis smooth scroll.

**Media entrance, `MaskReveal`.** Every image and video block uses it.
- Trigger: once, when the block enters the viewport.
- Outer box: `clip-path: polygon(0 0, 100% 0, 100% var(--left-y), 0 var(--right-y))` tweened from 0% to 100%.
  It opens top to bottom. Both edges move together, so it reads as a curtain, not a wipe.
- Inner box: `scale(1.3)` tweened to `scale(1)` at the same time. This is the "changes size" you saw.
- 0.8 seconds, `Power3.easeInOut`.
- Second image in a pair waits 0.2 seconds.
- Until revealed, the box shows a `#171717` plate so the layout never jumps.
- Reduced motion: duration drops to effectively zero.

**Text entrance, `TitleAndText`.** Opacity 0 to 1 over 1 second, title then body 0.1 seconds apart, starting when
the block top is 100 pixels inside the viewport. No movement, no split lines.

**Slider text.** Rises 40 pixels while fading. A divider rule grows with `scaleX` from 0 to 1.

**Motion inside media.** All of it is looping muted video: the scrolling phone near the end of Uber, the UI videos
beside stills. Nothing inside a mockup is driven by page scroll. One carousel pans cards on an endless linear
loop at 3 seconds per card.

**Stats.** Fade with a 0.3 second delay. No count up.

**Section sequence.** Uber: hero, text, two images, text, three images, slider, one image, two images, text, three
images, text, two images, text, one image, stats, next study. Robinhood and Midjourney follow the same grammar
with fewer modules.

What makes it feel clean: one media entrance and one text entrance, used everywhere. The variety lives inside the
media, never in how blocks arrive.

## Settled by the prototype

From `prototypes/journey-map/README.md`. Do not reopen.
- Text reveals are the Metalab block fade only. Line splits, masked rises, tilt, blur, word cascades and scroll lit
  text were tried and rejected as aggressive or hurting readability.
- Nothing from a screen recording is a timing source. Source code is.
- The Confidante selection flow is built: the straight shuffle, green only on landing, Satoshi Black label, white
  slot numbers fixed to the slots, 1700 ms timeline at playbackRate 0.85. No frame, so no MaskReveal on it.
- Smooth scroll is Lenis, `duration: 1.2`, driven by the GSAP ticker with `lagSmoothing(0)`.

## Page wide rules

One text rule and one media rule for every section of the Haven page.

**Text blocks.** Every heading, paragraph and caption group. Starts at `autoAlpha: 0`. When the block top is 100
pixels inside the bottom of the screen, title then body fade to 1 over 1 s with a 0.1 s stagger. Reduced motion:
duration `1e-4`, stagger 0.

**Media frames.** Every image, mockup and loop. `MaskReveal` from the top: clip path edges 0% to 100% while the
inner layer goes from scale 1.3 to 1, 0.8 s, `Power3.easeInOut`. Fires once when the frame top reaches the bottom
of the screen. Delay 0 beside text, 0.2 s on the second frame of a pair. `#171717` plate until revealed.

**Two differences to settle, both small.**
- Replay. Metalab fires once. The prototype resets text when it scrolls back above the screen so it replays.
  Recommend fire once page wide: replaying fifteen sections on every scroll up reads as busy, and Metalab does not
  do it. The flow section can keep its replay since it is the one animation someone scrolls back to watch.
- Ease. Metalab's text fade has no ease set, so GSAP's default `power1.out` applies. The prototype names it
  explicitly. Same result, no change needed.

**Sizing.** The prototype scales the whole design with `--u = min(1px, (100vw - 32px) / 1440)` and has no mobile
composition. That works for one diagram. The full page follows the homepage rule that mobile is re-composed, and
the flow keeps its `--u` scaling inside its own module.

## Static presentation

Measured at 1440 and 375 pixels on Robinhood.
- Media runs almost edge to edge with a 24 pixel gutter (16 on mobile). Square corners.
- Short captions of about 212 pixels sit beside large media. Captions move between grid positions from section to
  section, so the page never settles into one column.
- Section gap 180 pixels, title to its media 80 (mobile 140 and 56).
- Mobile keeps the same modules stacked in one column, full width, with type one step smaller. The motion is
  unchanged on mobile.

The portfolio guardrails already call for an asymmetric editorial grid, so this confirms the direction rather
than adding new structure.

## Concept

Who arrives: a hiring manager or design lead skimming, deciding in a minute whether the judgment is real.

Concept: **each Haven media block shows the design decision happening, so a skimmer sees the argument without
reading the paragraph.**

What that allows: motion inside mockups that demonstrates the decision the section argues. One shared entrance
for every block. What it rules out: motion on text beyond a fade, parallax, scroll hijacking, scroll-linked
phone scrolling and any animation that has no decision behind it.

## Confidante profile

The section argues that shared experiences became the focus of the page and that the bottom row lets people
switch between Confidantes. The loop proves both.

**Build.** Export three layers from `Confidante profile expanded` 3001:7169 at 2x: the header (0 to 128), the
content column (128 to 1711) and the footer with the Confidante row and Schedule chat button (1711 to 1870).
Stack them inside a 440 by 956 phone frame. Header and footer stay fixed. Only the content layer moves. This
matches how the real screen behaves, which a still cannot show.

**Timing** (6.5 second loop, starts when in view, pauses when out of view):
1. Hold on the top of the profile, 1.2 s. Match score and first card visible.
2. Scroll to cards two and three, 0.9 s `cubic-bezier(0.65, 0, 0.35, 1)`, hold 1.1 s.
3. Scroll to cards four and five, 0.9 s, hold 1.3 s.
4. Return to the top, 1.0 s, hold briefly and repeat.

Stepped holds read as a person scanning cards. A continuous pan reads as a screen recording and hides the point
(R7). Scroll distance comes from the export: about 914 pixels of content against about 669 visible.

**Reduced motion.** Show the collapsed `Confidante profile` 3507:10680 still.

**Optional extension.** After step 3, tap the second avatar in the footer and swap to a second profile. That
needs one new screen and is the strongest proof of the switching claim. See "New screens".

## Section by section

Every block uses the Metalab entrance. The inside motion column is the Haven specific part.

| Section (Figma y) | Inside motion | New design needed |
|---|---|---|
| Hero mockup (681) | None. Entrance only | No |
| Background and brief (1310 to 2295) | Text fade | No |
| Proxy research, 3 and 6 (3025 to 3451) | Fade with 0.3 s delay. No count up, the numbers are too small to count | No |
| Five key insights (3799) | Text fade, 0.1 s stagger per insight | No |
| Wireframes and original passcode step (6116, 6377) | Entrance only. Wireframes are evidence, keep them still | No |
| Testing (6929) | Text fade | No |
| Confidante program (8405) | Entrance only | No |
| Identity quiz (9694) | Loop through the existing `Quiz` states: an answer selects, next question slides in. Uber style pair: still of the quiz on the left, loop on the right | No, several quiz states exist in Assets |
| Research to design journey map (11272) | Entrance only | No |
| Confidante selection flow (11404) | Built. Drop in the prototype section as is, minus its review control bar | No |
| Confidante profile (12428) | The scroll loop above | Optional second profile |
| Scheduling (13938) | `Book · 1 pick a time` to `Book · 2 thread created`: a slot highlights, then the thread appears | No, both states exist |
| Chat when speaking is unsafe (15157) | Messages arrive one at a time with a typing indicator, built from the existing `Chat` screen | No |
| Privacy safeguards (16855) | The memorable moment: the Haven app icon on a home screen crossfades into the disguise icon, then the passcode step plays on the `Security` screens | One home screen with the icon, if not already in `Security 1` to `5` |
| Ending (18562) | Text fade | No |

The memorable moment is the disguise icon swap. It is the one place where the motion carries the whole argument:
the app hides in plain sight.

## New screens

Only two, both optional and both reuse existing components:
1. A second Confidante profile, for the avatar switch.
2. A home screen showing the disguise icon, if the `Security` screens do not already contain one.

## Responsive and motion together

Build them together, one module at a time. Metalab's own evidence: the same modules and the same motion run at
375 pixels. Each Haven section maps to a module with a desktop and mobile layout plus its entrance. Building a
module once, responsive and animated, is cheaper than two passes over fifteen sections.

The homepage decision stands that mobile is re-composed, not collapsed. For Haven that means captions move above
their media and pairs stack, with the looping mockup kept as the lead item in each pair.

## Plan

1. Commit the homepage work, branch `haven/case-study` from it, then cherry pick the two prototype commits
   (`589591e`, `c0a9255`). The prototype branch was cut from an older `main`, so merging it whole would drag old
   history in.
2. Build the two page wide rules once as GSAP helpers with Lenis on `window`, copied from the prototype's setup.
3. Build the Haven page section by section from `Haven CS Master`, responsive and with the entrance, at 1440, 1159,
   768, 390 and 320 pixels.
4. Drop in the selection flow. Then add the inside loops in order of value: Confidante profile, disguise icon,
   chat, scheduling, quiz.
5. Loops are HTML and CSS layered from Figma exports rather than video, so they stay sharp, small and editable.
   Switch any single loop to video only if the layered version gets heavy.

## Open

- **Figma source for the flow.** The prototype read node `5821:20` in file `HXNz5yqngCJtDF8NUK86Cd`. That node no
  longer exists; the file now holds a `HAVEN WIP` frame (4764:2763, 1440 by 20921) on page `pfo`. The page build
  uses `Haven CS Master` 3300:12596, which `reference/haven/HAVEN-EVIDENCE.md` names as the source. Confirm the
  two Haven frames are not diverging.
- **Step 4 and 5 labels** in the flow (intro chat and schedule a chat) are still open in the prototype README.
- **Uncommitted homepage work** needs committing before the Haven branch exists.

## Build status, 30 Sep 2026

Built on branch `haven/case-study` in the worktree `../portfolio-haven`, cut from `96abf88` so the
uncommitted homepage work on `codex/homepage-responsive` was left untouched. The two journey flow
prototype commits were cherry picked in.

**Page.** `site/haven/index.html`, `haven.css` and `haven.js`. Every section of `Haven CS Master`
3300:12596 is built, from the hero through the ending, with copy taken from the Figma frame. Text is
live HTML. Photos, mockups and diagrams are Figma node exports at 2x, stored in `site/haven/assets`.
GSAP 3.13.0 and Lenis 1.1.20 are vendored in `site/haven/vendor` so the page has no CDN dependency.

**Motion.** Every text block uses the Metalab fade and every framed image uses MaskReveal, both once.
Frameless diagrams (the stats graphic, the MVP timeline) fade with their text instead of masking, as the
prototype README decided for the flow map. Second frames in a pair wait 0.2 s. The journey flow is the
prototype timeline on the page scroll; it replays after it leaves the screen below. The KEY INSIGHTS strip
drifts as a slow ticker. Reduced motion shows everything at rest, the flow at its final state and no ticker.

**Responsive.** 1160 and up scales every horizontal measure from the 1440 Figma frame, capped at 1920.
768 to 1159 and below 768 are recomposed into one column with the media at full measure. Below 560 the
journey flow turns vertical so the whole shuffle stays on screen. The MVP timeline scrolls sideways under
1160 because its labels would be unreadable at phone scale.

**Interaction added.** The insight pills show the insight they name on hover, focus or tap, taken from the
research and testing insight cards. Figma shows one such tooltip. The research and testing insight cards
light one at a time on hover, matching the lit first card in Figma.

**Verification.** `node scripts/verify-haven.mjs` passes 91 checks: no overflow, loaded fonts and images,
no console errors and 24 pixel targets at 1920, 1440, 1280, 1159, 1024, 768, 767, 600, 390 and 320; the
mask and text tweens at 1440 by 900; the flow order and green landing, horizontal and vertical; the tooltip
with keyboard and Escape; reduced motion. Full page captures at every width were reviewed against Figma.

**Recorded source defects.** The bridge statement 3300:13311 overrides Heading/64 with Satoshi Bold, and
the Scheduling eyebrow 3530:4896 has no text style. Both are built as Figma shows them.

**Not yet done.** The Confidante profile scroll loop and the other inside media loops, the ending (its
direction is still open in the `site/haven-ending-*` studies) and linking the homepage Haven card to this
page, which belongs to the homepage branch.

## Revision, 30 Sep 2026 evening

From Chadwick's review of the first build.
- **Slower.** Text fades over 1.4 s with a 0.15 s stagger. Frames reveal over 1.2 s, pairs 0.3 s apart. Blocks on
  screen at load wait 0.35 s so the arrival is not rushed. These replace the Metalab source values, which read
  as too fast here.
- **Smoother.** Frames reveal through the Web Animations API on the compositor and wait for their images to decode,
  so nothing pops in mid reveal. That was the jump in the security frames.
- **Scroll.** Lenis now uses `lerp: 0.1` and only smooths mouse wheels. Trackpad gestures go to native scroll,
  because smoothing their own momentum a second time was the jumpy feel.
- **No hover effects.** Insight cards all use the bright style. Insight pills are plain labels, no tooltips.
- **Sticky nav** with a dark scrim so it reads over the light feedback block.
- **Feedback block** fills the screen.
- **Stats** share one center line: the cross, the 6, the arrow and the 5 key insights title.
- **Flow.** Select a Confidante is green from the start. The prototype README rule is updated to match.
- **Quiz parallax.** The phone and the pillars are separate layers. The phone rises about 28 percent of the frame
  height as the section scrolls, so it covers the icons. Both exports had a #050407 background that showed as a
  faint box against the page; it is knocked out to transparent.
