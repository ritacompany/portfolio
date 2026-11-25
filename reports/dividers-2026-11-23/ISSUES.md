# Dividers audit, 23 Nov 2026

Read only. Nothing under site/ was edited. Measured with Playwright at 1440 and 390 wide against a local serve of site/. Values are identical at both widths. Contrast is the divider colour against the nearest opaque background behind it, which is #040405 (Neutral/900) on every page checked.

## Short answer

- There is no single divider colour on the site. Three tones are in use: Neutral/800 #121214 (1.10 to 1), Neutral/700 #1d1d21 (1.22 to 1) and, on one Haven line only, Neutral/675 #28282b (1.39 to 1).
- Every one of them is nearly invisible on #040405. The one that matches "barely visible" most is Neutral/800, used on 38 of the roughly 56 section dividers, which is all of Haven and the Mondai pages.
- I could not find a recorded decision for the divider colour. Details in the section on what is current.

## Home, site/index.html

| Selector | Where | Computed | Token | Contrast | Matches current decision |
|---|---|---|---|---|---|
| .about__row.about-story (inset shadow top) | line above the About story row | #1d1d21 | neutral 700 (home.css line 147) | 1.22 | Unknown, see decisions. Matches the 18 Nov Master comment |
| .about__row.about-role (inset shadow top) | line above the role row | #1d1d21 | neutral 700 (home.css line 147) | 1.22 | Same as above |
| footer#contact (inset shadow top) | top edge of footer | #1d1d21 | neutral 700 (components.css line 250) | 1.22 | Same as above |

The testimonials section has a Neutral/700 top line (home.css) but is hidden on the page, so it is not measured.

## Haven, site/haven/index.html

| Selector | Where | Computed | Token | Contrast | Matches current decision |
|---|---|---|---|---|---|
| section.hero border-bottom | under the hero | #28282b | n675 (haven.css line 101) | 1.39 | Unknown. Only Haven line not overridden to 800 |
| div.hero__top border-bottom | under the Haven CS title row | #121214 | n800 (current.css line 9) | 1.10 | Unknown |
| section.access.rule-b | bottom of Access | #121214 | n800 via current.css line 199 | 1.10 | Unknown |
| section.mvp.rule-b | bottom of MVP | #121214 | same | 1.10 | Unknown |
| section.wires border-bottom | bottom of Wireframes | #121214 | n800 (current.css line 44) | 1.10 | Unknown |
| section.testing.rule-b | bottom of Testing | #121214 | n800 via line 199 | 1.10 | Unknown |
| div.ticker.rule-t.rule-b | top and bottom of the ticker band | #121214 (2 lines) | same | 1.10 | Unknown |
| hr.section-rule | before the Program section | #121214 | same | 1.10 | Unknown |
| section.program.rule-b | bottom of Program | #121214 | same | 1.10 | Unknown |
| section.quiz.rule-b | bottom of Quiz | #121214 | same | 1.10 | Unknown |
| section.journey.rule-b | bottom of Journey | #121214 | same | 1.10 | Unknown |
| section.profile.rule-b | bottom of Profile | #121214 | same | 1.10 | Unknown |
| section.schedule.rule-b | bottom of Schedule | #121214 | same | 1.10 | Unknown |
| section#chat-rotate.chat.cr.rule-b | bottom of Chat | #121214 | same | 1.10 | Unknown |
| section.security.rule-b | bottom of Security | #121214 | same | 1.10 | Unknown |
| footer#contact (inset shadow top) | top of footer | #1d1d21 | neutral 700 (components.css line 250) | 1.22 | Same footer as home |

Note: haven.css lines 81 and 82 set .rule-b and .rule-t to n675 (#28282b). current.css line 199 overrides them to n800, so the lighter value is dead code today. haven.css line 212 sets .section-rule to n675 too, also overridden.

## Mondai collection, site/mondai/index.html

| Selector | Where | Computed | Token | Contrast | Matches current decision |
|---|---|---|---|---|---|
| a.context.context-top (inset shadow top) | above first case study row | #121214 | line = neutral 800 (components.css line 149) | 1.10 | Unknown |
| a.context.context-both (top and bottom) | second row | #121214 (2 lines) | same | 1.10 | Unknown |
| div.context.context-locked.context-bottom | locked row bottom | #121214 | same | 1.10 | Unknown |

This page has no footer element, so no footer line.

## Mondai framework CS, site/mondai/framework/index.html

| Selector | Where | Computed | Token | Contrast | Matches current decision |
|---|---|---|---|---|---|
| section.fw-sec (inset shadow bottom), 13 sections | under each section | #121214 | neutral 800 (framework.css line 10) | 1.10 | Unknown |
| section.fw-sec.fw-end-sec (inset shadow bottom) | under the ending | #121214 | same | 1.10 | Unknown |
| span.rule, 2 of them | full width rule inside a section | #121214 | neutral 800 (framework.css line 13) | 1.10 | Unknown |
| span.vrule | vertical line in the diagram panel, desktop | #1d1d21 | neutral 700 (framework.css line 93) | 1.22 | Unknown |
| li.fw-end__stat border-top, 3 of them | top of each ending stat | #38383d | neutral 600 (framework.css line 193) | 1.76 | Unknown |
| footer#contact.footer-other (inset shadow top) | top of footer | #1d1d21 | neutral 700 (components.css line 250) | 1.22 | Same footer as home |

## Not counted as dividers

Card and chip outlines: .data-card, .card, .task, .tcard__body, .flow__step, .pill, .badge, .capdemo__btn, .button, .legend__swatch, .phase__stage, the carousel dots (.fw-end__dots i). They are #aeaeb4, #7b7b86, #5c675d and accent colours, which are far more visible and not section rules. site/dev and site/motion-lab were out of scope.

## What is current

I found no recorded decision on divider colour, so I am not stating one. What the record does show:

1. Haven's Neutral/800 was #18181b and was repointed to the Portfolio value #121214 on 9 Nov (docs/SITE_BUILD_PLAN.md lines 343 to 348: "only Neutral/800 changes value, #18181b to the Portfolio #121214", measured as 0.08 percent fainter). Every Neutral/800 divider got slightly darker then. This is the only trace of a divider getting darker.
2. docs/FIGMA_SYNC_2026-11-10.md D25 set the About row lines to Neutral/800 and D28 removed the footer top line. Both were later reversed: home.css line 144 says "Row lines Neutral/700" and components.css lines 248 to 249 say the master draws a Neutral/700 line on the footer (18 Nov Master, commit 05c4ba4). So Neutral/700 is the latest Figma reading for home and footer.
3. The Haven, Mondai and framework lines at Neutral/800 have no note tying them to a Figma stroke. Haven's .rule-b override at current.css line 199 has no comment. tokens.css has no divider or line token.
4. The git history was squashed (earliest relevant commits a149b71 on 12 Nov and ac7aa4e on 16 Nov), so I cannot show what the colour was before 9 Nov beyond item 1. I did not re-read Figma, so the live stroke colours are unconfirmed since 10 Nov.

## Proposal (not applied, needs his go ahead)

Because he says they are too dark and barely visible, and no decision exists, the minimum change that uses only values already in tokens.css and already used for this job on the site:

| File and line | Now | Proposed |
|---|---|---|
| site/haven/current.css line 199 | `.rule-b,.rule-t,.section-rule { border-color:token n800; }` | `border-color:token n675;` (restores the value haven.css lines 81, 82 and 212 already declare) |
| site/haven/current.css line 9 | `border-bottom:1px solid token n800` | `token n675` |
| site/haven/current.css line 44 | `border-bottom:1px solid token n800` | `token n675` |
| site/haven/haven.css line 111 | `.hero__context ... border-bottom:1px solid token n800` | `token n675` (not rendered on the live page today, listed for consistency) |
| site/css/components.css line 149 | `line: token neutral 800;` | `token neutral 675;` |
| site/css/framework.css lines 10 and 13 | `token neutral 800` | `token neutral 675` |
| site/css/home.css lines 147 and 359 | `token neutral 700` | `token neutral 675` |
| site/css/components.css line 250 | `token neutral 700` | `token neutral 675` |
| site/css/framework.css line 93 | `token neutral 700` | `token neutral 675` (vertical rule) |

Result: every divider becomes #28282b, 1.39 to 1 on #040405. That is still faint. If he wants them clearly visible, the next step is Neutral/600 #38383d (1.76 to 1, already used on .fw-end__stat), or Neutral/575 #65656e (3.55 to 1). Both exist in tokens.css.

Two things only he can settle: which of those steps he wants, and whether the Figma strokes agree (the home and footer lines were read as Neutral/700 on 18 Nov). Per the Figma-wins rule in tokens.css, the value should follow the Figma stroke, so a fresh read of the stroke colour on the Haven section frames comes first.
