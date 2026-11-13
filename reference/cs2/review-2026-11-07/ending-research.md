# CS2 ending: what hiring managers and design leaders need, and the options (12 Nov)

His ask, 11 to 12 Nov: the ending as built (version C, the Recalibration threshold) is awful as an idea.
Research what makes a case study ending land with a hiring manager or above, especially with no launch
numbers, and figure out the options.

## What the research says

Twelve sources: one survey backed (NN/g, 204 hiring managers), the rest practitioners who hire. No
controlled study of endings exists; treat it as consistent practitioner opinion.

1. **The ending is where the reader looks for the return.** What changed because of the work. A case study
   that stops once the design is finished reads as incomplete. NN/g's structure ends on impact and what was
   learned. Emily Backes calls the closing beat the return.
2. **Numbers are the default, but invented or decorative numbers are worse than none.** Round or
   unexplained figures read as fabricated and cannot be defended in the interview (UX University). A number
   with no baseline is a weak spot (learnui).
3. **No outcome data: use input metrics.** Scope, speed, what the work replaced, so the reader can judge
   the size of the contribution (Lucas Rappart, senior portfolio mistakes). Name the limit plainly instead
   of hiding it.
4. **Unlaunched is fine if it is said once and the reasoning carries.** Most hiring managers accept it
   (Sarah Doody, UX University, NN/g). Our hero already says it, so the ending must not say it again.
5. **Planned measurement shows measurement literacy.** Which metrics the work is meant to move and how
   success will be judged (Design Bootcamp checklist; Designer's Field Guide, using the format
   accomplished X as measured by Y by doing Z). Fuzzy success metrics bolted on at the end are a named
   weakness (Micka, hiring manager).
6. **For senior roles the strongest single signal is a short, specific reflection.** What you would do
   differently or what surprised you, three sentences at most, after the outcome evidence. If you cannot
   name anything, the reviewer assumes you lack distance from the work (Rappart, Backes, Leslie Yang, UX
   University). Generic lessons learned do not count; what broke and what you would change does.
7. **Above hiring manager (director, VP): scope and leverage.** Platform level problems, systems others
   rely on, influence on strategy (senior and staff checklists). Thin evidence, but consistent.

So the standard senior ending is: **the return (numbers if true, input numbers if not), then a short
honest reflection.** Version C is neither. It is one open threshold, which reads as a footnote: no return,
and the reflection is about the product, not about his judgment.

Our own tactics bank agrees (docs/about-source/case_study_tactics.html): with no outcome metrics you cannot
win on outcome, so change the ground to what was known, what was not and what the decision had to survive;
and metric theatre (real numbers dressed as outcomes) is banned.

## What the record can honestly claim

All from reference/cs2/reasoning/THROUGHLINES.md (T) and the Mondai archive (A, read 12 Nov).

- One number from the user, weekly capacity, drives six rules: Target, Pace, weekly sizing, Rollover,
  Recalibration and Reset. T section 2. CONFIRMED.
- The time mechanics were settled in about three weeks, 6 to 24 May 2026. T section 1. CONFIRMED.
- Unpaid, part time team, five people at the decision level. T section 6. CONFIRMED. (Team size only; no
  names, per the stranger rule.)
- Five Start of week states. Page and A. CONFIRMED.
- No user testing on any of it: every decision argued from research, comparable products, product logic and
  stakeholder review. T section 9. CONFIRMED. His own reason is in the record; not quoted here.
- Things he changed his mind on: capacity moved out of onboarding on 19 May and back on 31 May, and the
  cold start critique behind the move was never answered; flex points were his idea and he killed them.
  T section 8. CONFIRMED.
- The Recalibration threshold is directional, not committed. A line 621. CONFIRMED.
- No user outcome numbers exist. Do not invent any, and do not set success targets without him.

Watch out: T section 1 says three weeks before launch, his 7 Nov note says Mondai has not launched. Do not
use the word launch for the May dates.

Form check: Haven's numbers are a centred equation mid page (3 plus 3 equals 6 interviews) and its ending
is the two needs plus five cards. CS2 repeats neither. Numbers on the ending are shown as numbers, large,
the way every Metalab rebuild in build/ ends (a Results line, then three numbers with short labels); his
call 12 Nov. Length is Haven's ending, his call 12 Nov: a one or two line title, labels of a few words, a
two line close and nothing else, about 45 words in all outside the numbers. No paragraphs. (Corrected 12 Nov: this line used to say numbers must sit in a sentence, which pushed a draft
into paragraphs. fixes/2026-11-12-ending-wall-of-text.md.)

## The options

Each is a different structure. All are concepts, not final copy; wording gets drafted and checked once he
picks.

### Option A: the return in numbers, then one thing I'd change

The research's standard senior ending, using only input numbers that are true.
Structure: a one to six chain as the visual (one number the user gives, the six rules it drives), one
line on the conditions (settled in three weeks by an unpaid, part time team), then a two sentence
reflection: no user had tried a week before the rules were locked, and the first thing I would do with
another quarter is put a handful of users through two real weeks, starting with the Recalibration trigger.
What a reader repeats: one number runs the whole plan, and he knows exactly what is still untested.
Record: T sections 1, 2, 6 and 9; A line 621.
Risk: input numbers can look like a recap of the page; the chain has to read as scale, not as a summary.

### Option B: where I was wrong

Reflection led, no numbers. The headline names a call he reversed: capacity left onboarding and came
back twelve days later, and the critique that moved it was never answered. The body says what that taught
him about deciding without users, and what he would test first.
What a reader repeats: he will tell you where his own system is weakest.
Record: T section 8 and section 9.
Risk: ends on a doubt; a strong signal for design leaders, a riskier one for a recruiter skimming. His
call on how exposed he wants to be.

### Option C: the scorecard written before launch

Planned measurement. Two counts that would prove the framework works or does not: how many planned weeks a
user finishes, and whether work that rolls over gets done the next week or rolls again. For each, the
decision it tests and what result would make him change it.
What a reader repeats: he defined success before anyone could grade him.
Record: the two counts he accepted on 7 Nov (versions/hero-and-ending.md, ending A); Rollover and capacity
in A.
Risk: the 9 Nov version of this failed the reader check for showing no decision; each count must name the
decision it puts on trial. Target numbers would need his input or stay out.

## His pick, 12 Nov

A (question card). Next: three versions of A that differ in structure, drafted and checked per
WORKING_LOOP, before any build.

## Recommendation

A. It is the shape the research says senior reviewers expect (return, then reflection), it gives him the
numbers he wants without inventing any, and its reflection is concrete because the record holds the gap
(no testing) and the first test he would run. B is the boldest and would win with a design director, but
it gives a skimming recruiter no return at all. C is close to a version that already failed.

What would change this: if he has any real number from the team since May (a build milestone, a demo,
a stakeholder decision the framework unblocked), it replaces the input numbers in A as the return.

## Sources

- NN/g, 5 steps to creating a UX design portfolio (survey of 204 hiring managers): https://www.nngroup.com/articles/ux-design-portfolios/
- NN/g, UX portfolios: what hiring managers look for: https://www.nngroup.com/videos/ux-portfolios-hiring/
- Lucas Rappart, 7 product designer portfolio mistakes that block senior roles: https://www.lucasrappart.com/blog/portfolio-mistakes-senior
- Emily Backes, How to fix UX case studies: https://emilybackes.design/post/ux-case-studies-broken
- Leslie Yang, What a hiring manager looks for in product design portfolios: https://leslieyang.substack.com/p/what-a-hiring-manager-looks-for-in
- UX University, Your case study is lying: https://newsletter.uxuniversity.io/p/your-case-study-is-lying-and-everyone
- Micka, What really matters when hiring product designers: https://micka.substack.com/p/what-really-matters-when-hiring-product
- The Designer's Field Guide, Design job seekers often fail to talk about impact: https://thedesignersfieldguide.substack.com/p/design-job-seekers-often-fail-to
- Sarah Doody, Can I put projects in my UX portfolio that didn't launch: https://www.linkedin.com/posts/sarahdoody_can-i-put-projects-in-my-ux-portfolio-that-activity-6982756151285145600--1nB
- Design Bootcamp, Case study checklist (search summary only, page refused the fetch): https://medium.com/design-bootcamp/landing-your-next-product-design-job-case-study-checklist-d5270a0c40eb
- learnui.design, What makes a great UX/UI portfolio case study (search summary only): https://learnui.design/blog/great-ux-ui-portfolio-case-study.html
- UX Playbook, 6 UX portfolio rules (search summary only): https://uxplaybook.org/articles/6-ux-portfolio-rules-get-hired-2026
