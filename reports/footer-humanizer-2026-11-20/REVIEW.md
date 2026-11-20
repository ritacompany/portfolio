# Footer humanizer pass, framework case study (20 Nov)

Source read 20 Nov from Figma file 5RO0m4bYYrTvbiaOgaU3tI, frame "mondai framework cS most current"
6331:20607: the Strip instance 6331:25757 and the Footer instance 6331:25758 (variant Other pages,
main component 6331:20545). The footer component set 6228:117799 has the same words in both variants;
its Home variant only swaps the nav order. The built page (site/mondai/framework/index.html) differs in
three places: the nav ends on Contact instead of Testimonials, there is a Links label above LinkedIn and
the copyright line is in normal case.

What the footer closes: the page ends on the test result ("All three passed") and the one rule that
changed (Recalibration now steps in after two short weeks). The reader arriving here has just finished
the case study. The footer's one job is to tell a hiring manager, mostly in New York, who you are
looking for and how to reach you. Only one line in it does that job: the location sentence. Everything
else is navigation and labels.

About page record respected: Chicago belongs in contact, which is where this is. Usable claim used:
"Chicago, targeting New York". Nothing from the rejected or dead lists is reintroduced.

## What is wrong, line by line

| Line in his frame | What is wrong, in plain words | Fix |
|---|---|---|
| `I’m currently living in Chicago, IL` | "Currently" says nothing that "living" does not already say. "Chicago, IL" is how you write an address on an envelope, not how you talk; nobody needs the state. The line ends with a stray space in Figma. | "I live in Chicago." |
| `and seeking opportunities in NYC.` | The weakest line in the footer. "Seeking opportunities" is cover letter filler: it is the phrase every job seeker uses, and it does not say what kind of opportunity. A reader cannot tell if you want a product design job, freelance work or a coffee. It also starts with a lowercase "and", so the white line, the one the design emphasizes, is half a sentence. "NYC" is slang shorthand sitting next to the postal "Chicago, IL"; the two halves are in different registers. | "I’m looking for product design roles in New York." Its own sentence, so the white line stands alone. |
| `Contact` (label above the email) | Fine as a small label. It is one of three "Contact"s in the same block (label, button, and the nav link on the built page), which is where the repetition starts to show. | Keep. |
| `hello@chadwickfenner.com` | Fine. | Keep. |
| `CONTACT` (button) | It repeats the label right above it and does the same thing as the email link, so it adds a word without adding meaning. A button should say what happens when you press it: it opens an email. All caps also breaks your sentence case rule unless it is a type style. | "Email me" |
| `Back to top` | Fine. | Keep. |
| `Home` | Fine. | Keep. |
| `About` | Fine. | Keep. |
| `Selected works` | "Works" is gallery and agency speak; in plain English it is "work". The top nav on the homepage already says "Work", so the footer calls the same place by a different name. | "Work" |
| `Testimonials` | Not a writing fault, but the homepage hides that section until you finish it, so this link goes nowhere. The built page has Contact here instead. | Keep the word; show it only when the section ships. |
| `@2026, Chadwick FENNER` | "@" is the at sign, not the copyright sign. The comma does not belong. "FENNER" in caps next to "Chadwick" in normal case looks like a type slip (the built page already fixed it). | "© 2026 Chadwick Fenner" |
| `10:24pm CST` | A time with no place reads as a random number. The trick only works when the reader knows it is your local time, and the older master footer said so ("CHICAGO, IL // 10:24PM CST"). "CST" is also wrong for half the year; the built clock switches to CDT, which most readers will not parse anyway. | "10:24pm in Chicago" (the built clock keeps ticking; only the label changes) |
| `Linkedin` | The brand is spelled LinkedIn, capital I. | "LinkedIn" |
| `Resume` | Fine. | Keep. |
| `Explore more case studies` | "Explore" is the stock button verb, and this is a label, not a link: nothing happens when you press it. | "More case studies" |
| `MONDAI: DESIGN SYSTEM CASE STUDY` | "Case study" repeats the label in the middle. The two sides also follow different patterns: this one names the format, the right side names the product. | "Mondai: design system" |
| `HAVEN: LGBTQIA + youth app` | The spaced "+" splits the acronym; it is written LGBTQIA+. Mixed caps with the left side ("HAVEN" caps, "youth app" lower) unless a type style sets it. | "Haven: LGBTQIA+ youth app" |

The pattern behind it: the footer's only real sentence was written as a form field ("currently living
in", "seeking opportunities") rather than as you talking, and the labels around it were never checked
against each other, so the same thing has two names (Work and Selected works, Contact three times) and
small slips survived (the @ sign, Linkedin, the spaced plus).

## Draft

- I live in Chicago. / I’m looking for product design roles in New York.
- Contact / hello@chadwickfenner.com / Email me
- Back to top / Home / About / Work / Testimonials
- © 2026 Chadwick Fenner / 10:24pm in Chicago / LinkedIn / Resume
- Strip: Mondai: design system / More case studies / Haven: LGBTQIA+ youth app

## Audit

What still reads as AI or as filler:
- Two sentences, both opening "I": a little flat, but it is how people talk, and the line break makes
  each its own beat. Kept.
- "Looking for product design roles" is plain but still the generic job seeker shape. The fix it would
  take is saying what kind of product or team you want, which is a fact only you hold. Left plain
  rather than invented.
- Chicago now appears twice (location line and clock). Kept: the clock means nothing without its city,
  and the location line is the one people read.

Does the rewrite state anything not in the source? "Product design" narrows "opportunities". It comes
from the repo, not from invention: the case study brief calls you a product designer
(docs/about-source/CASE-STUDY-TACTICS-BRIEF.md) and your 15 Oct notes say "seeking roles in NYC"
(reference/launch/2026-10-15-progress-notes.md). Nothing says you are moving, so no line implies a move.

## Final

Recommended:

- Location, gray line: I live in Chicago.
- Location, white line: I’m looking for product design roles in New York.
- Button: Email me
- Nav: Work in place of Selected works
- Bottom row: © 2026 Chadwick Fenner · 10:24pm in Chicago · LinkedIn · Resume
- Strip: Mondai: design system · More case studies · Haven: LGBTQIA+ youth app
- Unchanged: Back to top, Home, About, Testimonials, the Contact label, the email

One alternative for the location line, New York first, for the reader who only reads one line:
Looking for product design roles in New York. Based in Chicago.

## Fact trace

- Chicago, New York: about-page record, usable claim "Chicago, targeting New York".
- Product design roles: docs/about-source/CASE-STUDY-TACTICS-BRIEF.md ("product designer");
  reference/launch/2026-10-15-progress-notes.md ("seeking roles in NYC").
- Email, LinkedIn, Resume, nav targets: his Figma footer and the built page.
- Work as the nav name: site/index.html top nav.
