function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();

  let camera = initCamera();
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  let scene = new THREE.Scene();

  // add a simple scene
  addHouseAndTree(scene)

  // add subtle ambient lighting
  let ambientLight = new THREE.AmbientLight("#0c0c0c");
  scene.add(ambientLight);

  // the point light where working with
  let pointColor = "#ccffcc";
  let pointLight = new THREE.PointLight(pointColor);
  pointLight.decay = 0.1

  pointLight.castShadow = true;

  scene.add(pointLight);

  let helper = new THREE.PointLightHelper(pointLight);
  // scene.add(helper);

  let shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera)
  // scene.add(shadowHelper)



  // add a small sphere simulating the pointlight
  let sphereLight = new THREE.SphereGeometry(0.2);
  let sphereLightMaterial = new THREE.MeshBasicMaterial({
    color: 0xac6c25
  });
  let sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.position = new THREE.Vector3(3, 0, 5);
  scene.add(sphereLightMesh);

  // call the render function
  let step = 0;

  // used to determine the switch point for the light animation
  let invert = 1;
  let phase = 0;

  let controls = setupControls();
  render();

  function render() {

    helper.update();
    shadowHelper.update();

    stats.update();
    pointLight.position.copy(sphereLightMesh.position);
    trackballControls.update(clock.getDelta());

    // move the light simulation
    if (phase > 2 * Math.PI) {
      invert = invert * -1;
      phase -= 2 * Math.PI;
    } else {
      phase += controls.rotationSpeed;
    }
    sphereLightMesh.position.z = +(25 * (Math.sin(phase)));
    sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
    sphereLightMesh.position.y = 5;

    if (invert < 0) {
      let pivot = 14;
      sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
    }


    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  function setupControls() {
    let controls = new function () {
      this.rotationSpeed = 0.01;
      this.bouncingSpeed = 0.03;
      this.ambientColor = ambientLight.color.getStyle();;
      this.pointColor = pointLight.color.getStyle();;
      this.intensity = 1;
      this.distance = pointLight.distance;
    };

    

    let gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(function (e) {
      ambientLight.color = new THREE.Color(e);
    });

    gui.addColor(controls, 'pointColor').onChange(function (e) {
      pointLight.color = new THREE.Color(e);
    });

    gui.add(controls, 'distance', 0, 100).onChange(function (e) {
      pointLight.distance = e;
    });

    gui.add(controls, 'intensity', 0, 3).onChange(function (e) {
      pointLight.intensity = e;
    });

    return controls;
  }
}