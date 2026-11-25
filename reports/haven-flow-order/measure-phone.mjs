import { chromium } from "playwright";
const b = await chromium.launch(); const p = await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.goto("http://127.0.0.1:4400/dev/haven-flow-vertical/");
console.log(JSON.stringify(await p.evaluate(()=>{const q=s=>{const r=document.querySelector(s).getBoundingClientRect();return [Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(r.height)]};
const cs=getComputedStyle(document.querySelector('.flow__num'));
return {copy:q('.journey__copy'),flow:q('#flow-map'),box:q('.flow__box'),stage:q('#flow-stage'),step:q('.flow__step'),num:q('.flow__num'),numFont:cs.fontSize+' '+cs.fontFamily, stepFont:getComputedStyle(document.querySelector('.flow__step span')).fontFamily, m:getComputedStyle(document.documentElement).getPropertyValue('--m'), row:q('#journey-row'), next:q('.profile')}})));
await b.close();
