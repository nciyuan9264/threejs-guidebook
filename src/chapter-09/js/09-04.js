function init() {
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();
  let scene = new THREE.Scene();
  let clock = new THREE.Clock();

  initDefaultLighting(scene);  

  let trackballControls = new THREE.TrackballControls(camera);
  trackballControls.rotateSpeed = 1.0;
  trackballControls.zoomSpeed = 1.0;
  trackballControls.panSpeed = 1.0;

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
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }   
}
