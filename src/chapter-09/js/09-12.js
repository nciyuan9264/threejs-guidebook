function init() {
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();
  let scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x333333));
  
  camera.position.set(0, 70, 100);
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  let mixer = new THREE.AnimationMixer();
  let clipAction
  let animationClip
  let mesh
  let controls
  let mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {mixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  let loader = new THREE.ColladaLoader();
  loader.load('../../assets/models/monster/monster.dae', function (result) {

    scene.add(result.scene);
    result.scene.rotateZ(-0.2*Math.PI)
    result.scene.translateX(-20)
    result.scene.translateY(-20)

    // setup the mixer
    mixer = new THREE.AnimationMixer(result.scene);
    animationClip = result.animations[0];
    clipAction = mixer.clipAction( animationClip ).play();    
    animationClip = clipAction.getClip();

    // // add the animation controls
    enableControls();
  });

  function enableControls() {
    let gui = new dat.GUI();
    let mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(mixerControls, "time").listen()
    mixerFolder.add(mixerControls, "timeScale", 0, 5).onChange(function (timeScale) {mixer.timeScale = timeScale});
    mixerFolder.add(mixerControls, "stopAllAction").listen()
    
    controls = addClipActionFolder("ClipAction 1", gui, clipAction, animationClip);
  }

  render();
  function render() {
    stats.update();
    let delta = clock.getDelta();
    trackballControls.update(delta);
    requestAnimationFrame(render);
    renderer.render(scene, camera)

    if (mixer && clipAction && controls) {
      mixer.update( delta );
      controls.time = mixer.time;
      controls.effectiveTimeScale = clipAction.getEffectiveTimeScale();
      controls.effectiveWeight = clipAction.getEffectiveWeight();
    }
  }   
}