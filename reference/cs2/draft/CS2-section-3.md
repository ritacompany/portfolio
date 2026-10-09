# CS2 section 3: Capacity and target date

Status: talking, opened 2026-10-08.

Job: how much each week holds comes from the time the user says they have.

---

## What the record holds

**The question is old; the answer is late.** "How do we best determine the optimal amount of tasks per
week?" was a strategy task on 16 Mar 2025 [Discord 1350932813574181018]. It was settled on 7 May 2026.

**Michael's formula, Mar 2025.** AI estimates hours per task; start from 40 hours, subtract unavailable
hours (from the calendar or user input), fit tasks into what is left [Discord 1353116991443177482]. He
pushed back: "the formula doesn't take everything into account" [same]. Michael thought it needed no
solving; he was "convinced... it's a little more complex 'mathematically'" [1353535890797887519].
Notion QN1:1337 to 1362 holds the same formula.

**Calendar's real job, Nov 2025.** His notes: "Use the user's schedule solely to determine availability
for finding the ideal journey plan" [Discord 1438594746103758889]. Availability, not appointments.

**Capacity proposed, 30 Apr to 7 May 2026.** Weekly availability as "a new thing we need to add"
[7224289a #0076]. On 7 May he corrected a hard weekly cap to load per item and proposed declared weekly
hours in the same turn [92eca2a4 #0002]. The week is assembled to capacity, not capped. Capacity exists
because rollover needed a denominator (`reasoning/carry-over.md` section 8.5). Rollover itself is
section 5.

**Declared, not observed.** Archive: observed capacity has a two to three week cold start where the
product has no idea what to serve. ARCHIVE ONLY: the reason is not found in his words yet.

**Where it is set: decided, unmade, remade.** Onboarding, then moved to the first start of week on
19 May after the cold start critique [687cd4e2 #0048], then back to onboarding on 31 May on scope
[#0010 of 2026-05-31]. The critique was never rebutted (`reasoning/capacity.md` section 1).

**Target date.** Generated from capacity and total workload at onboarding; stable, not locked; moves only
when an input changes (archive). The capacity screen updates six dates (journey plus five Pathways). Live,
600ms debounce and commit were built behind a toggle; commit won because live updating teaches a faster
loop than the product delivers [2026-05-17 #0022, #0025].

**Bounds.** 4 to 40 hours. The floor is his: one hour a week "discredits the importance of taking the
journey seriously" [687cd4e2 #0002]. No global cap on raising (CHADWICK_ANSWERS 2026-08-27).

**Changing it.** From the Growth Journey target, start of week and Settings, applies next week, with a
quiet "apply this week" link [687cd4e2 #0002 to #0009]. His test of the delay: some anxiety "is
actually productive to the user" [#0004].

**Belongs elsewhere.** Pace (section 4), rollover (5), Recalibration and the lower only cap (6).

## Open, for him

1. Declared over observed: was the cold start his reason, or the archive's?
2. Michael's formula: what did it leave out, in his view?
3. The section's angle: the formula he pushed back on, or the reversal on where capacity is set.
