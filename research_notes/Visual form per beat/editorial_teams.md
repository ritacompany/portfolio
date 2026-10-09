# How editorial graphics teams choose a visual form for each beat of a story

Scope note: several primary sources would not load (Archie Tse's slide PDF on GitHub, the Nieman Lab interview with Steve Duenes, the Design Week Reuters profile, GIJN). Where that happened I used secondary reports and marked them as such. Claims marked "says" are what a team or person says they do. Claims under Inferences are mine.

## 1. What these teams say about going from story to form

### Takeaway
The teams that describe their process say the same thing in different words: the story and the reader's question come first, and the form is picked last to fit the message. The FT puts this in writing by sorting charts by the relationship you want the reader to see (deviation, ranking, change over time and so on), not by chart type.

### Cited findings
- The FT Visual Vocabulary groups charts by the relationship in the data the reader needs to see. There are nine groups: deviation, correlation, ranking, distribution, change over time, part to whole, magnitude, spatial and flow. You pick the group from the message, then a chart inside the group. [FT Visual Vocabulary README](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
- Each FT group has a one-line rule that is really a question to ask of the beat:
  - Ranking: "Use where an item's position in an ordered list is more important than its absolute or relative value."
  - Deviation: "Emphasise variations (+/-) from a fixed reference point."
  - Spatial: use a map only when precise locations matter more to the reader than anything else.
  - Part to whole: if the reader only cares about the size of each part, use a magnitude chart instead.
  - Correlation: readers often assume a relationship you show is causal unless you tell them otherwise.
  - Source: [FT Visual Vocabulary README](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
- The Visual Vocabulary credits the Graphic Continuum by Jon Schwabish and Severino Ribecca as its inspiration. Its sections on uncertainty, animation and interactivity are still marked "Todo". [FT Visual Vocabulary README](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
- Simon Scarr (Reuters Graphics) says the team takes on only stories where the visual is needed to understand them: "Just because a story is big doesn't mean that it's visual, or that it merits a response from us... We try to work on stories that really need our work, where the visual aspects are essential to the understanding." This is quoted secondhand from Design Week; the primary page returned 403. [Design Week via search summary](https://www.designweek.co.uk/issues/27-january-2-february-2020/in-house-teams-how-reuters-graphics-visualises-catastrophic-world-events/)
- Reuters is a wire service, so it also builds graphics as files that client newspapers can edit. That is a requirement on form that has nothing to do with the story. [Design Week via search summary](https://www.designweek.co.uk/issues/27-january-2-february-2020/in-house-teams-how-reuters-graphics-visualises-catastrophic-world-events/)
- The WSJ graphics team moved from organising by output (print or online) to organising by story: "Instead we're focusing on storytelling from the start." Graphics editors sit with news desks so they help shape the story early, "helping craft the story instead of being the cherry on top." The team also dropped "lower-value dashboards and data dumps" for projects with a strong narrative. [OpenNews Source, WSJ graphics team](https://source.opennews.org/articles/wsj-graphics-team)
- John Burn-Murdoch (FT) argues that charts change minds and that persuasion comes from balancing data, design and words. He says charts "cut through people's pre-existing beliefs in a way that text struggles with." [iMEdD reprint of GIJN report](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- Burn-Murdoch frames each chart around the two questions a reader brings to it: "What is this showing me? Why does it matter?" He also says: "Don't just make charts for chart people. Make stories for all people." [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- The Pudding (Ilia Blinderman) splits its work into three parts: data, visualisation and writing. The published part 1 covers only data. [The Pudding, how to make dope shit part 1](https://pudding.cool/process/how-to-make-dope-shit-part-1/)

### Inferences
- Transferable rule: write the one-sentence message of a beat first, name the relationship it rests on (change, comparison, ranking, part to whole, flow, location), then pick the form. If you cannot name a relationship, the beat probably has no visual job and should stay prose. This follows from the FT taxonomy and the Scarr filter.
- For a portfolio with no large datasets, the FT groups still work when "data" means structure. Flow covers a process or system diagram. Change over time covers a before and after or a timeline. Part to whole covers how a system breaks into components. Magnitude covers a single big number. Spatial maps onto "where in the product" (an annotated screen).
- The Scarr test ("is the visual essential to understanding?") is the most direct rule for when a case study beat earns an image.

### Gaps
- No primary transcript of Amanda Cox describing NYT form choices was found. A widely circulated quote, "the annotation layer is the most important thing we do", could not be verified, so do not use it. Her Eyeo 2018 talk exists ([Vimeo](https://vimeo.com/287093172)) but I did not review its content.
- Alan Smith's book "How Charts Work" was not accessed.
- No Bloomberg, Economist or Guardian methodology posts were retrieved in the time budget.

## 2. Storyboarding and beat sheets

### Takeaway
The evidence shows teams writing the narrative or script first and then brainstorming a visual for each part and each medium. Scrollytelling, as the Pudding builds it, turns this into a structure: a sequence of text "steps", each of which drives one state of a sticky graphic. I found no published beat-sheet template from any of these teams.

### Cited findings
- For the WSJ's "Portraits of the Parties", the team started from a text script. Graphics editors then "got together and brainstormed visualizations for each medium." [OpenNews Source](https://source.opennews.org/articles/wsj-graphics-team)
- The same project was sequenced differently by medium. Online, "they decided to animate people moving between distinct groups through several slides." In print, "they presented several views of the data in a big splash presentation." The article says there was "very little overlap" between the print and online treatments. [OpenNews Source](https://source.opennews.org/articles/wsj-graphics-team)
- The Pudding's scrollytelling pattern, built with Russell Goldenberg's Scrollama library, has three parts: a container, a graphic and a series of steps. Each text step that enters the viewport triggers a change in the stuck graphic (enter, stick, exit). [The Pudding, scrollytelling sticky](https://pudding.cool/process/scrollytelling-sticky/); [Scrollama on GitHub](https://github.com/Lixucheng/scrollama); [FlowingData on Scrollama](https://flowingdata.com/2017/11/20/scrollama)
- Burn-Murdoch's animated line chart, documented by Flourish, is a slide-by-slide build that reveals one thing at a time. The final slide carries an annotation making clear that the area between the lines is excess deaths. [Flourish masters series](https://flourish.studio/blog/masters-reveal-line-john-burn-murdoch/)
- Washington Post graphics staff describe their workflow in this order: hear about the story, choose a visualisation, collect and prepare the data, build, publish. This comes from a Census Bureau panel outline, not from a description of how they sketch. [US Census Bureau panel](https://www.census.gov/library/video/washpost_data.html)

### Inferences
- A workable beat sheet built from these practices has one row per beat with:
  - the reader's question at that point
  - the one-sentence answer, which doubles as the headline or title
  - the relationship type (FT group)
  - the form
  - the annotation, meaning the one thing the reader's eye must land on
  - what changes from the previous beat
- The scrollytelling step model translates directly to a Figma case study. Each section is a "step" that changes one thing from the step before. Hold the visual constant and change the emphasis, rather than giving every beat a new image.
- The WSJ case shows that sequencing depends on the medium. A long Figma page behaves like print splash plus scroll, so build up in stages, not with interaction.

### Gaps
- No published storyboard image or per-beat question list from the NYT, Pudding, Reuters or FT was retrieved. The Pudding's later "how to make" parts on visualisation and writing may exist but were not found.
- Segel and Heer's "Narrative Visualization" (2010) taxonomy of genres (magazine style, annotated chart, slideshow and others) is relevant but was not fetched.

## 3. When a beat gets a visual, when it stays text and when annotation does the work

### Takeaway
Practitioners say text is the first thing readers look at, and that a title stating the finding plus direct annotation is what turns a chart into communication. The NYT experience shows that anything hidden behind interaction is effectively text no one reads. Whether to use a visual at all depends on whether it is needed to understand the point (Scarr).

### Cited findings
- Burn-Murdoch: "Text is where people's attention goes first... If we're not using that, we're really missing an opportunity." He cites a study in which readers remembered the title and annotations better than other parts of a chart. [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- He writes titles that answer the reader's question: "I put a lot of effort and time into getting that title right"; "The title is now answering that." [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- He labels lines directly instead of using a legend, because a legend means "asking someone to keep checking back and forth between the legend and the lines." [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- In his COVID chart rework the data and geometry stayed the same, and the chart was "significantly improved... as a piece of communication" by working only on text, colour, labels and annotations. The changes were: an explanatory title, direct labels, colour groups (East Asia blue, Italy black, UK and US strong, the rest grey) and a "doubling every two days" reference line. [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- He warns that too much minimalism fails readers, because "humans like storytelling". His colour rule is "Minimize distraction. Maximize contrast." [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/); [GIJN](https://gijn.org/stories/data-visualization-storytelling-tips-john-burn-murdoch/)
- He reports eye-tracking findings that readers go from title to axes to data, and he uses that order to lay out charts. [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- Visual cues such as pictures or flags work as "additional anchors" for recall rather than distractions. This is GIJN's report of a study he cited. [GIJN](https://gijn.org/stories/data-visualization-storytelling-tips-john-burn-murdoch/)
- Archie Tse (NYT, Malofiej 2016, "Why we are doing fewer interactives") is quoted as saying: "If you make a tooltip or rollover, assume no one will ever see it." This is secondhand; the slide PDF did not load. [Future of Coding thread](https://linen.futureofcoding.org/t/22673047/i-recall-coming-across-some-opinions-against-interactivity-i); slides at [github.com/archietse/malofiej-2016](https://github.com/archietse/malofiej-2016/blob/master/tse-malofiej-2016-slides.pdf)
- Gregor Aisch (then at the NYT) explains that the "85%" figure tied to Tse's talk measured readers who did not click a prominent button in a couple of 2015 graphics. It does not mean readers ignored the graphics. His conclusion is that "you should not hide important content behind interactions", and that 15% of readers "aren't nobody". [vis4.net, In defense of interactive graphics](https://www.vis4.net/blog/in-defense-of-interactive-graphics); FlowingData reported the click rate as 10 to 15 percent ([FlowingData](https://flowingdata.com/2017/03/15/interactive-or-not-to-interactive-visualization/))
- A Zeit Online practitioner interviewed by Datawrapper says every chart should be self-explanatory, answering questions at specific data points so that no supporting text is needed. [Datawrapper blog, Zeit Online Julius Tröger](https://datawrapper.de/blog/zeit-online-julius-troeger)
- Datawrapper (Lisa Charlotte Muth) recommends annotations on maps and charts to point out regions or patterns and to add context. [Datawrapper, better responsive annotations](https://datawrapper.de/blog/better-more-responsive-annotations-in-datawrapper-data-visualizations)

### Inferences
- Rule for a portfolio: every visual gets a title that states the finding, not the topic, plus at least one annotation pointing at the exact place the claim lives on the screen or diagram. A product screen with no callout is a chart with a legend: it makes the reader search.
- Rule for keeping a beat as prose: if the point is about reasoning, a trade-off, motive or a decision without a spatial, structural or comparative shape, keep it as text. Adding an image there costs attention (text is read first) and gives no visual understanding (the Scarr test fails).
- The Burn-Murdoch rework suggests that improving an existing visual's text layer often does more than switching to a new form.

### Gaps
- Datawrapper's explicit guidance on "when not to make a chart" was not retrieved.
- No source found that states a team rule for when a single big number is the right form.

## 4. Making work that also functions as a static image (print, social, mobile)

### Takeaway
The NYT graphics desk moved toward scroll-first, linear graphics because few readers click. The WSJ redesigns the sequence separately for each medium. The common rule is that the core message must be readable with no interaction.

### Cited findings
- Tse's 2016 Malofiej talk explained why the NYT was doing fewer interactives: most readers do not click, so content behind tooltips goes unseen. Secondhand. [Future of Coding thread](https://linen.futureofcoding.org/t/22673047/i-recall-coming-across-some-opinions-against-interactivity-i)
- Aisch's response accepts the core rule (do not hide important content behind interaction) and argues that interaction is still worth having for the minority who use it. [vis4.net](https://www.vis4.net/blog/in-defense-of-interactive-graphics)
- Nieman Lab (2016, Steve Duenes interview) describes the NYT graphics department becoming a standalone desk that publishes its own work, with a mobile-first, explanatory focus. Detail is from a search snippet; the page returned 403. [Nieman Lab](https://www.niemanlab.org/2016/03/from-service-desk-to-standalone-news-desk-how-the-new-york-times-graphics-department-has-transitioned-to-the-mobile-age/)
- The WSJ treated web and print as separate designs of the same story: animated slides online, a multi-view splash in print. [OpenNews Source](https://source.opennews.org/articles/wsj-graphics-team)
- Chartbeat data shows 35% of desktop users leave before scrolling at all. This is context on attention, not a graphics team claim. [Chartbeat blog](https://blog.chartbeat.com/?p=3927)
- Datawrapper made its annotations responsive so they work at small widths. [Datawrapper](https://datawrapper.de/blog/better-more-responsive-annotations-in-datawrapper-data-visualizations)

### Inferences
- A Figma case study is effectively print: no tooltips and no hover. Everything the reader must take away has to be on the surface: title, annotation and caption.
- Design each key visual to survive being cropped out and shared alone. That means a finding-style title on the image itself, not only in the surrounding prose. This applies the NYT no-hidden-content rule to reuse on social or in a deck.

### Gaps
- The Pudding's mobile follow-up to its scrollytelling posts was referenced but not found.
- No FT or Reuters post on designing for social cards was retrieved.

## 5. Concrete named examples where the per-beat choice is visible

### Takeaway
The clearest documented cases are Burn-Murdoch's COVID trajectory chart (text and annotation changed, form kept), his Flourish step-by-step reveal (sequence of one change per slide, ending on an annotation) and the WSJ "Portraits of the Parties" (the same script given different sequences in print and web).

### Cited findings
- FT COVID trajectories chart: the same data and geometry, rebuilt for communication with a title, direct labels, colour grouping and a reference line. [iMEdD](https://lab.imedd.org/en/from-data-to-storytelling-concept-and-design-tips-from-the-financial-times-john-burn-murdoch/)
- FT excess deaths animated line chart: a step-by-step reveal ending on an annotation that explains the shaded gap. [Flourish](https://flourish.studio/blog/masters-reveal-line-john-burn-murdoch/)
- WSJ "Portraits of the Parties": a text script first, then visuals brainstormed per medium. Online it animates people moving between groups across slides; in print it is a big splash of several views. [OpenNews Source](https://source.opennews.org/articles/wsj-graphics-team)
- The Pudding's sticky scrollytelling: text steps drive the states of a single persistent graphic. [The Pudding](https://pudding.cool/process/scrollytelling-sticky/)
- Reuters Graphics coverage of the Beirut blast and the spread of wildfire smoke is cited as examples of its quick-turnaround visual explanation, but the per-beat reasoning was not retrieved. [Online Journalism Blog tag](https://onlinejournalismblog.com/tag/beirut-blast/)

### Inferences
- Pattern to borrow for a case study: introduce one diagram or screen early, then return to it in later sections with new emphasis (highlight, annotation, one changed state), instead of a new picture per section. This is the static equivalent of the sticky graphic and of Burn-Murdoch's reveal.
- Consolidated decision rules, all inferred from the cited material:
  1. Write each beat's reader question and one-sentence answer before choosing any form.
  2. Name the relationship. No relationship means prose.
  3. Use a visual only if it is essential to understanding (Scarr).
  4. Make the title state the finding.
  5. Annotate on the object, not in a legend or a separate caption.
  6. Hide nothing behind interaction (Tse, Aisch).
  7. Change one thing per step when sequencing.
  8. Design for the medium you actually ship, which in Figma is static.

### Gaps
- No NYT, Bloomberg, Guardian or Economist case with a documented per-beat rationale was retrieved. Known pieces such as NYT "Snow Fall" or Bloomberg "What's Really Warming the World" were not researched, so no claims are made about them.
