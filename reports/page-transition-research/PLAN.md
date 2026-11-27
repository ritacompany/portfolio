# Page change plan: Home, the Mondai collection, the framework case study

Creative level: L1. Making the existing change clean, not inventing a new one.
Research date 26 Nov 2026. Claims carry an id like [C4]; each id's link and exact quote is in CLAIMS.md,
where a script fetched every link and found each quote as an exact phrase on the live page.
CONFIRMED means that match passed.
INFERENCE means it is my reading, not something a source says.

## Recommendation

A plain fade through the page colour, and nothing travels between pages.

- **What moves:** only the whole page. The old page fades out, the dark page colour (Neutral/900) holds
  for a beat, the new page fades in. No title, card or image is shared between pages, so no text
  resizes. The old label leaves with its page; the new label arrives with the new page's own entrance
  (0.35 s wait, 1.4 s fade), exactly as it does on a refresh.
- **Timings:** old page out over **200 ms** from 0. New page in over **300 ms**, starting at **100 ms**.
  Done at 400 ms, just before the arriving page's text starts its own fade at 350 to 400 ms, so the two
  hand over instead of overlapping.
- **Easing:** both on the existing `--ease-quart-out` token, cubic-bezier(0.25, 1, 0.5, 1).
- **Same in every direction:** Home to collection, collection to framework, the back button and the
  menu links all get the same fade.
- **Reduced motion:** keep `navigation: none`, so the page just changes, and the arriving page already
  shows everything at once under reduced motion.
- **Firefox:** changes page as it does today (no cross document view transitions there yet).

What changes against the provisional build:

| Keep | Drop |
| --- | --- |
| `@view-transition { navigation: auto; }` | Both shared titles (`mondai-title`, `framework-title`) and all their pseudo rules |
| `html { background: var(--neutral-900); }`, which stops a white frame | The rule that forces the arriving title visible with `!important`, so the title fades with its page again |
| The root fade, retimed to 200 ms out and 300 ms in from 100 ms | `site/js/page-transition.js` and its script tag on all three pages, plus the `data-pt` attributes on the two links |
| The reduced motion rule | `.cursor-btn { view-transition-name: none; }`: nothing names the cursor button, so it does nothing |

The result is about ten lines of CSS and no script.

## Why

### A fade, not a morph
- Material's motion system names this case. "Fade through" is for elements with no strong relationship
  and uses "a sequential fade out and fade in" [C5, CONFIRMED]. A small card name and a page sized
  wordmark are different things doing different jobs (INFERENCE), which is what he felt.
- A morph between two text sizes is the documented weak spot. In a view transition "the group animates
  from the before size to the after size" [C7, CONFIRMED], and Jake Archibald, who worked on the API,
  calls the result "stretchy text" that "looks bad" [C6, CONFIRMED]. The provisional build already had
  to fight this (fast old fade, pinned width), which is a sign it was the wrong tool here (INFERENCE).
- A morph also needs a matching name on both pages and breaks if two elements share one [C12,
  CONFIRMED]. The fade needs none of that wiring.

### The timings
- The whole change stays inside the ranges practitioners give. NN/g reserves 400 ms for "big movements
  across large screens" [C1, CONFIRMED]; Material says "Transitions that exceed 400ms may feel too
  slow" [C4, CONFIRMED]; Emil Kowalski keeps UI animation "under 300ms" [C3, CONFIRMED]. Each layer here
  is 300 ms or less and the whole change ends at 400 ms.
- The exit is shorter than the entrance on purpose. NN/g: entering "usually need[s] a subtly longer
  duration than objects disappearing" [C2, CONFIRMED]; Material: objects leaving "may have shorter
  durations, as they require less attention" [C4, CONFIRMED].
- Ease out on both. NN/g: "Most frequently, you'll want to use an ease-out animation" [C2, CONFIRMED];
  Emil uses ease out for anything "entering or exiting the screen" [C3, CONFIRMED]. Material uses ease in
  for exits [C4, CONFIRMED]; on a 200 ms fade to a dark page the difference is hard to see, so the
  house token wins (INFERENCE).
- Short matters for a second reason: while the transition runs, clicks go to the document rather than
  the page [C13, CONFIRMED], and Apple's guidance is not to make people wait for an animation before
  they can act [C17, CONFIRMED]. The browser's own default fade is 0.25 s [C18, CONFIRMED], so 200 and
  300 ms sit right beside it.

### Why it sits with the Mondai entrance
- The new page fades in as a live picture of itself, not a frozen frame [C21, CONFIRMED], so the
  entrance underneath keeps running while the root fades (INFERENCE from C21). At the moment the new
  page is captured its text is still hidden by the entrance CSS (INFERENCE), so what fades in over 100 to
  400 ms is the page colour, the nav and anything the entrance does not hide. Then, from 350 ms, the
  text and image curtains arrive on their own clock. The old label is gone before the new one starts:
  separate, as he asked.
- No coordination code is needed. If a later build adds a shared element again, that is when the
  entrance would have to wait for the transition to finish (INFERENCE).

### Support and pitfalls
- Chrome and Edge from 126 and Safari from 18.2 draw it [C8, CONFIRMED]. Firefox does not yet: MDN marks
  the feature not Baseline because it fails in some widely used browsers [C9, CONFIRMED]. Unsupported
  browsers "simply do nothing" [C10, CONFIRMED], so Firefox gets today's plain page change.
- No blank frame: the html background in the page colour covers the gap (kept from the provisional
  build). Do not add render blocking (`blocking="render"`); Chrome advises against it unless measured
  [C11, CONFIRMED], and these pages are small static files.
- Back button and scroll: these are real page loads, so the browser restores scroll and the back
  forward cache as usual (INFERENCE). Dropping the script removes the only state that needed clearing
  on a cache restore (the `pt-out` classes).
- Lenis: each page boots its own instance on a real navigation, so nothing has to be torn down
  (INFERENCE; no source covers Lenis with cross document transitions).
- Reduced motion: WebKit notes "Simple crossfades are not known to cause adverse effects" [C10,
  CONFIRMED], so keeping the fade under reduced motion would be defensible. Turning it off is kept
  because the house rule is that everything shows at once under reduced motion (.claude/motion-rules.md).

### Why not something simpler, or a router
- **A CSS only fade on load** cannot fade the old page out, only the new one in, so it stacks a second
  fade on top of the entrance that already exists. Hiding content behind opacity also holds back the
  largest paint: the browser "waits until the element repaints at a non-zero opacity" before it records
  it [C14, CONFIRMED]. Worse than what is already in place (INFERENCE).
- **A fade out in script before leaving** adds its full length to every click before the next page even
  starts loading (INFERENCE). Apple's "don't make people wait" applies [C17, CONFIRMED].
- **barba.js or swup** turn three static pages into a swapped single page app. Inline scripts stop
  running after a swap in barba [C15, CONFIRMED], so Lenis and both entrances would need init and destroy
  hooks; screen readers may not hear that the page changed without extra work [C16, CONFIRMED]; barba's
  last release is August 2024 [C19, CONFIRMED]. Too many moving parts for a fade. Chrome frames native
  view transitions as progressive enhancement [C20, CONFIRMED], which is the right fit here.

### Real examples
None verified. The write ups that would show how studios do this (Codrops on the Spitzer, Pian and
Vitasović portfolios, and its Feb 2026 vanilla JS page transition tutorial) refused every automated
fetch, so nothing from them is cited [C22, failed check]. This gap does not change the pick: the
practitioner guidance and the browser documentation above carry it. If he wants references to feel,
the fastest route is two or three sites he likes, opened in Chrome, rather than more searching.

## Flair later (not part of this build)

1. **The nav holds still while the page changes.** Name the logo and the nav links on all three pages so
   they stay put while everything under them fades. Same size on every page, so nothing resizes. Catch:
   the header scrolls away on desktop, and the Mondai card sits below the fold, so it only works if the
   name is added just when the nav is on screen at the click. Otherwise it slides in from above.
2. **A page colour curtain.** The outgoing page closes from the top like the Mondai image curtains
   (Power3 in out), using the same language the framework page already speaks. Costs time on every
   click, so it would need to stay near 400 ms total.

## What would change this

- He says the fade feels like nothing happened: try the nav hold first (flair 1); it adds connection
  without moving text.
- He wants the label to feel continuous after all: a crossfade of the two titles in place, each at its
  own size, never a scale. Only possible where the two titles sit in a similar spot on screen.
- Firefox ships cross document view transitions: nothing to change, it starts working.
- Testing shows a brightness dip mid fade on the dark page (the browser blends old and new with
  plus-lighter): drop the 100 ms overlap and run the two fades back to back.
