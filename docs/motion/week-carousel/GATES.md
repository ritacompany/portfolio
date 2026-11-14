# Gates: Start of week carousel (research, options, build)

OWNS: docs/motion/week-carousel/**, site/dev/week-carousel/**, site/dev/framework-carousel/**, scripts/check-week-carousel.mjs, site/js/start-of-week.js, site/assets/framework/week-card-*, the Start of week parts of site/css/framework.css, site/js/site.js, site/mondai/framework/index.html, scripts/framework-page/build.py and page.tpl

Scope: research on his carousel issues with sources, an options tool he tried, and his picks built on the live framework page, checked at 1440, 768 and 390 with reduced motion on and off.

- [x] G1: the options tool he tuned in is in the repo with all three text options and the template number control
  CHECK: node -e "const t=require('fs').readFileSync('site/dev/week-carousel/index.html','utf8');const ok=['\"a\", \"A Crossfade','\"b\", \"B Rise','\"c\", \"C Tied','key: \"label\"','edit-panel.js'].every(s=>t.includes(s));if(ok)console.log('TOOL_OPTIONS_OK')"
  EXPECT: TOOL_OPTIONS_OK
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=af40fa337aedac3c6b2070a6547e27d553092654a93c8acd4840040ce82edd42; output-bytes=16

- [x] G2: the research answers the order question with NN/g's placement finding and names what no study settles
  CHECK: node -e "const t=require('fs').readFileSync('docs/motion/week-carousel/research.md','utf8');if(t.includes('4-ios-rules-break')&&t.includes('directly below the elements they control')&&t.includes('What I could not find'))console.log('ORDER_RESEARCHED')"
  EXPECT: ORDER_RESEARCHED
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1ca24b770c8211d6ae5947571b2facaf8cff92faeee0cecee3c9fdf0c1312004; output-bytes=17

- [x] G3: Chadwick picked: A crossfade, dots first, no hint, 900 ms, side cards 0.65 and 0.40, number swaps with the dot; and said "Feels right, build it" on the preview artifact (13 Nov)
  EVIDENCE: manual, his messages in this session: the pasted edit panel values of 12 Nov 18:43 (A, dots first, hint off, 900 ms, 0.65, 0.40), "Swap", and "Feels right, build it" after artifact version 2.

- [x] G4: the live page carries the new carousel with its picks and none of the old markup, and the generator writes the same carousel
  CHECK: node -e "const fs=require('fs');const p=fs.readFileSync('site/mondai/framework/index.html','utf8'),j=fs.readFileSync('site/js/start-of-week.js','utf8'),b=fs.readFileSync('scripts/framework-page/build.py','utf8');const ok=p.includes('class=\"sow\"')&&!p.includes('class=\"week')&&!p.includes('Scroll to view more templates')&&p.includes('start-of-week.js')&&/DUR = 900, SIDE_SCALE = 0.65, SIDE_BRIGHT = 0.4/.test(j)&&b.includes('sow__stage');if(ok)console.log('LIVE_CAROUSEL_OK')"
  EXPECT: LIVE_CAROUSEL_OK
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f6e0844f37ff69fe6a763bc7193da5fb7a4ac1101ca0690d67ebc5d948837627; output-bytes=17

- [x] G5: on the live page in a real browser, at 1440, 768 and 390 with reduced motion off and on: Clean slate centered with nothing left of it, side cards at 0.65, no sideways page scroll, the template line never fades and its number matches the dot, one template per move, a vertical scroll never moves the cards
  CHECK: node scripts/check-week-carousel.mjs http://localhost:8765/mondai/framework/ /tmp/week-carousel-gate
  EXPECT: CAROUSEL_CHECK_PASSED
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=79d3965b6073b99d095acbd00e7e564f1cdcbfda1f5d8106c20122144d8a0d2d; output-bytes=1974
