function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(0, 20, 40));
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  let scene = new THREE.Scene();
  let groundPlane = addLargeGroundPlane(scene)
  groundPlane.position.y = -10;
  initDefaultLighting(scene);
  scene.add(new THREE.AmbientLight(0x444444));

  let textureLoader = new THREE.TextureLoader();
  let gui = new dat.GUI();
  let controls = {};

  let polyhedron = new THREE.IcosahedronGeometry(8, 0);
  let polyhedronMesh = addGeometry(scene, polyhedron, 'polyhedron', textureLoader.load('../../assets/textures/general/metal-rust.jpg'), gui, controls);
  polyhedronMesh.position.x = 20;

  let sphere = new THREE.SphereGeometry(5, 20, 20)
  let sphereMesh = addGeometry(scene, sphere, 'sphere', textureLoader.load('../../assets/textures/general/floor-wood.jpg'), gui, controls);

  let cube = new THREE.BoxGeometry(10, 10, 10)
  let cubeMesh = addGeometry(scene, cube, 'cube', textureLoader.load('../../assets/textures/general/brick-wall.jpg'), gui, controls);
  cubeMesh.position.x = -20;

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    polyhedronMesh.rotation.x += 0.01;
    sphereMesh.rotation.y += 0.01;
    cubeMesh.rotation.z += 0.01;
  }
}
