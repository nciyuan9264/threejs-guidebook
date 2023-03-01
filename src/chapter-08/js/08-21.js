function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let loaderScene = new BaseLoaderScene(camera);

  let loader = new THREE.PlayCanvasLoader();
  loader.load("../../assets/models/statue/Statue_1.json", function (group) {
    group.scale.set(1, 1, 1);
    let material = new THREE.MeshNormalMaterial();
    material.side = THREE.DoubleSide;

    setMaterialGroup(material, group);
    loaderScene.render(group, camera);
  });


}