function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  let loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  let loader = new THREE.AssimpJSONLoader();
  loader.load("../../assets/models/spider/spider.obj.assimp.json", function (model) {
    model.scale.set(0.4, 0.4, 0.4);
    loaderScene.render(model, camera);
  });
}