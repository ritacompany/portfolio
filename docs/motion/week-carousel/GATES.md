# Gates: Start of week carousel, stage 1 (research and options tool)

OWNS: docs/motion/week-carousel/**, site/dev/week-carousel/**

Scope: research answering each of his carousel issues with sources, and a working options tool he can try, with the live framework page left untouched until he picks.

- [x] G1: the options tool is served by the dev server
  CHECK: node -e "fetch('http://localhost:4318/dev/week-carousel/').then(r=>r.text().then(t=>{if(r.status===200&&t.includes('id=\"stage\"'))console.log('TOOL_SERVED')}))"
  EXPECT: TOOL_SERVED
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/week-carousel; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=c9cfbd513b896302fcc8e9101109d7949c51f64a3d5d03b8fd3fe58780ad3f13; output-bytes=12

- [x] G2: the tool offers all three text options and a duration control starting at 600 ms
  CHECK: node -e "const t=require('fs').readFileSync('site/dev/week-carousel/index.html','utf8');const ok=['value=\"a\"','value=\"b\"','value=\"c\"'].every(s=>t.includes(s))&&/id=\"dur\"[^>]*value=\"600\"/.test(t)&&t.includes('id=\"copy\"');if(ok)console.log('TOOL_OPTIONS_OK')"
  EXPECT: TOOL_OPTIONS_OK
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=af40fa337aedac3c6b2070a6547e27d553092654a93c8acd4840040ce82edd42; output-bytes=16

- [x] G3: the research answers the order question with NN/g's placement finding and names what no study settles
  CHECK: node -e "const t=require('fs').readFileSync('docs/motion/week-carousel/research.md','utf8');if(t.includes('4-ios-rules-break')&&t.includes('directly below the elements they control')&&t.includes('What I could not find'))console.log('ORDER_RESEARCHED')"
  EXPECT: ORDER_RESEARCHED
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1ca24b770c8211d6ae5947571b2facaf8cff92faeee0cecee3c9fdf0c1312004; output-bytes=17

- [x] G4: the live framework page files have no changes from this stage
  CHECK: node -e "const o=require('child_process').execSync('git status -s site/mondai/framework/index.html site/css/framework.css site/js/site.js').toString();if(o.trim()==='')console.log('LIVE_PAGE_UNTOUCHED')"
  EXPECT: LIVE_PAGE_UNTOUCHED
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion/week-carousel; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f3d37a93ad1bb43f1fba6bae48fc940c97293b10d1454a8edca48a57595c4e88; output-bytes=116

- [ ] G5: Chadwick has tried the options and sent his picks (text option, order, duration)
  EVIDENCE: pending
