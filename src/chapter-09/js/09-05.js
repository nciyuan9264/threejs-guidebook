function init() {
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();
  let scene = new THREE.Scene();
  let clock = new THREE.Clock();

  initDefaultLighting(scene);  

  let flyControls = new THREE.FlyControls(camera);
  flyControls.movementSpeed = 25;
  flyControls.domElement = document.querySelector("webgl-output");
  flyControls.rollSpeed = Math.PI / 24;
  flyControls.autoForward = true;
  flyControls.dragToLook = false;

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
    flyControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }   
}
