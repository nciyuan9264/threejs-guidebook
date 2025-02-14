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
  let material = new THREE.MeshPhysicalMaterial({color: 0x7777ff})
  let controls = new function () {
    this.color = material.color.getStyle();
    this.emissive = material.emissive.getStyle();
  };

  let gui = new dat.GUI();
  
  addBasicMaterialSettings(gui, controls, material);
  addMeshSelection(gui, controls, material, scene);
  let spGui = gui.addFolder("THREE.MeshPhysicalMaterial");
  spGui.addColor(controls, 'color').onChange(function (e) {
    material.color.setStyle(e)
  });
  spGui.addColor(controls, 'emissive').onChange(function (e) {
    material.emissive = new THREE.Color(e);
  });
  spGui.add(material, 'metalness', 0, 1, 0.01);
  spGui.add(material, 'roughness', 0, 1, 0.01);
  spGui.add(material, 'clearCoat', 0, 1, 0.01);
  spGui.add(material, 'clearCoatRoughness', 0, 1, 0.01);
  spGui.add(material, 'reflectivity', 0, 1, 0.01);
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