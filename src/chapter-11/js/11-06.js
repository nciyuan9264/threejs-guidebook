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

  let amount = 50;
  let xRange = 20;
  let yRange = 20;
  let zRange = 20;

  let totalGroup = new THREE.Group();
  for ( let i = 0 ; i < amount ; i++) {
    let boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    let material = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff});
    let boxMesh = new THREE.Mesh(boxGeometry, material);

    let rX = Math.random() * xRange - xRange / 2;
    let rY = Math.random() * yRange - yRange / 2;
    let rZ = Math.random() * zRange - zRange / 2;

    let totalRotation = 2*Math.PI;

    boxMesh.position.set(rX, rY, rZ);
    boxMesh.rotation.set(Math.random() * totalRotation,Math.random() * totalRotation,Math.random() * totalRotation)
    totalGroup.add(boxMesh);
  } 

  scene.add(totalGroup);

  let renderPass = new THREE.RenderPass(scene, camera);
  let aoPass = new THREE.SSAOPass(scene, camera);
  aoPass.renderToScreen = true;

  let composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(aoPass);
  
  addShaderControl(new dat.GUI(), "SSAO", aoPass , { setEnabled: false, 
    floats: [
      { key: "radius", from: 1, to: 10, step: 0.1 },
      { key: "aoClamp", from: 0, to: 1, step: 0.01 },
      { key: "lumInfluence", from: 0, to: 2, step: 0.01 },
    ],
    booleans: [
      {key: "onlyAO"}
    ]
  })

  render();
  function render() {
    stats.update();
    let delta = clock.getDelta()
    trackballControls.update(delta);
    requestAnimationFrame(render);
    totalGroup.rotation.x += 0.0001;
    totalGroup.rotation.y += 0.001;
    composer.render(delta);
  }
}
