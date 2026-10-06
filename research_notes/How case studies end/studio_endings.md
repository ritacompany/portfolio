# How top studio case studies end: the final content section before the footer or next project

All live pages viewed 2026-09-30 in a Chromium browser pane with JavaScript, reading the rendered DOM (text, element order, computed font sizes, image and video counts). Font sizes are computed px. Unless noted, sizes were read at a 1440px viewport. Fantasy and Clay pages, plus Huge heading sizes, were read at a 683px viewport before the viewport was widened, so their absolute sizes are scaled down; ratios within a page still hold. Metalab endings come from the local rebuilds in `/Users/chadwickfenner/Code/portfolio/build/`, which reproduce Metalab's live section order and copy (LEDGER.md notes the bottom "next case study ticker/CTA" was cut from every rebuild, so the Metalab handoff is not in them).

## Q1. For at least 12 case studies, what is the last content section before the next project or footer, and how is it laid out?

### Takeaway
30 case studies catalogued across 9 studios. The last section falls into six shapes: a results block with stats (13), qualitative outcome or closing statement (5), last feature section with no ending treatment (5), credits or roles block after the body (5, all Pentagram and Instrument), press or awards wall (3) and a quote (2 as the very last element). Handoffs are either a single "Next project" card (Pentagram, Koto, Clay, Metalab) or a 3 to 5 card "more work" grid (Work & Co, Instrument, Fantasy, Collins).

### Cited Findings

**Metalab (local rebuilds of the live pages; Metalab typography: section statements 40px "Narrative 40", ending title 64px "Narrative 64", stat digits 88px)**
- Atoms: final section = title "Climbing the charts" (64px), small label "Results" (12px structure label) with one sentence of body (about 20 words: top 10 in App Store and Editors Choice within a month), then a row of 3 stats with hairline tops: "4.8 / Stars in App Store", "4.6k / Total reviews", "T10 / Top 10 in App Store & Editors Choice". Stat digits 88px, captions 20px lead. No imagery. Source: local `build/atoms.html`; live URL [metalab.com/work/atoms](https://www.metalab.com/work/atoms)
- Calvin Klein: title "Small details, massive reach", label "Impact", one sentence (hundreds of UX improvements, millions of monthly visitors), 3 stats: 9.3 (billion dollars global retail sales last year), 1.79 (million monthly visitors), 238 (UX issues surfaced in audit). Source: `build/calvin-klein.html`; [metalab.com/work/calvin-klein](https://www.metalab.com/work/calvin-klein)
- Headspace: title "Mindfulness might not be about results but we couldn't help ourselves.", label "Results", two sentences, 3 stats: 2x time on site, 69% pages per session, 116% session duration. Source: `build/headspace.html`; [metalab.com/work/headspace](https://www.metalab.com/work/headspace)
- Midjourney: title "Shipping work to millions", label "Outcomes", one sentence, 3 stats: 6 months of collaboration, 10k+ Discord messages exchanged, 20M+ users impacted. Source: `build/midjourney.html`; [metalab.com/work/midjourney](https://www.metalab.com/work/midjourney)
- Ro: title "Changing healthcare as we know it, forever.", label "Results", one sentence, 3 stats: 8 brands under one super app, 30+ page templates, 654+ design system components. Source: `build/ro.html`; [metalab.com/work/ro](https://www.metalab.com/work/ro)
- Suno: title "Immediate disruption", label "Impact", two sentences (#11 on Music chart under 24 hours after launch; forward looking line "The future for Suno is bright..."), 3 stats: 4.9 star rating, 43K ratings, T10 top performing apps in Music. Source: `build/suno.html`; [metalab.com/work/suno](https://www.metalab.com/work/suno)
- Uber: title "A long term partnership", one sentence ("proud to have played a small part in Uber's success"), 3 stats: 5 major projects in 3 years, 131 million users impacted, 31.8 billion revenue last year. Source: `build/uber.html`; [metalab.com/work/uber](https://www.metalab.com/work/uber)
- Windsurf: penultimate section "Impact / Built to make waves." with one paragraph (acquisition deals after launch); final section is a media quote module: image plus a 40px client quote (about 30 words) and a 14px attribution "Anshul Ramachandran, Founding Team, Windsurf". No stats. Source: `build/windsurf.html`; [metalab.com/work/windsurf](https://www.metalab.com/work/windsurf)
- Robinhood: final section is text plus image modules, no stats. Last block is "Bringing it all together / A cohesive system built to be seen and trusted" followed by three closing sentences: leadership saw potential beyond the product, the work was featured in the launch presentation and marketing site, "we helped establish a new design system unique to Robinhood, that they were proud to show off." Source: `build/robinhood.html`; [metalab.com/work/robinhood](https://www.metalab.com/work/robinhood)
- The Atlantic: final section is a text module "Innovation Roadmap / A continuous learning loop to inform and fuel future experiments into perpetuity." plus one paragraph about running experiments "for years to come". No stats, no quote. Source: `build/the-atlantic.html`; [metalab.com/work/the-atlantic](https://www.metalab.com/work/the-atlantic)
- In the rebuilds, the stats title uses the 64px role while every other section statement on the page uses the 40px role, and stat digits use 88px. Source: `build/atoms.html` classes `r-n64 stats__title`, `r-n40`, `--t-stat: clamp(40px,6.12vw,88px)`

**Work & Co (stats sit at the top of the page under "Outcomes", not at the end; handoff heading "More Case Studies" 18px)**
- IKEA: the last content is the fourth numbered chapter "04. Redefining in-store touch points" (chapter title 40px, number 40px) with 4 subsections, each an 18px label plus one 22px paragraph (New ways to shop, Scan & Go, Kiosks, Employee tools). No closing statement, no stats at the end. The stats (4x e-commerce growth, 60% online sales increase, 4.8 star rating at 65px) are in the page header block. Source: [work.co/clients/ikea](https://www.work.co/clients/ikea/)
- Aesop: last content is an 18px "After Launch" heading with two bold run-in points ("Earning Loyalty", "Curated Gifting") each followed by a 22px paragraph. Stats (2 weeks to prototype, 15% higher conversion) are at the top. Source: [work.co/clients/aesop](https://www.work.co/clients/aesop/)
- MTA: last content is a press wall: 7 publication logos, each with a one-line pull quote at 22px and a "Read More" link (examples: "A remarkable design feat.", "We needed this."). Source: [work.co/clients/mta](https://www.work.co/clients/mta/)

**Instrument (every page examined ends body, then "Our Role(s)" credits, then "Related Case Studies" 13px label with 4 cards, then newsletter footer)**
- ServiceNow rebrand: closing body block "What's Next Is Now" (17px bold label) with two paragraphs containing bolded result phrases ("18.5% year-over-year revenue increase", "surpassed 500 customers with annual contract values exceeding $5 million"), a 12 logo strip, a final 17px paragraph opening "Much like ServiceNow's ambitions, the work is far from done", one image, then "Our Role" (28px H3) with discipline lists at 14px. A client quote at 33px ("This isn't a design tweak. It's a signal...", Colin Fleming, CMO) sits two sections earlier, not at the end. Source: [instrument.com/work/servicenow-rebrand](https://www.instrument.com/work/servicenow-rebrand)
- Oura (ouraring.com redesign): last content before credits is an awards list of about 11 entries, each a logo image plus an 11px line (Drum, Awwwards, W3, Webby, Indigo, Comm Arts). Then "Our Roles" (28px) with Strategy, Design, Content columns (about 20 items at 14px). Page H1 is 111px, so the credits heading is about a quarter of the H1. Source: [instrument.com/work/oura-smart-ring](https://www.instrument.com/work/oura-smart-ring)
- Nike Digital Design System: last content is "Vision for the Future" (21px H2) with one 17px paragraph, then a 33px statement "The Advantage: Accessible across platforms and intended to evolve, the Nike design system ultimately empowers creators across the brand...", then 2 images, then "Our Roles". No stats anywhere in the tail. Source: [instrument.com/work/nike-digital-design-system](https://www.instrument.com/work/nike-digital-design-system)

**Fantasy (H1 83px and section H2 40px at 683px viewport; handoff is a letter-animated "Up Next" label with 3 cards, then a "Let's talk. We'd love to hear from you." footer CTA at 23px)**
- BNY Eliza: ends on stats: "60%" (less time on client plan preparation) and "75%" (faster contract review), each a 40px number, a 15px bold label and a one-sentence 15px source line ("BNY reports that..."). Source: [fantasy.co/work/bny-eliza](https://fantasy.co/work/bny-eliza)
- Priceline Penny: final section starts with a 10px label "The Impact", a word-by-word animated headline "A brand identity that scales with Penny's expanding intelligence" (17px per word at that viewport), two 15px paragraphs (launch date November 2025, OpenAI citing Priceline), a 23px blockquote from Glenn Fogel, CEO Booking Holdings, then 3 stats at 40px: "8 weeks", "10 mins" (saved per trip), "1st" (ranked AI booking experience), each with a label and one-sentence attribution. Source: [fantasy.co/work/priceline-penny](https://fantasy.co/work/priceline-penny)
- Vimeo: one 15px paragraph then 2 stats: "60%" increase in enterprise revenue, "3Qs" consecutive quarterly growth in organic traffic, each with a one-sentence qualifier. Source: [fantasy.co/work/vimeo](https://fantasy.co/work/vimeo)
- Stat numbers on Fantasy are 40px, the same size as the page's section H2s (40px), not bigger. Source: computed sizes on the three Fantasy pages above

**Clay (H2 30px section heads, H1 40px at 683px viewport; handoff "Next Case Study" 18px label plus client name at 30px)**
- Slack: last content is an ordinary feature section "Localization" (30px H2, one 16px paragraph, one video, one image). No results, quote or closing. Source: [clay.global/work/slack](https://clay.global/work/slack)
- Snapchat: last content is "Standardizing the Product UX" (30px H2, one paragraph) followed by a grid of 6 images. No results section. Source: [clay.global/work/snapchat](https://clay.global/work/snapchat)

**Collins (H1 72px, section H2 36px; handoff is "Case Studies / See others we've helped with this program" with 5 cards, then "Work with us")**
- Figma: final section "Impact" (36px H2) with one hero number "6x" at 95px, then 4 outcome items, each a 16px H3 label plus one 16px sentence (e.g. "Increased Distinctiveness: Positioned Figma as different in kind versus Adobe"; one item reframes TAM "from 10M designers to 68M collaborators"). Source: [wearecollins.com/case-studies/figma](https://wearecollins.com/case-studies/figma/)
- Spotify: "Impact" (36px) with hero number "$19B" at 95px and 6 outcome items (Valuation Growth, Unlocked Thematic Innovation, Increased Culture Relevance, Rise of Spotify as a Culturemaker, Shifted Internal Culture, Enhanced Adaptability Across Genre), then a final "Press" section (36px H2) with 3 or more article cards (image, 19px outlet name, 16px headline: Fast Company, Brand New). Source: [wearecollins.com/case-studies/spotify](https://wearecollins.com/case-studies/spotify/)

**Pentagram (project title H1 52px; all tail text 16px; handoff "Next Project" 16px label plus next title at 52px and one-line description)**
- Xsolla: last body text is an underlined 16px subhead "A world without limits" and one paragraph ("designed to grow over time"), then a metadata credits block: Client, Sector, Discipline, Office, Partners (2 names), Project team (12 names), Collaborators (5). Source: [pentagram.com/work/xsolla](https://www.pentagram.com/work/xsolla)
- Pfizer: same credits block ending in Project team (13 or more names) and Collaborators (10 entries with roles, e.g. "Jeremy Mickel/MCKL Type, typeface design"), then Next Project "Rugiet". Source: [pentagram.com/work/pfizer](https://www.pentagram.com/work/pfizer)

**Koto (section labels H3 11px, statements 24px, body 16px; handoff "Next up" 11px label plus 32px project name and tagline)**
- Stack Overflow: final section "Outcome" (11px label), one 24px statement "Far from becoming a relic, Stack and its community are an anchor of the AI era.", one 16px paragraph, 2 images. No stats. Source: [koto.com/projects/stack-overflow](https://koto.com/projects/stack-overflow)
- Coinbase: "Outcome" label, one 16px paragraph (perception shift "from a technical trading platform to a welcoming gateway"), 3 images. No stats. Source: [koto.com/projects/coinbase](https://koto.com/projects/coinbase)

**Ueno (archived; headings 52px throughout; no next project, page runs straight into a "Got a project? / Let's talk" footer at 38px)**
- Reuters News App (Wayback snapshot 2021-10-02): ends on a 28px pull quote from Ueno's own senior designer (Kwok Yin Mak) with a 14px name and title, after two 30px feature subsections with phone images. Source: [web.archive.org, ueno.co/work/reuters-news-app](https://web.archive.org/web/20211002060022/https://ueno.co/work/reuters-news-app/)
- Slack (snapshot 2021-10-02): final chapter "U and I forever / Bringing the user interface to life" (52px H1 plus H2), one 20px paragraph, 3 images. Same scale as every other chapter. Source: [web.archive.org, ueno.co/work/slack](https://web.archive.org/web/20211002060011/https://ueno.co/work/slack/)

**Huge**
- McDonald's: ends on a numbers sequence: 5 stat statements set as 43px H2s (the same size as all section headings on the page) with short captions ("#1 globally.", "127M downloads.", "50M daily users.", "20% increase.", "40% of sales."), then a 146px H2 "The numbers." with a 3 stat recap (#1, 127M, 20%). Page H1 is 175px. Source: [hugeinc.com/case-study/mcdonalds](https://www.hugeinc.com/case-study/mcdonalds)

### Inferences
- Handoff style tracks studio size of catalogue: studios with a single linear order (Pentagram, Koto, Clay, Metalab) use one "next" card; agencies with broad catalogues (Work & Co, Instrument, Fantasy, Collins) show a 3 to 5 card grid.
- Credits blocks appear only at studios that credit individuals or disciplines as a house rule (Pentagram names people, Instrument lists capabilities); none of the product studios (Metalab, Fantasy, Clay, Koto) end on credits.

### Gaps
- Live Metalab pages (atoms, upwork, the-athletic) rendered only hero, meta block (Project Type, Stage, Deliverables) and the "How can we help?" footer in the DOM on 2026-09-30; body sections did not load in this browser session, so live Metalab endings are taken from the local rebuilds, and the live Metalab next project handoff was not observed.
- Huge Cointracker did not render body text; only McDonald's was captured for Huge. Huge's handoff after "The numbers." was not captured.
- Awwwards and Siteinspire collections were not reviewed.

## Q2. Which patterns recur, and roughly how often?

### Takeaway
Across 30 endings, a stats-bearing results block is the most common final section (13 of 30, 43%), and it is concentrated at Metalab (7 of 10) and Fantasy (3 of 3). Qualitative outcome statements, plain last feature sections and credits each account for about one in six. Client quotes as the final element are rare (1 of 30); they more often sit inside or just before the results block.

### Cited Findings
Tally of the final content section (one category per page, based on the observations under Q1):
- Results block with numeric stats as last section: 13 of 30. Metalab Atoms, Calvin Klein, Headspace, Midjourney, Ro, Suno, Uber; Fantasy BNY Eliza, Priceline Penny, Vimeo; Collins Figma; Huge McDonald's; Instrument ServiceNow (stats inline in prose, not a stat row). Sources as listed under Q1.
- Stat count when a stats row is used: 3 at Metalab (all 7), 2 or 3 at Fantasy, 5 plus a 3 stat recap at Huge, 1 hero number plus 4 to 6 qualitative outcome items at Collins.
- Qualitative outcome or closing statement, no numbers: 5 of 30. Metalab Robinhood, Metalab The Atlantic, Koto Stack Overflow, Koto Coinbase, Instrument Nike DDS.
- Last feature section with no ending treatment: 5 of 30. Clay Slack, Clay Snapchat, Work & Co IKEA, Work & Co Aesop ("After Launch"), Ueno Slack.
- Credits or roles block directly before the handoff (after the body): 5 of 30. Pentagram Xsolla, Pentagram Pfizer, Instrument ServiceNow, Oura, Nike (Instrument counted here for credits, and separately above for their body endings).
- Press or awards wall: 3 of 30. Work & Co MTA (7 press quotes), Collins Spotify (Press cards after Impact), Instrument Oura (about 11 awards).
- Quote as final element: 2 of 30. Metalab Windsurf (client), Ueno Reuters (own designer). Client quotes also appear inside the results section at Fantasy Priceline Penny (CEO blockquote before stats) and mid-page at Instrument ServiceNow and Work & Co IKEA.
- Label words used for the ending section: "Results" (Atoms, Headspace, Ro), "Impact" (Calvin Klein, Suno, Windsurf, Collins Figma, Collins Spotify), "Outcomes" (Midjourney), "The Impact" (Fantasy Penny), "Outcome" (Koto both), "The numbers." (Huge).

### Inferences
- Where a studio has a results section at all, it is almost always the last body section. Work & Co is the exception: it moves stats to the header and lets the body end on process.
- Next steps or a forward look appears as a sentence inside the ending rather than as its own section (Suno "The future for Suno is bright", ServiceNow "the work is far from done", The Atlantic "for years to come").

### Gaps
- Sample is 30 pages, 10 of them from one studio (Metalab), so the percentages are skewed toward Metalab's template.

## Q3. How much text does a typical ending hold, and is it bigger or smaller in type than the section headings above it?

### Takeaway
Endings are short: typically a title, a label, 1 or 2 sentences (about 20 to 45 words) and 2 or 3 stat pairs, so 7 to 9 elements. Type goes up at the ending only at Metalab and Huge; elsewhere the ending uses the same heading scale as the rest of the page, and the credits and handoff labels are small.

### Cited Findings
- Metalab endings: 1 title + 1 label + 1 to 2 sentences (about 20 to 45 words) + 3 stat pairs = 8 to 9 text elements, no imagery. Title is 64px against 40px for other section statements; stat digits 88px. Source: local `build/*.html`, classes `r-n64 stats__title`, `r-n40`, `--t-stat`
- Huge McDonald's: the closing "The numbers." heading is 146px against 43px section headings, the largest heading after the 175px H1. Source: [hugeinc.com/case-study/mcdonalds](https://www.hugeinc.com/case-study/mcdonalds)
- Collins: the 95px hero number in "Impact" is larger than the 72px H1; the section heading "Impact" itself stays at the standard 36px, and outcome items are 16px. Source: [wearecollins.com/case-studies/spotify](https://wearecollins.com/case-studies/spotify/), [figma](https://wearecollins.com/case-studies/figma/)
- Fantasy: stat numbers 40px, equal to section H2s at 40px; labels and sentences 15px; "The Impact" label 10px. Source: [fantasy.co/work/priceline-penny](https://fantasy.co/work/priceline-penny)
- Koto: ending statement 24px, the same statement size used elsewhere on the page; "Outcome" label 11px. Source: [koto.com/projects/stack-overflow](https://koto.com/projects/stack-overflow)
- Pentagram: ending body, credits and "Next Project" label are all 16px; the only large text is the next project's title at 52px, the same size as the current H1. Source: [pentagram.com/work/xsolla](https://www.pentagram.com/work/xsolla)
- Instrument: "Our Role(s)" heading 28px against an H1 of 111px on Oura; credits list items 14px; "Related Case Studies" label 13px. Source: [instrument.com/work/oura-smart-ring](https://www.instrument.com/work/oura-smart-ring)
- Clay and Ueno endings use the same heading size as every other section (Clay 30px, Ueno 52px). Source: [clay.global/work/slack](https://clay.global/work/slack), [Ueno Slack snapshot](https://web.archive.org/web/20211002060011/https://ueno.co/work/slack/)

### Inferences
- A scale jump at the end is a deliberate "finale" device used by studios that end on numbers (Metalab, Huge, Collins hero number). Studios that end on narrative or credits keep the ending at or below body section scale.

### Gaps
- Word counts for Fantasy, Collins and Instrument endings were not totalled precisely; paragraph text was truncated in extraction.

## Q4. How do studios end case studies where results are not public or the product did not launch?

### Takeaway
None of the 30 pages states that results are unavailable. Where numbers are absent, studios substitute one of five things: a qualitative outcome sentence, a reception signal (internal or leadership reaction, press, awards), a forward-looking statement about the system's future, activity or output counts instead of business metrics, or simply no ending section at all.

### Cited Findings
- Reception by the client's leadership instead of metrics: Metalab Robinhood ends on leadership seeing "potential beyond the product" and featuring the work in the launch presentation. Source: `build/robinhood.html`; [metalab.com/work/robinhood](https://www.metalab.com/work/robinhood)
- Internal reaction quote: Metalab Windsurf ends on a founding team member recalling "audible 'wows'" when the brand book was shown internally. Source: `build/windsurf.html`
- Forward-looking platform statement: Metalab The Atlantic ends on an "Innovation Roadmap" that lets teams "run experiments... for years to come"; Instrument Nike DDS ends on "Vision for the Future" and a statement that the system is "intended to evolve". Sources: `build/the-atlantic.html`; [instrument.com/work/nike-digital-design-system](https://www.instrument.com/work/nike-digital-design-system)
- Output and activity counts in place of business results: Metalab Ro (8 brands, 30+ templates, 654+ components), Midjourney (6 months, 10k+ Discord messages), Calvin Klein (238 UX issues surfaced in audit), Uber (5 major projects). Sources: `build/ro.html`, `build/midjourney.html`, `build/calvin-klein.html`, `build/uber.html`
- Client-reported figures attributed to the client: Fantasy prefixes stats with "BNY reports that..." and "Priceline reports that...", and cites a third party ranking (Evercore ISI). Source: [fantasy.co/work/bny-eliza](https://fantasy.co/work/bny-eliza), [priceline-penny](https://fantasy.co/work/priceline-penny)
- Qualitative outcome items styled like metrics: Collins lists outcomes such as "Created Narrative Leverage" and "Increased Distinctiveness" with one sentence each, alongside a single number. Source: [wearecollins.com/case-studies/figma](https://wearecollins.com/case-studies/figma/)
- Press and awards as proof: Work & Co MTA (press quote wall), Instrument Oura (awards list), Collins Spotify (Press). Sources: [work.co/clients/mta](https://www.work.co/clients/mta/), [instrument.com/work/oura-smart-ring](https://www.instrument.com/work/oura-smart-ring), [wearecollins.com/case-studies/spotify](https://wearecollins.com/case-studies/spotify/)
- No ending at all: Clay and Ueno Slack pages end on the last feature and go straight to the handoff or footer. Sources: [clay.global/work/snapchat](https://clay.global/work/snapchat), [Ueno Slack snapshot](https://web.archive.org/web/20211002060011/https://ueno.co/work/slack/)

### Inferences
- The Midjourney and Ro stat rows show that Metalab keeps the stats template even when business outcomes are not shared, filling it with engagement scope numbers. This keeps visual parity with pages that have real outcomes.

### Gaps
- No example found of a case study for a product that explicitly did not launch; none of the pages viewed say so. Unreleased or cancelled work may simply not be published by these studios.
