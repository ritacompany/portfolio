Agent: design-case-studies researcher

# How strong product design case studies show reasoning visually

Visual counts below come from fetching each page and listing its figures. They are approximate, since responsive markup repeats images and paragraph counts vary with lists. Four sources could not be read directly. Simon Pan's Uber study returned 401, Airbnb's "Building a visual language" redirected and then returned 404, Alex Couch's Medium post returned 403 and the NN/g URL "ux-portfolios" returned 404. These are listed in the gaps sections.

## Concrete examples of case studies that visualize reasoning

### Takeaway
The strongest published design write-ups (Linear, Figma, Stripe, Duolingo, Basecamp) almost never present a framework as prose alone. Each key idea gets one purpose-built visual: an annotated region, a side by side of options, a perceptual comparison, a structure diagram or a progress model. Prose then explains what the figure already shows.

### Cited findings

System or region model, annotated
- Linear's UI redesign post uses an "Inverted L navigation highlighted" figure. It is a screenshot with the global chrome marked, which names the system being redesigned before any change is shown. (Source: [Linear, How we redesigned the Linear UI](https://linear.app/now/how-we-redesigned-the-linear-ui))

Options explored and timeline of iterations
- Linear shows a "Before / Concept / After" figure with three stages side by side. It carries the iteration story in a single frame, from the original UI through the exploratory concept to what shipped. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Linear also shows a canvas of "Karri's explorations in Figma", a raw exploration wall that serves as evidence of breadth. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Linear closes with a "Milestones and progress chart" plotting five project milestones from stress tests to general availability. It is a timeline of the process drawn as a chart. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Figma's UI3 process post shows rejected options with captions that name the rejection. "Explorations of clip content that didn't make the cut" shows four toggle, icon and menu variants. Prose explains the team went back to a checkbox because the dropdown added a click. (Source: [Figma, Our approach to designing UI3](https://www.figma.com/blog/our-approach-to-designing-ui3/))
- Figma shows "An early iteration had blend modes behind an icon button", a single rejected iteration whose caption states the earlier state. The tradeoff it illustrates is panel simplicity against workflow speed. (Source: [Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/))
- Figma shows three slider variants labeled A, B and C in the caption, each tied to a context (video scrubbing, variable fonts, color). This is a labeled small multiples pattern. (Source: [Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/))
- Figma shows a "sprawling speed round crit file" and then zooms into one comment thread. It moves from a wide shot of the mess to a close-up of one debate, which shows the mess without asking the reader to parse it. (Source: [Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/))
- Figma shows a proposed tooltip labeling system, then the revised version, with captions explaining that the minimalist option was rejected for accessibility. The decision and its reason are carried by a before and after pair. (Source: [Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/))

Tradeoff and principle illustrated rather than stated
- Linear's "LCH vs. HSL" figure shows the color-space argument visually. Equal lightness values look equally light in LCH and uneven in HSL, so the figure lets the reader see why the switch was made. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Linear's "Comparison between contrast set to 30 and 100" shows a single system variable at two settings. The parameter is demonstrated, not described. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Stripe's accessible color post sets up the principle with paired swatch strips. One shows HSL with equal lightness that looks uneven, the other a perceptually uniform space that looks even. The reader sees the flaw before reading the fix. (Source: [Stripe, Designing accessible color systems](https://stripe.com/blog/accessible-color-systems))
- Stripe plots lightness curves per hue for the old palette, where each hue follows a different curve, then the new palette, where all hues share one curve. The before and after is a chart, not a pair of screenshots. (Source: [Stripe](https://stripe.com/blog/accessible-color-systems))
- Stripe's "thread the needle" charts shade the impossible color regions to show how narrow the feasible space is. This is a constraint drawn as a shape. (Source: [Stripe](https://stripe.com/blog/accessible-color-systems))
- Stripe ends by applying the system to a real component (badges), showing the principle's payoff in product UI. (Source: [Stripe](https://stripe.com/blog/accessible-color-systems))

Structure or hierarchy change, closest analog to a curriculum framework
- Duolingo's path announcement places the old skill tree beside the new linear path. A branching structure becoming one guided sequence is understood at a glance. (Source: [Duolingo, New home screen design](https://blog.duolingo.com/new-duolingo-home-screen-design))
- Duolingo uses a "levels in path" diagram. Grey pebbles form a winding path and colored skill levels point to scattered pebbles, showing how one skill's levels are spaced across the path to support spaced repetition. The pedagogy (the reasoning) becomes a diagram of where content lands in the sequence. (Source: [Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design))
- Duolingo's earlier skill levels graphic explains the old grouping model before the new one replaces it, so the reader holds the old mental model first. (Source: [Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design))

Progress and pace model
- Basecamp's Shape Up hill chart is a bell curve where uphill means figuring out what to do and downhill means getting it done. Each dot is a scope placed by how well its unknowns are understood. It is drawn explicitly as an alternative to a percent-done bar, because task counts mislead when work is discovered midstream. (Source: [Basecamp, Shape Up chapter 13](https://basecamp.com/shapeup/3.4-chapter-13))
- The same chapter teaches the model through a sequence of figures: a labeled blank hill, a dinner party example with one dot moving, a scope map in matching colors, three snapshots over time, stuck-scope snapshots and a scope before and after being split. One concept gets about eight figures, each adding one idea. (Source: [Basecamp](https://basecamp.com/shapeup/3.4-chapter-13))

Context and constraints as a visual
- Linear shows "Linear on macOS, Windows, and in a browser" as three platform mockups, which states the constraint that navigation had to work everywhere without a paragraph. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Linear shows several view types (list, board, split) running the new UI as evidence the decision held across layouts. This is a robustness test shown as small multiples. (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))

Individual portfolios cited as strong
- Erik Kennedy (Learn UI Design) praises Bettina Bergendahl for scannable diagrams and illustrations, starting with the final product and offering a "jump to solution" link. (Source: [Learn UI Design, Great design portfolio examples](https://www.learnui.design/blog/great-design-portfolio-examples.html); portfolio: [bettinabergendahl.com](https://www.bettinabergendahl.com/))
- The same article praises Simon Pan's Uber case study for interface screenshots tied to design decisions and multiple iterations shown. It also notes the write-up is long and text heavy, so it is an example of depth rather than of brevity. (Source: [Learn UI Design](https://www.learnui.design/blog/great-design-portfolio-examples.html); study: [simonpan.com/work/uber](https://simonpan.com/work/uber/))
- Kennedy praises Ueno (archived) and Eric Van Holtz for annotated designs with callouts or captions beside mockups. For Thomas Quigley he says he wanted more annotations on design decisions. (Source: [Learn UI Design](https://www.learnui.design/blog/great-design-portfolio-examples.html); [Ueno archive](https://web.archive.org/web/20240106195631/https://ueno.co/), [vanholtz.co](https://vanholtz.co/), [quigley.work](https://www.quigley.work/))

Studios
- Metalab's work index lists case studies tagged as systems or framework work (Tripadvisor design system, Headspace motion framework, The Atlantic AI framework). Its image alt text describes interface screenshots, and the page gives no evidence of reasoning diagrams. (Source: [Metalab work](https://www.metalab.com/work))

### Inferences
- The recurring pattern across Linear, Figma, Stripe and Duolingo is one figure per claim. Each figure isolates one variable (a region, a setting, a structure, a rejected option), and the caption or the next sentence states the decision. Screen dumps without that isolation do not appear in these posts.
- For the scheduling framework case study, the closest structural analogs are these. Duolingo's tree vs path and levels-in-path figures map to the week by week curriculum structure. Basecamp's hill chart and its snapshots over time map to pace tracking and to showing someone falling behind. Figma's rejected option captions map to the options explored for rollover. Stripe's curve-before and curve-after charts map to showing a capacity model as a shape rather than a list of rules.
- Teaching a model through a sequence of small figures that each add one idea (Shape Up) suits a framework whose parts interact, such as capacity feeding schedule feeding pace feeding rollover. Avoid one dense diagram that shows everything at once.
- Studio sites (Metalab) tend to sell outcomes through polished screens. Company design blogs (Linear, Figma, Stripe) are the better reference for reasoning visuals.

### Gaps
- Simon Pan's study returned 401 and could not be inspected directly. Its description comes from Learn UI Design only.
- Airbnb's "Building a visual language" ([airbnb.design](https://airbnb.design/building-a-visual-language/)) now redirects to a 404, so its visuals could not be described.
- Individual Metalab case study pages, Work & Co, Instrument, Pentagram, Fantasy, Clay, Dropbox and Uber Design were not inspected because of the tool budget. Whether any of them shows framework or decision diagrams is unconfirmed.
- No example found of a published case study that shows a 2x2 positioning chart or a formal state diagram in a design reasoning context. Further searching is needed.
- Bestfolios and Case Study Club galleries were not fetched.

## What hiring managers and design leaders say about visuals

### Takeaway
The guidance converges. Reviewers scan rather than read. Final screens alone are insufficient. Process artifacts only earn their place when they are tied to what changed, and annotation is what turns a screenshot into evidence of reasoning. No sourced data was found on how much time reviewers spend per image.

### Cited findings
- NN/g (Rachel Krause, 2019) says final screenshots tell only part of the story. It recommends early sketches, whiteboards and research documentation, and says hiring managers want to see design options that did not make it to the final product. (Source: [NN/g, 5 steps to creating a UX design portfolio](https://www.nngroup.com/articles/ux-design-portfolios/))
- The same article says hiring managers rarely read everything word for word, so portfolios should be scannable. It adds that process visuals help them picture how a candidate would fit on their team. (Source: [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/))
- NN/g suggests workshop photos and black and white wireframes to show process under NDA. (Source: [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/))
- NN/g's case study outline includes the design directions that were dropped as a required element. (Source: [NN/g search summary of ux-design-portfolios and the case study video](https://www.nngroup.com/videos/ux-design-portfolio-case-study/))
- Taylor Palmer (UX Tools, writing as a hiring manager) argues screenshots should be annotated to point to the part that is different, and that old vs new or rejected vs retained comparisons tell the story. (Source: [UX Tools, 5 principles of exceptional case studies](https://www.uxtools.co/blog/5-principles-of-exceptional-case-studies-in-ux-portfolios))
- Palmer argues whiteboard photos, sticky notes and large exploration canvases show effort but not why the work matters unless they are tied to what changed. He calls generic isometric grids of app screens low value. (Source: [UX Tools](https://www.uxtools.co/blog/5-principles-of-exceptional-case-studies-in-ux-portfolios))
- Palmer recommends descriptive headings that carry the point (a finding, not "Research") and answering context questions early through bullets, a table or a short summary. (Source: [UX Tools](https://www.uxtools.co/blog/5-principles-of-exceptional-case-studies-in-ux-portfolios))
- Erik Kennedy praises "start with the end", showing the final product before the chronological process, and a "jump to solution" link for readers who skip process. (Source: [Learn UI Design](https://www.learnui.design/blog/great-design-portfolio-examples.html))
- UXfolio advises against blocks of text without images, saying they make a case study look like a chore. It also says hiring managers scan first. This is a portfolio-tool vendor's practitioner opinion, not research. (Source: [UXfolio, UX portfolio design tips](https://blog.uxfol.io/ux-portfolio-design-tips/))
- Claimed review times conflict and are unsourced in the pages found: one source says 30 to 60 seconds for an initial scan, another under two minutes. Neither traces to a named study. (Sources: [UXfolio](https://blog.uxfol.io/ux-portfolio-design-tips/); [ADPList Substack](https://adplist.substack.com/p/only-30-seconds-to-reject-your-portfolio))
- A Penn State career guide says captions and annotations keep visuals legible and give context to viewers who were not on the project. It recommends alternating between showing the work and explaining it. (Source: [Penn State IST, ePortfolios](https://ist.psu.edu/current/careers/development/resumes-letters/eportfolios))
- Tobias van Schneider's sourced portfolio advice found here is about the About page (the most visited page, so show who you are), not about case study visuals. (Source: [Working Not Working interview](https://magazine.workingnotworking.com/magazine/2015/2/19/not-working-tobias-van-schneider))

### Inferences
- "Show the mess" has a sourced condition attached. NN/g asks for it, while Palmer warns the mess alone proves nothing. The Figma pattern of a wide shot of the crit file followed by a zoom on one debate satisfies both.
- For a senior framework case study, the rejected options figure is explicitly requested by NN/g. It is also the visual the Figma post uses most, so it is the safest bet for an options explored beat.

### Gaps
- No primary source found from Julie Zhuo, Sarah Doody, ADPList mentors or Case Study Club on diagrams of thinking vs screen dumps. The searches returned only aggregator content.
- No rigorous study found on how reviewers look at images in portfolios. NN/g's general scanning research was not checked for portfolio-specific findings.

## Named techniques

### Takeaway
The techniques that recur in the sources reduce to eight: annotated screenshot, labeled options grid, before and after pair, perceptual or chart comparison, structure diagram, progress model drawn as a shape, exploration wall with zoom and milestone timeline. The most common caption style names what was rejected or what changed.

### Cited findings
- Annotated region screenshot: Linear's inverted L highlight ([Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)). Recommended by Palmer as "point to the part that is different" ([UX Tools](https://www.uxtools.co/blog/5-principles-of-exceptional-case-studies-in-ux-portfolios)).
- Callouts beside mockups: Ueno and Eric Van Holtz ([Learn UI Design](https://www.learnui.design/blog/great-design-portfolio-examples.html)).
- Labeled options grid (small multiples of variants): Figma's sliders A, B and C and its four rejected clip content variants ([Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/)).
- Iteration strip (before, concept, after): Linear ([Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)).
- Before and after drawn as a chart rather than screens: Stripe's lightness curves ([Stripe](https://stripe.com/blog/accessible-color-systems)).
- Constraint drawn as a region: Stripe's shaded impossible-color areas ([Stripe](https://stripe.com/blog/accessible-color-systems)).
- Principle demonstrated by paired swatches: Stripe and Linear, HSL vs perceptual space ([Stripe](https://stripe.com/blog/accessible-color-systems); [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)).
- Structure diagram, old model beside new: Duolingo tree vs path ([Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design)).
- Mechanism diagram showing where things land in a sequence: Duolingo levels-in-path ([Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design)).
- Progress model as a shape, plus snapshots over time: Basecamp hill chart ([Basecamp](https://basecamp.com/shapeup/3.4-chapter-13)).
- Show the mess, then zoom: Figma crit file plus comment thread ([Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/)).
- Milestone timeline chart: Linear ([Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)).
- Start with the end and jump to solution: Bettina Bergendahl, per Kennedy ([Learn UI Design](https://www.learnui.design/blog/great-design-portfolio-examples.html)).
- Context-question summary at the top (bullets, table or short summary): Palmer ([UX Tools](https://www.uxtools.co/blog/5-principles-of-exceptional-case-studies-in-ux-portfolios)). This is the closest sourced match to a "TLDR visual" at section top.

### Inferences
- A decision tree or a 2x2 did not appear in any source inspected. If used, they would be the case study's own invention rather than a pattern copied from a reference. That is fine, but no example exists to point at.

### Gaps
- No sourced definition or example of a "TLDR visual" per section was found beyond Palmer's summary-table advice.

## Ratio of text to visuals, visuals per section and captions

### Takeaway
Admired company design posts run about one visual for every two paragraphs. Linear and Figma caption most of their figures with a line that states the point, Stripe captions none and Duolingo sits at the low end. A single concept can carry up to about eight figures when it is taught step by step.

### Cited findings
- Linear UI redesign: about 16 visuals to about 30 paragraphs, and most visuals carry short captions that name the point, such as "LCH vs. HSL" or "Sidebar alignments". (Source: [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui))
- Figma UI3 process: 11 design visuals to about 25 to 30 paragraphs. Eight of the 11 have captions, usually one line naming what was explored or rejected. (Source: [Figma](https://www.figma.com/blog/our-approach-to-designing-ui3/))
- Stripe accessible colors: 15 visuals, roughly one per section and often clustered, inside long-form prose with no captions. The text explains each figure. Concept sections lean on diagrams, and later sections move to tool and results. (Source: [Stripe](https://stripe.com/blog/accessible-color-systems))
- Duolingo path post: 6 visuals to about 25 to 30 paragraphs, mostly before and after pairs. (Source: [Duolingo](https://blog.duolingo.com/new-duolingo-home-screen-design))
- Shape Up chapter 13: about eight figures for one concept (the hill chart). (Source: [Basecamp](https://basecamp.com/shapeup/3.4-chapter-13))
- One practitioner outline recommends two or three large result screenshots near the top and two or three bullets per section. This is practitioner opinion via search summary only. (Source: [read.cv, twanlass case studies](https://read.cv/twanlass/case-studies))

### Inferences
- A practical target drawn from these counts: at least one visual per beat, with the visual placed before or beside the paragraph it proves, and a one-line caption that states the claim (Linear and Figma style) rather than labeling the image. Where a beat explains a mechanism with interacting parts, use a short sequence of figures (Shape Up style) rather than more prose.
- These are blog posts, which run longer than portfolio case studies. A portfolio case study probably needs a higher visual to text ratio than these, but that is an inference, not a measured figure.

### Gaps
- No study or survey found that measures text to visual ratios in admired portfolio case studies. All ratios above are counts from the pages themselves.
