# python3 captions.py [work/phrases.json] [work/captions.ass]
# Burned-in Shorts captions: simple white bold text with a thin black outline + soft black drop shadow.
# Splits each timed phrase into short chunks (max 4 words), timing each chunk by syllable count.
import json, re, sys
src = sys.argv[1] if len(sys.argv) > 1 else 'work/phrases.json'
out = sys.argv[2] if len(sys.argv) > 2 else 'work/captions.ass'
ph = json.load(open(src))['phrases']
def syl(w):
    w = re.sub(r'[^a-z]', '', w.lower()); n = len(re.findall(r'[aeiouy]+', w)) - (w.endswith('e') and len(w) > 2)
    return max(1, n)
def ts(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f'{h}:{m:02d}:{s:05.2f}'
events = []
for i, p in enumerate(ph):
    words = p['text'].split(); n = len(words)
    k = max(1, round(n / 4 + 0.49)); size = -(-n // k)
    chunks = [words[j:j + size] for j in range(0, n, size)]
    small = {'a', 'an', 'the', 'of', 'to', 'in', 'and', 'on', 'at', 'for', 'his', 'her', 'their', 'with', 'from', 'by', 'that'}
    for j in range(len(chunks) - 1):
        while len(chunks[j]) > 1 and chunks[j][-1].lower().strip(',.') in small: chunks[j + 1].insert(0, chunks[j].pop())
    tot = sum(syl(w) for w in words); t = p['start']; dur = p['end'] - p['start']
    for c in chunks:
        d = dur * sum(syl(w) for w in c) / tot
        events.append([t, t + d, ' '.join(c)]); t += d
# hold each caption until the next one if the gap is short (no flicker)
for a, b in zip(events, events[1:]):
    if 0 < b[0] - a[1] < 0.6: a[1] = b[0]
head = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Inter,74,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,-1,0,0,0,100,100,0,0,1,2.2,3.5,2,90,90,560,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
with open(out, 'w') as f:
    f.write(head)
    for a, b, txt in events: f.write(f'Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{txt}\n')
print(f'{len(events)} captions -> {out}')
