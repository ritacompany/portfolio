# Editorial and ghostwriting operations, and process designs that make quality structural

Scope note: 17 tool calls. Primary sources reached: CJR Delacorte lecture with New Yorker checkers, Scribe Media's own service pages, presidential library and press accounts of speechwriting, HBR (abstract only) on the premortem, Simon Willison's 2026 posts on AI writing. Several areas (Gotham's process, Mollick's workflow, stage gates and definition of done, review round counts) returned nothing usable and are logged as gaps rather than filled from memory.

## 1. Ghostwriting and executive communications workflows

### Takeaway
Professional voice work is interview first, sample second, full draft last. The client approves voice on a small sample before volume is produced, and speechwriters study what the principal thinks (substance) more than how he sounds (surface style). Calibration is front loaded and checked at named points, not encoded as style rules.

### Cited Findings
- Scribe Media's process is built on recorded interviews: the business book tier cites 4 to 6 sessions of 90 to 120 minutes; the Professional tier lists 10 interview calls of 90 to 120 minutes; memoir describes ten two hour sessions. Page counts conflict across Scribe's own pages, and all are self reported marketing: [Scribe business book ghostwriter](https://scribemedia.com/service/business-book-ghostwriter); [Scribe Professional](https://scribemedia.com/service/professional/); [Scribe memoir](https://scribemedia.com/service/memoir-writing-services/)
- Scribe delivers a sample chapter "to establish voice and tone" for author approval before the full manuscript, then multiple rounds of author feedback on the manuscript: [Scribe business book ghostwriter](https://scribemedia.com/service/business-book-ghostwriter)
- Scribe's memoir flow adds two voice checkpoints: preview pages after the first interviews and another check at the midpoint; nothing proceeds until the client approves the voice: [Scribe memoir](https://scribemedia.com/service/memoir-writing-services/)
- Scribe positions the method as all content originating from the author through interviews, with the writer capturing voice "rather than inventing content": [Scribe Professional](https://scribemedia.com/service/professional/)
- Scribe has the client interview up to three candidate writers matched on voice and working style, so fit is a selection step, not a correction step: [Scribe ghostwriting](https://scribemedia.com/ghostwriting/)
- Gotham Ghostwriters (Dan Gerstein) is a matchmaking service pairing leaders with writing partners; I found no published description of its voice capture method: [Gotham About](https://gothamghostwriters.com/about/)
- Ghostwriting practitioner guidance (single blog, unverified survey numbers excluded): clients become guarded after the first session and start mimicking "good writing" with bigger words and more formal grammar, so the earliest recorded talk is the best voice evidence; writers listen for natural metaphors, narrative structure, repeated phrasing and formality level, and record every minute: [River Editor blog](https://rivereditor.com/blogs/how-ghostwriters-capture-client-voice-first-interview)
- Presidential speechwriting: a Johnson speechwriter said the key is knowing what the president thinks, not how he sounds; writers start from something close to a template: [Christian Science Monitor, 1997](https://csmonitor.com/1997/0204/020497.us.us.1.html)
- Under Ford, a speechwriter was given a long interview with the president, then a period researching his past speeches to match style: [Ford Library finding aid, Theis and Orben files](https://www.fordlibrarymuseum.gov/digital-research-room/finding-aids/paul-theis-and-robert-orben-files-1974-77)
- Truman's speechwriter said a good draft must fit the style of the man, which takes close study of his speech habits; he thought nine drafts was a little high: [Truman Library oral history, Nash](https://www.trumanlibrary.gov/oralhist/nash7.htm)
- Nixon era guidance: any policy speech goes through three to eight drafts: [Nixon Foundation](https://backup.nixonfoundation.org/?p=1261)
- Under George W. Bush, finished drafts went to the Staff Secretary, who circulated them, coordinated changes and ensured the final copy was approved; the president often reviewed and commented himself: [George W. Bush Library, speeches](https://georgewbushlibrary.gov/topics/speeches)
- Speechwriting guidance summarized in search results: agree "topline" messages with the principal before drafting, and express the central idea in a nutshell paragraph that sets structure. I could not open the underlying guide, so treat as secondary: [IGI Global, Inside the presidential speechwriting process (preview)](https://igi-global.com/article/inside-the-presidential-speechwriting-process/153599)

### Inferences
- The common structure is: capture raw talk, approve a small voice sample, approve the core message, then produce volume. Voice is approved by recognition ("that sounds like me") on an artifact, never by the client writing a style guide. That maps directly onto a principal who "talks better than he writes rules".
- The "know what he thinks, not how he sounds" line suggests the bigger risk is substance drift (claims he would not make), not surface style. Voice rules address the smaller problem.
- Writer to client matching is done once, up front. For an AI pipeline the analogue is choosing the source material the model drafts from (his transcripts and corrections), not adding instructions.

### Gaps
- No primary account of Gotham Ghostwriters' or any named top ghostwriter's interview protocol was found in this pass.
- No data on how many revision rounds Scribe's sample chapter gate saves versus going straight to manuscript.

## 2. Newsroom roles and magazine fact-checking

### Takeaway
Fact-checking works because it is a separate role with a separate input: the checker inherits the writer's full reporting file and verifies every checkable claim against sources, marking each one. The separation of roles, not the diligence of the writer, is the quality mechanism.

### Cited Findings
- New Yorker checkers "inherit" the writer's full reporting materials, including named and unnamed sources, not just the draft (Jonathan Blitzer): [CJR, How fact-checking and reporting mix, 2020](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Checker method: underline every checkable fact on the proof, then cross out each one as it is verified (Alexandra Schwartz): [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Historical New Yorker practice: each checked word carried the checker's imprimatur, a tiny pencil tick (Sara Lippincott): [beSpacific summary of New Yorker checking history](https://www.bespacific.com/?p=116471)
- Fergus McIntosh starts by listing every person in the piece and planning contact order: [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Reconstructed scenes often rest on scattered material (a clip, a partial interview, a photo), which checkers must trace (Blitzer): [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Error classes the checkers name: names, dates and spellings (a misspelled name makes readers doubt the rest, Jiayang Fan); claims about people's inner states, which need documentation; overreach when a writer is new to a subject (McIntosh): [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Something reported everywhere may still be wrong (Schwartz): [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Checkers both judge and protect the piece; writers who treat checking as an attack are the ones who make mistakes (Schwartz): [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Advice for writers without checkers: treat the last phase of reporting as checking and read as a skeptic (Blitzer); anticipate how a critic would attack the story (Fan): [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)
- Sources may flag errors and give context but cannot edit text or approve quotes; points of contention are argued among checker, writer and editor, and the editor decides; the process is described as intentionally adversarial: [search summary of New Yorker checker accounts; underlying CSMonitor and Rumpus pages](https://www.csmonitor.com/2000/0224/p11s2.html), [The Rumpus, Getting the Story Straight (Peter Canby), fetch blocked](https://therumpus.net/2012/10/getting-the-story-straight)
- Dedicated checking departments like the New Yorker's are not the norm for most outlets: [IJNet](https://ijnet.org/en/story/experts-share-tips-verifying-your-own-writing-without-dedicated-fact-checking-team)
- A politically opposed outlet argued the New Yorker process broke down on a 2020 piece about Eugene Scalia; one sided account: [National Review](https://www.nationalreview.com/news/the-new-yorkers-hit-piece-on-scalias-labor-dept-was-too-good-to-fact-check-emails-show/amp/)

### Inferences
- The mechanism is "one pass, one job, one input": the checker does not edit prose, does not judge voice, and works claim by claim from the source file. An AI pipeline can copy this exactly: a separate checking pass whose input is the draft plus the evidence files and whose only output is a per claim verdict (traced, not traced). This makes "every claim traces to reference/" structural.
- The tick per claim is an artifact that makes incompleteness visible at a glance, which is the same idea as poka-yoke (section 3).
- "Inner states" being a named high risk class matters for case studies, which routinely assert what a team or user felt or realized.

### Gaps
- Could not fetch Peter Canby's Rumpus lecture (403), so I lack the department head's own statement of why checking is separate from editing.
- Did not reach Poynter or a copy desk role description; no sourced material on copy desk versus line editor separation.

## 3. Mechanisms that replace rules

### Takeaway
Gawande, Shingo and Klein all argue against piling up instructions. Checklists work only when short, tied to a named pause point and limited to "killer items". Mistake-proofing moves detection to the step where the error is made and makes the error obvious. The premortem changes the social framing so known risks get said before work starts.

### Cited Findings
- Gawande: a checklist needs a defined pause point at which it is used, unless the trigger is obvious: [Steve Grossi notes on The Checklist Manifesto](https://www.stevegrossi.com/on/the-checklist-manifesto); [Shortform, types of checklists](https://www.shortform.com/blog/types-of-checklists/)
- Two formats: Do-Confirm (experts work from memory, then stop and confirm) and Read-Do (follow step by step, for order critical or emergency work): [Shortform](https://www.shortform.com/blog/types-of-checklists/); [Jan Meppe, how to make a good checklist](https://janmeppe.substack.com/p/how-to-make-a-good-checklist)
- Keep only "killer items": steps most dangerous to skip and still sometimes overlooked; after roughly a minute at a pause point people start cutting corners, so lists must be short: [Steve Grossi](https://www.stevegrossi.com/on/the-checklist-manifesto)
- Gawande's surgical team dropped fire prevention checks because surgical fires are rare, showing deliberate exclusion: [Steve Grossi](https://www.stevegrossi.com/on/the-checklist-manifesto)
- Gawande: checklists must be short, extremely simple and tested in the real world; verbal confirmation with another person makes missed steps far less likely than ticking a box alone: [Shortform, WHO checklist](https://www.shortform.com/blog/who-surgical-safety-checklist/)
- WHO Surgical Safety Checklist pilot in eight hospitals: complications fell by more than a third, surgical site infections by half, deaths by nearly half: [Harvard Magazine, 2009](https://harvardmagazine.com/2009/09/checklist-for-surgical-safety); reductions were similar in high and lower income sites: [WHO, 2010](https://www.who.int/news/item/11-12-2010-checklist-helps-reduce-surgical-complications-deaths)
- Shingo: defects result from neglecting worker errors; a poka-yoke device either prevents the mistake or makes it obvious at a glance; source inspection checks the conditions that cause errors rather than results: [mistakeproofing.com tutorial](https://mistakeproofing.com/a-brief-tutorial-on-mistake-proofing-poka-yoke-and-zqc/)
- Shingo's worry about end of line inspection was timing: it comes too late to locate the cause; his remedy was each operation inspecting the previous one with immediate feedback, made cheap by simple devices: [mistakeproofing.com](https://mistakeproofing.com/a-brief-tutorial-on-mistake-proofing-poka-yoke-and-zqc/)
- Shingo's book: [Zero Quality Control: Source Inspection and the Poka-Yoke System (Routledge)](https://www.routledge.com/Zero-Quality-Control-Source-Inspection-and-the-Poka-yoke-System/Shingo/p/book/9780915299072)
- Klein premortem: assume the project has already failed and generate the reasons; aims to make it safe for knowledgeable worriers to speak: [HBR, Performing a Project Premortem, 2007](https://hbr.org/2007/09/performing-a-project-premortem)
- Method detail: each member independently writes every reason for the failure (about two minutes), then lists are shared and themed: [Wikipedia, Pre-mortem](https://en.wikipedia.org/wiki/Pre-mortem); [Psychology Today, Klein](https://www.psychologytoday.com/ie/blog/seeing-what-others-dont/202101/the-pre-mortem-method)
- Evaluation study: Veinott, Klein and Wiggins (2010), on plan confidence: [Psychology Today](https://www.psychologytoday.com/ie/blog/seeing-what-others-dont/202101/the-pre-mortem-method)

### Inferences
- Accumulating a rule after each failure violates every one of these sources: it lengthens the list past the point of use, has no pause point and treats every past failure as a killer item. Gawande's own team cut items on purpose.
- Mapping to the portfolio pipeline: an em dash hook and the verbatim file write block are already poka-yoke (the error cannot happen). Rules that cannot be made into a device should be either (a) a two to five item Do-Confirm list at one named pause point (before handing a draft to Chadwick) or (b) moved into a separate pass with its own input, like the fact-checker.
- A premortem before drafting a section ("Chadwick rejected this draft; why?") would surface known failure patterns from his past corrections as predictions, not standing rules.

### Gaps
- No sourced material gathered on stage gates, definition of done, five whys / root cause analysis or retrospectives in this pass. The HBR premortem page returned only the abstract, so the often cited "prospective hindsight improves reason finding by about 30%" figure is not verified here.
- Did not verify the WHO checklist item count or time.

## 4. AI and human co-writing practice, 2024 to 2026

### Takeaway
The practitioners who are most careful keep the human as the source of every sentence that expresses a view and use the model for capture, structure and checking. The key argument (Alpert, endorsed by Willison) is that no rewrite is lossless, so a model rewrite always shifts meaning.

### Cited Findings
- Dan Shipper (Every) drafts by walking with a voice memo app running: [Behind the Craft interview, July 2024](https://creatoreconomy.so/p/how-to-use-ai-to-write-dan-shipper)
- Every's voice guide: Shipper used live voice AI to write and revise a longform article; dictation suits knowing what to say, live conversation suits asking questions and correcting in real time; record musings and save them as context to mine later: [Every, Build faster with voice](https://every.to/guides/build-faster-with-voice)
- Shipper uses AI from ideation through outlining and editing; AI does not necessarily save time but moves effort to higher level work: [Podwise summary of the interview](https://podwise.ai/episodes/1545372)
- Simon Willison's policy (March 2026): text that expresses opinions or uses "I" is written by him; LLMs may draft documentation he then edits so it does not state opinions or invent rationales; LLMs proofread: [Willison, 1 March 2026](https://simonwillison.net/2026/Mar/1/ai-writing/)
- Sophie Alpert's policy, endorsed by Willison: no rewrite of natural language is lossless; the LLM lacks the author's mental model so meaning is lost; authors must stand behind every idea and sentence and be able to explain any line: [Willison, 11 Aug 2026](https://simonwillison.net/2026/aug/11/there-are-no-lossless-transformations-of-natural-language-text)
- Thomas Ptacek's copyediting rule, endorsed by Willison: use the LLM as copyeditor only; nothing it suggests goes into the text; Willison uses LLMs for fact-checking, spelling, grammar and as a thesaurus: [Willison, 17 Sep 2026](https://simonwillison.net/2026/Sep/17/how-to-write-with-an-llm/)
- Newsroom policies: WEHCO Media treats AI output as unvetted source material a human editor must check, bars AI from producing original content and requires disclosure to supervisors: [WEHCO AI policy](https://www.newstribune.com/ai-policy/). AP requires disclosure when AI materially contributes, with journalists accountable: [Media Copilot on AP](https://mediacopilot.ai/ap-ai-newsroom-standards-update/). Australian LINA template: journalists disclose AI use at any stage to their editor; generating content in its entirety is prohibited: [LINA template](https://lina.org.au/wp-content/uploads/2025/07/AI-Policy-Template-Internal-July-2025.docx)
- Ethan Mollick frames AI as co-worker and coach and says he wrote Co-Intelligence himself while using AI tools; I found no source describing his use of AI as interviewer: [Macmillan community blog](https://community.macmillan.com/t5/bits-blog/ethan-mollick-s-ai-quot-critics-quot/m-p/20019)

### Inferences
- The Willison / Alpert / Ptacek position and the ghostwriting position agree on one point: the words that carry judgment must originate with the principal. Ghostwriters get there by drafting from his recorded talk; Willison by writing it himself. For Chadwick, the structural equivalent is drafting from his transcripts and correction history (talk to draft), with the model arranging and the principal's own phrasing preserved, then a separate check pass.
- WEHCO's "AI output is unvetted source material" framing is the fact-checker model applied to the model itself.

### Gaps
- No primary source found on AI-as-interviewer practice (model asks the principal questions to extract material). Every's guide gestures at it via live conversation only.
- No published, sourced talk-to-draft pipeline from a named writer beyond Shipper's partial description.

## 5. Efficiency: what reduces review rounds for the principal

### Takeaway
Every professional workflow found reviews small and structural things first: a voice sample before a manuscript, topline messages before a speech draft, a central "nutshell" paragraph before structure. No source found quantifies the saving.

### Cited Findings
- Scribe: sample chapter approval before full manuscript; memoir voice checkpoints at early pages and midpoint: [Scribe business book](https://scribemedia.com/service/business-book-ghostwriter); [Scribe memoir](https://scribemedia.com/service/memoir-writing-services/)
- Speechwriting: topline messages reviewed with the principal before drafting; nutshell paragraph sets structure: [IGI Global preview](https://igi-global.com/article/inside-the-presidential-speechwriting-process/153599)
- Even with that, policy speeches ran three to eight drafts in the Nixon era and close to nine under Truman, with circulation to many reviewers: [Nixon Foundation](https://backup.nixonfoundation.org/?p=1261); [Truman Library](https://www.trumanlibrary.gov/oralhist/nash7.htm)
- Bush White House centralised changes through one coordinator (Staff Secretary) so the principal saw consolidated drafts: [George W. Bush Library](https://georgewbushlibrary.gov/topics/speeches)
- Shingo: inspection placed at each step with immediate feedback locates causes; end of line inspection finds defects after the cost is incurred: [mistakeproofing.com](https://mistakeproofing.com/a-brief-tutorial-on-mistake-proofing-poka-yoke-and-zqc/)
- Checker practice puts verification before the editor's final decision, so the editor arbitrates only contested points: [CJR](https://www.cjr.org/the_delacorte_lectures/how-fact-checking-and-reporting-mix.php)

### Inferences
- The principal's review time is best spent where only he can judge: concept, claims he would stand behind, voice recognition. Accuracy and mechanical style can be cleared by separate passes before he sees anything, so his rounds are not spent on errors a checker could catch.
- Reviewing structure before prose is the shared pattern; reviewing a short sample before volume is the second. Both make each correction cheaper because less text is wasted.

### Gaps
- No empirical source found on review round counts versus review unit size or structure first ordering in writing workflows. Any claim about the size of the saving would be invented.
