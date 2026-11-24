# python3 mix.py voice.mp3 music.wav sfx.wav -> out/mix.wav. Music at exactly 50 % of the voice's gated RMS (-6 dB),
# SFX at 50 % with peaks capped at 0.7x the voice peak. Voice unchanged.
import sys, subprocess, numpy as np, wave
SR = 48000
def load(p):
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', p, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'])
    return np.frombuffer(raw, np.float32).astype(np.float64)
v, m, s = (load(p) for p in sys.argv[1:4])
n = len(v); m = np.pad(m, (0, max(0, n - len(m))))[:n]; s = np.pad(s, (0, max(0, n - len(s))))[:n]
def grms(x, gate_db=-40):
    w = int(0.4 * SR); k = len(x) // w; b = x[:k * w].reshape(k, w); r = np.sqrt((b ** 2).mean(1))
    r = r[r > 10 ** (gate_db / 20) * r.max()]; return np.sqrt((r ** 2).mean())
db = lambda x: 20 * np.log10(x)
V = grms(v); m *= 0.5 * V / grms(m); s *= 0.5 * V / grms(s)
cap = 0.7 * np.abs(v).max(); pk = np.abs(s).max()
if pk > cap: s *= cap / pk
print(f'voice gated RMS {db(V):.1f} dBFS | music {db(grms(m)) - db(V):+.1f} dB vs voice | sfx {db(grms(s)) - db(V):+.1f} dB vs voice, peak {np.abs(s).max() / np.abs(v).max():.2f}x voice peak')
mix = v + m + s
pk = np.abs(mix).max()
if pk > 0.95: mix *= 0.95 / pk  # headroom: one linear gain, ratios unchanged
with wave.open('out/mix.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
print('peak', np.abs(mix).max())
