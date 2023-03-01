function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let scene = new THREE.Scene();
  let camera = initCamera(new THREE.Vector3(0, 40, 50));

  camera.lookAt(scene.position);

  // call the render function
  let step = 0;

  let cubeMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.5
  });
  let controls = new function () {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.combined = false;


    this.numberOfObjects = 500;

    this.redraw = function () {
      let toRemove = [];
      scene.traverse(function (e) {
        if (e instanceof THREE.Mesh) toRemove.push(e);
      });
      toRemove.forEach(function (e) {
        scene.remove(e)
      });

      // add a large number of cubes
      if (controls.combined) {
        let geometry = new THREE.Geometry();
        for (let i = 0; i < controls.numberOfObjects; i++) {
          let cubeMesh = addcube();
          cubeMesh.updateMatrix();
          geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
        }
        scene.add(new THREE.Mesh(geometry, cubeMaterial));

      } else {
        for (let i = 0; i < controls.numberOfObjects; i++) {
          scene.add(controls.addCube());
        }
      }
    };


    this.addCube = addcube;

    this.outputObjects = function () {
      console.log(scene.children);
    }
  };

  let gui = new dat.GUI();

  gui.add(controls, 'numberOfObjects', 0, 20000);
  gui.add(controls, 'combined').onChange(controls.redraw);
  gui.add(controls, 'redraw');


  controls.redraw();

  render();

  let rotation = 0;

  function addcube() {

    let cubeSize = 1.0;
    let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube randomly in the scene
    cube.position.x = -60 + Math.round((Math.random() * 100));
    cube.position.y = Math.round((Math.random() * 10));
    cube.position.z = -150 + Math.round((Math.random() * 175));

    // add the cube to the scene
    return cube;
  }

  function render() {

    rotation += 0.005;

    stats.update();

    camera.position.x = Math.sin(rotation) * 50;
    // camera.position.y = Math.sin(rotation) * 40;
    camera.position.z = Math.cos(rotation) * 50;
    camera.lookAt(scene.position);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}