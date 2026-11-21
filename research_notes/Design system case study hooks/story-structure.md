# Story structure for a case study whose novel element is AI agents on a design system

Scope note. Prior work already covers Minto, the howcatchem and Gerrig, Pennington and Hastie, the nut graf, NN/g's layer cake, Kuleshov and the too much precision effect (case_study_tactics.html), counts not percentages at small n and the adjusted Wald table ("Case study results without metrics.md") and endings ("How case studies end.md"). These notes add what those do not hold and point back to them by name rather than repeating them.

Labels used: **research** (a study with a stated sample), **survey** (self report or vendor data), **craft lore** (practitioner rule, no test), **secondhand** (seen only through a summary). Quotes below come from pages opened in this session; WebFetch returns pages through an extraction step, so a quote should be rechecked against the page before it goes into copy.

## Lead with the novel element, reveal it late or weave it through?

### Takeaway
The evidence favours stating the outcome first and making the derivation the story, not withholding it: readers who were told the ending in advance enjoyed stories more, even twist and mystery stories, and most web readers see only a fifth of the words. The AI specific evidence adds a twist of its own: disclosing AI use costs trust and perceived competence, and being exposed by someone else costs more. So the safest shape is "name it early, lead with the judgment, not the tool": the first screen states the decision and its result in craft terms and names the agents as the mechanism, and the body shows where human judgment overruled them.

### Cited Findings
- **Research.** Spoilers do not spoil stories. Leavitt and Christenfeld "ran three experiments with a total of 12 short stories" across "ironic-twist, mystery and literary" genres, each read as is, with a prefatory spoiler paragraph or with the spoiler built into the text. Readers "significantly preferred the spoiled versions of ironic-twist stories", and the same held for mysteries and literary stories. Placement mattered: a spoiler given beforehand, outside the story, helped; placed inside the story "it didn't go over quite as well." Sample: at least 30 readers per version per the press coverage; one secondary article puts the total at 819 (not confirmed on the APS page). [APS press release](https://www.psychologicalscience.org/news/releases/spoiler-alert-stories-are-not-spoiled-byspoilers.html)
- **Research.** NN/g: "On the average Web page, users have time to read at most 28% of the words during an average visit; 20% is more likely." Basis: Weinreich's instrumented browsers, 25 users, 45,237 page views after cleaning. Section "Percentage of Text Read". [NN/g, How little do users read](https://www.nngroup.com/articles/how-little-do-users-read/)
- **Craft lore (NN/g guidance, no test cited).** Inverted pyramid: "the most important information (or what might even be considered the conclusion) is presented first"; "This writing style gets to the point quickly and supports all types of readers"; "Readers can stop reading at any point on the page and still come away with the main point." The page names the one contrast form: in academic writing "an abstract may summarize the main findings, but the content typically focuses first on the details, leading to the conclusion". It lists no case where the pyramid should not be used. [NN/g, Inverted pyramid](https://www.nngroup.com/articles/inverted-pyramid/)
- **Craft lore.** BLUF "is the practice of beginning a message with its key information"; it comes from Army Regulation 25-50 and "aims to enable the receiver of a message to make faster decisions, especially for people who are busy, time-constrained, or overloaded". Wikipedia page carries an essay-tone warning banner. [Wikipedia, BLUF](https://en.wikipedia.org/wiki/BLUF_(communication))
- **Research.** The transparency dilemma (Schilke and Reimann, OBHDP 2025): "13 experiments involving more than 5,000 participants"; "Clients placed 20% less trust in graphic designers after AI disclosure"; "when someone disclosed using AI, trust declined significantly". Being exposed is worse: "If a third party goes in and shares that you used AI, that's the worst possible outcome as far as trust is concerned." Familiarity did not remove it: "Even with people who were very familiar with AI and used it frequently, the erosion of trust was there". Softer wording did not either: "In all cases, trust levels still declined." [University of Arizona news](https://news.arizona.edu/news/disclosing-ai-use-can-backfire-research-shows)
- **Research, secondhand.** The AI competence penalty (HBR, reported by LeadDev): "more than 1,000 engineers" rated "identical snippets of Python code"; "Code purportedly written by engineers with the help of AI was rated 9% worse on average"; women were rated 13 percent less competent for AI use against 6 percent for men. "The code the researchers asked participants to evaluate didn't change; perceptions did." LeadDev does not name the researchers and the HBR original was not opened. [LeadDev](https://leaddev.com/career-development/are-you-paying-the-ai-competence-penalty)
- **Already in the bank, not repeated:** Gerrig found known outcomes still produce suspense when obstacles stand in the way, and the effect vanished once the obstacle resolved (case_study_tactics t19). Minto's answer first (t06). The nut graf (t17).

### Inferences
- Front loading the outcome is supported, and the spoiler result specifically supports putting it **outside** the narrative: a deck line or summary block above the story, then a story that does not keep restating it. That matches the spoiler study's prefatory condition, not its embedded one.
- A late reveal of the AI element ("and all of this was built by agents") is the detective structure applied to the one fact most likely to cost trust. Two risks follow. First, the reader who scans 20 percent of the words may never reach it, so the case study fails to show its most distinctive skill. Second, it resembles discovery more than disclosure; the Arizona finding that third party exposure is worst suggests a reader who feels the AI was held back may discount further. This second link is an inference: no study tested late reveal versus early disclosure inside one document.
- Leading with "AI agents" as the headline invites the competence penalty before any evidence of judgment has arrived. The penalty in both studies attached to the label alone, with the work held constant. So the headline should carry the decision and its consequence (what the system now does, what broke, what changed) and the agents should appear in the first screen as the method, framed by the human role: what the designer set, checked and overruled.
- Weaving the AI through every section costs the skimmer the one repeatable thing and slides into the rationale recital (t48): everything evenly weighted. Weave it as a single thread with one scene (t31 scene for minutes) at the turning point, not as a mention in every paragraph.
- Recommended shape: **outcome first, mechanism named early, judgment as the plot.** Headline states the decision; deck names agents plus the designer's role; body is a howcatchem built around the failure where the agents went wrong and the human check caught it.

### Gaps
- No study found tests early versus late disclosure of AI inside a single document or portfolio. The trust penalty studies compare disclosure with no disclosure, not order.
- The HBR competence penalty paper itself was not opened; figures are from LeadDev's report.
- When a reveal backfires in nonfiction beyond the spoiler study: no empirical source found. Craft lore on the twist in long form journalism was not reached in this pass.
- Search snippet only: one vendor guide says "lead each case study with a concrete result" ([lovart.ai](https://www.lovart.ai/blog/ai-design-portfolio-interview-2026)); vendor content, not opened.

## How do strong technical narratives make a failure or turning point carry the story?

### Takeaway
The best engineering write ups open on the plain event with a timestamp, name the cause within the first hundred words, then make the story the path to that cause, including the wrong hypothesis they chased. "How we built" posts carry their turn as a rejected option with stated reasons. Narrative craft sources agree that structure, not chronology, does the attracting.

### Cited Findings
- **Primary example.** Cloudflare's 18 November 2025 postmortem runs "The outage", then "How Cloudflare processes requests, and how this went wrong today", then "Remediation and follow-up steps". It opens "On 18 November 2025 at 11:20 UTC (all times in this blog are UTC), Cloudflare's network began experiencing..." and apologises plainly: "We are sorry for the impact to our customers and to the Internet in general." It names its own wrong turn: "After we initially wrongly suspected the symptoms we were seeing were caused by a hyper-scale DDoS attack..." The cause ("a change to one of our database systems' permissions") first appears at about word 79. [Cloudflare blog](https://blog.cloudflare.com/18-november-2025-outage/)
- **Practitioner commentary.** Gergely Orosz singled out that Cloudflare had "a very detailed postmortem up in less than 24 hours after the incident is resolved" and its "unusually detailed report"; section "How did the postmortem come so fast?". He praises speed and detail, not structure. [The Pragmatic Engineer](https://blog.pragmaticengineer.com/the-pulse-cloudflare-takes-down-half-the-internet)
- **Craft lore (Google SRE).** A postmortem is "a written record of an incident, its impact, the actions taken to mitigate or resolve it" plus root causes and follow ups. "A blamelessly written postmortem assumes that everyone involved in an incident had good intentions and did the right thing with the information they had." Review criteria include "Was the root cause sufficiently deep?" The chapter does not prescribe a section order. [Google SRE book, Postmortem culture](https://sre.google/sre-book/postmortem-culture/)
- **Primary example.** Figma's multiplayer post opens "When we first started building multiplayer functionality in Figma four years ago, we decided to develop our own solution." Its turn is a refused standard: operational transforms were "unnecessarily complex for our problem space" and "overkill for what we wanted to achieve." Sections run background, "How OTs and CRDTs informed our multiplayer approach", structure, details, undo, "The big takeaways". [Figma blog](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)
- **Craft lore, secondhand (McPhee via a blog quoting his New Yorker essays; the New Yorker page would not load).** "A compelling structure in nonfiction can have an attracting effect analogous to a story line in fiction" (2013, p. 48). He describes portraits that are "thematic in character, leaving the chronology of the subject's life to look after itself" (2013, p. 50). From his Paris Review interview: "If your structure really makes sense, you can make some jumps and your reader is going to go right with you." [OnFiction, Escaping chronology in non-fiction](https://www.onfiction.ca/2013/02/escaping-chronology-in-non-fiction.html)

### Inferences
- The postmortem shape fits this case study closely: timestamped event, consequence, cause stated early, then the investigation including the wrong suspicion, then remediation. The wrong suspicion is the turning point, and Cloudflare shows it can be named in one clause without self flagellation. For an agent built design system, the equivalent is the moment the agents produced something plausible but wrong and what check caught it.
- The SRE blameless standard ("with the information they had") is the same move as bank t04 (grade the decision on the day it was made) and t29 (the wrong turn and the signal you missed). Applied to agents it also prevents casting the AI as the villain, which is the t47 villain stakeholder failure in a new costume.
- Figma's refused OT is bank t24 (refute the rejected option) in the wild: the turn is a choice against the obvious default, with reasons, early in the piece.
- McPhee's thematic structure licenses organising by decision rather than by week, which matches bank t15 (order by cause, not by deliverable) and t30 (cut between decisions).

### Gaps
- Stripe, Linear, Vercel and Anthropic engineering posts were not opened in this pass; no claim is made about their structure.
- Documentary editing: no interview opened. Murch's ranking is already in the bank secondhand (t32).
- Legal argument beyond Garner's deep issue (bank t01): nothing new opened.
- Search snippets only: Ira Glass's anecdote plus "moment of reflection" and "bait" questions ([Pete Warden](https://petewarden.com/2008/06/17/getting-people/); [Karl Kapp](https://karlkapp.com/great-video-about-storytelling-by-ira-glass/)); Randy Olson's And, But, Therefore template for science communication ([SESYNC toolkit](https://www.sesync.org/resources/communications-toolkit-and-therefore-statement)). Not opened; craft lore.

## Is there evidence on how hiring managers react when AI appears first versus later in a design case study?

### Takeaway
No. I found no study, survey or published reviewer account that compares AI placement within a design case study. What exists is adjacent: experiments showing AI disclosure lowers trust and perceived competence with the work held constant, a design hiring study saying managers want AI fluency together with human judgment, and recruiter opinion that hiding AI is worse than showing it.

### Cited Findings
- **Survey (Figma, sample size not stated on the blog page).** "AI fluency is no longer a nice-to-have; many hiring managers now say it's a requirement." One manager wants designers who "can integrate AI into workflows while emphasizing human judgment, creativity, and collaboration." Managers value skills that "rely on judgment and context, not automation". "58% of hiring managers say visual polish is one of the five most important skills for designers today." [Figma blog, Why demand for designers is on the rise](https://www.figma.com/blog/why-demand-for-designers-is-on-the-rise/)
- **Opinion (Carl Wheatley, recruiter, no sample).** "Hiring managers aren't looking for people who avoided AI." "If you hide the tools you used, you're not giving them anything to judge." He advises showing where AI sped you up, where you changed its output and what you fixed. The piece does not address whether AI should lead. [Design Buddies](https://designbuddies.substack.com/p/design-hiring)
- **Research.** Trust and competence penalties for disclosed AI use: see the first question (Schilke and Reimann, 13 experiments, more than 5,000 people; HBR code study, more than 1,000 engineers, secondhand).

### Inferences
- The two bodies of evidence pull in opposite directions only on the surface. Managers want AI fluency, and the label alone lowers trust. The reconciling move both point to is specificity about the human role: what the designer decided, checked and overruled. That is what the Figma quote asks for ("emphasizing human judgment") and what the penalty studies lacked (they varied only the label).
- Treat any placement advice as reasoned, not measured, and say so if it reaches him.

### Gaps
- No design specific evidence on AI placement in a case study. Search results were vendor blogs and general hiring surveys. Snippet only, not opened: a claim that "78% of design managers" weigh AI proficiency appears in several vendor pages with three different meanings, so it is unreliable ([lovart.ai](https://www.lovart.ai/blog/ai-design-portfolio-interview-2026)); Checkr's survey of 3,000 managers on portfolios no longer signalling authenticity ([Checkr](https://checkr.com/resources/articles/hiring-hoax-manager-survey-2025)).
- The Figma hiring study's sample size sits in the full report, which was not opened.

## What makes a before and after measure persuasive with a small sample?

### Takeaway
At small n, persuasion comes from showing every unit, the same measure on both sides, a stated baseline and the derivation, not from percentages. A zero count has a usable bound (the rule of three). The causal claim a before and after pair makes on its own has to be earned by naming what else changed.

### Cited Findings
- **Statistics reference.** Rule of three: if an event "did not occur in a sample with n subjects", the interval 0 to 3/n is a 95 percent confidence interval for its rate; "When n is greater than 30, this is a good approximation of results from more sensitive tests." It "applies well beyond medical research, to any trial done n times." [Wikipedia, Rule of three (statistics)](https://en.wikipedia.org/wiki/Rule_of_three_(statistics))
- **Already covered, not repeated:** NN/g's counts not percentages rule and the adjusted Wald intervals at n = 6 ("Case study results without metrics.md"); too much precision reads as incompetence to experts unless a rationale comes with it, five experiments, 1,320 people (bank t11); a before and after pair asserts a cause (bank t12).

### Inferences
- For an agent built system, the honest unit is often a run, a component or a check, not a user. "0 of 40 components failed the token check after, against 11 of 40 before" can be stated as counts; the rule of three adds that a zero in 40 bounds the true failure rate below about 7.5 percent at 95 percent, though at n under 30 the rule is only approximate.
- Persuasion at small n comes from: the same check run on both sides; the baseline measured, not remembered; every unit shown (a dot per component) so the reader sees n; one line on confounds (the agents were changed, the designer learned, the scope shrank). This is bank t11 plus t12 applied together.
- A before and after that a planted mistake test has validated (the check caught known errors before its pass counted) is stronger than one that has not, because it shows the measure can fail. This is reasoning, not a cited finding.

### Gaps
- Single case experimental design standards (What Works Clearinghouse: data points per phase, repeated demonstrations of effect) would be the closest formal model for n of one before and after, but the WWC text was not opened. Snippet only: a CEC statement says WWC 4.0 asks for at least five points per phase in multiple baseline designs ([CEC DR](https://cecdr.org/research/research-quality/single-case-design-research)). Not verified.

## How does one story serve the skimmer and the full reader?

### Takeaway
Write in inverted pyramid at the page level and at the paragraph level, with headings that state decisions, so the page can be cut at any point and still carry the point. Put the outcome in a block outside the narrative (the spoiler finding) and let the narrative be the derivation for the full reader.

### Cited Findings
- **Craft lore (NN/g).** "Even those who have the time or inclination to read only a single paragraph, or even single sentence will still know what the story is about"; "The first sentence of every paragraph should be the most important"; an inverted article "can easily be trimmed at practically any point." [NN/g, Inverted pyramid](https://www.nngroup.com/articles/inverted-pyramid/)
- **Research.** Readers see 20 to 28 percent of words (Weinreich, 25 users). [NN/g](https://www.nngroup.com/articles/how-little-do-users-read/)
- **Research.** Prefatory spoilers raised enjoyment; embedded ones less so. [APS](https://www.psychologicalscience.org/news/releases/spoiler-alert-stories-are-not-spoiled-byspoilers.html)
- **Already covered:** layer cake scanning and headings that argue (bank t36); two readers with two budgets, survey of about a hundred (bank t35); two lengths, both live (protocol section 6).

### Inferences
- Two layers that both complete: a skim layer (headline with the decision, a deck naming the agents and the human role, decision headings, captions that carry the claim, one counted before and after) and a read layer (the howcatchem with the failure scene). The skim layer is the spoiler; the read layer is the story it does not spoil.
- The AI fact must live in the skim layer, or the skimmer leaves without the case study's most distinctive point.

### Gaps
- No study found on two layer case study pages specifically; the support is transfer from web reading and news craft.

## Which existing bank tactics apply?

### Takeaway
Ten tactics in case_study_tactics.html and three in tactics_bank.html carry this structure directly; one anti tactic is the main risk.

### Cited Findings
- From the local banks, read this session (/home/user/ritacompany/portfolio/docs/about-source/case_study_tactics.html and tactics_bank.html).
  - Case study bank: **t06 Answer first** (outcome on the first screen); **t19 The howcatchem** (known ending, derivation is the story; fails without obstacles, so the agent failure is required); **t17 The nut graf** (if the page opens on a scene, the stakes and the AI role must follow within a few paragraphs); **t14 Clues before the reveal** (put the inputs that drove the turn on the page before the turn); **t24 Refute the rejected option** (the Figma OT pattern); **t29 The wrong turn and the signal you missed** (the Cloudflare DDoS pattern, blameless); **t04 Grade the decision on the day it was made**; **t11 Precision with its derivation** and **t12 Before and after asserts a cause** (the counted measure); **t28 The limitations paragraph** (n, what was not measured); **t25 Steal the thunder** and **t26 Inoculate against the interview question** (disclose the AI and its weak point before the reader raises "so the agents did it"); **t35 Two readers, two budgets** and **t36 Headings that argue**; **t31 Scene for minutes, summary for months** (one scene at the agent failure).
  - Anti tactics to check against: **t47 The villain stakeholder** (the AI cast as villain), **t48 The rationale recital** (AI woven evenly through everything), **t44 Metric theatre** (agent run counts dressed as outcomes), **t40 The inevitable decision**.
  - Reader effect bank: **t34 Two lengths, both live**, **t15 Preempt the objection**, **t14 The costly admission**.

### Inferences
- t25 and t26 gain new weight from the transparency dilemma: those studies suggest the thunder here is the AI itself, and the Arizona finding that third party exposure is worst is the stealing thunder mechanism (bank t25) showing up in a different literature.
- Ceiling of one deliberate move per section (protocol pass 3) still applies; the core trio for this case study is t06, t19 and t29.

### Gaps
- None for this question.
