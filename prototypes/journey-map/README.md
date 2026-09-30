# Journey map prototype and Metalab motion handoff

Written 30 Sep 2026 from the Claude Code session that built this. It is the reference for
any chat that continues the case study page motion. Everything below was measured or read
from source, not remembered. Where something is inference it says so.

## What is here

| File | What it is |
| --- | --- |
| `journey-template.html` | The editable source. `U(n)` is a design unit, see Sizing. Font and script placeholders are filled by the build. |
| `build.mjs` | `node build.mjs` writes `journey-section.html` (self contained, fonts inlined). |
| `check.mjs` | Playwright gates. `node check.mjs` after building. Needs `playwright` with Chromium, or set `PLAYWRIGHT_MODULE` to a global install's `index.mjs`. Writes screenshots to `shots/`. |
| `journey-section.html` | The built page. Same bytes as the live preview. |
| `fonts/` | Satoshi 400, 500, 700 and 900 woff2 from Fontshare. |
| `vendor/` | Lenis 1.1.20 and GSAP 3.13.0, only so the gates run offline. The page itself loads them from jsDelivr. |

Live preview (private artifact, owner only): https://claude.ai/artifact/NccCELUQr6jATgD8G3UKCE

Design source: Figma file `HXNz5yqngCJtDF8NUK86Cd`, page TEMPORARY, node `5821:20`. Read
values from Figma, never from this doc. The layout in the template was read from that node on
29 Sep 2026 and has no container, circles for steps, numbers above the circles.

## What the section does

The Haven case study section "Confidante selection journey flow". Five steps in a row.
On arrival, "Select a confidante" slides from slot 3 to slot 5 while the two chat steps slide
one slot left (the straight shuffle). It stays an outline while moving and crossfades to the
green fill with a black label as it lands and does a small settle bounce. Slot numbers 1 to 5
are fixed to the slots and never move.

Every timing below is at the 2s setting (WAAPI timeline of 1700ms at playbackRate 0.85).
The 3.2s control is the same timeline at 0.53125.

| Moment | Time in the 1700ms timeline |
| --- | --- |
| Select lifts to scale 1.06 | 0 to 224ms, ease out |
| Select travels slot 3 to slot 5 | 224 to 1184ms, ease in-out `cubic-bezier(.65,0,.35,1)` |
| Intro chat slides left | 300 to 860ms, same in-out |
| Schedule a chat slides left | 360 to 920ms, same in-out |
| Select drops to scale 1 (lands) | 1184 to 1376ms, ease out `cubic-bezier(.22,1,.36,1)` |
| Fill, border and label crossfade to green and black | 1376 to 1506ms |
| Settle bounce, 1 to 1.06 to 1 | 1396 to 1656ms |

Slot pitch is 165px, circle 137px, on a 797 by 177 stage scaled by `--u`.

## The reveal rules, taken from metalab.com source

This is the part the other chat asked for. We tried to copy the Metalab feel from a screen
recording first and it was wrong every time (invented grey rest states, wrong durations,
line-split text that read as blinds). What worked was reading their production bundle.
Fetch `https://www.metalab.com/work/midjourney`, then the `_app-*.js` chunk and the CSS it
links, and search for the component names. Findings, quoted from the bundle:

Text blocks (`TitleAndText`, `TitleDescriptionBlock`). No split, no movement. Title and
description start at autoAlpha 0 (opacity 0 plus visibility hidden). When the block's top is
100px inside the bottom of the viewport, both fade to 1 over 1s with a 0.1s stagger, once.

```js
useInView({ scrolltriggerStart: "top+=100px bottom" })
gsap.to([title, description], { autoAlpha: 1, duration: 1, stagger: .1 })
```

Reduced motion: duration 1e-4, stagger 0.

Media frames (`MaskReveal`). A clip-path polygon opens from the top edge while the content
settles from scale 1.3 to 1, 0.8s, Power3.easeInOut, delay 0 when the frame sits beside text
(`TextAnd1Image` passes no delay). In view is the plain `useInView` default, fire once, when
the element's top reaches the viewport bottom.

```css
.MaskReveal { position: relative; overflow: hidden; background-color: var(--bg-subtle) }
.MaskReveal.FROM_TOP { clip-path: polygon(0 0, 100% 0, 100% var(--left-y), 0 var(--right-y)); --left-y: 0%; --right-y: 0% }
.scaleContainer { transform: scale(1.3); height: 100%; width: 100% }
```

```js
gsap.to(el, { "--left-y": "100%", "--right-y": "100%", duration: .8, ease: "Power3.easeInOut", delay })
gsap.to(".scaleContainer", { scale: 1, duration: .8, ease: "Power3.easeInOut", delay })
```

The updated Figma for this section has no frame, so MaskReveal is not used here any more.
It is still the right rule for image and video frames elsewhere on the page.

Smooth scroll. Lenis with `duration: 1.2` and Lenis's default easing for duration mode
(expo out). ScrollTrigger updates on Lenis scroll, gsap ticker drives `lenis.raf`,
`lagSmoothing(0)`.

```js
new Lenis({ duration: 1.2, autoResize: false, wrapper, content })
```

Scroll triggered parallax blocks in their bundle use `start: "top bottom"` with scrub, which
is a different pattern and was not used for the case study text.

## How this prototype applies those rules

- Two blocks: `intro` (eyebrow, headline, pills) and `row` (section title, paragraph, map).
  Each block fires when its top is 100px inside the screen, fades 1s with 0.1s stagger,
  `power1.out`, and resets to hidden when scrolled back above the screen so it replays.
- The map fades in with the row text at its final size. No shrink, no mask.
- The flow starts once the row has revealed and the map's top is 80% of the way up the
  screen, after a 450ms hold. Changed from 50% on 30 Sep because it felt late without the
  container. It resets when the map leaves the top of the screen.
- Lenis duration 1.2 on a fixed `#scroller` wrapper so the page also scrolls inside the
  artifact iframe. On a real page use `wrapper: window`.
- All units scale with `--u = min(1px, (100vw - 32px) / 1440)`. Below 1440 the whole design
  scales down uniformly. Mobile is not composed separately yet.

## Decisions that are settled, do not reopen

- Select turns green only on landing, never during the move. Chadwick asked for this.
- Label on the moving step is Satoshi Black (900) the whole time, not bold.
- Numbers are white, 16px on the stage, no leading zeros, fixed to the slots.
- Text reveals are the Metalab block fade. Line splits, masked rises, tilt, blur, word
  cascades and scroll-lit text were all tried and rejected as aggressive or as hurting
  readability. Do not bring them back.
- Nothing from a screen recording is a timing source. Source code is.

## Open items

- Figma node 5821:20 lists step 4 "Intro chat" and step 5 "Schedule a chat", so the shuffle
  ends quiz, review, intro, schedule, select. The original brief ended quiz, review, schedule,
  intro, select. Built to Figma. If the Figma labels are swapped, swap the two `data-id`
  start slots in the template.
- The Figma paragraph has no space after "confidante." before "I moved". The template adds it.
- The bottom control bar (2s, 3.2s, Replay, Top) is for review only. Remove it before the
  section ships.
- Fonts here are the full Fontshare woff2 files. The portfolio build subsets Satoshi; do the
  same when this moves into a real page.

## Verification

`node check.mjs` on 30 Sep 2026: all gates pass at 1280, 1280 inside an iframe and 390.
Measured: flow starts about 500ms after the map top passes 80%, runs 2001ms at the 2s setting,
mid crossfade colour sits between black and green, no horizontal scroll, no script errors.
