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
F0 = lambda f: f / 30
music = np.zeros(N)
BPM = 112; beat = 60 / BPM; bar = 4 * beat
STOP = 1765 / 30
NOTE = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(48, [60, 64, 67]), (43, [59, 62, 67]), (45, [57, 60, 64]), (41, [57, 60, 65])]  # C G Am F
mel = [72, 74, 76, 79, 76, 74, 72, 74,  71, 72, 74, 71, 67, 69, 71, 74,  72, 71, 69, 72, 76, 74, 72, 69,  69, 71, 72, 74, 72, 69, 65, 67]
def band(t_a, t_b, lvl=1.0):
    buf = np.zeros(N); nb = int((t_b - t_a) / bar) + 1
    for b in range(nb):
        t0 = t_a + b * bar; root, ch = prog[b % 4]
        for k in range(4):
            tb = t0 + k * beat
            if tb >= t_b: break
            put(buf, kick(), tb, 0.9); 
            if k % 2: put(buf, snare(), tb, 0.55)
            put(buf, hat(), tb + beat / 2, 0.5); put(buf, pluck(NOTE(root - 12 + (7 if k % 2 else 0))), tb, 0.55)
        if t0 + bar <= t_b: put(buf, brass([NOTE(m) for m in ch], bar * 0.95), t0, 0.22)
        if b % 8 >= 4:
            for i in range(8):
                tn = t0 + i * beat / 2
                if tn < t_b - 0.1: put(buf, pluck(NOTE(mel[(b % 4) * 8 + i]), 0.25), tn, 0.32)
    i0, i1 = int(t_a * SR), min(N, int(t_b * SR)); buf[i1:] = 0; fl = int(0.05 * SR); buf[i1 - fl:i1] *= np.linspace(1, 0, fl)
    return buf * lvl
music += band(0.15, STOP)
# night: soft pad + slow bells (Am F C G), then flashbacks warm up, realization swell
def pad(chord, d, lvl):
    t = t_(d); x = sum(np.sin(2 * np.pi * NOTE(m) * t * (1 + 0.002 * np.sin(2 * np.pi * 0.3 * t + m))) for m in chord) / len(chord)
    return lpv(x, 1500) * np.minimum(1, t / 0.8) * np.minimum(1, (d - t) / 0.8) * lvl
slow = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
t0 = STOP + 0.3; d = 2.6; k = 0
while t0 < F0(2781) - 0.5:
    lvl = 0.5 if t0 < F0(2088) else 0.7 if t0 < F0(2590) else 0.9
    put(music, pad(slow[k % 4], d + 0.6, 1.0), t0, lvl * 0.6)
    for j, m in enumerate(slow[k % 4]): put(music, bell(NOTE(m + 12), 1.6), t0 + j * 0.45, 0.16 * lvl)
    if t0 >= F0(2088):
        for j in range(8): put(music, pluck(NOTE(slow[k % 4][j % 3] + 24), 0.3), t0 + j * d / 8, 0.18 * lvl)
    t0 += d; k += 1
music += band(F0(2781), F0(3152))
put(music, brass([NOTE(60), NOTE(64), NOTE(67), NOTE(72)], 2.6), F0(3152), 0.32); put(music, kick(), F0(3152), 0.9)
for j, m in enumerate([72, 76, 79, 84]): put(music, bell(NOTE(m), 1.6), F0(3152) + 0.1 + j * 0.12, 0.2)

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
def crickets(d):
    out = np.zeros(len(t_(d)))
    for k in range(int(d * 3)):
        t = t_(0.18); c = np.sin(2 * np.pi * 4300 * t) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 45 * t))) * env(len(t), 0.01, 0.1)
        i0 = int((k / 3) * SR); out[i0:i0 + len(c)] += c[: len(out) - i0]
    return out
def sniff():
    n = len(t_(0.35)); return hpv(rng.standard_normal(n), 2500) * np.sin(np.pi * np.linspace(0, 1, n)) ** 2 * 0.6
def blech():
    t = t_(0.5); f = 160 + 60 * np.sin(2 * np.pi * 9 * t); x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.3 + lpv(rng.standard_normal(len(t)), 900) * 0.6
    return lpv(x, 1200) * np.sin(np.pi * np.linspace(0, 1, len(t))) ** 1.2
def snore():
    t = t_(1.0); return lpv(rng.standard_normal(len(t)), 300) * (0.5 + 0.5 * np.sin(2 * np.pi * 1.2 * t)) ** 2
# after the reveal: a little happy tag from the laugh to the end
for b2, m in enumerate([60, 64, 67, 72, 67, 64, 72, 76]): put(music, pluck(NOTE(m), 0.3), F(2124) + b2 * 0.16, 0.35)
put(music, brass([NOTE(60), NOTE(64), NOTE(67)], 1.2), F(2185), 0.25)
for k2 in range(8): put(music, kick(), F(2185) + k2 * 0.5, 0.6); put(music, hat(), F(2185) + k2 * 0.5 + 0.25, 0.4)
put(music, brass([NOTE(60), NOTE(64), NOTE(67), NOTE(72)], 2.0), F(2303), 0.3)
def heartbeat(): return thunk() * 0.6
put(sfx, birds(3.0), F(10), 0.2); put(sfx, pop(), F(50), 0.45)
put(sfx, pop(), F(120), 0.4); put(sfx, thunk(), F(160), 0.4); put(sfx, whoosh(0.3), F(175), 0.3); put(sfx, pop(), F(196), 0.4)
put(sfx, pop(), F(251), 0.4); put(sfx, pop(), F(280), 0.3); put(sfx, pop(), F(302), 0.3); put(sfx, pop(), F(328), 0.4)
for k in range(10): put(sfx, step(), F(380) + k * 0.4, 0.4)
put(sfx, pop(), F(378), 0.4); put(sfx, boing(), F(478), 0.4)
put(sfx, pop(), F(545), 0.4); put(sfx, thunk(), F(574), 0.45); put(sfx, pop(), F(606), 0.4)
put(sfx, pop(), F(657), 0.4); put(sfx, snore(), F(690), 0.4); put(sfx, ting(2637), F(741), 0.35); put(sfx, clink(3000), F(745), 0.3)
for k in range(12): put(sfx, tick(), F(700) + k * 0.15, 0.4)
put(sfx, pop(), F(786), 0.4); put(sfx, ting(1568), F(850), 0.3)
put(sfx, pop(), F(909), 0.4); put(sfx, ting(2093), F(979), 0.4); put(sfx, shimmer(1.0), F(981), 0.25)
for k in range(8): put(sfx, step(), F(1040) + k * 0.25, 0.4)
put(sfx, pop(), F(1099), 0.4); put(sfx, ting(2637), F(1140), 0.3)
put(sfx, shimmer(1.6), F(1257), 0.3); put(sfx, pop(), F(1262), 0.4)
put(sfx, pop(), F(1351), 0.4); put(sfx, boing(), F(1384), 0.4)
put(sfx, pop(), F(1440), 0.4); put(sfx, pop(), F(1519), 0.4)
put(sfx, pop(), F(1558), 0.4); put(sfx, ting(2637), F(1660), 0.3); put(sfx, crash()[: int(0.5 * SR)], F(1680), 0.35); put(sfx, pop(), F(1713), 0.35)
put(sfx, whoosh(0.5), F(1762), 0.4); put(sfx, crickets(6.0), F(1770), 0.12); put(sfx, pop(), F(1856), 0.3)
for k in range(10): put(sfx, step(), F(1960) + k * 0.17, 0.3)
put(sfx, pop(), F(2028), 0.35); put(sfx, sting(), F(2065), 0.3)
put(sfx, whoosh(0.5), F(2086), 0.35)
for k in range(5): put(sfx, thunk(), F(2122) + k * 0.28, 0.35)
put(sfx, ting(2093), F(2165), 0.35); put(sfx, pop(), F(2177), 0.45)
put(sfx, boing(), F(2255), 0.35); put(sfx, pop(), F(2311), 0.45)
put(sfx, pop(), F(2419), 0.45)
put(sfx, ting(2637), F(2560), 0.35); put(sfx, pop(), F(2578), 0.45)
put(sfx, whoosh(0.5), F(2588), 0.35); put(sfx, shimmer(2.0), F(2670), 0.3)
for k in range(14): put(sfx, step(), F(2725) + k * 0.12, 0.3)
put(sfx, whoosh(0.5), F(2779), 0.35); put(sfx, applause(2.0), F(2786), 0.3); put(sfx, pop(), F(2841), 0.4); put(sfx, applause(2.5), F(2893), 0.35); put(sfx, ting(2093), F(2893), 0.35)
put(sfx, whoosh(0.4), F(2978), 0.3); put(sfx, pop(), F(2985), 0.35); put(sfx, ting(2637), F(3104), 0.35); put(sfx, shimmer(1.4), F(3104), 0.3)
put(sfx, pop(), F(3154), 0.45)

def wr(name, x):
    x = x / (np.abs(x).max() + 1e-9) * 0.8
    with wave.open(name, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
wr('out/music.wav', music); wr('out/sfx.wav', sfx)
print('stems written', dur)
