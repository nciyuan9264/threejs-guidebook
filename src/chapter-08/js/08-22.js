function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let loaderScene = new BaseLoaderScene(camera);

  THREE.DRACOLoader.setDecoderPath('../../libs/other/draco/');
	THREE.DRACOLoader.setDecoderConfig({type: 'js'});
  let loader = new THREE.DRACOLoader();

  loader.load("../../assets/models/bunny/bunny.drc", function (geometry) {

    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();

    let mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

    mesh.scale.set(150, 150, 150)
    loaderScene.render(mesh, camera);
  });


}