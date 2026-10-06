# How the end of a long editorial page should work: UX, reading behavior and narrative principles

Scope: the final section of a long scrolling design case study. Evidence strength is marked on each finding as STRONG (peer reviewed, replicated or large sample primary data), MODERATE (credible practitioner research with a stated method) or WEAK (popular claim, secondary aggregator or craft opinion). Dates are given because web reading data ages.

## 1. Peak end rule and serial position / recency: what the evidence shows and whether it applies to reading a web page

### Takeaway
Both effects are real in the lab, but neither transfers cleanly to a scrolled case study. The peak end rule is about retrospective ratings of affective experiences (pain, pleasure), and recency in memory is a short term effect that disappears after about 15 to 30 seconds of distraction. The defensible application is modest: the last thing a reader does on the page colours their overall impression and is the most available thing in memory at the moment they decide what to do next, so the ending should be deliberate, not a trailing afterthought.

### Cited Findings
- STRONG. Redelmeier and Kahneman (1996): colonoscopy and lithotripsy patients' retrospective ratings of discomfort tracked the worst moment and the final moment, largely regardless of procedure length. ([Wikipedia summary with citations](https://en.wikipedia.org/wiki/Peak%E2%80%93end_rule); [Laws of UX](https://lawsofux.com/articles/2020/peak-end-rule/))
- STRONG. Kahneman et al. (1993) "When More Pain Is Preferred to Less: Adding a Better End" and a clinical replication by Redelmeier, Katz and Kahneman (2003) showed that adding a milder ending softened the remembered experience. ([Yu-kai Chou summary, secondary](https://yukaichou.com/behavioral-analysis/peak-end-rule-kahneman-experience-design/))
- STRONG with a caveat. Alaybek et al. (2022) meta-analysis in Organizational Behavior and Human Decision Processes, 174 independent samples: peak end effects are supported across contexts, but the average of the whole experience predicted overall evaluations about as well as the peak end score. A 2024 corrigendum exists. ([Semantic Scholar record](https://www.semanticscholar.org/paper/All%E2%80%99s-well-that-ends-(and-peaks)-well-A-of-the-rule-Alaybek-Dalal/b3d5a40cd30e51cc709b942b759e0ca4a9d0979b); [colab.ws record](https://colab.ws/articles/10.1016/j.obhdp.2022.104149)) Note: abstract could not be fetched directly (403); detail comes from search snippets.
- MODERATE. The rule has been tested for pleasurable experiences too (Do, Rupert and Wolford 2008, Psychonomic Bulletin and Review) and boundary conditions have been published for multi episode events (Wharton manuscript). ([Springer PDF](https://link.springer.com/content/pdf/10.3758/PBR.15.1.96.pdf); [Wharton boundary condition paper](https://marketing.wharton.upenn.edu/wp-content/uploads/2016/10/evaluating_multi_episode_events_manuscript_emotion.pdf))
- MODERATE. Scharbert et al. (2025, European Journal of Personality) tested the rule for retrospective judgments of wellbeing in everyday life, a sign the field is still probing how far it generalizes outside the lab. ([SAGE abstract](https://journals.sagepub.com/doi/abs/10.1177/08902070241235969))
- STRONG. Murdock (1962): free recall of word lists (10 to 40 words) shows primacy and recency; recency spanned roughly the last 8 positions. ([Cognitive Psychology reference](https://www.cognitivepsychology.com/Serial_Position_Effect); [Simply Psychology](https://www.simplypsychology.org/primacy-recency.html))
- STRONG. Glanzer and Cunitz (1966): 15 to 30 seconds of a distractor task before recall almost eliminates recency while primacy remains. ([Simply Psychology](https://www.simplypsychology.org/primacy-recency.html)) A "long term recency" effect under continuous distractor conditions has also been reported. ([Springer, Memory and Cognition](https://link.springer.com/article/10.3758/BF03197094))
- WEAK. UX popularizations (Laws of UX, Decision Lab, LogRocket, CareerFoundry) turn both effects into "make the ending memorable" or "put key items first and last" without web specific evidence. ([Laws of UX](https://lawsofux.com/articles/2020/peak-end-rule/); [Decision Lab](https://thedecisionlab.com/biases/serial-position-effect); [LogRocket](https://blog.logrocket.com/ux-design/serial-position-effect-ux-design/))

### Inferences
- Peak end is about feelings, not information recall. For a case study the transferable idea is that a reader's overall judgment of the work is disproportionately shaped by its strongest moment and its last moment. The meta-analysis caveat means the middle still counts: a great ending cannot rescue a weak body.
- Recency is about word lists recalled seconds later. It does not justify loading the ending with a list of takeaways on the theory they will be remembered. It does support that whatever sits at the end is what is in mind at the moment of the next decision (email, next case study, close tab).
- Apply: make the final section one clear, high moment (the outcome or the single insight the whole study builds to), and make the last beat a clean handoff. Avoid: ending on a limitation, an acknowledgements list, process debris or a trailing grid of leftover artifacts, because the last beat is the one weighted most.
- Avoid overclaiming. Citing "the peak end rule" as a reason for a design choice in a portfolio is fine as framing, but it is not web evidence.

### Gaps
- I found no study testing the peak end rule on reading a web article or a portfolio page.
- I found no web eyetracking or memory study showing recency for the final section of a scrolled page.

## 2. How people read long pages: scroll depth, attention drop off, F pattern and layer cake. What share reach the end?

### Takeaway
Attention falls steeply with depth and most readers never reach the bottom of a long page. The best primary numbers: NN/g 2018 eyetracking found 57% of viewing time above the fold and 81% in the first three screenfuls; Chartbeat data on Slate (2013) found most readers stopped around the 50% mark. The people who do reach the end of a case study are a small, self selected, highly engaged group, so the ending should serve them, while the top of the page must carry the story for everyone else.

### Cited Findings
- STRONG (large eyetracking sample). NN/g, "Scrolling and Attention," April 15 2018, 120 participants, 130,000+ fixations: 57% of viewing time above the fold (down from 80% in 2010), 74% in the first two screenfuls, 81% in the first three; 42% of viewing time in the top 20% of a page. Remaining time is spread in a long tail. The 100px just above the fold got 102% more viewing than the 100px just below. ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/))
- STRONG for its sample, dated. Chartbeat data reported by Farhad Manjoo in Slate, June 6 2013: 38% of visitors left without engaging; most readers scrolled to about the 50% mark (around the 1,000th pixel); only 25% got past the 1,600th pixel. Scroll depth had little relationship to sharing. ([Slate](https://slate.com/technology/2013/06/how-people-read-online-why-you-wont-finish-this-article.html))
- WEAK (secondary, unverified range). A 2026 benchmark roundup cites Chartbeat data as a 25 to 35% finish rate for news articles and 55% of pageviews getting under 15 seconds of active attention. I could not trace these to a dated Chartbeat primary. ([Bigdelta](https://bigdelta.com/blog/scroll-depth-benchmarks); [Slate follow up](https://slate.com/technology/2013/06/how-people-read-online-you-might-finish-this-article.html))
- MODERATE. Medium Data Lab, "The Optimal Post is 7 Minutes" (2013): 7 minute posts (about 1,600 words) captured the most total reading time. The metric is total seconds, not completion. ([Medium](https://medium.com/data-lab/the-optimal-post-is-7-minutes-74b9f41509b)) Read ratio by length figures that circulate (82% at 3 minutes falling to 40% past 10 minutes) come from secondary blogs and could not be verified against Medium's source (fetch returned 403). ([Buffer summary](https://buffer.com/resources/the-ideal-length-of-everything-online-according-to-science/))
- MODERATE. Chartbeat case study: Neue Zürcher Zeitung used scroll depth to find drop off points and tested subheadings versus plain text versus bullets; subheadings won and engaged time rose nearly 20%. ([Chartbeat](https://chartbeat.com/resources/customer/content-scroll-depth-use-case/))
- STRONG. NN/g, "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile)," November 2017: F pattern persists on desktop and mobile when text lacks structure. ([NN/g](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/))
- STRONG. NN/g "Text Scanning Patterns: Eyetracking Evidence": four patterns (F, spotted, layer cake, commitment). Layer cake is reading headings and subheadings and skipping body text; it is the efficient pattern that good headings enable. ([NN/g](https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/))
- WEAK (practitioner claims, no method). Portfolio reviewers reportedly spend 90 seconds to 5 minutes on a portfolio and scan case studies non linearly. ([uxfol.io](https://blog.uxfol.io/ux-case-study-structure/); [uxdesign.cc](https://uxdesign.cc/only-30-seconds-to-reject-your-portfolio-8cb14ac70674)) NN/g has video guidance on what hiring managers look for. ([NN/g video](https://www.nngroup.com/videos/ux-portfolios-hiring/))

### Inferences
- For a long case study, expect a minority of visitors (plausibly a quarter or fewer, by the Slate and NN/g numbers) to reach the final section. That is not a reason to neglect it: those readers are the ones deciding whether to reach out.
- The ending cannot be the only place the outcome lives. Put the outcome at the top too; the ending should restate it with more earned weight, not reveal it for the first time.
- Readers who reach the end are often scanning in layer cake mode. The final section should read correctly from its heading and first line alone.
- Avoid: an ending that depends on having read every section (unexplained callbacks, acronyms defined 4,000 pixels earlier).

### Gaps
- No primary, public data on scroll depth specifically for design portfolio case studies.
- Chartbeat completion rates for recent years (2020s) could not be traced to a primary source.

## 3. Closure in narrative and editorial design: how features and longform end

### Takeaway
Journalism craft guidance converges on a small set of endings: circle back to the opening (bookend), end on a strong quote or scene, tie threads together, or look forward. It is equally consistent on what to avoid: summary conclusions that rehash, over explaining what the story means and lingering past the natural end. This is craft opinion from practitioners, not empirical research, but it is consistent across sources and decades.

### Cited Findings
- WEAK/MODERATE (craft authority). Poynter, Vicki Krueger reporting Leonard Pitts' advice, December 1 2016: three endings, a twist, a quote or a return to the beginning; the ending is what leaves the impression. ([Poynter](https://www.poynter.org/educators-students/2016/want-a-strong-ending-to-your-story-here-are-3-tips/))
- WEAK/MODERATE. Poynter recommends planting the kicker high and circling back to it; a good ending can return to an important place or reintroduce a key character. ([Poynter 2024](https://www.poynter.org/reporting-editing/2024/how-to-write-an-ending/))
- WEAK/MODERATE. The Open Notebook, Robin Meadows, November 24 2015: circle back, tie everything together, make it personal. Quotes Michelle Nijhuis (Science Writers' Handbook) that endings are "often what readers remember most." ([The Open Notebook](https://www.theopennotebook.com/2015/11/24/good-endings-how-to-write-a-kicker-your-editor-and-your-readers-will-love/))
- WEAK/MODERATE. Nieman Storyboard, January 16 2026, Susan Orlean's advice: avoid summary conclusions, do not force closure or explain what the story means, stop rather than trail off, leave meaning to the reader. ([Nieman Storyboard](https://niemanstoryboard.org/2026/01/16/how-to-end-a-story/))
- WEAK/MODERATE. Nieman Storyboard pieces on endings (2023 and "The sense of an ending") describe narratives that come full circle and endings that satisfy while leaving readers wanting more. ([Nieman Storyboard 2023](https://niemanstoryboard.org/2023/05/19/narrative-writing-story-structure-endings/); [The sense of an ending](https://niemanstoryboard.org/stories/the-sense-of-an-ending/))

### Inferences
- Case studies conventionally end with "Outcomes / Learnings / Next steps" sections. The craft sources argue against the rehash version of that: a bulleted summary of what the reader just read is the "summary conclusion" editors cut.
- A bookend fits a case study well: return to the opening problem, person or image and show what changed. This gives closure without summarizing.
- One closing line should carry the meaning; do not add a paragraph explaining it.
- Avoid: a "What I learned" list of five generic lessons, restating the TL;DR, ending on a hedge or a future roadmap that makes the work feel unfinished, or several competing final beats.
- Tension to resolve: Orlean's "let the reader decide the meaning" suits literary features. A hiring reader needs the claim made explicitly somewhere. Resolution: state the claim once, early and in the outcome, and let the final line be the concrete image rather than a second explanation.

### Gaps
- No empirical study found on which ending type readers prefer or remember in web longform.
- Editorial design book sources (magazine layout of end pages, end marks) were not reached within this search budget.

## 4. Information scent and next actions at the end of a page

### Takeaway
NN/g guidance is direct: do not dead end readers. End articles with related content and or a strong call to action, keep the scan path from the last line to those links clear, and do not let whitespace or nonessential elements create a false bottom. Footers are a legitimate second chance destination that users scroll to on purpose, including for contact details.

### Cited Findings
- MODERATE (practitioner research with eyetracking examples). NN/g, Hoa Loranger, "Related Content Boosts Pageviews, When Done Right," October 5 2014: always offer related content and or strong calls to action at the end of articles; suggests roughly 5 to 7 related links; avoid blocking related links with nonessential elements or excessive whitespace, which signal a false page end; readers often do not look beyond the article when links are not immediately available; related links should not look like ads (banner blindness); use descriptive, front loaded labels. ([NN/g](https://www.nngroup.com/articles/related-content-pageviews/))
- MODERATE. NN/g, Therese Fessenden, "Web Page Footers 101," February 24 2019: users scroll to footers as a second chance after not finding what they wanted, and intentionally for expected content such as contact information; "If everything is important, nothing is important"; avoid vague labels, clutter and deep hierarchy. ([NN/g](https://www.nngroup.com/articles/footers/))
- MODERATE. NN/g, "A Link is a Promise": link labels must accurately predict the destination. ([NN/g](https://www.nngroup.com/articles/link-promise/))
- STRONG. NN/g 2018 scrolling study (above): the "illusion of completeness" means large gaps or visual full stops make users think the page has ended. ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/))

### Inferences
- A case study should end with one or two next steps with strong scent: the next case study (named, with its one line claim) and a way to contact. 5 to 7 links is news site guidance; a portfolio has only three case studies, so the relevant parts are "do not dead end" and "clear scan path," not the count.
- The next case study link is the highest value action for an engaged reader. It should follow the closing line directly, without a large decorative gap that reads as the page's end.
- The footer can carry contact and the global navigation; do not duplicate a heavy contact block inside the ending and again in the footer.
- Avoid: ending on a closing line followed by a large empty space then a generic footer; "Back to top" as the only action; vague labels like "More work" when the destination has a name.

### Gaps
- No NN/g study specific to portfolio case study endings or "next project" patterns.

## 5. Consistency and affordance: static elements styled like interactive ones

### Takeaway
Strong evidence that weak signifiers cost users time and confidence, and consistent NN/g guidance that non clickable things must not look clickable. On a case study ending, list items or cards that share styling with clickable cards elsewhere on the page will be read as links. Either make them clickable or make them visibly different.

### Cited Findings
- STRONG (controlled eyetracking, significant results). NN/g, Kate Moran, "Flat UI Elements Attract Less Attention and Cause Uncertainty," September 3 2017: 71 users, 9 page pairs; weak signifier versions took 22% more time and 25% more fixations (p < 0.05). Key insight: even when users see a weak element they do not feel confident it is what they want. Flat styling does less harm with low density, traditional layout and high contrast targets. ([NN/g](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)) NN/g also responded to criticism that the study was about weak signifiers rather than flat design as such. ([NN/g response](https://www.nngroup.com/articles/response-criticisms-flat-design/))
- MODERATE. NN/g, "Long-Term Exposure to Flat Design": weak signifiers condition users to hover and click uncertainly, reducing efficiency over time. ([NN/g](https://www.nngroup.com/articles/flat-design-long-exposure/))
- MODERATE. NN/g, Hoa Loranger, "Beyond Blue Links: Making Clickable Elements Recognizable," March 8 2015: do not make non clickable items look like buttons (for example, headings with a background colour); apply the same link treatment consistently across the site; users should not have to scrub the screen to find what is clickable. ([NN/g](https://www.nngroup.com/articles/clickable-elements/))

### Inferences
- Consistency cuts both ways: if the page uses bordered cards for navigation (next case study, homepage work cards), then bordered cards in the ending holding static outcomes or learnings will be read as links. Clicking a dead card at the ending, the moment the peak end logic says counts most, is a small failure at the worst place.
- Apply: give static summary items (metrics, learnings) a typographic treatment with no container, hover state or arrow, and reserve the card plus arrow treatment for the actual next step.
- Avoid: arrow glyphs, chevrons, hover lift or underlines on non links; card grids of outcomes that visually match the "next case study" card.

### Gaps
- No study specific to static cards versus link cards on editorial pages; the guidance is general clickability research.

## 6. Cognitive load at the end: how much should an ending hold?

### Takeaway
The modern working memory estimate is about four chunks (Cowan 2001), not seven. Combined with steep attention decay at depth and editorial advice against summaries, the ending should hold very little: one closing idea, at most a handful of outcomes, one or two actions.

### Cited Findings
- STRONG. Cowan (2001), Behavioral and Brain Sciences target article: capacity of the focus of attention averages about four chunks in adults; Miller's seven (1956) was a rough estimate and rhetorical device. Debate continues, with some estimates closer to seven depending on what is counted. ([ResearchGate](https://www.researchgate.net/publication/11830840_The_magical_number_4_in_short-term_memory_A_reconsideration_of_mental_storage_capacity); [Cowan 2010, Current Directions](https://journals.sagepub.com/doi/abs/10.1177/0963721409359277); [Journal of Cognition 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11259112/))
- MODERATE. NN/g footers guidance: "If everything is important, nothing is important." ([NN/g](https://www.nngroup.com/articles/footers/))
- MODERATE. NN/g recommends 5 to 7 related links as enough without overwhelming (news context). ([NN/g](https://www.nngroup.com/articles/related-content-pageviews/))
- MODERATE. Chartbeat NZZ test: subheadings (chunked structure) raised engaged time nearly 20% over plain text and bullets. ([Chartbeat](https://chartbeat.com/resources/customer/content-scroll-depth-use-case/))

### Inferences
- Working memory limits are about items held simultaneously, so the rule of thumb is soft. Still, an ending with three to four outcomes, one closing line and one or two actions stays inside it; an ending with eight learnings, a metrics grid, testimonials, a contact form and a related grid does not.
- Chunk the ending into clearly separate roles: resolution (the outcome or closing line) then handoff (next step). Mixing them makes the reader sort them out.
- Avoid: introducing new information in the ending (new metrics, new stakeholders, new problems); a long "next steps for the product" list, which reads as unfinished work.

### Gaps
- No study on optimal ending length for editorial or portfolio pages; the recommendation is an inference from working memory and attention data.
