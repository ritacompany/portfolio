Agent: layout-and-scrollytelling researcher

# Layout patterns for long form visual stories, and which scrollytelling patterns survive as stills

Source dating convention: each citation gives the source date in brackets. "n.d." means the page shows no date.

## How layout carries narrative (reading order, text to graphic relation, measure, pacing)

### Takeaway
The single most cited constraint is measure: body text should sit at 45 to 90 characters per line, which on a 12 column desktop grid means text never spans the full width and a figure placed beside or after it has to justify a different span. Editorial teams who build article systems drop the fixed sidebar and center the text block so supporting media can "take any shape or size at any point", which is the structural answer to walls of text: width changes are the pacing device.

### Cited findings
- Butterick recommends an average line length of 45 to 90 characters including spaces, or two to three lowercase alphabets per line. Longer lines make the eye travel farther from line end to next line start, which hurts vertical tracking. He prefers characters per line over physical width because it holds at any point size. Source: [Butterick, Practical Typography, "Line length" (n.d.)](https://practicaltypography.com/line-length.html)
- ProPublica's 2021 article redesign removed the right hand column; lower on the page stories switched to a simpler centered layout so that content can take "any shape or size at any point in our articles". Opening screens got a separate set of flexible opening layouts. Producers set a focal point per image and the system auto crops per device; producers can also supply separate mobile and desktop images. Source: [ProPublica Design and Product Team, "2021 article page redesign" (23 Mar 2021)](https://www.propublica.org/article/2021-article-page-redesign)
- Rob Weychert's layout composition framework for ProPublica is a responsive grid of 4 to 14 columns "anchored by a centered text block", with editors given a small set of spatial parameters per supporting element (images, charts, video) in the CMS, designed for non designers. Source: [Rob Weychert, ProPublica project page (n.d., work around 2021 to 2022)](https://v7.robweychert.com/projects/propublica/)
- The common web implementation of this editorial model is a three tier width system: a limited content column, a wider "breakout" span and full bleed, built with named grid tracks rather than the older 100vw plus negative margin trick (which ignores the scrollbar and causes horizontal overflow). Source: [Frontend Masters / master.dev, "Super simple full bleed and breakout styles" (n.d.)](https://master.dev/blog/super-simple-full-bleed-breakout-styles/) (summarized via search result, page not fetched in full)
- Mark Boulton's content out approach builds the grid from a fixed content constraint rather than a preset column count; a known applied example sized a sidebar to one or two standard 300px units and built the main area around it. Workshop notes report that odd column counts are common in print because they create tension and balance, while even counts dominate the web. Source: [Hidde de Vries, notes on Mark Boulton's grid workshop (n.d.)](https://hidde.blog/mark-boultons-grid-system-design-workshop/); [Smashing Magazine, "Designing with grid based approach" (Apr 2007)](https://www.smashingmagazine.com/2007/04/designing-with-grid-based-approach/); [Stuff and Nonsense, New Internationalist redesign (n.d.)](https://stuffandnonsense.co.uk/blog/the-new-internationalist-redesign-process/)
- A secondary summary of Boulton style grid thinking argues fewer columns give a stronger content hierarchy and that negative space should be proportioned against content using "dead" columns rather than a fixed max width container. Source: [art=work, "Design your grid" (n.d.)](https://artequalswork.com/posts/design-your-grid/) (search summary only)
- Bostock: some content should always scroll normally; "don't simply make everything position fixed" or the page feels unresponsive. Full screen designs need a visible cue that more content exists. Autoplaying media pulls the reader off the text, so video should fill the viewport or be cued so the reader chooses when to engage. Source: [Mike Bostock, "How to scroll" (3 Nov 2014)](https://bost.ocks.org/mike/scroll/)
- Bostock: "Making content visible by scrolling is almost always better than hiding it behind a click", and the eye scans faster without scrolling, so content should not be hidden unnecessarily. Source: [Bostock (3 Nov 2014)](https://bost.ocks.org/mike/scroll/)

### Inferences
- Grid arithmetic (ESTIMATE, assumes a 1440px artboard; recompute for other widths). Content width is 1440 minus 2 x 40 = 1360px. Eleven 40px gutters take 440px, leaving 12 columns of about 76.7px. Spans: 4 col about 427px, 5 col about 543px, 6 col about 660px, 7 col about 777px, 8 col about 893px, 9 col about 1010px, 10 col about 1127px, 12 col 1360px, full bleed 1440px.
- Measure check (ESTIMATE, assumes 18px body in a typical sans with average character width near 0.5em, so about 9px per character): 5 columns gives roughly 60 characters, 6 columns roughly 73, 7 columns roughly 86. So body text belongs at 5 or 6 columns; 7 is the ceiling of Butterick's range; 8 or more breaks it. Any template that runs body copy across 8 to 12 columns is producing a "wall" by measure alone, independent of image count.
- That leaves 6 to 7 columns free beside a 5 to 6 column text block. This is the natural home of the side by side pattern (text 5 col with figure 7 col, or text 4 with figure 8) and it is where most "text plus one image" templates should put the image, rather than below a full width paragraph.
- Width tiers to name in the template set, derived from the ProPublica and breakout models: text (5 or 6 col, offset or centered), inset figure (same span as text, sits in the reading column), wide figure (8 to 10 col), full grid (12 col) and full bleed (viewport). Pacing then becomes a deliberate sequence of width changes rather than a sequence of templates.
- Reading order follows from placement: a figure that sits beside its paragraph is read as evidence for that paragraph; a figure that breaks to wide or full width after the paragraph is read as a new beat. Use beside for "this proves the line I just read", use break out for "now look".

### Gaps
- I found no published NYT, Reuters or Pudding spec stating figure widths in grid columns. The 5 to 6 column text and 7 to 8 column figure ratio is my derivation from measure plus grid arithmetic, not a sourced newsroom rule.
- No quantitative source found for a text to visual ratio or "one idea per screen" rule in long form editorial pages. The only pacing claims found were qualitative (Bostock, Samora on keeping step counts short). A Webflow blog claim about first screen time was unverifiable and is excluded.
- Müller-Brockmann primary text not fetched in this thread.

## Scrollytelling pattern catalogue and research

### Takeaway
There are really two scrollytelling layouts that matter, sticky graphic beside stepping text and stepping text overlaid on a full width sticky graphic, plus the plain stack of standalone figures that The Pudding itself recommends as the fallback. Practitioners and critics agree on the boundary: keep scroll driven change only when the transition itself carries meaning (change over time, spatial movement, statefulness); otherwise stack discrete charts.

### Cited findings
- Sticky graphic definition: the graphic scrolls into view, becomes stuck for the duration of a set of steps, then unsticks and exits when the steps end. Scrollama exists as convenience functions for this "opinionated (but popular)" pattern. Source: [The Pudding, "Introducing Scrollama" (2017)](https://pudding.cool/process/introducing-scrollama/) via search summary; [The Pudding, "Scrollytelling sticky" (Jun 2018)](https://pudding.cool/process/scrollytelling-sticky/)
- The Pudding demonstrates two layout variants for the sticky pattern: side by side (classic, graphic beside steps) and text overlay (steps scroll over the sticky graphic). Widths are not specified in the article. Source: [Elaina Natario and Russell Samora, The Pudding, "Scrollytelling sticky" (Jun 2018)](https://pudding.cool/process/scrollytelling-sticky/)
- The two goals of the pattern are to trigger chart updates from text blocks and to keep the chart fixed during the scroll. Scrolljacking (altering native scroll mechanics) is called generally bad practice. Source: [Russell Samora, The Pudding, "How to implement scrollytelling with six different libraries" (Jan 2017, updated Nov 2017)](https://pudding.cool/process/how-to-implement-scrollytelling/)
- Responsive best practices: keep the scrolly format when transitions carry meaning (change over time, spatial movement), not as polish. Stack content into standalone charts when animation could hurt performance, when each step reads clearly as its own chart, when mobile needs a different chart type, or when deadlines favor static images. Avoid steppers and swipe or tap navigation (steppers hide content; swipe overrides native scroll). Keep the step count short because fatigue sets in fast on phones. Replace hover with fixed text or annotation. Mobile first forces the story to essentials. Source: [Russell Samora, The Pudding, "Responsive scrollytelling best practices" (Apr 2017)](https://pudding.cool/process/responsive-scrollytelling/)
- Bostock's five rules: prefer scrolling to clicking; allow rapid, incremental, reversible scrolling; give instant consistent feedback; avoid unwanted disruptions such as autoplay; keep keyboard controls working. He prefers position fixed "screens" with position based transitions over scroll jacked swipe. Source: [Mike Bostock, "How to scroll" (3 Nov 2014)](https://bost.ocks.org/mike/scroll/)
- Kosara's critique: scrolling is continuous but many stories advance in discrete steps, so the interaction mismatches the content; readers cannot judge length or jump to a point; text scrolling over animated graphics forces a choice between reading and watching; scroll triggered animation is hard to replay and early frames get missed. His alternative: a stepper with Next and numbered buttons. Source: [Robert Kosara, "The scrollytelling scourge", eagereyes (25 May 2016)](https://eagereyes.org/blog/2016/the-scrollytelling-scourge)
- Conflict to note: Kosara recommends discrete steppers; Samora (Pudding) and Bostock recommend against steppers in favor of scroll. NYT's Archie Tse sided with scroll on reader behavior grounds (next section). Sources: [Kosara (2016)](https://eagereyes.org/blog/2016/the-scrollytelling-scourge); [Samora (Apr 2017)](https://pudding.cool/process/responsive-scrollytelling/); [Bostock (2014)](https://bost.ocks.org/mike/scroll/)
- David Sleight (ProPublica design director) on when it earns its place: "If we need to create a moment of pause or if the goal is to allow comparisons and/or show change over time (showing statefulness), then it can be very helpful." Kosara in the same piece: for stories told in discrete steps, "the interaction should be discrete." The NYT coronavirus hot spots piece is described as a line chart locked in place while copy scrolls, with highlights, labels, scale and comparison countries changing per step. Source: [Bill Shander, "The past, present and future of scrollytelling", Nightingale (25 Aug 2020, updated 11 Oct 2021)](https://nightingaledvs.com/the-past-present-and-future-of-scrollytelling/)
- Seyser and Zeiller (2018) analysed which infographic types long form online journalism uses and how they are integrated into scrollytelling articles; published at IEEE IV 2018, pp. 401 to 406, DOI 10.1109/iV.2018.00075. Full text is closed access and was not read; later work cites it for the point that these pieces are expensive and used for analysis and investigations that stay relevant, not breaking news. Source: [FH Burgenland record (2018)](https://people.hochschule-burgenland.at/entities/publication/360687e9-e683-431c-b576-7f372b279621/details); [Scrolly2Reel, arXiv (2024)](https://ar5iv.labs.arxiv.org/html/2403.18111)
- Oesch, Roth and Renner (NZZ graphics team), Information Design Journal (2022): analysed 50 scrollytelling examples and grouped element characteristics into five standard techniques. The page returned 403, so the five technique names were not retrieved. Source: [John Benjamins catalog, idj.22005.oes (2022)](https://www.benjamins.com/catalog/idj.22005.oes)
- Mörth, Bruckner and Smit, "ScrollyVis": a web authoring tool for scientific scrollytelling combining text, images, video, maps and 3D data; evaluated with 12 participants and an expert; frames scroll as giving control, exploration and discoverability through a simple interface. IEEE TVCG, online 2022, issue 2023 (29(12) 5165 to 5177). Source: [UiB publication page (2022)](https://vis.uib.no/publications/Moerth2022ScrollyVis); [BORA record (2023)](https://bora.uib.no/bora-xmlui/handle/11250/3132019)
- Segel and Heer's seven narrative visualization genres: magazine style, annotated chart, partitioned poster, flow chart, comic strip, slide show, video; combined with interactivity to balance author driven and reader driven experience. Source: [Segel and Heer, "Narrative visualization: telling stories with data", IEEE TVCG (2010)](https://homes.cs.washington.edu/~jheer/files/narrative.pdf) (via search summary; thread 2 likely covers in depth)

### Inferences
- Pattern catalogue mapped to the 12 column grid (INFERENCE from the sources above plus the grid arithmetic):
  1. Side by side sticky: text steps at 4 to 5 col, sticky figure at 7 to 8 col. Static equivalent: the same split, with one figure state per text block, or a single figure with numbered callouts matching numbered paragraphs.
  2. Overlay sticky: figure at 12 col or full bleed, text cards at 4 to 5 col on one side. Static equivalent: full bleed image with an annotation layer baked in, or the card text moved below the image. Kosara's read versus watch conflict is strongest here, so only use when the image is quiet.
  3. Stacked standalone figures: Pudding's own fallback. Each step becomes its own inset or wide figure after its paragraph.
  4. Graphic sequence (discrete state swaps): static equivalent is small multiples or a comic strip row at 12 col (3 or 4 panels at 3 or 4 col each).
  5. Full bleed media moment (video or hero): static equivalent is a poster frame; Bostock says it should fill the viewport and not autoplay against text.
- The existing templates already map: "text plus one image" is pattern 1 or 3, "text plus two or three images" is pattern 4 (small multiples), "carousel" is a stepper (Kosara's preferred discrete form, Samora and Tse's disfavored one), "full bleed" is pattern 5 or 2.

### Gaps
- Amelia Wattenberger and Shirley Wu scrollytelling writeups were not found in search; I cannot cite them.
- Oesch et al. five technique names and Seyser and Zeiller findings are paywalled; only abstracts or citations were available.

## Every step must be a still: static, print, mobile and reduced motion versions

### Takeaway
The strongest sourced rule is NYT's: anything important must be visible without interaction, because readers just scroll and do not click, hover or tap. The Pudding's own fallback is to stack each step as a standalone chart, and they name "each step reads clearly as its own chart" as a reason to do so. Data comics research supplies the still form for sequence: panel layout itself encodes the reading order.

### Cited findings
- Archie Tse (NYT deputy graphics editor), "Why we are doing fewer interactives", Malofiej, March 2016: steppers, tabs and sliders were used less because readers were not getting to all the content; "readers just want to scroll". Source: [Nieman Lab coverage of Malofiej (Mar 2016)](https://www.niemanlab.org/2016/03/at-the-malofiej-infographics-world-summit-the-best-form-of-storytelling-is-often-static/) (403 on fetch; content via search summary)
- Tse's three rules: "If you make the reader click or do anything other than scroll, something spectacular has to happen." "If you make a tooltip or rollover, assume no one will ever see it. If content is important for readers to see, don't hide it." Cross platform interactives are expensive. Source: [Mario Garcia, "Interactive graphics: less is best at FT?" (10 Nov 2016)](https://garciamedia.com/?p=2509)
- FT interactive editor Martin Stabe: exhaust all other options before custom interactivity, because cross device interactives are slow and expensive. Source: [Nieman Lab (Mar 2016)](https://www.niemanlab.org/2016/03/at-the-malofiej-infographics-world-summit-the-best-form-of-storytelling-is-often-static/) via search summary
- Samora: stack into standalone charts when each step reads clearly as its own chart; replace hover with fixed text or annotation. Source: [The Pudding (Apr 2017)](https://pudding.cool/process/responsive-scrollytelling/)
- Data comics combine spatial layout and overview (from infographics) with linearity and narration (from video and slides); Bach et al. define design patterns as sets of panels each serving a narrative purpose, for rapid storyboarding. Source: [Bach, Wang, Farinella, Murray-Rust, Henry Riche, "Design patterns for data comics", CHI (2018)](https://www.research.ed.ac.uk/en/publications/design-patterns-for-data-comics/)
- Static data comics: "the panel layout itself encodes the flow of information, guiding the reader through a predefined sequence of panels", and need no programming or animation skill to author. Source: [Wang et al., "Interactive data comics", IEEE VIS (2021)](https://research.tudelft.nl/en/publications/interactive-data-comics) via search summary
- Comics follow established reading conventions and need no interaction or dynamic media, so they can be printed or embedded in articles. Source: [Benjamin Bach, data comics topic page (n.d.)](https://aviz.fr/~bbach/homepage/topics/datacomics)
- ProPublica supports separate mobile and desktop images and AMP specific alternates, i.e. the reduced version is authored, not derived. Source: [ProPublica (23 Mar 2021)](https://www.propublica.org/article/2021-article-page-redesign)
- Third party guidance (lower confidence, agent skill files and vendor blogs, not newsrooms): provide a prefers-reduced-motion fallback per scene as a static key frame, or a stacked version; parallax can trigger vestibular symptoms. Source: [tessl registry, scrollytelling and parallax skill (n.d.)](https://tessl.io/registry/skills/github/openai/plugins/scrollytelling-and-parallax-data-visualization)

### Inferences
- What makes a step legible as a still, synthesized from the above: (1) the change is drawn, not animated: a highlight state (one element in accent, rest muted) carries what the transition would have; (2) a consistent frame across steps (same axes, same crop, same scale) so small multiples compare; (3) annotation sits on the graphic, not in a tooltip, per Tse; (4) each still has its own one line caption so it survives being read out of sequence, per Samora's "reads as its own chart" test.
- Practical test for the designer: export each beat's visual as a flat PNG with no surrounding text. If the point of the beat is not visible, the beat needs annotation or a highlight state before motion is considered.
- Motion later should only be added where Samora's and Sleight's criterion holds: the transition itself is the content (a state change, a before and after, movement). Everywhere else the still is the final form.

### Gaps
- No primary Reuters, NYT or Pudding writeup was found describing how print versions or reduced motion versions of a specific scrolly piece were produced. The NYT rule above is about interaction, not print.
- No study found measuring comprehension of small multiples versus the animated scrolly version of the same story; the arXiv 2603.04367 scrollytelling comparison was surfaced but results were not retrieved.

## Pacing text versus visuals in long form pages

### Takeaway
Sources give qualitative pacing rules, not ratios: keep step sequences short, let width changes and full bleed moments mark beats, keep some content scrolling normally, and put the strong visual moment where the story needs a pause. No sourced numeric text to visual ratio was found.

### Cited findings
- Keep the step count short; fatigue sets in faster on phones. Source: [Samora (Apr 2017)](https://pudding.cool/process/responsive-scrollytelling/)
- Scrollytelling is helpful "to create a moment of pause" or to show comparisons and change over time. Sleight treats ambitious pieces as R and D for everyday articles, not a template for every story. Source: [Shander, Nightingale (2020, updated 2021)](https://nightingaledvs.com/the-past-present-and-future-of-scrollytelling/)
- Stephanie Evergreen: stepping draws attention to key data under limited reader cognitive capacity ("If you put a neon sign on data, people pay attention"). Source: [Shander, Nightingale (2020)](https://nightingaledvs.com/the-past-present-and-future-of-scrollytelling/)
- Scrollytelling pieces are expensive and used for analysis that stays relevant, not breaking news (citing Seyser and Zeiller). Source: [Scrolly2Reel, arXiv (2024)](https://ar5iv.labs.arxiv.org/html/2403.18111)
- ProPublica separates a designed opening screen (selectable opening layouts) from a simpler centered body. Source: [ProPublica (23 Mar 2021)](https://www.propublica.org/article/2021-article-page-redesign)

### Inferences
- A workable rhythm for a case study section (INFERENCE): opening beat at full bleed or 12 col; body alternates 5 to 6 col text with a figure every one or two paragraphs; reserve one full bleed per section for the pause beat Sleight describes; use a 12 col small multiples row when a beat is a sequence. Never two consecutive text only blocks at the same width without a figure or a width change between them.
- "One idea per screen" is best implemented as one figure per beat sized to the beat's job (inset for support, wide for evidence, full bleed for pause), not as one viewport per paragraph.

### Gaps
- No sourced text to image ratio, words per figure count or "one idea per screen" guideline from an editorial team was found.

## Grid guidance: sizing graphics to column spans

### Takeaway
No newsroom publishes column spans for figures in the sources found. The defensible rule comes from combining measure (45 to 90 characters) with the grid: text at 5 to 6 of 12 columns, figures beside text at 6 to 7, standalone figures at 8 to 10, 12 or full bleed for pauses and sequences.

### Cited findings
- ProPublica: 4 to 14 column responsive grid anchored on a centered text block, per element spatial controls. Source: [Weychert (n.d.)](https://v7.robweychert.com/projects/propublica/)
- Breakout tiers (content, breakout, full bleed) as the standard web pattern; Atlassian's equivalent uses "wide" and "full width" modes. Source: [master.dev (n.d.)](https://master.dev/blog/super-simple-full-bleed-breakout-styles/); [Atlassian ADF breakout mark (n.d.)](https://developer.atlassian.com/platform/framework/adf-builder/reference/marks/breakout/) (search summaries)
- Measure 45 to 90 characters. Source: [Butterick (n.d.)](https://practicaltypography.com/line-length.html)

### Inferences
- Span table for 12 col, 40px margins and gutters at 1440px (ESTIMATE, see arithmetic in section 1):
  - Body text: 5 col (about 543px) or 6 col (about 660px). Offset left (cols 2 to 6 or 2 to 7) when a figure sits to the right; centered (cols 4 to 9) for text only runs.
  - Figure beside text: 6 or 7 col (about 660 to 777px), aligned to the text block top or to the paragraph it supports.
  - Two figures: 6 plus 6 for comparisons with equal weight; 8 plus 4 when one is the subject and one is detail.
  - Three figures or small multiples: 4 plus 4 plus 4 with identical frames.
  - Wide standalone: 8 to 10 col, centered or offset to share an edge with the text column.
  - Full grid 12 col for dense diagrams; full bleed for pause beats and hero media.
  - Overlay text card on full bleed: 4 to 5 col so it stays inside measure.

### Gaps
- No primary source found with NYT, Guardian or Reuters figure widths expressed in columns. Müller-Brockmann and Boulton originals not fetched.
