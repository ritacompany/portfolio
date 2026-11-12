# CS2 ending: which test numbers to collect, and how (12 Nov)

His ask: the ending needs a result. Mondai has no users yet, and drafts that used product mechanics as the
result read as a capacity recap. He can recruit a handful of people. This plan says which numbers to
collect from them, how to collect them in about two weeks and how each could read on the ending.

Builds on `ending-research.md` (the ending is the result, then a short honest reflection) and on round 4 in
`../versions/ending.md`. Nothing below is a result. Every `[x of 8]` is a placeholder until the test runs.

## The answer in short

Lead with number 1. It is the only one that measures what users do over real weeks, it tests the decision
every other rule rests on (one declared number, capacity) and it answers the gap the record admits: no user
had lived a week with the plan before the rules were locked (THROUGHLINES s9). Numbers 2 and 3 come from the
same kickoff session at no extra cost and give the reflection something concrete. Number 4 is optional and
the weakest, because it is a stated choice.

On the page, use one number as the result and at most one more in the reflection. Haven owns the stat
block, so numbers sit in a sentence, never a stat row.

## How a small n reads to a senior reviewer

What is credible at 5 to 10 people:

- **Counts with the denominator, in words.** Write "6 of 8", never "75%". At five users the only possible
  rates are 0, 20, 40, 60, 80 and 100 percent, and a 100 percent result at that size can look too good to be
  true (MeasuringU, small n). NN/g treats small qualitative studies as insight, not statistics, with no formal
  assurance they represent the population (NN/g, quant vs qual).
- **Behaviour over opinion.** A prediction a user gets right or wrong, or hours they logged, is harder to
  dismiss than a rating. NN/g favours observed behaviour over stated preference in its own iterative case
  study (NN/g, iterative design case study).
- **Large effects only.** Small samples are statistically valid but only detect large differences
  (MeasuringU, 30 participants). Intervals on a completion rate at this size are typically 20 to 30 points
  wide (MeasuringU, small n), so the page claims a pattern, never a precise rate. Know the adjusted Wald
  interval for the interview (Sauro and Lewis 2005); do not put it on the page.
- **Criteria set before the test.** Write what would confirm and what would break each decision before the
  first session, and say so on the page. NN/g names "research rather than validate" as the first guard
  against confirmation bias (NN/g, confirmation bias). Lean UX frames every design bet as a hypothesis with a
  signal that says whether it was right (Gothelf, Lean UX; Truth Curve).

What reads as metric theatre here:

- **SUS, SEQ and time on task.** They are valid at small n (SUS reliability does not depend on sample size;
  MeasuringU, SUS) but they measure ease, and no decision on the page claims to be about ease. A SUS of
  [x] tells a director nothing about whether one declared number can run a plan. Skip them.
- **Preference between two versions** with no behaviour behind it, and any percentage from fewer than ten
  people.
- **Stated intent as a result.** "Would you use this" answers are inflated by politeness and social
  desirability (NN/g, Hawthorne effect and survey challenges), and intentions are a weak guide to later
  behaviour: about half of people with good intentions never act on them, and the gap is widest for
  socially desirable intentions (Sheeran 2002; Webb and Sheeran 2006, via NCI summary). This is why number 4 ranks last.

## The shortlist

### Number 1: the hours users type against the hours they give

**Decision it tests.** Capacity is a number the user declares, typed as an exact figure so they count, and
it sets Target, Pace, weekly sizing, Rollover, Recalibration and Reset (THROUGHLINES s2 and s7; Personalized
timeline copy). The archive names the risk itself: planning fallacy.

**Why a senior reviewer cares.** It puts the foundation on trial, not a screen. If the declared number is
wrong, all six rules are wrong together, and the round 4 drafts already say so. The research gives a real
reason to doubt the decision: people underestimate how long their own tasks take (Buehler, Griffin and Ross
1994), and people's own estimates of their weekly hours miss what a diary records, overshooting most for
those with long weeks (Walthery and Gershuny 2019). A designer who tests the assumption the literature says is most likely to fail
is showing judgment, which is what a director reads for.

**Method.** A two week diary study with a Wizard of Oz first week. At a kickoff call the participant picks a
real goal they are working toward (learning a skill, a job search, a portfolio), reads the capacity screen
copy from the prototype and types their hours. He writes their week as 3 to 6 tasks for that goal, sized to
the number, the way the plan would. Each evening they log the minutes they gave the goal that day, zero
included, in a one question form sent by text (NN/g diary studies: signal based logging suits activities
people might forget to log). Each Saturday one extra question: which tasks are still open.

**Sample.** Recruit 10, report on everyone who logs at least 12 of 14 days. NN/g puts small discovery diary
studies at 5 to 12 people and says to over recruit because longer studies lose people. The denominator is
the number who finished, stated on the page. The criteria below are written for 8 finishers. Write
down before the first kickoff how they scale to 6, 7, 9 or 10, so nothing gets adjusted after the data is in.

**Script.**
- Kickoff, capacity: "Think about a normal week for you right now. How many hours a week can you give to
  [their goal]? Type an exact number." (Use the screen's own copy and input. Do not discuss the number.)
- Kickoff, follow up after they type: "Walk me through how you got to that number." Record verbatim.
- Daily text, 8pm: "How many minutes did you spend on [their goal] today? Zero is a fine answer."
- Saturday text: "Which of this week's tasks are still open?"
- Closing call: "Here are your two weeks next to the number you typed. What do you make of that?"

**Measure.** For each person, hours given in week 1 and week 2 divided by hours declared. Report two counts:
how many gave within 20 percent of their number across the two weeks, and how many fell under half their
number in at least one week (the Recalibration line, archive line 621).

**Confirms the decision.** At least 6 of 8 give within 20 percent of their declared hours across both weeks.
The declared number is a sound base for the plan.

**Breaks the decision.** 4 or more of 8 give under 70 percent of their declared hours in both weeks. The
exact number does not stop over promising, and every week the plan builds is too full from week one. The
change he would weigh: size the first week below the declared number, or let Recalibration step in after
two short weeks instead of three. Between these two lines the result is mixed and the page says so.

**How it could read on the ending.** "Over two real weeks, [x of 8] people gave within a fifth of the hours
they typed, and [y of 8] gave under half in at least one week, so [what he kept or changed]."

### Number 2: whether users can predict what a short week does to their dates

**Decision it tests.** Two dates, not one: the target holds steady through an ordinary week and the pace
moves, so a slip stays visible (Falling behind part 1; archive lines 76 to 86). Target versus pace is not
taught in onboarding and is meant to make sense on the first real Sunday (archive line 310).

**Why a senior reviewer cares.** A correct prediction is behavioural evidence that the user's mental model
matches the system. NN/g defines a mental model as what lets a user predict how a system will work (NN/g,
mental models). It tests a decision a reviewer may doubt on first read: two dates sounds like more to
understand.

**Method.** Moderated remote session, part of the kickoff call, on the Figma prototype. Show the Action Hub
rail with the Pathway target, the Pathway pace and Ahead of target. No explanation first. Then a prediction
question, then reveal the Rollover Start of week screen and ask them to explain what moved.

**Sample.** The same 8 to 10 as number 1, run before they see any other part of the plan so nothing primes
them.

**Script.**
- "Take a look at this screen. What are these two dates telling you?" Record verbatim.
- "Say one of this week's Action Items is still unfinished on Saturday night. What happens to each of these
  dates?" Ask for each date separately.
- Reveal the Rollover screen: "Here's what Mondai shows the next Sunday. Is that what you expected?"
- Never correct them or say whether an answer was right.

**Measure.** Count a prediction correct when the user says the pace moves later and the target stays put,
in their own words, before the reveal. Code it with a second person who did not run the session, from the
verbatim notes, and report only where both agree.

**Confirms the decision.** At least 6 of 8 predict both dates correctly without help.

**Breaks the decision.** 4 or more of 8 expect the target to move, or cannot say what the second date is.
Then the stable target does not teach the slip on its own. The change he would weigh: name the gap on the
first Sunday the dates diverge, as the archive's deferred teaching moment plans, or show one date until
then.

**How it could read on the ending.** "Shown the two dates cold, [x of 8] predicted that a short week moves
the pace and leaves the target alone."

### Number 3: whether Rollover reads as a guide or a penalty

**Decision it tests.** Unfinished work moves into the next week on its own, with no decision moment and no
math on screen, because asking a user who is already behind reads as a gate, not a guide (Rollover copy;
archive line 112). The killed version was a modal with "4 carried + 3 new = 7 items".

**Why a senior reviewer cares.** It is the decision with the clearest stated intent (guide, not penalty),
so it can be checked against that intent directly. It is also the call he made against a stakeholder's
earlier design, which a director will want evidence for.

**Method.** Same kickoff session, after number 2. Show the Rollover Start of week screen. Ask an open
question first, then a short word choice: 12 words, half guide and half penalty, in random order, pick
three. NN/g recommends trimming reaction card lists to the words that fit what is being measured, with a
mix of positive and negative words and random order (NN/g, desirability toolkit; Benedek and Miner 2002).
Suggested words, fixed before the test: supportive, fair, calm, flexible, clear, encouraging, behind,
judged, pressured, failing, confusing, strict.

**Sample.** Same 8 to 10.

**Script.**
- "In your own words, what is this screen telling you?"
- "How does it make you feel about last week?"
- "Pick the three words from this list that best describe this screen." Then: "Why those three?"

**Measure.** Count a person as reading it as a guide when their open answer has no failure or blame
language and at least 2 of their 3 words are from the guide half. Code the open answers blind, as in number
2.

**Confirms the decision.** At least 6 of 8 read it as a guide.

**Breaks the decision.** 4 or more of 8 read it as a penalty. Silent absorption is not enough on its own if
the screen still feels like a report card. The change he would weigh: the copy and the magenta tag first,
before the mechanic.

**How it could read on the ending.** "[x of 8] described the Rollover screen as the plan adjusting for them,
not as a mark against them."

### Number 4 (optional): whether users take a Recalibration suggestion made from their own weeks

**Decision it tests.** When short weeks keep happening, the plan suggests a lower capacity from the user's
own average, and they can take it, set their own or skip it (Start of week 4 of 5). The threshold itself is
directional (archive line 621) and cannot be tested in two weeks, since it needs three.

**Why a senior reviewer cares.** It tests whether a system can ask a user to lower their own ambition
without losing them, which is the hard part of any adaptive plan.

**Method.** Closing call, Wizard of Oz. Before the call he fills the Recalibration screen in Figma with the
participant's own declared number and their real two week average from the diary. Only show it to people
whose average fell under their number. Ask them to choose.

**Sample.** Only the participants whose weeks fell short, so the denominator will be small and must be
stated.

**Script.**
- "This is what Mondai would show you next Sunday. What would you do?"
- After they choose: "What made you pick that?"

**Measure.** Count of each choice: take it, set their own, skip.

**Confirms the decision.** Most who see it take the suggestion or set a number of their own below the old
one.

**Breaks the decision.** Most skip it, or read it as being told they failed. The change he would weigh: how
the screen frames the user's own average.

**How it could read on the ending.** "Of the [y] people whose weeks fell short, [x] took a lower number when
the plan showed them their own average."

Why it ranks last: it is a stated choice in a call with the designer present, and stated intentions predict
behaviour weakly (Sheeran 2002). Use it in the reflection at most, never as the result.

### Cut, and why

- **Start of week screens understood**, as a test of its own. Numbers 2 and 3 already test the Rollover
  screen, the one most users will see. Testing all five states needs a scenario per state and doubles the
  session for little extra on the ending.
- **The Recalibration threshold.** Three weeks cannot happen inside two. Say so if asked.

## Two week plan

Run by him alone, about 2.5 working days of his time across the fortnight, with the prototype as it is.

- **Days 1 to 3, set up.** Post the screener (below). Pick 10 who fit, aiming for a spread of steady and
  irregular weeks. Write the criteria for all four numbers into a private file before anyone is tested.
  Build the kickoff frames: capacity screen, Action Hub rail, Rollover Start of week, word list. Run one
  pilot with someone outside the sample and fix the script.
- **Days 4 to 5, kickoff calls.** 45 minutes each, recorded with consent, in this order: capacity (number
  1), two dates (number 2), Rollover (number 3), then write their first week together. About 8 hours.
- **Days 5 to 18, the diary.** Daily 8pm text, one question. Saturday question on open tasks. On Sunday of
  week 2 he writes their second week from what is still open, the way Rollover would. A one line nudge to
  anyone who misses two days in a row.
- **Days 18 to 19, closing calls.** 20 minutes each: their two weeks next to their number, then number 4
  for those whose weeks fell short. About 3 hours.
- **Day 20, analysis.** Second coder for numbers 2 and 3. Compare each count to the criteria set on day 3.
  Write the results into the private file.

Incentive: NN/g's guide for a general US sample is about $40 per hour of total commitment, paid in
instalments for studies longer than a week (NN/g diary studies). Total commitment here is roughly 1.5 to 2
hours each. The amount is his call.

Tools: video calls with the Figma prototype shared on screen for the sessions (moderated beats unmoderated
here, because numbers 2 and 3 depend on open answers and follow ups). A free form tool and text reminders
for the diary. Lyssna's free plan (15 self recruited responses, 3 seats, per its pricing page on 12 Nov)
could run an unmoderated version of number 2 later if he wants a second round; Maze's free limits could not
be confirmed from its own page.

Privacy: the repo is public. No participant names, recordings, diary entries or per person numbers go in git.
Raw data stays outside the repo; only the final counts reach the case study.

## Recruiting screener

Who: people the hero names, newcomers from underrepresented backgrounds working their way into tech, with
weeks that are not all the same. Recruit through friends of friends and community groups, not his own close
friends or anyone who knows Mondai's design. Friends and family soften their criticism, and a convenience sample may not match the real audience
(practitioner sources below; NN/g notes comfort with the researcher changes behaviour).

Rules from NN/g: ask about past behaviour, not yes or no; use open questions and plausible distractors; do
not reveal what the study is about; drop anyone who ticks every option (NN/g, screening questions).

1. What do you do for work or study right now? (open)
2. In the last three months, which of these have you spent time on outside work or school? Tick all that
   apply: a fitness goal, learning a new skill for a job, a side business, a creative hobby, looking for a
   new job, volunteering, none of these. (Keep anyone who ticks the skill or the job, and not everything.)
3. Tell us about the last time you worked toward a goal like that. What was it and how did you fit it into
   your week? (open; keep specific answers, drop one word answers)
4. Which best describes your weeks lately? Mostly the same each week / Some weeks are much busier than
   others / Hard to predict. (Recruit a mix; at least half from the last two.)
5. Are you currently trying to move into a role in tech, or planning to in the next year? (Asked late so
   earlier answers are not shaped by it.)
6. Do you work in design, UX research or product, or have you seen designs for Mondai? (Exclude yes.)
7. Can you join two video calls of about 45 and 20 minutes and answer one text a day for two weeks?

## If a result comes back bad

A broken decision plus what he changed is a strong ending, likely stronger than a clean pass.

- The ending research already found that the strongest single signal for senior roles is a short, specific
  reflection on what broke and what you would change, and that generic lessons learned do not count
  (ending-research.md item 6: Rappart, Backes, Leslie Yang, UX University).
- A pass on a test he designed, ran and coded himself is easy to discount. A fail with the criteria written
  first is not: it proves he was testing, not validating, which is NN/g's first guard against confirmation
  bias (NN/g, confirmation bias:
  https://www.nngroup.com/articles/confirmation-bias-ux/). Gothelf's Truth Curve says the same about early evidence: when it comes
  back negative, stop, reassess and possibly drop the idea (Gothelf, Truth Curve, practitioner: https://jeffgothelf.com/blog/the-truth-curve/).
- The shape on the page: the decision, the criteria, the result as a count, the change. For number 1 that
  could read: "I'd assumed typing an exact number would stop people over promising. [x of 8] still gave
  under [y] of the hours they typed, so the first week now [the change]." Only what actually happened goes
  in.
- A mixed result is reported as mixed. Spinning a 4 of 8 into a pass is exactly the metric theatre the
  research warns about.
- Do not run a second round just to replace a bad number. If he changes the design and retests, the ending
  can carry both rounds.

## Sources

Peer reviewed or NN/g and MeasuringU level:

- NN/g, Quantitative vs qualitative usability testing: https://www.nngroup.com/articles/quant-vs-qual/
- NN/g, Why you only need to test with 5 users: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- NN/g, Diary studies: https://www.nngroup.com/articles/diary-studies/
- NN/g, Screening questions to select research participants: https://www.nngroup.com/articles/screening-questions-select-research-participants/
- NN/g, Wizard of Oz method: https://www.nngroup.com/articles/wizard-of-oz/
- NN/g, Mental models: https://www.nngroup.com/articles/mental-models/
- NN/g, Confirmation bias in UX: https://www.nngroup.com/articles/confirmation-bias-ux/
- NN/g, Microsoft desirability toolkit: https://www.nngroup.com/articles/microsoft-desirability-toolkit/
- NN/g, Hawthorne effect and observer bias: https://www.nngroup.com/articles/hawthorne-effect-observer-bias-user-research/
- NN/g, 10 survey challenges (social desirability): https://www.nngroup.com/articles/10-survey-challenges/
- NN/g, Case study, iterative design and prototype testing: https://www.nngroup.com/articles/case-study-iterative-design-prototyping/
- MeasuringU, Small n usability tests: https://measuringu.com/small-n/
- MeasuringU, Do statistics really require 30 participants: https://measuringu.com/do-statistics-really-require-30-participants/
- MeasuringU, Single Ease Question: https://measuringu.com/seq10/
- MeasuringU, System Usability Scale: https://measuringu.com/sus/
- Sauro and Lewis 2005, Estimating completion rates from small samples using binomial confidence intervals (HFES): https://lgreski.github.io/datasciencedepot/references/EstimatingCompletionRatesSauro-Lewis.pdf
- Buehler, Griffin and Ross 1994, Exploring the planning fallacy (JPSP 67, 366 to 381), cited with Buehler's own summary of the bias for SPSP: https://spsp.org/news-center/blog/buehler-planning-fallacy
- Walthery and Gershuny 2019, Improving stylised working time estimates with time diary data (Social Indicators Research 144): https://pmc.ncbi.nlm.nih.gov/articles/PMC6609582/
- Sheeran 2002 (intention and behaviour relations) with Webb and Sheeran 2006, summarised by the US National Cancer Institute: https://cancercontrol.cancer.gov/brp/research/constructs/intention-expectation-willingness/
- Benedek and Miner 2002, reaction cards, summary: https://en.wikipedia.org/wiki/Microsoft_reaction_card_method

Practitioner (opinion, not research):

- Jeff Gothelf, The truth curve (practitioner): https://jeffgothelf.com/blog/the-truth-curve/
- Jeff Gothelf, Lean UX hypothesis format, book quote (practitioner): https://www.goodreads.com/quotes/7498863-generally-hypothesis-statements-use-the-format-we-believe-this-statement
- Strings, Why friends and family are not good UX testers (practitioner): https://strings.substack.com/p/usability-sessions-two-rules
- Architecting usability, How to recruit users for usability testing, convenience sampling (practitioner): https://architectingusability.com/2012/06/13/how-to-recruit-users-for-usability-testing
- Lyssna pricing page, free plan limits, read 12 Nov (vendor): https://www.lyssna.com/pricing
- The ending research sources (NN/g survey of 204 hiring managers plus practitioners) are listed in ending-research.md and not repeated here.

Not verified, so not used: exact Maze free plan limits (third party listings disagree and the official page
did not render prices); a hiring manager claim that strong portfolios analyse whether decisions were right
or wrong (the page refused the fetch).
