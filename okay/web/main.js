import { THREE, scene, camera, renderer, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard, ss, win, lerp } from './engine.js';
import { build } from './world.js';
import { SHOTS, shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';
import { drawDish } from './cast.js';

const H = build();
const glowLight = new THREE.PointLight('#bff5c8', 0, 2.5, 1.5); glowLight.position.set(0.35, 1.25, -1.9); scene.add(glowLight);
let lastDishKey = null;

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  // camera
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  // light
  let L = S.light, L2 = null, t = 0;
  if (S.id === 'holiday') { L2 = 'night'; t = w.lightBlend * 0.85; }
  if (S.id === 'shelf') { L2 = 'night'; t = w.flicker * 0.75; }
  applyLight(L, S.at, L2, t, S.span);
  // world state
  H.tower.rotation.z = THREE.MathUtils.degToRad(w.towerTilt);
  H.topple.rotation.z = -w.topple; H.topple.position.x = 1.3 + 0.05 * w.topple;
  H.door.rotation.y = 1.35 * w.door;
  H.calendar.material.map = H.calTex[w.year];
  H.dust.material.opacity = 0.6 * w.dust;
  H.shelfBottle.children.forEach((m) => { m.userData.base ??= m.material.color.clone(); m.material.color.copy(m.userData.base).multiplyScalar(1 - 0.4 * w.dust); });
  if (w.dish) { const k = JSON.stringify(w.dish) + (Math.floor(f / 2)); if (k !== lastDishKey) { drawDish(H.dishCanvas.getContext('2d'), { ...w.dish, t: f / 30 }); H.dishTex.needsUpdate = true; lastDishKey = k; } }
  H.gLabel.visible = S.id === 'gerald';
  H.sign.visible = w.sign > 0.01; H.sign.scale.setScalar(Math.max(0.01, w.sign));
  H.dropper.position.y = w.dropper; H.drop.visible = w.drop != null; if (w.drop != null) H.drop.position.y = w.drop;
  H.bottles.forEach((b, i) => { const x = ((w.bottleT * 2.2 + i * 0.85) % 30) - 15; b.position.x = x; b.visible = S.id === 'factory'; });
  H.clouds.forEach((c, i) => { c.position.x = -100 + i * 35 + f * 0.02; });
  H.hero.visible = true;
  glowLight.intensity = S.id === 'final' ? 1.5 * w.heroGlow : 0;
  // look
  const d = S.dof(f), Lk = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = Lk.flash; look.fade = f > TOTAL - 4 ? 0 : 0;
  // cards
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
