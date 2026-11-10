# Mondai case study motion: style guide

Pieces: the Mondai collection page (`site/mondai/index.html`, Figma 5812:22999) and the framework case
study (`site/mondai/framework/index.html`, Figma 5812:16446). Page entrances on the browser clock, so
they are reviewed in the browser, not rendered (motion rules, Scope). His ask, 10 Nov: give the Mondai
pages "the same type of animations that we have on the Haven case study".

Preview only: `site/dev/preview/mondai-motion.js` and `.css`. Nothing in `site/mondai`, `site/css` or
`site/js` changes until he says yes.

## Reference
Haven as built and approved: `site/haven/haven.js` and `haven.css`. What each piece does and why:

- Smooth scroll. Lenis at lerp 0.1, wheel 1, on every wheel and trackpad. One lerp for all input,
  because handing trackpads to native scroll read as the page stopping mid gesture.
- Text blocks. Each item in a block fades from nothing over 1.4 s (power1 out), 0.15 s after the one
  before, once the block top is 100 px inside the screen, once only. Metalab's 1 s read too fast here.
  A fade, not a rise, so the type never moves under the reader.
- Media frames. The frame opens from the top like a curtain while the picture inside settles from 1.3
  to 1 over 1.2 s, Power3 in out (cubic-bezier(0.76, 0, 0.24, 1)), once, as soon as any pixel is on
  screen. Images decode before the curtain moves, so nothing pops in halfway. The settle gives the
  frame weight; the curtain stops it reading as a plain fade (banned inside media).
- Arrival. Anything already on screen at load waits 0.35 s, so the first paint lands before the motion
  starts and the arrival does not feel rushed.
- Skipped past. Anything whose bottom is already above the screen (a refresh halfway down, a jump to
  #contact) shows at once, so scrolling back up never finds a blank.
- Nav on light. The nav turns dark while it sits over Haven's one light block.

## What to take
- Lenis exactly as Haven (lerp 0.1, wheel 1). In this preview it follows the Scroll feel panel when that
  panel is on the page, so Mondai, Home and Haven scroll alike while he tunes it.
- Text fade exactly as Haven: 1.4 s, 0.15 s steps, 100 px trigger, once.
- Mask reveal exactly as Haven: curtain from the top, picture from 1.3, 1.2 s, Power3 in out, any pixel.
- Arrival delay 0.35 s and the skipped past rule.
- Haven groups text into blocks in its markup. The framework page places every text item on its own
  at Figma positions, so the grouping is by what arrives together: items in one section that cross
  the trigger in the same moment fade as one block, and items on the same line share a step. Each
  section steps on its own, as each Haven block does, and stops at five steps (0.6 s), Haven's longest
  block (the five insight cards), so a tall stack on the phone never keeps its last line waiting. The
  Role, Affiliate and Focus labels fade as one line, then their values, the way Haven's meta list fades
  as one item.

## What not to take
- The nav on light rule: neither Mondai page has a light section, so there is nothing to switch over.
- Haven's own set pieces (journey flow, quiz pillars, profile scroll, bridge line, phone pin). They tell
  Haven's story; borrowing them would be a reused signature form (no repeat forms across case studies).
- No rise, scale or blur on text. No bounce anywhere.
- No motion on the footer: the shared footer has none on Haven either.
- The Start of week carousel keeps its own sideways scroll; the motion only opens it.

## Per page

### Collection (`/mondai/`)
Fits one screen, so everything arrives on load, after the 0.35 s wait. Two blocks, as its two sections:
the mark and Mondai (one line) then the intro; alongside it, the Case study collection label then the
three rows.
No media frames on this page; the mark is an icon and fades with its title.

### Framework (`/mondai/framework/`)
Every text item, rule and plate fades. Every product screen opens as a media frame.

| Section | Fades | Opens |
| --- | --- | --- |
| Introduction | title, meta labels (one line), meta values (one line), rule, lead, body | none |
| Competitive analysis | eyebrow, lead, four columns (label, name, body), sources | none |
| The foundation we built on | eyebrow, lead, Pathways, Hierarchy | foundation diagram |
| Growth Journey | eyebrow, lead, body | Growth Journey screen |
| Pathway | eyebrow, lead, body, Focus Areas | Pathway screen |
| Action Hub | eyebrow, lead, body | Action Hub screen |
| Action Item | eyebrow, lead, body | Action Item screen |
| Personalized timeline | eyebrow, lead, Capacity, Effort, the Example plate and its text | timeline card |
| Calendar setup | eyebrow, lead, body | Calendar setup screen |
| Schedule view | eyebrow, lead, both bodies, Rescheduling | schedule screen, gaps card |
| Falling behind | eyebrow, lead, rail notes, plates, rule, Rollover, body, sources, the small arrow strip | right rail, rollover strip |
| Buffer flow | eyebrow, lead, body | buffer screen |
| Start of week | eyebrow, lead, body, the slide labels, the dots | all five templates open together |
| In reflection | eyebrow, display line, body | none |
| Ending bar | the bar | none |

The small arrow strip in Falling behind (195 by 31) fades instead of opening: a curtain on a 31 px
strip is over before it reads, and the 1.3 settle on it reads as a jump.

The Start of week templates open together the moment the carousel shows, so the ones off to the side
are already open when he scrolls to them.

## Timing (Haven's values, his to tune in the edit panel when it lands)
- Text: 1.4 s, 0.15 s between steps (five steps at most per section), trigger 100 px inside the screen.
- Media: 1.2 s, Power3 in out, from scale 1.3.
- Arrival: 0.35 s.
- Scroll: lerp 0.1, wheel 1.

## Reduced motion
Everything shows at once in its final place. No Lenis, no fades, no curtains.

## How it is built (preview)
- The page markup has no Haven style wrappers, so the layer finds its items itself and never changes
  the layout: the framework's absolute positions at 1440, and its stacked order under 1200, stay as
  they are.
- A media frame here is the image itself, not a figure around it. The curtain and the settle both run
  on the image: its clip is worked out so the visible window is the image's own box while the picture
  scales, which looks the same as Haven's figure with a scaled inner layer.
- Hidden states are in CSS so nothing flashes before the script runs, with a 3 s failsafe that shows
  everything if the script never starts.
