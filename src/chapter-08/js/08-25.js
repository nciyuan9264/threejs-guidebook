function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let loaderScene = new BaseLoaderScene(camera);

  let loader = new THREE.NRRDLoader();

  // you can use slicer to convert the model
  loader.load("../../assets/models/nrrd/I.nrrd", function (volume) {
    let indexZ = 0;
    sliceZ = volume.extractSlice('z',Math.floor(volume.RASDimensions[2]/4));
    // sliceZ = volume.extractSlice('z',1);
    // scene.add( sliceZ.mesh );

    //y plane
    // let indexY = 0;
    // sliceY = volume.extractSlice('y',Math.floor(volume.RASDimensions[1]/2));
    // scene.add( sliceY.mesh );

    //x plane
    // let indexX = 0;
    // sliceX = volume.extractSlice('x',Math.floor(volume.RASDimensions[0]/2));
    // scene.add( sliceX.mesh );

    loaderScene.render(sliceZ.mesh, camera);
  });


}