# Gates: homepage Figma text-style fidelity audit

OWNS: site/index.html, site/styles.css, site/homepage.js, site/assets/mondai-card-vc.png, site/assets/haven-card-vc.png, site/assets/logo-master.svg, site/assets/footer-arrow-master.svg, site/assets/bolt-master.svg, scripts/verify-homepage-fidelity.mjs, GATES.md, docs/FIGMA_TEXT_STYLE_AUDIT_2026-09-27.md, docs/DECISIONS.md, NEXT.md

Scope: Match the current Master and recorded owner amendments in every visible text role, prove local Satoshi face loading and validate the responsive page and Mondai dialog.

Continuation scope, 28 September 2026: resolve font size, line height and letter spacing from the current Figma nodes for every visible homepage text role. Preserve the owner attribution exception and check the browser cascade at every required width.

- [x] G9: the typography audit records the exact current Figma metrics and every correction for all visible homepage text roles
  EVIDENCE: Refreshed Master 3461:7711 and focused nodes 3786:6582, 3623:6385, 3776:5770, 3852:4441, 3744:2792 and 3744:2843 on 28 September. The audit table now distinguishes source node tracking, owner attribution exception and corrected browser results for every visible homepage text role. Dialog and skip link are labeled as implementation UI without a Master text node.

- [x] G10: computed family, weight, size, line height, tracking and color match the documented contract at six viewport widths
  EVIDENCE: Browser sweep at 1440, 1159, 768, 767, 390 and 320 CSS pixels checked 16 role selectors, all their matching text nodes, About heading metrics, CHADWICK base and seven tracking spans, text opacity, Satoshi face availability, font synthesis and color. The first sweep exposed the 10 pixel mobile collection marker; after correction its computed size, line height and tracking passed at 320 pixels with zero overflow. No other metric mismatch remained.

- [x] G11: fresh screenshots at all six widths are viewed and no material typography defect remains
  EVIDENCE: Viewed fresh full-page output/playwright/type-metrics-1440.png, type-metrics-1159.png, type-metrics-768.png, type-metrics-767.png, type-metrics-390.png and type-metrics-320.png after the final CSS edit. Compared the 1440 composition with the current Figma context and checked text rhythm, wrapping and clipping at every width. Also viewed the Mondai dialog at desktop and its 320 pixel viewport capture. No material typography defect remained.

- [x] G12: asset loading, overflow, focus and Mondai dialog behavior still pass after the typography repair
  EVIDENCE: Browser returned successful responses for the stylesheet, script, all three Satoshi files and both work images. Horizontal overflow was zero at 1440, 1159, 768, 767, 390, 320 and 720 CSS pixels, the last representing a 200 percent effective width from 1440. At 320 the Mondai trigger had a visible solid focus outline; opening focused Close, exposed three links, and Escape hid the panel and restored trigger focus. The final dialog viewport produced no console or page errors.

- [x] G0: this ledger has valid, fail-capable acceptance gates
  CHECK: node /Users/chadwickfenner/.codex/skills/unlazy/scripts/gate-lint.mjs GATES.md
  EXPECT: LINT OK
  EVIDENCE: Reexecuted the inspected command directly on 2026-09-28; exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=15f476b46550/25 entries; EXPECT=matched; output-sha256=4920de2a80671d4847259540fb4b7d6847cbb3642880388fbbcac9b7de754220; output-bytes=1712

- [x] G5: the documented text-style audit maps every visible text element to current Figma context, the owner exception or both
  EVIDENCE: `docs/FIGMA_TEXT_STYLE_AUDIT_2026-09-27.md` now records each visible text node, exact Figma fill, browser selector and computed value. It isolates the owner attribution exception from reusable roles.

- [x] G6: local Satoshi Regular, Medium and Bold faces load without font synthesis and computed text styles match the audit at 1440 pixels
  EVIDENCE: The corrected browser sweep verified every audited role uses Satoshi with `font-synthesis: none`, with Satoshi Regular at 400 only for the attribution and Medium at 500 for shared roles.

- [x] G7: all specified viewport captures are visually reviewed and have no confirmed text-style mismatch
  EVIDENCE: Viewed corrected full-page captures at 1440, 1159, 768, 767, 390 and 320 px. The full audit sweep found zero role-color, role-weight, synthesis or horizontal-overflow failures.

- [x] G8: keyboard focus, 200 percent zoom and Mondai open, Escape and focus restoration pass at the applicable widths
  EVIDENCE: At 320 px, Mondai opened with focus on Close, exposed three destinations, closed with Escape and restored focus to its trigger. The prior 200 percent zoom check remains unaffected by these color-only corrections.

- [x] G1: all current Master assets, token values and owner amendments are represented directly in the homepage source
  CHECK: node scripts/verify-homepage-fidelity.mjs source
  EXPECT: source fidelity verified
  EVIDENCE: Reexecuted the inspected command directly on 2026-09-28; exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=15f476b46550/25 entries; EXPECT=matched; output-sha256=cb251760d9e5bd3fe1990cba712a6948251ce8b0ddc65d75ad55a7b2400e7c14; output-bytes=25

- [x] G2: responsive source rules preserve a vertical About introduction, one-column narrow content and accessible Mondai navigation
  CHECK: node scripts/verify-homepage-fidelity.mjs responsive
  EXPECT: responsive fidelity verified
  EVIDENCE: Reexecuted the inspected command directly on 2026-09-28; exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio; path=15f476b46550/25 entries; EXPECT=matched; output-sha256=49a1be09cc7fb6eedf408349c55e4d4ffd182ca1d249c12452ea0e96a81456c1; output-bytes=29

- [x] G3: the Figma reference and fresh browser captures are visually compared at desktop, compact, tablet and mobile widths with every found defect repaired
  EVIDENCE: 2026-09-27, viewed fresh captures at 1440, 1159, 768, 767, 390 and 320 px. Repaired the substituted cards, logo and arrows, the relocation header copy, joined About heading words and horizontal About paragraph layout. The desktop Figma reference was checked at 1440 px after those repairs.

- [x] G4: keyboard and viewport checks confirm no horizontal overflow, visible focus and a working Mondai selector at every structural boundary
  EVIDENCE: 2026-09-27, viewport metrics found scroll width equal to client width at 1440, 1159, 768, 767, 390 and 320 px. At 390 and 320 px every visible control stayed within the viewport. A five-step browser zoom check had no horizontal overflow. At 320 px, Mondai opened with focus on Close, listed exactly three destinations and Escape restored focus to the trigger. Preview console had no warnings or errors.
