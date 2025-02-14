function init() {
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();
  let scene = new THREE.Scene();
  let clock = new THREE.Clock();

  initDefaultLighting(scene);  

  let fpControls = new THREE.FirstPersonControls(camera);
  fpControls.lookSpeed = 0.4;
  fpControls.movementSpeed = 20;
  fpControls.lookVertical = true;
  fpControls.constrainVertical = true;
  fpControls.verticalMin = 1.0;
  fpControls.verticalMax = 2.0;
  fpControls.lon = -150;
  fpControls.lat = 120;

  let loader = new THREE.OBJLoader();
  loader.load("../../assets/models/city/city.obj", function (object) {

    let scale = chroma.scale(['red', 'green', 'blue']);
    setRandomColors(object, scale);
    mesh = object ;
    scene.add(mesh);
  });

  render();
  function render() {
    stats.update();
    fpControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }   
}
