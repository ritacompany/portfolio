# Full homepage style audit, 19 Sep 2026

## Scope and evidence

This audit compares the implemented homepage in `site/` with the current Figma `VC` page, file
`IarvWaqjIwrZ2afQmMxKm6`. The inspected source nodes are Master `3461:7711`, work `3623:6385` and footer
`3664:5053`. Results marked exact were checked against Figma node data, authored CSS tokens and fresh browser
computed styles. Confidence means strength of evidence, not visual intuition.

Two current Figma differences are intentionally excluded from production matching. The extra alternate hero frame
is a temporary holding screen. The raw current frame order places the Mondai index immediately after work, while the
approved production order remains About, Superpowers then Mondai. Both exclusions are known with 100 percent
confidence. Neither was treated as a style mismatch or silently copied into production.

## Exact matches

| Role | Figma contract | Production result | Confidence |
| --- | --- | --- | --- |
| Hero biography | Label/14, Satoshi Medium 500, Neutral/050 and Neutral/500 | Exact named style, weight, metrics and range colors | 100%, source and computed style verified |
| Relocation note | Label/14, Satoshi Medium 500, Neutral/500 | Exact named style, weight, metrics and color | 100%, source and computed style verified |
| Navigation | Link/14, Satoshi Medium 500, Neutral/100 | Exact named style and color, contact emphasis remains Satoshi Bold 700 | 100%, source and computed style verified |
| Work titles | Heading/24, Satoshi Medium 500, 24px, 132%, 0.2% | Mondai Neutral/050, Haven Neutral/100, fixed at every viewport | 100%, source and computed style verified |
| Work marker | Metadata/Mono/12, Space Mono Regular 400, Neutral/100 | Current two line parenthesized marker and exact 5 by 24px brackets | 100%, source, asset and computed style verified |
| Work support | Label/14, Satoshi Medium 500, Neutral/200 | Exact style, weight, metrics and color | 100%, source and computed style verified |
| About statement | Heading/64, Satoshi Medium 500, Neutral/050 | Exact desktop style with approved 40px tablet and 32px mobile tiers | 100%, source and computed style verified |
| About introduction | Heading/24, Satoshi Medium 500, Neutral/500 | Exact desktop style with approved 18px mobile tier | 100%, source and computed style verified |
| Superpower statements | Heading/40, Satoshi Medium 500 | Line fills are Neutral/050, Neutral/500 and Neutral/550 in source order | 100%, source and computed style verified |
| Mondai support | Body/16, Satoshi Medium 500, Neutral/400 | Exact desktop style with approved tablet size tier | 100%, source and computed style verified |
| Case rows | Heading/40, Satoshi Medium 500, Neutral/100 with range emphasis | Exact desktop style with approved 32px tablet and 24px mobile tiers | 100%, source and computed style verified |
| Overview label and copy | Heading/24, Satoshi Medium 500 | Overview uses Neutral/100, Current role label uses Neutral/050 | 100%, source and computed style verified |
| Footer opportunity copy | Heading/20, Satoshi Medium 500, Neutral/500 with Bold 700 Neutral/050 emphasis | Exact style, metrics, colors and 477px desktop measure | 100%, source and computed style verified |
| Footer metadata | Metadata/Mono/14, Space Mono Regular 400, Neutral/100 | Exact style for location, clock, LinkedIn and email | 100%, source and computed style verified |
| Display lettering | Per-character Figma tracking on CHADWICK, Superpowers and Mondai | Art-directed spans preserve individual tracking; LET'S and CONNECT use exact vector exports | 100%, source and asset verified |

## Layout and asset matches

| Area | Current contract | Production result | Confidence |
| --- | --- | --- | --- |
| Work media | Mondai 895 by 590, Haven 426 square, 39px desktop gap | Exact exports and ratios; shared media bottom and metadata baseline | 100%, natural size and browser geometry verified |
| Work responsiveness | Preserve 895 to 426 asymmetry while split, stack before collision | Ratio-preserving grid from 680px, shared subgrid rows, stack below 680px, 1920px canvas ceiling | 100%, browser geometry verified at nine widths |
| Superpowers detail | Circle node `3654:4407`, 222px square | Exact exported vector and 222px desktop render | 100%, asset and browser geometry verified |
| Overview rules | Top rule on each row, no final bottom rule | Exact border structure | 100%, source and computed style verified |
| Footer inset | Opportunity copy, LET'S and metadata share the same left inset | One responsive `--footer-inline` token controls all three | 100%, browser geometry verified across approved widths |
| Footer text rhythm | 12px visual gap between both left texts and both right texts | Text-height rows own spacing; 13px arrows are absolutely positioned and do not change row height | 100%, browser geometry verified |

## Corrected drift

1. The work exports and Mondai collection marker had fallen behind the current Figma node. They now use the current
   895 by 590 and 426 by 426 assets, Metadata/Mono/12, Neutral/100 and exact bracket vectors.
2. Footer copy, LET'S and metadata did not share one inset at every width. They now use one responsive inset token.
3. Footer contact icons made the right text rows taller than the left text rows. Icons are now positioned inside
   text-height rows, producing the same visual 12px text gap on both sides.
4. All three superpower statements incorrectly inherited Neutral/050. Their distinct Neutral/050, Neutral/500 and
   Neutral/550 fills are restored.
5. The 222px Superpowers circle was absent from production. The exact current Figma asset is restored.
6. Overview had an extra rule after the Current role row. Rules now appear only at the top of the two Figma rows.

## Intentional responsive differences

The current Figma frame is a 1440px desktop reference, not a complete responsive specification. Approved role tiers
are used only where a fixed desktop value would fail at smaller widths. Work titles, work support, marker text,
navigation and footer metadata never scale. The About statement, case rows, superpower statements and long-form
About copy use the approved tablet and mobile tiers recorded in `docs/HOMEPAGE_RESPONSIVE_SPEC.md`.

The Mondai supporting sentence retains its accepted tablet placement. It is a responsive interpretation rather than
a pixel copy of the 1440 frame. This is recorded separately because the owner explicitly accepted it for now.

## Color and font inspection

CSS tokens are authored as hexadecimal values. Browser inspection APIs normalize computed colors to `rgb(...)`, so
an RGB value in the Codex inspection panel does not mean the implementation stopped using the Figma hexadecimal
token. Add `?design-audit=1` to the preview URL to see the Figma token name, hexadecimal value and computed result
together.

The family string `Satoshi, Arial, sans-serif` is a fallback stack. Satoshi is the primary face. Arial and the generic
sans-serif family are used only if the local Satoshi file cannot load. Browser font loading checks confirm the active
Satoshi Medium 500, Satoshi Bold 700 and Space Mono Regular 400 faces load from local assets. Satoshi Regular 400 is
also declared locally for any future regular-weight use, but no current audited text role requests it.

## Remaining differences

There are no unresolved style, color, weight or footer-alignment mismatches within the implemented production
composition. The only known source differences are the temporary Figma holding frame, the intentionally retained
approved section order and the accepted tablet placement noted above.
