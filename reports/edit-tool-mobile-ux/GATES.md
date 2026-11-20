# Gates: edit tool mobile UX report

- [x] G1: Summary sits at the top of the report
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8').split('\n');console.log(t[2].startsWith('**Summary.**')?'SUMMARY_OK':'NO')"
  EXPECT: SUMMARY_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=9e147b564667f184c02e0f461108fba7ead4db94b0b829b645d508e3fb3a9af3; output-bytes=11
- [x] G2: At least six apps studied, each section carrying a link
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8');const s=t.split(/\n### 3\.\d /).slice(1,9);const n=s.filter(x=>/\]\(https?:/.test(x)).length;console.log(n>=6?'APPS_OK '+n:'APPS_LOW '+n)"
  EXPECT: APPS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=83d78c64905eeadd88529f9a4339f3976256b9c486806079c8d9dfffde5840b4; output-bytes=10
- [x] G3: Component shortlist present with at least five linked entries
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8');const s=t.split('## 4.')[1].split('## 5.')[0];const n=(s.match(/^\| \d+ \|.*\]\(https?:/gm)||[]).length;console.log(n>=5?'COMP_OK '+n:'COMP_LOW '+n)"
  EXPECT: COMP_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f58a78e1e4c13125cabb50c6da7e53f4ba3ee1c3fa26c77c491326fa9bc9aff7; output-bytes=10
- [x] G4: One wireframe per state, eight states
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8');const s=t.split('### 5.11')[1].split('### 5.12')[0];const st=(s.match(/\*\*State \d/g)||[]).length,fr=(s.match(/\x60\x60\x60\n/g)||[]).length/2;console.log(st===8&&fr===8?'WIRE_OK':'WIRE_BAD '+st+' '+fr)"
  EXPECT: WIRE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1d0d674444b80be96c22818a662f91a33a548c05908a833dfd5c9ac913ae5535; output-bytes=8
- [x] G5: Every Safari detail the brief named is in the spec
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8');const m=['100dvh','env(safe-area-inset-bottom)','touch-action: manipulation','16px','visualViewport'].filter(k=>!t.includes(k));console.log(m.length?'MISSING '+m:'SAFARI_OK')"
  EXPECT: SAFARI_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=0da0150c5cd265e646c847ce8e75852370689225298109161f568030cfe02ca0; output-bytes=10
- [x] G6: Spec covers every part the brief listed
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8');const m=['375','430','Breadcrumb','Up to parent','Width scope','Compare','Undo and redo','Copy changes','Colour','preventDefault'].filter(k=>!t.includes(k));console.log(m.length?'MISSING '+m:'SPEC_OK')"
  EXPECT: SPEC_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=b2f2f578ce2787456311e4f021313c4b8223dcffddedfe5b5c93ee8f115a7938; output-bytes=8
- [x] G7: No em or en dashes and no double hyphen dashes in prose
  CHECK: node -e "const t=require('fs').readFileSync('REPORT.md','utf8');const bad=[...t].filter(c=>c.charCodeAt(0)===8212||c.charCodeAt(0)===8211).length+(t.match(/\x20\x2d\x2d\x20/g)||[]).length;console.log(bad?'DASH '+bad:'NODASH_OK')"
  EXPECT: NODASH_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio/reports/edit-tool-mobile-ux; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=a7c16f00179aadfbd6ee51dc306a0e060316f2439ef546e96768bf7536dd209e; output-bytes=10
