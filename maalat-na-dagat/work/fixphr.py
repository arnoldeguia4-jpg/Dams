import json,re,subprocess
P=json.load(open('work/phrases.json')); isd=isinstance(P,dict); L=P['phrases'] if isd else P
out=subprocess.run(['ffmpeg','-i','voice.mp3','-af','silencedetect=n=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',out)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',out)]
S=list(zip(st,en))
new=[]
for p in L:
    pieces=[x.strip() for x in re.split(r'(?<=[…?.,"])\s+(?=\S)',p['text']) if x.strip()]
    # merge pieces that are just short tails into split points only at … ? . "
    parts=[];cur=''
    for x in pieces:
        cur=(cur+' '+x).strip()
        if re.search(r'[…?."]$',cur): parts.append(cur);cur=''
    if cur: parts.append(cur)
    inside=[(a,b) for a,b in S if a>p['start']+0.15 and b<p['end']-0.15]
    k=len(parts)-1
    if k>0 and len(inside)>=k:
        cuts=sorted(sorted(inside,key=lambda s:-(s[1]-s[0]))[:k])
        t0=p['start']
        for i,x in enumerate(parts):
            t1=cuts[i][0] if i<k else p['end']
            new.append({'text':x,'start':round(t0,3),'end':round(t1,3)})
            if i<k: t0=cuts[i][1]
    else: new.append(p)
if isd: P['phrases']=new
else: P=new
json.dump(P,open('work/phrases.json','w'),ensure_ascii=False,indent=1)
for p in new: print(round(p['start']*30),round(p['end']*30),p['text'])
