function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let loaderScene = new BaseLoaderScene(camera);

  let loader = new THREE.AMFLoader();
  loader.load("../../assets/models/gimbal/Gimbal_snowflake_star_small_hole_6mm.amf", function (group) {
    group.scale.set(0.4, 0.4, 0.4);
    loaderScene.render(group, camera);
  });
}