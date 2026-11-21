const { chromium } = require('playwright');
const fs = require('fs');
const items = JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const F = __dirname + '/fonts'; const B=f=>fs.readFileSync(F+'/'+f).toString('base64');
(async()=>{
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(`<style>
  @font-face{font-family:Sat;font-weight:400;src:url(data:font/woff2;base64,${B('sat/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Regular.woff2')})}
  @font-face{font-family:Sat;font-weight:500;src:url(data:font/woff2;base64,${B('sat/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Medium.woff2')})}
  @font-face{font-family:Sat;font-weight:700;src:url(data:font/woff2;base64,${B('sat/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Bold.woff2')})}
  @font-face{font-family:DM;font-weight:500;src:url(data:font/woff2;base64,${B('dm/package/files/dm-sans-latin-500-normal.woff2')})}
  </style><div id=h></div>`);
  const out = await p.evaluate(async (items)=>{
    await Promise.all(['500 40px Sat','400 16px Sat','500 40px DM','700 20px Sat'].map(f=>document.fonts.load(f)));
    const h=document.getElementById('h');
    return items.map(it=>{
      const d=document.createElement('div');
      d.style.cssText=`font-family:${it.fam};font-weight:${it.wt};font-size:${it.fs}px;line-height:${it.lh}px;width:${it.w}px;white-space:pre-wrap;letter-spacing:${it.ls||0}px`;
      d.textContent=it.t; h.appendChild(d);
      const n=Math.round(d.getBoundingClientRect().height/it.lh);
      const r=document.createRange();const tn=d.firstChild;let br=[],top=null;for(let i=0;i<tn.length;i++){r.setStart(tn,i);r.setEnd(tn,i+1);const t=r.getBoundingClientRect().top;if(top!==null&&t>top+5)br.push(i);top=t;} d.remove(); return {id:it.id,ls:it.ls,lines:n,breaks:br.map(i=>it.t.slice(Math.max(0,i-12),i))};
    });
  }, items);
  console.log(JSON.stringify(out)); await b.close();
})();
