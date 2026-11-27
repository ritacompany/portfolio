const { chromium } = require('playwright');
const checks = [
 ['https://nessgrixti.com/portfolio/wise-multi-brand/', ['Design Lead','2024 brand refresh','2026']],
 ['https://jashamichele.com/case-studies/mds-modernizing-design-system/', ['Acting Head of Design Systems','2022-2025','composable']],
 ['https://6epixels.com/case-study/design-system', ['Sr. Manager UI/UX','2021','4 hours','30%','2026']],
 ['https://fplevi.github.io/newfolio/work/design-system.html', ['federat','up to nine','Jan 2026','50%']],
 ['https://ericknolasco.com/work/musterhall-design-system/', ['Product Design Lead','2025','Plate 01','gaps that are left','2026']],
 ['https://tympanus.net/codrops/2026/11/01/design-systems-agents/', ['November 1, 2026','bydiorama/ui','Director','Claude Code']],
 ['https://www.larserickson.design/case-studies/a-design-system-for-developers-and-ai', ['lead designer','Copilot','800+','©2026']],
 ['https://veroduplex.art/projects/design-system', ['DS Lead','2023','2024','team estimate']],
 ['https://medium.com/@vera.marshalova/optimising-the-design-system-with-the-mcp-server-096d0f7b027e', ['Senior Product Designer','Jun 16, 2025','500+','MCP']],
 ['https://medium.com/design-bootcamp/building-scaling-a-global-enterprise-design-system-a-case-study-c90f3505dd1b', ['How I led','Apr 9, 2025','251 out of 280','Library-wide versioning','Wesco']],
];
let bad=0;(async()=>{const b=await chromium.launch();const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
for(const [u,ks] of checks){const ctx=await b.newContext({viewport:{width:1440,height:900},userAgent:UA});const p=await ctx.newPage();try{const r=await p.goto(u,{waitUntil:'domcontentloaded',timeout:45000});await p.waitForTimeout(3000);
for(let i=0;i<15;i++){await p.mouse.wheel(0,2500);await p.waitForTimeout(200);}
const t=(await p.evaluate(()=>document.body.innerText)).toLowerCase();const login=/sign in to (continue|read)|member-only story/.test(t);
if(r.status()!==200||login||ks.some(k=>!t.includes(k.toLowerCase())))bad++;console.log(r.status(), login?'LOGIN?':'public', u, ks.map(k=>`${t.includes(k.toLowerCase())?'Y':'N'}:${k}`).join(' | '));}catch(e){bad++;console.log('ERR',u,e.message.split('\n')[0]);}await ctx.close();}
await b.close();console.log(bad?'CLAIMS-FAIL '+bad:'CLAIMS-PASS');process.exit(bad?1:0);})();
