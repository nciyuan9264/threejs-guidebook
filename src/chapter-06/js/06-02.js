function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  let scene = new THREE.Scene();
  initDefaultLighting(scene);
  let groundPlane = addLargeGroundPlane(scene)
  groundPlane.position.y = -30;


  // the points group
  let spGroup;

  // setup the control gui
  let controls = new function () {
    this.appliedMaterial = applyMeshNormalMaterial
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.segments = 12;
    this.phiStart = 0;
    this.phiLength = 2 * Math.PI;

    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function() {
        return generatePoints(controls.segments, controls.phiStart, controls.phiLength);
      });
    };
  };

  let gui = new dat.GUI();
  gui.add(controls, 'segments', 0, 50).step(1).onChange(controls.redraw);
  gui.add(controls, 'phiStart', 0, 2 * Math.PI).onChange(controls.redraw);
  gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange(controls.redraw);

   // add a material section, so we can switch between materials
   gui.add(controls, 'appliedMaterial', {
    meshNormal: applyMeshNormalMaterial, 
    meshStandard: applyMeshStandardMaterial
  }).onChange(controls.redraw)

  gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
  gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})
  gui.add(controls, 'redraw');


  function generatePoints(segments, phiStart, phiLength) {

    if (spGroup) scene.remove(spGroup)

    let points = [];
    let height = 5;
    let count = 30;
    for (let i = 0; i < count; i++) {
      points.push(new THREE.Vector2((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, (i - count) +
        count / 2));
    }

    spGroup = new THREE.Object3D();
    let material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    points.forEach(function (point) {

      let spGeom = new THREE.SphereGeometry(0.2);
      let spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.set(point.x, point.y, 0);

      spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a LatheGeometry
    let latheGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    return latheGeometry;
  }

  let step = 0;
  controls.redraw();
  render();
  
  function render() {
    stats.update();
    controls.mesh.rotation.y = step+=0.005
    controls.mesh.rotation.x = step
    controls.mesh.rotation.z = step

    if (spGroup) {
      spGroup.rotation.y = step
      spGroup.rotation.x = step
      spGroup.rotation.z = step
    }

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}