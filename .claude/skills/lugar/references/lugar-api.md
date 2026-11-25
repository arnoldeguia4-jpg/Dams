# LUGAR kit API (web/)

## blocky.js — characters
```js
import { makeBlocky, pose, setFace, hold, roundedBox, soft } from './blocky.js';
const hero = makeBlocky({ skin:'#b8794f', shirt:'#f2c440', pants:'#2b3b7a', hair:'blocky', item:'bag', seed:1 });
pose(hero, f, { pos:[x,0,z], yaw:deg, pose:'walk', t:f/26, expr:'grin', look:[yawDeg,pitchDeg], lean:deg });
```
- **spec:** `skin, shirt, sleeves, pants, shoes, hair ('blocky'|'curly'|'bun'|'long'|'cap'|'bald'|'grey'|'none'), hairColor, capColor, hat ('tophat'|'salakot'|'crown'|'headband'), bandColor, glasses, moustache (colour), skirt (colour), vest, sash, item ('bag'), bagColor, kid (true → 0.72 scale), scale, belly (1.2 = stout), seed (blink offset)`.
- **expr:** smile, happy, grin, laugh, shock, wow, sad, cry, angry, smug, worried, neutral, blink, sleepy, dizzy, love. Auto-blinks unless `blink:false`.
- **pose:** idle, walk, run (use `t` = phase, e.g. `f/26` walk, `f/16` run), wave, cheer, point, shrug, think, facepalm, hold (both hands forward), pray, sit, fall (`t` 0..1), jump (`t` 0..1), bow, dance. Override a shoulder with `armL/armR: [xDeg, yDeg, zDeg]` (x negative = forward, R z positive = outward/up).
- The character faces **+z** at `yaw:0`. Height ≈ 2.2 m (kid ≈ 1.6 m). Head centre ≈ 1.75 m; pills go at y ≈ 2.4–2.6.
- `hold(rig, obj, 'R')` parents a mesh to the hand (hand origin at the end of the arm; offset the object by ~ −0.05 y).
- Hide rigs that are not in the shot: `rig.root.visible = false` (frameAt starts by hiding all, `pose()` shows).

## props.js — sets
`ground(col)`, `road({x,z,len,w,alongX})`, `house({x,z,w,h,d,col,ry,seed})`, `street({x0,x1,z,face,gap,seed})`, `store({x,z,ry,name,signBg,wall})`, `sign(text,w,h,{bg,fg},{x,y,z,parent})`, `tree({x,z,s})`, `lamp({x,z})`, `jeep({x,z,ry,col,trim})`, `table`, `bed`, `room({x,z,w,d,h,wall,floor})`, `phone(screenCol)` (`.userData.screen` plane), `cup()`, `bill()`, `coin()`, and `rb(w,h,d,col,{x,y,z,ry,parent,r})` for any rounded box.
Signs and pills use the bundled **Nunito Black** (loaded in `index.html`; `main.js` awaits it before `setup()`).

## cast.js — fx cards (2D, face the camera)
`pill(id,f,a,b,pos,text,kind,h)` kinds: yellow, red, green, white, blue, purple · `shout(id,f,a,b,pos,text,col,h)` · `burst(id,f,at,pos,h,col)` · `puff(id,f,at,pos,h)` · `dizzy(id,f,a,b,pos)` · `moneyRain(id,f,a,b,pos,h)` · `confetti(...)` · `glowCard(id,pos,h,a,rgb,order)`. Return them from `frameAt` (nulls are ignored).

## Lights
`lugar` (bright pastel day), `lugarDusk` (purple-orange sunset), `lugarNight` (blue night, for bedroom scenes). Ink is off (`look.inkR = 0`).

## Captions
`captions.py work/phrases.json out/captions.ass [--words work/words.json] [--size 92] [--y 1450] [--pop 70] [--keepcase]`. Keep faces and pills out of the caption band (y ≈ 1350–1550 of 1920).

## Traps (from the kit test)
- The camera too close to a hero in a room makes the head fill the frame: MCU ≥ 2.2 m at fov 40.
- A glow card in front of a character washes it out: put glow cards behind (smaller z) or skip them.
- Vehicles and characters overlap: move props by frame and check stills.
- Houses from `street()` sit at z ±9 with 5 m depth; keep the camera on the road side.

## More traps (from "Hinahawa ang Tawa")
- Camera keys that glide past a balcony rail or a character pass *through* them for a few frames; add a mid key or cut instead of gliding.
- Street rows from `street()` stand at z ±9 with 5 m depth: a camera at z > 6 is inside the houses.
- A character placed inside a building block (e.g. behind a mansion facade) renders hidden or cut; check `pos` against the building's footprint.
- Seated rigs (`pose:'sit'`) push their white shoes toward the camera; frame them from the side or a bit higher.
- Night shots: `lugarNight` is tuned bright enough for faces; don't darken it further.
