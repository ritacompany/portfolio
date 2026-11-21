# Figma sync, 11 Nov 2026

Branch `claude/relaxed-ride-5mlbdu`. Source: his Portfolio Design file `IarvWaqjIwrZ2afQmMxKm6`, page VC, read
11 Nov with `use_figma`. Read only; nothing in his file changed.

- Home desktop: Master (cleanup copy) `4494:5909`. The ids in older notes (`4226:8899`, `4270:5765`,
  `4289:36506`, `4283:25471`, `4294:36562`) no longer exist. No tablet home frame exists.
- Home phone: Mobile frames `4929:12379`.
- Haven: Haven CS Master `3300:12596`.
- Variables (73) and text styles (13) equal `site/css/tokens.css` as of the 10 Nov sync (`a420fb5`): no token
  value changed. Every change below is a layer level change in the frames.
- Every Figma text layer 11.5 px and up is in `figma-read.json` and compared on the built page by
  `check-text.mjs` (colour, weight, size, line height, tracking).

Status: applied (site now matches), kept (left on purpose, reason given), his call (listed, not built).

## Home

| Id | Figma node | Old | New | Status |
|---|---|---|---|---|
| D1 | `4929:12396` hero line | Neutral/100 `#e8e7ee` | Neutral/200 `#dedee5` | applied, home.css |
| D2 | `4923:12112` Selected works | Neutral/300 `#d2d2db` | Neutral/200 `#dedee5` (phone stays Neutral/050, `4928:12048`) | applied, home.css |
| D3 | `4928:11928` phone hero line | the desktop line on every size | its own line under 768: "I’m a system-minded designer who designs for what we know now, while leaving space for what may change our minds." Medium 16, Neutral/050 | applied, index.html and home.css; 4 lines at x 156, top 599 at 402 (Figma 598) |
| D4 | `4929:12396`, `4923:12112` | 10 Nov expectations in verify-figma-sync.mjs | today's values | applied |
| D5 | `4923:12099` the // mark | 14.89 | 15.17 (`--mark-15`) | kept, 10 Nov decision |
| D6 | `4923:12102`, `4929:12207`, `4929:12228` card descriptions | line 19.25 | line 20 (Label/14) | kept, 10 Nov D20 |
| D7 | `I4923:12095;4868:13523` Learn more | 23.57 | 24 | kept, 10 Nov D41 |
| D8 | `4928:12053`, `4929:12236`, `4928:12055` phone card names and kind | 19.64 and 11.79 (frame drawn at 98.2 percent) | 20 and 12 | kept, the site uses the styles |
| D9 | `I4889:12775;4889:13131` and `13132` footer meta | "@" and "2026, Chadwick FENNER" as two layers | one element "@2026, Chadwick Fenner" in capitals | kept, same look; checked under one key |
| D10 | `I4889:12775;4889:13133` footer time | "10:24pm CST" | live clock | kept |
| D11 | `4929:12428` Testimonials and its footer link | in Figma | not built | kept, on hold at his ask |

## Haven

| Id | Figma node | Old | New | Status |
|---|---|---|---|---|
| V1 | `4683:20261` Scope, Affiliate, Focus | Neutral/500 `#aeaeb4` | Neutral/525 `#90909d` | applied |
| V2 | `4683:20278` and every section label (12) | Neutral/500 | Neutral/525 | applied, `.eyebrow` |
| V3 | `4659:13181` Where things stand | Neutral/500 | Neutral/500 (the one label that kept it) | applied, explicit rule |
| V4 | `4683:20274` second hero paragraph | Neutral/050 | Neutral/525 | applied |
| V5 | `4683:20289` data card titles | 14, line 1.4, tracking 2 percent, Neutral/200 | Body/Label/14 C: line 14, tracking 6 percent, Neutral/100 | applied |
| V6 | `4683:20294` 35 and 40 | tracking -4 percent | 0 | applied |
| V7 | `4683:20297` data captions | Neutral/200, tracking 0 | Neutral/100, tracking -1 percent | applied |
| V8 | `4683:20299` sources | line normal | line 1.4 | applied |
| V9 | `4683:20348` stat labels | tracking 1 percent | 2 percent | applied |
| V10 | `4683:20370` insight card titles | Bold 700, tracking 0 | Medium 500, tracking -2 percent (Heading/20) | applied |
| V11 | `4683:20377` insight card bodies | Neutral/400 `#c9c9d4` | Neutral/300 `#d2d2db` | applied |
| V12 | `4683:20406`, `4264:7196`, `3530:4912`, `4262:4982` body copy | Neutral/400 | Neutral/300 | applied, `.body-400` |
| V13 | `4726:11581` security body | Neutral/400 | Neutral/200 | applied |
| V14 | `4683:20412`, `4683:20417` legend | Medium, tracking 0, both Neutral/100 | Regular, -1 percent; Identity Neutral/200, Community Neutral/100 | applied |
| V15 | `4683:20430`, `4683:20436` phase ends | 14, Neutral/500 | 16, Neutral/100, -1 percent (Body/16) | applied |
| V16 | `3300:13298` task titles | tracking 0 | -2 percent | applied |
| V17 | `3558:22590` KEY INSIGHTS ticker | Medium, tracking 0 | Regular, -1 percent | applied |
| V18 | `3558:22574` testing cards | Neutral/200 | Neutral/300 | applied |
| V19 | `3515:11639` program intro | Neutral/050, tracking 0 | Neutral/200, -2 percent | applied |
| V20 | `3516:39074` role text | Medium, tracking 0 | Regular, -1 percent | applied |
| V21 | `3507:10562` quiz body | Neutral/200 | Neutral/300 | applied |
| V22 | `3994:13238` journey copy | Neutral/200 | Neutral/300 | applied |
| V23 | `4169:5328`, `3558:22342` quiz labels | Neutral/050 bar, Bold 12 capitals, tracking 8 percent, Neutral/900 | Neutral/800 chip, Regular 14 sentence case, tracking 2 percent, Neutral/050 | applied, haven.css and index.html |
| V24 | `4659:13187` closing line | Neutral/400 | "Community" Neutral/100, " is the next." Neutral/050 | applied |
| V25 | data numbers colour | `#71f949` written in the rule | `var(--haven-mantis-bright)` | applied, same value |
| V26 | `4268:7388` to `7392` Religious parents card | live text in Figma | drawn inside profile-current.png | kept, an image |

## For his call (not built)

| Id | What | My pick |
|---|---|---|
| Q1 | The master stacks a second, lavender hero `4942:12506` (small Bold Italic CHDWCK, dark text) under the dark one | Keep the dark hero; the lavender one reads as an exploration |
| Q2 | Both hero lines end "may change out minds" | Set as "our minds", as on 10 Nov |
| Q3 | Insight 1 differs from its siblings: label tracking 2 percent (others 1), testing card body Regular -1 percent (others Medium 0), card body tracking 2 percent (others 1) | Keep it matching its siblings; it looks like retyped text that picked up another style |
| Q4 | `3530:4896` Scheduling a chat label tracks +0.2 percent; every other label -2 percent | Keep -2 percent |
| Q5 | `4683:20428` "Case study end point" is its own label above "Identity launch" | Keep the approved Haven copy, "Identity launch, where this case study ends" |
| Q6 | `4264:7197` an insight tooltip (Neutral/800, radius 6) over the first pill | Leave out until he says it is a hover state to build |
| Q7 | Chat section `4262:4967` holds two compositions (tilted phone and straight phone, same paragraph twice), 2619 tall; the site builds one, 1490 tall | Keep the site's one; the frame reads as two options |
| Q8 | Program section `3515:11603` is 123 taller on the site and the quiz `3300:13351` 46 shorter; every other section is within 2.3 px | Leave; neither changed in this sync |

## ASCII banner

Already gone from every build. The only monospace layers in the Portfolio section are a JetBrains Mono stack of
"systems thinker." (`4889:12407` to `4889:12428`, in `4889:12405`, plus `4869:13843`), sitting on the canvas
outside the master. No build has it: no box drawing characters, "systems thinker" or JetBrains Mono on Home or
Haven (G7, with a planted sample as the positive control). Version history is not readable through the
plugin API, so where it sat before is not confirmed.

## Counts

Applied: 3 Home design changes (D1 to D3), 25 Haven changes (V1 to V25), plus the Home gate update (D4).
Kept with a reason: 7 Home rows (D5 to D11) and 1 Haven row (V26). For his call: 8 (Q1 to Q8).

## Proof

- `check-text.mjs all`: TEXT_SYNC_OK 190 rows (25 skipped with a reason). Before the changes: 86 of 194 rows differed.
- `scripts/verify-figma-sync.mjs`: FIGMA_SYNC_OK 171 checks. `scripts/verify-tokens.mjs`: TOKENS_OK 86 tokens.
- `check-static.mjs ascii`: ASCII_ABSENT. `check-static.mjs hex`: HEX_OK.
- `scripts/verify-haven.mjs motion`: HAVEN_MOTION_OK (its clock check now accepts seconds, which the clock shows since `588bdac`).
- Screenshots in `shots/`: Home and Haven at 1440, 768 and 390, the Figma frames, and side by side comparisons at 1440.

## After his answers, 11 Nov

| Id | Outcome |
|---|---|
| Q1 | Dropped: the lavender hero is him playing around |
| Q3 | Applied. Both Insight 1s were on the real text styles and their siblings were detached with hand set values. In Figma the siblings are back on their styles: `4683:20375`, `20381`, `20388`, `20394` Body/Label/12; `4683:20377`, `20383`, `20390`, `20396`, `3558:22572`, `22583`, `22578` Body/Label/14 (tracking 1 to 2 percent); `3558:22574`, `22585`, `22580` Body/16 (Medium to Regular, tracking 0 to -1 percent). Site: `.card__body` and `.tcard__label` tracking 0.02em, `.tcard__body` Regular, -0.01em |
| Q4 | Applied. `3530:4896` Scheduling a chat is back on Heading/20 in Figma; the site already drew it that way |
| Q6 | Handed to the session haven-tooltips: interaction options first, then the build he picks |
| Q7 | The two phones in `4262:4967` are the start and end of the chat scroll motion (`site/haven/chat-rotate.js`, on the site since 28 Oct). A newer version from 10 review rounds sits in `site/motion-lab/chat-rotate.*` on branch `haven/case-study`, not yet on the site |
| Q8 | Figma edited to match the build: headline `3515:11611` 669 to 646 wide (now 3 lines), program `3515:11603` gap 204 to 281, quiz `3300:13351` bottom padding 566 to 520. Program is now 1152 in Figma (site 1152.4), quiz 1885 (site 1885) |

Gates rerun after these changes: TEXT_SYNC_OK 190 rows, FIGMA_SYNC_OK 171, TOKENS_OK 86, ASCII_ABSENT, HEX_OK, HAVEN_MOTION_OK.
