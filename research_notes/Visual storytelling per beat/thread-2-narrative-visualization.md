Agent: narrative-visualization researcher

# Narrative visualization and visual storytelling: choosing form per beat and sequencing beats

Source texts for sections 1 and 2 were read in full from the author PDFs (text extracted locally). Section numbers are the papers' own.

## 1. Segel and Heer 2010: genres, author vs reader driven, structures, devices

### Takeaway
Segel and Heer give a three part design space (genre, visual narrative tactics, narrative structure tactics). Genres differ mainly by number of frames and how strictly the frames are ordered, and they combine like building blocks. The paper explicitly says there is no a priori right genre; choice depends on data complexity, story complexity, audience and medium.

### Cited findings
- Paper: Edward Segel and Jeffrey Heer, "Narrative Visualization: Telling Stories with Data", IEEE TVCG 16(6):1139 to 1148, InfoVis 2010, DOI 10.1109/TVCG.2010.179. Author PDF: [Segel and Heer 2010](https://homes.cs.washington.edu/~jheer/files/narrative.pdf); paper page [UW IDL](https://idl.uw.edu/papers/narrative).
- Corpus: 58 visualizations analyzed by case study method; 71% online journalism, 20% business, 9% visualization research (Section 4). [Segel and Heer 2010](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Three divisions of the design space (Section 4.1): (1) genre, (2) visual narrative tactics, (3) narrative structure tactics. [Segel and Heer 2010](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- The seven genres (Section 4.3, Fig. 8): magazine style, annotated chart (the Fig. 7 column reads "Annotated Graph / Map"), partitioned poster, flow chart, comic strip, slide show, film/video/animation. They "vary primarily in terms of (a) the number of frames ... and (b) the ordering of their visual elements." A frame is a "distinct visual scene, multiplexed in time and/or space". Examples given in the text: magazine style is "an image embedded in a page of text" with a single frame; a partitioned poster (multi-view) "may suggest only a loose order"; a comic strip "tends to follow a strict linear path". [Segel and Heer 2010, Section 4.3](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Genres combine: "These genres are not mutually exclusive: they can function like building blocks." The Barry Bonds piece is part partitioned poster, part flow chart; Budget Forecasts and Gapminder are annotated graphs inside a slide show. [Section 4.3](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Genre choice factors: "the complexity of the data, the complexity of the story, the intended audience, and the intended medium"; "there will be no 'right answer' a priori, but several possible candidates." [Section 4.3](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Messaging and interactivity are layered on top of any genre. Messaging is "the use of text to provide observations and explanations about the images" (headlines, captions, labels, annotations, sometimes audio). Tradeoff stated: messaging "might clarify visual elements but produce clutter"; interactivity "might engage the user but detract from the author's intended message." [Section 4.3](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Visual narrative tactics, three subdivisions (Section 4.1 and Fig. 7 columns):
  - Visual structuring: "mechanisms that communicate the overall structure of the narrative to the viewer and allow him to identify his position". Items: establishing shot / splash screen, consistent visual platform, progress bar / timebar, "checklist" progress tracker.
  - Highlighting: "visual mechanisms that help direct the viewer's attention to particular elements". Items: close ups, feature distinction, character direction, motion, audio, zooming.
  - Transition guidance: "techniques for moving within or between visual scenes without disorienting the viewer." Items: familiar objects (but still cuts), viewing angle, viewer (camera) motion, continuity editing, object continuity, animated transitions.
  [Segel and Heer 2010, Section 4.1 and Fig. 7](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Narrative structure tactics, three subdivisions:
  - Ordering: random access, user directed path, linear ("Sometimes this path is prescribed by the author (linear), sometimes there is no path suggested at all (random access), and other times the user must select a path among multiple alternatives (user-directed)").
  - Interactivity: hover highlighting / details, filtering / selection / search, navigation buttons, very limited interactivity, explicit instruction, tacit tutorial, stimulating default views.
  - Messaging: captions / headlines, annotations, accompanying article, multi-messaging, comment repetition, introductory text, summary / synthesis.
  [Segel and Heer 2010, Section 4.1 and Fig. 7](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Observations (Section 4.2): ordering strategies cluster into distinct genres; interaction design is consistent across examples; narrative messaging is under used, specifically "repetition of key points, introductory texts, and final summaries and syntheses." Messaging is more used in slideshows and videos, "which may explain why qualitatively these visualizations feel more like 'stories' and less like data tools." "Stimulating default views" are defined as "a device analogous to journalistic leads." [Section 4.2](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Author driven vs reader driven (Table 1, Section 4.4): author driven = linear ordering of scenes, heavy messaging, no interactivity; reader driven = no prescribed ordering, no messaging, free interactivity. Author driven "works best when the goal is storytelling or efficient communication"; reader driven "supports tasks such as data diagnostics, pattern discovery, and hypothesis formation." Most examples sit between. [Section 4.4](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Martini glass (4.4.1): begins author driven ("questions, observations, or written articles to introduce the visualization"), then "opens up to a reader-driven stage." Stem = single path author narrative; mouth = reader paths. Stem can be short or long (question, observation, article). The authored segment may serve as "a jumping off point." It is "the most common across the interactive visualizations we examined." [Section 4.4.1](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Interactive slideshow (4.4.2): "follows a typical slideshow format, but incorporates interaction mid-narrative within the confines of each slide." Individual slides often work martini glass style. Works well for complex data (walk through dimensions step by step) and complex narratives ("draw discrete boundaries between different story segments, similar to a cut in film"). [Section 4.4.2](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Drill down story (4.4.3): "presents a general theme and then allows the user to choose among particular instances of that theme to reveal additional details and backstories." Puts more weight on the reader but "still requires significant amounts of authoring." [Section 4.4.3](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)

### Inferences
- A portfolio case study page is a strongly author driven artifact: linear scroll, heavy messaging, little interactivity. By Segel and Heer's own mapping it should lean on messaging tactics they found under used: introductory text, comment repetition of the key point, and a closing summary / synthesis.
- The genre list is effectively a per beat menu once read at frame level: one frame with text around it (magazine style), one chart carrying its own explanation (annotated chart), several views with loose order (partitioned poster), explicit arrows and path (flow chart), strict linear panels (comic strip), one stepped view at a time (slide show), motion (film). A beat about a process maps to flow chart; a beat about a comparison of parts maps to partitioned poster; a beat about change over time in discrete steps maps to comic strip.
- The "consistent visual platform" and "progress tracker" items are the paper's answer to orientation on a long page: keep a recurring frame and show position.

### Gaps
- Segel and Heer do not give a message type to genre mapping; they explicitly decline to ("no right answer a priori").

## 2. Hullman and Diakopoulos 2011; Hullman et al. 2013 on sequence

### Takeaway
Hullman et al. 2013 find professional linear data stories change one data dimension at a time between consecutive views, and repeat transition patterns (parallelism). Audiences prefer low cost transitions (cost 1 strongly preferred over 2 or 3), rank transition types Temporal > (Dimension | Measure) > Granularity, and remember sequences with perfect parallelism better.

### Cited findings
- Paper: Hullman, Drucker, Henry Riche, Lee, Fisher, Adar, "A Deeper Understanding of Sequence in Narrative Visualization", IEEE InfoVis 2013 (Best Paper). PDF: [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf); [MSR page](https://microsoft.com/en-us/research/?p=166750).
- Corpus: 42 explicitly linear professional narrative visualizations from 2006 to 2012; 23 interactive slideshows, 7 animated data videos, 6 interactive timelines, 1 live narrated, 5 static slideshows (Section 3.2.1). [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Transition types (Table 1, Section 3.2.2), with prevalence across the 42:
  - Dialogue: Question and Answer (4/42); Who, What, When, Where, Why, How (3/42); category total 16.7%. Definition: "a question asked in one state is followed by a visualization that answers that question."
  - Temporal: simple chronological (29/42), reverse chronological (11/42), future chronological (12/42); total 88.1%. Orderings "based on a time variable."
  - Causal: explicit cause (7/42), alternative reality (3/42); total 23.8%. "one visualization state follows another to explicitly hypothesize a causal relationship."
  - Granularity: general to specific (28/42), specific to general (16/42); total 71.4%. Ordered "based on the level of detail or degree of filtering."
  - Comparison: dimension walk (20/42), measure walk (19/42); total 64.3%. "either the independent variable (i.e., dimension) or the dependent variable (i.e., measure) is held constant while the other is changed."
  - Spatial: spatial proximity (10/42); 23.8%. A subset of comparison where the same measure is shown for different areas in sequence.
  [Hullman et al. 2013, Table 1 and Section 3.2.2](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Key property: "each represents a single change in one dimension of a data representation from one slide (visualization) to the next." Designers "tended to choose one dimension (such as time) and maintain the others." [Section 3.2.2](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Explicit vs implicit transitions: Dialogue and Causal require the author's interpretation (explicit); Temporal, Granularity, Spatial and Comparison can be inferred from data attributes (implicit). [Section 3.2.2](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Transition parallelism defined: designers "repeated a pattern comprised of two or more transition types, as if to lend consistency to the presentation's structure as well as to equate different parts of a presentation," named after linguistic parallelism. Example: NYT "Copenhagen: Emissions, Treaties, and Impacts" repeats general to specific (global map to region) then reverse chronological (past symptom) for each of three climate outcomes, which together form a measure walk (Fig. 1). [Section 3.2.2](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Consistency principle and its limit: "A series of nearly identical visualizations may be perceived as boring, but the introduction of new unknowns must proceed slowly enough that the user can comprehend the sequence and does not become cognitively overloaded." When several things change at once, slideshows with animation often used partial animation. [Section 3.2.2](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Transformation cost (Section 4.2.1): total number of changes to independent variable, dependent variable, time and level of granularity between two consecutive views. [Section 4.2.1](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Result, cost (Section 5.1): participants "are much less likely to choose a higher cost transition relative to a transition with a cost of '1'," but showed no difference between cost 2 and cost 3. [Section 5.1](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Result, type at equal cost (Section 5.1): "Temporal > (Dimension | Measure) > Granularity" (all p<0.01). An order effect based on position in the layout was also observed. [Section 5.1](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Result, parallelism (Section 5.2, 82 recruited, 73 analysed): memory for the original sequence was significantly better with "perfect" parallelism than with reversed variants (ANOVA F(3,69)=5.59, p=0.002). Rated difficulty of explaining the order was higher for reversed sequences (4.79 vs 4.03) but only marginally significant (p=0.06); understandability ratings did not differ significantly (p=0.21); comparison accuracy differences by sequence were not significant. [Section 5.2.3](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Between-group (interleaved, "measure walk") sequences are expected to support comparing groups on each measure; within-group ("dimension walk") sequences support comparing measures within a group. The expectation was directionally but not significantly supported. [Section 5.2.1 and 5.2.3](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Open question the authors flag: whether annotations or a presenter's explanation can overcome the cost of a complex transition (Section 6.1.2). [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)

### Inferences (for ordering beats on a page)
- Between adjacent beats, change one thing. If beat N shows the framework at time A, beat N+1 should show either the same framework at time B (temporal), or a zoom into one part of it (granularity), or the same view for a different subject (comparison), not all three.
- Prefer time as the spine. Temporal transitions were the most common (88%) and most preferred, so a "before, then the decision, then after" order is the lowest friction default. Zooming in (general to specific) is common (71%) but least preferred in isolation, so it benefits from an explicit bridge line.
- When a case study has parallel parts (three constraints, three decisions), give each the same internal beat pattern in the same order. Parallelism measurably improved recall of the sequence; breaking the pattern hurt it.
- Causal and Q&A transitions are author asserted, not visible in the data, so they need explicit messaging (a headline that states the cause or poses the question).

### Gaps
- Hullman and Diakopoulos 2011 not yet covered here (see section 3).

## 3. Visualization rhetoric (2011) and later taxonomies: Lee 2015, Stolper 2016, Bach 2018 data comics, Bach 2018 narrative patterns

### Takeaway
The closest thing in the literature to a "message type to visual form" table is Bach et al. 2018 "Design Patterns for Data Comics": a grid of content relation (narrative, temporal, faceting, visual encoding, granular, spatial) against panel layout (large panel through linear), with named patterns in the cells. Lee et al. 2015 supply the process (story pieces, each visualized for one message, then ordered), which matches the beat step being designed. Stolper et al. 2016 and Bach et al.'s 18 narrative patterns supply the toolkit of linking, structure and framing devices.

### Cited findings: Hullman and Diakopoulos 2011, visualization rhetoric
- Paper: Hullman and Diakopoulos, "Visualization Rhetoric: Framing Effects in Narrative Visualization", IEEE TVCG 17(12):2231 to 2240, 2011. [PDF](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Four editorial layers where framing enters (Section 3.1): "the data, visual representation, textual annotations, and interactivity." Each layer is a site to "either add information ... or omit information." [Section 3.1](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Classes of rhetorical technique (Sections 3.2.2 to 3.2.6): information access rhetoric (what data is shown or omitted), provenance rhetoric (signals of transparency and trustworthiness, e.g. data source citations), mapping rhetoric (the data to visual transfer function, including contrast and classification such as grouping by color), linguistic based rhetoric (typographic emphasis, irony, metaphoric statements, rhetorical questions, apostrophe), procedural rhetoric (interaction, including anchoring via default views and fixed comparisons). [Sections 3.2.2 to 3.2.6](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Top ten techniques by frequency in their sample: "grouping by color, aggregating values, suggestive spatial mappings, goal suggestions, bolded fonts, data source citations, metaphoric statements, color mappings, apostrophe, and variable splices." [Section 3.2.7](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Cross layer dependency: "the effectiveness of individual strategies depends on references to other layers of the presentation"; e.g. a title's double meaning depends on visual metaphors in the graph. Analogy and parallelism in titles "nearly always occurred with more extreme assumptions" about reader knowledge. [Section 3.2.7](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Default view as anchor: "Default views provide an initial point of interpretation anchored to the default visual configuration." [Section 3.2.6](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)

### Cited findings: Lee, Riche, Isenberg, Carpendale 2015
- Paper: "More than Telling a Story: Transforming Data into Visually Shared Stories", IEEE CG&A 35(5):84 to 90, 2015. [PDF](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/StorytellingProcess-CGA2015.pdf)
- Definition of a visual data story, three points: (1) "a set of story pieces, that is, specific facts backed up by data"; (2) "Most of the story pieces are visualized to support one or more intended messages," with annotations or narration "to clearly highlight and emphasize this message and to avoid ambiguity (especially for asynchronous storytelling)"; (3) "Story pieces are presented in a meaningful order or with a connection between them." [Lee et al. 2015, p. 85](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/StorytellingProcess-CGA2015.pdf)
- Process (Fig. 2): explore data (output: data excerpts) then make a story (output: story pieces assembled into a plot) then tell a story (build presentation into story material, share, respond to input). Roles: data analyst, scripter ("builds the plot"), editor ("prepares the story material"), presenter, audience. [Lee et al. 2015, pp. 85 to 87](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/StorytellingProcess-CGA2015.pdf)
- Making a story activities: "ordering, establishing logical connections, developing flow, formulating a message, and creating the denouement." The plot "describes how the story pieces are related (in time, cause and effect, patterns, and so on)." "The sequence plays a critical role in a story; the same set of excerpts can have impact or can fall flat." [p. 86](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/StorytellingProcess-CGA2015.pdf)
- The authors argue for separating plot making from presentation building, since in practice they are often merged and require different skill sets. [p. 86](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/StorytellingProcess-CGA2015.pdf)
- Four settings (Table 1): live presentations (synchronous, colocated, low participation); dynamic discussions (synchronous, colocated, high); recorded videos and static infographics (asynchronous, distributed, low); guided tours and interactive infographics (asynchronous, distributed, high). [p. 86](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/StorytellingProcess-CGA2015.pdf)

### Cited findings: Stolper, Lee, Henry Riche, Stasko 2016
- Paper: "Emerging and Recurring Data-Driven Storytelling Techniques: Analysis of a Curated Collection of Recent Stories", Microsoft Research TR 2016-14. 45 stories from 2011 to early 2015. [PDF](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)
- Four categories and 20 techniques (Table 1, Section 4):
  - Communicating narrative and explaining data: textual narrative, audio narration, flowchart arrows, labeling, text annotations on visualizations, tooltips, element highlighting.
  - Linking separated story elements: linking through interaction, linking through color, linking through animation.
  - Enhancing structure and navigation: next/previous buttons, scrolling, breadcrumbs, section header buttons, menu selection, timeline, geographic map.
  - Providing controlled exploration: dynamic queries, embedded exploratory visualizations, separate exploratory visualization.
  [Stolper et al. 2016, Table 1 and Section 4](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)
- "Approximately half of the stories we analyzed included some form of textual annotation directly on the chart." Flowchart arrows "connect components of the story when the author's intended ordering may be unclear." [Section 4.1](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)
- Linking text and chart through shared color: coloring a category name in the text with the color of its line in the chart. [Section 4.2](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)
- Proposed new genre, the scroller: a hybrid of Segel and Heer's slide show and magazine style where scrolling moves between scenes; scrollers "more strongly enforce the linearity of their stories." Most stories in their set were magazine style. [Section 5.2](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)
- Rationale for constrained exploration: if readers can change a view significantly, "the data displayed may no longer be consistent with the narrative surrounding it." [Section 4.4](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)

### Cited findings: Bach, Wang, Farinella, Murray-Rust, Henry Riche 2018, data comics design patterns
- Paper: "Design Patterns for Data Comics", CHI 2018, DOI 10.1145/3173574.3173612. [Author PDF](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf); full pattern list online at patterns.datacomics.net (cited in the paper, footnote 5).
- A pattern = "a set of panels" with a specific panel layout and content relation; the design space is layout (columns) by content relation (rows) (Fig. 5). [Bach et al. 2018](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf)
- Content relation was derived from McCloud's panel transitions (moment-to-moment, action-to-action, subject-to-subject, scene-to-scene, aspect-to-aspect, non-sequitur) and Hullman et al.'s sequence types; it keeps "temporal, granular, facets." [Bach et al. 2018](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf)
- Nine panel layouts, on a spectrum from non-linear through guided to linear (Fig. 4), coded from 59 infographics in Best American Infographics 2015: large panel (open reading), annotated (small panels tied to parts of a large one via arrows, numbers or lines), tiled (no hierarchy beyond natural reading order), grouped (hierarchical nesting), grid (equal panels, small multiples, many reading orders), parallel (two or more side by side, reader switches; often for alternatives), network (non-linear, arrows), branched (one sequence splits into alternatives and may rejoin), linear (single explicit reading order). Flow marks = "all graphical elements that communicate an explicit reading order between panels: arrows, numbers, human characters pointing." [Bach et al. 2018, Dimension II](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf)
- Content relations and named patterns (Data Comic Design Patterns section and Fig. 5 and 6):
  - Narrative: connect visualizations to reader, narrator and context. Patterns: exposé ("introduces the data context, problems and questions, demonstrating importance"), question and answer, multiple explanations (keep the visualization the same while explaining different aspects across panels), flashback, state panels.
  - Temporal: change over time. Patterns: time sequence (moments as panels, akin to small multiples), time grid (two reading axes, e.g. calendar), time nesting (short events nested inside panels for longer periods), before/after, moments, time overlay, time states, alternative tracks.
  - Faceting: "complementary views on different parts of the data." Patterns: multiple facets (tiled or grid), contrast (two isolated panels in a parallel layout), alternatives (sequences branching from a linear one).
  - Visual encoding: help the reader read the chart. Patterns: build-up ("gradually introducing the parts; e.g. introducing axes, scales ... visual marks and visual mappings"), legend (a panel before the chart), annotated transition, gradual reveal.
  - Granular: levels of detail. Patterns: zoom, cut-out, lens, overview+detail (large overview panel first, detail panels follow), the-larger-picture ("the inverse": small panels first, a large panel closes the story).
  - Spatial: narration across one picture. Patterns: space-walkthrough (one large background image with panels overlaid in sequence at important parts), pan, space-annotations, polyptychs.
  - Single panel patterns: highlighting, and text-legends "that color words in the text if they relate to elements in the visualization."
  [Bach et al. 2018](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf)
- Coverage: found patterns filled about 37% of design space cells; systematic filling took it to 53%. Patterns were made as workshop cards (name, description, abstract illustration, example); 23 participants signed up for a 3.5 hour storyboard workshop. [Bach et al. 2018](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf)

### Cited findings: Bach et al. 2018, narrative design patterns (Data-Driven Storytelling, chapter 5)
- Chapter in Riche, Hurter, Diakopoulos, Carpendale (eds.), Data-Driven Storytelling, CRC Press 2018. [MSR page](https://www.microsoft.com/en-us/research/publication/narrative-design-patterns-for-data-driven-storytelling/)
- Five (overlapping) categories as summarized by Blount et al. 2020: argumentation ("reasoning systematically to support messages and arguments"), flow ("helping structure the sequence of messages and arguments"), framing ("the way facts and events in a story are perceived and understood through narration"), emotion, engagement. [Blount et al. 2020, Section 2](https://www.scitepress.org/Papers/2020/101216/101216.pdf)
- The 18 patterns with short definitions (Blount et al. Table 1, citing Bach et al. 2018a): addressing the audience; breaking the 4th wall; call for action; compare ("multiple visualisations juxtaposed and highlighting the difference"); concretise ("abstract concepts or numbers into solid and known references"); convention breaking; defamiliarisation; exploration; familiarisation; gradual reveal ("Unfolding a narrative in a hierarchical way (e.g., different granularity or subsets)"); humans behind the dots; make a guess; physical metaphor ("Using direction and space in visualisations to convey different kinds of information"); repetition ("the same type of visualisations to present an effect repeatedly through different data dimensions"); rhetorical question; silent data ("de-emphasising or hiding some data"); speed up / slow down; users find themselves. [Blount et al. 2020, Table 1](https://www.scitepress.org/Papers/2020/101216/101216.pdf)
- Novice use: compare and exploration were the most used; wall and speed were not used. [Blount et al. 2020](https://www.scitepress.org/Papers/2020/101216/101216.pdf)

### Inferences
- A usable per beat lookup comes straight from Bach's content relation rows. Change over time beat: time sequence, before/after or time nesting. Framework beat (a structure with parts): build-up (introduce the parts one at a time) or overview+detail. Decision beat with options: contrast (parallel) or alternatives (branched). Constraint beat: the exposé pattern plus silent data or a contrast against what was wanted. Opening beat: exposé. Closing beat: the-larger-picture.
- Lee et al.'s definition is the per beat rule: one story piece, one intended message, annotated so it cannot be misread without a presenter. A portfolio is the "static infographic" setting (asynchronous, distributed, low participation), which is exactly where they say annotation must carry the message.
- Stolper's "linking through color" and Bach's "text-legend" both say the same thing for a case study: color the term in the body copy with the color it has in the diagram.

### Gaps
- Kosara and Mackinlay 2013 covered in section 4.
- Per pattern category assignment for Bach's 18 narrative patterns is a checkmark table I could not extract; only the category definitions and pattern definitions are confirmed.
- I could not access patterns.datacomics.net descriptions for every pattern; names in Fig. 5 are confirmed, but definitions are confirmed only for those described in the paper text.

## 4. Kosara and Mackinlay 2013

### Takeaway
Only bibliographic and abstract level detail was confirmed; the paper argues presentation deserves research attention equal to exploration and analysis.

### Cited findings
- Kosara and Mackinlay, "Storytelling: The Next Step for Visualization", IEEE Computer 46(5):44 to 50, 2013. The abstract says presentation and communication of data have played a minor role in visualization research next to exploration and analysis, and argues storytelling based presentation should get equal attention. [Tableau Research listing](https://www.tableau.com/research/publications/storytelling-next-step-visualization)

### Gaps
- The full text could not be retrieved (Tableau page returned 403 to the fetcher; no author PDF found at kosara.net or eagereyes.org). Its definitions of a story and of presentation settings are not confirmed here. Lee et al. 2015 Table 1 (section 3 above) covers similar ground on settings and is confirmed.

## 5. Cairo: form and function, the visualization wheel, choosing by task

### Takeaway
Cairo's position is that the function of a graphic narrows the forms it can take, not that form mechanically follows function. The wheel is a six axis profile for balancing depth against lightness for a given audience. His concrete task advice confirmed here is about perceptual accuracy: for precise comparison, encode with length (bars) rather than area (bubbles).

### Cited findings
- In his own words (Peachpit interview about The Functional Art, 16 Oct 2012): "function constrains the variety of forms that the data can adopt"; "an infographic or a visualization is first of all a tool"; "you have to adapt the form of the graphic to the function that that graphic has to facilitate." [Peachpit interview with Cairo](https://www.peachpit.com/articles/article.aspx?p=1951176)
- Task example from the same interview: for precise comparison such as unemployment by state, "it is much better to encode the data using a bar chart rather than using a bubble chart," because the brain judges length more accurately than area. [Peachpit interview](https://www.peachpit.com/articles/article.aspx?p=1951176)
- Kosara's review of the book singles out "function constrains form" as its central lesson. [eagereyes review](https://eagereyes.org/blog/2012/review-alberto-cairo-functional-art)
- The visualization wheel has six axes: abstraction / figuration, functionality / decoration, density / lightness, multidimensionality / unidimensionality, originality / familiarity, novelty / redundancy. The upper half of the wheel corresponds to deeper, more complex graphics; the lower half to lighter, easier ones. (Secondary: course handout and lecture slides, not the book itself.) [Course handout on the wheel](https://eclass.hmu.gr/modules/document/file.php/TP344/%CE%98%CE%B5%CF%89%CF%81%CE%AF%CE%B1/04.%20%CE%9C%CE%AC%CE%B8%CE%B7%CE%BC%CE%B1%204/VisualizationWheel.pdf); [FIU lecture slides](https://users.cs.fiu.edu/~giri/teach/5768/F18/lecs/Unit9-DataViz.pdf)
- Functionality / decoration: "the more decoration, the less functional" (course paraphrase, UW Madison). [UW Madison course notes](https://pages.graphics.cs.wisc.edu/765-22/feedback/eow02)

### Inferences
- For a portfolio reader (a hiring manager skimming, then a design lead reading closely) the wheel argues for a split: lighter, familiar and unidimensional forms for the skim layer; denser, multidimensional forms only where the beat's job is to prove rigor.
- "Function constrains form" is the same move as naming what the reader must understand before choosing a form. A beat whose function is "compare two options precisely" rules out area encodings and decorative figuration.

### Gaps
- I did not retrieve Cairo's own text listing tasks to forms (The Functional Art's adaptation of the Cleveland and McGill accuracy ranking, or How Charts Lie). Claims about How Charts Lie are therefore not included.
- The wheel axis labels come from secondary teaching material; verify wording against The Functional Art (New Riders, 2013).

## 6. Knaflic: big idea, 3 minute story, storyboard, horizontal and vertical logic

### Takeaway
Knaflic's planning sequence is: distill the message (3 minute story, then a one sentence Big Idea), storyboard it on sticky notes (brainstorm, then edit), then test it (horizontal logic across the titles, vertical logic within each page, reverse storyboarding, fresh perspective).

### Cited findings
- 3 minute story: "If you had only three minutes to tell your audience what they need to know: what would that sound like?" Being able to do this frees you from dependence on slides. [SWD blog, the 3-minute story](https://www.storytellingwithdata.com/blog/2014/02/the-3-minute-story)
- Big Idea: distills the so-what "to a single sentence," "an even higher level aggregation" than the 3 minute story. Three components (credited to Nancy Duarte's Resonate): it must "articulate your unique point of view," "convey what's at stake," and be "a complete sentence." [SWD blog, what's the Big Idea](https://www.storytellingwithdata.com/blog/2014/02/whats-big-idea)
- Storyboarding with sticky notes, two steps: brainstorming ("a stack of sticky notes and writing down potential pieces of content, without any concern for whether they make it into the final communication"), then editing ("group related topics," pick the structure that will "pull them together," "discard some ideas"). Notes are arranged along a narrative arc; each note can become a slide, report section or dashboard graph. [SWD blog, sticky notes](https://www.storytellingwithdata.com/blog/2018/11/1/swdchallenge-sticky-notes)
- Horizontal logic: "read just the slide title of each slide throughout your deck" and together the titles tell the story; requires "action titles (not descriptive titles)"; optionally an executive summary up front with "each bullet corresponding to a subsequent slide title in the same order." [SWD blog, horizontal logic](https://www.storytellingwithdata.com/blog/2013/12/horizontal-logic)
- Vertical logic: "all information on a given slide is self-reinforcing." What is cut or moved to an appendix matters about as much as what is kept. [SWD blog, vertical logic](https://www.storytellingwithdata.com/blog/2013/12/vertical-logic)
- Reverse storyboarding: flip through the finished piece and write down the main point of each page; compare the list to the intended outline. [SWD blog, reverse storyboarding](https://www.storytellingwithdata.com/blog/2013/12/reverse-storyboarding)
- Fresh perspective: have someone without context talk aloud through what they notice, what seems important and where they have questions. [SWD blog, a fresh perspective](https://www.storytellingwithdata.com/blog/2013/12/a-fresh-perspective)

### Inferences
- Horizontal logic translates directly to a case study page: the section headlines alone, read top to bottom, should tell the case. Vertical logic is the per beat test: the headline, visual and copy of one beat all make the same single point (this is Lee et al.'s "one intended message" rule in practitioner form).
- The sticky note storyboard is the beat list. Its edit step (group, choose a structure, discard) is where Hullman's sequencing guidance applies.

### Gaps
- Knaflic's book chapter "choosing an effective visual" (her short list of most used visuals) was not retrieved from a primary or official source this session, so the list is not reported. Verify in Storytelling with Data (Wiley, 2015), chapter 2.

## 7. Tufte: small multiples, layering, micro/macro, sparklines, PowerPoint, cause and effect, integration

### Takeaway
Tufte's relevant ideas for per beat form: show comparison ("compared to what?"), use small multiples for change and alternatives, integrate words and images rather than separating them, support micro and macro readings at once, and distrust slide style low resolution sequencing that breaks reasoning into isolated fragments. Most Tufte material here is from secondary summaries; only the sparkline material is from his own site.

### Cited findings
- Envisioning Information (1990) chapter list: Escaping Flatland; Micro/Macro Readings; Layering and Separation; Small Multiples; Color and Information; Narratives of Space and Time; Epilogue. [Open Library record](https://openlibrary.org/books/OL1944269M/Envisioning_Information)
- "At the heart of quantitative reasoning is a single question: Compared to what?" (Envisioning Information, p. 67, per secondary citation). Small multiples answer it by enforcing comparisons of changes, differences among objects and the scope of alternatives. [Wikipedia, Small multiple](https://en.wikipedia.org/wiki/Small_multiple)
- Small multiples let readers compare inter frame differences in parallel instead of flipping between frames ("one damned thing after another"); causality displays should let viewers check that presence of cause aligns with presence of effect and absence with absence. (Course summary.) [Berkeley summary of Tufte's course](https://people.eecs.berkeley.edu/~ddgarcia/tufte.html)
- Micro/macro: a design supports two levels of reading, the overall shape and close detail. Layering and separation: elements share space when separated by value, weight, hue or transparency; "1 + 1 = 3" names the unintended extra element two adjacent marks create. (Secondary summaries; examples differ between sources.) [Antoine Buteau, lessons from Tufte](https://www.antoinebuteau.com/lessons-from-edward-tufte/)
- Sparklines, from Tufte's site: "A sparkline is a small intense, simple, word-sized graphic with typographic resolution"; "data-intense, design-simple, word-sized graphics"; they go "everywhere a word or number can be: embedded in a sentence, table, headline"; "Data graphics should have the resolution of typography." [Tufte, Sparkline theory and practice](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)
- Beautiful Evidence (2006), chapter "The Fundamental Principles of Analytical Design" (from p. 122): show comparisons, contrasts, differences; show causality, mechanism, explanation, systematic structure; show multivariate data; completely integrate words, numbers, images, diagrams; thoroughly describe the evidence (documentation). (Secondary summaries; the fifth is less consistently reported.) [Fortnightly Review](https://fortnightlyreview.co.uk/?p=9451); [ChemEdX review](https://chemedx.org/node/930)
- The Cognitive Style of PowerPoint (2003; 2006 edition "Pitching Out Corrupts Within"): problems listed include foreshortening of evidence, low spatial resolution, an intensely hierarchical single path structure, and rapid temporal sequencing of thin information rather than focused spatial analysis. Counterpoint: Kosslyn and others argue the cognitive style comes from presenter choices, not the software. (Secondary.) [Rollins book notes](https://myweb.rollins.edu/jsiry/Book_Notes-.html); [Farkas, Toward a Better Understanding of PowerPoint](https://faculty.washington.edu/farkas/dfpubs/Farkas-Toward%20A%20Better%20Understanding%20of%20PowerPoint.pdf)
- Visual Explanations (1997) is catalogued as presenting information about "motion, process, mechanism, cause and effect." [Wikipedia, Small multiple](https://en.wikipedia.org/wiki/Small_multiple) (no primary text retrieved)

### Inferences
- For a change over time beat, the Tufte answer is small multiples of the same frame (same as Bach's time sequence and Hullman's one dimension change), not a single before and after hero image with different framing.
- For a framework or decision beat, the analytical design principles ask the beat to show mechanism ("why this works") and comparison ("versus what"), and to put the words on the diagram, not in a caption block below it.
- A scroll of full width, one point per screen sections is the PowerPoint style Tufte criticizes; micro/macro argues for at least some beats where the reader sees the whole system and the detail in one view.

### Gaps
- No primary Tufte text for small multiples, layering, micro/macro, PowerPoint or Visual Explanations was retrieved; quotes are from secondary sources and should be checked against the books before being relied on.

## 8. Visualizing qualitative or conceptual information

### Takeaway
The narrative visualization literature is built on data; the parts that transfer to qualitative beats are Bach's narrative, visual encoding, faceting and spatial patterns, Hullman's dialogue and causal transitions, and Segel and Heer's flow chart genre. A concept and strategy diagram taxonomy exists (Lengler and Eppler) but was only confirmed at summary level.

### Cited findings
- Lengler and Eppler, "Towards a Periodic Table of Visualization Methods for Management", IASTED GVE 2007: 100 methods in six categories; summaries name data visualization and information visualization, and say methods are also classed by structure vs process, overview vs detail (or both), and divergent vs convergent thinking. [Tyner Blain summary](https://tynerblain.com/2007/07/25/interface-design-visualization-methods/); [Americans for the Arts listing](https://americansforthearts.org/by-program/reports-and-data/legislation-policy/naappd/towards-a-periodic-table-of-visualization-methods-for-management)
- Tversky, "Visualizing Thought", Topics in Cognitive Science 3 (2011): 499 to 535. Abstract: depictive expressions of thought predate writing, and consistencies in visual communication reveal how people think and can guide design. [Academia.edu listing](https://www.academia.edu/2955798/Visualizing_Thought)
- Segel and Heer's flow chart genre and Stolper's "flowchart arrows" technique ("connect components of the story when the author's intended ordering may be unclear") are the confirmed narrative visualization tools for process beats. [Segel and Heer 2010](https://homes.cs.washington.edu/~jheer/files/narrative.pdf); [Stolper et al. 2016](https://microsoft.com/en-us/research/wp-content/uploads/2016/04/MSR-TR-2016-14-Storytelling-Techniques.pdf)
- Bach's build-up pattern ("gradually introducing the parts") and multiple explanations pattern (same visualization, different aspects highlighted per panel) apply to any diagram, not only charts. [Bach et al. 2018](https://aviz.fr/~bbach/datacomics/Bach2018designpatterns.pdf)

### Inferences: a combined per beat step a designer can run
1. Name the story piece and its one message (Lee et al. 2015; Knaflic vertical logic). Write it as an action headline so the headlines alone tell the case (Knaflic horizontal logic).
2. Classify the beat by content relation (Bach 2018 rows, aligned with Hullman 2013 transitions): narrative/setup, temporal (change over time), faceting/comparison (options, constraints vs goals), visual encoding (teach how to read a framework), granular (overview then part), spatial (walk through one big artifact), causal or dialogue (author asserted link, needs text).
3. Pick the pattern in that row: e.g. temporal maps to time sequence, before/after or time nesting; framework maps to build-up then overview+detail; decision maps to contrast (parallel) or alternatives (branched); system walkthrough maps to space-walkthrough or annotated large panel; opening maps to exposé; closing maps to the-larger-picture (Bach 2018). Check against Cairo's function constrains form (precise comparison means length, not area).
4. Pick the layout from Bach's nine layouts by how much order the beat needs: linear for strict sequence, parallel for two things the reader should switch between, grid for small multiples, annotated or large panel for one artifact read in detail. Add flow marks where order is not obvious (Bach; Stolper flowchart arrows).
5. Sequence beats so adjacent beats change one dimension (Hullman 2013), default to temporal order, repeat the same internal pattern for parallel parts, and keep a consistent visual platform plus a position cue (Segel and Heer visual structuring).
6. Put messaging on the visual: annotations, color linked terms in the copy, an introduction and a closing synthesis (Segel and Heer messaging; Stolper linking through color; Bach text-legend; Tufte integration).

### Gaps
- Tversky's specific claims about what lines, boxes, arrows and spatial arrangement convey in diagrams were not retrieved (PDF unavailable); they are a likely strong source for qualitative beats and worth a direct read.
- Lengler and Eppler's remaining four category names (commonly given as concept, strategy, metaphor, compound) were not confirmed from a primary source this session.
- No study found that tests narrative sequencing or form choice for qualitative (non data) beats specifically; the transfer from data stories to case study beats is inference.
