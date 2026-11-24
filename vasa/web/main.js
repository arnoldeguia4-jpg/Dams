import { THREE, camera, applyLight, look, renderAll, setCam, camFromKeys, kick, beginCards, endCards, putCard } from './engine.js';
import { build, tintShip } from './world.js';
import { shotAt, worldAt, actorsAt, lookAt, TOTAL } from './story.js';

const H = build();
tintShip(H.museumShip, 0.72, 0.25); tintShip(H.seaShip, 0.55, 0.6);

window.renderFrame = (f) => {
  const S = shotAt(f), w = worldAt(f), sh0 = w.ship;
  const st = camFromKeys(S.cam, f);
  let sh = [0, 0]; for (const [at, amp] of S.kicks || []) { const k = kick(f, at, amp); sh = [sh[0] + k * 0.6, sh[1] + k]; }
  setCam(st, sh);
  applyLight(S.light, S.at, null, 0, S.span);
  // harbour ship
  const ship = H.ship; ship.position.set(sh0.x, sh0.y, sh0.z); ship.userData.roll.rotation.x = -sh0.heel;
  ship.visible = !(S.id === 'seabed' || S.id === 'museum' || S.id === 'sank2');
  ship.userData.sails.forEach((s, i) => { s.scale.set(1, 1, 1 + 0.6 * sh0.bill); s.rotation.z = 0.25 * sh0.bill * Math.sin(f * 0.2 + i) * 0.3; s.children[0].position.x = -0.6 * sh0.bill; });
  ship.userData.lids.forEach((l) => { l.rotation.x = (l.position.z > 0 ? -1 : 1) * 1.25 * w.lids; });
  ship.userData.flag.rotation.y = 0.2 * Math.sin(f * 0.3);
  tintShip(ship, 1, S.id === 'salvage' ? 0.65 : 0);
  H.pontoons.visible = S.id === 'salvage'; H.pontoons.position.set(0, 0, -30);
  H.cables.forEach((c) => { const top = 0.6, bot = sh0.y + 3.4, len = Math.max(0.1, top - bot); c.scale.y = len; c.position.y = (top + bot) / 2; });
  H.museumShip.userData.roll.rotation.x = w.sinkTilt;
  H.water.material.map.offset.set(f * 0.0006, f * 0.0004);
  H.shafts.forEach((s, i) => { s.material.opacity = 0.1 + 0.05 * Math.sin(f * 0.05 + i); });
  const d = S.dof(f), L = lookAt(f);
  look.cInf = d.c; look.focus = d.pt ? camera.position.distanceTo(new THREE.Vector3(...d.pt)) : 10;
  look.flash = L.flash;
  beginCards(); for (const a of actorsAt(f)) putCard(a); endCards();
  renderAll();
  return true;
};
window.TOTAL = TOTAL;
window.ready = true;
