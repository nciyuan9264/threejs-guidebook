function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(0, 20, 40));
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  let scene = new THREE.Scene();
  let textureLoader = new THREE.TextureLoader();
  let groundPlane = addLargeGroundPlane(scene, true)
  groundPlane.position.y = -8;

  initDefaultLighting(scene);
  scene.add(new THREE.AmbientLight(0x444444));

  let pointLight = new THREE.PointLight("#ff5808");
  scene.add(pointLight);
  let sphereLight = new THREE.SphereGeometry(0.2);
  let sphereLightMaterial = new THREE.MeshStandardMaterial({color: 0xff5808});
  let sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  scene.add(sphereLightMesh);
  
  let gui = new dat.GUI();
  let controls = {
    normalScaleX: 1,
    normalScaleY: 1
  };

  let cube = new THREE.BoxGeometry(16, 16, 16)
  let cubeMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load("../../assets/textures/general/plaster.jpg"),
      metalness: 0.2,
      roughness: 0.07
  });

  let cubeMaterialWithNormalMap = cubeMaterial.clone();
  cubeMaterialWithNormalMap.normalMap = textureLoader.load("../../assets/textures/general/plaster-normal.jpg")

  let cube1 = addGeometryWithMaterial(scene, cube, 'cube-1', gui, controls, cubeMaterial);
  cube1.position.x = -17;
  cube1.rotation.y = 1/3*Math.PI;

  let cube2 = addGeometryWithMaterial(scene, cube, 'cube-2', gui, controls, cubeMaterialWithNormalMap);
  cube2.position.x = 17;
  cube2.rotation.y = -1/3*Math.PI;

  gui.add(controls, "normalScaleX", -3, 3, 0.001).onChange(function(e) {cubeMaterialWithNormalMap.normalScale.set(controls.normalScaleX, controls.normalScaleY)});
  gui.add(controls, "normalScaleY", -3, 3, 0.001).onChange(function(e) {cubeMaterialWithNormalMap.normalScale.set(controls.normalScaleX, controls.normalScaleY)});

  render();
  let invert = 1;
  let phase = 0;
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    if (phase > 2 * Math.PI) {
      invert = invert * -1;
      phase -= 2 * Math.PI;
    } else {
      phase += 0.02;
    }

    sphereLightMesh.position.z = +(21 * (Math.sin(phase)));
    sphereLightMesh.position.x = -14 + (14 * (Math.cos(phase)));
    sphereLightMesh.position.y = 5;

    if (invert < 0) {
        let pivot = 0;
        sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
    }
    pointLight.position.copy(sphereLightMesh.position);
  }
}
