# Haven case study, final copy

The copy source for the Haven case study. Pulled 9 Nov from site/haven/index.html, in page order, every visible
eyebrow, headline, body, caption, card and label. Image alt text is listed after each block's copy, marked Alt.
Text is verbatim from the page, typos included (pull-check.mjs proves each line is on the page). The page's
Figma master is Haven CS Master, node 5733:19874, page CS, file 5RO0m4bYYrTvbiaOgaU3tI; the coded page is what
this file was pulled from. The copy went through earlier AI edit passes, so these are not guaranteed to be his
own words.

His marks from the tactics pass (reference/haven/tactics/marks.json) were applied 9 Nov: 19 accepted, the MVP body rewritten from his note, Usability testing Insight 1 kept until he answers.

The shared nav and footer (About, Work, Contact, the email, Chicago and NYC line, LinkedIn, Resume) are site
chrome, not case study copy, and are left out.

## Hero
Title: Haven CS
Meta: Scope | Solo project
Meta: Affiliate | CareerFoundry
Meta: Focus | Research, strategy and design.
Left: Designed as a way for LGBTQIA+ youth to gain access to affirming environments.
Right 1: For many LGBTQIA+ teenagers, finding a sense of belonging and acceptance can be a difficult and isolating experience. The lack of affirming environments at home and in their communities is linked to a higher risk of suicide.
Right 2: This project was developed as part of a UX bootcamp. The brief was to create a functional product for a specific user group and include a way to connect users with an expert, which Haven calls a Confidante. Just having Haven on their phone could put a user at risk, so I designed it to stay hidden and to keep every chat by text.

## The data
Eyebrow: The data
Headline: The Trevor Project studied how affirming spaces and accepting adults relate to that risk.
Links intro: Learn more about what you can do to support LGBTQIA+ youth at the links below:
Links: The Trevor Project | PFLAG | Family Acceptance Project
Card 1 title: Affirming spaces
Card 1 number: 35%
Card 1 caption: lower odds of a suicide attempt.
Card 1 body: LGBTQ youth who reported at least one affirming space had 35% lower odds of reporting a suicide attempt.
Card 1 source: Source: The Trevor Project
Card 2 title: Accepting adults
Card 2 number: 40%
Card 2 caption: less likely to attempt suicide.
Card 2 body: LGBTQ youth who had at least one affirming adult in their home were 40% less likely to attempt suicide.
Card 2 source: Source: The Trevor Project
Alt: Haven screens arranged as an isometric phone collage on a violet background.

## Demographic access
Eyebrow: Demographic access
Headline: Minors need a guardian’s consent to join a study. Asking would out the teens who need Haven most, so I interviewed two proxy groups instead.
Stat: 3 | Subject matter experts
Stat: 3 | LGBTQIA+ college students
Stat: 6 | Total interviews
Label: 5 key insights
Card: Insight 1 | Humanizing experts | When choosing between experts, users look for what makes each one feel human. They want to know the expert will understand them.
Card: Insight 2 | Sensitive conversations | Users were uncomfortable discussing sensitive identity topics aloud, especially when someone nearby could overhear.
Card: Insight 3 | Unique identities | A one size fits all identity model could flatten the demographic differences that shape each user’s unique experience.
Card: Insight 4 | Scheduling concerns | Users need to pick a time when they can be alone and feel safe talking to an expert.
Card: Insight 5 | Personal security | Users are concerned with using an LGBTQIA+ product in case disapproving guardians or peers may find out.

## Designing an MVP
Eyebrow: Designing an MVP
Headline: Because the subject is complicated and sensitive, I planned Haven as an MVP in two phases: identity first, then community.
Body: An interview made it clear that Haven needs identity and community together. There wasn’t time to design both, so I split them into two phases and decided which features mattered most now.
Legend: Phase 1 | Identity
Legend: Phase 2 | Community
Chart: Phase 1, Identity | 01 to 07 | Empathize, Define, Ideate, Prototype, Test, Empathize, Ideate, Prototype | Identity launch, where this case study ends
Chart: Phase 2, Community | 05 to 12 | Empathize, Ideate, Empathize, Define, Ideate, Prototype, Prototype, Prototype | Community launch
Alt: Timeline of twelve columns. Phase 1, Identity, runs empathize, define, ideate, prototype and test through column 7, ending at the identity launch, which is where this case study ends. Phase 2, Community, starts at column 5 and repeats the cycle through column 12 toward the community launch.

## Wireframes
Eyebrow: Wireframes
Headline: My first wireframes gave users a chat length to pick, a passcode as their only security and their top three Confidantes to swipe through. Testing changed all three.
Aria: Five wireframes, scrolls sideways on small screens
Alt: Wireframe: set chat duration, with 15, 30, 45 and 60 minute options.
Alt: Wireframe: the original security step, a passcode only.
Alt: Wireframe: identity quiz page on social dynamics, with statements to select.
Alt: Wireframe: top three matches, swiped up and down.
Alt: Wireframe: Confidante profile with a schedule chat button.

## Usability testing
Eyebrow: Usability testing
Headline: Six participants tested three key flows.
Task: 01 | Confidante match enrollment
Task: 02 | Select a Confidante
Task: 03 | Schedule a chat
Ticker: KEY INSIGHTS
Hidden heading: Key insights from testing
Card: Insight 1 | Users were unsure of what mode of communication they would be chatting with the expert through.
Card: Insight 2 | Users had trouble understanding the duration section of the scheduling page.
Card: Insight 3 | Users were concerned that the design lacked enough security features.
Card: Insight 4 | Users wanted to know more about each Confidante before choosing one.
Bridge: Each solution below is tagged with the interview and testing insights that shaped it.

## The Confidante program
Eyebrow: The Confidante program
Headline: The Confidante program is built to adapt to each user’s needs and comfort.
Body: Confidantes support the user in two capacities:
Role: 01 | A community liaison that connects the user to different people and communities.
Role: 02 | A source of support for users who need guidance or someone to talk to.

## Primary identity quiz
Eyebrow: Primary identity quiz
Headline: One identity model for every user would flatten the differences that shape their experience, so the quiz matches users on the experiences they pick.
Tags: Interview insight 1 | Interview insight 3 | Confidante role 1
Body: The quiz groups prompts into five areas: attraction, gender identity, race and ethnicity, belonging and upbringing. Confidantes then see a summary of the shared experiences behind each match, so they can tailor support and recommend communities that fit.
Labels: ATTRACTION | GENDER IDENTITY | BELONGING | RACE & ETHNICITY | UPBRINGING
Alt: A red magnet | A hand mirror | A padlock | A ball of yarn | A flower growing from a die
Alt: A phone showing quiz question 16 of 30, with an answer selected.

## Testing synthesis
Eyebrow: Testing synthesis
Headline: Haven’s early flow asked users to choose a Confidante before they could have an introductory chat.
Tags: Interview insight 1 | Testing insight 4
Subhead: Confidante selection journey flow
Body: Testing showed users hesitating over which Confidante to pick. They went back and forth between profiles, and some undid their choice after making it. I moved selection after the introductory chat, which exists to help them decide. In the revised flow, users can chat with more than one Confidante before choosing one.
Flow: Identity quiz | Review matches | Select a Confidante | Intro chat | Schedule a chat
Alt: Revised flow: identity quiz, review matches, intro chat, schedule a chat, select a Confidante

## Confidante profile
Eyebrow: Confidante profile
Headline: Users need to understand who the Confidante is before making a decision. They need to feel understood, represented and safe.
Tags: Interview insight 1 | Interview insight 3 | Testing insight 4
Body: Shared experiences, differences and humanized bios help users compare Confidantes and decide whom to schedule a chat with. Testing showed that those details needed more prominence. I made shared experiences the focus of the page and replaced vertical swiping with suggested Confidantes along the bottom, so users could switch between profiles.
Alt: Penelope’s Confidante profile, scrolling through her shared experiences.
Alt: A shared experience card on the Confidante profile: Religious parents.

## Scheduling a chat
Eyebrow: Scheduling a chat
Headline: Users needed to know what to expect before booking an introductory chat.
Body: Testers were confused about how chats would work and how long they would last, so the scheduling screen now says they happen by text, last a set 30 minutes and can end early. That lets users pick a time when they can be alone.
Tags: Interview insight 4 | Testing insight 1 | Testing insight 2
Alt: Two phones on a violet fingerprint texture: Your events listing two introduction chats, and Schedule a chat with a date picker and time slots.

## Chat-based interactions
Eyebrow: Chat-based interactions
Headline: When speaking out loud is not safe or private, the interaction itself has to lower the barrier to asking for support.
Tags: Interview insight 2
Body: Chats happen by text, not voice or video, so users don’t have to say anything sensitive out loud. Each chat has a set length and can end early, which leaves users in control of when and how much they share.
Alt: An introduction chat by text with a Confidante

## Security features
Eyebrow: Security features
Headline: Privacy is a condition for access. Users need safeguards that protect the app before, during and after a conversation.
Tags: Interview insight 5 | Testing insight 3
Body (hidden: current.css sets .security__body to display none at every width, so no reader sees it): Interviews showed that discovery by guardians or peers could stop someone from using Haven at all, and testing showed the early concepts did not communicate enough protection. The final setup disguises the app icon, hides Haven in the app switcher, keeps notifications off until the user turns them on and adds a security PIN with Face ID. Privacy is visible when users need it, not buried in a later settings screen.
Aria: Security setup
Alt: Create a security PIN, with the option to use Face ID.
Alt: Keep Haven discreet: choose a disguise icon, hide Haven in the app switcher and keep notifications off.

## Where things stand
Eyebrow: Where things stand
Headline: Haven’s initial MVP phase was built around two needs:
Needs: To be understood and to be safe.
Card 1 caption: A quiz pairs users with Confidantes who share their experiences.
Card 2 caption: Profiles lead with the experiences a user and Confidante share.
Card 3 caption: Intro chats happen by text, at a time the user can be alone.
Card 4 caption: An intro chat comes first, so users can see if it feels right.
Card 5 caption: Haven can hide behind a different icon on the user’s phone.
Handoff 1: Identity was the first phase.
Handoff 2: Community is the next.
Links intro: Learn more about what you can do to support LGBTQIA+ youth at the links below:
Links: The Trevor Project | PFLAG | Family Acceptance Project
Alt: Identity quiz question screen | Confidante profile with shared experiences | Your events screen with two introduction chats | Introduction chat with a Confidante | Keep Haven discreet setup with disguise icons
