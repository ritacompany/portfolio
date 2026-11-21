# CS2 hero and ending, worked as blocks (9 Nov)

His ask, 8 Nov: the hero (the shared left line and the right column) and the ending were only ever drafted
inside the copy review; write them properly as blocks. Source of the current text:
reference/cs2/review-2026-11-07/final-copy.md. Working files, checks and the review page builder:
reference/cs2/review-2026-11-07/hero-ending/ (versions.json is the source of the text below).

His past comments respected:
- Round 1 hero read as pretentious and oddly worded. These use his voice (docs/VOICE-draft.md): the user as
  subject, the reason inside the sentence with so and because, no tidy contrasts, no kicker lines.
- A balance modelled on Haven's hero: left line Designed as, who it is for and what it is; right column the
  situation, then the project's context. The left line is shared by every Mondai case study, so it says only
  what Mondai is and who it is for, nothing about the framework.
- The ending closes a first build: no metrics and no before and after; Mondai has not launched and has no
  users (his note, 7 Nov).
- Nothing repeats the page body. The hero comes first, so it uses no product term the page introduces later
  (checked by run-checks.mjs). The hero says once that Mondai has not launched, so no ending says it again.
- Version A of the 7 Nov ending, which he accepted, is the starting point of ending A, not a fixed text.

## Hero

### A: the user's situation, then the project (Haven's order). Pick.
Left: Designed as an AI guide for newcomers from underrepresented backgrounds finding their way into tech.
Right 1: There’s no set path into tech, so Mondai’s AI writes each user a curriculum for the career they choose, and it can take months. Most users don’t have the same hours free every week, so a plan that expects a steady pace would leave them behind from week one.
Right 2: When I started on the MVP, the curriculum was a list in a fixed order, with calendar integration planned and nothing connecting them. I designed the weekly framework that turns it into weeks each user can finish. Mondai hasn’t launched, so this case study shows the reasoning rather than results.

### B: what existed, the question it left, then the answer
Left: Designed as an AI career navigator for the next generation of hustlers from underrepresented backgrounds.
Right 1: When I started on Mondai’s MVP, the curriculum its AI writes for each user already had a fixed order, and calendar integration was planned. There was no way yet to decide how much of it belongs in a single week, and the whole curriculum can take months.
Right 2: The answer depends on the user, because most of them don’t have the same hours free every week. So I designed a weekly framework that plans each week around the hours they say they can give and still holds when a week runs short. Mondai hasn’t launched, so what follows is the reasoning behind each decision rather than results.

### C: two users, one curriculum
Left: Designed as a way for newcomers from underrepresented backgrounds to find a path into tech that fits around their life.
Right 1: Two users can choose the same tech career and have very different weeks. One can give 5 hours a week and the other 15, and either can have a week where almost nothing gets done. Mondai’s AI writes each of them a curriculum that can take months, so one framework has to work for both.
Right 2: I designed the weekly framework that turns it into weeks they can finish, planned from the hours they say they can give. Mondai hasn’t launched, so this case study shows the reasoning: how much lands in a week and what happens when a week runs short.

## Ending

### A: what success is, the two counts and where I'd look first. Failed the re-check (no decision, 3 of 3).
Eyebrow: Where it stands
Headline: The framework is meant to give each user weeks they can finish, so the first thing I’ll count is how many they do.
Body 1: Testing with the first users comes next, and I’ll count two things: how many planned weeks close with every Action Item done, and how often a Rollover Action Item gets done in the week it lands in.
Body 2: Those counts become the baseline. If they’re low for most users, the first place I’d look is how much effort each Action Item is given, since that decides how many fit into a week.

### B: the hardest call and the test it still needs
Eyebrow: Looking back
Headline: The hardest call was what to do when a user can’t finish a week, because every answer costs them something.
Body 1: I chose to move the work forward and keep the target where it was, and it’s the decision I most want real weeks to test.
Body 2: What I’ll be looking for is whether Rollover helps a user recover or slowly piles up on them: whether a user whose work rolls over finishes the next week, or rolls it over again.

### C: the least settled number and what would move it. Pick.
Eyebrow: What’s still open
Headline: The least settled rule is the one for when Recalibration steps in, because no user had lived a week with the plan yet.
Body 1: Right now it steps in after three weeks in a row where a user finishes less than about half the hours they set. That line is a starting point, and the first users’ weeks will move it.
Body 2: It comes too early if most users who see it skip it and catch up anyway, and too late if users stop coming back before it ever shows.

## Where every claim traces

Mondai archive is mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md in ritacompany/mondai (Archive:line), read 9 Nov.
- AI guide; Mondai behaves like a guide, not a curriculum: Archive:12 and :504. CONFIRMED.
- Audience, underrepresented backgrounds: Archive:11 and :446. CONFIRMED. Newcomers is a PARAPHRASE of
  emerging technologists and of his 28 Aug correction (younger, entering tech for the first time, a
  situation rather than a person; CS2_COMPREHENSION.md).
- AI career navigator for the next generation of hustlers: his own hero line in the old frame
  (review-2026-11-07/cs-text.md). CONFIRMED as his words.
- No set path into tech: his 28 Aug correction, only the present condition is assertable, there is no
  defined path (CS2_COMPREHENSION.md). CONFIRMED.
- A curriculum for the career the user chooses: career selection generates the journey (archive, Career
  selection and switching). CONFIRMED. Can take months: ESTIMATE (a Pathway runs many weeks; the journey
  mock targets June 2027).
- Users without a steady week; a fixed cadence would set them up to fail from week one; 5 against 15 hours:
  Archive:68. CONFIRMED. Either can have a week where almost nothing gets done: PARAPHRASE of structurally
  inconsistent lives (Archive:68).
- When he started: fixed order, calendar integration planned, no framework connecting them: his Background
  text in the old frame (outline/frame-changes-22oct.md line 8). CONFIRMED as his words.
- Mondai has not launched: his note 7 Nov (HANDOFF). CONFIRMED.
- Ending A and B measures and tests: proposals for him (the two counts are the ones he accepted on 7 Nov).
  Effort decides how many Action Items fit: Archive:104 and the Personalized timeline block. CONFIRMED.
- Ending B, the hardest call: ASSUMED, his judgment to confirm. Move the work, keep the target: Archive:84
  and :110, Rollover block. CONFIRMED.
- Ending C, three weeks in a row under about half the hours set; the threshold is directional and pending
  confirmation: Archive:134. CONFIRMED. The page itself only says when it keeps happening.

## Checks

Humanizer (loaded as the skill), dashes and Oxford commas, his wording and casing, fit and the three run
reader check: results in reference/cs2/review-2026-11-07/hero-ending/CHECKS.md.
