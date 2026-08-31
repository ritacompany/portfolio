# CS1 primary evidence, verbatim

Every quote below is reproduced exactly as it appears in the parsed Discord corpus, including typos, casual phrasing, and length. Nothing here is cleaned up or trimmed to the quotable part. Where a source is a handwritten note, a Notion page, or a screenshot rather than the message corpus, that is stated and the text is only reproduced if it can be reproduced accurately.

**Where the verbatim text lives:** the parsed corpus is two files in the working sandbox, `/home/claude/all_rita_msgs.json` and `/home/claude/added_msgs.json`, 7,677 messages total, Chadwick's sent messages only, September 2023 to March 2026. If this document and the sandbox ever disagree, the sandbox is correct. The richest secondary source is `cs1-causal-chain.md`, which orders this same evidence by consequence.

**Fact marking:** every item below is a documented message from the corpus (marked FACT) unless explicitly tagged ESTIMATE, ASSUMED, INVENTED, or PARAPHRASE ONLY.

---

## Section 2. We started by asking (research)

**Research kickoff and the "challenge me" invitation.** FACT.
[2024-06-13 | ch product24-ARCHIVED]
> To ensure we're all aligned, here are my goals to complete and share over the next few days. Keep these in mind, and please share any thoughts or questions that pop into your head. Don't hesitate to challenge me or ask questions at ay point. UX Design is allllll about the "why?". Asking more questions only leads to a better final product!! Excited about what we are creating here.
>
> Here are those goals:
>
> **Recruitment Strategy - Sunday (but hopefully Saturday)**
> - By this time, I should have a better idea of if we need to bring someone on to assist with this stage (probably).
>
> **Survey + Interview Formatting - Saturday**
>
> **Explore AI Research Resources - Saturday**
> - New tools are always coming out. I'll see what I can find that may help us improve + speed up any part of the research phase.
>
> **Define Target Interview Groups - Saturday**
> - Understand what we want to learn from each group.

Evidence of: the research operation, and the AI-from-the-start thread ("Explore AI Research Resources" as a stated goal in 2024). Also his "why" register.

**Research method, mapping value before format.** FACT.
[2024-06-18 | ch product24-ARCHIVED]
> Hi guys, sorry haven't been feeling well the last couple of days - sorry for the delay. I'll have the questions done by Friday, but hopefully before. In regards to all the discussion with surveys/questions I won't be able to give a substantive answer until I start mapping out what information is the most valuable for us to know, which is my next step.
>
> Maybe the answer is adding a few qualitative questions to the survey or something more creative. I'm going to go through a bunch of what we have discussed previously as well as the work that has been done and make notes on important factors so we don't miss anything important.
>
> Then I'm going to start mapping it out on Figjam (which I'll share) in order to help identify the most important things we need to know for the MVP. Then it'll be more clear what kind of balance we need to make between q[uantitative and qualitative]

Evidence of: research rigor, sequencing interviews and surveys deliberately.

**The AI reframe.** FACT. This is the July 2024 "hesitation is an opportunity" quote in full.
[2024-07-25 | ch abc-archived-meet]
> Yes, agreed. It's all about how we present the messaging. We also have to remember that this is just the user's perspective at this point in time.
>
> AI is still fresh, the perspective will change as time goes on and so will the AI itself. It's a great opportunity to build trust and loyalty with the user. Some kind of, for lack of a better term "controlled transparency" could be useful here but how exactly we achieve that we'll have to think about.
>
> Honesty builds trust. I actually see this AI hesitation thing as a huge opportunity.

Evidence of: the finding that users distrust AI, reframed as an opportunity. The principle the product still runs on.

**The research pain points themselves** (lack of trust in AI, prefer AI as a tool not the solution) come from the OCR'd handwritten note IMG_2946 and from Notion QN1, not from a single corpus message. PARAPHRASE ONLY for the exact wording of the affinity output; the handwritten note reads roughly "lack of trust in AI / prefer AI as a tool rather than the solution / users have trouble understanding how to navigate their careers." Pull the exact note image before quoting verbatim.

**The "users should feel in control" principle** is from Notion QN1, not the corpus. PARAPHRASE ONLY here: the QN1 line was approximately "they want to feel a sense of human control. They should feel in control of the AI, not that the AI is in control of them." Confirm against QN1 before quoting.

---

## Section 3. The product outgrew how we built it (architecture)

**The architecture message sent to the whole company.** FACT. This is the one drafted three times. This is the sent version, in full.
[2024-10-13 | ch full-team]
> Hi guys!
>
> The design team and I have been thinking on something and we'd like to share it with you guys. As we've been working through features, we're starting to notice some challenges with the navigation/architecture: things like the dock, AI placement, feature-specific navigation, and general navigation. It feels like we're sometimes adapting the architecture around the features, rather than having a structure that naturally supports them.
>
> We're concerned that if we don't address this soon, it could become harder to manage as we continue to build out the app. Tackling it earlier could help prevent things from getting too complex later, and ensure we have a solid foundation to build on.
>
> I'm not sure where this best fits into current plans but we just wanted to put it out there as something to think about finding time to specifically focus on at some point. Maybe this is something we could work on with Allie and Sharon?

Evidence of: the architecture flag, the diplomatic framing, the AI-flexibility reasoning ("AI placement" named directly).

**The two earlier drafts** were captured in Notion ("Ongoing Concerns") not the corpus. NOT CAPTURED VERBATIM in this session. If you want them, pull from that Notion page directly.

---

## Section 4. Arguing the calls (scheduling, testing, other calls)

**The scheduling argument, in his own words.** FACT. This is the core of the weekly-container case. Full text, runs long.
[2025-02-13 00:36 | DM Michael]
> There is something I want to talk to you about in regards to this sprint. Specifically, calendar integration. I'm struggling to figure out where I have agency to implement this in the way I believe it will be the most effective and instead often finding myself designing around it and getting stuck over and over because of it. I also know you have put a lot of thought and heart into this product and I don't want to disrespect any of that. At the same time, I think if we implement calendar integration in a way that is overly structured it feels like we are emulating the structured nature of traditional education. Aren't we the ones that are trying to give that type of shit a good ol' fuck you? I think there is too much variance in how people schedule their lives for the approach to work for everyone. For example, right now I have a pretty predictable schedule so scheduling everything on google or apple cal just doesn't make sense for me, but other times in my life it has been essential.
>
> A lot of the competitive analysis I have done so far has supported this. I've been looking at a lot of "learning" apps. Some of them are more structured than others but even the ones that are more structured have been designed in a way that allows for the user to work at their own pace. It feels like a foundational element of the way a lot of these systems have been designed. Another example of this I can speak to from personal experience is careerfoundry. They did a great job of providing the structure while also allowing for flexibility. I think a goal based approach would be a really effective way to allow for users to work at their own pace, or choose a more structured path. It would give us a lot more freedom to implement AI into scheduling user's individual journeys,

Evidence of: the biggest call he argued, in his own voice, with competitive analysis behind it. Note the mission language ("give that type of shit a good ol' fuck you") is his, and is too profane to quote in the study but shows the conviction. CS1 uses the reasoning, not the phrase.

**The founder's reply, granting agency.** FACT. This is Michael, so it is a leadership quote, usable as paraphrase or short attributed quote. Full text.
[2025-02-13 23:42 | DM Michael]
> Okay! I just had a minute to listen to your message more thoughtfully. There's a lot I could say but I want to keep it to the point. I had it in my head for some reason that you were wanting to implement calendar integration in a certain way. In a way that would make it difficult to allow the user to lead in the way you're talking about. The balance between structure and freedom coexhist all the time and when done properly = chef's kiss, but some expressions of structure can be built in a way limits freedom more than others right? That's what I have been feeling. I have been exploring for what seems like forever now how I can let the user lead more within the boundaries I've perceived, but kept eventually hitting a brick wall. My hope in messaging you is that you'd give me permission to express freedom more with how to implement calendar integration in a user-centric way. Needless to say I feel empowered now haha. Thank you, thank you, thank you.

Evidence of: stakeholder confidence, and the "challenge anything" dynamic exercised in real time. Note this is the founder thanking Chadwick for the push. Strong social proof.

**The "Open Conversation" principle** (a design call he named). FACT.
[2025-11-25 | ch Mondai Experience]
> **The "Yes/No" Hesitation (Core Principle):**
> Using Yes/No buttons makes the question closed-ended, limiting the user from giving a nuanced response like, "Yes, but can you move task ___ to ___." This disrupts their natural mental process. We need to avoid this shift in their mental model.

Evidence of: interaction-design judgment. NOTE: this is closer to CS2 territory (product AI interaction). Use in CS1 only if a call needs illustrating, otherwise reserve.

**The action-item differentiation question.** FACT. This is the one that sent strategy back to a skipped question.
[2025-12-17 | DM Allie]
> Second part - Unless I am missing something big it doesn't seem like we've ever put any focus on what actually happens within the action items. Is it just a check off the box to mark it as complete for task tracking purposes? Aren't there already a ton of apps that do that? Or are we offering something to the user with each action item? We have an overall concept of helping the user along the journey and that is where we find the value. But what does that actually mean? How are we helping the user? What tools are we providing them? what information are we providing them? what resources are we providing them?

Evidence of: him raising a strategic differentiation gap. Use as a single line in CS1 (he asked what happens inside an action item), keep the mechanics for CS2.

**The testing beat is INVENTED / EMBELLISHED.** There is real basis (unmoderated testing via Userberry, prototype prep, the tech week event as live testing), but the specific claim in the draft, that the weekly model needed no explaining while the scheduled one prompted "what happens if I miss a day," is embellished and was approved by Chadwick as fair to embellish. Mark it clearly in your own records as the one place in CS1 that is not strictly documented.

---

## Section 5. The people this ran on (partnerships)

**Engineering to the tech week event.** The tech week event is FACT (referenced in the corpus, and in the May 2026 Michael conversation Chadwick pasted). The claim that it was the "best attended Rita event to date" is ESTIMATE / RECOLLECTION, not a verified number. The event numbers (attendance, signups, completion) do NOT exist in the corpus and are an open ask to Michael.

The only direct tech week reference retrieved is this one, which is the layoff message and is PRIVATE, default OUT of the study:
[2025-04-28 | DM Michael]
> Hey so I have bad news. I'm not going to be able to come to NYC for the event/tech week now 😭 . I got laid off today so finances are extremely tight until i get something else.

Evidence of: the event existed and was NYC tech week. Do not use the layoff. The event framing for CS1 comes from the May 2026 conversation Chadwick pasted, not this line.

**Strategy partnership (the awaiting-stakeholder column)** comes from the Notion Prioritization Dashboard screenshots, not a single corpus quote. FACT via screenshots. The board shows an "Awaiting Stakeholder" status and rows assigned to Allie. Reproduce from the screenshots, not from memory.

**Product partnership (the stakeholder review file).** FACT. From the May 2026 conversation Chadwick pasted this session:
[2026-05-01, pasted by Chadwick]
> okay, so I think what you need is to see "what have I not approved yet" in a way you can understand what each of those things you haven't approved yet is. Maybe another place or another place within that same page that shows major pages as well but separately... I'm thinking I finish all these up and lay them out in a clear way for you with all the reasoning and stuff for each flow. Then at our 1x1 Tuesday night I will have time blocks to make sure we dedicate enough time to go through each together.

And the founder's prompt that triggered it, same thread:
> WITH RESPECT, sometimes i get lost in the figma / if i had just ONE page of the final versions, that would be good

Evidence of: designing the interface between himself and a stakeholder. The review file is the Stakeholder Review Figma file.

**AI-lead partnership** is PARAPHRASE ONLY. There is no single clean corpus quote retrieved this session that captures "we solved where model behavior meets the interface and it unblocked a stuck screen." The Feb 2026 messages about the home page sitting at the intersection of Mondai, action items and home are the closest, and those lean CS2. Treat this partnership as the weakest-evidenced of the four and confirm with Chadwick before asserting specifics.

---

## Section 6. Growing designers (mentoring, workshop, promotions)

**"Not the teacher handing out tasks."** FACT.
[2025-08-26 | DM Michael]
> Yeah, for sure. I was nervous about coming off the wrong way but I think it came off as passionate from the feedback I received. I laid everything out that needed to be and if anything was the opposite of vague in communicating expectations. Without saying it like this I basically told them I'm not the teacher handing out tasks and that's all that is expected to be done. I gave them examples of how they can be actively working on things even if they didn't have a specific deliverable at the moment and gave examples.

Evidence of: his mentoring philosophy.

**Training built around learning style.** FACT.
[2025-11-12 | DM Michael]
> She is working on a project until like next Wednesday then after that we are setting up a weekly. I'm going to start strategizing what that "training" looks like in terms of priorities and I've asked her to start thinking about her own learning style, the best way for us to keep notes that will work with that. I also stressed to her that I am **expecting** notes with lots and lots of questions regularly.

Evidence of: training designed around the individual.

**The workshop and the task framing.** FACT.
[2025-07-29 | DM Michael]
> Doing a workshop with design on design system/components/variables/auto layout Thursday.
>
> Tasking this week:
> **Sierra & Ayushi**
> Both creating 2-3 ideas each for the career decision point based on our (You, Sierra and I)'s convo last night. More focus on WHY and HOW then PRETTY.
>
> **Nallely**
> Researching what makes users choose one career path over the other and finding a way to communicate those things to the user during the career decision point (on that page itself, a "more details" type screen, etc.)
>
> **Chadwick**
> Auditing/passing to you the rest of the onboarding screens .

And the candid reason for the workshop. FACT.
[2025-07-30 | DM Michael]
> & We also have our workshop tomorrow. Full transparency no one feels confident in design systems, components, variables, auto layout, etc - aside from myself obvi. So I'm going to need them to catch up enough that my approval process isn't a nightmare.

Evidence of: teaching at group scale, and the "more focus on WHY and HOW than PRETTY" standard.

**Spreading Figma Make to the team.** FACT.
[2025-08-02 | ch rita-abc-design]
> Design tip for all designers: TRY OUT FIGMA MAKE TO COME UP WITH IDEAS!! (Warning: free version only gives you a few outputs a day, so make your prompts thorough) [designer] just sent me an example of what it pushed out for the task she is working on and it's super cool and will save all of us a lot of time!!

Evidence of: keeping a volunteer team current on tooling.

**The promotions.** FACT. From the May 2026 conversation Chadwick pasted this session.
[2026-05-16, pasted by Chadwick]
> Promotions:
> Kim - PD 2
> Ayushi - PD 2
> Soya - Senior Accessibility Designer
>
> Nallely - I feel bad but unsure where to place her. Honestly doesn't feel right to put her in the PD2 category with the others but I don't want her to be the lone wolf. At the same time she hasn't contributed all that much over time in terms of design..

Evidence of: the strongest mentoring outcome. NOTE: names must be anonymized in the study (two to product designer two, one to senior accessibility designer). The Nallely portion is private and stays out.

---

## Section 7. Making the work move (pipeline, standards, terminology, accessibility)

**The reorg pipeline message.** FACT. Drafted with urgency, defending the pipeline before the restructure. Full text.
[2025-07-22 | DM Michael]
> **PLEASE IF POSSIBLE REVIEW THIS MESSAGE BELOW BEFORE TONIGHT**
>
> I outline this in my voice recordings but really want you to hear this before tonight's meeting just in case. **I outline a bit more in terms of leadership structure in the message but what I want to focus on here is creating a pipeline between design and dev if all dev is being moved to their own team. The pipeline I created for Web X takes design, strategy and dev all into consideration and is meant to create a smoother process for the web designs start to finish. Web's current "plan" transparently is way off and they need this structure right now. This I feel is the most realistic way for us to set clear goals, expectation and clarity. The pipeline is built to prioritizes both efficiency and effectiveness for Web. I think we have some excitement behind this as of our initial meeting so I don't want to lose that. Our Web X meetings are vital for the communication between design and dev specifically. We went over 20 minutes yesterday (those who wanted/could stay stayed) and the conversations were really "fruitful" (<- lol the christian speak from my past coming out.) We could alternatively have these discussions during our Tuesday meetings but we could easily use that whole hour ourselves I think and don't want to take over the whole meeting for that. Also, in that case if we have any important topics to discuss as Rita ABC as a whole that would take over that entire opportunity for communication.**

Evidence of: defending the design-to-dev pipeline before the restructure.

**The October cleanup, the cost.** FACT. Both messages, in full.
[2025-10-22 | DM Kristin]
> Aww ty, you're so sweet. I am going well, just keeping extremely busy. A lot of my work right now is cleaning up the work of the other designers. They aren't super great with using the design system, ex: images in place of icons from the design system?), or auto layout/responsiveness so I'm basically transferring stuff over/auditing it/creating components for those pages all in one currently. That's not to dig at all, just context. I've known this was going to be necessary.

[2025-10-30 | DM Kristin]
> I'm fine, just grinding still. I've been doing like 12-13 hour days. Definitely need to bring some new designers onto the team with a bit more experience. They're not fully solving problems, making their designs responsive or even fully using the design system in most cases so it has created a lot of work. That's not on them, I'm just explaining that to you 1 on 1 to give you a better idea of what my week has entailed 😂

Evidence of: the reconcile-after-the-fact cost that justified moving the agreement earlier. "That's not on them" is the key line, and it is real.

**The terminology board launch.** FACT.
[2025-06-12 | ch full-team]
> Hi @everyone , I am starting to put together a list of solidified terminology which is essential with us all being spread out working on separate things. Currently, it just has a few things listed related to the Journey Navigator feature but it will grow over time as we collaborate together to create a more robust terminology database.
>
> You can find it here: [Notion link]
>
> This is a **collaborative board**, but additions are subject to approval in order to maintain consistency and focus. Terms should remain project focused and not include discipline specific language.
>
> In order to help maintain standards for the document and because there are so many of us I have myself, [two people] as contact points for terminology approval (details on the page).
>
> Please let me know if you have any questions!

Evidence of: terminology governance built with an approval flow.

**The documented layout standard** ("I hated having to write it out in this much detail...") is PARAPHRASE ONLY in this session. It is referenced in the causal chain but the exact message was not re-pulled here. It lives in the corpus around October 2025; pull it before quoting verbatim. The design-file responsive spec page ("Growth Journey Page, Responsive Spec," reference frame 1920x1080) is FACT, reproduced from the design PDF P4 page 6.

**Accessibility / WCAG self-check.** PARAPHRASE ONLY as retrieved this session. The causal chain records him running the 3:1 contrast check himself and flagging the missing icon hover state (around Nov 25, 2025). Re-pull the exact message before quoting.

---

## Section 8. Deciding what gets built next (scoring model)

**All of the following is FACT, reproduced from the Prioritization Dashboard screenshots Chadwick provided this session, not from the message corpus.**

The board title and guide:
> **Prioritization Dashboard**
> **Dashboard Guide: How We Prioritize.** This board is our source of truth for the MVP launch. We use the Effort/Value Matrix and the MoSCoW Scale to move from a "wish list" to an actionable plan.
> **1. The Rating Tools (The Inputs).** Dev determines effort and Design determines value.
> **2. The Intersection: How Ratings Become Priority.** The combination of Value and Effort determines the initial priority.

The T-shirt size definitions (Design Value column), verbatim:
> **XS. Tiny polish.** Nice to see, but nobody misses it if it's gone.
> **S. Small improvement.** A minor "quality of life" adjustment.
> **M. Meaningful fix.** Improves a specific user flow or solves a common friction point.
> **L. High importance.** Solves a major pain point or user frustration.
> **XL. The Human Priority.** Without this, the user is blocked or the app fails its core mission.

The Dev Effort column, verbatim:
> **XS. "While you're in there."** A quick text change or CSS tweak.
> **S. Straightforward.** Isolated fix that is easy to implement and test.
> **M. Standard task.** Requires focused time and touches a few parts of the system.
> **L. Complex work.** Requires deep logic changes or building new components.
> **XL. The Foundation.** A huge lift that could impact the entire launch timeline.

The MoSCoW lookup table, verbatim:
> XL/L value + XS/S effort = Must Have. High Impact, Low Cost. The "No-Brainers."
> XL/L value + M/L effort = Should Have. High Impact, High Cost. Important but may need simplifying.
> M/S value + XS/S effort = Could Have. Low Impact, Low Cost. Good for filler/polish.
> S/XS value + L/XL effort = Won't Have. Low Impact, High Cost. Move to backlog.

The board numbers, verbatim from the screenshot:
> 12 done / 52 in total / 5 must haves remaining (design) / 2 should haves remaining (design) / 11 could haves remaining (design) / 4 wont haves remaining (design) / 22 remain / 7 tasks/week

The Won't Have rows that matter, verbatim from the row details:
> [Password form copy limitation, assignee Swyam Patel, Done] "Update the password form so you can highlight and right click to perform commands like 'copy'." Notes: "This is a security threat. Disabled on purpose."
> [Do we need to ask the salary question?, assignee Allie] "A concern was brought up during a Build X meeting" Notes: "Decision: NO TAKE OUT!"
> [Add more interest to onboarding, assignee Chadwick Fenner, High effort] "Feels redundant. Micro animations graphs in between."
> [Streamline onboarding (Demographics)] Notes include: "deleted sexual orientation question."

Evidence of: the scoring model, its plain-language definitions, the real numbers, and the three real cuts (password security behavior, salary question, one of Chadwick's own ideas). Also the notes column as a decision record.

NOTE: the board was NOT the org's task tracker (product owned that). Chadwick built this for the design/dev boundary specifically. FACT per Chadwick this session.

---

## Section 9. How my practice changed (AI practice)

**The context-loss / tool-switch moment.** FACT. Full text.
[2025-09-30 | DM Michael]
> Sorry for sending a bunch of messages.
> But yeah, I would get so frusterated with chat gpt because it's not good at maintaining information from earlier in a conversation. For instance if I am having it work on text for a document for me or something and I see something wrong with it's output and ask it to make a change it will eventually keeping making changes every time you ask but lose information from earlier in the conversation so all of a sudden the output will start missing things and it's impossible to keep track of and I would often not notice certain things until way later.
>
> Through a little research I found out that Gemini is way better at this which has been a godsend. I worked on the growth journey feature with it a lot today and it worked seamlessly.

Evidence of: the calibration moment, researching alternatives and switching.

**The AI-adoption enthusiasm and the method.** FACT. Both messages.
[2026-03-10 | DM Michael]
> also dude.... Claude is IT. I've been working on the expired task logic flow for a couple hours essentially "vibe coding" step by step with Claude and it is a game changer.

[2026-03-10 | DM Michael]
> It's super smart on product design stuff, back and forth problem solving but like **informed** problem solving. Basically I fed it the entire rita design system by creating a PDF. Then we walked through different steps. It isn't PERFECT ofc and still needs a designer's eye but it's great at correcting and coming up with solutions. The back and forth building is HUGE. Then I essentially sent figma make screenshots and had claude give me a detailed prompt and figma make created it almost exactly as intended (i still have to craete components, fix Make's shitty layering/add auto layout, all the works but it's soo useful.

Evidence of: the encoded-system workflow, and the "still needs a designer's eye" boundary in his own words.

**The boundary statement** ("I do not trust them to lead the design efforts... the main purpose here is to come up with ideas for certain things like navigation in a way that I can explore how they feel") is from Notion QN3, not the corpus. PARAPHRASE ONLY here. Confirm against QN3 before quoting verbatim.

**The four points of delegation** ("direction-based vs assignment-based," "design infrastructure and have them fill in the rest") are from the OCR'd handwritten notes, not the corpus. PARAPHRASE ONLY. The delegation-crisis framing does have a corpus anchor:
[2025-09-17 | DM Michael]
> To paraphrase what you said "If it takes time to provide feedback, manage, mentor ir the same or more than it would take for me to do it then why don't I just do it?"
>
> I have my best friend that I live with and he's been around since I started with Rita and is a project manager. Sometimes we'll sit on the balcony at the end of the day and I'll discuss some of the things that are currently going on "within my Rita bubble". Two days ago I literally said something extremely similar about how I feel like it would save us time and effort if I just did it all myself so this is very much been where my head is at. You hit the nail on the head here. I like the dummy sessions idea and I'll see if it's something I can make happen with people time wise (on their end).
>
> I agree, the production over process mindset is where we need to be at this stage.

Evidence of: the delegation crisis, stated. FACT. Note this is Chadwick quoting the founder quoting Chadwick, so the "why don't I just do it" line is Chadwick's original thought reflected back.

**The calendar color research** is referenced in the causal chain and is FACT, but the exact messages were not re-pulled verbatim this session. The designs exist in the project design PDFs and did not ship. Pull the corpus messages (October 2025) before quoting.

---

## Section 10 / general. Leadership and self-description

**His own definition of what he does** (systems thinking) is from December 2025 and is PARAPHRASE ONLY as retrieved this session: approximately "seeing patterns across product to eliminate inconsistencies, but that also stretches over to making connections between how more strategic, tangible aspects of the product's logic work in tandem." Re-pull before quoting verbatim.

**Michael calling him the best designer** is referenced by Chadwick but the exact quote was NOT located in the corpus this session. The only "best designer" line retrieved is Chadwick praising another designer, which is the opposite direction:
[2025-08-29 | DM Michael]
> not trying to compare here but imo Kim the best designer we have had

So the founder-praising-Chadwick quote is an open ask to Michael, not a documented line. Do not fabricate it. Mark INVENTED if used as a placeholder.

**The terminology instinct, early.** FACT. A nice supporting quote showing his terminology sense predates the board.
[2024-06-25 | DM Michael]
> Okay, DON'T respond to this tonight, I'm just messaging now while it's on my mind. I'm modifying the scripts and I'm realizing part of the issue is the wording here. I used "job search" a lot to refer to the entire process including preparation/planning as well but "job search" is definitely too specific. However, I'm not sure "job prep/planning" is super clear either.

---

## What is NOT verbatim and must be pulled before use
These surfaced this session but were not reproduced verbatim here, either because they live outside the message corpus or were not re-pulled. Do not reconstruct from memory.
- The two earlier architecture drafts (Notion "Ongoing Concerns")
- The four points of delegation (handwritten notes)
- The documented layout standard message ("I hated having to write it out in this much detail")
- The WCAG self-check message and the icon hover-state flag
- The boundary statement about not trusting AI to lead design (Notion QN3)
- The calendar color research messages (corpus, October 2025)
- The systems-thinking self-description (December 2025)
- The research pain points exact wording (handwritten note IMG_2946, Notion QN1)
- Any founder quote praising Chadwick (does not exist in corpus, open ask to Michael)

## Fact-marking summary
- FACT and reproduced verbatim here: research kickoff, AI reframe, architecture message, scheduling argument, founder's empowered reply, action-item question, not-the-teacher, learning-style training, workshop, workshop reason, Figma Make spread, promotions, reorg pipeline, October cleanup (both), terminology launch, terminology instinct, context-loss switch, Claude adoption (both), delegation crisis, Open Conversation principle, all scoring-board content.
- ESTIMATE / RECOLLECTION: tech week "best attended" claim.
- INVENTED / EMBELLISHED: the testing beat specifics; any founder quote praising Chadwick.
- PARAPHRASE ONLY, pull before quoting: research pain points, control principle, layout standard, WCAG check, AI boundary statement, delegation four points, calendar research, systems-thinking self-description, the two architecture drafts.
- PRIVATE, keep out: the layoff message, the Nallely portion of the promotions message, the health disclosure and founder strategy noted in the privacy section of the main record.
