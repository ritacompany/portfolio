# Gates: designer editing systems research

OWNS: reports/designer-editing-systems/**

Scope: REPORT.md lists real candidates with links, a summary at the top, a recommendation and a first step, in house style.

- [x] G1: Report has 8 or more candidates each with a link, a top summary, a recommendation and a first step, and no dash punctuation
  CHECK: node reports/designer-editing-systems/verify.mjs
  EXPECT: report verification passed
  EVIDENCE: node verify.mjs exit 0, "report verification passed (19 candidates)"; dash detector positive control passes

- [x] G2: No Oxford commas in the report (manual read of every list of three or more)
  EVIDENCE: grep of ", and |, or " found 4 lines; all are clause joins or paired adjectives, no list ends in a comma before and/or
