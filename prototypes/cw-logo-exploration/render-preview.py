from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
FONT = Path('/System/Library/Fonts/Supplemental/Arial.ttf')
CANVAS = (1800, 1370)
BG = '#121216'
PANEL = '#24242A'
INK = '#E8E7ED'
MUTED = '#A6A4AE'

ROWS = [
    ('00', 'Original', 'Source', 'original.svg'),
    ('02', 'Soft square', 'Previous pick', '02-soft-square.svg'),
    ('04', 'Structured curve', 'New pick', '04-structure.svg'),
    ('05', 'Controlled pressure', 'Alternative', '05-pressure.svg'),
    ('06', 'Compact gesture', 'Alternative', '06-compact.svg'),
]


def font(size):
    return ImageFont.truetype(str(FONT), size)


def put_logo(canvas, logo, width, left, top):
    height = round(logo.height * width / logo.width)
    scaled = logo.resize((width, height), Image.Resampling.LANCZOS)
    canvas.alpha_composite(scaled, (left, top))


canvas = Image.new('RGBA', CANVAS, BG)
draw = ImageDraw.Draw(canvas)
draw.text((54, 34), 'CW, pushed further', font=font(43), fill=INK)
draw.text((56, 92), 'Source, previous pick and three new shape systems', font=font(20), fill=MUTED)

with TemporaryDirectory() as temp:
    for index, (number, name, status, file_name) in enumerate(ROWS):
        png = Path(temp) / f'{number}.png'
        subprocess.run(['sips', '-s', 'format', 'png', str(ROOT / file_name), '-o', str(png)], check=True, capture_output=True)
        logo = Image.open(png).convert('RGBA')
        top = 151 + index * 238
        draw.rounded_rectangle((40, top, 1760, top + 220), radius=12, fill=PANEL, outline='#888692' if number == '04' else PANEL, width=2)
        draw.text((72, top + 29), number, font=font(23), fill=MUTED)
        draw.text((124, top + 27), name, font=font(27), fill=INK)
        draw.text((74, top + 69), status.upper(), font=font(13), fill=MUTED, spacing=2)
        if number == '04':
            draw.rounded_rectangle((74, top + 115, 179, top + 148), radius=16, outline='#C6C4D0', width=1)
            draw.text((104, top + 123), 'PICK', font=font(14), fill=INK)
        draw.text((451, top + 33), '48 PX HEADER', font=font(13), fill=MUTED)
        draw.text((734, top + 33), '160 PX', font=font(13), fill=MUTED)
        draw.text((1078, top + 33), '490 PX', font=font(13), fill=MUTED)
        put_logo(canvas, logo, 48, 452, top + 103)
        draw.text((515, top + 100), 'Work     About     Contact', font=font(14), fill=MUTED)
        put_logo(canvas, logo, 160, 733, top + 91)
        put_logo(canvas, logo, 490, 1076, top + 64)

canvas.convert('RGB').save(ROOT / 'preview.png', optimize=True)
