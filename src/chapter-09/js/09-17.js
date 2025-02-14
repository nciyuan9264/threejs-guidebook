function init() {
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();
  let scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x333333));
  
  let trackballControls = initTrackballControls(camera, renderer);
  camera.position.set(0, 0, -300);
  let clock = new THREE.Clock();

  let mixer = new THREE.AnimationMixer();
  let clipAction
  let controls
  let mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {mixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  let loader = new THREE.BVHLoader();
  loader.load('../../assets/models/amelia-dance/DanceNightClub7_t1.bvh', function (result, mat) {

      skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
      skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly
      let boneContainer = new THREE.Object3D();
      boneContainer.translateY(-70);
      boneContainer.translateX(-100);
      boneContainer.add( result.skeleton.bones[ 0 ] );
      scene.add( skeletonHelper );
      scene.add( boneContainer );

      console.log(result.clip)
      mixer = new THREE.AnimationMixer( skeletonHelper );
      clipAction = mixer.clipAction( result.clip ).setEffectiveWeight( 1.0 ).play();

      let gui = new dat.GUI();
      let mixerFolder = gui.addFolder("AnimationMixer")
      mixerFolder.add(mixerControls, "time").listen()
      mixerFolder.add(mixerControls, "timeScale", 0, 5).onChange(function (timeScale) {mixer.timeScale = timeScale});
      mixerFolder.add(mixerControls, "stopAllAction").listen()
      
      controls = addClipActionFolder("ClipAction", gui, clipAction, result.clip);
  })

  render();
  function render() {
    stats.update();
    let delta = clock.getDelta();
    trackballControls.update(delta);
    requestAnimationFrame(render);
    renderer.render(scene, camera)

    if (mixer && clipAction) {
      mixer.update( delta );
      controls.time = mixer.time;
      controls.effectiveTimeScale = clipAction.getEffectiveTimeScale();
      controls.effectiveWeight = clipAction.getEffectiveWeight();
    }
  }   
}