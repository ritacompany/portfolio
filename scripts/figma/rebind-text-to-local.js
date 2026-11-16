// Rebinds the text layers of the transported portfolio frames from the other account's libraries
// (01 Portfolio, 02 Haven, 03 Mondai and its remote text styles) to this file's local Portfolio and
// Haven collections and local text styles. Figma file 5RO0m4bYYrTvbiaOgaU3tI, page CS 5658:1061.
//
// Why it is separate: the 8 Nov cloud session rebound every non-text layer (604 paints, verified 0
// left), but Figma's cloud runtime has no Satoshi, and text cannot be changed without loading its
// font. Run this as the code of one use_figma call from a session whose Figma connection runs in
// his desktop app (Satoshi installed). Safe to run twice: it only touches remote bindings.

const page = await figma.getNodeByIdAsync('5658:1061');
await figma.setCurrentPageAsync(page);
const ROOTS = ['5812:22559', '5812:22599', '5812:22608', '5812:22672', '5812:22709', '5812:22749',
  '5812:22855', '5812:22862', '5812:22999', '5812:21569', '5812:16446'];
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const local = {};
for (const name of ['Portfolio', 'Haven']) {
  const c = cols.find(x => x.name === name);
  local[name] = {};
  for (const id of c.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); local[name][v.name] = v; }
}
const styleByName = {};
for (const s of await figma.getLocalTextStylesAsync()) if (!styleByName[s.name]) styleByName[s.name] = s;
const cache = {};
async function info(id) {
  if (id in cache) return cache[id];
  const v = await figma.variables.getVariableByIdAsync(id);
  let col = '?';
  if (v) { try { col = (await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId)).name; } catch (e) {} }
  return (cache[id] = v ? { v, col } : null);
}
// The four Falling behind labels key to the Mondai screens, so they move to the Mondai library green
// already used inside those screens, not to a portfolio color.
let mondaiGreen = null;
for (const n of (await figma.getNodeByIdAsync('5812:16446')).findAll(n => Array.isArray(n.fills) && n.fills.length)) {
  for (const p of n.fills) {
    const b = p.boundVariables && p.boundVariables.color;
    if (b) { const i = await info(b.id); if (i && i.col === 'Color primitives' && i.v.name === 'Green/400') { mondaiGreen = i.v; break; } }
  }
  if (mondaiGreen) break;
}
async function target(id) {
  const i = await info(id);
  if (!i || !i.v.remote) return null;
  if (i.col === '01 Portfolio') return local.Portfolio[i.v.name] || null;
  if (i.col === '02 Haven') return local.Haven[i.v.name] || null;
  if (i.col === '03 Mondai' && i.v.name === 'Green/400') return mondaiGreen;
  return null;
}
const stats = { fills: 0, styles: 0, missing: [] };
for (const rid of ROOTS) {
  const root = await figma.getNodeByIdAsync(rid);
  for (const n of root.findAllWithCriteria({ types: ['TEXT'] })) {
    for (const f of n.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(f.fontName);
    for (const seg of n.getStyledTextSegments(['textStyleId'])) {
      if (!seg.textStyleId) continue;
      const s = await figma.getStyleByIdAsync(seg.textStyleId);
      if (!s || !s.remote) continue;
      const loc = styleByName[s.name] || styleByName['Body/' + s.name];
      if (loc) { await n.setRangeTextStyleIdAsync(seg.start, seg.end, loc.id); stats.styles++; }
      else if (!stats.missing.includes(s.name)) stats.missing.push(s.name);
    }
    for (const seg of n.getStyledTextSegments(['fills'])) {
      let changed = false;
      const out = [];
      for (const p of seg.fills) {
        const b = p.type === 'SOLID' && p.boundVariables && p.boundVariables.color;
        const t = b ? await target(b.id) : null;
        if (t) { out.push(figma.variables.setBoundVariableForPaint(p, 'color', t)); changed = true; stats.fills++; }
        else out.push(p);
      }
      if (changed) n.setRangeFills(seg.start, seg.end, out);
    }
  }
}
// Expected on the first run: about 593 fills and 466 style ranges. Mondai's own styles inside the
// screenshots (Headers, Numbers, Label/Standard, Label/Mono) have no local match and stay remote.
return stats;
