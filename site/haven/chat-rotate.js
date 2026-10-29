// Chat section phone: travels down the page to the paragraph while it turns from the Figma frame 1 tilt
// to face the reader, then holds beside it. Rules: .claude/motion-rules.md. Every frame is a pure function of scroll position.
//
// Frame 1 (Figma 4262:4971) and frame 2 (4268:8819) are the two ends. The tilt is the Mokker camera
// recovered from the frame 1 render (fov 45.2, phone 459 mm away, 30 degrees off face on). The phone is
// the 3D model fitted to Mokker for the isometric showcase, so both ends match the Mokker images.
import * as THREE from "../vendor/three/three.module.min.js";
import { RoundedBoxGeometry } from "../vendor/three/RoundedBoxGeometry.js";
import { clamp, lerp, range, cubicBezier } from "../lib/motion.js";

// Measured from Figma, block coordinates in 1440 frame px (block top = the pill row).
const F1 = { x: 981.51, y: 415.22, ppm: 4.1969 };   // phone centre and px per mm, frame 1
const F2 = { x: 891.67, ppm: 4.0812 };               // frame 2 (its y follows the paragraph)
const PARA_Y = 839;                                  // paragraph top in frame 1
const PARA_TO_PHONE_END = 13.34;                     // frame 2: phone centre sits this far below the paragraph top
// Phone rotation at frame 1, in three.js camera axes (from the recovered Mokker pose).
const R1 = [[0.87704, -0.3656, -0.31166], [-0.25304, 0.1999, -0.94658], [0.40837, 0.90905, 0.08281]];
const DIST = 458.9;                                  // mm, camera to phone, as Mokker
const ease = cubicBezier(0.37, 0, 0.63, 1);          // gentle sine in out for scrubs
const HOLD = 1.0;                                    // screens of scroll the met pair stays put

const SH = 2.0, W = 77.6 - SH, L = 160.9 - SH, D = 8.25, RC = 13.5, B = 1.4, DD = 0.4;
const LOOK = { bc: 0x6a4fc0, br: 0.26, ei: 0.9, kv: 0.9, ks: 7, ko: 3.2, kf: 0.05, cc: 1.0, nw: 1, bz: 6.5, bb: 0x8a5cff, be: 1.6 };

const rrect = (w, h, r) => { const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s; };
const flat = (w, h, r) => { const g = new THREE.ShapeGeometry(rrect(w, h, r), 48), uv = g.attributes.uv, p = g.attributes.position;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + w / 2) / w, (p.getY(i) + h / 2) / h);
  g.rotateX(-Math.PI / 2); return g; };
const ring = (w, h, r, inset) => { const s = rrect(w, h, r); s.holes.push(rrect(w - 2 * inset, h - 2 * inset, r - inset));
  const g = new THREE.ShapeGeometry(s, 48); g.rotateX(-Math.PI / 2); return g; };

function studio(renderer) {
  // Same softbox room as the isometric match, turned so it sits where it did relative to that camera
  // (which looked down the (1,1,1) diagonal). The phone then picks up Mokker's glints and violet edges.
  const env = new THREE.Scene(); env.background = new THREE.Color(0x030206);
  const room = new THREE.Group(); env.add(room);
  const box = (w, h, col, k, pos) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(col).lerp(new THREE.Color(0xffffff), LOOK.nw).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); room.add(m); };
  box(260, 60, 0xffffff, LOOK.ko, [0, 260, -60]);
  box(40, 300, 0x7a4dff, 5.0, [-260, 80, 40]);
  box(40, 300, 0x9b6bff, 4.0, [260, 60, -40]);
  box(300, 30, 0x6a3dff, 3.0, [60, 20, 260]);
  box(200, 40, 0xffffff, 1.4, [-120, 140, 220]);
  box(420, 90, 0x8a4dff, LOOK.kv, [320, -140, -320]);
  box(420, 90, 0x8a4dff, LOOK.kv, [-320, -140, 320]);
  box(900, 900, 0x6b3cff, LOOK.kf, [0, -300, 0]);
  box(500, 26, 0xb27bff, LOOK.ks, [380, -60, -380]);
  box(500, 26, 0xb27bff, LOOK.ks, [-380, -60, 380]);
  const back = new THREE.Vector3(1, 1, 1).normalize(), right = new THREE.Vector3(1, 0, -1).normalize();
  const up = new THREE.Vector3().crossVectors(back, right).normalize();
  room.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, back).invert());
  room.updateMatrixWorld(true);
  return new THREE.PMREMGenerator(renderer).fromScene(env, 0.02, 0.1, 3000).texture;
}

function phoneModel(map) {
  const g = new THREE.Group();
  const band = new THREE.MeshPhysicalMaterial({ color: LOOK.bc, metalness: 1, roughness: LOOK.br, clearcoat: LOOK.cc, clearcoatRoughness: 0.06, envMapIntensity: LOOK.ei });
  const body = new THREE.ExtrudeGeometry(rrect(W - 2 * B, L - 2 * B, RC - B), { depth: D - 2 * B + DD, bevelEnabled: true, bevelThickness: B, bevelSize: B, bevelSegments: 10, curveSegments: 64 });
  body.translate(0, 0, B - DD); body.rotateX(-Math.PI / 2);
  g.add(new THREE.Mesh(body, band));
  const edge = new THREE.Mesh(ring(W - 0.9, L - 0.9, RC - 0.45, 0.55), new THREE.MeshPhysicalMaterial({ color: 0x55525e, metalness: 0.9, roughness: 0.25, envMapIntensity: 1.2 }));
  edge.position.y = D + 0.005; g.add(edge);
  const bezel = new THREE.Mesh(flat(W - 2, L - 2, RC - 1), new THREE.MeshPhysicalMaterial({ color: 0x020203, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 0.6 }));
  bezel.position.y = D + 0.01; g.add(bezel);
  const BZ = LOOK.bz - SH, SW = W - BZ, SL = L - BZ, screen = flat(SW, SL, RC - BZ * 0.55);
  const sc = new THREE.Mesh(screen, new THREE.MeshBasicMaterial({ map, toneMapped: false })); sc.position.y = D + 0.02; g.add(sc);
  const isl = new THREE.Mesh(flat(20.5, 6.0, 3.0), new THREE.MeshBasicMaterial({ color: 0x000000 })); isl.position.set(0, D + 0.03, -(SL / 2 - 6.0)); g.add(isl);
  const glass = new THREE.Mesh(screen, new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, transparent: true, opacity: 0.05, clearcoat: 1, envMapIntensity: 0.5 }));
  glass.position.y = D + 0.04; g.add(glass);
  const btn = new THREE.MeshPhysicalMaterial({ color: LOOK.bb, metalness: 0.6, roughness: 0.2, clearcoat: 1, envMapIntensity: LOOK.be, emissive: 0x2a1080, emissiveIntensity: 0.4 });
  for (const [side, from, len] of [[-1, 30, 7], [-1, 45, 12], [-1, 60, 12], [1, 50, 18]]) {
    const b = new THREE.Mesh(new RoundedBoxGeometry(1.2, 2.6, len, 3, 0.5), btn); b.position.set(side * (W / 2 + 0.25), D / 2, -L / 2 + from); g.add(b);
  }
  const ant = new THREE.MeshPhysicalMaterial({ color: 0x8a5cff, metalness: 0.3, roughness: 0.35, emissive: 0x3a18a0, emissiveIntensity: 0.5 });
  for (const [x, z] of [[-W / 2, -L / 2 + 18], [W / 2, -L / 2 + 18], [-W / 2, L / 2 - 18], [W / 2, L / 2 - 18]]) {
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.3, D - 2.2, 1.0), ant); a.position.set(x + Math.sign(x) * 0.02, D / 2, z); g.add(a);
  }
  g.position.y = -D / 2;                       // turn about the phone's centre
  const pivot = new THREE.Group(); pivot.add(g); return pivot;
}

export async function mountChatPhone(section) {
  const block = section.querySelector(".cr-block");
  const para = section.querySelector(".cr-para");
  const holder = section.querySelector(".cr-phone");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  holder.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.environment = studio(renderer);
  const map = await new THREE.TextureLoader().loadAsync(holder.dataset.screen);
  map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const phone = phoneModel(map); scene.add(phone);
  const camera = new THREE.PerspectiveCamera(20, 1, 10, 2000);
  phone.position.set(0, 0, -DIST);

  const q1 = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().set(
    R1[0][0], R1[0][1], R1[0][2], 0, R1[1][0], R1[1][1], R1[1][2], 0, R1[2][0], R1[2][1], R1[2][2], 0, 0, 0, 0, 1));
  const q2 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);   // face on

  let size = 0;
  // Where everything sits, in block px. Wide screens follow the Figma frames scaled by g. Narrow screens
  // have no Figma frame: the phone is centred and sized to the screen and the paragraph sits under it.
  const layout = () => {
    const w = section.clientWidth, vh = innerHeight, narrow = w < 768;
    let L1;
    if (!narrow) {
      const g = Math.min(w, 1920) / 1440;
      L1 = { g, x1: F1.x * g, x2: F2.x * g, y1: F1.y * g, ppm1: F1.ppm * g, ppm2: F2.ppm * g,
        px: 274 * g, py: PARA_Y * g, pw: Math.min(360, 360 * g), drop: (PARA_Y + PARA_TO_PHONE_END - F1.y) * g };
    } else {
      const bw = block.clientWidth, ppm2 = Math.min(0.6 * vh, 1.25 * bw) / L, ppm1 = ppm2 * F1.ppm / F2.ppm;
      const y1 = 64 + 352 / F1.ppm * ppm1;      // under the pill, room for the tilted phone
      L1 = { g: ppm2 / F2.ppm, x1: bw / 2, x2: bw / 2, y1, ppm1, ppm2,
        px: 0, py: y1 + L / 2 * ppm2 + 32, pw: bw, drop: 0 };
    }
    L1.hold = reduced ? 0 : HOLD * vh;
    L1.half = 352 * L1.ppm1 / F1.ppm;            // half the tilted phone's height on screen
    L1.box = Math.round(780 * L1.ppm1 / F1.ppm); // canvas fits the phone at any angle
    if (L1.box !== size) {
      size = L1.box;
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      renderer.setSize(L1.box, L1.box);
    }
    para.style.width = `${L1.pw}px`;
    const end = Math.max(L1.y1 + L1.drop + 324 * L1.ppm2 / F2.ppm, L1.py + para.offsetHeight);
    block.style.height = `${Math.ceil(end + 24 + L1.hold)}px`;
    return L1;
  };

  // The paragraph is part of the page and only scrolls. The phone travels down the page to it while it
  // turns, they meet in the frame 2 layout with the phone in the middle of the screen, hold there for
  // HOLD screens of scroll, then leave together. On screen the phone rises slower than the page, so the
  // paragraph scrolls up into it.
  //   sGo: the phone's centre reaches the bottom of the screen and it starts its own motion.
  //   sMeet: they meet in frame 2 and the hold starts.
  const draw = () => {
    const Lo = layout(), vh = innerHeight;
    const top = block.getBoundingClientRect().top + scrollY;
    // Wide: phone centre mid screen. Narrow: the phone and the paragraph under it centred as a pair.
    const mid = Lo.drop ? Lo.y1 + Lo.drop : (Lo.y1 - L / 2 * Lo.ppm2 + Lo.py + para.offsetHeight) / 2;
    const sMeet = top + mid - vh / 2;
    const sGo = top + Lo.y1 - vh;
    const u = reduced ? 1 : range(scrollY, sGo, sMeet);
    const k = ease(u);                                    // turn and slide: sine in out
    // Travel down the page: leaves at page speed and arrives at rest on screen exactly as the hold starts,
    // so the phone lands without overshooting. Cubic with slope 0 at the start and c at the end.
    const c = Lo.drop ? (sMeet - sGo) / Lo.drop : 1, fall = (3 - c) * u * u + (c - 2) * u * u * u;
    const hold = reduced ? 0 : clamp(scrollY - sMeet, 0, Lo.hold);   // pair stays put on screen
    const cx = lerp(Lo.x1, Lo.x2, k), cy = Lo.y1 + fall * Lo.drop + hold;
    const ppm = lerp(Lo.ppm1, Lo.ppm2, k), turn = k;
    holder.style.transform = `translate(${cx - Lo.box / 2}px, ${cy - Lo.box / 2}px)`;
    para.style.transform = `translate(${Lo.px}px, ${Lo.py + hold}px)`;
    // Focal length in CSS px puts the phone at Mokker's distance and Figma's scale.
    camera.fov = 2 * THREE.MathUtils.radToDeg(Math.atan(Lo.box / 2 / (ppm * DIST)));
    camera.updateProjectionMatrix();
    phone.quaternion.slerpQuaternions(q1, q2, turn);
    renderer.render(scene, camera);
    section.dataset.turn = turn.toFixed(4);
    Object.assign(section.dataset, { hold: hold.toFixed(1), go: sGo.toFixed(1), meet: sMeet.toFixed(1), holdLen: Lo.hold.toFixed(1) });
  };
  addEventListener("scroll", draw, { passive: true });
  // The Haven page's smooth scroll (same Lenis lerp as haven.js), so the study feels like the page.
  // Off for reduced motion, for the renderer and checks (webdriver) and with ?smooth=0.
  addEventListener("resize", draw);
  draw();
  return { draw, para };
}
