function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(50, 50, 50));
  let loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // load and render the model
  let loader = new THREE.CTMLoader();
  loader.load("../../assets/models/wheel/auditt_wheel.ctm", function (geometry) {
    let mat = new THREE.MeshLambertMaterial({
      color: 0xff8888
    });
    let group = new THREE.Mesh(geometry, mat);
    group.scale.set(70, 70, 70);

    // call the default render loop.
    loaderScene.render(group, camera);
  }, {});
}