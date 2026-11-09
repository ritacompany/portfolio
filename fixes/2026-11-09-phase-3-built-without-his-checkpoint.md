# Fix: a whole phase of visual work was built and reported with no check-in with him

Status: not verified

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
Files changed: this record only. The proposed enforcement is for him to decide: a PreToolUse hook on writes under site/css, site/*.html and scripts/framework-page/ that blocks unless his latest message approves that work (the same pattern as figma-build-gate.mjs and decision D5). Its cost is that it would also stop the other session's Phase 2 edits until he approves them.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done. The fix is not applied until he picks it.
Before: built the whole phase, then asked "Do the 390 versions in docs/responsive/ ... read right to you?"
After: not available.
Check result after: not run.
Second case: not run.
Enforcement test: not run.

## Report
Unverified: everything. He decides whether to add the site/ approval gate. If he does, it gets built and tested by blocking a write to site/css without his approval, then allowing it after a yes. Until then, the only enforcement is him.
