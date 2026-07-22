// Main JS: lazy-load Three.js and create a subtle interactive wireframe
const canvas = document.getElementById('three-canvas');
let renderer, scene, camera, mesh;

function isMobile(){
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 700;
}

function initThree(){
  // Dynamically import Three.js from CDN to keep initial load small
  import('https://unpkg.com/three@0.152.2/build/three.module.js').then(THREE=>{
    renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
    camera.position.z = 3;

    // geometry: low-poly icosahedron wireframe
    const geom = new THREE.IcosahedronGeometry(1.0,1);
    const wire = new THREE.WireframeGeometry(geom);
    const mat = new THREE.LineBasicMaterial({color:0x3b82f6, linewidth:1, opacity:0.9, transparent:true});
    mesh = new THREE.LineSegments(wire, mat);
    scene.add(mesh);

    // gentle ambient light for subtlety
    const amb = new THREE.AmbientLight(0xffffff,0.2);
    scene.add(amb);

    onResize();
    window.addEventListener('resize', onResize);

    // interaction
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e)=>{
      const rect = canvas.getBoundingClientRect();
      mouseX = ( (e.clientX - rect.left) / rect.width - 0.5 ) * 2;
      mouseY = ( (e.clientY - rect.top) / rect.height - 0.5 ) * -2;
    });

    // animation
    const clock = new THREE.Clock();
    function animate(){
      const t = clock.getElapsedTime();
      mesh.rotation.x = 0.2 * Math.sin(t / 3) + mouseY * 0.15;
      mesh.rotation.y = 0.35 * t + mouseX * 0.2;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // If mobile, reduce detail and stop continuous rendering when not visible
    if(isMobile()){
      mesh.rotation.x = 0.8;
      mesh.rotation.y = 0.4;
    }

    animate();
  }).catch(err=>{
    console.warn('Three.js failed to load', err);
  });
}

// Resize helper
function onResize(){
  const dpr = Math.min(window.devicePixelRatio,2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if(renderer && camera){
    renderer.setSize(width,height,false);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
  }
}

// Lazy init when canvas is in viewport
function onIntersection(entries, obs){
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      initThree();
      obs.disconnect();
    }
  });
}

const observer = new IntersectionObserver(onIntersection,{root:null,threshold:0.1});
observer.observe(canvas);

// Ensure canvas has a CSS size
function setCanvasSize(){
  canvas.style.width = '100%';
  canvas.style.height = '320px';
}
setCanvasSize();

// Accessibility: hide canvas from assistive tech if decorative
canvas.setAttribute('role','img');
canvas.setAttribute('aria-label','Decorative 3D geometric visual');

