from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
F = '/usr/share/fonts/opentype/inter/InterDisplay-Black.otf'
src = Image.open('stills/thumb/f9000.jpg').convert('RGB')
src = ImageEnhance.Color(src).enhance(1.15); src = ImageEnhance.Contrast(src).enhance(1.05)

def text(d, xy, s, size, fill, anchor='mm', stroke=14):
    f = ImageFont.truetype(F, size)
    d.text((xy[0] + 8, xy[1] + 10), s, font=f, fill=(0, 0, 0), anchor=anchor, stroke_width=stroke, stroke_fill=(0, 0, 0))
    d.text(xy, s, font=f, fill=fill, anchor=anchor, stroke_width=stroke, stroke_fill=(20, 14, 24))

def arrow(d, pts, col=(232, 48, 44), w=26):
    d.line(pts, fill=(20, 14, 24), width=w + 16, joint='curve'); d.line(pts, fill=col, width=w, joint='curve')
    (x0, y0), (x1, y1) = pts[-2], pts[-1]
    import math; a = math.atan2(y1 - y0, x1 - x0); L = 70
    tri = [(x1 + 20 * math.cos(a), y1 + 20 * math.sin(a)), (x1 - L * math.cos(a - 0.55), y1 - L * math.sin(a - 0.55)), (x1 - L * math.cos(a + 0.55), y1 - L * math.sin(a + 0.55))]
    d.polygon(tri, fill=col, outline=(20, 14, 24), width=8)

# ---- vertical 1080x1920 (Shorts) ----
V = src.copy(); d = ImageDraw.Draw(V)
text(d, (540, 165), "AN 11-YEAR-OLD", 104, (255, 255, 255))
text(d, (540, 315), "INVENTED THIS!", 120, (255, 214, 64))
text(d, (540, 1720), "BY ACCIDENT", 100, (255, 255, 255))
# big popsicle graphic beside the hero (vertical)
d.rounded_rectangle((770, 1260, 840, 1470), 22, fill=(217, 176, 122), outline=(20, 14, 24), width=10)
d.rounded_rectangle((690, 820, 920, 1300), 110, fill=(226, 69, 60), outline=(20, 14, 24), width=14)
d.rounded_rectangle((730, 880, 770, 1220), 20, fill=(255, 154, 138))
for k in range(10):
    import math; a = k * math.pi / 5; d.line([(805 + math.cos(a) * 170, 1060 + math.sin(a) * 260), (805 + math.cos(a) * 215, 1060 + math.sin(a) * 320)], fill=(255, 214, 64), width=12)
V.save('out/thumbnail_vertical.jpg', quality=93)

# ---- landscape 1280x720 (YouTube) ----
bg = src.resize((1280, int(1920 * 1280 / 1080))).crop((0, 600, 1280, 1320)).filter(ImageFilter.GaussianBlur(14))
bg = ImageEnhance.Brightness(bg).enhance(0.55)
L = bg.copy()
fg = src.crop((0, 380, 1080, 1700)).resize((int(1080 * 720 / 1320 * 1.05), int(720 * 1.05)))
L.paste(fg, (1280 - fg.width, -10))
d = ImageDraw.Draw(L)
text(d, (40, 140), "AN 11-YEAR-OLD", 92, (255, 255, 255), anchor='lm', stroke=10)
text(d, (40, 280), "INVENTED", 120, (255, 214, 64), anchor='lm', stroke=12)
text(d, (40, 420), "THIS!", 140, (255, 214, 64), anchor='lm', stroke=12)
L.save('out/thumbnail_youtube.jpg', quality=93)
print('ok')
