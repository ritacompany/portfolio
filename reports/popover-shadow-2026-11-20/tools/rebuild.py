"""Rebuild the Rescheduling popover image (Figma 6331:24278) at 2x with the dimming gradient
starting under the selected card instead of halfway through it.

Inputs, all 2x exports from Figma file 5RO0m4bYYrTvbiaOgaU3tI:
  current  the shipped image (export of the whole group, used for the frame border and corners)
  list     6331:24279, the Action item list plus its blur blob (no gradient, no popover)
  popover  6331:24377, the popover, exported on black with its shadow baked in
Usage: python3 rebuild.py current.png list.png popover.png out.png [gradient_top_1x]
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

cur_p, list_p, pop_p, out_p = sys.argv[1:5]
TOP = float(sys.argv[5]) if len(sys.argv) > 5 else 159.1   # bottom edge of "Synthesize usability findings" card
S = 2                                    # export scale
OX, OY = 1, 1                            # frame origin inside the current export (outside stroke)
cur = np.asarray(Image.open(cur_p).convert('RGB')).astype(np.float64)
H, W, _ = cur.shape
L = np.asarray(Image.open(list_p).convert('RGB')).astype(np.float64)
P = np.asarray(Image.open(pop_p).convert('RGB')).astype(np.float64)
C = np.array([4, 4, 5.])                 # gradient colour #040405 from Rectangle 2982

# 1. card list, placed where it sits in the shipped export (measured offset 1,4)
base = np.full_like(cur, 4.0)
lh, lw = min(L.shape[0], H - 4), min(L.shape[1], W - 1)
base[4:4 + lh, 1:1 + lw] = L[:lh, :lw]

# 2. dimming gradient: Figma's stops and colour, but the rect now starts at the selected card's
#    bottom edge and fades in from 0% so it has no hard top edge.
#    Figma: 26% at top, 74% at 12.2% (53px), 100% at 522px. New: 0% at TOP, 74% at TOP+53, 100% at 522.
def alpha(yf):
    if yf <= TOP: return 0.0
    k = TOP + 53.0
    if yf < k:
        t = (yf - TOP) / 53.0
        return 0.74 * (t * t * (3 - 2 * t))          # smoothstep so the start has no visible edge
    return min(1.0, 0.74 + (yf - k) / (522.0 - k) * 0.26)
a = np.array([alpha((y - OY) / S) for y in range(H)])[:, None, None]
img = base * (1 - a) + C * a

# 3. popover drop shadow, rebuilt from Figma's effect: 0 8.27 blur 14.39 spread 11.58 black 47%
px, py, pw, ph, pr = 135.5, 152.0, 353.9, 328.9, 9.926
sp, dy, blur = 11.58, 8.2717, 14.3928
m = Image.new('L', (W, H), 0)
ImageDraw.Draw(m).rounded_rectangle(
    [OX + (px - sp) * S, OY + (py - sp + dy) * S, OX + (px + pw + sp) * S, OY + (py + ph + sp + dy) * S],
    radius=(pr + sp) * S, fill=255)
m = m.filter(ImageFilter.GaussianBlur(blur * S / 2))
sh = (np.asarray(m).astype(np.float64) / 255 * 0.47)[:, :, None]
img = img * (1 - sh)

# 4. popover body from its own export (offset 108.7,133.5 render bounds), stroke outside 0.83px
pm = Image.new('L', (W, H), 0)
so = 0.827
ImageDraw.Draw(pm).rounded_rectangle(
    [OX + (px - so) * S, OY + (py - so) * S, OX + (px + pw + so) * S - 1, OY + (py + ph + so) * S - 1],
    radius=(pr + so) * S, fill=255)
pm = (np.asarray(pm.filter(ImageFilter.GaussianBlur(0.5))).astype(np.float64) / 255)[:, :, None]
pop_full = np.zeros_like(img)
x0, y0 = 272 - 54, 305 - 37              # measured: popover body at 272,305 in the export, 54,37 in its own
ys, xs = slice(max(0, y0), min(H, y0 + P.shape[0])), slice(max(0, x0), min(W, x0 + P.shape[1]))
pop_full[ys, xs] = P[ys.start - y0:ys.stop - y0, xs.start - x0:xs.stop - x0]
img = img * (1 - pm) + pop_full * pm

# 5. keep the shipped frame border and rounded corners: paste only the frame interior
fm = Image.new('L', (W, H), 0)
ImageDraw.Draw(fm).rounded_rectangle([3, 3, W - 4, H - 4], radius=24, fill=255)
fm = (np.asarray(fm).astype(np.float64) / 255)[:, :, None]
out = cur * (1 - fm) + img * fm
Image.fromarray(np.clip(out.round(), 0, 255).astype(np.uint8)).save(out_p)
