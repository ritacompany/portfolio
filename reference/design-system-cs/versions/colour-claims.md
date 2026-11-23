# Colour, round 1: factual claims and their sources

23 Nov 2026. Every factual claim the three colour versions make, written without the draft around it, for an
independent check. Paths starting `mondai/` are in the Mondai repo (`/home/user/mondai`); others are in this repo
under `reference/design-system-cs/`. Verdicts are filled in below by the checking agent.

| Id | Claim | Source |
| --- | --- | --- |
| K1 | The library held 3,555 colour paints and the MVP screens about 40,000, grouped by the job each colour does. | N30 in NUMBERS.md; mondai/process/token-picker/colour-by-job/LIST.md |
| K2 | Each job got one token, set at the colour the screens already used most for that job. | N30; LIST.md opening |
| K3 | His rulings came on 11 sheets, one per kind of element (accent text, selected states, card outlines and so on). | N31; mondai/process/token-picker/colour-by-job/sheets/INDEX.md; HIS-DECISIONS-21OCT.md |
| K4 | Accent text on the screens came in five different greens. | sheets/INDEX.md, section 01 |
| K5 | Accent text was ruled to one green, Green/400 (#39F145), which was the most used for that job and is the primary button green. | HIS-DECISIONS-21OCT.md item 1; sheets/INDEX.md section 01 |
| K6 | 551 layers on the MVP moved to that one green; 6 were put back because pathway progress is not accent text. | N31; mondai/process/token-picker/colour-by-job/CHANGELOG-mvp.md |
| K7 | Elements were compared by what they do and how they are used, never because they share a colour or an outline; a button and a field are not one job because both have an outline. | DECISION-INVENTORY.md, Foundations, 21 Oct 2026; HIS-DECISIONS-21OCT.md opening principle |
| K8 | Card outlines came in four greys; one grey was ruled for cards (the one the navigation uses), another for raised areas inside a card, and states keep their own (a completed item is darker on purpose). | sheets/INDEX.md section 03; HIS-DECISIONS-21OCT.md item 3 |
| K9 | Pressed is one step lighter than hover, green included; text in hover and pressed is never dimmer than text at rest. | DECISION-INVENTORY.md, Foundations, 22 Oct 2026; mondai/mondai/reference/DECISIONS.md, 22 Oct 2026, States |
| K10 | The reason: on a near black page darker states sink into the page, and lighter states read as a response. | mondai/mondai/reference/DECISIONS.md, 22 Oct 2026, States (Why) |
| K11 | An icon beside text sits one step darker than that text. | HIS-DECISIONS-21OCT.md item 9 |
| K12 | Raw values (primitives) were 65% to 78% of every colour picker. | N32; mondai/process/token-picker/token-org/MEASURE.md |
| K13 | Raw values were taken out of the pickers so people and agents pick roles only; existing bindings kept working and no layer changed colour. | N32; mondai/mondai/reference/DECISIONS.md, 22 Oct 2026, roles only in the pickers |
| K14 | Three roles were renamed for what they paint; Text/Placeholder became Text/Meta because 2 of its 213 layers were placeholders. | N32; DECISIONS.md, 22 Oct 2026, roles only in the pickers |
| K15 | A leaner public colour system (such as Radix or Material 3) was the alternative weighed; it would have recoloured the screens. | DECISIONS.md, 22 Oct 2026, roles only in the pickers (Why) |
| K16 | He found the colour system confusing to use himself before the picker change. | DECISION-INVENTORY.md, Foundations, 22 Oct 2026 (What prompted it) |
| K17 | Gold is not part of the system: it never existed in the file (no value, no ramp, no variable) and spread because it was written down and then repeated. | DECISION-INVENTORY.md, Foundations, 19 Aug 2026; DECISIONS.md, 19 Aug 2026 |
| K18 | The product is dark only, one mode, so developers set up one theme and nothing waits on a light theme. | DECISION-INVENTORY.md, Foundations, 2 Oct 2026; DECISIONS.md, 2 Oct 2026 |
| K19 | Fresh agents rebuilt a known screen from the library alone, in three runs. | N17; mondai/design-system-ai/evidence/AGENT-TEST-BEFORE.md |
| K20 | Every colour on the layers the agents made was bound to a published role. | mondai/design-system-ai/evidence/AGENT-TEST-BEFORE.md (What every run got right) |
| K21 | The agents read Text/Display as a size rather than as the brightest text: no run used it for the screen's primary text. | AGENT-TEST-BEFORE.md (What went wrong, item 1) |
| K22 | Text/Accent renders #39F145. | AGENT-TEST-BEFORE.md (item 1, run 3 note) |
| K23 | Every selected outline is 1px, inside, Green/400. (Not used in copy; image note only.) | DECISIONS.md, 22 Oct 2026, Selected outline |

## Verdicts, 23 Nov 2026

Independent check by a fresh agent (Sonnet) that saw this table and the sources, never the draft. The lead
reread the K9 source itself before acting on it. Fixed means the copy in `colour.md` was changed to match.

| Id | Verdict | Note |
| --- | --- | --- |
| K1 | MATCH | 40,000 is an estimate; copy keeps about |
| K2 | PARTLY, fixed | the audit left a few multi colour jobs for his call; one token per job is his 21 Oct ruling (inventory row), so the copy states it as the ruling's outcome |
| K3 | MATCH | 11 sheets, 11 numbered rulings |
| K4 | MATCH | five greens on sheet 01 |
| K5 | MATCH, fixed | most used is the record's reason, not his; copy now states it as a fact about Green/400, not as his reason |
| K6 | MATCH | 551 is net of the 6 put back |
| K7 | MATCH | principle and the button and field example |
| K8 | MATCH | four greys and his item 3 |
| K9 | NO MATCH, fixed | the 22 Oct pressed lighter than hover rule was replaced on 28 Oct (all hover and pressed states back to his drawing); removed from every version |
| K10 | NO MATCH, fixed | its reason went with K9; removed |
| K11 | MATCH | icon rule still current, restated 13 Nov |
| K12 | MATCH | 65% to 78% |
| K13 | MATCH | roles only, bindings kept, no colour change |
| K14 | MATCH | three renames, 2 of 213 |
| K15 | PARTLY, fixed | the record names leaner systems as the reason, not a weighed option; copy now says a leaner public palette would have recoloured the screens, without weighed |
| K16 | MATCH | he found it confusing; paraphrased, never quoted |
| K17 | MATCH, fixed | source says it never existed in the design system, not the file; copy now says it never had a value, ramp or variable; no claim about who ruled it |
| K18 | MATCH | dark only, one theme |
| K19 | MATCH | three runs; the agents also had the reference picture |
| K20 | MATCH | every colour on their own layers bound to a published role |
| K21 | PARTLY, fixed | runs 2 and 3 used Text/Display on the title, date numeral and one name; copy now says they mostly skipped it for names and titles |
| K22 | MATCH | Text/Accent is #39F145 |
| K23 | MATCH | image note only |
| K24 | MATCH | seven greys on sheet 09; N300 icons beside N300 text, so some sat in the same grey as their text |

Knock on: `../concept/DECISION-INVENTORY.md` Foundations row for 22 Oct (pressed lighter than hover) and
`../research/CONTENT.md` item 21 still present the undone rule as live. The inventory row is corrected below
this check; CONTENT.md and MATERIAL.md are left for him (MATERIAL.md is not to be edited in this round).

## Added after the humanizer pass

| Id | Claim | Source |
| --- | --- | --- |
| K24 | Icons beside text came in seven greys, and some sat in the same grey as the text beside them. | mondai/process/token-picker/colour-by-job/sheets/INDEX.md, section 09 |
