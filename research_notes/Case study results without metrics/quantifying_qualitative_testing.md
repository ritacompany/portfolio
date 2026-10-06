# Quantifying qualitative usability testing: honest numbers from 6 moderated sessions

Context for the writer: 6 moderated sessions (3 subject matter experts, 3 LGBTQIA+ college students). Tasks: complete Confidante match enrollment, select a Confidante, schedule a chat. Observed: hesitation, going back and forth between profiles, some participants undoing their Confidante choice. Source dates are given in brackets after each citation.

## 1. Qualitative vs quantitative UX research, and whether "4 of 6" is legitimate

### Takeaway
NN/g treats a 5 to 8 person moderated test as qualitative: its output is observed problems, not metrics. Counts like "4 of 6 participants" are acceptable when reported as raw counts about this study's participants, never as percentages, averages or rates implying the population. MeasuringU (Sauro and Lewis) takes a more permissive line: percentages are fine at any n if you attach a confidence interval.

### Cited Findings
- NN/g: qualitative studies "consist of observational findings that identify design features easy or hard to use", typically 5 to 8 participants, flexible conditions, used formatively; quantitative studies are metrics based (completion, time), need 30+ participants under controlled conditions, used summatively to benchmark. Qual findings are "estimates based on the knowledge and level of experience of the researcher." : [NN/g, Budiu, "Quantitative vs. Qualitative Usability Testing"](https://www.nngroup.com/articles/quant-vs-qual/) [Oct 1, 2017]
- NN/g: no contradiction between the 5 user guideline and distrusting small sample metrics "because you do not collect metrics in a qualitative study." : [NN/g, "Why 5 Participants Are Okay in a Qualitative Study, but Not in a Quantitative One"](https://www.nngroup.com/articles/5-test-users-qual-quant/) [date not verified]
- NN/g reporting rules for metrics collected during qual studies: report "individual values, not aggregated statistics such as time averages or success rates"; do not present percentages or averages. Correct: "Only 1 out of 6 participants completed the task successfully", "One participant spent over 8 minutes browsing filters". Incorrect: "Only 16.7% of participants succeeded", "Participants took on average 4 minutes and 23 seconds." : [NN/g, Moran, "Collecting Metrics During Qualitative Studies"](https://www.nngroup.com/articles/metrics-qualitative/) [Jun 13, 2021]
- NN/g: numbers from qual studies are untrustworthy because of small n and protocol variability (facilitator intervention, differing guidance per participant). Example: 5 of 10 completing gives a 95% CI of 24% to 76%. If a percentage must be shown, phrase it as "70% (7 out of 10) of the participants in this study completed the task. Based on this result, we estimate that the success rate in the whole population is between 39% and 90% (95% confidence interval)." : [NN/g, Budiu, "Why You Cannot Trust Numbers from Qualitative Usability Studies"](https://www.nngroup.com/articles/true-score/) [May 23, 2021]
- MeasuringU counter position: recommend using numbers and percentages in small sample studies, with confidence intervals, and avoid excess decimal precision. Example: 9 of 11 failed to connect an RJ-11 splitter (82%, 95% CI 51% to 96%); redesign had 0 of 10 failures (upper bound about 25%). : [MeasuringU, Sauro and Lewis, "Should You Report Numbers or Percentages in Small-Sample Studies?"](https://measuringu.com/should-you-report-numbers-with-small-n/) [Nov 7, 2023]
- The evaluator effect: in Jacobsen, Hertzum and John (1998), four evaluators reviewing the same session videos found 93 problems; only 20% were found by all four and 46% by only one evaluator. : [Hertzum and Jacobsen, "The Evaluator Effect" (ResearchGate)](https://www.researchgate.net/publication/200552976_The_Evaluator_Effect_A_Chilling_Fact_About_Usability_Evaluation_Methods) [2001 paper; figures as summarized in search results, not verified against full text]

### Inferences
- Safe phrasing for this study: "4 of the 6 participants went back and forth between Confidante profiles before choosing." Unsafe: "67% of users hesitated."
- Where NN/g and MeasuringU disagree, the conservative portfolio choice is NN/g's (raw counts only). If a percentage is ever shown, pair it with the "x of 6" count and a CI.
- The evaluator effect cuts against a single designer's recollection: one observer's problem list is itself a sample. Say "problems I observed," not "the problems."

### Gaps
- Could not verify the publication date of NN/g's "5 participants qual vs quant" article.

## 2. Which metrics come out of moderated sessions, and which require recording at the time

### Takeaway
Attitudinal instruments (SEQ, SUS, confidence ratings) only exist if the participant answered them during the session; they cannot be reconstructed afterward. Behavioral counts (task success, errors, backtracking, undo events, issue frequency) can be counted afterward, but only honestly from recordings or contemporaneous notes, not memory. Severity ratings are a researcher judgment and can be assigned afterward, as long as they are labeled as the designer's rating.

### Cited Findings
- SEQ: "Overall, how difficult or easy was the task to complete?", 7 point scale, administered immediately after each task attempt; average across 400+ tasks and 10,000 users is 5.3 to 5.6. : [MeasuringU, "10 Things to Know About the SEQ"](https://measuringu.com/seq10/) [updated May 2019]
- SUS: MeasuringU reports SUS even with 5 users; at n=5 the sample mean is within 6 points of the large sample score 50% of the time; average SUS is 68 (50th percentile). : [MeasuringU, "10 Things to Know About the SUS"](https://measuringu.com/10-things-sus/) [date not captured]
- SUS reliability is independent of sample size (usable with as few as 2), but small samples produce imprecise estimates; compute a CI. : [MeasuringU, "Measuring Usability with the SUS"](https://measuringu.com/sus/) [as summarized in search results]
- Post-task and post-study metrics correlate but are not substitutes: SEQ type task ease vs SUS r = .64; SUS vs completion, time and errors |r| .16 to .25. : [MeasuringU, "Why Collect Task- and Study-Level Metrics?"](https://measuringu.com/why-collect-task-and-study-metrics/) [date not captured]
- Task success: NN/g describes it as a simple binary metric, "the bottom line of usability", and recommends levels (complete success, success with minor issues, success with major issues, failure) reported as separate categories with word labels. Do not assign numbers to the levels and average them. : [NN/g, "Success Rate: The Simplest Usability Metric"](https://www.nngroup.com/articles/success-rate-the-simplest-usability-metric/) [date not captured]
- Time on task: log transform, report the geometric mean for n under 25. : [MeasuringU, "Best Practices for Using Statistics on Small Sample Sizes"](https://measuringu.com/small-n/) [Aug 13, 2013]
- Recall: in extended debriefs users forget encountered issues; recall should be supported with video recordings or a task walkthrough. : [Følstad et al., "Users' design feedback in usability evaluation: a literature review", Human-centric Computing and Information Sciences](https://link.springer.com/article/10.1186/s13673-017-0100-y) [2017]
- Nielsen severity (0 not a problem, 1 cosmetic, 2 minor, 3 major, 4 usability catastrophe) is a judgment combining frequency, impact and persistence, plus market impact; single ratings are unreliable and the mean of three evaluators is recommended. : [NN/g, Nielsen, "Severity Ratings for Usability Problems"](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/) [Nov 1, 1994]

### Inferences
Recording matrix for this study (inference built from the sources above):

| Metric | Needs capture in session? | Honest from recording or timestamped notes? | Honest from recollection only? |
|---|---|---|---|
| SEQ, confidence ratings, SUS | Yes, asked of the participant | Only if asked and logged | No. Never reconstruct or estimate |
| Task success (with levels) | No | Yes | Only as a coarse claim ("all 6 finished enrollment") if confident; label as recollection |
| Errors, backtracking between profiles, undoing the Confidante choice | No | Yes, countable per participant | Qualitative only ("several participants"); an exact count from memory is weak |
| Time on task | Needs timestamps | Yes, from video | No |
| Hesitation | No | Partially; needs an operational definition (e.g. pause over N seconds before selecting) | Descriptive only |
| Issue frequency (x of 6) | No | Yes | Only with a label such as "from my session notes" |
| Severity (0 to 4) | No | Assigned afterward by researcher | Yes, it is a judgment, but label it as the designer's single rating |

- For the Confidante task, the strongest defensible behavioral numbers are "x of 6 undid their Confidante selection" and "x of 6 compared profiles more than once before choosing", if and only if the recordings or notes support exact counts.
- The CLAUDE.md evidence tags map cleanly: recorded counts are CONFIRMED; counts from memory are ESTIMATE; SEQ or SUS values that were never collected would be INVENTED.

### Gaps
- No source found that explicitly states "SEQ or SUS cannot be collected retroactively"; that conclusion follows from their definitions (post-task, post-study self report) rather than a stated rule.
- Did not find an authoritative operational definition of "hesitation" as a usability metric.

## 3. Small sample guidance: 5 users, confidence intervals, presenting "x of 6"

### Takeaway
Nielsen's 5 user rule is about finding problems, not measuring rates, and assumes a homogeneous user group; with two distinct groups, NN/g says 3 to 4 per group. Six participants split 3 and 3 fits that guidance for discovery. Any rate from 6 people has an enormous interval, so present counts.

### Cited Findings
- Problems found = N(1 minus (1 minus L)^n), with L averaging 31% per user; 5 users find about 85% of problems. Assumes "comparable users who will be using the site in fairly similar ways"; for distinct groups test 3 to 4 users per category. Recommends iterating with several small rounds rather than one big test. : [NN/g, Nielsen, "Why You Only Need to Test with 5 Users"](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/) [Mar 18, 2000]
- Faulkner tested 60 users and sampled sets of 5: average coverage 85%, but some sets of 5 found as few as 55% of problems. : [Faulkner, "Beyond the five-user assumption", Behavior Research Methods 35(3)](https://link.springer.com/article/10.3758/BF03195514) [2003]
- Adjusted Wald: add z squared over 2 successes and z squared trials, (x + 1.92)/(n + 3.84) at 95%; best coverage for samples under about 150. Example 9 of 10 becomes about 11/14. : [MeasuringU, Sauro, "Adjusted Wald"](https://measuringu.com/wald/) [Oct 1, 2005]
- Small samples are "like making astronomical observations with binoculars": only large differences are detectable. For binary measures use adjusted Wald; for completion point estimates the LaPlace estimator or simple proportion. : [MeasuringU, "Best Practices for Using Statistics on Small Sample Sizes"](https://measuringu.com/small-n/) [Aug 13, 2013]
- Adjusted Wald 95% intervals, computed by this researcher using the MeasuringU formula (n = 6): 0/6 = 0 to 44%; 1/6 = 1 to 58%; 2/6 = 9 to 70%; 3/6 = 19 to 81%; 4/6 = 30 to 91%; 5/6 = 42 to 99%; 6/6 = 56 to 100%. Per subgroup (n = 3): 0/3 = 0 to 62%; 1/3 = 6 to 80%; 2/3 = 20 to 94%; 3/3 = 38 to 100%. : computed from [MeasuringU adjusted Wald method](https://measuringu.com/wald/)

### Inferences
- "4 of 6" is compatible with a true population rate anywhere from about 30% to 91%. That is the concrete reason to avoid "67%".
- The one inferential statement 6 users can support: a problem seen in 4, 5 or 6 of 6 is very unlikely to be rare in the population (lower bounds 30%, 42%, 56%). This is the MeasuringU style argument for prioritization.
- Do not compare SMEs vs students numerically (3 vs 3). Report differences as qualitative contrasts ("both students who undid their choice said...").
- Suggested format: "4 of 6 participants (2 SMEs, 2 students) switched back to a profile they had already viewed before confirming."

### Gaps
- Could not confirm current status of usability.gov guidance; the site's content was not retrieved in this pass.

## 4. Showing severity or before/after without a second test round

### Takeaway
Without a retest there is no before/after measurement. What can be shown honestly is a problem inventory: a participant by issue matrix (rainbow spreadsheet or MeasuringU style) with frequency as x of 6, a separate severity judgment, and a traceability column linking each issue to the design change. Frequency and severity should stay separate dimensions.

### Cited Findings
- MeasuringU rates problems on two independent dimensions: frequency (proportion of users encountering it, e.g. 1 of 5) and severity on 3 levels: minor ("causes some hesitation or slight irritation"), moderate ("occasional task failure for some users; causes delays and moderate irritation"), critical ("leads to task failure"). Also logs insights, suggestions and positives. Presented as a user by problem matrix. Separation matters because a rare problem can be catastrophic. Categories are rough guides; expect rater disagreement. : [MeasuringU, "Rating the Severity of Usability Problems"](https://measuringu.com/rating-severity/) [Jul 30, 2013]
- Nielsen 0 to 4 severity combines frequency, impact and persistence: [NN/g, Nielsen](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/) [Nov 1, 1994]
- Rainbow spreadsheet (popularized by Tomer Sharon, then at Google): each participant gets a column and a color, rows are observations, observers mark which participants showed each observation, so the colored cells give an at a glance frequency per observation. : [Looppanel, "How to Use the Rainbow Spreadsheet"](https://www.looppanel.com/blog/rainbow-spreadsheet) [secondary source, date not captured]; [Tomer Sharon on Twitter](https://twitter.com/tsharon/status/253215007452569600) [2012, primary pointer, content not retrieved]; [Pratt IXD, "The Rainbow Sheet"](https://ixd.prattsi.org/2019/11/the-rainbow-sheet-a-collaborative-tool-to-quickly-generate-insights-from-user-testing/) [Nov 2019]
- MeasuringU example of the only honest before/after: 9 of 11 failures, then 0 of 10 after redesign, each with a CI. That required a second round. : [MeasuringU](https://measuringu.com/should-you-report-numbers-with-small-n/) [Nov 7, 2023]

### Inferences
- Honest artifact for this case study: a matrix with rows = issues (e.g. "compared profiles repeatedly", "undid Confidante selection", "hesitated at scheduling"), columns = P1 to P6 grouped SME / student, a frequency column (x of 6), a severity column (Nielsen 0 to 4 or MeasuringU 1 to 3, marked "designer rating"), and a "design change" column. The "after" is the design response, not a measured improvement.
- Say "the redesign targets" or "addresses", never "reduced" or "improved", unless there was a retest.
- A frequency by severity 2x2 (common/rare by minor/critical) is a reasonable visual derived from the MeasuringU two dimension model; it is a presentation choice, not a named standard.

### Gaps
- Could not retrieve an NN/g article on the rainbow spreadsheet (URL returned 404); relied on secondary sources.
- No formal source found for the "frequency x impact matrix" as a standard named method; it is common practice.

## 5. How designers visualize qualitative findings numerically in portfolios

### Takeaway
Sources here are weak (portfolio platform and Medium blogs). The consistent advice is to name the specific observed problem and show the design change that responds to it, rather than inventing metrics.

### Cited Findings
- Without data, show annotated before/after screenshots, usability findings and user feedback, and explain how changes addressed pain points; name the specific confusion and show the change that resolved it; "vague usability claims convince nobody." : [UXfolio, "UX Case Study Template"](https://blog.uxfol.io/ux-case-study-template/) and [UXfolio, "UX Case Studies for Beginners"](https://blog.uxfol.io/ux-case-studies-for-beginners/) [2026 guide; exact attribution between the two pages not verified]
- If formal metrics are unavailable, describe metrics you would track next. : [UXfolio](https://blog.uxfol.io/ux-case-studies-for-beginners/) [as summarized in search results]

### Inferences
- Numeric but honest visuals: participant by issue matrix (dots per participant, not bars with percentages); issue to design change traceability table; per issue quote plus "x of 6" count; affinity cluster sizes shown as note counts.
- A dot matrix of 6 people is visually honest because the reader sees n. A bar chart at 67% hides n.
- For senior design portfolios, the traceability table (finding, evidence count, severity, design decision) demonstrates systems thinking more than any single number.

### Gaps
- Found no authoritative (NN/g or MeasuringU) source on portfolio presentation specifically.
- No published guidance found on affinity count visualization as a reporting standard.
