function init() {

  Physijs.scripts.worker = '../../libs/other/physijs/physijs_worker.js';
  Physijs.scripts.ammo = './ammo.js';

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(10, 10, 10));
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();
  scene = new Physijs.Scene({reportSize: 10, fixedTimeStep: 1 / 60});
  scene.setGravity(new THREE.Vector3(0, -10, 0));

  initDefaultLighting(scene);

  ground_material = Physijs.createMaterial(new THREE.MeshStandardMaterial(), 0, 0);

  // Bar
  ground = new Physijs.BoxMesh(new THREE.BoxGeometry(1, 1, 100), ground_material, 0);
  ground.receiveShadow = true;

  scene.add(ground);
  scene.simulate();
  createPointToPoint(scene);
  
  render();
  function render() {
    stats.update();
    let delta = clock.getDelta();
    trackballControls.update(delta);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    scene.simulate(undefined, 1);
  }
}

function createPointToPoint(scene) {

  let beads = [];
  let rangeMin = -10;
  let rangeMax = 10;
  let count = 20;
  let scale = chroma.scale(['red', 'yellow']);

  for (let i = 0 ; i < count ; i++) {
    let bead = new THREE.SphereGeometry(0.5);
    let physBead = new Physijs.SphereMesh(bead, Physijs.createMaterial(new THREE.MeshStandardMaterial({color: scale(Math.random()).hex()}), 0, 0)); 
    physBead.position.set(i * (-rangeMin + rangeMax)/count + rangeMin, 10, Math.random()/2);
    scene.add(physBead);
    if (i != 0) {
      let beadConstraint = new Physijs.PointConstraint(beads[i-1], physBead, physBead.position);
      scene.addConstraint(beadConstraint);
    }
    physBead.castShadow = true;
    beads.push(physBead);
  }
}