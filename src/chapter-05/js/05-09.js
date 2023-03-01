function init() {

  // use the defaults
  let stats = initStats();
  let renderer = initRenderer();
  let camera = initCamera();

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  // and add some simple default lights
  let scene = new THREE.Scene();
  let groundPlane = addLargeGroundPlane(scene)
  groundPlane.position.y = -30;
  initDefaultLighting(scene);

  // setup the control parts of the ui
  let controls = new function () {
    let self = this;

    // the start geometry and material. Used as the base for the settings in the control UI
    this.appliedMaterial = applyMeshNormalMaterial
    this.castShadow = true;
    this.groundPlaneVisible = true;

    let baseGeom = new THREE.TorusGeometry(10, 10, 8, 6, Math.PI * 2);
    this.radius = baseGeom.parameters.radius;
    this.tube = baseGeom.parameters.tube;
    this.radialSegments = baseGeom.parameters.radialSegments;
    this.tubularSegments = baseGeom.parameters.tubularSegments;
    this.arc = baseGeom.parameters.arc;
    
    // redraw function, updates the control UI and recreates the geometry.
    this.redraw = function () {
      redrawGeometryAndUpdateUI(gui, scene, controls, function() {
        return new THREE.TorusGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments),
                Math.round(controls.tubularSegments), controls.arc)
      });
    };
  };

  // create the GUI with the specific settings for this geometry
  let gui = new dat.GUI();
  gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'radialSegments', 0, 40).onChange(controls.redraw);
  gui.add(controls, 'tubularSegments', 1, 20).onChange(controls.redraw);
  gui.add(controls, 'arc', 0, Math.PI * 2).onChange(controls.redraw);

  // add a material section, so we can switch between materials
  gui.add(controls, 'appliedMaterial', {
    meshNormal: applyMeshNormalMaterial, 
    meshStandard: applyMeshStandardMaterial
  }).onChange(controls.redraw)

  gui.add(controls, 'castShadow').onChange(function(e) {controls.mesh.castShadow = e})
  gui.add(controls, 'groundPlaneVisible').onChange(function(e) {groundPlane.material.visible = e})

  // initialize the first redraw so everything gets initialized
  controls.redraw();
  let step = 0;
  // call the render function
  render();
  function render() {
    stats.update();
    controls.mesh.rotation.y = step+=0.01
    controls.mesh.rotation.x = step
    controls.mesh.rotation.z = step
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}