function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(0, 20, 40));
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  // create a scene and add a light
  let scene = new THREE.Scene();
  let earthAndLight = addEarth(scene);
  let earth = earthAndLight.earth;
  let pivot = earthAndLight.pivot;

  // setup effects
  let renderPass = new THREE.RenderPass(scene, camera);
  let customGrayScale = new THREE.ShaderPass(THREE.CustomGrayScaleShader);
  let customBit = new THREE.ShaderPass(THREE.CustomBitShader);
  let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectCopy.renderToScreen = true;


  let composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(customGrayScale);
  composer.addPass(customBit);
  composer.addPass(effectCopy);

  // setup controls
  let gui = new dat.GUI();
  addShaderControl(gui, "CustomGray", customGrayScale, { floats: [{ key: "rPower", from: 0, to: 1, step: 0.01 }, { key: "gPower", from: 0, to: 1, step: 0.01 }, { key: "bPower", from: 0, to: 1, step: 0.01 }]});
  addShaderControl(gui, "CustomBit", customBit, { floats: [{ key: "bitSize", from: 1, to: 16, step: 1 }]});
  
  // do the basic rendering
  render();
  function render() {
    stats.update();
    let delta = clock.getDelta();
    trackballControls.update(delta);
    earth.rotation.y += 0.001;
    pivot.rotation.y += -0.0003;

    // request next and render using composer
    requestAnimationFrame(render);
    composer.render(delta);
  }
}
