# Framework page motion plan

Level L1: the framework case study (`site/mondai/framework/`, Figma 5812:16446) and the Mondai collection
(`/mondai/`) run Haven's page motion as built, from `site/js/mondai-motion.js` and
`site/css/mondai-motion.css`, linked from both pages (live 11 Nov; it began as a studio preview layer on
10 Nov). Gates in `framework-page-GATES.md`; style guide and state list in `docs/motion/mondai-motion/`.
Page wide motion only, at his word (11 Nov): no section specific animation and every static image stays.

## Haven's motion vocabulary (`site/haven/`)

Page wide, on every block:
- Smooth scroll. Lenis, lerp 0.1, wheel multiplier 1, driven by the GSAP ticker with lag smoothing off.
  One lerp for wheel and trackpad alike.
- Text entrance. Each item in a block fades from 0 over 1.4 s, power1 out, 0.15 s after the one before,
  once, when the block top is 100 px inside the screen. A fade only: type never rises, scales or blurs.
- Media entrance. A curtain opens the frame from its top (clip inset 100% to 0 at the bottom) while the
  picture inside settles from scale 1.3 to 1, 1.2 s, Power3 in out (cubic-bezier(0.76, 0, 0.24, 1)),
  once, on the first pixel in view. Images decode before the curtain moves. A second frame in a pair
  waits 0.3 s.
- Arrival. Anything on screen at load waits 0.35 s for the first paint.
- Skipped past. Anything already above the screen shows at once, so scrolling back up never finds a blank.
- Reduced motion. The hidden states only exist under `html.js-motion`, which is only set without
  reduced motion; then no Lenis, no fades, no curtains, no ticker, the 3D phone is never mounted (a
  still shows) and the scripted phone scroll never starts. Every block is in its final state.

Haven's set pieces, one each, tied to Haven's story:
- Bridge. A statement block is pinned (sticky, a full screen) while the next sections slide over it; its
  rule draws down over 1.4 s Power3 in out at 20% from the bottom, then the line fades 0.55 s later.
- Quiz pillars. Each outline draws 1.6 s (0.65, 0, 0.35, 1), its tag wipes in 0.9 s from 0.3 s
  (0.87, 0, 0.13, 1), the label decodes from scrambled characters over about 1.5 s, the icon rises 12 px
  over 1 s from 1.3 s. The phone beside them holds centred, then releases over 180 px and leaves at 1.9
  times page speed.
- Journey flow. One card moves from slot 3 to 5 while the others slide back: 1.7 s at 0.85 speed, a
  1.06 bump on lift and landing, (0.65, 0, 0.35, 1) moves and (0.22, 1, 0.36, 1) settles, plays after
  a 0.45 s hold at 80% up the screen and replays when the block leaves below. Vertical under 560.
- Profile scroll. The page scroll drives the phone's content (smoothstep over 0.85 of a screen, a 0.14
  follow for inertia); a scripted thumb loop with iOS decay (0.5 s) runs on the straight phone.
- Chat turn. A three.js phone travels to its paragraph while it turns to face the reader, a pure
  function of scroll on a sine in out curve, mounted 1200 px early.
- Ticker. The KEY INSIGHTS strip drifts left, 60 s linear loop.
- Finale. Five cards in a row; hover, tap or arrow keys open one and the row shifts to keep it on screen.
- Nav on light. The nav turns dark over the one light block.

## Every CS2 block

L1 means a direct Haven precedent, built (in the preview layer) without waiting. Text means the text
entrance above, Media the media entrance.

| Block | Pattern | Why |
| --- | --- | --- |
| Introduction | Text, Arrival | Haven's hero is text only and arrives this way; same job, same motion |
| Competitive analysis | Text, stepping line by line down the two by two grid (label, name, body), both cards in a row together | Haven's insight cards step one card at a time; here each card is three loose items at Figma positions, so the step runs by line, which keeps the grid reading as one block |
| The foundation we built on | Text, Media on the diagram | A framed diagram is a media frame in Haven (the MVP timeline, the collage) |
| Growth Journey | Text, Media on the screen | Product screen in a frame, as Haven's schedule and security screens |
| Pathway | Text, Media | As above |
| Action Hub | Text, Media | As above |
| Action Item | Text, Media | As above; a moving version waits (below) |
| Personalized timeline | Text, Media on the card, the Example plate as text | The plate carries text, so it fades like Haven's data cards |
| Calendar setup | Text, Media | As above |
| Schedule view | Text, Media on the schedule and on the gaps card | Two product frames at different heights, so each opens on its own first pixel, as Haven's profile phone and its card do |
| Falling behind | Text, Media on the rail and the rollover strip; the 195 by 31 arrow strip fades | A curtain on a 31 px strip is over before it reads, so it fades like text |
| Buffer flow | Text, Media | As above |
| Start of week | Text, all five templates open together when the carousel shows | One frame holding five screens, so one curtain moment; the ones off to the side are already open when he scrolls to them |
| In reflection (ending) | Text | Haven's ending headline and close are text entrances |
| Ending bar | Text, one item | Haven's footer has no motion; the bar is a plain arrival |

Not taken, on purpose: the nav on light rule (no light block here), and none of Haven's set pieces as
they stand. Each tells Haven's story; reusing one on CS2 would repeat a signature form across case
studies, which he has ruled out.

## Waiting on his yes

Each needs a motion idea Haven does not have, so none is built. Each has a clip or a lab page already,
so nothing new is drawn until he picks.

1. Falling behind, the carry. An unfinished Action Item carries into next week and the dates move.
   Paused by him. Lab: `site/motion-lab/cs2-falling-behind-final.html` and the editor
   (`cs2-falling-behind-editor.html`, settings in `fb-settings.json`); logs in
   `docs/motion/cs2-falling-behind*`.
2. Growth Journey, the dates. Direction A was mocked (four cards complete, the line fills to
   Opportunity, both targets light together); he called it pointless for now on 4 Nov and parked it.
   Lab: `site/motion-lab/growth-journey/`, log in `docs/motion/growth-journey/`.
3. Action Item, a scroll through the page. Haven's profile scroll is the nearest precedent (the page
   drives the phone's content), but on CS2 it would show the ten text containers filling in order, a
   new idea. No clip yet; one is cheap once he wants it.
4. Start of week, opening one template at a time. Haven's finale row is the nearest precedent, which
   is exactly why it waits: the same five card row twice would read as one designer's habit.

My pick, if he wants one moving piece on this page: the Falling behind carry. It is the block the whole
second half of the case study turns on and it already has a tuned lab. It is motion inside media, so it
goes through the render, review and `motion-check` loop when he says yes.
