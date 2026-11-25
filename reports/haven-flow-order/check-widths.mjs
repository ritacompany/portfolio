import { chromium } from "playwright";
const b = await chromium.launch();
for (const w of [320,360,375,430,560,767]) { const p = await (await b.newContext({viewport:{width:w,height:844}})).newPage();
await p.goto("http://127.0.0.1:4400/haven/");
const r = await p.evaluate(()=>{ const m=document.getElementById('flow-map'); const xs=[...m.querySelectorAll('.flow__step')].map(e=>e.getBoundingClientRect().right); return {v:m.classList.contains('is-vertical'), maxRight:Math.round(Math.max(...xs)), sw:document.documentElement.scrollWidth}; });
console.log(w, JSON.stringify(r)); }
await b.close();
