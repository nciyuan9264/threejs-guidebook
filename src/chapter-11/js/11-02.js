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
  let effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false);  
  effectFilm.renderToScreen = true;
  let bloomPass = new THREE.BloomPass();    
  let dotScreenPass = new THREE.DotScreenPass();   
  let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectCopy.renderToScreen = true;

  let composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(effectCopy);

  // reuse the rendered scene from the composer
  let renderedScene = new THREE.TexturePass(composer.renderTarget2); 

  // define the composers
  let effectFilmComposer = new THREE.EffectComposer(renderer);
  effectFilmComposer.addPass(renderedScene);
  effectFilmComposer.addPass(effectFilm);

  let bloomComposer = new THREE.EffectComposer(renderer);
  bloomComposer.addPass(renderedScene);
  bloomComposer.addPass(bloomPass);
  bloomComposer.addPass(effectCopy);

  let dotScreenComposer = new THREE.EffectComposer(renderer);
  dotScreenComposer.addPass(renderedScene);
  dotScreenComposer.addPass(dotScreenPass);
  dotScreenComposer.addPass(effectCopy);

  // setup controls
    // setup controls
  let gui = new dat.GUI();
  let controls = {};
  
  addFilmPassControls(gui, controls, effectFilm);
  addDotScreenPassControls(gui, controls, dotScreenPass);
  addBloomPassControls(gui, controls, bloomPass, function(updated) {bloomComposer.passes[1] = updated;});
  
  // do the basic rendering, since we render to multiple parts of the screen
  // determine the 
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
    effectFilmComposer.render(delta);

    renderer.setViewport(0, halfHeight, halfWidth, halfHeight);
    bloomComposer.render(delta);
    
    renderer.setViewport(halfWidth, 0, halfWidth, halfHeight);
    dotScreenComposer.render(delta);
    
    renderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight);
    composer.render(delta);

    requestAnimationFrame(render);
  }
}
