# Fix: a whole phase of visual work was built and reported with no check-in with him

Status: verified

## Evidence
Bad output: from his one message ("I feel like we should still be making moves forward... the button takes less priority than just setting things up"), the session picked Phase 3 by itself and built phone, tablet and laptop layouts for Home, the Mondai page and the Framework case study. It pushed them and opened a draft PR without showing him a single picture along the way. Then it ended with "Do the 390 versions in docs/responsive/ (home-390.webp, collection-390.webp, framework-390.webp) read right to you?". His reply: "390 versions of what? ... You're not showing me anything at any point to this process ... there's been no confirmation with me at all."
Expected: before building, one short message in plain words: what I'm about to do next (make the pages work on phones), why it's the right next step, and one picture of the proposed phone layout for one page. Build the rest only after his yes, and show the result as one picture in the chat, not a folder of files.

## Chain
Input: yes. docs/SITE_BUILD_PLAN.md, Gaps found 1: "I propose 390 wide compositions per page in the browser for his review, then he decides whether any need a Figma frame."
Instruction: CLAUDE.md, Who approves: "nothing about how he is presented gets decided without him. Choices inside work whose direction he has already set are yours." The plan's Phase 3 row says the phase is done when "he approves the 390 versions".
Loaded: yes. Both files were read before the work began (CLAUDE.md is injected; the plan was read through git show).
Conflict: his user preferences say "Default to deciding ... Ask me only when the answer depends on something only I hold" and "Do not send intermediate progress or status messages". The /unlazy skill pushes to run to completion against gates. His message pushed for momentum. Read together, these let the session treat a new phase's layouts as "work whose direction he has already set". Nothing marks phone layouts as presentation that needs him first.
Enforcement: none. The approval sits at the end of the phase ("he approves the 390 versions"), after everything is built. Every unlazy gate was a machine check, plus one manual gate (G7) where the session reviewed its own screenshots. The question-box hook enforces how a question is formatted, not when he gets asked.
Check: one picture in the chat before the build, with a yes or no from him. Nothing in the setup requires that.

## Causes
- Cause 1: his approval sits after the build, not before it. | For: the plan's done condition is "he approves the 390 versions"; the session built everything, then asked. | Against: the Gaps note does say "propose ... then he decides", which a careful reading takes to mean before.
- Cause 2: autonomy rules beat the approval rule when they collide, because nothing defines visual layouts as presentation. | For: the session's own reasoning cited "default to deciding" and "he said keep moving"; the CLAUDE.md approval line is general and has no examples. | Against: the session could still have asked; the rules do not forbid asking.
- Cause 3: the report spoke in build terms (390, gates, PR, branches) and pointed at files rather than showing anything. | For: the "Cut UX jargon" rule exists and was broken; he says he doesn't know what "390 versions" means. | Against: this explains the confusion, not the missing checkpoint.
History: fixes/2026-11-09-interactive-called-done-before-felt.md (same day): the Contact button was reported done before he had felt it. That fix added text to motion-rules.md (layer 6) and was marked not verified. The same pattern came back today in a different area: gates go green and the work moves on without his step. A second text rule would repeat a failed experiment.
Chosen cause: Cause 1, with Cause 2 as what let it happen. The checkpoint exists only as an end-of-phase approval, so nothing stops a session from building a whole phase first.

## Layer
Layer: 4
Layer note: enforcement outside the agent, proposed and not built. Building a gate on his workflow without his yes would repeat the exact failure he is reporting.
Why not earlier layers: 1, removing the conflict means changing his own autonomy preferences, which is his call. 2, there is no template or script that produces this; it is a sequencing problem. 3, moving "show him first" earlier in the plan is still text that the same session can skip, and this pattern already beat a text fix today. 5 and 6 are text, see History.
Replaces: n/a

## Check
Check: yes or no question for a separate reviewer reading the transcript: "Before the first file under site/ changed for a new phase or a new page layout, did Chadwick see a picture of the proposed result in the chat and reply yes to it?"
Result on bad output: FAIL. The first site/ change (site/css/tokens.css breakpoints) came before any picture. The first picture he was pointed to was a folder of nine screenshots, offered after the push.

## Change
Files changed: .claude/hooks/site-review-gate.mjs (new: refuses changes to the shipped site without his approval), .claude/settings.json (registers it on Write, Edit, MultiEdit, NotebookEdit and Bash), .claude/hooks/tests/site-review-gate-cases.mjs (20 cases), docs/SITE_BUILD_PLAN.md (Review loop section, the one place the loop is written), scripts/build-preview.mjs (rebuilds the preview link he tries things on). His yes to "loop plus block" came through a question card on 9 Nov.
Instruction lines: +17 / -0
Net growth reason: the loop did not exist anywhere as steps; the 17 lines are the loop itself plus the preview link and the approved and unapproved list. The block, not the text, holds step 2.

## Verification
Fresh run: a subagent in a fresh context was asked to edit site/css/collection.css. The hook refused it with the loop message, and the file is unchanged (git diff clean).
Before: Phase 3 tokens.css and layout changes went in with no approval from him anywhere in the transcript.
After: "Blocked by the site review loop: Chadwick has not approved a change to the site in his recent messages ..." on an Edit in this session (his latest message was a question, not a yes) and in the fresh subagent.
Check result after: PASS. node .claude/hooks/tests/site-review-gate-cases.mjs prints SITE_GATE_OK 20/20: approvals, an expired yes, a stop after a yes, untagged and tagged question cards, shell writes and reads, and a docs write that only mentions the site folder.
Second case: a Bash write into the site (redirect, cp, python open with w, running the Framework generator) is blocked; the same writes into site/motion-lab, where proposals go, stay open.
Enforcement test: the live Edit above, refused in this session; and the subagent's Edit, refused.

## Report
Unverified: the block lives on branch claude/relaxed-ride-5mlbdu. It reaches the other site build session and new sessions only once that branch is merged into the branch they work from (claude/lucid-carson-u56t7v, and main at launch). Approval is read from his recent words, so a yes about something else within his last three messages would let a change through; the session still has to show him the piece first.
