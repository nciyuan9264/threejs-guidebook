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

    this.numberOfPoints = 5;
    this.segments = 64;
    this.radius = 1;
    this.radiusSegments = 8;
    this.closed = false;
    this.points = [];
    // we need the first child, since it's a multimaterial

    this.newPoints = function () {
      let points = [];
      for (let i = 0; i < controls.numberOfPoints; i++) {
        let randomX = -20 + Math.round(Math.random() * 50);
        let randomY = -15 + Math.round(Math.random() * 40);
        let randomZ = -20 + Math.round(Math.random() * 40);

        points.push(new THREE.Vector3(randomX, randomY, randomZ));
      }
      controls.points = points;
      controls.redraw();
    };

    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function() {
        return generatePoints(controls.points, controls.segments, controls.radius, controls.radiusSegments,
          controls.closed);
      });
    };

  };

  let gui = new dat.GUI();
  gui.add(controls, 'newPoints');
  gui.add(controls, 'numberOfPoints', 2, 15).step(1).onChange(controls.newPoints);
  gui.add(controls, 'segments', 0, 200).step(1).onChange(controls.redraw);
  gui.add(controls, 'radius', 0, 10).onChange(controls.redraw);
  gui.add(controls, 'radiusSegments', 0, 100).step(1).onChange(controls.redraw);
  gui.add(controls, 'closed').onChange(controls.redraw);

  gui.add(controls, 'appliedMaterial', {
    meshNormal: applyMeshNormalMaterial, 
    meshStandard: applyMeshStandardMaterial
  }).onChange(controls.redraw)

  gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
  gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})


  controls.newPoints();


  render();

  function generatePoints(points, segments, radius, radiusSegments, closed) {
    // add n random spheres

    if (spGroup) scene.remove(spGroup)
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
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radiusSegments, closed);
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