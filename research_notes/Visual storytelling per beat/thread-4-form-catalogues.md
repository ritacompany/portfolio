Agent: visual-form-catalogues researcher

# Catalogues of visual forms a designer can name as the reference when picking a form per story beat

Scope note: checked 9 October 2026. "Maintenance status" is taken from repo push dates, copyright footers and post dates, as noted per item. Copyright footers that show the current year (2026) only prove the site is live, not that the content was updated.

## FT Visual Vocabulary (Financial Times Visual Journalism Team)

### Takeaway
The FT Visual Vocabulary asks for the message or relationship you want to show, not the data type. It sorts 70+ chart forms into nine relationship categories. It is the most citable message-first chooser, but almost all of its forms are quantitative. Its only non-numeric conceptual forms are Venn, network, chord and Priestley timeline.

### Cited findings
- Stated purpose: a poster and web site "to assist designers and journalists to select the optimal symbology for data visualisations". It sits at the core of a newsroom chart literacy training. It is "not an attempt to teach everyone how to make charts, but how to recognise the opportunities to use them effectively alongside words". Inspired by the Graphic Continuum (Schwabish and Ribecca). Source: [chart-doctor README](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
- The web version's intro tells you to "decide which data relationship is most important in your story". It calls the list "not meant to be exhaustive, nor a wizard" but a "starting point". Source: [ft-interactive.github.io/visual-vocabulary](https://ft-interactive.github.io/visual-vocabulary/) (D3 page reading chartTypes.csv)
- The nine categories, their one-line definitions and their forms. Source for all: [chart-doctor README](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md); form list also in [chart-doctor/visual-vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
  - Deviation: "Emphasise variations (+/-) from a fixed reference point"; can also show sentiment. Forms: diverging bar, diverging stacked bar, spine chart, surplus/deficit filled line.
  - Correlation: "Show the relationship between two or more variables". It warns that readers will assume the relationships are causal. Forms: scatterplot, line + column, connected scatterplot, bubble, XY heatmap.
  - Ranking: "Use where an item's position in an ordered list is more important than its absolute or relative value". Forms: ordered bar, ordered column, ordered proportional symbol, dot strip plot, slope, lollipop.
  - Distribution: "Show values in a dataset and how often they occur". Forms: histogram, boxplot, violin, population pyramid, dot strip plot, dot plot, barcode plot, cumulative curve.
  - Change over time: "Give emphasis to changing trends". Forms: line, column, line + column, stock price, slope, area, fan chart (projection), connected scatterplot, calendar heatmap, Priestley timeline, circle timeline, seismogram.
  - Magnitude: "Show size comparisons", usually counted numbers. Forms: column, bar, paired column, paired bar, proportional stacked bar, proportional symbol, isotype (pictogram), lollipop, radar, parallel coordinates.
  - Part to whole: "Show how a single entity can be broken down into its component elements". Forms: stacked column, proportional stacked bar, pie, donut, treemap, Voronoi, arc, gridplot, Venn, waterfall.
  - Spatial: used "only when precise locations or geographical patterns in data are more important to the reader than anything else". Forms: choropleth, proportional symbol, flow map, contour map, equalised cartogram, scaled cartogram, dot density, heat map.
  - Flow: "Show the reader volumes or intensity of movement between two or more states or conditions. These might be logical sequences or geographical locations". Example uses include "relationship graphs". Forms: Sankey, waterfall, chord, network.
- Versions:
  - Poster PDF in English, Japanese, German, Spanish, French and traditional and simplified Chinese. Source: [chart-doctor/visual-vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
  - Interactive D3 web page. Source: [ft-interactive.github.io/visual-vocabulary](https://ft-interactive.github.io/visual-vocabulary/)
  - Separate D3 template repo in FT style ("Small examples of data driven graphics"), created 18 Sep 2015, last push 18 Aug 2021, no license file. Source: [GitHub API ft-interactive/visual-vocabulary](https://api.github.com/repos/ft-interactive/visual-vocabulary)
  - Short URL: ft.com/vocabulary. Source: [data.europa.eu guide](https://data.europa.eu/apps/data-visualisation-guide/visual-vocabulary)
- Vega edition: "Visual Vocabulary - Vega Edition" by Pratap Vardhan at Gramener. It is inspired by the FT and by Andy Kriebel's Tableau version. Its credits list FT Graphics as Alan Smith, Chris Campbell, Ian Bott, Liz Faunce, Graham Parrish, Billy Ehrenberg-Shannon, Paul McCallum and Martin Stabe. Source: [gramener.github.io/visual-vocabulary-vega](https://gramener.github.io/visual-vocabulary-vega/). The repo was created 28 Feb 2019, last push 1 Oct 2020. It has no license file. Source: [GitHub API gramener/visual-vocabulary-vega](https://api.github.com/repos/gramener/visual-vocabulary-vega)
- Tableau recreation: by Andy Kriebel. Source: [Tableau blog](https://tableau.com/blog/what-i-learned-recreating-financial-times-visual-vocabulary-tableau-94516)
- License and maintenance:
  - The chart-doctor repo is MIT licensed (created 9 Jun 2016, last push 12 Mar 2024, not archived). Source: [GitHub API Financial-Times/chart-doctor](https://api.github.com/repos/Financial-Times/chart-doctor)
  - The visual-vocabulary folder page states copyright belongs to The Financial Times Limited, all rights reserved, with republication through FT syndication. Source: [chart-doctor/visual-vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)
  - Conflict: the repo license (MIT) and the poster's rights statement (all rights reserved) disagree. Treat the poster artwork as FT copyright. Cite it, don't reproduce it.
  - The README calls its related reading "a work in progress". Source: [chart-doctor README](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
- Background: FT graphics staff had many discussions with non-graphics colleagues about which chart fit a story, and built the vocabulary to give everyone shared language. Source: [data.europa.eu guide](https://data.europa.eu/apps/data-visualisation-guide/visual-vocabulary); also [filwd, choosing chart choosers](https://filwd.substack.com/p/choosing-chart-choosers-with-nick)

### Inferences
- How to cite: name the category and form, for example "FT Visual Vocabulary, Flow: Sankey" or "FT Visual Vocabulary, Change over time: slope". The category is the "relationship" the beat is about, which maps cleanly onto a beat's "what the reader must understand" line.
- For a qualitative case study, the FT covers only the numeric beats (metrics, before and after numbers, ranking). It has no hierarchy, process, cycle, 2x2 or decision category.

### Gaps
- No primary page found that dates the first poster release. The linked Chart Doctor articles date from 2016 to 2017, per the README links, but the README itself is undated.

## Data Visualisation Catalogue (Severino Ribecca)

### Takeaway
A browsable library of around 60 forms. Its "search by function" has 16 functions, several of them conceptual (Concepts, Hierarchy, How things work, Processes and methods). That gives it the best coverage of explanatory diagrams among the classic chart catalogues, though the conceptual entries are thin (flow chart, illustration diagram, brainstorm, Venn).

### Cited findings
- It is "a project developed by Severino Ribecca to create a (non-code-based) library of different information visualisation types". Source: [datavizcatalogue.com/about](https://datavizcatalogue.com/about.html)
- The 16 functions are comparisons, proportions, relationships, hierarchy, concepts, location, part to a whole, distribution, how things work, processes and methods, movement or flow, patterns, range, data over time, analysing text and reference tool. The site warns that "the allocation of each chart into specific functions isn't a perfect system". Source: [datavizcatalogue.com/search](https://datavizcatalogue.com/search.html)
- Forms under the conceptually relevant functions:
  - Concepts: brainstorm, flow chart, illustration diagram, Venn diagram. Source: [search/concepts](https://datavizcatalogue.com/search/concepts.html)
  - Hierarchy: circle packing, sunburst, tree diagram, treemap. Source: [search/hierarchy](https://datavizcatalogue.com/search/hierarchy.html)
  - How things work: flow chart, illustration diagram, Sankey. Source: [search/how_things_work](https://datavizcatalogue.com/search/how_things_work.html)
  - Processes and methods: flow chart, Gantt chart, illustration diagram, parallel sets, Sankey. Source: [search/methods](https://datavizcatalogue.com/search/methods.html)
  - Part to a whole: donut, Marimekko, pie, stacked bar, sunburst, treemap. Source: [search/part_to_a_whole](https://datavizcatalogue.com/search/part_to_a_whole.html)
  - Data over time: area graph, bubble chart, calendar, candlestick, Gantt, heatmap, line graph, Nightingale rose, spiral plot, stacked area, stream graph, timeline, timetable. Source: [search/time](https://datavizcatalogue.com/search/time.html)
  - Relationships: arc diagram, brainstorm, bubble chart, chord, connection map, heatmap, Marimekko, network diagram, non-ribbon chord, parallel coordinates, radar, scatterplot, tree diagram, Venn. Source: [search/relationships](https://datavizcatalogue.com/search/relationships.html)
  - Movement or flow: connection map, flow map, parallel sets, Sankey. Source: [search/movement](https://datavizcatalogue.com/search/movement.html)
- Ribecca co-authored the Graphic Continuum poster (dated 9 Sep 2014) with Jon Schwabish. It plots "nearly 90" graphics in six groups: distribution, time, comparing categories, geospatial, part to whole and relationships. Source: [PolicyViz, Graphic Continuum](https://policyviz.com/2014/09/09/graphic-continuum/)
- License: only "©The Data Visualisation Catalogue", no year and no license terms. Source: [datavizcatalogue.com/search](https://datavizcatalogue.com/search.html)

### Inferences
- How to cite: "Data Visualisation Catalogue (Ribecca), Flow Chart". The URL pattern is datavizcatalogue.com/methods/flow_chart.html, as seen in the function page links.
- No cycle, matrix or 2x2 entry appears under any of the conceptual functions above. That is checked across concepts, hierarchy, how things work, methods and relationships.

### Gaps
- No last-updated date on the site. Maintenance status is unknown beyond the site being live.

## From Data to Viz (Yan Holtz and Conor Healy)

### Takeaway
A data-type decision tree with six roots (numeric, categoric, numeric and categoric, maps, network, time series), plus a strong caveats gallery. It is the least suited to qualitative beats, because input is the shape of a dataset. Its caveats pages are useful for any numeric beat.

### Cited findings
- Classification is "based on input data format". You "pick the main type using the buttons", and the tree narrows to forms. Each leaf links to a data story written in R with links to the R Graph Gallery. A poster view of the full tree exists. Source: [data-to-viz.com](https://www.data-to-viz.com/)
- Authors are Yan Holtz (data analyst) and Conor Healy (designer). The footer reads "Copyright © from Data to Viz 2018". Source: [data-to-viz.com](https://www.data-to-viz.com/)
- The caveats gallery is "a collection of dataviz caveats", filterable by top 10, improvement, misleading, map and bar. Entries include ordering data, cutting the Y axis, the spaghetti chart, the pie chart, histogram bin size, boxplots hiding information and error bars. Source: [data-to-viz.com/caveats](https://www.data-to-viz.com/caveats.html)
- The GitHub repo holtzy/data_to_viz is MIT licensed. It was created 19 Feb 2018 and last pushed 18 Oct 2024. Source: [GitHub API holtzy/data_to_viz](https://api.github.com/repos/holtzy/data_to_viz)
- Non-numeric forms appear only via the categoric and network branches (Venn, dendrogram, circular packing, network). Source: [data-to-viz.com](https://www.data-to-viz.com/)

### Inferences
- How to cite: "From Data to Viz, [data type] branch: [form]". Pair it with the caveat page when a numeric beat risks a misleading chart, for example "From Data to Viz caveat: cutting the Y axis".

### Gaps
- None material.

## Stephanie Evergreen and Jennifer Lyons, Qualitative Chart Chooser

### Takeaway
This is the only widely known chooser built for qualitative data. Its rows are the story you are telling (hierarchy, flow, comparison, cluster, comment/words). Its columns split forms into quantification and non-quantification. It maps closely to case study beats, but it is small (20 forms in v3.0), aimed at evaluation reporting, and has no cycle, 2x2 or cause and effect row.

### Cited findings
- Version 3.0 PDF, "By Jennifer Lyons & Stephanie Evergreen", upload path dated October 2017. Source: [Qualitative Chooser 3.0 PDF](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
- Its header question is "What story are you trying to tell?". Rows: hierarchy, flow, comparison, cluster, comment/words. Column groups: quantification (ways to highlight a word, thematic analysis) and non-quantification (ways to highlight a word, thematic analysis). Source: [Qualitative Chooser 3.0 PDF](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
- Row to form mapping, read from the v3.0 matrix. Source: [Qualitative Chooser 3.0 PDF](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
  - Hierarchy: concept mapping, dendrogram.
  - Flow: histomap, timeline, journey map, flow/path diagram.
  - Comparison: heatmap, speedometer, icons and color coding, indicator dots, Venn diagram, change photos.
  - Cluster: spectrum display, bubble chart, network mapping, mind mapping.
  - Comment/words: word cloud, quote and pic, callout box, bolded words.
- A user guide notes that quantifying qualitative data risks losing context and the personal nature of the data. Source: [USAID Learning Lab](https://usaidlearninglab.org/node/26474)
- A newer revamped chooser has 22 options, billed as "the largest collection of qual viz choices anywhere". It frames choice around four questions: individual, aggregate or themes; pure qual, light quant or concept; yes/no or a range; and time. It is gated behind an email sign-up form. Source: [stephanieevergreen.com/graphing-qualitative-data](https://stephanieevergreen.com/graphing-qualitative-data/)
- The chooser also appears in the second edition of *Effective Data Visualization* (inside back cover). Source: [SAGE product page](https://collegepublishing.sagepub.com/products/265203), as summarised in search results.
- Individual form pages on the site include gauge diagram, dendrograms, histomaps, Harvey balls and spectrum display. Source: [stephanieevergreen.com/qualitative-viz](https://stephanieevergreen.com/qualitative-viz)
- License: no reuse terms stated. Source: [stephanieevergreen.com/graphing-qualitative-data](https://stephanieevergreen.com/graphing-qualitative-data/)

### Inferences
- How to cite: "Evergreen and Lyons, Qualitative Chart Chooser 3.0 (2017), Flow: journey map". Prefer v3.0 because it is public and dated. The revamped version is gated, so a reader cannot verify a citation to it.
- "Change photos" under comparison is the only before and after form in any chooser reviewed here that is explicitly non-numeric.

### Gaps
- I could not see the contents of the revamped 22-option chooser because it is behind a form.

## Periodic Table of Visualization Methods (Lengler and Eppler, visual-literacy.org)

### Takeaway
This is the strongest catalogue for conceptual and strategy forms: 100 methods for management, with concept, strategy and metaphor groups. Each method is tagged process or structure, overview or detail and convergent or divergent. It is the only catalogue reviewed that names cycle, cause-effect chain, BCG matrix, magic quadrant, decision tree, swim lane, Minto pyramid and system loop diagrams as first-class forms. It dates from 2007 and is unmaintained.

### Cited findings
- Paper: Ralph Lengler and Martin J. Eppler, "Towards A Periodic Table of Visualization Methods for Management", University of Lugano. They found about 160 methods and cut them to 100. Selection criteria: fully documented, applied in real-life settings, fit for complex knowledge-intensive issues, usable by non-experts and evaluated before. Source: [visual-literacy.org periodic_table.pdf](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
- Published at IASTED GVE 2007. Source: [Americans for the Arts listing](https://americansforthearts.org/by-program/reports-and-data/legislation-policy/naappd/towards-a-periodic-table-of-visualization-methods-for-management); [USI publications](https://search.usi.ch/en/publications/1002)
- Definition used: "A visualization method is a systematic, rule-based, external, permanent, and graphic representation...". Source: [periodic_table.pdf](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
- The table is organised in two ways. Source: [periodic_table.pdf](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Periods (rows) are complexity, low to high. Groups (colours) are the application area.
  - There are six groups: data, information, concept, metaphor, strategy and compound visualization.
  - Each element is also tagged with type of representation: process (blue text: "stepwise cyclical in time and/or continuous sequential") or structure (black text: "hierarchy or causal networks").
  - Each element is tagged with point of view (overview, detail or both) and thinking aid (convergent reduces complexity; divergent adds it).
- Concept visualization is "methods to elaborate (mostly) qualitative concepts, ideas, plans, and analyses". Strategy visualization is "the systematic use of complementary visual representations to improve the analysis, development, formulation, communication, and implementation of strategies". Source: [periodic_table.pdf](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
- Element names, read from the table sheet in the PDF. Source: [periodic_table.pdf](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Concept group: mindmap, Venn/Euler diagram, cycle diagram, feedback cycle diagram, entity relationship diagram, Nassi-Shneiderman diagram, semantic network, flow chart, Pareto chart, clustering, system dynamics/loop diagrams, soft system modeling, layer chart, Minto pyramid technique, synergy map, square of oppositions, concentric circles, force field diagram, cause-effect chains, argument slide, Toulmin map, IBIS argumentation map, communication diagram, decision tree, process event chains, Gantt chart, CPM critical path method, PERT chart, perspectives diagram, evocative knowledge maps, swim lane diagram, dilemma diagram, concept map, Vee diagram, parameter ruler, concept skeleton, meeting trace.
  - Strategy group: supply demand curve, performance charting, strategy map, organisation chart, house of quality, feedback diagram, failure tree, magic quadrant, stakeholder rating map, Porter's five forces, s-cycle, stakeholder map, life-cycle diagram, technology roadmap, Edgeworth box, portfolio diagram, strategic game board, Mintzberg's organigraph, Zwicky's morphological box, affinity diagram, decision discovery diagram, BCG matrix, strategy canvas, value chain, hype-cycle, Ishikawa diagram, taps, spray diagram.
  - Metaphor group: metro map, temple, story template, tree, flight plan, concept fan, bridge, funnel, iceberg, heaven 'n' hell chart.
  - Compound group: graphic facilitation, cartoon, rich picture, knowledge map, cognitive mapping, infomural.
- The authors say the table is "a functional, metaphoric homage" and the method list "cannot be considered exhaustive". They encourage combining methods, for example a mind map for divergent thinking followed by a Gantt chart. Source: [periodic_table.pdf](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
- The live web page is an image-sliced table (GIF slices) where hovering shows an example. Source: [visual-literacy.org periodic_table.html](https://www.visual-literacy.org/periodic_table/periodic_table.html); hover behaviour per [Tyner Blain 2007](https://tynerblain.com/blog/2007/07/25/interface-design-visualization-methods/)
- No license is stated on the web page or the PDF. Source: [periodic_table.html](https://www.visual-literacy.org/periodic_table/periodic_table.html)

### Inferences
- How to cite: "Lengler and Eppler (2007), Periodic Table of Visualization Methods: Cy cycle diagram (concept, process)". The two-letter symbol plus the process or structure tag lets a reader find it on the table.
- This is the best single reference for a mostly qualitative product story. The weaknesses: no example images in the PDF, a dated web page and management-consulting forms (BCG, five forces) that read as clichés in a design portfolio.

### Gaps
- The site has no maintenance date. The web table appears unchanged since 2007, but I could not confirm that from a primary source.

## Dan Roam, The Back of the Napkin

### Takeaway
A question-first mapping: six "ways of seeing" questions, each mapped to one starting visual framework. It covers who/what, how much, where, when, how and why, so it handles conceptual beats well. It is a book method, not a catalogue of named forms, so citations are coarse ("Roam: how, flowchart").

### Cited findings
- Six ways of seeing mapped to frameworks: who/what to portrait, how much to chart, where to map, when to timeline, how to flowchart and why to multivariable plot. Source: [Readingraphics summary](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
- "For every one of the six ways of seeing, there is one corresponding way of showing", each with a single visual framework as a starting point. Source: [Porchlight, Jack Covert Selects](https://www.porchlightbooks.com/blog/jack-covert-selects/jack-covert-selects-the-back-of-the-napkin)
- SQVID filters: simple vs elaborate, quality vs quantity, vision vs execution, individual vs comparison, delta (change) vs status quo. Source: [Readingraphics summary](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
- Some summaries mis-state the six (Blinkist omits "how much"). Source: [Blinkist](https://www.blinkist.com/en/books/the-back-of-the-napkin-en), as compared in search results.

### Inferences
- The SQVID "delta vs status quo" and "individual vs comparison" filters are directly useful for before and after and options beats. They tell you whether to draw the change or the state.

### Gaps
- I did not confirm the first publication year from a primary source. ISBN 9781591841999. Source: [Publishers Weekly](https://www.publishersweekly.com/9781591841999)

## Andrew Abela, Chart Chooser (Extreme Presentation)

### Takeaway
A four-purpose flowchart (comparison, distribution, composition, relationship) that starts from "What would you like to show?". It is numeric only. It is historically important but superseded by the FT for message-first choosing.

### Cited findings
- First published on Extreme Presentation in 2006. It starts from "What would you like to show?" and branches by number of variables into comparison, relationship, distribution and composition. Source: [FlowingData 2009](https://flowingdata.com/2009/01/15/flow-chart-shows-you-what-chart-to-use/); summary in [uxdesign.cc](https://uxdesign.cc/choosing-a-chart-with-your-audience-in-mind-d6c2b839e8e6)
- Available as a PDF and as a dynamic version from Juice Analytics Labs. The same site offers a separate "Slide Chooser" of 36 slide layouts that "pass the squint test", some SmartArt-optimised. No license stated. Source: [extremepresentation.com/tools](https://extremepresentation.com/tools/)
- It is not comprehensive, and heatmaps are absent, for example. Source: [uxdesign.cc](https://uxdesign.cc/choosing-a-chart-with-your-audience-in-mind-d6c2b839e8e6)

### Gaps
- I did not open the PDF to list every leaf.

## Datawrapper, "A friendly guide to choosing a chart type"

### Takeaway
A goal-first guide (six goals, 40 numbered forms) that is current, published 16 June 2025. It is numeric only and leaves out niche forms.

### Cited findings
- By Lisa Charlotte Muth, published 16 June 2025. The goals are developments over time, shares, absolute numbers, correlations, flows and geographical patterns. Forms include slope chart and arrow plot (over time), waffle, parliament chart and Marimekko (shares), and alluvial and Sankey (flows). Source: [Datawrapper blog, chart types guide](https://www.datawrapper.de/blog/chart-types-guide)
- It deliberately omits niche types such as violin plots and dendrograms. Source: [Datawrapper blog, chart types guide](https://www.datawrapper.de/blog/chart-types-guide)

### Inferences
- "Arrow plot" and "slope chart" under developments over time are the cleanest citable numeric before and after forms.

## Visualization Universe (Adioma and Google News Lab)

### Takeaway
A popularity index of chart types by Google search interest, not a chooser. It is useful only to check whether a form is familiar to readers.

### Cited findings
- A joint Adioma and Google News Lab project. It ranks 56 chart types by search interest over the last year, says it updates daily and draws its chart list from Wikipedia, Duke University and Anna Vital's "How To Think Visually". Source: [Adioma blog](https://blog.adioma.com/?p=23925)
- 2017 snapshot: bar chart, histogram and Gantt chart ranked above pie, and the Ishikawa diagram ranked surprisingly high. Source: [FlowingData 2017](https://flowingdata.com/2017/11/27/chart-search-popularity)

### Gaps
- Current maintenance status is unverified. I did not confirm whether the daily update still runs. Site: [visualizationuniverse.adioma.com/charts](https://visualizationuniverse.adioma.com/charts/)

## Microsoft SmartArt type gallery (a conceptual-diagram taxonomy)

### Takeaway
The most widely used taxonomy of non-numeric explanatory diagrams. Its types are list, process, cycle, hierarchy, relationship, matrix, pyramid and picture, each with a one-line "use when". It is not a design reference with taste, but its categories match qualitative beats almost one to one.

### Cited findings
- Types and purpose. Source: [Microsoft Support, Choose a SmartArt graphic](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - List: nonsequential information.
  - Process: steps in a process or timeline, or a flow chart.
  - Cycle: a continual process.
  - Hierarchy: an organization chart or a decision tree.
  - Relationship: connections, including Counterbalance Arrows for two opposing ideas.
  - Matrix: how parts relate to a whole.
  - Pyramid: proportional relationships with the largest component on top or bottom.
  - Picture: images carry the content.
- Microsoft notes that layout changes meaning: right-pointing arrows (Basic Process) mean something different from arrows in a circle (Continuous Cycle). Source: [Microsoft Support, Choose a SmartArt graphic](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)

### Inferences
- Citing SmartArt in a design portfolio carries a "PowerPoint" connotation. Use it as the taxonomy for the beat (cycle, process, matrix) and cite a richer source (Lengler and Eppler, Evergreen) for the form itself.

## Design system data viz chapters

### Takeaway
Design system chapters are numeric chart libraries with no conceptual-diagram guidance. Cite them for chart styling, not for picking a form for a qualitative beat.

### Cited findings
- IBM Carbon groups chart types as simple (21 forms, for example bar, line, bullet, gauge, meter, treemap, wordcloud), flow (alluvial, network, parallel coordinates, tree diagram) and spatial (circle pack, tree map, choropleth, connection map, proportional symbol map). Several are marked "design only". There is no conceptual-diagram guidance. Source: [Carbon, chart types](https://carbondesignsystem.com/data-visualization/chart-types/)
- Morningstar's legacy design system has a "choosing a chart" page in the same numeric vein. Source: [Morningstar design system](https://designsystem.morningstar.com/legacy/v/2.9.0/charts/choosing-a-chart.html)

### Gaps
- I did not reach Atlassian's data viz guidance, so no claim is made about it.

## Critiques of chart choosers

### Cited findings
- Critics say chart taxonomies oversimplify selection and limit innovation. Leland Wilkinson reportedly called chart taxonomies harmful. Source: [data.europa.eu, choosing charts by message](https://data.europa.eu/apps/data-visualisation-guide/choosing-charts-the-message), as summarised in search results.
- A 2020 study of online interactive chart choosers found that experts think they oversimplify and can steer novices to the wrong chart. Proponents see choosers as the main entry point for novices. Source: [Chen, Online Interactive Chart Choosers for Novice Visual Designers](https://ntut.academia.edu/ChingChen)
- Nick Desbarats argues that existing guidance mostly reduces to the idea that some visual channels work better than others, and that this is very limited. Source: [filwd, choosing chart choosers with Nick](https://filwd.substack.com/p/choosing-chart-choosers-with-nick)

### Gaps
- I found no Nightingale article that directly compares FT, Data to Viz and Evergreen.

## Which catalogue fits a mostly qualitative product story, and which forms recur

### Takeaway
No single catalogue covers every beat type. The best pairing for a qualitative product case study:
- Lengler and Eppler's Periodic Table is the primary reference for conceptual beats (framework, hierarchy, process, decision, cycle, cause, 2x2).
- Evergreen and Lyons v3.0 covers qualitative evidence beats (quotes, clusters, journey).
- The FT Visual Vocabulary covers the numeric beats.

Microsoft SmartArt and Dan Roam give the cleanest beat-type vocabulary but are weak as named form references.

### Cited findings: forms that recur across catalogues per beat type
- Hierarchy:
  - Tree diagram: [DVC hierarchy](https://datavizcatalogue.com/search/hierarchy.html); [Carbon flow](https://carbondesignsystem.com/data-visualization/chart-types/)
  - Dendrogram: [Evergreen 3.0 hierarchy](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf); [Data to Viz](https://www.data-to-viz.com/)
  - Treemap: [FT part to whole](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md); [DVC](https://datavizcatalogue.com/search/hierarchy.html); [Carbon](https://carbondesignsystem.com/data-visualization/chart-types/)
  - Concept map: [Evergreen 3.0](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf); [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Organization chart: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf); [SmartArt hierarchy](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - Pyramid (Minto pyramid, SmartArt pyramid): [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf); [SmartArt](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
- Sequence or process:
  - Flow chart: [DVC concepts, how things work, methods](https://datavizcatalogue.com/search/methods.html); [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf); [SmartArt process](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic); [Roam "how"](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
  - Flow/path diagram and journey map: [Evergreen 3.0 flow](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
  - Swim lane diagram: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Gantt chart: [DVC](https://datavizcatalogue.com/search/methods.html); [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Sankey for flows with volume: [FT flow](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md); [DVC](https://datavizcatalogue.com/search/how_things_work.html); [Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)
- Comparison of options:
  - Decision tree: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf); [SmartArt hierarchy](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - Dilemma diagram and parameter ruler: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Heatmap, indicator dots, icons and color coding, Venn: [Evergreen 3.0 comparison](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
  - Harvey balls: [Evergreen qualitative viz](https://stephanieevergreen.com/qualitative-viz)
  - Counterbalance arrows for two opposing ideas: [SmartArt relationship](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - Paired bar and radar for numeric comparisons: [FT magnitude](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
  - Roam's SQVID "individual vs comparison": [Readingraphics](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
- Position in a space (2x2):
  - BCG matrix, magic quadrant, stakeholder rating map, portfolio diagram, strategy canvas: [Lengler and Eppler strategy group](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Matrix type: [SmartArt](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - Spectrum display for one-axis position: [Evergreen 3.0 cluster](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
  - Scatterplot as the numeric equivalent: [FT correlation](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
  - Roam's "why" maps to a multivariable plot: [Readingraphics](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
- Part of a whole:
  - Stacked bar, treemap, pie and donut, waffle/gridplot, Marimekko: [FT part to whole](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md); [DVC](https://datavizcatalogue.com/search/part_to_a_whole.html); [Datawrapper shares](https://www.datawrapper.de/blog/chart-types-guide); [Abela composition](https://flowingdata.com/2009/01/15/flow-chart-shows-you-what-chart-to-use/)
  - Venn: [FT part to whole](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md); [DVC concepts](https://datavizcatalogue.com/search/concepts.html); [Evergreen](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf); [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Layer chart and concentric circles: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Matrix, which Microsoft frames as parts to a whole: [SmartArt](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
- Change over time, including before and after:
  - Timeline: [Evergreen flow](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf); [DVC time](https://datavizcatalogue.com/search/time.html); [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf); [Roam "when"](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
  - Priestley and circle timelines: [FT](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
  - Slope chart: [FT change over time and ranking](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md); [Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)
  - Arrow plot: [Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)
  - Connected scatterplot: [FT](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
  - "Change photos" for qualitative before and after: [Evergreen 3.0](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)
  - Roam SQVID "delta vs status quo": [Readingraphics](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
  - Technology roadmap: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
- Cause and effect:
  - Cause-effect chains, Ishikawa diagram, failure tree, force field diagram, system dynamics/loop diagrams: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Ishikawa ranks high in search interest: [FlowingData 2017](https://flowingdata.com/2017/11/27/chart-search-popularity)
  - The FT warns that correlation charts are read as causal: [FT README](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)
  - Roam "why" maps to a multivariable plot: [Readingraphics](https://readingraphics.com/book-summary-the-back-of-the-napkin/)
- Cycle or loop:
  - Cycle diagram, feedback cycle diagram, system dynamics/loop diagrams, life-cycle diagram, s-cycle, hype-cycle: [Lengler and Eppler](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)
  - Cycle type ("show a continual process"): [SmartArt](https://support.microsoft.com/en-US/Office/graphics-visuals/choose-a-smartart-graphic)
  - No cycle form appears in the FT nine categories ([README](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)), the DVC conceptual functions ([concepts](https://datavizcatalogue.com/search/concepts.html), [methods](https://datavizcatalogue.com/search/methods.html)), Evergreen 3.0 ([PDF](https://stephanieevergreen.com/wp-content/uploads/2017/10/Qualitative-Chooser-3.0.pdf)) or Datawrapper ([guide](https://www.datawrapper.de/blog/chart-types-guide)).

### Inferences
- Input type decides fit. FT and Datawrapper ask for the message about numbers. Data to Viz asks for the data shape. Evergreen asks for the story about qualitative data. Lengler and Eppler and SmartArt ask for the kind of idea (process vs structure, cycle vs list). A beat written as "what the reader must understand" matches the last two best.
- Recommended citation scheme per beat: "[beat type from SmartArt or Roam vocabulary] → [form] ([catalogue], [category or element])". For example: "Cycle → feedback cycle diagram (Lengler and Eppler 2007, Fb, concept/process)", or "Before and after metric → slope chart (FT Visual Vocabulary, Change over time)".
- Two beat types are well covered by only one catalogue each: cycle and 2x2 (Lengler and Eppler, plus SmartArt as taxonomy). A "framework" beat has no dedicated category anywhere. The nearest forms are layer chart, temple, concentric circles and concept skeleton in Lengler and Eppler, or pyramid and matrix in SmartArt.
- Maintenance ranking:
  - Current: Datawrapper (2025).
  - Maintained but dated: FT (repo pushed 2024, content around 2016 to 2017), Data to Viz (repo pushed 2024, content 2018) and Evergreen (v3.0 2017, newer version gated).
  - Effectively frozen: Lengler and Eppler (2007), Graphic Continuum (2014) and the Gramener Vega edition (2020).

### Gaps
- I found no catalogue that treats "framework" or "constraint" as a beat type. Those mappings are my inference, not a sourced classification.
- Visual thinking pattern libraries beyond Roam and Lengler and Eppler (for example Dave Gray's work or explanation-graphics catalogues) were not reviewed, because I ran out of budget.
