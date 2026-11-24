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
grad = Image.new('L', (1, 1920)); [grad.putpixel((0, y), int(170 * max(0, 1 - y / 520) + 170 * max(0, (y - 1450) / 470))) for y in range(1920)]
V.paste(Image.new('RGB', V.size, (18, 12, 26)), (0, 0), grad.resize(V.size))
d = ImageDraw.Draw(V)
text(d, (540, 160), "AUSTRALIA DECLARED", 82, (255, 255, 255))
text(d, (540, 300), "WAR ON BIRDS", 150, (255, 255, 255))
text(d, (540, 1650), "...AND", 120, (255, 214, 64))
text(d, (540, 1795), "LOST!", 190, (255, 214, 64))
arrow(d, [(900, 420), (900, 560), (720, 760)])
V.save('out/thumbnail_vertical.jpg', quality=93)

# ---- landscape 1280x720 (YouTube) ----
bg = src.resize((1280, int(1920 * 1280 / 1080))).crop((0, 600, 1280, 1320)).filter(ImageFilter.GaussianBlur(14))
bg = ImageEnhance.Brightness(bg).enhance(0.55)
L = bg.copy()
fg = src.crop((0, 380, 1080, 1700)).resize((int(1080 * 720 / 1320 * 1.05), int(720 * 1.05)))
L.paste(fg, (1280 - fg.width, -10))
d = ImageDraw.Draw(L)
text(d, (40, 110), "AUSTRALIA", 104, (255, 255, 255), anchor='lm', stroke=10)
text(d, (40, 225), "DECLARED WAR", 72, (255, 255, 255), anchor='lm', stroke=10)
text(d, (40, 340), "ON BIRDS...", 104, (255, 255, 255), anchor='lm', stroke=10)
text(d, (40, 500), "AND", 92, (255, 214, 64), anchor='lm', stroke=10)
text(d, (40, 615), "LOST!", 140, (255, 214, 64), anchor='lm', stroke=10)
arrow(d, [(700, 70), (900, 40), (1010, 200)], w=20)
L.save('out/thumbnail_youtube.jpg', quality=93)
print('ok')
