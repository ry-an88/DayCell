"""Draws the app icons and the social share image.

    python tools/make-images.py path/to/JetBrainsMono-SemiBold.ttf path/to/JetBrainsMono-Regular.ttf

Needs Pillow. Writes web/icon-*.png, web/apple-touch-icon.png and site/og.png.
The fonts are the free JetBrains Mono files from https://github.com/JetBrains/JetBrainsMono
"""
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BOLD, REGULAR = sys.argv[1], sys.argv[2]

BG = (12, 15, 19)
CHROME = (17, 21, 27)
GRID = (23, 28, 35)
TEXT = (227, 232, 238)
MUTED = (139, 149, 163)
FAINT = (86, 96, 109)
ACCENT = (45, 212, 191)


def mix(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def icon(size, maskable=False):
    """The d/ glyph on a dark tile. Maskable icons keep the glyph inside the 80% safe zone."""
    scale = 4
    s = size * scale
    img = Image.new("RGB", (s, s), CHROME)
    d = ImageDraw.Draw(img)
    if not maskable:
        img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.rounded_rectangle((0, 0, s - 1, s - 1), radius=round(s * 0.22), fill=CHROME)
    font = ImageFont.truetype(BOLD, round(s * (0.36 if maskable else 0.46)))
    text = "d/"
    box = d.textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((s - w) / 2 - box[0], (s - h) / 2 - box[1]), text, font=font, fill=TEXT)
    # a small accent "cursor" under the glyph
    bw = round(s * 0.16)
    y = (s + h) / 2 + s * 0.06
    d.rounded_rectangle(((s - bw) / 2, y, (s + bw) / 2, y + s * 0.035), radius=round(s * 0.02), fill=ACCENT)
    return img.resize((size, size), Image.LANCZOS)


def og():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for x in range(0, W, 24):
        for y in range(0, H, 24):
            d.point((x, y), fill=GRID)
    mono_b = lambda n: ImageFont.truetype(BOLD, n)
    mono = lambda n: ImageFont.truetype(REGULAR, n)

    # wordmark
    d.rounded_rectangle((72, 64, 124, 116), radius=12, fill=TEXT)
    d.text((80, 74), "d/", font=mono_b(26), fill=CHROME)
    d.text((142, 72), "daycell", font=mono_b(32), fill=TEXT)
    d.text((142 + d.textlength("daycell", font=mono_b(32)), 72), ".md", font=mono(32), fill=FAINT)

    d.text((72, 168), "your journal is just", font=mono_b(58), fill=TEXT)
    d.text((72, 238), "a markdown file.", font=mono_b(58), fill=TEXT)
    d.text((72, 330), "streaks · prompts · insights · works offline", font=mono(26), fill=MUTED)

    # activity grid, 26 weeks, filling up towards today
    random.seed(7)
    cell, gap = 15, 4
    x0, y0 = 72, 410
    weeks = 26
    for wk in range(weeks):
        for day in range(7):
            p = 0.25 + 0.7 * wk / weeks
            r = random.random()
            lvl = 0 if r > p else (1 if r > p * 0.7 else 2 if r > p * 0.45 else 3 if r > p * 0.2 else 4)
            col = GRID if lvl == 0 else mix(GRID, ACCENT, [0, 0.3, 0.55, 0.78, 1][lvl])
            x, y = x0 + wk * (cell + gap), y0 + day * (cell + gap)
            d.rounded_rectangle((x, y, x + cell, y + cell), radius=3, fill=col)

    # the cell prompt on the right
    px = 640
    d.text((px, 418), "[~]:", font=mono(22), fill=FAINT)
    d.rounded_rectangle((px + 64, 404, 1128, 548), radius=12, outline=(54, 64, 76), width=2)
    d.text((px + 86, 422), "daycell.today()", font=mono(21), fill=MUTED)
    d.text((px + 86, 458), "42-day streak.", font=mono_b(22), fill=ACCENT)
    d.text((px + 86, 492), "no account. no cloud.", font=mono(21), fill=TEXT)
    d.text((72, 572), "free forever · pro £12 once", font=mono(22), fill=FAINT)
    return img


web = ROOT / "web"
web.mkdir(exist_ok=True)
icon(192).save(web / "icon-192.png")
icon(512).save(web / "icon-512.png")
icon(512, maskable=True).save(web / "icon-maskable-512.png")
icon(180, maskable=True).save(web / "apple-touch-icon.png")  # iOS adds its own rounded corners
(ROOT / "site").mkdir(exist_ok=True)
og().save(ROOT / "site" / "og.png", optimize=True)
print("done")
