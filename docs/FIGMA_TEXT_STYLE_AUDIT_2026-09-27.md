# Master text-style audit, 27 September 2026

Superseded on 29 September 2026 by the DECISIONS entry of that date. Several values below, including Label/14 weight and tracking, do not match the current Master.

Source: Portfolio Design, VC page, Master `3461:7711`. Focused context was refreshed on 28 September 2026 for hero `3786:6582`, work `3623:6385`, About opening `3776:5770`, Superpowers `3852:4441`, Overview and Current role `3744:2792` and footer `3744:2843`. Browser values below are captured at 1440 CSS pixels after `document.fonts.ready`. The 27 September pass checked colors and weights but did not verify all text metrics. This continuation checks the node-level size, line height and tracking as well.

The opening attribution is the owner amendment. It deliberately overrides the detached Master source value: `#c9c9da`, 400 weight. Removed relocation copy remains removed from the implementation. The Master still shows it, so it is not reintroduced.

| Section and text | Figma node and source style | Figma type and fill | Current selector and computed browser style | Required correction |
| --- | --- | --- | --- | --- |
| Hero display, CHADWICK | `3786:6583`, documented per-character display exception | Satoshi Medium, 500, 302px, 302px; base tracking minus 5.5 percent, with C and D at minus 7 percent, HA and W at minus 5 percent, I at minus 8 percent, second C at minus 7 percent; `#fbf7f8` | `#page-title` and its spans, 302px and 302px line height at 1440px, minus 16.61px base tracking and matching span values; `rgb(251, 247, 248)` | Corrected fixed pixel tracking to proportional values at responsive sizes. |
| Hero bio, muted spans | `3786:6589`, Label/14 | Satoshi Medium, 500, 14px, 19.6px, minus 0.14px; `#aeaeb4` | `.hero-bio`, Satoshi 500, 14px, 19.6px, minus 0.14px, `rgb(174, 174, 180)` | Corrected tracking from plus 0.28px. |
| Hero bio, Product Designer | `3786:6589`, inline Bold exception | Satoshi Bold, 700, 14px, 19.6px, minus 0.14px; `#f2f1f8` | `.hero-bio strong`, Satoshi 700, 14px, 19.6px, minus 0.14px, `rgb(242, 241, 248)` | Inherits corrected tracking. |
| Hero relocation | `3786:6591`, Label/14 | Satoshi Medium, 500, 14px, 19.6px, minus 0.14px; `#aeaeb4` | No selector, intentionally absent | Owner amendment removes it. |
| Navigation, Home and About | `3786:6593`, `3786:6594`, Label/14 | Satoshi Medium, 500, 14px, 14px, 0.28px; `#e8e7ee` | `.site-nav a`, Satoshi 500, 14px, 14px, `0.28px`, `rgb(232, 231, 238)` | None. |
| Navigation, Contact | `3786:6596`, Label/14 Bold | Satoshi Bold, 700, 14px, 14px, 0.28px; `#040405` | `.contact-link`, Satoshi 700, 14px, 14px, `0.28px`, `rgb(4, 4, 5)` | None. |
| Work title, Mondai | `3652:4339`, Heading/20 | Satoshi Medium, 500, 20px, 26.4px, normal tracking; `#f2f1f8` | `.project-title`, Satoshi 500, 20px, 26.4px, normal, `rgb(242, 241, 248)` | Corrected tracking from plus 0.2px. |
| Work marker, slash | `3712:3289`, documented attached marker | Satoshi Medium, 500, 24px, 27.84px, 1.44px; `#d2d2db` | `.project-marker > span`, Satoshi 500, 24px, 27.84px, `1.44px`, `rgb(210, 210, 219)` | None. |
| Work marker, case study collection | `3712:3293`, Label/12 Bold | Satoshi Bold, 700, 12px, 16.8px, 0.96px; `#e8e7ee` | `.project-marker strong`, Satoshi 700, 12px, 16.8px, `0.96px`, `rgb(232, 231, 238)` at every width | Removed a 10px override below 360px. |
| Work descriptions, Mondai and Haven | `3652:4344`, `3652:4361`, Label/14 | Satoshi Medium, 500, 14px, 19.6px, minus 0.14px; `#dedee5` | `.project-description`, Satoshi 500, 14px, 19.6px, minus 0.14px, `rgb(222, 222, 229)` | Corrected tracking from plus 0.28px. |
| Work title, Haven | `3652:4360`, Heading/20 | Satoshi Medium, 500, 20px, 26.4px, normal tracking; `#f2f1f8` | `.project-haven .project-title`, same as Mondai | Corrected with shared title rule. |
| About opening, three statement lines | `3776:5772`, `3776:5773`, `3776:5775`, Heading/40 | Satoshi Medium, 500, 40px, 44px, `-0.8px`; `#e8e7ee` | `.about-intro h2`, Satoshi 500, 40px, 44px, `-0.8px`, `rgb(232, 231, 238)` | None. |
| About opening attribution | `3776:5777`, owner detached exception | Owner correction: Satoshi Regular, 400, 16px, 22.4px, normal tracking; `#c9c9da` | `section#about > div.about-intro:nth-of-type(1) > p`, Satoshi 400, 16px, 22.4px, normal, `rgb(201, 201, 218)` | None. Verified owner correction. |
| Superpowers numbers | `3852:4444`, `3852:4448`, `3852:4452`, Heading/20 with node overrides | Satoshi Medium, 500, 20px, 26.4px; number 01 has normal tracking, numbers 02 and 03 have plus 1px; `#f2f1f8` | `.superpowers li span`, matching each number; numbers 02 and 03 have 0.06 opacity | Corrected individual tracking and moved opacity to text so borders stay opaque. |
| Superpowers statements | `3852:4445`, `3852:4449`, `3852:4453`, Heading/20 with node override | Satoshi Medium, 500, 20px, 26.4px; first line has plus 0.2px, lines 2 and 3 have normal tracking; `#f2f1f8` | `.superpowers li p`, matching each line; lines 2 and 3 have 0.06 opacity | Corrected individual tracking and text opacity. |
| Overview heading, About | `3744:3069`, Heading/20 | Satoshi Medium, 500, 20px, 26.4px, normal tracking; `#e8e7ee` | `.overview h2`, Satoshi 500, 20px, 26.4px, normal, `rgb(232, 231, 238)` | Corrected tracking from plus 0.2px. |
| Overview body copy | `3744:3071`, Body/16 | Satoshi Medium, 500, 16px, 22.4px, normal tracking; `#e8e7ee` | `.overview p`, Satoshi 500, 16px, 22.4px, normal, `rgb(232, 231, 238)` | None. |
| Current role heading | `3744:3259`, Heading/20 | Satoshi Medium, 500, 20px, 26.4px, normal tracking; `#e8e7ee` | `.overview h2`, Satoshi 500, 20px, 26.4px, normal, `rgb(232, 231, 238)` | Corrected with shared heading rule. |
| Current role body copy | `3744:3270`, Body/16 | Satoshi Medium, 500, 16px, 22.4px, normal tracking; `#e8e7ee` | `.overview section + section p`, Satoshi 500, 16px, 22.4px, normal, `rgb(232, 231, 238)` | None. |
| Footer location, time, LinkedIn and email | `3744:2950`, `3744:2951`, `3744:2955`, `3744:2958`, Label/12 | Satoshi Medium, 500, 12px, 16.8px, 0.96px; `#e8e7ee` | `.footer-meta`, Satoshi 500, 12px, 16.8px, `0.96px`, `rgb(232, 231, 238)` | None. |

## Font loading and cascade findings

The browser loaded `satoshi-regular.woff2`, `satoshi-medium.woff2` and `satoshi-bold.woff2`. `document.fonts.check` passed for Satoshi 400, 500 and 700. Every face reported `loaded`. The attribution therefore uses the supplied Regular file at 400 and shared text uses the supplied Medium file at 500. No rendered mismatch came from a missing face or a breakpoint override.

`font-synthesis` resolves to `none` for every audited role, so an unassigned weight cannot silently be fabricated later.

The earlier color defect came from choosing the attribution exception as a shared source style. Hexadecimal conversion itself was correct. That selection assigned the attribution color, `#c9c9da`, to hero muted copy, work descriptions and Overview body copy. Those roles must resolve respectively to `#aeaeb4`, `#dedee5` and `#e8e7ee`. The owner attribution remains the only audited 400-weight `#c9c9da` exception. The Overview and Current role headings also inherited the user-agent `h2` bold rule because `h1, h2, p, ol` resets margin only. Font loading was not a contributing failure.

The 28 September metric pass found a second source-reading defect: the old table generalized plus 0.2px tracking across Heading/20 and plus 0.28px across Label/14. The current nodes use normal tracking for work titles and Overview headings, minus 0.14px for the hero biography and work descriptions, and individual overrides in the Superpowers rows. The CSS now follows each node's rendered metrics. The two faded Superpowers rows fade their text while their borders retain full opacity. CHADWICK uses proportional tracking at smaller widths, preserving its 302px Figma ratios. The collection marker keeps its 12px size at 320px.

The skip link and retained Mondai dialog are implementation controls without matching text nodes in the active Master. Their browser font family, available weights, font synthesis and interaction behavior are checked separately; they are not presented as exact Figma text-style matches.
