# Figma sync, 22 Nov 2026: Home

Source: "Mondai home newest" `6364:28896`, Desktop 1 (MVP) file `5RO0m4bYYrTvbiaOgaU3tI`, page CS, 1440 by 4126.
Read only with `use_figma`; nothing in his file changed. Text styles re-read from the Portfolio Design library
`IarvWaqjIwrZ2afQmMxKm6`. Before this the home page followed the VC master `4494:5909` (11 Nov sync).

Gate: `node scripts/verify-figma-sync.mjs` (211 checks, values copied from this read) prints FIGMA_SYNC_OK.
Also passing: `verify-tokens`, `verify-hover-still`, `check-site`, `verify-pages shared home`, `npm run taste`
(one finding, the known "Design system CS" line on /mondai/).

Status: applied (site now matches), kept (left on purpose, reason given), open (his call).

## Shared (reaches every page)

| Id | What | Old | New | Status |
|---|---|---|---|---|
| S1 | Body/16 tracking (library style) | -1 percent | 0 | applied, tokens.css |
| S2 | Nav links: new style Label/14 C M | Regular, Neutral/050 | Medium, Neutral/200 (Navbar Base `6331:20421`) | applied, components.css; Haven nav hover kept instant (haven.css) |
| S3 | Logo | Neutral/050 | Neutral/200 | applied, assets/ui/logo.svg |
| S4 | Footer gap, top block to bottom row | 183 | 168 (Footer `6331:20483`) | applied, components.css |

## Home at 1440

| Id | Figma node | Old | New | Status |
|---|---|---|---|---|
| H1 | `6364:28908` navbar | logo top 15, role line "Product Designer" | logo top 19, no role line | applied; phone hero keeps its role line |
| H2 | `6364:28913` hero line | "designing for what we know now, while leaving space for what may change our minds." at y 468 | "looking for tomorrow’s problem in today’s perfectly reasonable decision." y 451, max width 457 | applied |
| H3 | `6364:28914` location | x 623, y 498 | x 699, y 481 | applied |
| H4 | `6364:28921` CHDWCK | glyph top 580.51 | 589.51 | applied |
| H5 | Selected works heading | on the page, cards at 1236 | gone; cards at 1042, About at 1746 | applied; heading kept for screen readers and the phone frame |
| H6 | `6364:28932`, `6364:28940` card descriptions | Neutral/200, Mondai at 13.75 | Label/14, Neutral/550; x 622 and 1211 | applied; phone keeps Neutral/200 from its own frame |
| H7 | `6364:28953`, `6364:28960` About bodies | x 741 and 740, 595 and 650 wide | x 858, 542 wide; rows 569 and 234 | applied |
| H8 | `6364:28953` About copy | "I love my cats, drag, unexpected experiences" | "I love my cats, unexpected things, drag" | applied. Figma also has "I have have an eye" and "cats ," : the doubled word and the space were not copied |
| H9 | `6364:29031` Testimonials | not built (on hold) | quote, person, LinkedIn source, three dots; 800 tall | applied, provisional below 1200 (no tablet or phone frame) |
| H10 | `6364:29051` footer links | About, Selected works, Contact | Home, About, Selected works, Testimonials | applied; phone menu shows Testimonials too |
| H11 | `5812:22904` Learn more pill on the Mondai card | on the card | not in the newest frame | kept: the site cursor work (PR 34, preview only) replaces it |
| H12 | Resume link | hidden | opacity 0 in Figma | kept hidden until his resume file |

## Open, his call

- Q1 Testimonial quote and avatar. The quote is not in `reference/`, so it is unchecked against Allison's real
  LinkedIn text. The avatar in the frame is his own cut out portrait on green, not hers. The LinkedIn link goes to
  his recommendations page.
- Q2 The three dots promise more quotes; there is one.
- Q3 The phone hero line (`4928:11928`, Portfolio Design) still paraphrases the old desktop line.
- Q4 No light mode exists in this frame; nothing to sync there.

## Not updated

`verify-pages boxes home` and `pixels home` still compare against the 8 Nov transported frame `5812:22862` and
fail on purpose; `verify-components sizes` fails on the Nav link width (Medium is wider than the old Regular
component). `verify-pages boxes framework` and `verify-haven body` failed before this change.
