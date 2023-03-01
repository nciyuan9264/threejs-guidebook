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
  let controls = {
    displacementScale: 1,
    displacementBias: 0,
  };

  let sphere = new THREE.SphereGeometry(8, 180, 180)
  let sphereMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("../../assets/textures/w_c.jpg"),
      displacementMap: textureLoader.load("../../assets/textures/w_d.png"),
      metalness: 0.02,
      roughness: 0.07,
      color: 0xffffff
  });

  
  groundPlane.receiveShadow = true;
  sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
  sphereMesh.castShadow = true;

  // addGeometryWithMaterial(scene, sphere, 'sphere', gui, controls, sphereMaterial);

  scene.add(sphereMesh);

  gui.add(controls, "displacementScale", -5, 5, 0.01).onChange(function(e) {sphereMaterial.displacementScale = e});
  gui.add(controls, "displacementBias", -5, 5, 0.01).onChange(function(e) {sphereMaterial.displacementBias = e});

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    sphereMesh.rotation.y += 0.01;
  }
}
