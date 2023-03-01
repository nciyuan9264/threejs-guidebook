function init() {

  // use the defaults
    let stats = initStats();
    let renderer = initRenderer();
    let camera = initCamera(new THREE.Vector3(100, 120, 100));
    let trackballControls = initTrackballControls(camera, renderer);
    let clock = new THREE.Clock();
  
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    // and add some simple default lights
    let scene = new THREE.Scene();
    initDefaultDirectionalLighting(scene);
    let groundPlane = addLargeGroundPlane(scene, true)
    groundPlane.position.y = -2;

    // add a whole lot of boxes
    let totalWidth = 800;
    let totalDepth = 800;
    let nBoxes = 51;
    let mBoxes = 51;
    let colors = [0x66ff00, 0x6600ff, 0x0066ff, 0xff6600, 0xff0066 ];
    for (let i = 0 ; i < nBoxes ; i++) {
      for (let j = 0 ; j < mBoxes ; j++) {
        let box = new THREE.BoxGeometry(5, 10, 5);
        let mat = new THREE.MeshStandardMaterial({
          color: colors[Math.round((Math.random() * 100)) % 5],
          roughness: 0.6
        });
        let mesh = new THREE.Mesh(box, mat);
        mesh.position.z = -(totalDepth / 2) + (totalDepth / mBoxes) * j;
        mesh.position.x = -(totalWidth / 2) + (totalWidth / nBoxes) * i;
        // mesh.rotation.y = i;
        mesh.castShadow = true;
        scene.add(mesh);
      }
    }

    let renderPass = new THREE.RenderPass(scene, camera);
    renderPass.renderToScreen = false;
    let effectCopy = new THREE.ShaderPass(THREE.CopyShader);
    effectCopy.renderToScreen = true;
    let horBlurShader = new THREE.ShaderPass(THREE.HorizontalBlurShader);
    let verBlurShader = new THREE.ShaderPass(THREE.VerticalBlurShader);
    let horTiltShiftShader = new THREE.ShaderPass(THREE.HorizontalTiltShiftShader);
    let verTiltShiftShader = new THREE.ShaderPass(THREE.VerticalTiltShiftShader);
    let triangleBlurShader = new THREE.ShaderPass(THREE.TriangleBlurShader, "texture");
    let focusShader = new THREE.ShaderPass(THREE.FocusShader);
  
    let composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(horBlurShader);
    composer.addPass(verBlurShader);
    composer.addPass(horTiltShiftShader);
    composer.addPass(verTiltShiftShader);
    composer.addPass(triangleBlurShader);
    composer.addPass(focusShader);
    composer.addPass(effectCopy);
  
    let gui = new dat.GUI();
    addShaderControl(gui, "horizontalBlur", horBlurShader, { floats: [{ key: "h", from: 0, to: 0.01, step: 0.0001 }]})
    addShaderControl(gui, "verticalBlur", verBlurShader, { floats: [{ key: "v", from: 0, to: 0.01, step: 0.0001 }]})
    addShaderControl(gui, "horizontalTiltShift", horTiltShiftShader, { floats: [{ key: "r", from: 0, to: 1, step: 0.01 } ,{ key: "h", from: 0, to: 0.01, step: 0.0001 }]})
    addShaderControl(gui, "verticalTiltShift", verTiltShiftShader, { floats: [{ key: "r", from: 0, to: 1, step: 0.01 }, { key: "v", from: 0, to: 0.01, step: 0.0001 }]})
    addShaderControl(gui, "triangleBlur", triangleBlurShader, { vector2: [{ key: "delta", from: {x: 0, y: 0}, to: {x: 0.1, y: 0.1}, step:{x:0.0001, y:0.0001}}]})
    addShaderControl(gui, "focus", focusShader, { floats: [{ key: "sampleDistance", from: 0, to: 10, step: 0.01 }, { key: "waveFactor", from: 0, to: 0.005, step: 0.0001 }]})

    render();
    function render() {
      stats.update();
      let delta = clock.getDelta()
      trackballControls.update(delta);
      requestAnimationFrame(render);
      composer.render(delta);
    }
  }
  