# Motion patterns

The portfolio's motion knowledge base. Read it with `.claude/motion-rules.md` before planning any motion.
Each entry says what the pattern is, when it earns its place in a case study, how we build it and where
it stands here. "Used" means it is in shipped or prototype code; "rejected" means Chadwick turned it down
and it stays out until he reopens it.

## Scroll patterns

Live motion, built with GSAP, ScrollTrigger and Lenis as wired in `site/js/motion.js`.

| Pattern | What it is | When it earns its place | Status here |
|---|---|---|---|
| Fade up | A block fades in as it enters the screen | Every text block, as the shared entrance | Used, without the rise. Haven text fades in place: 1.4 s, title then body 0.15 s apart, once (`site/haven/haven.js`). The rising version (masked rise) was rejected |
| Parallax | Layers move at different speeds as you scroll | Only between separate layers inside one piece of media, never on text | Tried on the Haven quiz phone 30 Sep, removed 6 Oct in favor of a pin |
| Sticky | One element pins in place while the page scrolls past or beside it | One visual has to stay while the text beside it changes, or a statement should hold while the next section slides over it | Used: Haven quiz phone pins centered, Haven feedback block pins while the next sections slide over |
| Horizontal | Scrolling down moves a row sideways | A sequence the reader must see in order, wider than the screen. It takes control of the scroll, so use it at most once per page | Never built. The Haven concept rules out scroll hijacking; check that before proposing |
| Scale in | Media grows into its frame as it enters | The shared media entrance | Used as the curtain: the frame opens top to bottom while the image inside settles from 1.3 to 1, 1.2 s, power3 in out, once |
| Text reveal | Words light up one by one as you scroll | Not for this portfolio | Rejected in Haven with line splits, word cascades and scroll lit text: aggressive and harder to read |
| Stagger | Several items arrive one after another, not all at once | A set of separate things that should read as a set: cards, steps, pieces side by side | Used: Haven text 0.15 s apart, Growth Journey dots 0.18 s apart. The gap is one fixed number per piece, written in its state list, and every item uses the same ease or spring |
| Progress bar | A bar shows how far through the page you are | Long case studies where the reader wants to know how much is left | Never built |

## Craft rules

These change what gets built, in live motion and clips alike.
- **Origin aware.** Anything that grows or shrinks scales from where it came from: a menu from its button, a
  sheet from the bottom edge. Never from its own center unless it came from nowhere.
- **Shared element.** When an object is on both sides of a change of screen, it travels and resizes across
  the change. The two screens never crossfade around it.
- **Interruptible.** Live motion a visitor triggers (hover, open, close) reverses from wherever it is. Tween
  from current values; never restart from the beginning or wait for the last move to finish.
- **Tabular numbers.** Any number that changes on screen uses `font-variant-numeric: tabular-nums`, so digits
  keep their width while counting.
- **No layout shift.** Every media frame reserves its final size before it reveals, so an entrance never
  pushes the text below it.
- **Frequency of use.** The more often something is used, the less it animates. The nav, menus and hover
  states are fast and small. Entrances a visitor sees once can take their time.

## Animation principles, mapped to our system

The classic principles of animation, and where each already lives.

| Principle | What it means for UI | Where it lives here |
|---|---|---|
| Slow in and slow out | Nothing starts or stops at full speed | Every ease and spring in `site/lib/motion.js` |
| Follow through | Things overshoot a touch and settle | The UI spring preset. TYPE has none, so text never wobbles |
| Pose to pose | Plan the key states, then the moves between them | `state_list.md` for every piece |
| Staging | One thing moves at a time where the eye should be | One memorable moment per piece; stagger instead of everything at once |
| Timing | Duration sets weight and mood | HEAVY for big media, UI for chips and phones |
| Anticipation | A small move first signals the big one | Rare in a portfolio. Only inside a product demo where the real UI does it |
| Arcs | Natural movement curves | A phone rotating or a card travelling follows a curve, not a straight diagonal |
| Secondary action | A smaller move supports the main one | The image settling inside the curtain while the frame opens |
| Exaggeration | Push feedback so it reads | Product demos only; never on page text |
| Squash and stretch | Shape deforms with speed | Not used on UI |
| Solid drawing | Depth looks consistent | The rotating phone keeps one perspective and light |
| Appeal | It is pleasant to watch | The boring test: what would a person remember |

## UX laws that shape motion

| Law | What it says | What it changes here |
|---|---|---|
| Fitts's law | Big, close targets are faster to hit | Hover motion never shrinks a target; hit areas stay at least 44 px |
| Hick's law | More choices, slower decisions | Reveal choices together, not one by one, when the visitor has to pick |
| Miller's law | People hold a handful of things at once | A stagger of more than about seven items stops reading as a set; group them |
| Doherty threshold | Responses under about 400 ms keep people engaged | Anything a click or hover triggers starts responding well inside 0.4 s. Scroll entrances are not responses and can run longer |
| Postel's law | Be tolerant of how people actually behave | Entrances fire once and still land if someone flicks past fast; nothing depends on scrolling slowly |
| Jakob's law | People expect a site to work like the others they use | Native feeling scroll. No scroll hijacking except a single deliberate pin or horizontal run |
| Frequency of use | The more it is used, the less it should animate | See craft rules |
