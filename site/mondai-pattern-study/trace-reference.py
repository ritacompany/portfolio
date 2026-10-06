from pathlib import Path
from PIL import Image, ImageDraw
import json
import statistics

ROOT = Path(__file__).parent
SOURCE = ROOT / 'square-pattern-reference.png'
WIDTH, HEIGHT = 1116, 1530
X0, Y0, PITCH = 7.48185, 19.44643 - 21.297, 21.297 / 2
COLS, ROWS = 105, 145
TILE_SIZE = 9
image = Image.open(SOURCE).convert('L')
assert image.size == (WIDTH, HEIGHT)

def luminance(x, y):
    x, y = round(x), round(y)
    if x < 0 or y < 0 or x >= WIDTH or y >= HEIGHT:
        return 0
    values = [image.getpixel((xx, yy)) for yy in range(max(0, y-1), min(HEIGHT, y+2)) for xx in range(max(0, x-1), min(WIDTH, x+2))]
    return statistics.median(values)

cells = []
for row in range(ROWS):
    line = []
    for col in range(COLS):
        x, y = X0 + PITCH * col, Y0 + PITCH * row
        line.append(1 if luminance(x, y) >= 160 else 0)
    cells.append(line)

grid = {'width': WIDTH, 'height': HEIGHT, 'x0': X0, 'y0': Y0, 'pitch': PITCH, 'tileSize': TILE_SIZE, 'cells': cells}
(ROOT / 'reference-grid.json').write_text(json.dumps(grid, separators=(',', ':')))
(ROOT / 'reference-grid.js').write_text('globalThis.ReferenceGrid = ' + json.dumps(grid, separators=(',', ':')) + ';\nif (typeof module !== "undefined") module.exports = globalThis.ReferenceGrid;\n')

rects = []
for row, line in enumerate(cells):
    for col, active in enumerate(line):
        if not active: continue
        x, y = X0 + PITCH * col - TILE_SIZE/2, Y0 + PITCH * row - TILE_SIZE/2
        rects.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{TILE_SIZE}" height="{TILE_SIZE}" fill="#fff"/>')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}">' + ''.join(rects) + '</svg>'
(ROOT / 'reference-trace.svg').write_text(svg)

preview = Image.new('RGB', (WIDTH, HEIGHT), '#090909')
draw = ImageDraw.Draw(preview)
for index in range(COLS + 2):
    x = round(X0 + (index - 0.5) * PITCH)
    if 0 <= x < WIDTH: draw.line((x, 0, x, HEIGHT), fill='#242424', width=1)
for index in range(ROWS + 2):
    y = round(Y0 + (index - 0.5) * PITCH)
    if 0 <= y < HEIGHT: draw.line((0, y, WIDTH, y), fill='#242424', width=1)
for row, line in enumerate(cells):
    for col, active in enumerate(line):
        if not active: continue
        x, y = X0 + PITCH * col, Y0 + PITCH * row
        draw.rectangle((round(x-TILE_SIZE/2), round(y-TILE_SIZE/2), round(x+TILE_SIZE/2)-1, round(y+TILE_SIZE/2)-1), fill='white')
preview.save(ROOT / 'reference-trace.png')
print('active squares', sum(sum(line) for line in cells))
