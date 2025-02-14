function init() {


  let stats = initStats();
  let renderer = initRenderer({
    alpha: true
  });

  let camera = initCamera();
  camera.position.x = -20;
  camera.position.y = 10;
  camera.position.z = 45;
  camera.lookAt(new THREE.Vector3(10, 0, 0));

  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();


  // create a scene, that will hold all our elements such as objects, cameras and lights.
  let scene = new THREE.Scene();

  // create the ground plane
  let textureGrass = new THREE.TextureLoader().load("../../assets/textures/ground/grasslight-big.jpg");
  textureGrass.wrapS = THREE.RepeatWrapping;
  textureGrass.wrapT = THREE.RepeatWrapping;
  textureGrass.repeat.set(10, 10);

  let planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
  let planeMaterial = new THREE.MeshLambertMaterial({
    map: textureGrass
  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  let cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff3333
  });
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  let sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
  let sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.position.z = 10;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  // add subtle ambient lighting
  let ambiColor = "#1c1c1c";
  let ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  // add spotlight for a bit of light
  let spotLight0 = new THREE.SpotLight(0xcccccc);
  spotLight0.position.set(-40, 60, -10);
  spotLight0.lookAt(plane);
  scene.add(spotLight0);


  let target = new THREE.Object3D();
  target.position = new THREE.Vector3(5, 0, 0);


  let pointColor = "#ffffff";
  //    let spotLight = new THREE.SpotLight( pointColor);
  let spotLight = new THREE.DirectionalLight(pointColor);
  spotLight.position.set(30, 10, -50);
  spotLight.castShadow = true;
  spotLight.shadowCameraNear = 0.1;
  spotLight.shadowCameraFar = 100;
  spotLight.shadowCameraFov = 50;
  spotLight.target = plane;
  spotLight.distance = 0;
  spotLight.shadowCameraNear = 2;
  spotLight.shadowCameraFar = 200;
  spotLight.shadowCameraLeft = -100;
  spotLight.shadowCameraRight = 100;
  spotLight.shadowCameraTop = 100;
  spotLight.shadowCameraBottom = -100;
  spotLight.shadowMapWidth = 2048;
  spotLight.shadowMapHeight = 2048;


  scene.add(spotLight);


  // call the render function
  let step = 0;

  // used to determine the switch point for the light animation
  let invert = 1;
  let phase = 0;

  let controls = new function () {
    this.rotationSpeed = 0.03;
    this.bouncingSpeed = 0.03;
    this.ambientColor = ambiColor;
    this.pointColor = pointColor;
    this.intensity = 0.1;
    this.distance = 0;
    this.exponent = 30;
    this.angle = 0.1;
    this.debug = false;
    this.castShadow = true;
    this.onlyShadow = false;
    this.target = "Plane";

  };

  let gui = new dat.GUI();
  gui.addColor(controls, 'ambientColor').onChange(function (e) {
    ambientLight.color = new THREE.Color(e);
  });

  gui.addColor(controls, 'pointColor').onChange(function (e) {
    spotLight.color = new THREE.Color(e);
  });

  gui.add(controls, 'intensity', 0, 5).onChange(function (e) {
    spotLight.intensity = e;
  });


  let textureFlare0 = THREE.ImageUtils.loadTexture("../../assets/textures/flares/lensflare0.png");
  let textureFlare3 = THREE.ImageUtils.loadTexture("../../assets/textures/flares/lensflare3.png");

  let flareColor = new THREE.Color(0xffaacc);

  let lensFlare = new THREE.Lensflare();

  lensFlare.addElement(new THREE.LensflareElement(textureFlare0, 350, 0.0, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9, flareColor));
  lensFlare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1.0, flareColor));
  spotLight.add(lensFlare);

  render();

  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    // rotate the cube around its axes
    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    // bounce the sphere up and down
    step += controls.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
};