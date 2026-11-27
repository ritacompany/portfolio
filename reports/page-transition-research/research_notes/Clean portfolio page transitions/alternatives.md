# Simpler alternatives to cross document view transitions for three static HTML pages

Method note: WebFetch returns a model-summarised page, so quotes below are verbatim as returned by the tool, not re-read from raw HTML. Items taken from search snippets only are tagged SNIPPET. Unseen claims are tagged INFERENCE. Research date 2026-11-26.

## (a) CSS fade on load, and optional JS fade out: pitfalls, latency, bfcache

### Takeaway
A CSS only fade in is the lowest risk option, but hiding content behind opacity 0 delays Largest Contentful Paint, and the bfcache can restore a page in whatever state it was left. A JS fade out before navigating adds its delay straight onto every click, and I found no authoritative guide for or against it, only forum snippets.

### Cited Findings
- Fades and page transitions that hide content delay LCP: "If your theme or a third-party app applies fade-in effects, page transitions, or reveal animations, then these can delay" LCP; the browser "waits until the element repaints at a non-zero opacity before recording the LCP event." Recommended fix: "Remove the animation entirely (recommended).": [Shopify dev docs](https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations)
- Page transitions that "hide all content until a transition effect plays" are described as the most impactful animation related LCP issue (tool paraphrase, partial quote).: [Shopify dev docs](https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations)
- Workarounds (SNIPPET from search, not opened): start at a small non zero opacity such as 0.1; use a CSS keyframe animation rather than a JS triggered transition because it starts on first render; scope hiding CSS to a class so unsupported browsers are unaffected.: [DebugBear](https://www.debugbear.com/blog/opacity-animation-poor-lcp), [Shopify docs](https://shopify.dev/docs/storefronts/themes/best-practices/performance/dont-hide-lcp-image-behind-animations)
- bfcache: "which is `true` if the page was restored from bfcache and `false` otherwise." And bfcache "is a snapshot of the entire page in memory, including the JavaScript heap." The article suggests updating stale data in a `pageshow` handler when `event.persisted` is true.: [web.dev bfcache](https://web.dev/articles/bfcache)
- Pending timers and unresolved promises are paused while cached and resume on restore.: [web.dev bfcache](https://web.dev/articles/bfcache)
- `pageshow` fires on back/forward: "Returning to the page using the browser's forward or back buttons (including when restored from the [bfcache])." Warning: "Despite the name, the `pageshow` event does not fire when the page is actually _shown_ to the user. For example, it may be opened in a background tab or prerendered.": [MDN pageshow](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event)
- Exit delay pattern seen in the wild (SNIPPET only, Webflow forum): preventDefault then `setTimeout(function(url) { window.location = url }, 1300, this.href);`. A forum user asked "who wants to delay a link action when everybody tries to have a fast website?": [Webflow forum](https://discourse.webflow.com/t/page-transition-when-leaving-a-page/62571)
- Shopify warns that blocked rendering during view transitions "prevents the browser from responding to user input, creating poor INP scores" (SNIPPET paraphrase); fix is cancelling the transition on interaction. Relevant as a caution for any transition that holds the page.: [Shopify docs](https://shopify.dev/docs/storefronts/themes/best-practices/performance/cancel-view-transitions-on-interaction)

### Inferences
- INFERENCE: A JS fade out adds its full duration (for example 300 ms) to every click before the network request even starts. Fetch of the next page cannot begin until the delay ends unless you prefetch. Keep it under about 200 ms or skip it.
- INFERENCE: The "pageshow persisted" fix applies only if you add a JS fade out (the page stays faded out in the bfcache). With a CSS only fade in, the restored page is already visible, but the entrance animation will not replay, which is usually the desired behaviour. If the exit fade sets a class or inline style, clear it in `pageshow` when `event.persisted` is true.
- INFERENCE: The owner's existing entrance (text hidden in CSS, 0.35 s wait, 1.4 s fade) already hits the LCP risk Shopify describes. A page level fade in on top would stack on it; a simple option is a short (150 to 250 ms) fade on the body background layer only, with text left to the existing entrance.
- INFERENCE: Flash before CSS loads is avoided by putting the hiding rule inline in `<head>` or in a render blocking stylesheet; I found no source I opened that quotes this directly.

### Gaps
- No authoritative (web.dev, Chrome, MDN) article found that explicitly advises against delaying navigation for an exit animation.
- No opened source on the "flash before CSS loads" pitfall for fade in pages.
- DebugBear article was only seen as a search snippet, not opened.

## (b) barba.js and swup.js

### Takeaway
Both turn the site into an SPA style swap and make you own script re-initialisation, analytics, Lenis and entrance replays. Swup is actively maintained (4.10.0 on 2026-09-03) and has native view transitions support and an a11y plugin; barba has had no release since Aug 2024 and I found no view transitions support.

### Cited Findings
Maintenance
- swup releases: 4.10.0 (2026-09-03), 4.9.2 (2026-06-12), 4.9.1 (2026-06-10), 4.9.0 (2026-05-08), 4.8.3 (2026-02-24).: [GitHub API swup releases](https://api.github.com/repos/swup/swup/releases?per_page=5)
- barba releases: v2.10.3 (2024-08-12), v2.10.2 (2024-08-02), v2.10.0 (2024-05-10), v2.9.7 (2022-12-31). Latest seen is more than two years old.: [GitHub API barba releases](https://api.github.com/repos/barbajs/barba/releases?per_page=5)
- npm pages not opened.

Barba requirements
- Markup: `<body data-barba="wrapper">` and `<main data-barba="container" data-barba-namespace="home">`; "the `wrapper` should always wrap the `container`." "everything inside of this wrapper and outside of the container will not be updated by Barba.": [Barba markup](https://barba.js.org/docs/getstarted/markup/)
- Barba "appends the container to the wrapper" (tool paraphrase), so DOM order changes during the transition.: [Barba markup](https://barba.js.org/docs/getstarted/markup/)
- Scripts: "all your inline scripts will be executed once, and they won't be executed after a page change done through Barba." This can cause "unexpected behaviors when using classic third party scripts.": [Barba third party](https://barba.js.org/docs/advanced/third-party/)
- Analytics: use the `after` global hook to send page views manually; disable automatic page views in the gtag config. GTM has a "History change trigger made specifically to track virtual pageview in SPA.": [Barba third party](https://barba.js.org/docs/advanced/third-party/)
- Smooth scroll (same pattern applies to Lenis, INFERENCE): "Inside a SPA, it's not needed to have multiple instance of LocomotiveScroll." Reset and update the existing instance via Barba hooks. For ScrollTrigger: "it is very important to kill ScrollTrigger instances when navigating between two pages.": [Barba third party](https://barba.js.org/docs/advanced/third-party/)
- Head: that page does not cover title or meta updates; the page does say body classes outside the container must be updated manually. A "Head" plugin is listed in the sidebar but I did not read it.: [Barba third party](https://barba.js.org/docs/advanced/third-party/)
- Barba self description: "a small _(7kb minified and compressed)_ and easy-to-use library" that "makes your website run like a SPA (Single Page Application).": [Barba intro](https://barba.js.org/docs/getstarted/intro/)

Swup requirements
- "Swup will not replace the whole body on each page load." Without configuration, the container is `#swup`. "Instead of letting the browser load the next page, swup intercepts link clicks.": [Swup how it works](https://swup.js.org/getting-started/how-it-works/)
- Containers option: "The content containers to be replaced on page visits." "Only elements **inside** of the `body` tag are supported.": [Swup options](https://swup.js.org/options/)
- Animations: "Swup will wait for all CSS transitions and keyframe animations to finish on these elements" (animationSelector).: [Swup options](https://swup.js.org/options/)
- Scroll: "Between page visits, the scroll position will be reset to the top.": [Swup how it works](https://swup.js.org/getting-started/how-it-works/)
- Scripts plugin: "Re-run any `<script>` tags inside the `<head>` and/or `<body>` on every page view." Both options default to true; `data-swup-ignore-script` skips a script. Note this is a plugin, not core.: [Swup scripts plugin](https://swup.js.org/plugins/scripts-plugin/)
- Head plugin: "a plugin for updating the contents of the head tag": "Adds any meta tags and assets from the next page to the current document", "Updates the lang and dir attributes of the html element", "Supports delaying the transition until new stylesheets have loaded". Page did not name the title element, so title update is unconfirmed.: [Swup head plugin](https://swup.js.org/plugins/head-plugin/)
- A11y plugin: "Announce page visits to screenreaders by reading the new page title." "On page navigation, the plugin will reset focus to the body, imitating default browser behavior.": [Swup a11y plugin](https://swup.js.org/plugins/a11y-plugin/)

### Inferences
- INFERENCE: For three static pages with a per page entrance, either library means every page's entrance and Lenis setup must be wrapped in init and destroy functions called from lifecycle hooks, and per page inline scripts must be restructured. That is more moving parts than the fade needs.
- INFERENCE: Swup's default `#swup` container plus Head, Scripts and A11y plugins is the closest to a drop in swap for static HTML. Barba needs namespace markup and hand written transitions.
- INFERENCE: Lenis is not covered by either doc I opened; the Locomotive guidance is the nearest analogue.

### Gaps
- npm release dates not opened; GitHub API dates used instead.
- Barba docs for Transitions, Views, Lifecycle and Head plugin not read.
- Swup docs on lifecycle hooks (`content:replace`, `page:view`) not read in full.

## Native view transitions in swup and barba

### Takeaway
Swup supports them through a `native` option; I found no barba support.

### Cited Findings
- Swup option `native`: "Enable native animations using the View Transitions API." "This will toggle the class `swup-native` on the HTML element if View Transitions are supported by the user's browsers.": [Swup options](https://swup.js.org/options/)
- Swup "will wait for CSS animations, JS animations, and native View Transitions before updating the page.": [Swup how it works](https://swup.js.org/getting-started/how-it-works/)
- Barba: no mention found in the pages I opened (intro, markup, third party). Absence is not proof; I did not search the barba repo issues.

### Inferences
- INFERENCE: Swup's `native` is same document (it still swaps the DOM in JS), so it does not depend on Firefox's missing cross document support, but it does need swup.

### Gaps
- Barba and native view transitions: unconfirmed, not searched on GitHub.
- Swup does not "recommend" native over its own animations in anything I read.

## Accessibility of SPA style swaps vs real navigation

### Takeaway
A real navigation gives focus reset, title announcement and history for free; a swap must recreate them. Gatsby's user testing found heading focus best and some screen reader combinations announced nothing.

### Cited Findings
- "Without page refreshes, screen reader users may not be informed that the page has changed.": [Gatsby/Marcy Sutton 2019](https://v2.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing)
- "Focusing on a heading was found to be the best experience"; "Focusing on a wrapper element for new content worked okay"; "resetting focus to the top of the app would be very overwhelming.": same source
- Advice: "Provide a skip link that takes focus on a route change within the site." and "Include an ARIA Live Region on page load.": same source
- Follow up (SNIPPET, post not opened): NVDA with Firefox and VoiceOver with Safari "weren't announcing anything at all" on client side route changes; Gatsby shipped fixes in 2.19.8.: [Gatsby 2020 follow up](https://www.gatsbyjs.com/blog/2020-02-10-accessible-client-side-routing-improvements)
- Swup's a11y plugin resets focus to body rather than a heading (quote above), which differs from the best result in the Gatsby study.: [Swup a11y](https://swup.js.org/plugins/a11y-plugin/)

### Inferences
- INFERENCE: Native cross document transitions keep real navigations, so none of this focus work applies.

### Gaps
- 2020 follow up and Marcy's own site post (marcysutton.com/prototype-testing-accessible-clientside-routing) not opened.
- Barba has no a11y handling in what I read.

## (c) Native cross document view transitions and when to prefer them

### Takeaway
Two lines of CSS, no JS, same origin only, supported in Chromium and Safari; Firefox partial. Chrome frames them as progressive enhancement, which fits "simple now, flair later".

### Cited Findings
- "set the `navigation` descriptor to `auto` to enable view transitions for cross-document, same-origin navigations." Support: "Cross-document view transitions are supported in Chrome from Chrome 126.": [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- "Cross-document view transitions are limited to **same-origin navigations** only.": same source
- caniuse: Chrome and Edge 126+, Safari 18.2+, Firefox "partial support from version 144 to 163", 143 disabled by default; global usage 87.73% + 1.87% = 89.6%.: [caniuse](https://caniuse.com/cross-document-view-transitions)
- Mozilla bug context (SNIPPET): same document works in Firefox, cross document "not supported yet".: [Bugzilla 2001878](https://bugzilla.mozilla.org/show_bug.cgi?id=2001878)
- "No JavaScript is required, as the view update is triggered by a cross-document, same-origin navigation rather than a JavaScript-initiated DOM change.": [MDN using VT](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- "View transitions are the perfect material for progressive enhancement." "Browsers that don't support them will ignore the" CSS opt-in "when parsing stylesheets.": [Chrome misconceptions](https://developer.chrome.com/blog/view-transitions-misconceptions)
- Render blocking: "It is evident that render blocking should be used with caution.": [Chrome misconceptions](https://developer.chrome.com/blog/view-transitions-misconceptions)
- MDN gives `@view-transition { navigation: auto; }`, and `<link rel="expect" href="#lead-content" blocking="render" />` for waiting on content.: [MDN using VT](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)

### Inferences
- INFERENCE: Default crossfade of the root snapshot would fade the whole page, including the already animated entrance text, so the existing entrance (0.35 s wait, 1.4 s fade) would still play over it. Tune with `::view-transition-old(root)` and `-new(root)` durations; I did not test this.
- INFERENCE: Lenis is unaffected by a real navigation (each page boots its own instance), unlike the router options.
- INFERENCE: `prefers-reduced-motion` handling must be added by hand; the pages I read did not mention it.

### Gaps
- No Chrome/MDN statement found that explicitly recommends native over JS routers (the misconceptions article does not discuss it).
- No opened source on interaction of native transitions with Lenis or with pages that hide text in CSS.
