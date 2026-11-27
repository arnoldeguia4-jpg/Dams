# python3 captions.py [work/phrases.json] [work/captions.ass]
# Burned-in Shorts captions, word-by-word (the user's reference style, 2026-11-25):
# ONE word at a time, UPPERCASE, Luckiest Guy (fonts/LuckiestGuy-Regular.ttf), white, hard dark drop shadow
# down-right, no punctuation, centred at y=1490 (lower third). Each word appears exactly when Nick says it.
# Timing source: work/words.json (ElevenLabs Scribe word timestamps) if present; otherwise each phrase
# in phrases.json is split into words timed by syllable count.
import json, os, re, sys
src = sys.argv[1] if len(sys.argv) > 1 else 'work/phrases.json'
out = sys.argv[2] if len(sys.argv) > 2 else 'work/captions.ass'
def syl(w):
    w = re.sub(r'[^a-z]', '', w.lower()); n = len(re.findall(r'[aeiouy]+', w)) - (w.endswith('e') and len(w) > 2)
    return max(1, n)
def ts(t):
    t = max(0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f'{h}:{m:02d}:{s:05.2f}'
def clean(w):
    w = w.upper().replace('’', "'")
    return re.sub(r"[^A-Z0-9'\-$%]", '', w).strip("'-")
words = []
wj = os.path.join(os.path.dirname(src) or '.', 'words.json')
if os.path.exists(wj):
    W = json.load(open(wj)); W = W['words'] if isinstance(W, dict) else W
    words = [[w['start'], w['end'], w['text']] for w in W if w.get('type', 'word') == 'word']
else:
    for p in json.load(open(src))['phrases']:
        ws = p['text'].split(); tot = sum(syl(w) for w in ws); t = p['start']; dur = p['end'] - p['start']
        for w in ws:
            d = dur * syl(w) / tot; words.append([t, t + d, w]); t += d
events = [[a, b, clean(w)] for a, b, w in words if clean(w)]
# hold each word until the next one when the gap is short (no flicker); otherwise linger 0.25 s
for a, b in zip(events, events[1:]):
    a[1] = b[0] if b[0] - a[1] < 0.5 else a[1] + 0.25
if events: events[-1][1] += 0.4
head = """[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Luckiest Guy,104,&H00FFFFFF,&H00FFFFFF,&H00261A1E,&H28261A1E,0,0,0,0,100,100,2,0,1,1.2,7,5,60,60,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
with open(out, 'w') as f:
    f.write(head)
    for a, b, txt in events:
        fs = '' if len(txt) <= 11 else '{\\fs%d}' % int(104 * 11 / len(txt))
        f.write(f'Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{{\\pos(540,1490)}}{fs}{txt}\n')
print(f'{len(events)} word captions -> {out}')
