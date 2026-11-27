import sys,os
from PIL import Image,ImageDraw
d,out=sys.argv[1],sys.argv[2]; fs=sorted(x for x in os.listdir(d) if x.endswith('.jpg'))
tw,th=270,480; cols=min(6,len(fs)); rows=(len(fs)+cols-1)//cols
S=Image.new('RGB',(cols*tw,rows*(th+24)),'white'); D=ImageDraw.Draw(S)
for i,f in enumerate(fs):
    im=Image.open(os.path.join(d,f)).resize((tw,th)); x,y=(i%cols)*tw,(i//cols)*(th+24); S.paste(im,(x,y+24)); D.text((x+4,y+4),f,fill='black')
S.save(out,quality=88)
