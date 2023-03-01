function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let loaderScene = new BaseLoaderScene(camera);

  let loader = new THREE.GCodeLoader();

  // you can use slicer to convert the model
  loader.load("../../assets/models/benchy/benchy.gcode", function (object) {
    loaderScene.render(object, camera);
  });


}