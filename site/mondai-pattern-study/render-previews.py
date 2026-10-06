from pathlib import Path
from xml.etree import ElementTree as ET
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).parent
base = Image.open(root / 'mondai-hero-base.png').convert('RGBA')
browser = Image.open(root / 'mondai-browser-layer.png').convert('RGBA')
styles = ('sporadic', 'grouped', 'structure', 'beneath')
labels = ('Sporadic', 'Grouped', 'Across the lines', 'Under the browser')

for style in styles:
    image = base.copy()
    overlay = Image.new('RGBA', image.size)
    draw = ImageDraw.Draw(overlay, 'RGBA')
    svg = ET.parse(root / f'mondai-{style}-squares.svg').getroot()
    for group in svg:
        if not group.tag.endswith('g'): continue
        translation = group.attrib['transform'].replace('translate(', '').replace(')', '').split()
        offset_x, offset_y = map(float, translation)
        for child in group:
            if not child.tag.endswith('g'): continue
            alpha = round(float(child.attrib['fill-opacity']) * 255)
            for rect in child:
                x = offset_x + float(rect.attrib['x'])
                y = offset_y + float(rect.attrib['y'])
                w = float(rect.attrib['width'])
                h = float(rect.attrib['height'])
                draw.rectangle((round(x), round(y), round(x+w-1), round(y+h-1)), fill=(246, 248, 242, alpha))
    image = Image.alpha_composite(image, overlay)
    image.alpha_composite(browser, (145, 537))
    image.convert('RGB').save(root / f'preview-{style}.png')

sheet = Image.new('RGB', (1460, 1510), '#151819')
pen = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 17)
except OSError: font = ImageFont.load_default()
for index, (style, label) in enumerate(zip(styles, labels)):
    preview = Image.open(root / f'preview-{style}.png').resize((720, 712), Image.Resampling.LANCZOS)
    x = 10 + (index % 2) * 730
    y = 10 + (index // 2) * 750
    pen.text((x+3, y+3), label, fill='#e9eeec', font=font)
    sheet.paste(preview, (x, y+28))
sheet.save(root / 'composition-sheet.png')
