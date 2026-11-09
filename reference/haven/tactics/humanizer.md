# Humanizer pass on every proposed line (9 Nov)

Humanizer loaded as the skill this session and run as its loop on every proposed line: draft, audit (what still
reads as AI, and does the rewrite state anything that is not on the page or in the repo), final. Voice calibrated
to docs/VOICE-draft.md: the user as subject, I for his decisions, the reason joined inside the sentence with
because or so, plain words. Where a proposal is a cut or a one word fix, the entry says so. Each Final line must
equal the proposal's new text (run-checks.mjs compares them).

## h-hero-r1
Draft: For many LGBTQIA+ teenagers, finding a sense of belonging and acceptance can be a difficult and isolating experience. Not having affirming environments at home or in their local communities is linked to serious mental health consequences, including a higher risk of suicide.
Audit: the first sentence is his and stays. Not having affirming environments opens on a gerund phrase that reads stiff; the original's The lack of access reads more like him. Fact check: linked to is weaker than the original's leads to, which is the point (the Trevor figures are odds, not causes). No new fact.
Draft 2: ...The lack of affirming environments in their homes and local communities is linked to serious mental health consequences, including a higher risk of suicide.
Audit: fit, not voice: with h-hero-r2 the hero column measures 11 lines at 1440, over the 10 line limit (measure.mjs). Serious mental health consequences is also wider than the data: the Trevor cards report suicide attempts only. Cutting it scopes the claim to exactly what the next block shows, which is this tactic's point. No new fact.
Final: For many LGBTQIA+ teenagers, finding a sense of belonging and acceptance can be a difficult and isolating experience. The lack of affirming environments at home and in their communities is linked to a higher risk of suicide.

## h-hero-r2
Draft: This project was developed as part of a UX bootcamp. The brief was to create a functional product for a specific user group and include a way to connect users with an expert, which Haven calls a Confidante. Because Haven itself could out a user to a guardian or peer, privacy shaped the research, the chats and the setup.
Audit: the research, the chats and the setup is a built rule of three, and the setup means nothing to a reader on the first screen. Fact check: privacy shaped the research overstates; the proxy groups came from the consent rule, which is about outing, so it holds, but the list invites a check on every item. Haven itself could out a user is a thing doing a person's job.
Draft 2: ...which Haven calls a Confidante. If a disapproving guardian or peer found Haven on a user's phone, it could out them, so privacy drives many of the decisions that follow.
Audit: many, not every, because the quiz, profile and flow decisions are about matching, not privacy (checked block by block). Disapproving guardians or peers is Insight 5's wording. No new fact.
Reader check round 1: the hero states no design decision (Q1 no, 3 of 3), and Insight 5 now only restates the hero (Q4, 2 of 3), because the hero said guardians or peers first.
Draft 3: ...which Haven calls a Confidante. Just having Haven on their phone could put a user at risk, so I designed it to stay hidden on the phone and to keep every chat by text.
Audit: one decision with its reason, I as the subject, and the who (guardians or peers) left to Insight 5, which is the evidence for it. on their phone and on the phone in one sentence; the second goes. Fact check: stays hidden (the disguise icon and app switcher screens) and chats by text (Scheduling, Chat) are both on the page. No new fact.
Final: This project was developed as part of a UX bootcamp. The brief was to create a functional product for a specific user group and include a way to connect users with an expert, which Haven calls a Confidante. Just having Haven on their phone could put a user at risk, so I designed it to stay hidden and to keep every chat by text.

## h-data-cap1
Draft: lower odds of a suicide attempt.
Audit: a one phrase fix. less suicide attempts was ungrammatical and claimed a count the study did not report; the card body says 35% lower odds. Matches the body word for word. No new fact.
Final: lower odds of a suicide attempt.

## h-links
A spacing typo only: LGBTQIA + becomes LGBTQIA+, as everywhere else on the page. Applied to both copies of the line.
Final: Learn more about what you can do to support LGBTQIA+ youth at the links below:

## h-access-i1
Draft: When choosing between experts, users look for the human details, because they want to know an expert will understand them.
Audit: the human details is vague, and folding two sentences into one long one loses the card's rhythm. The original's they appeared before users, which is the fix this proposal exists for. No new fact.
Final: When choosing between experts, users look for what makes each one feel human. They want to know the expert will understand them.

## h-access-i4
Draft: Users need to pick a time when they can be alone and feel safe talking to an expert.
Audit: one sentence in place of a sentence and a fragment; could and will tenses made consistent. Nothing reads generated. No new fact.
Final: Users need to pick a time when they can be alone and feel safe talking to an expert.

## h-mvp-head
Draft: Because the subject is sensitive, I planned Haven as an MVP in two phases: identity first, then community.
Audit: dropping complicated loses his word; keep it. The old headline's as if I were designing it as an MVP hedged a plain fact. Identity first, then community is the chart's own order. No new fact.
Final: Because the subject is complicated and sensitive, I planned Haven as an MVP in two phases: identity first, then community.

## h-mvp-body
Draft: Identity comes first because every match Haven makes depends on it. Splitting the work this way let me decide which features mattered most now and which could wait until after the MVP.
Audit: every match Haven makes leans on matching, which the reader has not met yet (the hero names a Confidante, not a match). Fact check: the page shows matching runs on identity (quiz body, ending card 1), but nowhere says that is why identity is phase 1. That reason is my inference and is flagged for his yes.
Draft 2: Identity comes first because Haven matches each user with a Confidante through who they are. Splitting the work this way let me decide which features mattered most now and which could wait until after the MVP.
Audit: fit: 5 lines at 1440 against 3 now (measure.mjs). Splitting the work this way is filler; the two phases says it in fewer words.
Final: Identity comes first because Haven matches each user with a Confidante through who they are. The two phases let me decide which features mattered most now and which could wait until after the MVP.

## h-wires
Draft: My first wireframes gave users a chat length to pick, a passcode as the only security step and top matches to swipe through. Testing changed all three.
Audit: Testing changed all three is a short closer, but a single one carrying a real fact, not a run of fragments. The only security step reads technical; as their only security is plainer. Fact check: the three are the wireframe alts (duration 15 to 60 minutes, passcode only, top three matches swiped up and down) and each changed later on the page (30 minutes, the full privacy setup, suggested Confidantes replacing swiping).
Final: My first wireframes gave users a chat length to pick, a passcode as their only security and top matches to swipe through. Testing changed all three.

## h-test-head
Draft: Six participants tested three key flows.
Audit: a count that matches the three tasks listed under it, and a full stop like every other headline. No new fact.
Final: Six participants tested three key flows.

## h-test-i1
Draft: Users weren't sure how they would be talking to the expert.
Audit: mode of communication is the stiff phrase this replaces. Plain. No new fact.
Final: Users weren’t sure how they would be talking to the expert.

## h-test-i4
Draft: Users wanted to know more about each Confidante before choosing one.
Audit: in order to determine the right choice is filler. No new fact.
Final: Users wanted to know more about each Confidante before choosing one.

## h-bridge
Draft: Every design below carries tags for the interview and testing insights that shaped it.
Audit: carries tags is indirect. Fact check: one quiz tag is Confidante role 1, not an insight, so the line says insights shaped each design without claiming every tag is one.
Final: Each solution below is tagged with the interview and testing insights that shaped it.

## h-program-head
Draft: The Confidante program is built to adapt to each user's needs and comfort.
Audit: the original was a fragment with an -ing tail (designed for flexibility, adapting to). The draft is a plain sentence with a subject. unique dropped as filler. No new fact.
Final: The Confidante program is built to adapt to each user’s needs and comfort.

## h-quiz-head
Draft: A one size fits all identity model would flatten what makes each user's experience their own, so the quiz builds each match from the experiences the user picks.
Audit: what makes each user's experience their own is wordy, and builds each match from is abstract. Fact check: the rejected option is Insight 3's own wording; matching on picked experiences is the body's.
Final: One identity model for every user would flatten the differences that shape their experience, so the quiz matches users on the experiences they pick.

## h-quiz-body
A cut only: Users pick the experiences that matter to them. The headline now says it. The remaining sentences are unchanged.
Final: The quiz groups prompts into five areas: attraction, gender identity, race and ethnicity, belonging and upbringing. Confidantes then see a summary of the shared experiences behind each match, so they can tailor support and recommend communities that fit.

## h-journey
Word swaps only: people becomes users in the headline and in body sentence 4, his wording rule. Nothing else changes.
Final: Haven’s early flow asked users to choose a Confidante before they could have an introductory chat.

## h-sched-head
A word swap only: People becomes Users.
Final: Users needed to know what to expect before booking an introductory chat.

## h-sched-body
Draft: Testing showed confusion about how chats would work and about the duration picker, so I replaced the picker with a set 30 minutes. The scheduling screen explains that chats happen by text, last 30 minutes and can end early, so users can choose a time when they can be alone. Your events lists each upcoming chat with the Confidante's name and time.
Audit: 30 minutes twice in two sentences. Fact check: I replaced the picker states a change nobody wrote down; the page shows a picker in the wireframes and a 30 minute chat in the final, which supports a set length, not a story of replacing it.
Final (round 1): Testing showed confusion about how chats would work and how long they would last. The scheduling screen now explains that they happen by text, last a set 30 minutes and can end early, so users can pick a time when they can be alone. Your events lists each upcoming chat with the Confidante’s name and time.
Reader check round 1: sentence 1 only restates Testing insights 1 and 2 (Q4, 2 of 3); Your events is an unexplained name that does not follow from the point (Q2 and Q5, 3 of 3). The Your events sentence was his, kept by my rewrite; it names the screen the image already shows, so it goes.
Draft 2: Testers were confused about how chats would work and how long they would last, so the scheduling screen now says they happen by text, last a set 30 minutes and can end early, which lets users pick a time when they can be alone.
Audit: one long sentence with the reason inside it, his habit; the insights are named to carry the decision, not restated. Testers, not users, for people in a test. which lets is a loose join; keeps it plain. No new fact.
Final: Testers were confused about how chats would work and how long they would last, so the scheduling screen now says they happen by text, last a set 30 minutes and can end early. That lets users pick a time when they can be alone.

## h-chat-body
Draft: Chats happen by text, not voice or video, so users never have to say anything sensitive out loud. Each chat has a set length and can end early, which leaves users in control of when and how much they share.
Audit: never is stronger than the page supports; don't. The original's responding directly to concerns about being overheard was an -ing tail repeating the first sentence's reason; gone. Bounded chat format is replaced by what it means. No new fact.
Final: Chats happen by text, not voice or video, so users don’t have to say anything sensitive out loud. Each chat has a set length and can end early, which leaves users in control of when and how much they share.

## h-end-cap3
Draft: Intro chats happen by text, at a time the user can be alone.
Audit: one sentence in place of a sentence and a fragment (Built for a time). text based only became by text; only added nothing. No new fact.
Final: Intro chats happen by text, at a time the user can be alone.
