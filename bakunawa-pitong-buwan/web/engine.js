// Engine: toon materials, ink + DOF + grade post chain, painted primitives, canvas cards, light presets, motion helpers.
import * as THREE from './three.module.js';
export { THREE };

export const W = 1080, H = 1920, FPS = 30;
export const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(1); renderer.setSize(W, H, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(40, W / H, 0.02, 2500);

// ---------------- motion helpers ----------------
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ss = (t) => { t = clamp(t); return t * t * t * (t * (t * 6 - 15) + 10); }; // smootherstep
export const easeOut = (t) => 1 - (1 - clamp(t)) ** 3;
export const easeIn = (t) => clamp(t) ** 3;
export const back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
export const spring = (t, k = 7, d = 5) => { t = Math.max(0, t); return 1 - Math.exp(-d * t) * Math.cos(k * t); };
export const win = (f, a, b) => clamp((f - a) / (b - a));
export const V = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const cr = (p0, p1, p2, p3, t) => { const t2 = t * t, t3 = t2 * t; return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3); };
const crV = (pts, t) => { // Catmull-Rom through pts
  const n = pts.length - 1, s = clamp(t) * n, i = Math.min(n - 1, Math.floor(s)), u = s - i;
  const P = (k) => pts[clamp(k, 0, n)];
  return [0, 1, 2].map((c) => cr(P(i - 1)[c], P(i)[c], P(i + 1)[c], P(i + 2)[c], u));
};
/** keys: [{f, pos, look, fov, roll, ease?, path?}] -> camera state at frame f (each key glides from the previous one) */
export const camFromKeys = (keys, f) => {
  let k = 0; while (k + 1 < keys.length && keys[k + 1].f <= f) k++;
  const A = keys[k], B = keys[k + 1];
  if (!B) return { pos: A.pos, look: A.look, fov: A.fov ?? 40, roll: A.roll ?? 0 };
  const e = (B.ease || ss)((f - A.f) / (B.f - A.f));
  const pos = B.path ? crV([A.pos, ...B.path, B.pos], e) : lerpV(A.pos, B.pos, e);
  return { pos, look: lerpV(A.look, B.look, e), fov: lerp(A.fov ?? 40, B.fov ?? 40, e), roll: lerp(A.roll ?? 0, B.roll ?? 0, e) };
};
/** flip-shake: sign alternates every frame, decays over n frames */
export const kick = (f, at, amp = 0.05, n = 7) => (f >= at && f < at + n ? amp * (1 - (f - at) / n) * ((f - at) % 2 ? -1 : 1) : 0);
export const idle = (f, seed) => ({ dx: 0.012 * Math.sin(f * 0.07 + seed), bob: 0.006 * Math.sin(f * 0.11 + seed * 2), tilt: 1.2 * Math.sin(f * 0.05 + seed * 3) });
export const blinkAt = (f, seed) => { const per = 42 + Math.floor(25 * ((Math.sin(seed * 91.7) + 1) / 2)), ph = (f + seed * 13) % per; return ph < 2 ? 1 : ph < 4 ? 0.5 : 0; };
export const q = (x, s = 0.02) => Math.round(x / s) * s;

// ---------------- materials ----------------
const gradTex = (() => { const d = new Uint8Array([105, 255]); const t = new THREE.DataTexture(d, 2, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
export const toon = (c, map = null, extra = {}) => new THREE.MeshToonMaterial({ color: new THREE.Color(c), map, gradientMap: gradTex, ...extra });
export const unlit = (c, map = null, extra = {}) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c), map, ...extra });

const ndWorld = new THREE.ShaderMaterial({
  vertexShader: `varying vec3 vN; varying float vD;
    void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.); vD = -mv.z; gl_Position = projectionMatrix*mv; }`,
  fragmentShader: `varying vec3 vN; varying float vD;
    void main(){ vec3 n = normalize(vN); if(!gl_FrontFacing) n = -n; gl_FragColor = vec4(n*.5+.5, vD); }`,
  side: THREE.DoubleSide,
});
const ndCardMat = (map) => new THREE.ShaderMaterial({
  uniforms: { map: { value: map } },
  vertexShader: `varying vec2 vUv; varying float vD;
    void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.); vD = -mv.z; gl_Position = projectionMatrix*mv; }`,
  fragmentShader: `uniform sampler2D map; varying vec2 vUv; varying float vD;
    void main(){ if(texture2D(map, vUv).a < .5) discard; gl_FragColor = vec4(0.,0.,0., -vD); }`,
  side: THREE.DoubleSide,
});

// ---------------- primitives ----------------
/** box with UVs scaled to metres (texture repeats every `tm` m) */
export const tbox = (w, h, d, mat, o = {}) => {
  const g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv, tm = o.tm ?? 1;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) { const i = f * 4 + k; uv.setXY(i, uv.getX(i) * dims[f][0] / tm, uv.getY(i) * dims[f][1] / tm); }
  return place(new THREE.Mesh(g, mat), o);
};
export const place = (m, o = {}) => {
  m.position.set(o.x ?? 0, o.y ?? 0, o.z ?? 0);
  if (o.ry) m.rotation.y = o.ry; if (o.rx) m.rotation.x = o.rx; if (o.rz) m.rotation.z = o.rz;
  if (o.s) m.scale.setScalar(o.s);
  m.castShadow = o.cast ?? true; m.receiveShadow = true;
  (o.parent || scene).add(m); return m;
};
export const cyl = (rt, rb, h, mat, o = {}) => place(new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg ?? 24, 1, !!o.open), mat), o);
export const sph = (r, mat, o = {}) => place(new THREE.Mesh(new THREE.SphereGeometry(r, o.seg ?? 24, 16), mat), o);
export const cone = (r, h, mat, o = {}) => place(new THREE.Mesh(new THREE.ConeGeometry(r, h, o.seg ?? 20), mat), o);
export const plane = (w, h, mat, o = {}) => place(new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat), { cast: false, ...o });
export const group = (o = {}) => place(new THREE.Group(), o);

// ---------------- sky ----------------
const skyMat = new THREE.ShaderMaterial({
  uniforms: { top: { value: new THREE.Color() }, hor: { value: new THREE.Color() } },
  vertexShader: `varying vec3 vW; void main(){ vW = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
  fragmentShader: `uniform vec3 top; uniform vec3 hor; varying vec3 vW; void main(){ float t = clamp(vW.y*1.6+.05,0.,1.); gl_FragColor = vec4(mix(hor, top, pow(t,.7)),1.); }`,
  side: THREE.BackSide, depthWrite: false, fog: false,
});
export const sky = new THREE.Mesh(new THREE.SphereGeometry(1500, 32, 16), skyMat);
sky.userData.noND = true; sky.renderOrder = -10; scene.add(sky);

// ---------------- lights ----------------
export const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.02;
scene.add(sun, sun.target);
export const hemi = new THREE.HemisphereLight(0xbfd8ff, 0x8a7a66, 1.0); scene.add(hemi);
scene.fog = new THREE.Fog(0xb8d0ec, 30, 400);
export const LIGHTS = {
  day: { az: 25, el: 50, sun: '#fff3df', si: 2.6, sky: '#cfe3ff', gnd: '#8a7a66', hi: 1.15, top: '#3e7fd2', hor: '#b8d0ec', fog: [40, 420], card: [1, 1, 1], sat: 1.08, gain: 1.0 },
  lab: { az: 4, el: 50, sun: '#fff1d8', si: 2.4, sky: '#e6eeff', gnd: '#a08c70', hi: 1.3, top: '#5d93d9', hor: '#cfe0f2', fog: [60, 500], card: [1, 1, 1], sat: 1.06, gain: 1.0 },
  golden: { az: 20, el: 18, sun: '#ffcf96', si: 2.3, sky: '#c9a4c8', gnd: '#5a4a6a', hi: 0.95, top: '#ffc47c', hor: '#f3b2a0', fog: [40, 360], card: [1.06, 0.93, 0.8], sat: 1.1, gain: 1.0 },
  lowday: { az: 25, el: 50, sun: '#fff3df', si: 2.6, sky: '#cfe3ff', gnd: '#8a7a66', hi: 1.15, top: '#e9e2d2', hor: '#e4dccb', fog: [14, 95], card: [1, 1, 1], sat: 1.08, gain: 1.0 },
  night: { az: -30, el: 40, sun: '#a9c0ff', si: 1.6, sky: '#8a9ed8', gnd: '#3a3c5c', hi: 1.35, top: '#141c3c', hor: '#33427a', fog: [30, 300], card: [0.62, 0.68, 0.95], sat: 0.95, gain: 1.0 },
  seaNight: { az: -40, el: 35, sun: '#b8ccff', si: 1.9, sky: '#7a90c8', gnd: '#24304a', hi: 1.3, top: '#0b1030', hor: '#2a3a72', fog: [60, 420], card: [0.75, 0.8, 1.0], sat: 1.0, gain: 1.05 },
  heaven: { az: 10, el: 55, sun: '#fff2d0', si: 2.2, sky: '#c8c4f0', gnd: '#6a6a9a', hi: 1.3, top: '#1c1a4a', hor: '#6a5a9a', fog: [80, 500], card: [1, 0.97, 0.95], sat: 1.08, gain: 1.05 },
  stage: { az: 10, el: 40, sun: '#ffd9a0', si: 3.0, sky: '#8a6a7a', gnd: '#3a2430', hi: 0.7, top: '#2a1622', hor: '#5a2a38', fog: [40, 300], card: [1.08, 0.97, 0.86], sat: 1.12, gain: 1.0 },
};
export const look = { inkFar: 520, sat: 1.08, gain: 1, card: [1, 1, 1], flash: 0, cInf: 0, focus: 5, vig: 0.28, fade: 0, inkR: 2.4 };
const cTmp = new THREE.Color(), cTmp2 = new THREE.Color();
const mixHex = (a, b, t) => '#' + cTmp.set(a).lerp(cTmp2.set(b), t).getHexString();
/** apply a preset (or a blend of two presets with t) around an action point `at` */
export const applyLight = (name, at = [0, 0, 0], name2 = null, t = 0, span = 14) => {
  const A = LIGHTS[name], B = name2 ? LIGHTS[name2] : A;
  const m = (k) => lerp(A[k], B[k], t), mh = (k) => mixHex(A[k], B[k], t);
  const az = THREE.MathUtils.degToRad(m('az')), el = THREE.MathUtils.degToRad(m('el'));
  sun.position.set(at[0] + 40 * Math.cos(el) * Math.sin(az), at[1] + 40 * Math.sin(el), at[2] + 40 * Math.cos(el) * Math.cos(az));
  sun.target.position.set(...at); sun.color.set(mh('sun')); sun.intensity = m('si');
  const sc = sun.shadow.camera; sc.left = sc.bottom = -span; sc.right = sc.top = span; sc.near = 1; sc.far = 120; sc.updateProjectionMatrix();
  hemi.color.set(mh('sky')); hemi.groundColor.set(mh('gnd')); hemi.intensity = m('hi');
  skyMat.uniforms.top.value.set(mh('top')); skyMat.uniforms.hor.value.set(mh('hor'));
  scene.fog.color.set(mh('hor')); scene.fog.near = lerp(A.fog[0], B.fog[0], t); scene.fog.far = lerp(A.fog[1], B.fog[1], t);
  look.inkFar = Math.min(520, scene.fog.far * 0.9); look.card = [0, 1, 2].map((i) => lerp(A.card[i], B.card[i], t)); look.sat = m('sat'); look.gain = m('gain');
};

// ---------------- cards ----------------
const blobTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(30,20,40,0.55)'); gr.addColorStop(0.5, 'rgba(30,20,40,0.35)'); gr.addColorStop(1, 'rgba(30,20,40,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); const t = new THREE.CanvasTexture(c); return t; })();
const cards = new Map();
const mkCard = (id, cw, ch, opts) => {
  const c = document.createElement('canvas'); c.width = cw; c.height = ch;
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const mat = new THREE.MeshBasicMaterial({ map: tex, alphaTest: opts.soft ? 0.02 : 0.5, transparent: !!opts.soft, depthWrite: !opts.soft, side: THREE.DoubleSide, fog: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
  mesh.userData.nd = opts.soft ? null : ndCardMat(tex); if (opts.soft) mesh.userData.noND = true;
  mesh.castShadow = !opts.soft && !opts.noShadow;
  mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: tex, alphaTest: 0.5 });
  scene.add(mesh);
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, fog: false }));
  blob.rotation.x = -Math.PI / 2; blob.userData.noND = true; blob.renderOrder = 1; scene.add(blob);
  const card = { id, c, g: c.getContext('2d'), tex, mesh, blob, key: null, used: false, opts };
  cards.set(id, card); return card;
};
export const beginCards = () => { for (const c of cards.values()) c.used = false; };
export const endCards = () => { for (const c of cards.values()) if (!c.used) { c.mesh.visible = false; c.blob.visible = false; } };
/** a card: { id, kind:'char'|'fx', pos:[x,y,z], h (m), draw(g), key, yaw:'cam'|'full'|number, blob, soft, res:[w,h] } */
export const putCard = (a) => {
  const res = a.res || (a.kind === 'char' ? [1200, 2000] : [512, 512]);
  const card = cards.get(a.id) || mkCard(a.id, res[0], res[1], a);
  card.used = true;
  if (card.key !== a.key) { card.g.clearRect(0, 0, card.c.width, card.c.height); a.draw(card.g); card.tex.needsUpdate = true; card.key = a.key; }
  const m = card.mesh; m.visible = true;
  const h = a.h ?? 2.25, w = h * res[0] / res[1];
  m.scale.set(w, h, 1);
  let [x, y, z] = a.pos;
  if (a.kind === 'char') y += (975 - 500) / 1000 * h * -1 + h / 2 + (1000 - 975) / 1000 * h * 0; // soles at pos.y
  if (a.kind === 'char') y = a.pos[1] + h / 2 - (1000 - 975) / 1000 * h;
  m.position.set(x, y, z);
  if (a.yaw === 'full') m.quaternion.copy(camera.quaternion);
  else if (typeof a.yaw === 'number') m.rotation.set(a.tiltX || 0, a.yaw, 0);
  else { m.rotation.set(0, Math.atan2(camera.position.x - x, camera.position.z - z), 0); }
  if (a.roll) m.rotateZ(a.roll);
  m.material.color.setRGB(...(a.unlit ? [1, 1, 1] : look.card));
  m.material.opacity = a.opacity ?? 1;
  m.renderOrder = a.order ?? 0;
  const b = card.blob; b.visible = a.kind === 'char' && a.blob !== false;
  if (b.visible) { const bw = (a.blobW ?? 0.8) * h / 2.25; b.scale.set(bw, bw * 0.55, 1); b.position.set(x, a.pos[1] + 0.006, z); }
  return card;
};

// ---------------- post ----------------
const rtOpts = { type: THREE.HalfFloatType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter };
const rtColor = new THREE.WebGLRenderTarget(W, H, { ...rtOpts, samples: 4 });
const rtND = new THREE.WebGLRenderTarget(W, H, { type: THREE.FloatType, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
const rtInk = new THREE.WebGLRenderTarget(W, H, rtOpts);
const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), quadScene = new THREE.Scene();
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2)); quadScene.add(quad);
const QV = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy,0.,1.); }`;
const inkMat = new THREE.ShaderMaterial({
  uniforms: { tC: { value: rtColor.texture }, tN: { value: rtND.texture }, res: { value: new THREE.Vector2(W, H) }, r: { value: 2.4 }, inkFar: { value: 520 }, inkCol: { value: new THREE.Color('#0b0a0c') } },
  vertexShader: QV,
  fragmentShader: `uniform sampler2D tC; uniform sampler2D tN; uniform vec2 res; uniform float r; uniform float inkFar; uniform vec3 inkCol; varying vec2 vUv;
    void main(){
      vec3 col = texture2D(tC, vUv).rgb; vec4 C = texture2D(tN, vUv);
      if (C.a <= 0.) { gl_FragColor = vec4(col,1.); return; }
      float dC = C.a; vec3 nC = C.rgb*2.-1.; float ink = 0.;
      for (int i=0;i<8;i++){
        float a = float(i)*0.785398; vec2 o = vec2(cos(a), sin(a))*r/res;
        vec4 N = texture2D(tN, vUv+o);
        if (N.a < 0.) continue;
        float dN = N.a == 0. ? 1e4 : N.a;
        bool flatS = N.a > 0. && dot(nC, N.rgb*2.-1.) > 0.985; // same flat surface seen at a grazing angle: not an edge
        if (dN - dC > max(0.03, (flatS ? 0.3 : 0.03)*dC)) ink = 1.;
        else if (N.a > 0. && abs(dN-dC) < 0.08*dC) { vec3 nN = N.rgb*2.-1.; if (dot(nC,nN) < 0.8) ink = max(ink, 0.85); }
      }
      ink *= 1. - smoothstep(min(140., inkFar*0.45), inkFar, dC);
      gl_FragColor = vec4(mix(col, inkCol, ink), 1.);
    }`,
});
const N_TAPS = 48;
const finalMat = new THREE.ShaderMaterial({
  uniforms: { tC: { value: rtInk.texture }, tN: { value: rtND.texture }, res: { value: new THREE.Vector2(W, H) }, cInf: { value: 0 }, focus: { value: 5 }, maxC: { value: 26 },
    sat: { value: 1.08 }, gain: { value: 1 }, vig: { value: 0.28 }, flash: { value: 0 }, fade: { value: 0 } },
  vertexShader: QV,
  fragmentShader: `uniform sampler2D tC; uniform sampler2D tN; uniform vec2 res; uniform float cInf, focus, maxC, sat, gain, vig, flash, fade; varying vec2 vUv;
    float depthAt(vec2 uv){ float a = texture2D(tN, uv).a; return a == 0. ? 1e4 : abs(a); }
    float coc(float d){ return clamp(cInf*abs(1.-focus/d), 0., maxC); }
    void main(){
      vec3 col = texture2D(tC, vUv).rgb;
      if (cInf > 0.3) {
        float d0 = depthAt(vUv), c0 = coc(d0);
        vec3 acc = col; float wsum = 1.;
        float R = max(c0, 0.0);
        if (R > 0.5) {
          for (int i=1;i<${N_TAPS};i++){
            float fi = float(i), rr = sqrt(fi/${N_TAPS}.)*R, a = fi*2.39996;
            vec2 o = vec2(cos(a), sin(a))*rr/res;
            float ds = depthAt(vUv+o), cs = coc(ds);
            float w = (ds >= d0 - 0.05*d0) ? 1. : smoothstep(rr-1., rr+1., cs);
            acc += texture2D(tC, vUv+o).rgb*w; wsum += w;
          }
          col = acc/wsum;
        }
      }
      col *= gain;
      float l = dot(col, vec3(.2126,.7152,.0722)); col = mix(vec3(l), col, sat);
      col = col/(1.+max(col-0.85,0.)*0.6);
      vec2 p = vUv-.5; col *= 1. - vig*smoothstep(.25,.85,length(p*vec2(1.,.75))*1.4);
      col = mix(col, vec3(1.), flash); col = mix(col, vec3(0.), fade);
      gl_FragColor = linearToOutputTexel(vec4(clamp(col,0.,1.),1.));
    }`,
});

const swapped = [];
const ndPass = () => {
  scene.fog && (scene.userData.fog = scene.fog); const fog = scene.fog; scene.fog = null;
  const bg = scene.background; scene.background = null;
  scene.traverse((o) => {
    if (!o.isMesh || !o.visible) return;
    if (o.userData.noND) { o.visible = false; swapped.push([o, null]); return; }
    swapped.push([o, o.material]); o.material = o.userData.nd || ndWorld;
  });
  renderer.shadowMap.enabled = false;
  renderer.setRenderTarget(rtND); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(scene, camera);
  renderer.shadowMap.enabled = true;
  for (const [o, m] of swapped) { if (m) o.material = m; else o.visible = true; }
  swapped.length = 0; scene.fog = fog; scene.background = bg;
};

export const renderAll = () => {
  sky.position.copy(camera.position);
  camera.updateMatrixWorld();
  renderer.setRenderTarget(rtColor); renderer.setClearColor(0x000000, 1); renderer.clear(); renderer.render(scene, camera);
  ndPass();
  inkMat.uniforms.r.value = look.inkR; inkMat.uniforms.inkFar.value = look.inkFar;
  quad.material = inkMat; renderer.setRenderTarget(rtInk); renderer.render(quadScene, quadCam);
  const u = finalMat.uniforms;
  u.cInf.value = look.cInf; u.focus.value = look.focus; u.sat.value = look.sat; u.gain.value = look.gain; u.vig.value = look.vig; u.flash.value = look.flash; u.fade.value = look.fade;
  quad.material = finalMat; renderer.setRenderTarget(null); renderer.render(quadScene, quadCam);
};

export const setCam = (st, shake = [0, 0]) => {
  camera.position.set(...st.pos);
  camera.fov = st.fov; camera.updateProjectionMatrix();
  camera.up.set(0, 1, 0); camera.lookAt(...st.look);
  camera.rotateZ(THREE.MathUtils.degToRad(st.roll || 0));
  if (shake[0] || shake[1]) { camera.translateX(shake[0]); camera.translateY(shake[1]); }
};
