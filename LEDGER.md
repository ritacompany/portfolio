# LEDGER / Portfolio case studies
Updated: 2026-08-22

## Objective
Rebuild Metalab case-study layouts as own HTML, driven by the Satoshi type system, imagery replaced by #040405 placeholder blocks at true container sizes.

## Now
All 10 case studies built and verified in build/: midjourney, robinhood, uber, suno, atoms, the-atlantic, calvin-klein, headspace, ro, windsurf. That's the original 7 (plus midjourney, robinhood) plus the 2 extra pages Chadwick approved (ro, windsurf) once the live site turned out to list 9 case studies, not 7. Every file verified at 1440/1200/967/768/390 with zero horizontal overflow (windsurf/ro/headspace/calvin-klein/atoms/the-atlantic/suno/uber checked at 1440+390; midjourney+robinhood checked at the full 5-breakpoint set). Next: none queued — see Open for a scope question that came up mid-build and hasn't been acted on.

## State
- Fonts received: Satoshi 10 faces (.otf), Geist Mono 6 faces (.ttf) ✓
- Converted all 16 to WOFF2 (embedded as base64 in each build/*.html) ✓
- Subset Satoshi Regular/Medium/Bold to Latin, ~13.7KB each, ~55KB base64 total ✓
- Type token layer: 11 approved roles ✓ (2 flagged display tokens removed, see Decided)
- 10/10 build/*.html files complete, self-contained, verified per above ✓
- Files are NOT uniformly lean — some later pages (e.g. headspace.html, ro.html) still carry a leftover unused `.t3i` base ruleset copied forward from an earlier page's template that this particular page doesn't use. Harmless (dead CSS, no visual effect) but not cleaned up. Low-priority; would take a pass across all 10 files to fix.
- Discovered while pulling Robinhood's live DOM: metalab.com's nav lists 9 case studies beyond Midjourney, not the 7 originally logged (`ro` and `windsurf` weren't in the original scope list). Chadwick approved both — done.
- Discovered while pulling Atoms/Calvin Klein/Headspace/Ro's live DOM: their "next case study" links point to 4 pages not in the nav and not built here — **Genies** (from Atoms), **Pitch** (from Calvin Klein), **The Athletic** (from Headspace), **Upwork** (from Ro). These may be archived/delisted case studies rather than current scope — Windsurf's own "next" link points back to Suno, i.e. closes the loop within the known 10, which is a point toward the 4 strays being stale leftovers rather than missing scope. Not investigated further. See Open.

## Decided
- Metalab grid replicated exactly: 6-col modules, 12-col StatRows, gutter 16px mobile / 24px desktop, vertical gutter 140/180, single breakpoint at 967px (carousel padding breakpoint at 768px). Why: their whole layout derives from it.
- Metalab body copy kept in place as scaffold. Why: section heights are calibrated to that text length. NOT shippable, replace before publishing.
- Nav and footer rebuilt neutral, no Metalab branding or link labels. Why: chrome is not case-study layout.
- Embed fonts as base64 WOFF2 in a single self-contained HTML per page. Why: file previews and travels intact. Ruled out: linked font files, OTF/TTF embedding.
- Case-study build ships Satoshi Regular/Medium/Bold only. Why: system forbids mono in case studies; Light/Italic unused by the 11 roles.
- Hybrid responsive: clamp() for Heading 88 / Narrative 64 / Narrative 40 / Heading 28 / Lead 20; fixed px for Body 16, Metadata 14/16, Structure 12, Evidence 11/12.
- Placeholder imagery = solid #040405 at the source container's exact box and aspect ratio, on every module including brand-color swatches (Ro) — the project deliberately never reproduces real content/color, so a "show the actual brand colors" module gets the same neutral placeholder treatment as everything else.
- Hero section cut entirely on every page, not just re-tokened — Chadwick isn't copying the header/opening section on any page.
- Next-case-study ticker/CTA section (bottom of page, marquee + link card) cut entirely on every page, same reasoning as hero.
- Stat numbers (the big digits in StatRows) get their own token `--t-stat`, decoupled from `--t-h88`, so a future change to Heading 88 (real headline text) doesn't silently resize stat digits.
- Page background is `#18181B`, not `#000`. Placeholder hairline border removed — `#040405` reads fine against `#18181B` without it.
- Bespoke, page-specific scroll/animation components (Calvin Klein's `CalvinKleinCustomScroller`, Headspace's `HeadspaceLotties` and `CardsPanningWithVideo`) get simplified to plain static placeholder geometry — same "keep the geometry, drop the JS" call as the carousel and video-scroller. `HeadspaceLotties` specifically has no static height in its own CSS at all (fully JS/Lottie-sized, and its SectionContainer rule zeroes out its own spacing to overlap the previous section) and carries no text — it's dropped entirely rather than approximated, same treatment as hero/ticker.
- Per-page build files stay self-contained (only the layout variants that page actually uses) rather than growing one shared CSS file with every variant across all 10 pages.
- Module → build-class mapping, final (component name → build class, "new" marks which page introduced it):
  - TitleAndText (position-1/2/3) → `.tt` / `.tt--p2` / `.tt--p3` (Midjourney)
  - TextAnd1Image layout1 (media right/order-2, text left) → `.t1i` (Midjourney)
  - TextAnd1Image layout2 (media left, text right) → `.t1i--l2` (Robinhood)
  - TextAnd1Image layout3 (media full-bleed, text below-left or media-only) → `.t1i--l3` (Robinhood)
  - TextAnd1Image layout4 (smaller full-bleed media, text right) → `.t1i--l4` (Suno)
  - TextAnd3Images layout1 (2×2 grid, text bottom-right, all 3 media same size) → `.t3i` (Midjourney)
  - TextAnd3Images layout2 ("a a"/"b c"/"b d") → `.t3i--l2` (Robinhood)
  - TextAnd3Images layout4 (flex-wrap, two half-width + small right-aligned third) → `.t3i--l4` (Robinhood)
  - TextAnd3Images layout6 (2/3 tall left + two 1/3 stacked right, `noFirstColumnText` variant used) → `.t3i--l6` (Windsurf)
  - TextAnd2Images layout1 ("a b"/"c c", two equal top images + full-width text/media-only below) → `.t2i--l1` (Calvin Klein)
  - TextAnd2Images layout2 ("a c"/"b c", text top-left/media bottom-left/tall media right) → `.t2i--l2` (Uber)
  - TextAnd2Images layout3 ("a b"/"a c", tall media left/small media top-right/text bottom-right) → `.t2i--l3` (Uber)
  - TextAnd2Images layout4 (80/20 split + small bottom-right media) → `.t2i` base (Midjourney's original "T2I", identified later as this component; Uber)
  - TextAnd2Images layout5 — geometrically identical to layout2 when there's no text (only difference is which grid area the absent text would occupy), so **reused `.t2i--l2` directly** rather than adding a `.t2i--l5` class (Windsurf)
  - MediaSliderAndText (horizontal carousel, alternating tall/wide tiles, optional caption) → `.car` / `.car__caption` (Robinhood; caption added Suno)
  - VideoScrollerAndText (scroll-scrubbed video + side caption) → `.vsc` (Suno). Static build: fixed vw height instead of scroll-driven, drops sound/play controls.
  - StatRows/Outcomes → `.stats` (Midjourney)
  - ReviewCardWithBackground (full-height bg image + floating quote card) → `.rc` (Atoms). Quote reuses Narrative 40, byline reuses Metadata 14 — both match source sizes exactly, no new token.
  - Quote (image column + quote/author column, two images: main + secondary) → `.qt` (Headspace)
  - MinimalQuote (small image + quote/author, right-shifted single testimonial) → `.mq` (Windsurf)
  - BrandColors (row of N equal swatch blocks) → `.bc`, `--count` read from the live page (5, Ro)
  - HoverRevealImage — geometrically identical to `.t1i` layout1 (same grid-column/height/order values), so **reused `.t1i` directly**, no new class (Ro)
  - CalvinKleinCustomScroller (300vh sticky-scroll SVG sequence, page-specific) → simplified to a single static `.vsc__media`-style block, no caption (Calvin Klein)
  - CardsPanningWithVideo (fixed-height panning video, page-specific) → `.cpv` (Headspace)
  - HeadspaceLotties (JS-sized Lottie loop, no static height, no text) → dropped entirely, same as hero (Headspace)
  - `.sc--tight` utility: media-only section immediately followed by another media-only section gets reduced bottom margin instead of the full vertical gutter, approximating source's `SectionContainer_collapseBottomSpacing`. Applied heuristically (whenever two media-only sections are adjacent) rather than checked per-instance against the live `collapseBottomSpacing` DOM flag for every page after Robinhood — a deliberate scope/time tradeoff, flagged here rather than silently done. Worth a spot-check later if exact vertical rhythm ever matters more than it does for a placeholder build.

## Don't
- No container-side scraping of metalab.com from a sandboxed cowork container — that egress returns 403. NOT a problem for Claude Code's own Browser tool, confirmed reaching metalab.com directly across all 10 builds.
- WebFetch alone is useless here. Why: body copy is client-rendered, only hero metadata is in the served HTML. Use the Browser tool + JS execution against `document.styleSheets` and the live DOM instead.
- No Geist Mono in case studies. No new text styles for one-off layout problems — every new module's text reused an existing 11-role token (r-n40, r-body, r-lead, r-meta-k, r-struct); none needed a new size.
- Do not touch typography in the locked Header/opening or Background/Context sections. Moot for build purposes since neither ships.
- Don't assume a "swiper-slide" query returns only real slides — Swiper sometimes duplicates slides for loop mode (saw this on Midjourney's carousel extraction attempt); cross-check with `.swiper-slide-duplicate` or a plain element count if a slide count looks suspiciously doubled.

## Open
- The 4 stray "next case study" targets (Genies, Pitch, The Athletic, Upwork) — confirm with Chadwick whether these are in scope, or archived/delisted pages not worth chasing. Leaning toward the latter since Windsurf's own "next" link closes the loop back into the known 10 rather than pointing further outward.
- Unused-CSS cleanup pass across build/*.html (see State) — cosmetic, not blocking.
- Real image sourcing/replacement of the scaffold body copy was always going to be a separate pass per the original Decided note ("NOT shippable, replace before publishing") — still true, still not started, now applies to all 10 files instead of 1.

## Parked
(none — active in Claude Code)

## Reference
- Extraction method, confirmed working across all 10 pages: open the live page with the Claude Code Browser tool (`mcp__Claude_Browser__*`), then run JS in-page (`javascript_tool`) to (1) list `[class*="SectionContainer_SectionContainer"]` elements in DOM order with their first few descendant class names to identify each section's component + layout-variant number, (2) walk `document.styleSheets` for CSSRules whose selector includes the component names to pull the real height/grid-column/vw formulas per layout variant and breakpoint, (3) read `section.innerText` (or targeted child selectors when a section mixes multiple text fields, e.g. StatRows' title/rowTitle/rowDesc or a carousel's caption) for scaffold body copy. Root CSS vars (`--gutter`, `--vertical-gutter`) confirmed identical to the locked token system on every page checked — no need to re-derive those per page.
- New component discovered mid-page → don't guess its geometry: run the same targeted `document.styleSheets` walk scoped to that component's class-name prefix (e.g. `['ReviewCardWithBackground']`) before writing any CSS for it. Every module in this build was extracted this way, including the one-off page-specific ones (CalvinKleinCustomScroller, HeadspaceLotties, CardsPanningWithVideo) — the "is this reusable or one-off" call came after seeing the real CSS and class-name prefix (a page-specific prefix like `CalvinKleinCustomScroller_` is itself the signal that it won't appear on another page), not before.
