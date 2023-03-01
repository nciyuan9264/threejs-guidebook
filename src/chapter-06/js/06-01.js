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

  let step = 0;
  let spGroup;

  // setup the control gui
  let controls = new function () {
    this.appliedMaterial = applyMeshNormalMaterial
    this.castShadow = true;
    this.groundPlaneVisible = true;

    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function() {
        return generatePoints()
      });
    };
  };

  let gui = new dat.GUI();
  gui.add(controls, 'appliedMaterial', {
    meshNormal: applyMeshNormalMaterial, 
    meshStandard: applyMeshStandardMaterial
  }).onChange(controls.redraw)

  gui.add(controls, 'redraw');
  gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
  gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})

  controls.redraw();
  let step = 0;
  render();

  function generatePoints() {

    if (spGroup) scene.remove(spGroup)
    // add 10 random spheres
    let points = [];
    for (let i = 0; i < 20; i++) {
      let randomX = -15 + Math.round(Math.random() * 30);
      let randomY = -15 + Math.round(Math.random() * 30);
      let randomZ = -15 + Math.round(Math.random() * 30);

      points.push(new THREE.Vector3(randomX, randomY, randomZ));
    }

    spGroup = new THREE.Object3D();
    let material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: false
    });
    points.forEach(function (point) {

      let spGeom = new THREE.SphereGeometry(0.2);
      let spMesh = new THREE.Mesh(spGeom, material);
      spMesh.position.copy(point);
      spGroup.add(spMesh);
    });
    // add the points as a group to the scene
    scene.add(spGroup);

    // use the same points to create a convexgeometry
    let convexGeometry = new THREE.ConvexGeometry(points);
    convexGeometry.computeVertexNormals();
    convexGeometry.computeFaceNormals();
    convexGeometry.normalsNeedUpdate = true;
    return convexGeometry;
  }

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

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

}