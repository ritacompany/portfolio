# Framer components for a five-card expanding gallery (hover, tap, focus with caption reveal)

All pages viewed 2026-10-01 via WebFetch and WebSearch. Descriptions are the sellers' own listing copy; no live preview was hands-on tested, so motion quality claims are the seller's unless marked as inference.

Context for porting: a Framer Marketplace "component" is usually a remixable Framer layer tree (variants plus interactions), not a code file. None of the listings below says source code is visible or exportable. Porting therefore means rebuilding the behavior from the description and preview, not copying code. Framer site export of a published page gives compiled React bundles, not readable source (general Framer knowledge, not stated on these pages).

## What does Framer Marketplace offer for expanding or accordion image galleries and hover card carousels?

### Takeaway
There are at least ten direct matches. The closest fits for "row of cards, one grows, others shrink, caption reveals" are ExpandFrame, AccordGallery, Expanding Cards Grid, Expandable Cards (Zaid) and Image Strip Expander. Only ExpandFrame, Expanding Cards Grid, Expandable Cards and Image Strip Expander state any touch behavior. None of the Marketplace listings mentions keyboard or focus support.

### Cited Findings

**1. ExpandFrame** by Haseeb Aamir. Price: listing body says $5, but the search result title reads "Free Component for Framer". Treat price as unconfirmed.
- Interaction: "Hover over an image on desktop, or tap it on mobile, to expand it while the surrounding images smoothly contract and dim." Grayscale and opacity of resting items configurable. Optional reset when the cursor leaves. Separate expansion amount on mobile. Adjustable transition speed. Source: [ExpandFrame](https://www.framer.com/marketplace/components/expandframe/)
- Caption: yes, "custom image, label, and link per item" with "animated labels with gradient overlays". Any number of images. Source: [ExpandFrame](https://www.framer.com/marketplace/components/expandframe/)
- Keyboard: not stated. Built as a no-code component, code not shown.
- Port difficulty: easy. It is the canonical flex-grow accordion: `flex: 1` resting, `flex: N` active, opacity/grayscale filter on siblings, label fades in.

**2. AccordGallery** by Hamim Reza, $10 (sold via Lemon Squeezy). Preview: https://frequent-click-784619.framer.app/
- Interaction: "each image smoothly expands on hover while elegantly revealing its caption", "cinematic accordion effect", optional hover scale. Source: [AccordGallery](https://www.framer.com/marketplace/components/accordgallery/)
- Caption: yes, "dynamic captions" with font, size and color controls. Max 6 images (fits five). Source: [AccordGallery](https://www.framer.com/marketplace/components/accordgallery/)
- Touch and keyboard: not stated. Code visibility: not stated.
- Port difficulty: easy, same flex accordion pattern.

**3. Expanding Cards Grid** by Ilkem Ege, $8.
- Interaction: "When a user hovers over a card, it expands while adjacent cards compress, creating a smooth focus effect." Includes "a touch-based pattern" for mobile. Source: [Expanding Cards Grid](https://www.framer.com/marketplace/components/expanding-cards-grid/)
- Caption: content is replaceable; per-card caption not explicitly described. Keyboard not stated.
- Port difficulty: easy to moderate depending on whether it is grid (2D) or a row.

**4. Expandable Cards** by Zaid (@zaidofficial), $5 (Polar). Preview: expandablecardss.framer.website
- Interaction: "accordion-style gallery" with "fluid spring-based animations" that expands panels "on hover or click". Text overlays customizable. Source: [Expandable Cards](https://www.framer.com/community/marketplace/components/expandable-cards/)
- Touch: click trigger implies tap works. Keyboard not stated.
- Port difficulty: easy for layout; spring feel needs either a spring easing approximation in CSS (`linear()` easing) or a JS spring (Motion One / motion.dev).

**5. Image Strip Expander** by Tembase Supply (@lastdraftstudio), $5. Preview: https://base-imagestripexpander.framer.website
- Interaction modes: hover on desktop that "auto-switches to click on mobile", click/tap on all devices, or static. Proximity scaling: "Cards adjacent to the active card automatically adjust their width for a natural, flowing appearance." Expansion set by "Image Render Width" 10 to 100 percent. Transition speed and easing configurable. Source: [Image Strip Expander](https://www.framer.com/marketplace/components/image-strip-expander/)
- Caption: not stated. Keyboard not stated.
- Port difficulty: moderate. The neighbor falloff (dock-style) needs JS to set per-card flex values by distance from active index.

**6. Hover Reveal Pro** by Hamim Reza, $9.
- Interaction: cards expand on hover from "minimal stacked layout" to "detailed content view" with "smooth, spring based motion" and "staggered reveals" where "icons and text fade in with precision timing". Source: [Hover Reveal Pro](https://www.framer.com/marketplace/components/hover-reveal-pro/)
- Caption: yes, title, description, icon and image per card, plus link. Touch and keyboard not stated.
- Port difficulty: moderate (staggered text reveal on top of flex accordion).

**7. Expanded Card** by Shaigexp, Free. Preview: https://glorious-rule-603893.framer.app/
- Interaction: "Hover-to-expand interaction with smooth transitions", full-width imagery with dark overlays, title and paragraph per card. Source: [Expanded Card](https://www.framer.com/marketplace/components/expanded-card/)
- Touch and keyboard not stated. "Copy Component" available, so it can be opened in Framer and its variants inspected for free.
- Port difficulty: easy.

**8. Hover Gallery** by Devique Studio, Free. Preview: https://trustworthy-friday-528508.framer.app/
- Interaction: "each card smoothly jumps to the front, creating a cinematic 'spotlight' effect" with spring transitions. Editable label per card. Source: [Hover Gallery](https://www.framer.com/marketplace/components/hover-gallery/)
- Different model: overlapping stack, z-index promotion, not width redistribution. Touch and keyboard not stated.

**9. Expand Card** by Ahmad, $15. Preview: https://biggest-delivers-516518.framer.app/
- Ten hover modes including expand, zoom, tilt, glow, "blur-neighbors", lift and slide-up, plus ten intro animations. Source: [Expand Card](https://www.framer.com/marketplace/components/expand-card/)
- Listing describes it as a single card component, so no per-card caption collection. Weak fit.

**10. Card Stack Expand** by Soyeb, Free. Stacked cards where the top card enlarges on hover. Source: [Card Stack Expand](https://www.framer.com/marketplace/components/card-stack-expand/). Stack, not a row. Weak fit.

Also surfaced in search but not opened: Expansion Card ([link](https://www.framer.com/marketplace/components/expansion-card/)), Card Expand by Iliyass OULAD ([link](https://www.framer.com/marketplace/components/card-expand/)), ExpandableGallery (click to enlarge in horizontal scroll, [link](https://www.framer.com/marketplace/components/expandablegallery/)), Team Hover Cards ([link](https://www.framer.com/marketplace/components/team-hover-cards/)).

### Inferences
- ExpandFrame and Image Strip Expander are the only Marketplace listings that explicitly solve the hover-versus-tap split, which is the hardest part of this interaction on phones.
- Every Marketplace candidate is a no-code Framer component. Nothing is gained in code by buying one; the value is a reference preview to match motion against.

### Gaps
- Keyboard and focus behavior is undocumented on every Marketplace listing. Assume none.
- ExpandFrame price conflict ($5 on page body vs "Free" in the search title) unresolved.
- Spring parameters (stiffness, damping) are not published for any listing.

## What do third party Framer component sites offer?

### Takeaway
Third party supply is thinner than the Marketplace for this exact pattern. Frameze (Ahmet Loca) is the strongest third party source and the only seller anywhere in this search that documents keyboard support. Framer University, SegmentUI and FrameSpark surfaced no matching image accordion. Framestack, framer.supply, Frameblox, Supercomponents and Framer Universe returned no matching component in search.

### Cited Findings

**11. Reveal Gallery Pro** (Frameze, Ahmet Loca), $8. Preview: https://revealgallerypro.framer.website/
- Interaction: "Click any panel and it expands edge-to-edge with a scale, circle, or wipe reveal animation, while the other panels scale out and fade." Title, description and optional button per panel with staggered reveal. Source: [Reveal Gallery Pro](https://frameze.com/components/reveal-gallery-pro)
- Keyboard: Tab, Enter/Space, Arrow keys, Escape. Touch: swipe left and right between panels. Source: [Reveal Gallery Pro](https://frameze.com/components/reveal-gallery-pro)
- Fit: click-to-fullscreen rather than in-row grow, so heavier than the brief, but its keyboard model is the best documented reference.

**12. Cards Hover Section** (Frameze), $8. Preview: https://cardshoversection.framer.website/
- Hovered image "lifts and brightens while its neighbors dim in a smooth falloff", stated to be "pure CSS". Click opens a modal with tag, title, description and CTA. "Keyboard accessible with focus trap and Escape to close." Dual scrolling rows, optional infinite auto-scroll. Source: [Cards Hover Section](https://frameze.com/components/cards-hover-section)
- Fit: neighbor-dim effect matches; marquee rows and modal do not.

**13. Accordion Images Pro** (Frameze), $8. Full-screen background image reveal per row on hover with zoom-out and mouse parallax, staggered entrance, honors reduced motion. Caption support not stated. Source: [Accordion Images Pro](https://frameze.com/components/accordion-images-pro). Fit: vertical project list, weak fit. Frameze also lists **Cards Gallery** ($8), not opened.

**14. Common Ninja Image Accordion**, free tier "limited to a certain amount of views", paid plans above. Horizontal or vertical direction, title, description and CTA per image, custom CSS allowed. Embedded by a hosted script, so code is not yours. Source: [Common Ninja](https://www.commoninja.com/widgets/image-accordion/framer)

**15. Dynamic Grid** (iricodes on Gumroad), $4, interactive grid for features and portfolios. Interaction specifics not opened. Source: [Gumroad](https://iricodes.gumroad.com/l/dynamicgrid)

**16. Framer University** offers a free Accordion component, but it is a text FAQ accordion, not an image gallery. Source: [Accordion by Framer University](https://accordion.learnframer.site/). Their blog post on avoiding layout jump is relevant to the "no jank" requirement. Source: [Framer University blog](https://framer.university/blog/how-to-avoid-layout-jump-on-framer-websites). Resources page listing showed no expanding gallery. Source: [Framer University resources](https://framer.university/resources)

**17. SegmentUI** free remix library lists "Card Interaction", "Image & Text Slider" and "Curved Carousel" categories but nothing confirmed as an expanding row with captions. Source: [SegmentUI](https://segmentui.com/remix/UI)

### Inferences
- Frameze's keyboard spec (Tab to card, Enter or Space to expand, Arrow keys between cards, Escape to collapse) is a ready-made interaction contract worth copying into a plain HTML build even if the component itself is not bought.

### Gaps
- Framestack, framer.supply, Frameblox, Supercomponents and Framer Universe: no matching component found by search. Not verified by browsing their catalogs directly, so absence is likely but not confirmed.
- No YouTube or blog demo of any listed component was reviewed.

## Which ones look most refined?

### Takeaway
On documented evidence, the shortlist is ExpandFrame (best touch handling and sibling dimming), Expandable Cards by Zaid (spring motion, hover or click), Image Strip Expander (neighbor falloff and explicit hover-to-click switch) and AccordGallery (caption reveal built in, max six). Reveal Gallery Pro is the reference for keyboard behavior. Recommendation for a plain HTML port: model on ExpandFrame's behavior and Frameze's keyboard contract, and build it yourself, since no candidate ships readable code.

### Cited Findings
- Spring motion explicitly claimed: Expandable Cards ("fluid spring-based animations"), Hover Reveal Pro ("smooth, spring based motion", "staggered reveals"), Hover Gallery ("spring transitions"). Source: [Expandable Cards](https://www.framer.com/community/marketplace/components/expandable-cards/); [Hover Reveal Pro](https://www.framer.com/marketplace/components/hover-reveal-pro/); [Hover Gallery](https://www.framer.com/marketplace/components/hover-gallery/)
- Explicit mobile behavior: ExpandFrame (tap, separate mobile expansion amount), Image Strip Expander (hover auto-switches to click on mobile), Expanding Cards Grid ("touch-based pattern"), Reveal Gallery Pro (swipe). Source: sources above
- Explicit keyboard behavior: only Reveal Gallery Pro and Cards Hover Section (Frameze). Source: [Reveal Gallery Pro](https://frameze.com/components/reveal-gallery-pro); [Cards Hover Section](https://frameze.com/components/cards-hover-section)
- Layout jump is a known Framer failure when animating expanding sections. Source: [Framer University blog](https://framer.university/blog/how-to-avoid-layout-jump-on-framer-websites)

### Inferences
- Port sketch for all flex accordion candidates: a flex row with fixed height; each card `flex: 1 1 0` with `min-width: 0`; active card `flex-grow: 4` (or similar); transition `flex-grow` with a spring-like `linear()` easing; caption `opacity` and `translateY` delayed about 100 ms after grow; siblings get `filter: grayscale()` or reduced opacity. Make each card a `button` (or `tabindex=0` with `aria-expanded`) so `:focus-visible` drives the same state as `:hover`; tap toggles via a small JS click handler. Fixed row height avoids vertical layout jump. Phone screenshots should use `object-fit: cover` with a top anchor so the narrow resting state shows the screen header. Effort: about a day for a polished version.
- Animating `flex-grow` triggers layout each frame; for five cards that is cheap, but a FLIP or `transform: scaleX` approach would avoid reflow if jank appears.

### Gaps
- No hands-on comparison of the previews was done in this pass, so "most refined" rests on listing claims, not observed motion. Opening the previews for ExpandFrame, Expandable Cards, Image Strip Expander and AccordGallery side by side is the next step to confirm.
