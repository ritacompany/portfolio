# Visual form catalogues and choosers: how they index form, and a combined index for a portfolio case study

## How does each catalogue organise forms, and what question does it ask the user first?

### Takeaway
There are three indexing logics. The data choosers (From Data to Viz) ask "what kind of data do you have?" first. The relationship choosers (FT Visual Vocabulary, Graphic Continuum, Abela, Datawrapper) ask "what do you want to show?" first. The thinking and communication catalogues (Periodic Table of Visualization Methods, Dan Roam, Duarte) ask what kind of knowledge or question is in play: structure or process, who/what/where/when/how/why, flow or segment. Only the third group is built for content that is mostly not numbers.

### Cited findings

**FT Visual Vocabulary (Financial Times Visual Journalism Team)**
- Groups chart types by the relationship the chart has to show, into nine categories: deviation, correlation, ranking, distribution, change over time, part to whole, magnitude, spatial and flow ([FT chart-doctor, visual-vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).
- Category forms, in summary ([same source](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)):
  - Deviation (variation from a fixed reference such as zero, a target or an average): diverging bar, diverging stacked bar, spine chart, surplus/deficit filled line.
  - Correlation: scatterplot, line + column, connected scatterplot, bubble, XY heatmap. Carries a warning that readers often assume causation.
  - Ranking (position in an ordered list matters more than the value): ordered bar, ordered column, ordered proportional symbol, dot strip plot, slope, lollipop.
  - Distribution: histogram, boxplot, violin, population pyramid, dot strip, dot plot, barcode plot, cumulative curve.
  - Change over time: line, column, line + column, stock price, slope, area, fan chart, connected scatterplot, calendar heatmap, Priestley timeline, circle timeline, seismogram.
  - Part to whole: stacked column, proportional stacked bar, pie, donut, treemap, Voronoi, arc, gridplot, Venn, waterfall.
  - Magnitude: column, bar, paired column/bar, proportional stacked bar, proportional symbol, isotype, lollipop, radar, parallel coordinates.
  - Spatial: choropleth, proportional symbol, flow map, contour map, cartograms, dot density, heat map.
  - Flow (volume or intensity of movement between states or locations): Sankey, waterfall, chord, network.
- Uncertainty, animation, interactivity, map projections and colour sections are marked "Todo" with no chart types ([same source](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).
- Says it was inspired by the Graphic Continuum by Jon Schwabish and Severino Ribecca ([same source](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).
- Built as the core of a newsroom-wide training session on chart literacy ([search summary of FT description, via Information Lab and Tableau posts](https://www.theinformationlab.co.uk/community/blog/visual-vocabulary)).

**The Data Visualisation Catalogue (Severino Ribecca)**
- A non-code library of visualisation types, first built as Ribecca's personal reference and then opened up as a learning and inspiration resource ([datavizcatalogue.com about](https://datavizcatalogue.com/about.html)).
- Two ways in: "View by List" (60 methods) and "Search by Function" ([datavizcatalogue.com home](https://datavizcatalogue.com/)).
- Search by function has 16 functions: comparisons, proportions, relationships, hierarchy, concepts, location, part to a whole, distribution, how things work, processes and methods, movement or flow, patterns, range, data over time, analysing text, reference tool ([search page](https://datavizcatalogue.com/search.html)).
- The 60 methods include non-numeric forms: brainstorm, flow chart, illustration diagram, timeline, timetable, Gantt chart, tree diagram, Venn diagram, network diagram, arc diagram, word cloud ([home list](https://datavizcatalogue.com/)).
- "Concepts" function lists four methods: brainstorm, flow chart, illustration diagram, Venn diagram ([concepts](https://datavizcatalogue.com/search/concepts.html)).
- "How things work" lists flow chart, illustration diagram, Sankey diagram ([how things work](https://datavizcatalogue.com/search/how_things_work.html)).

**From Data to Viz (Yan Holtz and Conor Healy)**
- The first question is "What kind of data do you have?" with six starting types: numeric, categoric, num and cat, maps, network, time series ([data-to-viz.com](https://www.data-to-viz.com/)).
- The tree leads to about twenty common dataset formats, each with an R example, plus a downloadable full decision tree poster ([same source](https://www.data-to-viz.com/)).
- Has a "caveats" gallery of common mistakes (ordering data, cutting the y axis, spaghetti chart, pie chart, overplotting, rainbow palette and others) ([same source](https://www.data-to-viz.com/)).

**Andrew Abela chart chooser (Extreme Presentation)**
- Opens with "What would you like to show?" and four purposes: comparison, distribution, composition, relationship; the user then narrows by number of variables and other data questions ([FlowingData](https://flowingdata.com/2009/01/15/flow-chart-shows-you-what-chart-to-use/); [uxdesign.cc summary](https://uxdesign.cc/choosing-a-chart-with-your-audience-in-mind-d6c2b839e8e6)).
- First published on Abela's Extreme Presentation site in 2006 (secondary claim, [uxdesign.cc](https://uxdesign.cc/choosing-a-chart-with-your-audience-in-mind-d6c2b839e8e6)); Juice Analytics built an interactive version ([FlowingData 2012](https://flowingdata.com/2012/06/25/chart-chooser-helps-you-choose-charts/)).
- The Extreme Presentation tools page also offers a "Slide Chooser" of 36 slide layouts that pass a "squint test" ([extremepresentation.com/tools](https://extremepresentation.com/tools/)).

**Datawrapper "A friendly guide to choosing a chart type" (Lisa Charlotte Muth)**
- Organised by what you want to show, in six sections: developments over time, shares, absolute numbers, correlations, flows, geographical patterns, covering 40 chart types with a PDF poster ([Datawrapper blog](https://www.datawrapper.de/blog/chart-types-guide)).
- Aimed at a mainstream audience and deliberately leaves out niche types such as violin plots and dendrograms ([Datawrapper learn](https://www.datawrapper.de/learn)).

**Graphic Continuum (Jon Schwabish and Severino Ribecca)**
- A poster of over 80 graphics in six groups: distribution, time, comparing categories, geospatial, part to whole, relationships; it draws links between related forms and calls itself a thought starter, not a complete catalogue ([PolicyViz 2014](https://policyviz.com/2014/09/09/graphic-continuum/); [PolicyViz desktop version](https://policyviz.com/2014/11/11/graphic-continuum-desktop-version/)).
- The first announcement said five categories while listing six; Eager Eyes also describes five ([Eager Eyes](https://eagereyes.org/blog/2015/link-the-graphic-continuum)). Six appears correct.

**Periodic Table of Visualization Methods (Ralph Lengler and Martin Eppler)**
- Published as "Towards a Periodic Table of Visualization Methods for Management", IASTED Graphics and Visualization in Engineering 2007; about 100 methods; framed as an inventory and a problem-solving heuristic for matching methods to visualization challenges ([Americans for the Arts listing](https://americansforthearts.org/by-program/reports-and-data/legislation-policy/naappd/towards-a-periodic-table-of-visualization-methods-for-management)).
- Columns (groups) are application area, rows (periods) are complexity. Groups are colour coded into six categories: data, information, concept, strategy, metaphor and compound visualization ([paper PDF at visual-literacy.org](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)).
- Each method also carries three markers ([same paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)):
  - Represented information: structure (hierarchies, networks) or process (stepwise, cyclical, sequential).
  - Task: overview, detail or both (after Shneiderman's mantra).
  - Cognitive process: convergent thinking (reduce complexity) or divergent thinking (generate options).
- Category definitions and named examples ([same paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)):
  - Data visualization: pie, area, line graphs; answers "how much" questions.
  - Information visualization: semantic networks, treemaps.
  - Concept visualization: concept map, Gantt chart; methods to elaborate mostly qualitative concepts, ideas and plans.
  - Metaphor visualization: metro map, story template; positions information to structure it and carries an insight through the metaphor. Visual metaphors answer "how" and "why" questions.
  - Strategy visualization: strategy canvas, technology roadmap; systematic visuals for analysing, formulating, communicating and implementing strategy.
  - Compound visualization: knowledge maps mixing diagram and metaphor, conceptual cartoons with charts, infomurals.
- The paper names further methods in passing: mind map, Gantt chart, Rich Picture, Nassi-Shneiderman diagram, Minto pyramid, square of oppositions, synergy map, argument slide, Toulmin map, IBIS argumentation map ([same paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)). Secondary sources add decision tree (concept), bridge (metaphor) and stakeholder map (strategy) ([McGill library blog](https://blogs.library.mcgill.ca/schulich/?p=3604)).

**Dan Roam, The Back of the Napkin**
- Six Ws map to six pictures: who/what to portrait, how much to chart, where to map, when to timeline, how to flowchart, why to multiple variable plot ([Antoine Buteau, lessons from Dan Roam](https://www.antoinebuteau.com/lessons-from-dan-roam/); [Designers Review of Books](https://www.designersreviewofbooks.com/2009/01/the-back-of-the-napkin/)).
- SQVID asks five questions of how to draw it: simple vs elaborate, quality vs quantity, vision vs execution, individual vs comparison, delta (change) vs status quo. Combined with the 6 Ws it forms a "visual thinking codex" grid ([thinkinsights.net SQVID](https://thinkinsights.net/consulting/sqvid); [Readingraphics summary](https://readingraphics.com/book-summary-the-back-of-the-napkin/)).

**Nancy Duarte, Slide:ology and Diagrammer**
- The diagram taxonomy started in Slide:ology chapter 3 and was refined into five categories, flow, network, stack, segment and join, each with two or more subsets; Diagrammer is a free download of over 4,000 PowerPoint diagrams ([Duarte blog](https://www.duarte.com/blog/duarte-diagrammer-thousands-of-free-diagrams-at-your-fingertips/)).
- A secondary summary of the book describes flow (linear, circular, divergent/convergent, multi-directional, process flow), structure (including matrices: a grid with something on top and something on the left), cluster and data display archetypes ([Consultant's Mind](https://www.consultantsmind.com/2016/11/21/slideology-2/)).

### Inferences
- Asking the data type first (From Data to Viz) fails for a portfolio: there is usually no dataset to classify. Asking the relationship first (FT, Abela, Datawrapper) carries over, because "a ranking", "a change", "a part of a whole" are reader questions that hold even with no numbers. Roam's 6 Ws carry over best of all because they are phrased as the reader's question.
- The Periodic Table's structure vs process marker is the most useful single split for case study material: frameworks and systems are structure, flows and timelines are process.

### Gaps
- Abela's original PDF was not read directly (the typepad URL now redirects to a parked page); the four categories are confirmed only through secondary sources.
- Duarte's original Slide:ology chapter 3 list was not confirmed; secondary sources disagree (four or six archetypes, against Diagrammer's five).

## Which handle non-numeric, conceptual material?

### Takeaway
Fully: the Periodic Table (concept, strategy, metaphor and compound groups), Dan Roam (portrait, map, timeline, flowchart) and Duarte (flow, network, stack, segment, join). Partly: the Data Visualisation Catalogue (concepts, how things work, processes and methods, hierarchy functions). Barely: FT Visual Vocabulary (Venn, Priestley timeline, network are the only non-quantitative forms). Not at all: From Data to Viz, Abela and Datawrapper.

### Cited findings
- The Periodic Table defines concept visualization as methods for elaborating mostly qualitative concepts, ideas and plans, and adds strategy and metaphor groups built for management thinking ([Lengler and Eppler paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)).
- Roam's six pictures and SQVID include an explicit quality vs quantity choice ([thinkinsights.net](https://thinkinsights.net/consulting/sqvid)).
- Duarte's categories describe relationships between information rather than data ([Duarte blog](https://www.duarte.com/blog/duarte-diagrammer-thousands-of-free-diagrams-at-your-fingertips/)).
- Data Visualisation Catalogue's concepts function lists brainstorm, flow chart, illustration diagram and Venn diagram ([concepts](https://datavizcatalogue.com/search/concepts.html)); timeline, timetable, Gantt and tree diagram are in the full list ([home](https://datavizcatalogue.com/)).
- FT's only non-quantitative forms are Venn (part to whole), Priestley and circle timelines (change over time) and network (flow) ([FT](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).
- From Data to Viz starts from data type only ([data-to-viz.com](https://www.data-to-viz.com/)); Datawrapper's six sections are all quantitative or geographic ([Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)).

### Inferences
- No catalogue researched here names 2x2 matrix, swimlane, customer journey map or before and after as standalone entries by those names, except Duarte's matrix under structure (secondary). For these forms the citation has to be a pattern source (service design and consulting literature) rather than one of these catalogues.

### Gaps
- The full 100 cell list of the Periodic Table could not be extracted (the web page is image slices and the PDF found was the paper, not the poster). Whether it includes swimlane, 2x2, customer journey or Venn is unconfirmed.

## Combined index: what the reader must understand, mapped to candidate forms

### Takeaway
Map each case study beat to a reader question, then pick a form. The table below names the catalogue that lists each form. Where a form is only sourced secondarily it is marked.

### Cited findings

| Reader must understand | Candidate forms | Named by |
|---|---|---|
| A comparison of options or values | Ordered or paired bar, dot plot, side by side "individual vs comparison" drawing, matrix grid | FT ranking and magnitude ([FT](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)); Abela comparison ([FlowingData](https://flowingdata.com/2009/01/15/flow-chart-shows-you-what-chart-to-use/)); Roam SQVID ([thinkinsights](https://thinkinsights.net/consulting/sqvid)); Duarte structure/matrix, secondary ([Consultant's Mind](https://www.consultantsmind.com/2016/11/21/slideology-2/)) |
| A change over time | Timeline, Priestley timeline, slope chart, line, Gantt chart | Roam "when" ([Buteau](https://www.antoinebuteau.com/lessons-from-dan-roam/)); FT change over time; Data Viz Catalogue timeline and Gantt ([home](https://datavizcatalogue.com/)) |
| A gap against a target or expectation | Diverging bar, surplus/deficit line, spine chart | FT deviation ([FT](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)) |
| A before and after | Slope chart, arrow plot, paired drawings framed as delta vs status quo | FT slope; Datawrapper arrow plot ([Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)); Roam delta vs status quo ([thinkinsights](https://thinkinsights.net/consulting/sqvid)) |
| A sequence or process | Flow chart, process flow (linear, circular, divergent/convergent), timetable | Roam "how" to flowchart; Data Viz Catalogue processes and how things work ([how things work](https://datavizcatalogue.com/search/how_things_work.html)); Duarte flow ([Duarte](https://www.duarte.com/blog/duarte-diagrammer-thousands-of-free-diagrams-at-your-fingertips/)); Periodic Table "process" marker ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)) |
| A cause, or why something happened | Multiple variable plot, connected scatterplot, Toulmin or IBIS argument map, Rich Picture | Roam "why" ([Buteau](https://www.antoinebuteau.com/lessons-from-dan-roam/)); FT correlation, with its causation warning; Periodic Table argument methods ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)) |
| A trade off | Square of oppositions, 2x2 matrix, scatterplot of two criteria | Periodic Table square of oppositions ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)); Duarte matrix, secondary ([Consultant's Mind](https://www.consultantsmind.com/2016/11/21/slideology-2/)); FT correlation |
| A position in a landscape (competitors) | Strategy canvas, positioning map, map metaphor | Periodic Table strategy group ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)); Roam "where" to map ([Buteau](https://www.antoinebuteau.com/lessons-from-dan-roam/)) |
| A part of a whole | Treemap, stacked bar, Venn, waffle, segment diagram | FT part to whole; Datawrapper shares; Duarte segment ([Duarte](https://www.duarte.com/blog/duarte-diagrammer-thousands-of-free-diagrams-at-your-fingertips/)); Data Viz Catalogue Venn ([concepts](https://datavizcatalogue.com/search/concepts.html)) |
| A system's structure | Concept map, network diagram, tree diagram, stack diagram, metro map | Periodic Table concept and metaphor groups and "structure" marker ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)); Duarte network and stack; Data Viz Catalogue network and tree ([home](https://datavizcatalogue.com/)) |
| A decision | Decision tree, Minto pyramid, comparison of options | Periodic Table concept group, decision tree via secondary ([McGill](https://blogs.library.mcgill.ca/schulich/?p=3604)); Minto pyramid ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)) |
| Who it is for, or what the thing is | Portrait, illustration diagram, annotated product screen | Roam "who/what" to portrait ([Buteau](https://www.antoinebuteau.com/lessons-from-dan-roam/)); Data Viz Catalogue illustration diagram ([concepts](https://datavizcatalogue.com/search/concepts.html)) |
| A plan or roadmap | Gantt chart, technology roadmap, metro map | Periodic Table concept, strategy and metaphor groups ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf)) |
| How two things combine or overlap | Venn, join diagram | Data Viz Catalogue and FT Venn; Duarte join ([Duarte](https://www.duarte.com/blog/duarte-diagrammer-thousands-of-free-diagrams-at-your-fingertips/)) |
| Movement between states | Sankey, alluvial, flow map | FT flow; Datawrapper flows ([Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)) |

### Inferences
- For a portfolio with little numeric data, most beats land in rows named by the Periodic Table, Roam and Duarte, not the chart choosers. The FT row labels (deviation, ranking, part to whole) still work well as names for the reader's question even when the form drawn is conceptual.
- Swimlane and customer journey map have no home in any catalogue researched. They are best described as process forms (Periodic Table process marker, Duarte flow) with a lane or stage axis added.

### Gaps
- Swimlane, journey map, system map and 2x2 as named entries were not found in any of these catalogues; a separate service design or consulting source would be needed to cite them by name.

## Licensing, availability and the best single reference per form

### Takeaway
FT Visual Vocabulary is the best single reference for quantitative relationships (free, public repo, named categories everyone recognises). The Periodic Table of Visualization Methods is the best single reference for conceptual forms because it is the only one with peer reviewed definitions of concept, strategy and metaphor visualization. Roam's 6 Ws is the best plain language bridge from reader question to form.

### Cited findings
- FT chart-doctor repo is MIT licensed for the software, but the licence excludes FT content, which stays FT copyright; republishing goes through FT syndication ([chart-doctor repo](https://github.com/Financial-Times/chart-doctor)). The visual vocabulary page states "all rights reserved" ([visual-vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)).
- FT derivatives exist in Tableau (Andy Kriebel, Charlie Hutcheon), Power BI (Jason Thomas; Deneb/Vega templates by Andrzej Leszkiewicz), Vega (Pratap Vardhan) and Excel ([Tableau blog](https://www.tableau.com/blog/what-i-learned-recreating-financial-times-visual-vocabulary-tableau-94516); [Deneb templates](https://github.com/avatorl/Deneb-Vega-Templates); [PolicyViz Excel](https://policyviz.com/2019/03/26/the-visual-vocabulary-in-excel/)).
- Data Visualisation Catalogue: free website, copyright the catalogue, no licence stated, icons sold separately ([about](https://datavizcatalogue.com/about.html)).
- From Data to Viz: free website and poster; no licence stated on the home page ([data-to-viz.com](https://www.data-to-viz.com/)).
- Graphic Continuum: paid poster (24 by 36 inch) and a laminated desktop version at 13 USD; flash cards discontinued; French and two Chinese translations ([PolicyViz desktop](https://policyviz.com/2014/11/11/graphic-continuum-desktop-version/); [PolicyViz French](https://policyviz.com/2017/10/16/the-graphic-continuum-poster-now-in-french/); [flash cards](https://policyviz.com/2016/10/31/introducing-graphic-continuum-flash-cards/)).
- Abela chart chooser: PDF linked from extremepresentation.com plus an interactive version at Juice Analytics; terms not stated ([extremepresentation tools](https://extremepresentation.com/tools/)).
- Datawrapper guide: free article with a downloadable PDF poster; licence not stated ([Datawrapper](https://www.datawrapper.de/blog/chart-types-guide)).
- Periodic Table: free web page at visual-literacy.org and a conference paper ([paper](https://www.visual-literacy.org/periodic_table/periodic_table.pdf); [listing](https://americansforthearts.org/by-program/reports-and-data/legislation-policy/naappd/towards-a-periodic-table-of-visualization-methods-for-management)).
- Roam and Duarte are books; Duarte's Diagrammer is a free download ([Duarte blog](https://www.duarte.com/blog/duarte-diagrammer-thousands-of-free-diagrams-at-your-fingertips/)).

### Inferences
- Recommended naming rule for the portfolio: cite FT for any chart with numbers, the Periodic Table for any conceptual diagram, and Roam when the beat is phrased as a reader question. The Data Visualisation Catalogue is the most readable fallback for a one line definition of a single form, since each method has its own page.

### Gaps
- No explicit licence was found for the Data Visualisation Catalogue, From Data to Viz, Datawrapper's poster, Abela's chooser or the Periodic Table poster. Reuse of their images in a public portfolio should be treated as needing permission.
