# Responsive: the most efficient way through, 9 Nov

## Recommendation

Do not rebuild. Tablet and phone layouts already exist for Home, Collection and Framework CS and pass every
layout check. What is missing is his eye on them, on a real phone, page by page. So the efficient path is a
review loop that is fast for him, plus Figma only where he wants to redesign something.

1. **Put the site on his phone today.** Serve the build on the home wifi so he opens it on his own phone
   (Safari, real fonts, real touch). Zero setup, no account. This replaces the old preview link, which is
   private to the first account.
2. **Then a real preview address.** Cloudflare Pages gives every branch its own preview address on the free
   plan. That is the hosting decided on 7 Nov, so setting it up for previews is the same work the domain
   move off Wix (deadline 26 Nov) needs anyway. One job, two wins. Needs his Cloudflare login.
3. **Review one page at a time,** desktop, then tablet, then phone: Home, Collection, Framework CS, Haven.
   I show one picture or the live page, he marks what is wrong, I fix in code, he looks again. Nothing under
   site/ changes before his yes (the review gate already enforces this).
4. **Figma only for the parts he wants to redesign,** not for every breakpoint. His notes already name three:
   the phone hero, case study titles that must never wrap and the Collection list layout. For those, capture
   the coded phone page into the Portfolio Figma file as editable layers (Figma's capture tool), he redesigns
   there in his own tool, and I build it back with the Figma design to code skill. Drawing every page at two
   more widths in Figma first would be the slow way.
5. **Two small additions to the checks:** tap targets at least 44 px on phone (nothing checks this today) and
   Haven's own body at tablet and phone (today only its nav and footer are checked).

What would change this: if he wants Figma to stay the single source of truth for every width, step 4 becomes
"capture every page at 390 and 768" and the review moves into Figma.

## What is built today

- Breakpoints (Phase 3, 9 Nov, not approved): desktop 1200 and up on the Figma grid (12 columns); tablet 768
  to 1199 on 8 columns, 32 margin, 24 gutter; phone under 768 on 4 columns, 20 margin, 16 gutter. Large type
  steps down at each breakpoint in tokens.css.
- Framework CS between 1200 and 1440 scales the whole 1440 layout to the window; under 1200 it stacks in
  reading order.
- Checks: `node scripts/verify-responsive.mjs fit|overlap|size|health all` at 390, 768, 1024, 1200 and 1366.
  All pass after today's copy update (20 of 20 page widths each).
- His first look (9 Nov, one picture): phone hero needs rethinking, list titles must never wrap, the list
  layout reads weird. He wants to go page by page with me.

## Skills checked

Installed skills, bodies read in full or in the parts that matter:

| Skill | Verdict | Why, from its body |
|---|---|---|
| `responsive-design` | Use as a review checklist | Generic list: 44 px touch targets, test on real devices, art direction per breakpoint. The touch target and real device points are the useful ones; its breakpoints (640, 1024) differ from ours and ours win. |
| `layout-grid` | Already applied | 4, 8, 12 columns and margins match what Phase 3 built. Nothing new. |
| `readable-measure` | Use for the tablet review | 45 to 75 characters per line. Tablet is where body text runs widest on the 8 column grid, so measure lines there. |
| `typography-scale` | Leave | Generic ratio scale with a 16 px body floor. Our sizes come from Figma; it adds nothing. |
| `impeccable` | Leave | Its `adapt` command hands the procedure to reference/adapt.md, which is not installed here, so it cannot run. Its design laws (never pure black, OKLCH, a PRODUCT.md first) would fight his Figma. The description promises far more than this install delivers. |
| `figma-generate-design` | Use part of it | It points at Figma's capture tool for turning a coded page into editable Figma layers. That is step 4. The rest (rebuild from a design system) is not needed. |
| `figma-design-to-code` | Use for step 4 | The route back from his Figma redesign into code; it requires matching the Figma screenshot and reusing our existing components. |
| `skill-shortlist` | Used | Ran this check. |

Internal catalog search (SearchSkills, SearchPlugins): no responsive skill made for this project or account.
The plugin catalog offers Responsive Check (screenshots at phone, tablet and desktop plus overflow checks),
Figma to Code (community), Website Design (UXKIN) and Snagly (visual regression). None is worth adding:
Responsive Check and Snagly repeat what verify-responsive.mjs already does, Figma to Code repeats the official
Figma plugin we have, and Website Design would bring its own design direction to a site that already has one.

## Outside research

- Figma capture, code to canvas: a running page becomes editable Figma layers in an existing file; captures are
  flat (not linked to components) but bind matching variables. Needs the remote Figma MCP server.
  https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/
- Cloudflare Pages previews: every non production branch gets its own preview address, unlimited previews on
  the free plan, 500 builds a month. https://developers.cloudflare.com/pages/platform/limits/ and
  https://developers.cloudflare.com/workers/previews/
- Fluid type with clamp(): sizes slide smoothly between a phone and a desktop size instead of jumping at each
  breakpoint. Worth a look for the large Display and Heading sizes in the 768 to 1199 band, his call after
  review. https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp and
  https://utopia.fyi/blog/clamp/
- Container queries (size) are Baseline widely available since August 2025, so components such as the work
  cards could respond to their own width rather than the window. Not needed for four static pages; noted in
  case the card layout fights the breakpoints.
  https://web-platform-dx.github.io/web-features-explorer/features/container-queries

## What I need from you

- A yes to put the site on your phone over the home wifi (your Mac serves it; only devices on your network can
  open it).
- Your Cloudflare login when you are ready for the preview address and the domain move.
- Page by page reviews: about 10 minutes each, four pages.
