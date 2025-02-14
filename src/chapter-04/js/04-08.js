function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  let scene = new THREE.Scene();
  addLargeGroundPlane(scene);

  // add spotlight for the shadows
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-0, 30, 60);
  spotLight.castShadow = true;
  spotLight.intensity = 0.6;
  scene.add(spotLight);

  // call the render function
  let step = 0;
  let material = new THREE.MeshToonMaterial({color: 0x7777ff})
  let controls = new function () {
    this.color = material.color.getStyle();
    this.emissive = material.emissive.getStyle();
    this.specular = material.specular.getStyle();
  };

  let gui = new dat.GUI();
  
  addBasicMaterialSettings(gui, controls, material);
  addMeshSelection(gui, controls, material, scene);
  let spGui = gui.addFolder("THREE.MeshToonMaterial");
  spGui.addColor(controls, 'color').onChange(function (e) {
    material.color.setStyle(e)
  });
  spGui.addColor(controls, 'emissive').onChange(function (e) {
    material.emissive = new THREE.Color(e);
  });
  spGui.addColor(controls, 'specular').onChange(function (e) {
    material.specular = new THREE.Color(e);
  });
  spGui.add(material, 'shininess', 0, 100, )
  spGui.add(material, 'wireframe');
  spGui.add(material, 'wireframeLinewidth', 0, 20);

  camera.lookAt(controls.selected.position);
  render();

  function render() {
    stats.update();

    if (controls.selected) controls.selected.rotation.y = step += 0.01;

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}