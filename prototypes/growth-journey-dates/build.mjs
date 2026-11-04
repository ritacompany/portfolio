import fs from 'node:fs';
const here = new URL('.', import.meta.url);
const motion = fs.readFileSync(new URL('../../site/lib/motion.js', here), 'utf8').replace(/^export /gm, '');
const html = fs.readFileSync(new URL('template.html', here), 'utf8').replace('/*MOTION*/', () => motion);
fs.writeFileSync(new URL('growth-journey-dates.html', here), html);
console.log('built growth-journey-dates.html', html.length);
