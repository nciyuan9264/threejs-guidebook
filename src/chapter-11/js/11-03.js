function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(0, 20, 40));
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();
  let textureLoader = new THREE.TextureLoader();

  // create a scene and add a light
  let scene = new THREE.Scene();
  let earthAndLight = addEarth(scene);
  let earth = earthAndLight.earth;
  let pivot = earthAndLight.pivot;

  // setup effects
  let renderPass = new THREE.RenderPass(scene, camera);
  let glitchPass = new THREE.GlitchPass();
  let halftonePass = new THREE.HalftonePass();
  let outlinePass = new THREE.OutlinePass(new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera, [earth]);
  let unrealBloomPass = new THREE.UnrealBloomPass();

  let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectCopy.renderToScreen = true;

  // define the composers
  let composer1 = new THREE.EffectComposer(renderer);
  composer1.addPass(renderPass);
  composer1.addPass(glitchPass);
  composer1.addPass(effectCopy);

  let composer2 = new THREE.EffectComposer(renderer);
  composer2.addPass(renderPass);
  composer2.addPass(halftonePass);
  composer2.addPass(effectCopy);

  let composer3 = new THREE.EffectComposer(renderer);
  composer3.addPass(renderPass);
  composer3.addPass(outlinePass);
  composer3.addPass(effectCopy);

  let composer4 = new THREE.EffectComposer(renderer);
  composer4.addPass(renderPass);
  composer4.addPass(unrealBloomPass);
  composer4.addPass(effectCopy);

  // setup controls
    // setup controls
  let gui = new dat.GUI();
  let controls = {};

  addGlitchPassControls(gui, controls, glitchPass, function(gp) {composer1.passes[1] = gp});
  addHalftonePassControls(gui, controls, halftonePass, function(htp) {
    composer2 = new THREE.EffectComposer(renderer);
    composer2.addPass(renderPass);
    composer2.addPass(htp);
    composer2.addPass(effectCopy);
  });
  addOutlinePassControls(gui, controls, outlinePass);
  addUnrealBloomPassControls(gui, controls, unrealBloomPass, function(ub) {
    composer4 = new THREE.EffectComposer(renderer);
    composer4.addPass(renderPass);
    composer4.addPass(ub);
    composer4.addPass(effectCopy);
  });
  
  // do the rendering to different parts
  let width = window.innerWidth;
  let height = window.innerHeight;
  let halfWidth = width / 2;
  let halfHeight = height / 2;
  render();
  function render() {
    stats.update();
    let delta = clock.getDelta();
    trackballControls.update(delta);
    earth.rotation.y += 0.001;
    pivot.rotation.y += -0.0003;

    renderer.autoClear = false;
    renderer.clear();
    
    renderer.setViewport(0, 0, halfWidth, halfHeight);
    composer1.render(delta);

    renderer.setViewport(0, halfHeight, halfWidth, halfHeight);
    composer2.render(delta);
    
    renderer.setViewport(halfWidth, 0, halfWidth, halfHeight);
    composer3.render(delta);
    
    renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight);
    composer4.render(delta);

    requestAnimationFrame(render);
  }
}
