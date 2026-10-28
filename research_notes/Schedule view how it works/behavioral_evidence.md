# Behavioral and HCI evidence for suggested, movable weekly task slots

Scope: a learning and career growth product. A fixed number of weekly tasks sized to the hours a person gave, one weekly deadline (Saturday), calendar sync that suggests times between the person's events guided by preferred hours and focus hours. The product never moves a time. A passed time drops off, the task stays open for the week, nothing is marked missed.

Evidence strength labels used below: STRONG (meta analysis or large field experiment), MODERATE (several controlled studies), WEAK (single study, lab only, self report or a failed replication), CONTESTED (direct conflicting evidence).

## 1. Implementation intentions and planning prompts

### Takeaway
Making a when and where plan is one of the best replicated effects in behavior change (d about 0.65 in the classic meta analysis, .27 to .66 across 642 tests in the 2025 update). The detail that makes a prompt work is a specific time, not just a date, and the benefit shrinks when a person plans many goals at once.

### Cited Findings
- STRONG. Gollwitzer and Sheeran 2006, Advances in Experimental Social Psychology 38: meta analysis of 94 independent tests; implementation intentions had a medium to large effect on goal attainment, d = 0.65. [Stafforini record](https://stafforini.com/works/gollwitzer-2006-implementation-intentions-and/)
- STRONG. Sheeran, Listrom and Gollwitzer 2025, "The when and how of planning: Meta analysis of the scope and components of implementation intentions in 642 tests," European Review of Social Psychology 36(1):162-194, doi 10.1080/10463283.2024.2334563. Positive effects on cognitive, affective and behavioral outcomes, effect sizes about d = .27 to .66. Effects were stronger when the plan was in true if then format, when participants were highly motivated and when the plan was rehearsed. The paper also classifies plan cues (for example time and place) and responses and tests which work best. [KOPS Konstanz record](https://kops.uni-konstanz.de/handle/123456789/69905)
- STRONG (field RCT). Milkman, Beshears, Choi, Laibson and Madrian 2011, "Using implementation intentions prompts to enhance influenza vaccination rates," PNAS 108(26). Employees mailed a reminder; control vaccination rate 33.1%. Prompt to write a date only: +1.5 points, not significant. Prompt to write a date and a time: +4.2 points, significant (about a 13% relative lift; the NIH release quotes larger relative figures for the single day clinics). The effect was strongest where the clinic ran on only one day. [PMC full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC3127912); [NIH news release](https://www.nih.gov/node/22131)
- MODERATE, a direct caution. Dalton and Spiller 2012, "Too much of a good thing: The benefits of implementation intentions depend on the number of goals," Journal of Consumer Research 39(3):600-614. Planning helped with one goal but not with several (in one study, people pursued one or six everyday goals a day for a week). Planning made the difficulty of juggling many goals salient, which lowered commitment. Framing the set of goals as manageable restored the benefit. [IDEAS/RePEc](https://ideas.repec.org/a/oup/jconrs/doi10.1086-664500.html); [ScienceDaily summary](https://www.sciencedaily.com/releases/2012/05/120516152448.htm)
- MODERATE, real world ceiling. Milkman et al. 2021, "Megastudies improve the impact of applied behavioural science," Nature: 54 four week digital programs, more than 61,000 24 Hour Fitness members, built by 30 scientists. 45% of programs significantly raised weekly gym visits, by 9% to 27%. Only 8% produced a significant effect after the four weeks ended. Expert forecasters could not predict which would work. The best arm paid micro rewards for returning after a missed workout. Planning prompts were among the arms, but I could not confirm their individual effect from accessible sources. [Caltech record](https://authors.library.caltech.edu/records/mys88-cc756); [Wharton BCFG](https://bcfg.wharton.upenn.edu/?p=2660)

### Inferences
- A suggested slot with a day and a time is the product doing the step that separated the working arm (+4.2) from the non working arm (+1.5) in Milkman 2011. That is the strongest single citation for the schedule view.
- Dalton and Spiller argue for keeping the weekly task count small and framing the week as manageable ("sized to the hours you said you have" is that framing). A long list of slots can backfire by making the whole week look hard.
- The megastudy argues against overclaiming: most nudges have short lived effects. The case study should claim follow through within the week, not lasting habit, unless Mondai's own data shows it.

### Gaps
- No accessible figure for the planning prompt arms in the 2021 gym megastudy; the Nature supplement would have it.
- Milkman et al. 2013 (colonoscopy planning prompts, Preventive Medicine) and Rogers, Milkman, John and Norton 2015 (Behavioral Science and Policy, "Beyond good intentions") are relevant field replications but were not verified in this pass.
- Nothing found on whether a plan written by the system (a suggestion) works as well as a plan the person writes. All the implementation intention evidence has the person form the plan. This is the biggest gap for the design claim.

## 2. Does scheduling a task into a calendar slot raise follow through?

### Takeaway
There is no direct peer reviewed field experiment showing that putting a self development task in a calendar slot raises completion. The support is indirect (implementation intentions above) plus one CHI 2023 study of automatically booked protected time with self reported benefits. There is also evidence that rigid time slots make discretionary activities feel like chores, which favors loose, movable suggestions.

### Cited Findings
- WEAK to MODERATE (randomized, self report). Das Swain, Hernandez, Houck, Saha, Suh, Chaudhry, Cho, Guo, Iqbal and Czerwinski 2023, "Focused Time Saves Nine: Evaluating Computer Assisted Protected Time for Hybrid Information Work," CHI 2023. A commercial Microsoft feature that automatically and preemptively books calendar time for self determined work. Study 1: 27 existing users used it mainly for focused work. Study 2: 89 new users randomly assigned to it reported higher performance, more job resources and greater immersion; they rearranged their activities. Outcomes are self reported; effect sizes not visible in the abstract. [Microsoft Research](https://www.microsoft.com/en-us/research/?p=926838)
- MODERATE (13 studies). Tonietto and Malkoc 2016, "The calendar mindset: Scheduling takes the fun out and puts the work in," Journal of Marketing Research 53(6):922, doi 10.1509/jmr.14.0591. Scheduling a leisure activity at a set time made it feel less free flowing and more like a chore and lowered both anticipation and enjoyment. "Rough scheduling" without a prespecified time removed the penalty. [Rutgers PDF](https://www.business.rutgers.edu/sites/default/files/documents/tonietto-the-calendar-mindset.pdf); [Ohio State news](https://news.osu.edu/scheduling-leisure-activities-makes-them-less-fun/)

### Inferences
- The defensible claim is "a specific time turns an intention into a plan" (section 1), not "calendaring raises completion."
- Tonietto and Malkoc studied leisure, not learning, so it transfers only partly. It still supports the design choice that a slot is a suggestion inside a week rather than a fixed appointment: the week window acts like their rough schedule while the slot supplies the specific time.

### Gaps
- No peer reviewed RCT found on calendar time blocking for personal tasks. Productivity blog claims about time blocking were excluded.
- The CHI 2023 full text was not read; its findings on whether people moved or ignored the booked time are unknown.

## 3. Planning fallacy: suggested slot plus one weekly deadline vs per task deadlines

### Takeaway
People reliably underestimate how long their own tasks take, so tight per task deadlines will often be missed. The deadline research is not clean: the classic finding that evenly spaced external deadlines beat self set ones failed a 2026 replication, and a field experiment found longer deadlines can lower completion by letting people put things off and forget.

### Cited Findings
- STRONG (classic, widely replicated). Buehler, Griffin and Ross 1994, "Exploring the planning fallacy," Journal of Personality and Social Psychology 67(3):366-381. 37 honours thesis students: average best estimate 33.9 days, average actual 55.5 days, only about 30% finished by their predicted date; even the average worst case estimate (48.6 days) was too short. People focus on plan based scenarios and discount past experience. [Paper PDF](https://bear.warrington.ufl.edu/brenner/mar7588/Papers/buehler-et-al-1994.pdf); [Wikipedia summary of figures](https://en.wikipedia.org/wiki/Planning_fallacy)
- CONTESTED. Ariely and Wertenbroch 2002, "Procrastination, deadlines, and performance: Self control by precommitment," Psychological Science 13(3):219-224. People self impose costly deadlines and these help, but self set deadlines were less effective than some externally imposed ones (the evenly spaced condition). [Duke Scholars](https://scholars.duke.edu/publication/810365)
- Replication failure. Hyndman and Bisin 2026, "Replication of 'Procrastination, deadlines, and performance'," Psychological Science 37(8):557-571, doi 10.1177/09567976261460772. Changing deadlines had a negligible effect on all three performance measures; externally imposed evenly spaced deadlines did not stand out in reducing procrastination. [APS page](https://www.psychologicalscience.org/journals/psychological-science/09567976261460772/)
- MODERATE (field). Knowles and colleagues 2022, "The non monotonic effect of deadlines on task completion," Economic Inquiry (online survey with charitable donation). Completion was lowest with a one month deadline and highest with no deadline; the authors suggest the long deadline let people defer and then forget. [CORE record](https://core.ac.uk/works/27680315); [Macquarie record](https://researchers.mq.edu.au/en/publications/procrastination-and-the-non-monotonic-effect-of-deadlines-on-task/)

### Inferences
- Given the planning fallacy, a per task deadline set from an optimistic estimate will be missed often, and each miss is a failure event (section 4). One weekly deadline absorbs estimation error inside the week.
- The suggested slot covers the forgetting risk Knowles found with long windows: the week is the deadline, the slot is the reminder and the plan.
- Do not cite Ariely and Wertenbroch as support for anything about deadline spacing. Its key spacing result did not replicate.

### Gaps
- No study found that directly compares one window deadline plus suggested times against per task deadlines. The case for the weekly deadline is an inference from the planning fallacy plus goal violation research, and should be marked as reasoning, not a finding.
- Kruger and Evans 2004 (unpacking a task reduces the planning fallacy) is relevant to sizing tasks to hours but was not verified here.

## 4. Labeling tasks missed or overdue: motivation and abandonment

### Takeaway
Coding a lapse as a failure lowers later performance below people who never set the goal, and showing a broken streak reduces later engagement. Single lapses do little real damage to habit formation. Together this supports not marking anything missed.

### Cited Findings
- MODERATE (2 experiments). Soman and Cheema 2004, "When goals are counterproductive: The effects of violation of a behavioral goal on subsequent performance," Journal of Consumer Research 31(1):52-62, doi 10.1086/383423. Goal setters normally outperform non setters, but after violating the goal they can perform worse than people who never set one. Mechanism: the violation is coded as failure, producing demotivation and negative emotion. [Oxford Academic](https://academic.oup.com/jcr/article/31/1/52/1797567); [JCR issue listing](https://academic.oup.com/jcr/issue/31/1)
- MODERATE (7 studies). Silverman and Barasch 2023, "On or off track: How (broken) streaks affect consumer decisions," Journal of Consumer Research 49(6):1095-1117, doi 10.1093/jcr/ucac029. Highlighting a broken streak in a behavior log lowered later engagement relative to highlighting an intact one, even when actual past behavior was identical. Stronger when people blame themselves for the break; weaker when the streak can be repaired. Authors note applications to fitness and learning. [University of Delaware repository](https://udspace.udel.edu/handle/19716/34160); [CU Boulder summary](https://www.colorado.edu/business/faculty-research/2023/04/19/or-track-how-broken-streaks-affect-consumer-decisions)
- MODERATE (96 people, 84 days). Lally, van Jaarsveld, Potts and Wardle 2010, European Journal of Social Psychology: time to habit plateau averaged 66 days among well fitted participants (range 18 to 254). Missing a single opportunity did not materially affect habit formation; repeated omissions did lower the automaticity reached. [UCL news](https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit); [BPS Research Digest](https://bps.org.uk/research-digest/how-form-habit)
- Related field signal: the best arm in the 2021 gym megastudy paid micro rewards for coming back after a missed workout. [Wharton BCFG](https://bcfg.wharton.upenn.edu/?p=2660)

### Inferences
- A "missed" label is exactly the framing manipulation Silverman and Barasch tested: same behavior, worse future engagement when the record shows a break. Dropping a passed time silently and keeping the task open keeps the person's record intact for the week.
- Self blame strengthens the drop off. The product owns the suggested time, so a passed suggestion is not the person's broken commitment; showing it as missed would convert the product's guess into the person's failure.
- Lally supports telling the person, in effect, that one skipped slot does not matter, while the weekly structure guards against the repeated omissions that do.

### Gaps
- The phrase "what the hell effect" comes from dieting research (Polivy and Herman; Cochran and Tesser 1996). Not verified in this pass; Soman and Cheema is the verified citation for the goal violation mechanism.
- Lally figures come from secondary summaries; primary paper not opened.
- No study found that tests "overdue" badges in task managers specifically.

## 5. Autonomy and systems that change a person's plan

### Takeaway
People accept an imperfect algorithm far more readily when they can adjust its output, even slightly, and mixed initiative design holds that automation should act only when it clearly beats doing nothing. I found no direct study showing that automatic rescheduling lowers adherence; the case for "never move a time" rests on these adjacent findings.

### Cited Findings
- MODERATE (3 incentivized studies). Dietvorst, Simmons and Massey 2018, "Overcoming algorithm aversion: People will use imperfect algorithms if they can (even slightly) modify them," Management Science 64(3):1155-1170, doi 10.1287/mnsc.2016.2643. People were considerably more likely to use an imperfect algorithm, and performed better, when they could modify its forecasts, even under severe limits on how much. Being able to modify raised satisfaction, belief the algorithm was superior and later choice of the algorithm. [IDEAS/RePEc](https://ideas.repec.org/a/inm/ormnsc/v64y2018i3p1155-1170.html); [Wharton PDF](https://marketing.wharton.upenn.edu/wp-content/uploads/2020/07/Dietvorst-Overcoming-Algorithm-Aversion.pdf)
- Foundational design principle (position paper, not an experiment). Horvitz 1999, "Principles of mixed initiative user interfaces," CHI 99:159-166, built around the LookOut scheduling system. Names poor guessing of user goals, poor weighing of costs and benefits of automated action and poor timing as failures of agents; an agent should act autonomously only when expected value beats inaction. [Microsoft Research](https://www.microsoft.com/en-us/research/publication/principles-mixed-initiative-user-interfaces/); [CHI 99 PDF](https://www.erichorvitz.com/chi99horvitz.pdf)
- MODERATE (CHI). Kocielnik, Amershi and Bennett 2019, "Will you accept an imperfect AI? Exploring designs for adjusting end user expectations of AI systems," CHI 2019. A scheduling assistant at 50% accuracy: versions tuned to avoid different error types produced very different perceived accuracy and acceptance; expectation setting designs shifted expectations as intended. [Microsoft Research](https://www.microsoft.com/en-us/research/?p=559869)

### Inferences
- Dietvorst is the cleanest support for "suggestions they can move": the movable slot is the small modification that makes people keep using the algorithm.
- By Horvitz's rule, silently moving a person's time requires the system to be confident the new time beats leaving it. A passed time has no future value, so dropping it is the low risk action; moving it into another slot is a guess about the person's week.
- Kocielnik suggests the error that matters is the one users notice. A suggestion that lands badly is a mild false positive; a time the system moved without asking is a visible intrusion.

### Gaps
- No experiment found that compares automatic rescheduling against user controlled rescheduling for adherence or trust. Flag this as an inference in the case study.
- Self determination theory sources on autonomy support (Deci and Ryan) and Amershi et al. 2019 CHI "Guidelines for human AI interaction" are relevant but not verified in this pass.

## 6. Chronotype and peak focus hours

### Takeaway
A synchrony effect exists, but it is moderate and inconsistent in younger adults. It is most reliable for people with strong morning or evening types and for effortful analytical work, which supports placing demanding tasks in self reported focus hours without overclaiming.

### Cited Findings
- MODERATE (review by the originators). May, Hasher and Healey 2023 review: performance tends to peak when the task aligns with the person's circadian arousal peak. Benefits are most robust for strong morning or evening types and for effortful, analytical tasks or ones that require suppressing distraction. [Review PDF](https://blogs.cofc.edu/mayc/files/2023/06/May-Hasher-Healey-2023.pdf)
- CONTESTED. Systematic review (Chauhan and colleagues, Kingston University), 65 studies: over 80% found no main effect of chronotype on cognition; 29 of 64 studies of adults 18 to 45 (45%) found a synchrony effect, mostly in attention, inhibition and memory. More consistent in older adults; moderated by task complexity and lighting. [Kingston record](https://researchinnovation.kingston.ac.uk/en/publications/chronotype-and-synchrony-effects-in-human-cognitive-performance-a/)
- Null for some domains: Rey Mermet and Rothen 2023 found no synchrony effect on attentional control. [Paper PDF](https://sonar.unidistance.ch/documents/329143/files/Rey-Mermet%20and%20Rothen%20-%202023%20-%20The%20Interplay%20of%20Time-of-day%20and%20Chronotype%20Result.pdf)
- Original lab study: May and Hasher 1998, Journal of Experimental Psychology: Human Perception and Performance (synchrony effects in inhibition). [PDF](https://hasherlab.psych.utoronto.ca/PDF/Synchony%20effects%20May%20Hasher%201998%20JEP%20HPP.pdf)

### Inferences
- Use self reported focus hours as a placement preference, not a performance promise. The honest claim is that it puts demanding work where the person says they think best, which is also an autonomy move (section 5).
- Most of the professional audience will be neutral types, for whom the effect is weakest. Self report is a reasonable proxy given the cost of measuring chronotype.

### Gaps
- No study found on focus hour placement for learning tasks in working adults specifically.
