# Success metrics and outcome framing for an unlaunched product (applied to Haven)

Style note for the report writer: every item below is labeled where it matters as MEASURED (a result someone actually collected) or PROPOSAL (a framework, recommendation or opinion). Source dates are given in brackets.

## 1. Google HEART and Goals-Signals-Metrics: how it works and how it fits unshipped work

### Takeaway
HEART (Rodden, Hutchinson, Fu, CHI 2010) is a menu of five user-centered metric categories paired with a Goals, Signals, Metrics process; teams pick only the categories that matter, which makes it well suited to a case study that must show a reasoned measurement plan rather than results.

### Cited Findings
- HEART was published by Kerry Rodden, Hilary Hutchinson and Xin Fu in the Proceedings of CHI 2010 (ACM). The paper describes user-centered metrics for web apps plus a process for mapping product goals to metrics so decisions can be "data-driven and user-focused" at once. PROPOSAL / framework [2010]: [Google Research](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/)
- The five categories are Happiness, Engagement, Adoption, Retention and Task success; Rodden later popularized it while a UX researcher at Google Ventures. [secondary, undated summary]: [Medium / Agile Insider](https://medium.com/agileinsider/how-to-set-user-centered-metrics-the-google-heart-framework-ab41bf217a34)
- Goals-Signals-Metrics: Goals are the broad objective, Signals are the user behaviors or attitudes that would indicate progress, Metrics are the quantified form of a signal. Teams are advised to choose only the relevant HEART categories rather than all five. [secondary summaries]: [Lyssna](https://www.lyssna.com/blog/google-heart-framework/); [ProductPlan](https://www.productplan.com/glossary/heart-framework)
- The original GV article by Rodden ("How to choose the right UX metrics for your product," library.gv.com) could not be retrieved (domain did not resolve); the notes above rely on the CHI abstract and secondary summaries.

### Inferences
- The GSM ladder is the credible shape for an unshipped case study: the Goal and Signal rows are design reasoning the designer can own fully; only the Metric row is conditional on launch. Presenting the table with a "status" column (instrumentable / needs survey / not measurable by design) turns missing results into visible judgment.
- For Haven, Happiness and Task success map to self-report and in-session outcomes; Adoption and Retention are measurable at an aggregate level; Engagement is the category most likely to be ethically dangerous (see section 3) and should be deliberately de-emphasized, with the reason stated.

### Gaps
- No primary source found showing a portfolio case study that uses HEART specifically for unshipped work; the pattern is advised generically but not documented with named examples.
- Rodden's own GV article text was not retrieved.

## 2. Hypothesis statements, leading vs lagging indicators, North Star metrics

### Takeaway
Lean UX hypothesis statements and North Star input metrics give a vocabulary for "what we believed and how we would have known," which is the honest substitute for outcomes in an unlaunched project.

### Cited Findings
- Gothelf's Lean UX hypothesis format: "We believe [this statement is true]. We will know we're [right/wrong] when we see [qualitative feedback] and/or [quantitative feedback] and/or [KPI change]." An alternative form: "We believe this [business outcome] will be achieved if [these users] successfully [attain this user outcome] with [this feature]." PROPOSAL [Lean UX, 2013; canvas v2 later]: [University of Edinburgh summary of Lean UX](https://blogs.ed.ac.uk/website-communications/lean-ux-requirements-hypotheses/); [Jeff Gothelf, Lean UX Canvas v2](https://jeffgothelf.com/blog/leanuxcanvas-v2/)
- Gothelf frames each design as "a proposed business solution, a hypothesis" to validate with customer feedback. [Lean UX]: [Goodreads quotes page](https://www.goodreads.com/work/quotes/18939926-lean-ux-applying-lean-principles-to-improve-user-experience)
- Amplitude's North Star Playbook: a North Star Metric is a leading indicator of long-term results; 3 to 5 input metrics are the actionable behaviors that drive it and sit one step from the team's feature work. PROPOSAL: [Amplitude North Star Playbook PDF](https://info.amplitude.com/rs/138-CDN-550/images/Amplitude-The-North-Star-Playbook.pdf); [Amplitude, Leading vs lagging indicators](https://amplitude.com/blog/map-your-metrics)
- Portfolio advice: research that influenced a decision or settled an internal debate counts as impact even if the product never shipped; if a project was speculative, explain how success would be measured in a live environment and the rationale. PROPOSAL / opinion [undated blog]: [UX Playbook](https://uxplaybook.org/articles/how-to-showcase-impact-in-ux-case-studies-without-clear-metrics)

### Inferences
- The strongest pattern for Haven is 2 to 4 hypothesis statements tied to specific design decisions (text-only intro chat, identity quiz matching, disguise features), each with a "we would know when" line naming a leading signal, plus an explicit note of which signals were tested in usability work and which remain untested.
- A North Star for Haven should describe value delivered, not usage. Candidate (PROPOSAL, mine): "teens who report feeling understood by a Confidante after a first conversation." Its inputs would be match acceptance, completed first chats and safe return rate, all aggregate.
- Leading vs lagging split for Haven: lagging outcomes (wellbeing, reduced isolation, suicide risk) cannot ethically or practically be attributed to an app without a formal study; leading signals (completed first chat, return for a second chat, self-reported "felt safe," zero privacy incidents) are what a product team could actually own.

### Gaps
- No verified examples found of named senior-designer portfolio case studies using the Gothelf format for a never-launched product.

## 3. Success measures and measurement ethics for vulnerable or privacy-sensitive users

### Takeaway
Comparable services measure success through voluntary, anonymous self-report (helpfulness, feeling safe, sense of community) and aggregate safety operations, not through tracking sensitive in-app behavior; the digital health literature warns explicitly against using raw engagement as success.

### Cited Findings
- Crisis Text Line (Gould et al., Suicide and Life-Threatening Behavior, 2022): outcomes came from an optional post-conversation survey; 86.5% found the conversation helpful, 46.1% of suicidal texters felt less suicidal, 37.8% more hopeful. Response rate was only 22.5%, so self-selection bias is a stated limitation, and there was no long-term follow-up. MEASURED: [PMC9322288](https://pmc.ncbi.nlm.nih.gov/articles/PMC9322288/)
- Crisis Text Line reports 87% of 450,000+ texters (2016 to 2023) found conversations helpful and 86% felt their counselor showed genuine concern. MEASURED, organizational self-report [Oct 2023]: [A Decade of Impact Report](https://www.crisistextline.org/wp-content/uploads/2023/10/A-Decade-of-Impact-Report.pdf)
- Crisis Text Line states it never monetized personally identifiable information and cut ties with Loris.ai in 2022, requiring return or deletion of data; a cautionary precedent for data use in sensitive services. [search summary of CTL research page]: [Crisis Text Line Research and Impact](https://www.crisistextline.org/data-philosophy/research-impact/); [PMC11799801](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11799801/)
- TrevorSpace (ages 13 to 24) evaluated itself with a two-week voluntary survey posted on the platform (631 respondents) using adapted Search Institute instruments (Developmental Assets Profile, Developmental Relationships Survey): 89% felt a sense of community, 88% said people there care about them, 99% said helping others is important. MEASURED, self-selected sample [Apr 24, 2024]: [The Trevor Project blog](https://www.thetrevorproject.org/blog/exploring-positive-youth-development-in-online-spaces-3-key-insights-to-create-thriving-positive-outcomes-for-lgbtq-young-people/)
- Trevor Project 2024 national survey (N = 18,663, ages 13 to 24): youth with no online space where they feel safe reported more past-year suicide consideration (47% vs 38%), attempts (14% vs 11%), anxiety (75% vs 65%) and depression (63% vs 52%). Measures: GAD-2, PHQ-2, CDC YRBS items. MEASURED, correlational [Sep 17, 2025]: [Trevor Project research brief](https://www.thetrevorproject.org/research-briefs/online-experiences-and-mental-health-of-lgbtq-young-people/)
- TrevorSpace safety operations: 24/7 moderation team and an AI tool built with Google to flag public posts suggesting self-injury or suicide risk for human review. Private messages are not public, but Trevor reserves the right to review them to investigate abuse. [search summaries of Trevor pages]: [TrevorSpace Guidelines](https://www.trevorspace.org/guidelines/); [TrevorSpace Privacy Policy](https://www.trevorspace.org/privacy-policy/)
- TrevorSpace's privacy policy lists collecting name, date of birth, gender identity, sexual orientation, device IDs, cookies and IP addresses. [search summary]: [TrevorSpace Privacy Policy](https://www.trevorspace.org/privacy-policy/)
- Yardley et al. argue for "effective engagement" (enough participation to achieve the intended effect) instead of "more engagement." In mental health apps engagement is not proportional to clinical improvement, and 25 different engagement metrics appear across studies. PROPOSAL plus review findings [2021]: [JMIR Mental Health, Saleem et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC8726056/)
- Engagement-driven design borrowed from social media risks prioritizing retention over therapeutic benefit. Opinion / critical review [2025]: [PMC12003299](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12003299/)

### Inferences
- The established pattern in this space is three measurement layers: (a) in-moment voluntary self-report (was this helpful, did you feel safe), (b) periodic voluntary validated-scale surveys, (c) aggregate operational safety metrics (moderation response time, reports resolved). None of the reference services cite session length or daily actives as success.
- For Haven, privacy features (disguised icon, app-switcher hiding, notifications off, PIN/Face ID) make per-user behavioral analytics a risk in itself: an analytics event that records "user opened identity quiz" is sensitive data. The ethically consistent position is aggregate, non-identifying counts only, with no third-party analytics SDKs, and self-report inside the app as the primary outcome signal. This is a design decision worth stating in the case study, not a limitation.
- Metrics Haven could credibly propose (PROPOSAL, mine): share of first chats a teen rates as "felt safe" or "felt understood" (one-tap, skippable); share of matches that reach a second conversation (aggregate); Confidante response time; safety reports per 1,000 conversations and time to resolution; zero known privacy exposures (disguise failure reports). Deliberately excluded: time in app, streaks, quiz answer analytics.
- The owner's excluded metrics (quiz completion, passcode adoption, intro-to-booked conversion) match the literature's warning: they are engagement or funnel measures that cannot be observed in a controlled test and would not show value delivered even after launch.
- Crisis Text Line's 22.5% response rate and TrevorSpace's self-selected sample show that even real organizations report proxy outcomes with sampling caveats; Haven can cite this to show the proposed survey approach is the industry norm and name the same bias up front.

### Gaps
- No usable primary sources found on 7 Cups, Headspace or Q Chat Space success metrics within the call budget.
- The Invision Community case study on TrevorSpace (likely to list operational metrics) returned 403.
- Trevor's moderation response time targets or published safety metrics were not found.

## 4. Research ethics: guardian consent makes closeted LGBTQIA+ teens unreachable

### Takeaway
Federal rules allow IRBs to waive parental permission when it does not protect the child, and published studies show most sexual and gender minority teens, especially those not out, would not take part if parental permission were required. This gives the case study a citable reason the core user could not be tested directly.

### Cited Findings
- 45 CFR 46.408(c): an IRB may waive parental permission for research "designed for conditions or for a subject population for which parental or guardian permission is not a reasonable requirement to protect the subjects (for example, neglected or abused children)," provided an appropriate substitute protection mechanism is in place and the waiver is consistent with federal, state or local law. REGULATION: [Cornell LII](https://www.law.cornell.edu/cfr/text/45/46.408)
- Mustanski et al. (Perspectives on Sexual and Reproductive Health, 2017; online focus groups Feb to Apr 2015): 74 SGM adolescents aged 14 to 17; about 46% were not out to at least one parent; 75% would be unwilling or unsure to enroll in an HIV testing study if parental permission were required. Youth feared parents learning their identity, punishment or rejection. They suggested comprehension checks, multimedia consent and explicit confidentiality explanations as substitute protections; only two endorsed youth advocates. MEASURED: [PMC5768203](https://pmc.ncbi.nlm.nih.gov/articles/PMC5768203/); [PubMed 28445608](https://pubmed.ncbi.nlm.nih.gov/28445608/)
- Mustanski spent the first 10 months of a 24-month grant (2007, University of Illinois at Chicago) winning IRB approval for a parental permission waiver for 16 and 17 year olds. Mustanski and Celia Fisher argued in 2016 that requiring parental consent introduced research bias harming vulnerable youth. [APA Monitor, Feb 2019]: [APA Monitor](https://www.apa.org/monitor/2019/02/parents-consent) (retrieved through search snippet; page body did not load)
- Klitzman et al. (Journal of Homosexuality, 2023) on HPTN 078: IRBs at four US sites with similar state laws made inconsistent waiver decisions (approved in Alabama and Massachusetts, deferred to counsel in Georgia and Maryland). Cites a survey of 198 adolescent MSM aged 14 to 17 in which 62% would join a study generally but only 27.7% would join an HIV testing study requiring parental permission; only 29.8% said parents knew about their same-sex activity. MEASURED (cited prior work) plus case analysis: [PMC12240674](https://pmc.ncbi.nlm.nih.gov/articles/PMC12240674/)
- Additional related sources located but not retrieved (paywalled or 403): "Obtaining waivers of parental consent: a strategy endorsed by gay, bisexual and questioning adolescent males" (Nursing Outlook): [ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S0029655417304013); "Ethical and Regulatory Issues with Conducting Sexuality Research with LGBT Adolescents" (Archives of Sexual Behavior, 2011): [Springer](https://link.springer.com/article/10.1007/s10508-011-9745-1); "I Wouldn't Trust the Parents to 'Do No Harm' to a Queer Kid" (SAGE, JERHRE): [doi](https://doi.org/10.1177/1556264620983134); CHOP IRB guidance on waiver of parental permission: [CHOP](https://www.research.chop.edu/services/waiver-of-parental-permission)

### Inferences
- The case study can state plainly: the people Haven is built for are the people research ethics makes hardest to reach, because the consent a minor needs is the disclosure Haven exists to avoid. Citing 46.408(c) plus Mustanski 2017 (75% unwilling or unsure; 46% not out) makes this a documented constraint rather than an excuse.
- This also explains the proxy research choices (adults recalling their teen years, out teens, Confidante-side testing), which the case study should label as proxies with their bias named.
- A launched Haven would need its own path: an IRB-approved waiver with substitute protections (comprehension checks, strong confidentiality), consistent with what SGM teens themselves recommended.

### Gaps
- The evidence base is mostly HIV and sexual health research; I found no published study applying these waiver arguments to a consumer app or peer support product.
- Full texts of the Nursing Outlook and Archives of Sexual Behavior papers were not accessible, so their specific figures are not included.

## 5. Presenting "what I would measure after launch" without it reading as filler

### Takeaway
It reads as filler when it is a generic metric list; it reads as judgment when each metric is tied to a design decision, labeled by what was and was not validated, and paired with what was deliberately not measured and why.

### Cited Findings
- Portfolio guidance: if formal metrics are unavailable, qualitative insight, the decisions research influenced and a clear plan for measuring success in a live environment with stated rationale demonstrate strategic thinking. Opinion [undated]: [UX Playbook](https://uxplaybook.org/articles/how-to-showcase-impact-in-ux-case-studies-without-clear-metrics); [Medium / Design Bootcamp](https://medium.com/design-bootcamp/how-to-showcase-impact-in-ux-case-studies-without-clear-success-metrics-5ff03d791582)
- HEART's Goals-Signals-Metrics process starts from goals and derives signals, the reverse of listing available numbers. PROPOSAL [2010]: [Google Research](https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/)
- Real sensitive-service evaluations disclose their sampling limits (CTL 22.5% response rate; TrevorSpace self-selected survey), which models how to caveat proposed metrics. MEASURED: [PMC9322288](https://pmc.ncbi.nlm.nih.gov/articles/PMC9322288/); [Trevor Project blog](https://www.thetrevorproject.org/blog/exploring-positive-youth-development-in-online-spaces-3-key-insights-to-create-thriving-positive-outcomes-for-lgbtq-young-people/)

### Inferences
- Concrete pattern that avoids filler (PROPOSAL, synthesized from above):
  1. One North Star in value terms ("teens who feel understood after a first conversation"), not usage.
  2. A short GSM table per phase: Phase 1 Identity (goal: a teen finds one safe person) and Phase 2 Community (goal: a teen finds belonging without exposure). Each row names the design decision it tests.
  3. A status column: validated in testing / testable only after launch / not measurable by design.
  4. A "we chose not to measure" list with reasons (time in app, streaks, quiz answer analytics, individual behavior logs) grounded in the effective-engagement literature and the privacy features themselves. This is where the owner's three ruled-out metrics belong, shown as a decision.
  5. A guardrail set: privacy incident count, safety report resolution time, Confidante quality flags. Guardrails show seniority because they define what must not get worse.
  6. One line on the research constraint (46.408(c), Mustanski 2017) explaining why validation of the core user waits for launch.
- Keep it short. A single table plus a "not measured" list outperforms paragraphs of hypothetical numbers; no projected percentages should appear, since any number without a source reads as invented.

### Gaps
- No empirical evidence (e.g. hiring manager surveys) found on how reviewers judge "post-launch metrics" sections; guidance is practitioner opinion.
