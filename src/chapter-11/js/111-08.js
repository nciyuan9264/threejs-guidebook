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

  let composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(effectFilm);

  // setup controls
  let gui = new dat.GUI();
  let controls = {};
  addFilmPassControls(gui, controls, effectFilm);
  
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
