function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();
  let clock = new THREE.Clock();
  let trackballControls = initTrackballControls(camera, renderer);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 150;

  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  let scene = new THREE.Scene();

  createPoints();
  render();

  function createPoints() {

    let geom = new THREE.Geometry();
    let material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      color: 0xffffff
    });

    for (let x = -15; x < 15; x++) {
      for (let y = -10; y < 10; y++) {
        let particle = new THREE.Vector3(x * 4, y * 4, 0);
        geom.vertices.push(particle);
        geom.colors.push(new THREE.Color(Math.random() * 0xffffff));
      }
    }

    let cloud = new THREE.Points(geom, material);
    scene.add(cloud);
  }


  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}