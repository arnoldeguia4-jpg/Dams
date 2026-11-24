import { THREE, scene, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build, SKY0, MORTAR } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';
import { HANDS } from './cast.js';

const H = build();
const PL = 1.4, GRIP = 0.55; // pestle length, grip distance from the bottom

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light === 'day' && w.skyY < 3 ? 'lowday' : S.light, S.at, null, 0, S.span);
  // sky slab
  H.sky.visible = w.skyVis; H.sky.position.y = w.skyY;
  H.skySlab.material.opacity = w.skyOp; H.skySlab.userData.noND = w.skyOp < 0.98;
  H.mtns.forEach((m) => { m.visible = w.mtns; });
  // cards first (records hand positions), then the pestle from Tuglibon's hands
  const actors = actorsAt(f);
  beginCards(); const placed = {}; for (const a of actors) { putCard(a); placed[a.id] = a; } endCards();
  const tug = placed.tug, hd = HANDS.tug;
  H.pestle.visible = !!tug && (S.id !== 'final');
  H.pestle.rotation.set(0, 0, 0);
  if (tug && w.grip != null && hd && hd.L && hd.R) {
    const gy = tug.pos[1] + tug.h * (0.975 - (hd.L[1] + hd.R[1]) / 2 / 1000);
    let bottom = gy - GRIP; bottom = Math.min(bottom, w.skyY - PL - 0.005);
    H.pestle.position.set(MORTAR[0], Math.max(0.42, bottom), MORTAR[2]);
    const yaw = Math.atan2(camera.position.x - tug.pos[0], camera.position.z - tug.pos[2]), hx = tug.pos[0] + Math.cos(yaw) * ((hd.L[0] + hd.R[0]) / 2 - 300) * 0.00225;
    H.pestle.position.x = hx + 0.06;
  } else { // resting in the mortar, leaning
    H.pestle.position.set(MORTAR[0] + 0.05, 0.45, MORTAR[2]); H.pestle.rotation.z = -0.18;
  }
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = 0; if (window.NOINK) look.inkR = 0;
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
