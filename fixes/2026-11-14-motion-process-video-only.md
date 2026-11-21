# Fix: the motion process only knows rendered video, so live page animation has no rules or patterns

Status: verified

## Evidence
Bad output: `.claude/motion-rules.md` Scope: "These rules cover motion inside media: loops, a rotating phone, scroll driven mockups and any clip rendered to video." and "Page entrances that already run on the browser clock (text fades, image reveals, smooth scroll) stay as built ... reviewed in the browser, not rewritten to fit this contract." The code-motion skill description ends "or a clip rendered to MP4". In this session I told Chadwick "Our clips are rendered video with nobody tapping", which he flagged as wrong.
Expected: live browser motion (scroll entrances, stagger, pins, scrubs, hover) is the default kind of motion on a page, with its own rules, review steps and a pattern library; rendered video is one case of it.

## Chain
Input: the material existed. Live motion is built in `site/haven/haven.js` (text stagger 0.15 s, mask curtain), `site/haven/profile-scroll.js` and `site/js/motion.js` (GSAP, ScrollTrigger, Lenis). The Haven motion plan settled the grammar and the rejected list, but only on branch `haven/case-study`, never on main.
Instruction: no instruction for live motion exists on main. The only motion rules are the clip render contract.
Loaded: `.claude/motion-rules.md` loads through the code-motion skill, whose trigger names MP4, loops and a rotating phone. A session planning a scroll section has no trigger word to load it, and if it does load it, the scope line tells it live motion is out of scope.
Conflict: the scope line contradicts `reports/homepage-animation-audit.md`, which recommends the Haven live grammar (Lenis, text fade, media curtain) as the site wide base.
Enforcement: none. Nothing makes a session read the Haven plan or the audit before planning page motion.
Check: none. Nothing checks a motion plan for the live or clip choice.

## Causes
- Cause 1: the motion studio was installed from a zip built for rendering clips (commit 8093409, "from the motion-studio zip") and its scope line turned live motion into an exemption instead of a kind. | For: the scope line quoted above; every review step is a render step; the skill trigger names only clip words. | Against: the line does say live entrances exist, so a careful session could still plan them, just with no rules.
- Cause 2: the live motion knowledge lives per case study (Haven plan on another branch, haven.js comments) and was never lifted into a portfolio wide file. | For: `docs/HAVEN_MOTION_PLAN.md` is absent on main; the audit points at it as if it were. | Against: even if it were on main, nothing in the motion rules points to it.
History: no earlier fix record for motion. The review loop was tightened once (5d814cf), still clip only.
Chosen cause: Cause 1, with Cause 2 as the reason nothing filled the gap. The scope line is the first broken link: it actively routes live motion away from the process.

## Layer
Layer: 3
Why not earlier layers: layer 1 alone (deleting the scope line) leaves live motion with no rules, patterns or review; layer 2 does not apply because no template or script produces the bad plan, the rule file itself does.
Replaces: n/a

## Check
Check: `node reports/motion-knowledge/check-kb.mjs <rules> <skill> [patterns]` on the knowledge, plus a blind reviewer on fresh plans with these yes/no questions: does the plan build the piece live in the page? does it use a named pattern from motion-patterns.md with its timing? does it avoid every rejected pattern? does its review step capture the live page at 1440 and 390 with reduced motion?
Result on bad output: FAIL. "rules exempt live page motion", "rules have no Live section", "review loop has no live capture", "skill trigger lacks stagger", "skill trigger lacks sticky" and all eight scroll patterns and seven UX laws missing.

## Change
Files changed: proposal only, in `reports/motion-knowledge/`: `motion-rules.md` (restructured into both kinds, live, clip and one review loop with live capture), `motion-patterns.md` (new: eight scroll patterns with status here, craft rules, animation principles and UX laws mapped to the system), `code-motion-SKILL.md` (trigger and steps cover live). On approval they replace `.claude/motion-rules.md` and `.claude/skills/code-motion/SKILL.md`, add `.claude/motion-patterns.md`, and the CLAUDE.md motion line names both files.
Instruction lines: +103 / -80 (rules 75 and skill 28 replace rules 59 and skill 21), plus 68 lines of pattern reference
Net growth reason: live motion had no rules at all; the growth is the live section and the live review capture. The pattern file is reference read on demand, not standing instruction.

## Verification
Fresh run: three fresh Sonnet sessions on 14 Nov, each with only the repo files. Before: old rules from git (f9fae97~1) on CS2 section 1 block 1. After: installed rules on the same block. Second case: installed rules on the homepage work cards. Graded on the four questions in Check.
Before: "Rendered video clip, not live in the page ... a window.seek(t) page rendered to MP4". Pieces rise 6 percent on entry. Review is render, contact sheet, strips and sha256 only. Fails all four questions.
After: "Live, in the page ... the rules default to live." Shared curtain, then the four pieces stagger in 0.18 s apart on the TYPE spring, fade and scale in place with no rise. Review in the built in browser at 1440 and 390 plus reduced motion. Passes all four.
Check result after: PASS on all four questions; `check-kb.mjs` prints KB_PASS on the installed files.
Second case: homepage cards plan is live, uses the shared curtain and text fade with timings, excludes masked rise, tilt, blur and parallax, keeps hover inside 0.4 s and reviews live at 1440 and 390 with reduced motion. PASS on all four.
Enforcement test: n/a

## Report
Unverified: none for the planning step. A built piece has not yet gone through the new live review loop.
