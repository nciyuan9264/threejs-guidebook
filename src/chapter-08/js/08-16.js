function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  let loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  let loader = new THREE.VRMLLoader();
  loader.load("../../assets/models/tree/tree.wrl", function (model) {
      model.scale.set(10, 10, 10);
      loaderScene.render(model, camera);
  });
}