import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const host = document.getElementById('robot-stage');
if (host) {
  try {
    startRobot(host);
  } catch (error) {
    console.warn('3D scene unavailable; using static fallback.', error);
  }
}
function startRobot(host) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.append(renderer.domElement);
  host.classList.add('robot-loaded');
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.1, 100);
  const pmrem = new THREE.PMREMGenerator(renderer),
    room = new RoomEnvironment(),
    environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.add(new THREE.HemisphereLight(0xfff6ee, 0xd9d2c8, 0.7));
  const key = new THREE.DirectionalLight(0xfff3e6, 1.7);
  key.position.set(-3, 5, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 6;
  key.shadow.bias = -0.0005;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xfff0e6, 1.2);
  rim.position.set(4, 2, -4);
  scene.add(rim);
  const fill = new THREE.PointLight(0xff9a6a, 2.2, 6);
  fill.position.set(-3.2, 1.2, 0.6);
  scene.add(fill);
  const shell = new THREE.MeshPhysicalMaterial({
    color: 0xeeebe6,
    roughness: 0.38,
    clearcoat: 0.45,
    clearcoatRoughness: 0.3,
  });
  const light = shell.clone();
  light.color.set(0xf8f6f2);
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b1b1f, roughness: 0.55, metalness: 0.3 });
  const robot = new THREE.Group();
  scene.add(robot);
  robot.position.x = 0.75;
  function box(parent, w, h, d, r, material, x = 0, y = 0, z = 0) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function ball(parent, radius, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 16), dark);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  function cylinder(parent, radius, height, x, y, z, material = dark) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  const head = new THREE.Group();
  head.position.y = 0.78;
  robot.add(head);
  box(head, 1.5, 1.42, 1.3, 0.2, shell, 0, 0.78, 0);
  box(head, 1.28, 1.14, 0.9, 0.12, dark, 0, 0.78, -0.29);
  for (let i = 0; i < 26; i++)
    box(
      head,
      0.04,
      0.12 + (i % 4) * 0.03,
      0.04,
      0.01,
      dark,
      -0.54 + (i % 9) * 0.13,
      1.4 + Math.floor(i / 9) * 0.045,
      -0.35,
    );
  const gradientCanvas = document.createElement('canvas');
  gradientCanvas.width = gradientCanvas.height = 512;
  const gc = gradientCanvas.getContext('2d'),
    gradient = gc.createConicGradient(0, 256, 256);
  ['#ff3d8b', '#ff5a5f', '#ff8a3d', '#ffb347', '#ff8a3d', '#ff5a5f', '#ff3d8b'].forEach((c, i) =>
    gradient.addColorStop(i / 6, c),
  );
  gc.fillStyle = gradient;
  gc.fillRect(0, 0, 512, 512);
  const gradientTexture = new THREE.CanvasTexture(gradientCanvas);
  gradientTexture.colorSpace = THREE.SRGBColorSpace;
  const ring = new THREE.MeshPhysicalMaterial({
    map: gradientTexture,
    emissiveMap: gradientTexture,
    emissive: 0xffffff,
    emissiveIntensity: 0.22,
    roughness: 0.5,
    clearcoat: 0.35,
  });
  box(head, 1.5, 1.44, 0.15, 0.28, ring, 0, 0.78, 0.63);
  box(head, 1.12, 1.07, 0.09, 0.21, light, 0, 0.78, 0.73);
  const face = document.createElement('canvas');
  face.width = face.height = 512;
  const ctx = face.getContext('2d');
  const faceTexture = new THREE.CanvasTexture(face);
  faceTexture.colorSpace = THREE.SRGBColorSpace;
  box(
    head,
    0.94,
    0.88,
    0.06,
    0.17,
    new THREE.MeshPhysicalMaterial({
      color: 0x09090c,
      roughness: 0.15,
      clearcoat: 1,
      emissive: 0xffffff,
      emissiveMap: faceTexture,
      emissiveIntensity: 1.6,
    }),
    0,
    0.78,
    0.79,
  );
  for (const side of [-1, 1]) {
    const ear = cylinder(head, 0.22, 0.22, side * 0.83, 0.78, 0, light);
    ear.rotation.z = Math.PI / 2;
    const cap = cylinder(head, 0.13, 0.235, side * 0.84, 0.78, 0);
    cap.rotation.z = Math.PI / 2;
  }
  const cable = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 12, 32, Math.PI), dark);
  cable.position.set(0.88, 0.46, -0.1);
  cable.rotation.z = Math.PI;
  head.add(cable);
  cylinder(robot, 0.23, 0.3, 0, 0.7, 0);
  box(robot, 1.22, 1.12, 0.92, 0.24, shell, 0, 0, 0);
  box(robot, 0.98, 0.18, 0.86, 0.07, light, 0, 0.43, 0.06);
  ['#ff8a3d', '#ff5a5f', '#ff3d8b'].forEach((color, i) =>
    box(
      robot,
      0.09,
      0.035,
      0.03,
      0.01,
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1 }),
      -0.15 + i * 0.15,
      0.25,
      0.47,
    ),
  );
  for (const side of [-1, 1]) {
    box(robot, 0.1, 0.25, 0.04, 0.035, dark, side * 0.24, -0.12, 0.47);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.025, 8, 20, Math.PI), dark);
    lip.position.set(side * 0.24, 0.04, 0.48);
    robot.add(lip);
  }
  box(robot, 0.8, 0.25, 0.66, 0.08, dark, 0, -0.64, 0);
  const arms = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(side * 0.76, 0.3, 0);
    robot.add(arm);
    arms.push(arm);
    ball(arm, 0.21, 0, 0, 0);
    box(arm, 0.32, 0.57, 0.36, 0.13, shell, 0, -0.3, 0);
    ball(arm, 0.16, 0, -0.62, 0);
    const forearm = new THREE.Group();
    forearm.position.y = -0.65;
    forearm.rotation.x = -0.35;
    arm.add(forearm);
    box(forearm, 0.35, 0.43, 0.4, 0.12, light, 0, -0.23, 0.03);
    box(forearm, 0.12, 0.23, 0.2, 0.05, light, -side * 0.2, -0.22, 0.13);
    ball(robot, 0.2, side * 0.33, -0.86, 0);
    box(robot, 0.4, 0.51, 0.49, 0.12, shell, side * 0.33, -1.07, 0);
    cylinder(robot, 0.14, 0.16, side * 0.33, -1.39, 0);
    box(robot, 0.49, 0.23, 0.72, 0.1, light, side * 0.33, -1.52, 0.13);
  }
  const pedestal = box(
    scene,
    1.7,
    1.6,
    1.7,
    0.025,
    new THREE.MeshStandardMaterial({ color: 0x2a2928, roughness: 0.9 }),
    0.75,
    -2.43,
    0,
  );
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let pointerX = 0,
    pointerY = 0,
    mx = 0,
    my = 0,
    p = 0,
    frame = 0,
    disposed = false,
    nextBlink = 3,
    blinkStart = -10,
    quote = false,
    alpha = 1;
  const move = (e) => {
    pointerX = (e.clientX / innerWidth) * 2 - 1;
    pointerY = (e.clientY / innerHeight) * 2 - 1;
  };
  const resize = () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('resize', resize);
  const intro = document.getElementById('intro');
  const product = document.getElementById('selected-work');
  const reviews = document.getElementById('reviews');
  function render(ms = 0) {
    if (disposed) return;
    const t = ms / 1000;
    const introHeight = intro?.offsetHeight || innerHeight;
    const productHeight = product?.offsetHeight || innerHeight;
    const target =
      scrollY < introHeight
        ? Math.max(0, scrollY / introHeight)
        : Math.min(2, 1 + (scrollY - introHeight) / productHeight);
    p += (target - p) * (reduced.matches ? 1 : 0.08);
    mx += (pointerX - mx) * 0.06;
    my += (pointerY - my) * 0.06;
    const s = Math.min(1, p),
      ease = s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2;
    camera.position.set(
      reduced.matches ? 0 : mx * 0.25,
      1.1 + 0.85 * ease - (reduced.matches ? 0 : my * 0.1),
      (11.6 - 4.7 * ease) * (innerWidth < 900 ? 1.25 : 1),
    );
    camera.lookAt(0, 0.55 + 1.17 * ease, 0);
    robot.rotation.y = -0.42 + 0.22 * ease + (reduced.matches ? 0 : mx * 0.12);
    robot.position.y = reduced.matches ? 0 : Math.sin(t * 1.4) * 0.02;
    head.rotation.set(
      0.16 - 0.12 * ease + (reduced.matches ? 0 : my * 0.18 + Math.sin(t * 0.9) * 0.02),
      -0.6 + 0.54 * ease + (reduced.matches ? 0 : mx * 0.45),
      0.22 * (1 - ease) + (reduced.matches ? 0 : Math.sin(t * 0.7) * 0.02),
    );
    arms.forEach(
      (arm, i) =>
        (arm.rotation.z =
          (i ? 1 : -1) * 0.16 + (reduced.matches ? 0 : Math.sin(t * 1.4 + i) * 0.05)),
    );
    const newQuote = p > 1.55;
    if (newQuote !== quote) {
      quote = newQuote;
      alpha = 0;
    }
    alpha = Math.min(1, alpha + 0.05);
    if (t > nextBlink) {
      blinkStart = t;
      nextBlink = t + 2.5 + Math.random() * 3;
    }
    const blink = reduced.matches
      ? 1
      : 1 - 0.9 * Math.max(0, 1 - Math.abs(t - blinkStart - 0.09) / 0.09);
    ctx.fillStyle = '#08080b';
    ctx.fillRect(0, 0, 512, 512);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 18;
    if (quote) {
      ctx.font = '560px Arial Black';
      ctx.textAlign = 'center';
      ctx.fillText('“', 256, 440);
    } else {
      for (const [x, y] of [
        [196, 262],
        [316, 252],
      ]) {
        ctx.beginPath();
        ctx.ellipse(x, y, 30, 38 * blink, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    faceTexture.needsUpdate = true;
    const remaining = reviews?.getBoundingClientRect().bottom ?? innerHeight;
    host.style.opacity = String(Math.max(0, Math.min(1, remaining / 200)));
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }
  frame = requestAnimationFrame(render);
  const dispose = () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', move);
    window.removeEventListener('resize', resize);
    scene.traverse((o) => {
      if (o.isMesh) {
        o.geometry.dispose();
        for (const material of Array.isArray(o.material) ? o.material : [o.material])
          material.dispose();
      }
    });
    gradientTexture.dispose();
    faceTexture.dispose();
    environment.dispose();
    room.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
  window.addEventListener('nova-dispose', dispose, { once: true });
}
