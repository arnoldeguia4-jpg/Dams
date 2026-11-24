# PALDO engine: architecture, editing guide and the traps already found

## Files (kit/)
| File | Role | Edit per story? |
|---|---|---|
| `web/engine.js` | Renderer, toon materials (2-step gradient), `tbox`/`cyl`/`sph`/`cone`/`plane`/`group`, sky dome, `LIGHTS` presets + `applyLight`, canvas cards (`putCard`), post chain (colour MSAA → normal/depth → ink → DOF + grade + flash), motion helpers (`ss`, `easeOut`, `back`, `spring`, `win`, `camFromKeys`, `kick`, `idle`, `blinkAt`, `q`) | Rarely (light presets) |
| `web/paint.js` | Painted canvas textures (planks, plaster, tiles, brick, roof, cobble, grass, metal, curtain, label text, clouds) | Add painters if needed |
| `web/toonbase.js` | Character Pen library (bean heads, faces, bodies, hats, fx). Patched with `armL/armR`, `hold`, `extra`, `headExtra` hooks | No |
| `web/cast.js` | Outfits (`OUT`), arm poses (`ARM`), held props (`PROP`), `drawChar`, fx drawings (germ, spore, colony, confetti, text, dish surface) | Yes |
| `web/world.js` | Sets, each far apart on x (lab at 0, street at −120, macro at 60, …). Returns handles `H` for the animated parts | Yes |
| `web/story.js` | `SHOTS` (a..b, light, at, span, cam keys, kicks, dof), `FLASHES`, `worldAt(f)`, `actorsAt(f)`, `lookAt(f)`. Pure functions of the frame | Yes, the main file |
| `web/main.js` | Applies the world state per frame (`H.*`) and renders. Exposes `window.renderFrame(f)` | Yes, the world-state lines |
| `render.mjs` | Playwright + SwiftShader, writes `frames/fNNNN.jpg`. `RESUME=1` skips existing | No |
| `timing.py` | Silence detection + DP alignment of script phrases → `work/phrases.json` | No |
| `audio.py` | Synth music (C-G-Am-F march at 112 bpm, stops at the twist frame, then a drone) + SFX cue table | Cue table, STOP frame |
| `mix.py`, `finish.sh`, `sheet.py`, `thumb.py` | Mix level lock; encode + QA; contact sheet; thumbnail compositor | `thumb.py` text only |

## Units and conventions
- Metres. A character card is 2.25 m tall and the body ≈ 1.75 m. Its origin is at the soles: `ch(id, OUT.x, f, [x, floorY, z], opts)`.
- In card design space, u = 1 % of head width ≈ 2.36 units. ARM poses are `[elbowDx, elbowDy, handDx, handDy, front?]` in u from the shoulder, with x mirrored per side. The hand position in world space is roughly `x + (300 + 32 + handDx*2.36 − 300) * 0.00225`.
- fx cards are centred on `pos` and face the camera. Pass `{ground:true}` for things standing on a surface; it lifts the card by 0.38·h so it doesn't sink in. `soft:true` (default) means transparent, with no ink and no shadow.
- Lights: `lab` (interior, sun az 4° so the side walls don't shadow the room), `day`, `golden`, `night` (brightened so cutaways read), `stage`. Blend two presets with `applyLight(a, at, b, t)`.
- DOF: `dof: f => ({c, pt})`. c is the max blur in px (0 wide, 4–6 medium-wide, 8–12 close-ups), and pt is the focus point.
- Frame width at distance d with fov 40 on 9:16: half-width ≈ 0.205·d. Check that everything you want in shot fits.

## Traps found on the penicillin short (check every new shot)
1. **The camera is too close to the character**: the head gets cropped. MCU needs ≥ 1.9 m at fov 38–40, and a two-shot needs ≥ 4.5 m.
2. **Characters off-frame during walks**: add a camera key mid-walk whose `look` is the character's position at that frame. `path` via-points alone can lag.
3. **Ground fx sink halfway into the floor**: use `ground:true`.
4. **A label or sign covers the hero**: move it beside the hero, scale it down, and re-frame.
5. **A foreground tree or post between the lens and the actors**: move the set dressing behind the actors (z further from the camera).
6. **Giant fog-coloured hill spheres read as a wall**: drop them or push them far below the horizon.
7. **Houses intersect a hero building**: skip the row items near it.
8. **A tint applied with `color.setRGB` replaced the base colour** (the yellow bottle turned grey): store `userData.base` and multiply.
9. **A costume swap pops**: cover it with a puff fx on the swap frame.
10. **A prop extends past the 600-unit card edge and gets clipped**: keep `handDx` ≤ ~50 for big props.
11. **Crowd heads fill the frame on a stage shot**: use a long lens (fov 27) from far back, with the crowd ~4 m from the camera.
12. **Interior dark walls**: a sun from the side lets the side walls shadow the room. Keep the sun azimuth near 0 for interiors.

## Performance
- About 2.2–3.4 s per frame per worker on a 4-core cloud box. Two workers in parallel give ≈ 1.6–1.8 s per frame overall.
- A canvas card only redraws when its `key` changes, so build keys from `q()`-rounded values.
- The macro dish texture redraws every 2 frames.
