# Hiring signals for a design system case study at senior, staff and lead level (update, 23 Oct 2026)

Research run 23 Oct 2026. This file adds to four earlier notes and does not repeat them: R5 (2 Oct, `mondai/design-system-ai/research/R5-hiring-managers.md`), hiring-signals (19 Oct, `research_notes/Design system case study readiness/hiring-signals.md`), "What gets designers interviewed" and "Case study results without metrics". Each finding says whether it confirms, conflicts with or updates them.

Sample and method:
- 17 page fetches attempted. 11 opened with usable content. 2 opened but paywalled after the intro (Into Design Systems, Lenny's Newsletter), so only their visible text is used. 4 failed: two Replit and Highlight TA job posts on designproject.io (HTTP 410, taken down), a scribe.rip mirror of the Into Design Systems Medium post (404) and a jobleads.com mirror of a "Founding Product Designer, AI Design Systems" post (403).
- 13 web searches. The tool budget ran past 15 calls (about 30 in total) because design system specific hiring material is scarce and several leads failed.
- The fetch tool returns an extracted summary of each page, not raw HTML. Lines in quotes below are the lines that summary returned as verbatim; locations are given by section heading where the page had one.
- Secondhand quotes (a named person quoted inside someone else's article) are marked as such. Anything seen only in a search snippet is under Gaps, never under findings.
- Source dates: last six months (since 23 Apr 2026) unless marked OLDER.

## 1. What do named hiring voices say about design system case studies specifically, and what makes them forgettable?

### Takeaway
Still almost nothing from a named hiring manager about design system case studies as such. The one specialist voice (Justine Montgomery, ex Stripe design systems) is paywalled for the second time. What is new is employer evidence: a 2026 design system role (Careem) now defines the job as making the system work for AI agents as well as people, with AI assisted audits and adoption as named duties. That shifts what a memorable design system case study has to prove: not a library, but a system other people and agents actually build on, with proof it is used.

### Cited Findings
- NEW, employer: Careem's Senior Product Designer (Design Systems) post (Dubai, undated, listed on the Into Design Systems job board, summarised by the board as a "Design System Lead" role) lists: "Structure tokens and components for agentic design-to-code and prompt-to-design workflows to produce on-system output"; "Build and maintain Code Connect mappings, MCP integrations, and structured component metadata"; "Implement AI-assisted audits and linting to catch off-system usage and token misuse before shipping". Responsibilities section. [Careem via Into Design Systems jobs](https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7)
- Same post, requirements: "Demonstrated experience building real workflows with LLMs and agentic tools" and "Ability to distinguish semantic intent from value coincidence and manage complexity through unification". Scope line: "The role emphasizes serving designers, engineers, and AI agents that consume and generate design." Requirements and scope sections. [Careem](https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7). UPDATES R5, whose AI job evidence (Figma, Anthropic) asked only for "using AI tools"; this post asks for governing agent output against a system.
- NEW, practitioner on proof of a system: Sujeet Jaiswal (Principal Software Engineer, 3 Feb 2026, updated 21 Apr 2026): "Adoption is the only metric that matters at the program level." and "A beautiful system with 12% adoption has failed; an ugly one with 90% adoption is succeeding." Measurement section. [Sujeet Jaiswal](https://sujeet.pro/articles/design-system-adoption-foundations). Engineering view, not a hiring voice, but it is the yardstick an engineering panelist would bring.
- Jaiswal defines measurable proxies: usage ("Count of system component instances per repository per release"), coverage ("Share of total UI surface ... implemented with system components"), detachment ("Share of design instances detached from the source library in Figma", to be treated "as signal, not failure") and token purity ("Share of style declarations referencing semantic tokens versus literal values"). Also: "Manual audits decay." and "Aggregate metrics hide the team that is dragging the average." [Sujeet Jaiswal](https://sujeet.pro/articles/design-system-adoption-foundations)
- Into Design Systems has a second Montgomery related post, "How to build a Design System portfolio that gets you hired" (22 May 2025, OLDER), subtitle "What it really takes to land a Design Systems role", with a talk titled "Design System Portfolio Tips & Tricks". The advice is behind the paywall; nothing else is readable. [Into Design Systems](https://intodesignsystems.substack.com/p/how-to-build-a-design-system-portfolio). CONFIRMS the 19 Oct note: the specialist source remains unverifiable.
- Montgomery now runs a Maven workshop on showing AI skills in a portfolio (next cohort 3 Dec 2026), described as former Stripe and Preply product designer "with 10 years of experience in product design and design systems". Her line: "How you communicate your thinking, decisions and impact matters just as much and sometimes more." The page gives no design system guidance. [Maven, Justine Montgomery](https://maven.com/justine-montgomery/ai-skills-portfolio)
- Generic failure pattern, applies to galleries: Balint Bogdan (31 Jul 2026) on the strongest portfolios: "Their portfolios feel less like galleries and more like arguments." [The portfolio question, Balint Bogdan](https://balintbogdan.substack.com/p/the-portfolio-question)
- "We" language, confirmed by a named reviewer: Tom Scott, "Stop talking about "we" and focus on "I"." and "Make it clear what YOU did, and not just the team." Ownership section. 15 Jul 2025, OLDER. [Mistakes designers make in interviews, Tom Scott](https://verifiedinsider.substack.com/p/mistakes-designers-make-in-interviews). CONFIRMS R5 (Latin, "overuse of we"; Scott red flag 7).
- Process recital, confirmed: Tom Scott, "Too many sticky notes. Not enough outcomes." and text heavy, Notion style case studies discouraged in favour of visuals. Same post, OLDER. [Tom Scott](https://verifiedinsider.substack.com/p/mistakes-designers-make-in-interviews)
- Adoption claims without proof: Learnist's 2 Jun 2026 list of red flags in AI case studies (written for AI and data science portfolios, not designers) calls "deployed to production" "the most commonly inflated claim in AI portfolios" and asks for evidence such as monitoring data; and warns that a relative gain with no baseline is meaningless ("40% better" than what?). Sole credit on team work "collapses under interview questioning." [Learnist, 12 red flags in AI case studies](https://www.learnist.org/ai-case-study-red-flags-portfolio-2026/). Transferable to "adopted by every team" claims; vendor style content site.

### Inferences
- The Careem duties read almost like a description of agent hooks, checks and audits catching off-system output. A case study that shows an AI assisted audit catching token misuse before it shipped answers a 2026 job description line for line. This is the most concrete new hook found.
- The forgettable design system case study, assembled from these sources: a gallery of components (Bogdan "galleries"), told as "we" (Scott), walked through as process (Scott), ending on an adoption claim with no baseline or count (Learnist, Jaiswal). The memorable one inverts each: an argument, owned by "I", decision first, with a counted adoption or audit signal.
- Jaiswal's detachment metric is a ready made honest story: a component detached often is "the system telling you the component does not fit", so showing one fixed because of it is both a metric and a decision.

### Gaps
- Still no named design hiring manager quoted, on an opened page, about design system case studies specifically. Searches returned generic advice, vendor blogs or job posts.
- Snippet only, not opened: a design systems hiring guide said one deep component case study can be enough (what you built, how, what you learned, where you failed). Source appeared to be the paywalled Into Design Systems post.
- Snippet only: zeroheight 2026 report figures (83% of organisations with a dedicated design system team, about 7% reporting complete adoption, executive funding satisfaction 32% in 2026 vs 42% in 2025, 147 practitioners). Seen via secondary blogs; primary report not opened. Do not cite.
- Two staff design system job posts (Replit, Highlight TA) had been removed (410) before they could be read; their search summaries (two case studies on enterprise design systems, governance and adoption) are not used.
- No opened source names token tables as a failure. Still inferred, as in R5.

## 2. What makes a lead or staff case study different from a senior one?

### Takeaway
Little new primary material. The new signals: a Design Lead reviewer asking whether products are live, traceable and scaling; Tom Scott saying hands-on leaders are in demand and "sideways middle management" is not; and Bogdan saying senior hiring is where the shift to reasoning, AI judgment and business linkage is most visible. Combined with R5's GitLab ladder (senior adds to a system, staff decides what becomes a platform capability), the difference remains scope of decisions plus proof the system runs beyond the author.

### Cited Findings
- Harry Enaholo, reviewing 150+ portfolios for a Design Lead role (LinkedIn, Mar 2026, SECONDHAND via Jeff Humble): "are these products live and traceable, and if they are live, are they scaling?" He reported only about 20% of 250+ applicants matched the role's criteria. [The Fountain Institute, Jeff Humble](https://www.thefountaininstitute.com/blog/senior-product-designers-hired). NEW relative to R5, which cited this article only for Budi Tanrim and the removal list.
- Tom Scott: "Side ways middle management is not in-demand right now." and "You can identify the level of person instantly from panel performance". Seniority section. OLDER (Jul 2025). [Tom Scott](https://verifiedinsider.substack.com/p/mistakes-designers-make-in-interviews)
- Balint Bogdan (31 Jul 2026): senior hiring is where the shift is most visible; managers look for how candidates frame complex problems, use AI "without giving up judgment" and link design choices to business outcomes. Section on senior and lead hiring. He quotes Jenny Wen (design lead at Anthropic, SECONDHAND): "taste without accountability is decoration. Taste with accountability is leadership." [Balint Bogdan](https://balintbogdan.substack.com/p/the-portfolio-question)
- Careem's role summary separates a "Lead" title from the duties, which describe a hands-on IC (owning the lifecycle of tokens, components and patterns "from inception through shipping"). [Careem](https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7)
- Jenny Wen's Lenny's Podcast episode (1 Mar 2026) lists "The three archetypes Jenny is hiring for now" and "Why the classic discovery → mock → iterate design process is becoming obsolete" as topics; her actual words are paywalled. [Lenny's Newsletter](https://www.lennysnewsletter.com/p/the-design-process-is-dead)

### Inferences
- For a Design Lead at a startup, Enaholo's "live, traceable, scaling" test is the lead bar: the case study should point at the system running in shipped screens and show it holding as more pages and contributors (human or agent) arrive.
- Wen's "taste with accountability" line (secondhand) fits a framing where the lead owns the rules and the vetoes that agents work to; accountability is the leadership signal, not volume of output.
- Scott's "hands-on" point argues against a lead case study that is only operating model diagrams; it needs the lead's own craft visible too.

### Gaps
- Wen's three hiring archetypes and any portfolio advice are paywalled; secondary summaries were seen only in snippets and are not used.
- No 2026 career ladder (Figma, Atlassian, Shopify, Linear, Stripe) was opened in this pass; GitLab in R5 is still the only ladder.
- Nathan Curtis and Brad Frost: searches found no 2025 to 2026 material from either on design system careers or portfolios.

## 3. How are AI workflows in portfolios judged now, and is there skepticism?

### Takeaway
UPDATES R5's main gap. There is now named or quoted skepticism, but aimed at AI made sameness rather than at AI use. Reviewers expect AI in the work (Scott, Figma 73%) and distrust portfolios whose AI shows as generic polish. Proof of genuine practice, across sources: show the human judgment calls, the places the AI failed, the dead ends and hard to generate artefacts such as a recorded working session. No opened source describes reviewers penalising a portfolio for being too AI heavy as such.

### Cited Findings
- Aneta Kmiecik, design hiring partner (LinkedIn, May or June 2026, SECONDHAND via Jeff Humble): "When every portfolio looks the same after using AI, the AI becomes a sign of sameness rather than capability." and "Everything is produced, generated, and based on average data." [The Fountain Institute](https://www.thefountaininstitute.com/blog/senior-product-designers-hired)
- Balint Bogdan (31 Jul 2026): "Candidates use AI to build portfolios. Reviewers use AI to scan them." and "The signal is collapsing." His remedy: open on the hardest question, include dead ends, fewer projects in more depth, add hard to generate artefacts such as recorded walkthroughs. Closing: those whose portfolios "feel impossible to replicate with AI won't win by adding more polish". [Balint Bogdan](https://balintbogdan.substack.com/p/the-portfolio-question). He also states 78% of recruiters use AI assisted screening with no traceable source; do not cite that figure.
- Nikki Kipple (product designer, page updated Oct 2026): "Generative tools make defaults easier to produce." and a caution to reviewers: "Do not guess authorship from style." Section "How we got here". [The Crit](https://thecrit.co/resources/why-every-portfolio-looks-the-same)
- ADPList newsletter "30 Design Ideas for 2026" (SECONDHAND via Humble): "Record a 5-minute Loom of you working with AI." [The Fountain Institute](https://www.thefountaininstitute.com/blog/senior-product-designers-hired)
- Tom Scott (2025, OLDER): "I am looking for signals this person is all in on AI, uses AI tools in their work", suggesting AI native side projects, articles or talks. [Tom Scott](https://verifiedinsider.substack.com/p/mistakes-designers-make-in-interviews). CONFIRMS R5 red flag 3.
- Tommy Geoco (UX Tools, 27 Feb 2026) reports Wealthsimple's "AI Builders" programme "lets you submit an AI system instead of a traditional portfolio" (citing a LinkedIn post), and argues for "proof-of-work objects you can touch, break, and explore - not case studies." He cites Figma's 2026 hiring study: 73% say "AI tool proficiency is increasingly required" and visual craft "still tops evaluation criteria at 58%". Sponsored newsletter; author runs a hiring consultancy. [UX Tools, The portfolio is becoming a playground](https://uxtools.beehiiv.com/p/the-portfolio-is-becoming-a-playground). The 73% CONFIRMS R5 (from Figma's own Feb 2026 post); the 58% craft figure is NEW but secondhand.
- Felix Lee and Avani, ADPList (12 Aug 2025, OLDER): "One of the biggest mistakes designers make in AI portfolios is showing only the polished end state." and "Overpromising kills trust faster than bad design." They want screens showing how AI mistakes were handled. [ADPList, Portfolio checklist for AI-first designers](https://adplist.substack.com/p/how-to-get-your-portfolio-ready-for). Written about designing AI products, not AI in the designer's workflow.
- Learnist (2 Jun 2026, AI and data portfolios): "Real AI projects involve failed experiments." A case study showing only the winning approach "looks curated". [Learnist](https://www.learnist.org/ai-case-study-red-flags-portfolio-2026/)
- Careem asks for "Demonstrated experience building real workflows with LLMs and agentic tools", i.e. built workflows, not tool use. [Careem](https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7)
- Montgomery: AI fluency can be shown "from experiments, prototypes, and workflows"; you do not need an AI product. [Maven](https://maven.com/justine-montgomery/ai-skills-portfolio)

### Inferences
- Hype versus genuine, as the sources draw it: hype is AI shown as polish, speed claims and a clean final state; genuine is AI shown with its failures caught, the human call at each fork and an artefact a reviewer can inspect (a recording, a live system, a log). This matches and sharpens the 19 Oct note's Lovart and Learnist findings.
- The "AI did the work" risk is real but indirect: reviewers fear sameness and missing judgment more than AI use itself. A case study about governing agents is unusually well placed, because its subject is the judgment layer. It still must not read as generated: own voice, specific decisions, no template headings.
- Geoco's "playground" and Wealthsimple's AI system submission suggest an inspectable artefact (a short screen recording of an agent building a page and a check rejecting it) can do more than prose.

### Gaps
- No named hiring manager on an opened page describes rejecting a portfolio for being AI heavy, or the "AI did the work" concern in those words; Lovart's anecdote (19 Oct note) is still the closest and it is vendor content.
- Snippet only: a forum reviewer's tally of 127 portfolios for two senior roles, 70 to 80 using AI for case study writing, about 15 reworked into their own voice. Not opened; do not cite.
- Snippet only: Dylan Field on the All-In podcast (19 Oct) saying people who let AI think for them produce generic work. Seen via an AOL finance article snippet; not opened.
- Snippet only: Maven page snippet said 72% of 206 product design job descriptions required AI skills; the opened page did not contain it.
- Presentum's 16 leader, 55 second study (cited by Geoco) could not be found; treat as unverified.
- The Luma event "What It Takes to Be an AI Designer: A Hiring Manager's Perspective" (Alex Potrivaev, Director of Product Design at HubSpot; Lena Kul, ex design recruiter; 6 Aug 2026) was opened but lists no criteria. [Luma](https://luma.com/ctmoop83)

## 4. Measured outcomes versus reasoning when metrics are thin, and which format moves work

### Takeaway
Consistent with the earlier "Case study results without metrics" report: reasoning and honest status beat invented numbers, and any number needs a baseline. New: design system work has its own honest, countable proxies (coverage, detachment, token purity, audit catches) that a small system can report without inflating. Format moves named as working in 2026: open on the hardest question or most interesting part, one consequential turn, fewer projects in more depth, dead ends shown, an inspectable artefact. Scan time estimates now conflict widely.

### Cited Findings
- Kipple (Oct 2026): lead with the most interesting part of the project, show one consequential turn, quantify where possible, reflect on what you would do differently; "Visual novelty" cannot replace clear ownership, convincing evidence and honest outcomes. Sections "What actually differentiates" and "The real differentiator". [The Crit](https://thecrit.co/resources/why-every-portfolio-looks-the-same)
- Bogdan (Jul 2026): open each case study with the hardest question the project faced; "A portfolio is not a retrospective of your career. It's proof of how you think today." and "The portfolio gets you into the conversation." [Balint Bogdan](https://balintbogdan.substack.com/p/the-portfolio-question)
- Tom Scott (2025, OLDER): "Lead with the most compelling visuals, your portfolio is about getting an interview" and avoid work 5+ years old unless groundbreaking. [Tom Scott](https://verifiedinsider.substack.com/p/mistakes-designers-make-in-interviews)
- Jaiswal: headline ROI figures can come from very different inputs, so showing assumptions matters more than precision; "Survey benchmarks are directional, not guaranteed." [Sujeet Jaiswal](https://sujeet.pro/articles/design-system-adoption-foundations)
- Learnist: state the starting metric and evaluation method for any improvement claim. [Learnist](https://www.learnist.org/ai-case-study-red-flags-portfolio-2026/)
- Scan time, conflicting: Bogdan says six to eight seconds for an initial scan [Balint Bogdan](https://balintbogdan.substack.com/p/the-portfolio-question); Geoco reports a 55 second average decision across 16 design leaders (Presentum, unverified) [UX Tools](https://uxtools.beehiiv.com/p/the-portfolio-is-becoming-a-playground); earlier notes had Latin's 30 seconds and Backes' 10 to 30 second scan then 2 to 3 minutes. None is a rigorous measure.

### Inferences
- When metrics are thin, a design system case study can still count honestly: pages built on the system, one off styles before and after an audit, checks that caught off-system output, a component reworked because it was being detached. Each is a count with a baseline, not a projection.
- First screen: the hardest question plus one inspectable image or short recording of the system working (agent builds, check rejects, lead decides). That serves a 6 to 55 second scan and answers the AI sameness worry at once.
- Failure stories now do double duty: they answer the trade-off question (R5) and are the main proof that AI use was genuine (Learnist, ADPList, Bogdan).

### Gaps
- No opened source tested before and after visuals for design systems specifically.
- No source gave a recommended length beyond Latin's ten minute ceiling (R5).
- No opened source compared reviewer reactions to reasoning only versus metric led design system case studies.

## Sources opened (13 with readable content, including 2 paywalled intros)
1. https://uxtools.beehiiv.com/p/the-portfolio-is-becoming-a-playground
2. https://balintbogdan.substack.com/p/the-portfolio-question
3. https://verifiedinsider.substack.com/p/mistakes-designers-make-in-interviews
4. https://thecrit.co/resources/why-every-portfolio-looks-the-same
5. https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7
6. https://www.thefountaininstitute.com/blog/senior-product-designers-hired
7. https://www.learnist.org/ai-case-study-red-flags-portfolio-2026/
8. https://maven.com/justine-montgomery/ai-skills-portfolio
9. https://adplist.substack.com/p/how-to-get-your-portfolio-ready-for
10. https://luma.com/ctmoop83
11. https://sujeet.pro/articles/design-system-adoption-foundations
12. https://intodesignsystems.substack.com/p/how-to-build-a-design-system-portfolio (paywalled)
13. https://www.lennysnewsletter.com/p/the-design-process-is-dead (paywalled)

Failed (4): designproject.io Replit and Highlight TA staff design system posts (410), scribe.rip mirror of the Into Design Systems Medium post (404), jobleads.com AI design systems post (403).
