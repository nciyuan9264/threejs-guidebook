function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera(new THREE.Vector3(0, 20, 40));
  let trackballControls = initTrackballControls(camera, renderer);
  let clock = new THREE.Clock();

  // initialize canvas drawing
  let canvas = document.createElement("canvas");
  document.getElementById('canvas-output').appendChild(canvas);
  $('#canvas-output').literallycanvas({imageURLPrefix: '../../libs/other/literally/img'});

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  let scene = new THREE.Scene();
  let groundPlane = addLargeGroundPlane(scene)
  groundPlane.position.y = -10;
  initDefaultLighting(scene);
  scene.add(new THREE.AmbientLight(0x444444));

  let texture = new THREE.Texture(canvas);
  let gui = new dat.GUI();
  let controls = {};

  let polyhedron = new THREE.IcosahedronGeometry(8, 0);
  let polyhedronMesh = addGeometry(scene, polyhedron, 'polyhedron', texture, gui, controls);
  polyhedronMesh.position.x = 20;

  let sphere = new THREE.SphereGeometry(5, 20, 20)
  let sphereMesh = addGeometry(scene, sphere, 'sphere', texture, gui, controls);

  let cube = new THREE.BoxGeometry(10, 10, 10)
  let cubeMesh = addGeometry(scene, cube, 'cube', texture, gui, controls);
  cubeMesh.position.x = -20;

  render();
  function render() {
    stats.update();
    trackballControls.update(clock.getDelta());
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    polyhedronMesh.rotation.x += 0.01;
    sphereMesh.rotation.x += 0.01;
    cubeMesh.rotation.x += 0.01;
    polyhedronMesh.material.map.needsUpdate = true;
    sphereMesh.material.map.needsUpdate = true;
    cubeMesh.material.map.needsUpdate = true;
  }
}
