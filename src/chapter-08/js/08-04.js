function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let scene = new THREE.Scene();
  let camera = initCamera(new THREE.Vector3(20, 40, 110));
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  // create the ground plane
  let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
  let planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff
  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  //  plane.receiveShadow  = true;

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
    color: 0xff0000
  });
  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // cube.castShadow = true;

  // position the cube
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  let sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  //  sphere.castShadow=true;

  // add the sphere to the scene
  scene.add(sphere);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  let ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  let spotLight = new THREE.PointLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  //  spotLight.castShadow = true;
  scene.add(spotLight);

  // call the render function
  let step = 0;

  let controls = new function () {
    this.exportScene = function () {
      localStorage.setItem('scene', JSON.stringify(scene.toJSON()));
      console.log(localStorage.getItem("scene"));
    };

    this.clearScene = function () {
      scene = new THREE.Scene();
    };

    this.importScene = function () {
      let json = (localStorage.getItem('scene'));

      if (json) {
        let loadedSceneAsJson = JSON.parse(json);
        let loader = new THREE.ObjectLoader();
        scene = loader.parse(loadedSceneAsJson);
      }
    }
  };

  let gui = new dat.GUI();
  gui.add(controls, "exportScene");
  gui.add(controls, "clearScene");
  gui.add(controls, "importScene");


  render();

  function render() {
    stats.update();
    // rotate the cube around its axes


    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}