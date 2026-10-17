// CS2 build audit, checks 1 to 5 (his yes, 16 Oct). Run with use_figma after every section build,
// replacing __SECTION_ID__ with the section frame's node id. Returns PASS or the failures per check.
// Conventions it relies on, set by the build: each block frame is named "Block N · <layout piece>" with a
// layout from his pool; each image slot is a frame named "Image slot" with a dark fill and a TEXT child
// named "Label" saying what goes there.
const POOL = /(TitleAndText position [123]|TextAnd1Image layout [1-4]|TextAnd2Images layout [1-5]|TextAnd3Images layout [1246]|MediaSliderAndText|VideoScrollerAndText|StatRows|Quote|MinimalQuote|ReviewCardWithBackground)/;
const HAVEN_STYLES = /^(Heading\/(20|24|28|40|64|Sans\/28 R|Sans\/88 R)|Body\/16|Label\/(12|14)|Display\/212)$/;
const DRAWN = ['VECTOR', 'ELLIPSE', 'LINE', 'POLYGON', 'STAR', 'BOOLEAN_OPERATION'];
const COL = (1360 - 11 * 40) / 12;
const colStarts = Array.from({ length: 12 }, (_, k) => 40 + k * (COL + 40));

const sec = await figma.getNodeByIdAsync('__SECTION_ID__');
let pg = sec; while (pg.parent && pg.parent.type !== 'PAGE') pg = pg.parent;
await figma.setCurrentPageAsync(pg.parent);
const fails = { layouts: [], imageSlots: [], noVisuals: [], styles: [], grid: [] };
const sx = sec.absoluteTransform[0][2];

const blocks = sec.children.filter(c => /^Block \d+/.test(c.name));
if (!blocks.length) fails.layouts.push('no "Block N · <layout>" frames');
for (const b of blocks) {
  if (!POOL.test(b.name)) fails.layouts.push(`${b.name}: not named for a pool layout`);
  for (const n of b.findAll(() => true)) {
    const x = Math.round(n.absoluteTransform[0][2] - sx);
    if (n.parent === b || n.name === 'Image slot') {
      if (!colStarts.some(c => Math.abs(c - x) <= 2) && n.type !== 'TEXT') fails.grid.push(`${b.name} > ${n.name} starts at x ${x}, not a column start`);
    }
  }
}
for (const n of sec.findAll(() => true)) {
  if (DRAWN.includes(n.type)) fails.noVisuals.push(`${n.type} "${n.name}" ${n.id}`);
  if (n.type === 'TEXT') {
    const s = n.textStyleId && typeof n.textStyleId === 'string' ? await figma.getStyleByIdAsync(n.textStyleId) : null;
    if (!s || !HAVEN_STYLES.test(s.name)) fails.styles.push(`"${n.characters.slice(0, 30)}" uses ${s ? s.name : 'no style'}`);
  }
  if (n.name === 'Image slot') {
    const label = 'children' in n ? n.children.find(c => c.type === 'TEXT' && c.name === 'Label') : null;
    const fill = Array.isArray(n.fills) && n.fills[0] && n.fills[0].color;
    if (!label || !label.characters.trim()) fails.imageSlots.push(`${n.id}: no label saying what goes there`);
    if (!fill || fill.r + fill.g + fill.b > 0.3) fails.imageSlots.push(`${n.id}: not a dark block`);
  }
}
if (!sec.findAll(n => n.name === 'Image slot').length) fails.imageSlots.push('no image slots at all; check the plan if that is intended');
const failed = Object.entries(fails).filter(([, v]) => v.length);
return failed.length ? { verdict: 'FAIL', fails: Object.fromEntries(failed) } : { verdict: 'PASS' };
