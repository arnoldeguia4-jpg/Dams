import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f);
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  // truck
  const T = w.truck, tr = H.truck; tr.visible = T.vis; tr.position.set(T.x, 0, T.z); tr.rotation.y = T.ry;
  tr.userData.body.position.y = T.bounce ? 0.04 * Math.abs(Math.sin(f * 0.9)) : 0; tr.userData.body.rotation.z = T.bounce ? 0.015 * Math.sin(f * 0.7) : 0;
  tr.userData.wheels.forEach((wh) => { wh.rotation.y = -f * 0.4 * (T.speed ? 1 : 0); });
  // army props
  H.guns.forEach((g, i) => { const s = w.guns[i]; g.visible = s > 0.01; g.scale.setScalar(Math.max(0.01, s)); });
  H.crates.forEach((c, i) => { const d = w.crates[i]; c.visible = d >= 0; c.position.y = Math.max(0, d) * 2.5 + Math.floor(i / 3) * 0.36; });
  H.ambushGun.userData.gun.rotation.z = -0.35 * w.jam;
  H.fan.rotation.z = w.fan;
  H.coins.forEach((c, i) => { c.visible = w.coins < 0.5 || i < 3; });
  H.clouds.forEach((c, i) => { c.position.x = -140 + i * 40 + f * 0.02; });
  const d = S.dof(f), L = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = L.flash;
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
