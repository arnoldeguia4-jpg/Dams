import sys,re,json,subprocess
voice,script,out=sys.argv[1],sys.argv[2],sys.argv[4]
dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',voice]))
log=subprocess.run(['ffmpeg','-hide_banner','-i',voice,'-af','silencedetect=noise=-38dB:d=0.18','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',log)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',log)]
sil=list(zip(st,en))
# speech segments
segs=[];cur=0.0
for a,b in sil:
    if a>cur+0.05: segs.append([cur,a])
    cur=b
if cur<dur-0.05: segs.append([cur,dur])
text=open(script).read().strip()
phr=[p.strip() for p in re.split(r'(?<=[.,?!])\s+',text.replace('\n',' ')) if p.strip()]
def syl(w):
    w=w.lower(); w=re.sub(r'[^a-z]','',w)
    n=len(re.findall(r'[aeiouy]+',w)); n-= w.endswith('e') and n>1
    return max(1,n)
S=[sum(syl(w) for w in p.split()) for p in phr]
P,N=len(phr),len(segs)
rate=sum(S)/sum(b-a for a,b in segs)
INF=1e18
# dp[i][j]: first i phrases over first j segments; each phrase takes >=1 segment groups contiguous... allow a segment to hold multiple phrases too
# Model: boundaries between phrases must sit at segment boundaries (silences) OR inside segment (penalised). Simplify: group segments->phrases, each phrase>=1 segment, or several phrases per segment w/ penalty.
import functools
sys.setrecursionlimit(10000)
@functools.lru_cache(None)
def f(i,j):
    if i==P and j==N: return 0,()
    if i==P or j==N: return INF,()
    best=(INF,())
    # phrases i..i2-1 into segments j..j2-1
    for i2 in range(i+1,min(P,i+3)+1):
        for j2 in range(j+1,min(N,j+4)+1):
            if i2-i>1 and j2-j>1: continue
            d=segs[j2-1][1]-segs[j][0]; s=sum(S[i:i2])
            c=(d*rate-s)**2/max(s,1)
            c+= 3*(i2-i-1)  # multiple phrases in one segment
            c+= 1.5*(j2-j-1) * (1 if phr[i2-1][-1] in '.?!' else 0.6)
            if phr[i2-1][-1]==',' : c+=0.5
            r=f(i2,j2)
            if c+r[0]<best[0]: best=(c+r[0],((i,i2,j,j2),)+r[1])
    return best
cost,path=f(0,0)
res=[]
for i,i2,j,j2 in path:
    a,b=segs[j][0],segs[j2-1][1]; s=sum(S[i:i2]); t=a
    for k in range(i,i2):
        d=(b-a)*S[k]/s; res.append({'text':phr[k],'start':round(t,3),'end':round(t+d,3)}); t+=d
json.dump({'duration':dur,'frames':round(dur*30),'phrases':res},open(out+'/phrases.json','w'),indent=1)
for r in res: print(f"{r['start']:6.2f}-{r['end']:6.2f} f{round(r['start']*30):4d}  {r['text']}")
print('dur',dur,'frames',round(dur*30),'cost',round(cost,1),'segs',N,'phr',P)
