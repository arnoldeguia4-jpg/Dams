// The sets: Fleming's lab (origin), London street (x -120), macro dish (x 60), Oxford lab (x 150), factory (x 200),
// cutaway building (x 260), Nobel stage (x 320). Returns handles to the animated parts.
import { THREE, scene, toon, unlit, tbox, cyl, sph, cone, plane, group, place } from './engine.js';
import * as P from './paint.js';

const T = {
  floor: P.planks('#9c6a3c', 1, 5), plaster: P.plaster('#ecdcbc', 2), tiles: P.tiles('#d8e6df', '#8fa39a', 3, 6), bench: P.planks('#7a5232', 4, 3),
  brick: P.brick('#a4553c', 4), brick2: P.brick('#8f5a44', 9), cream: P.plaster('#e8d9b0', 6), ochre: P.plaster('#d6a85a', 7), roof: P.roofTiles('#5d6470', 5),
  cobble: P.cobble('#8d877c', 6), grass: P.grass('#6f9a45', 7), metal: P.metal('#9aa3a8', 8), steel: P.metal('#b8c0c6', 12), curtain: P.curtain('#9b2232', 9),
  door: P.planks('#5d3a22', 10, 5), stageFloor: P.planks('#8a5a34', 11, 8), cab: P.planks('#5f7366', 13, 4),
};
const M = {
  floor: toon('#ffffff', T.floor), wall: toon('#ffffff', T.plaster), tiles: toon('#ffffff', T.tiles), bench: toon('#ffffff', T.bench), cab: toon('#ffffff', T.cab),
  glass: toon('#cfe9ef'), agar: toon('#ecd78e'), white: toon('#f4f1ea'), ink: toon('#2a2430'), brass: toon('#c9a040'), dark: toon('#3a3640'),
  steel: toon('#ffffff', T.steel), metal: toon('#ffffff', T.metal), wood: toon('#8a5a34'), door: toon('#ffffff', T.door), frame: toon('#efe8d8'),
  brick: toon('#ffffff', T.brick), brick2: toon('#ffffff', T.brick2), cream: toon('#ffffff', T.cream), ochre: toon('#ffffff', T.ochre), roof: toon('#ffffff', T.roof),
  cobble: toon('#ffffff', T.cobble), grass: toon('#ffffff', T.grass), curtain: toon('#ffffff', T.curtain), stage: toon('#ffffff', T.stageFloor),
  juice: toon('#f0c93a'), mould: toon('#4fae8c'), red: toon('#c9373a'), green: toon('#3f7a52'), blue: toon('#3f6fb5'),
};

// dish stack: a cylinder with painted glass / agar stripes, one stripe pair per dish
const stackTex = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 32; const g = c.getContext('2d');
  g.fillStyle = '#d6eef2'; g.fillRect(0, 0, 64, 32); g.fillStyle = '#ead593'; g.fillRect(0, 10, 64, 14); g.fillStyle = '#5f7a80'; g.fillRect(0, 0, 64, 3);
  const t = P.ctex(c); return t; })();
const dishStack = (n, o) => {
  const tex = stackTex.clone(); tex.needsUpdate = true; tex.repeat.set(1, n);
  const m = cyl(0.055, 0.055, 0.013 * n, toon('#ffffff', tex), { seg: 20, ...o, y: (o.y ?? 0) });
  m.geometry.translate(0, 0.0065 * n, 0); return m;
};
const flask = (x, y, z, s = 1, liquid = M.juice, parent) => {
  const g = group({ x, y, z, parent }); g.scale.setScalar(s);
  cone(0.09, 0.16, M.glass, { y: 0.08, parent: g, seg: 16 }); cyl(0.022, 0.022, 0.12, M.glass, { y: 0.2, parent: g, seg: 12 });
  cone(0.075, 0.07, liquid, { y: 0.035, parent: g, seg: 16 }); return g;
};
const bottle = (x, y, z, col = '#6d8f5a', h = 0.24, parent) => { const g = group({ x, y, z, parent }); cyl(0.05, 0.05, h, toon(col), { y: h / 2, parent: g, seg: 14 }); cyl(0.02, 0.025, 0.06, toon(col), { y: h + 0.03, parent: g, seg: 10 }); return g; };

export const build = () => {
  const H = {};
  // =================== LAB (origin) ===================
  const lab = group({}); H.lab = lab;
  tbox(9, 0.1, 7, M.floor, { y: -0.05, parent: lab, tm: 1.6 });
  tbox(9, 3.6, 0.2, M.wall, { y: 1.8, z: -3.1, parent: lab, tm: 3 });
  tbox(9, 1.1, 0.04, M.tiles, { y: 0.55, z: -2.99, parent: lab, tm: 1 });
  // window in the back wall (painted London view behind)
  const win = group({ x: 2.1, y: 2.05, z: -2.96, parent: lab });
  const view = (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 512; const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, '#5d93d9'); gr.addColorStop(1, '#cfe0f2'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
    g.fillStyle = '#8f9fb8'; for (let i = 0; i < 9; i++) { const h = 120 + (i * 53) % 110; g.fillRect(i * 60 - 10, 512 - h, 56, h); g.fillRect(i * 60 + 10, 512 - h - 30, 10, 30); }
    g.fillStyle = '#7a8aa6'; g.fillRect(330, 170, 50, 342); g.beginPath(); g.moveTo(325, 170); g.lineTo(355, 100); g.lineTo(385, 170); g.fill();
    g.fillStyle = '#f2ead2'; g.beginPath(); g.arc(355, 210, 18, 0, 7); g.fill(); return P.ctex(c, false); })();
  H.winView = plane(1.5, 1.3, unlit('#ffffff', view), { parent: win, z: -0.02 });
  for (const [w, h, x, y] of [[1.7, 0.1, 0, 0.7], [1.7, 0.12, 0, -0.7], [0.1, 1.5, -0.8, 0], [0.1, 1.5, 0.8, 0], [0.06, 1.4, 0, 0], [1.6, 0.06, 0, 0]]) tbox(w, h, 0.1, M.frame, { x, y, parent: win });
  // left wall with the door (door hinge at z 0.2, door spans z 0.2..1.3)
  tbox(0.2, 3.6, 3.2, M.wall, { x: -4.5, y: 1.8, z: -1.5, parent: lab, tm: 3 });
  tbox(0.2, 3.6, 2.2, M.wall, { x: -4.5, y: 1.8, z: 2.4, parent: lab, tm: 3 });
  tbox(0.2, 1.2, 1.1, M.wall, { x: -4.5, y: 3.0, z: 0.75, parent: lab, tm: 3 });
  tbox(0.04, 1.1, 3.2, M.tiles, { x: -4.38, y: 0.55, z: -1.5, parent: lab });
  const doorHinge = group({ x: -4.45, y: 0, z: 0.2, parent: lab }); H.door = doorHinge;
  tbox(0.08, 2.35, 1.1, M.door, { y: 1.18, z: 0.55, parent: doorHinge, tm: 1.2 });
  sph(0.045, M.brass, { x: 0.07, y: 1.1, z: 1.0, parent: doorHinge });
  const lightOut = plane(1.1, 2.4, unlit('#fff2cf'), { x: -4.56, y: 1.2, z: 0.75, ry: Math.PI / 2, parent: lab }); lightOut.userData.noND = true;
  // right wall
  tbox(0.2, 3.6, 7, M.wall, { x: 4.5, y: 1.8, z: 0, parent: lab, tm: 3 });
  tbox(0.04, 1.1, 7, M.tiles, { x: 4.38, y: 0.55, parent: lab });
  // main bench
  tbox(5.4, 0.08, 0.95, M.bench, { y: 0.92, z: -2.45, parent: lab, tm: 1.2 });
  tbox(5.3, 0.88, 0.85, M.cab, { y: 0.44, z: -2.48, parent: lab, tm: 1 });
  for (let i = 0; i < 6; i++) { tbox(0.8, 0.02, 0.02, M.ink, { x: -2.2 + i * 0.88, y: 0.7, z: -2.04, parent: lab }); sph(0.025, M.brass, { x: -2.2 + i * 0.88, y: 0.6, z: -2.04, parent: lab }); }
  // shelves above the bench (left of the window)
  for (const y of [1.55, 2.1, 2.65]) tbox(3.2, 0.05, 0.3, M.wood, { x: -1.2, y, z: -2.85, parent: lab });
  for (const x of [-2.8, 0.4]) tbox(0.05, 1.3, 0.3, M.wood, { x, y: 2.05, z: -2.85, parent: lab });
  // calendar on the wall (texture swapped per year)
  H.calendar = plane(0.34, 0.44, unlit('#ffffff', P.label('1928', { w: 256, h: 320, font: 'bold 84px Georgia, serif' })), { x: 3.98, y: 2.12, z: -2.98, parent: lab });
  H.calTex = {}; for (let y = 1928; y <= 1939; y++) H.calTex[y] = P.label(String(y), { w: 256, h: 320, font: 'bold 84px Georgia, serif' });
  // stacks everywhere
  const rnd = P.rng(11), stacks = [];
  const shelfStacks = [[-2.6, 1.575], [-2.3, 1.575], [-1.95, 1.575], [-1.5, 1.575], [-0.9, 1.575], [-0.4, 1.575], [0.1, 1.575],
    [-2.5, 2.125], [-2.0, 2.125], [-1.2, 2.125], [-0.6, 2.125], [0.2, 2.125], [-2.4, 2.675], [-1.6, 2.675], [-0.2, 2.675]];
  for (const [x, y] of shelfStacks) stacks.push(dishStack(8 + Math.floor(rnd() * 14), { x, y, z: -2.85, parent: lab, rz: (rnd() - 0.5) * 0.06 }));
  for (let i = 0; i < 16; i++) stacks.push(dishStack(3 + Math.floor(rnd() * 12), { x: -2.4 + i * 0.3 + (rnd() - 0.5) * 0.1, y: 0.96, z: -2.3 - rnd() * 0.4, parent: lab, rz: (rnd() - 0.5) * 0.08 }));
  for (let i = 0; i < 8; i++) stacks.push(dishStack(4 + Math.floor(rnd() * 10), { x: -3.6 + rnd() * 1.2, y: 0, z: -2.2 + rnd() * 1.5, parent: lab, rz: (rnd() - 0.5) * 0.1 })); // floor piles
  // the hook tower (pivot at its base) and the one that topples
  H.tower = group({ x: -0.55, y: 0.96, z: -2.05, parent: lab }); dishStack(58, { parent: H.tower });
  H.topple = group({ x: 1.3, y: 0.96, z: -2.15, parent: lab }); dishStack(22, { parent: H.topple });
  // flasks / bottles / microscope on the bench
  H.juiceFlask = flask(0.85, 0.96, -2.15, 1.6);
  for (const [x, z, c] of [[-1.8, -2.6, '#6d8f5a'], [-1.6, -2.7, '#8a5a8a'], [2.0, -2.6, '#5a7aa0'], [2.3, -2.55, '#a06a3a']]) bottle(x, 0.96, z, c, 0.24, lab);
  flask(-1.2, 0.96, -2.5, 1.2, M.agar, lab); flask(2.4, 0.96, -2.25, 1.0, M.mould, lab);
  const scope = group({ x: -0.05, y: 0.96, z: -2.55, parent: lab }); tbox(0.18, 0.03, 0.22, M.ink, { y: 0.015, parent: scope });
  tbox(0.05, 0.3, 0.05, M.ink, { y: 0.17, z: -0.07, parent: scope }); cyl(0.03, 0.03, 0.26, M.dark, { y: 0.27, rx: 0.5, parent: scope });
  // cleaning tray (lysol) on the bench right
  tbox(0.5, 0.06, 0.35, M.white, { x: 1.9, y: 0.99, z: -2.2, parent: lab }); tbox(0.44, 0.01, 0.29, toon('#b9d8e0'), { x: 1.9, y: 1.025, z: -2.2, parent: lab });
  // hero dish (single, on the bench centre) + its glow
  H.hero = group({ x: 0.35, y: 0.96, z: -2.05, parent: lab });
  cyl(0.075, 0.075, 0.016, M.glass, { y: 0.008, parent: H.hero, seg: 28 }); cyl(0.068, 0.068, 0.004, M.agar, { y: 0.017, parent: H.hero, seg: 28 });
  H.heroMould = cyl(0.025, 0.025, 0.005, toon('#4fae8c'), { y: 0.019, x: -0.012, z: 0.008, parent: H.hero, seg: 20 });
  // sink on the right wall with a mountain of unwashed dishes
  const sink = group({ x: 3.75, y: 0, z: -1.5, parent: lab }); H.sink = sink;
  tbox(1.2, 0.85, 1.4, M.white, { y: 0.425, parent: sink }); tbox(1.0, 0.04, 1.2, toon('#9fb4bc'), { y: 0.86, parent: sink });
  cyl(0.025, 0.025, 0.5, M.steel, { x: 0.5, y: 1.1, parent: sink, seg: 10 }); tbox(0.25, 0.05, 0.05, M.steel, { x: 0.38, y: 1.34, parent: sink });
  for (let i = 0; i < 9; i++) dishStack(6 + Math.floor(rnd() * 14), { x: -0.35 + (i % 3) * 0.3, y: 0.86, z: -0.4 + Math.floor(i / 3) * 0.35, parent: sink, rz: (rnd() - 0.5) * 0.3, rx: (rnd() - 0.5) * 0.25 });
  // floor vent near the bench
  tbox(0.5, 0.02, 0.3, M.ink, { x: 1.0, y: 0.005, z: -1.6, parent: lab });
  for (let i = 0; i < 5; i++) tbox(0.46, 0.025, 0.02, M.metal, { x: 1.0, y: 0.012, z: -1.72 + i * 0.06, parent: lab });
  // the shelf bottle for the ten-year wait (on a wall shelf right of the window)
  tbox(0.9, 0.05, 0.3, M.wood, { x: 3.6, y: 1.6, z: -2.85, parent: lab });
  H.shelfBottle = bottle(3.55, 1.625, -2.82, '#e8c440', 0.28, lab);
  H.shelfLabel = plane(0.11, 0.08, unlit('#ffffff', P.label('PENICILLIN', { w: 512, h: 256, font: 'bold 64px Georgia, serif' })), { x: 3.55, y: 1.74, z: -2.769, parent: lab });
  H.dust = plane(0.12, 0.3, toon('#8f8476', null, { transparent: true, opacity: 0 }), { x: 3.55, y: 1.78, z: -2.766, parent: lab }); H.dust.userData.noND = true;
  // ceiling lamp
  cyl(0.01, 0.01, 0.9, M.ink, { x: 0, y: 3.15, z: -1.2, parent: lab, seg: 6 }); cone(0.28, 0.2, M.green, { x: 0, y: 2.65, z: -1.2, parent: lab });

  // =================== LONDON street (x -120) ===================
  const L = group({ x: -120 }); H.london = L;
  tbox(220, 0.1, 160, M.cobble, { y: -0.05, parent: L, tm: 2 });
  tbox(220, 0.15, 3, toon('#b9b0a0'), { y: 0.07, z: -6.5, parent: L, tm: 2 });
  const houseCols = [M.brick, M.cream, M.ochre, M.brick2, M.cream];
  const house = (x, z, w, h, mat, parent, face = 1) => {
    const g = group({ x, z, parent });
    tbox(w, h, 8, mat, { y: h / 2, parent: g, tm: 2.4 });
    const roofH = 2.2, rg = new THREE.CylinderGeometry(0.01, 1, 1, 4, 1); // pyramid-ish roof as a prism
    const roof = tbox(w + 0.4, roofH, 8.4, M.roof, { y: h + roofH / 2, parent: g, tm: 1.2 });
    roof.scale.set(1, 1, 1); roof.geometry.translate(0, 0, 0);
    const pos = roof.geometry.attributes.position; for (let i = 0; i < pos.count; i++) if (pos.getY(i) > 0) pos.setZ(i, pos.getZ(i) * 0.08); pos.needsUpdate = true; roof.geometry.computeVertexNormals();
    tbox(0.7, 1.6, 0.7, M.brick, { x: w * 0.3, y: h + 1.8, z: 1.5, parent: g, tm: 1 }); cyl(0.12, 0.12, 0.4, toon('#c9653f'), { x: w * 0.3, y: h + 2.8, z: 1.5, parent: g, seg: 8 });
    for (let fl = 0; fl < Math.floor(h / 3); fl++) for (let k = 0; k < 2; k++) {
      const wx = -w / 4 + k * w / 2, wy = 1.9 + fl * 3;
      tbox(1.1, 1.5, 0.1, toon('#33405a'), { x: wx, y: wy, z: 4.03 * face, parent: g });
      tbox(1.3, 0.15, 0.2, M.frame, { x: wx, y: wy - 0.8, z: 4.06 * face, parent: g });
    }
    tbox(1.1, 2.2, 0.1, toon('#2f4f3a'), { x: 0, y: 1.1, z: 4.03 * face, parent: g });
    return g;
  };
  for (let i = 0; i < 12; i++) if (Math.abs(-42 + i * 7.2 - 2) > 9) house(-42 + i * 7.2, -11, 7, [7, 8.4, 9.8][i % 3], houseCols[i % 5], L);
  for (let i = 0; i < 12; i++) { const g = house(-42 + i * 7.2, 12, 7, [8.4, 7, 9.8][i % 3], houseCols[(i + 2) % 5], L); g.rotation.y = Math.PI; }
  // the laboratory building (taller, brick, sign)
  const labB = group({ x: 2, z: -12, parent: L }); H.labBuilding = labB;
  tbox(12, 13, 9, M.brick2, { y: 6.5, parent: labB, tm: 2.4 });
  tbox(12.6, 0.5, 9.6, M.frame, { y: 13.2, parent: labB });
  for (let fl = 0; fl < 4; fl++) for (let k = 0; k < 4; k++) {
    tbox(1.3, 1.8, 0.1, toon(fl === 2 && k === 2 ? '#f6dea0' : '#33405a'), { x: -4.5 + k * 3, y: 2.2 + fl * 3, z: 4.53, parent: labB });
    tbox(1.5, 0.15, 0.25, M.frame, { x: -4.5 + k * 3, y: 1.2 + fl * 3, z: 4.6, parent: labB });
  }
  plane(5, 0.9, unlit('#ffffff', P.label('LABORATORY', { w: 1024, h: 180, bg: '#1d3b2f', fg: '#f2e2b0', border: '#c9a040', font: 'bold 110px Georgia, serif' })), { x: 0, y: 10.9, z: 4.62, parent: labB });
  // distant clock tower
  const tower = group({ x: 30, z: -70, parent: L });
  tbox(7, 46, 7, M.ochre, { y: 23, parent: tower, tm: 3 }); cone(5.4, 14, M.roof, { y: 53, parent: tower, seg: 4, ry: Math.PI / 4 });
  for (const r of [0, Math.PI / 2]) { const fc = sph(2.4, toon('#f4ecd2'), { y: 40, parent: tower, seg: 24 }); fc.scale.set(r ? 0.15 : 1, 1, r ? 1 : 0.15); fc.position.z = r ? 0 : 3.5; fc.position.x = r ? -3.5 : 0; }
  // hills + trees in the far distance, clouds
  for (let i = 0; i < 0; i++) sph(40 + (i % 3) * 14, M.grass, { x: -160 + i * 50, y: -40, z: -320, parent: L, seg: 20 });
  H.clouds = [];
  for (let i = 0; i < 7; i++) { const c = plane(40, 20, unlit('#ffffff', P.cloudTex(i + 3), { transparent: true, fog: false, depthWrite: false }), { x: -100 + i * 35, y: 45 + (i % 3) * 10, z: -180 - (i % 2) * 30, parent: L }); c.userData.noND = true; H.clouds.push(c); }
  // a park corner for the kid (bench + grass patch)
  tbox(14, 0.12, 6, M.grass, { x: -24, y: 0.02, z: 3, parent: L, tm: 3 });
  tbox(2.2, 0.08, 0.5, M.wood, { x: -24, y: 0.5, z: 1.5, parent: L }); for (const x of [-25, -23]) tbox(0.08, 0.5, 0.45, M.ink, { x, y: 0.25, z: 1.5, parent: L });
  for (let i = 0; i < 5; i++) { const tg = group({ x: -30 + i * 3.2, z: -1.5, parent: L }); cyl(0.15, 0.2, 2.4, toon('#6a4a30'), { y: 1.2, parent: tg, seg: 8 }); sph(1.4, toon('#4f8a3a'), { y: 3.2, parent: tg, seg: 14 }); }

  // =================== MACRO dish (x 60) ===================
  const D = group({ x: 60 }); H.macro = D;
  tbox(30, 0.4, 30, toon('#ffffff', P.planks('#8a5a34', 21, 3)), { y: -0.2, parent: D, tm: 4 });
  const dishC = document.createElement('canvas'); dishC.width = dishC.height = 1024; H.dishCanvas = dishC;
  H.dishTex = P.ctex(dishC, false);
  cyl(1.72, 1.72, 0.22, M.glass, { y: 0.11, parent: D, seg: 64, open: true });
  cyl(1.72, 1.72, 0.02, toon('#c7dfe3'), { y: 0.01, parent: D, seg: 64 });
  const surf = new THREE.Mesh(new THREE.CircleGeometry(1.70, 64), toon('#ffffff', H.dishTex)); surf.rotation.x = -Math.PI / 2; place(surf, { y: 0.1, parent: D, rx: -Math.PI / 2, cast: false });
  H.dishSurf = surf;
  // label propped against the dish (Gerald)
  H.gLabel = plane(0.7, 0.35, unlit('#ffffff', P.label('GERALD', { w: 512, h: 256, font: 'bold 110px Georgia, serif' })), { x: 1.22, y: 0.3, z: 1.55, ry: -0.2, parent: D });
  // dropper above the dish
  H.dropper = group({ x: 0, y: 4, z: 0, parent: D }); cyl(0.07, 0.03, 1.4, M.glass, { y: 0.7, parent: H.dropper, seg: 12 }); sph(0.2, M.red, { y: 1.5, parent: H.dropper }); H.dropper.children[1].scale.set(1, 1.5, 1);
  H.drop = sph(0.09, M.juice, { parent: D, y: 3 }); H.drop.scale.set(1, 1.3, 1);
  // keep-out sign (stake + board), scaled from 0 by the story
  H.sign = group({ x: -0.75, y: 0.1, z: -0.15, parent: D });
  tbox(0.06, 0.9, 0.06, M.wood, { y: 0.45, parent: H.sign });
  plane(0.9, 0.42, unlit('#ffffff', P.label('KEEP OUT', { w: 512, h: 240, bg: '#f6ecd2', fg: '#c9302c', font: 'bold 104px Georgia, serif' })), { y: 0.8, z: 0.035, parent: H.sign });
  tbox(0.94, 0.46, 0.04, M.wood, { y: 0.8, parent: H.sign });
  // other macro dishes in the background (blurred)
  for (const [x, z] of [[-4, -3], [4.5, -4], [-1.5, -6]]) { cyl(1.6, 1.6, 0.22, M.glass, { x, y: 0.11, z, parent: D, seg: 40, open: true }); cyl(1.58, 1.58, 0.04, M.agar, { x, y: 0.08, z, parent: D, seg: 40 }); }
  flask(5, 0, 2, 9, M.juice, D);

  // =================== OXFORD lab (x 150) ===================
  const O = group({ x: 150 }); H.oxford = O;
  tbox(14, 0.1, 10, M.floor, { y: -0.05, parent: O, tm: 1.6 });
  tbox(14, 5, 0.2, M.wall, { y: 2.5, z: -4, parent: O, tm: 3 }); tbox(14, 1.2, 0.05, M.tiles, { y: 0.6, z: -3.88, parent: O });
  for (let i = 0; i < 3; i++) { const wx = -4 + i * 4; tbox(1.4, 2.4, 0.06, unlit('#cfe3f6'), { x: wx, y: 3.0, z: -3.86, parent: O }); cyl(0.7, 0.7, 0.06, unlit('#cfe3f6'), { x: wx, y: 4.2, z: -3.86, rx: Math.PI / 2, parent: O, seg: 20 });
    tbox(0.08, 2.4, 0.1, M.frame, { x: wx, y: 3.0, z: -3.82, parent: O }); }
  tbox(0.2, 5, 10, M.wall, { x: -7, y: 2.5, parent: O, tm: 3 });
  H.buckets = [];
  for (let row = 0; row < 3; row++) {
    tbox(9, 0.08, 1.0, M.bench, { x: 0, y: 0.9, z: -2.6 + row * 1.9, parent: O, tm: 1.2 });
    for (const lx of [-4.2, 4.2]) tbox(0.08, 0.9, 0.9, M.ink, { x: lx, y: 0.45, z: -2.6 + row * 1.9, parent: O });
    for (let k = 0; k < 11; k++) {
      const b = group({ x: -4 + k * 0.8, y: 0.94, z: -2.6 + row * 1.9, parent: O });
      cyl(0.2, 0.16, 0.34, M.metal, { y: 0.17, parent: b, seg: 16, open: false });
      cyl(0.185, 0.185, 0.01, toon('#e9d36a'), { y: 0.32, parent: b, seg: 16 });
      sph(0.06, M.mould, { y: 0.33, x: 0.05, parent: b, seg: 8 }).scale.set(1, 0.4, 1);
      H.buckets.push(b);
    }
  }
  // =================== FACTORY (x 200) ===================
  const F = group({ x: 200 }); H.factory = F;
  tbox(40, 0.1, 24, toon('#8f8a80'), { y: -0.05, parent: F });
  tbox(40, 12, 0.3, M.brick2, { y: 6, z: -10, parent: F, tm: 2.4 });
  for (let i = 0; i < 4; i++) { const tk = group({ x: -9 + i * 5.5, z: -6, parent: F }); cyl(2, 2, 6, M.steel, { y: 3.4, parent: tk, seg: 28 }); sph(2, M.steel, { y: 6.4, parent: tk, seg: 20 }).scale.set(1, 0.45, 1);
    for (const lx of [-1.4, 1.4]) tbox(0.2, 0.6, 0.2, M.ink, { x: lx, y: 0.3, parent: tk }); cyl(0.15, 0.15, 3, M.metal, { y: 7.5, parent: tk, seg: 8 });
    plane(1.6, 0.6, unlit('#ffffff', P.label('PENICILLIN', { w: 512, h: 192, bg: '#2a4c8a', fg: '#f4f1ea', border: null, font: 'bold 80px Georgia, serif' })), { y: 3.6, z: 2.01, parent: tk }); }
  tbox(30, 0.9, 1.2, M.ink, { y: 0.45, z: -1, parent: F }); tbox(30, 0.06, 1.0, toon('#5a5a62'), { y: 0.93, z: -1, parent: F });
  H.bottles = [];
  for (let i = 0; i < 36; i++) { const b = bottle(0, 0.96, -1, '#e8c440', 0.22, F); H.bottles.push(b); }
  for (let i = 0; i < 9; i++) { const crate = group({ x: -12 + i * 3, z: 3.5, parent: F }); tbox(1.2, 0.6, 0.9, M.wood, { y: 0.3, parent: crate }); }

  // =================== CUTAWAY building (x 260) ===================
  const C = group({ x: 260 }); H.cut = C;
  tbox(10, 0.3, 6, M.floor, { y: -0.15, parent: C });
  tbox(10, 7.4, 0.3, M.brick2, { y: 3.7, z: -3, parent: C, tm: 2.4 });
  tbox(0.3, 7.4, 6, M.brick2, { x: -5, y: 3.7, parent: C, tm: 2.4 }); tbox(0.3, 7.4, 6, M.brick2, { x: 5, y: 3.7, parent: C, tm: 2.4 });
  tbox(10, 0.3, 6, M.cream, { y: 7.5, parent: C });
  tbox(7.5, 0.35, 6, toon('#7a6a58'), { x: -1.25, y: 3.7, parent: C }); tbox(1.4, 0.35, 6, toon('#7a6a58'), { x: 4.3, y: 3.7, parent: C });
  // stairwell gap at x 2.6..3.6: stairs
  for (let i = 0; i < 9; i++) tbox(1.0, 0.2, 0.8, M.wood, { x: 3.1, y: 0.2 + i * 0.4, z: -2.2 + i * 0.25, parent: C });
  // downstairs: the mould lab (jars glowing)
  tbox(5, 0.08, 0.9, M.bench, { x: -1.5, y: 0.9, z: -2.4, parent: C }); tbox(4.9, 0.86, 0.85, M.cab, { x: -1.5, y: 0.43, z: -2.42, parent: C });
  for (let k = 0; k < 7; k++) { cyl(0.16, 0.16, 0.4, M.glass, { x: -3.5 + k * 0.6, y: 1.14, z: -2.4, parent: C, seg: 14 }); sph(0.13, M.mould, { x: -3.5 + k * 0.6, y: 1.05, z: -2.4, parent: C, seg: 10 }); }
  for (const y of [1.8, 2.5]) tbox(4.4, 0.05, 0.3, M.wood, { x: -1.5, y, z: -2.75, parent: C });
  for (let k = 0; k < 8; k++) sph(0.12, M.mould, { x: -3.4 + k * 0.55, y: 1.92 + (k % 2) * 0.7, z: -2.72, parent: C, seg: 10 });
  // upstairs: Fleming's bench with dishes
  tbox(5, 0.08, 0.9, M.bench, { x: -1.5, y: 4.8, z: -2.4, parent: C }); tbox(4.9, 0.9, 0.85, M.cab, { x: -1.5, y: 4.35, z: -2.42, parent: C });
  for (let k = 0; k < 6; k++) dishStack(2 + (k * 7) % 9, { x: -3.5 + k * 0.7, y: 4.84, z: -2.35, parent: C });
  H.cutDish = group({ x: 0.6, y: 4.84, z: -2.1, parent: C }); cyl(0.09, 0.09, 0.02, M.glass, { y: 0.01, parent: H.cutDish }); cyl(0.08, 0.08, 0.005, M.agar, { y: 0.022, parent: H.cutDish });
  // lamps
  for (const y of [3.3, 7.1]) { cone(0.3, 0.22, M.green, { x: -1.5, y, z: -1, parent: C }); }

  // =================== STAGE (x 320) ===================
  const S = group({ x: 320 }); H.stage = S;
  tbox(30, 0.1, 30, toon('#4a2a30'), { y: -0.05, parent: S });
  tbox(12, 1.0, 6, M.stage, { y: 0.5, z: -3, parent: S, tm: 1.4 });
  tbox(14, 9, 0.4, M.curtain, { y: 4.5, z: -6, parent: S, tm: 3 });
  for (const sx of [-6.4, 6.4]) tbox(1.6, 9, 0.6, M.curtain, { x: sx, y: 4.5, z: -5.2, parent: S, tm: 3 });
  tbox(14, 1.2, 0.6, toon('#c9a040'), { y: 8.6, z: -5.6, parent: S });
  const pod = group({ x: 2.2, y: 1, z: -2.2, parent: S }); tbox(0.8, 1.15, 0.6, M.wood, { y: 0.58, parent: pod }); tbox(0.9, 0.08, 0.7, M.wood, { y: 1.18, rx: -0.2, parent: pod });
  plane(2.2, 1.0, unlit('#ffffff', P.label('NOBEL PRIZE', { w: 1024, h: 420, bg: '#1e2a52', fg: '#f2c440', border: '#f2c440', font: 'bold 140px Georgia, serif' })), { y: 6.9, z: -5.75, parent: S });
  return H;
};
