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
  groundPlane.receiveShadow = true;

  initDefaultLighting(scene);
  scene.add(new THREE.AmbientLight(0x444444));

  let gui = new dat.GUI();
  let controls = {
    displacementScale: 1,
    displacementBias: 0,
  };

  let textureLoader = new THREE.TextureLoader();
  let material = new THREE.MeshStandardMaterial({
    map: textureLoader.load("../../assets/textures/uv/ash_uvgrid01.jpg"),
    metalness: 0.02,
    roughness: 0.07,
    color: 0xffffff
  });

  let jsonLoader = new THREE.JSONLoader();
  // jsonLoader.load("../../assets/models/uv/uv-changed.json", function(model) {
  jsonLoader.load("../../assets/models/uv/uv-standard.json", function(model) {
    let mesh = new THREE.Mesh(model, material)
    mesh.scale.set(8, 8, 8);
    mesh.rotation.y += 0.3*Math.PI;
    scene.add(mesh);
  });

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
