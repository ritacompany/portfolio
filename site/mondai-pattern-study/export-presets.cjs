const fs = require('node:fs');
const path = require('node:path');
const pattern = require('./pattern.js');

for (const style of Object.keys(pattern.arrangements)) {
  const layout = pattern.compose({ style, seed: 1, count: 3 });
  const { svg, count } = pattern.render(layout, { pitch: 5, scale: 1, tile: 0.82, opacity: 0.78 });
  fs.writeFileSync(path.join(__dirname, 'mondai-' + style + '-squares.svg'), svg);
  process.stdout.write(style + ': ' + count + ' squares\n');
}
