function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(50, 50, 50));  
  let loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  // load the model: model from http://www.thingiverse.com/thing:69709
  let loader = new THREE.STLLoader();
  loader.load("../../assets/models/head/SolidHead_2_lowPoly_42k.stl", function (geometry) {
    let mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.5,
    });
    let group = new THREE.Mesh(geometry, mat);
    group.rotation.x = -0.5 * Math.PI;
    group.scale.set(0.3, 0.3, 0.3);

    // call the default render loop.
    loaderScene.render(group, camera);
  });
}