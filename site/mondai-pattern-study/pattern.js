(function (root) {
  const source = root.ReferenceGrid || (typeof require !== 'undefined' ? require('./reference-grid.js') : null);
  if (!source) throw new Error('Reference grid was not loaded');

  const width = 1440;
  const height = 1423;
  const definitions = {
    packed: { label: 'Packed', crop: [0, 20, 0, 11] },
    fade: { label: 'Fade', crop: [0, 28, 12, 32] },
    scatter: { label: 'Scatter', crop: [0, 28, 28, 50] },
    cluster: { label: 'Cluster', crop: [26, 64, 66, 89] },
    checker: { label: 'Checker', crop: [58, 70, 120, 132] },
    constellation: { label: 'Constellation', crop: [0, 20, 85, 113] }
  };

  function extract(crop) {
    const [left, right, top, bottom] = crop;
    const cells = [];
    for (let row = top; row < bottom; row += 1) {
      for (let col = left; col < right; col += 1) {
        if (source.cells[row][col]) cells.push([col - left, row - top]);
      }
    }
    return { cells, cols: right - left, rows: bottom - top };
  }

  const motifs = Object.fromEntries(Object.entries(definitions).map(([key, item]) => [key, { ...item, ...extract(item.crop) }]));
  const arrangements = {
    sporadic: [
      ['scatter', 84, 284], ['constellation', 1260, 394], ['cluster', 1238, 1052],
      ['checker', 72, 1280], ['fade', 1170, 650]
    ],
    grouped: [
      ['packed', 66, 546], ['cluster', 1198, 330], ['checker', 122, 1260],
      ['fade', 1238, 880], ['scatter', 38, 1040]
    ],
    structure: [
      ['fade', 44, 638], ['scatter', 1270, 612], ['checker', 90, 1280],
      ['cluster', 1210, 1200], ['constellation', 116, 312]
    ],
    beneath: [
      ['cluster', 92, 596], ['checker', 1236, 1190], ['scatter', 580, 1240],
      ['fade', 1220, 546], ['constellation', 32, 970]
    ]
  };

  function random(seed) {
    let value = (seed >>> 0) || 1;
    return function () {
      value ^= value << 13;
      value ^= value >>> 17;
      value ^= value << 5;
      return (value >>> 0) / 4294967296;
    };
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function extent(module, pitch, scale) {
    const motif = motifs[module.type];
    return { width: motif.cols * pitch * scale, height: motif.rows * pitch * scale };
  }

  function compose(options = {}) {
    const style = arrangements[options.style] ? options.style : 'sporadic';
    const count = clamp(Math.round(Number(options.count) || 3), 1, 5);
    const seed = Number(options.seed) || 1;
    const rand = random(seed + Object.keys(arrangements).indexOf(style) * 701);
    const slots = arrangements[style];
    return slots.slice(0, count).map(([type, anchorX, anchorY], index) => {
      const horizontalRange = style === 'structure' ? 72 : 220;
      const x = anchorX + Math.round((rand() - 0.5) * horizontalRange);
      const y = anchorY + Math.round((rand() - 0.5) * 170);
      return { id: index + 1, type, x, y, mirror: rand() > 0.5, alpha: 0.7 + rand() * 0.3 };
    });
  }

  function render(layout, options = {}) {
    const pitch = clamp(Number(options.pitch) || 5, 3, 9);
    const scale = clamp(Number(options.scale) || 1, 0.6, 1.4);
    const tile = clamp(Number(options.tile) || 0.82, 0.45, 0.96);
    const opacity = clamp(Number(options.opacity) || 0.78, 0.2, 1);
    const interactive = options.interactive === true;
    const pieces = [];
    let count = 0;

    if (options.grid) {
      const gridPitch = pitch * 2;
      const lines = [];
      for (let x = 0; x <= width; x += gridPitch) lines.push(`M${x.toFixed(2)} 65V1361`);
      for (let y = 65; y <= 1361; y += gridPitch) lines.push(`M0 ${y.toFixed(2)}H1440`);
      pieces.push(`<path d="${lines.join('')}" fill="none" stroke="#dce3d9" stroke-opacity="0.035" stroke-width="0.7"/>`);
    }

    for (let index = 0; index < layout.length; index += 1) {
      const module = layout[index];
      const motif = motifs[module.type];
      if (!motif) continue;
      const step = pitch * scale;
      const size = step * tile;
      const alpha = (opacity * module.alpha).toFixed(3);
      const rects = [];
      for (const [col, row] of motif.cells) {
        const localX = (module.mirror ? motif.cols - 1 - col : col) * step + (step - size) / 2;
        const localY = row * step + (step - size) / 2;
        const x = module.x + localX;
        const y = module.y + localY;
        if (x + size < 0 || x > width || y + size < 65 || y > 1361) continue;
        rects.push(`<rect x="${localX.toFixed(2)}" y="${localY.toFixed(2)}" width="${size.toFixed(2)}" height="${size.toFixed(2)}"/>`);
        count += 1;
      }
      if (!rects.length) continue;
      const selected = interactive && options.selected === index;
      const box = extent(module, pitch, scale);
      const hit = interactive ? `<rect class="motif-hit${selected ? ' selected' : ''}" x="-8" y="-8" width="${(box.width + 16).toFixed(2)}" height="${(box.height + 16).toFixed(2)}" fill="transparent" stroke="${selected ? '#b9c5bf' : 'transparent'}" stroke-width="1" stroke-dasharray="4 5"/>` : '';
      pieces.push(`<g class="motif" data-index="${index}" transform="translate(${module.x.toFixed(2)} ${module.y.toFixed(2)})"><g fill="#f6f8f2" fill-opacity="${alpha}">${rects.join('')}</g>${hit}</g>`);
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-label="Square pattern composition">${pieces.join('')}</svg>`;
    return { svg, count };
  }

  root.MondaiPattern = { motifs, arrangements, compose, render, extent, width, height };
  if (typeof module !== 'undefined') module.exports = root.MondaiPattern;
})(typeof window === 'undefined' ? globalThis : window);
