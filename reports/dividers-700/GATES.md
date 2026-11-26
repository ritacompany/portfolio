# Gates: section dividers at Neutral/700

OWNS: site/css/home.css, site/css/components.css, site/css/framework.css, site/haven/haven.css, site/haven/current.css, scripts/verify-dividers.mjs, reports/dividers-700/**

Scope: every section divider on Home, Haven, the Mondai collection and the framework page computes to Neutral/700 #1d1d21 at 390, 768 and 1440, with nothing else on the site regressing.

- [x] G1: every named divider and every swept dark 1 px line that is not a card or image edge is Neutral/700 at 390, 768 and 1440
  CHECK: node scripts/verify-dividers.mjs
  EXPECT: dividers ok
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=d1ce413f1177224d174553fc73536689c351b212d92e3826ea0fb370a5f8080b; output-bytes=72

- [x] G2: site check passes
  CHECK: node scripts/check-site.mjs
  EXPECT: site check OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=56fe23ccee23c88cd1204dabb80ac34e28a5ac6abdd0c62e5faa2e532f956f21; output-bytes=27

- [x] G3: no new fit problems against the base branch baseline
  CHECK: node reports/dividers-700/compare-baseline.mjs fit reports/dividers-700/baseline/fit.txt
  EXPECT: NO_NEW_FIT_PROBLEMS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=476af46e9167025ba5816637c9f084d72e5290227fcf5cdc23ec06c172a989ee; output-bytes=20

- [x] G4: no new overlap problems against the base branch baseline
  CHECK: node reports/dividers-700/compare-baseline.mjs overlap reports/dividers-700/baseline/overlap.txt
  EXPECT: NO_NEW_OVERLAP_PROBLEMS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=57f7b82c73dbe4270f3c09df01fa1c4f228694e82cc81f8f501ea552789c9385; output-bytes=24

- [x] G5: responsive health passes
  CHECK: node scripts/verify-responsive.mjs health all
  EXPECT: RESPONSIVE_HEALTH_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=3b1dfe4adbc1d3f8a1bba687655975d9145612ba5cf9c220340f25a6e892a705; output-bytes=36

- [x] G6: responsive size passes
  CHECK: node scripts/verify-responsive.mjs size all
  EXPECT: RESPONSIVE_SIZE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=b5d2ffde6d3492c88c7adf371827e172cf8a4580d9fc968e0c3488ba08883551; output-bytes=34

- [x] G7: hover still check passes
  CHECK: node scripts/verify-hover-still.mjs site
  EXPECT: HOVER_STILL_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=69cddddcb78c9ac9ab71fbab29221e4910c779b69841949cc53156b3c95e2141; output-bytes=25

- [x] G8: one rule decides Haven's rule colour: no Neutral/675 or Neutral/800 left on .rule-b, .rule-t or .section-rule in haven.css or current.css
  CHECK: node -e "const f=require('fs');const s=f.readFileSync('site/haven/haven.css','utf8')+f.readFileSync('site/haven/current.css','utf8');const bad=s.split('\n').filter(l=>/\.(rule-b|rule-t|section-rule)\b/.test(l)&&/-{2}n(675|800)/.test(l));if(bad.length){console.log(bad.join('\n'));process.exit(1)}console.log('HAVEN_RULES_ONE_SOURCE')"
  EXPECT: HAVEN_RULES_ONE_SOURCE
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=37f54f9f3d4d/16 entries; EXPECT=matched; output-sha256=74fcf3b939ae191666646884ca0bd872d37d614be64547708957fe6641fbdc27; output-bytes=23
