# Fix: <one-line description of the failure>

Status: <verified | not verified>

## Evidence
Bad output: <quote the actual failing lines or output>
Expected: <what should have come out>

## Chain
Input: <did the agent have what it needed? evidence>
Instruction: <does the instruction exist? where?>
Loaded: <was that file read at that point? evidence>
Conflict: <does anything say the opposite? quote it, or "none found in: <files checked>">
Enforcement: <what stopped the step being skipped? "agent told to" = nothing>
Check: <what would have caught it before the user saw it?>

## Causes
- Cause 1: <cause> | For: <evidence> | Against: <evidence>
- Cause 2: <cause> | For: <evidence> | Against: <evidence>
History: <earlier fixes for this same failure and what they were>
Chosen cause: <which one, and why the evidence favors it>

## Layer
Layer: <1-6>
Why not earlier layers: <one line per earlier layer>
Replaces: <for layer 6 only: the existing line this replaces; otherwise n/a>

## Check
Check: <the pass/fail check on the output: script path and command, or a yes/no reviewer question>
Result on bad output: <must say FAIL, with the output>

## Change
Files changed: <list>
Instruction lines: +<added> / -<removed>
Net growth reason: <required if added > removed; otherwise n/a>

## Verification
Fresh run: <how the process was re-run in a fresh context, and where its output is>
Before: <bad output excerpt>
After: <new output excerpt>
Check result after: <must say PASS, with the output>
Second case: <a second section, file or input, and its result>
Enforcement test: <for layer 4: show it blocking a run that skips the step; otherwise n/a>

## Report
Unverified: <what is not proven and what the user must run or decide; "none" only when Status is verified>
