function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  let loaderScene = new BaseLoaderScene(camera, false);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  let loader = new THREE.BabylonLoader();
  let group = new THREE.Object3D();
  loader.load("../../assets/models/skull/skull.babylon", function (loadedScene) {

      // babylon loader contains a complete scene.
      console.log(loadedScene.children[1].material = new THREE.MeshLambertMaterial());
      loaderScene.render(loadedScene, camera);

  });
}