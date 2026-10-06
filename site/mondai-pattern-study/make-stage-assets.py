from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

root = Path(__file__).parent
source = Image.open(root / 'mondai-hero-source.png').convert('RGBA')
base = source.copy()
draw = ImageDraw.Draw(base)
# Remove the flattened browser so its layer can lift while the frame stays put.
draw.rectangle((144, 594, 1296, 1255), fill=(8, 9, 8, 255))
draw.line((144, 661, 1296, 661), fill=(35, 39, 34, 255), width=1)
base.save(root / 'mondai-hero-base.png')

crop_box = (145, 595, 1295, 1253)
front = source.crop(crop_box)
mask = Image.new('L', front.size, 0)
md = ImageDraw.Draw(mask)
md.rounded_rectangle((19, 19, 1131, 637), radius=11, fill=255)
front.putalpha(mask)
front.save(root / 'mondai-browser-layer.png')
