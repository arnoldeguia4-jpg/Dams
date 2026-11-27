# Synthesized stems for the penicillin short: music.wav (march loop, stops at the twist, then a drone) and sfx.wav.
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

# ---------------- music ----------------
music = np.zeros(N)
BPM = 112; beat = 60 / BPM; bar = 4 * beat
STOP = 1477 / 30
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(48, [60, 64, 67]), (43, [59, 62, 67]), (45, [57, 60, 64]), (41, [57, 60, 65])]  # C G Am F
mel = [72, 74, 76, 79, 76, 74, 72, 74,  71, 72, 74, 71, 67, 69, 71, 74,  72, 71, 69, 72, 76, 74, 72, 69,  69, 71, 72, 74, 72, 69, 65, 67]
start = 0.15
nbars = int((STOP - start) / bar) + 1
for b in range(nbars):
    t0 = start + b * bar; root, ch = prog[b % 4]
    quiet = 0.55 if (52 < t0 < 62.5) or (62.8 < t0 < 67) else 1.0  # thinner under the wait + the explanation
    for k in range(4):
        tb = t0 + k * beat
        if tb >= STOP: break
        put(music, kick(), tb, 0.9 * quiet)
        if k % 2: put(music, snare(), tb, 0.55 * quiet)
        put(music, hat(), tb + beat / 2, 0.5 * quiet)
        put(music, pluck(NOTE(root - 12 + (7 if k % 2 else 0))), tb, 0.55)
    if t0 + bar <= STOP: put(music, brass([NOTE(m) for m in ch], bar * 0.95), t0, 0.22)
    if b % 8 >= 4:  # melody on every other 4-bar phrase
        for i in range(8):
            tn = t0 + i * beat / 2
            if tn < STOP - 0.1: put(music, pluck(NOTE(mel[(b % 4) * 8 + i]), 0.25), tn, 0.32 * quiet)
# hard stop at the twist + low drone to the end
i = int(STOP * SR); music[i:] = 0
fade = np.minimum(1, np.arange(int(0.03 * SR)) / (0.03 * SR)); music[i - len(fade):i] *= fade[::-1]
td = t_(dur - STOP + 0.2); drone = (np.sin(2 * np.pi * 55 * td) + 0.5 * np.sin(2 * np.pi * 82.4 * td) + 0.3 * np.sin(2 * np.pi * 110 * td * (1 + 0.002 * np.sin(td))))
drone *= np.minimum(1, td / 0.6) * np.minimum(1, (td[-1] - td) / 0.8 + 0.0)
put(music, drone, STOP, 0.35)

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
def growl(): t = t_(0.6); f = 90 + 20 * np.sin(2 * np.pi * 7 * t); x = lpv(rng.standard_normal(len(t)), 400) * (0.6 + 0.4 * np.sin(2 * np.pi * np.cumsum(f) / SR)); return x / (np.abs(x).max() + 1e-9) * env(len(t), 0.02, 0.25)
def gulp(): t = t_(0.18); f = 500 - 300 * t / 0.18; return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.005, 0.06)
def snore(d=1.4):
    t = t_(d); x = lpv(rng.standard_normal(len(t)), 300) * np.maximum(0, np.sin(2 * np.pi * 0.7 * t)) ** 2; return x / (np.abs(x).max() + 1e-9)
def stampsfx(): return thunk() * 1.0
def boom(): t = t_(1.4); return np.sin(2 * np.pi * (40 + 60 * np.exp(-t * 15)) * t) * env(len(t), 0.002, 0.4) + lpv(rng.standard_normal(len(t)), 500) * env(len(t), 0.002, 0.3)
def crowd(d):
    out = applause(d) * 0.8; t = t_(d)
    for k in range(8): v = np.sin(2 * np.pi * rng.uniform(250, 420) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * rng.uniform(2, 5) * t)) * 0.12; out += lpv(v, 2000) * np.sin(np.pi * t / d)
    return out
F = lambda f: f / 30
def rain(d):
    n = len(t_(d)); x = hpv(rng.standard_normal(n), 1500) * 0.5 + lpv(rng.standard_normal(n), 400) * 0.6
    return x * np.minimum(1, np.linspace(0, 4, n)) * np.minimum(1, np.linspace(4, 0, n))
def honk(d=0.45):
    t = t_(d); x = (np.sign(np.sin(2 * np.pi * 330 * t)) + np.sign(np.sin(2 * np.pi * 415 * t))) * 0.5
    return lpv(x, 2200) * np.minimum(1, t / 0.02) * np.minimum(1, (d - t) / 0.05)
def engine(d):
    t = t_(d); x = np.sin(2 * np.pi * 48 * t) * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * t)) + lpv(rng.standard_normal(len(t)), 300) * 0.5
    return x * np.minimum(1, t / 0.3) * np.minimum(1, (d - t) / 0.4)
def stat(d):
    n = len(t_(d)); x = hpv(rng.standard_normal(n), 1800) * (0.5 + 0.5 * (rng.random(n) > 0.6))
    return x * np.minimum(1, np.linspace(0, 8, n)) * np.minimum(1, np.linspace(8, 0, n))
def beep(fr=900, d=0.18): t = t_(d); return np.sin(2 * np.pi * fr * t) * np.minimum(1, t / 0.005) * np.minimum(1, (d - t) / 0.01)
def stampsnd(): return thunk() * 1.3
def jet(d):
    n = len(t_(d)); x = hpv(rng.standard_normal(n), 900) * 0.6 + lpv(rng.standard_normal(n), 200) * 0.6
    return x * np.minimum(1, np.linspace(0, 3, n)) * np.minimum(1, np.linspace(3, 0, n))
put(sfx, drip(), F(40), 0.5); put(sfx, stampsnd(), F(78), 0.8); put(sfx, stampsnd(), F(120), 0.7); put(sfx, stampsnd(), F(128), 0.8)
put(sfx, whoosh(0.6), F(158), 0.5); put(sfx, shimmer(1.2), F(172), 0.3); put(sfx, boom(), F(200), 0.25)
put(sfx, whoosh(0.5), F(250), 0.4); put(sfx, ting(1760), F(300), 0.35); put(sfx, clink(2600), F(380), 0.35)
put(sfx, drip(), F(450), 0.5); put(sfx, squeak(0.4), F(517), 0.3)
for a in (548, 603, 627, 660): put(sfx, boing(), F(a), 0.45)
put(sfx, clink(3000), F(627), 0.3); put(sfx, stampsnd(), F(746), 0.9)
put(sfx, whoosh(0.6), F(780), 0.5); put(sfx, jet(4.5), F(790), 0.35); put(sfx, ting(1976), F(868), 0.3)
put(sfx, squeak(0.5), F(972), 0.35); put(sfx, thunk(), F(975), 0.6); put(sfx, boing(), F(985), 0.4)
put(sfx, whoosh(0.4), F(1040), 0.4); put(sfx, ting(2637), F(1122), 0.5); put(sfx, shimmer(1.2), F(1124), 0.35)
put(sfx, pop(), F(1150), 0.5); put(sfx, pop(), F(1222), 0.7); put(sfx, shimmer(1.6), F(1224), 0.4)
put(sfx, whoosh(0.6), F(1285), 0.45); put(sfx, crowd(2.0), F(1300), 0.35); put(sfx, ting(2093), F(1334), 0.4)
put(sfx, drip(), F(1408), 0.7); put(sfx, thunk(), F(1414), 0.5); put(sfx, ting(2349), F(1430), 0.4)
put(sfx, sting(), STOP, 0.9)
put(sfx, boing(), F(1553), 0.35); put(sfx, shimmer(2.0), F(1600), 0.4); put(sfx, ting(2637), F(1602), 0.45)

def wr(name, x):
    x = x / (np.abs(x).max() + 1e-9) * 0.8
    with wave.open(name, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
wr('out/music.wav', music); wr('out/sfx.wav', sfx)
print('stems written', dur)
