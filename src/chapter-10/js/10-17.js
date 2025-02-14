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
  initDefaultLighting(scene);

  let gui = new dat.GUI();
  let controls = {
    normalScaleX: 1,
    normalScaleY: 1
  };
  let textureLoader = new THREE.TextureLoader();

  let urls = [
      '../../assets/textures/cubemap/flowers/right.png',
      '../../assets/textures/cubemap/flowers/left.png',
      '../../assets/textures/cubemap/flowers/top.png',
      '../../assets/textures/cubemap/flowers/bottom.png',
      '../../assets/textures/cubemap/flowers/front.png',
      '../../assets/textures/cubemap/flowers/back.png'
  ];

  let cubeLoader = new THREE.CubeTextureLoader();
  scene.background = cubeLoader.load(urls);
  
  let cubeMaterial = new THREE.MeshStandardMaterial({
      envMap: scene.background,
      color: 0xffffff,
      metalness: 1,
      roughness: 0,
  });

  let sphereMaterial = cubeMaterial.clone();
  sphereMaterial.normalMap = textureLoader.load("../../assets/textures/engraved/Engraved_Metal_003_NORM.jpg");
  sphereMaterial.aoMap = textureLoader.load("../../assets/textures/engraved/Engraved_Metal_003_OCC.jpg");
  sphereMaterial.shininessMap = textureLoader.load("../../assets/textures/engraved/Engraved_Metal_003_ROUGH.jpg");


  let cube = new THREE.CubeGeometry(16, 12, 12)
  let cube1 = addGeometryWithMaterial(scene, cube, 'cube', gui, controls, cubeMaterial);
  cube1.position.x = -15;
  cube1.rotation.y = -1/3*Math.PI;

  let sphere = new THREE.SphereGeometry(10, 50, 50)
  let sphere1 = addGeometryWithMaterial(scene, sphere, 'sphere', gui, controls, sphereMaterial);
  sphere1.position.x = 15;

  gui.add({refraction: false}, "refraction").onChange(function(e) {
    if (e) {
      scene.background.mapping = THREE.CubeRefractionMapping;
    } else {
      scene.background.mapping = THREE.CubeReflectionMapping;
    }
    cube1.material.needsUpdate = true;
    sphere1.material.needsUpdate = true;
  });

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    cube1.rotation.y += 0.01;
    sphere1.rotation.y -= 0.01;
  }
}
