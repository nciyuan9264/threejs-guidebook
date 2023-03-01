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

  initDefaultLighting(scene);
  scene.add(new THREE.AmbientLight(0x444444));

  let groundPlane = addLargeGroundPlane(scene, true)
  groundPlane.position.y = -8;

  let gui = new dat.GUI();
  let controls = {
  };

  let sphere = new THREE.SphereGeometry(8, 180, 180)
  let sphereMaterial = new THREE.MeshStandardMaterial({
      alphaMap: textureLoader.load("../../assets/textures/alpha/partial-transparency.png"),
      envMap: alternativeMap,
      metalness: 0.02,
      roughness: 0.07,
      color: 0xffffff,
      alphaTest: 0.5
  });

  sphereMaterial.alphaMap.wrapS = THREE.RepeatWrapping;
  sphereMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
  sphereMaterial.alphaMap.repeat.set(8, 8);


  let mesh = addGeometryWithMaterial(scene, sphere, 'sphere', gui, controls, sphereMaterial);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
