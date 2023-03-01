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
  let textureLoader = new THREE.TextureLoader();
  let groundPlane = addLargeGroundPlane(scene, true)
  groundPlane.position.y = -8;

  initDefaultLighting(scene);
  scene.add(new THREE.AmbientLight(0x444444));

  let gui = new dat.GUI();
  let controls = {};

  let cube = new THREE.BoxGeometry(16, 16, 16)
  let cubeMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("../../assets/textures/stone/stone.jpg"),
      metalness: 0.2,
      roughness: 0.07
  });

  let cubeMaterialWithBumpMap = cubeMaterial.clone();
  cubeMaterialWithBumpMap.bumpMap = textureLoader.load("../../assets/textures/stone/stone-bump.jpg")

  let cube1 = addGeometryWithMaterial(scene, cube, 'cube-1', gui, controls, cubeMaterial);
  cube1.position.x = -17;
  cube1.rotation.y = 1/3*Math.PI;

  let cube2 = addGeometryWithMaterial(scene, cube, 'cube-2', gui, controls, cubeMaterialWithBumpMap);
  cube2.position.x = 17;
  cube2.rotation.y = -1/3*Math.PI;

  gui.add(cubeMaterialWithBumpMap, "bumpScale", -1, 1, 0.001)

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
