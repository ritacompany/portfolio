# Figma implementation audit

## Source snapshot

- Inspected: 19 Sep 2026
- File: `IarvWaqjIwrZ2afQmMxKm6`
- Page: `VC`
- Homepage frame: `Master`, node `3461:7711`, 1440 by 7827.230 pixels
- Work section: node `3623:6385`
- Footer: node `3664:5053`, 1440 by 805.988 pixels
- Portfolio variable collection: `01 Portfolio`, `Value` mode
- Complete text-node record: `docs/FIGMA_TEXT_STYLE_INVENTORY.md`

This file records the contract between the live Figma source and `site/`. It does not replace a fresh Figma inspection. Every implementation pass must refresh the affected nodes before code changes.

## Color contract

- Neutral/050, `VariableID:2712:14314`, maps to `--portfolio-neutral-050`, `#f2f1f8`.
- Neutral/100, `VariableID:2712:14315`, maps to `--portfolio-neutral-100`, `#e8e7ee`.
- Neutral/200, `VariableID:2712:14316`, maps to `--portfolio-neutral-200`, `#dedee5`.
- Neutral/300, `VariableID:2712:14317`, maps to `--portfolio-neutral-300`, `#d2d2db`.
- Neutral/400, `VariableID:2712:14318`, maps to `--portfolio-neutral-400`, `#c9c9d4`.
- Neutral/500, `VariableID:2712:14319`, maps to `--portfolio-neutral-500`, `#aeaeb4`.
- Neutral/550 maps to `--portfolio-neutral-550`, `#7b7b86` for the third Superpowers statement.
- Neutral/575, `VariableID:3236:20933`, maps to `--portfolio-neutral-575`, `#65656e`.
- Neutral/600, `VariableID:2712:14320`, maps to `--portfolio-neutral-600`, `#38383d`.
- Neutral/675, `VariableID:3335:720`, maps to `--portfolio-neutral-675`, `#28282b`.
- Neutral/800, `VariableID:2712:14322`, maps to `--portfolio-neutral-800`, `#18181b`.
- Neutral/900, `VariableID:2712:14323`, maps to `--portfolio-neutral-900`, `#040405`.

The hero display fill `#fbf7f8`, footer plug fill `#d9d9d9` and plug label black are intentionally unbound in Figma. They remain named implementation tokens. The large Mondai collection marker is visually Neutral/100 but is not variable-bound in Figma.

## Type contract

- Label/14, `S:9ed4188967c33d8096af5354d069e59d2607f550,`: Satoshi Medium, 14, 140%, 2%.
- Link/14, `S:c568449a070b33787c60ce91c792f81e1df6ed96,`: Satoshi Medium, 14, 100%, 2%.
- Metadata/Mono/12, `S:d881e2d86883e6779341d284199ff57378d9adab,`: Space Mono Regular, 12, 112%, 1%.
- Metadata/Mono/14, `S:7576b473abd96bd0f59b343b6664d8464e12819b,`: Space Mono Regular, 14, 140%, 1%.
- Body/16, `S:ca45dd5b32fdda8ff137cbb7056d6f975b1cdf8b,`: Satoshi Medium, 16, 140%, 1%.
- Heading/20, `S:be498163963274cd22380fbed07f8d5ee444cc42,`: Satoshi Medium, 20, 132%, 2%.
- Heading/24, `S:fff9bfaa5ef233e7a9e367f6bf36cc5b25b5aa38,`: Satoshi Medium, 24, 132%, 0.2%.
- Heading/40, `S:243470f45ad3ec38027cfaf09c8966d55c4c2456,`: Satoshi Medium, 40, 110%, minus 2%.
- Heading/64, `S:c445b5d09ff72149f7d9bb260aa95b6af7a49590,`: Satoshi Medium, 64, 109%, minus 4%.

The work-card Mondai and Haven titles had no text style in the live Master. Their values were 27.018 Bold and 28 Bold, which are not members of the local type system. Both Figma nodes are now repaired to Heading/24, with their existing Neutral/050 and Neutral/100 color bindings preserved. Production uses the same fixed Heading/24 token at every viewport.

CHADWICK, Superpowers and the large Mondai word retain per-character tracking overrides on top of their display styles. The footer LET’S and CONNECT lettering remains exported from the exact vector nodes. The plug label is the only remaining fully detached text node because it is part of that art-directed lockup.

## Current footer contract

At the 1440 pixel reference:

- Footer height: 805.988 pixels.
- Equalizer: 134 pixel row, 17 pixel gap and 63 pixel row.
- Opportunity copy: Heading/20, 477 pixels wide, Neutral/500 with Neutral/050 bold emphasis.
- Copy: `I’m currently living in` followed by `Chicago, but *looking for opportunities in NYC.*`.
- LET’S vector: 381.183 by 122.583 pixels.
- Plug: 164.491 by 230.988 pixels.
- CONNECT vector: 728 by 178.746 pixels.
- Footer metadata: Metadata/Mono/14 with Neutral/100 and 12 pixel row gaps.
- Footer side inset: 40 pixels.

Reference captures: `output/figma-reference/work-3623-6385-20260918-heading24.png` and
`output/figma-reference/footer-3664-5053-20260918.png`. Browser captures for 320, 390, 768, 1050, 1160 and 1440
pixels live in `output/playwright/figma-audit/`.

## 19 Sep fidelity reconciliation

The current work source uses exact 895 by 590 and 426 by 426 exports. Its two-line parenthesized collection marker
is node `3671:5299`, Metadata/Mono/12 and Neutral/100. Production preserves the 895 to 426 asymmetric columns while
split, uses a shared subgrid baseline and stacks below 680 pixels.

The footer opportunity copy, LET'S lockup and metadata now share one responsive inset at every approved width. The
13 pixel contact arrows are positioned inside text-height rows, so the visual text gap on the right exactly matches
the 12 pixel location and time gap on the left.

The wider page audit also corrected three source drifts outside the footer. The Superpowers statements now use
Neutral/050, Neutral/500 and Neutral/550 in order. Circle node `3654:4407` is restored as an exact 222 pixel asset.
Overview now uses a top rule for each row without an extra final bottom rule.

The current Figma page contains an alternate hero holding frame and a raw ordering that differs from the approved
production sequence. Those temporary structural differences are documented exclusions, not undiscovered style
drift. The complete itemized result is in `docs/FULL_STYLE_AUDIT_2026-09-19.md`.

## Process correction

The earlier checks accepted detached node values as authoritative even when those values were outside the named type system. That was the process failure behind the 27 pixel Mondai title. The verifier now fails when a reusable component title uses an arbitrary detached size. It separately allows documented display lettering, checks all 43 Master text nodes and checks computed type and color across the six approved viewport widths.
