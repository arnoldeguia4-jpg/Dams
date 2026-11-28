#!/usr/bin/env python3
"""Word-by-word captions (one word on screen at a time, like the reference): writes an ASS file for libass.
usage: python3 captions.py work/phrases.json out/captions.ass [--words work/words.json] [--keepcase] [--size 92] [--y 1450]
Timing: word times come from work/words.json if present (list of {word,start,end}, e.g. from ElevenLabs transcription),
otherwise each silence-aligned phrase from timing.py is split into words weighted by their length."""
import json, re, sys, argparse

ap = argparse.ArgumentParser()
ap.add_argument('phrases'); ap.add_argument('out')
ap.add_argument('--words', default=None); ap.add_argument('--keepcase', action='store_true')
ap.add_argument('--size', type=int, default=92); ap.add_argument('--y', type=int, default=1450, help='text centre y on the 1920 canvas')
ap.add_argument('--pop', type=int, default=70, help='pop-in ms (0 = none)')
a = ap.parse_args()

def ts(t):
    t = max(0.0, t); h = int(t // 3600); m = int(t % 3600 // 60); s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"

words = []
if a.words:
    for w in json.load(open(a.words)):
        words.append([w['word'], float(w['start']), float(w['end'])])
else:
    P = json.load(open(a.phrases))['phrases']
    for i, p in enumerate(P):
        toks = p['text'].split()
        if not toks: continue
        wts = [max(3, len(re.sub(r'[^\w]', '', t)) + 2) + (3 if re.search(r'[,.!?…]$', t) else 0) for t in toks]
        tot = sum(wts); t0, t1 = p['start'], p['end']; acc = 0
        for t, w in zip(toks, wts):
            s = t0 + (t1 - t0) * acc / tot; acc += w; e = t0 + (t1 - t0) * acc / tot
            words.append([t, s, e])
# hold each word until the next one starts (max 0.6 s past its own end, so long pauses go blank)
ev = []
for i, (w, s, e) in enumerate(words):
    nxt = words[i + 1][1] if i + 1 < len(words) else e + 0.5
    end = min(nxt, e + 0.6) if nxt - e > 0.6 else nxt
    txt = w if a.keepcase else w.lower()
    txt = txt.replace('{', '(').replace('}', ')').replace('"', '"')
    ev.append((s, max(end, s + 0.08), txt))

marginV = 1920 - a.y - a.size // 2
pop = f"{{\\fscx86\\fscy86\\t(0,{a.pop},\\fscx100\\fscy100)}}" if a.pop else ""
hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Word,Nunito Black,{a.size},&H00FFFFFF,&H00FFFFFF,&H00261A1E,&H96000000,0,0,0,0,100,100,0,0,1,{round(a.size * 0.1)},{round(a.size * 0.04)},2,60,60,{marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
with open(a.out, 'w') as f:
    f.write(hdr)
    for s, e, t in ev:
        f.write(f"Dialogue: 0,{ts(s)},{ts(e)},Word,,0,0,0,,{pop}{t}\n")
print(f"{len(ev)} words -> {a.out}")
