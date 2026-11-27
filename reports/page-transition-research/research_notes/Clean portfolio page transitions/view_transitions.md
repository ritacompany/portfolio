# Cross-document (MPA) view transitions in plain HTML/CSS, as of late 2026

Research date: 2026-11-26. All quotes are as returned by WebFetch (a small model summarising the page), so treat them as near-verbatim and recheck any you plan to publish. Anything not opened is marked INFERENCE or listed under Gaps.

## 1. Browser support now

### Takeaway
Chrome and Edge 126+ and Safari 18.2+ support cross-document view transitions. Firefox has not shipped them as of the sources I could open (Firefox 143 to 163 shows only "Disabled by default" or "Partial support" on caniuse, tracking bug still open).

### Cited Findings
- Chrome docs: "Cross-document view transitions are supported in Chrome from Chrome 126." Edge 126 also listed.: [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- Same page: "Safari: 18.2." for cross-document; "Firefox: not supported." for cross-document, pageswap/pagereveal and render blocking. (Page's own widget lists Firefox 147 and Safari 26.2, but Firefox is still unsupported for cross-document.): [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- WebKit: "Cross-document View Transitions are supported in Safari 18.2, Chrome 126, and Edge 126.": [WebKit blog](https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/)
- caniuse table: Chrome "4 - 125: Not supported", "126 - 157: Supported" (to 161 listed supported); Edge "126 - 156: Supported"; Safari "3.1 - 18.1: Not supported", "18.2 - 27.1: Supported"; Firefox "2 - 142: Not supported", "143: Disabled by default", "144 - 159: Partial support", "161 - 163: Partial support". Global usage "87.73% + 1.87% = 89.6%". Caveat: the caniuse Firefox "Partial support" column is ambiguous, see Gaps.: [caniuse](https://caniuse.com/cross-document-view-transitions)
- Firefox release notes: Firefox 144 adds view transitions for single-page apps; Firefox 147 "adds support for single-page app (SPA) view transition types only, not cross-document view transition types" (search-result summary).: [Firefox 144 notes](https://developer.mozilla.org/en-US/Firefox/Releases/144), [Firefox 147 notes](https://developer.mozilla.org/en-US/Firefox/Releases/147)
- Mozilla meta bug for cross-doc: status "NEW", "Unassigned", "Updated 8 days ago", Firefox 161/162/163 flags "---", flag "behind-pref"; description "This is a meta bug to track implementation." No ship date.: [Bugzilla 1860854](https://bugzilla.mozilla.org/show_bug.cgi?id=1860854)
- MDN: "This feature is not Baseline because it does not work in some of the most widely-used browsers.": [MDN @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)
- Chrome 2025 recap: cross-document shipped 2024; `document.activeViewTransition` added; `match-element` "can only be used in same-document view transitions".: [Chrome 2025 update](https://developer.chrome.com/blog/view-transitions-in-2025)

### Inferences
- INFERENCE: Firefox is a plain-navigation fallback for the foreseeable future; design the site so nothing depends on the transition.

### Gaps
- webstatus.dev returned no content. MDN's compat table was truncated. Exact meaning of caniuse "Partial support" for Firefox 144+ unconfirmed (likely same-document only, from release notes).

## 2. Opt-in syntax, unsupported browsers, same origin, timeout

### Takeaway
One CSS rule on both pages opts in. Unsupported browsers simply navigate normally. Same-origin only. Chrome skips the transition if navigation exceeds about four seconds.

### Cited Findings
- Syntax: "set the `navigation` descriptor to `auto` to enable view transitions for cross-document, same-origin navigations." `@view-transition { navigation: auto; }`: [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- MDN: `auto`: "The document will undergo a view transition when taking part in a navigation, provided the navigation is same-origin, without cross-origin redirects, and its navigationType is `traverse`, `push`, or `replace`. In the case of `push` or `replace`, the navigation must be initiated by a user interacting with the page content, not by a browser UI feature.": [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition)
- MDN: "For a cross-document view transition to work, the current and destination documents of the navigation need to be on the same origin." Both documents must opt in.: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition), [MDN Using VT API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- Chrome docs: "Cross-document view transitions are limited to same-origin navigations only.": [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- Fallback: "since the fallback behavior is to simply do nothing.": [WebKit blog](https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/)
- Timeout: Chrome docs fragment "more than four seconds in Chrome's case"; per fetch summary the transition is skipped with a `TimeoutError` `DOMException`; URL bar entries, bookmarks and reloads are excluded from `auto`.: [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- Spec (W3C Working Draft, 13 Nov 2024 snapshot): "To skip the transition after a timeout, the user agent may perform the following steps"; duration is "implementation-defined", spec does not say 4 s. Also "If document's visibility state is 'hidden', then return 'skip transition'.": [CSS VT Level 2](https://www.w3.org/TR/css-view-transitions-2/)

### Inferences
- INFERENCE: With Vercel static pages the 4 s timeout is irrelevant in practice.
- INFERENCE: Hitting the browser Back button counts as `traverse` and is covered by `auto`, but typing a URL or clicking a bookmark is not.

### Gaps
- Exact quote of the full timeout sentence not retrievable (tool limit).

## 3. Default animation and root customisation

### Takeaway
UA default is a root crossfade; group animation is 0.25s. Custom `::view-transition-old(root)` and `new(root)` animations are the intended customisation route.

### Cited Findings
- Spec UA stylesheet: "animation-duration: 0.25s;" on `:root::view-transition-group(*)`; the group rule sets no timing function; children use "animation-timing-function: inherit;". Cross-fade uses `mix-blend-mode: plus-lighter` which "ensures that the blending of identical pixels from the old and new images results in the same color value.": [CSS VT Level 1 draft](https://drafts.csswg.org/css-view-transitions-1/)
- "by default, all of these changes happen in a crossfade.": [WebKit blog](https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/)
- MDN says the default is a cross-fade and gives no duration.: [MDN Using VT API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)

### Inferences
- INFERENCE: Overriding `animation-duration`/`animation-delay` on `::view-transition-old(root)` and `::view-transition-new(root)` (your 220 ms out, 420 ms in with 120 ms delay) is standard usage; I did not open a page that demonstrates it for cross-document specifically. With plus-lighter blending and a delayed new layer, a midpoint dip in brightness is possible; INFERENCE, test on dark background.

### Gaps
- No Chrome docs quote on default easing for the old/new fade layers (the spec UA sheet's easing text was not seen directly).

## 4. Reduced motion

### Takeaway
Two accepted patterns: set `navigation: none` under `prefers-reduced-motion: reduce`, or only opt in under `no-preference`. Simple crossfades are widely considered low risk, so keeping a fade is defensible.

### Cited Findings
- WebKit: "Use a prefers-reduced-motion media query to determine whether to modify or stop motion triggers." and "Simple crossfades are not known to cause adverse effects in those with motion sensitivity.": [WebKit blog](https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/)
- Matthias Ott: disable via `navigation: none`; "Simple fades between pages, for example, are generally seen as quite safe and less likely to trigger vestibular disorders."; use the query to "reduce or remove those motion-heavy transitions".: [Matthias Ott](https://matthiasott.com/notes/view-transitions-the-smooth-parts)
- WordPress core commit uses `navigation: auto` only inside `(prefers-reduced-motion: no-preference)` (search-result summary, page not opened).: [WP trac 64529](https://core.trac.wordpress.org/ticket/64529)
- The Chrome cross-document doc, Chrome IO24 post, Chrome 2025 post and MDN Using page returned no reduced-motion text in the fetched portions. So no Chrome-docs quote is available.

### Inferences
- INFERENCE: Pattern: `@media (prefers-reduced-motion: no-preference) { @view-transition { navigation: auto; } }`, and separately make the arriving page's 1.4 s text fade a plain or instant state under `reduce`.

### Gaps
- No verbatim Chrome-docs recommendation found.

## 5. Pitfalls

### Takeaway
Snapshot timing, render blocking, name uniqueness and paused rendering are the documented hazards. Lenis and entrance coordination are not documented anywhere I could open.

### Cited Findings
- Flash/incomplete content: "the page loading process remains incremental"; the browser waits for `<head>` then decides how much of `<body>`; slow-connection visitors may get no transition; `rel="expect"` with `blocking="render"` tells the browser which element to wait for.: [Matthias Ott](https://matthiasott.com/notes/view-transitions-the-smooth-parts)
- Chrome: "In some cases, you may want to hold off the first render of a page until a certain element is present in the new DOM." and "By default, avoid using `blocking=render` unless you can actively measure and gauge the impact it has on your users".: [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- MDN: "Styles are render blocked by default unless they are added to the document dynamically, via script. Both scripts and dynamically-added styles can be render blocked using the `blocking="render"` attribute.": [MDN Using VT API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- Spec: "the user agent relies on the render-blocking mechanism to decide when the document has reached a stable state.": [CSS VT Level 2](https://www.w3.org/TR/css-view-transitions-2/)
- Rendering suppressed: Chrome "The DOM gets updated while rendering is suppressed."; spec: "all pointer hit testing must target its document element, ignoring all other elements." and captured elements are not painted nor hit-tested during the transition.: [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), [CSS VT Level 1 draft](https://drafts.csswg.org/css-view-transitions-1/). Chrome 2025: scoped transitions limit pointer blocking to a subtree, not relevant to root transitions.: [Chrome 2025](https://developer.chrome.com/blog/view-transitions-in-2025)
- Name uniqueness: "If two rendered elements have the same `view-transition-name` at the same time, `ViewTransition.ready` will reject and the transition will be skipped" and bfcache note that names persist in page state.: [MDN Using VT API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- Events: "The `pageswap` event fires before the last frame of a page is rendered."; "`pageswap`: Once the document is hidden, the old `ViewTransition` object is skipped."; `pagereveal` "fires on a page after it has been initialized or reactivated" and "The `pagereveal` event listener needs to execute before the first rendering opportunity." "With it, you can customize the new page before the new snapshots get taken." Also "A `pagereveal` event is fired when a document is first rendered, either when loading a fresh document from the network or activating a document (either from back/forward cache (bfcache) or prerender).": [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), [MDN Using VT API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)
- navigationType: spec example `if (event.activation.navigationType === "traverse")` to skip transitions for back/forward.: [CSS VT Level 2](https://www.w3.org/TR/css-view-transitions-2/)
- The `ViewTransition` object is reachable in both events; "`viewTransition.ready` and `viewTransition.finished` promises" are available. `document.activeViewTransition` exists in Chrome.: [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), [Chrome 2025](https://developer.chrome.com/blog/view-transitions-in-2025)
- Lenis: only a Lenis issue about Astro view transitions ("Too many calls to Location or History APIs"), unresolved in snippet; no cross-document guidance.: [Lenis issue 348 (via polar.sh)](https://polar.sh/darkroomengineering/lenis/issues/348)

### Inferences
- INFERENCE (entrance animation): the new-page snapshot is taken at first render after render-blocking resolves, so text hidden via CSS (opacity 0) is captured hidden, and a CSS animation with a 0.35 s delay will already be running (not paused) during the transition because the document animates live under the snapshot; the 0.35 s delay plus 1.4 s fade likely partly plays behind the 420 ms crossfade. No source opened states this.
- INFERENCE: if you want the entrance to start after the crossfade, trigger it from `pagereveal` via `viewTransition.finished` (the `finished` promise is documented), adding a class to start the animation, with a fallback when `viewTransition` is absent (Firefox, reduced motion).
- INFERENCE (Lenis): initialise Lenis after load/`pagereveal`, start at scrollTop 0 so snapshot and live scroll agree; Lenis writes native scroll each frame so avoid it fighting browser back-forward scroll restoration. Test back/forward and bfcache (`pageshow` with `persisted`).
- INFERENCE (blank flash): set `html` background to the dark colour (done), which fills areas not covered by the snapshots.

### Gaps
- No source on how scroll restoration interacts with the new snapshot, on Lenis plus cross-document transitions, or on explicit guidance to wait for `finished` before entrance animations. Chrome's pagereveal example uses `ready`, and `finished` appears in the pageswap example only.
- Content of the Jake Archibald and Bramus articles not opened.
