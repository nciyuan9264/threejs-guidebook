function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(50, 50, 50));  
  let loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  let gui = new dat.GUI();


  let loader = new THREE.ObjectLoader();
  let textureLoader = new THREE.TextureLoader();
  loader.load("../../assets/models/lightmap/lightmap.json", function (sceneGroup) {
    sceneGroup.scale.set(7,7,7);
    let plane = sceneGroup.getObjectByName("Plane")
    plane.geometry.faceVertexUvs.push(plane.geometry.faceVertexUvs[0]);
    plane.material = new THREE.MeshBasicMaterial({
      map: textureLoader.load("../../assets/textures/general/floor-wood.jpg"),
      lightMap: textureLoader.load("../../assets/textures/lightmap/lightmap.png"),
    });

    // add some color and a different material to the head
    let suzanne = sceneGroup.getObjectByName("Suzanne")
    suzanne.geometry.computeVertexNormals();
    suzanne.geometry.computeFaceNormals();
    suzanne.geometry.normalsNeedUpdate = true;
    suzanne.material = new THREE.MeshStandardMaterial({color: 0x445566});
    
    let controls = {
      lightMapIntensity: 1
    };

    gui.add(controls, "lightMapIntensity", 0, 5, 0.01).onChange(function(e) {plane.material.lightMapIntensity = e})
    // call the default render loop.
    loaderScene.render(sceneGroup, camera);
  });
}