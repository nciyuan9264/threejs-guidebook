function init() {

  // use the defaults
  let stats = initStats();
  let webGLRenderer = initRenderer();
  let scene = new THREE.Scene();
  let camera = initCamera(new THREE.Vector3(20, 40, 110));
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  let controls = new function () {
    this.size = 10;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;

    this.sizeAttenuation = true;

    this.redraw = function () {
      let toRemove = [];
      scene.children.forEach(function (child) {
        if (child instanceof THREE.Points) {
          toRemove.push(child);
        }
      });
      toRemove.forEach(function (child) {
        scene.remove(child)
      });
      createPointInstances(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation,
        controls.color);
    };
  };

  let gui = new dat.GUI();
  gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
  gui.add(controls, 'transparent').onChange(controls.redraw);
  gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
  gui.addColor(controls, 'color').onChange(controls.redraw);
  gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);

  controls.redraw();

  render();

  function createPointCloud(name, texture, size, transparent, opacity, sizeAttenuation, color) {
    let geom = new THREE.Geometry();

    let color = new THREE.Color(color);
    color.setHSL(color.getHSL().h,
      color.getHSL().s,
      (Math.random()) * color.getHSL().l);

    let material = new THREE.PointsMaterial({
      size: size,
      transparent: transparent,
      opacity: opacity,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: sizeAttenuation,
      color: color
    });

    let range = 40;
    for (let i = 0; i < 150; i++) {
      let particle = new THREE.Vector3(
        Math.random() * range - range / 2,
        Math.random() * range * 1.5,
        Math.random() * range - range / 2);
      particle.velocityY = 0.1 + Math.random() / 5;
      particle.velocityX = (Math.random() - 0.5) / 3;
      particle.velocityZ = (Math.random() - 0.5) / 3;
      geom.vertices.push(particle);
    }

    let system = new THREE.Points(geom, material);
    system.name = name;
    return system;
  }

  function createPointInstances(size, transparent, opacity, sizeAttenuation, color) {

    let loader = new THREE.TextureLoader();

    let texture1 = loader.load("../../assets/textures/particles/snowflake1_t.png");
    let texture2 = loader.load("../../assets/textures/particles/snowflake2_t.png");
    let texture3 = loader.load("../../assets/textures/particles/snowflake3_t.png");
    let texture4 = loader.load("../../assets/textures/particles/snowflake5_t.png");

    scene.add(createPointCloud("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud("system2", texture2, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud("system3", texture3, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud("system4", texture4, size, transparent, opacity, sizeAttenuation, color));
  }


  function render() {

    stats.update();

    scene.children.forEach(function (child) {
      if (child instanceof THREE.Points) {
        let vertices = child.geometry.vertices;
        vertices.forEach(function (v) {
          v.y = v.y - (v.velocityY);
          v.x = v.x - (v.velocityX);
          v.z = v.z - (v.velocityZ);

          if (v.y <= 0) v.y = 60;
          if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
          if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
        });

        child.geometry.verticesNeedUpdate = true;
      }
    });

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }
}