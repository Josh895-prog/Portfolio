const canvas = document.getElementById('heroCanvas');
if (!canvas) console.warn('heroCanvas not found');
if (!window.THREE) console.warn('Three.js not loaded');

let renderer, scene, camera, coreMesh, orbitLines;
let mouseX = 0, mouseY = 0;
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const shouldAnimate = !prefersReducedMotion;

function createScene() {
  if (!canvas || !window.THREE) return;
  renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 3.2);

  const ambientLight = new THREE.HemisphereLight(0x9bb8ff, 0x0e1a33, 0.7);
  const pointLight = new THREE.PointLight(0x4f7cff, 1.2, 10);
  pointLight.position.set(2.2, 2.2, 3.5);
  scene.add(ambientLight, pointLight);

  coreMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.42, 1),
    new THREE.MeshStandardMaterial({
      color: 0x4f7cff,
      emissive: 0x0c2d6b,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.92
    })
  );
  scene.add(coreMesh);

  const edges = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.72, 0));
  orbitLines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x6f9cff, transparent: true, opacity: 0.35}));
  scene.add(orbitLines);

  const pointsGeometry = new THREE.BufferGeometry();
  const pointPositions = [];
  const pointCount = 18;
  for (let i = 0; i < pointCount; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const x = Math.sin(phi) * Math.cos(theta) * 1.08;
    const y = Math.sin(phi) * Math.sin(theta) * 1.08;
    const z = Math.cos(phi) * 1.08;
    pointPositions.push(x, y, z);
  }
  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));
  const pointsMaterial = new THREE.PointsMaterial({color: 0x8db7ff, size: 0.06, sizeAttenuation: true});
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(points);

  window.addEventListener('resize', onResize);
  if (!prefersReducedMotion) window.addEventListener('pointermove', onPointerMove);
  onResize();
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  mouseX = (event.clientX - rect.left) / rect.width - 0.5;
  mouseY = (event.clientY - rect.top) / rect.height - 0.5;
}

function animate() {
  if (!renderer) return;
  const time = performance.now() * 0.0005;
  coreMesh.rotation.y = time * -0.18;
  coreMesh.rotation.x = time * 0.08;
  orbitLines.rotation.y = time * 0.14;
  orbitLines.rotation.x = mouseY * 0.1;
  orbitLines.rotation.z = mouseX * 0.12;
  camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
  camera.position.y += (-mouseY * 0.6 - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  if (shouldAnimate) requestAnimationFrame(animate);
}

function onResize() {
  if (!renderer || !camera) return;
  const width = canvas.clientWidth || canvas.width;
  const height = canvas.clientHeight || canvas.height;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

createScene();
if (shouldAnimate) animate(); else if (renderer && scene && camera) renderer.render(scene, camera);
