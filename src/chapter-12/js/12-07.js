function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(10, 10, 10));
  let clock = new THREE.Clock();
  scene = new THREE.Scene();

  initDefaultLighting(scene);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(-200, 25, 0);

  let listener1 = new THREE.AudioListener();
  camera.add(listener1);
  let listener2 = new THREE.AudioListener();
  camera.add(listener2);
  let listener3 = new THREE.AudioListener();
  camera.add(listener3);

  controls = new THREE.FirstPersonControls(camera);

  controls.movementSpeed = 70;
  controls.lookSpeed = 0.15;
  controls.noFly = true;
  controls.lookVertical = false;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0035);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0.5, 1).normalize();
  scene.add(light);

  let cube = new THREE.BoxGeometry(40, 40, 40);

  let material_1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: THREE.ImageUtils.loadTexture("../../assets/textures/animals/cow.png")
  });

  let material_2 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: THREE.ImageUtils.loadTexture("../../assets/textures/animals/dog.jpg")
  });

  let material_3 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: THREE.ImageUtils.loadTexture("../../assets/textures/animals/cat.jpg")
  });

  // sound spheres
  let mesh1 = new THREE.Mesh(cube, material_1);
  mesh1.position.set(0, 20, 100);
  let mesh2 = new THREE.Mesh(cube, material_2);
  mesh2.position.set(0, 20, 0);
  let mesh3 = new THREE.Mesh(cube, material_3);
  mesh3.position.set(0, 20, -100);

  scene.add(mesh1);
  scene.add(mesh2);
  scene.add(mesh3);

  let posSound1 = new THREE.PositionalAudio( listener1 );
  let posSound2 = new THREE.PositionalAudio( listener1 );
  let posSound3 = new THREE.PositionalAudio( listener1 );

  let audioLoader = new THREE.AudioLoader();
  audioLoader.load('../../assets/audio/cow.ogg', function(buffer) {
    posSound1.setBuffer( buffer );
    posSound1.setRefDistance( 30 );
    posSound1.play();
    posSound1.setRolloffFactor(10);
    posSound1.setLoop(true);
  });

  audioLoader.load('../../assets/audio/dog.ogg', function(buffer) {
    posSound2.setBuffer( buffer );
    posSound2.setRefDistance( 30 );
    posSound2.play();
    posSound2.setRolloffFactor(10);
    posSound2.setLoop(true);
  });

  audioLoader.load('../../assets/audio/cat.ogg', function(buffer) {
    posSound3.setBuffer( buffer );
    posSound3.setRefDistance( 30 );
    posSound3.play();
    posSound3.setRolloffFactor(10);
    posSound3.setLoop(true);
  });

  mesh1.add(posSound1);
  mesh2.add(posSound2);
  mesh3.add(posSound3);

  // ground
  let helper = new THREE.GridHelper(500, 10);
  helper.position.y = 0.1;
  scene.add(helper);

  animate();

  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  
  function render() {
    let delta = clock.getDelta(), time = clock.getElapsedTime() * 5;
    controls.update(delta);
    renderer.render(scene, camera);
  } 
}

