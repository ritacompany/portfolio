# How strong case studies show reasoning visually

Viewing key used throughout:
- VIEWED (text): the page body was fetched and read. WebFetch returns text and image references, not the images themselves, so visual descriptions of VIEWED pages come from captions, alt text, surrounding prose and file names, not from seeing the pixels.
- SECONDHAND: known only from a search result summary, a listing page or a third party description.

## What hiring managers and reviewers say about scanning versus reading and walls of text

### Takeaway
Every source that addresses it agrees reviewers scan first and read only when something earns it: headings and visuals carry the first pass, and long prose blocks are named as the most common reason a skimming reviewer stops. The best sourced rule of thumb is roughly 30% text to 70% visual per section, where "visual" includes diagrams and insight cards, not only screens.

### Cited findings
- NN/g (Rachel Krause, 4 Aug 2019): "Very rarely will hiring managers take the time to read your entire portfolio word for word." VIEWED (text). [NN/g, UX design portfolios](https://www.nngroup.com/articles/ux-design-portfolios/)
- The same NN/g article quotes a hiring manager who wants to know "what isn't in the design and why, just as much as" what made it in. It recommends showing "design concepts that were ultimately not pursued", early sketches and whiteboards, and says to "break up text with visuals". VIEWED (text). [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)
- NN/g also says the final screenshots "only tell part of the story" and that for unshipped work you should "include candidate solutions and explain the thought process behind the designs." VIEWED (text). [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)
- Uxcel write up of a live portfolio review (byline Gene Kamenez, reviewer Réka Nagy of UXfolio): walls of text were "the most common red flag of the session"; one case study "reads like a blog article"; "A reviewer skimming the page runs straight into the wall and stops." VIEWED (text). [Uxcel, UX portfolio review red flags and green flags](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)
- Same source: Nagy's rule of thumb is "30% text and 70% visual in each section", and the visual "doesn't have to be a screen. Cards with the main insights, a quote from a user interview, or a simple diagram all count." VIEWED (text). [Uxcel](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)
- Same source, on decoration: "Never add a visual without any context ... because then it will be just a decoration." And: with a table of contents and descriptive headings, "a reviewer can skim just the headings and visuals and still get the gist." Reviewers "might be scanning 20 or 30 portfolios in an hour." VIEWED (text). [Uxcel](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)
- Dominic Monn (MentorCruise CEO): reviewers "skip the intro, scan to the first section heading that looks like 'why'"; "The Decisions section is what earns callbacks". He cites "an average of 60 seconds per case study, per UXPlaybook research" (the underlying research was not traced; treat as unverified). VIEWED (text). [MentorCruise, the hiring manager's cold read](https://mentorcruise.com/blog/how-to-write-a-ux-case-study-that-passes-the-hiring-managers-cold-read/)
- Sarah Doody's Maven session is titled "Design a UX Portfolio Recruiters Read For More Than 1 Minute" and argues if they cannot skim it they will not read it, using a journalism style "headline test". She also argues for slide deck format over websites because recruiters skim. SECONDHAND (session descriptions only, content gated). [Maven, Doody session](https://maven.com/p/09985c/design-a-ux-portfolio-recruiters-read-for-more-than-1-minute); [Maven, stop building a portfolio website](https://maven.com/p/695cb0/stop-building-a-ux-portfolio-website-do-this-instead)
- ADPList post drawing on Glen Lipka (Head of Product Design) reports 54% of hiring managers take about 5 to 10 minutes per portfolio review. SECONDHAND, survey method not seen. [ADPList, what is a hiring manager looking for](https://adplist.org/blog/what-is-a-hiring-manager-looking-for-in-a-design-portfolio)
- Jessica Ko (former Google hiring manager, Playbook CEO) in a Dribbble webinar: a portfolio is not self expression or an art piece; it exists to help you get a job. SECONDHAND. [Dribbble, Jessica Ko portfolio webinar](https://dribbble.com/resources/jessica-ko-portfolio-webinar)
- A profile piece on Tobias van Schneider's portfolio advice says people scan a page for what interests them, so longer captions with a headline can be enough, and recommends plain language. Another summary says he argued the case study formula "has expired". SECONDHAND, his original posts not found. [Webdesigner Depot, 5 common portfolio mistakes](https://webdesignerdepot.com/5-common-portfolio-mistakes-and-how-to-fix-them/); [Designabile #18](https://designabile.substack.com/p/designabile-18-il-portfolio-del-designer?open=false)
- UXfolio blog: hiring managers rarely read case studies line by line, they scan first; recommends emphasis on key decisions. SECONDHAND. [UXfolio, portfolio design tips](https://blog.uxfol.io/ux-portfolio-design-tips/)

### Inferences
- The consistent model across sources is a two pass read: pass one is headings plus visuals (seconds to a minute), pass two is prose for the reviewer who is already interested. A case study should be fully legible on pass one, meaning each section's claim should live in its heading and its visual, with prose as optional depth.
- "Visual" in reviewer advice explicitly includes non screen artifacts (diagrams, insight cards, quotes). This matters for framework or operations work where there is no single hero screen.
- Several timing figures (6 to 8 seconds, 60 seconds, 5 to 10 minutes) circulate without traceable methodology. Only the direction (scan before read) is well supported.

### Gaps
- No portfolio specific quote found from Julie Zhuo, Ben Wiener, Jason Mesut or Lenny's Newsletter on scanning or text density. Searches returned only general career advice for Zhuo and career shaping material for Mesut ([IxDA, Shape your future self](https://ixda.org/event/shape-your-future-self/)).
- Tobias van Schneider's own wording on text length could not be retrieved.
- The uxdesign.cc piece "Only 30 seconds to reject your portfolio" returned HTTP 403 and was not read. [uxdesign.cc](https://uxdesign.cc/only-30-seconds-to-reject-your-portfolio-8cb14ac70674)

## Named exemplars for showing reasoning visually and the devices they use

### Takeaway
The best documented exemplars of visual reasoning are product team design posts (Linear, Stripe) and teardown publishers (Growth.Design, Built for Mars), not studio portfolio pages. Studios like Metalab lead with large screens and outcome numbers and show process mainly as service tags at listing level.

### Cited findings
- **Linear, "How we redesigned the Linear UI (part II)"** (Karri Saarinen and three co authors, 28 Mar 2024). VIEWED (text). [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
  - Evolution strip: three labelled screenshots, Before, Concept, After. Reasoning made visible: before and after plus the intermediate direction.
  - Annotated highlight: the "inverted L" global navigation marked on a screenshot, with a caption naming what to notice. Reasoning: which region the concept targets.
  - Exploration boards: many concept screens from Figma shown before narrowing. Reasoning: breadth of options considered.
  - Model comparison: LCH next to HSL to justify the theme generation choice. Reasoning: a system decision and why.
  - Parameter variants: the same theme at contrast 30 and 100. Reasoning: what a system control does.
  - Theme and view grids (light, dark, list, board, split) and cross platform mockups. Reasoning: the system holds across contexts.
  - Text pattern: prose states the problem or decision, image follows, short caption names what to look at, prose after explains why. Rejected navigation options appear mainly in text, not as visuals.
- **Stripe, "Designing accessible color systems"** (15 Oct 2019, credited to Daryl Koopersmith and Wilson Miner). VIEWED (text). [Stripe](https://stripe.com/blog/accessible-color-systems); author credit SECONDHAND via [Matthew Ström](https://matthewstrom.com/writing/generating-color-palettes/)
  - Rejected approach shown visually: side by side columns of a "one step darker" text shift that passed contrast but looked muddy. Reasoning: an option that met the rule and still failed.
  - Model explainer diagrams: HSL samples where equal lightness looks uneven, against a perceptually uniform space. Reasoning: why the old mental model was wrong.
  - Constraint chart: a "thread the needle" plot showing how narrow the feasible range is. Reasoning: the constraint itself drawn as a shape.
  - Lightness curves for the old palette and per hue for the new one; contrast grids; before and after of the Badge component; screenshot of the internal tool. Reasoning: the system and the tool that produced it.
  - Text pattern: prose introduces each figure ("The diagram below shows...") and tells the reader what to notice; charts act as evidence for a claim already stated in text.
- **Growth.Design case studies.** Example "Labor Perception Bias". VIEWED (text). [Growth.Design, labor perception bias](https://growth.design/case-studies/labor-perception-bias); listing [Growth.Design case studies](https://growth.design/case-studies)
  - Format observed: a 21 slide sequence advanced by arrow keys, split into beats. The brief called it comic style; Product Hunt describes "tips in a comic book format" ([Product Hunt](https://www.producthunt.com/products/growth-design-case-studies/launches/growth-design-case-studies-v2-0)), but the fetched page text did not confirm a recurring character, so "comic" is SECONDHAND.
  - Text pattern: one to two sentence italic narration lines next to an image; user inner voice as quoted lines (speech or thought bubble role); a pinned callout box per concept holding the only longer explanation (three to four short paragraphs) with footnote numbers.
  - Cumulative build: the same image persists across consecutive slides while text advances, so a screen is annotated in steps rather than all at once.
  - Before and after shown sequentially, not side by side, often as video or GIF (Wise transfer animation). One ethical alternative was described in text only.
  - Other titles on the listing: Audible purchase UX, McDonald's self serve kiosks, Scarcity, Adobe cancel subscription. Each card shows read time (2 to 9 min). VIEWED (listing only).
- **Built for Mars.** Listing describes "original product teardowns ... packed with memes". Titles include Granola, Twitch, Hinge, Waze, Monzo savings challenge, Chase, Lovable, Grok. Most are locked; bodies not read. VIEWED (listing only); devices inside not verified. [Built for Mars case studies](https://builtformars.com/case-studies)
- **Metalab work page.** Cards are full width screens or photos on coloured backdrops, a one to two sentence summary, service tags and an outcome figure (for example Amazon Photos launched to 54 million Prime subscribers; Waking Up nearly 40,000 five star reviews). Process appears only as tags at listing level. VIEWED (listing only). [Metalab work](https://www.metalab.com/work); individual pages such as [Metalab, Uber](https://www.metalab.com/work/uber), [Pitch](https://www.metalab.com/work/pitch), [Headspace](https://www.metalab.com/work/headspace) and archive pages such as [Slack](https://archive.metalab.com/projects/slack) were not opened.
- **Uxcel reviewed portfolios.** Maya Allister's "Building a unified design system for a growing, high trust clinic" uses a "Getting tokens out of Figma" diagram that "explains the process at a glance". Ben Ullman's "Removing a decision users never needed to make" is cited as the wall of text example. Kim Jiang uses collapsible sections. VIEWED (text of the review, not the portfolios). [Uxcel](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)

### Inferences
- The two strongest exemplars (Linear, Stripe) share one move: each figure answers a single question and the prose names that question before the figure appears. That is the "never a visual without context" rule from the Uxcel review applied at publication quality.
- Growth.Design's device that transfers best to a portfolio is the persistent image with stepped annotation: one screen stays put while successive short lines point at parts of it. It reads like a comic without needing characters.
- Studio sites optimise for the first scan (screen plus outcome number) and often leave reasoning implicit. For a design leader's portfolio, the product team post pattern (Linear, Stripe) is a closer model than the studio pattern.

### Gaps
- Ueno, Instrument, Work & Co, Pentagram product work, Figma customer stories and Airbnb Design posts were not reached within the research budget. No claims are made about their devices.
- bestfolios, Case Study Club, Awwwards and siteinspire collections were not opened, so no individual senior portfolio exemplars from them are cited.
- Built for Mars teardown bodies are paywalled; their devices (the brief mentions step counts and competitor comparisons) are not verified here.

## Recurring patterns for showing a framework or system a designer created

### Takeaway
Systems are shown as the model first (a diagram of how the parts relate or a chart of the rule), then the model applied across many contexts in a grid, then one control varied to prove the system is generative. Single hero screens do not carry system work.

### Cited findings
- Model diagram before artifacts: Stripe explains perceptual versus HSL colour models with diagrams before showing the palette. VIEWED (text). [Stripe](https://stripe.com/blog/accessible-color-systems)
- Rule drawn as a chart: Stripe's lightness curves and "thread the needle" plot show the system's constraint as a shape. VIEWED (text). [Stripe](https://stripe.com/blog/accessible-color-systems)
- Same system, many contexts: Linear shows light and dark themes and list, board and split views together, plus macOS, Windows and browser mockups. VIEWED (text). [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- One parameter varied: Linear's contrast 30 versus 100 renders show what a system input does. VIEWED (text). [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- Tool as evidence of the system: both Stripe (colour tool screenshot) and Linear (internal toolbar with feature flag toggle, milestone chart) show the tooling that made the system operable. VIEWED (text). [Stripe](https://stripe.com/blog/accessible-color-systems); [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- Process diagram as a system summary: Maya Allister's "Getting tokens out of Figma" diagram is praised for explaining a pipeline at a glance. VIEWED (review text). [Uxcel](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)
- NN/g endorses "process diagrams" and workshop photos as legitimate portfolio evidence. VIEWED (text). [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)

### Inferences
- A workable sequence for a framework case study: (1) one diagram of the model, captioned with the single idea it encodes; (2) a grid of the model applied to real cases; (3) a variant or parameter strip showing it flex; (4) the tool or ritual that kept it running. Each step answers a question a scanning reviewer would ask in order: what is it, does it generalise, is it a system or a one off, did it survive contact with the team.
- Product team posts show systems at the visual layer (colour, layout). Examples of non visual systems (operating models, scheduling, strategy frameworks) drawn as diagrams in portfolios were not found; this is an open space rather than a solved pattern.

### Gaps
- No sourced exemplar found of a case study diagramming a service, operating or strategy framework (as opposed to a visual design system).

## Representing the competitive landscape and the problem space before the solution

### Takeaway
No verified portfolio exemplar of a 2x2 positioning map was found. Guidance on choosing axes exists in competitive analysis material, and teardown publishers represent the problem space through annotated competitor screens and scenarios rather than matrices.

### Cited findings
- A competitor teardown guide recommends axes that reveal a choice, such as simple versus complex or self serve versus sales led, and flags cheap versus expensive as too obvious to be insightful; the point of the map is to show gaps and overlaps. SECONDHAND (skill listing, not a design publication). [competitor teardown](https://www.claudepluginhub.com/skills/valentinbvro-pm-gtm-plugins-pm-gtm/competitor-teardown)
- Growth.Design opens with an everyday analogy scenario (a five star restaurant) before any product screen, then moves to the product example (a HubSpot import). The problem is staged as a felt situation first. VIEWED (text). [Growth.Design](https://growth.design/case-studies/labor-perception-bias)
- Stripe states the problem space as two common approaches and shows why each fails before presenting its own. VIEWED (text). [Stripe](https://stripe.com/blog/accessible-color-systems)
- Linear's Before screenshot functions as the problem statement, with the Concept and After that follow. VIEWED (text). [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- Uxcel names "cards with the main insights" and "a quote from a user interview" as acceptable visuals for research and problem sections. VIEWED (text). [Uxcel](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)

### Inferences
- In the viewed exemplars, the landscape is framed as "existing approaches and why each falls short" (Stripe) rather than a plotted quadrant. A 2x2 earns its place only when the axes encode the actual trade off the design resolves; a structure versus flexibility map would need the designer's position plotted with the reason it is empty space.
- Problem before solution is usually carried by one strong artifact (a before screen, a scenario, an insight card), not a research section.

### Gaps
- No sourced case study from the named studios or exemplar portfolios using a 2x2 was found. A targeted search of Behance, Case Study Club or bestfolios for "positioning" would be the next step.

## Showing rejected options and trade offs without a wall of text

### Takeaway
Reviewers explicitly want rejected options and the reason they lost. The strongest visual form found is a side by side where the rejected option is shown working on paper but failing in practice (Stripe), plus exploration boards and Before, Concept, After strips (Linear). Prose guidance compresses the reason to one sentence per rejected option.

### Cited findings
- NN/g: include "design concepts that were ultimately not pursued"; a hiring manager wants to know "what isn't in the design and why". VIEWED (text). [NN/g](https://www.nngroup.com/articles/ux-design-portfolios/)
- Monn: "Every significant design choice has an alternative you rejected." Suggests a "what I didn't do, and why" line per major choice with the pattern "I chose X over Y because Z constraint made Y impossible to validate at this stage." He does not recommend a visual form. VIEWED (text). [MentorCruise](https://mentorcruise.com/blog/how-to-write-a-ux-case-study-that-passes-the-hiring-managers-cold-read/)
- Stripe: rejected approach shown as side by side columns (the darker shift passed contrast checks but looked muddy). The trade off is visible in the image; text names the verdict. VIEWED (text). [Stripe](https://stripe.com/blog/accessible-color-systems)
- Linear: exploration boards show the spread of concepts; the Concept frame between Before and After shows the intermediate bet. Rejected navigation changes are mostly in prose. VIEWED (text). [Linear](https://linear.app/now/how-we-redesigned-the-linear-ui)
- Growth.Design: before and after delivered in sequence as video or GIF; at least one alternative is text only, showing even teardown publishers fall back to prose for alternatives. VIEWED (text). [Growth.Design](https://growth.design/case-studies/labor-perception-bias)
- Uxcel review: show only "the stages where you made a decision that moved you closer to the solution"; the review did not cover visualising rejected options. VIEWED (text). [Uxcel](https://uxcel.com/blog/ux-portfolio-review-red-flags-green-flags)
- UXfolio lists "explaining the process but not the decisions" and "treating your case study like a design gallery" as common mistakes. SECONDHAND. [UXfolio, case study mistakes](https://blog.uxfol.io/case-study-mistakes/)

### Inferences
- A compact form that combines the sourced pieces: a row of option thumbnails, the chosen one marked, each rejected one with a single "lost because" line in Monn's X over Y because Z shape. This puts NN/g's "what isn't in the design and why" on the scan layer.
- The Stripe move (show the rejected option meeting the formal requirement and still failing) is the most persuasive because the reader judges the trade off with their own eyes before reading the verdict.
- Even top exemplars leave some rejected options in prose, so prose for minor alternatives is normal; the visual treatment should go to the one or two rejections that define the decision.

### Gaps
- No sourced exemplar of a decision tree or option comparison grid in a published portfolio case study was found within the budget.
