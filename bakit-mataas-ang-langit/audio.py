# Synthesized stems for 'Bakit Mataas ang Langit': music.wav (march loop, stops at the twist, then a drone) and sfx.wav.
import numpy as np, wave, subprocess, sys
SR = 48000
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'voice.mp3']))
N = int(dur * SR) + 1
rng = np.random.default_rng(7)
t_ = lambda d: np.arange(int(d * SR)) / SR

def env(n, a=0.005, d=0.2):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)

def lp(x, cut):  # one-pole lowpass
    a = np.exp(-2 * np.pi * cut / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y

def lpv(x, cut):  # vectorised-ish lowpass via FFT
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X *= 1 / np.sqrt(1 + (f / cut) ** 4); return np.fft.irfft(X, len(x))

def hpv(x, cut):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X *= 1 / np.sqrt(1 + (cut / np.maximum(f, 1)) ** 4); return np.fft.irfft(X, len(x))

def put(buf, x, at, g=1.0):
    i = int(at * SR)
    if i >= len(buf): return
    x = x[: len(buf) - i]; buf[i:i + len(x)] += g * x

# ---------------- instruments ----------------
def kick():
    t = t_(0.35); f = 50 + 90 * np.exp(-t * 30); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(len(t), 0.002, 0.12)
def snare():
    n = len(t_(0.22)); x = hpv(rng.standard_normal(n), 1500) * env(n, 0.001, 0.07) * 0.6 + np.sin(2 * np.pi * 190 * t_(0.22)) * env(n, 0.001, 0.05) * 0.5
    return x
def hat():
    n = len(t_(0.06)); return hpv(rng.standard_normal(n), 7000) * env(n, 0.001, 0.015) * 0.35
def pluck(freq, d=0.35):
    t = t_(d); x = np.sin(2 * np.pi * freq * t) + 0.4 * np.sin(4 * np.pi * freq * t) + 0.2 * np.sign(np.sin(2 * np.pi * freq * t)) * 0.3
    return x * env(len(t), 0.003, 0.14)
def brass(freqs, d):
    t = t_(d); x = np.zeros(len(t))
    for fr in freqs:
        vib = 1 + 0.004 * np.sin(2 * np.pi * 5.5 * t)
        ph = 2 * np.pi * np.cumsum(fr * vib) / SR
        x += sum((1 / k) * np.sin(k * ph) for k in range(1, 7))
    a = np.minimum(1, t / 0.04) * np.minimum(1, (d - t) / 0.08)
    return lpv(x * a, 1800) / len(freqs)
def bell(freq, d=1.2):
    t = t_(d); return (np.sin(2 * np.pi * freq * t) + 0.5 * np.sin(2 * np.pi * freq * 2.76 * t) + 0.25 * np.sin(2 * np.pi * freq * 5.4 * t)) * env(len(t), 0.002, 0.35)

# ---------------- music: kulintang-style gong melody, agung pulse, soft drone; stops at the twist ----------------
music = np.zeros(N)
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)
STOP = 1719 / 30
BPM = 96; beat = 60 / BPM; bar = 4 * beat
def gong(freq, d=0.9):  # small bossed gong: inharmonic partials, quick decay, slight pitch dip
    t = t_(d); fr = freq * (1 + 0.01 * np.exp(-t * 30))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    return (np.sin(ph) + 0.45 * np.sin(2.02 * ph) + 0.18 * np.sin(3.1 * ph)) * env(len(t), 0.002, 0.3)
def agung(d=1.6):  # big low gong with a hum
    t = t_(d); ph = 2 * np.pi * np.cumsum(62 * (1 + 0.03 * np.exp(-t * 8))) / SR
    return (np.sin(ph) + 0.3 * np.sin(2.4 * ph)) * env(len(t), 0.004, 0.6)
def drum():
    t = t_(0.25); return np.sin(2 * np.pi * np.cumsum(140 + 80 * np.exp(-t * 40)) / SR) * env(len(t), 0.001, 0.07) + hpv(rng.standard_normal(len(t)), 900) * env(len(t), 0.001, 0.02) * 0.3
PENT = [62, 64, 67, 69, 71, 74, 76, 79]  # D pentatonic-ish
mel = [4, 5, 6, 5, 4, 2, 3, 4,  6, 7, 6, 4, 5, 4, 2, 1,  2, 3, 4, 2, 1, 0, 1, 2,  4, 5, 4, 3, 2, 1, 2, 0]
start = 0.2; nbars = int((STOP - start) / bar) + 1
td0 = t_(STOP); pad = (np.sin(2 * np.pi * NOTE(50) * td0) + 0.5 * np.sin(2 * np.pi * NOTE(57) * td0 * (1 + 0.001 * np.sin(td0)))) * 0.25
music[:len(pad)] += pad * np.minimum(1, td0 / 2)
for b in range(nbars):
    t0 = start + b * bar
    lvl = 0.6 if b < 4 else 1.0  # gentle storybook opening, fuller once Tuglibon pounds
    put(music, agung(), t0, 0.7 * lvl)
    for k in range(8):
        tb = t0 + k * beat / 2
        if tb >= STOP: break
        if b >= 4 and k % 2 == 1: put(music, drum(), tb, 0.35)
        if b >= 2: put(music, gong(NOTE(PENT[mel[(b % 4) * 8 + k]]), 0.7), tb, 0.38 * lvl)
i = int(STOP * SR); fade = np.minimum(1, np.arange(int(0.05 * SR)) / (0.05 * SR)); music[i - len(fade):i] *= fade[::-1]; music[i:] = 0
td = t_(dur - STOP + 0.2); drone = (np.sin(2 * np.pi * NOTE(38) * td) + 0.6 * np.sin(2 * np.pi * NOTE(45) * td) + 0.4 * np.sin(2 * np.pi * NOTE(50) * td * (1 + 0.002 * np.sin(td))))
drone *= np.minimum(1, td / 0.8) * np.minimum(1, (td[-1] - td) / 1.0)
put(music, drone, STOP, 0.4)
for k, m in enumerate([74, 79, 81, 86]): put(music, bell(NOTE(m), 2.5), STOP + 1.0 + k * 0.9, 0.25)

# ---------------- sfx ----------------
sfx = np.zeros(N)
def whoosh(d=0.5):
    n = len(t_(d)); x = rng.standard_normal(n); tt = np.linspace(0, 1, n)
    y = lpv(x, 900) * np.sin(np.pi * tt) ** 2; return y / (np.abs(y).max() + 1e-9)
def clink(fr=2600): return bell(fr, 0.4) * 0.6
def crash():
    n = len(t_(1.2)); x = hpv(rng.standard_normal(n), 2500) * env(n, 0.001, 0.25)
    for k in range(10):
        c = clink(rng.uniform(2000, 4200)); i0 = int(rng.uniform(0, 0.6) * SR); m = min(len(c), n - i0); x[i0:i0 + m] += c[:m] * 0.7
    kk = kick(); x[:len(kk)] += kk * 0.8
    return x
def thunk(): t = t_(0.3); return (np.sin(2 * np.pi * (90 + 60 * np.exp(-t * 25)) * t) * env(len(t), 0.001, 0.08) + lpv(rng.standard_normal(len(t)), 600) * env(len(t), 0.001, 0.04) * 0.6)
def pop():
    t = t_(0.12); f = 400 + 900 * np.exp(-t * 60); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.001, 0.03)
def ting(fr=1760): return bell(fr, 1.4)
def boing():
    t = t_(0.5); f = 220 * (1 + 0.35 * np.sin(2 * np.pi * 14 * t) * np.exp(-t * 6)); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.002, 0.18)
def squeak(d):
    t = t_(d); f = 1900 + 500 * np.sin(2 * np.pi * 3 * t); x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.25 + hpv(rng.standard_normal(len(t)), 3000) * 0.3
    return lpv(x, 5000) * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * t) ** 2) * np.minimum(1, t / 0.05) * np.minimum(1, (d - t) / 0.05)
def step(): n = len(t_(0.12)); return lpv(rng.standard_normal(n), 700) * env(n, 0.001, 0.025)
def drip(): t = t_(0.15); f = 900 + 1400 * t / 0.15; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.001, 0.04)
def shimmer(d):
    out = np.zeros(len(t_(d)))
    for k in range(int(d * 14)):
        b = bell(rng.uniform(1800, 3600), 0.6) * 0.25; i0 = int(k / 14 * SR); out[i0:i0 + len(b)] += b[: len(out) - i0]
    return out * np.minimum(1, np.linspace(0, 3, len(out)))
def applause(d):
    n = len(t_(d)); x = np.zeros(n)
    for k in range(int(d * 90)):
        c = hpv(rng.standard_normal(int(0.02 * SR)), 1200) * env(int(0.02 * SR), 0.001, 0.006); i0 = rng.integers(0, n - len(c)); x[i0:i0 + len(c)] += c
    return x * np.minimum(1, np.linspace(0, 6, n)) * np.minimum(1, np.linspace(6, 0, n))
def sting():
    t = t_(2.5); x = np.sin(2 * np.pi * 41 * t) * env(len(t), 0.002, 0.9) + lpv(rng.standard_normal(len(t)), 300) * env(len(t), 0.001, 0.3)
    return x
def tick(): n = len(t_(0.03)); return hpv(rng.standard_normal(n), 3000) * env(n, 0.0005, 0.006)
def clank():
    x = np.zeros(int(0.5 * SR)); th = thunk(); x[:len(th)] += th * 0.6; b = bell(330, 0.5); x[:len(b)] += b * 0.4; return x
def birds(d):
    out = np.zeros(len(t_(d)))
    for k in range(int(d * 3)):
        t = t_(0.12); f = 3000 + 1500 * np.sin(2 * np.pi * 18 * t); c = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.005, 0.04)
        i0 = int(rng.uniform(0, d - 0.2) * SR); out[i0:i0 + len(c)] += c
    return out
F = lambda f: f / 30
def tok(): x = np.zeros(int(0.4 * SR)); th = thunk(); x[:len(th)] += th; c = bell(820, 0.3) * 0.25; x[:len(c)] += c; return x
def crickets(d):
    out = np.zeros(len(t_(d)))
    for k in range(int(d * 3)):
        t = t_(0.18); c = np.sin(2 * np.pi * 4300 * t) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 45 * t))) * env(len(t), 0.01, 0.1)
        i0 = int((k / 3) * SR); out[i0:i0 + len(c)] += c[: len(out) - i0]
    return out
def rumble(d):
    n = len(t_(d)); x = lpv(rng.standard_normal(n), 120) * np.minimum(1, np.linspace(0, 4, n)) * np.minimum(1, np.linspace(3, 0, n)); return x / (np.abs(x).max() + 1e-9)
put(sfx, shimmer(1.6), F(70), 0.35); put(sfx, ting(1760), F(112), 0.45)
for a in (134, 1588): put(sfx, whoosh(0.5), F(a) - 0.15, 0.5)
put(sfx, birds(3.0), F(150), 0.25)
put(sfx, tok(), F(256), 0.4)  # villager knocks the sky
for k in range(9): put(sfx, thunk(), F(410 + 26 * k + 13), 0.35)  # gentle pounding
put(sfx, tok(), F(627), 0.9)
for a in (704, 721, 736): put(sfx, tok(), F(a), 0.8)
put(sfx, tok(), F(790), 0.8); put(sfx, boing(), F(792), 0.55)
put(sfx, shimmer(1.2), F(800), 0.25)
put(sfx, pop(), F(880), 0.4); put(sfx, pop(), F(905), 0.4)
put(sfx, ting(2093), F(946), 0.45); put(sfx, shimmer(1.4), F(946), 0.3)
put(sfx, crickets(1.5), F(1166), 0.3)
put(sfx, whoosh(0.4), F(1300), 0.45)
put(sfx, crash()[: int(0.8 * SR)], F(1315), 0.6); put(sfx, sting()[: int(1.2 * SR)], F(1315), 0.6)
put(sfx, rumble(5.5), F(1325), 0.6)
put(sfx, whoosh(1.2), F(1380), 0.4); put(sfx, whoosh(1.4), F(1430), 0.35)
put(sfx, birds(2.0), F(1525), 0.2)
put(sfx, crickets(10.0), F(1600), 0.15)
put(sfx, shimmer(2.5), F(1740), 0.35)
put(sfx, shimmer(1.6), F(1892), 0.45); put(sfx, ting(2637), F(1906), 0.45)

def wr(name, x):
    x = x / (np.abs(x).max() + 1e-9) * 0.8
    with wave.open(name, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
wr('out/music.wav', music); wr('out/sfx.wav', sfx)
print('stems written', dur)
