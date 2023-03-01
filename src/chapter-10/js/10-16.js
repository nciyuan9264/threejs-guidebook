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
  scene.getObjectByName("ambientLight").color.setHex( 0x050505 );

  let gui = new dat.GUI();
  let controls = {};

  let earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load("../../assets/textures/earth/Earth.png"),
      normalMap: textureLoader.load("../../assets/textures/earth/EarthNormal.png"),
      specularMap: textureLoader.load("../../assets/textures/earth/EarthSpec.png"),
      normalScale: new THREE.Vector2(6,6)
  });

  let sphere = new THREE.SphereGeometry(9, 50, 50)
  let sphere1 = addGeometryWithMaterial(scene, sphere, 'sphere', gui, controls, earthMaterial.clone());
  sphere1.rotation.y = 1/6*Math.PI;

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    sphere1.rotation.y -= 0.01;
  }
}
