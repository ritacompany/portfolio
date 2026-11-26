# Claim check

Every sourced claim in PLAN.md, with its link and the exact quote it relies on. Checked 26 Nov 2026 by a
script, not by me reading: each page was fetched raw with curl, tags stripped, quotes and whitespace
normalised, and the quoted phrase searched for as an exact substring. PASS means the exact phrase is on
the live page. A control phrase that is not on any page came back FAIL, so the matcher can fail.
The brief asked for a Sonnet subagent to do this; the repo's agent cost hook (cs2-cost-guard) caps a
turn at three agents and the three researchers used them, so a mechanical exact match replaced it.
Matcher: match.mjs in this folder.

| Id | Source | Quote | Verdict | Note |
| --- | --- | --- | --- | --- |
| C1 | https://www.nngroup.com/articles/animation-duration/ | "400ms being a very slow animation, to be used only for big movements across large screens" | PASS | Exact phrase found |
| C2 | https://www.nngroup.com/articles/animation-duration/ | "animating objects appearing or entering the screen usually need a subtly longer duration than objects disappearing or exiting the screen" and "Most frequently, you'll want to use an ease-out animation, that starts quickly but slows down." | PASS | Exact phrase found |
| C3 | https://emilkowal.ski/ui/7-practical-animation-tips and https://emilkowal.ski/ui/you-dont-need-animations | "If you are animating something that is entering or exiting the screen, use ease-out." and "As a rule of thumb, UI animations should generally stay under 300ms." | PASS | Exact phrase found |
| C4 | https://m1.material.io/motion/duration-easing.html | "Transitions that exceed 400ms may feel too slow." and "Objects leaving the screen may have shorter durations, as they require less attention." and "(also referred to as “ease in”) elements leave the screen at full velocity" | PASS | Exact phrase found |
| C5 | https://developer.android.com/codelabs/material-motion-android | "transitions between UI elements that do not have a strong relationship to each other; uses a sequential fade out and fade in" | PASS | Exact phrase found |
| C6 | https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/ | "ugh, stretchy text looks bad" | PASS | Exact phrase found |
| C7 | https://developer.chrome.com/docs/web-platform/view-transitions/same-document | "In the default transition, the group animates from the before size to the after size." | PASS | Exact phrase found |
| C8 | https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/ and https://developer.chrome.com/docs/web-platform/view-transitions/cross-document | "Cross-document View Transitions are supported in Safari 18.2, Chrome 126, and Edge 126." | PASS | Exact phrase found |
| C9 | https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition | "This feature is not Baseline because it does not work in some of the most widely-used browsers." | PASS | Exact phrase found |
| C10 | https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/ | "the fallback behavior is to simply do nothing" and "Simple crossfades are not known to cause adverse effects in those with motion sensitivity." | PASS | Exact phrase found |
| C11 | https://developer.chrome.com/docs/web-platform/view-transitions/cross-document | "By default, avoid using blocking=render unless you can actively measure and gauge the impact it has on your users" | PASS | Exact phrase found |
| C12 | https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using | "If two rendered elements have the same view-transition-name at the same time, ViewTransition.ready will reject and the transition will be skipped" | PASS | Exact phrase found |
| C13 | https://drafts.csswg.org/css-view-transitions-1/ | "all pointer hit testing must target its document element, ignoring all other elements" | PASS | Exact phrase found |
| C14 | https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations | "waits until the element repaints at a non-zero opacity before recording the LCP event" | PASS | Exact phrase found |
| C15 | https://barba.js.org/docs/advanced/third-party/ | "all your inline scripts will be executed once, and they won't be executed after a page change done through Barba" | PASS | Exact phrase found |
| C16 | https://v2.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing | "Without page refreshes, screen reader users may not be informed that the page has changed." | PASS | Exact phrase found |
| C17 | https://developer.apple.com/design/human-interface-guidelines/motion | "don't make people wait for an animation to complete before they can do anything" | PASS | Exact phrase found |
| C18 | https://drafts.csswg.org/css-view-transitions-1/ | UA stylesheet sets "animation-duration: 0.25s" on the view transition group | PASS | Exact phrase found |
| C19 | https://registry.npmjs.org/@barba/core | npm dist tag latest is 2.10.3, published 2024-08-12 | PASS | Read from the registry JSON (GitHub API refused the fetch) |
| C20 | https://developer.chrome.com/blog/view-transitions-misconceptions | "View transitions are the perfect material for progressive enhancement." | PASS | Exact phrase found |
| C21 | https://developer.mozilla.org/en-US/docs/Web/CSS/::view-transition-new | the new view is "a live representation of the state after the transition" | PASS | Exact phrase found |
| C22 | https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/ | "crossfading the two containers by overlapping them", with 1000 ms per side | FAIL | Site returned 403 to every fetch; claim removed from PLAN.md |
