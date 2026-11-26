# Clean portfolio page transitions: practitioner guidance

Method note: WebFetch returns text extracted by a small model, so quotes below are as returned by that extraction from the opened page. Anything marked INFERENCE was not seen on a page. Pages that returned only a title or a 403 are listed under Gaps.

## What clean page transitions animate, durations and easing

### Takeaway
Guidance converges on: 200 to 300 ms for large or full-screen changes, ease-out for entrances, 400 ms as an upper limit. The browser default for view transitions is a plain cross-fade (opacity only). Material's own "fade through" is the named pattern for swapping content with no strong relationship.

### Cited Findings
- NN/g range: "the duration of most animations should be in the range of 100 to 500 ms." For larger movements "a duration of 200 to 300 ms can be appropriate." "400ms being a very slow animation, to be used only for big movements across large screens.": [NN/g, Executing UX animations](https://www.nngroup.com/articles/animation-duration/)
- NN/g easing: "Most frequently, you’ll want to use an ease-out animation, that starts quickly but slows down." and "Completely linear motion looks weird and unnatural to users.": [NN/g](https://www.nngroup.com/articles/animation-duration/)
- Emil Kowalski: "As a rule of thumb, UI animations should generally stay under `300ms`." and "A `180ms` dropdown animation feels more responsive than a `400ms` one:": [emilkowal.ski, You don't need animations](https://emilkowal.ski/ui/you-dont-need-animations)
- Emil Kowalski easing: "If you are animating something that is entering or exiting the screen, use `ease-out`." and "It accelerates at the beginning which gives the user a feeling of responsiveness.": [emilkowal.ski, 7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Val Head: "200ms to 500ms seconds is a good range to start with for interface animations." and "tend to be on the lower end in the 200ms to 300ms range.": [valhead.com](https://valhead.com/2016/05/05/how-fast-should-your-ui-animations-be/)
- Material 1 durations: "Transitions on mobile typically occur over 300ms"; "Large, complex, full-screen transitions may have longer durations, occurring over 375ms"; "Transitions that exceed 400ms may feel too slow.": [m1.material.io Duration & easing](https://m1.material.io/motion/duration-easing.html)
- Material "fade through" definition (Android codelab): "**Fade Through:** transitions between UI elements that do not have a strong relationship to each other; uses a sequential fade out and fade in, with a scale of the incoming element." Page gives no ms values (uses a resource integer).: [Material Motion codelab](https://developer.android.com/codelabs/material-motion-android)
- Material "shared axis" definition: "**Shared Axis:** transitions between UI elements that have a spatial or navigational relationship; uses a shared transformation on the x, y, or z axis to reinforce the relationship between elements.": [same codelab](https://developer.android.com/codelabs/material-motion-android)
- Chrome view transitions default: "The default view transition is a cross-fade, so it serves as a nice introduction to the API:" and "The old view animates from `opacity: 1` to `opacity: 0`". Cross-document opt-in: "set the `navigation` descriptor to `auto` to enable view transitions for cross-document, same-origin navigations.": [Chrome same-document](https://developer.chrome.com/docs/web-platform/view-transitions/same-document); [Chrome cross-document](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- Apple HIG, restraint: "**Add motion purposefully, supporting the experience without overshadowing it.** Don’t add motion for the sake of adding motion. Gratuitous or excessive animation can distract people and may make them feel disconnected or physically uncomfortable." No ms values given.: [Apple HIG Motion (markdown source)](https://developer.apple.com/design/human-interface-guidelines/motion.md)
- Apple HIG, waiting: "**Let people cancel motion.** As much as possible, don’t make people wait for an animation to complete before they can do anything, especially if they have to experience the animation more than once.": [Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion.md)
- Apple HIG on relocating objects (visionOS section, so context-limited): "Consider using fades when you need to relocate an object." and "you can fade the object out before moving it and fade it back in after it’s in the new location.": [Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion.md)
- Rauno Freiberg: the page returned only fragments; "The overlay never animates which makes moving between apps feel snappy:" and "But imagine if it were an animation that you had to wait for!" Nothing on duration or easing.: [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design)

### Inferences
- INFERENCE: for a plain HTML portfolio, a whole-page or main-content opacity fade of roughly 150 to 300 ms with ease-out sits inside every range above and is what the Chrome default cross-fade does.
- INFERENCE: a 1000 ms fade (the Codrops tutorial below) is well outside the 200 to 400 ms bands from NN/g, Emil and Material; treat it as a demo value.

### Gaps
- Material 3 pages (m3.material.io transition-patterns, easing-and-duration) and m2 motion pages returned only the title. I could not quote M3 ms values for fade through or shared axis. A search snippet mentioned 92% to 100% scale on the incoming element and a 100 ms outgoing fade from a third-party walkthrough; not opened, unverified.
- Chrome same-document page did not state a 0.25s default duration in what was returned. I could not confirm the default cross-fade duration.
- Rauno page gave nothing on durations, easing or transitions in the extracted text.

## Exit vs enter asymmetry

### Takeaway
Three sources state exits should be shorter than entrances. Material gives concrete numbers (225 vs 195 ms); NN/g gives 300 vs 200 to 250 ms.

### Cited Findings
- NN/g: "animating objects appearing or entering the screen usually need a subtly longer duration than objects disappearing or exiting the screen" and "a popup window may take 300ms to appear, but only 200 or 250ms to disappear.": [NN/g](https://www.nngroup.com/articles/animation-duration/)
- Material 1: "Elements entering the screen occur over 225ms"; "Elements leaving the screen occur over 195ms"; "Objects leaving the screen may have shorter durations, as they require less attention." Easing: deceleration "(also referred to as “ease out”) elements enter the screen at full velocity"; acceleration "(also referred to as “ease in”) elements leave the screen at full velocity.": [m1.material.io](https://m1.material.io/motion/duration-easing.html)
- Contrast: Emil Kowalski says use ease-out for both "entering or exiting".: [emilkowal.ski](https://emilkowal.ski/ui/7-practical-animation-tips) (a mild disagreement with Material's ease-in for exits)
- Material "fade through" is described as a "sequential fade out and fade in" (exit finishes, then entrance).: [codelab](https://developer.android.com/codelabs/material-motion-android)

### Inferences
- INFERENCE: a clean portfolio sequence is exit about 150 to 200 ms, entrance about 225 to 300 ms, so total perceived wait stays near 300 to 400 ms.

### Gaps
- Val Head's page did not address exit speed. Apple HIG gives no exit/enter numbers.

## Headings: separate fade or stagger vs shared-element morph, and when to avoid a morph

### Takeaway
Material's own rule is that content with no strong relationship gets fade through, not a morph. Chrome and Jake Archibald document that changing size or aspect ratio in a morph produces stretched text. I found no source that literally says "do not scale text", only the evidence of stretching and the workaround of separating elements.

### Cited Findings
- Fade through is for unrelated elements: "transitions between UI elements that do not have a strong relationship to each other": [Material Motion codelab](https://developer.android.com/codelabs/material-motion-android). A card title and a different page's heading are arguably different elements, but the source does not say that; see Inferences.
- Chrome default morph resizes the group: "In the default transition, the group animates from the before size to the after size." and "The old and new views are 100% width of the group, and auto height".: [Chrome same-document](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- Chrome on text stretching: "`fit-content` is used so the element is the size of the text, rather than stretching to the remaining width.": [Chrome same-document](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- Jake Archibald: "Now it feels like the shape is transitioning properly, but ugh, stretchy text looks bad.": [jakearchibald.com](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/)
- Chrome on uniqueness: "If two rendered elements have the same `view-transition-name` at the same time, the transition will be skipped.": [Chrome same-document](https://developer.chrome.com/docs/web-platform/view-transitions/same-document). Implication: morphs need extra fragile wiring; a cross-fade needs none.
- Emil Kowalski on scale: "`scale(0)` feels wrong because it looks like the element comes out of nowhere." (about starting scale for popovers, not text): [emilkowal.ski](https://emilkowal.ski/ui/7-practical-animation-tips)
- Search-result summary only (not opened as a page I could quote): a community recipe file says shared-element snapshots are raster so large-to-small text can look ghosted. Unverified; do not cite as a quote. Source listed: [vercel-labs css-recipes](https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-view-transitions/references/css-recipes.md)

### Inferences
- INFERENCE: a small card title growing into a large heading is a size change on text, which is exactly the case where the view-transition group resizes and text can look stretched (Jake Archibald) unless extra CSS is added. Separate old fade-out and new fade-in avoids this entirely.
- INFERENCE: the card title and the page heading are different elements with different roles, so Material's fade-through criterion ("no strong relationship") can be argued to fit; Material does not state it for headings.

### Gaps
- No source found that literally advises "do not scale text" or says scaled text blurs. Closest: Archibald's "stretchy text looks bad".
- No source found that specifically covers outgoing vs incoming heading stagger on portfolio sites.

## Real examples using fade or crossfade rather than morph

### Takeaway
Only one example was verified from an opened page, and it is a tutorial, not a studio site. Several Codrops case studies were surfaced by search but returned 403 on fetch, so their transition behavior is unverified.

### Cited Findings
- Codrops, "Building Async Page Transitions in Vanilla JavaScript" (Feb 2026): the `animate` function "takes care of crossfading the two containers by overlapping them". Old container `opacity: [1, 0]`, new `opacity: [0, 1]`, each 1000 ms, no easing specified (so Web Animations API default, linear). Both pages coexist in the DOM during the animation.: [Codrops](https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/)
- Smashing Magazine, "Improving User Flow Through Page Transitions" (2016): search snippet says it uses a crossfade with Web Animations API animating opacity on old and new content. Page fetch gave 403; NOT verified from the page.: [Smashing](https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions)

### Inferences
- INFERENCE: nothing verified shows a studio site; the Codrops tutorial is a build write-up of the plain crossfade pattern and matches the owner's wanted outcome in mechanism, not in timing.

### Gaps
- Unverified (403 on fetch, only search snippets): Codrops Joffrey Spitzer portfolio (https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/) is described in search as using Flip transitions for the About page, so it may be a morph counterexample; Federico Pian 2024 (https://tympanus.net/codrops/?p=80845); Stefan Vitasović 2025 (https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/). Did not reach the 3 to 6 verified examples asked for.
- Emil Kowalski's animations.dev not opened. NN/g, Chrome, Material m1, Apple and Val Head pages were the main primary sources actually read.
