# Narrative visualization research and practitioner canon: rules for naming the point, choosing the form, sequencing and not visualizing


Note: serial commas inside quoted source text are removed to meet the house no Oxford comma rule. Wording is otherwise as quoted.

Reading note. "PDF page N" means the page of the author PDF I read. Section numbers are the paper's own. Where I could only reach a secondary summary, the finding says so. Inferences about portfolio case studies are mine, not the sources'.

## Key question 1: What exact frameworks, genres, patterns and checklists does each source give, and what are the usable rules for (a) naming the point, (b) choosing form, (c) sequencing and (d) not visualizing?

### Takeaway
The research papers give taxonomies (genres, tactics, transition types, narrative categories, patterns) derived from coding professional examples; the practitioner books give process rules (state the point in one sentence, let function constrain form, declutter, direct attention, storyboard first). Almost none of them gives an explicit "do not visualize" rule except Knaflic (simple text and tables are options in the form chooser) and Tufte (content first; prose and tables beat bullet slides).

### Cited findings

#### Segel and Heer 2010, "Narrative Visualization: Telling Stories with Data" (IEEE TVCG 16(6), pages 1139 to 1148)
- Corpus: 58 examples, from online journalism (71%), business (20%) and visualization research (9%), coded with affinity diagramming; authors admit "some inevitable subjectivity" (section 4, PDF pages 5 and 7): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Seven genres: magazine style, annotated chart, partitioned poster, flow chart, comic strip, slide show and film/video/animation. Genres "vary primarily in terms of (a) the number of frames" and "(b) the ordering of their visual elements"; they "can function like building blocks" and combine (section 4.3, PDF page 7): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Choosing a genre "depends on a variety of factors, including the complexity of the data, the complexity of the story, the intended audience, and the intended medium"; "there will be no 'right answer' a priori" (section 4.3, PDF pages 7 and 8): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Design space has three divisions: genre, visual narrative tactics and narrative structure tactics (section 4.1, PDF page 7): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
  - Visual narrative tactics. Visual structuring: "communicate the overall structure of the narrative" and let the viewer "identify his position" (establishing shot, checklist, consistent visual platform, progress bar, timeline slider). Highlighting: "direct the viewer's attention" via color, motion, framing, size, audio. Transition guidance: moving "within or between visual scenes without disorienting the viewer" (continuity editing, animated transitions, object continuity, camera motion).
  - Narrative structure tactics. Ordering: linear, random access or user directed. Interactivity: filtering, selecting, searching and navigating, plus how it is taught (explicit instruction, tacit tutorial, initial configuration). Messaging: "short text fields (labels, captions, headlines, annotations) or more substantial descriptions (articles, introductions, summaries)".
- Author driven versus reader driven (Table 1, PDF page 8). Author driven: "Linear ordering of scenes", "Heavy messaging", "No interactivity"; works best "when the goal is storytelling or efficient communication". Reader driven: no prescribed ordering, no messaging, free interactivity; supports data diagnostics, pattern discovery and hypothesis formation (paraphrased) (section 4.4): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Three hybrid schemas (sections 4.4.1 to 4.4.3, PDF page 8): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
  - Martini glass: begins author driven ("questions, observations or written articles"), then "opens up to a reader-driven stage". Stem length maps to degree of authoring; "the most common across the interactive visualizations we examined." The term is credited to Buttry [ref 4] (PDF page 3).
  - Interactive slideshow: interaction "mid-narrative within the confines of each slide"; good for complex data (walk "step-by-step") and complex narratives ("discrete boundaries between different story segments, similar to a cut in film").
  - Drill-down story: "presents a general theme and then allows the user to choose among particular instances of that theme"; still "requires significant amounts of authoring".
- Rule from the discussion: "data stories appear to be most effective when they have constrained interaction at various checkpoints within a narrative" (section 5, PDF page 9). Note this is a generalization from the corpus, not a tested result: [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Under-used tactics flagged: "tacit tutorials", "stimulating default views" (analogous to journalistic leads) and narrative messaging such as repeating key points, introductory text and final summaries and syntheses (paraphrased; the original list uses a serial comma) (section 4.2, PDF page 7): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- (d) Closest thing to a "do not" rule: "Messaging might clarify visual elements but produce clutter. Interactivity might engage the user but detract from the author's intended message" (section 4.3, PDF page 8): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)

#### Hullman, Drucker, Henry Riche, Lee, Fisher and Adar 2013, "A Deeper Understanding of Sequence in Narrative Visualization" (IEEE TVCG 19(12), pages 2406 to 2415)
- Author correction: the 2013 sequence paper is Hullman with Drucker, Henry Riche, Lee, Fisher and Adar, not Diakopoulos. Diakopoulos is the coauthor on the 2011 framing paper: [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf); [Amini et al. reference list](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Corpus: 42 professional narrative visualizations (2006 to 2012), linear "slideshow-style" only; interactive slideshows were 23 of 42 (section 3.2.1): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Each observed transition "represents a single change in one dimension of a data representation from one slide (visualization) to the next" (section 3.2.2): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Transition types with prevalence (Table 1, section 3.2.2): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
  - Dialogue (16.7%): question and answer; who, what, when, where, why, how. "A question asked in one state is followed by a visualization that answers that question."
  - Temporal (88.1%): simple chronological (29/42), reverse chronological (11/42), future chronological (12/42).
  - Causal (23.8%): explicit cause (7/42), alternative reality (3/42). "One visualization state follows another to explicitly hypothesize a causal relationship."
  - Granularity (71.4%): general to specific (28/42), specific to general (16/42).
  - Comparison (64.3%): dimension walk (20/42), measure walk (19/42). Spatial proximity (23.8%) is a subset of comparison.
  - Dialogue and causal are "explicit" types that need the creator's interpretation; the others can be inferred from data attributes.
- Parallelism: the "global strategy of parallelism, or repetition of certain local level transition sequences" (section 5.2), illustrated by the NYT Copenhagen piece where three climate outcomes each get the same general to specific then reverse chronological pattern (Fig. 1): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Evidence, local transitions: 143 Mechanical Turk participants, 696 valid trials. Participants were "much less likely to choose a higher cost transition relative to a transition with a cost of '1'" (cost = number of dimensions changed). Type ranking at equal cost: "Temporal > (Dimension | Measure) > Granularity", all p<0.01 (section 5.1.3): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Evidence, global parallelism: memory for sequence order was significantly better with "perfect" parallelism than with reversed patterns (ANOVA F(3,69)=5.59, p=0.002); comprehension and understandability differences were not significant (section 5.2): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Open question the authors leave: whether "annotations added to visualizations" or "a presenter's statements" can overcome a complex transition (section 6.1.2): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)

#### Hullman and Diakopoulos 2011, "Visualization Rhetoric: Framing Effects in Narrative Visualization" (IEEE TVCG 17(12), pages 2231 to 2240)
- Corpus: 51 professionally produced narrative visualizations, coded against framing and bias concepts from semiotics, statistics presentation, decision theory and media studies (section 3.2.1): [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Core claim: design techniques that "prioritize particular interpretations" can "significantly affect end-user interpretation"; techniques are "additions or omissions of information at various levels: the data, visual representation, textual annotations and interactivity" (abstract; punctuation adapted): [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Rhetoric classes: information access rhetoric (limits what is shown, including omission), provenance rhetoric (background, sources), mapping rhetoric (maps elements to non explicit concepts), procedural rhetoric (constrains interaction over time) and linguistic based rhetoric (typographic emphasis, irony, rhetorical questions in titles) (sections 3.2.2 to 3.2.6): [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Anchoring: "Default views provide an initial point of interpretation"; "fixed comparisons" steer which comparison the reader makes: [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- On omission: "Omission techniques are the least likely to be explicitly indicated by a visualization" (section 3.2.2): [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- A secondary source notes the strategies often co-occur and reinforce each other, making framing "harder to notice": [arXiv 2604.01181 summary via search](https://arxiv.org/pdf/2604.01181)

#### Kosara and Mackinlay 2013, "Storytelling: The Next Step for Visualization" (IEEE Computer 46(5), pages 44 to 50)
- Definition: "We define a story as an ordered sequence of steps, with a clearly defined path through it. Each step can contain text, images, visualizations, video or any combination thereof" (section "Story Definition and Model"): [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- "Order is a key feature of stories"; within each segment "the order is consistent", and segment order "needs to be made clear": [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Causality: stories "provide a temporal structure"; "Providing the causal relationships between facts and events ties the individual parts together"; Minard cited as the example: [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Stories provide "the connective tissue between facts to make them memorable"; useful "when an analyst is not the same person as the one who makes decisions": [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf); [eagereyes publication page](https://eagereyes.org/publications/Kosara-Computer-2013)
- Three presentation scenarios: self running presentation, live presentation to a large audience, individual or small group presentation: [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Draw the reader in with "a static view that provides a teaser", "similar to a catchy title and lede": [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Build complex views "up gradually"; Gapminder breaks a complex transition "into small steps": [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Limited highlighting interaction "does not let the user stray too far from the point of the story", making it "easy to pick up the thread": [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- This is a position paper and literature review, not an empirical study: [eagereyes publication page](https://eagereyes.org/publications/Kosara-Computer-2013)

#### Amini, Henry Riche, Lee, Hurter and Irani 2015, "Understanding Data Videos: Looking at Narrative Visualization through the Cinematography Lens" (CHI 2015)
- Evidence: qualitative analysis of 50 professional data videos plus storyboarding workshops with 13 experienced storytellers (screenwriters, video makers, motion designers): [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Four categories from Cohn's visual narrative theory, building on Freytag: Establisher, "provide referential information without engaging them in the actions or events"; Initial, "set the action or event in motion"; Peak, "the most important things happen; the culmination of an event or the confluence of numerous events"; Release, "the aftermath of the Peak": [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Categories are hierarchical and decompose into units, "sequences that put forward different points contributing to a single category": [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Patterns: most common "E+I+PR+" (34%), with a single Peak "usually occurring around the middle" and multiple Release units giving "ample time for conveying the take away message". "E+I+P" and "EIP" end on the Peak and leave the viewer "with a 'question'". "EI+" presents "multiple problems" and "ER+" "multiple solutions" without a distinct Peak. Initial is the most prominent category by time: [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Form: data visualizations fill 48% of duration on average, but most videos "rely on only a few types of well-known visualizations (e.g. bar charts, pictographs and maps)": [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Process: the authors recommend tools support "a non-linear creation process": [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)

#### Bach, Stefaner, Boy, Drucker, Bartram, Wood, Ciuccarelli, Engelhardt, Koppen and Tversky 2018, "Narrative Design Patterns for Data-Driven Storytelling" (chapter 5 of Data-Driven Storytelling, pages 107 to 133)
- Chapter location and author list confirmed from the book's table of contents: [Data-Driven Storytelling TOC](https://vlb-content.vorarlberg.at/fhbscan1/330900105740.pdf); [Microsoft Research listing](https://www.microsoft.com/en-us/research/publication/narrative-design-patterns-for-data-driven-storytelling/)
- 18 patterns in five overlapping groups, with the groups defined as: Argumentation, "reasoning systematically to support messages and arguments"; Flow, "helping structure the sequence of messages and arguments"; Framing, how facts "are perceived and understood through narration"; Emotion; Engagement. I could only read this table as reproduced in Blount et al. 2020, not the chapter itself: [Blount et al. 2020, Table 1](https://www.scitepress.org/Papers/2020/101216/101216.pdf)
- The 18 patterns as reproduced: addressing the audience, breaking the 4th wall, call for action, compare ("multiple visualisations juxtaposed and highlighting the difference"), concretise ("transforming abstract concepts or numbers into solid and known references"), convention breaking, defamiliarisation, exploration, familiarisation, gradual reveal ("unfolding a narrative in a hierarchical way"), humans behind the dots, make a guess, physical metaphor, repetition ("the same type of visualisations to present an effect repeatedly through different data dimensions"), rhetorical question ("presenting the argument of a narrative as a question"), silent data ("emphasising the argument... by de-emphasising or hiding some data"), speed up/slow down and users find themselves: [Blount et al. 2020](https://www.scitepress.org/Papers/2020/101216/101216.pdf)
- Scope stated by the chapter: storytellers are assumed to already know what story, why and for whom; the patterns help with narration choices afterward (per search summary of the chapter abstract): [Microsoft Research listing](https://www.microsoft.com/en-us/research/publication/narrative-design-patterns-for-data-driven-storytelling/)

#### Bach et al. on data comics
- Design patterns for data comics (CHI 2018, Bach, Wang, Farinella, Murray-Rust and Henry Riche): each pattern describes "a set of panels with a specific narrative purpose", enabling quick storyboarding, and combines "the spatial overview of infographics with the linear narration of videos" (from the abstract via search result): [Edinburgh research record](https://www.research.ed.ac.uk/en/publications/design-patterns-for-data-comics/)
- Graph comics (CHI 2016): eight design factors including representation of change, temporality, cast of characters, level of detail and overview and detail; general audiences grasped temporal change "with minimal text labels and no training" (via search result summary): [Graph comics project page](https://aviz.fr/~bbach/graphcomics/)
- Comparing data comics and infographics (CHI 2019, Wang, Wang, Farinella, Murray-Rust, Henry Riche and Bach): participants preferred data comics for enjoyment, focus and engagement, and comics "improved understanding and recall" (abstract via search result): [TU Delft record](https://research.tudelft.nl/en/publications/comparing-effectiveness-and-engagement-of-data-comics-and-infogra)

#### Cole Nussbaumer Knaflic, "Storytelling with Data" (2015)
- Six lessons as chapters: the importance of context; choosing an effective visual; clutter is your enemy; focus your audience's attention; think like a designer; lessons in storytelling: [Wiley VCH listing](https://www.wiley-vch.de/en/areas-interest/mathematics-statistics/storytelling-with-data-978-1-394-38809-7); [WIT library TOC](https://vufind.wit.edu/Record/w2038185/TOC)
- Chapter 1 contents: exploratory vs explanatory analysis, who/what/how, the 3 minute story and Big Idea, storyboarding: [WIT library TOC](https://vufind.wit.edu/Record/w2038185/TOC)
- Big Idea, attributed to Nancy Duarte's "Resonate": it "must articulate your unique point of view", "must convey what's at stake" and "must be a complete sentence"; it boils the "so-what" down "to a single sentence"; "each slide should have a clear Big Idea": [SWD blog, what's the Big Idea](https://www.storytellingwithdata.com/blog/2014/02/whats-big-idea)
- Chapter 2 form chooser starts with "simple text" and "tables" before graphs, and has a "to be avoided" section: [WIT library TOC](https://vufind.wit.edu/Record/w2038185/TOC)
- Chapter 3 covers cognitive load, Gestalt principles and decluttering step by step; chapter 4 covers memory and preattentive attributes (size, color, position on page): [WIT library TOC](https://vufind.wit.edu/Record/w2038185/TOC)
- Storyboarding with sticky notes is described only in secondary sources I reached (arrange sticky notes to set the narrative flow, before opening any tool); I did not verify the book's own wording: [Blinkist summary](https://www.blinkist.com/en/books/storytelling-with-data-en)

#### Alberto Cairo, "The Functional Art" (2012), "The Truthful Art" (2016), "How Charts Lie" (2019)
- "Function constrains the variety of forms that the data can adopt"; "an infographic or a visualization is first of all a tool"; "adapt the form of the graphic to the function that that graphic has to facilitate"; example: precise comparison favors bars over bubbles because length is judged more accurately than area: [Peachpit interview with Cairo](https://www.peachpit.com/articles/article.aspx?p=1951176)
- Kosara's review names "function constrains form" (not form follows function) as the one idea to remember: [eagereyes review](https://eagereyes.org/blog/2012/review-alberto-cairo-functional-art)
- "The Truthful Art" has a chapter "The Five Qualities of Great Visualizations"; I could not verify the five names (commonly given as truthful, functional, beautiful, insightful, enlightening) from a source I could open: [O'Reilly listing via search](https://oreilly.com/library/view/the-truthful-art/9780133440492)
- "How Charts Lie" chapters: charts that lie by being poorly designed, by displaying dubious data, by displaying insufficient data, by concealing or confusing uncertainty, by suggesting misleading patterns: [Skillsoft audiobook listing](https://skillsoft.com/audiobook/how-charts-lie-getting-smarter-about-visual-information-98a84ecb-48ff-4d9c-b0d1-3318327c3c1d)

#### Edward Tufte
- Data-ink: maximize the share of ink that presents data; "Erase non-data-ink, within reason"; "above all else show the data"; Tufte says it is better to violate a principle than to place graceless marks (secondary summaries): [IEEE Spectrum, Tufteisms](https://spectrum.ieee.org/tufteisms); [Jim Nielsen notes](https://notes.jim-nielsen.com/n/2021-04-28-1222/)
- Principles of analytical design (Beautiful Evidence, 2006), as summarized secondarily: show comparisons; show causality, mechanism and structure; show multivariate data; integrate words, numbers, images and diagrams; document the evidence; "content counts most of all": [jez.io Tufte course notes](https://blog.jez.io/tufte-course/); [University of Michigan notes](https://websites.umich.edu/~mmmc/516/notes/TuftePrinciples.pdf)
- Small multiples answer "compared to what?"; layering and separation gives categories visual hierarchy; micro/macro readings (secondary): [University of Michigan notes](https://websites.umich.edu/~mmmc/516/notes/TuftePrinciples.pdf)
- Sparklines: "data-intense, design-simple, word-sized graphics" that can sit "within a sentence, table or headline"; "Data graphics should have the resolution of typography": [Tufte, sparkline theory and practice](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)
- PowerPoint: leads presenters to "pitch rather than present evidence"; bullets are "base-touching grunts, which show effects without causes, actions without actors"; prefers "a well-written, detailed document" plus simple graphics, and large format handouts over slide decks: [Tufte, PowerPoint does rocket science](https://www.edwardtufte.com/notebook/powerpoint-does-rocket-science-and-better-techniques-for-technical-reports/)
- Minard as the causality exemplar (temperature line explaining deaths) appears both in Tufte summaries and in Kosara and Mackinlay: [jez.io notes](https://blog.jez.io/tufte-course/); [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)

### Inferences
- (a) Naming the point. The most usable single rule is Knaflic's Big Idea (point of view, stakes, complete sentence), applied per section, not just per piece. Segel and Heer's "messaging" and Amini's "take away message" in Release units are the research equivalents, and both are framed as text, not graphics.
- (b) Choosing form. Cairo's "function constrains form" plus Knaflic's chooser that starts with text and tables give the decision order: name what the reader must do with the point (compare, follow a cause, locate themselves, see structure), then pick the least elaborate form that does it. Segel and Heer's genre choice is the same logic one level up.
- (c) Sequencing. Hullman et al. give the only tested sequencing rules: change one thing at a time, prefer temporal moves and repeat a local pattern across parallel sections. Amini et al. add a macro arc (establish, initiate, single peak, release). Kosara and Segel and Heer add orientation devices so the reader knows where they are.
- (d) When not to visualize. Explicit guidance is thin. The defensible rules are Knaflic's text-first option, Tufte's "content counts most" and his preference for sentences over bullets, Segel and Heer's warning that messaging and interaction can clutter or distract and Hullman and Diakopoulos's point that every added or omitted element frames the reading.

### Gaps
- I could not read Bach et al.'s chapter directly; pattern definitions come from Blount et al.'s reproduction.
- The data comics pattern list (reportedly about 29 patterns) and its usability numbers were not verifiable from an open source.
- Knaflic's own text on storyboarding with sticky notes and the 3 minute story was not reachable; only her blog post on the Big Idea and the table of contents were.
- Cairo's five qualities and his visualization wheel axes were not verifiable from an open primary source.
- Tufte's principles come from secondary summaries; I did not read his books' text.

## Key question 2: Which rules apply to qualitative or conceptual "data" (a framework, a decision, a gap, a system, a timeline) as well as numbers?

### Takeaway
Most structural rules transfer cleanly because they are about order, attention and text: genres, visual structuring, highlighting, messaging, martini glass, the Hullman transition types (reinterpreted), Amini's arc, the Big Idea, storyboarding, decluttering, function constrains form, comparisons, causality and integration of words and images. Rules tied to encodings (data-ink ratio, sparklines, length vs area, measure walks) transfer only by analogy.

### Cited findings
- Segel and Heer's genres include flow chart and comic strip, and their tactics (establishing shot, checklist, consistent visual platform, progress bar) are structural, not quantitative: [Segel and Heer, section 4.1](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Their own example of a partitioned poster with flow chart tactics guides the eye with "visual highlighting (color, size, boldness) and connecting elements such as arrows and shaded trails" (section 3.1): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Segel and Heer borrow journalism devices with no data in them: the "anecdotal lead" and the "nut graf", and Blundell's advice to digress "often, but not for long" (sections 2.1 and 5): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Hullman et al. transition types include explicitly non data types: Dialogue (question then answer) and Causal (hypothesized cause), which "require an explicit interpretation" by the creator: [Hullman et al. 2013, section 3.2.2](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf)
- Kosara and Mackinlay define a story step as any of "text, images, visualizations, video", and tie order to time and causality: [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Amini et al.'s categories come from Cohn's theory of visual narrative in comics, not from data: [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Several Bach et al. patterns are content agnostic: rhetorical question, gradual reveal, compare, repetition, concretise, humans behind the dots: [Blount et al. 2020](https://www.scitepress.org/Papers/2020/101216/101216.pdf)
- Knaflic's Big Idea comes from Duarte's presentation method, which is not data specific: [SWD blog](https://www.storytellingwithdata.com/blog/2014/02/whats-big-idea)
- Tufte's "show causality" and "integrate evidence" and his critique that bullets show "effects without causes, actions without actors" apply to any argument, including engineering decisions: [Tufte, PowerPoint does rocket science](https://www.edwardtufte.com/notebook/powerpoint-does-rocket-science-and-better-techniques-for-technical-reports/)

### Inferences
Transfer map for a section by section portfolio case study (mostly text, product screens, process and concept diagrams). Marked T = transfers directly, A = transfers by analogy, N = numbers only.
- T: Big Idea per section as the section headline. A decision, trade off or gap can be stated as point of view plus stakes in one sentence.
- T: Author driven default. A portfolio is read once, often skimmed by a hiring reader; Segel and Heer's author driven end (linear, heavy messaging, little interaction) matches. A martini glass ending (open the prototype, full flow, appendix) fits the "explore if you want" reader.
- T: Visual structuring. Establishing shot or checklist (a contents strip or system map at the top), consistent visual platform (same diagram frame reused across sections), progress indicator.
- T: Hullman transitions reinterpreted for non numeric beats. Temporal = timeline of the project; granularity = system overview to one component or one screen; comparison dimension walk = same criterion across options (trade offs); measure walk = same option judged on different criteria; dialogue = question in one section answered by the next; causal = decision then consequence. "One change per step" becomes: change only one of zoom level, time or subject between adjacent visuals.
- T: Parallelism. Where the case study has three similar parts (three user types, three decisions), give each the same internal sequence; the only tested benefit is better recall of order.
- T: Amini's arc. Establisher (context, who), Initial (the trigger or problem), Peak (the key decision or reframe), Release (outcome, what changed). One Peak, placed around the middle, with release afterwards for the takeaway.
- A: Granularity was the least preferred transition in the Hullman study, which cautions against long overview to detail drill sequences without another anchor such as time.
- A: Data-ink becomes "diagram-ink": cut decoration in process diagrams and screens that does not carry the point. Tufte's layering and separation applies directly to diagrams (muted structure, emphasized subject).
- A: Small multiples become side by side screens or option cards with identical framing.
- N: Sparklines, length vs area accuracy, measure scales, uncertainty display.

### Gaps
- No source tests these rules on non quantitative material such as design process narratives; transfer is my inference.
- The Hullman transition ranking was measured on simple charts with Mechanical Turk users, not on diagrams or prose.

## Key question 3: What does each source say about annotation, the headline as the takeaway and text and image working together?

### Takeaway
Every source treats text as part of the visualization, not a caption bolted on. Segel and Heer found narrative messaging (annotations, intros, summaries, repetition) under-used; Kosara says a visualization must be "augmented" with text and highlighting to tell a story; Knaflic makes the one sentence point the governing unit; Tufte argues for integrating words, numbers and images and against detached bullets. The strongest caveat is Hullman and Diakopoulos: annotation and titles are a framing layer that steers interpretation.

### Cited findings
- Segel and Heer: messaging is "the use of text to provide observations and explanations about the images", in "headlines, captions, labels and annotations"; "interactive graphs do not include sufficient commentary for narrative purposes, with little use of repetition, multi-messaging (i.e., text, images and audio working together), or annotations to emphasize key observations" (sections 4.2 and 4.3): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Segel and Heer: messaging-heavy genres (slideshows and videos) "feel more like 'stories' and less like data tools" (section 4.2): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Segel and Heer's NYT budget case: narrative works "through the interaction of the text in the left panel with the annotations and graphic elements in the right panel, each enriching the narrative through multi-messaging, providing related but different information" (section 3.2): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Segel and Heer cite eye tracking work showing newspaper readers "regularly skim by scanning graphics, headlines and initial paragraphs", and note that examples had "hard leads" (brief summaries) (section 5): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf)
- Kosara and Mackinlay: "to tell a story it might need to be augmented with other means of communication: written text, audio, video"; "highlighting, arrows and other tools might be necessary"; most research treats visualization "as entirely self-contained" (section "Annotations and Highlights"): [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Hullman and Diakopoulos: textual annotation is one of four editorial layers where framing enters; linguistic rhetoric includes typographic emphasis and rhetorical questions in titles used "to set the stage" for an interpretation (sections 1 and 3.2.5): [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Later work on chart titles credits this paper for drawing attention to textual annotation in visualization (via search result): [Kong et al. CHI 2018 VisTitles](https://mail.zcliu.cs.umd.edu/vistitles/CHI18-VisTitles.pdf)
- Amini et al.: attention cues (animation, gradual text, highlighting, zooming, pointing) were coded as a separate content dimension in data videos: [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Knaflic: the Big Idea "boils down the 'so-what'... to a single sentence", and "each slide should have a clear Big Idea": [SWD blog](https://www.storytellingwithdata.com/blog/2014/02/whats-big-idea)
- Knaflic: the book's process runs from chart choice to "thinking like a designer" when "applying color and adding annotations": [SWD books page](https://www.storytellingwithdata.com/books)
- Tufte: words, numbers, images and diagrams belong together, labels next to data rather than in legends (secondary): [jez.io notes](https://blog.jez.io/tufte-course/); sparklines sit inside sentences so graphics have "the resolution of typography": [Tufte sparklines](https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/)
- Tufte: NASA slides spent about 20% of each slide on branding and repeated titles and showed "a general absence of units of measurement": [Tufte, PowerPoint does rocket science](https://www.edwardtufte.com/notebook/powerpoint-does-rocket-science-and-better-techniques-for-technical-reports/)
- Bach et al. data comics: the comics affordance named is "word+picture" and narration across panels: [Bach data comics page](https://aviz.fr/~bbach/homepage/topics/datacomics)

### Inferences
- Headline as takeaway: Knaflic is the only source that states it as a rule; Segel and Heer and Kosara support it indirectly (readers scan headlines first; stories need text). For a case study, the section headline should be the claim, and the diagram should prove that claim, not restate the section topic.
- Annotation as framing: because annotation steers reading (Hullman and Diakopoulos), annotate the one thing the reader must see at that beat and leave the rest muted. That is the same advice as Knaflic's focus attention and Tufte's layering, stated from the ethics side.
- Text and image should carry "related but different information" (Segel and Heer). A caption that repeats the paragraph wastes the image; a diagram that needs the paragraph to be legible is under-annotated.

### Gaps
- None of the sources I read quantified the effect of a takeaway headline on comprehension; the CHI 2018 titles paper likely does but I did not read it.
- Cairo's specific annotation guidance (his "annotation layer") was not reachable from an open primary source.

## Key question 4: What is the strongest evidence (user studies, citations) behind each, and where do the sources agree and disagree?

### Takeaway
Evidence is mostly corpus analysis of professional work (Segel and Heer 58, Hullman and Diakopoulos 51, Hullman et al. 42, Amini et al. 50) plus expert opinion. Controlled user evidence exists only for Hullman et al.'s sequencing (143 participants), Wang et al.'s data comics comparison and Bateman et al.'s embellishment study, which partly contradicts Tufte's minimalism. Sources agree on author driven structure, explicit messaging and attention direction; they disagree on minimalism versus embellishment, on how much interaction to allow and on whether framing is a tool or a hazard.

### Cited findings
- Segel and Heer: 58 coded examples, no user study; they call for future work on "readers' experiences" (section 5). The paper received the IEEE VIS 10 year Test of Time award in 2020 (per search results): [Segel and Heer](https://homes.cs.washington.edu/~jheer/files/narrative.pdf); [UW news](https://news.cs.washington.edu/2020/10/30/professor-jeffrey-heer-and-alumnus-dominik-moritz-honored-at-ieee-vis-for-outstanding-contributions-in-data-visualization/)
- Hullman et al. 2013: corpus of 42 plus two crowdsourced studies; InfoVis 2013 best paper (per search result): [Hullman et al. 2013](https://mucollective.northwestern.edu/files/2013-StorySequence-InfoVis.pdf); [IEEE VIS 2013 listing](https://ieeevis.org/year/2013/paper/infovis/deeper-understanding-sequence-narrative-visualization)
- Hullman and Diakopoulos 2011: 51 coded examples, theory driven, no user study; they propose experiments as future work (section 5): [Hullman and Diakopoulos](https://mucollective.northwestern.edu/files/2011-VisRhetoric-InfoVis.pdf)
- Amini et al. 2015: 50 videos coded by two researchers on 10%, then one lead coder; plus 13 expert workshop participants: [Amini et al.](https://hci.cs.umanitoba.ca/assets/publication_files/DataVideoStorytellingCHI2015_Revision_Final.pdf)
- Bach et al. 2018 patterns: derived from expert collaboration; Blount et al. later tested how novices used them and compared with 24 award winning stories: [Blount et al. 2020](https://www.scitepress.org/Papers/2020/101216/101216.pdf)
- Wang et al. 2019: lab and in the wild studies; data comics improved understanding and recall versus infographics: [TU Delft record](https://research.tudelft.nl/en/publications/comparing-effectiveness-and-engagement-of-data-comics-and-infogra)
- Kosara and Mackinlay: position paper; they cite evidence that animated transitions had "a slight detrimental effect on people's ability to follow trends" yet suit live presentation: [Kosara and Mackinlay](https://media.eagereyes.org/papers/2013/Kosara-Computer-2013.pdf)
- Bateman et al. 2010: embellished charts were described about as accurately as plain ones, and recall after two to three weeks was significantly better for embellished charts, questioning minimalist premises: [Bateman et al. Useful Junk](https://vis.csail.mit.edu/classes/6.859/readings/pdfs/Bateman-UsefulJunk.pdf); Kosara's commentary: [eagereyes, chart junk considered useful after all](https://eagereyes.org/blog/2010/chart-junk-considered-useful-after-all)
- Knaflic, Cairo and Tufte: practitioner books built on professional practice and examples, with Knaflic grounding attention advice in preattentive attributes and Gestalt principles: [WIT library TOC](https://vufind.wit.edu/Record/w2038185/TOC)
- A critic of the martini glass label argues it is a common journalism structure "that has nothing to do with the balance between author- and reader-driven approaches" (opinion, via search result): [Masters of Media, UvA](https://mastersofmedia.hum.uva.nl/tag/narrative)

### Inferences
Agreement
- Lead with the point, then support it: Knaflic's Big Idea, Segel and Heer's hard leads and introductory text, Kosara's teaser and lede, Amini's establisher before the peak.
- Direct attention deliberately: Segel and Heer's highlighting, Knaflic's preattentive attributes, Tufte's layering and separation, Kosara's highlighting and arrows, Bach's silent data.
- Text and image are one unit: Segel and Heer's multi-messaging, Kosara's augmentation, Tufte's integration of evidence, data comics' word plus picture.
- Order carries meaning and causality: Kosara, Hullman et al. (temporal and causal types), Tufte's "show causality", Amini's arc.
- Form follows the reader's task: Cairo's function constrains form, Segel and Heer's genre by audience and medium, Knaflic's effective visual.

Disagreement or tension
- Minimalism. Tufte's data-ink and chartjunk position versus Bateman et al.'s finding that embellishment aided recall, and Bach's emotion and engagement patterns (humans behind the dots, physical metaphor) that add non data elements on purpose. Cairo sits between: function first, but beauty and engagement count.
- Interaction and reader freedom. Segel and Heer and Bach (exploration pattern) value reader driven stages; Kosara and Segel and Heer's own discussion favor constrained interaction; Tufte and Knaflic largely assume a static, author driven artifact.
- Framing. Knaflic and Bach treat persuasive framing (rhetorical question, silent data) as craft; Hullman and Diakopoulos and Cairo's "How Charts Lie" treat the same moves as risks to honest interpretation that need disclosure. Silent data in Bach is information access rhetoric (omission) in Hullman and Diakopoulos.
- Slides. Knaflic and Kosara work within slide and slideshow formats; Tufte argues slides fragment reasoning and prefers dense documents and handouts.
- Structure source. Amini et al. found data videos break from classic arcs (Initial dominates; some videos have no Peak), which tempers any single Freytag style template.

For the portfolio (inference): the evidence most worth leaning on is Hullman et al.'s sequencing results (one change per step, temporal first, parallel sections) and the broad agreement on point first headlines with annotated, muted visuals. Treat framing advice with Hullman and Diakopoulos's caveat in mind, since a case study is itself persuasive.

### Gaps
- No user study I found tests the martini glass, interactive slideshow or drill down schemas against each other.
- No study found on narrative structure for design case studies or portfolio reading behavior specifically.
- Few's 2011 critique of Bateman et al. was referenced but not read.
