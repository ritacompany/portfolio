import fs from 'fs';
const dir = process.argv[2];
const norm = s => s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ')
  .replace(/&#x27;|&#39;|&rsquo;|&lsquo;|’|‘/g,"'").replace(/&quot;|&ldquo;|&rdquo;|“|”/g,'"').replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
  .replace(/\\u2019/g,"'").replace(/[`*_]/g,'').replace(/\s+/g,' ').toLowerCase();
const checks = [
 ['C1','p1',["400ms being a very slow animation, to be used only for big movements across large screens"]],
 ['C2','p1',["usually need a subtly longer duration than objects disappearing or exiting the screen","most frequently, you'll want to use an ease-out animation, that starts quickly but slows down"]],
 ['C3a','p2',["if you are animating something that is entering or exiting the screen, use ease-out"]],
 ['C3b','p3',["ui animations should generally stay under 300ms"]],
 ['C4','p4',["transitions that exceed 400ms may feel too slow","objects leaving the screen may have shorter durations, as they require less attention"]],
 ['C5','p5',["do not have a strong relationship to each other; uses a sequential fade out and fade in"]],
 ['C6','p6',["stretchy text looks bad"]],
 ['C7','p7',["the group animates from the before size to the after size"]],
 ['C8a','p8',["cross-document view transitions are supported in safari 18.2, chrome 126, and edge 126"]],
 ['C8b','p9',["cross-document view transitions are supported in chrome from chrome 126"]],
 ['C9','p10',["this feature is not baseline because it does not work in some of the most widely-used browsers"]],
 ['C10','p8',["the fallback behavior is to simply do nothing","simple crossfades are not known to cause adverse effects"]],
 ['C11','p9',["avoid using blocking=render unless you can actively measure"]],
 ['C12','p12',["have the same view-transition-name at the same time"]],
 ['C13','p13',["pointer hit testing must target its document element"]],
 ['C14','p14',["repaints at a non-zero opacity before recording the lcp event"]],
 ['C15','p15',["won't be executed after a page change"]],
 ['C16','p16',["without page refreshes, screen reader users may not be informed that the page has changed"]],
 ['C17','p17',["don't make people wait for an animation to complete before they can do anything"]],
 ['C18','p13',["animation-duration: 0.25s"]],
 ['C20','p19',["view transitions are the perfect material for progressive enhancement"]],
 ['C21','p20',["live representation of the state after the transition"]],
];
let bad=0;
for (const [id,f,qs] of checks){ const t=norm(fs.readFileSync(`${dir}/${f}.html`,'utf8')); for(const q of qs){ const ok=t.includes(q); if(!ok)bad++; console.log(ok?'PASS':'FAIL',id,JSON.stringify(q)); } }
console.log(bad?`FAILS ${bad}`:'ALL_MATCH');
