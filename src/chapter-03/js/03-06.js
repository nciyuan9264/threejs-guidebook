function init() {

  let stats = initStats();
  let renderer = initRenderer({
    antialias: true
  });
  let camera = initCamera();
  
  camera.position.set(-50, 30, 50)
  // camera.lookAt(new THREE.Vector3(0, 0, -35));

  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  let scene = new THREE.Scene();

  // create the ground plane
  let planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
  let planeMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.044676705160855, // calculated from shininess = 1000
    metalness: 0.0

  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // plane.receiveShadow  = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // call the render function
  let step = 0;

  let spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.intensity = 0.1;
  spotLight0.lookAt(plane);
  scene.add(spotLight0);

  let areaLight1 = new THREE.RectAreaLight(0xff0000, 500, 4, 10);
  areaLight1.position.set(-10, 10, -35);
  scene.add(areaLight1);

  let areaLight2 = new THREE.RectAreaLight(0x00ff00, 500, 4, 10);
  areaLight2.position.set(0, 10, -35);
  scene.add(areaLight2);

  let areaLight3 = new THREE.RectAreaLight(0x0000ff, 500, 4, 10);
  areaLight3.position.set(10, 10, -35);
  scene.add(areaLight3);

  let planeGeometry1 = new THREE.BoxGeometry(4, 10, 0);
  let planeGeometry1Mat = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  let plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
  plane1.position.copy(areaLight1.position);
  scene.add(plane1);

  let planeGeometry2 = new THREE.BoxGeometry(4, 10, 0);
  let planeGeometry2Mat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });
  let plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);

  plane2.position.copy(areaLight2.position);
  scene.add(plane2);

  let planeGeometry3 = new THREE.BoxGeometry(4, 10, 0);
  let planeGeometry3Mat = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  });
  let plane3 = new THREE.Mesh(planeGeometry3, planeGeometry3Mat);

  plane3.position.copy(areaLight3.position);
  scene.add(plane3);


  let controls = new function () {
    this.rotationSpeed = 0.02;
    this.color1 = 0xff0000;
    this.intensity1 = 500;
    this.color2 = 0x00ff00;
    this.intensity2 = 500;
    this.color3 = 0x0000ff;
    this.intensity3 = 500;
  };

  let gui = new dat.GUI();
  gui.addColor(controls, 'color1').onChange(function (e) {
    areaLight1.color = new THREE.Color(e);
    planeGeometry1Mat.color = new THREE.Color(e);
    scene.remove(plane1);
    plane1 = new THREE.Mesh(planeGeometry1, planeGeometry1Mat);
    plane1.position.copy(areaLight1.position);
    scene.add(plane1);

  });
  gui.add(controls, 'intensity1', 0, 1000).onChange(function (e) {
    areaLight1.intensity = e;
  });
  gui.addColor(controls, 'color2').onChange(function (e) {
    areaLight2.color = new THREE.Color(e);
    planeGeometry2Mat.color = new THREE.Color(e);
    scene.remove(plane2);
    plane2 = new THREE.Mesh(planeGeometry2, planeGeometry2Mat);
    plane2.position.copy(areaLight2.position);
    scene.add(plane2);
  });
  gui.add(controls, 'intensity2', 0, 1000).onChange(function (e) {
    areaLight2.intensity = e;
  });
  gui.addColor(controls, 'color3').onChange(function (e) {
    areaLight3.color = new THREE.Color(e);
    planeGeometry3Mat.color = new THREE.Color(e);
    scene.remove(plane3);
    plane3 = new THREE.Mesh(planeGeometry1, planeGeometry3Mat);
    plane3.position.copy(areaLight3.position);
    scene.add(plane3);
  });
  gui.add(controls, 'intensity3', 0, 1000).onChange(function (e) {
    areaLight3.intensity = e;
  });


  render();

  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}